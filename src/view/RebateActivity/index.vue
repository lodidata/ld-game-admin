<template>
  <div id="RebateActivity">
    <Spin v-if="loading" size="large" fix></Spin>
    <Button type="primary" style="margin-bottom:15px;" @click="add">{{i18n_lang.rebateActivity0}}</Button>
    <Table :columns="columns" :data="dataSource"></Table>
    <!-- <Page
      class="page_box"
      show-sizer
      split-panels
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page> -->
    <!-- 新增、编辑 -->
    <Modal v-model="visible.modal" :title="i18n_lang.rebateActivity1" :width="70" @on-visible-change="handleCloseModal">
      <Add v-show="visible.modal" :value="detailId" @onSuccess="handleSuccess"></Add>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import Add from './addActivity'
import columns from './columns'
// import { MathDiv, MathMul } from '@/libs/formatMath'
export default {
  components: {
    Add
  },
  data() {
    const i18n_lang = this.$t('rebateActivity');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      dataSource: [],
      loading: false,
      detailId: -1, // 详情数据
      visible: {
        modal: false,
        btn: false
      },
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 0,
        pageSizes: [20, 100, 1000, 2000]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData(i) {
      this.page.currentPage = i || 1
      this.loading = true
      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      const res = await this.$axios.request({
        // url: '/active/bkge',
        url: '/active/newBkge',
        method: 'GET',
        params: req
      })
      this.loading = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.dataSource = res.data ? res.data : []
      this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.currentPage = 1
      this.page.pageSize = pageSize
      this.getData()
    },
    handleCloseModal(val) {
      if (!val) {
        this.detailId = -1
      }
    },
    // 启用停用
    async handleStatus(row) {
      const data = { ...row }
      // data.rule = MathMul(data.rule, 100)
      const res = await this.$axios.request({
        url: `/active/bkge/${row.id}`,
        method: 'PATCH',
        data: {
          status: data.status === 'disabled' ? 'enabled' : 'disabled'
        }
      })
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    },
    // 删除
    async del(row) {
      const data = { ...row }
      data.status = 'deleted'
      const res = await this.$axios.request({
        url: `/active/bkge/${row.id}`,
        method: 'DELETE'
      })
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    },
    // 编辑
    handleOpenModal(row) {
      this.detailId = row.id
      this.visible.modal = true
    },
    add() {
      this.detailId = -1
      this.visible.modal = true
    },
    handleSuccess() {
      this.detailId = -1 // 防止重复打开同一条数据时没有清掉缓存
      this.visible.modal = false
      this.getData()
    }
  }
}
</script>
