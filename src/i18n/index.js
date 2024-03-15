import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh_CN from 'iview/dist/locale/zh-CN';
import zh from '../../static/lang/zh-cn.json';
import th_TH from 'iview/dist/locale/th-TH';
import th from '../../static/lang/th.json';
import en_US from 'iview/dist/locale/en-US';
import en from '../../static/lang/en-us.json';
import es_Mx from 'iview/dist/locale/es-ES';
import es from '../../static/lang/es-mx.json';

let locale = localStorage.getItem('language') || 'zh-cn'

// i18n语音国际化翻译
Vue.use(VueI18n)

Vue.locale = () => {};

const i18n = new VueI18n({
  locale: locale, //locale
  messages: {
    'zh-cn': {
      ...zh,
      ...zh_CN
    },
    'th': {
      ...th,
      ...th_TH
    },
    'en-us': {
      ...en,
      ...en_US
    },
    'es-mx': {
      ...es,
      ...es_Mx
    }
  }
})

export default i18n
