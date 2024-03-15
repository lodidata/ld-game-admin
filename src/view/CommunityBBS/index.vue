<template>
  <div id="bbs">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div class="bbs">
      <!-- <div>
        <span>开启社群论坛管理：</span>
        <span>
          <Switch v-model="bbs_switch" @on-change="handleChange()"></Switch>
        </span>
      </div> -->
      <div>
        <Button type="primary" icon="md-add" @click="addBbs()">{{i18n_lang.CommunityBBS0}}</Button>
      </div>
    </div>
    <MyTable :columns="columns" :data="dataSource" border></MyTable>
    <!-- 新增/修改 -->
    <Modal
    v-model="visible.edit"
    :title="editType == 'add' ? i18n_lang.CommunityBBS1 : i18n_lang.CommunityBBS2"
    :width="600"
    :styles="{ top: '60px' }"
    @on-cancel="handleCloseModal"
    >
      <Spin v-if="loading.edit" size="large" fix></Spin>
      <Form
      v-if="visible.edit"
      ref="editForm"
      :model="editInfo"
      :label-width="100"
      :rules="ruleValidate"
      >
        <FormItem :label="i18n_lang.CommunityBBS3" prop="name">
          <Input v-model="editInfo.name" />
        </FormItem>
        <FormItem :label="i18n_lang.CommunityBBS4" prop="jump_url">
          <Input v-model="editInfo.jump_url" />
        </FormItem>
        <FormItem :label="i18n_lang.CommunityBBS5" prop="icon">
          <UploadImg v-model="editInfo.icon" @input="updataImgs"></UploadImg>
        </FormItem>
        <FormItem :label="i18n_lang.CommunityBBS6">
          <Switch v-model="editInfo.status"></Switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button @click="visible.edit = false">关闭</Button> -->
        <Button type="primary" :loading="loading.btn" @click="operateList">{{i18n_lang.CommunityBBS22}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import MyTable from '_c/MyTable'
  import columns from './columns'
  import UploadImg from './UploadImg'
  export default {
    data() {
      const i18n_lang = this.$t('CommunityBBS');
      return{
        i18n_lang: i18n_lang,
        loading: {
          page: false,
          edit: false,
          btn: false
        },
        visible: {
          edit: false
        },
        editType: 'add',
        bbs_switch: true,
        columns: columns(this),
        dataSource: [],
        editInfo: {
          id: '',
          name: '',
          icon: '',
          jump_url: '',
          status: true
        },
        ruleValidate: {
          name: [{ required: true, message: i18n_lang.CommunityBBS7 }],
          jump_url: [{ required: true, message: i18n_lang.CommunityBBS8 }],
          icon: [{ required: true, message: i18n_lang.CommunityBBS9 }]
        }
      }
    },
    created() {
      this.getData()
    },
    components: {
      MyTable,
      UploadImg
    },
    methods: {
      handleChange(){
        console.log('bbs_switch', this.bbs_switch)
      },
      addBbs(){
        this.visible.edit = true
        this.editType = 'add'
        this.editInfo = {
          id: '',
          name: '',
          icon: '',
          jump_url: '',
          status: true
        }
      },
      //上传图片
      updataImgs(url){
        this.editInfo.icon = url
      },
      // 关闭新增
      handleCloseModal() {
        this.$refs['editForm'].resetFields()
      },
      //开启关闭
      async amendStatus(row){
        // this.visible.edit = true
        this.loading.page = true
        this.editType = 'edit'
        const req = row
        req.status = req.status == 1 ? 0 : 1
        // this.editInfo = row
        // this.editInfo.status = row.status == 0 ? true : false
        const res = await this.$axios.request({
          url: `/community/edit`,
          method: `PUT`,
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
      },
      compileList(row){
        this.editType = 'edit'
        this.editMassage(row)
      },
      //获取信息
      async editMassage(row){
        const res = await this.$axios.request({
          url: `/community/edit?id=${row.id}`,
          method: `GET`
        })
        // this.$msg({
        //   type: res.status !== 200 ? 'error' : 'success',
        //   message: res.message
        // })
        // if (res.status !== 200) return
        this.editInfo = res.data
        this.editInfo.status = row.status == 0 ? true : false
        this.visible.edit = true
      },
      //获取数据
      async getData() {
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/community/list',
          method: 'GET',
          params: {}
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
      // 跳转链接操作
      async operateList(){
        this.loading.btn = true
        this.$refs['editForm'].validate(async valid => {
          if (!valid) {
            this.loading.btn = false
            return
          }
          this.loading.page = true
          const req = { ...this.editInfo }
          req.status = req.status ? 0 : 1
          const url = this.editType === 'edit' ? `/community/edit` : '/community/add'
          const method = this.editType === 'edit' ? 'PUT' : 'POST'
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
      // 删除
      async deleteList(row){
        this.loading.page = true
        const res = await this.$axios.request({
          url: `/community/del`,
          method: `POST`,
          data: {
            id: row.id
          }
        })
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.visible.edit = false
        this.getData()
      },
    }
  }
</script>

<style lang="less" scoped>
  .bbs{
    overflow: hidden;
    &>div{
      display: inline-block;
      &:first-child{
        font-size: 14px;
        line-height: 28px;
        color: #999999;
        float: left;
      }
      &:nth-child(2){
        float: right;
      }
    }
  }
</style>
