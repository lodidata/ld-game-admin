<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <span>{{i18n_lang.ProfitSet0}}</span>
      <Input v-model="searchInfo.name" :placeholder="`${i18n_lang.ProfitSet1}`" clearable style="width: 150px"/>
      <span>{{i18n_lang.ProfitSet37}}</span>
      <Select v-model="searchInfo.game_type" clearable style="width:150px">
        <Option value>{{i18n_lang.ProfitSet3}}</Option>
        <Option v-for="item in gameList" :key="item.type" :value="item.type">{{ item.rename }}</Option>
      </Select>
      <span>{{i18n_lang.ProfitSet2}}</span>
      <Select v-model="searchInfo.type" clearable style="width:150px">
        <Option value>{{i18n_lang.ProfitSet3}}</Option>
        <Option v-for="item in typeList" :key="item.id" :value="item.id">{{ item.text }}</Option>
      </Select>
      <span>{{i18n_lang.ProfitSet4}}</span>
      <Select v-model="searchInfo.settle_status" clearable style="width:150px">
        <Option value>{{i18n_lang.ProfitSet3}}</Option>
        <Option v-for="item in settleList" :key="item.id" :value="item.id">{{ item.text }}</Option>
      </Select>
      <Button type="primary" icon="ios-search" class="marginRight" @click="search()">{{i18n_lang.ProfitSet5}}</Button>
      <Button type="primary" icon="md-add" @click="handleOpenModal()">{{i18n_lang.ProfitSet6}}</Button>
    </Card>
    <Table ref="table" border :columns="columns" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.ProfitSet38}${page.total}${i18n_lang.ProfitSet39}` }}</div>
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
    <!-- 操作弹窗 -->
    <Modal v-model="visible.modal" :title="`${i18n_lang.ProfitSet7}`">
      <Form ref="madalForm" :model="infoForm" :label-width="120" :rules="ruleValidate">
        <FormItem :label="`${i18n_lang.ProfitSet0}`" prop="name">
          <Input v-model="infoForm.name"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.ProfitSet2}`" prop="type">
          <Select v-model="infoForm.type" clearable style="width:150px">
            <!-- <Option value>全部</Option> -->
            <Option v-for="item in typeList" :key="item.id" :value="item.id">{{ item.text }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="`${i18n_lang.ProfitSet37}`" prop="game_type" v-if="infoForm.type == 1">
          <Select v-model="infoForm.game_type" clearable style="width:150px">
            <!-- <Option value>全部</Option> -->
            <Option v-for="item in gameList" :key="item.type" :value="item.type">{{ item.rename }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="`${i18n_lang.ProfitSet8}`" prop="proportion_value">
          <Input v-model="infoForm.proportion_value" style="width:150px"/>%
        </FormItem>
        <FormItem :label="`${i18n_lang.ProfitSet9}`">
          <RadioGroup v-model="infoForm.settle_status">
            <Radio :label="1">{{i18n_lang.ProfitSet10}}</Radio>
            <Radio :label="2">{{i18n_lang.ProfitSet11}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="`${i18n_lang.ProfitSet12}`" prop="part_value">
          <Input v-model="infoForm.part_value" style="width:150px"/>%
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="saveBtn">{{i18n_lang.ProfitSet13}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  const searchInfo = {
    name: '',
    game_type: '',
    type: '',
    settle_status: ''
  }
  import columns from './columns'
  export default {
    data() {
      const i18n_lang = this.$t('ProfitSet');
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
        typeList: [
          {
            id: 1,
            text: i18n_lang.ProfitSet14
          },
          {
            id: 2,
            text: i18n_lang.ProfitSet15
          },
          {
            id: 3,
            text: i18n_lang.ProfitSet16
          },
          {
            id: 4,
            text: i18n_lang.ProfitSet17
          },
          // {
          //   id: 5,
          //   text: i18n_lang.ProfitSet18
          // },
          {
            id: 5,
            text: i18n_lang.ProfitSet19
          }
        ],
        settleList: [
          {
            id: 1,
            text: i18n_lang.ProfitSet10
          },
          {
            id: 2,
            text: i18n_lang.ProfitSet11
          }
        ],
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        projectId: '',
        infoForm: {
          name: "",
          type: "",
          game_type: "",
          proportion_value: "",
          settle_status: 1,
          part_value: ""
        },
        ruleValidate:{
          name: [{ required: true, message: `${i18n_lang.ProfitSet20}` }],
          type: [{ required: true, message: `${i18n_lang.ProfitSet21}` }],
          proportion_value: [{ required: true, message: `${i18n_lang.ProfitSet22}` }],
          part_value: [{ required: true, message: `${i18n_lang.ProfitSet23}` }]
        }
      }
    },
    created() {
      this.getGameMenu()
    },
    methods: {
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      search(){
        this.getList()
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
        this.gameList = res.data
        this.getList()
      },
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const res = await this.$axios.request({
          url: '/system/settle',
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
          switch (item.type) {
            case 1: item.type_text = `${this.i18n_lang.ProfitSet14}`;
            	break;
            case 2: item.type_text = `${this.i18n_lang.ProfitSet15}`;
            	break;
            case 3: item.type_text = `${this.i18n_lang.ProfitSet16}`;
            	break;
            case 4: item.type_text = `${this.i18n_lang.ProfitSet17}`;
            	break;
            // case 5: item.type_text = `${this.i18n_lang.ProfitSet18}`;
            // 	break;
            case 5: item.type_text = `${this.i18n_lang.ProfitSet19}`;
            	break;
            default: item.type_text = `${this.i18n_lang.ProfitSet24}`;
          }
          this.gameList.forEach((items, indexs) => {
            if(item.game_type == items.type){
              item.rename = items.rename
            }
          })
        })
        this.dataSource = res.data
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      // 新增和设置
      handleOpenModal(row){
        this.projectId = row ? row.id : ""
        this.infoForm.name = row ? row.name : ""
        this.infoForm.type = row ? row.type : ""
        this.infoForm.game_type = row ? row.game_type : this.gameList[0].type
        this.infoForm.proportion_value = row ? row.proportion_value : ""
        this.infoForm.settle_status = row ? row.settle_status : 1
        this.infoForm.part_value = row ? row.part_value : ""
        this.visible.modal = true
      },
      // 确定
      saveBtn() {
        this.$refs['madalForm'].validate(async valid => {
          if (!valid) return
          let req = this.infoForm
          if(req.type != 1){
            req.game_type = ''
          }
          const res = await this.$axios.request({
            url: `/system/settle${this.projectId ? '/' + this.projectId : ''}`,
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

<style lang="less" scoped>
  .query_box{
    span{
      margin: 0 0 0 10px;
      &:first-child{
        margin-left: 0;
      }
    }
  }
</style>
