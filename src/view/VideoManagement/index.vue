<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div style="margin-bottom: 20px;">
      <Button type="primary" icon="md-add" @click="operationVideo()">{{i18n_lang.VideoManagement0}}</Button>
    </div>
    <Table class="table" border :columns="columns" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.VideoManagement23}${page.total}${i18n_lang.VideoManagement24}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>
    <!-- 新增/修改 @on-cancel="handleCloseModal"-->
    <Modal
      v-model="visible.edit"
      :title="`${i18n_lang.VideoManagement1}${editInfo.id ? i18n_lang.VideoManagement2 : i18n_lang.VideoManagement3}`"
      :width="600"
      :styles="{ top: '60px' }"
    >
      <Form
        ref="editForm"
        :label-width="100"
        :model="editInfo"
        :rules="ruleValidate"
      >
        <FormItem :label="`${i18n_lang.VideoManagement4}`" prop="title">
          <Input v-model="editInfo.title" />
        </FormItem>
        <FormItem :label="`${i18n_lang.VideoManagement5}`" prop="location">
          <!-- <Input v-model="editInfo.location" /> -->
          <Select v-model="editInfo.location">
            <Option :value="`${i18n_lang.VideoManagement6}`">{{i18n_lang.VideoManagement6}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="`${i18n_lang.VideoManagement7}`" prop="link">
          <Input v-model="editInfo.link" />
        </FormItem>
        <FormItem :label="`${i18n_lang.VideoManagement8}`" prop="status">
          <Switch v-model="editInfo.status"></Switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button @click="visible.edit = false">关闭</Button> -->
        <Button type="primary" :loading="loading.btn" @click="operationVideoList()">{{i18n_lang.VideoManagement9}}</Button>
      </div>
    </Modal>
    <Modal
      v-model="visible.video"
      :title="`${i18n_lang.VideoManagement10}`"
      :width="600"
      :styles="{ top: '60px' }"
    >
      <video :src="videoUrl" controls="controls" style="width: 100%;"></video>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  import MyTable from '_c/MyTable'
  import columns from './columns'
  export default {
    data() {
      const i18n_lang = this.$t('VideoManagement');
      return{
        i18n_lang: i18n_lang,
        loading: {
          page: false,
          btn: false
        },
        visible: {
          edit: false,
          video: false
        },
        columns: columns(this),
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 100, 1000, 2000]
        },
        videoUrl: "",
        editInfo: {
          id: '',
          title: '',
          link: '',
          location: i18n_lang.VideoManagement6,
          status: true
        },
        ruleValidate: {
          title: [{ required: true, message: i18n_lang.VideoManagement11 }],
          link: [{ required: true, message: i18n_lang.VideoManagement12 }]
        }
      }
    },
    created() {
      this.getData()
    },
    components: {
      MyTable
    },
    methods: {
      // 设置每页条数
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getData()
      },
      //获取数据
      async getData(i = 1) {
        this.page.currentPage = i
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/video',
          method: 'GET',
          params: {
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
          return
        }
        this.dataSource = res.data
      },
      // 预览视频
      previewVideo(row){
        this.videoUrl = row.link
        this.visible.video = true
      },
      //视频操作
      operationVideo(row){
        this.editInfo.id = row ? row.id : ""
        this.editInfo.title = row ? row.title : ""
        this.editInfo.link = row ? row.link : ""
        this.editInfo.location = this.i18n_lang.VideoManagement6
        if(row){
          this.editInfo.status = row.status == 1 ? true : false
        }else{
          this.editInfo.status = true
        }
        this.visible.edit = true
      },
      // 视频添加/编辑
      async operationVideoList(){
        this.loading.btn = true
        this.$refs['editForm'].validate(async valid => {
          if (!valid) {
            this.loading.btn = false
            return
          }
          this.loading.page = true
          const req = { ...this.editInfo }
          req.status = req.status ? 1 : 0
          const url = `/video`
          const method = this.editInfo.id ? 'PUT' : 'POST'
          // this.editInfo.id ? delete req.id : ''
          const res = await this.$axios.request({
            url,
            method,
            data: req
          })
          this.loading.btn = false
          this.$msg({
            type: res.status !== 200 ? 'error' : 'success',
            message: res.message
          })
          if (res.status !== 200) return
          this.visible.edit = false
          this.getData()
        })
      },
      // 删除视频
      async deleteVideo(row){
        this.loading.page = true
        const res = await this.$axios.request({
          url: `/video`,
          method: `DELETE`,
          data: {
            id: row.id
          }
        })
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        // this.visible.edit = false
        this.getData()
      }
    }
  }
</script>

<style>
</style>
