<template>
  <div id="InCome">
    <Card dis-hover class="query_box" style="width:600px">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem :label="i18n_lang.thirdAdvance2" prop="third">
          <Select v-model="formValidate.third" @on-change="getChangeId">
            <Option v-for="item in thirdPayList" :key="item.id" :value="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.thirdAdvance3" prop="balance">
          <div>
            <Button v-if="isBalance !== 2" type="primary" :loading="loading.btn" @click="getBalance">
              {{ isBalance == 1 ? i18n_lang.thirdAdvance4 : i18n_lang.thirdAdvance5 }}
              <Icon v-if="isBalance == 0" type="ios-refresh-empty" size="20" style="vertical-align:sub;"></Icon>
            </Button>
            <span v-else>{{ formValidate.balance }}{{i18n_lang.thirdAdvance6}}</span>
          </div>
        </FormItem>
        <!-- <FormItem label="订单号" prop="withdraw_order">
          <Input v-model="formValidate.withdraw_order" placeholder=""></Input>
        </FormItem> -->
        <FormItem :label="i18n_lang.thirdAdvance7" prop="user_name">
          <Input v-model="formValidate.user_name" placeholder=""></Input>
        </FormItem>
        <FormItem :label="i18n_lang.thirdAdvance8" prop="bank_code">
          <Select v-model="formValidate.bank_code" placeholder="">
            <Option v-for="(item,index) in bankList" :key="index" :value="item.code">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.thirdAdvance9" prop="bank_card">
          <Input v-model="formValidate.bank_card" placeholder=""></Input>
        </FormItem>
        </FormItem>
        <FormItem :label="i18n_lang.thirdAdvance10" prop="area">
          <Input v-model="formValidate.area" placeholder=""></Input>
        </FormItem>
        <FormItem :label="i18n_lang.thirdAdvance11" prop="city_area">
          <Row>
            <Col span="11">
            <Select v-model="formValidate.province" :placeholder="i18n_lang.thirdAdvance12" @on-change="changeList">
              <Option v-for="(item,index) in proList" :key="index" :value="item.value">{{ item.name }}</Option>
            </Select>
            </Col>
            <Col span="2">&nbsp;</Col>
            <Col span="11">
            <Select v-model="formValidate.city_code" :placeholder="i18n_lang.thirdAdvance13">
              <Option v-for="(item,index) in cityList" :key="index" :value="item.value||'beijing'">{{ item.name }}</Option>
            </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem :label="i18n_lang.thirdAdvance14" prop="money">
          <Input v-model="formValidate.money" placeholder=""></Input>
        </FormItem>
        <FormItem :label="i18n_lang.thirdAdvance15">
          <span>{{i18n_lang.thirdAdvance16}}</span>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="loading.save" @click="handleSubmit('formValidate')">{{i18n_lang.thirdAdvance17}}</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import { MathMul, MathDiv } from '@/libs/formatMath'
const initForm = {
  third: '',
  balance: '',
  withdraw_order: '',
  user_name: '',
  bank_code: '',
  bank_card: '',
  area: '',
  province: '',
  city_code: '',
  money: ''
}
export default {
  data() {
    const i18n_lang = this.$t('thirdAdvance');
    return {
      i18n_lang: i18n_lang,
      loading: {
        btn: false,
        save: false
      },
      formValidate: { ...initForm },
      thirdPayList: [], // 第三方支付数据
      bankList: [], // 获取收款银行数据
      allCountry: [],
      proList: [], // 获取省份数据
      cityList: [], // 获取城市数据
      isBalance: 1,
      ruleValidate: {
        third: [{ required: true, message: i18n_lang.thirdAdvance18 }],
        balance: [{ required: true, message: i18n_lang.thirdAdvance19 }],
        user_name: [{ required: true, message: i18n_lang.thirdAdvance20, trigger: 'blur' }],
        bank_code: [{ required: true, message: i18n_lang.thirdAdvance21 }],
        bank_card: [{ required: true, message: i18n_lang.thirdAdvance22, trigger: 'blur' }],
        money: [
          {
            required: true,
            validator: (rule, value, cb) => {
              console.log(this.formValidate.money, this.formValidate.balance)
              if (this.formValidate.money === '') {
                return cb(i18n_lang.thirdAdvance23)
              } else if (Number(this.formValidate.money) > Number(this.formValidate.balance)) {
                return cb(i18n_lang.thirdAdvance24)
              } else {
                return cb()
              }
            }
          }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getThirdPay()
      this.getCity()
    },
    // 获取第三方支付
    async getThirdPay() {
      this.thirdPayList = []
      const res = await this.$axios.request({
        url: `/thirdAdvance`,
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.thirdPayList = res.data
      this.formValidate.third = this.thirdPayList.length !== 0 ? this.thirdPayList[0].id : ''
      if (res.data.length !== 0) {
        this.getBank(this.formValidate.third)
      }
    },
    getChangeId(val) {
      this.getBank(val)
      this.isBalance = 1
      this.formValidate.balance = ''
    },
    // 查询余额
    async getBalance() {
      if (!this.formValidate.third) {
        this.$Message.warning('请先选择第三方支付')
        return
      }
      this.loading.btn = true
      this.isBalance = 1
      const res = await this.$axios.request({
        url: `/thirdAdvance/balance/${this.formValidate.third}`,
        method: 'GET'
      })
      this.loading.btn = false
      if (res.status !== 200) {
        this.isBalance = 0
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.isBalance = 2
      this.formValidate.balance = MathDiv(res.data.balance, 1)
    },

    // 获取收款银行列表
    async getBank(id) {
      this.bankList = []
      const res = await this.$axios.request({
        url: `/thirdAdvance/bank/${id}`,
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.bankList = res.data
    },

    // 获取城市列表
    async getCity() {
      this.proList = []
      this.cityList = []
      const res = await this.$axios.request({
        url: `/country`,
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.allCountry = res.data
      this.proList = this.allCountry.filter(v => v.parent === 1)
    },

    // 省份change事件
    changeList(val) {
      this.cityList = []
      this.formValidate.city_code = ''
      this.cityList = this.allCountry.filter(v => v.parent === val)
    },

    // 提交转账
    async handleSubmit() {
      // console.log(this.cityList)
      this.loading.save = true
      this.$refs['formValidate'].validate(async valid => {
        if (!valid) {
          this.loading.save = false
        } else {
          const req = {
            ...this.formValidate
          }
          // req.money = MathMul(this.formValidate.money, 100)
          req.money = this.formValidate.money
          delete req.province
          delete req.balance
          const res = await this.$axios.request({
            url: `/thirdAdvance/transfer`,
            method: 'PUT',
            data: req
          })
          this.loading.save = false
          if (res.status !== 200) {
            this.$msg({
              type: 'error',
              message: res.message
            })
          }
          this.$Message.success(res.message)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
