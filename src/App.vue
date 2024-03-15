<template>
  <div id="app">
    <Msg/>
    <RouterView/>
    <audio id="empty_voice"></audio>
  </div>
</template>

<script>
import Msg from '_c/Msg'
export default {
  name: 'App',
  components: {
    Msg
  },
  data() {
    return {
      clickVoice: false
    }
  },
  mounted() {
    document.addEventListener('click', () => {
      if (!this.clickVoice) {
        this.clickVoice = true
        console.log('点击了声音')
        document.getElementById('empty_voice').play()
      }
    })
  }
}
</script>

<style lang="less">
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
// .ivu-table-cell, .ivu-table-cell span{
//   overflow:hidden;
//   text-overflow:ellipsis;
//   display:-webkit-box;
//   -webkit-box-orient:vertical;
//   -webkit-line-clamp:10;
// }
#HomeManage .ivu-date-picker-rel {
  height: 0;
  overflow: hidden;
}
</style>
