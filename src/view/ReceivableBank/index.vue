<template>
  <div id="Receivablebank" class="card">
    <Tabs v-model="curTab">
      <TabPane :label="i18n_lang.receivableBank0" name="ReceivableBank" class="tab_box">
        <ReceivableBank v-if="curTab === 'ReceivableBank'"></ReceivableBank>
      </TabPane>
      <TabPane :label="i18n_lang.receivableBank1" name="OfflineDescription" class="tab_box">
        <OfflineDescription v-if="curTab === 'OfflineDescription'"></OfflineDescription>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import ReceivableBank from './ReceivableBank'
import OfflineDescription from './OfflineDescription'
export default {
  components: {
    ReceivableBank,
    OfflineDescription
  },
  data() {
    const i18n_lang = this.$t('receivableBank');
    return {
      i18n_lang: i18n_lang,
      curTab: 'ReceivableBank'
    }
  }
}
</script>
