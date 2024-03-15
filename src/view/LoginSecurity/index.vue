<template>
  <div id="LoginSecurity" style="width: 100%">
    <Tabs v-model="curTab" style="overflow: hidden">
      <TabPane :label="i18n_lang.loginSecurity0" name="code">
        <GoogleCode v-if="curTab === 'code'"></GoogleCode>
      </TabPane>
      <TabPane :label="i18n_lang.loginSecurity1" name="ip">
        <IpWhiteList v-if="curTab === 'ip'"></IpWhiteList>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import IpWhiteList from './ipWhiteList'
import GoogleCode from './googleCode'
export default {
  components: {
    IpWhiteList,
    GoogleCode
  },
  data() {
    const i18n_lang = this.$t('loginSecurity');
    return {
      i18n_lang: i18n_lang,
      curTab: 'code'
    }
  }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
