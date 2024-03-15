<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartPie',
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
      let legend = this.value.map(_ => _.name)
      let option = {
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            label: {
              show: true,
              position: 'inner',
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
    this.$nextTick(() => {})
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
