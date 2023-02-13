import { createI18n } from 'vue-i18n'
// import locale from 'element-plus/lib/locale';
import zh from './langs/zh'
import en from './langs/en'
import tw from './langs/tw'

import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import twLocale from 'element-plus/lib/locale/lang/zh-tw'



const messages = {
  en: Object.assign(en, enLocale),
  zh: Object.assign(zh, zhLocale),
  tw: Object.assign(tw, twLocale),
}

const i18n = new createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('locale') || 'en',
  messages
})
console.log(i18n)

//locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换

export default i18n
