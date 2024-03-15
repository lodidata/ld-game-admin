<template>
  <div>
    <div style="width: 400px;">
      <Form
        :label-width="100"
        style="width: 400px">
        <FormItem :label="`${i18n_lang.components270}`">
          <RadioGroup v-model="form.proportion_type">
            <Radio :label="1">{{i18n_lang.components271}}</Radio>
            <Radio :label="2">{{i18n_lang.components272}}</Radio>
          </RadioGroup>
        </FormItem>
        <!-- <FormItem :label="`${i18n_lang.components273}`" prop="proportion_value">
          <Input v-model="form.proportion_value"/>
        </FormItem> -->
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
          proportion_type: 2,
          proportion_value: ""
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
          url: `/user/info/portion/${this.id}`,
          method: 'GET'
        })
        if(res.data.proportion_type) {
          this.form = { ...res.data }
          let arrar = []
          if(this.form.proportion_value){
            let proportion_value = JSON.parse(this.form.proportion_value)
            for(let key in proportion_value){
              let obj = {
                type: key,
                text: proportion_value[key]
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
        if (res.status !== 200) {
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
        let proportion_value = {}
        this.gameArrar.forEach((item, index) => {
          proportion_value[item.type] = item.text
        })
        this.form.proportion_value = JSON.stringify(proportion_value)
        const res = await this.$axios.request({
          url: `/user/info/portion/${this.id}`,
          method: 'PUT',
          data: { ...this.form }
        })
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.setUserAccounted(this.userAccounted ? false : true)
        this.setVisible(false)
      }
    }
  }
</script>

<style>
</style>
