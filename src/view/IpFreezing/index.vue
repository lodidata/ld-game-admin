<template>
  <div id="ipFreezing">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{ i18n_lang.ipFreezing0 }}</span>
          <Input v-model="initQuery.ip" placeholder clearable style="width: 140px"/>
        </div>
        <div class="item">
          <span>{{ i18n_lang.ipFreezing1 }}</span>
          <DatePicker
            v-model="time"
            type="daterange"
            placeholder
            style="width: 200px"
            clearable
            @on-change="selectTime"
          ></DatePicker>
        </div>
        <div class="item">
          <span>{{ i18n_lang.ipFreezing2 }}</span>
          <Input v-model="initQuery.account" placeholder clearable style="width: 140px"/>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" class="marginRight" @click="search">{{ i18n_lang.ipFreezing3 }}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{ i18n_lang.ipFreezing4 }}</Button>
        </div>
      </div>
    </Card>
    <div style="margin-bottom: 15px;">
      <Button type="primary" icon="md-add" @click="addIp">{{ i18n_lang.ipFreezing7 }}</Button>
    </div>
    <Table ref="table" border :columns="columns" :data="dataSource" @on-sort-change="sortTable"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.ipFreezing5}：${page.total}${i18n_lang.ipFreezing6}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size-opts="page.pageSizes"
      :page-size="page.pageSize"
      :total="page.total"
      @on-change="getList"
      @on-page-size-change="changePageSize"
    ></Page>
    <!-- 新增冻结IP -->
    <Modal v-model="visible.add" :title="`${i18n_lang.ipFreezing7}`">
      <Form ref="addInfo" :model="addInfo" :label-width="100" :rules="ruleValidate">
        <FormItem :label="`${i18n_lang.ipFreezing8}`" prop="ip">
          <Input v-model="addInfo.ip" placeholder/>
        </FormItem>
        <FormItem :label="`${i18n_lang.ipFreezing9}`" prop="lock_time">
          <Select v-model="addInfo.lock_time" style="width: 120px">
            <Option :value="0">{{ i18n_lang.ipFreezing10 }}</Option>
            <Option :value="1">{{ i18n_lang.ipFreezing11 }}</Option>
            <Option :value="3">{{ i18n_lang.ipFreezing12 }}</Option>
            <Option :value="5">{{ i18n_lang.ipFreezing13 }}</Option>
            <Option :value="7">{{ i18n_lang.ipFreezing14 }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="`${i18n_lang.ipFreezing15}`" prop="memo">
          <Input type="textarea" :rows="3" v-model="addInfo.memo"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" class="btn" :loading="loading.btn" @click="addFreezingIP">{{ i18n_lang.ipFreezing16 }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import columns from './columns'
  const initQuery = {
    ip: "",
    account: "",
    start_time: "",
    end_time: ""
  }
  const addInfo = {
    ip: "",
    lock_time: 1,
    memo: ""
  }
  export default {
    data() {
      const i18n_lang = this.$t('ipFreezing');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          page: false,
          btn: false
        },
        visible: {
          add: false
        },
        time: [initQuery.start_time, initQuery.end_time],
        initQuery: { ...initQuery },
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        addInfo: { ...addInfo },
        ruleValidate: {
          // ip: [{ required: true, message: `${i18n_lang.ipFreezing27}` }],
          // memo: [{ required: true, message: `${i18n_lang.ipFreezing28}` }]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 选择日期
      selectTime(val) {
        [this.initQuery.start_time, this.initQuery.end_time] = val
      },
      // 查询
      search(){
        this.getList()
      },
      // 重置
      reset(){
        this.time = [initQuery.start_time, initQuery.end_time]
        this.initQuery = { ...initQuery }
        this.getList()
      },
      // 新增
      addIp(){
        this.addInfo = { ...addInfo }
        this.visible.add = true
      },
      // 排序
      sortTable(key) {
        // console.log(key)
        // this.searchInfo.sort_way = key.order
        // this.getList()
      },
      // 分页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const req = { ...this.initQuery }
        const res = await this.$axios.request({
          url: '/ip/black',
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
          return false
        }
        this.dataSource = res.data
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      async handleDelete(row){
        const res = await this.$axios.request({
          url: `/ip/black/${row.id}`,
          method: 'DELETE'
        })
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getList()
      },
      // 新增提交
      async addFreezingIP(){
        this.$refs['addInfo'].validate(async valid => {
          if (valid) {
            this.loading.btn = true
            const req = { ...this.addInfo }
            const res = await this.$axios.request({
              url: `/ip/black`,
              method: 'POST',
              data: {
                ...req
              }
            })
            this.loading.btn = false
            if (res.status !== 200) {
              this.$Message.error(res.message)
            } else {
              this.getList()
              this.visible.add = false
            }
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped></style>
