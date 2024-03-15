<template>
    <div id="import">
        <Card dis-hover class="operate_box">
            <div class="left-c"></div>
            <Row>
                <Col span="12" style="font-size: 20px; line-height: 30px;">批量导入</Col>
                <Col span="12" style="display: flex; justify-content: right;">
                    <Button type="default" @click="returnBill">返回上一页</Button>
                </Col>
            </Row>
        </Card>
        <Row>
            <Col span="8" style="min-width: 400px; padding: 20px;">
                <div class="flex justify-content">
                    <span style="line-height: 20px; font-size: 20px;">上传文件</span>
                    <Button type="text" @click="download" style="color: #2d8cf0">下载导入文件模版</Button>
                </div>
                <div style="margin-top: 20px;">
                    <Upload
                        v-if="!fileData.fileName && upload_step === 1"
                        type="drag"
                        :before-upload="handleUpload"
                        action>
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击上传/拖拽到此区域</p>
                        </div>
                    </Upload>
                    <div class="file-name-box" v-else>
                        <div>
                            {{ fileData.fileName }}
                            <Icon v-if="upload_step === 2" class="success-icon" type="md-checkmark" size="18" />
                        </div>
                        <Upload
                            v-if="upload_step === 2" 
                            type="drag"
                            :before-upload="handleUpload"
                            action>
                            <Button type="primary" size="small">更换</Button>
                        </Upload>
                    </div>

                    <p class="tips">请上传xls格式文件，大小在10M以内</p>

                    <div class="flex justify-center">
                        <!-- <Button v-if="upload_step === 2" :loading="loading" type="primary" @click="upload">上传服务器</Button> -->
                        <Button v-if="upload_step === 2" type="primary" @click="doAnalyze">开始解析</Button>
                        <Button v-if="upload_step === 3" type="primary" :disabled="true">解析完成</Button>
                    </div>
                </div>
            </Col>
            <Col span="12" class="result-box">
                <!-- <div class="result-title">解析结果</div> -->
                <Card dis-hover class="result-main">
                    <p>*导入注意事项：</p>
                    <p>1.代理账号：请录入平台已有的代理账号，注意区分大小写；</p>
                    <p>2.品牌名称：请录入该代理账号对应的品牌名称，注意区分大小写；</p>
                    <p>3.游戏厂商：请录入该代理账号关联的游戏厂商，注意区分大小写；</p>
                    <p>4.账单日期：按年月日的模板格式填写；</p>
                    <p>5.货币类型：按该代理账号所设置的货币币种；</p>
                    <p>6.单次上传建议按代理分开上传，上传成功后注意检查重复上传。</p>
                </Card>
            </Col>
        </Row>
        <Row v-if="upload_step === 3">
            <div class="success-box">
                <div class="success-title">
                    <h3>上传成功数据</h3>
                    <Button type="primary" @click="report">确认导入{{total}}条</Button>
                </div>
                <Table :columns="columns" :data="dataSource"></Table>
                
            </div>
        </Row>
        <br>
    </div>
</template>

<script>
import columns from './columns.js'
import { getToken } from '@/libs/util'
export default {
    data() {
        return {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'multipart/form-data',
            },
            file_path: '',
            fileData: {
                base64: this.value || null,
                formData: null,
                fileName: '',
                file: this.value || null
            },
            upload_step: 1, // 1上传文件 2解析 3导出
            loading: false,
            columns: columns(this),
            dataSource: [],
            analyze_total: 0,
            upload_total: 0,
            fail_total: 0,
        }
    },
    computed: {
        total() {
            return this.dataSource.length
        }
    },
    methods: {
        async download() {
            // let res = await this.$axios.request({
            //   url: '/download',
            //   method: 'get',
            //   params: {
            //     name: 'bill'
            //   }
            // })
            // if (res.state !== 0) {
            //   this.$Message.error(res.message)
            // } else {
            //     console.log(res.data.url)
            //     if (res.data && res.data.url) {
            //         window.open(res.data.url); 
            //     }
            // }
            const url = (window.location.protocol.indexOf('https') >= 0 ? 'https://' : 'http://') + window.setting.reqUrl + '/common/download?name=bill'
            console.log(url)
            const link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', 'excel.xls')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        },
        handleUpload(file) {
            this.fileData.fileName = file.name
            this.fileData.formData = new FormData()
            this.fileData.formData.append('file', file)
            this.fileData.formData.append('name', file.name)

            // 读取文件
            const reader = new FileReader()
            // 读取文件的url
            reader.readAsDataURL(file)
            reader.onload = e => {
                // 读取成功
                // this.fileValue = e.target.result
                // console.log(this.fileValue)
                this.upload_step = 2
                // if(this.batchUrl){
                //     this.$emit("clearFile")
                // }
            }
            return false
        },
        // async upload() {
        //     if (!this.fileData.fileName) {
        //         this.$Message.warning('不能为空')
        //         return
        //     }
        //     this.loading = true
        //     const res = await this.$axios.request({
        //         url: `/upload`,
        //         method: 'POST',
        //         data: this.fileData.formData,
        //     })
        //     this.loading = false
        //     if (res.state !== 0) {
        //         this.$Message.error(res.message)
        //     } else {
        //         this.$Message.success(res.message)
        //         // this.fileData.fileName = ''
        //         this.file_path = res.data.url
        //         this.upload_step = 3
        //     }
        // },
        async doAnalyze() {
            let res = await this.$axios.request({
                url: '/bill/report',
                method: 'POST',
                data: this.fileData.formData
            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
            } else {
                this.$Message.success(res.message)
                res.data.forEach((item, index) => {
                    item.id = index
                });
                this.dataSource = res.data
                // this.analyze_total = res.attributes.total
                this.upload_step = 3
            }
        },
        async handleDelete(row) {
            let res = await this.$axios.request({
                url: `/bill/report/${row.id}`,
                method: 'delete'
            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
            } else {
                this.$Message.success(res.message)
                this.dataSource = this.dataSource.filter(item => {
                    return item.id !== row.id
                })
            }
        },
        async report() {
            let res = await this.$axios.request({
                url: '/bill/report',
                method: 'put',
            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
            } else {
                this.$Message.success(res.message)
                this.$router.push({path:'/monthlyBill'})
            }
        },
        returnBill() {
            if (this.fileData.fileName) {
                if (this.upload_step === 3) {
                    this.$Modal.confirm({
                        title: '退出',
                        content: '<p>当前文件已解析未导入，返回文件将无法保存，确认返回吗</p>',
                        onOk: () => {
                            this.$router.push({path:'/monthlyBill'})
                        },
                        onCancel: () => {}
                    });
                } else {
                    this.$Modal.confirm({
                        title: '退出',
                        content: '<p>返回文件将无法保存，确认返回吗</p>',
                        onOk: () => {
                            this.$router.push({path:'/monthlyBill'})
                        },
                        onCancel: () => {}
                    });
                }
            } else {
                this.$router.push({path:'/monthlyBill'})
            }


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
    .file-name-box {
        width: 100%;
        height: 112px;
        background: #fff;
        border: 1px dashed #000;
        >div {
            &:nth-child(1) {
                margin-top: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
        .success-icon {
            color: #19be6b;
        }
    }
    .tips {
        margin: 18px 0;
        text-align: center;
        font-size: 12px;
    }
    .result-box {
        margin-left: 60px;
        .result-title {
            font-size: 20px;
            line-height: 60px;
        }
        .result-main {
            width: 600px;
            margin-top: 70px;
            margin-left: 0px;
            p {
                color: #f00;
                font-size: 12px;
                line-height: 24px;
            }
        }
    }
    .success-box {
        .success-title {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
            h3 {
                font-size: 20px;
                line-height: 40px;
            }
        }
    }
</style>