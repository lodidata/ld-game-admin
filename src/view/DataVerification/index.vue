<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.dataVerification0}}</span>
           <DatePicker
             v-model="reginTime"
             type="daterange"
             placeholder
             style="width: 200px"
             clearable
             @on-change="selectTime"
           ></DatePicker>
        </div>
        <div class="item">
          <span>{{i18n_lang.dataVerification52}}</span>
          <Select v-model="searchInfo.status" clearable style="width:150px">
            <Option value>{{i18n_lang.dataVerification2}}</Option>
            <Option v-for="item in statusList" :key="item.key" :value="item.key">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.dataVerification53}}</span>
          <Input v-model="searchInfo.name" :placeholder="`${i18n_lang.dataVerification54}`" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <span>{{`${i18n_lang.dataVerification59}:`}}</span>
          <Input v-model="searchInfo.account" :placeholder="` `" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" @click="inquire" class="marginRight" style="margin-left: 15px;">{{i18n_lang.dataVerification3}}</Button>
        </div>
      </div>
    </Card>
    <div>
      <Button type="primary" icon="md-add" class="mb30" @click="handle()">{{i18n_lang.dataVerification4}}</Button>
    </div>
    <Table ref="table" border :columns="columns" :data="dataSource" style="margin-top: 20px"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.dataVerification55}${page.total}${i18n_lang.dataVerification56}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size-opts="page.pageSizes"
      :page-size="page.pageSize"
      :total="page.total"
      @on-change="getList"
      @on-page-size-change="changePageSize"
    ></Page>
    <Modal v-model="visible.handle" :title="`${i18n_lang.dataVerification5}`">
      <Form
        ref="handleInfo"
        :model="handleInfo"
        :label-width="100"
        :rules="handleRuleValidate"
      >
        <FormItem :label="`${i18n_lang.dataVerification6}`" prop="account">
          <Input v-model="handleInfo.account" :disabled="handleInfo.id ? true : false" :placeholder="!handleInfo.id ? `${i18n_lang.dataVerification7}` : ''"
            :style="{
              width: !handleInfo.id ? `328px` : ``
            }"/>
          <Button type="primary" v-show="!handleInfo.id" :loading="loading.btn" @click="inquireMsg()">查询</Button>
        </FormItem>
        <FormItem :label="`${i18n_lang.dataVerification11}`" prop="type_id">
          <Select v-model="handleInfo.type_id" placeholder=" " :disabled="handleInfo.id ? true : false">
            <Option :value="1">{{`${i18n_lang.dataVerification60}`}}</Option>
            <Option :value="2">{{`${i18n_lang.dataVerification61}`}}</Option>
            <Option :value="3">{{`${i18n_lang.dataVerification62}`}}</Option>
            <Option :value="4">{{`${i18n_lang.dataVerification63}`}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="`${i18n_lang.dataVerification64}`" v-if="handleInfo.type_id == 4 && !handleInfo.id">
          <Input v-model="handleOldInfo.name" v-show="!handleInfo.id" :disabled="true" :placeholder="``"/>
        </FormItem>
        <FormItem :label="!handleInfo.id ? `${i18n_lang.dataVerification65}` : `${i18n_lang.dataVerification8}`" prop="name" v-if="handleInfo.type_id == 4 || !handleInfo.type_id">
          <Input v-show="handleInfo.id" v-model="handleAmendInfo.name" disabled :placeholder="!handleInfo.id ? `${i18n_lang.dataVerification9}` : ''" style="width: 155px;"/>
          <span v-show="handleInfo.id" style="font-size: 12px;color: #515a6e;line-height: 1;">{{i18n_lang.dataVerification10}}</span>
          <Input v-model="handleInfo.name" :disabled="handleInfo.id ? true : false" :placeholder="!handleInfo.id ? `${i18n_lang.dataVerification9}` : ''"
          :style="{
            width: handleInfo.id ? `155px` : ``
          }"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.dataVerification66}`" v-if="handleInfo.type_id == 2 && !handleInfo.id">
          <Input v-model="handleOldInfo.password" v-show="!handleInfo.id" :disabled="true" :placeholder="``"/>
        </FormItem>
        <FormItem :label="!handleInfo.id ? `${i18n_lang.dataVerification65}` : `${i18n_lang.dataVerification12}`" prop="password" v-if="handleInfo.type_id == 2 || !handleInfo.type_id">
          <Input v-show="handleInfo.id" v-model="handleAmendInfo.password" disabled :placeholder="!handleInfo.id ? `${i18n_lang.dataVerification13}` : ''" style="width: 155px;"/>
          <span v-show="handleInfo.id" style="font-size: 12px;color: #515a6e;line-height: 1;">{{i18n_lang.dataVerification10}}</span>
          <Input v-model="handleInfo.password" :disabled="handleInfo.id ? true : false" :placeholder="!handleInfo.id ? `${i18n_lang.dataVerification13}` : ''"
          :style="{
            width: handleInfo.id ? `155px` : ``
          }"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.dataVerification67}`" v-if="handleInfo.type_id == 3 && !handleInfo.id">
          <Input v-model="handleOldInfo.pin_password" v-show="!handleInfo.id" :disabled="true" :placeholder="``"/>
        </FormItem>
        <FormItem :label="!handleInfo.id ? `${i18n_lang.dataVerification65}` : `${i18n_lang.dataVerification14}`" prop="pin_password" v-if="handleInfo.type_id == 3 || !handleInfo.type_id">
          <Input v-show="handleInfo.id" v-model="handleAmendInfo.pin_password" disabled :placeholder="!handleInfo.id ? `${i18n_lang.dataVerification15}` : ''" style="width: 155px;"/>
          <span v-show="handleInfo.id" style="font-size: 12px;color: #515a6e;line-height: 1;">{{i18n_lang.dataVerification10}}</span>
          <Input v-model="handleInfo.pin_password" :disabled="handleInfo.id ? true : false" :placeholder="!handleInfo.id ? `${i18n_lang.dataVerification15}` : ''"
          :style="{
            width: handleInfo.id ? `155px` : ``
          }"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.dataVerification68}`" v-if="handleInfo.type_id == 1 && !handleInfo.id">
          <Select v-model="handleOldInfo.bank_id" :disabled="true" clearable placeholder=" ">
            <Option v-for="item in bankList" :key="item.id" :value="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="!handleInfo.id ? `${i18n_lang.dataVerification65}` : `${i18n_lang.dataVerification16}`" prop="bank_id" v-if="handleInfo.type_id == 1 || !handleInfo.type_id">
          <Input v-show="handleInfo.id" v-model="handleAmendInfo.bank_name" disabled :placeholder="``" style="width: 155px;"/>
          <span v-show="handleInfo.id" style="font-size: 12px;color: #515a6e;line-height: 1;">{{i18n_lang.dataVerification10}}</span>
          <Select v-model="handleInfo.bank_id" :disabled="handleInfo.id ? true : false" clearable placeholder=" "
          :style="{
            width: handleInfo.id ? `155px` : `388px`
          }">
            <Option v-for="item in bankList" :key="item.id" :value="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="`${i18n_lang.dataVerification69}`" v-if="handleInfo.type_id == 1 && !handleInfo.id">
          <Input v-model="handleOldInfo.bank_account_name" v-show="!handleInfo.id" :disabled="true" :placeholder="``"/>
        </FormItem>
        <FormItem :label="!handleInfo.id ? `${i18n_lang.dataVerification65}` : `${i18n_lang.dataVerification18}`" prop="bank_account_name" v-if="handleInfo.type_id == 1 || !handleInfo.type_id">
          <Input v-show="handleInfo.id" v-model="handleAmendInfo.bank_account_name" disabled :placeholder="!handleInfo.id ? `${i18n_lang.dataVerification19}` : ''" style="width: 155px;"/>
          <span v-show="handleInfo.id" style="font-size: 12px;color: #515a6e;line-height: 1;">{{i18n_lang.dataVerification10}}</span>
          <Input v-model="handleInfo.bank_account_name" :disabled="handleInfo.id ? true : false" :placeholder="!handleInfo.id ? `${i18n_lang.dataVerification19}` : ''"
          :style="{
            width: handleInfo.id ? `155px` : ``
          }"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.dataVerification70}`" v-if="handleInfo.type_id == 1 && !handleInfo.id">
          <Input v-model="handleOldInfo.address" v-show="!handleInfo.id" :disabled="true" :placeholder="``"/>
        </FormItem>
        <FormItem :label="!handleInfo.id ? `${i18n_lang.dataVerification65}` : `${i18n_lang.dataVerification20}`" prop="account_bank" v-if="handleInfo.type_id == 1 || !handleInfo.type_id">
          <Input v-show="handleInfo.id" v-model="handleAmendInfo.address" disabled :placeholder="!handleInfo.id ? `${i18n_lang.dataVerification21}` : ''" style="width: 155px;"/>
          <span v-show="handleInfo.id" style="font-size: 12px;color: #515a6e;line-height: 1;">{{i18n_lang.dataVerification10}}</span>
          <Input v-model="handleInfo.account_bank" :disabled="handleInfo.id ? true : false" :placeholder="!handleInfo.id ? `${i18n_lang.dataVerification21}` : ''"
          :style="{
            width: handleInfo.id ? `155px` : ``
          }"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.dataVerification71}`" v-if="handleInfo.type_id == 1 && !handleInfo.id">
          <Input v-model="handleOldInfo.bank_card" v-show="!handleInfo.id" :disabled="true" :placeholder="``"/>
        </FormItem>
        <FormItem :label="!handleInfo.id ? `${i18n_lang.dataVerification65}` : `${i18n_lang.dataVerification22}`" prop="bank_card" v-if="handleInfo.type_id == 1 || !handleInfo.type_id">
          <Input v-show="handleInfo.id" v-model="handleAmendInfo.card" disabled :placeholder="!handleInfo.id ? `${i18n_lang.dataVerification23}` : ''" style="width: 155px;"/>
          <span v-show="handleInfo.id" style="font-size: 12px;color: #515a6e;line-height: 1;">{{i18n_lang.dataVerification10}}</span>
          <Input v-model="handleInfo.bank_card" :disabled="handleInfo.id ? true : false" :placeholder="!handleInfo.id ? `${i18n_lang.dataVerification23}` : ''"
          :style="{
            width: handleInfo.id ? `155px` : ``
          }"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.dataVerification72}`" prop="image" v-if="(handleInfo.type_id && handleInfo.image.length) || !handleInfo.id">
          <UploadImg
            v-model="image"
            :batchUrl="false"
            :imageList="handleInfo.image"
            :handle="!handleInfo.id ? true : false"
            style="width: 388px;background-color: transparent; border: 1px solid #ddd;"
            @input="batchUrlFn"
            @clearFile="clearFile"
          ></UploadImg>
        </FormItem>
        <FormItem :label="`${i18n_lang.dataVerification24}`" prop="remarks">
          <Input type="textarea" :rows="3" v-model="handleInfo.remarks" :disabled="handleInfo.id ? true : false" :placeholder="!handleInfo.id ? `${i18n_lang.dataVerification25}` : ''"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button v-show="handleInfo.id" type="primary" :disabled="listStatus ? true : false" :loading="loading.btn" @click="handleExamine(1)">{{i18n_lang.dataVerification26}}</Button>
        <Button v-show="handleInfo.id" :loading="loading.btn" @click="handleRefuse()">{{i18n_lang.dataVerification27}}</Button>
        <Button v-show="!handleInfo.id" type="primary" :loading="loading.btn" @click="applySave()">{{i18n_lang.dataVerification28}}</Button>
      </div>
    </Modal>
    <Modal v-model="visible.remark" :title="`${i18n_lang.dataVerification29}`">
      <Form
        ref="remarkInfo"
        :model="remarkInfo"
        :label-width="100"
        :rules="remarkRuleValidate"
      >
        <FormItem :label="`${i18n_lang.dataVerification30}`" prop="remark">
          <Input type="textarea" :rows="3" v-model="remarkInfo.remark" :placeholder="`${i18n_lang.dataVerification31}`"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="handleExamine(2)">{{i18n_lang.dataVerification32}}</Button>
      </div>
    </Modal>
    <!-- 查看图片 -->
    <image-preview ref="imgPreviewRef"></image-preview>
  </div>
</template>

<script>
  import columns from './columns'
  import { mapState } from 'vuex'
  import UploadImg from './UploadImg'
  import imagePreview from "./image-preview/imagePreview.vue"
  const searchInfo = {
    created: ``,
    created_end: ``,
    status: ``,
    name: '',
    account: ''
  }
  const handleInfo = {
    id: '',
    type_id: 2,
    account: '',
    name: '',
    password: '',
    pin_password: '',
    bank_id: '',
    bank_account_name: '',
    bank_card: '',
    account_bank: '',
    remarks: '',
    operator_id: '',
    status: '',
    image: []
  }
  export default {
    components: {
      UploadImg,
      imagePreview
    },
    computed: {
      ...mapState({
        allRoutes: state => state.user.allRoutes
      })
    },
    data() {
      const i18n_lang = this.$t('dataVerification');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          page: false,
          btn: false
        },
        visible: {
          handle: false,
          remark: false
        },
        reginTime: [searchInfo.created, searchInfo.created_end],
        searchInfo: { ...searchInfo },
        statusList: [
          {
            "key": '0',
            "name": `${i18n_lang.dataVerification33}`
          },
          {
            "key": '1',
            "name": `${i18n_lang.dataVerification34}`
          },
          {
            "key": '2',
            "name": `${i18n_lang.dataVerification35}`
          }
        ],
        bankList: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        dataSource: [],
        handleInfo: { ...handleInfo },
        handleAmendInfo: {},
        handleOldInfo: {},
        handleRuleValidate: {
          account: [{ required: true, message: `${i18n_lang.dataVerification7}`, trigger: 'blur' }],
          // name: [{ required: true, message: `${i18n_lang.dataVerification9}`, trigger: 'blur' }],
          // password: [{ required: true, message: `${i18n_lang.dataVerification13}`, trigger: 'blur' }],
          // pin_password: [{ required: true, message: `${i18n_lang.dataVerification15}`, trigger: 'blur' }],
          // bank_id: [{ required: true, message: `${i18n_lang.dataVerification17}`, trigger: 'blur' }],
          // bank_account_name: [{ required: true, message: `${i18n_lang.dataVerification19}`, trigger: 'blur' }],
          // account_bank: [{ required: true, message: `${i18n_lang.dataVerification21}`, trigger: 'blur' }],
          // bank_card: [{ required: true, message: `${i18n_lang.dataVerification23}`, trigger: 'blur' }],
          remarks: [{ required: true, message: `${i18n_lang.dataVerification25}`, trigger: 'blur' }]
        },
        remarkInfo: {
          remark: ''
        },
        remarkRuleValidate: {
          remark: [{ required: true, message: `${i18n_lang.dataVerification25}`, trigger: 'blur' }]
        },
        image: '',
        listStatus: 0
      }
    },
    created() {
      this.getList()
      this.getBanks()
    },
    methods: {
      // 选择日期
      selectTime(val) {
        [this.searchInfo.created, this.searchInfo.created_end] = val
      },
      // 查询
      inquire(){
        this.getList()
      },
      // 新增
      handle(){
        this.visible.handle = true
        this.image = ''
        this.handleInfo = { ...handleInfo }
        this.handleOldInfo = {
          account_bank: '',
          bank_account_name: "",
          bank_card: "",
          bank_id: '',
          name: "",
          password: "",
          pin_password: ""
        }
        this.handleInfo.image = []
      },
      //选择文件
      batchUrlFn(url){
        this.handleInfo.image.push(url)
      },
      //清除文件
      clearFile(url){
        this.handleInfo.image.map((item, index) => {
          if(item == url){
            this.handleInfo.image.splice(index, 1)
          }
        })
      },
      // 通过
      handlePass(row){
        this.remarkInfo.remark = ''
        if(row){
          this.handleInfo.id = row.id
        }
        this.handleExamine(1)
        // this.visible.handle = true
      },
      // 详情
      handleDetails(row){
        this.remarkInfo.remark = ''
        this.handleInfo.id = row.id
        this.listStatus = row.status
        this.getExamine(row.id)
      },
      // 拒绝
      handleRefuse(row){
        this.remarkInfo.remark = ''
        if(row){
          this.handleInfo.id = row.id
        }
        this.visible.handle = false
        this.visible.remark = true
      },
      // 查看图片
      handleView (row){
        let uploadImagesUrlArr = row.image
        this.$refs.imgPreviewRef.loadImages(uploadImagesUrlArr);
      },
      // 翻页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      // 根据用户名查询信息
      async inquireMsg(){
        if(!this.handleInfo.account){
          return this.$Message.error(`${this.i18n_lang.dataVerification7}`)
        }
        const res = await this.$axios.request({
          url: `/user/review/info`,
          method: 'POST',
          data: {
            account: this.handleInfo.account
          }
        })
        if (res.status !== 200 || res.state != 0) {
          this.$Message.error(res.message)
        } else {
          this.handleOldInfo = { ...res.data }
        }
      },
      // 获取银行卡
      async getBanks() {
        const res = await this.$axios.request({
          url: '/banks',
          method: 'GET',
          params: {}
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.bankList = res.data
      },
      // 获取列表
      async getList(index = 1) {
        if(this.allRoutes.indexOf('366') == -1) return
        this.loading.page = true
        this.page.currentPage = index
        const req = { ...this.searchInfo }
        req.created = req.created ? this.$dateFormat(req.created) : ''
        req.created_end = req.created_end ? this.$dateFormat(req.created_end) : ''
        const res = await this.$axios.request({
          url: '/user/review',
          method: 'GET',
          params: {
            ...req,
            page: this.page.currentPage,
            page_size: this.page.pageSize
          }
        })
        this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.dataSource = res.data || []
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      // 申请提交
      async applySave(){
        this.$refs['handleInfo'].validate(async valid => {
          if (valid) {
            this.loading.btn = true
            const req = { ...this.handleInfo }
            delete req.id
            delete req.operator_id
            delete req.status
            const res = await this.$axios.request({
              url: `/user/review`,
              method: 'POST',
              data: {
                ...req
              }
            })
            this.loading.btn = false
            if (res.status !== 200 || res.state != 0) {
              this.$Message.error(res.message)
            } else {
              this.$Message.success(res.message)
              this.visible.handle = false
              this.getList()
            }
          }
        })
      },
      // 获取审核资料
      async getExamine(id) {
        const res = await this.$axios.request({
          url: `/user/review/examine/${id}`,
          method: 'GET',
          params: {}
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.handleInfo = { ...res.data.news_user_data }
        this.handleInfo.image = this.handleInfo.image ? this.handleInfo.image : []
        this.handleAmendInfo = { ...res.data.old_user_data }
        this.handleInfo.type_id = res.data.type_id
        this.visible.handle = true
      },
      // 操作审核资料
      async handleExamine(num) {
        if(num == 2 && !this.remarkInfo.remark) return this.$msg({
          type: 'error',
          message: `${this.i18n_lang.dataVerification31}`
        })
        const res = await this.$axios.request({
          url: `/user/review/examine/${this.handleInfo.id}`,
          method: 'PATCH',
          params: {
            status: num,
            rejection_reason: this.remarkInfo.remark
          }
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.visible.handle = false
        this.visible.remark = false
        this.getList()
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
