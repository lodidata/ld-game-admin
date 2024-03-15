<template>
  <div id="MoreOptionCheck">
    <Spin v-if="loading" size="large" fix></Spin>
    <div>
      <span v-if="!checked.length">{{ missTxt }}</span>
      <Tag
        v-for="(it, i) in checked"
        :key="i"
        closable
        :color="getColor(it)"
        @on-close="handleRemove(it)"
      >
        {{ showLabel(it) || it }}
      </Tag>
      <Row style="margin-top:10px">
        <Button size="small" :disabled="!optionData.length" @click="handleOpenEdit">
          {{i18n_lang.components160}}{{ !optionData.length ? i18n_lang.components161 : '' }}
        </Button>
      </Row>
    </div>
    <Modal id="chekbox-class" v-model="visible" :title="`${i18n_lang.components162}`" :width="width">
      <div v-if="isSingle" class="single-option">
        <RadioGroup
          v-if="optionData.length"
          v-model="radioChecked"
          type="button"
          style="textAlign: center"
          @on-change="handleRadioCheck"
        >
          <Radio v-for="(it, i) in optionData" :key="i" :label="it[optionKey] || it">
            {{ it[optionLabel] || it }}
          </Radio>
        </RadioGroup>
      </div>
      <div v-else class="more-option">
        <div style="check">
          <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll"
          >
            {{i18n_lang.components163}}
          </Checkbox>
        </div>
        <CheckboxGroup v-if="optionData.length" v-model="checked" @on-change="handleCheck">
          <Checkbox v-for="(it, i) in optionData" :key="i" :label="it[optionKey] || it">
            {{ it[optionLabel] || it }}
          </Checkbox>
        </CheckboxGroup>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'MoreOptionCheck',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    isSingle: {
      type: Boolean,
      default: false
    },
    // 所有选项
    optionData: {
      type: Array,
      default: () => []
    },
    // 无选项时，显示的文字
    missTxt: {
      type: String,
      default: '无'
    },
    width: {
      type: Number,
      default: 300
    },
    optionKey: {
      type: String,
      default: ''
    }, // 选项数据的key
    optionLabel: {
      type: String,
      default: ''
    } // 选项数据的Label
  },
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      visible: false,
      checked: this.value,
      radioChecked: this.value.length ? this.value[0] : 0,
      checkAll: false,
      indeterminate: false
    }
  },
  watch: {
    value() {
      this.checked = this.value
      this.radioChecked = this.value.length ? this.value[0] : 0
    }
  },
  methods: {
    // 设置标签颜色，匹配到的数据显示蓝色blue,没有匹配到的数据显示灰色default
    getColor(it) {
      const arr = this.optionData.filter(x => x.name === it || x.id === it)
      return arr.length ? 'blue' : 'default'
    },
    showLabel(key) {
      if (this.optionData.length) {
        if (this.optionKey) {
          const data = this.optionData.filter(x => x[this.optionKey] === key)
          if (data.length) {
            return data[0][this.optionLabel]
          } else {
            return ''
          }
        } else {
          return key
        }
      } else {
        return ''
      }
    },
    // 打开选择modal
    handleOpenEdit() {
      this.visible = true
    },
    // 删除单个标签
    handleRemove(it) {
      this.checked = this.checked.filter(x => x !== it)
      this.handleCheck(this.checked)
    },
    // check 判断是否全选，backData
    handleCheck(data) {
      if (data.length === this.optionData.length) {
        this.indeterminate = false
        this.checkAll = true
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
      this.backData()
    },
    // 全选
    handleCheckAll() {
      this.checkAll = this.indeterminate ? false : !this.checkAll
      this.indeterminate = false

      if (this.checkAll) {
        this.checked = this.optionData.map(x => x[this.optionKey] || x)
      } else {
        this.checked = []
      }
      this.backData()
    },
    // 清空
    handleClear() {
      this.checked = []
      this.indeterminate = false
      this.checkAll = false
    },
    // backData
    backData() {
      this.$emit('input', this.checked)
      this.$emit('onChange', this.checked)
    },
    // 单选
    handleRadioCheck(val) {
      this.checked = [val]
      this.backData()
    }
  }
}
</script>
<style lang="less" scoped>
#MoreOptionCheck {
  background-color: #f8f8f9;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 6px;
}
#chekbox-class {
  .single-option {
    /deep/.ivu-radio-group-button {
      .ivu-radio-wrapper {
        padding: 0 10px;
        min-width: 120px;
        margin-bottom: 5px;
        text-align: center;
      }
    }
  }
  .more-option {
    /deep/.ivu-checkbox-wrapper {
      min-width: 120px;
    }
    .check {
      border-bottom: 1px solid #e9e9e9;
      padding-bottom: 6px;
      margin-bottom: 6px;
    }
  }
}
</style>
