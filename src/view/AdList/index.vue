<template>
  <div id="AdList" class="card">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div>
      <Tabs @on-click="changeTab">
        <TabPane v-for="(it, i) in tabs" :key="i" :label="it.value" :name="it.name"></TabPane>
        <Button slot="extra" type="primary" @click="handleOpenModal('')">{{i18n_lang.adList0}}</Button>
      </Tabs>
    </div>
    <Table class="table" border :columns="columns" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.adList54}${page.total}${i18n_lang.adList55}` }}</div>
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

    <!-- 编辑/新增  `${editType === 'add' ? '新增' : '编辑'}轮播广告`-->
    <Modal
      v-model="visible.modal"
      :title="editType === 'add' ? `${i18n_lang.adList1}${i18n_lang.adList3}` : `${i18n_lang.adList2}${i18n_lang.adList3}`"
      :width="600"
      :styles="{ top: '20px' }"
      @on-cancel="handleCloseModal"
    >
      <Spin v-if="loading.modal" size="large" fix></Spin>
      <Form
        v-if="visible.modal"
        ref="editForm"
        :model="editInfo"
        label-position="top"
        :rules="ruleValidate"
      >
        <FormItem :label="i18n_lang.adList4" prop="name"> <Input v-model="editInfo.name" /> </FormItem>
        <FormItem :label="i18n_lang.adList5" prop="picture">
          <p>{{i18n_lang.adList6}}</p>
          <span>{{i18n_lang.adList7}}</span>
          <UploadImg ref="uploadImg" v-model="editInfo.picture"></UploadImg>
        </FormItem>
        <!-- <FormItem label="使用平台" prop="pf">
          <Select v-model="editInfo.pf" placeholder="请选择">
            <Option value="pc">pc端</Option>
            <Option value="h5">移动端</Option>
          </Select>
        </FormItem>
        <FormItem label="使用于" prop="position">
          <Select v-model="editInfo.position" placeholder="请选择">
            <Option value="home">首页</Option>
            <Option value="egame">电子页</Option>
            <Option value="live">视讯页</Option>
            <Option value="lottery">彩票页</Option>
            <Option value="sport">体育页</Option>
            <Option value="agent">代理页</Option>
          </Select>
        </FormItem>-->
        <FormItem :label="i18n_lang.adList8" prop="sort"> <Input v-model="editInfo.sort" /> </FormItem>
        <FormItem :label="i18n_lang.adList9" prop="status">
          <Select v-model="editInfo.status" :placeholder="i18n_lang.adList10">
            <Option value="enabled">{{i18n_lang.adList11}}</Option>
            <Option value="disabled">{{i18n_lang.adList12}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.adList13" prop="link_type">
          <RadioGroup v-model="editInfo.link_type">
            <Radio :label="1">{{i18n_lang.adList14}}</Radio>
            <Radio :label="2">{{i18n_lang.adList15}}</Radio>
            <Radio :label="3">{{i18n_lang.adList47}}</Radio>
            <Radio :label="4">{{i18n_lang.adList48}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem v-show="editInfo.link_type === 1" :label="i18n_lang.adList16">
          <Input v-model="editInfo.link1" :placeholder="i18n_lang.adList17" />
        </FormItem>
        <FormItem v-if="editInfo.link_type === 2" :label="i18n_lang.adList18" prop="link2">
          <Select v-model="editInfo.link2" :placeholder="i18n_lang.adList19">
            <Option v-for="(it, i) in activeList" :key="i" :value="String(it.id)">{{
              it.title
            }}</Option>
          </Select>
        </FormItem>
        <FormItem v-if="editInfo.link_type === 3" :label="i18n_lang.adList49">
          <Input v-model="editInfo.link1" :placeholder="i18n_lang.adList17" />
          <!-- <Select v-model="model" :placeholder="i18n_lang.adList50">
            <Option v-for="(item, index) in modelList" :key="item.path" :value="item.path">{{item.name}}</Option>
          </Select> -->
        </FormItem>
        <FormItem v-if="editInfo.link_type === 4" :label="i18n_lang.adList51">
          <Select v-model="gameOneText" @on-change="getGameTwo($event)" :placeholder="i18n_lang.adList50">
            <Option v-for="(item, index) in gameOneList" :key="item.id" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem v-if="editInfo.link_type === 4" :label="i18n_lang.adList52">
          <Select v-model="gameTwoText" @on-change="getGameThree($event)" :placeholder="i18n_lang.adList50">
            <Option v-for="(item, index) in gameTwoList" :key="item.id" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem v-if="editInfo.link_type === 4" :label="i18n_lang.adList53">
          <Select v-model="gameThreeText" :placeholder="i18n_lang.adList50">
            <Option v-for="(item, index) in gameThreeList" :key="item.id" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.modalButton" @click="handleConfirm">{{i18n_lang.adList20}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import UploadImg from '_c/UploadImg'
import columns from './columns'
const ininData = {
  // 编辑列表
  link_type: 1, // 关联类型，活动或者跳转
  link: '', // 实际发送
  link1: '', // 关联内容，跳转地址
  link2: '', // 关联内容，活动id
  name: '', // 名称
  pf: 'h5', // 平台
  picture: '', // 图片地址
  position: 'home', // 使用于
  sort: '', // 排序
  status: '' // 启用状态
}
export default {
  components: {
    UploadImg
  },
  data() {
    const i18n_lang = this.$t('adList');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        modal: false,
        modalButton: false
      },
      visible: {
        modal: false
      },
      curTab: 'pc', // 当前tab
      tabs: [
        {
          name: 'pc',
          value: i18n_lang.adList21
        },
        {
          name: 'h5',
          value: i18n_lang.adList22
        }
      ],
      // table
      columns: columns(this),
      dataSource: [],
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      // edit
      editType: 'add', // 编辑类型 add/edit
      editInfo: {}, // 编辑列表
      activeList: [], // 活动列表
      // 表单验证规则
      ruleValidate: {
        name: [
          {
            required: true,
            validator: (rule, value, cb) => (value.trim() ? cb() : cb(i18n_lang.adList23))
          }
        ],
        picture: [{ required: true, message: i18n_lang.adList24 }],
        pf: [{ required: true, message: i18n_lang.adList25, trigger: 'change' }],
        position: [{ required: true, message: i18n_lang.adList26, trigger: 'change' }],
        sort: [{ required: true, message: i18n_lang.adList27 }],
        status: [{ required: true, message: i18n_lang.adList28, trigger: 'change' }],
        link_type: [
          {
            trigger: 'change',
            validator: (rule, value, cb) => (value ? cb() : cb(i18n_lang.adList29))
          }
        ],
        link2: [
          {
            trigger: 'change',
            validator: (rule, value, cb) => (value ? cb() : cb(i18n_lang.adList30))
          }
        ]
      },
      model: '',
      modelList: [],
      gameOneText: '',
      gameOneList: [],
      gameTwoText: '',
      gameTwoList: [],
      gameThreeText: '',
      gameThreeList: []
    }
  },
  created() {
    this.getData()
  },
  watch: {
    'editInfo.link_type'(newName, oldName){
      if(newName === 3){
        // this.jumpModel()
      }
      if(newName === 4){
        this.getGame('', '', 'one')
      }
    }
  },
  methods: {
    // 切换显示类型
    changeTab(name) {
      this.curTab = name
      this.page.currentPage = 1
      this.page.pageSize = 10
      this.editInfo.pf = name
      this.getData()
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 获取数据
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/copywriter/carousel',
        method: 'GET',
        params: {
          pf: this.curTab,
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
      res.data.forEach((item, index) => {
        if(item.link_type == 1){
          item.link_type_text = this.i18n_lang.adList14
        }
        if(item.link_type == 2){
          item.link_type_text = this.i18n_lang.adList15
        }
        if(item.link_type == 3){
          item.link_type_text = this.i18n_lang.adList47
        }
        if(item.link_type == 4){
          item.link_type_text = this.i18n_lang.adList48
        }
      })
      this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      this.dataSource = res.data
    },
    // 启用/停用
    async handleStop(row) {
      const res = await this.$axios.request({
        url: `/copywriter/carousel/status/${row.id}`,
        method: 'PATCH',
        data: {
          status: row.status === 'enabled' ? 'disabled' : 'enabled'
        }
      })

      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.getData()
    },
    // 获取活动列表
    async getActiveList() {
      this.loading.modal = true
      const res = await this.$axios.request({
        url: '/active?page=1&page_size=300&status=enabled',
        method: 'GET'
      })
      this.activeList = res.data
      this.loading.modal = false
    },
    // 打开 modal
    async handleOpenModal(data) {
      // return console.log(data)
      this.editType = data ? 'edit' : 'add'
      this.editInfo = Object.assign({}, data || ininData)
      if (this.editInfo.link_type === 1) {
        this.editInfo.link1 = this.editInfo.link
      }
      if (this.editInfo.link_type === 2) {
        this.editInfo.link2 = this.editInfo.link
      }
      if (this.editInfo.link_type === 3) {
        // this.model = this.editInfo.link
        this.editInfo.link1 = this.editInfo.link
      }
      if (this.editInfo.link_type === 4) {
        this.gameOneText = data.link.split(',')[0] ? Number(data.link.split(',')[0]) : ''
        this.gameTwoText = data.link.split(',')[1] ? Number(data.link.split(',')[1]) : ''
        this.gameThreeText = data.link.split(',')[2] ? Number(data.link.split(',')[2]) : ''
        if(data.link && data.link.split(',')[0]){
          this.getGame(data.link.split(',')[0], 'c', 'two')
        }
        if(data.link && data.link.split(',')[1]){
          this.getGame(data.link.split(',')[1], 'cs', 'three')
        }
      }
      this.visible.modal = !this.visible.modal
      if (!this.activeList.length) {
        await this.getActiveList()
      }
    },
    // 关闭 modal
    handleCloseModal() {
      this.$refs['editForm'].resetFields()
    },
    // 确认按钮
    async handleConfirm() {
      this.loading.modalButton = true
      // await this.$refs.uploadImg.upload()
      this.$nextTick(() => {
        this.editType === 'add' ? this.addAd() : this.editAd()
      })
    },
    // 新增
    async addAd() {
      this.$refs['editForm'].validate(async valid => {
        if (!valid) {
          this.loading.modalButton = false
          return
        }
        const req = { ...this.editInfo }
        if(req.link_type === 1){
          req.link = req.link1
        }
        if(req.link_type === 2){
          req.link = req.link2
        }
        if(req.link_type === 3){
          // req.link = this.model
          req.link = req.link1
        }
        if(req.link_type === 4){
          req.link = `${this.gameOneText},${this.gameTwoText},${this.gameThreeText}`
        }
        // req.link = req.link_type === 1 ? req.link1 : req.link2
        req.pf = this.curTab
        delete req.link1
        delete req.link2

        const res = await this.$axios.request({
          url: '/copywriter/carousel',
          method: 'POST',
          data: req
        })
        this.loading.modalButton = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.visible.modal = false
        this.getData()
      })
    },
    // 修改
    editAd(row) {
      this.$refs['editForm'].validate(async valid => {
        if (!valid) {
          this.loading.modalButton = false
          return
        }
        const req = { ...this.editInfo }
        if(req.link_type === 1){
          req.link = req.link1
        }
        if(req.link_type === 2){
          req.link = req.link2
        }
        if(req.link_type === 3){
          // req.link = this.model
          req.link = req.link1
        }
        if(req.link_type === 4){
          req.link = `${this.gameOneText},${this.gameTwoText},${this.gameThreeText}`
        }
        // req.link = req.link_type === 1 ? req.link1 : req.link2
        req.pf = this.curTab
        delete req.link1
        delete req.link2

        const res = await this.$axios.request({
          url: `/copywriter/carousel/${this.editInfo.id}`,
          method: 'PUT',
          data: req
        })
        this.loading.modalButton = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.visible.modal = false
        this.getData()
      })
    },
    // 删除
    async deleteAd(row) {
      const res = await this.$axios.request({
        url: `/copywriter/carousel/${row.id}`,
        method: 'DELETE'
      })
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    },
    //跳转模块
    async jumpModel(){
      const res = await this.$axios.request({
        url: '/copywriter/jumpModel',
        method: 'GET'
      })
      this.modelList = res.data
    },
    // 选择游戏分类
    getGameTwo(event){
      this.getGame(event, 'c', 'two')
    },
    getGameThree(event){
      this.getGame(event, 'cs', 'three')
    },
    //游戏分类
    async getGame(pid, type, text){
      const res = await this.$axios.request({
        url: '/game',
        method: 'GET',
        params: {
          pid: pid && type == 'c'  ? pid : '',
          game_id: pid && type == 'cs'  ? pid : '',
          type: type ? type : ''
        }
      })
      if(text == 'one'){
        this.gameOneList = []
        res.data.forEach((item, index) => {
          if(item.status != 'disabled'){
            this.gameOneList.push(item)
          }
        })
      }
      if(text == 'two'){
        this.gameTwoList = []
        res.data.forEach((item, index) => {
          if(item.status != 'disabled'){
            this.gameTwoList.push(item)
          }
        })
      }
      if(text == 'three'){
        this.gameThreeList = []
        res.data.forEach((item, index) => {
          if(item.status != 'disabled'){
            this.gameThreeList.push(item)
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
