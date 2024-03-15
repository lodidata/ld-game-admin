<template>
  <div id="Handle">
    <Spin v-if="loading.page" fix></Spin>
    <!-- query -->
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.manual2}}</span>
          <Input v-model="query.username" placeholder style="width: 100px"></Input>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" @click="getData">{{i18n_lang.manual3}}</Button>
      </div>
    </Card>

    <div v-if="visible.info" class="tab_box">
      <p class="title">
        <span>{{i18n_lang.manual4}}</span>
        <span class="title_des">
          <Button type="default" size="small" @click="goToMoneyDetail">{{i18n_lang.manual5}}</Button>
          <Button type="default" size="small" @click="getData">{{i18n_lang.manual6}}</Button>
        </span>
      </p>
      <div class="content">
        <Row>
          <Col span="6">
          <div class="item">
            <p>{{i18n_lang.manual7}}</p>
            <span>{{ dataSource.username }}</span>
          </div>
          </Col>
          <Col span="6">
          <div class="item">
            <p>{{i18n_lang.manual8}}</p>
            <span class="detail">{{ dataSource.total_balance }}</span>
          </div>
          </Col>
          <Col span="6">
          <div class="item">
            <p>{{i18n_lang.manual9}}</p>
            <span>{{ dataSource.levelName }}</span>
          </div>
          </Col>
          <Col span="6">
          <div class="item">
            <p>{{i18n_lang.manual10}}</p>
            <span>{{ dataSource.tagName || i18n_lang.manual11 }}</span>
          </div>
          </Col>
        </Row>
      </div>

      <template v-if="dataSource.primary.length">
        <p class="title">
          <span>{{i18n_lang.manual12}}</span>
          <span class="title_des">
            <Button type="default" size="small" @click="handleMoneyIn">{{i18n_lang.manual13}}</Button>
            <Button type="default" size="small" @click="handleMoneyOut">{{i18n_lang.manual14}}</Button>
            <Button type="default" size="small" @click="handleMoneyLess">{{i18n_lang.manual15}}</Button>
            <Button type="default" size="small" @click="handleMoneyAdd">{{i18n_lang.manual16}}</Button>
            <Button type="default" size="small" @click="handleDmlAdd">{{i18n_lang.manual17}}</Button>
            <Button type="default" size="small" @click="handleDmlLess">{{i18n_lang.manual18}}</Button>
            <Button type="default" size="small" @click="handleCanOutAdd(false)">{{i18n_lang.manual19}}</Button>
            <Button type="default" size="small" @click="handleCanOutLess(false)">{{i18n_lang.manual20}}</Button>
          </span>
          <span
            style="font-size: 13px;font-weight: 900;color: #000;margin-left: 10px;"
          >{{i18n_lang.manual21}}</span>
        </p>
        <div class="content">
          <Row>
            <Col span="6">
            <div class="item">
              <p>{{i18n_lang.manual22}}</p>
              <span class="detail">{{ dataSource.primary[0].balance }}</span>
            </div>
            </Col>
            <Col span="6">
            <div class="item">
              <p>{{i18n_lang.manual23}}</p>
              <span class="detail">{{ dataSource.dml.canMoney }}</span>
            </div>
            </Col>
            <Col span="6">
            <div class="item">
              <p>{{i18n_lang.manual24}}</p>
              <span>{{ dataSource.dml.codes }}</span>
            </div>
            </Col>
            <Col span="6">
            <div class="item">
              <p>{{i18n_lang.manual25}}</p>
              <span>{{ dataSource.dml.factCode }}</span>
            </div>
            </Col>
          </Row>
        </div>
      </template>

      <Row v-if="dataSource.secondary.length">
        <Col v-for="(it,i) in dataSource.secondary" :key="i" span="12">
          <p class="title">
            <span>{{ it.name }}</span>
            <span class="title_des">
              <Button type="default" size="small" @click="handleTrans(it,'2')">{{i18n_lang.manual26}}</Button>
              <Button type="default" size="small" @click="handleTrans(it,'1')">{{i18n_lang.manual27}}</Button>
            </span>
          </p>
          <div class="content">
            <div class="item">
              <p>{{i18n_lang.manual28}}</p>
              <span class="detail">{{ it.balance }}</span>
              <Button
                type="primary"
                :loading="loading.refresh[it.game_type]"
                @click="getThirdBalance(it.game_type)"
              >
                <span v-if="!loading.refresh[it.game_type]">{{i18n_lang.manual29}}</span>
                <span v-else>{{i18n_lang.manual30}}</span>
              </Button>
            </div>
        </div>
        </Col>
      </Row>

      <Row v-if="allRoutes.indexOf('396') > -1">
        <p class="title">
          <span>{{i18n_lang.manual99}}</span>
        </p>
        <div>
          <Button type="primary" @click="addhand">{{i18n_lang.manual100}}</Button>
        </div>
      </Row>

      <Row v-if="allRoutes.indexOf('397') > -1 || allRoutes.indexOf('398') > -1">
        <p class="title">
          <span>{{i18n_lang.manual97}}/{{i18n_lang.manual98}}</span>
          <span>
            <Button type="default" size="small" @click="handleCanOutAdd(true)" v-if="allRoutes.indexOf('397') > -1">{{i18n_lang.manual19}}</Button>
            <Button type="default" size="small" @click="handleCanOutLess(true)" v-if="allRoutes.indexOf('398') > -1">{{i18n_lang.manual20}}</Button>
          </span>
        </p>
        <div class="content">
          <Col span="6">
            <div class="item">
              <p>{{i18n_lang.manual22}}</p>
              <span class="detail">{{ dataSource.share_balance ? dataSource.share_balance : 0 }}</span>
            </div>
          </Col>
        </div>
      </Row>
    </div>

    <!-- 手动存款 -->
    <Modal v-model="visible.moneyIn" :title="i18n_lang.manual31">
      <Spin v-if="loading.modal" fix></Spin>
      <Form v-if="visible.moneyIn" ref="moneyIn" :model="form.moneyIn" :rules="ruleValidate">
        <FormItem :label="i18n_lang.manual32">
          <Input v-model="dataSource.username" disabled></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual33" prop="amount">
          <Input v-model="form.moneyIn.amount"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual34" prop="play_code">
          <Input v-model="form.moneyIn.play_code"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual35" prop="discount">
          <Input v-model="form.moneyIn.discount"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.manual108_v_1_2_4_6}`" prop="pin_pw" v-if="dataSource.need_pin_password">
          <Input v-model="form.moneyIn.pin_pw"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual36">
          <Input v-model="form.moneyIn.memo" type="textarea"></Input>
        </FormItem>
      </Form>
      <div class="desc">
        <p class="title">{{i18n_lang.manual37}}</p>
        <p>{{i18n_lang.manual38}}</p>
        <p>{{i18n_lang.manual39}}</p>
        <p>{{i18n_lang.manual40}}</p>
        <p>{{i18n_lang.manual41}}</p>
      </div>
      <div slot="footer">
        <Button :loading="loading.btn" type="primary" @click="setMoneyIn('moneyIn')">{{i18n_lang.manual42}}</Button>
      </div>
    </Modal>

    <!-- 手动扣款 -->
    <Modal v-model="visible.moneyOut" :title="i18n_lang.manual43">
      <Spin v-if="loading.modal" fix></Spin>
      <Form v-if="visible.moneyOut" ref="moneyOut" :model="form.moneyOut" :rules="ruleValidate">
        <FormItem :label="i18n_lang.manual44">
          <Input v-model="dataSource.username" disabled></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual45" prop="amount">
          <Input v-model="form.moneyOut.amount"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual46">
          <Input v-model="form.moneyOut.memo" type="textarea"></Input>
        </FormItem>
      </Form>
      <div class="desc">
        <p class="title">{{i18n_lang.manual47}}</p>
        <p>{{i18n_lang.manual48}}</p>
        <p>{{i18n_lang.manual49}}</p>
      </div>
      <div slot="footer">
        <Button :loading="loading.btn" type="primary" @click="setMoneyOut('moneyOut')">{{i18n_lang.manual50}}</Button>
      </div>
    </Modal>

    <!-- 手动减少余额 -->
    <Modal v-model="visible.moneyLess" :title="i18n_lang.manual51">
      <Spin v-if="loading.modal" fix></Spin>
      <Form v-if="visible.moneyLess" ref="moneyLess" :model="form.moneyLess" :rules="ruleValidate">
        <FormItem :label="i18n_lang.manual52">
          <Input v-model="dataSource.username" disabled></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual53" prop="amount">
          <Input v-model="form.moneyLess.amount"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual54">
          <Input v-model="form.moneyLess.memo" type="textarea"></Input>
        </FormItem>
      </Form>

      <div class="desc">
        <p class="title">{{i18n_lang.manual55}}</p>
      </div>
      <div slot="footer">
        <Button :loading="loading.btn" type="primary" @click="setMoneyLess('moneyLess')">{{i18n_lang.manual50}}</Button>
      </div>
    </Modal>

    <!-- 手动增加余额 -->
    <Modal v-model="visible.moneyAdd" :title="i18n_lang.manual56">
      <Spin v-if="loading.modal" fix></Spin>
      <Form v-if="visible.moneyAdd" ref="moneyAdd" :model="form.moneyAdd" :rules="ruleValidate">
        <FormItem :label="i18n_lang.manual52">
          <Input v-model="dataSource.username" disabled></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual57" prop="amount">
          <Input v-model="form.moneyAdd.amount"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual58" prop="withdraw_bet">
          <Input v-model="form.moneyAdd.withdraw_bet"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.manual108_v_1_2_4_6}`" prop="pin_pw" v-if="dataSource.need_pin_password">
          <Input v-model="form.moneyAdd.pin_pw"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual54">
          <Input v-model="form.moneyAdd.memo" type="textarea"></Input>
        </FormItem>
      </Form>

      <div class="desc">
        <p class="title">{{i18n_lang.manual59}}</p>
      </div>
      <div slot="footer">
        <Button :loading="loading.btn" type="primary" @click="setMoneyAdd('moneyAdd')">{{i18n_lang.manual50}}</Button>
      </div>
    </Modal>

    <!-- 增加打码量 -->
    <Modal v-model="visible.dmlAdd" :title="i18n_lang.manual60">
      <Spin v-if="loading.modal" fix></Spin>
      <Form v-if="visible.dmlAdd" ref="dmlAdd" :model="form.dmlAdd" :rules="ruleValidate">
        <FormItem :label="i18n_lang.manual52">
          <Input v-model="dataSource.username" disabled></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual58" prop="withdraw_bet">
          <Input v-model="form.dmlAdd.withdraw_bet"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual54">
          <Input v-model="form.dmlAdd.memo" type="textarea"></Input>
        </FormItem>
      </Form>
      <div class="desc">
        <p class="title">{{i18n_lang.manual61}}</p>
      </div>
      <div slot="footer">
        <Button :loading="loading.btn" type="primary" @click="setDmlAdd('dmlAdd')">{{i18n_lang.manual50}}</Button>
      </div>
    </Modal>

    <!-- 减少打码量 -->
    <Modal v-model="visible.dmlLess" :title="i18n_lang.manual62">
      <Spin v-if="loading.modal" fix></Spin>
      <Form v-if="visible.dmlLess" ref="dmlLess" :model="form.dmlLess" :rules="ruleValidate">
        <FormItem :label="i18n_lang.manual52">
          <Input v-model="dataSource.username" disabled></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual58" prop="withdraw_bet">
          <Input v-model="form.dmlLess.withdraw_bet"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual54">
          <Input v-model="form.dmlLess.memo" type="textarea"></Input>
        </FormItem>
      </Form>
      <div class="desc">
        <p class="title">{{i18n_lang.manual63}}</p>
      </div>
      <div slot="footer">
        <Button :loading="loading.btn" type="primary" @click="setDmlLess('dmlLess')">{{i18n_lang.manual50}}</Button>
      </div>
    </Modal>
    <!-- 增加可提余额 -->
    <Modal v-model="visible.canOutAdd" :title="i18n_lang.manual64">
      <Spin v-if="loading.modal" fix></Spin>
      <Form v-if="visible.canOutAdd" ref="canOutAdd" :model="form.canOutAdd" :rules="ruleValidate">
        <FormItem :label="i18n_lang.manual50">
          <Input v-model="dataSource.username" disabled></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual64" prop="amount">
          <Input v-model="form.canOutAdd.amount"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.manual108_v_1_2_4_6}`" prop="pin_pw" v-if="dataSource.need_pin_password">
          <Input v-model="form.canOutAdd.pin_pw"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual54">
          <Input v-model="form.canOutAdd.memo" type="textarea"></Input>
        </FormItem>
      </Form>

      <div class="desc">
        <p class="title">{{i18n_lang.manual65}}</p>
      </div>
      <div slot="footer">
        <Button :loading="loading.btn" type="primary" @click="setCanOutAdd">{{i18n_lang.manual50}}</Button>
      </div>
    </Modal>
    <!-- 减少可提余额 -->
    <Modal v-model="visible.canOutLess" :title="i18n_lang.manual66">
      <Spin v-if="loading.modal" fix></Spin>
      <Form
        v-if="visible.canOutLess"
        ref="canOutLess"
        :model="form.canOutLess"
        :rules="ruleValidate"
      >
        <FormItem :label="i18n_lang.manual50">
          <Input v-model="dataSource.username" disabled></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual66" prop="amount">
          <Input v-model="form.canOutLess.amount"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual54">
          <Input v-model="form.canOutLess.memo" type="textarea"></Input>
        </FormItem>
      </Form>

      <div class="desc">
        <p class="title">{{i18n_lang.manual65}}</p>
      </div>
      <div slot="footer">
        <Button :loading="loading.btn" type="primary" @click="setCanOutLess">{{i18n_lang.manual50}}</Button>
      </div>
    </Modal>

    <!-- 钱包转换 -->
    <Modal v-model="visible.trans" :title="form.trans.title">
      <Spin v-if="loading.modal" fix></Spin>
      <Form v-if="visible.trans" ref="trans" :model="form.trans" :rules="ruleValidate">
        <FormItem :label="i18n_lang.manual52">
          <Input v-model="dataSource.username" disabled></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual67">
          <Input v-model="form.trans.amount"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual68">
          <RadioGroup v-model="form.trans.status">
            <Radio label="1">{{i18n_lang.manual69}}</Radio>
            <Radio label="2">{{i18n_lang.manual70}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="i18n_lang.manual54">
          <Input v-model="form.trans.memo" type="textarea"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button :loading="loading.btn" type="primary" @click="setTrans">{{i18n_lang.manual50}}</Button>
      </div>
    </Modal>

    <!-- 手动发放 -->
    <Modal v-model="visible.hand" :title="`${i18n_lang.manual101}`">
      <Form :model="form.handInfo">
        <FormItem :label="`${i18n_lang.manual102}`">
          <Input v-model="dataSource.username" disabled></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.manual103}`">
          <Input v-model="form.handInfo.discount"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.manual104}`">
          <Input v-model="form.handInfo.play_code"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.manual54">
          <Input v-model="form.handInfo.memo" type="textarea"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button :loading="loading.btn" type="primary" @click="setHand">{{i18n_lang.manual50}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { MathMul } from '@/libs/formatMath'
const initQuery = {
  username: ''
}

const initMoneyIn = {
  amount: '', // 存入金额
  play_code: '', // 打码量
  discount: '', // 优惠金额
  memo: '', // 备注
  uid: '',
  wid: '',
  pin_pw: '' //PIN密码
}

const initMoneyOut = {
  amount: '', // 扣款金额
  memo: '', // 备注
  uid: '',
  wid: ''
}

const initMoneyLess = {
  amount: '', // 减少金额
  memo: '', // 备注
  uid: '',
  wid: ''
}

const initMoneyAdd = {
  amount: '', // 增加金额
  withdraw_bet: '', // 打码量
  memo: '', // 备注
  uid: '',
  wid: '',
  pin_pw: '' //PIN密码
}

const initDmlAdd = {
  user_id: '', // 用户 id
  withdraw_bet: '', // 打码量
  memo: '' // 备注
}

const initDmlLess = {
  user_id: '', // 用户 id
  withdraw_bet: '', // 打码量(负数)
  memo: '' // 备注
}

const initTrans = {
  title: '', // modal 的标题
  amount: '', // 金额
  memo: '', // 备注
  type: '', // 1主转子 2子转主
  status: '1',
  uid: '',
  wid: '',
  sid: ''
}

const initCanOutAdd = {
  amount: '',
  memo: '',
  pin_pw: '' //PIN密码
}

const initCanOutLess = {
  amount: '',
  memo: ''
}

const handInfo = {
  uid: '',
  discount: '',
  play_code: '',
  memo: ''
}

export default {
  data() {
    const i18n_lang = this.$t('manual');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        btn: false,
        modal: false,
        refresh: {}
      },
      visible: {
        info: false,
        moneyIn: false,
        moneyOut: false,
        moneyLess: false,
        moneyAdd: false,
        dmlAdd: false,
        dmlLess: false,
        trans: false,
        canOutAdd: false,
        canOutLess: false,
        hand: false
      },
      form: {
        moneyIn: { ...initMoneyIn },
        moneyOut: { ...initMoneyOut },
        moneyLess: { ...initMoneyLess },
        moneyAdd: { ...initMoneyAdd },
        dmlAdd: { ...initDmlAdd },
        dmlLess: { ...initDmlLess },
        trans: { ...initTrans },
        canOutAdd: { ...initCanOutAdd },
        canOutLess: { ...initCanOutLess },
        handInfo: { ...handInfo }
      },
      query: { ...initQuery },
      dataSource: {
        primary: [], // 主钱包
        secondary: [] // 第三方钱包
      },
      ruleValidate: {
        amount: [{ required: true, message: i18n_lang.manual71 }],
        play_code: [{ required: true, message: i18n_lang.manual72 }],
        withdraw_bet: [{ required: true, message: i18n_lang.manual72 }],
        discount: [{ required: true, message: i18n_lang.manual73 }],
        pin_pw: [{ required: true, message: `${i18n_lang.manual109_v_1_2_4_6}` }]
      },
      shareholder: false
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState({
      allRoutes: state => state.user.allRoutes
    })
  },
  methods: {
    init() {
      if (this.$route.query.username) {
        this.query.username = this.$route.query.username
        this.getData()
      }
      let parameter = sessionStorage.getItem('parameter') || '{}'
      if(JSON.parse(parameter).manualHandle){
        this.query.username = JSON.parse(parameter).manualHandle.username
        this.getData()
      }
    },
    // 警告操作
    riskConfirm(msg) {
      return new Promise((r, f) => {
        // debugger
        this.$Modal.confirm({
          title: this.i18n_lang.manual74,
          content: msg,
          onOk: () => {
            r(true)
          },
          onCancel: () => {
            r(false)
          }
        })
      })
    },
    async getData() {
      if (!this.query.username) {
        this.$Message.error(this.i18n_lang.manual75)
        return
      }
      this.loading.page = true
      this.visible.info = false
      const req = { ...this.query }
      const res = await this.$axios.request({
        url: `/cash/manual`,
        method: 'GET',
        params: req
      })
      this.loading.page = false
      if (res.status !== 200 || res.state != 0) {
        this.$Message.error(res.message)
      } else {
        let parameterPage = sessionStorage.getItem('parameter') || "{}"
        let parameter = JSON.parse(parameterPage)
        parameter.manualHandle = {
          ...this.query,
        }
        sessionStorage.setItem('parameter', JSON.stringify(parameter))
        this.visible.info = true
        this.dataSource = Object.assign({}, res.data)
        this.dataSource.secondary.map(x => {
          this.getThirdBalance(x.game_type)
        })
        this.form.handInfo.username = res.data.username
      }
    },
    // 查看单个第三方游戏余额
    async getThirdBalance(game_type) {
      if (this.loading.refresh[game_type] === undefined) {
        const setloading = JSON.parse(JSON.stringify(this.loading))
        setloading.refresh[game_type] = false
        this.loading = Object.assign({}, setloading)
      }
      this.loading.refresh[game_type] = true
      const req = {
        uid: this.dataSource.uid,
        game_type
      }
      const res = await this.$axios.request({
        url: '/third',
        method: 'GET',
        params: req
      })
      this.loading.refresh[game_type] = false
      if (res.status !== 200 || res.state != 0) {
        this.$Message.error(res.message)
      } else {
        this.dataSource.secondary.map((x, i) => {
          if (x.game_type === game_type) {
            this.dataSource.secondary[i].balance = res.data.balance
          }
        })
      }
    },
    // 查看现金流水
    goToMoneyDetail() {
      this.$router.push({
        path: '/cash/moneyDetail',
        query: { username: this.dataSource.username }
      })
    },
    // 手动存款
    handleMoneyIn() {
      this.form.moneyIn = Object.assign({}, initMoneyIn)
      this.visible.moneyIn = true
    },
    async setMoneyIn(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          this.loading.modal = true
          this.loading.btn = true
          const req = {
            ...this.form.moneyIn
          }
          // req.amount = MathMul(req.amount, 100)
          // req.discount = MathMul(req.discount, 100)
          // req.play_code = MathMul(req.play_code, 100)

          req.uid = this.dataSource.uid
          req.wid = this.dataSource.primary[0].sid

          const res = await this.$axios.request({
            url: '/cash/manual/deposit',
            method: 'POST',
            data: req
          })
          this.loading.modal = false
          this.loading.btn = false

          this.$msg({
            type: res.status !== 200 || (res.state != 0 && res.state != 11052) ? 'error' : 'success',
            message: res.message
          })
          if (res.status !== 200 || (res.state != 0 && res.state != 11052)) return

          this.visible.moneyIn = false
          this.getData()
        }
      })
    },
    // 手动扣款
    handleMoneyOut() {
      this.form.moneyOut = Object.assign({}, initMoneyOut)
      this.visible.moneyOut = true
    },
    async setMoneyOut(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          this.loading.modal = true
          this.loading.btn = true

          const req = { ...this.form.moneyOut }
          // req.amount = MathMul(req.amount, 100)
          req.uid = this.dataSource.uid
          req.wid = this.dataSource.primary[0].sid

          const res = await this.$axios.request({
            url: `/cash/manual/withdrawal`,
            method: 'POST',
            data: req
          })

          this.loading.modal = false
          this.loading.btn = false

          this.$msg({
            type: res.status !== 200 ? 'error' : 'success',
            message: res.message
          })
          if (res.status !== 200 || res.state != 0) return
          this.visible.moneyOut = false
          this.getData()
        }
      })
    },
    // 手动减少余额
    handleMoneyLess() {
      this.form.moneyLess = Object.assign({}, initMoneyLess)
      this.visible.moneyLess = true
    },
    async setMoneyLess(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          const risk = await this.riskConfirm(
            this.i18n_lang.manual76
          )
          if (!risk) {
            return
          }
          this.loading.modal = true
          this.loading.btn = true

          const req = { ...this.form.moneyLess }
          // req.amount = MathMul(req.amount, 100)
          req.uid = this.dataSource.uid
          req.wid = this.dataSource.primary[0].sid

          const res = await this.$axios.request({
            url: `/cash/manual/decrease`,
            method: 'POST',
            data: req
          })

          this.loading.modal = false
          this.loading.btn = false

          if (res.status !== 200 || res.state != 0) {
            this.$Message.error(res.message)
          } else {
            this.visible.moneyLess = false
            this.$Message.success(res.message)
            this.getData()
          }
        }
      })
    },
    // 手动增加余额
    handleMoneyAdd() {
      this.form.moneyAdd = Object.assign({}, initMoneyAdd)
      this.visible.moneyAdd = true
    },
    async setMoneyAdd(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          // console.log(12345)
          const risk = await this.riskConfirm(
            this.i18n_lang.manual76
          )
          if (!risk) {
            return
          }

          this.loading.modal = true
          this.loading.btn = true

          const req = { ...this.form.moneyAdd }
          // req.amount *= 100
          // req.withdraw_bet *= 100
          req.uid = this.dataSource.uid
          req.wid = this.dataSource.primary[0].sid

          const res = await this.$axios.request({
            url: `/cash/manual/increase`,
            method: 'POST',
            data: req
          })

          this.loading.modal = false
          this.loading.btn = false
          if (res.status !== 200 || (res.state != 0 && res.state != 11052)) {
            this.$Message.error(res.message)
          } else {
            this.visible.moneyAdd = false
            this.$Message.success(res.message)
            this.getData()
          }
        }
      })
    },
    // 增加打码量
    handleDmlAdd() {
      this.form.dmlAdd = Object.assign({}, initDmlAdd)
      this.visible.dmlAdd = true
    },
    async setDmlAdd(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          this.loading.modal = true
          this.loading.btn = true

          const req = { ...this.form.dmlAdd }
          // req.withdraw_bet = MathMul(req.withdraw_bet, 100)
          req.user_id = this.dataSource.uid

          const res = await this.$axios.request({
            url: `/dml`,
            method: 'POST',
            data: req
          })

          this.loading.modal = false
          this.loading.btn = false

          if (res.status !== 200 || res.state != 0) {
            this.$Message.error(res.message)
          } else {
            this.visible.dmlAdd = false
            this.$Message.success(res.message)
            this.getData()
          }
        }
      })
    },
    // 减少打码量
    handleDmlLess() {
      this.form.dmlLess = Object.assign({}, initDmlLess)
      this.visible.dmlLess = true
    },
    async setDmlLess(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          this.loading.modal = true
          this.loading.btn = true

          const req = { ...this.form.dmlLess }
          // req.withdraw_bet = MathMul(req.withdraw_bet, -100)
          req.user_id = this.dataSource.uid

          const res = await this.$axios.request({
            url: '/dml',
            method: 'POST',
            data: req
          })

          this.loading.modal = false
          this.loading.btn = false

          if (res.status !== 200 || res.state != 0) {
            this.$Message.error(res.message)
          } else {
            this.visible.dmlLess = false
            this.$Message.success(res.message)
            this.getData()
          }
        }
      })
    },
    // 增加可提余额
    handleCanOutAdd(Boole) {
      this.shareholder = Boole ? true : false
      this.form.canOutAdd = Object.assign({}, initCanOutAdd)
      this.visible.canOutAdd = true
    },
    async setCanOutAdd() {
      this.$refs['canOutAdd'].validate(async valid => {
        if (valid) {
          let req
          if(this.shareholder){
            req = {
              uid: this.dataSource.uid,
              amount: this.form.canOutAdd.amount,
              pin_pw: this.form.canOutAdd.pin_pw,
              memo: this.form.canOutAdd.memo
            }
          }else{
            req = {
              id: this.dataSource.uid,
              type: 'increase',
              amount: this.form.canOutAdd.amount,
              pin_pw: this.form.canOutAdd.pin_pw,
              memo: this.form.canOutAdd.memo
            }
          }
          // req.amount *= 100
          this.loading.btn = true
          let res
          if(this.shareholder){
            res = await this.$axios.request({
              url: `/cash/manual/share/increase`,
              method: 'POST',
              data: req
            })
          }else{
            res = await this.$axios.request({
              url: `/cash/manual/freemoney/${this.dataSource.uid}`,
              method: 'PUT',
              data: req
            })
          }
          this.loading.btn = false
          if (res.status !== 200 || (res.state != 0 && res.state != 11052)) {
            this.$Message.error(res.message)
          } else {
            this.visible.canOutAdd = false
            this.$Message.success(res.message)
            this.getData()
          }
        }
      })
    },
    // 减少可提余额
    handleCanOutLess(Boole) {
      this.shareholder = Boole ? true : false
      this.visible.canOutLess = true
      this.form.canOutLess = Object.assign({}, initCanOutLess)
    },
    async setCanOutLess() {
      this.$refs['canOutLess'].validate(async valid => {
        if (valid) {
          let req
          if(this.shareholder){
            req = {
              uid: this.dataSource.uid,
              amount: this.form.canOutLess.amount,
              memo: this.form.canOutLess.memo
            }
          }else{
            req = {
              id: this.dataSource.uid,
              type: 'decrease',
              amount: this.form.canOutLess.amount,
              memo: this.form.canOutLess.memo
            }
          }
          // req.amount *= 100
          this.loading.btn = true
          let res
          if(this.shareholder){
            res = await this.$axios.request({
              url: `/cash/manual/share/decrease`,
              method: 'POST',
              data: req
            })
          }else{
            res = await this.$axios.request({
              url: `/cash/manual/freemoney/${this.dataSource.uid}`,
              method: 'PUT',
              data: req
            })
          }
          this.loading.btn = false

          if (res.status !== 200 || res.state != 0) {
            this.$Message.error(res.message)
          } else {
            this.visible.canOutLess = false
            this.$Message.success(res.message)
            this.getData()
          }
        }
      })
    },
    // 钱包转换 type 1主钱包转子钱包 2子钱包转主钱包
    handleTrans(row, type) {
      this.form.trans = Object.assign({}, initTrans)
      this.form.trans.sid = row.sid
      this.form.trans.type = type
      if (type === '1') {
        this.form.trans.title = this.i18n_lang.manual77
      }
      if (type === '2') {
        this.form.trans.title = this.i18n_lang.manual78
      }
      this.visible.trans = true
    },
    async setTrans() {
      this.loading.modal = true
      this.loading.btn = true
      const req = { ...this.form.trans }
      // req.amount = MathMul(req.amount, 100)
      req.uid = this.dataSource.uid
      req.wid = this.dataSource.primary[0].sid

      delete req.title

      const res = await this.$axios.request({
        url: `/cash/manual/ps`,
        method: 'POST',
        data: req
      })
      this.loading.modal = false
      this.loading.btn = false

      if (res.status !== 200 || res.state != 0) {
        this.$Message.error(res.message)
      } else {
        this.visible.trans = false
        this.$Message.success(res.message)
        this.getData()
      }
    },
    addhand(){
      this.visible.hand = true
    },
    async setHand(){
      this.loading.modal = true
      this.loading.btn = true
      const req = { ...this.form.handInfo }
      // req.discount = MathMul(req.discount, 100)
      // req.play_code = MathMul(req.play_code, 100)
      req.uid = this.dataSource.uid

      const res = await this.$axios.request({
        url: `/cash/manual/coupon`,
        method: 'POST',
        data: req
      })
      this.loading.modal = false
      this.loading.btn = false

      if (res.status !== 200 || res.state != 0) {
        this.$Message.error(res.message)
      } else {
        this.visible.hand = false
        this.$Message.success(res.message)
        this.getData()
      }
    }
  }
}
</script>
<style lang="less" scoped>
#Handle {
  .item {
    margin-bottom: 18px;
    & > p,
    & > span {
      font-size: 14px;
      display: inline-block;
      line-height: 28px;
      color: rgb(153, 153, 153);
      min-width: 70px;
      margin-right: 5px;
    }
    & > span {
      color: rgb(51, 51, 51);
      &.detail {
        color: #f33;
      }
    }
  }
  .desc {
    font-size: 13px;
    color: #444;
    line-height: 20px;
    p {
      margin-bottom: 5px;
    }
    .title {
      color: #111;
      font-size: 15px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
