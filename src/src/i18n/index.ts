import { createI18n } from 'vue-i18n'
import en from './en'
import fr from './fr'

export default createI18n({
  legacy: false,                        // Composition API
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fr
  }
})
