<template>
  <div id="ThirdDetailBox" class="card">
    <Tabs v-model="curTab">
      <TabPane :label="`${i18n_lang.newThirdPayment0}`" name="Channel" class="tab_box">
        <Channel v-if="curTab === 'Channel'"></Channel>
      </TabPane>
      <TabPane :label="`${i18n_lang.newThirdPayment1}`" name="Aisle" class="tab_box">
        <Aisle v-if="curTab === 'Aisle'"></Aisle>
      </TabPane>
      <!-- <TabPane :label="i18n_lang.thirdPayment0" name="Third" class="tab_box">
        <Third v-if="curTab === 'Third'"></Third>
      </TabPane> -->
      <TabPane :label="i18n_lang.thirdPayment1" name="Callback" class="tab_box">
        <Callback v-if="curTab === 'Callback'"></Callback>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import Channel from './Channel'
import Aisle from './Aisle'
// import Third from './Third'
import Callback from './Callback'
export default {
  components: {
    Channel,
    Aisle,
    // Third,
    Callback
  },
  data() {
    const i18n_lang = this.$t('thirdPayment');
    return {
      i18n_lang: i18n_lang,
      curTab: 'Channel'
    }
  }
}
</script>
