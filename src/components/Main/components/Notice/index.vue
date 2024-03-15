<template>
  <div class="notice-box">
    <Marquee :repeat="5" :duration="notices.length * 10">
      <span
        v-for="(item, i) in notices"
        :key="i"
        class="custom-notice"
        @click="handleNoticeDetail(item)"
      >
{{ item.title }}
</span>
    </Marquee>
  </div>
</template>
<script>
import Marquee from './Marquee'
export default {
  name: 'Notice',
  components: {
    Marquee
  },
  props: ['notices'],
  data() {
    return {}
  },
  methods: {
    handleNoticeDetail(notice) {
      this.$store.commit('common/setNotice', notice)
    }
  }
}
</script>
<style lang="less" scope>
@import './index.less';
</style>
