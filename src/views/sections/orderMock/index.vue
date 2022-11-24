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
	import { ethers } from 'ethers'
	import BigNumber from 'bignumber.js'
	const itf = new ethers.utils.Interface(["function transferFrom(address,address,uint256)"])
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
				tokenId: '13',
				orderId: 4,
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
			const res = {
				"code": 200,
				"message": "success",
				"data": "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",
				"debug": {
					"id": 4,
					"deleted": 0,
					"createTime": 1669272968,
					"updateTime": 1669272968,
					"exchange": "0xC126888d5Af2000bdaC88EC5cA44a9cc8b397D04",
					"maker": "0xb55add32e4608eb7965ec234e6c0b3f009c3d9d6",
					"taker": "0xC35b21166eDC2B29d273223B3cD15d19617238F2",
					"makerRelayerFee": 250,
					"takerRelayerFee": 0,
					"makerProtocolFee": 0,
					"takerProtocolFee": 0,
					"feeRecipient": "0xC35b21166eDC2B29d273223B3cD15d19617238F2",
					"feeMethod": 1,
					"side": 1,
					"saleKind": 0,
					"target": "0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2",
					"howToCall": "0",
					"callData": "0x23b872dd000000000000000000000000b55add32e4608eb7965ec234e6c0b3f009c3d9d600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
					"replacementPattern": "0x000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000",
					"staticTarget": "0x0000000000000000000000000000000000000000",
					"staticExtradata": "0x",
					"paymentToken": "0x0000000000000000000000000000000000000000",
					"basePrice": 20000000000000000,
					"extra": "0",
					"listingTime": "1669272954",
					"expirationTime": "1672545600000",
					"salt": "1669272954190",
					"hash": "0x7f7b81fde438282c47554046871c2520b3ea311cd5edf8a7f9ed0864d440ca17",
					"v": "27",
					"r": "0xeb32621465d6ac0731f214986b037b28dddc43c12874c2b077d6e4e741421192",
					"s": "0x5fb269c27d71740915e99e2eb0156935875870690bad6485e05ba5b983eb687c",
					"sign": "{\"r\":\"0xeb32621465d6ac0731f214986b037b28dddc43c12874c2b077d6e4e741421192\",\"s\":\"0x5fb269c27d71740915e99e2eb0156935875870690bad6485e05ba5b983eb687c\",\"_vs\":\"0x5fb269c27d71740915e99e2eb0156935875870690bad6485e05ba5b983eb687c\",\"recoveryParam\":0,\"v\":27,\"yParityAndS\":\"0x5fb269c27d71740915e99e2eb0156935875870690bad6485e05ba5b983eb687c\",\"compact\":\"0xeb32621465d6ac0731f214986b037b28dddc43c12874c2b077d6e4e7414211925fb269c27d71740915e99e2eb0156935875870690bad6485e05ba5b983eb687c\"}",
					"contract": null,
					"tokenId": null,
					"state": 0,
					"name": null,
					"image": "ipfs://QmaZLhanFj41yfXY3Ux1JNv6ZAnzsWXfbJmo7qbJzZjh4s",
					"attributes": "[{\"value\":\"Black\",\"trait_type\":\"Fur\"},{\"value\":\"Bored\",\"trait_type\":\"Mouth\"},{\"value\":\"Bone Tee\",\"trait_type\":\"Clothes\"},{\"value\":\"Yellow\",\"trait_type\":\"Background\"},{\"value\":\"Coins\",\"trait_type\":\"Eyes\"},{\"value\":\"Police Motorcycle Helmet\",\"trait_type\":\"Hat\"}]",
					"description": null,
					"tokenUri": "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/13",
					"ckCollectionsInfoEntity": null,
					"createDate": "2022-11-24 14:56:08",
					"updateDate": "2022-11-24 14:56:08"
				}
			}
			this.nftToBuy = {
				...res.debug,
				sign: JSON.parse(res.debug.sign),
				attributes: JSON.parse(res.debug.attributes),
			}
			console.log(this.nftToBuy)
		},
		methods: {
			// 挂单开始
			async getRegistryOwner() {
				console.log(this.user.coinbase)
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
				let params = {
					exchange: process.env.VUE_APP_MARKET_EXCHANGE,
					maker: this.user.coinbase,
					taker: this.$sdk.FEE_ADDRESS(),
					// makerRelayerFee: nftToSell.exchangeRate ? nftToSell.exchangeRate * 10000 : sellParams.makerRelayerFee,
					// makerRelayerFee: this.$sdk.RELAYER_FEE(),
					makerRelayerFee: this.$sdk.RELAYER_FEE(),
					takerRelayerFee: 0,
					makerProtocolFee: 0,
					takerProtocolFee: 0,
					feeRecipient: this.$sdk.FEE_ADDRESS(),
					feeMethod: 1,
					side: 1,
					saleKind: 0,
					target: token_contract,
					howToCall: 0,
					calldata: itf.encodeFunctionData("transferFrom", [this.user.coinbase, this.$sdk.ADDRESS_ZERO(), 1]),
					replacementPattern: this.$sdk.ERC721_REPLACEMENT_SELL(),
					staticTarget: this.$sdk.ADDRESS_ZERO(),
					staticExtradata: "0x",
					paymentToken: this.$sdk.ADDRESS_ZERO(),
					basePrice: this.$sdk.getDecimalAmount(new BigNumber(this.sellPrice)).toString(),
					extra: 0,
					listingTime: Date.parse(new Date().toString()) / 1000,
					expirationTime: new Date('2023-01-01 12:00:00').getTime(),
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
				console.log(JSON.stringify(sig))
				const orderParams = {
					basePrice: params.basePrice,
					callData: params.calldata,
					contract: params.target,
					exchange: params.exchange,
					expirationTime: new Date('2023-01-01 12:00:00').getTime(),
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
					takerProtocolFee: '0',
				}
				console.log(JSON.stringify(orderParams))
				this.$api("order.create", orderParams).then((res) => {
					console.log(res)
				})
			},
			// 挂单结束

			// 购买开始
			async getOrderDetail () {
				this.$api("order.orderInfo", {
					id: this.orderId
				}).then((res) => {
					console.log(res)
					this.nftToBuy = {
						...res.debug,
						sign: JSON.parse(res.debug.sign),
						attributes: JSON.parse(res.debug.attributes),
					}
					console.log(this.nftToBuy)
				})
			},
			async buyerEvent () {
				const nftToBuy = this.nftToBuy
				const buyParams = {
					//  配置
					makerRelayerFee: this.$sdk.RELAYER_FEE(),
					takerRelayerFee: 0,
					makerProtocolFee: 0,
					takerProtocolFee: 0,
					feeRecipient: this.$sdk.ADDRESS_ZERO(),
					feeMethod: 1,
					side: 0,
					saleKind: 0,
					//  target: this.erc721.address,
					howToCall: 0,
					// 0地址  to  用户地址 tokenid
					//  calldata: IFACE.encodeFunctionData("transferFrom", [ADDRESS_ZERO, this.buyer.address, 1]),
					replacementPattern: this.$sdk.ERC721_REPLACEMENT_BUY(),
					staticTarget: this.$sdk.ADDRESS_ZERO(),
					staticExtradata: "0x",
					paymentToken: this.$sdk.ADDRESS_ZERO(),
					basePrice: '30000000000000000',
					extra: 0,
					listingTime: this.nftToBuy.listingTime,
					expirationTime: this.nftToBuy.expirationTime,
					salt: this.nftToBuy.salt,
				}
				const buyer = {
					...buyParams,
					exchange: nftToBuy.exchange,
					maker: this.user.coinbase,
					taker: nftToBuy.maker,
					target: nftToBuy.target,
					calldata: itf.encodeFunctionData("transferFrom", [this.$sdk.ADDRESS_ZERO(), this.user.coinbase, this.tokenId]),
					paymentToken: nftToBuy.paymentToken,
					basePrice: nftToBuy.basePrice
				}

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
						buyer.basePrice + '',
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
				const hashBytes = ethers.utils.arrayify(hash)
				console.log(this.$web3)
				const flatSig = await this.$web3.librarySign(hashBytes, this.user.coinbase)
				console.log(flatSig)
				const sigBuyer = ethers.utils.splitSignature(flatSig);
				console.log(sigBuyer)
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
						new BigNumber(buyer.basePrice).toString(),
						buyer.extra, nftToBuy.listingTime,
						buyer.expirationTime,
						new Date().getTime(),
						nftToBuy.makerRelayerFee,
						nftToBuy.takerRelayerFee,
						nftToBuy.makerProtocolFee,
						0,
						new BigNumber(nftToBuy.basePrice).toString(),
						nftToBuy.extra,
						nftToBuy.listingTime,
						0,
						nftToBuy.salt,
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
					nftToBuy.callData,
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
						"0x0000000000000000000000000000000000000000000000000000000000000000"
					],
				]
				console.log(arrayParams)

				const hashAtomicMatch = await this.$sdk.atomicMatch(arrayParams, this.user.coinbase);
				console.log(hashAtomicMatch)
			},
			// 购买结束
		}
	}
</script>

<style scoped lang="scss">
	.mb-2{
		margin-top: 12px;
	}
</style>
