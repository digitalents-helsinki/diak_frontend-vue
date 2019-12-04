import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { fi } from './translations/fi'

Vue.use(VueI18n)

const messages = {
  fi: fi
}

const i18n = new VueI18n({
  locale: 'fi',
  fallbackLocale: 'fi',
  messages
})

export default i18n