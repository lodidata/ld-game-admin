<template>
  <div class="header-bar">
    <SiderTrigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"/>
    <div class="notice">
      <slot name="notice"></slot>
    </div>
    <div class="right">
      <div class="hint">
        <slot name="hint"></slot>
      </div>
      <div class="custom-content-con">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import SiderTrigger from './SiderTrigger'
import './index.less'
export default {
  name: 'HeaderBar',
  components: {
    SiderTrigger
  },
  props: {
    collapsed: Boolean
  },
  methods: {
    handleCollpasedChange(state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>
