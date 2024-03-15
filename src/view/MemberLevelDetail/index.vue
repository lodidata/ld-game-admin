<template>
  <div id="LevelDetail">
    <Button style="margin-bottom:20px" @click="$router.push('memberLevel?back')">
      {{i18n_lang.memberLevelDetail0}}
    </Button>
    <p v-if="!$route.query.id" class="red" style="margin-bottom:20px;">
      {{i18n_lang.memberLevelDetail1}}
    </p>
    <Tabs v-model="curTab">
      <TabPane :label="i18n_lang.memberLevelDetail2" name="LevelSet">
        <LevelSet v-if="curTab === 'LevelSet'"></LevelSet>
      </TabPane>
      <TabPane v-if="$route.query.id" :label="i18n_lang.memberLevelDetail3" name="BackWaterSet">
        <BackWaterSet v-if="curTab === 'BackWaterSet'"></BackWaterSet>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import LevelSet from './LevelSet'
import BackWaterSet from './BackWaterSetting'

export default {
  components: {
    LevelSet,
    BackWaterSet
  },
  data() {
    const i18n_lang = this.$t('memberLevelDetail');
    return {
      i18n_lang: i18n_lang,
      curTab: 'LevelSet'
    }
  }
}
</script>
