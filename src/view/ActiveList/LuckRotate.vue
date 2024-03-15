<template>
  <div v-if="JSON.stringify(circularList) !== '{}'" id="circle0">
    <div id="left">
      <div id="circle2" class="circle-left">{{ circularList['2'] }}</div>
      <div id="circle3" class="circle-left">{{ circularList['3'] }}</div>
      <div id="circle4" class="circle-left">{{ circularList['4'] }}</div>
      <div id="circle5" class="circle-left">{{ circularList['5'] }}</div>
    </div>
    <div id="right">
      <div id="circle9" class="circle-right">{{ circularList['1'] }}</div>
      <div id="circle8" class="circle-right">{{ circularList['8'] }}</div>
      <div id="circle7" class="circle-right">{{ circularList['7'] }}</div>
      <div id="circle6" class="circle-right">{{ circularList['6'] }}</div>
    </div>
    <div class="inner"></div>
  </div>
</template>
<script>
export default {
  name: 'LuckRotate',
  props: {
    circularList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {}
}
</script>

<style lang="less" scoped>
.circle-left {
  width: 160px;
  height: 320px;
  border-radius: 0px 160px 160px 0px;
  position: absolute;
  right: 0;
  transform-origin: 0 50%;
  padding-left: 30px;
  line-height: 120px;
  font-size: 14px;
}
.circle-right {
  width: 160px;
  height: 320px;
  border-radius: 160px 0px 0px 160px;
  position: absolute;
  right: 0;
  transform-origin: 100% 50%;
  padding-left: 97px;
  line-height: 120px;
  font-size: 14px;
}
#circle0 {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background-color: yellowgreen;
  position: relative;
  margin-left: 110px;
  .inner {
    width: 80px;
    height: 80px;
    border: 1px solid #dcdcdc;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -40px;
    margin-top: -40px;
    border-radius: 50%;
    background-color: #fff;
  }
}
#circle2 {
  background-color: #70f3ff;
}
#circle3 {
  background-color: #ff461f;
  transform: rotate(45deg);
}
#circle4 {
  background-color: #bce672;
  transform: rotate(90deg);
}
#circle5 {
  background-color: #ffffff;
  transform: rotate(135deg);
}
#circle6 {
  background-color: #2d8cf0;
  transform: rotate(225deg);
}
#circle7 {
  background-color: #ff2121;
  transform: rotate(270deg);
}
#circle8 {
  background-color: #16a951;
  transform: rotate(315deg);
}
#circle9 {
  background-color: #e0eee8;
  transform: rotate(360deg);
}
#left {
  clip: rect(0px 160px 320px 0px);
  position: absolute;
  right: 0px;
  width: 160px;
  height: 320px;
  overflow: hidden;
}
#right {
  clip: rect(0px 160px 320px 0px);
  position: absolute;
  left: 0px;
  width: 160px;
  height: 320px;
  overflow: hidden;
}
</style>
