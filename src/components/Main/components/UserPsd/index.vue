<template>
  <div>
    <Modal
      :value="psdState == 11050 || psdState == 11051" :title="psdState == 11050 ? `${i18n_lang.components291_v1_2_4_6}` : `${i18n_lang.components292_v1_2_4_6}`"
      :mask-closable="false"
      :closable="false"
    >
      <Form v-if="psdState == 11050" ref="psdInfo" :model="psdInfo" :label-width="120" :rules="psdRule">
        <FormItem :label="`${i18n_lang.components293_v1_2_4_6}`" prop="pw">
          <Input v-model="psdInfo.pw" :placeholder="` `"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.components294_v1_2_4_6}`" prop="pw_confirm">
          <Input v-model="psdInfo.pw_confirm" :placeholder="` `"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.components295_v1_2_4_6}`" prop="pin_pw">
          <Input v-model="psdInfo.pin_pw" :placeholder="` `"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.components296_v1_2_4_6}`" prop="pin_pw_confirm">
          <Input v-model="psdInfo.pin_pw_confirm" :placeholder="` `"></Input>
        </FormItem>
      </Form>
      <div slot="footer" v-if="psdState == 11050">
        <Button type="primary" :loading="loading.btn" @click="savePsd()">{{`${i18n_lang.components300_v1_2_4_6}`}}</Button>
      </div>
      <Form v-if="psdState == 11051" ref="pinInfo" :model="pinInfo" :label-width="120" :rules="pinRule">
        <FormItem :label="`${i18n_lang.components297_v1_2_4_6}`" prop="old_pin_pw">
          <Input v-model="pinInfo.old_pin_pw" :placeholder="` `"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.components298_v1_2_4_6}`" prop="pin_pw">
          <Input v-model="pinInfo.pin_pw" :placeholder="` `"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.components299_v1_2_4_6}`" prop="pin_pw_confirm">
          <Input v-model="pinInfo.pin_pw_confirm" :placeholder="` `"></Input>
        </FormItem>
      </Form>
      <div slot="footer" v-if="psdState == 11051">
        <Button type="primary" :loading="loading.btn" @click="savePin()">{{`${i18n_lang.components300_v1_2_4_6}`}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  const psdInfo = {
    pw: "",
    pw_confirm: "",
    pin_pw: "",
    pin_pw_confirm: ""
  }
  const pinInfo = {
    old_pin_pw: "",
    pin_pw: "",
    pin_pw_confirm: ""
  }
  export default {
    name: 'UserPsd',
    components: {},
    props: {},
    data() {
      const i18n_lang = this.$t('components');
      return {
        i18n_lang: i18n_lang,
        loading: {
          btn: false
        },
        visible: true,
        psdInfo: { ...psdInfo },
        pinInfo: { ...pinInfo },
        psdRule: {
          pw: [{ required: true, message: `${i18n_lang.components301_v1_2_4_6}` }],
          pw_confirm: [
            { required: true, message: `${i18n_lang.components302_v1_2_4_6}` },
            {
              validator: (rule, value, cb) =>
                this.psdInfo.pw === this.psdInfo.pw_confirm ? cb() : cb(`${i18n_lang.components303_v1_2_4_6}`)
            }
          ],
          pin_pw: [{ required: true, message: `${i18n_lang.components304_v1_2_4_6}` }],
          pin_pw_confirm: [
            { required: true, message: `${i18n_lang.components305_v1_2_4_6}` },
            {
              validator: (rule, value, cb) =>
                this.psdInfo.pin_pw === this.psdInfo.pin_pw_confirm ? cb() : cb(`${i18n_lang.components306_v1_2_4_6}`)
            }
          ]
        },
        pinRule: {
          old_pin_pw: [{ required: true, message: `${i18n_lang.components307_v1_2_4_6}` }],
          pin_pw: [{ required: true, message: `${i18n_lang.components308_v1_2_4_6}` }],
          pin_pw_confirm: [
            { required: true, message: `${i18n_lang.components309_v1_2_4_6}` },
            {
              validator: (rule, value, cb) =>
                this.pinInfo.pin_pw === this.pinInfo.pin_pw_confirm ? cb() : cb(`${i18n_lang.components310_v1_2_4_6}`)
            }
          ]
        }
      }
    },
    computed: {
      ...mapState({
        psdState: state => state.detail.psdState
      })
    },
    mounted() {},
    methods: {
      // 修改密码
      async savePsd(){
        this.$refs['psdInfo'].validate(async valid => {
          if (valid) {
            this.loading.btn = true
            const res = await this.$axios.request({
              url: '/admin/resetPw',
              method: 'PATCH',
              data: {
                ...this.psdInfo
              }
            })
            this.loading.btn = false
            if (res.status !== 200 || res.state !== 0) {
              this.$store.commit(`detail/setPsdState`, 11050)
              this.$msg({
                type: 'error',
                message: res.message
              })
              return false
            }
            location.reload()
          }
        })
      },
      // 修改PIN密码
      async savePin(){
        this.$refs['pinInfo'].validate(async valid => {
          if (valid) {
            this.loading.btn = true
            const res = await this.$axios.request({
              url: '/admin/resetPinPw',
              method: 'PATCH',
              data: {
                ...this.pinInfo
              }
            })
            this.loading.btn = false
            if (res.status !== 200 || res.state !== 0) {
              this.$store.commit(`detail/setPsdState`, 11051)
              this.$msg({
                type: 'error',
                message: res.message
              })
              return false
            }
            location.reload()
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
