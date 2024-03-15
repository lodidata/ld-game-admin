<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box mb30">
      <Button type="primary" icon="md-add" class="mb30" @click="addApp()">{{i18n_lang.appManagement0}}</Button>
    </Card>
    <Table border :columns="columns" :data="appList"></Table>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size-opts="page.pageSizes"
      :page-size="page.pageSize"
      :total="page.total"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>
    <Modal
      v-model="visible.edit"
      :title="`${i18n_lang.appManagement0}`"
      :width="600"
      :styles="{ top: '120px' }"
      :footer-hide="true"
      >
      <!-- <addAppList></addAppList> -->
      <Form
        ref="editForm"
        :label-width="100"
        :model="form"
        :rules="ruleValidate">
        <FormItem :label="`${i18n_lang.appManagement1}`" prop="type">
          <Select v-model="form.type">
            <Option v-for="(item, index) in bagTypeList" :key="item.key" :value="item.key">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="`${i18n_lang.appManagement19}`" prop="name">
          <Input v-model="form.name" :placeholder="` `"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.appManagement20}`" prop="version">
          <Input v-model="form.version" :placeholder="` `"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.appManagement2}`" prop="bag_url">
          <!-- <UploadImg v-model="form.bag_url" :batchUrl="true"></UploadImg> -->
          <Upload :action="`*`" :before-upload="handleUpload">
            <Button type="primary" icon="ios-cloud-upload-outline">{{i18n_lang.appManagement3}}</Button>
          </Upload>
          <div v-if="form.bag_url">
            <span>{{form.bag_url}}</span>
            <Button type="success" :loading="loading.updataButton" @click="upload">{{i18n_lang.appManagement4}}</Button>
          </div>
          <!-- <Upload
            class="upload-demo"
            action="*"
            :limit="1"
            :on-change="fileChange"
          >
            <Button size="small" type="primary">点击上传</Button>
          </Upload> -->
        </FormItem>
        <FormItem :label="`${i18n_lang.appManagement21}`" prop="icon_url">
          <Upload :action="``" :before-upload="handleUploadImage">
            <Button type="primary" icon="ios-cloud-upload-outline">{{i18n_lang.appManagement22}}</Button>
          </Upload>
          <div v-if="form.icon_url">
            <span>{{form.icon_url}}</span>
          </div>
        </FormItem>
        <FormItem :label="`${i18n_lang.appManagement23}`" prop="status"><!-- 优惠文案格式 -->
          <RadioGroup v-model="form.status" size="large">
            <Radio :label="0">{{i18n_lang.appManagement24}}</Radio>
            <Radio :label="1">{{i18n_lang.appManagement25}}</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div class="PopBtn">
        <Button type="primary" :loading="loading.saveButton" @click="saveData()">{{i18n_lang.appManagement5}}</Button>
      </div>
    </Modal>
    <Modal
      v-model="visible.delete"
      :title="`${i18n_lang.appManagement6}`"
      :width="300"
      :styles="{ top: '180px' }"
      :footer-hide="true"
    >
      <div class="PopText">
        {{i18n_lang.appManagement7}}
      </div>
      <div class="PopTwoBtn">
        <Button @click="visible.delete = false">{{i18n_lang.appManagement8}}</Button>
        <Button type="primary" @click="deleteDate()">{{i18n_lang.appManagement9}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import columns from './columns.js'
  import addAppList from './addAppList'
  import UploadImg from './UploadImg'

  export default {
    data() {
      const i18n_lang = this.$t('appManagement');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          page: false,
          updataButton: false,
          saveButton: false,
          deleteButton: false
        },
        visible: {
          edit: false,
          delete: false
        },
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        appList: [],
        bagTypeList: [],
        fileData: {
          formData: null,
          fileName: '',
          file: null,
          name_type: 2,
          dir: 'app'
        },
        imageGileData: {
          formData: null,
          fileName: '',
          file: null
        },
        form: {
          id: "",
          type: "",
          name: "",
          version: "",
          bag_url: "",
          icon_url: "",
          status: "0"
        },
        ruleValidate: {
          type: [{type: 'number', required: true, message: i18n_lang.appManagement10, trigger: 'blur'}],
          name: [{required: true, message: `${i18n_lang.appManagement26}`, trigger: 'blur'}],
          version: [{required: true, message: `${i18n_lang.appManagement27}`, trigger: 'blur'}],
          bag_url: [{required: true, message: i18n_lang.appManagement11, trigger: 'blur'}],
          // icon_url: [{required: true, message: `${i18n_lang.appManagement28}`, trigger: 'blur'}]
        },
        row_id: ''
      }
    },
    created() {
      this.getData()
      this.getBagType()
    },
    components: {
      addAppList,
      UploadImg
    },
    methods: {
      // 点击添加按钮
      addApp(){
        this.form = {
          id: "",
          type: "",
          name: "",
          version: "",
          bag_url: "",
          icon_url: "",
          status: 0
        }
        this.visible.edit = true
        this.fileData.fileName = ''
      },
      compile(row){
        this.form = {
          id: row.id,
          type: row.type,
          name: row.name,
          version: row.version,
          bag_url: row.bag_url,
          icon_url: row.icon_url,
          status: row.status
        }
        this.visible.edit = true
      },
      // 翻页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getData()
      },
      // 获取包列表数据
      async getData(i = 1){
        this.loading.page = true
        this.page.currentPage = i
        const params = {
          page: this.page.currentPage,
          page_size: this.page.pageSize
        }
        const res = await this.$axios.request({
          url: '/bag',
          method: 'GET',
          params: params
        })
        this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.appList = res.data || []
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      // 获取包类型数据
      async getBagType(){
        const params = {}
        const res = await this.$axios.request({
          url: '/bag/type',
          method: 'GET',
          params: params
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.bagTypeList  = []
        if(res.data){
          res.data.forEach((item, index) => {
            Object.keys(item).forEach((key) => {
              this.bagTypeList.push({
                key: +key,
                name: item[key]
              })
            })
          })
        }
        // this.bagTypeList = res.data || []
        // this.bagTypeList.forEach((item, index) => {
        //   console.log('item', item[key])
        // })
        // console.log('this.bagTypeList', this.bagTypeList[0])
      },
      //点击上传文件
      httpRequest(file){
        console.log('file', file)
      },
      // 获取上传文件
      handleUpload(file){
        this.fileData.fileName = file.name
        this.fileData.formData = new FormData()
        this.fileData.formData.append('file', file)
        this.fileData.formData.append('name', file.name)
        // this.form.name = file.name.split('.')[0]
        this.upload('app')
      },
      handleUploadImage(file){
        this.imageGileData.fileName = file.name
        this.imageGileData.formData = new FormData()
        this.imageGileData.formData.append('file', file)
        this.imageGileData.formData.append('name', file.name)
        this.upload('image')
      },
      // 上传文件
      async upload(type) {
        // if (!this.fileData.fileName) {
        //   this.$Message.warning(this.i18n_lang.appManagement11)
        //   return
        // }
        this.loading.saveButton = true
        const params = type == 'app' ? {
          name_type: 2,
          dir: 'app'
        } : {}
        const res = await this.$axios.request({
          url: `/upload`,
          method: 'POST',
          data: type == 'app' ? this.fileData.formData : this.imageGileData.formData,
          params: params,
          timeout: type == 'app' ? 50000 : '',
        })
        this.loading.saveButton = false
        if (res.status !== 200) {
          this.$Message.error(res.message)
        } else {
          if(res.state !== 0){
            this.$Message.error(res.message)
            return
          }
          this.$Message.success(res.message)
          // this.fileData.fileName = ''
          type == 'app' ? this.form.bag_url = res.data.url : this.form.icon_url = res.data.url
        }
      },
      saveData(){
        this.$refs['editForm'].validate(async valid => {
          // if(!this.form.type) return this.$Message.warning(this.i18n_lang.appManagement10)
          // if(!this.form.url) return this.$Message.warning(this.i18n_lang.appManagement11)
          if(valid){
            this.loading.saveButton = true
            const req = { ...this.form }
            delete req.id
            const res = await this.$axios.request({
              url: this.form.id ? `/bag/${this.form.id}` : `/bag`,
              method: 'PUT',
              params: req
            })
            this.loading.saveButton = false
            if (res.status !== 200) {
              this.$msg({
                type: 'error',
                message: res.message
              })
              return
            }
            if(res.state !== 0){
              this.$Message.error(res.message)
              return
            }
            this.getData()
            // this.form = {
            //   name: "",
            //   url: "",
            //   type: ""
            // }
            this.visible.edit = false
          }
        })
      },
      deleteBtn(row){
        this.row_id = row.id
        this.visible.delete = true
      },
      async deleteDate(){
        const res = await this.$axios.request({
          url: `/bag/${this.row_id}`,
          method: 'DELETE',
          params: this.form
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.getData()
        this.$msg({
          type: 'error',
          message: this.i18n_lang.appManagement12
        })
        this.visible.delete = false
        this.row_id = ''
      },
      async upDataStatus(row){
        const res = await this.$axios.request({
          url: `/bag/${row.id}`,
          method: 'POST',
          params: {
            status: row.status == 1 ? 0 : 1
          }
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        if(res.state !== 0){
          this.$Message.error(res.message)
          return
        }
        this.getData()
      }
    }
  }
</script>

<style lang="less" scoped>
  .PopBtn{
    text-align: center;
    &>Button{
      width: 120px;
    }
  }
  .PopText{
    font-size: 30rpx;
    padding: 16px;
    text-align: center;
  }
  .PopTwoBtn{
    text-align: center;
    &>Button{
      width: 70px;
      &:nth-child(2){
        margin-left: 15px;
      }
    }
  }
</style>
