<template>
	<div class="body-wrapper">
		<div class="main-wrapper">
			<el-row class="mb-2">
				<el-button type="primary" @click="getList">getList</el-button>
			</el-row>
		</div>
	</div>
</template>

<script>
	import { WyvernSchemaName, OrderSide } from 'opensea-js/lib/types'
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
			async getList() {
				const openseaSDK = await this.$sdk.initOpenSea()
				console.log(openseaSDK)

				const asset = {
					tokenAddress: "0xeb1e502410bb45e51907b88b0ea9a08fb575d3c2", // CryptoKitties
					tokenId: "42", // Token ID
					schemaName: WyvernSchemaName.ERC721
				}
				try {
					const { orders, count } = await openseaSDK.api.getOrders({
						asset_contract_address: asset.tokenAddress,
						token_id: asset.tokenId,
						side: OrderSide.Sell
					})
					console.log(orders, count)
					const order = orders[0]
					console.log(order)
					const transactionHash = await openseaSDK.fulfillOrder({
						order,
						accountAddress: asset.tokenAddress
					})
					console.log(transactionHash)
					// const balance= await openseaSDK.createBuyOrder({
					// 	asset,
					// 	accountAddress: this.user.coinbase,
					// 	// Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
					// 	startAmount: 1.2,
					// })
					// console.log(balance)
				}catch (e) {
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
