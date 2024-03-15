<template>
  <div class="list">
    <ul class="mainheader tabs">
      <li
        :class="{ active: active.listTab === 'waitReceive' }"
        @click="tabChange('waitReceive')"
      >{{i18n_lang.serviceWorkbench22}}({{ waitingList.length }})</li>
      <li
        :class="{ active: active.listTab === 'receiving' }"
        @click="tabChange('receiving')"
      >{{i18n_lang.serviceWorkbench23}}({{ pendingList.length }})</li>
      <li
        :class="{ active: active.listTab === 'endReceive' }"
        @click="tabChange('endReceive')"
      >{{i18n_lang.serviceWorkbench24}}({{ closeList.length }})</li>
    </ul>
    <ul ref="leftChatContainer" class="list-main">
      <!-- 待接待 -->
      <li v-if="active.listTab === 'waitReceive'">
        <div
          v-for="(it, i) in waitingList"
          :key="i"
          class="list-main-item"
          :class="{ active: client && client.imUserId === it.imUserId && active.chat === `waitReceive-${i}` }"
          @click.stop="getReceivingMsg(it, i, 'waitReceive')"
        >
          <p>
            <span>{{ it.nickname }}</span>
            <span class="time">{{ (it.date || new Date()) | dateFmt }}</span>
          </p>
          <div class="waitDown">
            <div class="red">{{ it.typeName || i18n_lang.serviceWorkbench25 }}</div>
            <p v-if="it.msgs.length" class="desc">{{ it.msgs[0] | msgFilter }}</p>
            <div>
              <Button type="primary" size="small" @click.stop="receivingOperate(it)">{{i18n_lang.serviceWorkbench26}}</Button>
            </div>
          </div>
        </div>
        <div v-if="waitingList.length === 0" class="noUser">
          <div>
            <img src="@/assets/images/service/jrdx.png" alt>
          </div>
          <div>{{i18n_lang.serviceWorkbench27}}</div>
        </div>
      </li>
      <!-- 接待中 -->
      <li v-if="active.listTab === 'receiving'">
        <div
          v-for="(it, i) in pendingList"
          :key="i"
          class="list-main-item"
          :class="{ active: client && client.imUserId === it.imUserId && active.chat === `receiving-${i}`}"
          @click.stop="getReceivingMsg(it, i, 'receiving')"
        >
          <p>
            <span>{{ it.nickname }}</span>
            <span class="time">{{ (it.date || new Date()) | dateFmt }}</span>
          </p>
          <div class="msg-info">
            <div class="red">{{ it.typeName || i18n_lang.serviceWorkbench25 }}</div>
            <p class="desc">{{ it | descFilter }}</p>
            <Badge v-if="it.unReadMsgCount" :count="it.unReadMsgCount" overflow-count="99"></Badge>
          </div>
        </div>
        <div v-if="pendingList.length === 0" class="noUser">
          <div>
            <img src="@/assets/images/service/gtyh.png" alt>
          </div>
          <div>{{i18n_lang.serviceWorkbench28}}</div>
        </div>
      </li>
      <!-- 已结束 -->
      <li v-if="active.listTab == 'endReceive'">
        <div
          v-for="(it, i) in closeList"
          class="list-main-item"
          :key="i"
          :class="{ active: client && client.imUserId === it.imUserId && active.chat === `endReceive-${i}` }"
          @click.stop="getReceivingMsg(it, i, 'endReceive')"
        >
          <p>
            <span>{{ it.nickname }}</span>
            <span class="time">{{ (it.date || new Date()) | dateFmt }}</span>
          </p>
          <div class="msg-info">
            <div class="red">{{ it.typeName || i18n_lang.serviceWorkbench25 }}</div>
            <p class="desc">{{ it.content }}</p>
          </div>
        </div>
        <div v-if="closeList.length === 0" class="noUser">
          <div>
            <img src="@/assets/images/service/fqhh.png" alt>
          </div>
          <div>{{i18n_lang.serviceWorkbench29}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    CMD: {
      type: Object,
      default: () => {}
    },
    waitingList: {
      type: Array,
      default: () => []
    },
    pendingList: {
      type: Array,
      default: () => []
    },
    closeList: {
      type: Array,
      default: () => []
    },
    client: {
      type: Object,
      default: null
    }
  },
  filters: {
    msgFilter(str) {
      try {
        const obj = JSON.parse(str)
        return obj.text
      } catch (error) {
        return ''
      }
    },
    descFilter(it) {
      if (it.lastUnReadMsg) {
        const msg = it.lastUnReadMsg.msg
        return msg.bigImgUrl ? this.i18n_lang.serviceWorkbench30 : msg.text
      } else {
        return it.content
      }
    }
  },
  data() {
    const i18n_lang = this.$t('serviceWorkbench');
    return {
      i18n_lang: i18n_lang,
      sendMask: false,
      active: {
        listTab: 'waitReceive',
        infoTab: 'info',
        chat: '',
        dateFmt: ''
      }
    }
  },
  watch: {
    pendingList(val) {
      if (val && val.length) {
        if (this.client) {
          const client = val.find(o => o.imUserId === this.client.imUserId)
          if (!client) this.$emit('updateData', 'client', null)
        }
      } else {
        this.$emit('updateData', 'client', null)
      }
    }
  },
  mounted() {
    const window_height = document.body.clientHeight
    const left_top = this.$refs.leftChatContainer.offsetTop
    const left_height = window_height - left_top - 156
    this.$refs.leftChatContainer.style.height = left_height + 'px'
  },
  methods: {
    // tab切换
    tabChange(val) {
      this.active.listTab = val
      this.$emit('updateData', 'tipsMsg', true)
    },
    // 接待操作
    receivingOperate(item) {
      this.$Modal.confirm({
        title: this.i18n_lang.serviceWorkbench31,
        content: `${this.i18n_lang.serviceWorkbench32}${item.nickname}${this.i18n_lang.serviceWorkbench33}`,
        onOk: async () => {
          this.$emit('updateData', 'audioFlag', true)
          this.$emit('handleRequestEvent', 'receiveUser', {
            receptionImUserId: item.imUserId
          })
          this.active.listTab = 'receiving'

          // 保存接待客户，接待成功后自动转接
          this.$emit('updateData', 'waitClient', item)
        },
        onCancel: () => {}
      })
    },
    // 获取接待消息
    getReceivingMsg(item, i, type) {
      this.active.chat = `${type}-${i}`
      this.$emit('setTipsMsg', true)
      this.$emit('updateData', 'sendMaskStatus', type !== 'receiving')
      // 设置当前接待用户
      item.unReadMsgCount = 0
      this.$emit('updateData', 'client', item)
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./leftChatList.less');
</style>
