<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <span>{{i18n_lang.RebateSet0}}</span>
      <Select v-model="searchInfo.type" @on-change="typeChange" clearable style="width:150px">
        <Option value>{{i18n_lang.RebateSet1}}</Option>
        <Option v-for="item in typeList" :key="item.type" :value="item.type">{{ item.name }}</Option>
      </Select>
      <Button type="primary" icon="md-add" style="float: right;" @click="handleList()">{{i18n_lang.RebateSet2}}</Button>
    </Card>
    <Table ref="table" border :columns="columns" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.RebateSet32}${page.total}${i18n_lang.RebateSet33}` }}</div>
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
    <Modal v-model="visible.modal" :title="`${i18n_lang.RebateSet3}`">
      <Form ref="madalForm" :model="infoForm" :label-width="100" :rules="ruleValidate">
        <FormItem :label="`${i18n_lang.RebateSet4}`" prop="name">
          <Input v-model="infoForm.name"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.RebateSet5}`" prop="type">
          <Select v-model="infoForm.type" clearable style="width:150px">
            <Option v-for="item in typeList" :key="item.type" :value="item.type">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem :label="`${i18n_lang.RebateSet6}`" prop="game_type">
          <Select v-model="infoForm.game_type" clearable style="width:150px">
            <Option v-for="item in gameList" :key="item.type" :value="item.type">{{ item.rename }}</Option>
          </Select>
        </FormItem> -->
        <FormItem :label="`${i18n_lang.RebateSet7}`" prop="proportion_value">
          <Input v-model="infoForm.proportion_value"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.RebateSet8}`" prop="part_value">
          <Input v-model="infoForm.part_value"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.RebateSet9}`" prop="settle_status">
          <Switch v-model="infoForm.settle_status"></Switch>
        </FormItem>
        <!-- <FormItem :label="`${i18n_lang.RebateSet10}`" prop="status">
          <Switch v-model="infoForm.status"></Switch>
        </FormItem> -->
      </Form>
      <div slot="footer">
        <Button type="primary" @click="saveBtn">{{i18n_lang.RebateSet11}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  const searchInfo = {
    name: '',
    type: '',
    settle_status: ''
  }
  import columns from './columns'
  export default {
    data() {
      const i18n_lang = this.$t('RebateSet');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          page: false
        },
        visible: {
          modal: false
        },
        typeList: [
          {
            type: '1',
            name: `${i18n_lang.RebateSet25}`
          },
          {
            type: '2',
            name: `${i18n_lang.RebateSet26}`
          },
          {
            type: '3',
            name: `${i18n_lang.RebateSet27}`
          },
          {
            type: '4',
            name: `${i18n_lang.RebateSet28}`
          },
          {
            type: '5',
            name: `${i18n_lang.RebateSet29}`
          },
          {
            type: '6',
            name: `${i18n_lang.RebateSet30}`
          }
        ],
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
          name: '',
          type: '',
          // game_type: '',
          proportion_value: '',
          part_value: '',
          settle_status: true,
          status: true
        },
        ruleValidate:{
          name: [{ required: true, message: `${i18n_lang.RebateSet12}` }],
          type: [{ required: true, message: `${i18n_lang.RebateSet13}` }],
          game_type: [{ required: true, message: `${i18n_lang.RebateSet31}` }],
          proportion_value: [{ required: true, message: `${i18n_lang.RebateSet14}` }],
          part_value: [{ required: true, message: `${i18n_lang.RebateSet15}` }]
        },
        projectId: ''
      }
    },
    created() {
      this.getList()
      // this.getGameMenu()
    },
    methods: {
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      handleList(row) {
        if(row){
          this.projectId = row.id
          this.infoForm = {
            name: row.name,
            type: row.type + '',
            // game_type: row.game_type,
            proportion_value: row.proportion_value,
            part_value: row.part_value,
            settle_status: row.settle_status == 1 ? true : false,
            status: row.status == 1 ? true : false
          }
        }else{
          this.projectId = ''
          this.infoForm = {
            name: '',
            type: '',
            // game_type: this.gameList[0].type,
            proportion_value: '',
            part_value: '',
            settle_status: true,
            status: true
          }
        }
        this.visible.modal = true
      },
      typeChange(e){
        this.getList()
      },
      // 获取游戏渠道
      async getGameMenu() {
        const res = await this.$axios.request({
          url: '/game/menu',
          method: 'GET'
        })
        if (res.status !== 200) {
          this.$Message.error(res.message)
          return
        }
        // this.infoForm.game_type = res.data[0].type
        this.gameList = res.data
      },
      //获取数据
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const res = await this.$axios.request({
          url: '/profitloss/fee',
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
        res.data.forEach((item, index) => {
          this.typeList.forEach((items, indexs) => {
            if(item.type == items.type){
              item.type_text = items.name
            }
          })
        })
        this.dataSource = res.data
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      saveBtn(){
        this.$refs['madalForm'].validate(async valid => {
          if (!valid) return
          let req = { ...this.infoForm }
          req.settle_status = req.settle_status ? 1 : 2
          req.status = req.status ? 1 : 2
          const res = await this.$axios.request({
            url: `/profitloss/fee${this.projectId ? '/' + this.projectId : ''}`,
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
