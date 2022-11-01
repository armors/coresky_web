import {
  getCountryUseInfo
} from '@/api/map'

// import { resetRouter } from './router'

const getDefaultState = () => {
  return {
  }
}

const state = getDefaultState()

const mutations = {
}

const actions = {
  getCountryUseInfo () {
    return new Promise((resolve, reject) => {
      getCountryUseInfo().then(response => {
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
