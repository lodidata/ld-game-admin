<template>
  <div id="Password">
    <Tabs v-model="curTab" type="card" :animated="false">
      <TabPane :label="i18n_lang.components135" name="loginpw">
        <div v-if="curTab === 'loginpw'">
          <Form
            ref="passwordForm"
            :model="passwordForm"
            :label-width="80"
            :rules="ruleValidate"
            style="width: 400px"
          >
            <FormItem :label="i18n_lang.components136" prop="new">
              <Input v-model="passwordForm.new" :placeholder="i18n_lang.components137"/>
            </FormItem>
            <FormItem :label="i18n_lang.components138" prop="newRe">
              <Input v-model="passwordForm.newRe" :placeholder="i18n_lang.components139"/>
            </FormItem>
          </Form>
        </div>
      </TabPane>
      <TabPane :label="i18n_lang.components140" name="withdrawpw">
        <div v-if="curTab === 'withdrawpw'">
          <Form
            ref="passwordForm"
            :model="passwordForm"
            :label-width="80"
            :rules="ruleValidate"
            style="width: 400px"
          >
            <FormItem :label="i18n_lang.components136" prop="new">
              <Input v-model="passwordForm.new" :placeholder="i18n_lang.components141"/>
            </FormItem>
            <FormItem :label="i18n_lang.components138" prop="newRe">
              <Input v-model="passwordForm.newRe" :placeholder="i18n_lang.components142"/>
            </FormItem>
          </Form>
        </div>
      </TabPane>
      <!-- <TabPane :label="i18n_lang.components143" name="freezepw">
        <div v-if="curTab === 'freezepw'">
          <Form
            ref="passwordForm"
            :model="passwordForm"
            :label-width="80"
            :rules="ruleValidate"
            style="width: 400px"
          >
            <FormItem :label="i18n_lang.components136" prop="new">
              <Input v-model="passwordForm.new" :placeholder="i18n_lang.components144"/>
            </FormItem>
            <FormItem :label="i18n_lang.components138" prop="newRe">
              <Input v-model="passwordForm.newRe" :placeholder="i18n_lang.components145"/>
            </FormItem>
          </Form>
        </div>
      </TabPane> -->
      <Button type="primary" class="btn" :loading="loading.btn" @click="changePassword">{{i18n_lang.components146}}</Button>
    </Tabs>
  </div>
</template>
<script>
const initPassword = {
  new: '',
  newRe: ''
}
import { mapMutations } from 'vuex'
export default {
  name: 'Password',
  props: ['id'],
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      curTab: 'loginpw',
      loading: {
        btn: false
      },
      passwordForm: { ...initPassword }, // 修改密码
      ruleValidate: {
        new: [{ required: true, message: i18n_lang.components147, trigger: 'blur' }],
        newRe: [
          { required: true, message: i18n_lang.components148, trigger: 'blur' },
          {
            validator: (rule, value, cb) =>
              this.passwordForm.new === this.passwordForm.newRe ? cb() : cb(i18n_lang.components149)
          }
        ]
      }
    }
  },
  watch: {
    curTab(val, oldVal) {
      if (val !== oldVal) {
        this.passwordForm = { ...initPassword }
      }
    }
  },
  methods: {
    ...mapMutations({
      setVisible: 'detail/setVisible'
    }),
    async changePassword() {
      const api = {
        loginpw: `/user/info/password/login/${this.id}`,
        withdrawpw: `/user/info/password/withdraw/${this.id}`,
        freezepw: `/user/info/password/freeze/${this.id}`
      }[this.curTab]
      this.$refs['passwordForm'].validate(async valid => {
        if (!valid) return
        const pw = this.passwordForm.new.trim()
        const regex = /^\d{4}$/g
        if (this.curTab === 'withdrawpw' && !regex.test(pw)) {
          this.$msg({
            type: 'error',
            message: this.i18n_lang.components150
          })
          return
        }
        this.loading.btn = true
        const res = await this.$axios.request({
          url: api,
          method: 'PUT',
          data: {
            password: pw,
            repassword: pw
          }
        })
        this.loading.btn = false
        this.$msg({
          type: res.status !== 200 || res.state === 11050 || res.state === 11051 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200 || res.state === 11050 || res.state === 11051) return
        this.setVisible(false)
      })
    }
  }
}
</script>
<style lang="less" scoped>
#Password {
  min-height: 300px;
  .btn {
    margin-left: 20px;
  }
}
</style>
