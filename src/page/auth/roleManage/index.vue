<template>
  <div id="AdminList">
    <Spin v-if="loading.page" size="large" fix></Spin>

    <!-- query -->
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{ i18n_lang.adminRole29 }}</span>
          <Select v-model="query.group_name_code" clearable :placeholder="i18n_lang.adminList2" style="width: 140px" v-if="group_type !== 0">

            <Option :value="item.group_name_code" :label="item.group_name" :key="item.group_name_code" v-for="(item, i) in roleList">{{ item.group_name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{ i18n_lang.adminRole6 }}</span>
          <Input v-model="query.role" placeholder clearable style="width: 140px" />
        </div>
        <div class="item">
          <span>{{ i18n_lang.adminRole5 }}ID：</span>
          <Input v-model="query.role_code" placeholder clearable style="width: 140px" />
        </div>



        <div class="item" v-auth="512">
          <Button type="primary" icon="ios-search" @click="getData()">{{ i18n_lang.adminRole1 }}</Button>

          <Button type="primary" icon="ios-search" @click="reset()">{{ i18n_lang.adminRole30 }}</Button>
        </div>

      </div>
    </Card>

    <Button type="primary" icon="md-add" v-auth="513" @click="onAddRole">{{ i18n_lang.adminRole2 }}</Button>
    <Table style="margin-top:20px" :columns="columns" :data="dataSource" border></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{
      `${i18n_lang.adminRole26}${page.total}${i18n_lang.adminRole27}` }}</div>
    <Page class="page_box" show-sizer :current="page.currentPage" :page-size="page.pageSize"
      :page-size-opts="page.pageSizes" :total="page.total" @on-change="getData" @on-page-size-change="changePageSize">
    </Page>

    <modal v-model="modal2" width="360" class-name="vertical-center-modal">

      <div style="text-align:center">
        <p>{{ i18n_lang.adminRole37 }}
        </p>

      </div>
      <div slot="footer">
        <i-button size="large" @click="onCancel">{{ i18n_lang.adminRole38 }}</i-button>
        <i-button type="error" size="large" :loading="modal_loading" @click="onDelete">{{ i18n_lang.adminRole39 }}</i-button>
      </div>
    </modal>

  </div>
</template>
<style lang="less">
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>
<script>

//  attributes  group_name_code ===  data group_name_code && is_default  === 0  编辑删除
// attributes group_type === 0 不用展示下拉
import columns from './columns'
import MoreOptionCheck from '_c/MoreOptionCheck'

const initQuery = {
  page: 1,
  page_size: 10,
  group_name_code: '',
  role: '',
  role_code: '',
}

const initAdd = {
  username: '', // 账号
  password: '', // 密码
  repassword: '', // 重复密码
  truename: '', // 姓名
  part: '', // 部门
  job: '', // 职位
  role: [] // 权限
}

const initPw = {
  id: '',
  password: '',
  repassword: '',
}
const initPin = {
  id: '',
  pin: '',
  pin_pw: ''
}
export default {
  components: {
    MoreOptionCheck
  },
  data() {
    const i18n_lang = this.$t('adminRole');
    return {
      group_type: null,
      modal2: false,
      deleteId: 0,
      modal_loading: false,
      group_name_code: "",
      roleList: [],
      i18n_lang: i18n_lang,
      columns: columns(this),
      editType: 'add', // add/edit
      loading: {
        page: false,
        add: false,
        password: false
      },
      query: {
        ...initQuery
      },
      visible: {
        add: false,
        password: false
      },
      dataSource: [],
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      addInfo: { ...initAdd },
      pwInfo: { ...initPw },
      pinInfo: { ...initPin },

      addRuleValidate: {
        username: [{ required: true, message: i18n_lang.adminList22 }],
        password: [{ required: true, message: i18n_lang.adminList23 }],
        truename: [{ required: true, message: i18n_lang.adminList24 }],
        part: [{ required: true, message: i18n_lang.adminList25 }],
        job: [{ required: true, message: i18n_lang.adminList26 }],
        role: [{ required: true, message: i18n_lang.adminList27 }],
        repassword: [
          { required: true, message: i18n_lang.adminList28 },
          {
            validator: (rule, value, cb) =>
              this.addInfo.password === this.addInfo.repassword ? cb() : cb(i18n_lang.adminList29)
          }
        ]
      },
      PwRuleValidate: {
        password: [{ required: true, message: i18n_lang.adminList23 }],
        repassword: [
          { required: true, message: i18n_lang.adminList28 },
          {
            validator: (rule, value, cb) =>
              this.pwInfo.password === this.pwInfo.repassword ? cb() : cb(i18n_lang.adminList29)
          }
        ]
      },
      PinRuleValidate: {
        pin: [{ required: true, message: i18n_lang.adminList23 }],
        pin_pw: [
          { required: true, message: i18n_lang.adminList28 },
          {
            validator: (rule, value, cb) =>
              this.pinInfo.pin === this.pinInfo.pin_pw ? cb() : cb(i18n_lang.adminList29)
          }
        ]
      },
      curTab: 'password'
    }
  },
  created() {
    this.getRoleList()
    this.getData()
  },
  watch: {
    curTab() {
      this.pwInfo.password = ''
      this.pwInfo.repassword = ''
      this.pinInfo.pin = ''
      this.pinInfo.pin_pw = ''
    }
  },
  methods: {
    
    onAddRole(){
      this.$router.push({name:'addRole', query:{type:"add"}})
    },
    handleView(row, type){
      this.$router.push({name:'addRole', query:{type, id: row.id, role: row.role}})
    },
    reset() {
      this.query = { ...initQuery }
      this.getData()
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 获取角色下拉数据
    async getRoleList() {

      const res = await this.$axios.request({
        url: '/group/basics',
        method: 'GET',

      })

      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }

      this.roleList = res.data
    },
    // 获取数据 /group/basics
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
      //this.query.group_name_code = res.attributes.group_name_code
      this.group_type = res.attributes.group_type
      this.group_name_code = res.attributes.group_name_code
    },
    // 启用/停用
    async handleStop(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/admin/account/edit/${row.id}`,
        method: 'PATCH',
        data: {
          state: row.status === 1 ? 0 : 1
        }
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData(this.page.currentPage)
    },
    handleDelete(row) {
      this.modal2 = true
      this.deleteId = row.id
    },
    onCancel() {
      this.modal2 = false
      this.deleteId = null
    },
    // 删除
    async onDelete() {
      this.modal_loading = true
      const res = await this.$axios.request({
        url: `/admin/role/edit/${this.deleteId}`,
        method: 'DELETE'
      })
      this.modal_loading = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      this.modal2 = false
      if (res.status !== 200) return
      this.getData(this.page.currentPage)
    },
    // 获取所有管理员角色
    async getRole() {
      const res = await this.$axios.request({
        url: '/admin/role',
        method: 'GET',
        params: {
          page: 1,
          page_size: 100
        }
      })
      this.roleList = res.data
    },
    // 打开 modal
    async handleOpenModal(row) {
      this.editType = row ? 'edit' : 'add'
      this.visible.add = true
      if (!this.roleList.length) {
        this.loading.add = true
        await this.getRole()
        this.loading.add = false
      }
      if (row) {
        this.addInfo = { ...row }
        this.addInfo.role = [this.addInfo.role_id]
        if (!this.addInfo.role_id) this.addInfo.role = []
      } else {
        this.addInfo = { ...initAdd }
      }
    },
    // 关闭 modal
    handleCloseModal() {
      this.$refs['addInfo'].resetFields()
    },
    // // 保存新增/编辑
    // saveAdmin() {
    //   this.$refs['addInfo'].validate(async valid => {
    //     if (!valid) return
    //     this.loading.add = true
    //     if (this.editType === 'add') {
    //       this.addAdmin()
    //     } else {
    //       this.editAdmin()
    //     }
    //   })
    // },
    // // 新增
    // async addAdmin() {
    //   const req = Object.assign({}, this.addInfo)
    //   req.role = req.role.join('')
    //   delete req.repassword

    //   const res = await this.$axios.request({
    //     url: '/admin/account/edit',
    //     method: 'PUT',
    //     data: req
    //   })
    //   this.loading.add = false
    //   this.$msg({
    //     type: res.status !== 200 ? 'error' : 'success',
    //     message: res.message
    //   })
    //   if (res.status !== 200) return
    //   this.visible.add = false
    //   this.getData()
    // },
    // 编辑
    async editAdmin() {
      const req = { ...this.addInfo }
      const id = req.id
      req.role = req.role.join('')
      delete req.repassword
      delete req.role_id
      delete req._index
      delete req._rowKey

      const res = await this.$axios.request({
        url: `/admin/account/edit/${id}`,
        method: 'PATCH',
        data: req
      })
      this.loading.add = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.visible.add = false
      this.getData()
    },
    //
    // handleChangePw(row) {
    //   this.visible.password = true
    //   this.pwInfo = { ...row }
    //   this.pinInfo = { ...initPin }
    // },
    // 修改密码
    // async changePw() {
    //   this.$refs[this.curTab == 'pin' ? 'pinInfo' : 'pwInfo'].validate(async valid => {
    //     if (!valid) return
    //     this.loading.password = true
    //     const res = await this.$axios.request({
    //       url: `/admin/account/edit/${this.pwInfo.id}`,
    //       method: 'PATCH',
    //       data: {
    //         id: this.pwInfo.id,
    //         'pw-new': this.pwInfo.password,
    //         'pin_pw': this.pinInfo.pin_pw
    //       }
    //     })
    //     this.loading.password = false
    //     this.$msg({
    //       type: res.status !== 200 ? 'error' : 'success',
    //       message: res.message
    //     })
    //     if (res.status !== 200) return
    //     this.visible.password = false
    //     this.getData()
    //   })
    // }
  }
}
</script>