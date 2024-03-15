<template>
  <div>
    <TimePicker
      type="time"
      :open="open"
      class="timer-picker"
      :class="{disabled: disabled}"
      style="width: 168px"
      :disabled="disabled"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
      confirm
      @on-change="handleChange"
      @on-clear="handleClear"
      @on-ok="handleClear"
    >
      <p @click="handleClick">
        <template>
          <div class="timers" tabindex="-1">
            <span v-if="!!timeValue && timeType == 'day'"></span><!-- {{i18n_lang.components260}} -->
            <span v-if="!!timeValue && timeType == 'week'"></span><!-- {{i18n_lang.components261}} -->
            <span v-if="!!timeValue && !timeType">{{i18n_lang.components164}}</span>
            <span>{{ timeValue }}</span>
            <Icon
              type="ios-clock-outline"
              style="float: right; margin-top: 7px; margin-right: 5px;font-size: 14px;"
            ></Icon>
          </div>
        </template>
      </p>
    </TimePicker>
  </div>
</template>
<script>
export default {
  name: 'BackWaterTimePicker',
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    timeType: {
      type: String,
      default: ''
    },
    disabledMinutes: {
      type: Array,
      default: function() {
        return []
      }
    },
    disabledSeconds: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      open: false,
      timeValue: ''
    }
  },
  watch: {
    disabled(val) {
      if (val) {
        this.open = false
      }
    },
    value(val) {
      this.timeValue = val
    }
  },
  created() {
    this.timeValue = this.value
  },
  methods: {
    /**
     * 弹出时间选择器
     */
    handleClick() {
      if (this.disabled) return
      this.open = !this.open
    },
    /**
     * 改变时间
     */
    handleChange(time) {
      this.timeValue = time
      this.$emit('changeTime', this.timeValue)
    },
    /**
     * 关闭时间选择器
     */
    handleClear() {
      this.open = false
    }
  }
}
</script>

<style lang="less" scoped>
.timer-picker {
  &.disabled {
    cursor: not-allowed;
    .timers {
      color: #ccc;
      background-color: #f3f3f3;
      border: 1px solid #dddee1;
      &:focus {
        border: 1px solid #dddee1;
      }
    }
  }
  .timers {
    width: 168px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    border: 1px solid #dddee1;
    transition: all 0.2s;
    text-align: center;
    font-size: 12px;
    &:focus {
      border: 1px solid #2d8cf0;
    }
  }
}
</style>
