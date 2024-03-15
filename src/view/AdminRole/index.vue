<template>
  <div id="AdminRole">
    <Spin v-if="loading.page" fix></Spin>

    <!-- query -->
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.adminRole0}}</span>
          <Input v-model="query.role" placeholder clearable style="width: 140px" />
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.adminRole1}}</Button>
        </div>
      </div>
    </Card>

    <Button type="primary" icon="md-add" @click="handleOpenModal('')">{{i18n_lang.adminRole2}}</Button>
    <Table style="margin-top:20px" :columns="columns" :data="dataSource" border></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.adminRole26}${page.total}${i18n_lang.adminRole27}` }}</div>
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

    <!-- 编辑 -->
    <Modal
      v-model="visible.modal"
      :title="editType === 'add' ? `${i18n_lang.adminRole3}${i18n_lang.adminRole5}` : `${i18n_lang.adminRole4}${i18n_lang.adminRole5}`"
      :width="600"
      :styles="{ top: '20px' }"
    >
      <Spin v-if="loading.edit" size="large" fix></Spin>
      <Form
        v-if="visible.modal"
        ref="editForm"
        label-position="top"
        :model="editInfo"
        :rules="ruleValidate"
      >
        <FormItem :label="i18n_lang.adminRole6" prop="role">
          <Input v-model="editInfo.role" />
        </FormItem>
        <FormItem :label="i18n_lang.adminRole7">
          <Tree ref="tree" :data="editInfo.authTree" show-checkbox></Tree>
        </FormItem>
        <FormItem :label="i18n_lang.adminRole8">
          <Checkbox v-model="editInfo.user.true_name">{{i18n_lang.adminRole9}}</Checkbox>
          <Checkbox v-model="editInfo.user.bank_card">{{i18n_lang.adminRole10}}</Checkbox>
          <Checkbox v-model="editInfo.user.address_book">{{i18n_lang.adminRole11}}</Checkbox>
          <Checkbox v-model="editInfo.user.kefu_phone">{{i18n_lang.adminRole25}}</Checkbox>
        </FormItem>
        <FormItem :label="i18n_lang.adminRole12">
          <RadioGroup v-model="editInfo.user_search_switch">
            <Radio label="false">{{i18n_lang.adminRole13}}</Radio>
            <Radio label="true">{{i18n_lang.adminRole14}}</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.edit" @click="save">{{i18n_lang.adminRole15}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import columns from './columns.js'

const initQuery = {
  role: ''
}

const initEdit = {
  id: '',
  role: '',
  authTree: [],
  user_search_switch: 'false',
  user: {
    address_book: '',
    bank_card: '',
    true_name: '',
    kefu_phone: ''
  }
}

export default {
  data() {
    const i18n_lang = this.$t('adminRole');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        edit: false
      },
      visible: {
        modal: false
      },
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      query: { initQuery },
      columns: columns(this),
      dataSource: [],
      emptyAuthTree: [],
      editInfo: { ...initEdit },
      editType: 'add',
      ruleValidate: {
        role: [{ required: true, message: i18n_lang.adminRole16 }]
      }
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
      this.page.currentPage = i
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/admin/role',
        method: 'GET',
        params: {
          page: this.page.currentPage,
          page_size: this.page.pageSize,
          ...this.query
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
    // 删除角色
    async handleDetele(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/admin/role/edit/${row.id}`,
        method: 'DELETE'
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    },
    async handleOpenModal(row) {
      this.editType = row ? 'edit' : 'add'
      if (row) {
        await this.getItem(row)
      } else {
        await this.getEmpty()
      }
      this.visible.modal = true
    },
    // 获取空的auth规则
    async getEmpty() {
      if (this.emptyAuthTree.length) {
        this.editInfo = Object.assign({}, initEdit)
        this.editInfo.authTree = JSON.parse(JSON.stringify(this.emptyAuthTree))
      } else {
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/admin/role/edit',
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
        this.editInfo = { ...res.data }
        this.editInfo.user_search_switch = this.editInfo.user_search_switch ? 'true' : 'false'
        this.editInfo.authTree = res.data.auth
        this.emptyAuthTree = res.data.auth
      }
    },
    // 获取单个权限
    async getItem(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/admin/role/edit/${row.id}`,
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
      this.editInfo = { ...res.data }
      this.editInfo.user_search_switch = this.editInfo.user_search_switch ? 'true' : 'false'
      this.editInfo.authTree = res.data.auth
      this.editInfo.role = row.role
      this.editInfo.id = row.id
    },
    // 保存
    async save() {
      this.$refs['editForm'].validate(async valid => {
        if (!valid) return
        this.loading.edit = true
        const auth = this.$refs.tree.getCheckedNodes().map(x => x.id)
        const req = {
          auth: auth.join(','),
          role: this.editInfo.role,
          member_control: this.editInfo.user,
          user_search_switch: this.editInfo.user_search_switch !== 'false'
        }
        const id = this.editType === 'edit' ? this.editInfo.id : ''
        const res = await this.$axios.request({
          url: `/admin/role/edit/${id}`,
          method: this.editType === 'edit' ? 'PUT' : 'POST',
          data: req
        })
        this.loading.edit = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.visible.modal = false
        this.getData()
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
