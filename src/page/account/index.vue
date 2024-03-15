<template>
    <div id="Account">
      <Spin fix v-if="loading.page"></Spin>
      <Card dis-hover class="query_box">
        <div class="query_con mb30">
          <div class="item">
            <span>管理员账号</span>
            <Input v-model="query.admin_name" style="width:120px;"/>
          </div>
          <div class="item">
            <span>状态</span>
            <Select v-model="query.status" style="width:100px">
              <Option value>全部</Option>
              <Option :value="item.id" v-for="(item,i) in stateList" :key="i">{{item.name}}</Option>
            </Select>
          </div>
          <div class="query_btns">
            <Button type="primary" @click="getData()">查询</Button>
            <Button type="primary" @click="reset">重置</Button>
          </div>
        </div>
      </Card>
      <div style="display: flex; justify-content: flex-end;">
        <Button type="primary" v-auth="50" @click="addAccount('add')">新增</Button>
      </div>
      <div style="marginTop:10px">
        <Table :columns="columns" :data="dataSource" border></Table>
        <Page
          class="page_box"
          :current="page.page"
          :page-size="page.page_size"
          :total="page.total"
          show-sizer
          @on-change="getData"
          @on-page-size-change="changepage_size"
          placement="top"
        ></Page>
      </div>

      <!-- 新增/编辑 -->
      <!-- 新增 `${editType === 'add' ? '新增' : '编辑'}管理员`-->
    <Modal
      v-model="visible.addModel"
      :title="editType === 'add' ? `添加` : `编辑`"
      :width="500"
      :mask-closable="false"
      @on-cancel="visible.addModel = false"
    >
      <Spin v-if="loading.addModel" size="large" fix></Spin>
      <Form
        v-if="visible.addModel"
        ref="addForm"
        :model="addForm"
        :label-width="100"
        :rules="addRuleValidate"
      >
        <FormItem :label="'账号'" prop="admin_name">
          <Input v-model="addForm.admin_name" :disabled="editType === 'edit'"/>
        </FormItem>
        <FormItem v-if="editType === 'add'" :label="'密码'" prop="password">
          <Input v-model="addForm.password"/>
        </FormItem>
        <FormItem v-if="editType === 'add'" :label="'确认密码'" prop="password_confirm">
          <Input v-model="addForm.password_confirm"/>
        </FormItem>
        <FormItem :label="'姓名'" prop="real_name">
          <Input v-model="addForm.real_name"/>
        </FormItem>
        <FormItem :label="'部门'" prop="department">
          <Input v-model="addForm.department"/>
        </FormItem>
        <FormItem :label="'职位'" prop="position">
          <Input v-model="addForm.position"/>
        </FormItem>
        <FormItem :label="'角色权限'" prop="role_id">
          <MoreOptionCheck
            v-model="addForm.role_id"
            :option-data="roleList"
            option-label="role_name"
            option-key="id"
            is-single
          ></MoreOptionCheck>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.addBtn" @click="save">确定</Button>
      </div>
    </Modal>

    <!-- 改密 -->
    <Modal v-model="visible.password" :title="'改密'" :width="500">
      <Spin v-if="loading.password" size="large" fix></Spin>
          <Form
            ref="pwInfo"
            :model="pwInfo"
            :label-width="100"
            :rules="PwRuleValidate"
          >
            <FormItem :label="'新密码'" prop="new_password">
              <Input v-model="pwInfo.new_password" type="password"/>
            </FormItem>
            <FormItem :label="'确认密码'" prop="new_password_confirm">
              <Input v-model="pwInfo.new_password_confirm" type="password"/>
            </FormItem>
          </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.password" @click="changePw">修改密码</Button>
      </div>
    </Modal>

    </div>
  </template>
  
  <script>
  import columns from './columns.js'
  import MoreOptionCheck from '../../components/MoreOptionCheck'
  // import { computeDay } from '@/helper/tool/handleDate'
  let initData = {
    admin_name: '', // 账号
    password: '', // 密码
    password_confirm: '', // 重复密码
    real_name: '', // 姓名
    position: '', // 部门
    department: '', // 职位
    role_id: [] // 权限
  }
  const initPw = {
    id: '',
    new_password: '',
    new_password_confirm: '',
  }
  export default {
    components: {
      MoreOptionCheck
    },
    data () {
      return {
        loading: {
          page: 0,
          addBtn: false,
          password: false
        },
        visible: {
          addModel: false,
          password: false
        },
        columns: columns(this),
        dataSource: [],
        page: {
          page_size: 10,
          total: 0,
          page: 1
        },
        query: {
          admin_name: '',
          status: '',
        },
        dataValue: [, ], // 默认日期
        options: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now() - 86400000
          }
        },
        roleList: [],
        stateList: [{ id: 1, name: '启用' }, { id: 0, name: '停用' }], // 状态数据
        addForm: {...initData},
        editType: 'add', // 修改类型
        addRuleValidate: {
            admin_name: [{ required: true, message: '请输入' }],
            password: [{ required: true, message: '请输入'  }],
            real_name: [{ required: true, message: '请输入'  }],
            position: [{ required: true, message: '请输入'  }],
            department: [{ required: true, message: '请输入'  }],
            role_id: [{ required: true, message: '请选择'  }],
            password_confirm: [
                { required: true, message: '请输入'  },
                {
                    validator: (rule, value, cb) =>
                    this.addForm.password === this.addForm.password_confirm ? cb() : cb('请输入')
                }
            ]
        },
        pwInfo: { ...initPw },
        PwRuleValidate: {
            new_password: [{ required: true, message:  '请输入'}],
            new_password_confirm: [
            { required: true, message: '请输入' },
            {
                validator: (rule, value, cb) =>
                this.pwInfo.new_password === this.pwInfo.new_password_confirm ? cb() : cb('请确认两次输入的密码一样')
            }
            ]
        },
      }
    },
    created () {
      this.getData()
      this.getRole()
    },
    methods: {
      // 添加用户弹框
      async addAccount (type) {
        this.editType = type
        this.visible.addModel = true
        this.addForm = Object.assign({}, initData)
      },
      // 保存用户信息
      async save () {
        // this.loading.addBtn = true
        this.$refs['addForm'].validate(async valid => {
          // this.loading.addBtn = false
          if (valid) {
            if (this.editType === 'add') {
              this.add()
            } else if (this.editType === 'edit') {
              this.editData()
            } else {
              this.update()
            }
          }
        })
      },
      // 新增接口
      async add () {
        const { role_id, ...rest } = this.addForm;
        this.loading.addBtn = true
        let res = await this.$axios.request({
          url: `/admin`,
          method: 'post',
          data: {
            ...rest,
            role_id: role_id[0]
          }
        })
        if (res.state !== 0) {
          this.$Message.error(res.message)
          this.loading.addBtn = false
        } else {
          this.$Message.success(res.message)
          this.visible.addModel = false
          this.loading.addBtn = false
          this.getData()
        }
      },
  
      // 编辑接口
      async editData () {
        // const role = this.addForm.role
        const { id, real_name, position, department, role_id } = this.addForm;
        this.loading.addBtn = true
        const res = await this.$axios.request({
          url: `/admin/${id}`,
          method: 'PUT',
          data: {
            real_name,
            position,
            department,
            role_id: role_id[0]
          }
        })
        if (res.state !== 0) {
          this.$Message.success(res.message)
          this.loading.addBtn = false
          return
        }
        this.visible.addModel = false
        this.loading.addBtn = false
        this.$Message.success('编辑成功')
        this.getData()
      },
  
      // 改密接口
      async changePw() {
        this.$refs['pwInfo'].validate(async valid => {
            if (!valid) return
            this.loading.password = true
            let res = await this.$axios.request({
              url: `/admin/password/${this.pwInfo.id}`,
              method: 'put',
              data: {
                ...this.pwInfo,
                type: 2
              }
            })
            if (res.state !== 0) {
              this.$Message.error(res.message)
              this.loading.password = false
            } else {
              this.$Message.success(res.message)
              this.visible.password = false
              this.loading.password = false
              this.getData()
            }
        })
       
      },
      async getData (i = 1) {
        this.page.page = i
        this.loading.page++
        let query = {
          page: this.page.page,
          page_size: this.page.page_size,
          ...this.query
        }
        const res = await this.$axios.request({
          url: '/admin',
          method: 'get',
          params: query
        })
        if (res.state !== 0) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
        this.dataSource = res.data
        this.loading.page--
      },
      // 获取所有管理员角色
      async getRole () {
        let res = await this.$axios.request({
            url: `/common/select/admin/role`,
            method: 'get',
        })
        if (res.state !== 0) {
          this.$Message.success(res.message)
          return
        }
        if (res.data.length) {
            this.roleList = res.data
        }
      },
      // 启用停用
      async handleStop(row){
      let res = await this.$axios.request({
        url: `/admin/${row.id}`,
        method: 'patch',
      })
      if (res.state !== 0) {
        this.$Message.error(res.message)
      } else {
        this.$Message.error(res.message)
        this.getData()
      }
    },
  
      // 编辑/改密
      async handleEdit (row, type) {
        if (type === 'password') {
            this.visible.password = true
            this.pwInfo = { ...initPw }
            this.pwInfo.id = row.id
        } else {
            this.editType = type
            this.visible.addModel = true
            this.addForm = Object.assign({}, initData)
            this.addForm.id = row.id
            this.addForm.admin_name = row.admin_name
            this.addForm.real_name = row.real_name
            this.addForm.position = row.position
            this.addForm.department = row.department
            this.addForm.role_id = [row.role_id]
        }
      },  
      // 删除
      async handleDelete (row) { 
        let res = await this.$axios.request({
          url: `/admin/${row.id}`,
          method: 'delete'
        })
        if (res.state !== 0) {
          this.$Message.error(res.message)
        } else {
          this.$Message.success(res.message)
          this.getData()
        }
      },
      reset () {
        this.query = {
          admin_name: '',
          status: ''
        }
        this.getData()
      },
      // 设置每页条数
      changepage_size (page_size) {
        this.page.page_size = page_size
        this.getData()
      },
      // 翻页
      // changePage (val) {
      //   this.page.page = val
      //   this.getData()
      // },
      // 选择日期
      handleChangeDate (val) {
        [this.query.start_date, this.query.end_date] = val
      },
      chnageLimitRecharge(val) {
        console.log(val)
      }
    }
  }
  </script>
  
  <style>
  </style>