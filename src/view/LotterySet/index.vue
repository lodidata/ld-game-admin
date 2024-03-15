<template>
  <div id="LotterySet">
    <Tabs v-model="curTab">
      <TabPane :label="i18n_lang.lotterySet0" name="LotterySwitch">
        <LotterySwitch v-if="curTab === 'LotterySwitch'"></LotterySwitch>
      </TabPane>
      <!-- <TabPane label="首页彩种排序" name="HomeSort">
        <HomeSort v-if="curTab === 'HomeSort'"></HomeSort>
      </TabPane> -->
      <TabPane :label="i18n_lang.lotterySet1" name="HallSort">
        <HallSort v-if="curTab === 'HallSort'"></HallSort>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import LotterySwitch from './LotterySwitch'
// import HomeSort from './HomeSort'
import HallSort from './HallSort'
export default {
  components: {
    LotterySwitch,
    // HomeSort,
    HallSort
  },
  data() {
    const i18n_lang = this.$t('lotterySet');
    return {
      i18n_lang: i18n_lang,
      curTab: 'LotterySwitch'
    }
  }
}
</script>
