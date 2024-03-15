<template>
    <div id="AdminList">
      <Spin v-if="loading.page" size="large" fix></Spin>
  
      <!-- query -->
      <Card dis-hover class="query_box" v-auth="497">
        <div class="query_con">
          <div class="item">
            <span>{{'组织名称'}}</span>
            <Input v-model="query.name" placeholder clearable style="width: 140px"/>
          </div>
          <div class="item">
            <span>{{'管理账号'}}</span>
            <Input v-model="query.username" placeholder clearable style="width: 140px"/>
          </div>


          <div class="item">
            <span>{{'状态'}}</span>
            <Select v-model="query.status" :placeholder="i18n_lang.adminList2" style="width: 140px">
              <Option value>{{i18n_lang.adminList3}}</Option>
              <Option :value="0">{{'开启'}}</Option>
              <Option :value="1">{{'停用'}}</Option>
            </Select>
          </div>
          <div class="item">
            <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.adminList6}}</Button>
          </div>
        </div>
      </Card>
  
      <Button type="primary" icon="md-add" v-auth="498" @click="handleOpenModal('add')">{{'新增组织'}}</Button>
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
  
      <!-- 新增 编辑 查看-->
      <Modal
        v-model="dialog.visible"
        :title="dialog.title"
        :width="500"
        @on-cancel="handleCloseModal"
      >
        <Spin v-if="loading.add" size="large" fix></Spin>
        <Form
          ref="dataFormRef"
          :model="formData"
          :label-width="100"
          :rules="formRuleValidate"
        >
          <FormItem :label="'组织名称'" prop="name">
            <Input v-model="formData.name" :disabled="(['add', 'edit'].includes(formType) ? false : true)"/>
          </FormItem>
          <FormItem :label="'后台域名'" prop="login_url">
            <Input v-model="formData.login_url" :disabled="(['add'].includes(formType) ? false : true)" />
          </FormItem>
          <FormItem :label="'组织编号'" prop="name_code">
            <Input v-model="formData.name_code" placeholder="系统自动生成" :disabled="true" />
          </FormItem>
          <FormItem :label="'管理范围'" prop="isTypeDesc">
            <Input v-model="formData.isTypeDesc" placeholder="紧新增组织本身" :disabled="true" />
          </FormItem>
          <FormItem :label="'管理账号'" prop="username">
            <Input v-model="formData.username" placeholder="管理账号" :disabled="true" />
          </FormItem>
          <FormItem :label="'状态'" prop="status">
                <i-switch
                  v-model="formData.status"
                  :true-value="0"
                  :false-value="1"
                  :disabled="(['edit'].includes(formType) ? false : true)"
                >
                </i-switch>
          </FormItem>
        </Form>
        <div v-if="formType === 'delete'">
          <Divider />
          <div class="tips">
            <div>注销条件</div>
            <div>1.当前组织状态为：停用</div>
            <div>2.当前仅系统管理员具有此权限</div>
            <div>3.当前组织无影响注销进程的业务</div>
          </div>
        </div>
        <div slot="footer">
          <Button type="primary" :loading="loading.add" @click="handleSubmit">{{i18n_lang.adminList18}}</Button>
        </div>
      </Modal>
  
      <!-- 复制 -->
      <Modal
        v-model="copyDialog.visible"
        :title="copyDialog.title"
        footer-hide
        @on-cancel="copyDialog.visible = false"
      >
        <Card shadow style="background: #e2e1e2;">
            <div class="card-left">
              <div><span>账号名称：</span><span>{{ organizationInfo.name }}</span></div>
              <div><span>登录账号：</span><span>{{ organizationInfo.username }}</span></div>
              <div><span>登录密码：</span><span>{{ organizationInfo.password }}</span></div>
              <div><span>登录地址：</span><span>获取当前公司的登录地址</span></div>
            </div>
            <div class="card-right">
              <div class="icon-box" @click="doCopy"><Icon type="md-copy" /><span class="mt-1">复制</span></div>
            </div>
        </Card>
        <p class="tips">*7天内可多次查看此信息，请提示使用用户及时自助更改密码</p>
      </Modal>

    </div>
  </template>
  <script>
  import columns from './columns'
  import MoreOptionCheck from '_c/MoreOptionCheck'
  
  const initQuery = {
    page: 1,
    page_size: 10,
    name: '',
    usernam: '',
    status: '',
  }
  
  const initFormData = {
    name_code: '', //组织编号
    name: '', // 组织名称
    username: '', //管理账号
    status: 1, // 状态
    login_url: '', // 后台域名
    isTypeDesc: '', // 管理范围
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
        dialog: {
          visible: false,
          title: ''
        },
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 100, 1000, 2000]
        },
        formData: { ...initFormData },
        roleList: [],
        formType: 'add', // 团队表单类型
        formRuleValidate: {
          name: [{ required: true, message: '请输入' }],
          login_url: [{ required: true, message: '请输入' }],
        },
        // 复制
        copyDialog: {
          visible: false,
          title: '',
        },
        organizationInfo: {
            name: "",
            username: "",
            password: "",
            login_url: "",
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
      // 获取数据
      async getData(i = 1) {
        this.page.currentPage = i
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/group/list',
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
      // 打开 modal
      async handleOpenModal(type, row) {
        this.formType = type;
        this.formData = { ...initFormData }
        if (type === 'add') {
          this.dialog.title = '新增组织';
        } else {
          if (type === 'edit') {
            this.dialog.title = '编辑组织';
          }
          if (type === 'delete') {
            this.dialog.title = '注销组织';
          }
          const { name_code, name, username, status, login_url, isTypeDesc } = row;
          this.formData.name_code = name_code;
          this.formData.name = name;
          this.formData.username = username;
          this.formData.status = status;
          this.formData.login_url = login_url;
          this.formData.isTypeDesc = isTypeDesc;            
        }
        this.dialog.visible = true;
      },
      // 关闭 modal
      handleCloseModal() {
        this.$refs['dataFormRef'].resetFields()
      },
      // 保存新增/编辑
      async handleSubmit() {
        this.$refs['dataFormRef'].validate(async valid => {
          if (valid) {
            this.loading.add = true
            // 新增
            if (this.formType === 'add') {
              const res = await this.$axios.request({
                url: '/group',
                method: 'post',
                data: {
                  name: this.formData.name,
                  login_url: this.formData.login_url
                }
              })
              this.loading.add = false
              this.$msg({
                type: res.status !== 200 ? 'error' : 'success',
                message: res.message
              })
              this.dialog.visible = false;
              this.getData()
            }

            // 编辑
            if (this.formType === 'edit') {
              const res = await this.$axios.request({
                url: '/group/edit',
                method: 'put',
                data: {
                  name_code: this.formData.name_code,
                  name: this.formData.name,
                  status: this.formData.status
                }
              })
              this.loading.add = false
              this.$msg({
                type: res.status !== 200 ? 'error' : 'success',
                message: res.message
              })
              this.dialog.visible = false;
              this.getData()
            }

            // 删除
            if (this.formType === 'delete') {
              const res = await this.$axios.request({
                url: '/group/delete',
                method: 'delete',
                data: {
                  name_code: this.formData.name_code
                }
              })
              this.loading.add = false
              this.$msg({
                type: res.status !== 200 ? 'error' : 'success',
                message: res.message
              })
              this.dialog.visible = false;
              this.getData()
            }


          }
        })
      },
      async handleStop(row) {
        await this.$axios.request({
          url: '/group/status',
          method: 'put',
          data: {
            name_code: row.name_code,
            status: row.status === 1 ? 0 : 1
          }
        }).then(res => {
          this.$msg({
            type: res.status !== 200 ? 'error' : 'success',
            message: res.message
          })
          this.getData()
        })
      },
      // 复制
      handleOpenCopyModal(row) {
        this.organizationInfo.name = row.name;
        this.organizationInfo.username = row.username;
        this.organizationInfo.password = row.password;
        this.organizationInfo.login_url = row.login_url;
        this.copyDialog.visible = true
        this.copyDialog.title = '新增组织成功'
      },
      doCopy() {
        let text = `
          账号名称：${this.organizationInfo.name}
          登录账号：${this.organizationInfo.username}
          登录密码：${this.organizationInfo.password}
          登录地址：${this.organizationInfo.login_url}
        `
        this.$copyText(text).then(e => {
          this.$msg({type: 'success', message: '复制成功'})
        }, e => {
          this.$msg({type: 'error', message: '复制失败'})
        })
      }
    }
  }
  </script>

<style lang="less" scoped>
  .ivu-card-body {
    background: #e2e1e2;
    .card-right {
  
      position: absolute;
      top: 50%;
      right: 10%;
      transform: translateY(-50%);
      .icon-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          cursor: pointer;
      }
    }
  }

  .tips {
    margin: 15px 0 0;
    color: #666;
    font-size: 14px;
  }

</style>