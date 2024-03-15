<template>
  <Layout style="height: 100%" class="main">
    <Sider
      v-model="collapsed"
      hide-trigger
      collapsible
      :width="200"
      :collapsed-width="64"
      class="left-sider"
      :style="{ overflow: 'hidden' }"
    >
      <SideMenu
        ref="sideMenu"
        :menu-list="menuList"
        accordion
        :active-name="$route.name"
        :collapsed="collapsed"
        @on-select="turnToPage"
      >
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <!-- <img v-show="!collapsed" key="max-logo" :src="maxLogo">
          <img v-show="collapsed" key="min-logo" :src="minLogo"> -->
          <h1 style="color: #2d8cf0;">LD</h1>
        </div>
      </SideMenu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <HeaderBar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <Notice slot="notice" :notices="notices"/>
          <div slot="hint">
           <!-- <li v-if="Object.keys(quotaData).length" class="min-widthw150" @click="creditModelVisible = true">
              <p>{{i18n_lang.components3}}{{ quotaData.total_quota ? quotaData.total_quota : 0 }}{{i18n_lang.components4}}</p>
              <p>{{i18n_lang.components5}}{{ quotaData.use_quota ? quotaData.use_quota : 0 }}{{i18n_lang.components4}}</p>
            </li> -->
            <!-- <RouterLink tag="li" to="/admin/dataVerification">
              <Badge :count="+HintData.review">{{i18n_lang.components290}}&nbsp;&nbsp;</Badge>
            </RouterLink>
            <RouterLink tag="li" to="/cash/payManage?tab=OnlineIncome">
              <Badge :count="+HintData.online_deposit">{{i18n_lang.components6}}&nbsp;&nbsp;</Badge>
            </RouterLink>
            <RouterLink tag="li" to="/cash/payManage?tab=OfflineIncome">
              <Badge :count="+HintData.offline_deposit">{{i18n_lang.components7}}&nbsp;&nbsp;</Badge>
            </RouterLink>
            <RouterLink tag="li" to="/cash/getOutCheck">
              <Badge :count="+HintData.withdraw">{{i18n_lang.components8}}&nbsp;&nbsp;</Badge>
            </RouterLink> -->
          </div>
          <User :user-info="userInfo" :list="tagNavList" @on-close="handleCloseTag"/>
          <!-- <ErrorStore
            v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader"
            :has-read="hasReadErrorPage"
            :count="errorList.length"
          />-->
          <FullScreen v-model="isFullscreen" style="margin-right: 10px;"/>
          <!-- <div class="setting-btn" @click="changeSet">{{i18n_lang.components9}}</div> -->
        </HeaderBar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <TagsNav :value="$route" :list="tagNavList" @input="handleClick" @on-close="handleCloseTag"/>
          </div>
          <CustomBreadCrumb show-icon style="margin-left: 30px;" :list="breadCrumbList"/>
          <Content :class="['content-wrapper', noPadding && 'no-padding']">
            <Transition name="fade-transform" mode="out-in">
              <!-- <KeepAlive :include="cacheList"> <RouterView /> </KeepAlive> -->
              <RouterView/>
            </Transition>
          </Content>
          <UserDetail/>
          <UserPsd/>
          <NoticeDetail :notice="notice"/>
        </Layout>
      </Content>
      <div v-if="isShowSetting" class="set-modal" @click="changeSet"></div>
      <div :class="['setting', { animation: isShowSetting }]">
        <h1>{{i18n_lang.components10}}</h1>
        <ul>
          <li>
            <a href="javascript:;" style="display: none">
              <audio id="sound_onlines" src="../../../../static/music/withdraw.wav"></audio>
            </a>
            <h3>{{i18n_lang.components11}}</h3>
            <Switch v-model="sound_onlines" @on-change="change('sound_onlines', sound_onlines)"></Switch>
          </li>
          <li>
            <a href="javascript:;" style="display: none">
              <audio id="sound_offlines" src="../../../../static/music/recharge.wav"></audio>
            </a>
            <h3>{{i18n_lang.components12}}</h3>
            <Switch v-model="sound_offlines" @on-change="change('sound_offlines', sound_offlines)"></Switch>
          </li>
          <li>
            <a href="javascript:;" style="display: none">
              <audio id="sound_withdraws" src="../../../../static/music/recharge.wav"></audio>
            </a>
            <h3>{{i18n_lang.components13}}</h3>
            <Switch v-model="sound_withdraws" @on-change="change('sound_withdraws', sound_withdraws)"></Switch>
          </li>
        </ul>
        <!-- <h1>{{i18n_lang.components14}}</h1>
        <ul>
          <li>
            <h3>{{i18n_lang.components15}}</h3>
            <Switch v-model="sound_serviceWait" @on-change="change('sound_serviceWait', sound_serviceWait)"></Switch>
          </li>
          <li>
            <h3>{{i18n_lang.components16}}</h3>
            <Switch v-model="sound_serviceNewMsg" @on-change="change('sound_serviceNewMsg', sound_serviceNewMsg)"></Switch>
          </li>
        </ul> -->
        <!-- <h1>{{i18n_lang.components170}}</h1>
        <ul>
        	<li>
            <Select v-model="language" @on-change="languageChange">
              <Option v-for="(item, index) in languageCutList" :key="index" :value="`${item}`">{{`${item}`}}</Option> -->
              <!-- <Option :value="`zh-cn`">zh-cn</Option>
              <Option :value="`th`">th</Option>
              <Option :value="`en-us`">en-us</Option>
              <Option :value="`es-mx`">es-mx</Option> -->
            <!-- </Select>
          </li>
        </ul> -->
      </div>
    </Layout>
    <!-- 授信额度弹窗 -->
    <Modal v-model="creditModelVisible" :title="i18n_lang.components17" width="60%">
      <CreditLimit v-if="creditModelVisible"></CreditLimit>
      <div slot="footer"></div>
    </Modal>
  </Layout>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import SideMenu from './components/SideMenu'
import HeaderBar from './components/HeaderBar'
import TagsNav from './components/TagsNav'
import CustomBreadCrumb from './components/CustomBreadCrumb'
import Notice from './components/Notice'
import NoticeDetail from './components/NoticeDetail'
import User from './components/User'
import UserDetail from './components/UserDetail'
import UserPsd from './components/UserPsd'
import FullScreen from './components/FullScreen'
import CreditLimit from '../../view/CreditLimit'
// import ErrorStore from './components/ErrorStore'
import { getNewTagList, getNextRoute, routeEqual } from '@/libs/util'
import minLogo from 'static/logo_new.png'
import maxLogo from 'static/logo_new.png'
import './index.less'
import { getToken } from '@/libs/util'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    TagsNav,
    CustomBreadCrumb,
    User,
    Notice,
    NoticeDetail,
    UserDetail,
    UserPsd,
    FullScreen,
    CreditLimit
    // ErrorStore
  },
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false,
      creditModelVisible: false, // 授信额度弹窗属性
      notices: [],
      HintData: {
        offline_deposit: 0,
        online_deposit: 0,
        withdraw: 0,
        review: 0
      },
      Hinttimer: null,
      isShowSetting: false,
      // 三个声音
      sound_onlines: false, // 线上充值
      sound_offlines: false, // 线下转账
      sound_withdraws: false, // 出款
      sound_review: false, //资料审核
      sound_serviceWait: false, // 客服待接入
      sound_serviceNewMsg: false, // 客服新消息
      quotaData: {},
      noPadding: false,
      // language: 'zh-cn'
    }
  },
  computed: {
    ...mapGetters(['errorList']),
    tagNavList() {
      return this.$store.state.app.tagNavList
    },
    tagRouter() {
      return this.$store.state.app.tagRouter
    },
    userInfo() {
      return this.$store.state.user.userInfo
    },
    cacheList() {
      return this.tagNavList.length
        ? this.tagNavList.filter(item => item.meta && item.meta.cache).map(item => item.name)
        : []
    },
    menuList() {
      return this.$store.getters.menuList
    },
    breadCrumbList() {
      return this.$store.state.app.breadCrumbList
    },
    local() {
      return this.$store.state.app.local
    },
    hasReadErrorPage() {
      return this.$store.state.app.hasReadErrorPage
    },
    notice() {
      return this.$store.state.common.notice
    },
    language(){
      return this.$store.state.app.language
    },
    // ...mapState({
    //   languageCutList: state => state.app.languageList
    // })
  },
  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)

      // 工作台把 padding 设置为 0
      this.noPadding = name === 'serviceWorkbench'
    }
  },
  created() {
    // this.getScrollNotice()
    // this.getHint()
    // this.getQuota()
    // 设置消息提示音的开关
    if (window.localStorage.getItem('sound_withdraws') == null) {
      window.localStorage.setItem('sound_withdraws', 'true')
    }
    if (window.localStorage.getItem('sound_review') == null) {
      window.localStorage.setItem('sound_review', 'true')
    }
    if (window.localStorage.getItem('sound_offlines') == null) {
      window.localStorage.setItem('sound_offlines', 'true')
    }
    if (window.localStorage.getItem('sound_onlines') == null) {
      window.localStorage.setItem('sound_onlines', 'true')
    }
    if (window.localStorage.getItem('sound_serviceWait') == null) {
      window.localStorage.setItem('sound_serviceWait', 'true')
    }
    if (window.localStorage.getItem('sound_serviceNewMsg') == null) {
      window.localStorage.setItem('sound_serviceNewMsg', 'true')
    }
    // if(!sessionStorage.getItem('languageList')){
    //   this.languageList()
    // }
    this.sound_withdraws = window.localStorage.getItem('sound_withdraws') === 'true'
    this.sound_review = window.localStorage.getItem('sound_review') === 'true'
    this.sound_offlines = window.localStorage.getItem('sound_offlines') === 'true'
    this.sound_onlines = window.localStorage.getItem('sound_onlines') === 'true'
    this.sound_serviceWait = window.localStorage.getItem('sound_serviceWait') === 'true'
    this.sound_serviceNewMsg = window.localStorage.getItem('sound_serviceNewMsg') === 'true'
  },
  destroyed() {
    clearInterval(this.Hinttimer)
  },
  mounted() {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.addTag({
      route: this.$store.state.app.homeRoute
    })
    this.setBreadCrumb(this.$route)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }

    this.noPadding = this.$route.name === 'serviceWorkbench'

  },
  methods: {
    ...mapMutations({
      setBreadCrumb: 'app/setBreadCrumb',
      setTagNavList: 'app/setTagNavList',
      addTag: 'app/addTag',
      setLocal: 'app/setLocal',
      languageSet: 'app/languageSet'
    }),
    ...mapActions({
      handleLogin: 'user/handleLogin',
      // languageList: 'app/languageList'
    }),
    turnToPage(route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange(state) {
      this.collapsed = state
    },
    handleCloseTag(res, type, route) {
      if (type === 'all') {
        this.turnToPage(this.$config.homeName)
      } else if (routeEqual(this.$route, route)) {
        if (type !== 'others') {
          const nextRoute = getNextRoute(this.tagNavList, route)
          this.$router.push(nextRoute)
        }
      }
      this.setTagNavList(res)
    },
    handleClick(item) {
      this.turnToPage(item)
    },
    // 获取系统公告
    async getScrollNotice() {
      const res = await this.$axios.request({
        url: '/hallNotice/scroll',
        method: 'GET'
      })
      if (res.status !== 200  || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.notices = res.data || []
    },
    // 获取快捷tip提示
    async getHint() {
      this.Hinttimer = setInterval(async() => {
        if (!getToken()) return false
        const res = await this.$axios.request({
          url: '/message/num',
          method: 'GET'
        })
        if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
          this.$Message.error(res.message)
		  if(res.state === 11050 || res.state === 11051){
			clearInterval(this.Hinttimer)
		  }
        } else {
          this.HintData = res.data

          const sound_onlines = window.localStorage.getItem('sound_onlines') === 'true'
          const sound_withdraws = window.localStorage.getItem('sound_withdraws') === 'true'
          const sound_offlines = window.localStorage.getItem('sound_offlines') === 'true'
          const sound_review = window.localStorage.getItem('sound_review') === 'true'

          const onlines = parseInt(window.localStorage.getItem('onlines'))
          const offlines = parseInt(window.localStorage.getItem('offlines'))
          const withdraws = parseInt(window.localStorage.getItem('withdraws'))
          const review = parseInt(window.localStorage.getItem('review'))

          // console.log(
          //   'onlines',
          //   typeof onlines,
          //   onlines,
          //   typeof this.HintData.online_deposit,
          //   this.HintData.online_deposit
          // )

          if (
            sound_onlines &&
            parseInt(this.HintData.online_deposit) > 0 &&
            onlines !== this.HintData.online_deposit
          ) {
            document.querySelector('#sound_onlines').play()
          }
          if (
            sound_offlines &&
            parseInt(this.HintData.offline_deposit) > 0 &&
            offlines !== this.HintData.offline_deposit
          ) {
            document.querySelector('#sound_offlines').play()
          }
          if (
            sound_withdraws &&
            parseInt(this.HintData.withdraw) > 0 &&
            withdraws !== this.HintData.withdraw
          ) {
            document.querySelector('#sound_withdraws').play()
          }
          if (
            sound_review &&
            parseInt(this.HintData.review) > 0 &&
            review !== this.HintData.review
          ) {
            // document.querySelector('#sound_withdraws').play()
          }
          window.localStorage.setItem('onlines', this.HintData.online_deposit)
          window.localStorage.setItem('offlines', this.HintData.offline_deposit)
          window.localStorage.setItem('withdraws', this.HintData.withdraw)
          window.localStorage.setItem('review', this.HintData.review)
        }
      }, 5000)
    },
    // 打开设置
    changeSet() {
      this.isShowSetting = !this.isShowSetting
    },
    // 修改开关
    change(key, val) {
      window.localStorage.setItem(key, val)
    },
    // 获取授信额度
    async getQuota() {
      if (!getToken()) return false
      const res = await this.$axios.request({
        url: '/quota',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        if (res.data) {
          this.quotaData.total_quota = res.data && res.data.total_quota ? res.data.total_quota : 0
          this.quotaData.surplus_quota =
            res.data && res.data.surplus_quota ? res.data.surplus_quota : 0
          this.quotaData.use_quota = res.data && res.data.use_quota ? res.data.use_quota : 0
        }
      }
    },
    //语言切换设置
    languageChange(e){
      this.languageSet(e)
      // location.reload()
    }
  }
}
</script>
