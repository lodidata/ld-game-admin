<template>
    <div id="addAccount">
        <Card style="width:100%" class="query_box">
            <div class="card-head">
                <div class="left">{{ i18n_lang.accountList37 }}</div>
                <div class="right">
                    <Button icon="ios-close" @click="onCancle">{{ i18n_lang.accountList38 }}</Button>
                    <Button type="primary" v-auth="519" icon="ios-add" :loading="loading.add" @click="handleSubmit">{{ i18n_lang.accountList39 }}</Button>


                </div>

            </div>

            <div class="content">

            </div>
        </Card>
        <Card dis-hover class="query_box creat-account">
            <Form ref="dataFormRef" :model="formData" :label-width="100" :rules="formRuleValidate">

                <Row>
                    <Col span="10">
                    <FormItem :label="i18n_lang.accountList40" prop="name">
                        <Input v-model="formData.name" min="2" max="8" />
                    </FormItem>
                    </Col>
                    <Col span="10">
                    <FormItem :label="i18n_lang.accountList41" prop="name">
                        <Input :placeholder="i18n_lang.accountList42" disabled />
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                    <FormItem :label="i18n_lang.accountList42" prop="username">
                        <Input v-model="formData.username" />
                    </FormItem>
                    </Col>
                    <Col span="10">
                    <FormItem :label="i18n_lang.accountList42">
                        <Input :placeholder="i18n_lang.accountList43" disabled />
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                    <FormItem :label="i18n_lang.accountList44" prop="password">

                        <Input v-model.trim="formData.password" type="password" :placeholder="i18n_lang.accountList32" min="8" max="16" />
                    </FormItem>
                    </Col>
                    <Col span="10">
                    <FormItem :label="i18n_lang.accountList45" prop="status">
                        <Switch size="large" v-model="formData.status">
                            <template #open>
                                <span>{{ i18n_lang.accountList4 }}</span>
                            </template>
                            <template #close>
                                <span>{{ i18n_lang.accountList5 }}</span>
                            </template>
                        </Switch>

                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                    <FormItem :label="i18n_lang.accountList46" prop="confirm_password">

                        <Input v-model.trim="formData.confirm_password" type="password" password  :placeholder="i18n_lang.accountList32" min="8" max="16" />
                    </FormItem>
                    </Col>
                    <Col span="10">

                    </Col>
                </Row>
            </Form>


        </Card>
        <!-- 导入弹窗 -->
        <modal title="新增账号成功 !" footer-hide v-model="visible" append-to-body @on-cancel="visible = false">
            <card class="extend-box " style="background: #e2e1e2;">
                <div class="card-left">
                    <div><span>{{ i18n_lang.accountList48 }}</span><span>{{ loginInfo.name }}</span></div>
                    <div><span>{{ i18n_lang.accountList49 }}</span><span>{{ loginInfo.username }}</span></div>
                    <div><span>{{ i18n_lang.accountList50 }}</span><span>{{ loginInfo.password }}</span></div>
                    <div><span>{{ i18n_lang.accountList51 }}</span><span>{{ i18n_lang.accountList52 }}</span></div>
                </div>
                <div class="card-right">
                    <div class="icon-box" @click="onCopy">
                        <Icon type="md-copy" /><span class="mt-1">{{ i18n_lang.accountList54 }}</span>
                    </div>
                </div>
            </card>
            <p class="tips">{{ i18n_lang.accountList53 }}</p>
        </modal>
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
</style>
<script>
export default {

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
        const validateName = (rule, value, callback) => {
            let name = value.trim()
            if (name.length < 2 || name.length > 8) {
                callback(new Error(i18n_lang.accountList55))
            }
            callback()
        }
      
        return {
            visible: false,
            loginInfo: {
                login_url: "",
                name: "",
                password: "",
                username: "",
            },
            formType: 'add',
            id: null,
            loading: {
                add: false
            },
            i18n_lang,
            formRuleValidate: {},
            formData: {
                password: '',
                confirm_password: '',
                name: '',
                username: '',
                status: true
            },
            formRuleValidate: {
                username: [{ required: true, message: i18n_lang.accountList32, trigger: 'blur' }, {
                    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{3,15}$/,
                    message: i18n_lang.accountList56,
                    trigger: 'blur',
                }],
                name: [{ required: true, message: '请输入内容', trigger: 'blur' }, { validator: validateName, trigger: 'blur' }],
                password: [{ required: true, message: '请输入内容', trigger: 'blur' }, {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{7,15}$/,
                    message: i18n_lang.accountList35,
                    trigger: 'blur',
                },],
                confirm_password: [{ required: true, message: '请输入内容', trigger: 'blur' }, {
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


    },
    methods: {
        onCancle() {

            this.$router.push({ name: 'account' })
        },
        onCopy() {
            let text = `
               ${this.i18n_lang.accountList48} ${this.loginInfo.name}
               ${this.i18n_lang.accountList49} ${this.loginInfo.username}
               ${this.i18n_lang.accountList50} ${this.loginInfo.password}
               ${this.i18n_lang.accountList51} ${this.loginInfo.login_url}
            `
            this.$copyText(text).then(e => {
                this.$msg({ type: 'success', message: this.i18n_lang.accountList58 })
            }, e => {
                this.$msg({ type: 'error', message:this.i18n_lang.accountList59 })
            }, e => {
            })

        },
        closeImportDialog() {
            this.visible = false
        },
        // 保存新增/编辑
        async handleSubmit() {

            this.$refs['dataFormRef'].validate(async valid => {
                if (valid) {
                    this.loading.add = true
                    let { confirm_password, name, password, status, username } = this.formData
                    let obj = {
                        confirm_password,
                        name,
                        password,
                        status: status === true ? 1 : 0,
                        username
                    }
                    //this.formData.status = (this.formData.status === true ? 1 : 0);
                    console.log(this.formData)

                    if (this.formType === 'add') {
                        const res = await this.$axios.request({
                            url: '/admin/account',
                            method: 'post',
                            data: obj
                        })
                        this.loading.add = false
                        this.$msg({
                            type: res.status !== 200 ? 'error' : 'success',
                            message: res.message
                        })
                        if (res.state === 10059) {
                            this.loginInfo = res.data
                            this.visible = true
                            this.formData = {
                                password: '',
                                confirm_password: '',
                                name: '',
                                username: '',
                                status: true
                            }
                        }



                    }

                    // // 编辑
                    // if (this.formType === 'edit') {
                    //     const res = await this.$axios.request({
                    //         url: '/group/edit',
                    //         method: 'put',
                    //         data: obj
                    //     })
                    //     this.loading.add = false
                    //     this.$msg({
                    //         type: res.status !== 200 ? 'error' : 'success',
                    //         message: res.message
                    //     })


                    // }

                    // // 删除
                    // if (this.formType === 'delete') {
                    //     const res = await this.$axios.request({
                    //         url: '/group/delete',
                    //         method: 'delete',
                    //         data: {
                    //             name_code: this.formData.name_code
                    //         }
                    //     })
                    //     this.loading.add = false
                    //     this.$msg({
                    //         type: res.status !== 200 ? 'error' : 'success',
                    //         message: res.message
                    //     })


                    // }


                }

            })
        }
    }

}
</script>