<template>
  <div>
    <Tabs v-model="curTab">
      <TabPane :label="`${i18n_lang.callCustomerService0}`" name="Itacati">
        <Itacati></Itacati>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import Itacati from './Itacati'
  export default {
    data() {
      const i18n_lang = this.$t('callCustomerService');
      return {
        i18n_lang: i18n_lang,
        curTab: 'Itacati'
      }
    },
    components: {
      Itacati
    }
  }
</script>

<style>
</style>
