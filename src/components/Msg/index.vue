<template>
  <div v-if="msgList.length" id="Msg"></div>
</template>
<script>
export default {
  name: 'Msg',
  computed: {
    msgList() {
      const msgList = this.$store.state.app.msgList
      if (msgList.length) {
        const msg = msgList[0]
        if (msg.type === 'error') {
          this.$Message.error(msg.message)
        } else if (msg.type === 'success') {
          this.$Message.success(msg.message)
        }
        this.$store.commit('app/removeMsg')
      }
      return msgList
    }
  }
}
</script>
