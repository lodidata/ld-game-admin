<template>
  <div id="ServiceRecord">
    <Spin v-if="loading.page" fix></Spin>

    <div class="queryBox">
      <!-- table -->
      <div>
        <Table :columns="columns" :data="dataSource" border></Table>
        <Page
          class="page_box"
          :current="page.currentPage"
          :page-size="page.pageSize"
          :total="page.total"
          show-sizer
          @on-change="getData"
          @on-page-size-change="changePageSize"
        ></Page>
      </div>
    </div>

    <div :class="`talkBox ${isShow==true?'fade':''}`">
      <Spin v-if="loading.talkPage" fix></Spin>
      <div class="header">
        <span class="closeIcon" @click="closeShowMore">
          <Icon type="ios-backspace-outline" size="32" />
        </span>
        <span>{{ info.client_third_party_id }}</span>
      </div>

      <div class="history-wrapper">
        <div class="history-msg">
          <div v-if="loading.chat === 0" class="spin">
            <img src="@/assets/images/service/loading.png" width="18" height="18" alt />
          </div>
          <div v-else-if="loading.chat === 1" @click="getHistory()">{{i18n_lang.serviceRecord0}}</div>
          <div v-else>{{i18n_lang.serviceRecord1}}</div>
        </div>
        <div ref="chatList" class="content">
          <div v-for="(item,i) in chatMsgList" :key="i" class="sub-room-msg">
            <template v-if="item.msg">
              <!-- 客服 -->
              <template v-if="item.sendUserId === ImInfo.imUserId || item.acceptUserId === client.imUserId">
                <!-- 客服文本 -->
                <div v-if="item.msg.contentType === TYPES.TEXT" class="msg me">
                  <img class="logo" src="@/assets/images/service/kf.png" alt />
                  <div class="me-msg">
                    <span>{{ item.date | dateFmt }}</span>
                    <div v-html="toHtml(item.msg.text)"></div>
                  </div>
                </div>
                <!-- 客服图片 -->
                <div v-if="item.msg.contentType === TYPES.PICTURE" class="msg me">
                  <img class="logo" src="@/assets/images/service/kf.png" alt />
                  <div class="me-msg">
                    <span>{{ item.date | dateFmt }}</span>
                    <div>
                      <img
                        v-lazy="{src:item.msg.smallImgUrl + '?imageView2/0/w/200/q/50/interlace/1'}"
                        class="preview-img"
                        :large="item.msg.bigImgUrl"
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
                      />
                    </div>
                  </div>
                </div>
                <!-- 系统消息 -->
                <div v-else class="system-msg">
                  <p class="time">{{ item.date | dateFmt }}</p>
                  <p class="msg">
                    <span>{{ item.text }}</span>
                  </p>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import columns from './columns.js'
import emojis from '../../assets/emoji.json'
import config from '@/config'
import IM from '@/IM'
import mixin from '@/IM/mixin'

const initQuery = {
  client_third_party_id: '',
  operator_name: '',
  question_type: '',
  comment_level: '',
  end_mode: ''
}
export default {
  mixins: [mixin],
  data() {
    const i18n_lang = this.$t('serviceRecord');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: false,
        talkPage: false,
        chat: 1
      },
      query: { ...initQuery },
      dataSource: [],
      chatMsgList: [],
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      talkPage: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      client: null,
      info: {},
      isShow: false,
      emojis: emojis,
      myEmojis: [], // 表情包数据
      ImInfo: {}
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      ImSocket: state => state.socket.ImSocket
    })
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
  created() {
    this.init()
  },
  methods: {
    ...mapMutations({
      setImSocket: 'socket/setImSocket'
    }),
    setScrollHeight(newVal, oldVal) {
      this.$refs.chatList.scrollTop = 0
    },
    openDetail(row) {
      // 正式用户才能打开用户详情
      if (row.user_type === 1) {
        this.$store.dispatch('detail/info', {
          username: row.client_third_party_id,
          id: row.user_id
        })
      }
    },
    init() {
      this.getData()
      this.instaceIm()
    },
    // 创建 socket 连接
    instaceIm() {
      const ImSocket = new IM({
        url: config.imWSUrl,
        onconnect: () => this.login(), // 服务器连接成功
        ondisconnect: () => {}, // 服务器已断开连接
        onerror: () => {}, // 服务器连接发生错误
        onreconnect: () => {}, // 服务器开始重连
        onmsgerror: () => {}, // 服务器接收消息内容错误
        handleResponseEvent: this.handleResponseEvent, // 消息业务处理
        heartBeatMsg: { command: this.CMD.HEARTBEAT_REQUEST, data: {}} // 心跳包消息
      })
      this.setImSocket(ImSocket)

      // 历史消息
      this.ImSocket.on('getHistoryOk', this.getHistoryOk)
    },
    // 登录
    login() {
      this.handleRequestEvent('login')
    },
    // 登录成功
    loginSuccess(data) {
      this.ImInfo = data
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
    // 分页设置
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 获取表格数据
    async getData(index) {
      this.page.currentPage = index || 1
      this.loading.page = true

      this.dataSource = []
      const query = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
        nodeId: config.nodeId
      }
      const res = await this.$axios.request({
        url: '/service/history',
        method: 'GET',
        baseURL: config.imReqUrl,
        params: query
      })
      this.loading.page = false

      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.page.total = res.attributes ? res.attributes.total : 0
        this.dataSource = Object.assign([], res.data)
      }
    },
    // 查看历史聊天记录
    openChat(row) {
      this.isShow = true
      this.client = row
      this.chatMsgList = []
      this.getHistory()
    },
    getHistory() {
      const lastMsg = this.chatMsgList.find(o => o.msgId) || { msgId: 0 }
      const data = {
        imUserId: this.client.clientImId,
        lastMsgId: lastMsg.msgId
      }
      this.handleRequestEvent('getHistoryMsg', data)
    },
    getHistoryOk(data) {
      let tempList = this.chatMsgList
      if (data.list && data.list.length > 0) {
        try {
          data.list.forEach(o => {
            o.msg = JSON.parse(o.msg)
          })
        } catch (error) {
          console.log('消息转换失败')
        }
        tempList = data.list.reverse().concat(tempList)
        this.chatMsgList = tempList
      }

      if (data.more) {
        this.loading.chat = 1 // 1: 拉取历史消息
      } else {
        this.loading.chat = 2 // 2: 暂无历史消息
      }
    },
    // 关闭聊天记录框
    closeShowMore() {
      this.isShow = false
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
