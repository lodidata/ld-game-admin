<template>
  <div id="MemberLabel">
    <Spin v-if="loading.page" fix></Spin>
    <Button type="primary" icon="md-add" @click="handleEdit()">{{i18n_lang.memberLabel0}}</Button>
    <Table style="margin-top:20px" :columns="columns" :data="dataSource" border></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.memberLabel22}${page.total}${i18n_lang.memberLabel23}` }}</div>
    <Page
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      show-sizer
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>
    <!-- 编辑 -->
    <Modal v-model="visible" :title="editType === 'add' ? i18n_lang.memberLabel1 : i18n_lang.memberLabel2" :width="600">
      <Spin v-if="loading.edit" size="large" fix></Spin>
      <Form
        v-if="visible"
        ref="editForm"
        :model="editInfo"
        :label-width="150"
        :rules="ruleValidate"
        inline
      >
        <FormItem :label="i18n_lang.memberLabel3" prop="title">
          <Input v-model="editInfo.title"/>
        </FormItem>
        <FormItem :label="i18n_lang.memberLabel4" prop="content">
          <Input v-model="editInfo.content" type="textarea"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button v-if="editType === 'add'" type="primary" @click="saveLabel">{{i18n_lang.memberLabel4}}</Button>
        <Button v-if="editType === 'edit'" type="primary" @click="editLabel">{{i18n_lang.memberLabel5}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import columns from './columns'

const initEdit = {
  title: '',
  content: ''
}

export default {
  data() {
    const i18n_lang = this.$t('memberLabel');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: false,
        edit: false
      },
      visible: false,
      dataSource: [],
      editInfo: { ...initEdit },
      editType: 'add',
      ruleValidate: {
        title: [{ required: true, message: i18n_lang.memberLabel6 }],
        content: [{ required: true, message: i18n_lang.memberLabel7 }]
      },
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    async getData(i = 1) {
      this.loading.page = true
      this.page.currentPage = i
      this.dataSource = []
      const res = await this.$axios.request({
        url: '/user/labels',
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
      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data
    },
    async handleEdit(row) {
      this.editType = row ? 'edit' : 'add'
      this.editInfo = Object.assign({}, row || initEdit)
      this.visible = true
    },
    // 新增
    async saveLabel() {
      this.loading.edit = true

      this.$refs['editForm'].validate(async valid => {
        if (!valid) {
          this.loading.edit = false
        } else {
          const req = {
            name: this.editInfo.title,
            desc: this.editInfo.content
          }
          const res = await this.$axios.request({
            url: '/user/label',
            method: 'POST',
            data: req
          })
          this.loading.edit = false
          this.$msg({
            type: res.status !== 200 ? 'error' : 'success',
            message: res.message
          })
          if (res.status !== 200) return
          this.visible = false
          this.getData()
        }
      })
    },
    // 编辑
    async editLabel() {
      this.loading.edit = true

      this.$refs['editForm'].validate(async valid => {
        if (!valid) {
          this.loading.edit = false
        } else {
          const req = {
            name: this.editInfo.title,
            desc: this.editInfo.content,
            id: this.editInfo.id
          }
          const res = await this.$axios.request({
            url: `/user/label/${req.id}`,
            method: 'PUT',
            data: req
          })

          this.loading.edit = false
          this.$msg({
            type: res.status !== 200 ? 'error' : 'success',
            message: res.message
          })
          if (res.status !== 200) return
          this.visible = false
          this.getData()
        }
      })
    },
    async handleDelete(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/user/label/${row.id}`,
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
<style lang="less" scoped></style>
