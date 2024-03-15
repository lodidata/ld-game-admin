<template>
  <div id="Login" class="login">
    <div class="login-con">
      <Card icon="log-in" :title="i18n_lang.login0" :bordered="false">
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
            <FormItem v-if="isFirstClickLoginBtn" prop="username">
              <Input v-model="form.username" :placeholder="i18n_lang.login1">
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
                <Input v-model="form.googlecode" class="authcode" :placeholder="i18n_lang.login7" />
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
    const [username, password] = window.localStorage.getItem('u_p')
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
        username,
        password,
        authcode: '',
        googlecode: ''
      },
      authcode: {
        image: '',
        token: ''
      },
      rules: {
        username: [{ required: true, message: i18n_lang.login10, trigger: 'blur' }],
        password: [{ required: true, message: i18n_lang.login11, trigger: 'blur' }],
        authcode: [{ required: true, message: i18n_lang.login12, trigger: 'blur' }]
      },
      googleStatus: -1,
      qrCodeUrl: '',
      isFirstClickLoginBtn: true,
      authorize_state: -1
    }
  },
  created() {
    // this.getAuthCode()
    this.getGoogleSwitch()
  },
  mounted() {
    wave.init()
  },
  beforeDestroy() {
    wave.destroyed()
  },
  methods: {
    ...mapActions({
      handleLogin: 'user/handleLogin'
    }),
    ...mapMutations({
      setAuth: 'user/setAuth',
      setToken: 'user/setToken',
      setUserInfo: 'user/setUserInfo'
    }),
    // 获取验证码
    async getAuthCode() {
      this.loading.authcode = true
      const res = await this.$axios.request({
        url: '/admin/login/imagecode',
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
    // 登录
    async handleSubmit() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return
        this.loading.login = true

        const { username, password, authcode, googlecode } = this.form
        
        const req = {
          username,
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
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          this.getAuthCode()
          return
        }

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
          this.qrCodeUrl = res.data.qrCodeUrl
        } else {
          if(res.data.token){
            const userInfo = res.data.list
            localSave('u_p', `${username}_${password}`)
            this.setAuth(res.data.route2)
            this.setToken(res.data.token.trim())
            this.setUserInfo(userInfo)
            this.$Notice.open({
              title: res.data.list.username,
              desc: this.i18n_lang.login13,
              duration: 2
            })
            this.$router.push({
              name: this.$config.homeName
            })
          }else{
            this.$msg({
              type: 'error',
              message: res.message
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scope>
@import './index.less';
</style>
