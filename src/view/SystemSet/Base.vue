<template>
  <div id="Base">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Row>
      <Col span="8"><!-- 登录注册 -->
      <p class="title">
        <span>{{i18n_lang.systemSet4}}</span>
      </p>
      <div class="content">
        <div class="item">
          <p>{{i18n_lang.systemSet5}}</p>
          <span>
            <Input v-model="register.password_login_fault" />
          </span>
        </div>
        <!-- <div class="item">
          <p>注册方式</p>
          <span>
            <Select v-model="register.register_type" style="width:200px">
              <Option :value="1">仅账号密码</Option>
              <Option :value="2">账号密码和账号密码手机</Option>
              <Option :value="3">仅手机号密码</Option>
              <Option :value="4">仅账号密码手机</Option>
            </Select>
          </span>
        </div> -->
        <!-- <div class="item">
          <p>{{i18n_lang.systemSet6}}</p>
          <span>
            <Switch v-model="register.first_WeChat_binding"></Switch>
          </span>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet7}}</p>
          <span>
            <Switch v-model="register.WeChat_login"></Switch>
          </span>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet8}}</p>
          <span>
            <i-Switch v-model="register.free_try_play"></i-Switch>
          </span>
        </div> -->
        <!-- <div class="item">
            <p>未登录可联系客服</p>
            <span>
              <Switch v-model="register.no_login_trial_service"></Switch>
            </span>
          </div>-->
      </div>
      </Col>
      <Col span="8"><!-- 竖版推广 -->
      <p class="title">{{i18n_lang.systemSet9}}</p>
      <div class="content">
        <div class="item">
          <p>{{i18n_lang.systemSet10}}</p>
          <span>
            <Input v-model="market.pc_url" />
          </span>
        </div>
        <!-- <div class="item">
          <p>{{i18n_lang.systemSet11}}</p>
          <span>
            <Input v-model="market.h5_url"/>
          </span>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet11 + '2'}}</p>
          <span>
            <Input v-model="market.h5_url_2"/>
          </span>
        </div> -->
        <div class="item" v-for="(item, index) in h5_url" :key="index" v-show="item.is_new != -1">
          <p>{{`${i18n_lang.systemSet11}${index + 1}`}}</p>
          <span>
            <Input v-model="item.value" />
          </span>
          <Button size="large" type="primary"
            @click="index == 0 ? addH5Url() : deleteH5Url(item, index)">{{index == 0 ? i18n_lang.systemSet63 : i18n_lang.systemSet64}}</Button>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet12}}</p>
          <span>
            <Input v-model="market.spread_url" />
          </span>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet13}}</p>
          <span>
            <Input v-model="market.down_url" />
          </span>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet14}}</p>
          <span>
            <Input v-model="market.app_name" />
          </span>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet15}}</p>
          <span>
            <Input v-model="market.app_desc" />
          </span>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet59}}</p>
          <span>
            <Input v-model="market.service" />
          </span>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet87}}</p>
          <span>
            <Select v-model="user_level" multiple @on-change="getUserLevel($event)" placeholder=" "
              style="min-width: 149px;">
              <!-- <Option :key="''" :value="''">{{i18n_lang.systemSet88}}</Option> -->
              <Option v-for="item in levelList" :key="item.id + ''" :value="item.id + ''">{{ item.name }}</Option>
            </Select>
          </span>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet77}}</p>
          <span>
            <Input v-model="system.kefu_code" />
          </span>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet89}}</p>
          <span>
            <Select v-model="user_level1" multiple @on-change="getUserLevel1($event)" placeholder=" "
              style="min-width: 149px;">
              <!-- <Option :key="''" :value="''">{{i18n_lang.systemSet88}}</Option> -->
              <Option v-for="item in levelList" :key="item.id + ''" :value="item.id + ''">{{ item.name }}</Option>
            </Select>
          </span>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet90}}</p>
          <span>
            <Input v-model="system.kefu3_code" />
          </span>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet91}}</p>
          <span>
            <Select v-model="user_level2" multiple @on-change="getUserLevel2($event)" placeholder=" "
              style="min-width: 149px;">
              <!-- <Option :key="''" :value="''">{{i18n_lang.systemSet88}}</Option> -->
              <Option v-for="item in levelList" :key="item.id + ''" :value="item.id + ''">{{ item.name }}</Option>
            </Select>
          </span>
        </div>
      </div>
      <div class="item">
        <p style="min-width:60px">{{i18n_lang.systemSet16}}</p>
        <span>
          <Input v-model="market.certificate_url" />
        </span>
      </div>
      <div class="item">
        <p>{{i18n_lang.systemSet86}}</p>
        <span>
          <Input v-model="agent.agent_url" />
        </span>
      </div>
      </Col>
      <Col span="8"><!-- 横版推广 -->
      <p class="title">{{i18n_lang.systemSet17}}</p>
      <div class="content">
        <div class="item">
          <p>{{i18n_lang.systemSet18}}</p>
          <span>
            <Input v-model="market2.app_spead_url" />
          </span>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet19}}</p>
          <span>
            <Input v-model="market2.certificate_url" />
          </span>
        </div>
        <div class="item">
          <p>{{i18n_lang.systemSet20}}</p>
          <span>
            <Switch v-model="market2.certificate_switch"></Switch>
          </span>
        </div>
      </div>
      </Col>
      <Col span="8">
      <p class="title">{{i18n_lang.systemSet112_domain}}</p>
      <div class="content">
        <div class="item" v-for="(item, index) in domainName" :key="index">
          <span>
            <Input v-model="item.url" placeholder="https://www.xxx.com" style="width: 200px;"/>
          </span>
          <Button size="large" type="primary"
            @click="index == 0 ? addDomainName() : deleteDomainName(index)">{{index == 0 ? i18n_lang.systemSet63 : i18n_lang.systemSet64}}</Button>
        </div>
      </div>
      </Col>
      <Col span="8">
      <p class="title">{{i18n_lang.systemSet114_domain}}</p>
      <div class="content">
        <div class="item" v-for="(item, index) in domainUrlName" :key="index">
          <span>
            <Input v-model="item.url" placeholder="https://www.xxx.com" style="width: 200px;"/>
          </span>
          <Button size="large" type="primary"
            @click="index == 0 ? addDomainUrlName() : deleteDomainUrlName(index)">{{index == 0 ? i18n_lang.systemSet63 : i18n_lang.systemSet64}}</Button>
        </div>
      </div>
      </Col>
    </Row>
    <Row>
      <!-- ip开关设置 -->
      <p class="title">
        <span>{{i18n_lang.systemSet80}}</span>
      </p>
      <div class="content">
        <Row>
          <Col span="24">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet80}}</p>
            <span>
              <!-- <Switch v-model="system.register_limit_ip_switch"></Switch> -->
              <Input v-model="system.register_limit_ip_count" />
            </span>
          </div>
          </Col>
        </Row>
        <!-- <Row>
          <Button @click="ipListFn('add')" size="large" type="primary">{{i18n_lang.systemSet71}}</Button>
        </Row>
        <Row>
          <div class="item" style="margin-top: 10px;" v-for="(item, index) in ipList" :key="index">
            <p>{{i18n_lang.systemSet81}}</p>
            <span>
              <Input v-model="item.ip" :placeholder="i18n_lang.systemSet82" />
            </span>
            <span>
              <Input v-model="item.number" :placeholder="i18n_lang.systemSet83" />
            </span>
            <span>{{i18n_lang.systemSet84}}</span>
            <Button @click="ipListFn('delete', index)" v-if="index > 0" size="large" type="primary">{{i18n_lang.systemSet76}}</Button>
          </div>
        </Row> -->
      </div>
    </Row>
    <Row>
      <!-- 三级返佣 -->
      <p class="title">
        <span>{{i18n_lang.systemSet78}}</span>
      </p>
      <div class="content">
        <Row>
          <Col v-for="(item, i) in rakeBack" :key="i" span="6" style="height: 46px;">
          <div v-if="typeof item.value === 'boolean'" class="item">
            <p>{{ item.name }}</p>
            <span>
              <Switch v-model="item.value"></Switch>
            </span>
          </div>
          <div v-else class="item">
            <p style="min-width:60px">{{ item.name }}{{i18n_lang.systemSet22}}</p>
            <span>
              <Input v-model="item.value" />
            </span>
          </div>
          </Col>
        </Row>
      </div>
    </Row>
    <Row>
      <!-- 人人代理默认返佣（%） -->
      <p class="title">
        <span>{{i18n_lang.systemSet21}}</span>
      </p>
      <div class="content">
        <Row>
          <Col v-for="(item, i) in rakeBack1" :key="i" span="6" style="height: 46px;">
          <div v-if="typeof item.value === 'boolean'" class="item">
            <p>{{ item.name }}</p>
            <span>
              <Switch v-model="item.value"></Switch>
            </span>
          </div>
          <div v-else class="item">
            <p style="min-width:60px">{{ item.name }}{{i18n_lang.systemSet22}}</p>
            <span>
              <Input v-model="item.value" disabled />
            </span>
          </div>
          </Col>
        </Row>
      </div>
    </Row>
    <Row>
      <!-- 是否开启返佣结算 -->
      <p class="title">
        <span>{{i18n_lang.systemSet79}}</span>
      </p>
      <div class="content">
        <Row>
          <Col v-for="(item, i) in rakeBack2" :key="i" span="6" style="height: 46px;">
          <div
            v-if="typeof item.value === 'boolean' && item.key != 'bkge_settle_type' && item.key != 'bkge_calculation_self'"
            class="item">
            <p>{{ item.name }}</p>
            <span>
              <Switch v-model="item.value"></Switch>
            </span>
          </div>
          <div v-else-if="item.key == 'bkge_settle_type'" class="item">
            <p>{{ item.name }}</p>
            <RadioGroup v-model="item.value">
              <Radio :label="1">{{i18n_lang.systemSet92}}</Radio>
              <Radio :label="2">{{i18n_lang.systemSet94}}</Radio>
              <Radio :label="3">{{i18n_lang.systemSet93}}</Radio>
            </RadioGroup>
          </div>
          <div v-else-if="item.key == 'bkge_calculation_self'" class="item">
            <p>{{ item.name }}</p>
            <RadioGroup v-model="item.value">
              <Radio :label="1">{{i18n_lang.systemSet97}}</Radio>
              <Radio :label="0">{{i18n_lang.systemSet98}}</Radio>
            </RadioGroup>
          </div>
          <div v-else class="item">
            <p style="min-width:60px">{{ item.name }}{{i18n_lang.systemSet22}}</p>
            <span>
              <Input v-model="item.value" disabled />
            </span>
          </div>
          </Col>
        </Row>
      </div>
    </Row>
    <Row>
      <!-- 活动设置 -->
      <p class="title">
        <span>{{i18n_lang.systemSet23}}</span>
      </p>
      <div class="content">
        <Row>
          <Col span="24">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet24}}</p>
            <span>
              <Switch v-model="activity.canGetBothActivity"></Switch>
            </span>
          </div>
          </Col>
          <Col span="24">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet95}}</p>
            <span>
              <Switch v-model="system.active_progress"></Switch>
            </span>
          </div>
          </Col>
          <Col span="24">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet99}}</p>
            <span>
              <Switch v-model="activity.open_fc_jackpot"></Switch>
            </span>
          </div>
          </Col>
        </Row>
      </div>
    </Row>
    <Row>
      <!-- 系统维护 -->
      <p class="title">
        <span>{{i18n_lang.systemSet60}}</span>
      </p>
      <div class="content">
        <Row>
          <Col span="24">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet61}}</p>
            <span>
              <Switch v-model="system.maintaining"></Switch>
            </span>
          </div>
          </Col>
        </Row>
      </div>
    </Row>
    <Row>
      <!-- 登录后台 -->
      <p class="title">
        <span>{{i18n_lang.systemSet25}}</span>
      </p>
      <div class="content">
        <Row>
          <Col span="24">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet26}}</p>
            <span>
              <Switch v-model="login.Duplicate_LoginCheck"></Switch>
            </span>
          </div>
          </Col>
        </Row>
      </div>
    </Row>
    <Row>
      <!-- 人工存取管理 -->
      <p class="title">
        <span>{{i18n_lang.systemSet100_v1_2_4_6}}</span>
      </p>
      <div class="content">
        <Row>
          <Col span="6">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet101_v1_2_4_6}}</p>
            <span>
              <Switch v-model="admin_pin_password.status"></Switch>
            </span>
          </div>
          </Col>
          <Col span="6">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet102_v1_2_4_6}}</p>
            <span>
              <Switch v-model="admin_pin_password.reset_status"></Switch>
            </span>
          </div>
          </Col>
          <Col span="6">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet103_v1_2_4_6}}</p>
            <RadioGroup v-model="admin_pin_password.reset_period">
              <Radio :label="1">{{i18n_lang.systemSet104_v1_2_4_6}}</Radio>
              <Radio :label="2">{{i18n_lang.systemSet105_v1_2_4_6}}</Radio>
              <p style="color: #ccc;">
                {{admin_pin_password.reset_period == 1 ? i18n_lang.systemSet106_v1_2_4_6 : i18n_lang.systemSet111_v1_2_4_6}}
              </p>
            </RadioGroup>
          </div>
          </Col>
        </Row>
        <Row>
          <Col span="6">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet107_v1_2_4_6}}>=</p>
            <span>
              <Input v-model="admin_pin_password.manual_deposit" />
            </span>
          </div>
          </Col>
          <Col span="6">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet108_v1_2_4_6}}>=</p>
            <span>
              <Input v-model="admin_pin_password.add_money" />
            </span>
          </div>
          </Col>
          <Col span="6">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet109_v1_2_4_6}}>=</p>
            <span>
              <Input v-model="admin_pin_password.add_free_money" />
            </span>
          </div>
          </Col>
          <Col span="6">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet110_v1_2_4_6}}>=</p>
            <span>
              <Input v-model="admin_pin_password.add_share_balance" />
            </span>
          </div>
          </Col>
        </Row>
      </div>
    </Row>
    <Row>
      <!-- 网络安全 -->
      <p class="title">
        <span>{{i18n_lang.systemSet101_v1_2_4_7}}</span>
      </p>
      <div class="content">
        <Row>
          <Col span="24">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet102_v1_2_4_7}}</p>
            <span>
              <Switch v-model="network_safty.check_black_ip"></Switch>
            </span>
          </div>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet103_v1_2_4_7}}</p>
            <span>
              <Select v-model="network_safty.lock_time" style="width: 120px">
                <Option :value="0">{{i18n_lang.systemSet104_v1_2_4_7}}</Option>
                <Option :value="1">{{i18n_lang.systemSet105_v1_2_4_7}}</Option>
                <Option :value="3">{{i18n_lang.systemSet106_v1_2_4_7}}</Option>
                <Option :value="5">{{i18n_lang.systemSet107_v1_2_4_7}}</Option>
                <Option :value="7">{{i18n_lang.systemSet108_v1_2_4_7}}</Option>
              </Select>
            </span>
          </div>
          </Col>
        </Row>
      </div>
    </Row>

    <Row>
      <!-- 有效投注出款稽核（%） 说明：若彩票稽核设置80%，玩家投注100，该玩家实际打码量为100×80%=80 -->
      <p class="title">
        <span>{{i18n_lang.systemSet27}}</span>
        <span class="important">{{i18n_lang.systemSet28}}</span>
      </p>
      <div class="content">
        <Row>
          <Col v-for="(item, i) in audit" :key="i" span="6">
          <div class="item">
            <p style="min-width:60px">{{ item.name }}{{i18n_lang.systemSet29}}</p>
            <span>
              <Input v-model="item.value" />
            </span>
          </div>
          </Col>
        </Row>
      </div>
    </Row>
    <Row>
      <!-- 短信平台 -->
      <p class="title">
        <span>{{i18n_lang.systemSet62}}</span>
        <RadioGroup v-model="system.sms" style="margin-top: -5px">
          <Radio v-for="(item, index) in system.smsList" :key="index" :label="item">{{item}}</Radio>
          <!-- <Radio label="BuKa">BuKa</Radio>
          <Radio label="YunSms">YunSms</Radio> -->
        </RadioGroup>
      </p>
    </Row>
    <Row>
      <!-- 社群论坛管理 -->
      <p class="title">
        <span>{{i18n_lang.systemSet65}}</span>
      <div class="content">
        <Row>
          <Col span="24">
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.systemSet66}}</p>
            <span>
              <Switch v-model="system.community_bbs"></Switch>
            </span>
          </div>
          </Col>
        </Row>
      </div>
      </p>
    </Row>
    <Row style="margin:20px 0">
      <Button size="large" :loading="loading.btn" type="primary" @click="save">{{i18n_lang.systemSet30}}</Button>
    </Row>
  </div>
</template>
<script>
  export default {
    data() {
      const i18n_lang = this.$t('systemSet');
      return {
        i18n_lang: i18n_lang,
        loading: {
          page: false,
          btn: false
        },
        register: {}, // 登录注册
        market: {}, // 竖版推广
        market2: {}, // 横版推广
        new_market: [], //h5推广
        rakeBack: [], // 人人代理
        rakeBack1: [], // 三级返佣
        rakeBack2: [], // 是否开启返佣结算
        activity: {}, // 活动设置
        login: {}, // 登录后台
        audit: {}, // 投注稽核
        system: {}, //系统
        agent: {}, //代理后台、代理占成相关
        admin_pin_password: {}, //人工存取管理
        network_safty: {}, //网络安全
        ipWhiteSwitch: false,
        ipList: [],
        user_level: [],
        user_level1: [],
        user_level2: [],
        levelList: [],
        domainName: [],
        domainUrlName: []
      }
    },
    created() {
      this.getData()
    },
    computed: {
      h5_url() {
        let url_arrar = []
        this.new_market.forEach((item, index) => {
          if (item.is_new != -1) {
            url_arrar.push(item)
          }
        })
        return url_arrar
      }
    },
    methods: {
      addH5Url() { //H5推广地址添加
        this.new_market.push({
          is_new: 1,
          name: `${this.i18n_lang.systemSet11}${this.new_market.length + 1}`,
          state: "enabled",
          value: ""
        })
      },
      deleteH5Url(item, index) { //H5推广地址删除
        if (item.is_new == 0) {
          this.new_market.forEach((items, indexs) => {
            if (item.id === items.id) {
              items.is_new = -1
            }
          })
        }
        if (item.is_new == 1) {
          this.new_market.splice(index, 1)
        }
        // this.set(this.new_market[index], 'is_new', -1)
      },
      addDomainName(){
        this.domainName.push({
          url: ''
        })
      },
      deleteDomainName(index){
        this.domainName.splice(index, 1)
      },
      addDomainUrlName(){
        this.domainUrlName.push({
          url: ''
        })
      },
      deleteDomainUrlName(index){
        this.domainUrlName.splice(index, 1)
      },
      ipListFn(type, index) { //ip限制地址操作
        if (type == 'add') {
          this.ipList.push({
            ip: '',
            number: ''
          })
        }
        if (type == 'delete') {
          this.ipList.splice(index, 1)
        }
      },
      getUserLevel(event) {
        event.forEach((item, index) => {
          if (item === '') {
            this.user_level = []
            this.levelList.forEach((items, indexs) => {
              this.user_level.push(items.id + '')
            })
          }
        })
      },
      getUserLevel1(event) {
        event.forEach((item, index) => {
          if (item === '') {
            this.user_level1 = []
            this.levelList.forEach((items, indexs) => {
              this.user_level1.push(items.id + '')
            })
          }
        })
      },
      getUserLevel2(event) {
        event.forEach((item, index) => {
          if (item === '') {
            this.user_level2 = []
            this.levelList.forEach((items, indexs) => {
              this.user_level2.push(items.id + '')
            })
          }
        })
      },
      async getData() {
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/system/bases',
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
        const {
          register,
          market,
          market2,
          new_market,
          rakeBack,
          rakeBack1,
          rakeBack2,
          activity,
          login,
          audit,
          system,
          agent,
          admin_pin_password,
          domain,
          network_safty
        } = res.data
        this.register = register
        this.market = market
        this.market2 = market2
        this.new_market = new_market
        this.rakeBack = rakeBack
        this.rakeBack1 = rakeBack1
        this.rakeBack2 = rakeBack2
        this.activity = activity
        this.login = login
        this.audit = audit
        this.system = system
        this.agent = agent
        this.admin_pin_password = admin_pin_password
        this.network_safty = network_safty
        this.user_level = system.kefu_url_vip.split(',')
        this.user_level1 = system.kefu_code_vip.split(',')
        // this.user_level2 = system.kefu3_code_vip.split(',')
        this.user_level2 = system.kefu3_code_vip ? system.kefu3_code_vip.split(',') : ''
        this.levelList = system.kefu_vip_list
        this.domainName = []
        this.domainUrlName = []
        if(domain && domain.h5){
          domain.h5.split(',').forEach( item =>{
            this.domainName.push({
              url: item
            })
          })
        }else{
          this.domainName.push({
            url: ''
          })
        }
        if(domain && domain.api_url){
          domain.api_url.split(',').forEach( item =>{
            this.domainUrlName.push({
              url: item
            })
          })
        }else{
          this.domainUrlName.push({
            url: ''
          })
        }
        this.ipList = []
        if(system.register_limit_ip_list){
          system.register_limit_ip_list.split(';').forEach((item,index) => {
            this.ipList.push({
              ip: item.split(',')[0],
              number: item.split(',')[1]
            })
          })
        }else{
          this.ipList.push({
            ip: '',
            number: ''
          })
        }
      },
      async save() {
        this.loading.btn = true
        const audit = {}
        const rakeBack = {},
          rakeBack1 = {},
          rakeBack2 = {}
        this.audit.forEach(o => {
          audit[o.key] = o.value
        })
        this.rakeBack.forEach(o => {
          rakeBack[o.key] = o.value
        })
        this.rakeBack1.forEach(o => {
          rakeBack1[o.key] = o.value
        })
        this.rakeBack2.forEach(o => {
          rakeBack2[o.key] = o.value
        })
        this.system.kefu_url_vip = ''
        if (this.user_level.length) {
          this.user_level.forEach((item, index) => {
            this.system.kefu_url_vip += index == 0 ? `${item}` : `,${item}`
          })
        }
        this.system.kefu_code_vip = ''
        if (this.user_level1.length) {
          this.user_level1.forEach((item, index) => {
            this.system.kefu_code_vip += index == 0 ? `${item}` : `,${item}`
          })
        }
        this.system.kefu3_code_vip = ''
        if (this.user_level2.length) {
          this.user_level2.forEach((item, index) => {
            this.system.kefu3_code_vip += index == 0 ? `${item}` : `,${item}`
          })
        }
        // let register_limit_ip_list = ''
        // this.ipList.forEach((item, index) => {
        //   if(item.ip || item.number){
        //     register_limit_ip_list += index == 0 ? `${item.ip},${item.number}` : `;${item.ip},${item.number}`
        //   }
        // })
        // this.system.register_limit_ip_list = register_limit_ip_list
        const domain = {
          h5: '',
          api_url: ''
        }
        let rightOrWrong =  false, rightOrWrong1 =  false
        if(this.domainName.length && this.domainName[0].url != ''){
          this.domainName.forEach((item, index)=>{
            if(item.url.indexOf('http://') == -1 && item.url.indexOf('https://') == -1){
              rightOrWrong = true
            }
            domain.h5 += index == 0 ? `${item.url}` : `,${item.url}`
          })
        }
        if(this.domainUrlName.length && this.domainUrlName[0].url != ''){
          this.domainUrlName.forEach((item, index)=>{
            if(item.url.indexOf('http://') == -1 && item.url.indexOf('https://') == -1){
              rightOrWrong1 = true
            }
            domain.api_url += index == 0 ? `${item.url}` : `,${item.url}`
          })
        }
        if(rightOrWrong){
          this.loading.btn = false
          this.$msg({
            type: 'error',
            message: `${this.i18n_lang.systemSet113_domain}`
          })
          return
        }
        if(rightOrWrong1){
          this.loading.btn = false
          this.$msg({
            type: 'error',
            message: `${this.i18n_lang.systemSet115_domain}`
          })
          return
        }
        const req = {
          register: this.register,
          market: this.market,
          market2: this.market2,
          new_market: this.new_market,
          activity: this.activity,
          login: this.login,
          system: this.system,
          agent: this.agent,
          admin_pin_password: this.admin_pin_password,
          network_safty: this.network_safty,
          rakeBack,
          rakeBack1,
          rakeBack2,
          audit,
          domain: domain
        }
        const res = await this.$axios.request({
          url: '/system/bases',
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
  #Base {
    .title {
      font-size: 16px;
      margin: 20px 0;
      padding-left: 10px;
      border-left: 3px solid #3080fe;
      color: #666;
    }

    .item {
      margin-bottom: 18px;

      &>p,
      &>span {
        font-size: 14px;
        display: inline-block;
        line-height: 28px;
        color: rgb(153, 153, 153);
        min-width: 100px;
        margin-right: 5px;
      }

      &>span {
        color: rgb(51, 51, 51);

        &.detail {
          color: #f33;
          margin-left: 5px;
        }
      }
    }

    .important {
      font-size: 13px;
      font-weight: 900;
      color: #000;
    }
  }
</style>
