<template>
  <div id="Room">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <MyTable filter :columns="columns" :data="dataSource" border></MyTable>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>

    <Modal
      v-model="visible.edit"
      :title="`${editType === 'add' ? i18n_lang.noticeManage15 : i18n_lang.noticeManage16}${i18n_lang.noticeManage17}`"
      :width="600"
      :styles="{ top: '20px' }"
      @on-cancel="handleCloseModal"
    >
      <Spin v-if="loading.edit" size="large" fix></Spin>
      <Form
        v-if="visible.edit"
        ref="editForm"
        :model="editInfo"
        :label-width="100"
        :rules="ruleValidate"
      >
        <FormItem :label="i18n_lang.noticeManage39" prop="lottery_id">
          <Select
            v-model="editInfo.lottery_id"
            style="width:200px"
            @on-change="handleChangeModalLottery"
          >
            <OptionGroup v-for="(it, i) in lotteryTreeList" :key="i" :label="it.name">
              <Option v-for="(is, j) in it.children" :key="j" :value="is.id">{{ is.name }}</Option>
            </OptionGroup>
          </Select>
        </FormItem>
        <FormItem v-if="editInfo.lottery_id" :label="i18n_lang.noticeManage40" prop="hall_id">
          <MoreOptionCheck
            ref="hallIdOpt"
            v-model="editInfo.hall_id"
            :option-data="hallList"
            option-label="hall_name"
            option-key="id"
            :loading="loading.hall"
          ></MoreOptionCheck>
        </FormItem>
        <FormItem :label="i18n_lang.noticeManage41" prop="title"> <Input v-model="editInfo.title" /> </FormItem>
        <FormItem :label="i18n_lang.noticeManage42" prop="content">
          <Input v-model="editInfo.content" type="textarea" />
        </FormItem>
        <FormItem :label="i18n_lang.noticeManage43" prop="sleep_time">
          <Input v-model="editInfo.sleep_time" placeholder />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleCloseModal">{{i18n_lang.noticeManage44}}</Button>
        <Button type="primary" :loading="loading.btn.edit" @click="handleSave">{{i18n_lang.noticeManage45}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import MyTable from '_c/MyTable'
import MoreOptionCheck from '_c/MoreOptionCheck'
import columns from './columns/room.js'
import { lotteryToTree } from '@/libs/lottery'

const initEdit = {
  title: '',
  // 厅选择
  hall_id: [],
  lottery_id: '',
  content: '',
  sleep_time: ''
}

export default {
  components: {
    MyTable,
    MoreOptionCheck
  },
  data() {
    const i18n_lang = this.$t('noticeManage');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        hall: false,
        btn: {
          edit: false
        }
      },
      visible: {
        edit: false
      },
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      dataSource: [],
      columns: columns(this),
      editType: 'add', // add/edit
      editInfo: { ...initEdit },
      lotteryList: [],
      lotteryTreeList: {},
      hallList: [],
      ruleValidate: {
        lottery_id: [{ required: true, message: i18n_lang.noticeManage46 }],
        hall_id: [
          {
            required: true,
            trigger: 'change',
            validator: (rule, value, cb) => (value.length ? cb() : cb(i18n_lang.noticeManage47))
          }
        ],
        title: [{ required: true, message: i18n_lang.noticeManage48 }],
        content: [{ required: true, message: i18n_lang.noticeManage49 }],
        sleep_time: [
          {
            required: true,
            trigger: 'change',
            validator: (rule, value, cb) =>
              value && value >= 30 ? cb() : cb(i18n_lang.noticeManage50)
          }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    changePageSize(i) {
      this.page.pageSize = i
      this.getData()
    },
    async init() {
      await this.getLotteryList()
      this.getData()
    },
    async getLotteryList() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/lottery/kinds/all',
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.lotteryTreeList = lotteryToTree(res.data)
      this.lotteryList = res.data.filter(x => x.pid !== 0)
    },
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/room',
        method: 'GET',
        params: {
          page: this.page.currentPage,
          page_size: this.page.pageSize
        }
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      this.dataSource = res.data
    },
    // 打开新增/编辑
    handleOpenModal(row) {
      this.editType = row ? 'edit' : 'add'
      if (row) {
        const editdata = { ...row }
        const hallArr = editdata.hall_id.split(',').map(Number)
        editdata.hall_id = hallArr
        this.editInfo = { ...editdata }
        this.getHallList(hallArr)
      } else {
        this.editInfo = { ...initEdit }
      }
      this.visible.edit = true
    },
    handleChangeModalLottery() {
      this.editInfo.hall_id = []
      this.getHallList()
    },
    async getHallList() {
      this.$refs.hallIdOpt && this.$refs.hallIdOpt.handleClear()
      this.hallList = []
      this.loading.hall = true
      const res = await this.$axios.request({
        url: '/pc28/hall',
        params: {
          lottery_id: this.editInfo.lottery_id
        }
      })
      this.loading.hall = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.hallList = res.data
    },
    handleCloseModal() {
      this.visible.edit = false
      this.$refs['editForm'].resetFields()
    },
    async handleSave() {
      this.loading.btn.edit = true
      this.$refs['editForm'].validate(async valid => {
        if (!valid) {
          this.loading.btn.edit = false
          return
        }
        const req = { ...this.editInfo }
        req.hall_id = req.hall_id.join(',')
        const res = await this.$axios.request({
          url: '/room',
          method: 'POST',
          data: req
        })
        this.loading.btn.edit = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.visible.edit = false
        this.getData()
      })
    },
    // 停用
    async handleStop(row, type) {
      this.loading.page = true
      const obj = {
        url: type === 'delete' ? `/room/${row.id}` : `/room?id=${row.id}`,
        method: type === 'delete' ? 'DELETE' : 'PATCH'
      }
      const req = {}
      if (type === 'stop') {
        req.status = row.status === 'enable' ? 'disable' : 'enable'
        obj.data = req
      }

      const res = await this.$axios.request(obj)
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
#Room {
  position: relative;
}
</style>
