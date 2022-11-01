import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/languages/i18n'
import store from '@/store'
import VueClipboard from 'vue-clipboard2'


import Web3 from 'web3'
import { Web3Connector } from './util/rpc'
import { PageLocales } from '@/util/locale'

import './permission'

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import directives from './directives/index'

Es6Promise.polyfill()

const app = createApp(App)
app.use(directives) // 调用安装指令

if(!String.prototype.myformat){
	String.prototype.myformat = function(){
		let e = arguments[0];
		return this.replace(/{(\w+)}/g, function(i,t){
			return typeof e[t] != "undefined" ? e[t] : i
		})
	};
}

app.config.globalProperties.Web3 = Web3
app.config.globalProperties.$rpc = new Web3Connector(Web3)

app.config.globalProperties.$local = new PageLocales()
VueClipboard.config.autoSetContainer = true

app.use(router)
app.use(i18n)
app.use(store)
app.use(VueClipboard)

app.mount('#app')
