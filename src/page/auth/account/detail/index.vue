<template>
    <div id="addAccount">
        <Card style="width:100%" class="query_box">
            <div class="card-head">
                <div class="left">账号详情</div>
                <div class="right">
                    <Button icon="ios-close" v-auth="524" @click="visible = true"
                        v-if="formData.status === false">注销</Button>
                    <Button type="primary" v-auth="522" icon="ios-add" @click="closeImportDialog">修改密码</Button>


                </div>

            </div>

            <div class="content">

            </div>
        </Card>
        <Card dis-hover class="query_box creat-account">
            <Form ref="dataFormRef" :model="formData" :label-width="100" :rules="formRuleValidate">

                <Row>
                    <Col span="10">
                    <FormItem label="账号名称" prop="name">
                        <Input v-model="formData.name" disabled />
                    </FormItem>
                    </Col>
                    <Col span="10">
                    <FormItem :label="'账号ID'" prop="account_id">
                        <Input placeholder="自动生成" disabled v-model="formData.account_id" />
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                    <FormItem label="登录账号" prop="username">
                        <Input v-model="formData.username" disabled />
                    </FormItem>
                    </Col>
                    <Col span="10">
                    <FormItem label="归属组织">
                        <Input placeholder="当前公司" disabled v-model="formData.group_name" />
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                    <FormItem label="登录密码" prop="password">
                        <Input v-model.trim="formData.password" disabled placeholder="******" min="8" max="16"
                            type="password" />
                    </FormItem>
                    </Col>
                    <Col span="10">
                    <FormItem label="账号状态" prop="status">
                        <Switch v-model="formData.status" disabled>

                        </Switch>

                    </FormItem>
                    </Col>
                </Row>

            </Form>


        </Card>
        <modal v-model="visible" width="360" class-name="vertical-center-modal">

            <div style="text-align:center">
                <p>账号注销后将从平台消失， 且不能恢复。 确认注销此账号吗
                </p>

            </div>
            <div slot="footer">
                <i-button size="large" @click="onCancel">取消</i-button>
                <i-button type="error" size="large" :loading="modal_loading" @click="onDelete">确认删除</i-button>
            </div>
        </modal>
        <modal v-model="modal2" :width="500" height="500" title="重置密码">

            <Form ref="dataFormRefs" :model="formData" :label-width="100" :rules="formRuleValidate">


                <FormItem label="新密码" prop="password">
                    <Input v-model.trim="formData.password" placeholder="请输入内容" min="8" max="16" type="password" />
                </FormItem>



                <FormItem label="重复新密码" prop="confirm_password">
                    <Input v-model.trim="formData.confirm_password" placeholder="请输入内容" min="8" max="16" type="password" />
                </FormItem>


            </Form>
            <div slot="footer">
                <i-button size="large" @click="closeImportDialog">取消</i-button>
                <i-button type="primary" size="large" v-auth="523" :loading="loading.add"
                    @click="handleSubmit">确认修改</i-button>
            </div>
        </modal>
        <Table style="margin-top:20px" :columns="columns" :data="accountList" border></Table>
        <div v-if="page.total > 0" style="padding:10px 0 0; font-size: 16px;text-align: end;">{{
            `${''}${page.total}${''}` }}</div>
        <Page class="page_box" v-if="page.total > 0" show-sizer :current="page.currentPage" :page-size="page.pageSize"
            :page-size-opts="page.pageSizes" :total="page.total" @on-change="onGetDetail"
            @on-page-size-change="changePageSize">
        </Page>
    </div>
</template>
<style lang="less">
.tips {
    margin-top: 10px;
}

.creat-account .ivu-card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
}

.card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.extend-box .ivu-card-body {

    position: relative;

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
</style>
<script>
import { Button} from 'iview'

export default {
    components:{
        Button
    },
    data() {
        const i18n_lang = this.$t('accountList');
        const validatePass2 = (rule, value, callback) => {

            if (value === '') {
                callback(new Error(i18n_lang.accountList16))
            } else if (value !== this.formData.password) {
                callback(new Error(i18n_lang.accountList17))
            } else {
                callback()
            }
            callback()
        }
        
        return {
            modal_loading: false,
            columns: [
                {
                    title: i18n_lang.accountList18,
                    align: 'center',
                    type: "index",
                    minWidth: 100
                },
                {
                    title: i18n_lang.accountList19,
                    align: 'center',
                    key: 'username',
                    minWidth: 100
                },

                {
                    title: i18n_lang.accountList20,
                    align: 'center',
                    key: 'name',
                    minWidth: 100
                },
                {
                    title: i18n_lang.accountList30,
                    align: 'center',
                    key: 'team_name',
                    minWidth: 100
                },

                {
                    title: i18n_lang.accountList27,
                    align: 'center',
                    minWidth: 180,
                    render(h, { row }) {
                        return (
                            <div>
                               
                                 <Button
                                    type='primary'
                                    v-auth={523}
                                    size='small'
                                    style='margin-right:5px'
                                    on-click={_ => Vue.handleView(row.id)}
                                >
                                    {i18n_lang.accountList28}
                                </Button>

                            </div>
                        )
                    }
                }
            ],
            accountList: [],
            total: 0,
            visible: false,
            loginInfo: {
                login_url: "",
                name: "",
                password: "",
                username: "",
            },
            page: {
                pageSize: 20,
                total: 0,
                currentPage: 1,
                pageSizes: [20, 100, 1000, 2000]
            },
            formType: 'add',
            id: null,
            loading: {
                add: false
            },
            i18n_lang,
            modal_loading: false,
            formData: {
                id: '',
                account_id: '',
                name: '',
                username: '',
                group_name: '',
                status: false
            },
            modal2: false,
            deleteId: null,
            formRuleValidate: {

                password: [{ required: true, message: i18n_lang.accountList32, trigger: 'blur' }, {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{7,15}$/,
                    message: i18n_lang.accountList35,
                    trigger: 'blur',
                },],
                confirm_password: [{ required: true, message: i18n_lang.accountList32, trigger: 'blur' }, {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{7,15}$/,
                    message: i18n_lang.accountList35,
                    trigger: 'blur',
                }, { validator: validatePass2, trigger: 'blur' }]

            }

        }
    },
    created() {

        let query = this.$route.query
        this.formType = query.type
        this.id = query.id

        this.onGetDetail()

    },
    methods: {
        onCancel() {
            this.visible = !this.visible
        },

        closeImportDialog() {
            this.modal2 = !this.modal2
        },
        // 设置每页条数
        changePageSize(pageSize) {
            this.page.pageSize = pageSize
            this.onGetDetail()
        },
        async onGetDetail() {
            const res = await this.$axios.request({
                url: `/admin/account/detail/${this.id}`,
                method: 'GET',
                params: {
                    page: this.page.currentPage,
                    page_size: this.page.pageSize,

                }
            })
            if (res.status !== 200) {
                this.$msg({
                    type: 'error',
                    message: res.message
                })
                return
            }
            let { data, attributes } = res
            this.formData.account_id = data.detail.account_id
            this.formData.name = data.detail.name
            this.formData.username = data.detail.username
            this.formData.status = data.detail.status === 1 ? true : false
            this.formData.group_name = data.detail.group_name

            console.log(this.formData)

            this.accountList = data.team
            console.log(this.accountList)
            this.page.total = attributes.total;

        },
        handleView(id) {
            this.$router.push({
                name: 'team',
                query: {
                    id
                }
            })
        },
        async onDelete() {


            this.modal_loading = true
            const res = await this.$axios.request({
                url: `/admin/account/` + this.id,
                method: 'delete',

            })
            this.modal_loading = false
            this.visible = false
            this.$msg({
                type: res.status !== 200 ? 'error' : 'success',
                message: res.message
            })
            this.$router.push({ name: 'account' })
        },

        async handleSubmit() {

            this.$refs['dataFormRefs'].validate(async valid => {
                if (valid) {
                    this.loading.add = true
                    let { confirm_password, name, password, status, username } = this.formData
                    let obj = {
                        confirm_password,

                        password,

                    }



                    const res = await this.$axios.request({
                        url: `/admin/account/pw/${this.id}`,
                        method: 'patch',
                        data: obj

                    })
                    this.loading.add = false
                    this.$msg({
                        type: res.status !== 200 ? 'error' : 'success',
                        message: res.message
                    })
                    this.modal2 = false
                    this.$router.push({ name: 'account' })


                }

            })
        }
    }

}
</script>