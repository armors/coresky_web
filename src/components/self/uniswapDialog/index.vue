<template>
	<el-dialog :model-value="isShowUniswapDialog"
	           :show-close="true"
	           style="width: 440px"
	           :close-on-click-modal="true"
	           @closed="isShowUniswapDialog = false">
		<div id="reactApp"></div>
	</el-dialog>
</template>

<script>
	import React from 'react'; // 此处用的是 18 版本
	import * as ReactDOM from 'react-dom/client'; // 此处用的是 18 版本(写法有点改变)
	import { ETH, WETHContract } from 'uniswap-dapp-integration-shared'
	import UniswapReact from "@/components/self/uniswapReact";
	export default {
		name: "index",
		computed: {
			user() {
				return this.$store.state.user;
			}
		},
		components: {
			'Uniswap-React': UniswapReact
		},
		data () {
			return {
				uniswapDappSharedLogicContext: undefined,
				isShowUniswapDialog: false
			}
		},
		watch: {
			'$store.state.user': function (newval, oldval) {
			}
		},
		mounted() {
		},
		methods: {
			showUniswap (type) {
				let defaultInputTokenGEORLI
				let defaultOutputTokenGEORLI
				let defaultInputTokenMAINNET
				let defaultOutputTokenMAINNET
				let ethAddress = 'NATIVE'
				defaultInputTokenGEORLI = type === 'ETH' ? ethAddress : WETHContract.GORLI().contractAddress
				defaultOutputTokenGEORLI = type === 'ETH' ? WETHContract.GORLI().contractAddress : ethAddress
				defaultInputTokenMAINNET = type === 'ETH' ? ethAddress : WETHContract.MAINNET().contractAddress
				defaultOutputTokenMAINNET = type === 'ETH' ? WETHContract.MAINNET().contractAddress : ethAddress
				this.isShowUniswapDialog = true
				this.$nextTick(() => {
					setTimeout(() => {
						const container = document.getElementById('reactApp');
						const root = ReactDOM.createRoot(container);
						// root.render(<Test />); // 下面有解释，解析jsx的babel-loader要放在rules数组的第一位，此行才能替代下面一行。

						root.render(React.createElement(UniswapReact, {
							defaultInputTokenAddress: process.env.VUE_APP_CHAINID === '1' ? defaultInputTokenMAINNET : defaultInputTokenGEORLI,
							defaultOutputTokenAddress: process.env.VUE_APP_CHAINID === '1' ? defaultOutputTokenMAINNET : defaultOutputTokenGEORLI,
						}));
					}, 300)
				})
			},
		}
	}
</script>

<style lang="scss">
	#reactApp {
		width: 360px;
		.kiMPul{
			/*width: 80% !important;*/
		}
		.jlGmcj{
			img{
				width: 16px !important;
				height: 16px !important;
			}
		}
		.igNbuE{
			min-width: 100% !important;
		}
		.kpbOyk{
			transform: unset !important;
		}
	}
</style>
