<template>
  <div id="ActiveList">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box mb30">
      <Button type="primary" icon="md-add" class="mb30" @click="addActive">{{i18n_lang.activeList78}}</Button>
      <Button type="primary" icon="md-add" class="mb30" style="margin-left: 5px" @click="addTypes">
        <span>{{i18n_lang.activeList79}}</span>
      </Button>
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.activeList80}}</span>
          <Select v-model="query.template_id" style="width:100px" clearable>
            <Option value>{{i18n_lang.activeList81}}</Option>
            <Option v-for="(item, i) in activeType" :key="i" :value="item.id">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.activeList82}}</span>
          <Select v-model="query.status" style="width:100px" clearable>
            <Option value>{{i18n_lang.activeList81}}</Option>
            <Option v-for="(item, i) in activeState" :key="i" :value="item.value">{{ item.name }}</Option>
          </Select>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" style="margin-right: 5px;" @click="search">{{i18n_lang.activeList83}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.activeList84}}</Button>
      </div>
    </Card>
    <Table border :columns="columns" :data="activeList"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.activeList385}${page.total}${i18n_lang.activeList386}` }}</div>
    <Page
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      show-sizer
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>

    <!-- 活动添加/编辑 -->
    <Modal
      id="active-modal"
      v-model="visible.modal"
      :title="editType === 'add' ? `${i18n_lang.activeList85}${i18n_lang.activeList87}` : `${i18n_lang.activeList86}${i18n_lang.activeList87}`"
      :width="1000"
      :styles="{ top: '20px' }"
      :footer-hide="true"
    >
      <Spin v-if="loading.modal" size="large" fix></Spin>
      <AddActive
        v-if="visible.modal"
        :edit-info="editInfo"
        :edit-type="editType"
        @onSuccess="saveSuccess"
      ></AddActive>
    </Modal>

    <!-- 活动分类编辑 -->
    <Modal
      id="active-modal"
      v-model="visible.types"
      :title="i18n_lang.activeList88"
      :width="680"
      :styles="{ top: '20px' }"
    >
      <Spin v-if="loading.type" size="large" fix></Spin>
      <ul>
        <li v-for="(item, i) in typesList" :key="i" class="row">
          <Input v-model="item.name" style="width: 300px;" :placeholder="`${i18n_lang.activeList89}${i + 1}`"/>
          <div>
            <img :src="item.image" class="thumb">
          </div>
          <Button type="primary" ghost @click="handleSetIcon(item)">
            <span>{{i18n_lang.activeList90}}</span>
          </Button>
          <Button
            type="success"
            ghost
            :disabled="item.status === 'enabled' || !item.name"
            @click="handleStatus(item)"
          >
            <span>{{i18n_lang.activeList91}}</span>
          </Button>
          <Button
            type="error"
            ghost
            :disabled="item.status === 'disabled' || !item.name"
            @click="handleStatus(item)"
          >
            <span>{{i18n_lang.activeList92}}</span>
          </Button>
          <Button type='success' :disabled="i == 0 ? true : false" @click="swapItems(i, i - 1)">{{i18n_lang.activeList387}}</Button>
          <Button type='success' :disabled="i == typesList.length - 1 ? true : false" @click="swapItems(i, i + 1)">{{i18n_lang.activeList388}}</Button>
        </li>
      </ul>
      <div slot="footer">
        <Button type="primary" :loading="loading.modalButton" @click="saveBtn">{{i18n_lang.activeList93}}</Button>
      </div>
    </Modal>

    <!-- 图标编辑 -->
    <Modal v-model="visible.icon" :title="i18n_lang.activeList94" :width="600" :styles="{ top: '20px' }">
      <UploadImg ref="uploadImg" v-model="cateIcon">
        <p>{{i18n_lang.activeList95}}</p>
      </UploadImg>
      <div slot="footer">
        <Button type="primary" :loading="loading.iconButton" @click="handleConfirmIcon">{{i18n_lang.activeList96}}</Button>
        <Button @click="visible.icon = false">{{i18n_lang.activeList97}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import AddActive from './AddActive'
import UploadImg from '_c/UploadImg'
import columns from './columns.js'
import { splitArr } from './format.js'
import { MathDiv, MathMul } from '@/libs/formatMath'

const ininData = {
  title: '', // 活动名称
  bind_info: [], // 1手机2邮箱3银行卡
  bind_info_list: [],
  vender_type: '1', // 1全部，2线上充值，3线下充值
  content_type: 1, // 活动编辑筛选,1文字，2图片
  content: '', // 活动规则为图片时，存放图片路径
  description: '', // 活动规则
  cover: '', // 活动图片路径
  begin_time: '', // 活动开始时间
  end_time: '', // 活动结束时间
  sort: '', // 排序
  type_id: '', // 活动分类id
  status: 'enabled', // 活动状态
  template_id: 1, // 活动模板
  issue_mode: 'auto', // 赠送方式auto->自动，manual->手动
  rule: '', // 充值优惠，格式'500,1000,200'
  ruleList: [['', '', '']],
  moneyList: [['', '', '']],
  send_max: '', // 赠送上线
  send_type: '1', // 赠送类型2->存款百分比，1-》赠送金额方式
  withdraw_require_val: '' ,// 提款打码量
  state: 'auto',//赠送方式 manual 手动 auto 自动  contact 联系客服
  luckydraw_condition: {
    condi: 1, //赠送条件(1=游戏流水 2=游戏盈亏 3=固定金额)
    money: 1 //赠送金额(1=流水百分比 2=盈亏百分比 3=固定金额)
  },
  give_condition: 1 ,// 赠送条件：1:单日首笔,2:单日累计,3:周累计,4:月累计,5:自定义
  give_date: '',
  msg_title: '',           //消息标题 批量赠送彩金相关
  msg_content: '',         //消息内容
  give_away: 1,           //赠送条件：1-指定用户，2-指定等级，3-批量赠送
  phone_list: '',          //指定手机号列表，多个手机号码之间英文逗号隔开
  user_level: '',          //指定用户等级列表，多个等级值之间英文逗号隔开
  batch_url: '',           //批量上传时，上传文件后返回的url
  give_amount: '',         //赠送彩金的数量
  dm_num: '',              //打码量
  notice_type: 1,         //通知类型：1-短信，2-邮箱，3-站内信息通知
  is_now_give: 0,         //是否立即赠送: 1-是，0-否
  give_amount_time: '',   //赠送彩金时间，格式 2022-07-18 00:00:00
  send_bet_max: '',        //最大打码量
  game_type: '',           //游戏分类
  limit_value: '',         //解除限制值
  issue_day: 1,
  send_times: 1,          //活动赠送次数 1:一个用户一次, 2:不限制
  apply_times: '',        //可发起申请次数
  condition_recharge: true  ,//申请条件-用户是否需要充值 1有 2没有
  condition_user_level: '',//用户等级限制(1,2,3)
}

const initTypes = Array(7).fill({
  name: ''
})

export default {
  components: {
    AddActive,
    UploadImg
  },
  data() {
    const i18n_lang = this.$t('activeList');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: false,
        modalButton: false,
        type: false,
        iconButton: false
      },
      visible: {
        addDialog: false,
        modal: false,
        types: false, // 分类
        icon: false
      },
      activeType: [
        { id: '1', name: i18n_lang.activeList98 },
        { id: '2', name: i18n_lang.activeList99 },
        { id: '3', name: i18n_lang.activeList100 },
        { id: '4', name: i18n_lang.activeList101 },
        { id: '5', name: i18n_lang.activeList102 },
        { id: '6', name: i18n_lang.activeList103 }
      ],
      activeState: [{ name: i18n_lang.activeList104, value: 'enabled' }, { name: i18n_lang.activeList105, value: 'disabled' }],
      activeList: [],
      query: {
        template_id: '',
        status: ''
      },
      editInfo: {},
      editType: 'add',
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      typesList: [...initTypes], // 所有活动分类
      typesList1: [],
      cateId: '',
      cateIcon: ''
    }
  },
  created() {
    // this.getData()
    this.getActiveType()
  },
  methods: {
    // 查询
    search() {
      this.page.currentPage = 1
      this.getData()
    },
    //获取活动类型
    async getActiveType(){
      const res = await this.$axios.request({
        url: '/active/type',
        method: 'GET',
        params: {}
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return
      }
      if(res.data && res.data.length){
        this.activeType = res.data.filter(x => x.status == 'enabled')
        this.getData()
      }
    },
    // 获取活动列表
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      this.query.page = this.page.currentPage
      this.query.page_size = this.page.pageSize
      const res = await this.$axios.request({
        url: '/active',
        method: 'GET',
        params: this.query
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      // console.log('this.activeType', this.activeType)
      // this.activeType.forEach(item => {
      //   res.data.forEach(items => {
      //     if(item.id == items.template_id){
      //       items.template_name = item.name
      //     }
      //   })
      // })

      this.page.total = res.attributes ? res.attributes.total : 0
      this.activeList = res.data ? splitArr(res.data) : []
    },

    // 添加活动
    addActive() {
      this.editType = 'add'
      this.editInfo = { ...ininData }
      // this.editInfo.give_condition
      this.visible.modal = true
    },
    // 添加活动分类
    addTypes() {
      this.getTypes()
      this.visible.types = !this.visible.types
    },
    // 获取活动分类
    async getTypes() {
      this.loading.types = true
      const res = await this.$axios.request({
        url: '/active/type',
        method: 'GET'
      })
      this.loading.types = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }

      const list = JSON.parse(JSON.stringify(this.typesList))
      list.splice(0, res.data.length)
      for (const i in this.typesList) {
        this.typesList[i].image = ''
      }
      this.typesList = res.data.concat(list)
      this.typesList1 = [...this.typesList]
      // this.typesList = []
      // this.typesList = [ ...res.data ]
      // console.log('this.typesList', this.typesList, res.data)
    },
    // 启用停用
    async handleStop(row) {
      const data = { ...row }
      // data.rule = MathMul(data.rule, 100)
      const res = await this.$axios.request({
        url: '/active',
        method: 'PATCH',
        data: {
          id: data.id,
          status: data.status === 'disabled' ? 'enabled' : 'disabled'
        }
      })
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    },
    // 详情
    handleDetail() {},
    // 编辑
    handleOpenModal(data) {
      this.editType = 'edit'
      this.editInfo = { ...data }
      this.editInfo.type_id = data.active_type_id
      this.editInfo.withdraw_require_val = MathDiv(this.editInfo.withdraw_require_val, 1)
      this.editInfo.send_bet_max = MathDiv(this.editInfo.send_bet_max, 1)
      if(data.template_id == 4){
        this.editInfo.condition_recharge = this.editInfo.condition_recharge == 1 ? true : false 
      }
      if(data.template_id == 10){
        this.editInfo.luckydraw_condition = JSON.parse(this.editInfo.luckydraw_condition)
        this.editInfo.rule = JSON.parse(this.editInfo.rule)
      }
      if(data.template_id == 13){
        this.editInfo.rule = JSON.parse(this.editInfo.rule)
      }
      if(data.template_id == 14){
        this.editInfo.rule = `${MathDiv(this.editInfo.rule, 1)}`
      }
      this.visible.modal = !this.visible.modal
    },
    // 删除
    async deleteAd(row) {
      const data = { ...row }
      data.status = 'deleted'
      const res = await this.$axios.request({
        url: `/active/${row.id}`,
        method: 'DELETE'
      })
      this.loading.modalButton = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    },
    reset() {
      this.query = {
        type_id: '',
        state: ''
      }
      this.getData()
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.currentPage = 1
      this.page.pageSize = pageSize
      this.getData()
    },
    saveSuccess(msg) {
      this.visible.modal = false
      this.getData()
    },
    // 启用或禁用
    handleStatus(item) {
      const text =
        item.status === 'enabled'
          ? this.i18n_lang.activeList106
          : this.i18n_lang.activeList107
      this.$Modal.confirm({
        title: this.i18n_lang.activeList108,
        content: text,
        loading: true,
        onOk: async () => {
          const res = await this.$axios.request({
            url: `/active/type/${item.id}`,
            method: 'PUT',
            data: {
              id: item.id,
              status: item.status === 'enabled' ? 'disabled' : 'enabled'
            }
          })
          this.$Modal.remove()
          if (res.status !== 200) {
            this.$msg({
              type: 'error',
              message: res.message
            })
            return
          }
          this.getData()
          this.getTypes()
        },
        onCancel: () => {}
      })
    },
    // 模态框的确认按钮
    async saveBtn(hide = true) {
      this.loading.modalButton = true

      const res = await this.$axios.request({
        url: '/active/type',
        method: 'PUT',
        data: {
          data: this.typesList
        }
      })
      this.loading.modalButton = false
      this.visible.types = !hide
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
    },
    // 更换分类图标
    handleSetIcon(item) {
      // console.log(item)
      this.cateId = item.id
      this.cateIcon = item.image
      this.visible.icon = true
    },
    async handleConfirmIcon() {
      this.loading.iconButton = true
      // await this.$refs.uploadImg.upload()

      this.$nextTick(() => {
        const item = this.typesList.find(o => o.id === this.cateId)
        item.image = this.cateIcon
        this.saveBtn(false)
      })
      this.loading.iconButton = false
      this.visible.icon = false
    },
    // 交换元素
    async swapItems(current, target) {
      const data = this.typesList1
      data[current] = data.splice(target, 1, data[current])[0]
      // this.loading.page = true
      const req = this.typesList1.map((o, i) => ({ id: o.id, sort: i + 1 }))
      const res = await this.$axios.request({
        url: '/active/type/move',
        method: 'PUT',
        data: {
          data: req
        }
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getTypes()
    }
  }
}
</script>

<style lang="less" scoped>
#ActiveList {
  .mb30 {
    margin-bottom: 20px;
  }
}
.row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  button {
    margin-left: 6px;
  }
}
.thumb {
  margin: 0 25px 0 10px;
  width: 40px;
}
</style>
