<template>
  <div id="stockholder">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Row>
      <p class="title">
        <span>{{i18n_lang.ShareholderDataSetting0}}</span>
      </p>
      <Col span="6">
        <div class="item">
          <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting1}}</p>
          <span>
            <Switch v-model="user_agent.bet_amount"></Switch>
          </span>
        </div>
      </Col>
      <Col span="6">
        <div class="item">
          <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting2}}</p>
          <span>
            <Switch v-model="user_agent.next_bet_amount"></Switch>
          </span>
        </div>
      </Col>
      <Col span="6">
        <div class="item">
          <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting3}}</p>
          <span>
            <Switch v-model="user_agent.total_bet_amount"></Switch>
          </span>
        </div>
      </Col>
      <Col span="6">
        <div class="item">
          <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting4}}</p>
          <span>
            <Switch v-model="user_agent.new_register"></Switch>
          </span>
        </div>
      </Col>
      <Col span="6">
        <div class="item">
          <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting5}}</p>
          <span>
            <Switch v-model="user_agent.next_agent"></Switch>
          </span>
        </div>
      </Col>
      <Col span="6">
        <div class="item">
          <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting6}}</p>
          <span>
            <Switch v-model="user_agent.recharge_user"></Switch>
          </span>
        </div>
      </Col>
      <Col span="6">
        <div class="item">
          <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting7}}</p>
          <span>
            <Switch v-model="user_agent.recharge_amount"></Switch>
          </span>
        </div>
      </Col>
      <Col span="6">
        <div class="item">
          <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting8}}</p>
          <span>
            <Switch v-model="user_agent.profits"></Switch>
          </span>
        </div>
      </Col>
    </Row>
    <Row>
      <p class="title">
        <span>{{i18n_lang.ShareholderDataSetting9}}</span>
      </p>
      <div style="overflow: hidden;">
        <Col span="4">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting1}}</p>
            <span>
              <Switch v-model="admin_agent.bet_amount"></Switch>
            </span>
          </div>
        </Col>
        <Col span="4">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting2}}</p>
            <span>
              <Switch v-model="admin_agent.next_bet_amount"></Switch>
            </span>
          </div>
        </Col>
        <Col span="4">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting3}}</p>
            <span>
              <Switch v-model="admin_agent.total_bet_amount"></Switch>
            </span>
          </div>
        </Col>
        <Col span="4">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting10}}</p>
            <span>
              <Switch v-model="admin_agent.profits"></Switch>
            </span>
          </div>
        </Col>
      </div>
      <div style="overflow: hidden;">
        <Col span="4">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting11}}</p>
            <span>
              <Switch v-model="admin_agent.proportion"></Switch>
            </span>
          </div>
        </Col>
        <Col span="4">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting12}}</p>
            <span>
              <Switch v-model="admin_agent.fee_amount"></Switch>
            </span>
          </div>
        </Col>
        <Col span="4">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting13}}</p>
            <span>
              <Switch v-model="admin_agent.new_register"></Switch>
            </span>
          </div>
        </Col>
        <Col span="4">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting14}}</p>
            <span>
              <Switch v-model="admin_agent.first_recharge_user"></Switch>
            </span>
          </div>
        </Col>
        <Col span="4">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting15}}</p>
            <span>
              <Switch v-model="admin_agent.first_recharge_amount"></Switch>
            </span>
          </div>
        </Col>
      </div>
      <div style="overflow: hidden;">
        <Col span="4">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting16}}</p>
            <span>
              <Switch v-model="admin_agent.all_recharge_amount"></Switch>
            </span>
          </div>
        </Col>
        <Col span="4">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting17}}</p>
            <span>
              <Switch v-model="admin_agent.valid_user"></Switch>
            </span>
          </div>
        </Col>
        <Col span="4">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting18}}</p>
            <span>
              <Switch v-model="admin_agent.valid_amount"></Switch>
            </span>
          </div>
        </Col>
        <Col span="4">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.ShareholderDataSetting19}}</p>
            <span>
              <Switch v-model="admin_agent.bet_user"></Switch>
            </span>
          </div>
        </Col>
      </div>
    </Row>
    <Row style="margin:20px 0">
      <Button size="large" :loading="loading.btn" type="primary" @click="save">{{i18n_lang.ShareholderDataSetting20}}</Button>
    </Row>
  </div>
</template>

<script>
  export default {
    data() {
      const i18n_lang = this.$t('ShareholderDataSetting');
      return {
        i18n_lang: i18n_lang,
        loading: {
          page: false,
          btn: false
        },
        liuShui: true,
        user_agent: {},
        admin_agent: {}
      }
    },
    created() {
      this.getData()
    },
    methods: {
      async getData() {
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/system/agentswitch',
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
        const { user_agent, admin_agent } = res.data
        this.user_agent = user_agent
        this.admin_agent = admin_agent
      },
      async save() {
        this.loading.btn = true
        const req = {
          user_agent: this.user_agent,
          admin_agent: this.admin_agent
        }
        const res = await this.$axios.request({
          url: '/system/agentswitch',
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
  #stockholder{
    .title {
      font-size: 16px;
      margin: 20px 0;
      padding-left: 10px;
      border-left: 3px solid #3080fe;
      color: #666;
    }
    .item {
      margin-bottom: 18px;
      & > p,
      & > span {
        font-size: 14px;
        display: inline-block;
        line-height: 28px;
        color: rgb(153, 153, 153);
        min-width: 100px;
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
