<template>
  <div>
    <Spin v-if="loading.page" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.balaceTransfer0}}</span>
          <Input v-model="searchInfo.username" :placeholder="i18n_lang.balaceTransfer1" clearable style="width: 150px" />
        </div>
        <!-- <div class="item">
          <span>{{i18n_lang.balaceTransfer2}}</span>
          <DatePicker
            v-model="reginTime"
            :options="dateOpt"
            :editable="false"
            type="daterange"
            placeholder="Select date"
            style="width: 200px"
            clearable
            @on-change="selectTime"
          ></DatePicker>
        </div> -->
        <div class="item">
          <span>{{i18n_lang.balaceTransfer36}}</span>
          <DatePicker v-model="searchInfo.start_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="searchInfo.end_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
        </div>
        <div class="item">
          <span>{{i18n_lang.balaceTransfer38}}</span>
          <Select v-model="searchInfo.status" clearable style="width:150px">
            <Option v-for="item in statusList" :key="item.value" :value="item.value">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.balaceTransfer3}}</span>
          <Select v-model="searchInfo.out_type" clearable style="width:150px">
            <Option v-for="item in caseList" :key="item.id" :value="item.type">{{ item.name }}</Option>
          </Select>
          <span>{{i18n_lang.balaceTransfer4}}</span>
          <Select v-model="searchInfo.in_type" clearable style="width:150px">
            <Option v-for="item in caseList" :key="item.id" :value="item.type">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <Button type="primary" class="marginRight" icon="ios-search" @click="search">{{i18n_lang.balaceTransfer5}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="ios-download-outline" @click="exportData" v-if="allRoutes.indexOf('332') > -1">{{i18n_lang.balaceTransfer40}}</Button>
        </div>
      </div>
    </Card>

    <Modal v-model="visible.modal" :title="i18n_lang.balaceTransfer6" :width="400">
      <Form
        v-if="visible.modal"
        ref="editForm"
        :model="editInfo"
        :label-width="100"
        :rules="ruleValidate"
      >
        <FormItem :label="i18n_lang.balaceTransfer7" prop="username">
          <Input v-model="editInfo.username" :placeholder="i18n_lang.balaceTransfer8" style="width:150px" />
          <Button type="primary" class="marginRight" @click="check">{{i18n_lang.balaceTransfer9}}</Button>
        </FormItem>
        <FormItem :label="i18n_lang.balaceTransfer10" prop="wid">
          <Select v-model="editInfo.wid" clearable style="width:200px">
            <Option v-for="item in exituserList" :key="item.id" :value="item.id">
              <span>{{ item.name }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.balaceTransfer11" prop="sid">
          <Select v-model="editInfo.sid" clearable style="width:200px">
            <Option v-for="item in exituserList" :key="item.id" :value="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.balaceTransfer12" prop="amount">
          <Input v-model="editInfo.amount" :placeholder="i18n_lang.balaceTransfer13" />
        </FormItem>
        <FormItem :label="i18n_lang.balaceTransfer14" prop="memo">
          <Input v-model="editInfo.memo" type="textarea" :rows="3" :placeholder="i18n_lang.balaceTransfer15" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="handleSave">{{i18n_lang.balaceTransfer16}}</Button>
      </div>
    </Modal>
    <Table border :columns="columns" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.balaceTransfer41}${page.total}${i18n_lang.balaceTransfer42}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size-opts="page.pageSizes"
      :page-size="page.pageSize"
      :total="page.total"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>
  </div>
</template>

<script>
import columns from './columns'
import { mapState, mapActions  } from 'vuex'
import lotteryDateOption from '@/libs/lotteryDateOption'

const searchInfo = {
  username: '',
  start_time:  `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, // 开始时间
  end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`, // 结束时间
  out_type: '',
  in_type: '',
  status: 'all'
}
export default {
  data() {
    const i18n_lang = this.$t('balaceTransfer');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        btn: false
      },
      visible: {
        modal: false
      },
      // dateOpt: lotteryDateOption,
      dateOpt: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 4320000000
        }
      },
      editInfo: {
        username: '',
        wid: '',
        sid: '',
        amount: '',
        memo: ''
      },
      uid: '',
      exituserList: [],
      reginTime: [searchInfo.start_time, searchInfo.end_time],
      columns: columns(this),
      dataSource: [],
      searchInfo: { ...searchInfo },
      ruleValidate: {
        username: [{ required: true, message: i18n_lang.balaceTransfer17 }],
        wid: [{ required: true, message: i18n_lang.balaceTransfer18 }],
        sid: [{ required: true, message: i18n_lang.balaceTransfer19 }],
        amount: [{ required: false, message: i18n_lang.balaceTransfer20 }],
        memo: [{ required: false, message: i18n_lang.balaceTransfer21 }]
      },
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 50, 100, 1000]
      },
      statusList: [
        {
          name: i18n_lang.balaceTransfer39,
          value: 'all'
        },
        {
          name: i18n_lang.balaceTransfer33,
          value: 'success'
        },
        {
          name: i18n_lang.balaceTransfer34,
          value: 'fail'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      caseList: state => state.common.caseList,
      allRoutes: state => state.user.allRoutes
    })
  },
  created() {
    this.getData()
    this.$store.dispatch('common/case')
  },
  methods: {
    ...mapActions({
      getUserDetail: 'detail/info'
    }),
    async getData(index = 1) {
      this.loading.page = true
      this.page.currentPage = index
      const req = {
        ...this.searchInfo,
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      if(req.start_time && req.end_time){
        req.start_time = this.$dateTimeFormat(new Date(req.start_time))
        req.end_time = this.$dateTimeFormat(new Date(req.end_time))
      }
      if(req.status === 'all'){
        delete req.status
      }
      const res = await this.$axios.request({
        url: '/cash/record/transfer',
        method: 'GET',
        params: req
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.dataSource = res.data || []
      this.page.total = res.attributes.total || 0
    },
    // 手动主钱包、子钱包互转
    async transferCase(params) {
      const res = await this.$axios.request({
        url: '/cash/manual/ps',
        method: 'POST',
        params
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.visible.modal = false
      this.$msg({
        type: 'success',
        message: this.i18n_lang.balaceTransfer22
      })
    },
    // 验证用户是否存在
    async exituser() {
      const res = await this.$axios.request({
        url: 'cash/record/exituser',
        method: 'GET',
        params: {
          username: this.editInfo.username
        }
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.uid = res.data.uid
      this.exituserList = res.data.wallet
      console.log(this.exituserList)
    },
    check() {
      this.exituser()
    },
    // 搜索
    search() {
      this.getData()
    },
    // 选择日期
    selectTime(val) {
      [this.searchInfo.start_time, this.searchInfo.end_time] = val
    },
    // openModal() {
    //   this.visible.modal = true
    // },
    async handleSave() {
      this.$refs['editForm'].validate(async valid => {
        if (!valid) {
          return false
        }

        const amount = this.exituserList.find(item => item.id === Number(this.editInfo.wid)).balance
        const params = {
          uid: this.uid,
          wid: this.editInfo.wid,
          sid: this.editInfo.sid,
          // amount: Number(this.editInfo.amount) * 100,
          amount,
          memo: this.editInfo.memo
        }
        this.transferCase(params)
      })
    },
    // 翻页
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 查看用户详情
    handleUserDetail(row) {
      this.getUserDetail({ username: row.username, id: row.user_id })
    },
    //表格导出
    async exportData() {
      const query = {
        ...this.searchInfo
      }
      if(query.start_time && query.end_time){
        query.start_time = this.$dateTimeFormat(new Date(query.start_time))
        query.end_time = this.$dateTimeFormat(new Date(query.end_time))
      }
      if(query.status === 'all'){
        delete query.status
      }
      const res = await this.$axios.request({
        url: '/cash/record/transfer/export',
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
    }
  }
}
</script>
