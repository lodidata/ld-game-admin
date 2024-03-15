<template>
  <div id="memberManagenment">
    <Tabs v-model="curTab">
      <TabPane :label="i18n_lang.memberManage0" name="Member">
        <Member v-if="curTab === 'Member'"></Member>
      </TabPane>
      <TabPane :label="i18n_lang.memberManage1" name="Record">
        <Record v-if="curTab === 'Record'"></Record>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import Member from './Member'
import Record from './Record'

export default {
  components: {
    Member,
    Record
  },
  data() {
    const i18n_lang = this.$t('memberManage');
    return {
      i18n_lang: i18n_lang,
      curTab: 'Member'
    }
  }
}
</script>
<style lang="less">
@import url('./index.less');
</style>
