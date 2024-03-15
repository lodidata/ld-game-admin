<template>
    <div id="addBill">
        <Card dis-hover class="operate_box">
            <div class="left-c"></div>
            <Row>
                <Col span="12" style="font-size: 20px; line-height: 30px;">{{ id ? '编辑工单' : '新增工单' }}</Col>
                <Col span="12" style="display: flex; justify-content: right;">
                </Col>
            </Row>
        </Card>
        <Card dis-hover>
            <Form :model="addForm" :label-width="80" style="width:700px;" ref="addForm" :rules="ruleValidateAdd">
                <FormItem label="标题" prop="title">
                    <Input v-model="addForm.title" style="width:500px;" placeholder="请输入工单标题，最多50个字符" />
                </FormItem>

                <FormItem label="描述" prop="description">
                    <div id="myEdit" style="width:700px;"></div>
                </FormItem>

                <FormItem label="附件" prop="appendix">
                    <Upload
                        :disabled="fileDataList.length >= 5"
                        multiple
                        :before-upload="handleUpload"
                        action>
                        <Button icon="ios-cloud-upload-outline" :disabled="fileDataList.length >= 5">添加文件</Button>
                        <span>(不超过50m，最多上传五份文件)</span>
                    </Upload>
                    <!-- <div v-if="fileData.formData !== null">Upload file: {{ fileData.fileName }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div> -->
                    <div v-for="(item, index) in fileDataList" :key="index">
                        <span>{{ item.fileName }}</span>
                        <Button v-if="!item.file_path" type="text" size="small" @click="upload(index)">上传</Button>
                        <Button type="text" size="small" @click="deleteFile(index)">删除</Button>
                    </div>

                    <FormItem style="margin-top: 50px; display: flex; justify-content: center;">
                        <Button style="margin-right: 30px" @click="cancel">取消</Button>
                        <Button type="primary" :loading="loading.addBtn" @click="save">提交</Button>
                    </FormItem>
                </FormItem>

            </Form>
        </Card>
    </div>
</template>

<script>
import Editor from 'wangeditor'
export default {
    data() {
        return {
            loading: {
                addBtn: false,
            },
            addForm: {
                title: '',
                description: '',
                appendix: ''
            },
            agentList: [],
            menuList: [],
            currencyList: [],
            id: '',
            ruleValidateAdd: {
                title: [{required: true, message: '请输入'}],
                // description: [{required: true, message: '请输入'}],
            },
            editor: null, // 富文本
            file: null,
            loadingStatus: false,
            file_path: '',
            fileData: {
                base64: this.value || null,
                formData: null,
                fileName: '',
                file: this.value || null
            },
            fileDataList: [],
        }
    },
    mounted() {


        this.id = this.$route.query.id;

        // this.getAgentList()

        // // 编辑查询详情
        if (this.id) {
            this.getDetail()
        }


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
            this.addForm.description = html.replace(/<\/?o:p[^>]*>/gi,'')
        }
        this.editor.customConfig.pasteTextHandle = pasteStr => {
            return pasteStr
        }
        this.editor.customConfig.onchangeTimeout = this.changeInterval
        // create这个方法一定要在所有配置项之后调用
        this.editor.create()
        this.editor.txt.html(this.addForm.description)
    },
    methods: {
        handleUpload (file) {
            let fileData = {
                base64: this.value || null,
                formData: null,
                fileName: '',
                file: this.value || null,
                file_path: ''
            }

            fileData.fileName = file.name
            fileData.formData = new FormData()
            fileData.formData.append('file', file)
            fileData.formData.append('name', file.name)


            // 读取文件
            const reader = new FileReader()
            // 读取文件的url
            reader.readAsDataURL(file)
            reader.onload = e => {
                // 读取成功
                // this.fileValue = e.target.result
                // console.log(this.fileValue)
                // this.upload_step = 2
                // if(this.batchUrl){
                //     this.$emit("clearFile")
                // }
                this.fileDataList.push(fileData)
            }
            return false
        },
        async upload(index) {
            const res = await this.$axios.request({
                url: `/common/upload`,
                method: 'POST',
                data: this.fileDataList[index].formData,
            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
            } else {
                this.$Message.success(res.message)
                this.fileDataList[index].file_path = res.data.url
                console.log(this.fileDataList)
            }
        },
        deleteFile(index) {
            this.fileDataList.splice(index, 1)
        },
        // 详情
        async getDetail() {
            let res = await this.$axios.request( {
                url: `/work/order/detail/${this.id}`,
                method: 'get',
            })
            if (res.state !== 0) {
                his.$Message.error(res.message)
            } else {
                const { title, description, appendix } = res.data
                this.addForm.title = title
                this.addForm.description = description
                this.editor.txt.html(this.addForm.description)
                this.fileDataList = appendix.map(item => {
                    return {
                        fileName: item.appendix_name,
                        file_path: item.appendix_url
                    }
                })
            }
        },
        save() {
            if (this.fileDataList.findIndex(item => item.file_path === '') >= 0) {
                this.$Message.error('请先上传所有附件再进行提交')
                return
            } else {
                // this.loading.addBtn = true
                this.$refs['addForm'].validate(async valid => {
                    // this.loading.addBtn = false
                    if (valid) {
                        if(!this.addForm.description) return this.$msg({ type: 'error', message: '描述不能为空' })

                        const appendix = this.fileDataList.map(item => (
                            {
                                appendix_name: item.fileName,
                                appendix_url: item.file_path
                            }
                        ))
                        if (this.id) {
                            this.loading.addBtn = true
                            const res = await this.$axios.request({
                                url: `/work/order/${this.id}`,
                                method: 'put',
                                data: {
                                    title: this.addForm.title,
                                    description: this.addForm.description,
                                    appendix: appendix.length ? JSON.stringify(appendix) : ''
                                }
                            })
                            if (res.state !== 0) {
                                this.$Message.error(res.message)
                                this.loading.addBtn = false
                            } else {
                                this.$Message.success(res.message)
                                this.loading.addBtn = false
                                this.$router.push({path:'/workOrderList'})
                            }

                        } else {
                            this.loading.addBtn = true
                            const res = await this.$axios.request({
                                url: `/work/order`,
                                method: 'post',
                                data: {
                                    title: this.addForm.title,
                                    description: this.addForm.description,
                                    appendix: appendix.length ? JSON.stringify(appendix) : ''
                                }
                            })
                            if (res.state !== 0) {
                                this.$Message.error(res.message)
                                this.loading.addBtn = false
                            } else {
                                this.$Message.success(res.message)
                                this.loading.addBtn = false
                                this.$router.push({path:'/workOrderList'})
                            }
                        }
                    }
                })
            }
        },
        cancel() {
            this.$router.push({path:'/workOrderList'})
        }

    }
}
</script>
<style lang="less" scoped>
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
</style>