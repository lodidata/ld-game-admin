<template>
  <div id="Base">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Row>
      <div class="item">
        <div class="item_title">{{i18n_lang.systemSet67}}</div>
        <p style="min-width:60px">{{i18n_lang.systemSet68}}=</p><span><Input v-model="agent.shares" /></span><span>{{i18n_lang.systemSet69}}</span>
      </div>
      <div class="item">
        <!-- <div class="item_title">{{i18n_lang.systemSet70}}</div> -->
        <Tabs v-model="curTab">
          <TabPane :label="i18n_lang.systemSet70" name="proportion">
            <div v-if="curTab == 'proportion'">
              <div v-for="(item, index) in gameArrar" :key="index">
                <div class="item">
                  <div class="item_title">{{item.rename}}</div>
                  <Button size="large" type="primary" @click="addProportion2(`proportion`, index)">{{i18n_lang.systemSet71}}</Button>
                </div>
                <div class="item" v-for="(items, indexs) in item.text" :key="indexs">
                  <p style="min-width:60px">{{i18n_lang.systemSet72}}</p>
                  <span><Input v-model="items[0]" /></span>
                  <p style="min-width:60px">＜{{i18n_lang.systemSet73}}＜=</p>
                  <span><Input v-model="items[1]" /></span>
                  <p style="min-width:40px">/{{i18n_lang.systemSet74}}</p>
                  <p style="min-width:60px">{{i18n_lang.systemSet75}}</p>
                  <span><Input v-model="items[2]" /></span>
                  <Button size="large" type="primary" @click="deleteProportion2(`proportion`, index)" v-if="item.text.length > 1 && indexs + 1 == item.text.length">{{i18n_lang.systemSet76}}</Button>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane :label="`${i18n_lang.systemSet85}`" name="user_proportion">
            <div v-if="curTab == 'user_proportion'">
              <div v-for="(item, index) in gameArrar1" :key="index">
                <div class="item">
                  <div class="item_title">{{item.rename}}</div>
                  <Button size="large" type="primary" @click="addProportion2(`user_proportion`, index)">{{i18n_lang.systemSet71}}</Button>
                </div>
                <div class="item" v-for="(items, indexs) in item.text" :key="indexs">
                  <p style="min-width:60px">{{i18n_lang.systemSet72}}</p>
                  <span><Input v-model="items[0]" /></span>
                  <p style="min-width:60px">＜{{i18n_lang.systemSet73}}＜=</p>
                  <span><Input v-model="items[1]" /></span>
                  <p style="min-width:40px">/{{i18n_lang.systemSet74}}</p>
                  <p style="min-width:60px">{{i18n_lang.systemSet75}}</p>
                  <span><Input v-model="items[2]" /></span>
                  <Button size="large" type="primary" @click="deleteProportion2('user_proportion', index)" v-if="item.text.length > 1 && indexs + 1 == item.text.length">{{i18n_lang.systemSet76}}</Button>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
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
      agent: {},//股份\占成
      proportion: [['', '', '']],
      ipWhiteSwitch: false,
      gameArrar: [],
      gameArrar1: [],
      curTab: 'proportion'
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
      if(text == `user_proportion`){
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
      if(text == `user_proportion`){
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
        url: '/system/shares',
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
      if(agent.user_proportion){
        let arrar = []
        let obj = {}
        let proportion_value = JSON.parse(agent.user_proportion)
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
        this.getGameMenu('user_proportion', arrar)
      }else{
        this.getGameMenu('user_proportion')
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
        if(text == 'user_proportion'){
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
              this.gameArrar1 = this.arrayUnique(arrar1.concat(arrar2), 'type')
            })
          }else{
            res.data.forEach((item, index) => {
              let obj = {
                name: item.name,
                rename: item.rename,
                type: item.type,
                text: [['','','']]
              }
              this.gameArrar1.push(obj)
            })
          }
        }
      }
    },
    async save() {
      // return console.log('this.gameArrar', this.gameArrar)
      this.loading.btn = true
      this.agent.proportion = ''
      let proportionText = '', proportion = {}, user_proportionText = '', user_proportion = {}
      this.gameArrar.forEach((item, index) => {
        proportionText = ''
        item.text.forEach((items, indexs) => {
          if(items[0] && items[1] && items[2]){
            proportionText += indexs == 0 ? `${items[0]},${items[1]},${items[2]}` : `;${items[0]},${items[1]},${items[2]}`
            proportion[item.type] = proportionText
          }
        })
      })
      this.gameArrar1.forEach((item, index) => {
        user_proportionText = ''
        item.text.forEach((items, indexs) => {
          if(items[0] && items[1] && items[2]){
            user_proportionText += indexs == 0 ? `${items[0]},${items[1]},${items[2]}` : `;${items[0]},${items[1]},${items[2]}`
            user_proportion[item.type] = user_proportionText
          }
        })
      })
      this.agent.proportion = JSON.stringify(proportion)
      this.agent.user_proportion = JSON.stringify(user_proportion)
      const req = {
        agent: this.agent
      }
      const res = await this.$axios.request({
        url: '/system/shares',
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
