<template>
  <ErrorContent code="404" :desc="i18n_lang.errorPage1" :src="src" />
</template>

<script>
import error404 from '@/assets/images/error-page/error-404.svg'
import ErrorContent from './ErrorContent.vue'
export default {
  name: 'Error404',
  components: {
    ErrorContent
  },
  data() {
    const i18n_lang = this.$t('errorPage');
    return {
      i18n_lang: i18n_lang,
      src: error404
    }
  }
}
</script>
