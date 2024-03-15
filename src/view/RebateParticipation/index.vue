<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <!-- <span>{{i18n_lang.RebateParticipation0}}</span>
      <Select v-model="searchInfo.type" clearable style="width:150px">
        <Option value>{{i18n_lang.RebateParticipation1}}</Option>
        <Option v-for="item in gameList" :key="item.type" :value="item.type">{{ item.rename }}</Option>
      </Select> -->
      <Button type="primary" icon="md-add" @click="handleList()">{{i18n_lang.RebateParticipation2}}</Button>
    </Card>
    <Table ref="table" border :columns="columns" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.RebateParticipation16}${page.total}${i18n_lang.RebateParticipation17}` }}</div>
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
    <!-- 弹窗操作 -->
    <Modal v-model="visible.modal" :title="`${i18n_lang.RebateParticipation3}`">
      <Form ref="madalForm" :model="infoForm" :label-width="120" :rules="ruleValidate">
        <FormItem :label="`${i18n_lang.RebateParticipation4}`" prop="type">
          <Select v-model="infoForm.type" clearable style="width:150px">
            <Option v-for="item in gameList" :key="item.type" :value="item.type">{{ item.rename }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="`${i18n_lang.RebateParticipation5}`" prop="ratio">
          <Input v-model="infoForm.ratio" style="width:150px"/>%
        </FormItem>
        <FormItem :label="`${i18n_lang.RebateParticipation6}`" prop="is_take">
          <Switch v-model="infoForm.is_take"></Switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="saveBtn">{{i18n_lang.RebateParticipation7}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  const searchInfo = {
    type: ''
  }
  import columns from './columns'
  export default {
    data() {
      const i18n_lang = this.$t('RebateParticipation');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          page: false
        },
        visible: {
          modal: false
        },
        searchInfo: { ...searchInfo },
        gameList: [],
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        infoForm: {
          type: '',
          ratio: '',
          is_take: true
        },
        ruleValidate:{
          ratio: [{ required: true, message: `${i18n_lang.RebateParticipation8}` }]
        },
        projectId: ''
      }
    },
    created() {
      this.getGameMenu()
      this.getList()
    },
    methods: {
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      handleList(row){
        if(row){
          // this.projectId = row.id
          this.infoForm = {
            type: row.type,
            ratio: row.ratio,
            is_take: row.ratio ? true : false
          }
        }else{
          this.infoForm = {
            type: '',
            ratio: '',
            is_take: true
          }
        }
        this.visible.modal = true
      },
      // 获取游戏渠道
      async getGameMenu(arrar) {
        const res = await this.$axios.request({
          url: '/game/menu',
          method: 'GET'
        })
        if (res.status !== 200) {
          this.$Message.error(res.message)
          return
        }
        this.infoForm.type = res.data[0].type
        this.gameList = res.data
      },
      //获取数据
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const res = await this.$axios.request({
          url: '/profitloss/profitratio',
          method: 'GET',
          params: {
            ...this.searchInfo,
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
        this.dataSource = res.data
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      saveBtn(){
        this.$refs['madalForm'].validate(async valid => {
          if (!valid) return
          let req = { ...this.infoForm }
          req.is_take = req.is_take ? 1 : 0
          const res = await this.$axios.request({
            url: `/profitloss/profitratio`,
            method: 'PUT',
            data: { ...req }
          })
          if (res.status !== 200 || res.state != 0) {
            this.$msg({
              type: 'error',
              message: res.message
            })
            return false
          }
          this.visible.modal = false
          this.getList()
          // this.$msg({
          //   type: 'success',
          //   message: `数据提交成功`
          // })
        })
      }
    }
  }
</script>

<style>
</style>
