import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
import { getLang, setLang } from '@/utils/auth'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import path from 'path'

Vue.use(VueI18n)

const defaultLang = 'en'

function getLanguage() {
  const language = window.navigator.language
  // const lang = getLang() || window.localStorage.getItem('lang') || language && language.substring(0, 2) || defaultLang
  const lang = 'en'
  return lang
}

const langList = [
  {
    value: 'zh',
    text: '中文'
  },
  {
    value: 'en',
    text: 'English'
  }
]
const additionalMesssageMap = {
  en: enLocale,
  zh: zhLocale
}
const messages = {}

// inject custom language
const context = require.context('./lang/', true, /\.(yml|yaml)/)
context.keys().forEach(pathName => {
  const matchDirectory = pathName.match(/^\.\/(\w+).+$/)
  const directoryName = matchDirectory[1]
  if (!directoryName) return

  if (!messages[directoryName]) {
    messages[directoryName] = {}
  }

  if (['index.yml', 'index.yaml'].includes(path.basename(pathName))) {
    Object.assign(messages[directoryName], context(pathName))
  } else {
    const matchFileName = path.basename(pathName).match(/(\w+)\.\w+/)
    const fileName = matchFileName[1]
    messages[directoryName][fileName] = context(pathName)
  }
})
console.log(messages)
// inject element ui language
Object.keys(additionalMesssageMap).forEach(langKey => {
  messages[langKey] && Object.assign(messages[langKey], additionalMesssageMap[langKey])
})

// set language
const lang = getLanguage()
// setLang(lang)
setLang('en')

const i18n = new VueI18n({
  local: lang,
  messages
})
i18n.locale = lang

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.$t = (key, value) => i18n.t(key, value)

export {
  defaultLang,
  getLanguage,
  langList
}

export default i18n
