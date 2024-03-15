<template>
  <div id="Money">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <p class="title">{{i18n_lang.systemSet41}}</p>
    <div class="content">
      <Row>
        <Col span="12">
          <div class="item">
            <p>{{i18n_lang.systemSet42}}</p>
            <span>
              <Switch v-model="recharge.deposit_float_point"></Switch>
            </span>
          </div>
        </Col>
        <!-- <Col span="12">
          <div class="item">
            <p style="float: left;">{{i18n_lang.systemSet43}}</p>
            <span>
              <Switch v-model="recharge.recharge_money_set"></Switch>
              <span>
                <template v-if="recharge.recharge_money_set && recharge.recharge_money_value">
                  <Input v-model="recharge.recharge_money_value[0]" style="width:80px;"/>
                  <Input v-model="recharge.recharge_money_value[1]" style="width:80px"/>
                  <Input v-model="recharge.recharge_money_value[2]" style="width:80px"/>
                  <Input v-model="recharge.recharge_money_value[3]" style="width:80px"/>
                  <br>
                  <Input v-model="recharge.recharge_money_value[4]" style="width:80px;margin-left: 50px;margin-top: 10px;"/>
                  <Input v-model="recharge.recharge_money_value[5]" style="width:80px;margin-top: 10px;"/>
                  <Input v-model="recharge.recharge_money_value[6]" style="width:80px;margin-top: 10px;"/>
                  <Input v-model="recharge.recharge_money_value[7]" style="width:80px;margin-top: 10px;"/>
                </template>
              </span>
            </span>
          </div>
        </Col> -->
      </Row>
      <Row>
        <Col span="12">
          <div class="item">
            <p>{{i18n_lang.systemSet44}}</p>
            <span>
              <Switch v-model="recharge.canNotDepositOnPending"></Switch>
            </span>
          </div>
        </Col>
        <!-- <Col span="12">
          <div class="item">
            <p>{{i18n_lang.systemSet45}}</p>
            <span>
              <Input v-model="recharge.recharge_money.recharge_min" style="width:80px"/>
              <span>-</span>
              <Input v-model="recharge.recharge_money.recharge_max" style="width:80px"/>
            </span>
          </div>
        </Col> -->
      </Row>
      <Row>
        <Col span="12">
          <div class="item">
            <p>{{i18n_lang.systemSet96}}</p>
            <span>
              <Input v-model="recharge.rechargeCallbackTime" @on-keyup="keepInteger(value)"/>
            </span>
          </div>
        </Col>
      </Row>
      <!-- <Row>
        <Col span="12">
          <div class="item">
            <p>localbank</p>
            <span>
              <Switch v-model="recharge.autotopup"></Switch>
            </span>
          </div>
        </Col>
        <Col span="12">
          <div class="item">
            <p>offline</p>
            <span>
              <Switch v-model="recharge.offline"></Switch>
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <div class="item">
            <p>gcash</p>
            <span>
              <Switch v-model="recharge.qrcode"></Switch>
            </span>
          </div>
        </Col>
        <Col span="12">
          <div class="item">
            <p>711_direct</p>
            <span>
              <Switch v-model="recharge.direct"></Switch>
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <div class="item">
            <p>grabpay</p>
            <span>
              <Switch v-model="recharge.grabpay"></Switch>
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span="12" v-for="(item,index) in recharge_type" :key="index">
          <div class="item">
            <p>{{item.name}}</p>
            <span>
              <Switch v-model="item.valueShow"></Switch>
            </span>
          </div>
        </Col>
      </Row> -->
    </div>

    <p class="title">{{i18n_lang.systemSet46}}</p>
    <div class="content">
      <Row>
        <Col span="24">
          <div class="item">
            <p>{{i18n_lang.systemSet47}}</p>
            <span>
              <Switch v-model="withdraw.withdraw_need_mobile"></Switch>
            </span>
          </div>
        </Col>
        <Col span="24">
          <div class="item">
            <p>{{i18n_lang.systemSet48}}</p>
            <span>
              <Switch v-model="withdraw.withdraw_need_idcard"></Switch>
            </span>
          </div>
        </Col>
        <Col span="11">
          <div class="item">
            <p>{{i18n_lang.systemSet49}}</p>
            <span>
              <TimePicker
                v-model="withdraw.withdraw_time_Arr"
                format="HH:mm"
                type="timerange"
                placement="bottom-end"
                :placeholder="i18n_lang.systemSet50"
                style="width: 130px"
              ></TimePicker>
            </span>
          </div>
        </Col>
        <Col span="11">
          <div class="item">
            <p>{{i18n_lang.systemSet51}}</p>
            <span>
              <Input
                v-model="withdraw.withdraw_day_times"
                :placeholder="i18n_lang.systemSet52"
                style="width:120px"
              />
            </span>
          </div>
        </Col>
        <Col span="11">
          <div class="item">
            <p>{{i18n_lang.systemSet53}}</p>
            <span>
              <Input v-model="withdraw.withdraw_money.withdraw_min" style="width:80px"/>
              <span>-</span>
              <Input v-model="withdraw.withdraw_money.withdraw_max" style="width:80px"/>
            </span>
          </div>
        </Col>
        <Col span="11">
          <div class="item">
            <p>{{i18n_lang.systemSet54}}</p>
            <span>
              <Input
                v-model="withdraw.password_withdraw_fault"
                :placeholder="i18n_lang.systemSet52"
                style="width:120px"
              />
            </span>
          </div>
        </Col>
        <Col span="11">
          <div class="item">
            <p>{{i18n_lang.systemSet100_v1_2_4_3}}</p>
            <span>
              <Input v-model="withdraw.withdraw_card_money.withdraw_min" style="width:80px"/>
              <span>-</span>
              <Input v-model="withdraw.withdraw_card_money.withdraw_max" style="width:80px"/>
            </span>
          </div>
        </Col>
      </Row>
    </div>

    <Button
      style="width:150px"
      size="large"
      :loading="loading.btn"
      type="primary"
      @click="save"
    >{{i18n_lang.systemSet55}}</Button>
  </div>
</template>
<script>
import { MathDiv, MathMul } from '@/libs/formatMath'
export default {
  data() {
    const i18n_lang = this.$t('systemSet');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        btn: false
      },
      recharge: {
        recharge_money: {}
      },
      recharge_type: [],
      withdraw: {
        withdraw_money: {},
        withdraw_card_money: {}
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    keepInteger(){
      this.recharge.rechargeCallbackTime=this.recharge.rechargeCallbackTime.replace(/\D/g,'')
      // if(this.recharge.rechargeCallbackTime == 0){
      //   this.recharge.rechargeCallbackTime=""
      // }else{
      //   this.recharge.rechargeCallbackTime=this.recharge.rechargeCallbackTime.replace(/\D/g,'')
      // }
    },
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/system/coin',
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

      const { withdraw, recharge, recharge_type } = res.data
      // 处理时间
      withdraw.withdraw_time_Arr = [
        withdraw.withdraw_time.withdraw_time_start,
        withdraw.withdraw_time.withdraw_time_end
      ]

      // 处理金额
      withdraw.withdraw_money = {
        withdraw_max: MathDiv(withdraw.withdraw_money.withdraw_max, 1),
        withdraw_min: MathDiv(withdraw.withdraw_money.withdraw_min, 1)
      }
      withdraw.withdraw_card_money = {
        withdraw_max: MathDiv(withdraw.withdraw_card_money.withdraw_max, 1),
        withdraw_min: MathDiv(withdraw.withdraw_card_money.withdraw_min, 1)
      }
      recharge.recharge_money = {
        recharge_max: MathDiv(recharge.recharge_money.recharge_max, 1),
        recharge_min: MathDiv(recharge.recharge_money.recharge_min, 1)
      }
      if (recharge.recharge_money_value) {
        for (let i = 0; i < recharge.recharge_money_value.length; i++) {
          recharge.recharge_money_value[i] = MathDiv(recharge.recharge_money_value[i], 1)
        }
      }
      if(recharge_type && recharge_type.length){
        recharge_type.forEach((item, index) => {
          item.valueShow = item.value == 1 ? true : false
        })
      }
      this.withdraw = withdraw
      this.recharge = recharge
      this.recharge_type = recharge_type ? recharge_type : []
    },
    async save() {
      this.loading.btn = true
      const recharge_type = {}
      if(this.recharge_type.length){
        this.recharge_type.forEach((item, index) => {
          recharge_type[item.key] = item.valueShow
        })
      }
      const withdraw = JSON.parse(JSON.stringify(this.withdraw))
      const recharge = JSON.parse(JSON.stringify(this.recharge))
      withdraw.withdraw_time = {
        withdraw_time_start: withdraw.withdraw_time_Arr[0],
        withdraw_time_end: withdraw.withdraw_time_Arr[1]
      }
      // 处理金额
      withdraw.withdraw_money = {
        // withdraw_max: MathMul(withdraw.withdraw_money.withdraw_max, 100),
        // withdraw_min: MathMul(withdraw.withdraw_money.withdraw_min, 100)
        withdraw_max: withdraw.withdraw_money.withdraw_max,
        withdraw_min: withdraw.withdraw_money.withdraw_min,
      }
      withdraw.withdraw_card_money = {
        // withdraw_max: MathMul(withdraw.withdraw_card_money.withdraw_max, 100),
        // withdraw_min: MathMul(withdraw.withdraw_card_money.withdraw_min, 100)
        withdraw_max: withdraw.withdraw_card_money.withdraw_max,
        withdraw_min: withdraw.withdraw_card_money.withdraw_min,
      }
      recharge.recharge_money = {
        // recharge_max: MathMul(recharge.recharge_money.recharge_max, 100),
        // recharge_min: MathMul(recharge.recharge_money.recharge_min, 100)
        recharge_max: recharge.recharge_money.recharge_max,
        recharge_min: recharge.recharge_money.recharge_min,
      }
      if (recharge.recharge_money_value) {
        for (let i = 0; i < recharge.recharge_money_value.length; i++) {
          // recharge.recharge_money_value[i] = MathMul(recharge.recharge_money_value[i], 100)
          recharge.recharge_money_value[i] = recharge.recharge_money_value[i]
        }
      }
      const req = {
        withdraw,
        recharge,
        recharge_type
      }
      const res = await this.$axios.request({
        url: '/system/coin',
        method: 'PUT',
        data: req
      })
      this.loading.btn = false
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
#Money {
  .title {
    font-size: 16px;
    margin: 20px 0;
    padding-left: 10px;
    border-left: 3px solid #3080fe;
    color: #666;
  }
  .item {
    margin-bottom: 28px;
    & > p,
    & > span {
      font-size: 14px;
      display: inline-block;
      line-height: 28px;
      color: rgb(153, 153, 153);
      min-width: 60px;
      margin-right: 5px;
    }
    & > span {
      color: rgb(51, 51, 51);
      &.detail {
        color: #f33;
        margin-left: 5px;
      }
    }
  }
}
</style>
