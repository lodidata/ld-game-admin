<template>
    <div id="MonthlyBill">
      <Spin fix v-if="loading.page"></Spin>
      <Card dis-hover class="operate_box">
        <div class="left-c"></div>
        <Row>
            <Col span="12" style="font-size: 20px; line-height: 30px;">工单列表</Col>
            <Col span="12" style="display: flex; justify-content: right;">
                <Button v-auth="75" type="primary" @click="$router.push({path:'workOrderList/addWorkOrder'})" >新增工单</Button>
            </Col>
        </Row>
      </Card>
      <Card dis-hover class="query_box">
        <div class="query_con mb30">
          <div class="item">
            <span>标题</span>
            <Input v-model="query.title" style="width:120px;" />
          </div>
          <div class="item">
            <span>状态</span>
            <Select v-model="query.status" style="width:140px">
              <Option value>全部</Option>
              <Option :value="item.value" v-for="(item, i) in sattus_list" :key="i">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="item">
            <span>创建者</span>
            <Input v-model="query.creator" style="width:120px;" />
          </div>
          <div class="item">
            <span>创建时间</span>
            <DatePicker type="daterange" placement="bottom-end" style="width: 200px" :transfer="true" :options="options"
            @on-change="handleChangeDateCreate"
            v-model="dataValue_create" />
          </div>
          <div class="item">
            <span>解决时间</span>
            <DatePicker type="daterange" placement="bottom-end" style="width: 200px" :transfer="true" :options="options"
            @on-change="handleChangeDateSolve"
            v-model="dataValue_solve" />
          </div>
          <div class="query_btns" >
            <Button type="primary" @click="getData()">查询</Button>
            <Button type="primary" @click="reset">重置</Button>
          </div>
        </div>
      </Card>
      <div style="marginTop:30px">
        <Table :columns="columns" :data="dataSource" border></Table>
  
        <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{
        `数据总计：${page.total}条` }}</div>
        <Page class="page_box" :current="page.currentPage" :page-size="page.pageSize" :total="page.total" show-sizer
          @on-change="getData" @on-page-size-change="changePageSize" placement="top"></Page>
      </div>


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
          <!-- <FormItem label="附件" prop="appendix">
              <Upload
                  :disabled="fileDataList.length >= 5"
                  multiple
                  :before-upload="handleUpload"
                  action>
                  <Button icon="ios-cloud-upload-outline" :disabled="fileDataList.length >= 5">添加文件</Button>
                  <span>(不超过50m，最多上传五份文件)</span>
              </Upload>
              <div v-for="(item, index) in fileDataList" :key="index">
                  <span>{{ item.fileName }}</span>
                  <Button v-if="!item.file_path" type="text" size="small" @click="upload(index)">上传</Button>
                  <Button type="text" size="small" @click="deleteFile(index)">删除</Button>
              </div>
          </FormItem> -->
        </Form>
          <div slot="footer">
              <Button type="primary" :loading="loading.addBtn" @click="save">确认</Button>
          </div>
      </Modal>

    </div>
  </template>
    
  <script>
  import Editor from 'wangeditor'
  import columns from './columns.js'
  export default {
    data() {
      return {
        id: '',
        loading: {
          page: 0,
          addBtn: false
        },
        visible: {
          addModel: false
        },
        columns: columns(this),
        dataSource: [],
        page: {
          pageSize: 10,
          total: 0,
          currentPage: 1
        },
        query: {
            title: '',
            status: '',
            creator: '',
            created_at_from: '',
            created_at_to: '',
            finished_at_from: '',
            finished_at_to: '',
        },
        // 1：待确认(默认)；2：处理中；3：已解决 4：已关闭；已激活
        sattus_list: [
            {label: '待确认', value: 1},
            {label: '处理中', value: 2},
            {label: '已解决', value: 3},
            {label: '关闭', value: 4},
            {label: '激活', value: 5},
        ],
        dataValue_create: ['', ''], // 创建日期
        dataValue_solve: ['', ''], // 解决日期
        options: {
          disabledDate (date) {
            // return date && date.valueOf() > Date.now() - 86400000
            return date && date.valueOf() > Date.now()
          }
        },
        addForm: {
          remark: ''
        },
        handleType_str: '',
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
        row_status: '',
        row_id: '',
        row_title: ''
      }
    },
    created() {
      this.getData()
    },
    mounted() {
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
        this.editor.customConfig.height = 200
        // create这个方法一定要在所有配置项之后调用
        this.editor.create()
        this.editor.txt.html(this.addForm.remark)
    },
    methods: {
      // 编辑
      async handleEdit(row) {
        this.$router.push({
          path: 'workOrderList/addWorkOrder',
          query: {
            id: row.id
          }
        })
      },

      async handleDetail(row) {
        this.$router.push({
          path: 'workOrderList/detail',
          query: {
            id: row.id
          }
        })
      },

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

      async handleStatus(row, status, str) {
        this.visible.addModel = true
        this.handleType_str = str
        this.addForm.remark = ''
        this.editor.txt.html(this.addForm.remark)
        this.fileDataList = []
        this.row_status = status
        this.row_id = row.id
        this.row_title = row.id + ':' + row.title
      },

      async save() {

        // if (this.fileDataList.findIndex(item => item.file_path === '') >= 0) {
        //         this.$Message.error('请先上传所有附件再进行提交')
        //         return
        // } else {
          // const appendix = this.fileDataList.map(item => (
          //     {
          //         appendix_name: item.fileName,
          //         appendix_url: item.file_path
          //     }
          // ))
          let res = await this.$axios.request({
              url: `/work/order/${this.row_id}`,
              method: 'patch',
              data: {
                  status: this.row_status,
                  remark: this.addForm.remark,
                  // appendix: appendix.length ? JSON.stringify(appendix) : ''
              }
          })
          if (res.state !== 0) {
            this.$Message.error(res.message)
          } else {
            this.visible.addModel = false
            this.$Message.success(res.message)
            this.getData()
          }
        // }
      },

      async getData(i = 1) {
          this.page.currentPage = i
          this.loading.page++
          let query = {
            page: this.page.currentPage,
            page_size: this.page.pageSize,
            ...this.query
          }
          let res = await this.$axios.request( {
            url: '/work/order',
            method: 'get',
            params: query
          })
          if (res.state !== 0) {
            this.$Message.error(res.message)
          } else {
            console.log(res.data)
            this.dataSource = res.data
            this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
          }
          this.loading.page--
      },
     
      reset() {
        this.query = {
            title: '',
            status: '',
            creator: '',
            created_at_from: '',
            created_at_to: '',
            finished_at_from: '',
            finished_at_to: '',
        }
        this.dataValue_create = ['', '']
        this.dataValue_solve = ['', '']
        this.page = {
          pageSize: 10,
          total: 0,
          currentPage: 1
        }
        this.getData()
      },
      // 设置每页条数
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getData()
      },
      // 翻页
      // changePage(val) {
      //   this.page.currentPage = val
      //   this.getData()
      // }
      // 选择日期
      handleChangeDateCreate (val) {
        [this.query.created_at_from, this.query.created_at_to] = val
      },
      handleChangeDateSolve (val) {
        [this.query.finished_at_from, this.query.finished_at_to] = val
      },
      chnageLimitRecharge(val) {
        console.log(val)
      }
    }
  }
  </script>

<style lang="less" scoped>
    .operate_box {
        margin-bottom: 10px;
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
    