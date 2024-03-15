<template>
  <div id="LevelSet">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Form ref="dataForm" :model="dataSource" :rules="ruleValidate">
      <div class="tab_box">
        <p class="title">{{i18n_lang.memberLevelDetail4}}</p>
        <Row class="container">
          <Col span="8">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail5}}</p>
              <span v-if="$route.query.id">{{ dataSource.name }}</span>
              <span v-else>LV{{ addLevel }}</span>
            </div>
          </Col>
          <Col span="8">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail6}}</p>
              <span>
                <FormItem prop="deposit_money">
                  <Input
                    v-model="dataSource.deposit_money"
                    style="width: 120px"
                    :disabled="dataSource.level === 1"
                  />
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="8">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail7}}</p>
              <span>
                <FormItem prop="lottery_money">
                  <Input
                    v-model="dataSource.lottery_money"
                    style="width: 120px"
                    :disabled="dataSource.level === 1"
                  />
                </FormItem>
              </span>
            </div>
          </Col>
        </Row>

        <p class="title">
          {{i18n_lang.memberLevelDetail8}}
          <span style="font-size:14px">{{i18n_lang.memberLevelDetail9}}</span>
        </p>
        <p style="width:600px;">
          <FormItem prop="icon">
            <UploadImg ref="uploadImg" v-model="dataSource.icon"></UploadImg>
          </FormItem>
        </p>
        <!-- <p class="title">{{i18n_lang.memberLevelDetail10}}</p>
        <Row class="container">
          <Col span="12">
            <div class="item">
              <p style="display: block;">{{i18n_lang.memberLevelDetail11}}</p>
            </div>
            <p style="width:440px;">
              <MoreOptionCheck
                v-model="dataSource.online"
                :option-data="online_channel"
                option-label="name"
                option-key="name"
              ></MoreOptionCheck>
            </p>
          </Col>
          <Col span="8">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail12}}</p>
              <span>
                <Input v-model="dataSource.online_dml_percent" style="width: 120px"/>
              </span>
            </div>
          </Col>
        </Row>
        <Row class="container">
          <Col span="12">
            <div class="item">
              <p style="display: block;">{{i18n_lang.memberLevelDetail13}}</p>
            </div>
            <p style="width:440px;" class="special">
              <MoreOptionCheck
                v-model="dataSource.offline"
                :option-data="offline_channel"
                option-label="name"
                option-key="id"
              ></MoreOptionCheck>
            </p>
          </Col>
          <Col span="8">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail14}}</p>
              <span>
                <Input v-model="dataSource.offline_dml_percent" style="width: 120px"/>
              </span>
            </div>
          </Col>
        </Row> -->
        <p class="title">
          {{i18n_lang.memberLevelDetail15}}
          <span class="red">{{i18n_lang.memberLevelDetail16}}</span>
        </p>
        <Row class="container">
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail17}}</p>
              <span>
                <FormItem prop="promote_handsel">
                  <Input
                    v-model="dataSource.promote_handsel"
                    style="width: 120px"
                    :disabled="dataSource.level === 1"
                  />
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail18}}</p>
              <span>
                <FormItem prop="transfer_handsel">
                  <Input v-model="dataSource.transfer_handsel" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail19}}</p>
              <span>
                <FormItem prop="upgrade_dml_percent">
                  <Input v-model="dataSource.upgrade_dml_percent" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail20}}</p>
              <span>
                <FormItem prop="draw_count">
                  <Input v-model="dataSource.draw_count" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col>
          <!-- <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail83}}</p>
              <span>
                <FormItem prop="draw_count">
                  <Input v-model="dataSource.draw_count.bronze" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail84}}</p>
              <span>
                <FormItem prop="draw_count">
                  <Input v-model="dataSource.draw_count.sliver" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail85}}</p>
              <span>
                <FormItem prop="draw_count">
                  <Input v-model="dataSource.draw_count.gold" style="width: 120px"/>
                </FormItem>
              </span>
            </div>
          </Col> -->
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail21}}</p>
              <span>
                <FormItem prop="monthly_money">
                  <Input v-model="dataSource.monthly_money" style="width: 120px"></Input>
                </FormItem>
              </span>
            </div>
          </Col>
          <!-- <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail22}}</p>
              <span>
                <FormItem prop="monthly_percent">
                  <Input v-model="dataSource.monthly_percent" style="width: 120px"></Input>
                </FormItem>
              </span>
              <template>
                <Tooltip max-width="200">
                  <Icon type="ios-help-outline" size="20"></Icon>
                  <div slot="content" class="tipBox">
                    <span>{{i18n_lang.memberLevelDetail23}}</span>
                    <br>
                    <span>{{i18n_lang.memberLevelDetail24}}</span>
                    <br>
                    <span>{{i18n_lang.memberLevelDetail25}}</span>
                  </div>
                </Tooltip>
              </template>
            </div>
          </Col> -->
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail86}}</p>
              <span>
                <FormItem prop="monthly_money">
                  {{i18n_lang.memberLevelDetail87}}>=<Input v-model="dataSource.monthly_recharge" style="width: 120px"></Input>
                </FormItem>
              </span>
            </div>
          </Col>
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.memberLevelDetail88}}</p>
              <span>
                <FormItem prop="bankcard_sum">
                  <Input v-model="dataSource.bankcard_sum" style="width: 120px"></Input>
                </FormItem>
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </Form>
    <Row>
      <Poptip
        confirm
        :title="
          `${i18n_lang.memberLevelDetail26}${
            $route.query.id ? `${i18n_lang.memberLevelDetail27}${dataSource.name}` : `${i18n_lang.memberLevelDetail28}${addLevel}`
          }${i18n_lang.memberLevelDetail29}`
        "
        placement="top-start"
        style="margin-left:20px;"
        @on-ok="save"
      >
        <Button type="primary">{{i18n_lang.memberLevelDetail26}}</Button>
      </Poptip>
    </Row>
  </div>
</template>
<script>
import MoreOptionCheck from '_c/MoreOptionCheck'
import UploadImg from '_c/UploadImg'
import { MathDiv, MathMul } from '@/libs/formatMath'

const initData = {
  name: '', // 等级
  deposit_money: '', // 最低充值金额
  lottery_money: '', // 投注量
  icon: '', // 图标
  // online: [], // 线上充值渠道
  // online_dml_percent: 0, // 线上充值打码量
  // offline: [], // 线下充值渠道
  // offline_dml_percent: 0, // 线下充值打码量
  upgrade_dml_percent: '', // 提现打码量
  promote_handsel: '', // 晋升彩金
  transfer_handsel: '', // 转卡彩金%

  draw_count: '' ,// 活动免费抽奖次数
  monthly_recharge: '',//月俸禄充值条件
  bankcard_sum: "" //银行卡绑定数
}
export default {
  components: {
    MoreOptionCheck,
    UploadImg
  },
  data() {
    const i18n_lang = this.$t('memberLevelDetail');
    return {
      i18n_lang: i18n_lang,
      dataSource: { ...initData },
      online_channel: [],
      offline_channel: [],
      loading: {
        page: false
      },
      addLevel: '',
      ruleValidate: {
        deposit_money: [
          {
            required: true,
            message: i18n_lang.memberLevelDetail30
          }
        ],
        lottery_money: [
          {
            required: true,
            message: i18n_lang.memberLevelDetail31
          }
        ],
        icon: [
          {
            required: true,
            message: i18n_lang.memberLevelDetail32
          }
        ],
        monthly_money: [
          {
            required: true,
            message: i18n_lang.memberLevelDetail33
          }
        ],
        monthly_percent: [
          {
            required: true,
            message: i18n_lang.memberLevelDetail34
          }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.loading.page = true
      await this.getChannel()
      if (this.$route.query.id) {
        this.getEditData()
      }
      this.loading.page = false
    },
    // 获取线上线下渠道
    async getChannel() {
      const res = await this.$axios.request({
        url: '/level/paySet',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.online_channel = res.data.online
      res.data.offline.map(x => {
        x.name = `${x.type}-${x.name}`
      })
      this.offline_channel = res.data.offline
      this.addLevel = res.data.level
    },
    // 获取edit数据
    async getEditData() {
      const query = {
        id: this.$route.query.id
      }
      const res = await this.$axios.request({
        url: '/memberslevel',
        method: 'GET',
        params: query
      })

      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.dataSource = { ...initData }
      this.dataSource = res.data[0]
      this.solveBug()
      // this.dataSource.lottery_money = MathDiv(this.dataSource.lottery_money, 100)
      this.dataSource.lottery_money = MathDiv(this.dataSource.lottery_money, 1)
      // this.dataSource.deposit_money = MathDiv(this.dataSource.deposit_money, 100)
      this.dataSource.deposit_money = MathDiv(this.dataSource.deposit_money, 1)
      // this.dataSource.promote_handsel = MathDiv(this.dataSource.promote_handsel, 100)
      this.dataSource.promote_handsel = MathDiv(this.dataSource.promote_handsel, 1)
      // this.dataSource.online_dml_percent = MathDiv(this.dataSource.online_dml_percent, 100)
      // this.dataSource.offline_dml_percent = MathDiv(this.dataSource.offline_dml_percent, 100)
      this.dataSource.upgrade_dml_percent = MathDiv(this.dataSource.upgrade_dml_percent, 100)
      this.dataSource.transfer_handsel = MathDiv(this.dataSource.transfer_handsel, 100)
      // this.dataSource.monthly_money = MathDiv(this.dataSource.monthly_money, 100)
      this.dataSource.monthly_money = MathDiv(this.dataSource.monthly_money, 1)
      this.dataSource.monthly_percent = MathDiv(this.dataSource.monthly_percent, 100)
      this.dataSource.monthly_recharge = MathDiv(this.dataSource.monthly_recharge, 1)
    },
    //  把需要编辑的列表的线下支付字段改成id
    solveBug() {
      this.offline_channel.map(x => {
        const index = this.dataSource.offline.indexOf(x.name)
        if (index >= 0) {
          this.dataSource.offline[index] = x.id
        }
      })
    },
    async save() {
      // await this.$refs.uploadImg.upload()

      this.$nextTick(() => {
        this.$refs['dataForm'].validate(async valid => {
          if (!valid) return
          this.loading.page = true
          let method = ''
          let URL = ''
          const req = {
            ...this.dataSource
          }
          // req.lottery_money = MathMul(req.lottery_money, 100)
          // req.deposit_money = MathMul(req.deposit_money, 100)
          // req.promote_handsel = MathMul(req.promote_handsel, 100)


          // 下面2行不是去分的注释
          // req.online_dml_percent = MathMul(req.online_dml_percent, 100)
          // req.offline_dml_percent = MathMul(req.offline_dml_percent, 100)

          // req.upgrade_dml_percent = MathMul(req.upgrade_dml_percent, 100)
          // req.transfer_handsel = MathMul(req.transfer_handsel, 100)
          // req.monthly_money = MathMul(req.monthly_money, 100)
          // req.monthly_percent = MathMul(req.monthly_percent, 100)
          // req.monthly_recharge = MathMul(req.monthly_recharge, 100)

          if (this.$route.query.id) {
            method = 'PUT'
            URL = `/memberslevel/${this.$route.query.id}`
          } else {
            method = 'POST'
            URL = `/memberslevel`
            req.level = this.addLevel
            req.name = `LV${this.addLevel}`
          }
          const res = await this.$axios.request({
            url: URL,
            method: method,
            data: req
          })
          this.loading.page = false
          this.$msg({
            type: res.status !== 200 ? 'error' : 'success',
            message: res.message
          })
          if (res.status !== 200) return
          if (this.$route.query.id) {
            this.getEditData()
          } else {
            this.$router.push('/admin/memberLevel?back')
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
#LevelSet {
  .container {
    padding: 0 40px;
  }
  /deep/ .ivu-row {
    .item {
      margin-bottom: 18px;
      p,
      span {
        font-size: 14px;
        display: inline-block;
        line-height: 28px;
        color: rgb(153, 153, 153);
        min-width: 70px;
        margin-right: 5px;
      }

      span {
        color: rgb(51, 51, 51);
        margin-left: 8px;
      }
    }
  }
}
</style>
