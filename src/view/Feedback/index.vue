<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.feedback0}}：</span>
          <DatePicker
            v-model="time"
            type="daterange"
            placeholder
            style="width: 200px"
            clearable
            @on-change="selectTime"
          ></DatePicker>
        </div>
        <div class="item">
          <span>{{i18n_lang.feedback1}}：</span>
          <Input v-model="searchInfo.name" :placeholder="` `" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.feedback2}}：</span>
          <Input v-model="searchInfo.mobile" :placeholder="` `" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.feedback3}}：</span>
          <Select v-model="searchInfo.type" clearable style="width:150px">
            <Option value>{{i18n_lang.feedback4}}</Option>
            <Option v-for="item in typeList" :key="item.key" :value="item.key">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.feedback5}}：</span>
          <Select v-model="searchInfo.status" clearable style="width:150px">
            <Option value>{{i18n_lang.feedback4}}</Option>
            <Option v-for="item in statusList" :key="item.key" :value="item.key">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" @click="inquire">{{i18n_lang.feedback6}}</Button>
          <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.feedback7}}</Button>
        </div>
      </div>
    </Card>
    <Table ref="table" border :columns="columns" :data="dataSource" style="margin-top: 20px"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.feedback37}${page.total}${i18n_lang.feedback38}` }}</div>
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
    <Modal v-model="visible.handle" :title="handleInfo.status == '1' ? `${i18n_lang.feedback8}` : `${i18n_lang.feedback9}`">
      <Form
      ref="handleInfo"
      :model="handleInfo"
      :label-width="100"
      :rules="ruleValidate"
      >
        <FormItem :label="`${i18n_lang.feedback1}`" prop="user_name">
          <Input v-model="handleInfo.user_name" disabled />
        </FormItem>
        <FormItem :label="`${i18n_lang.feedback10}`" prop="mobile">
          <Input v-model="handleInfo.mobile" disabled />
        </FormItem>
        <FormItem :label="`${i18n_lang.feedback11}`" prop="type_text">
          <Input v-model="handleInfo.type_text" disabled />
        </FormItem>
        <!-- <FormItem :label="`问题描述`" prop="type_text">
          <Input v-model="handleInfo.type_text" disabled />
        </FormItem> -->
        <FormItem :label="`${i18n_lang.feedback12}`" prop="question">
          <Input type="textarea" :rows="3" v-model="handleInfo.question" disabled />
        </FormItem>
        <FormItem :label="`${i18n_lang.feedback13}`" prop="reply">
          <Input type="textarea" :rows="3" v-model="handleInfo.reply" :disabled="handleInfo.status == '1' ? true : false" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="handleSave()">{{i18n_lang.feedback14}}</Button>
      </div>
    </Modal>
    <!-- 查看图片 -->
    <image-preview ref="imgPreviewRef"></image-preview>
  </div>
</template>

<script>
  import columns from './columns'
  import imagePreview from "./image-preview/imagePreview.vue"
  const searchInfo = {
    start_time: '',
    end_time: '',
    name: '',
    mobile: '',
    type: '',
    status: ''
  }
  const handleInfo = {
    id: '',
    user_name: '',
    mobile: '',
    type: '',
    type_text: '',
    question: '',
    reply: '',
    status: ''
  }
  export default {
    components: {
      imagePreview
    },
    data() {
      const i18n_lang = this.$t('feedback');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          page: false,
          btn: false
        },
        visible: {
          handle: false
        },
        time: [searchInfo.start_time, searchInfo.end_time],
        searchInfo: { ...searchInfo },
        typeList: [
          {
            key: '1',
            name: `${i18n_lang.feedback15}`
          },
          {
            key: '2',
            name: `${i18n_lang.feedback16}`
          },
          {
            key: '3',
            name: `${i18n_lang.feedback17}`
          },
          {
            key: '4',
            name: `${i18n_lang.feedback18}`
          }
        ],
        statusList: [
          {
            key: '0',
            name: `${i18n_lang.feedback19}`
          },
          {
            key: '1',
            name: `${i18n_lang.feedback20}`
          }
        ],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        dataSource: [],
        handleInfo: { ...handleInfo },
        ruleValidate: {
          reply: [{ required: true, message: `${i18n_lang.feedback21}`, trigger: 'blur' }],
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 选择日期
      selectTime(val) {
        [this.searchInfo.start_time, this.searchInfo.end_time] = val
      },
      // 查询
      inquire(){
        this.getList()
      },
      // 重置
      reset(){
        this.time = [ searchInfo.start_time, searchInfo.end_time ]
        this.searchInfo = { ...searchInfo }
        this.getList()
      },
      // 查看图片
      handleView (row){
        let uploadImagesUrlArr = row.img.split(',')
        this.$refs.imgPreviewRef.loadImages(uploadImagesUrlArr);
      },
      // 查看详情
      handleBtn(row){
        this.handleInfo = {
          id: row.id,
          user_name: row.user_name,
          mobile: row.mobile,
          type: row.type,
          type_text: '',
          question: row.question,
          reply: row.reply,
          status: row.status
        }
        switch (row.type) {
        	case 1:
        		this.handleInfo.type_text = `建议反馈`
        		break;
        	case 2:
        		this.handleInfo.type_text = `有奖举报`
        		break;
          case 3:
          	this.handleInfo.type_text = `BUG反馈`
          	break;
          case 4:
          	this.handleInfo.type_text = `其他`
          	break;
        }
        this.visible.handle = true
      },
      // 翻页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      // 获取列表
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const req = { ...this.searchInfo }
        req.start_time = req.start_time ? this.$dateFormat(req.start_time) : ''
        req.end_time = req.end_time ? this.$dateFormat(req.end_time) : ''
        const res = await this.$axios.request({
          url: '/user/feedback',
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
      // 回复内容
      async handleSave(){
        if(this.handleInfo.status == '1') return this.visible.handle = false
        this.$refs['handleInfo'].validate(async valid => {
          if (valid) {
            this.loading.btn = true
            const req = {
              reply: this.handleInfo.reply
            }
            const res = await this.$axios.request({
              url: `/user/feedback/${this.handleInfo.id}`,
              method: 'PUT',
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
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
