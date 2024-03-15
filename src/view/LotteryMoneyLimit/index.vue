<template>
  <div id="LotteryMoneyLimit">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Tabs v-model="curTab">
      <TabPane :label="i18n_lang.lotteryMoneyLimit0" name="lottery">
        <LotteryLimit v-if="curTab === 'lottery'"></LotteryLimit>
      </TabPane>
      <TabPane :label="i18n_lang.lotteryMoneyLimit1" name="play">
        <PlayLimit v-if="curTab === 'play'"></PlayLimit>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import LotteryLimit from './LotteryLimit'
import PlayLimit from './PlayLimit'
export default {
  components: {
    LotteryLimit,
    PlayLimit
  },
  data() {
    const i18n_lang = this.$t('lotteryMoneyLimit');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false
      },
      curTab: 'lottery'
    }
  }
}
</script>
<style lang="less" scoped></style>
