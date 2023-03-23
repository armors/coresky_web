<template>
	<!-- @scroll="pageScroll" -->
	<!-- <div class="app-wrapper" id="common-wraper" ref="appWrapperRef"> -->

	<template v-if="$route.name !== 'launch'">
		<HeaderTemplate />
		<router-view style="min-height:calc(100vh - 276px)" />
		<welcomeDialog
			:isShowWelcomeDialog="this.firstStatus"
			v-if="this.firstStatus"
			@handleClose="handleClose"
		></welcomeDialog>
	</template>
	<template v-else>
		<router-view />
	</template>

	<!-- </div> -->
</template>

<script>
import { mapState, mapActions } from 'vuex';
import HeaderTemplate from './views/layout/HeaderTemplate';

import BodyTemplate from './views/layout/BodyTemplate';
import welcomeDialog from './views/sections/corecard/welcomeDialog.vue';

export default {
	name: 'App',
	beforeCreate: async function() {
		await this.$store.dispatch('config');
		// await this.$store.dispatch("categorys");
		// await this.$store.dispatch("payTokens");
		// this.$store.dispatch("countNotices");
		this.$store.commit('WEB_LOADING', true);
	},
	data() {
		return {
			isRouterAlive: true,
			isScrollTop: true,
			firstStatus: false,
			address: [],
		};
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
		...mapState({
			currentView: (state) => state.currentView,
		}),
		webLoading() {
			return this.$store.state.webLoading;
		},
		layout() {
			return this.$route.meta.layout || 'default';
		},
	},
	components: {
		HeaderTemplate,
		BodyTemplate,
		welcomeDialog,
	},
	watch: {
		$route(newRoute) {
			this['changeCurrentRouteTo'](newRoute);
			this['setCurrentView'](newRoute);
			// newRoute.meta.layout || 'defalut'
			// console.log(newRoute)
		},
		user(val1, val2) {
			if (val1.coinbase != val2.coinbase && this.user.coinbase) {
				let localAdd = JSON.parse(localStorage.getItem('address'));
				if (localAdd.includes(val1.coinbase)) {
					localStorage.setItem('userFirst', false);
				} else {
					localStorage.removeItem('userFirst');
					this.firstStatus = true;
				}
				this.reload();
			}
		},
	},
	updated() {
		let localAdd = localStorage.getItem('address')
			? JSON.parse(localStorage.getItem('address'))
			: [];
		if (!localAdd.includes(this.user.coinbase)) {
			localAdd.push(this.user.coinbase);
		}
		localStorage.setItem('address', JSON.stringify(localAdd));
	},
	mounted() {
		if (localStorage.getItem('userFirst') === null) {
			localStorage.setItem('userFirst', true);
			this.firstStatus = true;
		}

		this['changeCurrentRouteTo'](this.$route);
		this['setCurrentView'](this.$route);
		setTimeout(() => {
			this.initWeb3();
		}, 300);
		console.log(this.$route);
		// this.$refs.appWrapperRef.addEventListener
	},
	destroyed() {
		clearInterval(this.$store.state.heartbeatTimer);
	},
	methods: {
		reload() {
			this.isRouterAlive = false;
			this.$store.dispatch('authinfo');
			this.$nextTick(function() {
				this.isRouterAlive = true;
			});
		},
		handleClose(val) {
			this.firstStatus = val;
		},
		async connectWalletE() {
			let connected = this.$web3.checkWeb3();
			console.log('connectWalletE', connected);
			if (!connected) {
				setTimeout(() => {
					this.connectWalletE();
				}, 1000);
			} else {
				if (connected) {
					const changeNet = await this.$web3.changeNetwork(
						this.$tools.network()
					);
					if (typeof changeNet == 'object' && changeNet.error) {
						return;
					}
					let result = await this.$store.dispatch(
						'connectAndSign',
						'init'
					);
					console.log(result);
					// 连接成功，则重新加载用户信息
					// this.$store.dispatch("reload");
					// this.$store.dispatch("authinfo");
				}
			}
		},
		initWeb3() {
			// console.log('initWeb3')
			// var connected = this.$web3.checkWeb3();
			// let result = await this.$store.dispatch("connectAndSign");
			// console.log(result)

			this.connectWalletE();
			// let connected = this.$web3.checkWeb3();
			// if (!connected) {
			//   setTimeout(() => {
			//     let connected = this.$web3.checkWeb3();
			//   })
			// } else {
			//   if (connected) {
			//     let result = await this.$store.dispatch("connectAndSign");
			//     // 连接成功，则重新加载用户信息
			//     // this.$store.dispatch("reload");
			//     // this.$store.dispatch("authinfo");
			//   }
			// }
		},
		...mapActions(['changeCurrentRouteTo', 'setCurrentView']),
	},
};
</script>

<style lang="scss">
html,
body {
	// height: 100%;
}
#app {
	// height: 100%;
}
.router-view {
	width: 100%;
	height: auto;
	// position: absolute;
	top: 0;
	bottom: 0;
	margin: 0 auto;
	margin-top: -76px;
	-webkit-overflow-scrolling: touch;
}
.app-wrapper {
	position: relative;
	width: 100%;
	min-height: 100vh;
	// height: 100vh;
	// overflow-y: auto;
}
</style>

<style lang="scss"></style>
