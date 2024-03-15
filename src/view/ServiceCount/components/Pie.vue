<template>
  <div id="TCpie">
    <div v-if="!isShowText" :id="id" :style="`width:${width}px;height:${height}px;`"></div>
    <span v-if="isShowText">{{i18n_lang.serviceCount13}}</span>
  </div>
</template>
<script>
const echarts = require('echarts')
export default {
  props: {
    //  数据项
    optionData: {
      type: Array,
      default: () => {
        return []
      }
    },
    width: Number,
    height: Number,
    // 类型项
    typeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    id: String
  },
  data() {
    const i18n_lang = this.$t('serviceCount');
    return {
      i18n_lang: i18n_lang,
      isShowText: false
    }
  },
  watch: {
    optionData: {
      handler: function(val, oldVal) {
        this.isShowText = false
        if (!this.optionData.length) {
          this.isShowText = true
        } else {
          this.$nextTick(() => {
            this.drawEchar()
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    drawEchar() {
      var myChart = echarts.init(document.getElementById(this.id))
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.typeData
        },
        series: [
          {
            name: '当前占比',
            type: 'pie',
            radius: '60%',
            center: ['50%', '60%'],
            data: this.optionData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.$nextTick(() => {
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      })
    }
  }
}
</script>
<style lang="less" scoped>
#TCpie {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
