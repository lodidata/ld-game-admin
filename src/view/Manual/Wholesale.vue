<template>
  <div id="wholesale">
    <Spin v-if="loading.page" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{`${i18n_lang.manual110_v_1_2_4_6}`}}</span>
          <DatePicker
            class="datePicker"
            v-model="initQuery.timeArr"
            type="daterange"
            :options="dateOpt"
            :editable="false"
            placement="bottom-end"
            placeholder
            style="width: 200px;"
          ></DatePicker>
        </div>
        <div class="item">
          <span>{{`${i18n_lang.manual111_v_1_2_4_6}`}}</span>
          <Input v-model="initQuery.apply_admin" placeholder style="width: 100px" />
        </div>
        <div class="item">
          <span>{{`${i18n_lang.manual112_v_1_2_4_6}`}}</span>
          <Input v-model="initQuery.username" placeholder style="width: 100px" />
        </div>
        <div class="item">
          <span>{{`${i18n_lang.manual113_v_1_2_4_6}`}}</span>
          <Input v-model="initQuery.money_start" placeholder style="width: 80px" />
          -
          <Input v-model="initQuery.money_end" placeholder style="width: 80px" />
        </div>
        <div class="item">
          <span>{{`${i18n_lang.manual114_v_1_2_4_6}`}}</span>
          <Select v-model="initQuery.type" style="width:100px">
            <Option :value="-1">{{`${i18n_lang.manual115_v_1_2_4_6}`}}</Option>
            <Option v-for="(it,i) in typeList" :key="i" :value="it.id">{{ it.text }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{`${i18n_lang.manual132_v_1_2_4_6}`}}</span>
          <Select v-model="initQuery.status" style="width:100px">
            <Option :value="-1">{{`${i18n_lang.manual115_v_1_2_4_6}`}}</Option>
            <Option v-for="(it,i) in statusList" :key="i" :value="it.id">{{ it.text }}</Option>
          </Select>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" style="margin-right: 5px" @click="getData()">{{`${i18n_lang.manual116_v_1_2_4_6}`}}</Button>
          <Button type="primary" icon="md-refresh" @click="reset">{{`${i18n_lang.manual117_v_1_2_4_6}`}}</Button>
        </div>
      </div>
    </Card>
    <!-- <div class="total">{{`${i18n_lang.manual118_v_1_2_4_6}:`}}{{ total_money != '--' ? total_money / 100 : total_money }}</div> -->
    <div class="total">{{`${i18n_lang.manual118_v_1_2_4_6}:`}}{{ total_money != '--' ? total_money : total_money }}</div>
    <Table ref="table" border :columns="columns" :data="dataSource"
      @on-select="handleSelect"
      @on-select-cancel="handleCancel"
      @on-select-all="handleSelectAll"
      @on-select-all-cancel="handleSelectAll"
    ></Table>
    <div style="padding:10px 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.manual105}${page.total}${i18n_lang.manual106}` }}</div>
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
    <div v-if="dataSource.length && uidList.length" style="width: 100%;padding-bottom: 20px;position: fixed;bottom: 0;background: #fff;z-index: 10;">
      <span style="font-size: 24px;">{{`${i18n_lang.manual119_v_1_2_4_6}:`}}</span>
      <Poptip confirm :title="`${i18n_lang.manual120_v_1_2_4_6}?`" @on-ok="handleStatus('', 1)">
        <Button type='success' style='margin-right:5px'>{{`${i18n_lang.manual121_v_1_2_4_6}`}}</Button>
      </Poptip>
      <Poptip confirm :title="`${i18n_lang.manual122_v_1_2_4_6}?`" @on-ok="handleStatus('', 2)">
        <Button type='error'>{{`${i18n_lang.manual123_v_1_2_4_6}`}}</Button>
      </Poptip>
    </div>
  </div>
</template>

<script>
  import lotteryDateOption from '@/libs/lotteryDateOption'
  import { computeDay } from '@/libs/handleDate'
  import columns from './columns/wholesale'
  const initQuery = {
    username: "",
    apply_admin: "",
    money_start: "",
    money_end: "",
    time_begin: "",
    time_end: "",
    type: -1,
    status: -1,
    timeArr: [computeDay(), computeDay()], // 时间数组
  }
  export default {
    data() {
      const i18n_lang = this.$t('manual');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          page: 0
        },
        dateOpt: lotteryDateOption,
        initQuery: { ...initQuery },
        typeList: [
          {
            id: 1,
            text: `${i18n_lang.manual124_v_1_2_4_6}`
          },
          {
            id: 5,
            text: `${i18n_lang.manual125_v_1_2_4_6}`
          },
          {
            id: 11,
            text: `${i18n_lang.manual126_v_1_2_4_6}`
          },
          {
            id: 13,
            text: `${i18n_lang.manual127_v_1_2_4_6}`
          }
        ],
        statusList: [
          {
            id: 0,
            text: `${i18n_lang.manual133_v_1_2_4_6}`
          },
          {
            id: 1,
            text: `${i18n_lang.manual121_v_1_2_4_6}`
          },
          {
            id: 2,
            text: `${i18n_lang.manual123_v_1_2_4_6}`
          }
        ],
        uidList: [],
        dataSource: [],
        total_money: '',
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      handleSelect(slection, row){
        this.uidList.push(row.id)
      },
      handleCancel(slection, row){
        this.uidList.forEach((item, index) => {
          if(item == row.id){
            this.uidList.splice(index, 1)
          }
        })
      },
      handleSelectAll(slection){
        if(slection.length){
          slection.forEach(item => {
            this.uidList.push(item.id)
          })
        }else{
          this.uidList = []
        }
      },
      reset(){
        this.initQuery = { ...initQuery }
        this.getData()
      },
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getData()
      },
      async getData(index) {
        this.loading.page++
        this.page.currentPage = index || 1
        this.dataSource = []
        const req = {
          page: this.page.currentPage,
          page_size: this.page.pageSize,
          ...this.initQuery
        }
        // req.money_start = req.money_start ? req.money_start * 100 : ''
        req.money_start = req.money_start ? req.money_start : ''
        // req.money_end = req.money_end ? req.money_end * 100 : ''
        req.money_end = req.money_end ? req.money_end : ''
        req.type = req.type != -1 ? req.type : ''
        req.status = req.status != -1 ? req.status : ''
        // 处理时间
        if (req.timeArr[0] !== '') {
          req.time_begin = this.$dateFormat(req.timeArr[0])
          req.time_end = this.$dateFormat(req.timeArr[1])
        }
        delete req.timeArr
        const res = await this.$axios.request({
          url: `/cash/manualcheck/records`,
          method: 'GET',
          params: req
        })
        this.loading.page--
        if (res.status !== 200) {
          this.$Message.error(res.message)
        } else {
          this.page.total = res.attributes ? res.attributes.total : 0
          this.total_money = (res.attributes && res.attributes.total_money) || res.attributes.total_money == 0 ? res.attributes.total_money : `--`
          this.dataSource = res.data
        }
      },
      async handleStatus(row, status){
        const req = {
          id: [],
          status: status
        }
        if(row){
          req.id.push(row.id)
        }else{
          req.id = this.uidList
        }
        const res = await this.$axios.request({
          url: '/cash/manualcheck',
          method: 'POST',
          params: {
            ...req
          }
        })
        if (res.status !== 200 || res.state !== 0) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.getData()
      }
    }
  }
</script>

<style>
  .total{
    font-size: 16px;
    text-align: right;
    color: #e1792f;
    margin-bottom: 10px;
  }
  #wholesale .datePicker .ivu-select-dropdown{
    left: 95px!important;
  }
</style>
