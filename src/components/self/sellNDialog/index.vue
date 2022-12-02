<template>
	<el-dialog :model-value="isShowSellDialog" :show-close="false" :close-on-click-modal="false" @closed="closed"
	           custom-class="custom-dialog" destroy-on-close>
		<template #title>
			<div class="left">
				<span>Sell NFT</span>
			</div>
			<el-icon @click="isShowSellDialog=false">
				<Close />
			</el-icon>
		</template>
		<div class="nft-box">
			<image-box class="img-box" :src="tokenInfo.ckCollectionsInfoEntity.image"></image-box>
			<div class="box-center">
				<span class="tokenid">#{{tokenInfo.tokenId}}</span>
				<span class="collection-name">{{tokenInfo.name || '--'}}
            <img class="tag" src="@/assets/images/icons/icon_tag.svg" alt="">
          </span>
			</div>
		</div>
		<el-form label-position="top" :model="form" style="margin-top:40px">
			<el-form-item label="Price">
				<div class="flex-content">
					<el-input v-model="form.price" size="large" style="width:100%;" />
					<el-select v-model="form.symbol" size="large" class="ml20" placeholder="Select"
					           style="width:180px;flex-shrink: 0;">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</div>
			</el-form-item>
			<el-form-item label="Expiration date">
				<div class="flex-content">
					<el-date-picker v-model="form.time" size="large" type="datetime" placeholder="Pick a Date" style=""
					                format="YYYY-MM-DD HH:mm" />
					<el-select v-model="form.date" class="ml20" size="large" placeholder="Select"
					           style="width:180px;flex-shrink: 0;">
						<el-option v-for="item in optionsDays" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</div>
			</el-form-item>
			<el-form-item label="Fee and coupons">
				<div class="describe-box">
					<div class="describe-item">
						<span class="lable">Coeesky service fee: </span>
						<span class="value">0.5%</span>
					</div>
					<div class="describe-item mt15">
						<span class="lable">coupon rewards:</span>
						<div class="value">
							<p>
								1 coupon / 0.5 ETH
							</p>
							<p>1 coupon / listing / day</p>
						</div>
					</div>
				</div>
			</el-form-item>
		</el-form>
		<el-button type="primary" class="btnBuy" :loading="sellBtnLoading" v-if="isApproved" @click="getExchangeHashOrder">Sell NFT</el-button>
		<el-button type="primary" class="btnBuy" :loading="sellBtnLoading" v-else @click="setApproveAll">Approve NFT</el-button>
	</el-dialog>
</template>

<script>
	import BigNumber from "bignumber.js";
	import tools from "@/util/tools";
	import i18n from "@/i18n/i18n";

	export default {
		name: "index",
		data () {
			return {
				isShowSellDialog: false,
				sellBtnLoading: false,
				form: {
					price: '',
					date: '',
					time: '',
					symbol: ''
				},
				rules: {
					price: [
						{ required: true, message: 'Please input price', trigger: 'blur' },
					],
				},
				options: [
					{
						value: 'ETH',
						label: 'ETH',
					}
				],
				optionsDays: [
					{
						value: 1,
						label: '1days',
					},
					{
						value: 3,
						label: '3days',
					},
					{
						value: 5,
						label: '5days',
					},
					{
						value: 7,
						label: '7days',
					}
				],
				tokenInfo: {},
				isApproved: true,
				registryOwner: ''
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			}
		},
		methods: {
			async showSell (tokenInfo) {
				this.tokenInfo = tokenInfo
				console.log(this.tokenInfo)
				await this.getRegistryOwner()
				let order = {
					type: 'IERC721',
					address: this.tokenInfo.contract,
					tokenId: this.tokenInfo.tokenId,
				};
				this.isApproved = await this.$sdk.isApprovedForAll(
					order,
					this.user.coinbase,
					this.registryOwner,
				);
				this.$parent.sellDialogBtnLoading = false
				this.isShowSellDialog = true
			},
			async sellNft () {
				try {
					this.sellBtnLoading = true
					await this.getExchangeHashOrder()
				} catch (e) {
					this.sellBtnLoading = false
				}

			},
			// 挂单开始
			// 注册地址
			async getRegistryOwner() {
				console.log(this.user.coinbase)
				let registryOwner = await this.$sdk.getOwnerProxy(this.user.coinbase);
				if (typeof registryOwner == 'object' && registryOwner.error) {
					return registryOwner;
				}
				this.registryOwner = registryOwner.proxiesAddress
				console.log(registryOwner)
			},

			// 授权
			async setApproveAll() {
				let order = {
					type: 'IERC721',
					address: this.tokenInfo.contract,
					tokenId: this.tokenInfo.tokenId,
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
				if (!isApproved) {
					let result = await this.$sdk.setApprovalForAll(
						order,
						this.user.coinbase,
						this.registryOwner,
						true
					);
					console.log(result)
				} else {
					console.log('true')
				}
				// return result;
			},
			// 挂单
			async getExchangeHashOrder() {
				console.log(this.form.price)
				if (!this.form.price || new BigNumber(this.form.price).isLessThan(0)) {
					this.$tools.message('请输入正确的价格');
					return
				}
				this.sellBtnLoading = true
				let seller = this.$sdk.makeOrder(process.env.VUE_APP_MARKET_EXCHANGE, this.user.coinbase, this.tokenInfo.contract, 1, this.tokenInfo.tokenId)
				seller.expirationTime = 0;
				seller.listingTime = Date.parse(new Date().toString()) / 1000 - 10;
				seller.feeRecipient = this.$sdk.FEE_ADDRESS()
				seller.basePrice = this.$Web3.utils.toWei(this.form.price);
				const arrayParams = [
					[
						seller.exchange,
						seller.maker,
						seller.taker,
						seller.feeRecipient,
						seller.target,
						seller.staticTarget,
						seller.paymentToken
					],
					[
						seller.makerRelayerFee,
						seller.takerRelayerFee,
						seller.makerProtocolFee,
						seller.takerProtocolFee,
						seller.basePrice,
						seller.extra,
						seller.listingTime,
						seller.expirationTime,
						seller.salt
					],
					seller.feeMethod,
					seller.side,
					seller.saleKind,
					seller.howToCall,
					seller.calldata,
					seller.replacementPattern,
					seller.staticExtradata
				]
				// const hash = await this.$sdk.callhashOrder_(arrayParams);
				const hashToSign = await this.$sdk.callhashToSign_(arrayParams)
				try {
					const sig = await this.$sdk.signature(seller, this.user.coinbase)
					const validateOrderArrayParams = [
						...arrayParams,
						...[
							sig.v,
							sig.r,
							sig.s
						]
					]
					console.log(validateOrderArrayParams)
					const validateOrderArrayParams1 = [
						[
							seller.exchange,
							seller.maker,
							seller.taker,
							seller.feeRecipient,
							seller.target,
							seller.staticTarget,
							seller.paymentToken
						],
						[
							seller.makerRelayerFee,
							seller.takerRelayerFee,
							seller.makerProtocolFee,
							seller.takerProtocolFee,
							seller.basePrice,
							seller.extra,
							seller.listingTime,
							seller.expirationTime,
							seller.salt
						],
						seller.feeMethod,
						seller.side,
						seller.saleKind,
						seller.howToCall,
						seller.calldata,
						seller.replacementPattern,
						seller.staticExtradata,
						sig.v,
						sig.r,
						sig.s
					]
					console.log(validateOrderArrayParams1)
					// const resvalidateOrder_ = await this.$sdk.validateOrder_(validateOrderArrayParams)
					// console.log(resvalidateOrder_)
					const orderParams = {
						...seller,
						...{
							tokenId: this.tokenInfo.tokenId,
							v: sig.v,
							r: sig.r,
							s: sig.s,
							hash: hashToSign,
							sign: JSON.stringify(sig),
							contract: this.tokenInfo.contract
						}
					}
					console.log(orderParams)
					// this.nftToBuy = orderParams
					this.$api("order.create", orderParams).then((res) => {
						this.sellBtnLoading = false
						this.isShowSellDialog = false
						this.$emit('sellCreateSuccess', res)
					})
				} catch (e) {
					console.log(e)
					this.sellBtnLoading = false
				}

			},
		}
	}
</script>

<style scoped lang="scss">
	::v-deep {
		.custom-dialog {
			padding: 40px;
			height: auto;
			.el-dialog__header {
				padding: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-right: 0;
				.left {
					color: $color-black;
					font-weight: 700;
					font-size: 22px;
					line-height: 28px;
				}
				.el-icon {
					cursor: pointer;
					font-size: 20px;
				}
			}
			.el-dialog__body {
				padding: 40px 0 0;
			}
			.nft-box {
				display: flex;
				padding: 16px;
				border: 1px solid $borderBg;
				border-radius: 20px;
				.img-box {
					width: 100px;
					height: 100px;
					border-radius: 10px;
					margin-right: 10px;
				}
				.box-center {
					display: flex;
					flex-grow: 1;
					flex-direction: column;
					justify-content: center;
					align-items: self-start;
					.tokenid {
						font-weight: 500;
						font-size: 20px;
						line-height: 30px;
						color: $primaryColor;
						margin-bottom: 5px;
					}
					.tag {
						width: 16px;
						height: 16px;
						display: inline-block;
						vertical-align: bottom;
						margin-left: 5px;
					}
				}
			}
			.price-box {
				display: flex;
				padding: 16px;
				border: 1px solid $borderBg;
				border-radius: 20px;
				align-items: center;
				justify-content: space-between;
				text-align: right;
				margin-top: 20px;
				.label {
					font-weight: 500;
					font-size: 20px;
					line-height: 30px;
					color: $primaryColor;
				}
				.buy-price {
					margin-bottom: 4px;
					height: 30px;
					line-height: 30px;
					font-weight: 500;
					font-size: 20px;
					.token-icon {
						width: 10px;
						height: 16px;
						display: inline-block;
					}
				}
			}
			.btnBuy {
				margin-top: 20px;
				width: 100%;
				height: 48px;
				padding: 10px 0;
				border-radius: 12px;
				font-weight: 700;
				border: none;
				cursor: pointer;
				color: $color-white;
				background: $mainLiner;
			}
			.el-form-item__label {
				font-size: 16px;
				color: $primaryColor;
			}
			.el-input__wrapper {
				border-radius: 12px;
				// display: block;
			}
			.el-input__inner {
				// height: 40px;
				padding: 0;
			}
			.el-select {
				.el-input__wrapper {
					padding: 1px 15px;
				}
				// .el-input__suffix {
				//   right: 19px;
				// }
			}
			.flex-content {
				display: flex;
				width: 100%;
			}
			.el-date-editor.el-input {
				// display: block;
				width: 100%;
				.el-input__prefix {
					display: none;
				}
				// .el-input__suffix {
				//   top: 5px;
				// }
			}
			.describe-box {
				width: 100%;
				padding: 16px;
				border: 1px solid $borderBg;
				border-radius: 12px;
				line-height: 21px;
				.describe-item {
					display: flex;
					.lable {
						font-weight: 400;
						font-size: 14px;
						color: $color-black2;
						min-width: 130px;
						margin-right: 20px;
					}
					.value {
					}
				}
			}
		}
	}
</style>
