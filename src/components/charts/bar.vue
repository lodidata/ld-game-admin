<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartBar',
  props: {
    value: Array,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    echartsFn(){
      let option = {
        series: [
          {
            type: 'pie',
            radius: ['40%', '75%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inner',
            },
            labelLine: {
              show: false
            },
            data: this.value
          }
        ]
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    }
  },
  watch: {
    value: {
      handler(newValue, oldValue){
        if(newValue.length){
          this.echartsFn()
        }
      },
      deep: true
    }
  },
  mounted () {
    this.$nextTick(() => {

    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
