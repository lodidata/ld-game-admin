<template>
    <div ref="dom"></div>
  </template>
  
  <script>
  import echarts from 'echarts'
  import { on, off } from '@/libs/tools'
  export default {
    name: 'echarts_line',
    props: {
    //   lineNmuber: {
    //     type: Object,
    //     default: () => {
    //       return {
    //         field: 'online',
    //         type: 'minute'
    //       }
    //     }
    //   },
      data: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
    //   const i18n_lang = this.$t('home');
      return {
        // i18n_lang: i18n_lang,
        dom: null
      }
    },
    // comments: {
    //   keysList() {
    //     return this.data.keys()
    //   },
    //   seriesList() {
    //     return this.keysList.map(item => {
    //         const money = this.data[item].map(i => {
    //           return i.money
    //         })
    //         const obj = {
    //           "name": item,
    //           "type": 'line',
    //           "stack": stack,
    //           "stack": money
    //         }
    //         console.log(obj)
    //         return obj
    //     });
    //   }
    // },
    methods: {
      resize () {
        this.dom.resize()
      },
      echartsFn(arrar_one, arrar_two){
        const option = {
            title: {
                text: '月结账单统计数据（多种货币折线）'
            },
            tooltip: {
                trigger: 'axis'
            },
            // legend: {
            //     data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
            // },
            grid: {
                left: '3%',
                right: '6%',
                right: '6%',
                bottom: '3%',
                containLabel: true
            },
            // toolbox: {
            //     feature: {
            //         // saveAsImage: {}
            //     }
            // },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                data: arrar_one
            },
            yAxis: {
                type: 'value'
            },
            // series: [
            //     {
            //         name: 'Email',
            //         type: 'line',
            //         stack: 'Total',
            //         data: [120, 132, 101, 134, 90, 230, 210]
            //     },
            //     {
            //         name: 'Email',
            //         type: 'line',
            //         stack: 'Total',
            //         data: [120, 132, 101, 134, 90, 230, 210]
            //     },
            //     {
            //         name: 'Email',
            //         type: 'line',
            //         stack: 'Total',
            //         data: [120, 132, 101, 134, 90, 230, 210]
            //     },
            // ]
            series: arrar_two
        }
        this.dom = echarts.init(this.$refs.dom)
        this.dom.clear()
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      },
    },
    watch: {
      data: {
        handler(newValue, oldValue) {
          let arrar_one = []
          let arrar_two = []
          // console.log(newValue)
          const keysList = Object.keys(newValue)
          keysList.forEach(item => {
            const settlement = newValue[item].map(i => {
              return i.settlement
            })
            const obj = {
              "name": item,
              "type": 'line',
              // "stack": 'Total',
              "data": settlement
            }
            arrar_two.push(obj)
          })

          arrar_one =  newValue[keysList[0]].map(i => {
            return i.end_month_day
          })
          console.log(arrar_one)
          console.log(arrar_two)
          this.echartsFn(arrar_one, arrar_two)
        },
        deep: true
      }
    },
    mounted () {
      this.$nextTick(() => {
        // this.echartsFn()
      })
    },
    beforeDestroy () {
      off(window, 'resize', this.resize)
    }
  }
  </script>
  