import { useI18n } from 'vue-i18n'

export const useLang = () => {
  const { t, locale, availableLocales } = useI18n()
  return {
    t,
    locale,
    availableLocales,
  }
}
