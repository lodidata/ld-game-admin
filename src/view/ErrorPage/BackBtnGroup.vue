<template>
  <div>
    <Button size="large" type="text" @click="backHome">{{i18n_lang.errorPage3}}</Button>
    <Button size="large" type="text">{{i18n_lang.errorPage4}}({{ second }}s)</Button>
  </div>
</template>

<script>
import './error.less'
export default {
  name: 'BackBtnGroup',
  data() {
    const i18n_lang = this.$t('errorPage');
    return {
      i18n_lang: i18n_lang,
      second: 5,
      timer: null
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev()
      else this.second--
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    backHome() {
      this.$router.replace({
        name: this.$config.homeName
      })
    },
    backPrev() {
      this.$router.go(-1)
    }
  }
}
</script>
