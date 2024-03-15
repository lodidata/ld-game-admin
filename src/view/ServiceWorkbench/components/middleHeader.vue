<template>
  <div class="mainheader userhandle">
    <p v-if="client" class="user">
      <Avatar shape="square" icon="ios-person" style="background-color:#2d8cf0;"/>
      <span class="client-name">{{ client.imUserId }}</span>
      <span class="client-question">&lt;{{i18n_lang.serviceWorkbench63}}{{ client.typeName || i18n_lang.serviceWorkbench64 }}&gt;</span>
    </p>
    <div class="handles">
      <Button v-if="!sendMaskStatus && client" type="error" @click="endReceiving">{{i18n_lang.serviceWorkbench65}}</Button>
    </div>
  </div>
</template>

<script>
import Hashids from 'hashids'

export default {
  props: {
    client: {
      type: Object,
      default: null
    },
    sendMaskStatus: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const i18n_lang = this.$t('serviceWorkbench');
    return {
      i18n_lang: i18n_lang,
    }
  },
  methods: {
    // 结束会话
    endReceiving() {
      this.$emit('endReceiving')
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./middleHeader.less');
</style>
