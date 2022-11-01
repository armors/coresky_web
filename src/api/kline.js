import request from '../util/request'
import Config from '../util/config'

export function get24hourInfo (data) {
  return request({
    url: Config.hostUrl + '/get_24_info',
    method: 'post',
    signValidate: true,
    data
  })
}

export function getKlineData (data) {
  return request({
    url: Config.hostUrl + '/get_k_line_data_v2_1',
    method: 'post',
    signValidate: true,
    data
  })
}
