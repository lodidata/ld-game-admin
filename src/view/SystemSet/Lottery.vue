<template>
  <div id="Lottery">
    <Spin v-if="loading.page" fix size="large"></Spin>
    <p class="title">{{i18n_lang.systemSet31}}</p>
    <div class="content">
      <Row>
        <Col span="6">
        <div class="item">
          <p>{{i18n_lang.systemSet32}}</p>
          <span>
            <Switch v-model="lottery.stop_bet"></Switch>
          </span>
        </div>
        </Col>
        <Col span="6">
        <div class="item">
          <p>{{i18n_lang.systemSet33}}</p>
          <span>
            <Switch v-model="lottery.stop_chasing"></Switch>
          </span>
        </div>
        </Col>
        <Col span="6">
        <div class="item">
          <p>{{i18n_lang.systemSet34}}</p>
          <span>
            <Switch v-model="lottery.stop_deposit"></Switch>
          </span>
        </div>
        </Col>
        <Col span="6">
        <div class="item">
          <p>{{i18n_lang.systemSet35}}</p>
          <span>
            <Switch v-model="lottery.stop_withdraw"></Switch>
          </span>
        </div>
        </Col>
        <Col span="6">
        <div class="item">
          <p>{{i18n_lang.systemSet36}}</p>
          <span>
            <Switch v-model="lottery.unusual_period_auto"></Switch>
          </span>
        </div>
        </Col>
        <Col span="6">
        <div class="item">
          <p>{{i18n_lang.systemSet37}}</p>
          <span>
            <Switch v-model="lottery.q3bz_tongsha"></Switch>
          </span>
        </div>
        </Col>
        <Col span="7">
        <div class="item">
          <p>{{i18n_lang.systemSet38}}</p>
          <span>
            <Input v-model="lottery.max_odds"/>
          </span>
        </div>
        </Col>
        <Col span="7">
        <div class="item">
          <p>{{i18n_lang.systemSet39}}</p>
          <span>
            <Input v-model="lottery.max_award"/>
          </span>
        </div>
        </Col>
      </Row>
    </div>
    <Button
      style="width:150px"
      size="large"
      type="primary"
      :loading="loading.btn"
      @click="save"
    >{{i18n_lang.systemSet40}}</Button>
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
      lottery: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/system/lottery',
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
      const { lottery } = res.data
      // 处理金额
      lottery.max_award = MathDiv(lottery.max_award, 1)
      lottery.max_odds = MathDiv(lottery.max_odds, 1)
      this.lottery = lottery
    },
    async save() {
      this.loading.btn = true
      const lottery = JSON.parse(JSON.stringify(this.lottery))
      // lottery.max_award = MathMul(lottery.max_award, 100)
      // lottery.max_odds = MathMul(lottery.max_odds, 100)
      const req = {
        lottery: lottery
      }
      const res = await this.$axios.request({
        url: '/system/lottery',
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
#Lottery {
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
