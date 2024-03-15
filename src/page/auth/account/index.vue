<template>
    <div id="AdminList">
        <Spin v-if="loading.page" size="large" fix></Spin>

        <!-- query -->
        <Card dis-hover class="query_box">
            <div class="query_con">
                <div class="item" v-auth="526">
                    <span>{{ i18n_lang.accountList0 }}</span>
                    <Select v-model="type" :placeholder="i18n_lang.adminList2" style="width: 140px" @on-change="onChange">

                        <Option :value="1">{{ i18n_lang.accountList1 }}</Option>
                        <Option :value="0">{{ i18n_lang.accountList2 }}</Option>
                    </Select>
                </div>
                <div class="item">
                    <span>{{ i18n_lang.accountList0 }}ID</span>
                    <Input v-model.trim="query.account_id" placeholder clearable style="width: 140px" />
                </div>
                <div class="item">
                    <span>{{ i18n_lang.accountList0 }}</span>
                    <Input v-model.trim="query.username" placeholder clearable style="width: 140px" />
                </div>
                <div class="item">
                    <span>{{ i18n_lang.accountList3 }}</span>
                    <Input v-model.trim="query.name" placeholder clearable style="width: 140px" />
                </div>

                <div class="item">
                    <span>{{ i18n_lang.accountList6 }}</span>
                    <Select v-model="query.status" :placeholder="i18n_lang.adminList2" style="width: 140px">
                        <Option value>{{ i18n_lang.adminList3 }}</Option>
                        <Option :value="1">{{ i18n_lang.accountList4 }}</Option>
                        <Option :value="0">{{ i18n_lang.accountList5 }}</Option>
                    </Select>
                </div>
                <div class="item">
                    <Button type="primary" icon="ios-search" v-auth="518" @click="getData()">{{ i18n_lang.accountList7 }}</Button>

                    <Button type="primary" icon="ios-search" v-auth="518" @click="reset()">{{ i18n_lang.accountList8 }}</Button>
                </div>
            </div>
        </Card>

        <Button type="primary" v-auth="519" icon="md-add" @click="handleOpenModal('add', 0)">{{ i18n_lang.accountList9 }}</Button>
        <Table style="margin-top:20px" :columns="columns" :data="dataSource" border></Table>
        <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{
            `${i18n_lang.accountList12}${page.total}${i18n_lang.accountList13}` }}</div>
        <Page class="page_box" show-sizer :current="page.currentPage" :page-size="page.pageSize"
            :page-size-opts="page.pageSizes" :total="page.total" @on-change="getData" @on-page-size-change="changePageSize">
        </Page>
        <modal v-model="modal2" width="360" class-name="vertical-center-modal">

            <div style="text-align:center">
                <p> {{ i18n_lang.accountList10 }}
                </p>

            </div>
            <div slot="footer">
                <i-button size="large" @click="onCancel">{{ i18n_lang.accountList11 }}</i-button>
                <i-button type="error" size="large" :loading="modal_loading" @click="onDelete">{{ i18n_lang.accountList14 }}</i-button>
            </div>
        </modal>


    </div>
</template>
<style lang="less">
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
        top: 0;
    }
}
</style>
<script>
import columns from './columns'
import MoreOptionCheck from '_c/MoreOptionCheck'
import { mapState } from 'vuex'

const initQuery = {
    page: 1,
    page_size: 10,
    name: '',
    usernam: '',
    status: '',
    account_id: ''
}

const initFormData = {
    name_code: '', //组织编号
    name: '', // 组织名称
    username: '', //管理账号
    status: 1, // 状态
    login_url: '', // 后台域名
    isTypeDesc: '', // 管理范围
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
        const i18n_lang = this.$t('accountList');
        return {
            type: 1,
            i18n_lang,
            modal2: false,
            modal_loading: false,
            deleteId: null,
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
            pwInfo: { ...initPw },
            pinInfo: { ...initPin },
            roleList: [],
            formType: 'add', // 团队表单类型
           
           
          
            curTab: 'password'
        }
    },
    computed: {
      ...mapState({
        allRoutes: state => state.user.allRoutes
      })
    },
    created() {
        console.log(this.allRoutes,'allRoutes')
        this.getData()
    },
    // watch: {
    //     curTab() {
    //         this.pwInfo.password = ''
    //         this.pwInfo.repassword = ''
    //         this.pinInfo.pin = ''
    //         this.pinInfo.pin_pw = ''
    //     }
    // },
    methods: {

        onChange(value) {

            if (this.type === 1) {
                this.getData()
            } else {
                this.onGetOther()
            }
        },
        handleDelete(row) {
            this.modal2 = true
            this.deleteId = row.id
        },
        // 删除
        async onDelete() {
            this.modal_loading = true
            const res = await this.$axios.request({
                url: `/admin/account/${this.deleteId}`,
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
        onCancel() {
            this.modal2 = false
            this.deleteId = null
        },
        // 设置每页条数
        changePageSize(pageSize) {
            this.page.pageSize = pageSize
            this.getData()
        },
        ///admin/account/otherPlatform 其他平台
        async onGetOther(i = 1) {
            this.page.currentPage = i
            this.loading.page = true
            const res = await this.$axios.request({
                url: '/admin/account/otherPlatform',
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
                url: `/admin/account/status/${row.id}`,
                method: 'PATCH',
                data: {
                    status: row.status === 1 ? 0 : 1
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

        handleOpenModal(type, id) {
            if (type === 'add') {
                this.$router.push({ name: 'addAccount', query: { type: type, id: id } })
            } else {
                this.$router.push({ name: 'detailAccount', query: { type: type, id: id } })
            }

        },
        reset() {
            this.query = { ...initQuery }
            this.getData()
        },
        // 关闭 modal
        handleCloseModal() {
            this.$refs['dataFormRef'].resetFields()
        },
        // // 保存新增/编辑
        // async handleSubmit() {
        //     this.$refs['dataFormRef'].validate(async valid => {
        //         if (valid) {
        //             this.loading.add = true
        //             // 新增
        //             if (this.formType === 'add') {
        //                 const res = await this.$axios.request({
        //                     url: '/group',
        //                     method: 'post',
        //                     data: {
        //                         name: this.formData.name,
        //                         login_url: this.formData.login_url
        //                     }
        //                 })
        //                 this.loading.add = false
        //                 this.$msg({
        //                     type: res.status !== 200 ? 'error' : 'success',
        //                     message: res.message
        //                 })
        //                 this.dialog.visible = false;
        //                 this.getData()
        //             }

        //             // 编辑
        //             if (this.formType === 'edit') {
        //                 const res = await this.$axios.request({
        //                     url: '/group/edit',
        //                     method: 'put',
        //                     data: {
        //                         name_code: this.formData.name_code,
        //                         name: this.formData.name,
        //                         status: this.formData.status
        //                     }
        //                 })
        //                 this.loading.add = false
        //                 this.$msg({
        //                     type: res.status !== 200 ? 'error' : 'success',
        //                     message: res.message
        //                 })
        //                 this.dialog.visible = false;
        //                 this.getData()
        //             }

        //             // 删除
        //             if (this.formType === 'delete') {
        //                 const res = await this.$axios.request({
        //                     url: '/group/delete',
        //                     method: 'delete',
        //                     data: {
        //                         name_code: this.formData.name_code
        //                     }
        //                 })
        //                 this.loading.add = false
        //                 this.$msg({
        //                     type: res.status !== 200 ? 'error' : 'success',
        //                     message: res.message
        //                 })
        //                 this.dialog.visible = false;
        //                 this.getData()
        //             }


        //         }
        //     })




        //     // this.$refs['dataFormRef'].validate(async valid => {
        //     //   if (!valid) return
        //     //   this.loading.add = true
        //     //   if (this.editType === 'add') {
        //     //     this.addAdmin()
        //     //   } else {
        //     //     this.editAdmin()
        //     //   }
        //     // })
        // },
        // 新增
        async addAdmin() {
            // const req = Object.assign({}, this.addInfo)
            // req.role = req.role.join('')
            // delete req.repassword

            // const res = await this.$axios.request({
            //   url: '/admin/account/edit',
            //   method: 'PUT',
            //   data: req
            // })
            // this.loading.add = false
            // this.$msg({
            //   type: res.status !== 200 ? 'error' : 'success',
            //   message: res.message
            // })
            // if (res.status !== 200) return
            // this.visible.add = false
            // this.getData()
        },
        // 编辑
        async editAdmin() {
            // const req = { ...this.addInfo }
            // const id = req.id
            // req.role = req.role.join('')
            // delete req.repassword
            // delete req.role_id
            // delete req._index
            // delete req._rowKey

            // const res = await this.$axios.request({
            //   url: `/admin/account/edit/${id}`,
            //   method: 'PATCH',
            //   data: req
            // })
            // this.loading.add = false
            // this.$msg({
            //   type: res.status !== 200 ? 'error' : 'success',
            //   message: res.message
            // })
            // if (res.status !== 200) return
            // this.visible.add = false
            // this.getData()
        },
        //
        // handleChangePw(row) {
        //   this.visible.password = true
        //   this.pwInfo = { ...row }
        //   this.pinInfo = { ...initPin }
        // },
        // 修改密码
        async changePw() {
            // this.$refs[this.curTab == 'pin' ? 'pinInfo' : 'pwInfo'].validate(async valid => {
            //   if (!valid) return
            //   this.loading.password = true
            //   const res = await this.$axios.request({
            //     url: `/admin/account/edit/${this.pwInfo.id}`,
            //     method: 'PATCH',
            //     data: {
            //       id: this.pwInfo.id,
            //       'pw-new': this.pwInfo.password,
            //       'pin_pw': this.pinInfo.pin_pw
            //     }
            //   })
            //   this.loading.password = false
            //   this.$msg({
            //     type: res.status !== 200 ? 'error' : 'success',
            //     message: res.message
            //   })
            //   if (res.status !== 200) return
            //   this.visible.password = false
            //   this.getData()
            // })
        }
    }
}
</script>