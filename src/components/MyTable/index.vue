<template>
  <div id="MyTable" style="margin-top:30px">
    <CheckboxGroup
      v-if="filter"
      v-model="filterOpt.checked"
      style="marginBottom:10px"
      @on-change="filterCheck"
    >
      <Checkbox
        v-for="(it, i) in filterOpt.checkList"
        :key="i"
        :label="it.label"
        :disabled="it.require"
      >{{ it.name }}</Checkbox>
    </CheckboxGroup>
    <Table
      :id="id"
      :border="border"
      :stripe="stripe"
      :row-class-name="getRowClassName"
      :columns="handleColumns"
      :data="handleData"
      :loading="loading"
      :row-key="rowKey"
      :no-data-text="`${i18n_lang.components173}`"
      @on-sort-change="sortTableFn"
      @on-select="handleSelect"
      @on-select-cancel="handleCancel"
      @on-select-all="handleSelectAll"
      @on-select-all-cancel="handleSelectAll"
    ></Table>
  </div>
</template>
<script>
const editButton = (Vue, h, params) => {
  return h('Button', {
    props: {
      type: 'text',
      icon: 'edit',
      size: 'small'
    },
    on: {
      click: () => {
        Vue.handleData[params.index]._editting[params.column.key] = true
        Vue.handleData = JSON.parse(JSON.stringify(Vue.handleData))
        if (Vue.combinerow) {
          Vue.handleRowspan()
        }
      }
    }
  })
}
const saveButton = (Vue, h, params) => {
  return h('Button', {
    props: {
      type: 'text',
      icon: 'checkmark-round',
      size: 'small'
    },
    on: {
      click: () => {
        const oldd = Vue.handleData[params.index][params.column.key]
        const newd = Vue.data[params.index][params.column.key]
        if (oldd === newd) {
          Vue.handleData[params.index]._editting[params.column.key] = false
          if (Vue.combinerow) {
            Vue.handleRowspan()
          }
          return
        }
        Vue.$emit('editChange', newd, params.column.key, params.row)
      }
    }
  })
}
const editInput = (Vue, h, params, type = 'text') => {
  const old = Vue.handleData[params.index][params.column.key]
  return h('Input', {
    props: {
      type,
      value: old
    },
    on: {
      'on-change'(e) {
        Vue.data[params.index][params.column.key] = e.target.value
      }
    }
  })
}

const readText = (Vue, h, text = '') => {
  let t = text
  if (typeof text === 'string') {
    t = text.replace(/\n/g, '<br />')
  }
  return h('div', {
    style: {
      textAlign: 'center'
    },
    domProps: {
      innerHTML: t
    }
  })
}

export default {
  name: 'MyTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    },
    // 是否强制设置row-key,设置为true可避免合并单元格表单切换时显示不正常的问题
    rowKey: {
      type: Boolean,
      default: false
    },
    // 是否启用筛选
    filter: {
      type: Boolean,
      default: false
    },
    // 是否可以编辑单个
    editting: {
      type: Boolean,
      default: false
    },
    // 是否有合并单元格（行）
    combinerow: {
      type: Boolean,
      default: false
    },
    // 会传多选参数
    checkboxKey: {
      type: Boolean,
      default: false
    },
    // 一个路由有多个表格时，通过key来区别需要记录的localStroga key
    ikey: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    getRowClassName: {
      type: Function,
      default() {
        return null
      }
    },
    checkedKey: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      id: 'myTable' + Date.now(),
      handleColumns: [], // 处理后的columns
      handleData: [], // 处理后的Data
      // 筛选
      filterOpt: {
        checkSort: [], // 默认排序
        checkList: [], // 全部
        checked: [] // 选中
      }
    }
  },
  mounted() {
    this.$nextTick(()=>{})
  },
  watch: {
    data: {
      handler() {
        this.init()
      },
      immediate: true
    }
  },
  methods: {
    init() {
      if (this.filter) {
        this.handleFilter()
      } else {
        this.handleColumns = this.columns
      }

      if (this.editting) {
        this.handleEdit()
      } else {
        this.handleData = JSON.parse(JSON.stringify(this.data))
      }

      if (this.combinerow) {
        this.handleRowspan()
      }
    },
    /**
     * 有合并单元格行 columns -> row_span
     */
    handleRowspan() {
      function tdSetRowspan(dom, combineRowNum) {
        if (dom.tagName === 'TD') {
          dom.setAttribute('rowspan', combineRowNum)
        } else {
          tdSetRowspan(dom.parentElement, combineRowNum)
        }
      }
      function tdDeleteRowspan(dom) {
        if (dom.tagName === 'TD') {
          dom.parentElement.removeChild(dom)
        } else {
          tdDeleteRowspan(dom.parentElement)
        }
      }
      this.$nextTick(() => {
        const combineRowDom = document.querySelectorAll(`[combinerow]`)
        const deleteCombineRowDom = document.querySelectorAll(`[deletecombinerow]`)
        if (!combineRowDom) {
          return false
        } else {
          for (let i = 0; i < combineRowDom.length; i++) {
            const combineRowDomNum = combineRowDom[i].getAttribute('combinerow')
            if (combineRowDomNum) {
              tdSetRowspan(combineRowDom[i], combineRowDom[i].getAttribute('combinerow'))
            }
          }
          for (let i = 0; i < deleteCombineRowDom.length; i++) {
            tdDeleteRowspan(deleteCombineRowDom[i])
          }
        }
      })
    },
    /**
     * 可修改表格 columns -> edit
     */
    // 处理表格容器数据
    handleEdit() {
      this.handleData = JSON.parse(JSON.stringify(this.data))
      this.handleData.map((x, i) => {
        if (!x._editting) {
          x._editting = {
            value: ''
          }
        }
      })
      this.handleColumns.map((col, i) => {
        if (col.myExt && col.myExt.editTxt) {
          if (!col.renderFn) {
            col.render = (h, params) => {
              if (params.column.myExt.editTxt instanceof Function) {
                const state = params.column.myExt.editTxt(params.row)
                if (!state) {
                  return <p>{params.row[params.column.key]}</p>
                } else {
                  return h('Row', [
                    h(
                      'Col',
                      {
                        props: {
                          span: '20'
                        }
                      },
                      [
                        !this.handleData[params.index]._editting[params.column.key]
                          ? readText(this, h, params.row[params.column.key])
                          : editInput(this, h, params, col.myExt.inputType)
                      ]
                    ),
                    h(
                      'Col',
                      {
                        props: {
                          span: '2'
                        }
                      },
                      [
                        !this.handleData[params.index]._editting[params.column.key]
                          ? editButton(this, h, params)
                          : saveButton(this, h, params)
                      ]
                    )
                  ])
                }
              } else {
                return h('Row', [
                  h(
                    'Col',
                    {
                      props: {
                        span: '20'
                      }
                    },
                    [
                      !this.handleData[params.index]._editting[params.column.key]
                        ? readText(this, h, params.row[params.column.key])
                        : editInput(this, h, params, col.myExt.inputType)
                    ]
                  ),
                  h(
                    'Col',
                    {
                      props: {
                        span: '2'
                      }
                    },
                    [
                      !this.handleData[params.index]._editting[params.column.key]
                        ? editButton(this, h, params)
                        : saveButton(this, h, params)
                    ]
                  )
                ])
              }
            }
          } else {
            col.render = (h, params) =>
              col.renderFn(h, params, this, { editInput, editButton, saveButton })
          }
        }
      })
    },

    /**
     * 表格筛选 filter
     */
    handleFilter() {
      // opt
      const checkList = this.columns.map((x, i) => ({
        name: x.title,
        label: x.myExt ? x.myExt.label : i,
        require: x.myExt ? x.myExt.require : false,
        visible: x.myExt ? x.myExt.visible : false
      }))
      const checkSort = checkList.map((x, i) => x.label || i)
      const checked = checkList.filter((x, i) => x.visible !== false).map(x => x.label)
      const localCheck = window.localStorage.getItem(`check_${this.$route.path}${this.ikey}`)
      this.filterOpt.checkList = checkList
      this.filterOpt.checkSort = checkSort
      this.filterOpt.checked = localCheck ? localCheck.split(',') : checked
      this.filterCheck()
    },
    filterCheck() {
      // data
      const showData = []
      if(this.checkedKey.length && !window.localStorage.getItem('check_/cash/getOutCheck')){
        if(this.filterOpt.checked.indexOf('selection')  === -1){
          this.filterOpt.checked.unshift('selection')
        }
      }
      const showCheckSort = this.filterOpt.checkSort.filter(x => ~this.filterOpt.checked.indexOf(x))
      this.columns.forEach((x, i) => {
        if (x.myExt && ~showCheckSort.indexOf(x.myExt.label)) {
          showData.push(x)
        }
      })
      window.localStorage.setItem(
        `check_${this.$route.path}${this.ikey}`,
        this.filterOpt.checked.toString()
      )
      this.handleColumns = showData
      if(this.checkboxKey){
        this.$emit('checkboxKeyFn', this.filterOpt.checked)
      }
    },
    handleSelect(slection, row){
      this.$emit('handleSelect', row)
    },
    handleCancel(slection, row){
      this.$emit('handleCancel', row)
    },
    handleSelectAll(slection){
     this.$emit('handleSelectAll', slection)
    },
    sortTableFn(even){
      this.$emit('sortTable', even)
    }
  }
}
</script>
