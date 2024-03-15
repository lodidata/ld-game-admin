<template>
  <div id="Base">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Tabs v-model="curTab">
      <TabPane :label="`${i18n_lang.ProfitAndLoss10}`" name="proportion">
        <Row>
          <!-- <div class="item">
            <p style="min-width:60px; color: black;">{{i18n_lang.ProfitAndLoss8}}</p><span><Input v-model="agent.active_number" /></span>
            <div style="color: #999999;">{{i18n_lang.ProfitAndLoss9}}</div>
          </div>
          <div class="item">
            <p style="min-width:60px">{{i18n_lang.ProfitAndLoss0}}</p>
          </div> -->
          <div class="item">
            <RadioGroup v-model="bkge_settle_type"><!-- 1:日,2:周,3:月 -->
              <Radio :label="1">{{i18n_lang.ProfitAndLoss13}}</Radio>
              <Radio :label="2">{{i18n_lang.ProfitAndLoss14}}</Radio>
              <Radio :label="3">{{i18n_lang.ProfitAndLoss15}}</Radio>
            </RadioGroup>
          </div>
          <div v-if="bkge_settle_type == 1">
            <div class="item">
              <p>{{i18n_lang.ProfitAndLoss16}}>=</p><span><Input v-model="daily_condition.recharge_min" /></span>
              <p style="margin-left: 20px;">{{i18n_lang.ProfitAndLoss17}}>=</p><span><Input v-model="daily_condition.eff_user" /></span>
            </div>
            <div class="item">
              <p>{{i18n_lang.ProfitAndLoss18}}</p><span><Input v-model="daily_condition.new_user" /></span>
            </div>
          </div>
          <div v-if="bkge_settle_type == 2">
            <div class="item">
              <p>{{i18n_lang.ProfitAndLoss16}}>=</p><span><Input v-model="weekly_condition.recharge_min" /></span>
              <p style="margin-left: 20px;">{{i18n_lang.ProfitAndLoss17}}>=</p><span><Input v-model="weekly_condition.eff_user" /></span>
            </div>
            <div class="item">
              <p>{{i18n_lang.ProfitAndLoss18}}</p><span><Input v-model="weekly_condition.new_user" /></span>
            </div>
          </div>
          <div v-if="bkge_settle_type == 3">
            <div class="item">
              <p>{{i18n_lang.ProfitAndLoss16}}>=</p><span><Input v-model="monthly_condition.recharge_min" /></span>
              <p style="margin-left: 20px;">{{i18n_lang.ProfitAndLoss17}}>=</p><span><Input v-model="monthly_condition.eff_user" /></span>
            </div>
            <div class="item">
              <p>{{i18n_lang.ProfitAndLoss18}}</p><span><Input v-model="monthly_condition.new_user" /></span>
            </div>
          </div>
          <div class="item">
            <p>{{i18n_lang.ProfitAndLoss19}}</p>
          </div>
          <div class="item">
            <div>
              <div v-for="(item, index) in gameArrar" :key="index">
                <div class="item">
                  <div class="item_title">{{item.rename}}</div>
                  <Button size="large" type="primary" @click="addProportion2(`proportion`, index)">{{i18n_lang.ProfitAndLoss1}}</Button>
                </div>
                <div class="item" v-for="(items, indexs) in item.text" :key="indexs">
                  <p style="min-width:60px">{{i18n_lang.ProfitAndLoss2}}</p>
                  <span><Input v-model="items[0]" /></span>
                  <p style="min-width:60px">＜{{i18n_lang.ProfitAndLoss3}}＜=</p>
                  <span><Input v-model="items[1]" /></span>
                  <p style="min-width:40px">/{{i18n_lang.ProfitAndLoss4}}</p>
                  <p style="min-width:60px">{{i18n_lang.ProfitAndLoss5}}</p>
                  <span><Input v-model="items[2]" /></span>
                  <span>%</span>
                  <Button size="large" type="primary" @click="deleteProportion2(`proportion`, index)" v-if="item.text.length > 1 && indexs + 1 == item.text.length">{{i18n_lang.ProfitAndLoss6}}</Button>
                </div>
              </div>
            </div>
          </div>
        </Row>
        <Row style="margin:20px 0">
          <Button size="large" :loading="loading.btn" type="primary" @click="save(0)">{{i18n_lang.ProfitAndLoss7}}</Button>
        </Row>
      </TabPane>
      <TabPane :label="`${i18n_lang.ProfitAndLoss20}`" name="default_proportion">
        <Row>
          <div v-for="(item, index) in gameArrar2" :key="index">
            <div class="item">
              <span>{{item.rename}}</span>
              <span>{{`${i18n_lang.ProfitAndLoss21}`}}</span>
              <span><Input v-model="item.text" /></span>
            </div>
          </div>
        </Row>
        <Row>
          <div>
            <span>{{`${i18n_lang.ProfitAndLoss20}`}}</span>
            <span>
              <Switch v-model="agent.default_proportion_switch"></Switch>
            </span>
          </div>
        </Row>
        <Row style="margin:20px 0">
          <Button size="large" :loading="loading.btn" type="primary" @click="save(2)">{{i18n_lang.ProfitAndLoss7}}</Button>
        </Row>
      </TabPane>
      <TabPane :label="`${i18n_lang.ProfitAndLoss22}`" name="fixed_proportion">
        <Row>
          <div v-for="(item, index) in gameArrar3" :key="index">
            <div class="item">
              <span>{{item.rename}}</span>
              <span>{{`${i18n_lang.ProfitAndLoss23}`}}</span>
              <span><Input v-model="item.text" /></span>
            </div>
          </div>
        </Row>
        <Row>
          <div>
            <span>{{`${i18n_lang.ProfitAndLoss22}`}}</span>
            <span>
              <Switch v-model="agent.fixed_proportion_switch"></Switch>
            </span>
          </div>
        </Row>
        <Row style="margin:20px 0">
          <Button size="large" :loading="loading.btn" type="primary" @click="save(3)">{{i18n_lang.ProfitAndLoss7}}</Button>
        </Row>
      </TabPane>
      <TabPane :label="`${i18n_lang.ProfitAndLoss11}`" name="sub_default_proportion">
        <Row>
          <div v-for="(item, index) in gameArrar1" :key="index">
            <div class="item">
              <span>{{item.rename}}</span>
              <span>{{ i18n_lang.ProfitAndLoss12 }}</span>
              <span><Input v-model="item.text0" /></span>
              <span>---</span>
              <span><Input v-model="item.text1" /></span>
              <span>%</span>
            </div>
          </div>
        </Row>
        <Row style="margin:20px 0">
          <Button size="large" :loading="loading.btn" type="primary" @click="save(1)">{{i18n_lang.ProfitAndLoss7}}</Button>
        </Row>
      </TabPane>
      <TabPane :label="`${i18n_lang.ProfitAndLoss24}`" name="sub_fixed_proportion">
        <Row>
          <div v-for="(item, index) in gameArrar4" :key="index">
            <div class="item">
              <span>{{item.rename}}</span>
              <span>{{`${i18n_lang.ProfitAndLoss24}`}}</span>
              <span><Input v-model="item.text" /></span>
            </div>
          </div>
        </Row>
        <Row>
          <div>
            <span>{{`${i18n_lang.ProfitAndLoss25}`}}</span>
            <span>
              <Switch v-model="agent.sub_proportion_switch"></Switch>
            </span>
          </div>
        </Row>
        <Row style="margin:20px 0">
          <Button size="large" :loading="loading.btn" type="primary" @click="save(4)">{{i18n_lang.ProfitAndLoss7}}</Button>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  data() {
    const i18n_lang = this.$t('ProfitAndLoss');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        btn: false
      },
      agent: {},//股份\占成
      proportion: [['', '', '']],
      ipWhiteSwitch: false,
      gameArrar: [],
      gameArrar1: [],
      gameArrar2: [],
      gameArrar3: [],
      gameArrar4: [],
      curTab: 'proportion',
      bkge_settle_type: 1,
      daily_condition: {
        recharge_min: "", eff_user: "", new_user: ""
      },
      weekly_condition: {
        recharge_min: "", eff_user: "", new_user: ""
      },
      monthly_condition: {
        recharge_min: "", eff_user: "", new_user: ""
      }
    }
  },
  created() {
    this.getData()
  },
  computed: {},
  methods: {
    addProportion(){
      this.proportion.push([this.proportion[this.proportion.length - 1][1], '', ''])
    },
    addProportion2(text, index){
      if(text == `proportion`){
        this.gameArrar[index].text.push([this.gameArrar[index].text[this.gameArrar[index].text.length - 1][1],'',''])
      }
      if(text == `sub_default_proportion`){
        this.gameArrar1[index].text.push([this.gameArrar1[index].text[this.gameArrar1[index].text.length - 1][1],'',''])
      }
    },
    deleteProportion(){
      this.proportion.pop()
    },
    deleteProportion2(text, index){
      if(text == `proportion`){
        this.gameArrar[index].text.pop()
      }
      if(text == `sub_default_proportion`){
        this.gameArrar1[index].text.pop()
      }
    },
    arrayUnique(arr, name) {
    	var hash = {};
    	return arr.reduce(function (item, next) {
    		hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
    		return item;
    	}, []);
    },
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/profitloss/profitsettle',
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
      const agent  = res.data
      this.agent = agent
      if(agent.proportion){
        let arrar = []
        let obj = {}
        let proportion_value = JSON.parse(agent.proportion)
        for(let key in proportion_value){
          obj = {
            type: key,
            text: proportion_value[key]
          }
          arrar.push(obj)
        }
        arrar.forEach((item, index) => {
          let textArrar = []
          item.text.split(';').forEach((items, indexs) => {
            textArrar.push([items.split(',')[0], items.split(',')[1], Number(items.split(',')[2])])
            item.text = textArrar
          })
        })
        this.getGameMenu('proportion', arrar)
      }else{
        this.getGameMenu('proportion')
      }
      if(agent.sub_default_proportion){
        let arrar = []
        let obj = {}
        let proportion_value = JSON.parse(agent.sub_default_proportion)
        for(let key in proportion_value){
          obj = {
            type: key,
            text: proportion_value[key]
          }
          arrar.push(obj)
        }
        this.getGameMenu('sub_default_proportion', arrar)
      }else{
        this.getGameMenu('sub_default_proportion')
      }
      if(agent.default_proportion){
        let arrar = []
        let obj = {}
        let proportion_value = JSON.parse(agent.default_proportion)
        for(let key in proportion_value){
          obj = {
            type: key,
            text: proportion_value[key]
          }
          arrar.push(obj)
        }
        this.getGameMenu('default_proportion', arrar)
      }else{
        this.getGameMenu('default_proportion')
      }
      if(agent.fixed_proportion){
        let arrar = []
        let obj = {}
        let proportion_value = JSON.parse(agent.fixed_proportion)
        for(let key in proportion_value){
          obj = {
            type: key,
            text: proportion_value[key]
          }
          arrar.push(obj)
        }
        this.getGameMenu('fixed_proportion', arrar)
      }else{
        this.getGameMenu('fixed_proportion')
      }
      if(agent.sub_fixed_proportion){
        let arrar = []
        let obj = {}
        let proportion_value = JSON.parse(agent.sub_fixed_proportion)
        for(let key in proportion_value){
          obj = {
            type: key,
            text: proportion_value[key]
          }
          arrar.push(obj)
        }
        this.getGameMenu('sub_fixed_proportion', arrar)
      }else{
        this.getGameMenu('sub_fixed_proportion')
      }
      if(agent.bkge_settle_type){
        this.bkge_settle_type = agent.bkge_settle_type
      }
      if(agent.daily_condition){
        this.daily_condition = JSON.parse(agent.daily_condition)
      }
      if(agent.weekly_condition){
        this.weekly_condition = JSON.parse(agent.weekly_condition)
      }
      if(agent.monthly_condition){
        this.monthly_condition = JSON.parse(agent.monthly_condition)
      }
    },
    // 获取游戏渠道
    async getGameMenu(text, arrar) {
      const res = await this.$axios.request({
        url: '/game/menu',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return
      }
      if(res.data && res.data.length){
        if(text == 'proportion'){
          this.gameArrar = []
          if(arrar){
            let arrar1 = [], arrar2 = []
            res.data.forEach((item, index) => {
              arrar.forEach((items, indexs) => {
                if(item.type == items.type){
                  let obj = {
                    name: item.name,
                    rename: item.rename,
                    type: item.type,
                    text: items.text
                  }
                  arrar1.push(obj)
                  // this.gameArrar.push(obj)
                }else{
                  let obj = {
                    name: item.name,
                    rename: item.rename,
                    type: item.type,
                    text: [['','','']]
                  }
                  arrar2.push(obj)
                  // this.gameArrar.push(obj)
                }
              })
              this.gameArrar = this.arrayUnique(arrar1.concat(arrar2), 'type')
            })
          }else{
            res.data.forEach((item, index) => {
              let obj = {
                name: item.name,
                rename: item.rename,
                type: item.type,
                text: [['','','']]
              }
              this.gameArrar.push(obj)
            })
          }
        }
        if(text == 'sub_default_proportion'){
          this.gameArrar1 = []
          if(arrar){
            let arrar1 = [], arrar2 = []
            res.data.forEach((item, index) => {
              arrar.forEach((items, indexs) => {
                if(item.type == items.type){
                  let obj = {
                    name: item.name,
                    rename: item.rename,
                    type: item.type,
                    text0: items.text.split(',')[0],
                    text1: items.text.split(',')[1] ? items.text.split(',')[1] : ''
                  }
                  arrar1.push(obj)
                }else{
                  let obj = {
                    name: item.name,
                    rename: item.rename,
                    type: item.type,
                    text0: '',
                    text1: ''
                  }
                  arrar2.push(obj)
                }
              })
              this.gameArrar1 = this.arrayUnique(arrar1.concat(arrar2), 'type')
            })
          }else{
            res.data.forEach((item, index) => {
              let obj = {
                name: item.name,
                rename: item.rename,
                type: item.type,
                text0: '',
                text1: ''
              }
              this.gameArrar1.push(obj)
            })
          }
        }
        if(text == 'default_proportion'){
          this.gameArrar2 = []
          if(arrar){
            let arrar1 = [], arrar2 = []
            res.data.forEach((item, index) => {
              arrar.forEach((items, indexs) => {
                if(item.type == items.type){
                  let obj = {
                    name: item.name,
                    rename: item.rename,
                    type: item.type,
                    text: items.text
                  }
                  arrar1.push(obj)
                }else{
                  let obj = {
                    name: item.name,
                    rename: item.rename,
                    type: item.type,
                    text: ''
                  }
                  arrar2.push(obj)
                }
              })
              this.gameArrar2 = this.arrayUnique(arrar1.concat(arrar2), 'type')
            })
          }else{
            res.data.forEach((item, index) => {
              let obj = {
                name: item.name,
                rename: item.rename,
                type: item.type,
                text: ''
              }
              this.gameArrar2.push(obj)
            })
          }
        }
        if(text == 'fixed_proportion'){
          this.gameArrar3 = []
          if(arrar){
            let arrar1 = [], arrar2 = []
            res.data.forEach((item, index) => {
              arrar.forEach((items, indexs) => {
                if(item.type == items.type){
                  let obj = {
                    name: item.name,
                    rename: item.rename,
                    type: item.type,
                    text: items.text
                  }
                  arrar1.push(obj)
                }else{
                  let obj = {
                    name: item.name,
                    rename: item.rename,
                    type: item.type,
                    text: ''
                  }
                  arrar2.push(obj)
                }
              })
              this.gameArrar3 = this.arrayUnique(arrar1.concat(arrar2), 'type')
            })
          }else{
            res.data.forEach((item, index) => {
              let obj = {
                name: item.name,
                rename: item.rename,
                type: item.type,
                text: ''
              }
              this.gameArrar3.push(obj)
            })
          }
        }
        if(text == 'sub_fixed_proportion'){
          this.gameArrar4 = []
          if(arrar){
            let arrar1 = [], arrar2 = []
            res.data.forEach((item, index) => {
              arrar.forEach((items, indexs) => {
                if(item.type == items.type){
                  let obj = {
                    name: item.name,
                    rename: item.rename,
                    type: item.type,
                    text: items.text
                  }
                  arrar1.push(obj)
                }else{
                  let obj = {
                    name: item.name,
                    rename: item.rename,
                    type: item.type,
                    text: ''
                  }
                  arrar2.push(obj)
                }
              })
              this.gameArrar4 = this.arrayUnique(arrar1.concat(arrar2), 'type')
            })
          }else{
            res.data.forEach((item, index) => {
              let obj = {
                name: item.name,
                rename: item.rename,
                type: item.type,
                text: ''
              }
              this.gameArrar4.push(obj)
            })
          }
        }
      }
    },
    async save(number) {
      this.loading.btn = true
      let agent = { ...this.agent }
      // this.agent.proportion = ''
      // this.agent.sub_default_proportion = ''
      let proportionText = '', proportion = {}, sub_default_proportionText = '', sub_default_proportion = {},
      default_proportionText = '', default_proportion = {}, fixed_proportionText = '', fixed_proportion = {},
      sub_fixed_proportionText = '',sub_fixed_proportion = {};
      if(number == 0){
        this.gameArrar.forEach((item, index) => {
          proportionText = ''
          item.text.forEach((items, indexs) => {
            if(items[0] && items[1] && items[2]){
              proportionText += indexs == 0 ? `${items[0]},${items[1]},${items[2]}` : `;${items[0]},${items[1]},${items[2]}`
              proportion[item.type] = proportionText
            }
          })
        })
        agent.proportion = JSON.stringify(proportion) != '{}' ? JSON.stringify(proportion) : ''
        agent.bkge_settle_type = this.bkge_settle_type
        agent.daily_condition = JSON.stringify(this.daily_condition)
        agent.weekly_condition = JSON.stringify(this.weekly_condition)
        agent.monthly_condition = JSON.stringify(this.monthly_condition)
        delete agent.sub_default_proportion
        delete agent.default_proportion
        delete agent.fixed_proportion
        delete agent.sub_fixed_proportion
        delete agent.default_proportion_switch
        delete agent.fixed_proportion_switch
        delete agent.sub_proportion_switch
      }
      if(number == 1){
        this.gameArrar1.forEach((item, index) => {
          sub_default_proportionText = `${item.text0 ? item.text0 : 0},${item.text1 ? item.text1 : 0}`
          sub_default_proportion[item.type] = sub_default_proportionText
        })
        agent.sub_default_proportion = JSON.stringify(sub_default_proportion) != '{}' ? JSON.stringify(sub_default_proportion) : ''
        delete agent.proportion
        delete agent.default_proportion
        delete agent.fixed_proportion
        delete agent.sub_fixed_proportion
        delete agent.default_proportion_switch
        delete agent.fixed_proportion_switch
        delete agent.sub_proportion_switch
        delete agent.bkge_settle_type
        delete agent.daily_condition
        delete agent.weekly_condition
        delete agent.monthly_condition
      }
      if(number == 2){
        this.gameArrar2.forEach((item, index) => {
          default_proportionText = item.text ? `${item.text}` : 0
          default_proportion[item.type] = default_proportionText
        })
        agent.default_proportion = JSON.stringify(default_proportion) != '{}' ? JSON.stringify(default_proportion) : ''
        delete agent.proportion
        delete agent.sub_default_proportion
        delete agent.fixed_proportion
        delete agent.sub_fixed_proportion
        delete agent.fixed_proportion_switch
        delete agent.sub_proportion_switch
        delete agent.bkge_settle_type
        delete agent.daily_condition
        delete agent.weekly_condition
        delete agent.monthly_condition
      }
      if(number == 3){
        this.gameArrar3.forEach((item, index) => {
          fixed_proportionText = item.text ? `${item.text}` : 0
          fixed_proportion[item.type] = fixed_proportionText
        })
        agent.fixed_proportion = JSON.stringify(fixed_proportion) != '{}' ? JSON.stringify(fixed_proportion) : ''
        delete agent.proportion
        delete agent.sub_default_proportion
        delete agent.default_proportion
        delete agent.sub_fixed_proportion
        delete agent.default_proportion_switch
        delete agent.sub_proportion_switch
        delete agent.bkge_settle_type
        delete agent.daily_condition
        delete agent.weekly_condition
        delete agent.monthly_condition
      }
      if(number == 4){
        this.gameArrar4.forEach((item, index) => {
          sub_fixed_proportionText = item.text ? `${item.text}` : 0
          sub_fixed_proportion[item.type] = sub_fixed_proportionText
        })
        agent.sub_fixed_proportion = JSON.stringify(sub_fixed_proportion) != '{}' ? JSON.stringify(sub_fixed_proportion) : ''
        delete agent.proportion
        delete agent.sub_default_proportion
        delete agent.default_proportion
        delete agent.fixed_proportion
        delete agent.default_proportion_switch
        delete agent.fixed_proportion_switch
        delete agent.bkge_settle_type
        delete agent.daily_condition
        delete agent.weekly_condition
        delete agent.monthly_condition
      }
      const req = {
        profit_loss: agent
      }
      const res = await this.$axios.request({
        url: '/profitloss/profitsettle',
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
    & > p,
    & > span {
      font-size: 14px;
      display: inline-block;
      line-height: 28px;
      color: rgb(153, 153, 153);
      // min-width: 100px;
      margin-right: 5px;
    }
    & > span {
      color: rgb(51, 51, 51);
      &.detail {
        color: #f33;
        margin-left: 5px;
      }
    }
    .item_title{
      font-size: 14px;
      line-height: 28px;
    }
  }
  .important {
    font-size: 13px;
    font-weight: 900;
    color: #000;
  }
}
</style>
