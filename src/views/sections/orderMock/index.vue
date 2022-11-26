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
				<el-button type="primary" @click="getExchangeHashOrder">orderCreate</el-button>
			</el-row>
			<el-row class="mb-2">
				<el-button type="primary" @click="getOrderDetail">getOrderDetail{{orderId}}</el-button>
			</el-row>
			<el-row class="mb-2">
				<el-button type="primary" @click="buyerEvent">buyer</el-button>
			</el-row>
		</div>
	</div>
</template>

<script>
	const token_contract = '0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2'
	const encodeERC721ReplacementPatternSell = '0x000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000';
	const encodeERC721ReplacementPatternBuy = '0x00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
	import {ethers} from 'ethers'
	import BigNumber from 'bignumber.js'

	const SALT = new Date().getTime();
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
				sellPrice: 0.02,
				tokenId: 13,
				orderId: '13',
				nftToBuy: null,
			}
		},
		computed: {
			user() {
				console.log(this.$store.state.user)
				return this.$store.state.user;
			},
		},
		mounted() {
			// const res = {"code":200,"message":"success","data":"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","debug":{"id":18,"deleted":null,"createTime":1669345108,"updateTime":1669345108,"exchange":"0x3ef043cBA294460a12d5A2d6Bc0B4bC932e89028","maker":"0xb55add32e4608eb7965ec234e6c0b3f009c3d9d6","taker":"0xC35b21166eDC2B29d273223B3cD15d19617238F2","basePrice":20000000000000000,"makerRelayerFee":250,"takerRelayerFee":0,"makerProtocolFee":0,"takerProtocolFee":0,"feeRecipient":"0xC35b21166eDC2B29d273223B3cD15d19617238F2","feeMethod":1,"side":1,"saleKind":0,"target":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","howToCall":0,"callData":"0x23b872dd000000000000000000000000b55add32e4608eb7965ec234e6c0b3f009c3d9d60000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d","replacementPattern":"0x000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000","staticTarget":"0x0000000000000000000000000000000000000000","staticExtradata":"0x","paymentToken":"0x0000000000000000000000000000000000000000","extra":0,"listingTime":1669345050,"expirationTime":1672545600000,"salt":1669345034314,"hash":"0x44a80342a8c2800304081138706f95f7aec426e77f45c4ffdecbfb95fd096d52","v":"28","r":"0x6143063cf91ac9ef31f8ddef55b31c6713585087dcf33e6e54d30442cab3bf7a","s":"0x404bc7ec7443fef123d1c338bdaa41fa6e7077f3292d0d1f449a598c10042cf2","sign":"{\"signature\":\"0x6143063cf91ac9ef31f8ddef55b31c6713585087dcf33e6e54d30442cab3bf7a404bc7ec7443fef123d1c338bdaa41fa6e7077f3292d0d1f449a598c10042cf21c\",\"v\":28,\"s\":\"0x404bc7ec7443fef123d1c338bdaa41fa6e7077f3292d0d1f449a598c10042cf2\",\"r\":\"0x6143063cf91ac9ef31f8ddef55b31c6713585087dcf33e6e54d30442cab3bf7a\"}","contract":null,"tokenId":null,"state":0,"name":null,"image":"ipfs://QmaZLhanFj41yfXY3Ux1JNv6ZAnzsWXfbJmo7qbJzZjh4s","attributes":"[{\"value\":\"Black\",\"trait_type\":\"Fur\"},{\"value\":\"Bored\",\"trait_type\":\"Mouth\"},{\"value\":\"Bone Tee\",\"trait_type\":\"Clothes\"},{\"value\":\"Yellow\",\"trait_type\":\"Background\"},{\"value\":\"Coins\",\"trait_type\":\"Eyes\"},{\"value\":\"Police Motorcycle Helmet\",\"trait_type\":\"Hat\"}]","description":null,"tokenUri":"https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/13","ckCollectionsInfoEntity":null,"createDate":"2022-11-25 10:58:28","updateDate":"2022-11-25 10:58:28"}}
			// this.nftToBuy = {
			// 	...res.debug,
			// 	sign: JSON.parse(res.debug.sign),
			// 	attributes: JSON.parse(res.debug.attributes),
			// 	basePrice: ethers.BigNumber.from(res.debug.basePrice.toString()).toString()
			// }
			// console.log(this.nftToBuy)
		},
		methods: {
			// 挂单开始
			async getRegistryOwner() {
				console.log(this.user.coinbase)
				let registryOwner = await this.$sdk.getOwnerProxy(this.user.coinbase);
				if (typeof registryOwner == 'object' && registryOwner.error) {
					return registryOwner;
				}
				this.registryOwner = registryOwner.proxiesAddress
				console.log(registryOwner)
			},
			async setApproveAll() {
				let order = {
					type: 'IERC721',
					address: token_contract,
					tokenId: this.tokenId,
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
				console.log(this.$sdk.getDecimalAmount(new BigNumber(this.sellPrice)).toString())
				let params = this.$sdk.makeOrder(process.env.VUE_APP_MARKET_EXCHANGE, this.user.coinbase, token_contract)
				// let params = {
				// 	exchange: process.env.VUE_APP_MARKET_EXCHANGE,
				// 	maker: this.user.coinbase,
				// 	taker: this.$sdk.ADDRESS_ZERO(),
				// 	// makerRelayerFee: nftToSell.exchangeRate ? nftToSell.exchangeRate * 10000 : sellParams.makerRelayerFee,
				// 	// makerRelayerFee: this.$sdk.RELAYER_FEE(),
				// 	makerRelayerFee: this.$sdk.RELAYER_FEE(),
				// 	takerRelayerFee: 0,
				// 	makerProtocolFee: 0,
				// 	takerProtocolFee: 0,
				// 	feeRecipient: this.$sdk.FEE_ADDRESS(),
				// 	feeMethod: 1,
				// 	side: 1,
				// 	saleKind: 0,
				// 	target: token_contract,
				// 	howToCall: 0,
				// 	calldata: this.$sdk.sellERC721ABI(this.user.coinbase, this.tokenId),
				// 	replacementPattern: this.$sdk.ERC721_REPLACEMENT_SELL(),
				// 	staticTarget: this.$sdk.ADDRESS_ZERO(),
				// 	staticExtradata: "0x",
				// 	paymentToken: this.$sdk.ADDRESS_ZERO(),
				// 	basePrice: this.$sdk.getDecimalAmount(new BigNumber(this.sellPrice)).toString(),
				// 	// basePrice: ethers.BigNumber.from(this.$Web3.utils.toWei(this.sellPrice.toString())),
				// 	extra: 0,
				// 	listingTime: Date.parse(new Date().toString()) / 1000 - 24 * 3600,
				// 	expirationTime: 0,
				// 	salt: SALT,
				// }
				params.side = 1;
				params.expirationTime = 0;
				params.replacementPattern = encodeERC721ReplacementPatternSell;
				params.calldata = this.$sdk.sellERC721ABI(this.user.coinbase, this.tokenId)
				params.listingTime = Date.parse(new Date().toString()) / 1000 - 24 * 3600;
				params.feeRecipient = this.$sdk.FEE_ADDRESS()
				params.basePrice = this.$Web3.utils.toWei('0.02');
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
				const hashToSign = await this.$sdk.callhashToSign_(arrayParams)
				console.log(hashToSign)
				const sig = await this.$sdk.signature(params, this.user.coinbase)
				const resvalidateOrder_ = await this.$sdk.validateOrder_(
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
					params.staticExtradata,
					sig.v,
					sig.r,
					sig.s
				)
				console.log(resvalidateOrder_)
				const orderParams = {
					basePrice: params.basePrice,
					callData: params.calldata,
					contract: params.target,
					exchange: params.exchange,
					expirationTime: params.expirationTime,
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
					tokenId: this.tokenId,
					v: sig.v,
					r: sig.r,
					s: sig.s,
					hashOriginal: hash,
					hash: hashToSign,
					sign: JSON.stringify(sig),
					takerProtocolFee: 0,
				}
				this.nftToBuy = {
					...params,
					...{
						tokenId: this.tokenId,
						v: sig.v,
						r: sig.r,
						s: sig.s,
						hashOriginal: hash,
						hash: hashToSign,
						sign: JSON.stringify(sig),
						takerProtocolFee: 0,
						expirationTime: 0
					}
				}
				console.log(JSON.stringify(this.nftToBuy))
				console.log(JSON.stringify(orderParams))
				// this.nftToBuy = orderParams
				this.$api("order.create", orderParams).then((res) => {
					console.log(res)
				})
			},
			// 挂单结束

			// 购买开始
			async getOrderDetail() {
				this.$api("order.orderInfo", {
					id: this.orderId
				}).then((res) => {
					console.log(res)
					// this.nftToBuy = {
					// 	...res.debug,
					// 	sign: JSON.parse(res.debug.sign),
					// 	attributes: JSON.parse(res.debug.attributes),
					// 	basePrice: ethers.BigNumber.from(res.debug.basePrice.toString())
					// }
					// console.log(this.nftToBuy)
				})
			},
			async buyerEvent() {
				console.log(this.nftToBuy)
				const nftToBuy = {"exchange":"0x3ef043cBA294460a12d5A2d6Bc0B4bC932e89028","maker":"0xfaee0343914b799276d73388a52b789a038758e3","taker":"0x0000000000000000000000000000000000000000","makerRelayerFee":250,"takerRelayerFee":0,"makerProtocolFee":0,"takerProtocolFee":0,"feeRecipient":"0xC35b21166eDC2B29d273223B3cD15d19617238F2","feeMethod":1,"side":1,"saleKind":0,"target":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","howToCall":0,"calldata":"0x23b872dd000000000000000000000000faee0343914b799276d73388a52b789a038758e30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d","replacementPattern":"0x000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000","staticTarget":"0x0000000000000000000000000000000000000000","staticExtradata":"0x","paymentToken":"0x0000000000000000000000000000000000000000","basePrice":"20000000000000000","extra":0,"listingTime":1669273342,"expirationTime":0,"salt":1669359660811,"_sender":"0xfaee0343914b799276d73388a52b789a038758e3","tokenId":13,"v":27,"r":"0xc9b6fe472e4127574541ca5e472112313ac80bf160b610b8db012641f507846d","s":"0x09df07fd9a3b77f0c851692d8a2cd8c31dc385e84eb7402830e87ab027e7f66c","hashOriginal":"0x27dc95258f190aad11481e17864dda13b98c1f86769db4b95488a51c763d0060","hash":"0xb385657a06dc46ff128d659ffe68474b696f89425f869465119f22581f1477be","sign":"{\"signature\":\"0xc9b6fe472e4127574541ca5e472112313ac80bf160b610b8db012641f507846d09df07fd9a3b77f0c851692d8a2cd8c31dc385e84eb7402830e87ab027e7f66c1b\",\"v\":27,\"s\":\"0x09df07fd9a3b77f0c851692d8a2cd8c31dc385e84eb7402830e87ab027e7f66c\",\"r\":\"0xc9b6fe472e4127574541ca5e472112313ac80bf160b610b8db012641f507846d\"}"}

				let buyParams = this.$sdk.makeOrder(process.env.VUE_APP_MARKET_EXCHANGE, this.user.coinbase, token_contract)
				// const buyParams = {
				// 	//  配置
				// 	makerRelayerFee: this.$sdk.RELAYER_FEE(),
				// 	takerRelayerFee: 0,
				// 	makerProtocolFee: 0,
				// 	takerProtocolFee: 0,
				// 	feeRecipient: this.$sdk.ADDRESS_ZERO(),
				// 	feeMethod: 1,
				// 	side: 0,
				// 	saleKind: 0,
				// 	//  target: this.erc721.address,
				// 	howToCall: 0,
				// 	// 0地址  to  用户地址 tokenid
				// 	//  calldata: IFACE.encodeFunctionData("transferFrom", [ADDRESS_ZERO, this.buyer.address, 1]),
				// 	replacementPattern: this.$sdk.ERC721_REPLACEMENT_BUY(),
				// 	staticTarget: this.$sdk.ADDRESS_ZERO(),
				// 	staticExtradata: "0x",
				// 	paymentToken: this.$sdk.ADDRESS_ZERO(),
				// 	extra: 0,
				// 	basePrice: '30000000000000000',
				// 	listingTime: nftToBuy.listingTime,
				// 	expirationTime: nftToBuy.expirationTime,
				// 	salt: SALT,
				// }
				console.log([
					this.$sdk.ADDRESS_ZERO(),
					this.user.coinbase,
					this.tokenId
				])
				console.log(nftToBuy)
				let buyer = {
					...buyParams,
					...{
						side: 0,
						maker: this.user.coinbase,
						taker: nftToBuy.maker,
						calldata: this.$sdk.buyERC721ABI(this.user.coinbase, this.tokenId),
						paymentToken: nftToBuy.paymentToken,
						basePrice: nftToBuy.basePrice,
						listingTime: nftToBuy.listingTime,
						expirationTime: 0,
						replacementPattern: encodeERC721ReplacementPatternBuy
					}
				}
				console.log(buyer)
				const arrayParamsSign = [
					[
						buyer.exchange,
						buyer.maker,
						buyer.taker,
						buyer.feeRecipient,
						buyer.target,
						buyer.staticTarget,
						buyer.paymentToken
					],
					[
						buyer.makerRelayerFee,
						buyer.takerRelayerFee,
						buyer.makerProtocolFee,
						buyer.takerProtocolFee,
						buyer.basePrice,
						buyer.extra,
						buyer.listingTime,
						buyer.expirationTime,
						buyer.salt
					],
					buyer.feeMethod,
					buyer.side,
					buyer.saleKind,
					buyer.howToCall,
					buyer.calldata,
					buyer.replacementPattern,
					buyer.staticExtradata
				]
				console.log(arrayParamsSign)
				const hash = await this.$sdk.callhashOrder_(arrayParamsSign);
				console.log(hash)
				const sigBuyer = await this.$sdk.signature(buyer, this.user.coinbase)
				console.log(sigBuyer)
				buyer = {
					...buyer,
					...{
						v: sigBuyer.v,
						r: sigBuyer.r,
						s: sigBuyer.s,
						sign: JSON.stringify(sigBuyer),
					}
				}
				const arrayParams = [
					[
						buyer.exchange,
						buyer.maker,
						buyer.taker,
						buyer.feeRecipient,
						buyer.target,
						buyer.staticTarget,
						buyer.paymentToken,
						nftToBuy.exchange,
						nftToBuy.maker,
						nftToBuy.taker,
						nftToBuy.feeRecipient,
						nftToBuy.target,
						nftToBuy.staticTarget,
						nftToBuy.paymentToken,
						this.user.coinbase,
					],
					[
						buyer.makerRelayerFee,
						buyer.takerRelayerFee,
						buyer.makerProtocolFee,
						buyer.takerProtocolFee,
						buyer.basePrice,
						buyer.extra,
						buyer.listingTime,
						buyer.expirationTime,
						buyer.salt,
						nftToBuy.makerRelayerFee,
						nftToBuy.takerRelayerFee,
						nftToBuy.makerProtocolFee,
						nftToBuy.takerProtocolFee,
						nftToBuy.basePrice,
						nftToBuy.extra,
						nftToBuy.listingTime,
						nftToBuy.expirationTime,
						nftToBuy.salt
					],
					[
						buyer.feeMethod,
						buyer.side,
						buyer.saleKind,
						buyer.howToCall,
						nftToBuy.feeMethod,
						nftToBuy.side,
						nftToBuy.saleKind,
						nftToBuy.howToCall,
					],
					buyer.calldata,
					nftToBuy.calldata,
					buyer.replacementPattern,
					nftToBuy.replacementPattern,
					buyer.staticExtradata,
					nftToBuy.staticExtradata,
					[
						sigBuyer.v,
						parseInt(nftToBuy.v)
					],
					[
						sigBuyer.r,
						sigBuyer.s,
						nftToBuy.r,
						nftToBuy.s,
						ethers.constants.HashZero
					],
				]
				console.log(arrayParams)
				console.log(JSON.stringify(buyer))
				console.log(JSON.stringify(nftToBuy))
				console.log(await this.$sdk.validateOrderParameters(nftToBuy))
				console.log(await this.$sdk.validateOrderParameters(buyer))
				console.log(buyer, nftToBuy)
				console.log(await this.$sdk.orderCanMatch(buyer, nftToBuy))
				const hashAtomicMatch = await this.$sdk.atomicMatch(arrayParams, this.user.coinbase);
				console.log(hashAtomicMatch)
			},
			// 购买结束
		}
	}
</script>

<style scoped lang="scss">
	.mb-2 {
		margin-top: 12px;
	}
</style>
