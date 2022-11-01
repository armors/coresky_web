import request from '../util/request'
import Config from '../util/config'
import axios from 'axios'

export function getJson (url) {
  console.log(import.meta.env)
  let baseUrl = import.meta.env.VITE_APP_BASE_STATIC_URL
  return new Promise((resolve, reject) => {
    axios.get(`${baseUrl}${url}`).then(data => {
      if (data.status === 200) {
        resolve(data.data)
      } else {
        reject(new Error(data.statusText))
      }
    }).catch(e => {
      reject(e)
    })
  })
}

export function getAllTokenInfo (data) {
  return request({
    url: Config.hostUrl + '/get_all_token_info',
    method: 'post',
    signValidate: true,
    data
  })
}

export function getTokenPrice (data) {
  return request({
    url: Config.hostUrl + '/get_token_price_v2',
    method: 'post',
    signValidate: true,
    data
  })
}

export function getTdexInfo (data) {
  return request({
    url: Config.hostUrl + '/get_dex_info',
    method: 'post',
    signValidate: true,
    data
  })
}

export function channelDownload (data) {
  return request({
    url: Config.hostUrlNew + '/api/download',
    method: 'post',
    signValidateV2: true,
    data
  })
}
