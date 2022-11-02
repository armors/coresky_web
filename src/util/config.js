const isDebug = true
export default {
  isDebug,
  chainName: 'Sepolia test network',
  // cdn地址
  cdnUrl: import.meta.env.VITE_APP_CDN_URL,
  // 请求地址
  hostUrl: import.meta.env.VITE_APP_AJAX_HOST,
  hostUrlNew: import.meta.env.VITE_APP_AJAX_HOST_NEW,
  TradeUrl: import.meta.env.VITE_APP_TRADE_URL,
  DVoteUrl: import.meta.env.VITE_APP_DVOTE_URL,
  BaseUrl: import.meta.env.VITE_APP_BASE_URL,
  wttUrl: import.meta.env.VITE_APP_WTT_URL,
  scsaUrl: import.meta.env.VITE_APP_SCSA_URL,
  contactUrl: {
    twitterurl: 'https://twitter.com/MetaTdex',
    mediumurl: 'https://medium.com/@MetaTdex',
    youtubourl: 'https://www.youtube.com/channel/UCWmV6shl0_x_-by052fwcaQ',
  },
  languages: [
    {
      local: 'zh',
      txt: '中文'
    },
    {
      local: 'en',
      txt: 'English'
    },
  ],
}
