<template>
	<div class="body-wrapper">
		<div class="main-wrapper">
			<el-row class="mb-2">
				<el-button type="primary" @click="getRegistryOwner">getRegistryOwner</el-button>
			</el-row>
			<div>RegistryOwner: {{registryOwner}}</div>
			<el-row class="mb-2">
				<el-button type="primary" @click="setApproveAll">approve</el-button>
			</el-row>
			<el-row class="mb-2">
				<el-button type="primary" @click="getExchangeHashOrder">addOrder</el-button>
			</el-row>

		</div>
	</div>
</template>

<script>
	const token_contract = '0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2'
	import { ethers } from 'ethers'
	import BigNumber from 'bignumber.js'
	/*
	1. 查询注册：0xFA39075c880131Da2fEbcd7D92f2A4ebcbb71F51 -> proxies 	返回 地址
	2.若有返回地址执行第三步，若无执行注册： 0xFA39075c880131Da2fEbcd7D92f2A4ebcbb71F51 -> registerProxy 	返回 地址
	3.nft像返回的地址授权
	 */
	export default {
		name: "index.vue",
		data() {
			return {
				// registryOwner: this.$sdk.NULL_ADDRESS(),
				registryOwner: '0x82e96E71D6414570393D6285cAb7DDfc5AdE62a1',
				sellPrice: 300
			}
		},
		computed: {
			user() {
				console.log(this.$store.state.user)
				return this.$store.state.user;
			},
		},
		mounted() {
		},
		methods: {
			// 挂单开始
			async getRegistryOwner() {
				let registryOwner = await this.$sdk.getOwnerProxy(this.user.coinbase);
				if (typeof registryOwner == 'object' && registryOwner.error) {
					return registryOwner;
				}
				this.registryOwner = registryOwner
				console.log(registryOwner)
			},
			async setApproveAll() {
				let order = {
					type: 'IERC721',
					address: token_contract,
					tokenId: 13,
				};
				let isApproved = await this.$sdk.isApprovedForAll(
					order,
					this.user.coinbase,
					this.registryOwner,
				);
				console.log(isApproved)
				if (typeof isApproved == "object" && isApproved.error) {
					return isApproved;
				}
				if (isApproved) {
					console.log('true')
					return
				}
				let result = await this.$sdk.setApprovalForAll(
					order,
					this.user.coinbase,
					this.registryOwner,
					true
				);
				return result;
			},
			async getExchangeHashOrder() {
				const itf = new ethers.utils.Interface(["function transferFrom(address,address,uint256)"])
				let params = {
					exchange: process.env.VUE_APP_MARKET_EXCHANGE,
					maker: this.user.coinbase,
					taker: this.$sdk.FEE_ADDRESS(),
					// makerRelayerFee: nftToSell.exchangeRate ? nftToSell.exchangeRate * 10000 : sellParams.makerRelayerFee,
					makerRelayerFee: this.$sdk.RELAYER_FEE(),
					takerRelayerFee: 0,
					makerProtocolFee: 0,
					takerProtocolFee: 0,
					feeRecipient: this.$sdk.FEE_ADDRESS(),
					feeMethod: 1,
					side: 1,
					saleKind: 0,
					target: this.registryOwner,
					howToCall: 0,
					calldata: itf.encodeFunctionData("transferFrom", [this.user.coinbase, this.$sdk.ADDRESS_ZERO(), 1]),
					replacementPattern: this.$sdk.ERC721_REPLACEMENT_SELL(),
					staticTarget: this.$sdk.ADDRESS_ZERO(),
					staticExtradata: "0x",
					paymentToken: this.$sdk.ADDRESS_ZERO(),
					basePrice: this.$sdk.getDecimalAmount(new BigNumber(this.sellPrice)).toString(),
					extra: 0,
					listingTime: Date.parse(new Date().toString()) / 1000,
					expirationTime: 0,
					salt: new Date().getTime(),
				}
				const arrayParams = [
					[
						params.exchange,
						params.maker,
						params.taker,
						params.feeRecipient,
						params.target,
						params.staticTarget,
						params.paymentToken
					],
					[
						params.makerRelayerFee,
						params.takerRelayerFee,
						params.makerProtocolFee,
						params.takerProtocolFee,
						params.basePrice,
						params.extra,
						params.listingTime,
						params.expirationTime,
						params.salt
					],
					params.feeMethod,
					params.side,
					params.saleKind,
					params.howToCall,
					params.calldata,
					params.replacementPattern,
					params.staticExtradata
				]
				const hash = await this.$sdk.callhashOrder_(arrayParams);
				console.log(hash)
				const hashToSign = await this.$sdk.callhashToSign_(arrayParams)
				console.log(hashToSign)
				const hashBytes = ethers.utils.arrayify(hash)
				console.log(this.$web3)
				const flatSig = await this.$web3.librarySign(hashBytes, this.user.coinbase)
				console.log(flatSig)
				const sig = ethers.utils.splitSignature(flatSig);
				console.log(sig)
				const orderParams = {
					basePrice: params.basePrice,
					callData: params.calldata,
					contract: params.target,
					exchange: params.exchange,
					expirationTime: null,
					extra: params.extra,
					feeMethod: params.feeMethod,
					feeRecipient: params.feeRecipient,
					howToCall: params.howToCall,
					listingTime: params.listingTime,
					maker: params.maker,
					makerProtocolFee: params.makerProtocolFee,
					makerRelayerFee: params.makerRelayerFee,
					paymentToken: params.paymentToken,
					replacementPattern: params.replacementPattern,
					saleKind: params.saleKind,
					salt: params.salt,
					side: params.side,
					staticExtradata: params.staticExtradata,
					staticTarget: params.staticTarget,
					taker: params.taker,
					takerRelayerFee: params.takerRelayerFee,
					target: params.target,
					tokenId: params.tokenId,
					v: sig.v,
					r: sig.r,
					s: sig.s,
					hashOriginal: hash,
					hash: hashToSign,
					sign: sig,
					takerProtocolFee: '0',
				}
				console.log(JSON.stringify(orderParams))
				this.$api("order.create", orderParams).then((res) => {
					console.log(res)
				})
			}
			//	挂单结束
		}
	}
</script>

<style scoped lang="scss">

</style>
