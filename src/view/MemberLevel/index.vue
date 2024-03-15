<template>
  <div id="MemberLevel">
    <Tabs v-model="curTab" name="tab1">
      <TabPane :label="i18n_lang.memberLevel0" name="level" tab="tab1"> <Level v-if="curTab === 'level'"></Level> </TabPane>
    </Tabs>
  </div>
</template>
<script>
import Level from './level'

export default {
  components: {
    Level
  },
  data() {
    const i18n_lang = this.$t('memberLevel');
    return {
      i18n_lang: i18n_lang,
      curTab: 'level'
    }
  }
}
</script>
