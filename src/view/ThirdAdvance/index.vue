<template>
  <div id="ThirdAdvance" class="card">
    <Tabs :animated="false" :value="tab" @on-click="tabClick">
      <TabPane :label="i18n_lang.thirdAdvance0" name="income">
        <InCome v-if="tab === 'income'"></InCome>
      </TabPane>
      <TabPane :label="i18n_lang.thirdAdvance1" name="record">
        <Record v-if="tab ==='record'"></Record>
      </TabPane>
      <TabPane :label="`${i18n_lang.thirdAdvance63}`" name="third">
        <Third v-if="tab ==='third'"></Third>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import InCome from './InCome'
import Record from './Record'
import Third from './Third'
export default {
  components: {
    InCome,
    Record,
    Third
  },
  data() {
    const i18n_lang = this.$t('thirdAdvance');
    return {
      i18n_lang: i18n_lang,
      tab: 'income'
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
