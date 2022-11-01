import {
  getAllTokenInfo,
  getTokenPrice,
  getTdexInfo,
  getJson,
  channelDownload
} from '@/api/system'

import { reactive } from 'vue'
// import { resetRouter } from './router'

const getDefaultState = () => {
  return {
    windowClientWidth: 0,
    usdtObj: {},
    miningAddress: '',
    tokenList: reactive([]),
    tokenstatu: false,
    shareCode: '',
    boxReady: false,
    rebateIndent: false,
    locale: 'en',
    isInApp: false,
    hasAssets: false
  }
}

const state = getDefaultState()

const mutations = {
  SET_HAS_ASSETS: (state, hasAssets) => {
    state.hasAssets = hasAssets
  },
  SET_SYSTEM_LOCALE: (state, locale) => {
    state.locale = locale
  },
  SET_REBATE_INDENT: (state, indent) => {
    state.rebateIndent = indent
  },
  SET_WINDOW_WIDTH: (state, width) => {
    state.windowClientWidth = width
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_TOKEN_STATUS: (state, tokenstatu) => {
    state.tokenstatu = tokenstatu
  },
  SET_USDT: (state, usdtObj) => {
    state.usdtObj = usdtObj
  },
  SET_MINING_ADD: (state, address) => {
    state.miningAddress = address
  },
  SET_TOKEN_LIST: (state, list) => {
    state.tokenList = list
  },
  SET_SHARE_CODE: (state, code) => {
    state.shareCode = code
  },
  SET_BOX_READY: (state, ready) => {
    state.boxReady = ready
  },
  SET_IS_IN_APP: (state, isIn) => {
    state.isInApp = isIn
  },
}

const actions = {
  setRebateIndent ({ commit }, indent) {
    return new Promise((resolve) => {
      commit('SET_REBATE_INDENT', indent)
      resolve()
    })
  },
  setWindowWidth ({ commit }, width) {
    return new Promise((resolve) => {
      commit('SET_WINDOW_WIDTH', width)
      resolve()
    })
  },
  setAccount ({ commit }, account) {
    return new Promise((resolve) => {
      commit('SET_ACCOUNT', account)
      resolve()
    })
  },
  setUsdt ({ commit }, usdtObj) {
    return new Promise((resolve) => {
      commit('SET_USDT', usdtObj)
      localStorage.setItem('usdtDecimals', usdtObj.decimals)
      resolve()
    })
  },
  setMiningAdd ({ commit }, address) {
    return new Promise((resolve) => {
      commit('SET_MINING_ADD', address)
      sessionStorage.setItem('miningAddress', address)
      resolve()
    })
  },
  getAllTokenInfo (store, {contract_list}) {
    return new Promise((resolve, reject) => {
      getAllTokenInfo({
        contract_list
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getTokenPrice (store, data) {
    return new Promise((resolve, reject) => {
      getTokenPrice(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getTdexInfo (store, data) {
    return new Promise((resolve, reject) => {
      getTdexInfo(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getJson (store, data) {
    return new Promise((resolve, reject) => {
      getJson(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  channelDownload (store, data) {
    return new Promise((resolve, reject) => {
      channelDownload(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
