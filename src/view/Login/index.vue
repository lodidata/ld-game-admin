<template>
  <div id="Login" class="login">
    <div class="login-con">
      <Card icon="log-in" :title="i18n_lang.login0" :bordered="false">
        <div class="form-con">
          <!-- @keydown.enter.native="handleSubmit" -->
          <Form ref="loginForm" :model="form" :rules="isFirstClickLoginBtn ? rules : rules2" @submit.native.prevent @keydown.enter.native="handleSubmit">
            <FormItem v-if="isFirstClickLoginBtn" prop="admin_name">
              <Input v-model="form.admin_name" :placeholder="i18n_lang.login1">
              <span slot="prepend">
                <Icon :size="16" type="ios-person" />
              </span>
              </Input>
            </FormItem>
            <FormItem v-if="isFirstClickLoginBtn" prop="password">
              <Input v-model="form.password" type="password" :placeholder="i18n_lang.login2">
              <span slot="prepend">
                <Icon :size="14" type="md-lock" />
              </span>
              </Input>
            </FormItem>
            <FormItem v-if="authorize_state === 0" prop="authcode">
              <Input v-model="form.authcode" class="authcode" :placeholder="i18n_lang.login3">
              <div slot="prepend">
                <div class="authcodeBox">
                  <Spin v-if="loading.authcode" fix />
                  <div class="con" @click="getAuthCode">
                    <img v-if="authcode.image" :src="authcode.image" alt />
                    <span v-else>{{i18n_lang.login4}}</span>
                  </div>
                </div>
              </div>
              </Input>
            </FormItem>
            <FormItem v-if="!isFirstClickLoginBtn && authorize_state === 1" prop="googlecode">
              <div class="google">
                <p v-if="googleStatus === 0" class="title">{{i18n_lang.login5}}</p>
                <img v-if="googleStatus === 0" :src="qrCodeUrl" alt />
                <p v-if="googleStatus === 1" class="title">{{i18n_lang.login6}}</p>
                <Input v-model="form.googlecode" class="authcode" :placeholder="i18n_lang.login7"></Input>
              </div>
            </FormItem>
            <FormItem class="login-box">
              <Button
                type="primary"
                long
                clo
                :loading="loading.login"
                @click="handleSubmit"
              >{{ loading.login ? i18n_lang.login8 : i18n_lang.login9 }}</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import { localSave } from '@/libs/util'
import wave from '@/assets/js/wave'
export default {
  name: 'Login',
  data() {
    // 缓存的账户信息
    const [admin_name, password] = window.localStorage.getItem('u_p')
      ? window.localStorage.getItem('u_p').split('_')
      : ['', ''];
    const i18n_lang = this.$t('login');
    return {
      i18n_lang: i18n_lang,
      loading: {
        login: false,
        authcode: false
      },
      form: {
        admin_name,
        password,
        authcode: '',
        googlecode: ''
      },
      authcode: {
        image: '',
        token: ''
      },
      rules: {
        admin_name: [{ required: true, message: i18n_lang.login10, trigger: 'blur' }],
        password: [{ required: true, message: i18n_lang.login11, trigger: 'blur' }],
        authcode: [{ required: true, message: i18n_lang.login12, trigger: 'blur' }]
      },
      rules2: {
        googlecode: [{required: true, message: i18n_lang.login7, trigger: 'blur'}]
      },
      googleStatus: -1,
      qrCodeUrl: '',
      isFirstClickLoginBtn: true,
      authorize_state: -1
    }
  },
  created() {
    // this.getAuthCode()
    if(!sessionStorage.getItem('languageList')){
      // this.languageList()
      this.getAuthCode()
    }else{
      this.getAuthCode()
    }
  },
  mounted() {
    wave.init()
  },
  beforeDestroy() {
    wave.destroyed()
  },
  methods: {
    ...mapActions({
      handleLogin: 'user/handleLogin',
      // languageList: 'app/languageList'
    }),
    ...mapMutations({
      setAuth: 'user/setAuth',
      setToken: 'user/setToken',
      setUserInfo: 'user/setUserInfo',
      tabAccess: 'user/setTabAccess',
      allRoutes: 'user/setAllRoutes'
    }),
    // 获取验证码
    async getAuthCode() {
      this.loading.authcode = true
      const res = await this.$axios.request({
        url: '/admin/login/code',
        method: 'GET'
      })
      this.loading.authcode = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      console.log(res.data)
      this.authorize_state = 0
      this.authcode = {
        image: res.data.images,
        token: res.data.token
      }
      this.form.authcode = ''
    },
    async getGoogleSwitch() {
      const res = await this.$axios.request({
        url: '/admin/login/googleSwitch',
        method: 'GET'
      })
      if (res.state !== 0) {
        this.authorize_state = 0
        this.getAuthCode()
        return
      }
      res.data.authorize_state ? '' : this.getAuthCode()
      this.authorize_state = res.data ? res.data.authorize_state : 0
    },
    enterKeyDown(){
      console.log(123)
    },
    // 登录
    async handleSubmit(number) {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return
        this.loading.login = true

        const { admin_name, password, authcode, googlecode } = this.form

        const req = {
          admin_name,
          password
        }
        if (this.authorize_state === 1) {
          if (this.googleStatus === 0 || this.googleStatus === 1) {
            req.googleCode = googlecode
          }
        } else {
          req.code = authcode
          req.token = this.authcode.token
        }
        // const res = await this.handleLogin({ req })
        const res = await this.$axios.request({
          method: 'POST',
          url: '/admin/login',
          data: req
        })
        this.loading.login = false
        if(res.status !== 200 || res.state != 1){
          if (this.authorize_state === 1 && this.isFirstClickLoginBtn) {
            if (res.state !== 0) {
              this.isFirstClickLoginBtn = true
              this.$msg({
                type: 'error',
                message: res.message
              })
              return
            }
            this.isFirstClickLoginBtn = false
            this.googleStatus = res.data.status
            this.qrCodeUrl = res.data.qrCodeUrl ? res.data.qrCodeUrl : ''
          } else {
            this.$msg({
              type: 'error',
              message: res.message
            })
            if(this.isFirstClickLoginBtn){
              this.getAuthCode()
            }
            return
          }
        }

        if(res.data.token){
          const userInfo = res.data.info
          localSave('u_p', `${admin_name}_${password}`)
          this.setAuth([0].concat(res.data.route))
          this.setToken(res.data.token)
          this.setUserInfo(userInfo)
          // this.tabAccess(res.data.special_routes) Array.from(new Array(100).keys())
          this.allRoutes([0].concat(res.data.route))
          //this.allRoutes(res.data.route)
          this.$Notice.open({
            title: res.data.info.admin_name,
            desc: this.i18n_lang.login13,
            duration: 2
          })
          this.$router.push({
            path: '/home'
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scope>
@import './index.less';
</style>
