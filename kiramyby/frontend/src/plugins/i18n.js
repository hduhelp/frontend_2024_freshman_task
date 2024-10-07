import { createI18n } from 'vue-i18n'
import { en, zhHans } from 'vuetify/locale'
import  en_self  from '@/i18n/en_self'
import zhHans_self from '@/i18n/zhHans_self'

const messages = {
  en: {
    $vuetify: {
      ...en
    },
    ...en_self
  },
  zhHans: {
    $vuetify: {
      ...zhHans
    },
    ...zhHans_self
  }
}

const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'zhHans',
  fallbackLocale: 'en',
  messages
})

export default i18n
