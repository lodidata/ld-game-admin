<template>
  <div id="SystemSet">
    <Tabs v-model="curTab">
      <TabPane :label="i18n_lang.systemSet0" name="base" v-if="tabAccess.indexOf(177) > -1">
        <Base v-if="curTab === 'base'"></Base>
      </TabPane>
      <TabPane :label="i18n_lang.systemSet1" name="money" v-if="tabAccess.indexOf(179) > -1">
        <Money v-if="curTab === 'money'"></Money>
      </TabPane>
      <TabPane :label="i18n_lang.systemSet2" name="lottery" v-if="tabAccess.indexOf(181) > -1">
        <Lottery v-if="curTab === 'lottery'"></Lottery>
      </TabPane>
      <!-- <TabPane :label="i18n_lang.systemSet3" name="register">
        <register v-if="curTab === 'register'"></register>
      </TabPane> -->
    </Tabs>
  </div>
</template>
<script>
import Base from './Base'
import Money from './Money'
import Lottery from './Lottery'
import register from './register'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      tabAccess: state => state.user.tabAccess
    })
  },
  components: {
    Base,
    Money,
    Lottery,
    register
  },
  data() {
    const i18n_lang = this.$t('systemSet');
    return {
      i18n_lang: i18n_lang,
      curTab: 'base'
    }
  },
  methods: {
    tabClick(i) {
      this.tab = i
    }
  }
}
</script>
<style lang="less" scoped>
</style>
