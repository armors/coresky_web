<template>
	<div class="body-wrapper" style="padding-bottom: 100px">
		<div class="main-wrapper">
			<el-row class="mb-2">
				<el-button type="primary" @click="buyNft">buyNft</el-button>
			</el-row>
			<el-row class="mb-2">
				<el-button type="primary" @click="getAssetOwn">getAssetOwn</el-button>
			</el-row>
			<el-row class="mb-2">
				<el-button type="primary" @click="sellNft">sellNft</el-button>
			</el-row>
			<el-row class="mb-2">
				<el-button type="primary" @click="cancelSell">cancelSell</el-button>
			</el-row>

			<el-row class="mb-2">
				<el-button type="primary" @click="makerOffer">makerOffer</el-button>
			</el-row>
			<el-row class="mb-2">
				<el-button type="primary" @click="acceptOffer">acceptOffer</el-button>
			</el-row>
			<el-row class="mb-2">
				<el-button type="primary" @click="cancelMakerOffer">cancelMakerOffer</el-button>
			</el-row>
		</div>
	</div>
</template>

<script>
	import {WyvernSchemaName, OrderSide} from 'opensea-js/lib/types'
	const asset = {
		// tokenAddress: "0x317a8fe0f1c7102e7674ab231441e485c64c178a", // CryptoKitties
		// tokenId: "227856", // Token ID
		tokenAddress: "0xe29f8038d1a3445ab22ad1373c65ec0a6e1161a4", // CryptoKitties
		tokenId: "399", // Token ID
		// schemaName: WyvernSchemaName.ERC721
	}
	export default {
		name: "reservoir WyvernSchemaName",
		data() {
			return {
				tokenInfo: {
					"data": {
						"criteriaTakerAsset": {
							"ownedQuantity": "0",
							"decimals": null,
							"isDelisted": false,
							"relayId": "QXNzZXRUeXBlOjE3MzI4NzAwMg==",
							"assetContract": {
								"address": "0xeb1e502410bb45e51907b88b0ea9a08fb575d3c2",
								"id": "QXNzZXRDb250cmFjdFR5cGU6NDEwNjM0NQ=="
							},
							"tokenId": "42",
							"chain": {"identifier": "GOERLI"},
							"__typename": "AssetType",
							"collection": {
								"isCreatorFeesEnforced": true,
								"totalCreatorFeeBasisPoints": 0,
								"id": "Q29sbGVjdGlvblR5cGU6MTg0NjM4Mg==",
								"name": "t1 - Yq5L9y3qAt",
								"slug": "t1-yq5l9y3qat",
								"verificationStatus": "UNAPPROVED",
								"isCategory": false,
								"displayData": {"cardDisplayStyle": "CONTAIN"},
								"logo": "https://i.seadn.io/gae/mf-nuI_5ceM9yoawpMAHmdvqbga4boIzpKaEzzUolCa4TyypYEnuew2YVCBEZ31pYSvW_AecXqh1iomcEyQ6e_jYnQ?w=500&auto=format",
								"statsV2": {"floorPrice": null}
							},
							"__isItemType": "AssetType",
							"openseaSellerFeeBasisPoints": 250,
							"totalCreatorFee": 0,
							"displayName": "42",
							"animationUrl": null,
							"displayImageUrl": "https://i.seadn.io/gcs/files/34033745f79a011da47b28cf28568674.png?w=500&auto=format",
							"imageUrl": "https://i.seadn.io/gcs/files/34033745f79a011da47b28cf28568674.png?w=500&auto=format",
							"backgroundColor": null,
							"id": "QXNzZXRUeXBlOjE3MzI4NzAwMg=="
						}, "orders": {"edges": [], "pageInfo": {"endCursor": null, "hasNextPage": false}}
					}
				}
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
			async buyNft() {
				try {
					const openseaSDK = await this.$sdk.initOpenSea()
					console.log(openseaSDK)
					const {orders, count} = await openseaSDK.api.getOrders({
						side: 'ask',
						...{
							assetContractAddress: asset.tokenAddress,
							chain: "GOERLI",
							tokenId: asset.tokenId
						}
					})
					console.log(orders, count)
					const order = {
						"data": {
							"order": {
								"isOpen": true,
								"item": {
									"__typename": "AssetType",
									"chain": {"identifier": "GOERLI"},
									"displayName": "Splashing Kiki",
									"relayId": "QXNzZXRUeXBlOjE2NzgwOTg5MA==",
									"__isItemType": "AssetType",
									"collection": {
										"slug": "havah-friends",
										"verificationStatus": "UNAPPROVED",
										"id": "Q29sbGVjdGlvblR5cGU6MjAxMzY3Nw=="
									},
									"__isNode": "AssetType",
									"id": "QXNzZXRUeXBlOjE2NzgwOTg5MA=="
								},
								"relayId": "T3JkZXJWMlR5cGU6MTAxMjMwNg==",
								"perUnitPriceType": {"unit": "0.015", "symbol": "ETH", "usd": "25.088099999999999460"},
								"payment": {"relayId": "UGF5bWVudEFzc2V0VHlwZTo0NQ==", "id": "UGF5bWVudEFzc2V0VHlwZTo0NQ=="},
								"orderType": "BASIC",
								"itemQuantityType": "1",
								"side": "ASK",
								"fulfill": {
									"actions": [{
										"__typename": "FulfillOrderActionType",
										"__isBlockchainActionType": "FulfillOrderActionType",
										"orderData": {
											"side": "ASK",
											"item": {
												"__typename": "AssetQuantityDataType",
												"asset": {
													"chain": {"displayName": "Goerli", "identifier": "GOERLI"},
													"displayName": "Splashing Kiki",
													"relayId": "QXNzZXRUeXBlOjE2NzgwOTg5MA==",
													"collection": {
														"name": "HAVAH Friends",
														"id": "Q29sbGVjdGlvblR5cGU6MjAxMzY3Nw==",
														"displayData": {"cardDisplayStyle": "COVER"},
														"logo": "https://i.seadn.io/gcs/files/73bd7a6c9d37ce272d049f4f543f4bfe.png?w=500&auto=format"
													},
													"animationUrl": null,
													"displayImageUrl": "https://i.seadn.io/gcs/files/1008dc9057f917c6ccbc6b6f6c180750.png?w=500&auto=format",
													"imageUrl": "https://i.seadn.io/gcs/files/1008dc9057f917c6ccbc6b6f6c180750.png?w=500&auto=format",
													"isDelisted": false,
													"backgroundColor": null,
													"decimals": null,
													"id": "QXNzZXRUeXBlOjE2NzgwOTg5MA=="
												},
												"quantity": "1"
											},
											"recipient": null,
											"openedAt": "2023-02-02T11:35:11",
											"closedAt": "2023-03-02T11:35:11",
											"perUnitPrice": {"unit": "0.015"},
											"price": {"unit": "0.015", "symbol": "ETH", "usd": "25.088099999999999460"},
											"payment": {
												"asset": {"symbol": "ETH", "usdSpotPrice": 1672.54, "id": "QXNzZXRUeXBlOjE1MDcxNzY="},
												"id": "UGF5bWVudEFzc2V0VHlwZTo0NQ=="
											},
											"dutchAuctionFinalPrice": null,
											"englishAuctionReservePrice": null,
											"isCounterOrder": false,
											"orderCriteria": null
										},
										"itemFillAmount": "1",
										"criteriaAsset": null,
										"method": {
											"chainIdentifier": "GOERLI",
											"source": null,
											"destination": {"value": "0x00000000006c3852cbef3e08e8df289169ede581"},
											"value": "15000000000000000",
											"data": "0xfb0f3ee10000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000033f55c29d71000000000000000000000000000f1d88d76bfa48dc9474b1878bc2be9fd497695750000000000000000000000000000000000000000000000000000000000000000000000000000000000000000317a8fe0f1c7102e7674ab231441e485c64c178a0000000000000000000000000000000000000000000000000000000000044332000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000063db9fef00000000000000000000000000000000000000000000000000000000640089ef0000000000000000000000000000000000000000000000000000000000000000360c6ebe000000000000000000000000000000000000000026adb6d70a5ed4940000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000001550f7dca70000000000000000000000000000000a26b00c1f0df003000390027140000faa71900000000000000000000000000000000000000000000000000000000000000412ce7d479753e854d3127882d1bbcbf86481393ed207b0c87b5ef53ba714b317d26c4aa48da9c147500b719526cdc9ea8bc15bcf3c2773b8934f84a864907dc8f1c0000000000000000000000000000000000000000000000000000000000000000000000360c6ebe"
										},
										"giftRecipientAddress": null
									}]
								},
								"id": "T3JkZXJWMlR5cGU6MTAxMjMwNg=="
							},
							"moonpay": {"fiatCheckoutAvailability": true}
						}
					}
					console.log(order)
					const transactionHash = await openseaSDK.fulfillOrder({
						order: orders[0],
						accountAddress: this.user.coinbase
					})
					// {
					// 	// order: order.data.order,
					// 	order: orders,
					// 		accountAddress: asset.tokenAddress
					// }
					console.log(transactionHash)
					// const balance= await openseaSDK.createBuyOrder({
					// 	asset,
					// 	accountAddress: this.user.coinbase,
					// 	// Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
					// 	startAmount: 1.2,
					// })
					// console.log(balance)
				} catch (e) {
					console.log(e)
				}

			},
			async getAssetOwn () {
				try {
					const openseaSDK = await this.$sdk.initOpenSea()
					console.log(openseaSDK)

					const assetInfo = await openseaSDK.api.getAsset(asset)
					console.log(assetInfo)
					const balance = await openseaSDK.getAssetBalance({
						accountAddress: this.user.coinbase,
						asset, // Asset
					})
					console.log(balance)
					const ownsKitty = balance.isGreaterThan(0)
					console.log(ownsKitty)
				} catch (e) {
					console.log(e)
				}
			},
			async sellNft () {
				try {
					const openseaSDK = await this.$sdk.initOpenSea()
					console.log(openseaSDK)

					// Expire this auction one day from now.
					// Note that we convert from the JavaScript timestamp (milliseconds):
					const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24 * 17)
					const listing = await openseaSDK.createSellOrder({
						asset,
						accountAddress: this.user.coinbase,
						startAmount: 3,
						// If `endAmount` is specified, the order will decline in value to that amount until `expirationTime`. Otherwise, it's a fixed-price order:
						endAmount: 0.8,
						expirationTime
					})
					console.log(listing)

				} catch (e) {
					console.log(e)
				}
			},
			async cancelSell () {
				try {
					const openseaSDK = await this.$sdk.initOpenSea()
					console.log(openseaSDK)

					const {orders, count} = await openseaSDK.api.getOrders({
						side: "bid",
						assetContractAddress: asset.tokenAddress,
						tokenId: asset.tokenId
					})
					console.log(orders, count)
					console.log(orders[0])
					const transactionHash = await openseaSDK.cancelOrder({
						order: orders[0],
						accountAddress: this.user.coinbase
					})
					console.log(transactionHash)

				} catch (e) {

				}
			},
			async makerOffer () {
				try {
					const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24 * 17)
					const openseaSDK = await this.$sdk.initOpenSea()
					console.log(openseaSDK)
					const offer = await openseaSDK.createBuyOrder({
						asset: asset,
						accountAddress: this.user.coinbase,
						expirationTime,
						// Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
						startAmount: 0.96
					})
					console.log(offer)
				} catch (e) {
					console.log(e)
				}
			},
			async acceptOffer () {
				try {
					const openseaSDK = await this.$sdk.initOpenSea()
					console.log(openseaSDK)
					const {orders, count} = await openseaSDK.api.getOrders({
						side: 'bid',
						...{
							assetContractAddress: asset.tokenAddress,
							tokenId: asset.tokenId
						}
					})
					console.log(orders, count)
					console.log({
						order: orders[0],
						accountAddress: this.user.coinbase
					})
					console.log(JSON.stringify(orders[0]))
					console.log(JSON.stringify(orders[1]))
					const transactionHash = await openseaSDK.fulfillOrder({
						order: orders[0],
						accountAddress: this.user.coinbase
					})
					console.log(transactionHash)
				}catch (e) {
					console.log(e)
				}
			},
			async cancelMakerOffer() {
				try {
					const openseaSDK = await this.$sdk.initOpenSea()
					console.log(openseaSDK)

					const {orders, count} = await openseaSDK.api.getOrders({
						side: 'bid',
						...{
							assetContractAddress: asset.tokenAddress,
							tokenId: asset.tokenId
						}
						// protocol,
						// orderDirection,
						// orderBy, ...restOptions
					})
					console.log(orders, count)
					console.log(orders[0])
					const transactionHash = await openseaSDK.cancelOrder({
						order: orders[0],
						accountAddress: this.user.coinbase
					})
					console.log(transactionHash)

				} catch (e) {
					console.log(e)
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.mb-2 {
		margin-top: 12px;
	}
</style>
