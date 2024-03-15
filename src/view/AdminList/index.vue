<template>
  <div id="AdminList">
    <Spin v-if="loading.page" size="large" fix></Spin>

    <!-- query -->
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.adminList0}}</span>
          <Input v-model="query.username" placeholder clearable style="width: 140px"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.adminList1}}</span>
          <Select v-model="query.status" :placeholder="i18n_lang.adminList2" style="width: 140px">
            <Option value>{{i18n_lang.adminList3}}</Option>
            <Option :value="1">{{i18n_lang.adminList4}}</Option>
            <Option :value="0">{{i18n_lang.adminList5}}</Option>
          </Select>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.adminList6}}</Button>
        </div>
      </div>
    </Card>

    <Button type="primary" icon="md-add" @click="handleOpenModal('')">{{i18n_lang.adminList7}}</Button>
    <Table style="margin-top:20px" :columns="columns" :data="dataSource" border></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.adminList46}${page.total}${i18n_lang.adminList47}` }}</div>
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

    <!-- 新增 `${editType === 'add' ? '新增' : '编辑'}管理员`-->
    <Modal
      v-model="visible.add"
      :title="editType === 'add' ? `${i18n_lang.adminList8}${i18n_lang.adminList10}` : `${i18n_lang.adminList9}${i18n_lang.adminList10}`"
      :width="500"
      @on-cancel="handleCloseModal"
    >
      <Spin v-if="loading.add" size="large" fix></Spin>
      <Form
        v-if="visible.add"
        ref="addInfo"
        :model="addInfo"
        :label-width="100"
        :rules="addRuleValidate"
      >
        <FormItem :label="i18n_lang.adminList11" prop="username">
          <Input v-model="addInfo.username" :disabled="editType === 'edit'"/>
        </FormItem>
        <FormItem v-if="editType === 'add'" :label="i18n_lang.adminList12" prop="password">
          <Input v-model="addInfo.password"/>
        </FormItem>
        <FormItem v-if="editType === 'add'" :label="i18n_lang.adminList13" prop="repassword">
          <Input v-model="addInfo.repassword"/>
        </FormItem>
        <FormItem :label="i18n_lang.adminList14" prop="truename">
          <Input v-model="addInfo.truename"/>
        </FormItem>
        <FormItem :label="i18n_lang.adminList15" prop="part">
          <Input v-model="addInfo.part"/>
        </FormItem>
        <FormItem :label="i18n_lang.adminList16" prop="job">
          <Input v-model="addInfo.job"/>
        </FormItem>
        <FormItem :label="i18n_lang.adminList17" prop="role">
          <MoreOptionCheck
            v-model="addInfo.role"
            :option-data="roleList"
            option-label="role"
            option-key="id"
            is-single
          ></MoreOptionCheck>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.add" @click="saveAdmin">{{i18n_lang.adminList18}}</Button>
      </div>
    </Modal>

    <!-- 改密 -->
    <Modal v-model="visible.password" :title="i18n_lang.adminList19" :width="500">
      <Spin v-if="loading.password" size="large" fix></Spin>
      <Tabs v-model="curTab">
        <TabPane :label="`${i18n_lang.adminList48_v_1_2_4_6}`" name="password">
          <Form
            v-if="curTab == 'password'"
            ref="pwInfo"
            :model="pwInfo"
            :label-width="100"
            :rules="PwRuleValidate"
          >
            <FormItem :label="i18n_lang.adminList20" prop="password" v-if="curTab == 'password'">
              <Input v-model="pwInfo.password"/>
            </FormItem>
            <FormItem :label="i18n_lang.adminList21" prop="repassword" v-if="curTab == 'password'">
              <Input v-model="pwInfo.repassword"/>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane  :label="`${i18n_lang.adminList49_v_1_2_4_6}`" name="pin">
          <Form
            v-if="curTab == 'pin'"
            ref="pinInfo"
            :model="pinInfo"
            :label-width="100"
            :rules="PinRuleValidate"
          >
            <FormItem :label="`${i18n_lang.adminList49_v_1_2_4_6}`" prop="pin" v-if="curTab == 'pin'">
              <Input v-model="pinInfo.pin"/>
            </FormItem>
            <FormItem :label="`${i18n_lang.adminList50_v_1_2_4_6}`" prop="pin_pw" v-if="curTab == 'pin'">
              <Input v-model="pinInfo.pin_pw"/>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="primary" :loading="loading.password" @click="changePw">{{i18n_lang.adminList19}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import columns from './columns'
import MoreOptionCheck from '_c/MoreOptionCheck'

const initQuery = {
  username: '',
  status: ''
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
    const i18n_lang = this.$t('adminList');
    return {
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
      roleList: [],
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
    this.getData()
  },
  watch: {
    curTab(){
      this.pwInfo.password = ''
      this.pwInfo.repassword = ''
      this.pinInfo.pin = ''
      this.pinInfo.pin_pw = ''
    }
  },
  methods: {
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 获取数据
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/admin/account',
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
    // 删除
    async handleDelete(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/admin/account/edit/${row.id}`,
        method: 'DELETE'
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
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
    // 保存新增/编辑
    saveAdmin() {
      this.$refs['addInfo'].validate(async valid => {
        if (!valid) return
        this.loading.add = true
        if (this.editType === 'add') {
          this.addAdmin()
        } else {
          this.editAdmin()
        }
      })
    },
    // 新增
    async addAdmin() {
      const req = Object.assign({}, this.addInfo)
      req.role = req.role.join('')
      delete req.repassword

      const res = await this.$axios.request({
        url: '/admin/account/edit',
        method: 'PUT',
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
    handleChangePw(row) {
      this.visible.password = true
      this.pwInfo = { ...row }
      this.pinInfo = { ...initPin }
    },
    // 修改密码
    async changePw() {
      this.$refs[this.curTab == 'pin' ? 'pinInfo' : 'pwInfo'].validate(async valid => {
        if (!valid) return
        this.loading.password = true
        const res = await this.$axios.request({
          url: `/admin/account/edit/${this.pwInfo.id}`,
          method: 'PATCH',
          data: {
            id: this.pwInfo.id,
            'pw-new': this.pwInfo.password,
            'pin_pw': this.pinInfo.pin_pw
          }
        })
        this.loading.password = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.visible.password = false
        this.getData()
      })
    }
  }
}
</script>
