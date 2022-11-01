import {
  get24hourInfo,
  getKlineData
} from '@/api/kline'

// import { resetRouter } from './router'

const getDefaultState = () => {
  return {
  }
}

const state = getDefaultState()

const mutations = {
}

const actions = {
  get24hourInfo (store, {
    contract,
    dex_contract
  }) {
    return new Promise((resolve, reject) => {
      get24hourInfo({
        contract,
        dex_contract
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getKlineData (store, datas) {
    return new Promise((resolve, reject) => {
      getKlineData(datas).then(response => {
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
