<template>
  <div id="box" style="width: 100%">
    <Tabs v-model="curTab" style="overflow: hidden">
      <TabPane :label="i18n_lang.lotteryReport0" name="report">
        <report v-if="curTab === 'report'"></report>
      </TabPane>
      <!-- <TabPane :label="i18n_lang.lotteryReport1" name="statistics">
        <statistics v-if="curTab === 'statistics'"></statistics>
      </TabPane> -->
    </Tabs>
  </div>
</template>

<script>
import report from './report'
import statistics from './statistics'

export default {
  components: { report, statistics },
  data() {
    const i18n_lang = this.$t('lotteryReport');
    return {
      i18n_lang: i18n_lang,
      curTab: 'report'
    }
  }
}
</script>>
