<template>
  <div id="LotteryHallSet">
    <Tabs v-model="curTab">
      <TabPane :label="i18n_lang.lotteryHallSet0" name="basic">
        <BaseSet v-if="curTab === 'basic'"></BaseSet>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import BaseSet from './BaseSet'
export default {
  components: {
    BaseSet
  },
  data() {
    const i18n_lang = this.$t('lotteryHallSet');
    return {
      i18n_lang: i18n_lang,
      curTab: 'basic'
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
