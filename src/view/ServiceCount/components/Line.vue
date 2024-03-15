<template>
  <div id="TCLine">
    <div v-if="!isShowText" :id="id" :style="`width:${width};height:${height};`"></div>
    <span v-if="isShowText">{{i18n_lang.serviceCount13}}</span>
  </div>
</template>
<script>
const echarts = require('echarts')
export default {
  props: {
    // 数据项
    optionData: {
      type: Array,
      dafault: () => {
        return []
      }
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String
      // default: ''
    },
    // 类型项
    typeData: {
      type: Array,
      dafault: []
    },
    xData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // yData: {
    //   type: Array,
    //   default: []
    // },
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

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.typeData
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData
        },
        yAxis: {
          // type: 'category',
          // boundaryGap: false,
          // data: this.yData
          type: 'value'
        },
        series: this.optionData
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="less" scoped>
#TCLine {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
