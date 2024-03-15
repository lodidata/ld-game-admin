<template>
  <div id="GameManage" class="card">
    <Tabs v-model="curTab">
      <!-- <TabPane :label="i18n_lang.gameManage0" name="across"> <Across v-if="curTab === 'across'" /> </TabPane> -->
      <TabPane :label="i18n_lang.gameManage1" name="vertical">
        <Vertical v-if="curTab === 'vertical'" />
      </TabPane>
      <TabPane :label="`${i18n_lang.gameManage47}`" name="hot">
        <Hot v-if="curTab === 'hot'" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import Across from './Across'
import Vertical from './Vertical'
import Hot from './Hot'
import { localRead, localSave } from '@/libs/util'

export default {
  components: {
    Across,
    Vertical,
    Hot
  },
  data() {
    const i18n_lang = this.$t('gameManage');
    return {
      i18n_lang: i18n_lang,
      curTab: 'vertical'
    }
  },
  created() {
    this.curTab = localRead('gameManageTab') || 'vertical'
    localSave('gameManageTab', '')
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
