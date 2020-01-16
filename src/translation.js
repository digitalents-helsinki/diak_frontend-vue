import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { fi } from './translations/fi'
import { sv } from './translations/sv'
import { en } from './translations/en'

Vue.use(VueI18n)

const messages = {
  fi,
  sv,
  en
}

const i18n = new VueI18n({
  locale: (cookieMatch => cookieMatch ? cookieMatch[1] : 'fi')(document.cookie.match(/(?:^|;\s*)3X10D_LANGUAGE=([^;]*)/)),
  fallbackLocale: 'fi',
  messages
})

export default i18n