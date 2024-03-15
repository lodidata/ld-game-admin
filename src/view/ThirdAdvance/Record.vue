<template>
  <div id="Record">
    <Spin v-if="loading.page" fix></Spin>
    <!-- query -->
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.thirdAdvance25}}</span>
          <Input v-model="query.user_name" placeholder style="width: 100px" />
        </div>

        <div class="item">
          <span>{{i18n_lang.thirdAdvance26}}</span>
          <Select v-model="query.status" style="width:100px">
            <Option value>{{i18n_lang.thirdAdvance27}}</Option>
            <Option value="pending">{{i18n_lang.thirdAdvance28}}</Option>
            <Option value="paid">{{i18n_lang.thirdAdvance29}}</Option>
            <Option value="failed">{{i18n_lang.thirdAdvance30}}</Option>
          </Select>
        </div>

        <div class="item">
          <span>{{i18n_lang.thirdAdvance31}}</span>
          <Select v-model="query.third_id" style="width:100px">
            <Option value>{{i18n_lang.thirdAdvance27}}</Option>
            <Option v-for="item in thirdPayList" :key="item.id" :value="item.id">{{ item.name }}</Option>
          </Select>
        </div>

        <div class="item">
          <span>{{i18n_lang.thirdAdvance32}}</span>
          <Input v-model="query.withdraw_order" placeholder style="width: 100px" />
        </div>

        <div class="item">
          <span>{{i18n_lang.thirdAdvance33}}</span>
          <Input v-model="query.transfer_no" placeholder style="width: 100px" />
        </div>

        <div class="item">
          <span>{{i18n_lang.thirdAdvance34}}</span>
          <DatePicker v-model="query.start_time" type="date" placeholder style="width: 120px" :options="dateOpt" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="query.end_time" type="date" placeholder style="width: 120px" :options="dateOpt" :editable="false"></DatePicker>
        </div>
      </div>

      <div class="query_btns">
        <Button type="primary" @click="getData()">{{i18n_lang.thirdAdvance35}}</Button>
        <Button type="primary" @click="reset">{{i18n_lang.thirdAdvance36}}</Button>
        <Button type="primary" style="margin-left: 5px;" icon="ios-download-outline" @click="exportData" v-if="allRoutes.indexOf('330') > -1">{{i18n_lang.thirdAdvance54}}</Button>
      </div>
    </Card>
    <!-- table -->
    <MyTable :columns="columns" :data="dataSource" border></MyTable>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.thirdAdvance56}${page.total}${i18n_lang.thirdAdvance57}` }}</div>
    <Page
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      show-sizer
      placement="top"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>
    <!-- 代付失败 -->
    <Modal v-model="visible.handle" :title="`${i18n_lang.thirdAdvance58}`" :width="600" :styles="{top: '20px'}">
      <Form ref="editForm" :model="editInfo" :label-width="100" :rules="ruleValidate">
        <FormItem :label="`${i18n_lang.thirdAdvance59}`" prop="comment">
          <Input v-model="editInfo.comment" type="textarea" :rows="3" :placeholder="` `"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="handleSave">{{`${i18n_lang.thirdAdvance60}`}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import columns from './columns.js'
import MyTable from '@/components/MyTable'
import { computeDay } from '@/libs/handleDate'

const initQuery = {
  user_name: '',
  status: '',
  third_id: '',
  withdraw_order: '',
  transfer_no: '',
  start_time: computeDay(),
  end_time: computeDay()
}
const editInfo = {
  id: '',
  status: 'daifu_fail',
  comment: ''
}
export default {
  components: {
    MyTable
  },
  computed: {
    ...mapState({
      allRoutes: state => state.user.allRoutes
    })
  },
  data() {
    const i18n_lang = this.$t('thirdAdvance');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        btn: false
      },
      visible: {
        handle: false
      },
      dateOpt: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 4320000000
        }
      },
      query: { ...initQuery },
      dataSource: [],
      thirdPayList: [],
      columns: columns(this),
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      editInfo: { ...editInfo },
      ruleValidate: {
        comment: [{ required: true, message: `${i18n_lang.thirdAdvance61}` }]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getData()
      this.getThirdPay()
    },
    // 获取第三方支付
    async getThirdPay() {
      this.thirdPayList = []
      const res = await this.$axios.request({
        url: `/thirdAdvance`,
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.thirdPayList = res.data
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 获取数据
    async getData(index) {
      if (this.query.start_time > this.query.end_time) {
        this.$Message.warning(this.i18n_lang.thirdAdvance37)
        return
      }
      this.page.currentPage = index || 1

      this.loading.page = true

      const query = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }

      // 处理时间
      if (query.start_time !== '') {
        query.start_time = this.$dateFormat(new Date(query.start_time))
      }
      if (query.end_time !== '') {
        query.end_time = this.$dateFormat(new Date(query.end_time))
      }

      this.dataSource = []

      const res = await this.$axios.request({
        url: `/thirdAdvance/transfer`,
        method: 'GET',
        params: query
      })

      this.loading.page = false
      // console.log(res.data)
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data
    },
    // 重置
    reset() {
      this.query = Object.assign({}, initQuery)
      this.getData()
    },
    // 请求查看数据
    async handleReq(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/thirdAdvance/transferResult/${row.id}`,
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$Message.error(res.message)
        this.$msg({
          type: 'error',
          message: res.message
        })
      }
      this.$Message.success(res.message)
      this.getData()
    },
    //表格导出
    async exportData() {
      // if (this.query.start_time > this.query.end_time) {
      //   this.$Message.warning(this.i18n_lang.thirdAdvance37)
      //   return
      // }
      const query = {
        ...this.query
      }
      // 处理时间
      if (query.start_time !== '') {
        query.start_time = this.$dateFormat(new Date(query.start_time))
      }
      if (query.end_time !== '') {
        query.end_time = this.$dateFormat(new Date(query.end_time))
      }
      const res = await this.$axios.request({
        url: '/thirdAdvance/transfer/export',
        method: 'GET',
        responseType: 'blob',
        params: query
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      const url = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'excel.xls')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    handle(row){
      this.editInfo = { ...editInfo }
      this.editInfo.id = row.id
      this.visible.handle = true
    },
    // 保存修改
    async handleSave() {
      this.loading.btn = true
      this.$refs['editForm'].validate(async valid => {
        if (!valid) {
          this.loading.btn = false
        } else {
          const req = {
            ...this.editInfo
          }
          const res = await this.$axios.request({
            url: `/thirdAdvance/transfer`,
            method: 'PATCH',
            data: req
          })
          this.loading.btn = false
          this.$msg({
            type: res.status !== 200 ? 'error' : 'success',
            message: res.message
          })
          if (res.status !== 200) return
          this.visible.handle = false
          this.getData()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
