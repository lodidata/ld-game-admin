<template>
  <div>
    <Tabs v-model="curTab">
      <TabPane :label="`${i18n_lang.ipRankingList0}`" name="Reg">
        <RegRankingList v-if="curTab === 'Reg'"></RegRankingList>
      </TabPane>
      <TabPane :label="`${i18n_lang.ipRankingList1}`" name="Login">
        <LoginRankingList v-if="curTab === 'Login'"></LoginRankingList>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import RegRankingList from './RegRankingList'
  import LoginRankingList from './LoginRankingList'

  export default {
    components: {
      RegRankingList,
      LoginRankingList
    },
    data() {
      const i18n_lang = this.$t('ipRankingList');
      return {
        i18n_lang: i18n_lang,
        curTab: 'Reg'
      }
    }
  }
</script>

<style lang="less">
</style>
