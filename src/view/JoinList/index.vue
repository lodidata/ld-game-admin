<template>
  <div>
    <Tabs v-model="curTab">
      <TabPane :label="i18n_lang.joinList0" name="join_list">
        <JoinListData v-if="curTab === 'join_list'"></JoinListData>
      </TabPane>
      <TabPane :label="i18n_lang.joinList1" name="xylp">
        <LuckDisk v-if="curTab === 'xylp'"></LuckDisk>
      </TabPane>
      <TabPane :label="`${i18n_lang.joinList39}`" name="apply">
        <Apply v-if="curTab === 'apply'"></Apply>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import JoinListData from './JoinListData'
import LuckDisk from './LuckDisk'
import Apply from './Apply'
export default {
  components: {
    JoinListData,
    LuckDisk,
    Apply
  },
  data() {
    const i18n_lang = this.$t('joinList');
    return {
      i18n_lang: i18n_lang,
      curTab: 'join_list'
    }
  }
}
</script>

<style lang="less" scoped></style>
