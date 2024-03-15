<template>
  <div id="Notice">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{`${i18n_lang.noticeManage53}：`}}</span>
          <Select v-model="searchInfo.popup_type" clearable style="width:150px">
            <Option value>{{i18n_lang.noticeManage78}}</Option>
            <Option :value="'1'">{{i18n_lang.noticeManage19}}</Option>
            <Option :value="'2'">{{i18n_lang.noticeManage20}}</Option>
            <Option :value="'3'">{{i18n_lang.noticeManage21}}</Option>
            <Option :value="'4'">{{i18n_lang.noticeManage75}}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{`${i18n_lang.noticeManage79}：`}}</span>
          <Select v-model="searchInfo.status" clearable style="width:150px">
            <Option value>{{i18n_lang.noticeManage78}}</Option>
            <Option :value="'1'">{{i18n_lang.noticeManage58}}</Option>
            <Option :value="'0'">{{i18n_lang.noticeManage57}}</Option>
          </Select>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" class="marginRight" @click="search">{{i18n_lang.noticeManage80}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.noticeManage81}}</Button>
        </div>
      </div>
    </Card>
    <MyTable filter :columns="columns" :data="dataSource" border></MyTable>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.noticeManage76}${page.total}${i18n_lang.noticeManage77}` }}</div>
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

    <!-- 查看 -->
    <Modal v-model="visible.show" :title="i18n_lang.noticeManage4" :width="600" :styles="{ top: '20px' }">
      <Form v-if="visible.show" :label-width="80">
        <FormItem :label="i18n_lang.noticeManage5">
          <span>{{ showData.title }}</span>
        </FormItem>
        <FormItem :label="i18n_lang.noticeManage6">
          <span v-if="showData.content" v-html="showData.content"></span>
          <img v-if="showData.imgs" :src="showData.imgs" alt="">
        </FormItem>
        <FormItem :label="i18n_lang.noticeManage7">
          <span>{{ showData.popup_type }}</span>
        </FormItem>
        <FormItem :label="i18n_lang.noticeManage8">
          <span>{{ showData.recipient }}</span>
        </FormItem>
        <FormItem :label="i18n_lang.noticeManage9">
          <span>{{ showData.admin_name }}</span>
        </FormItem>
        <FormItem :label="i18n_lang.noticeManage10">
          <span>{{ showData.start_time }}</span>
        </FormItem>
        <FormItem :label="i18n_lang.noticeManage11">
          <span>{{ showData.end_time }}</span>
        </FormItem>
        <FormItem :label="i18n_lang.noticeManage12">
          <span>{{ showData.status === 0 ? i18n_lang.noticeManage13 : i18n_lang.noticeManage14 }}</span>
        </FormItem>
      </Form>
    </Modal>

    <!-- 新增公告 -->
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
        <FormItem :label="i18n_lang.noticeManage18" prop="popup_type">
          <RadioGroup v-model="editInfo.popup_type">
            <Radio :label="1">{{i18n_lang.noticeManage19}}</Radio>
            <Radio :label="2">{{i18n_lang.noticeManage20}}</Radio>
            <Radio :label="3">{{i18n_lang.noticeManage21}}</Radio>
            <Radio :label="4">{{i18n_lang.noticeManage75}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem v-if="editInfo.popup_type === 1" :label="i18n_lang.noticeManage22" prop="send_type">
          <Select v-model="editInfo.send_type" style="width:200px">
            <Option :value="1">{{i18n_lang.noticeManage23}}</Option>
          </Select>
        </FormItem>
        <FormItem v-if="editInfo.popup_type === 1" :label="`${i18n_lang.noticeManage23}：`" prop="level">
          <MoreOptionCheck
            v-model="editInfo.level"
            :option-data="memberLevel"
            option-label="name"
            option-key="name"
          ></MoreOptionCheck>
        </FormItem>
        <FormItem v-if="editInfo.send_type == 3" :label="i18n_lang.noticeManage24" prop="userList">
          <Input v-model="editInfo.userList" type="textarea" :placeholder="i18n_lang.noticeManage25" />
        </FormItem>
        <FormItem :label="i18n_lang.noticeManage26" prop="title"> <Input v-model="editInfo.title" /> </FormItem>
        <FormItem :label="i18n_lang.noticeManage27" prop="content">
          <Input v-model="editInfo.content" type="textarea" />
        </FormItem>
        <FormItem prop="imgs">
          <span>{{i18n_lang.noticeManage73}}</span>
          <UploadImg v-model="editInfo.imgs" :content="editInfo.content"  @input="updataImgs"></UploadImg>
        </FormItem>
        <FormItem :label="i18n_lang.noticeManage28" prop="start_time">
          <DatePicker
            v-model="editInfo.start_time"
            type="date"
            :placeholder="i18n_lang.noticeManage29"
            style="width: 120px"
          ></DatePicker>
        </FormItem>
        <FormItem :label="i18n_lang.noticeManage30" prop="end_time">
          <DatePicker
            v-model="editInfo.end_time"
            type="date"
            :placeholder="i18n_lang.noticeManage31"
            style="width: 120px"
          ></DatePicker>
        </FormItem>
        <FormItem :label="i18n_lang.noticeManage82" prop="sort">
          <Input v-model="editInfo.sort"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn.add" @click="addNotice">{{i18n_lang.noticeManage32}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import MyTable from '_c/MyTable'
import MoreOptionCheck from '_c/MoreOptionCheck'
import columns from './columns/notice'
import { formatDateToString } from '@/libs/date'
import UploadImg from './UploadImg'

const searchInfo = {
  popup_type: '',
  status: ''
}

const initAdd = {
  popup_type: 1,
  send_type: 1,
  content: '',
  imgs: '',
  userList: '', // 自定义接收人
  level: [] ,// 会员等级
  sort: ''
}

export default {
  components: {
    MyTable,
    MoreOptionCheck,
    UploadImg
  },
  data() {
    const i18n_lang = this.$t('noticeManage');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        edit: false,
        btn: {
          add: false
        }
      },
      visible: {
        edit: false,
        show: false
      },
      searchInfo: { ...searchInfo },
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      dataSource: [],
      columns: columns(this),
      memberLevel: [],
      editType: 'add', // add edit
      editInfo: { ...initAdd },
      ruleValidate: {
        title: [{ required: true, message: i18n_lang.noticeManage33 }],
        popup_type: [{ required: true, message: i18n_lang.noticeManage34 }],
        level: [
          {
            required: true,
            trigger: 'change',
            validator: (rule, value, cb) => (value.length ? cb() : cb(i18n_lang.noticeManage35))
          }
        ],
        // content: [{ required: true, message: i18n_lang.noticeManage36 }],
        start_time: [{ required: true, message: i18n_lang.noticeManage37 }],
        end_time: [{ required: true, message: i18n_lang.noticeManage38 }]
      },
      showData: {} // 查看信息
    }
  },
  created() {
    this.getData()
  },
  methods: {
    updataImgs(url){
      this.editInfo.imgs = url
    },
    // 查询
    search(){
      this.getData()
    },
    // 重置
    reset(){
      this.searchInfo = { ...searchInfo }
      this.getData()
    },
    // 设置每页条数
    changePageSize(i) {
      this.page.pageSize = i
      this.getData()
    },
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      let req = {
        ...this.searchInfo
      }
      const res = await this.$axios.request({
        url: '/notices',
        method: 'GET',
        params: {
          ...req,
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
    async handleOpenModal(row) {
      this.editType = row ? 'edit' : 'add'
      this.editInfo = { ...initAdd }
      this.visible.edit = true
      if (!this.memberLevel.length) {
        this.loading.edit = true
        await this.getLevel()
        this.loading.edit = false
      }
      if (row) {
        this.getSingleNotice(row.id)
      }
    },
    // 关闭新增
    handleCloseModal() {
      this.$refs['editForm'].resetFields()
    },
    // 获取会员等级、层级
    async getLevel() {
      const res = await this.$axios.request({
        url: '/user/level',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.memberLevel = res.data
    },
    // 获取单条信息
    async getSingleNotice(id) {
      const res = await this.$axios.request({
        url: `/notices/single/${id}`,
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      // 判断接收类型
      if (res.data.send_type === 1) {
        res.data.level =
          res.data.recipient === '' ? (res.data.level = []) : res.data.recipient.split(',')
        delete res.data.recipient
      }
      if (res.data.send_type === 3) {
        res.data.userList = res.data.recipient
        delete res.data.recipient
      }
      this.editInfo = { ...res.data }
    },
    // 新增
    async addNotice() {
      if(this.editInfo.content && this.editInfo.imgs || !this.editInfo.content && !this.editInfo.imgs) return this.$Message.error(this.i18n_lang.noticeManage74)
      this.loading.btn.add = true
      this.$refs['editForm'].validate(async valid => {
        if (!valid) {
          this.loading.btn.add = false
          return
        }
        const req = { ...this.editInfo }
        if (this.editInfo.send_type === 1) {
          req.recipient = this.editInfo.level.join(',')
        }
        if (this.editInfo.send_type === 3) {
          req.recipient = this.editInfo.userList
        }
        delete req.userList
        delete req.level

        req.start_time = formatDateToString(req.start_time)
        req.end_time = formatDateToString(req.end_time)

        const url = this.editType === 'edit' ? `/notices/${req.id}` : '/notices'
        const method = this.editType === 'edit' ? 'PUT' : 'POST'
        const res = await this.$axios.request({
          url,
          method,
          data: req
        })
        this.loading.btn.add = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.visible.edit = false
        this.getData()
      })
    },
    // 启用/停用
    async handlePublish(row) {
      const status = row.status === 1 ? 0 : 1
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/notices/status/${row.id}`,
        method: 'PATCH',
        data: { status }
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    },
    // 查看
    handleShowDetail(row) {
      this.showData = { ...row }
      this.visible.show = true
    },
    // 删除
    async handleDelete(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/notices/${row.id}`,
        method: 'DELETE'
      })
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
#Notice {
  position: relative;
}
</style>
