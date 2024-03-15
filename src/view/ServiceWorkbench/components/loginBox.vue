<template>
  <div v-if="serviceShow" id="loginBox">
    <Modal v-model="serviceShow" width="400" :mask-closable="false" :closable="false">
      <p slot="header" style="text-align:center">
        <span>{{i18n_lang.serviceWorkbench34}}</span>
      </p>
      <div>
        <Form ref="formData" :model="formData" :label-width="80" :rules="ruleSet">
          <FormItem :label="i18n_lang.serviceWorkbench35" prop="name">
            <Input v-model="formData.name" :placeholder="i18n_lang.serviceWorkbench36"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" :loading="loading" @click="handleSubmit">{{i18n_lang.serviceWorkbench37}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    const i18n_lang = this.$t('serviceWorkbench');
    return {
      i18n_lang: i18n_lang,
      loading: false,
      serviceShow: true,
      formData: {
        name: ''
      },
      ruleSet: {
        name: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value !== '') {
                if (/[`~!@#$%^&*()_+<>?:"{},.\/'[\]]/.test(value)) {
                  callback(new Error(i18n_lang.serviceWorkbench38))
                }
                callback()
              } else {
                callback(new Error(i18n_lang.serviceWorkbench39))
              }
            }
          },
          { type: 'string', min: 2, max: 8, message: i18n_lang.serviceWorkbench36, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['formData'].validate(valid => {
        if (!valid) return
        const data = { nickname: this.formData.name }
        this.$emit('handleRequestEvent', 'setServiceName', data)
      })
    }
  }
}
</script>
