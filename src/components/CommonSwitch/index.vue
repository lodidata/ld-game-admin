<template>
  <span tabindex="0" :class="wrapClasses" @click="toggle" @keydown.space="toggle">
    <input type="hidden" :name="name" :value="currentValue" />
    <span :class="innerClasses">
      <slot v-if="currentValue === trueValue" name="open"></slot>
      <slot v-if="currentValue === falseValue" name="close"></slot>
    </span>
  </span>
</template>
<script>
import Emitter from './emitter'

const prefixCls = 'ivu-switch'

export default {
  name: 'CommonSwitch',
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      validator(value) {
        return ['large', 'small', 'default'].includes(value)
      },
      default() {
        return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size
      }
    },
    name: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: ''
    },
    beforeChange: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  computed: {
    wrapClasses() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-checked`]: this.currentValue === this.trueValue,
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-loading`]: this.loading
        }
      ]
    },
    innerClasses() {
      return `${prefixCls}-inner`
    }
  },
  watch: {
    value(val) {
      if (val !== this.trueValue && val !== this.falseValue) {
        throw new Error('Value should be trueValue or falseValue.')
      }
      this.currentValue = val
    }
  },
  methods: {
    toggle(event) {
      event.preventDefault()
      if (this.disabled || this.loading) {
        return false
      }
      if (this.beforeChange) {
        this.beforeChange(this.confirmText).then(result => {
          if (result) {
            this.change()
          } else {
            return false
          }
        })
      } else {
        this.change()
      }
    },
    change() {
      const checked = !this.currentValue
      this.currentValue = checked
      this.$emit('input', checked)
      this.$emit('on-change', checked)
      this.dispatch('FormItem', 'on-form-change', checked)
    }
  }
}
</script>
