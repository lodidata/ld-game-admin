<template>
  <div>
    <Row>
      <Col span="2">
        <Checkbox class="pl20" size="large" v-model="participateType" @on-change="change">{{
          i18n_lang.activeList335
        }}</Checkbox>
      </Col>
      <Col span="22">
        <FormItem prop="recharge_limit">
          <div v-for="(todo, index) in itemList" :key="index" class="recharge-limit">
            <div :class="firstShow ? 'info_min' : 'info'">
              <span>{{ labelOne }}</span>
              <Input v-model="todo.nums" :disabled="todo.disabled"></Input>

              <span v-show="firstShow">
                <span><</span> {{ i18n_lang.activeList336 }} <span>≤</span></span
              >
              <Input class="min_input" v-show="firstShow" v-model="todo.money_day_min" :disabled="todo.disabled"></Input>

              <span v-show="isShow">
                <span v-show="showItem"><</span> {{ labelTwo }}
                <span v-show="showItem">≤</span></span
              >
              <Input v-show="isShow" v-model="todo.money" :disabled="todo.disabled"></Input>

              <span v-show="firstShow">
                <span><</span> {{ i18n_lang.activeList347 }} <span>≤</span></span
              >
              <Input v-show="firstShow" class="min_input" v-model="todo.money_day_max" :disabled="todo.disabled"></Input>

              <span>{{ i18n_lang.activeList122 }}</span>
              <Input v-model="todo.times" :disabled="todo.disabled"></Input>
            </div>
            <div class="btns" v-show="isAddList">
              <span @click="addLimit">+</span>
              <span v-if="index !== 0" class="del" @click="delLimit(index)">-</span>
            </div>
          </div>
        </FormItem>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'formGroup',
  props: {
    labelTip: {
      type: String,
      default: ''
    },
    labelOne: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    firstShow: {
      type: Boolean,
      default: false
    },
    showItem: {
      type: Boolean,
      default: false
    },
    labelTwo: {
      type: String,
      default: ''
    },
    itemList: {
      type: Array,
      default: () => []
    },
    isCheck: {
      type: Boolean,
      default: false
    },
    isAddList: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const i18n_lang = this.$t('activeList')
    const data = {
      i18n_lang: i18n_lang,
      participateType: false
    }
    return data
  },
  watch: {},
  methods: {
    change() {
      this.$emit('change', this.participateType)
    },
    // 添加充值额度
    addLimit() {
      this.itemList.push({ nums: '', money: '', money_day_min: '', money_day_max: '', times: '' })
    },
    // 删除充值额度
    delLimit(index) {
      this.itemList.splice(this.itemList.findIndex((item, i) => i === index), 1)
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(this.isCheck){
        this.participateType = true
      }
      if(this.isAddList){

      }
    })
  }
}
</script>

<style lang="less" scoped>
.recharge-limit {
  display: flex;
  margin-bottom: 8px;
  .info {
    .ivu-input-wrapper {
      width: 100px;
    }
    span {
      display: inline-block;
      padding: 0 5px 0 10px;
    }
  }
  .info_min {
    .ivu-input-wrapper {
      width: 50px;
    }
    span {
      display: inline-block;
      padding: 0 5px 0 10px;
    }
  }
  .btns {
    padding: 0 10px;
    & > span {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 28px;
      text-align: center;
      border: 1px solid #ccc;
      color: #ccc;
      border-radius: 50%;
      margin-right: 5px;
      cursor: pointer;
      user-select: none;
      font-size: 20px;
    }
  }
}
.pl20 {
  padding-left: 20px;
  padding-top: 6px;
}
/deep/.ivu-form-item-content {
  margin-left: 0 !important;
}
</style>
