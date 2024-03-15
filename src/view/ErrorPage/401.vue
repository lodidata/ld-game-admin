<template>
  <ErrorContent code="401" :desc="i18n_lang.errorPage0" :src="src" />
</template>

<script>
import error401 from '@/assets/images/error-page/error-401.svg'
import ErrorContent from './ErrorContent.vue'
export default {
  name: 'Error401',
  components: {
    ErrorContent
  },
  data() {
    const i18n_lang = this.$t('errorPage');
    return {
      i18n_lang: i18n_lang,
      src: error401
    }
  }
}
</script>
