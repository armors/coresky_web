<template>
	<el-dialog :model-value="isShowUniswapDialog"
	           :show-close="true"
	           :close-on-click-modal="true"
	           @closed="isShowUniswapDialog = false">
		<uniswap-vue
			:uniswapDappSharedLogicContext="uniswapDappSharedLogicContext"
			v-if="uniswapDappSharedLogicContext"
		/>
	</el-dialog>
</template>

<script>
	import { ChainId, ETH, WETHContract } from 'uniswap-dapp-integration-shared'
	export default {
		name: "index",
		computed: {
			user() {
				return this.$store.state.user;
			}
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
				this.uniswapDappSharedLogicContext = undefined
				let defaultInputTokenGEORLI
				let defaultOutputTokenGEORLI
				let defaultInputTokenMAINNET
				let defaultOutputTokenMAINNET
				defaultInputTokenGEORLI = type === 'ETH' ? ETH.GORLI().contractAddress : WETHContract.GORLI().contractAddress
				defaultOutputTokenGEORLI = type === 'ETH' ? WETHContract.GORLI().contractAddress : ETH.GORLI().contractAddress
				defaultInputTokenMAINNET = type === 'ETH' ? ETH.MAINNET().contractAddress : WETHContract.MAINNET().contractAddress
				defaultOutputTokenMAINNET = type === 'ETH' ? WETHContract.MAINNET().contractAddress : ETH.MAINNET().contractAddress
				this.uniswapDappSharedLogicContext = {
					supportedNetworkTokens: [
						{
							chainId: ChainId.MAINNET,
							// defaultInputValue: '0.000001',
							defaultInputToken: defaultInputTokenMAINNET,
							defaultOutputToken: defaultOutputTokenMAINNET,
							supportedTokens: [
								// { contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
								{ contractAddress: WETHContract.MAINNET().contractAddress },
								{ contractAddress: ETH.MAINNET().contractAddress }
							]
						},
						{
							chainId: 5,
							// defaultInputValue: '0.000001',
							defaultInputToken: defaultInputTokenGEORLI,
							defaultOutputToken: defaultOutputTokenGEORLI,
							supportedTokens: [
								{ contractAddress: WETHContract.GORLI().contractAddress },
								{ contractAddress: ETH.GORLI().contractAddress }
							]
						}
					],
					ethereumAddress: this.user.coinbase,
					ethereumProvider: window.ethereum
				}
				console.log(this.uniswapDappSharedLogicContext)
				this.isShowUniswapDialog = true
			},
		}
	}
</script>

<style scoped>

</style>
