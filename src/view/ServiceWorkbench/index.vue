<template>
  <div id="ServiceWorkbench">
    <Spin v-if="loading.page" fix>
      <template v-if="loading.pageType == 'error'">
        <Icon type="close-circled" size="28" class="spin-icon error"></Icon>
        <div style="color:red">{{ loading.pageText }}&nbsp;...</div>
      </template>
      <template v-if="loading.pageType == 'loading'">
        <Icon type="load-c" size="18" class="spin-icon"></Icon>
        <div>{{ loading.pageText }}&nbsp;...</div>
      </template>
    </Spin>

    <LoginBox v-if="loginBoxShow" @handleRequestEvent="handleRequestEvent"></LoginBox>
    <div v-if="serviceMainShow">
      <div class="header">
        <span class="tit">{{i18n_lang.serviceWorkbench0}}</span>
        <div class="logo">
          <img src="@/assets/images/service/kf.png" alt />
          <span>{{ ImInfo.nickname }}</span>
        </div>
      </div>
      <div ref="workBenchMain" class="main">
        <p style="display:none">
          <audio id="sound_serviceWait" src="../../../static/music/waiting.wav"></audio>
          <audio id="sound_serviceNewMsg" src="../../../static/music/message.wav"></audio>
        </p>
        <LeftChatList
          :pending-list="pendingList"
          :waiting-list="waitingList"
          :close-list="closeList"
          :loading="loading"
          :client="client"
          @handleRequestEvent="handleRequestEvent"
          @updateData="updateData"
        ></LeftChatList>
        <MiddleContent
          :TYPES="TYPES"
          :sendMaskStatus="sendMaskStatus"
          :ImSocket="ImSocket"
          :client="client"
          :ImInfo="ImInfo"
          @handleRequestEvent="handleRequestEvent"
          @updateData="updateData"
        ></MiddleContent>
        <RightContent :client="client"></RightContent>
      </div>
    </div>

    <!-- 转接提示 -->
    <Modal
      v-model="changeReceiveModal"
      :width="400"
      @on-ok="isAcceptOther(true)"
      @on-cancel="isAcceptOther(false)"
      :ok-text="i18n_lang.serviceWorkbench1"
      :cancel-text="i18n_lang.serviceWorkbench2"
      :mask-closable="false"
    >
      <div>{{i18n_lang.serviceWorkbench3}} {{ changeInfo.userNickname }},{{i18n_lang.serviceWorkbench4}}!</div>
      <div slot="header">
        <div style="text-align:center">{{i18n_lang.serviceWorkbench5}}</div>
      </div>
    </Modal>

    <!-- 转接应答 -->
    <Modal v-model="resChangeReceiveModal" :width="400" :mask-closable="false" :closable="false">
      <p style="text-algin:center">{{i18n_lang.serviceWorkbench6}}{{replyInfo.success ? i18n_lang.serviceWorkbench7 : i18n_lang.serviceWorkbench8}}{{i18n_lang.serviceWorkbench9}}</p>
      <div slot="header">
        <div style="text-align:center">{{i18n_lang.serviceWorkbench10}}</div>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" @click="okResChange">{{i18n_lang.serviceWorkbench11}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import config from '@/config'
import IM from '@/IM'
import mixin from '@/IM/mixin'
import LoginBox from './components/loginBox'
import LeftChatList from './components/leftChatList'
import MiddleContent from './components/middleContent'
import RightContent from './components/rightContent'
import { localRead } from '@/libs/util'

export default {
  components: {
    LoginBox,
    LeftChatList,
    RightContent,
    MiddleContent
  },
  mixins: [mixin],
  data() {
    const i18n_lang = this.$t('serviceWorkbench');
    return {
      i18n_lang: i18n_lang,
      ImInfo: {},
      loading: {
        page: true,
        pageType: 'loading',
        pageText: i18n_lang.serviceWorkbench12,
        receivingList: false,
        waitReceiveList: false,
        endReceiveList: false
      },
      loginBoxShow: false, // 登录弹窗
      serviceMainShow: false, // 工作台弹窗
      changeReceiveModal: false, // 转接提示弹窗
      resChangeReceiveModal: false, // 应答转接提示弹窗
      sendMaskStatus: true, // 输入框蒙版
      audioFlag: false, // 提示音
      client: null, // 当前接待的客户
      waitClient: null, // 等待接待成功自动转接客户
      waitingList: [], // 待接待列表
      pendingList: [], // 接待中列表
      closeList: [], // 结束会话列表
      tipsMsg: '', // 提示消息
      tipsIcon: 'static/favicon.ico', // 提示 icon
      changeInfo: {}, // 转接信息
      replyInfo: {} // 转接响应
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      ImSocket: state => state.socket.ImSocket
    })
  },
  created() {
    this.init().catch(e => {
      this.loading.pageText = e
      this.loading.pageType = 'error'
      this.loading.page = true
      return new Error(e)
    })
  },
  mounted() {
    const window_height = document.body.clientHeight
    const left_top = document.getElementById('ServiceWorkbench').offsetTop
    const left_height = window_height - left_top - 10
    document.getElementById('ServiceWorkbench').style.height = left_height + 'px'
  },
  methods: {
    ...mapMutations({
      setImSocket: 'socket/setImSocket'
    }),
    // 初始化配置信息
    async init() {
      this.instaceIm()
    },
    // 创建 socket 连接
    instaceIm() {
      const ImSocket = new IM({
        url: config.imWSUrl,
        onconnect: this.onconnect, // 服务器连接成功
        ondisconnect: this.ondisconnect, // 服务器已断开连接
        onerror: this.onerror, // 服务器连接发生错误
        onreconnect: this.onreconnect, // 服务器开始重连
        onmsgerror: this.onmsgerror, // 服务器接收消息内容错误
        handleResponseEvent: this.handleResponseEvent, // 消息业务处理
        heartBeatMsg: { command: this.CMD.HEARTBEAT_REQUEST, data: {} } // 心跳包消息
      })
      this.setImSocket(ImSocket)
    },
    onconnect() {
      this.loading.pageType = 'loading'
      this.loading.pageText = this.i18n_lang.serviceWorkbench13
      this.loading.page = false
      this.login()
    },
    ondisconnect(res) {
      this.loading.pageType = 'error'
      this.loading.pageText = this.i18n_lang.serviceWorkbench14
      this.loading.page = true
    },
    onerror(res) {
      this.loading.pageType = 'error'
      this.loading.pageText = this.i18n_lang.serviceWorkbench15
      this.loading.page = true
    },
    onreconnect() {
      this.loading.pageType = 'loading'
      this.loading.pageText = this.i18n_lang.serviceWorkbench16
      this.loading.page = false
      this.initData()
    },
    onmsgerror(err) {
      this.$Message.error(err)
    },
    // 登录
    login() {
      this.handleRequestEvent('login')
    },
    // 登录成功
    loginSuccess(data) {
      this.loading.pageText = this.i18n_lang.serviceWorkbench17
      this.loading.page = false

      // 设置昵称
      if (!data.nickname) {
        this.loginBoxShow = true
        this.serviceMainShow = false
      } else {
        this.ImInfo = data
        this.initData()
      }
    },
    // 初始化数据，获取接待消息
    initData() {
      this.loading.page = false
      this.loginBoxShow = false
      this.serviceMainShow = true
      this.pendingList = []
      this.waitingList = []
      this.closeList = []
      this.getWaitingList()
      this.getPendingList()
      this.getCloseList()
    },
    // 查询可接待客户
    getWaitingList() {
      this.handleRequestEvent('pullWaitingList')
    },
    waitingListOk(data) {
      console.log('waitingList ===>', data.list)
      // 通过比较上次与本次的用户ID来判断是否有用户接入
      if (data.list && data.list.length) {
        const ids = this.waitingList.map(o => o.imUserId)
        const hasNew = data.list.some(o => !ids.includes(o.imUserId))
        hasNew && this.playWaitAudio()
      }
      this.waitingList = data.list
    },
    // 查询当前正在接待的客户
    getPendingList() {
      this.handleRequestEvent('pullPendingList')
    },
    pendingListOk(data) {
      console.log('pendingList ===>', data.list)
      this.pendingList = data.list
      if (data.list && data.list.length) {
        this.playWaitAudio()
      }
      // 自动转到接待客户
      if (this.waitClient) {
        const client = this.pendingList.find(o => o.imUserId === this.waitClient.imUserId)
        if (client) {
          this.client = client
          this.sendMaskStatus = false
        }
        this.waitClient = null
      }
    },
    // 拉取结束会话列表
    getCloseList() {
      this.handleRequestEvent('pullCloseList')
    },
    closeListOk(data) {
      console.log('closeList ===>', data.list)
      this.closeList = data.list
    },
    // 待接待播放提示音
    playWaitAudio() {
      const sound_serviceWait = localRead('sound_serviceWait') === 'true'
      if (sound_serviceWait) {
        const media = document.getElementById('sound_serviceWait')
        media && media.play()
      }
      this.newMsgTip(this.i18n_lang.serviceWorkbench18)
    },
    // 接待中播放提示音
    playNewMsgAudio() {
      const sound_serviceNewMsg = localRead('sound_serviceNewMsg') === 'true'
      if (sound_serviceNewMsg) {
        const media = document.getElementById('sound_serviceNewMsg')
        media && media.play()
      }
      this.newMsgTip(this.i18n_lang.serviceWorkbench19)
    },
    // 消息提示
    newMsgTip(title) {
      this.$notification(title, {
        body: this.tipsMsg || '',
        icon: this.tipsIcon
      })
    },
    // 接收消息
    receiveMessage(data) {
      const client = this.pendingList.find(o => o.imUserId === data.sendUserId)
      if (client) {
        try {
          data.msg = JSON.parse(data.msg)
        } catch (error) {
          console.log('消息转换失败')
        }
        this.$set(client, 'lastUnReadMsg', data)

        // 如果不是当前聊天客户，显示消息未读数
        if (!this.client || client.imUserId !== this.client.imUserId) {
          if (!client.unReadMsgCount) {
            this.$set(client, 'unReadMsgCount', 0)
          }
          client.unReadMsgCount++
          this.playNewMsgAudio()
        }
      }
    },
    // 统一更新 data 值
    updateData(key, value) {
      this[key] = value
    },
    // 客服有转接通知的回调
    hasApplyChangeReceive(data) {
      this.changeInfo = data
      this.changeReceiveModal = true
    },
    // 是否接受转接
    isAcceptOther(isAccept) {
      const data = { targetImUserId: this.changeInfo.targetImUserId, accept: isAccept }
      this.handleRequestEvent('replyChangeReceive', data)
      this.changeReceiveModal = false
    },
    // 是否接受转接响应
    replyChangeReceive(data) {
      this.resChangeReceiveModal = true
      this.replyInfo = data
    },
    okResChange() {
      // 如果其它客服同意转接，并且当前客户是转接的那个客户
      if (
        this.replyInfo.success &&
        this.client &&
        this.client.imUserId === this.changeInfo.targetImUserId
      ) {
        this.client = null
      }
      this.resChangeReceiveModal = false
    },
    // 设置客服昵称响应
    setServiceNameOk(data) {
      if (data.success) {
        this.login()
      } else {
        this.$Message.error(this.i18n_lang.serviceWorkbench21)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
