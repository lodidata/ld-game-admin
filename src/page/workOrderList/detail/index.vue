<template>
    <div id="workOrderDetail">
        <Card dis-hover class="operate_box">
            <div class="left-c"></div>
            <Row>
                <Col span="12" style="font-size: 20px; line-height: 30px;">工单详情</Col>
                <Col span="12" style="display: flex; justify-content: right;">
                    <Button type="default" @click="$router.push({path:'/workOrderList'})" style="margin-right: 5px;">返回上一页</Button>
                </Col>
            </Row>
        </Card>
        <Card dis-hover>
            <div> 
                <Tag size="large">ID：{{ detail.id }}</Tag>
                <span style="margin: 0 10px;">{{ detail.title }}</span>
                <Tag size="large">{{ detail.status_str }}</Tag>
            </div>

            <div class="detail-b">
                <Card>
                    <template #title>描述</template>
                    <div v-html="detail.description "></div>
                </Card>
            </div>

            <div class="detail-b">
                <Card>
                    <template #title>附件</template>
                    <div v-for="item in detail.appendix">
                        <span>{{ item.appendix_name }}</span>
                        <Button type="text" style="margin-left;: 20px" @click="download(item)">下载</Button>
                    </div>
                </Card>
            </div>

            <div class="detail-b">
                <Card>
                    <template #title>
                        <div class="flex justify-content">
                            <span style="line-height: 30px;">历史记录</span>
                            <Button type="text" @click="addRemark">添加备注</Button>
                        </div>
                    </template>
                    <div v-for="item in detail.history_record">
                        <div>
                            {{ item.created_at }} {{ item.reply_admin_name }} {{ item.type_str }}
                        </div>
                        <div v-if="item.remark" class="detail-remark">
                            <div v-html="item.remark"></div>
                        </div>
                        <div v-if="item.appendix.length" class="detail-appendix">
                            <div v-for="item in item.appendix">
                                <span>{{ item.appendix_name }}</span>
                                <Button type="text" style="margin-left;: 20px" @click="download(item)">下载</Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <!-- 编辑备注 -->

            <Modal
                :title="'添加备注'"
                v-model="visible.remarkModel"
                :width="730"
                :mask-closable="false"
                @on-cancel="visible.remarkModel = false"
            >
                <div id="myEditRemark" style="width:700px;"></div>
                <div slot="footer">
                    <Button type="primary" :loading="loading.remarkBtn" @click="saveRemark">确认</Button>
                </div>
            </Modal>


            <!-- 更改状态 -->
            <Modal
                :title="row_title"
                v-model="visible.addModel"
                :width="850"
                :mask-closable="false"
                @on-cancel="visible.addModel = false"
            >

                <Form :label-width="80" style="width:700px;">
                <FormItem label="处理" prop="title">
                    <Input v-model="handleType_str" :disabled="true" style="width:500px;" />
                </FormItem>
                <FormItem label="备注" prop="description">
                    <div id="myEdit" style="width:700px;"></div>
                </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="primary" :loading="loading.addBtn" @click="saveStatus">确认</Button>
                </div>
            </Modal>


            <!-- 状态框 -->
            <div class="status-action">
                <div class="status—box">
                    <Button v-if="detail.button_permission_list.confirm" type="text" @click="handleStatus(2, '确认')">确认</Button>
                    <Button v-if="detail.button_permission_list.solve" type="text" @click="handleStatus(3, '解决')">解决</Button>
                    <Button v-if="detail.button_permission_list.close" type="text" @click="handleStatus(4, '关闭')">关闭</Button>
                    <Button v-if="detail.button_permission_list.activated" type="text" @click="handleStatus(5, '激活')">激活</Button>
                    <Button type="text" @click="$router.push({path:'/workOrderList/addWorkOrder', query: {id: id}})">编辑</Button>
                </div>
            </div>


        </Card>
    </div>
</template>

<script>
import Editor from 'wangeditor'
export default {
    data() {
        return {
            visible: {
                addModel: false,
                remarkModel: false,
            },
            loading: {
                addBtn: false,
                remarkBtn: false,
            },
            remarkForm: {
                description: '',
            },
            agentList: [],
            menuList: [],
            currencyList: [],
            id: '',
            ruleValidateAdd: {
                title: [{required: true, message: '请选择'}],
                // description: [{required: true, message: '请输入'}],
            },
            editor: null, // 富文本
            fileData: {
                base64: this.value || null,
                formData: null,
                fileName: '',
                file: this.value || null
            },
            detail: {
                id: '',
                title: '',
                status: '',
                status_str: '',
                description: '',
                appendix: [],
                history_record: [],
                button_permission_list: {
                    activated: false,
                    close: false,
                    confirm: false,
                    solve: false
                }
            },
            addForm: {
                remark: ''
            },
            handleType_str: '',
            row_status: '',
            row_title: ''
        }
    },
    computed: {
        status_label() {

        }
    },
    mounted() {
        this.id = this.$route.query.id;

        // this.getAgentList()

        // 编辑查询详情
        if (this.id) {
            this.getDetail()
        }

        // 备注框
        this.editor = new Editor(`#myEditRemark`)
        this.editor.customConfig = this.editor.customConfig ? this.editor.customConfig : this.editor.config;
        this.editor.customConfig.pasteFilterStyle = false
        this.editor.customConfig.pasteIgnoreImg = true
        this.editor.customConfig.customUploadImg = async (files, insert) => {
            let imgUrl
            this.fileData.formData = new FormData()
            this.fileData.formData.append('file', files[0])
            this.fileData.formData.append('name', files[0].name)
            const res = await this.$axios.request({
                url: `/common/upload`,
                method: 'POST',
                data: this.fileData.formData
            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
            } else {
                imgUrl = res.data.url
            }
            insert(imgUrl)
        }
        this.editor.customConfig.onchange = html => {
            this.remarkForm.description = html.replace(/<\/?o:p[^>]*>/gi,'')
        }
        this.editor.customConfig.pasteTextHandle = pasteStr => {
            return pasteStr
        }
        this.editor.customConfig.onchangeTimeout = this.changeInterval
        // create这个方法一定要在所有配置项之后调用
        this.editor.create()
        this.editor.txt.html(this.remarkForm.description)

        // 更改状态
        this.editor = new Editor(`#myEdit`)
        this.editor.customConfig = this.editor.customConfig ? this.editor.customConfig : this.editor.config;
        this.editor.customConfig.pasteFilterStyle = false
        this.editor.customConfig.pasteIgnoreImg = true
        this.editor.customConfig.customUploadImg = async (files, insert) => {
            let imgUrl
            this.fileData.formData = new FormData()
            this.fileData.formData.append('file', files[0])
            this.fileData.formData.append('name', files[0].name)
            const res = await this.$axios.request({
                url: `/common/upload`,
                method: 'POST',
                data: this.fileData.formData
            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
            } else {
                imgUrl = res.data.url
            }
            insert(imgUrl)
        }
        this.editor.customConfig.onchange = html => {
            this.addForm.remark = html.replace(/<\/?o:p[^>]*>/gi,'')
        }
        this.editor.customConfig.pasteTextHandle = pasteStr => {
            return pasteStr
        }
        this.editor.customConfig.onchangeTimeout = this.changeInterval
        // create这个方法一定要在所有配置项之后调用
        this.editor.create()
        this.editor.txt.html(this.addForm.remark)

    },
    methods: {
        // 详情
        async getDetail() {
            let res = await this.$axios.request( {
                url: `/work/order/detail/${this.id}`,
                method: 'get',
            })
            if (res.state !== 0) {
                his.$Message.error(res.message)
            } else {
                const { id, title, status_str, description, appendix, history_record, status, button_permission_list } = res.data
                this.detail.id = id
                this.detail.title = title
                this.detail.status = status
                this.detail.status_str = status_str
                this.detail.description = description
                this.detail.appendix = appendix
                this.detail.history_record = history_record

                this.detail.button_permission_list.activated = button_permission_list.activated
                this.detail.button_permission_list.close = button_permission_list.close
                this.detail.button_permission_list.confirm = button_permission_list.confirm
                this.detail.button_permission_list.solve = button_permission_list.solve
            }
        },
        cancel() {
            this.$router.push({path:'/workOrderList'})
        },
        addRemark() {
            this.remarkForm.description = ''
            this.editor.txt.html(this.remarkForm.description)
            this.visible.remarkModel = true
        },
        async saveRemark() {
            if(!this.remarkForm.description) return this.$msg({ type: 'error', message: '备注不能为空' })

            this.loading.remarkBtn = true
            const res = await this.$axios.request({
                url: `/work/order/record`,
                method: 'POST',
                data: {
                    work_order_id: this.id,
                    remark: this.remarkForm.description
                }
            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
                this.loading.remarkBtn = false
            } else {
                this.$Message.success(res.message)
                this.loading.remarkBtn = false
                this.visible.remarkModel = false
                this.getDetail()
            }
        },
        download(obj) {
            window.open(obj.appendix_url)
        },
  
        async handleStatus(status, str) {
            this.visible.addModel = true

            this.handleType_str = str
            this.addForm.remark = ''
            this.editor.txt.html(this.addForm.remark)
            this.row_status = status
            this.row_title = this.detail.id + ':' + this.detail.title
            
        },

        async saveStatus() {
            this.loading.addBtn = true
            let res = await this.$axios.request( {
                url: `/work/order/${this.id}`,
                method: 'patch',
                data: {
                    status: this.row_status,
                    remark: this.addForm.remark,
                }
            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
                this.loading.addBtn = false
            } else {
                this.$Message.success(res.message)
                this.loading.addBtn = false
                this.visible.addModel = false
                this.getDetail()
            }
        }


    }
}
</script>
<style lang="less" scoped>
#workOrderDetail {
    padding-bottom: 30px;
    .operate_box {
        // margin-bottom: 10px;
        .left-c {
            position: absolute;
            width: 5px;
            height: 100%;
            background: #2d8cf0;
            left: 0px;
            top: 0px;
        }
    }
    .detail-b {
        margin-top: 30px;
        width: 800px;
    }
    .detail-remark {
        margin: 10px 0 10px 50px;
        border: 1px solid #e8eaec;
        background: #f2f3f5;
        border-radius: 10px;
        padding: 10px;
    }
    .detail-appendix {
        margin: 10px 0 10px 50px;
    }
    .status-action {
        position: fixed;
        bottom: 10px;
        width: 800px;
        text-align: center;
        padding: 20px 0 0 0;
        .status—box {
            // display: flex;
            // justify-content: space-between;
            display: inline-block;
            padding: 0 30px;
            // width: 500px;
            height: 40px;
            background: #717171;
            background-color: rgba(90,90,90,.85);
            border-radius: 5px;
            >button {
                font-size: 14px;
                font-weight: bold;
                color: #fff;
                height: 40px;
                &:hover {
                    color: #2d8cf0;
                }
            }
        }
    }
}
</style>