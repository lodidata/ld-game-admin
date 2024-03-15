<template>
  <div id="LotterySet">
    <Tabs v-model="curTab">
      <TabPane :label="i18n_lang.lotteryOrder0" name="LotteryOrder">
        <LotteryOrder v-if="curTab === 'LotteryOrder'"></LotteryOrder>
      </TabPane>
      <!-- <TabPane :label="i18n_lang.lotteryOrder1" name="ChaseOrder">
        <ChaseOrder v-if="curTab === 'ChaseOrder'"></ChaseOrder>
      </TabPane> -->
    </Tabs>
  </div>
</template>
<script>
import LotteryOrder from './LotteryOrder'
import ChaseOrder from './ChaseOrder'
export default {
  components: {
    LotteryOrder,
    ChaseOrder
  },
  data() {
    const i18n_lang = this.$t('lotteryOrder');
    return {
      i18n_lang: i18n_lang,
      curTab: 'LotteryOrder'
    }
  }
}
</script>
