import router from './router'
import { isMobile } from '@/util/main'
import { translate } from './languages/i18n'

router.beforeEach(async (to, from, next) => {
  let {query} = to
  let {language, channel} = query
  if (language && language !== 'null') {
    localStorage.setItem('locale', language)
  }
  if (channel) {
    localStorage.setItem('theChannel', channel)
  }
  // console.log(to.path)
  // if (Config.tradeUrls.indexOf(to.path) >= 0 && isMobile()) {
  //   location.href = Config.TradeUrl + '#' + to.path
  // } else {
  //   next()
  // }
  // console.log(to.hash)
  if (to.hash.indexOf('#') === 0) {
    let m = to.hash.substring(1)
    next(m)
  }
  // 各路由需要修改title，便于神策系统收集数据
  document.title = translate('pagetitles.' + to.name);
  // 帮助中心移动端pc端切换
  if (isMobile() && to.path.indexOf('/question') >= 0) {
    if (query.aidx) {
      next({ path: '/ques/m/detail', query})
    } else {
      next({ path: '/ques/m/index', query})
    }
  } else if (!isMobile() && to.path.indexOf('/ques/m') >= 0) {
    next({ path: '/question', query})
  } else {
    next()
  }
})
