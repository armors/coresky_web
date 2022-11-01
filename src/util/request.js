import axios from 'axios'
const service = axios.create({
  //baseURL: Config.ajaxUrl,
  timeout: 30 * 1000
})

service.interceptors.request.use(
  config => {
    // console.log(config.data)
    // config.data.app_version = appVersion
    let theParams = config.data
    if (config.signValidateV2) {
      config.headers['Content-Type'] = 'application/json'
      config.data = theParams
    } else {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  error => {
    console.log('intercepter .config error = ',error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    // console.log('intercepter response = > ',response.data)
    const res = response.data
    return res
  },
  error => {
    //网络请求失败等
    console.log('request error = ',error)
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
