<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'echarts_line',
  props: {
    lineNmuber: {
      type: Object,
      default: () => {
        return {
          field: 'online',
          type: 'minute'
        }
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    const i18n_lang = this.$t('home');
    return {
      i18n_lang: i18n_lang,
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    echartsFn(arrar_one, arrar_two){
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          top: '3%',
          left: '1.2%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#FBFBFB',//左边线的颜色
                width:'1'//坐标线的宽度
              }
            },
            axisLabel: {
              textStyle:{
                color:'#FBFBFB'
              }
            },
            data: arrar_one
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              textStyle:{
                color:'#FBFBFB'
              }
            },
            splitLine:{
              lineStyle: {
                type: 'solid',
                color: '#32353D'
              }
            }
          }
        ],
        series: arrar_two
      }
      this.dom = echarts.init(this.$refs.dom)
      this.dom.clear()
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    }
  },
  watch: {
    data: {
      handler(newValue, oldValue){
        if(newValue.today.list){
          let arrar_one = [], arrar_two = [], arrar_three = [], arrar_four = [], arrar_five = [], arrar_six = []
          newValue.today.list.forEach((item, index) => {
            if(newValue.today.list.length > newValue.yesterday.list.length || this.lineNmuber.type == 'day'){
              arrar_one.push(item.day)
            }
            arrar_two.push(item[this.lineNmuber.field])
          })
          if(this.lineNmuber.type != 'day'){
            newValue.yesterday.list.forEach((item, index) => {
              if(newValue.today.list.length <= newValue.yesterday.list.length){
                arrar_one.push(item.day)
              }
              arrar_three.push(item[this.lineNmuber.field])
            })
            newValue.lastweek.list.forEach((item, index) => {
              // if(newValue.today.list.length > newValue.yesterday.list.length || this.lineNmuber.type == 'day'){
              //   arrar_one.push(item.day)
              // }
              arrar_five.push(item[this.lineNmuber.field])
            })
          }
          arrar_four.push({
            name: this.i18n_lang.home27,//今日
            type: 'line',
            symbol:'none',
            color:['#0066FF'],
            data: arrar_two
          })
          if(this.lineNmuber.type != 'day'){
            arrar_four.push({
              name: this.i18n_lang.home28,//昨日
              type: 'line',
              symbol:'none',
              color:['#FF9900'],
              data: arrar_three
            })
          }
          arrar_four.push({
            name: `${this.i18n_lang.home117_v1_2_4_9}`,//上周平均
            type: 'line',
            symbol:'none',
            color:['#339966'],
            data: arrar_five
          })
          arrar_one = Array.from(new Set(arrar_one))
          this.echartsFn(arrar_one, arrar_four)
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
