<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Form>
      <FormItem :label="i18n_lang.loginSecurity2">
        <RadioGroup v-model="isOpen" style="margin-top: -5px" @on-change="onChange">
          <Radio label="open">{{i18n_lang.loginSecurity3}}</Radio>
          <Radio label="close">{{i18n_lang.loginSecurity4}}</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <MyTable
      :columns="columns"
      :data="dataSource"
      :loading="isLoadingTable"
      border
      style="margin-top: 20px"
    >
    </MyTable>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.loginSecurity49}${page.total}${i18n_lang.loginSecurity50}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      @on-change="doQuery"
      @on-page-size-change="changePageSize"
    ></Page>
    <Modal
      v-model="visable"
      :width="400"
      :title="i18n_lang.loginSecurity5"
      @on-ok="admin"
      @on-cancel="visable = false"
    >
      <p v-if="current_row && current_row.authorize_state === 0">{{i18n_lang.loginSecurity6}}</p>
      <p v-else>{{i18n_lang.loginSecurity7}}</p>
    </Modal>
  </div>
</template>
<script>
import MyTable from '_c/MyTable'
import columns from './columns/googleCode'

export default {
  name: 'GoogleCode',
  components: {
    MyTable
  },
  data() {
    const i18n_lang = this.$t('loginSecurity');
    return {
      i18n_lang: i18n_lang,
      isOpen: 'open',
      isLoadingTable: false,
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      visable: false,
      loading: {
        page: false
      },
      dataSource: [],
      columns: columns(this),
      current_row: null
    }
  },
  async created() {
    this.doQuery()
    this.getAuthorizeState()
  },
  methods: {
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.doQuery()
    },
    // 查询列表数据
    async doQuery(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      const query = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
      }
      const res = await this.$axios.request({
        url: '/ipAuthentication/list',
        method: 'GET',
        params: query
        // data: {
        //   page: this.page.currentPage,
        //   page_size: this.page.pageSize
        // }
      })
      this.loading.page = false
      if (res.state === 0) {
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
        this.dataSource = res.data || []
        this.dataSource = this.dataSource.filter(item => Number(item.authorize_state) === 1)
      }
    },
    async getAuthorizeState() {
      const res = await this.$axios.request({
        url: '/ipAuthentication/switch',
        method: 'GET'
      })
      if (res.state === 0) {
        this.isOpen = res.data.authorize_state === 0 ? 'close' : 'open'
      }else{
        this.$msg({
          type: 'error',
          message: res.message
        })
      }
    },
    async onChange(value) {
      this.isOpen = value
      const res = await this.$axios.request({
        url: '/ipAuthentication/switch',
        method: 'PUT',
        data: {
          state: value === 'open' ? 1 : 0
        }
      })
      if (res.state === 0) {
        this.$msg({
          type: 'success',
          message: `${this.i18n_lang.loginSecurity8}${value === 'open' ? this.i18n_lang.loginSecurity3 : this.i18n_lang.loginSecurity4}${this.i18n_lang.loginSecurity9}`
        })
      }else{
        this.$msg({
          type: 'error',
          message: res.message
        })
      }
    },
    async admin() {
      const row = this.current_row
      const res = await this.$axios.request({
        url: `/ipAuthentication/list?admin_id=${row.admin_id}`,
        method: 'DELETE'
      })
      this.visable = false
      if (res.state === 0) {
        this.$msg({
          type: 'success',
          message: `${this.i18n_lang.loginSecurity8}${row.authorize_state === 0 ? this.i18n_lang.loginSecurity10 : this.i18n_lang.loginSecurity11}${this.i18n_lang.loginSecurity9}`
        })
        this.doQuery()
      }else{
        this.$msg({
          type: 'error',
          message: res.message
        })
      }
    },
    adOpt(row, index) {
      this.current_row = row
      this.visable = !this.visable
    }
  }
}
</script>
