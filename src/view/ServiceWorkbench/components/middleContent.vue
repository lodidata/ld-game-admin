<template>
  <div class="content">
    <!-- 聊天窗口头部 -->
    <MiddleHeader :client="client" :sendMaskStatus="sendMaskStatus" @endReceiving="endReceiving"></MiddleHeader>
    <div id="msgLook" ref="msgLook" class="chat">
      <template v-if="client">
        <div class="history-msg">
          <div v-if="loading === 0" class="spin">
            <img src="@/assets/images/service/loading.png" width="18" height="18" alt />
          </div>
          <div v-else-if="loading === 1" @click="getHistory(true)">{{i18n_lang.serviceWorkbench40}}</div>
          <div v-else>{{i18n_lang.serviceWorkbench41}}</div>
        </div>
        <div v-if="chatMsgList.length > 0" ref="chatRoom" class="chat-room">
          <div v-for="(item, i) in chatMsgList" :key="i" class="sub-room-msg">
            <template v-if="item.msg">
              <!-- 客服 -->
              <template v-if="item.sendUserId === ImInfo.imUserId || item.acceptUserId === client.imUserId">
                <!-- 客服文本 -->
                <div v-if="item.msg.contentType === TYPES.TEXT" class="msg me">
                  <img class="logo" src="@/assets/images/service/kf.png" alt />
                  <div class="me-msg">
                    <span>{{item.date | dateFmt}}</span>
                    <div v-html="toHtml(item.msg.text)"></div>
                  </div>
                </div>
                <!-- 客服图片 -->
                <div v-if="item.msg.contentType === TYPES.PICTURE" class="msg me">
                  <img class="logo" src="@/assets/images/service/kf.png" alt />
                  <div class="me-msg">
                    <span>{{item.date | dateFmt}}</span>
                    <div>
                      <img
                        v-lazy="{src:item.msg.smallImgUrl + '?imageView2/0/w/200/q/50/interlace/1'}"
                        class="preview-img"
                        :large="item.msg.bigImgUrl"
                        @load="setScrollHeight('load')"
                        @click="previewImg(item.msg.smallImgUrl)"
                      />
                    </div>
                  </div>
                </div>
              </template>

              <!-- 客户 -->
              <template v-else>
                <!-- 客户文本消息 -->
                <div v-if="item.msg.contentType === TYPES.TEXT" class="msg user">
                  <img class="logo" src="@/assets/images/service/client.jpg" alt />
                  <div class="user-msg">
                    <span>{{ item.date | dateFmt }}</span>
                    <div v-html="toHtml(item.msg.text)"></div>
                  </div>
                </div>
                <!-- 客户图片消息 -->
                <div v-else-if="item.msg.contentType === TYPES.PICTURE" class="msg user">
                  <img class="logo" src="@/assets/images/service/client.jpg" alt />
                  <div class="user-msg">
                    <span>{{ item.date | dateFmt }}</span>
                    <div>
                      <img
                        v-lazy="{src:item.msg.smallImgUrl + '?imageView2/0/w/200/q/50/interlace/1'}"
                        class="preview-img"
                        :large="item.msg.bigImgUrl"
                        @load="setScrollHeight('load')"
                        @click="previewImg(item.msg.smallImgUrl)"
                      />
                    </div>
                  </div>
                </div>
                <!-- 系统消息 -->
                <div v-else-if="item.msg.contentType === TYPES.HINT" class="system-msg">
                  <p class="time">{{ item.date | dateFmt }}</p>
                  <p class="msg">
                    <span>{{ item.msg.text }}</span>
                  </p>
                </div>
                <!-- 专属客户的系统消息 -->
                <div v-else-if="item.association === client.imUserId" class="system-msg">
                  <p class="time">{{ item.date | dateFmt }}</p>
                  <p class="msg">
                    <span>{{ item.msg.text }}</span>
                  </p>
                </div>
              </template>
            </template>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="noMessage">
          <div>
            <img src="@/assets/images/service/fqhh.png" alt />
          </div>
          <div>{{i18n_lang.serviceWorkbench42}}</div>
        </div>
      </template>
    </div>
    <div class="input-area">
      <div class="util">
        <div class="util-item" @click="openEmoji">
          <Icon type="ios-happy" size="22"></Icon>
        </div>
        <div class="util-item">
          <Upload action :before-upload="handleBeforeUpload">
            <div>
              <Icon type="md-image" size="22"></Icon>
            </div>
          </Upload>
        </div>
        <div class="util-item" @click="screenShotStatus = true">
          <Icon type="ios-cut" size="22"></Icon>
        </div>
        <div class="btn" @click="checkedOtherBtn">
          <Icon type="arrow-swap"></Icon>
          <span>{{i18n_lang.serviceWorkbench43}}</span>
        </div>
      </div>
      <div class="cont" :class="{ active: isShowEmoji }">
        <span v-for="(icon, i) in myEmojis" :key="i" class="emo-img" @click="handleEmoji(icon)">
          <img :src="require(`@/assets/emoji/emoji_res/${icon.name}.png`)" />
        </span>
      </div>
      <div id="messageText" ref="msgTextContainer" class="input" contenteditable="true"></div>
      <div class="btnSend" @click="sendMsgHandle">{{i18n_lang.serviceWorkbench44}}</div>
      <div v-if="sendMaskStatus" class="send-mask"></div>
    </div>

    <!-- 客服转接 -->
    <Modal v-model="otherCustomer" :title="i18n_lang.serviceWorkbench45" :mask-closable="false">
      <p style="text-align:center;width:100%;" v-if="otherServiceList.length === 0">{{i18n_lang.serviceWorkbench46}}</p>
      <RadioGroup v-model="checkedOtherService" vertical v-else>
        <Radio v-for="item in otherServiceList" :key="item.imUserId" :label="item.imUserId">
          <Icon type="person-add" size="20" style="vertical-align:middle"></Icon>
          <span>{{i18n_lang.serviceWorkbench47}}{{item.nickname}}</span>
        </Radio>
      </RadioGroup>
      <div slot="footer">
        <Button type="text" @click="otherCustomer = false">{{i18n_lang.serviceWorkbench48}}</Button>
        <Button type="primary" @click="applyChangeReceive">{{i18n_lang.serviceWorkbench49}}</Button>
      </div>
    </Modal>

    <!-- 截图弹框 -->
    <Modal v-model="screenShotStatus">
      <p slot="header">
        <span>{{i18n_lang.serviceWorkbench50}}</span>
      </p>
      <div style="margin:10px 20px">
        <p style="color:red;font-size:14px">{{i18n_lang.serviceWorkbench51}}</p>
        <p style="font-size:14px">{{i18n_lang.serviceWorkbench52}}</p>
        <div>
          <div>
            <h3>{{i18n_lang.serviceWorkbench53}}</h3>
            <p>
              {{i18n_lang.serviceWorkbench54}}
              <a href="https:// res1.duoleke.net/upload/0beed1ad41e2ddcb0cffec0db8c912c8.exe">{{i18n_lang.serviceWorkbench55}}</a>
            </p>
            <p>
              {{i18n_lang.serviceWorkbench56}}
              <a href="https:// res1.duoleke.net/upload/65f130adeda8024dca3e7aab9f6a46ae.dmg">{{i18n_lang.serviceWorkbench55}}</a>
            </p>
          </div>
          <div>
            <h3>{{i18n_lang.serviceWorkbench57}}</h3>
            <p>
             {{i18n_lang.serviceWorkbench58}}
              <a
                href="https:// jingyan.baidu.com/article/2fb0ba408a1e1300f2ec5f03.html"
                target="_blank"
              >{{i18n_lang.serviceWorkbench59}}</a>
            </p>
            <p>
              {{i18n_lang.serviceWorkbench60}}
              <a href="https:// jingyan.baidu.com/article/3d69c5514e44a3f0ce02d751.html" target="_blank">{{i18n_lang.serviceWorkbench59}}</a>
            </p>
          </div>
          <div>
            <h3>{{i18n_lang.serviceWorkbench61}}</h3>
          </div>
        </div>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" @click="screenShotStatus = false">{{i18n_lang.serviceWorkbench62}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import MiddleHeader from './middleHeader'
import { formatHtml } from './../tool.js'
import emojis from '@/assets/emoji.json'
import config from '@/config'

export default {
  components: {
    MiddleHeader
  },
  props: {
    ImSocket: {
      type: Object,
      default: () => {}
    },
    CMD: {
      type: Object,
      default: () => {}
    },
    TYPES: {
      type: Object,
      default: () => {}
    },
    client: {
      type: Object,
      default: null
    },
    ImInfo: {
      type: Object,
      default: () => {}
    },
    sendMaskStatus: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const i18n_lang = this.$t('serviceWorkbench');
    return {
      i18n_lang: i18n_lang,
      screenShotStatus: false, // 截图弹窗
      scrollTopState: false, // 滚动条置顶 默认值:false
      loading: 1, //  0: 加载中 1: 拉取历史消息 2: 暂无历史消息
      fileData: {}, // 上传图片
      loadingImg: require('@/assets/images/service/loading.gif'),
      isShowEmoji: false,
      emojis: emojis, // 表情包数据
      myEmojis: [],
      imgPreList: [], // 图片预览列表
      waitMsgList: [], // 等待发送的消息列表
      msgIndex: 0, // 消息索引，递增用于签收
      chatMsgList: [], // 已发送成功消息列表
      tempChatMsg: {}, // 正在发送的消息
      otherCustomer: false, // 用户转接
      otherServiceList: [], // 客服列表
      checkedOtherService: ''
    }
  },
  watch: {
    chatMsgList: {
      handler: function(newVal, oldVal) {
        this.$nextTick(() => {
          this.setScrollHeight(newVal, oldVal)
        })
      },
      deep: true
    },
    client(val) {
      this.chatMsgList = []
      this.waitMsgList = []
      if (val) {
        this.getHistory(false)
      }
    }
  },
  mounted() {
    // 处理表情数据
    Object.keys(emojis).map(x => {
      this.myEmojis.push({ name: emojis[x], val: x })
    })

    // ENTER 键发送消息
    const messageTextId = document.getElementById('messageText')
    messageTextId.onkeydown = event => {
      const e = event || window.event
      if (e.keyCode === 13) {
        e.preventDefault()
        this.sendMsgHandle()
      }
    }

    // 复制粘贴事件监听
    messageTextId.addEventListener(
      'paste',
      e => {
        if (e.clipboardData && e.clipboardData.items[0].type.indexOf('image') > -1) {
          this.uploadImg(e)
        }
      },
      false
    )

    // 消息发送成功
    this.ImSocket.on('messageSuccess', this.messageSuccess)

    // 接收消息
    this.ImSocket.on('receiveMessage', this.receiveMessage)

    // 消息签收成功
    this.ImSocket.on('signSuccess', this.signSuccess)

    // 结束会话
    this.ImSocket.on('endReceivingOk', this.endReceivingOk)

    // 历史消息
    this.ImSocket.on('getHistoryOk', this.getHistoryOk)

    // 当前在线客服
    this.ImSocket.on('getOnlineServiceOk', this.getOnlineServiceOk)
  },
  methods: {
    setScrollHeight(newVal, oldVal) {
      if (!newVal) {
        this.$refs.msgLook.scrollTop = 0
        return
      }
      if (this.$refs.chatRoom) {
        this.$refs.msgLook.scrollTop = this.scrollTopState ? 0 : this.$refs.chatRoom.scrollHeight
        if (newVal === 'load') return

        this.imgPreList = []
        newVal.map(({ msg }) => {
          if (msg && msg['contentType'] === this.TYPES.PICTURE) {
            this.imgPreList.push({
              src: msg.smallImgUrl,
              w: msg.width * 3 || 0,
              h: msg.height * 3 || 0
            })
          }
        })
      }
    },
    // 上传图片 剪贴板
    async uploadImg(e) {
      const file = e.clipboardData.items[0].getAsFile()
      await this.handleBeforeUpload(file)
    },
    toHtml(text) {
      const str = text.replace(/(\[.*?\])/g, $1 => {
        if(this.emojis[$1]){
          let url = require(`@/assets/emoji/emoji_res/${this.emojis[$1]}.png`)
          return `<img src="${url}" class="emoji" title="emoji" name="${$1}" style="user-select:none" oncontextmenu="return false"/>`
        }else{
          return $1
        }
      })
      return str
    },
    // 是否显示表情弹层
    openEmoji() {
      this.isShowEmoji = !this.isShowEmoji
    },
    // 点击表情
    handleEmoji(data) {
      const img = document.createElement('img')
      img.width = 30
      img.height = 30
      img.title = 'emoji'
      img.name = data.val
      img.src = require(`@/assets/emoji/emoji_res/${data.name}.png`)
      this.$refs.msgTextContainer.append(img)
      this.isShowEmoji = false
    },
    // 图片预览
    previewImg(source) {
      const index = this.imgPreList.findIndex(({ src }) => src === source)
      this.$preview.open(index, this.imgPreList, {
        bgOpacity: 0.1,
        shareEl: false,
        zoomEl: true,
        maxSpreadZoom: 1
      })
    },
    // 拉取历史消息
    getHistory(topState) {
      if (!this.client || !this.client.imUserId) {
        return this.$Message.error('请选择客户')
      }
      this.scrollTopState = true
      this.loading = 0
      const lastMsg = this.chatMsgList.find(o => o.msgId) || { msgId: 0 }
      const data = {
        imUserId: this.client.imUserId,
        lastMsgId: lastMsg.msgId
      }
      this.$emit('handleRequestEvent', 'getHistoryMsg', data)
      this.scrollTopState = topState
    },
    // 返回历史消息
    getHistoryOk(data) {
      const list = data.list.reverse()
      let tempList = this.chatMsgList
      if (data.list && data.list.length > 0) {
        try {
          data.list.forEach(o => {
            if (typeof o.msg === 'string') {
              o.msg = JSON.parse(o.msg)
            }
          })
        } catch (error) {
          console.log('消息转换失败')
        }
        tempList = data.list.concat(tempList)
        this.chatMsgList = []

        // 签收消息
        const signs = []
        data.list.forEach(o => {
          // 自己的消息不要签收，不然消失
          if (o.msgId && !o.signFlag && o.sendUserId !== this.ImInfo.imUserId) {
            signs.push(o.msgId)
          }
        })
        if (signs.length) {
          this.$emit('handleRequestEvent', 'signMsg', { signs })
        }
        this.chatMsgList = tempList
      }

      if (data.more) {
        this.loading = 1 // 1: 拉取历史消息
      } else {
        this.loading = 2 // 2: 暂无历史消息
      }
    },
    // 图片上传
    handleBeforeUpload(file) {
      this.fileData.formData = new FormData()
      this.fileData.formData.append('file', file)
      this.uploadQiNiu()
      return false
    },
    async uploadQiNiu() {
      const editText = document.getElementById('messageText')
      const img = document.createElement('img')
      editText.append(img)
      img.src = this.loadingImg
      const resData = await this.$axios.request({
        url: '/tools/upload',
        method: 'POST',
        baseURL: config.imReqUrl,
        data: this.fileData.formData
      })

      if (resData.status !== 200) {
        return this.$Message.error(resData.message)
      }
      img.src = resData.data
      this.fileData = {}
      // 获取图片的宽高
      const image = new Image()
      image.onload = () => {
        this.ImageWidth = image.width
        this.ImageHeight = image.height
      }
      image.src = resData.data
    },
    sendMsgHandle() {
      this.scrollTopState = false
      const sendMsgNodes = this.$refs.msgTextContainer.childNodes
      const res = formatHtml(sendMsgNodes, this.TYPES)
      // true 表示可以发送消息，false 表示复制粘贴的图片还没上传成功
      // 根据判断图片链接是否为 http 来判断图片是否上传成功
      const stat = !res.some(
        x => x.contentType === this.TYPES.PICTURE && x.bigImgUrl.indexOf('http') < 0
      )
      if (!stat) return this.$Message.error('请等待图片加载完成')
      if (!this.client.imUserId) return this.$Message.error('请选择需要发送消息的客户')
      if (!res.length) return this.$Message.error('请输入需要发送的消息')
      this.waitMsgList = [...this.waitMsgList, ...res]
      this.sendMsgTask()
    },
    // 发送消息任务
    sendMsgTask() {
      if (!this.waitMsgList.length) {
        // 全部消息发送完成，输入框置空
        this.$refs.msgTextContainer.innerText = ''
        return
      }
      const msg = this.waitMsgList.splice(0, 1)[0]
      const data = {
        msgIndex: ++this.msgIndex,
        acceptUserId: this.client.imUserId,
        msg
      }
      // 发送的消息转为字符串
      const sendData = { ...data, msg: JSON.stringify(data.msg) }
      this.$emit('handleRequestEvent', 'sendMessage', sendData)
      this.tempChatMsg = data // 1 为客服消息
    },
    // 消息发送成功
    messageSuccess(data) {
      console.log('===== 消息发送成功', data)
      if (this.tempChatMsg.msgIndex === data.msgIndex) {
        this.tempChatMsg.date = data.date
        this.tempChatMsg.sendUserId = this.ImInfo.imUserId
        this.chatMsgList.push(this.tempChatMsg)
        this.sendMsgTask()
      }
    },
    // 接收消息
    receiveMessage(data) {
      console.log('===== 接收新消息', data)
      this.scrollTopState = false
      // 如果是系统消息或当前的接待客户
      if (!data.sendUserId || (this.client && data.sendUserId === this.client.imUserId)) {
        try {
          data.msg = JSON.parse(data.msg)
          this.chatMsgList.push(data)
        } catch (error) {
          console.log('消息转换失败!')
        }

        // 签收消息
        if (data.msgId) {
          this.$emit('handleRequestEvent', 'signMsg', { signs: [data.msgId] })
        }
      }
    },
    // 消息签收成功
    signSuccess(data) {
      console.log('===== 消息签收成功', data)
    },
    // 结束会话
    endReceiving() {
      if (!this.client) {
        return this.$Message.error('请选择一个客户')
      }
      this.$Modal.confirm({
        title: '结束会话',
        content: `确认要结束${this.client.imUserId}会话吗?`,
        onOk: () => {
          const data = { imUserId: this.client.imUserId }
          this.$emit('handleRequestEvent', 'endReceiving', data)
        },
        onCancel: () => {}
      })
    },
    endReceivingOk(data) {
      this.$Message.success('结束会话成功!')
      this.chatMsgList = []
      this.$emit('updateData', 'client', null)
      this.$emit('updateData', 'sendMaskStatus', true)
    },
    // 用户转接
    checkedOtherBtn() {
      this.otherCustomer = true
      this.checkedOtherService = ''
      this.$emit('handleRequestEvent', 'getOnlineService')
    },
    // 返回当前客服
    getOnlineServiceOk(data) {
      // 排除客服自己
      this.otherServiceList = data.list.filter(o => o.imUserId !== this.ImInfo.imUserId)
    },
    // 确定转接
    applyChangeReceive() {
      if (!this.client) {
        return this.$Message.error('请选择需要转接的用户')
      }
      if (!this.checkedOtherService) {
        return this.$Message.error('请选择需要转接的客服')
      }
      const data = {
        targetImUserId: this.client.imUserId,
        serviceImUserId: this.checkedOtherService
      }
      this.$emit('handleRequestEvent', 'applyChangeReceive', data)
      this.$Message.success('申请转接其他客服，请等待其他客服响应')
      this.otherCustomer = false
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./middleContent.less');
</style>
