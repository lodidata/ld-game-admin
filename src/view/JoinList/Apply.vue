<template>
  <div>
    <Spin v-if="loading.applyPage" size="large" fix></Spin>
    <Card dis-hover class="query_box mb30">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.joinList40}}</span>
          <Input v-model="initQuery.user_name" placeholder style="width:150px;"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.joinList41}}</span>
          <!-- <DatePicker
            v-model="time"
            type="daterange"
            placeholder
            style="width: 200px"
            clearable
            @on-change="selectTime"
          ></DatePicker> -->
          <DatePicker v-model="initQuery.start_time" type="datetime" placeholder style="width: 180px"></DatePicker>
          <span>-</span>
          <DatePicker v-model="initQuery.end_time" type="datetime" placeholder style="width: 180px"></DatePicker>
        </div>
        <div class="item">
          <span>{{i18n_lang.joinList42}}</span>
          <Input v-model="initQuery.active_name" placeholder style="width:150px;"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.joinList43}}</span>
          <Select v-model="initQuery.active_type_id" style="width:150px">
            <Option value>{{i18n_lang.joinList44}}</Option>
            <Option v-for="(item, i) in activeList" :key="i" :value="item.id">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.joinList74}}</span>
          <Select v-model="initQuery.status" style="width:150px">
            <Option value>{{i18n_lang.joinList44}}</Option>
            <Option value="undetermined">{{i18n_lang.joinList46}}</Option>
            <Option value="pass">{{i18n_lang.joinList47}}</Option>
            <Option value="rejected">{{i18n_lang.joinList48}}</Option>
          </Select>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" @click="search">{{i18n_lang.joinList49}}</Button>
          <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.joinList50}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportData">{{i18n_lang.joinList51}}</Button>
        </div>
      </div>
    </Card>
    <Table ref="table" border :columns="columns" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.joinList37}${page.total}${i18n_lang.joinList38}` }}</div>
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
    <Modal v-model="visible.handle" :title="`${handleInfo.status ? i18n_lang.joinList52 : i18n_lang.joinList53}`">
      <Form
        ref="handleInfo"
        :model="handleInfo"
        :label-width="100"
        :rules="ruleValidate"
      >
        <FormItem :label="`${i18n_lang.joinList54}`" prop="money" v-if="handleInfo.status">
          <Input v-model="handleInfo.money"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.joinList55}`" prop="user_dml" v-if="handleInfo.status">
          <Input v-model="handleInfo.user_dml"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.joinList82_4_3}`" prop="content" v-if="!handleInfo.status">
          <Input v-model="handleInfo.content"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.modalButton" @click="handleSave()">{{i18n_lang.joinList57}}</Button>
      </div>
    </Modal>
    <image-preview ref="imgPreviewRef"></image-preview>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import columns from './ApplyColumns'
  import imagePreview from "./image-preview/imagePreview.vue"
  const initQuery = {
    user_name: "",
    start_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,
    end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`,
    active_name: "",
    active_type_id: "",
    status: ""
  }
  export default {
    components: {
      imagePreview
    },
    data() {
      const i18n_lang = this.$t('joinList');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          applyPage: false,
          modalButton: false
        },
        visible: {
          handle: false
        },
        time: [initQuery.start_time, initQuery.end_time],
        initQuery: { ...initQuery },
        activeList: [],
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        handleInfo: {
          id: '',
          status: 1,
          content: '',
          money: '',
          user_dml: ''
        },
        ruleValidate: {
          content: [{ required: true, message: `${i18n_lang.joinList83_4_3}`, trigger: 'blur' }],
          money: [{ required: true, message: `${i18n_lang.joinList59}`, trigger: 'blur' }],
          user_dml: [{ required: true, message: `${i18n_lang.joinList60}`, trigger: 'blur' }]
        }
      }
    },
    created() {
      this.classList()
    },
    // computed: {
    //   ...mapState({
    //     allRoutes: state => state.user.allRoutes
    //   })
    // },
    methods: {
      ...mapActions({
        getUserDetail: 'detail/info'
      }),
      // 选择日期
      selectTime(val) {
        [this.initQuery.start_time, this.initQuery.end_time] = val
      },
      // 查询
      search(){
        this.getList()
      },
      // 重置
      reset(){
        this.initQuery = { ...initQuery }
        this.getList()
      },
      // 查看用户详情
      handleUserDetail(row) {
        this.getUserDetail({ username: row.user_name, id: row.user_id })
      },
      // 查看图片
      handleView (row){
        let uploadImagesUrlArr = row.apply_pic.split(',')
        this.$refs.imgPreviewRef.loadImages(uploadImagesUrlArr);
      },
      // 点击操作审核、拒绝
      handleHandle(row, status){
        this.handleInfo = {
          id: row.id,
          status: status,
          content: '',
          money: '',
          user_dml: ''
        }
        this.visible.handle = true
      },
      // 修改分页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      // 获取分类列表
      async classList() {
        const res = await this.$axios.request({
          url: '/active/type',
          method: 'GET'
        })
        if (res.status !== 200) {
          this.$Message.error(res.message)
          return
        }
        if(res.data && res.data.length){
          this.activeList = res.data.filter(x => x.status == 'enabled')
        }
        let parameter = sessionStorage.getItem('parameter') || '{}'
        if(JSON.parse(parameter).Apply){
          this.initQuery = {
            user_name: JSON.parse(parameter).Apply.user_name ? JSON.parse(parameter).Apply.user_name : "",
            start_time: JSON.parse(parameter).Apply.start_time ? JSON.parse(parameter).Apply.start_time : "",
            end_time: JSON.parse(parameter).Apply.end_time ? JSON.parse(parameter).Apply.end_time : "",
            active_name: JSON.parse(parameter).Apply.active_name ? JSON.parse(parameter).Apply.active_name : "",
            active_type_id: JSON.parse(parameter).Apply.active_type_id ? JSON.parse(parameter).Apply.active_type_id : "",
            status: JSON.parse(parameter).Apply.status ? JSON.parse(parameter).Apply.status : ""
          }
          this.getList(JSON.parse(parameter).Apply.page)
        }else{
          this.getList()
        }

      },
      //获取数据
      async getList(index = 1) {
        this.loading.applyPage = true
        this.page.currentPage = index
        const req = { ...this.initQuery }
        req.start_time = req.start_time ? this.$dateTimeFormat(new Date(req.start_time)) : ''
        req.end_time = req.end_time ? this.$dateTimeFormat(new Date(req.end_time)) : ''
        const res = await this.$axios.request({
          url: '/active/apply/user',
          method: 'GET',
          params: {
            ...req,
            page: this.page.currentPage,
            page_size: this.page.pageSize
          }
        })
        this.loading.applyPage = false
        if (res.status !== 200 || res.state != 0) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        // let parameterPage = sessionStorage.getItem('parameter') || "{}"
        // let parameter = JSON.parse(parameterPage)
        // parameter.Apply = {
        //   ...this.initQuery,
        //   page: this.page.currentPage,
        //   page_size: this.page.pageSize
        // }
        // sessionStorage.setItem('parameter', JSON.stringify(parameter))
        res.data.forEach((item, index) => {
          this.activeList.forEach((items, indexs) => {
            if(item.active_type_id == items.id){
              item.active_type_id_name = items.name
            }
          })
        })
        this.dataSource = res.data
        // console.log('this.dataSource', this.dataSource)
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      // 通过/拒绝操作
      async handleSave(){
        this.$refs['handleInfo'].validate(async valid => {
          if (valid) {
            this.loading.modalButton = true
            const req = { ...this.handleInfo }
            delete req.id
            if(req.status) {
              delete req.content
            }else{
              delete req.money
              delete req.user_dml
            }
            let url = ''
            if(req.status){
              url = `/active/apply/user/pass/${this.handleInfo.id}`
            }else{
              url = `/active/apply/user/reject/${this.handleInfo.id}`
            }
            const res = await this.$axios.request({
              // url: `/active/apply/user/${this.handleInfo.id}`,
              url: `${url}`,
              method: 'PUT',
              data: {
                ...req
              }
            })
            this.loading.modalButton = false
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
      // 导出
      async exportData(){
        const req = { ...this.initQuery }
        req.start_time = req.start_time ? this.$dateTimeFormat(new Date(req.start_time)) : ''
        req.end_time = req.end_time ? this.$dateTimeFormat(new Date(req.end_time)) : ''
        const res = await this.$axios.request({
          url: '/active/apply/user/export',
          method: 'GET',
          responseType: 'blob',
          params: {
            ...req
          }
        })
        // console.log('new Blob([res]', res)
        if (res.status !== 200) {
          if(res.status == 401){
            this.$Message.error(`${this.i18n_lang.joinList81}`)
          }
          // console.log(123)
          // this.$Message.error(res.message)
        }else{
          const url = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', 'excel.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }
    }
  }
</script>

<style>
</style>
