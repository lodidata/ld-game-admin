<template>
  <div id="payManage">
    <Tabs v-model="curTab">
      <TabPane :label="i18n_lang.payManage0" name="OnlineIncome">
        <OnlineIncome v-if="curTab === 'OnlineIncome'"></OnlineIncome>
      </TabPane>
      <TabPane :label="i18n_lang.payManage1" name="OfflineIncome">
        <OfflineIncome v-if="curTab === 'OfflineIncome'"></OfflineIncome>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import OnlineIncome from './OnlineIncome'
import OfflineIncome from './OfflineIncome'

export default {
  components: {
    OnlineIncome,
    OfflineIncome
  },
  data() {
    const i18n_lang = this.$t('payManage');
    return {
      i18n_lang: i18n_lang,
      curTab: 'OnlineIncome'
    }
  },
  watch: {
    $route(val) {
      if (val.query.tab) {
        this.curTab = this.$route.query.tab
      }
    }
  },
  created() {
    this.curTab = this.$route.query.tab || 'OnlineIncome'
  }
}
</script>
<style lang="less">
</style>
