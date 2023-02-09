import axios from 'axios'
import i18n from "@/i18n/i18n";
import router from '@/router';
import tools from '@/util/tools.js'
import store from '@/store'
const CryptoJS = require("crypto-js");

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 120000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (!config.headers['token']) {
      config.headers['token'] = `${window.localStorage.getItem(store.state.useAuthorization) || ''}`;
    }

    return config;
  },
  err => Promise.reject(err)
)


// response interceptor
service.interceptors.response.use(
  response => {
    console.log(response)
    let res = response.data
    console.log(typeof res.data)
    if (typeof res.data === 'string') {
      console.log(res.data)
      var bytes  = CryptoJS.AES.decrypt(res.data, CryptoJS.enc.Utf8.parse(process.env.VUE_APP_AES_SECRET_KEY), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
        iv: '',
      });
      console.log(bytes)
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log(decryptedData)
      res.data = decryptedData
    }
    if (res.errno === 100) {
      if(!store.state.connected){
        tools.message(i18n.global.t('global.needLogin'), "error");
        store.dispatch("signLogin");
      }else{
        store.dispatch("signLogin");
      }
      return res;
    } else if (res.errno === 502) {
      tools.message(i18n.global.t('global.err502'), "error");
      return res;
    } if (res.errno === 401) {
      tools.message(i18n.global.t('global.errParams'), "error");
      return res;
    } if (res.errno === 402) {
      tools.message(i18n.global.t('global.errParams'), "error");
      return res;
    } else if (res.errno !== 0) {
      return res;
    } else {
      return res;
    }
  }, error => {
    return {
      errno: 400,
      errmsg: error.message,
    }
  }
)

export default service
