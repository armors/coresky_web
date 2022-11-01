import request from '../util/request'
// import Config from '../utils/config'

export function getCountryUseInfo () {
  return request({
    url: '//map.api.teco.news/analysis/collector/apiCountryUseInfo',
    method: 'get'
  })
}
