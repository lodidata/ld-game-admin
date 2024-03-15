<template>
  <div id="PlayLimit">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <Button type="primary" :loading="loading.modalButton" @click="handleOpenModal">{{i18n_lang.lotteryMoneyLimit10}}</Button>
      <div class="dis-flex mt10">
        <span>{{i18n_lang.lotteryMoneyLimit11}}</span>
        <RadioGroup
          v-if="typeList"
          v-model="query.type_index"
          type="button"
          size="large"
          @on-change="lotteryTypeChange"
        >
          <Radio v-for="(it,i) in typeList" :key="i" :label="i">{{ it.name }}{{i18n_lang.lotteryMoneyLimit12}}</Radio>
        </RadioGroup>
      </div>
      <div class="dis-flex mt10">
        <span>{{i18n_lang.lotteryMoneyLimit13}}</span>
        <RadioGroup
          v-if="lottery && typeList[query.type_index]"
          v-model="query.lottery_index"
          type="button"
          size="large"
          @on-change="lotteryChange"
        >
          <Radio v-for="(it,i) in lottery[typeList[query.type_index].id]" :key="i" :label="i">
            <span>{{ it.name }}</span>
          </Radio>
        </RadioGroup>
      </div>
      <div class="dis-flex mt10">
        <span>{{i18n_lang.lotteryMoneyLimit14}}</span>
        <RadioGroup
          v-if="modelList"
          v-model="query.hall_index"
          type="button"
          size="large"
          @on-change="changeTab"
        >
          <Radio v-for="(it,i) in modelList" :key="i" :label="i">{{ it.hall_name }}</Radio>
        </RadioGroup>
      </div>
      <div class="dis-flex mt10">
        <span>{{i18n_lang.lotteryMoneyLimit15}}</span>
        <RadioGroup
          v-if="groupList"
          v-model="query.play_index"
          type="button"
          size="large"
          @on-change="playChange"
        >
          <Radio v-for="(it,i) in groupList" :key="i" :label="i">{{ it }}</Radio>
        </RadioGroup>
      </div>
    </Card>
    <div class="content">
      <MyTable
        combinerow
        editting
        :columns="columns"
        :data="oddsList"
        border
        @editChange="editOddChange"
      ></MyTable>
    </div>
    <Modal
      v-model="visible.modal"
      :title="i18n_lang.lotteryMoneyLimit16"
      :width="600"
      :styles="{top: '20px'}"
      :label-width="80"
      @on-cancel="handleCloseModal"
    >
      <Form
        v-if="visible.modal"
        ref="editForm"
        :model="editInfo"
        :label-width="120"
        :rules="ruleValidate"
      >
        <FormItem :label="i18n_lang.lotteryMoneyLimit17">
          <MoreOptionCheck
            v-model="editInfo.type_id"
            :option-data="editInfo.typeList"
            option-label="name"
            option-key="id"
            is-single
            :miss-txt="i18n_lang.lotteryMoneyLimit18"
            @onChange="editLotteryType"
          ></MoreOptionCheck>
        </FormItem>
        <FormItem :label="i18n_lang.lotteryMoneyLimit19">
          <MoreOptionCheck
            v-model="editInfo.lottery_id"
            :option-data="editInfo.lottery"
            option-label="name"
            option-key="id"
            is-single
            :miss-txt="i18n_lang.lotteryMoneyLimit18"
            @onChange="editLotteryChange"
          ></MoreOptionCheck>
        </FormItem>
        <FormItem :label="i18n_lang.lotteryMoneyLimit20">
          <MoreOptionCheck
            v-model="editInfo.hall_id"
            :option-data="editInfo.modelList"
            option-label="hall_name"
            option-key="id"
            is-single
            :miss-txt="i18n_lang.lotteryMoneyLimit18"
            @onChange="editModeChange"
          ></MoreOptionCheck>
        </FormItem>
        <FormItem :label="i18n_lang.lotteryMoneyLimit21">
          <Input v-model="editInfo.max_betting" placeholder style="width: 200px"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleCloseModal">{{i18n_lang.lotteryMoneyLimit7}}</Button>
        <Button type="primary" :loading="loading.modalButton" @click="saveBackOdds">{{i18n_lang.lotteryMoneyLimit8}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import MyTable from '_c/MyTable'
import MoreOptionCheck from '_c/MoreOptionCheck'
import columns from './columns/playLimit'
import { pidSortAndGroup, playSortAndGroup } from './format.js'
import { MathMul } from '@/libs/formatMath'

const initEdit = {
  type_id: [],
  lottery_id: [],
  hall_id: [],
  group_name: [],
  play_id: [],
  max_betting: '',
  typeList: [],
  lottery: [],
  modelList: [],
  playList: [],
  groupList: []
}

export default {
  components: {
    MyTable,
    MoreOptionCheck
  },
  data() {
    const i18n_lang = this.$t('lotteryMoneyLimit');
    return {
      i18n_lang: i18n_lang,
      loading: { // loading
        page: false,
        modal: false,
        modalButton: false
      },
      // modal显示
      visible: {
        modal: false
      },
      // table
      columns: columns(this),
      typeList: [],
      lottery: {},
      modelList: [],
      groupList: [],
      oddsList: [],
      limitList: [],
      editInfo: {
        ...initEdit
      },
      ruleValidate: {},
      query: {
        type_index: 0,
        lottery_index: 0,
        hall_index: 0,
        play_index: 0
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 打开modal
    async handleOpenModal(data) {
      this.visible.modal = !this.visible.modal
      const { typeList, ...others } = initEdit
      Object.assign(this.editInfo, others)
    },
    // 关闭modal
    handleCloseModal() {
      this.visible.modal = false
    },
    // 加载数据
    async init() {
      this.loading.page = true
      await this.getLotteryList()
      this.lotteryTypeChange()
    },
    // 获取所有彩种列表
    async getLotteryList() {
      const res = await this.$axios.request({
        url: '/lotteryImg',
        method: 'GET'
      })
      const result = pidSortAndGroup(res.data)
      this.typeList = result.typeList
      this.lottery = result.group
      this.editInfo.typeList = result.typeList
    },
    // 获取彩种赔率数据,type=true表示为列表请求，false为弹框打开时请求
    async getOdds(obj, type) {
      this.loading.page = true
      if (type) {
        this.oddsList = []
      } else {
        this.loading.modal = true
        this.editInfo.playList = []
      }
      const res = await this.$axios.request({
        url: '/lottery/play/limit',
        method: 'GET',
        params: obj
      })
      this.loading.page = false
      this.loading.modal = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      if (type) {
        this.oddsList = playSortAndGroup(res.data)
        this.columns = columns(this, this.oddsList)
      } else {
        this.editInfo.playList = res.data
      }
    },
    // 获取玩法菜单,type=true表示为列表请求，false为弹框打开时请求
    async getPlayMenu(obj, type) {
      if (type) {
        this.loading.page = true
        this.modelList = []
        this.groupList = []
      } else {
        this.loading.modal = true
        this.editInfo.modelList = []
        this.editInfo.groupList = []
      }
      const res = await this.$axios.request({
        url: '/lottery/play/menu',
        method: 'GET',
        params: obj
      })
      this.loading.page = false
      this.loading.modal = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      if (type) {
        this.modelList = res.data.hall
        this.groupList = res.data.group
      } else {
        this.editInfo.modelList = res.data.hall
        this.editInfo.groupList = res.data.group
      }
    },
    // 切换彩种类型
    lotteryTypeChange() {
      this.query.lottery_index = 0
      this.query.hall_index = 0
      this.query.paly_index = 0
      this.lotteryChange()
    },
    // 切换彩种
    async lotteryChange() {
      this.oddsList = []
      const obj = {
        lottery_id: this.lottery[this.typeList[this.query.type_index].id][this.query.lottery_index]
          .id
      }
      this.query.hall_index = 0
      this.query.paly_index = 0
      await this.getPlayMenu(obj, true)
      this.changeTab()
    },
    // 切换模式
    async changeTab() {
      this.query.play_index = 0
      const obj = {
        lottery_id: this.lottery[this.typeList[this.query.type_index].id][this.query.lottery_index]
          .id,
        hall_id: this.modelList[this.query.hall_index]
          ? this.modelList[this.query.hall_index].id
          : ''
      }
      await this.getPlayMenu(obj, true)
      this.playChange()
    },
    // 切换玩法
    playChange() {
      const obj = {
        lottery_id: this.lottery[this.typeList[this.query.type_index].id][this.query.lottery_index]
          .id,
        hall_id: this.modelList[this.query.hall_index]
          ? this.modelList[this.query.hall_index].id
          : '',
        group: this.groupList[this.query.play_index] ? this.groupList[this.query.play_index] : ''
      }
      if (!obj.group) return
      this.getOdds(obj, true)
    },
    // 单个玩法返奖率设置
    async editOddChange(val, key, row) {
      const obj = {
        hall_id: this.modelList[this.query.hall_index]
          ? this.modelList[this.query.hall_index].id
          : '',
        lottery_id: this.lottery[this.typeList[this.query.type_index].id][this.query.lottery_index]
          .id,
        play_id: row.play_id,
        id: row.id,
        // max_betting: MathMul(val, 100)
        max_betting: val
      }
      const res = await this.$axios.request({
        url: `/lottery/play/limit/${row.id}`,
        method: 'PUT',
        data: obj
      })
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.playChange()
    },
    // 编辑时选择彩种类别
    editLotteryType() {
      this.editInfo.lottery = this.lottery[this.editInfo.type_id[0]]
      this.editInfo.lottery_id = []
      this.editInfo.hall_id = []
      this.editInfo.play_id = []
    },
    // 编辑时选择彩种
    async editLotteryChange() {
      this.editInfo.hall_id = []
      this.editInfo.group_name = []
      this.editInfo.play_id = []
      const obj = {
        lottery_id: this.editInfo.lottery_id[0]
      }
      await this.getPlayMenu(obj)
    },
    // 编辑时选择模式
    async editModeChange() {
      this.editInfo.play_id = []
      this.editInfo.group_name = []
      const obj = {
        lottery_id: this.editInfo.lottery_id.length ? this.editInfo.lottery_id[0] : '',
        hall_id: this.editInfo.hall_id.length ? this.editInfo.hall_id[0] : ''
      }
      await this.getPlayMenu(obj)
    },
    // 编辑时选择玩法列表
    editGroupNameChange() {
      this.editInfo.play_id = []
      const obj = {
        lottery_id: this.editInfo.lottery_id.length ? this.editInfo.lottery_id[0] : '',
        hall_id: this.editInfo.hall_id.length ? this.editInfo.hall_id[0] : '',
        group: this.editInfo.group_name.length ? this.editInfo.group_name[0] : ''
      }
      if (!obj.group) return
      this.getOdds(obj)
    },
    // 统一设置返奖率
    async saveBackOdds() {
      const obj = {
        // max_betting: MathMul(this.editInfo.max_betting, 100)
        max_betting: this.editInfo.max_betting
      }
      if (this.editInfo.type_id.length) {
        obj.lottery_pid = this.editInfo.type_id[0]
      }
      if (this.editInfo.lottery_id.length) {
        obj.lottery_id = this.editInfo.lottery_id[0]
      }
      if (this.editInfo.hall_id.length) {
        obj.hall_id = this.editInfo.hall_id[0]
      }
      if (this.editInfo.play_id.length) {
        obj.play_id = this.editInfo.play_id[0]
      }
      const res = await this.$axios.request({
        url: '/lottery/play/limit',
        method: 'PUT',
        data: obj
      })
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.handleCloseModal()
      this.playChange()
      this.editInfo.type_id = []
      this.editInfo.group_name = []
      this.editInfo.lottery_id = []
      this.editInfo.hall_id = []
      this.editInfo.play_id = []
    }
  }
}
</script>
<style lang="less" scoped>
.dis-flex {
  display: flex;
  & > span {
    width: 70px;
    min-width: 70px;
  }
}
.mt10 {
  margin-top: 10px;
}
.ivu-radio-group-button {
  .ivu-radio-wrapper {
    margin-bottom: 5px;
  }
}
</style>
