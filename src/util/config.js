const isDebug = false
export default {
  isDebug,
  chainName: 'HECO',
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
    // {
    //   local: 'tr',
    //   txt: 'Türk'
    // },
    // {
    //   local: 'fa',
    //   txt: 'فارسی'
    // }
  ],
  noMoreHtml: (txt = '') => {
    return `<p class="upwarp-nodata">${txt}</p>`
  },
  tradeUrls: [
    '/trade/index',
    '/trade/detail',
    '/trade/history',
    '/trade/record',
    '/trade/kline',
    '/mine/index',
    '/mine/detail',
    '/mine/withlist',
    '/mine/rule',
    '/mine/rebate',
    '/mine/rebatewithlist',
    '/rebate/index',
    '/rebate/withlist',
    '/box/index',
    '/box/child',
    '/map/index',
    '/pool/index',
    '/pool/detail'
  ],
  tradeMenus: [
    {
      key: 'menu.index',
      url: '/trade/index',
      type: 'market'
    },
    {
      key: 'menu.trade',
      url: '/trade/detail',
      type: 'trade'
    },
    {
      key: 'menu.mine',
      url: '/mine/index',
      type: 'mine'
    },
    {
      key: 'menu.minerebate',
      url: '/mine/rebate',
      type: 'mine'
    },
    {
      key: 'menu.pool',
      url: '/pool/index',
      type: 'pool'
    },
    {
      key: 'menu.rebate',
      url: '/rebate/index',
      type: 'rebate'
    },
    {
      key: 'menu.box',
      url: '/box/index',
      type: 'box'
    },
    {
      key: 'menu.map',
      url: '/map/index',
      type: 'map'
    }
  ]
}
