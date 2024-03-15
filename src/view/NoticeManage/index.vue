<template>
  <div id="NoticeManage" class="card">
    <Tabs v-model="curTab">
      <TabPane :label="i18n_lang.noticeManage0" name="notice">
        <Notice v-if="curTab === 'notice'" ref="notice"></Notice>
      </TabPane>
      <!-- <TabPane :label="i18n_lang.noticeManage1" name="room">
        <Room v-if="curTab === 'room'" ref="room"></Room>
      </TabPane> -->
      <Button slot="extra" type="primary" icon="md-add" @click="handleOpenModal">{{ addText }}</Button>
    </Tabs>
  </div>
</template>
<script>
import Notice from './Notice'
import Room from './Room'
export default {
  components: {
    Notice,
    Room
  },
  data() {
    const i18n_lang = this.$t('noticeManage');
    return {
      i18n_lang: i18n_lang,
      curTab: 'notice'
    }
  },
  computed: {
    addText() {
      return this.curTab === 'notice' ? this.i18n_lang.noticeManage2 : this.i18n_lang.noticeManage3
    }
  },
  methods: {
    handleOpenModal() {
      if (this.curTab === 'notice') {
        this.$refs.notice.handleOpenModal()
      } else {
        this.$refs.room.handleOpenModal()
      }
    }
  }
}
</script>
