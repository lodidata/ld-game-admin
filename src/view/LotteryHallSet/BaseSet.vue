<template>
  <div id="historyRes">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box mb30">
      <div class="dis-flex">
        <span>{{i18n_lang.lotteryHallSet1}}</span>
        <RadioGroup
          v-if="typeList"
          v-model="query.type_index"
          type="button"
          size="large"
          @on-change="lotteryTypeChange"
        >
          <Radio v-for="(it, i) in typeList" :key="i" :label="i">{{ it.name }}{{i18n_lang.lotteryHallSet12}}</Radio>
        </RadioGroup>
      </div>
      <div class="dis-flex mt10">
        <span>{{i18n_lang.lotteryHallSet2}}</span>
        <RadioGroup
          v-if="lottery && typeList[query.type_index]"
          v-model="query.lottery_index"
          type="button"
          size="large"
          @on-change="lotteryChange"
        >
          <Radio
            v-for="(it, i) in lottery[typeList[query.type_index].id]"
            :key="i"
            :label="i"
          >
{{ it.name }}
</Radio>
        </RadioGroup>
      </div>
    </Card>
    <MyTable combinerow :columns="columns" :data="dataSource" border></MyTable>

    <!-- 编辑/新增 -->
    <Modal
      v-model="visible.modal"
      :title="`${editInfo.lottery_name}-${i18n_lang.lotteryHallSet3}`"
      :width="700"
      :styles="{ top: '20px' }"
      :label-width="80"
      @on-cancel="handleCloseModal"
    >
      <Form
        v-if="visible.modal"
        ref="editForm"
        :model="editInfo"
        :label-width="130"
        :rules="ruleValidate"
      >
        <FormItem :label="i18n_lang.lotteryHallSet4">
          <Input v-model="editInfo.hall_name" placeholder style="width: 200px"/>
        </FormItem>
        <FormItem :label="i18n_lang.lotteryHallSet5">
          <Input v-model="editInfo.rebet_desc" placeholder style="width: 200px"/>
        </FormItem>
        <FormItem :label="i18n_lang.lotteryHallSet6">
          <span v-for="(item, i) in editInfo.room" :key="i">
            {{ i + 1 }}.&nbsp;
            <Input v-model="item.room_name" :placeholder="item.room_name" style="width: 100px"/>
          </span>
        </FormItem>
        <FormItem :label="i18n_lang.lotteryHallSet7">
          {{ editInfo.group_name }}
          <Input v-model="editInfo.min_balance" placeholder style="width: 200px"/>
        </FormItem>
        <FormItem :label="i18n_lang.lotteryHallSet8">
          {{ editInfo.play_id }}
          <Input
            v-model="editInfo.rebot_list"
            placeholder
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10 }"
            style="width: 500px"
          />
        </FormItem>
        <FormItem :label="i18n_lang.lotteryHallSet9">
          <Input v-model="editInfo.rebot_min" placeholder style="width: 150px"/>-
          <Input v-model="editInfo.rebot_max" placeholder style="width: 150px"/>
          <span>{{i18n_lang.lotteryHallSet10}}</span>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.modalButton" @click="save">{{i18n_lang.lotteryHallSet11}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import MyTable from '_c/MyTable'
import columns from './columns'
import { pidSortAndGroup, playSortAndGroup } from './format.js'
import { MathMul, MathDiv } from '@/libs/formatMath'

const ininData = {
  // 编辑列表
  hall_name: '', // 厅名称
  rebet_desc: '', // 厅说明
  room: [], // 房间名称
  min_balance: '', // 进入房间余额(元)
  rebot_list: '', // 投注机器人列表
  rebot_min: '', // 请输入机器人最小投注金额(元)
  rebot_max: '' // 请输入机器人最大投注金额(元)
}

export default {
  components: {
    MyTable
  },
  data() {
    const i18n_lang = this.$t('lotteryHallSet');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: false,
        modalButton: false
      },
      visible: {
        modal: false
      },
      query: {
        lottery_index: 0,
        type_index: 0
      },
      dataSource: [],
      lottery: {},
      typeList: [],
      levelList: [],
      editInfo: {},
      ruleValidate: {
        hall_name: [{ required: true, message: i18n_lang.lotteryHallSet13 }],
        hall_desc: [{ required: true, message: i18n_lang.lotteryHallSet14 }],
        room_name: [{ required: true, message: i18n_lang.lotteryHallSet15 }],
        room_desc: [{ required: true, message: i18n_lang.lotteryHallSet15 }],
        min_balance: [{ required: true, message: i18n_lang.lotteryHallSet16 }],
        rebot_list: [{ required: true, message: i18n_lang.lotteryHallSet17 }],
        rebot_min: [{ required: true, message: i18n_lang.lotteryHallSet18 }],
        rebot_max: [{ required: true, message: i18n_lang.lotteryHallSet19 }]
      },
      currentLottery: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化
    async init() {
      const lottery = await this.getlottery()
      const level = await this.getLevel()
      Promise.all([lottery, level]).then(res => {
        this.getData()
      })
    },
    // 获取彩种
    async getlottery() {
      this.loading.page = true
      this.dataSource = []
      const res = await this.$axios.request({
        url: '/lotteryImg',
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      const result = pidSortAndGroup(res.data)
      this.typeList = result.typeList
      this.lottery = result.group
    },
    // 当前彩种厅设置数据
    async getData() {
      const currentLottery = this.lottery[this.typeList[this.query.type_index].id][
        this.query.lottery_index
      ]
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/lottery/hall',
        method: 'GET',
        params: {
          type: 'base',
          lottery_id: currentLottery.id
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
      this.dataSource = playSortAndGroup(res.data, currentLottery.name, currentLottery.id)
    },
    // 获取厅等级
    async getLevel() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/pc28/level',
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.levelList = res.data
    },
    // 切换彩种类型
    lotteryTypeChange() {
      this.query.lottery_index = 0
      this.lotteryChange()
    },
    // 切换彩种
    async lotteryChange() {
      this.getData()
    },
    // 打开modal
    async handleOpenModal(data) {
      this.editInfo = Object.assign({}, data || ininData)
      this.editInfo.rebot_min = MathDiv(this.editInfo.rebot_min, 1)
      this.editInfo.rebot_max = MathDiv(this.editInfo.rebot_max, 1)
      this.visible.modal = !this.visible.modal
    },
    // 关闭modal
    handleCloseModal() {
      this.visible.modal = false
    },
    // 保存设置
    async save() {
      const obj = {
        type: 'base',
        id: this.editInfo.id,
        lottery_id: this.editInfo.lottery_id,
        hall_name: this.editInfo.hall_name,
        min_balance: this.editInfo.min_balance,
        // rebot_min: MathMul(this.editInfo.rebot_min, 100),
        // rebot_max: MathMul(this.editInfo.rebot_max, 100),
        rebot_list: this.editInfo.rebot_list,
        rebet_desc: this.editInfo.rebet_desc,
        room: this.editInfo.room
      }
      this.loading.modalButton = true
      const res = await this.$axios.request({
        url: `/lottery/hall/${this.editInfo.id}`,
        method: 'PUT',
        data: obj
      })
      this.loading.modalButton = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.handleCloseModal()
      this.getData()
    }
  }
}
</script>
