<template>
  <div class="notice-detail">
    <Modal
      :value="!!notice"
      :width="500"
      :title="i18n_lang.components20"
      :footer-hide="true"
      class="modal"
      @on-visible-change="visibleChangle"
    >
      <p class="row">
        <span>{{i18n_lang.components21}}</span>
        {{ notice.title }}
      </p>
      <p class="row">
        <span>{{i18n_lang.components22}}</span>
        {{ notice.menu_name }}-{{ notice.game_name }}
      </p>
      <p class="row">
        <span>{{i18n_lang.components23}}</span>
        {{ notice.start_time }}
      </p>
      <p class="row">
        <span>{{i18n_lang.components24}}</span>
        {{ notice.end_time }}
      </p>
      <p class="row">
        <span>{{i18n_lang.components25}}</span>
        <span v-html="notice.content"></span>
      </p>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'Notice',
  props: ['notice'],
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang
    }
  },
  methods: {
    visibleChangle(visible) {
      if (!visible) {
        this.$store.commit('common/setNotice', '')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.notice-detail {
  .row {
    span:nth-child(1) {
      display: inline-block;
      margin-right: 10px;
      width: 80px;
      height: 30px;
      text-align: right;
    }
  }
}
</style>
