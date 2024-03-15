<template>
  <div id="LotteryLimit">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Button type="primary" :loading="loading.modalButton" @click="handleOpenModal">{{i18n_lang.lotteryMoneyLimit2}}</Button>
    <MyTable
      combinerow
      editting
      border
      :columns="columns"
      :data="dataSource"
      @editChange="editChange"
    ></MyTable>
    <Modal
      v-model="visible.modal"
      :title="i18n_lang.lotteryMoneyLimit2"
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
        <FormItem :label="i18n_lang.lotteryMoneyLimit3">
          <MoreOptionCheck
            v-model="editInfo.type_id"
            :option-data="editInfo.typeList"
            option-label="name"
            option-key="id"
            is-single
            :miss-txt="i18n_lang.lotteryMoneyLimit4"
            @onChange="editLotteryType"
          ></MoreOptionCheck>
        </FormItem>
        <FormItem :label="i18n_lang.lotteryMoneyLimit5">
          <MoreOptionCheck
            v-model="editInfo.hall_level"
            :option-data="editInfo.limitList"
            option-label="hall_name"
            option-key="hall_level"
            is-single
            :miss-txt="i18n_lang.lotteryMoneyLimit4"
            :width="400"
          ></MoreOptionCheck>
        </FormItem>
        <FormItem :label="i18n_lang.lotteryMoneyLimit6">
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
import columns from './columns/lotteryLimit.js'
import { lotteryLimit, pidSortAndGroup } from './format.js'
import { MathMul } from '@/libs/formatMath'

const initEdit = {
  type_id: [],
  lottery_id: [],
  hall_level: [],
  max_betting: '',
  typeList: [],
  limitList: []
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
      loading: {
        page: false,
        modalButton: false
      },
      dataSource: [],
      columns: columns(this),
      // modal显示
      visible: {
        modal: false
      },
      lottery: {},
      editInfo: {
        ...initEdit
      },
      ruleValidate: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.getData()
      await this.getLotteryList()
      await this.editLimitChange()
    },
    // 打开modal
    async handleOpenModal(data) {
      this.visible.modal = !this.visible.modal
      const { typeList, limitList, ...others } = initEdit
      Object.assign(this.editInfo, others)
    },
    // 关闭modal
    handleCloseModal() {
      this.visible.modal = false
    },
    // 获取所有彩种列表
    async getLotteryList() {
      const res = await this.$axios.request({
        url: '/lotteryImg',
        methods: 'GET'
      })
      const result = pidSortAndGroup(res.data)
      this.editInfo.typeList = result.typeList
    },
    // 编辑时选择彩种类别
    editLotteryType() {
      this.editInfo.hall_id = []
      this.editLimitChange()
    },
    // 编辑时选择限额
    async editLimitChange(id = 0) {
      const typeId = this.editInfo.type_id[0] || id
      this.editInfo.hall_id = []
      const res = await this.$axios.request({
        url: `/lottery/hall/${typeId}`,
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.editInfo.limitList = [...res.data[0].halls]
    },
    async saveBackOdds() {
      const typeid = this.editInfo.type_id[0] || 0
      const req = {
        hall_level: this.editInfo.hall_level[0],
        bet_value: this.editInfo.max_betting
      }
      // req.bet_value = MathMul(req.bet_value, 100)
      const res = await this.$axios.request({
        url: `/lottery/play/investment/${typeid}`,
        method: 'PATCH',
        data: req
      })
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.visible.modal = false
      this.getData()
    },
    // 获取数据
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/lottery/play/investment',
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
      // let dataList = []
      res.data.forEach((item, index) => {
        item.lottery.forEach((items, indexs) => {
          items.max_bet = items.halls[0].max_bet
          items.min_bet = items.halls[0].min_bet
        })
      })
      const groupAndSort = lotteryLimit(res.data)
      this.dataSource = groupAndSort
      this.columns = columns(this, groupAndSort)
    },
    async editChange(val, key, row) {
      if (val.indexOf('.') > 0) {
        this.$msg({
          type: 'error',
          message: this.i18n_lang.lotteryMoneyLimit9
        })
        return
      }
      // const hall_id_arr = row.halls.filter(x => x.mark === key)
      // const hall_id = hall_id_arr.length ? row.halls.filter(x => x.mark === key)[0].id : ''
      let hall_id
      if(key == 'hall5' || key == 'max_bet'){
        hall_id = row.halls[0].id
      }
      const obj = {
        lottery_id: row.id,
        // all_bet_max: key === 'all_bet_max' ? MathMul(val, 100) : MathMul(row.all_bet_max, 100),
        // per_bet_max: key === 'per_bet_max' ? MathMul(val, 100) : MathMul(row.per_bet_max, 100),
        // max_bet: key === "max_bet" ? MathMul(val, 100) : MathMul(row.max_bet, 100)
        all_bet_max: key === 'all_bet_max' ? val : row.all_bet_max,
        per_bet_max: key === 'per_bet_max' ? val : row.per_bet_max,
        max_bet: key === "max_bet" ? val : row.max_bet
      }
      if (hall_id) {
        obj.hall_id = hall_id
        if(key == 'hall5'){
          // obj.min_bet = MathMul(val, 100)
          obj.min_bet = val
        }else{
          //  obj.min_bet = row.min_bet ? MathMul(row.min_bet, 100) : 0
          obj.min_bet = row.min_bet ? row.min_bet : 0
        }
      }
      const res = await this.$axios.request({
        url: `/lottery/play/investment/${row.id}`,
        method: 'PUT',
        data: obj
      })
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
