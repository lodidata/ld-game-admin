<template>
  <div id="UserDetail">
    <Modal :value="visible" :width="1200" :footer-hide="true" @on-visible-change="visibleChangle">
      <Spin v-if="loading" size="large" fix></Spin>
      <div style="padding-top: 16px;">
        <Tabs v-if="visible" v-model="curTab">
          <TabPane :label="i18n_lang.components55" name="info">
            <Info v-if="curTab === 'info'" :id="curUser.id"></Info>
          </TabPane>
          <TabPane :label="i18n_lang.components56" name="password">
            <Password v-if="curTab === 'password'" :id="curUser.id"></Password>
          </TabPane>
          <TabPane :label="i18n_lang.components57" name="dml">
            <Dml v-if="curTab === 'dml'" :id="curUser.id"></Dml>
          </TabPane>
          <TabPane :label="i18n_lang.components58" name="order">
            <Order v-if="curTab === 'order'" :id="curUser.id" :username="curUser.username"></Order>
          </TabPane>
          <TabPane :label="i18n_lang.components59" name="money">
            <Money v-if="curTab === 'money'" :id="curUser.id" :username="curUser.username"></Money>
          </TabPane>
          <TabPane :label="i18n_lang.components60" name="bank">
            <Bank v-if="curTab === 'bank'" :id="curUser.id"></Bank>
          </TabPane>
          <TabPane :label="i18n_lang.components61" name="login">
            <Login v-if="curTab === 'login'" :id="curUser.id"></Login>
          </TabPane>
          <TabPane :label="i18n_lang.components62" name="next">
            <Agent v-if="curTab === 'next'" :id="curUser.id"></Agent>
          </TabPane>
          <TabPane :label="i18n_lang.components63" name="popular">
            <Popular v-if="curTab === 'popular'" :id="curUser.id"></Popular>
          </TabPane>
          <TabPane :label="i18n_lang.components269" name="accounted">
            <Accounted v-if="curTab === 'accounted'" :id="curUser.id"></Accounted>
          </TabPane>
          <TabPane :label="i18n_lang.components274" name="profit">
            <Profit v-if="curTab === 'profit'" :id="curUser.id"></Profit>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Info from './Info'
import Password from './Password'
import Order from './Order'
import Dml from './Dml'
import Bank from './Bank'
import Money from './Money'
import Login from './Login'
import Agent from './Agent'
import Popular from './Popular'
import Accounted from './Accounted'
import Profit from './Profit'

export default {
  name: 'UserDetail',
  components: {
    Info,
    Password,
    Order,
    Dml,
    Bank,
    Money,
    Login,
    Agent,
    Popular,
    Accounted,
    Profit
  },
  props: {},
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      curTab: 'info'
    }
  },
  computed: {
    ...mapState({
      visible: state => state.detail.visible,
      loading: state => state.detail.loading,
      curUser: state => state.detail.curUser
    })
  },
  mounted() {},
  methods: {
    ...mapMutations({
      setVisible: 'detail/setVisible'
    }),
    visibleChangle(visible) {
      this.curTab = 'info'
      this.setVisible(visible)
    }
  }
}
</script>
<style lang="less" scoped>
#UserDetail {}
</style>
