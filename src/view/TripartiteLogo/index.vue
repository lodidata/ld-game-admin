<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item"></div>
      </div>
      <div style="overflow: hidden;">
        <Button type="primary" icon="md-add" style="float: right;" @click="handleBtn()">{{i18n_lang.tripartiteLogo0}}</Button>
      </div>
    </Card>
    <Table ref="table" border :columns="columns" :data="dataSource" style="margin-top: 20px"></Table>
    <Modal v-model="visible.handle" :title="`${i18n_lang.tripartiteLogo1}`">
      <Form
        ref="handleInfo"
        :model="handleInfo"
        :label-width="100"
        :rules="ruleValidate"
      >
        <FormItem :label="`${i18n_lang.tripartiteLogo2}`" prop="name">
          <Input v-model="handleInfo.name"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.tripartiteLogo3}`" prop="logo">
          <UploadImg
            v-model="handleInfo.logo"
            :batchUrl="true"
            @input="batchUrlFn"
            @clearFile="clearFile"
          ></UploadImg>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="handleSave()">{{i18n_lang.tripartiteLogo4}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import columns from './columns'
  import UploadImg from './UploadImg'
  const handleInfo = {
    name: "",
    logo: ""
  }
  export default {
    data() {
      const i18n_lang = this.$t('tripartiteLogo');
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
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 100, 1000, 2000]
        },
        handleInfo: { ...handleInfo },
        ruleValidate: {
          name: [{ required: true, message: `${i18n_lang.tripartiteLogo5}`, trigger: 'blur' }],
          logo: [{ required: true, message: `${i18n_lang.tripartiteLogo6}`, trigger: 'blur' }],
        }
      }
    },
    created() {
      this.getList()
    },
    components: {
      UploadImg
    },
    methods: {
      // 编辑
      handleBtn(row){
        if(row){
          this.handleInfo = {
            id: row.id,
            name: row.name,
            logo: row.logo
          }
        }else{
          this.handleInfo = { ...handleInfo }
        }
        this.visible.handle = true
      },
      // 赋值图片
      batchUrlFn(url){
        this.handleInfo.logo = url
      },
      // 删除图片
      clearFile(){
        this.handleInfo.logo = ''
      },
      // 翻页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      // 获取列表
      async getList(index = 1) {
        this.loading.page = true
        // this.page.currentPage = index
        const res = await this.$axios.request({
          url: '/copywriter/thirdLogo',
          method: 'GET',
          params: {
            // page: this.page.currentPage,
            // page_size: this.page.pageSize
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
        // this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      // 三方logo提交
      async handleSave(){
        this.$refs['handleInfo'].validate(async valid => {
          if (valid) {
            this.loading.btn = true
            const req = {
              name: this.handleInfo.name,
              logo: this.handleInfo.logo
            }
            let url = ''
            if(this.handleInfo.id){
              url = `/copywriter/thirdLogo/${this.handleInfo.id}`
            }else{
              url = `/copywriter/thirdLogo`
            }
            const res = await this.$axios.request({
              url: `${url}`,
              method: this.handleInfo.id ? 'PUT' : 'POST',
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
      // 删除
      async deleteBtn(row){
        const res = await this.$axios.request({
          url: `/copywriter/thirdLogo/${row.id}`,
          method: 'delete'
        })
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getList()
      },
      async swapItems(current, target) {
        const data = this.dataSource
        data[current] = data.splice(target, 1, data[current])[0]
        // this.loading.page = true
        const req = this.dataSource.map((o, i) => ({ id: o.id, sort: i + 1 }))
        const res = await this.$axios.request({
          url: '/copywriter/thirdLogo/sort',
          method: 'PUT',
          data: {
            data: req
          }
        })
        // this.loading.page = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getList()
      },
    }
  }
</script>

<style lang="less" scoped>
</style>
