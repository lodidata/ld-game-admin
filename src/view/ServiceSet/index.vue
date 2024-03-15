<template>
  <div id="ServiceSet">
    <Tabs :animated="false" @on-click="tabClick">
      </TabPane>
      <TabPane :label="i18n_lang.serviceSet0" name="ServiceManage" class="tab_box">
        <ServiceManage v-if="curTab=='ServiceManage'"></ServiceManage>
      </TabPane>
      <TabPane :label="i18n_lang.serviceSet1" name="QuesType" class="tab_box">
        <QuesType v-if="curTab=='QuesType'"></QuesType>
      </TabPane>
      <TabPane :label="i18n_lang.serviceSet2" name="Welcome" class="tab_box">
        <Welcome v-if="curTab=='Welcome'"></Welcome>
      </TabPane>
      <!-- <TabPane label="超时回复设置" name="Base" class="tab_box">
        <Base v-if="curTab=='Base'"></Base>
      </TabPane> -->
    </Tabs>
  </div>
</template>
<script>
import QuesType from './QuesType'
import ServiceManage from './ServiceManage'
import Welcome from './Welcome'
export default {
  components: {
    QuesType,
    ServiceManage,
    Welcome
  },
  data() {
    const i18n_lang = this.$t('serviceSet');
    return {
      i18n_lang: i18n_lang,
      curTab: 'ServiceManage'
    }
  },
  methods: {
    tabClick(i) {
      this.curTab = i
    }
  }
}
</script>
