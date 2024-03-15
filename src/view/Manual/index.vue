<template>
  <div id="Manual">
    <Tabs v-model="tab">
      <TabPane :label="i18n_lang.manual0" name="handle">
        <Handle v-if="tab == 'handle'"></Handle>
      </TabPane>
      <TabPane :label="i18n_lang.manual1" name="log">
        <Log v-if="tab == 'log'"></Log>
      </TabPane>
      <TabPane :label="`${i18n_lang.manual107_v_1_2_4_6}`" name="wholesale">
        <Wholesale v-if="tab == 'wholesale'"></Wholesale>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import Handle from './Handle'
import Log from './Log'
import Wholesale from './Wholesale'
export default {
  components: {
    Handle,
    Log,
    Wholesale
  },
  data() {
    const i18n_lang = this.$t('manual');
    return {
      i18n_lang: i18n_lang,
      tab: 'handle'
    }
  }
}
</script>
<style lang="less" scoped></style>
