<template>
  <div>
    <div style="width: 400px;">
      <!-- <div></div> -->
      <Form
        :label-width="100"
        style="width: 400px">
        <FormItem v-for="(item, index) in gameArrar" :key="index" :label="item.rename">
          <Input v-model="item.text"></Input>
        </FormItem>
      </Form>
      <Button type="primary" class="btn" @click="saveData">{{i18n_lang.components146}}</Button><!-- style="width: 100px;margin: 0 calc((100% - 100px) / 2);" -->
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'Accounted',
    props: ['id'],
    data() {
      const i18n_lang = this.$t('components');
      return {
        i18n_lang: i18n_lang,
        form: {
          profit_loss_value: ""
        },
        gameArrar: []
      }
    },
    computed: {
      ...mapState({
        userAccounted: state => state.detail.userAccounted
      })
    },
    watch: {},
    mounted() {
      this.userInfo()
    },
    methods: {
      ...mapMutations({
        setVisible: 'detail/setVisible',
        setUserAccounted: 'detail/setUserAccounted'
      }),
      async userInfo(){
        const res = await this.$axios.request({
          url: `/profitloss/userprofit/${this.id}`,
          method: 'GET'
        })
        if(res.data.profit_loss_value) {
          this.form = { ...res.data }
          let arrar = []
          if(this.form.profit_loss_value){
            let profit_loss_value = JSON.parse(this.form.profit_loss_value)
            for(let key in profit_loss_value){
              let obj = {
                type: key,
                text: profit_loss_value[key]
              }
              arrar.push(obj)
            }
          }
          this.getGameMenu(arrar.length > 0 ? arrar : '')
        }else{
          this.getGameMenu()
        }
      },
      // 获取游戏渠道
      async getGameMenu(arrar) {
        const res = await this.$axios.request({
          url: '/game/menu',
          method: 'GET'
        })
        if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
          this.$Message.error(res.message)
          return
        }
        if(res.data && res.data.length){
          this.gameArrar = []
          if(arrar){
            res.data.forEach((item, index) => {
              arrar.forEach((items, indexs) => {
                if(item.type == items.type){
                  let obj = {
                    name: item.name,
                    rename: item.rename,
                    type: item.type,
                    text: items.text
                  }
                  this.gameArrar.push(obj)
                }
                // else{
                //   let obj = {
                //     name: item.name,
                //     rename: item.rename,
                //     type: item.type,
                //     text: ''
                //   }
                //   this.gameArrar.push(obj)
                // }
              })
            })
          }else{
            res.data.forEach((item, index) => {
              let obj = {
                name: item.name,
                rename: item.rename,
                type: item.type,
                text: ''
              }
              this.gameArrar.push(obj)
            })
          }
        }
      },
      async saveData(){
        let profit_loss_value = {}
        this.gameArrar.forEach((item, index) => {
          profit_loss_value[item.type] = item.text
        })
        this.form.profit_loss_value = JSON.stringify(profit_loss_value)
        const res = await this.$axios.request({
          url: `/profitloss/userprofit/${this.id}`,
          method: 'PUT',
          data: { ...this.form }
        })
        this.$msg({
          type: res.status !== 200 || res.state !== 0 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200 || res.state !== 0) return
        this.setUserAccounted(this.userAccounted ? false : true)
        this.setVisible(false)
      }
    }
  }
</script>

<style>
</style>
