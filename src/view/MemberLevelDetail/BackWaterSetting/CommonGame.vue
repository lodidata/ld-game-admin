<template>
  <div id="commonMode">
    <Spin v-if="loading.page" fix></Spin>
    <div class="query_box mb30 dis-flex">
      <span class="title">{{ typeText }}{{i18n_lang.memberLevelDetail39}}</span>
      <RadioGroup
        v-if="typeList && !isBatch"
        v-model="query.type_index"
        type="button"
        size="large"
        @on-change="lotteryTypeChange"
      >
        <Radio v-for="(it,i) in dataSource" :key="i" :label="i">
          <span>{{ it.name }}{{ type === 'CP' ? i18n_lang.memberLevelDetail40 : typeText }}</span>
        </Radio>
      </RadioGroup>
      <CheckboxGroup
        v-if="typeList && isBatch"
        v-model="query.game_id"
        type="button" size="large"
        style="margin-top: 10px;"
        @on-change="checkTypeChange">
        <Checkbox v-for="(it,i) in dataSource" :key="it.id" :label="it.id">
          <span>{{ it.name }}{{ type === 'CP' ? i18n_lang.memberLevelDetail40 : typeText }}</span>
        </Checkbox>
      </CheckboxGroup>
    </div>
    <div v-if="type === 'CP'" class="mb30">
      <span class="title">{{i18n_lang.memberLevelDetail41}}</span>
      <RadioGroup
        v-if="dataSource[query.type_index]"
        v-model="query.hall_index"
        type="button"
        size="large"
        @on-change="changeTab"
      >
        <Radio v-for="(it,i) in dataSource[query.type_index].halls" :key="i" :label="i">
          <span>{{ it.hall_name }}{{i18n_lang.memberLevelDetail40}}</span>
        </Radio>
      </RadioGroup>
    </div>
    <div v-if="isEditShow">
      <Button type="primary" :loading="loading.modalButton" @click="save">{{ isEdit ? i18n_lang.memberLevelDetail42 : i18n_lang.memberLevelDetail43 }}</Button>
      <Button v-if="!isEdit" @click="close">{{i18n_lang.memberLevelDetail44}}</Button>
      <Button v-if="!isEdit" :type="isBatch ? 'primary' : 'text'" @click="isBatch = isBatch ? false : true">{{ i18n_lang.memberLevelDetail82 }}</Button>
    </div>
    <Form ref="editForm" :model="editInfo" :label-width="120" :rules="ruleValidate" class="content">
      <div v-if="editInfo.rebet_condition.length > 0 && type === 'CP'" class="con-left">
        <h1 class="title">{{i18n_lang.memberLevelDetail45}}</h1>
        <p v-for="(item,i) in editInfo.rebet_condition" :key="i">
          <Checkbox v-model="item.checked" :disabled="isEdit"></Checkbox>
          <span>{{ backWaterOption[item.type][0] }}</span>
          <Input
            v-model="item.value"
            placeholder
            :class="{'ivu-form-item-error': item.checked && isClick && !item.value}"
            style="width: 150px"
            :disabled="isEdit"
          />
          <span>{{ backWaterOption[item.type][1] }}</span>
        </p>
      </div>
      <div v-if="editInfo.moneyRange.length > 0" class="con-right">
        <h1 class="title">{{i18n_lang.memberLevelDetail46}}</h1>
        <RadioGroup v-model="editInfo.moneyType" @on-change="moneyTypeChange">
          <Radio label="loss" :disabled="isEdit">{{i18n_lang.memberLevelDetail47}}</Radio>
          <Radio label="betting" :disabled="isEdit">{{i18n_lang.memberLevelDetail48}}</Radio>
        </RadioGroup>
        <div class="back-water-money">
          <div class="money">
            <RadioGroup v-model="editInfo.childMoneyType" @on-change="childMoneyTypeChange">
              <Radio label="fixed" :disabled="isEdit">{{i18n_lang.memberLevelDetail49}}</Radio>
              <Radio label="percentage" :disabled="isEdit">
                <span v-html="`${i18n_lang.memberLevelDetail61}${editInfo.moneyType === 'loss' ? i18n_lang.memberLevelDetail50 : i18n_lang.memberLevelDetail51}${i18n_lang.memberLevelDetail62}`"></span>
              </Radio>
            </RadioGroup>
          </div>
          <div v-for="(item, index) in editInfo.moneyRange" :key="index" class="money-content">
            <div class="money-item common-item">
              <div class="input-wrapper">
                <Input
                  v-model="item.range[0]"
                  class="input"
                  :class="{'ivu-form-item-error': (isClick && !item.range[0]) || (isClick && Number(item.range[0]) > Number(item.range[1]))}"
                  :disabled="isEdit"
                  @on-blur="limitFloat(index,'range',item.range[0],0)"
                />
              </div>
              <span>&lt;={{ editInfo.moneyType === 'loss' ? i18n_lang.memberLevelDetail52 : i18n_lang.memberLevelDetail53 }} &lt;</span>
              <div class="input-wrapper">
                <Input
                  v-model="item.range[1]"
                  class="input"
                  :class="{'ivu-form-item-error': (isClick && !item.range[1]) || (isClick && Number(item.range[0]) > Number(item.range[1]))}"
                  :disabled="isEdit"
                  @on-blur="limitFloat(index,'range',item.range[1],1)"
                />
              </div>
            </div>
            <div class="common-item">
              <span class="back-water-text">{{i18n_lang.memberLevelDetail54}}</span>
              <div class="input-wrapper">
                <Input
                  v-model="item.rebate"
                  class="input"
                  :class="{'ivu-form-item-error': isClick && !item.rebate}"
                  :disabled="isEdit"
                  style="width: 90%"
                  @on-blur="limitFloat(index,'rebate',item.rebate)"
                />
              </div>
              <span>{{ editInfo.childMoneyType === 'fixed' ? i18n_lang.memberLevelDetail55 : '%' }}</span>
            </div>
            <div class="common-item">
              <span class="back-water-text da-ma">{{i18n_lang.memberLevelDetail56}}</span>
              <div class="input-wrapper">
                <Input
                  v-model="item.daMa"
                  class="input"
                  :class="{'ivu-form-item-error': isClick && !item.daMa}"
                  :disabled="isEdit"
                  @on-blur="limitFloat(index,'daMa',item.daMa)"
                />
              </div>
              <span>%</span>
            </div>
            <Button
              v-if="!isEdit && editInfo.moneyRange.length > 1"
              type="primary"
              class="remove-btn"
              @click="remove(index)"
            >
              <span>{{i18n_lang.memberLevelDetail57}}</span>
            </Button>
          </div>
          <div class="add-btn">
            <Button v-if="!isEdit" type="primary" @click="add">{{i18n_lang.memberLevelDetail58}}</Button>
          </div>
          <div v-if="editInfo.childMoneyType === 'percentage'" class="max-rebate">
            <span>{{i18n_lang.memberLevelDetail59}}</span>
            <Input
              v-model="editInfo.rebet_ceiling"
              style="width: 168px"
              :class="{'ivu-form-item-error': isClick && editInfo.rebet_ceiling && !editInfo.rebet_ceiling.toString()}"
              :disabled="isEdit"
            ></Input>
          </div>
        </div>
      </div>
      <div class="back-water-time-setting">
        <h1 class="title">
          <span>{{i18n_lang.memberLevelDetail60}}</span>
          <span class="rule">{{i18n_lang.memberLevelDetail63}}</span>
        </h1>
        <div class="time-wrapper">
          <p class="time-span">{{i18n_lang.memberLevelDetail64}}</p>
          <BackWaterTimePicker
            :value="timeValue"
            :disabled="isEdit"
            :disabled-minutes="disabled_minutes"
            :disabled-seconds="disabled_seconds"
            @changeTime="changeTime"
          ></BackWaterTimePicker>
        </div>
      </div>
      <div class="back-water-time-setting">
        <h1 class="title">
          <span>{{i18n_lang.memberLevelDetail65}}</span>
        </h1>
        <div class="time-wrapper">
          <RadioGroup v-model="dataSource[query.type_index].halls[query.hall_index].status_switch">
            <Radio :label="1" :disabled="isEdit">{{i18n_lang.memberLevelDetail66}}</Radio>
            <Radio :label="0" :disabled="isEdit">{{i18n_lang.memberLevelDetail67}}</Radio>
          </RadioGroup>
        </div>
      </div>
    </Form>
  </div>
</template>
<script>
import BackWaterTimePicker from '_c/TimePicker'
import { limitFloat } from '@/libs/tools.js'
export default {
  components: {
    BackWaterTimePicker
  },
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    getData: {
      type: Function,
      default: function() {}
    },
    rebotTime: {
      type: String,
      default: '00:00:00'
    },
    type: {
      type: String,
      default: ''
    },
    typeText: {
      type: String,
      default: ''
    },
    isEditShow: {
      type: Boolean,
      default: true
    },
    userId: {
      type: Number,
      default: 0
    },
    rebot: {
      type: String,
      default: ''
    }
  },
  data() {
    const i18n_lang = this.$t('memberLevelDetail');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        modalButton: false
      },
      query: {
        type_index: 0,
        hall_index: 0,
        game_id: []
      },
      typeList: [],
      editInfo: {
        rebet_condition: [],
        hasData: false, // 是否有数据了
        moneyType: 'loss',
        childMoneyType: 'fixed',
        rebet_ceiling: '',
        moneyRange: [
          {
            reabte: '',
            daMa: '',
            range: ['', '']
          }
        ]
      },
      dataSource: [],
      backWaterOption: {
        group_gt: [i18n_lang.memberLevelDetail68, '%'],
        blend_lt: [i18n_lang.memberLevelDetail69, '%'],
        guess_gt: [i18n_lang.memberLevelDetail70, i18n_lang.memberLevelDetail73],
        group_lt: [i18n_lang.memberLevelDetail71, '%'],
        betting_gt: [i18n_lang.memberLevelDetail72, i18n_lang.memberLevelDetail73],
        betting_all_gt: [i18n_lang.memberLevelDetail74, i18n_lang.memberLevelDetail75]
      },
      ruleValidate: {},
      isEdit: true,
      timeValue: '',
      disabled_minutes: Array.from(Array(60)).map((u, i) => i),
      disabled_seconds: Array.from(Array(60)).map((u, i) => i),
      isClick: false,
      isBatch: false
    }
  },
  watch: {
    list() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.timeValue = this.rebotTime
      this.dataSource = this.list
      this.initRebetCondition()
      this.updateEditInfoRebateCondition()
      this.updateEditInfoMode()
    },
    limitFloat(index, key, val, i) {
      if (key === 'range') {
        this.editInfo.moneyRange[index][key].splice(i, 1, limitFloat(val))
      } else {
        console.log(222)
        this.editInfo.moneyRange[index][key] = limitFloat(val)
      }
    },
    initRebetCondition() {
      const rebet_condition =
        this.type === 'CP' && this.list[this.query.type_index].alias === 'XYRB'
          ? [
            { type: 'group_gt', value: '', checked: false },
            { type: 'blend_lt', value: '', checked: false },
            { type: 'guess_gt', value: '', checked: false },
            { type: 'group_lt', value: '', checked: false },
            { type: 'betting_gt', value: '', checked: false },
            { type: 'betting_all_gt', value: '', checked: false }
          ]
          : [{ type: 'betting_gt', value: '', checked: false }]
      this.editInfo.rebet_condition = rebet_condition
      this.editInfo.moneyRange = [
        {
          reabte: '',
          daMa: '',
          range: ['', '']
        }
      ]
    },
    // 切换彩种
    lotteryTypeChange(index) {
      this.query.type_index = index
      this.query.hall_index = 0
      this.initRebetCondition()
      if (this.type === 'CP') {
        this.updateEditInfoRebateCondition()
      }
      this.updateEditInfoMode()
    },
    // 批量操作
    checkTypeChange(e){
      // console.log('批量', this.query.game_id)
    },
    updateEditInfoRebateCondition() {
      const { type_index, hall_index } = this.query
      if (!this.dataSource[type_index].halls || this.dataSource[type_index].halls.length < 1) {
        return
      } else if (
        !this.dataSource[type_index].halls[hall_index].rebet_condition ||
        this.dataSource[type_index].halls[hall_index].rebet_condition.length < 1
      ) {
        return
      }
      const rebet_condition = this.dataSource[type_index].halls[hall_index].rebet_condition
      if (rebet_condition) {
        this.editInfo.rebet_condition = rebet_condition
      }
    },
    /**
     * 通过数据处理表单的数据
     */
    updateEditInfoMode(moneyType, childMoneyType) {
      const { type_index, hall_index } = this.query
      if (!this.dataSource[type_index].halls.length) {
        this.dataSource[type_index].halls = [
          {
            game_id: this.dataSource[type_index].id,
            game_name: this.dataSource[type_index].name,
            rebet_ceiling: 0,
            rebet_condition: null,
            rebet_desc: null,
            rebot_way: null
          }
        ]
      }
      const data = this.dataSource[type_index].halls[hall_index]
      this.editInfo.rebet_ceiling = data.rebet_ceiling
      this.editInfo.hasData = true
      const rebot_way = data.rebot_way
      if (rebot_way) {
        if (moneyType) {
          this.editInfo.moneyType = moneyType
          if (!rebot_way[moneyType]) {
            this.editInfo.moneyRange = [
              {
                reabte: '',
                daMa: '',
                range: ['', ''],
                isAdd: true
              }
            ]
            return
          } else {
            if (rebot_way[moneyType].status !== childMoneyType) {
              this.editInfo.moneyRange = [
                {
                  reabte: '',
                  daMa: '',
                  range: ['', ''],
                  isAdd: true
                }
              ]
              return
            }
          }
        }
        this.editInfo.moneyType = rebot_way.type
        const sub = rebot_way.data
        this.editInfo.childMoneyType = sub.status
        const value = typeof sub.value === 'string' ? [sub.value] : sub.value
        const len = value.filter(item => !!item).length
        if (len > 0) {
          this.editInfo.moneyRange = value.map(item => {
            const obj = {}
            const arr = item.split(';')
            obj.range = arr[0].split(',')
            obj.rebate = arr[1]
            obj.daMa = arr[2]
            obj.isAdd = false
            return obj
          })
        } else {
          this.editInfo.moneyRange = [
            {
              reabte: '',
              daMa: '',
              range: ['', ''],
              isAdd: true
            }
          ]
        }
      } else {
        this.editInfo.moneyRange = [
          {
            reabte: '',
            daMa: '',
            range: ['', ''],
            isAdd: true
          }
        ]
      }
    },
    moneyTypeChange(type) {
      this.updateEditInfoMode(type, this.editInfo.childMoneyType)
    },
    childMoneyTypeChange(type) {
      this.updateEditInfoMode(this.editInfo.moneyType, type)
    },

    // 切换回水厅
    changeTab(index) {
      this.query.hall_index = index
      this.initRebetCondition()
      this.updateEditInfoRebateCondition()
      this.updateEditInfoMode()
    },
    getPutArguments() {
      const { type_index, hall_index } = this.query
      const hasHalls = this.dataSource[type_index].halls
      const value = this.editInfo.moneyRange.map(item => {
        const rangeLen = item.range.filter(it => !!it)
        return rangeLen.length === 2 && !!item.rebate && !!item.daMa
          ? `${item.range.join(',')};${item.rebate};${item.daMa}`
          : undefined
      })
      let isRequired = false
      const required = value.filter(item => !item).length > 0
      this.editInfo.rebet_condition.map(item => {
        if (!item.value && item.checked) {
          isRequired = true
        }
      })
      // 格式化了回水时间，首个字符串为0则删除
      const obj = {
        type: 'rebate',
        menu: this.type,
        rebot_time:
          this.timeValue.split(':')[0].slice(0, 1) === 0
            ? this.timeValue.split(':')[0].slice(1, 2)
            : this.timeValue.split(':')[0],
        rebot_way: {
          type: this.editInfo.moneyType,
          data: {
            status: this.editInfo.childMoneyType,
            value
          }
        },
        user_level_id: this.$route.query.id,
        status_switch: this.dataSource[this.query.type_index].halls[this.query.hall_index]
          .status_switch
      }
      let opt = {}
      if (this.type === 'CP') {
        opt = Object.assign({}, obj, {
          hall_level: this.dataSource[type_index].halls[hall_index].hall_level,
          lottery_type: this.dataSource[type_index].lottery_type,
          rebet_condition: this.editInfo.rebet_condition.map(item => {
            const n = Object.assign({}, item)
            n.value = n.value.toString()
            return n
          })
        })
      } else {
        const gameId =  []
        if(this.isBatch) {
          gameId.push(...this.query.game_id)
        }else{
          const id = hasHalls.length > 0 ? hasHalls[hall_index].game_id : this.dataSource[type_index].id
          gameId.push(id)
        }
        // gameId = isBatch ? gameId.push(...this.query.game_id) : gameId.push( hasHalls.length > 0 ? hasHalls[hall_index].game_id : this.dataSource[type_index].id )
        opt = Object.assign({}, obj, {
          game_id: gameId
            // hasHalls.length > 0 ? hasHalls[hall_index].game_id : this.dataSource[type_index].id
        })
      }
      if (this.editInfo.childMoneyType === 'percentage') {
        opt = Object.assign({}, obj, opt, {
          rebet_ceiling: this.editInfo.rebet_ceiling
        })
      }
      return {
        opt,
        required,
        isRequired
      }
    },
    async save() {
      this.isClick = true
      if (this.loading.modalButton) {
        return
      }
      if (!this.isEdit) {
        let isError = false
        let ise = false
        let isRange = false
        this.editInfo.rebet_condition.map(item => {
          const value = item.value.toString()
          if (this.backWaterOption[item.type][1] !== '%' && item.value.includes('.')) {
            ise = true
          }
          if (value.includes('.') && value.split('.')[1].length > 2) {
            isError = true
          }
        })
        this.editInfo.moneyRange.map(item => {
          Object.entries(item).map(([key, value]) => {
            if (key === 'range') {
              value.map(sub => {
                if (sub.toString().includes('.') && sub.toString().split('.')[1].length > 2) {
                  isError = true
                }
              })
              if (value && value.length === 2 && Number(value[1]) < Number(value[0])) {
                isRange = true
              }
            } else {
              if (value.toString().includes('.') && value.toString().split('.')[1].length > 2) {
                isError = true
              }
            }
          })
        })
        if (ise) {
          this.$Message.warning(this.i18n_lang.memberLevelDetail76)
          return
        }
        if (isError) {
          this.$Message.warning(this.i18n_lang.memberLevelDetail77)
          return
        }
        if (isRange) {
          this.$Message.warning(this.i18n_lang.memberLevelDetail78)
          return
        }
        if (!this.timeValue) {
          this.$Message.warning(this.i18n_lang.memberLevelDetail79)
          return
        }
        const opts = this.getPutArguments()
        if (opts.required || opts.isRequired) {
          this.$Message.warning(this.i18n_lang.memberLevelDetail80)
          return
        }
        this.loading.modalButton = true
        const res = await this.$axios.request({
          url: '/lottery/hall/rebate',
          method: 'PUT',
          data: opts.opt
        })
        this.isClick = false
        if (res.state === 0) {
          this.$msg({
            type: 'success',
            message: this.i18n_lang.memberLevelDetail81
          })

          if (this.userId) {
            this.$emit('updateData')
          }
        } else {
          this.$msg({
            type: 'error',
            message: res.message
          })
        }
        this.isEdit = !this.isEdit
        this.loading.modalButton = false
      } else {
        this.isEdit = !this.isEdit
      }
    },
    close() {
      this.isEdit = true
      this.isClick = false
      this.$emit('updateData')
      this.timeValue = this.rebotTime
      this.updateEditInfoRebateCondition()
      this.updateEditInfoMode()
    },
    /**
     * 点击新增
     */
    add() {
      this.editInfo.moneyRange.push({
        reabte: '',
        daMa: '',
        range: [this.editInfo.moneyRange[this.editInfo.moneyRange.length - 1].range[1], ''],
        isAdd: true
      })
    },
    /**
     * 点击删除
     */
    remove(index) {
      this.editInfo.moneyRange.splice(index, 1)
    },
    changeTime(time) {
      this.timeValue = time
    }
  }
}
</script>

<style lang="less" scoped>
@import './CommonGame.less';
</style>
<style lang="less">
#commonMode {
  .timer-picker {
    ul {
      li {
        font-size: 12px;
      }
    }
  }
}
</style>
