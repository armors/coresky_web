<template>
	<div>

		<div class="main-wrapper listings-box">
			<div>
				<div class="listings-head">
					<el-button class="btn-back" plain @click="goBack">
						<el-icon>
							<Back />
						</el-icon>
					</el-button>
					<span class="title">{{ $t('marketListing.title') }}</span>
				</div>
				<div class="nft-box">
					<image-box class="img-box" :src="tokenInfo.oriImage"></image-box>
					<div class="box-center">
						<span class="tokenid">{{ tokenInfo.name || '--' }} #{{ tokenInfo.tokenId }}</span>
						<span class="collection-name">{{ tokenInfo.ckCollectionsInfoEntity.name || '--' }}
							<img v-if="tokenInfo.ckCollectionsInfoEntity.isCertification === '1'" class="tag"
								src="@/assets/images/icons/icon_tag.svg" alt="">
						</span>
					</div>
					<div style="margin-right: 30px;" v-if="tokenInfo.contractType === 1">
						<el-input-number v-model="quantity" :min="1" :max="nftAmount1155" />
					</div>
				</div>
				<div class="title2">
					<img class="icon-lock" src="@/assets/images/icons/icon_lock.svg" alt="">
					{{ $t('marketListing.NFTMarketplace') }}
				</div>
				<div class="platform">
					<div class="item" :class="{ 'active': platformList.find(el => el.name === 'Coresky') }"
						@click="togglePlatform('Coresky')">
						<svg-icon class="platform-logo" icon-class="logo" />
						<span class="name">Coresky</span>
					</div>
					<div class="item" :class="{ 'active': platformList.find(el => el.name === 'Opensea') }"
						@click="togglePlatform('Opensea')">
						<svg-icon class="platform-logo" icon-class="os-logo" />
						<span class="name">Opensea</span>
					</div>
				</div>
				<div class="flex-com" style="">
					<div class="item">
						<span class="mr10"> {{ $t('marketListing.SamePrice') }}</span>
						<el-switch v-model="isSamePrice" @change="changeSamePrice" size="small" :active-value="true"
							:inactive-value="false" />
					</div>
					<div class="item display-flex box-center-Y" v-if="isSamePrice">
						<el-input-number v-model="samePrice" @change="samePriceChange" :controls="false" :precision="4"
							:min="0.0001" class="input-with-select" :max="100000000000000" size="small"
							style="width:120px;text-align: left" />
						<el-select model-value="eth" placeholder=" " size="small" style="width:60px" :teleported="false">
							<el-option label="ETH" value="eth" />
						</el-select>
					</div>
					<div class="item">
						<span class="mr10">{{ $t('marketListing.AdjustFees') }}</span>
						<el-switch v-model="isProceeds" size="small" @change="changeProceeds" :active-value="true"
							:inactive-value="false" />
					</div>
					<div style="margin-left: auto;">
						<div>
							<el-date-picker v-model="form.time" type="datetime" :placeholder="$t('marketListing.PickDate')"
								style="" format="YYYY/MM/DD HH:mm" :default-time="defaultTime"
								:disabled-date="disabledDate" />
							<el-select v-model="form.date" class="ml20" placeholder="Select" @change="dateChange"
								style="width:120px;flex-shrink: 0;">
								<el-option v-for="item in optionsDays" :key="item.value" :label="item.label"
									:value="item.value" />
							</el-select>
						</div>
					</div>
				</div>
				<el-table :data="dataList" style="width: 100%" class="mytable" header-row-class-name="head-row">
					<el-table-column prop="date" :label="$t('marketListing.Market')" width="180">
						<template #default="props">
							<div class="flex-m">
								<svg-icon class="platform-logo" v-if="props.row.name === 'Coresky'" icon-class="logo" />
								<svg-icon class="platform-logo" v-if="props.row.name === 'Opensea'" icon-class="os-logo" />
								<span>{{ props.row.name }}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="Item" :label="$t('marketListing.ListPrice')" width="200"
						:show-overflow-tooltip="true">
						<template #default="props">

							<el-input-number v-model="props.row.listPrice" @change="changePrice(props.row.name)"
								:controls="false" :precision="4" :min="0.0001" class="input-with-select"
								:max="100000000000000" size="small" :teleported="false" :disabled="isProceeds ||
									(props.row.name === 'Opensea' && !(platformList.find(el => el.name === 'Opensea'))) ||
									(props.row.name === 'Coresky' && !(platformList.find(el => el.name === 'Coresky')))"
								style="width:100px;text-align: left" />

							<el-select model-value="eth" placeholder=" " size="small" style="width:60px">
								<el-option label="ETH" value="eth" />
							</el-select>
							<!--						<el-input v-model="props.row.listPrice"-->
							<!--						          :disabled="isProceeds ||-->
							<!--						(props.row.name === 'Opensea' && !(platformList.find(el => el.name === 'Opensea'))) ||-->
							<!--						(props.row.name === 'Coresky' && !(platformList.find(el => el.name === 'Coresky')))"-->
							<!--						          size="small" type="number" style="width:140px"-->
							<!--						          class="input-with-select" :teleported="false" @change="changePrice(props.row.name)">-->
							<!--							<template #append>-->
							<!--								<el-select model-value="eth" placeholder=" " size="small" style="width:60px">-->
							<!--									<el-option label="ETH" value="eth"/>-->
							<!--								</el-select>-->
							<!--							</template>-->
							<!--						</el-input>-->
							<div class="txt1">
								<span>{{ $t('marketListing.Floor') }}:</span>
								<svg-icon class="token" icon-class="token_eth2" />
								<span class="item-name">{{ props.row.floorPrice }}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="address" :label="$t('marketListing.LastSale')">
						<template #default="props">
							<svg-icon class="token" icon-class="token_eth2" />
							<span class="item-name">{{ props.row.lastSale }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="Item" :label="$t('marketListing.Fees')" width="140">
						<template #default="props">
							{{ props.row.fee }}
						</template>
					</el-table-column>
					<el-table-column :label="$t('marketListing.Royalties')">
						<template #default="props">
							{{ props.row.Royalties }}
						</template>
					</el-table-column>
					<el-table-column :label="$t('marketListing.Proceeds')">
						<template #default="props">

							<el-input-number v-model="props.row.proceeds" @change="changeProceedsPrice(props.row.name)"
								:controls="false" :precision="4" :min="0.0001" :max="100000000000000"
								class="input-with-select" size="small" :teleported="false" :disabled="!isProceeds ||
									(props.row.name === 'Opensea' && !(platformList.find(el => el.name === 'Opensea'))) ||
									(props.row.name === 'Coresky' && !(platformList.find(el => el.name === 'Coresky')))"
								style="width:100px;text-align: left" />

							<el-select model-value="eth" placeholder=" " size="small" style="width:60px">
								<el-option label="ETH" value="eth" />
							</el-select>

							<!--						<el-input v-model="props.row.proceeds" :disabled="!isProceeds ||-->
							<!--						(props.row.name === 'Opensea' && !(platformList.find(el => el.name === 'Opensea'))) ||-->
							<!--						(props.row.name === 'Coresky' && !(platformList.find(el => el.name === 'Coresky')))-->
							<!--" size="small" type="number" style="width:140px"-->
							<!--						          class="input-with-select" :teleported="false" @change="changeProceedsPrice(props.row.name)">-->
							<!--							<template #append>-->
							<!--								<el-select model-value="eth" placeholder=" " size="small" style="width:60px">-->
							<!--									<el-option label="ETH" value="eth"/>-->
							<!--								</el-select>-->
							<!--							</template>-->
							<!--						</el-input>-->
						</template>
					</el-table-column>
					<template #empty>
						<div class="empty-wrap">
							<p class="txt">No Data</p>
							<img src="@/assets/images/no-data.png" alt="">
						</div>
					</template>
				</el-table>

				<!--			<div class="title3">-->
				<!--				Coupons:-->
				<!--			</div>-->
				<!--			<div class="coupons-wrap">-->
				<!--				<div class="txt1">-->
				<!--					Coupon rewadrds:-->
				<!--				</div>-->
				<!--				<div>-->
				<!--					<div class="txt2">-->
				<!--						1 coupon / 0.5eth-->
				<!--					</div>-->
				<!--					<div class="txt2 mt5">-->
				<!--						1 coupon / listing / day-->
				<!--					</div>-->
				<!--				</div>-->
				<!--			</div>-->

				<el-button type="primary" class="btn-submit" :loading="sellBtnLoading" @click="getExchangeHashOrder">
					{{ $t('common.Confirm') }}</el-button>
				<!--			<el-button type="primary" v-if="isApproved" class="btn-submit" :loading="sellBtnLoading" @click="getExchangeHashOrder">Confirm the price</el-button>-->
				<!--			<el-button type="primary" v-else class="btn-submit" :loading="sellBtnLoading" @click="setApproveAll">Approve</el-button>-->

				<!--			<div class="btn-submit">Confirm the price</div>-->
			</div>
			<el-dialog :model-value="isShowDialog" :show-close="false" :close-on-click-modal="false"
				@closed="isShowDialog = false" class="custom-dialog" destroy-on-close>
				<template #title>
					<div class="left">
						<span>正在进行中的挂单</span>
					</div>
					<el-icon @click="isShowDialog = false">
						<Close />
					</el-icon>
				</template>
				<div>
					<el-steps direction="vertical" :active="3">
						<el-step>
							<template #title>
								<div class="txt1">
									授权收藏品
								</div>
							</template>
							<template #description>
								<div class="txt2">
									还剩余1个合集的授权
								</div>
								<div class="txt3">
									<el-icon class="success">
										<SuccessFilled />
									</el-icon>
									<span>ENS: Ethereum Name Service for</span>
									<svg-icon icon-class="logo" />
								</div>
								<div class="txt3">
									<el-icon class="fail">
										<CircleCloseFilled />
									</el-icon>
									<span>ENS: Ethereum Name Service for</span>
									<svg-icon icon-class="os-logo" />
								</div>
								<div class="txt3">
									<el-icon class="my-loading">
										<Loading />
									</el-icon>
									<span>ENS: Ethereum Name Service for</span>
									<svg-icon icon-class="os-logo" />
								</div>
							</template>
						</el-step>
						<el-step>
							<template #title>
								<div class="txt1">
									上架签名
								</div>
							</template>
							<template #description>
								<div class="txt2">
									剩余0个签名
								</div>
								<div class="txt3">
									<el-icon class="success">
										<SuccessFilled />
									</el-icon>
									<span>masturbat.eth</span>
									<svg-icon icon-class="logo" />
								</div>
								<div class="txt3">
									<el-icon class="fail">
										<CircleCloseFilled />
									</el-icon>
									<span>masturbat.eth</span>
									<svg-icon icon-class="os-logo" />
								</div>
								<div class="txt3">
									<el-icon class="my-loading">
										<Loading />
									</el-icon>
									<span>masturbat.eth</span>
									<svg-icon icon-class="os-logo" />
								</div>
							</template>
						</el-step>
						<el-step title="">
							<template #icon>
								<div></div>
							</template>
							<template #title>
							</template>
						</el-step>
					</el-steps>
				</div>
				<div>
					<el-button type="primary" class="btnOption" loading="true">Approve Nft</el-button>
				</div>

			</el-dialog>
		</div>
		<FooterTemplate />

	</div>
</template>
<script>
import BigNumber from "bignumber.js";
import dayjs from 'dayjs';
import store from "@/store";
import { keepPoint } from "@/filters";
import { CROSS_CHAIN_SEAPORT_ADDRESS, ItemType, OrderType } from "@opensea/seaport-js/lib/constants";
import { getMaxOrderExpirationTimestamp } from "opensea-js/lib/utils";
import { DEFAULT_ZONE_BY_NETWORK, OPENSEA_FEE_RECIPIENT } from "opensea-js/lib/constants";
import { createSellOrderSDK } from "@/util/openseaCreateSellOrder/createSellOrder";
import utils_web3 from "@/util/web3";
import FooterTemplate from "@/views/layout/FooterTemplate";

export default {
	mixins: [],
	name: 'listings',
	components: { FooterTemplate },
	data() {
		return {
			isGetOSInfo: false,
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
			platformList: [],
			dataList: [
				{
					name: 'Coresky',
					logo: 'logo',
					coin: 'eth',
					listPrice: undefined,
					fee: '--',
					Royalties: '--',
					floorPrice: '--',
					lastSale: '--',
					proceeds: undefined
				},
				{
					name: 'Opensea',
					logo: 'os-logo',
					coin: 'eth',
					listPrice: undefined,
					fee: '--',
					Royalties: '--',
					floorPrice: '--',
					lastSale: '--',
					proceeds: undefined
				}
			],
			isSamePrice: false,
			samePrice: undefined,
			isProceeds: false,
			defaultTime: new Date(),
			quantity: 1,
			form: {
				time: ''
			},
			isShowDialog: false,
			basePrice: '--',
			tokenInfo: {
				contract: '',
				tokenId: '',
				ckCollectionsInfoEntity: {
					bannerImage: '',
					image: ''
				}
			},
			sellBtnLoading: false,
			nftAmount1155: 0,
			isApproved: true,
			registryOwner: '',
			isSellCoresky: false,
			isSellOpensea: false,
			asset: {
				tokenAddress: this.$route.params.contract, // CryptoKitties
				tokenId: this.$route.params.tokenId
			}
		};
	},
	watch: {
		'$store.state.user': function () {
			this.initSellInfo()
		}
	},
	created() {
		this.tokenInfoParams = {
			contract: this.$route.params.contract,
			tokenId: this.$route.params.tokenId
		}
	},
	mounted() {
		this.getTokenInfo()
		this.getOsTokenInfo()
	},
	computed: {
		user() {
			console.log(this.$store.state.user)
			return this.$store.state.user;
		},
	},
	methods: {
		changePrice(type, listPrice, isReturn = false) {
			if (this.isProceeds) {
				return
			}
			if (type === 'Opensea') {
				let listPrice1 = isReturn ? listPrice : this.dataList[1].listPrice
				let basePrice = new BigNumber(listPrice1)
				let creatorFee = basePrice.multipliedBy(this.dataList[1].protocolFee / 10000)
				let serviceFee = basePrice.multipliedBy(this.dataList[1].RoyaltiesFee / 10000)
				console.log(basePrice.minus(creatorFee).minus(serviceFee).valueOf())
				let proceeds = parseFloat(keepPoint(basePrice.minus(creatorFee).minus(serviceFee).valueOf(), 4))
				if (isReturn) {
					return proceeds
				} else {
					this.dataList[1].proceeds = proceeds
				}
			} else if (type === 'Coresky') {
				let listPrice1 = isReturn ? listPrice : this.dataList[0].listPrice
				let basePrice = new BigNumber(listPrice1)
				let creatorFee = basePrice.multipliedBy(this.dataList[0].protocolFee / 10000)
				let serviceFee = basePrice.multipliedBy(this.dataList[0].RoyaltiesFee / 10000)
				console.log(basePrice.minus(creatorFee).minus(serviceFee).valueOf())
				let proceeds = parseFloat(keepPoint(basePrice.minus(creatorFee).minus(serviceFee).valueOf(), 4))
				if (isReturn) {
					return proceeds
				} else {
					this.dataList[0].proceeds = proceeds
				}
			}
		},
		changeProceedsPrice(type, proceeds, isReturn = false) {
			console.log(type, proceeds, isReturn)
			if (!this.isProceeds) {
				return
			}
			console.log(type)
			if (type === 'Opensea') {
				let proceeds1 = isReturn ? proceeds : this.dataList[1].proceeds
				let basePrice = new BigNumber(proceeds1)
				let creatorFee = basePrice.multipliedBy(this.dataList[1].protocolFee / 10000)
				let serviceFee = basePrice.multipliedBy(this.dataList[1].RoyaltiesFee / 10000)
				console.log(basePrice.plus(creatorFee).plus(serviceFee).valueOf())
				let listPrice = parseFloat(keepPoint(basePrice.plus(creatorFee).plus(serviceFee).valueOf(), 4))
				if (isReturn) {
					return listPrice
				} else {
					this.dataList[1].listPrice = listPrice
				}
			} else if (type === 'Coresky') {
				let proceeds1 = isReturn ? proceeds : this.dataList[0].proceeds
				let basePrice = new BigNumber(proceeds1)
				let creatorFee = basePrice.multipliedBy(this.dataList[0].protocolFee / 10000)
				let serviceFee = basePrice.multipliedBy(this.dataList[0].RoyaltiesFee / 10000)
				console.log(basePrice.plus(creatorFee).plus(serviceFee).valueOf())
				let listPrice = parseFloat(keepPoint(basePrice.plus(creatorFee).plus(serviceFee).valueOf(), 4))
				console.log(listPrice)
				if (isReturn) {
					return listPrice
				} else {
					this.dataList[0].listPrice = listPrice
				}
			}
		},
		changeProceeds() {
			this.samePrice = undefined
			this.dataList[0].listPrice = undefined
			this.dataList[1].listPrice = undefined
			this.dataList[0].proceeds = undefined
			this.dataList[1].proceeds = undefined
		},
		async initSellInfo() {
			this.tokenInfo.tokenId = parseInt(this.tokenInfo.tokenId)
			try {
				if (this.tokenInfo.contractType === 1) {
					const amount = await this.$sdk.getERC1155Amount(this.tokenInfo.contract, this.tokenInfo.tokenId, this.user.coinbase)
					if (typeof amount == 'object' && amount.error) {
						this.nftAmount1155 = 0
					} else {
						this.nftAmount1155 = amount
					}
				}
				await this.getRegistryOwner()
				console.log(this.tokenInfo.contractType)
				let order = {
					type: this.tokenInfo.contractType === 0 ? "IERC721" : "IERC1155",
					address: this.tokenInfo.contract,
					tokenId: this.tokenInfo.tokenId,
				};
				console.log(order)
				this.isApproved = await this.$sdk.isApprovedForAll(
					order,
					this.user.coinbase,
					this.registryOwner,
				);
				console.log(this.isApproved)
			} catch (e) {
				console.log(e)
			}

		},
		getTokenInfo() {
			this.$api("collect.tokenInfo", this.tokenInfoParams).then((res) => {
				this.tokenInfo = res.debug
				this.dataList[0].listedPrice = this.$sdk.fromWeiNum(this.tokenInfo.listedPriceCs)
				this.dataList[0].floorPrice = parseFloat(this.tokenInfo.ckCollectionsInfoEntity.foolPrice)
				console.log('this.tokenInfo.ckCollectionsInfoEntity.royalty', this.tokenInfo.ckCollectionsInfoEntity.royalty)
				this.dataList[0].Royalties = this.$filters.feeFormat(this.tokenInfo.ckCollectionsInfoEntity.royalty)
				this.dataList[0].fee = this.$filters.feeFormat(store.state.config.protocolFee)
				this.dataList[0].RoyaltiesFee = this.tokenInfo.ckCollectionsInfoEntity.royalty
				this.dataList[0].protocolFee = store.state.config.protocolFee
				this.dataList[0].lastSale = this.tokenInfo.historyPrice.length > 0 ? this.$sdk.fromWeiNum(this.tokenInfo.historyPrice[this.tokenInfo.historyPrice.length - 1].price) : "--"
				this.dataList[1].listedPrice = this.$sdk.fromWeiNum(this.tokenInfo.listedPriceOs)
				const sellSelf = res.debug.ckOrdersEntityList.filter(item => item.maker === this.user.coinbase && item.expirationTime > (new Date().getTime() / 1000))
				this.isSellCoresky = sellSelf.length > 0
				if (!this.isSellCoresky) {
					this.platformList = [
						{
							name: "Coresky"
						}
					]
				}
				if (this.user.coinbase) {
					this.initSellInfo()
				}
			})
		},
		async getOsTokenInfo() {
			console.log(this.asset)
			this.isGetOSInfo = false
			try {
				const openseaSDK = await this.$sdk.initOpenSea()
				console.log(openseaSDK)
				const assetInfo = await openseaSDK.api.getAsset(this.asset)
				console.log(assetInfo)
				this.dataList[1].floorPrice = assetInfo.collection.stats.floor_price
				this.dataList[1].Royalties = this.$filters.feeFormat(assetInfo.assetContract.openseaSellerFeeBasisPoints)
				this.dataList[1].fee = this.$filters.feeFormat(assetInfo.assetContract.sellerFeeBasisPoints)
				this.dataList[1].RoyaltiesFee = assetInfo.assetContract.openseaSellerFeeBasisPoints
				this.dataList[1].protocolFee = assetInfo.assetContract.sellerFeeBasisPoints
				await this.$sdk._sleep(2000)
				const openseaListed = await this.$sdk.getOrdersOpensea({
					assetContractAddress: this.asset.tokenAddress,
					tokenId: this.asset.tokenId
				}, this.user.coinbase)
				if (openseaListed.code === 200) {
					const sellSelf = openseaListed.data.filter(item => item.maker.address === this.user.coinbase)
					this.isSellOpensea = sellSelf.length > 0
				}
				this.isGetOSInfo = true
			} catch (e) {
				console.log(e)
				this.dataList[1].floorPrice = 0
				this.dataList[1].Royalties = this.$filters.feeFormat(250)
				this.dataList[1].fee = this.$filters.feeFormat(250)
			}
		},
		goBack() {
			window.history.go(-1)
		},
		samePriceChange() {
			console.log(this.dataList)
			this.dataList.map(el => {
				if (this.platformList.find(item => item.name === el.name)) {
					if (this.isProceeds) {
						el.proceeds = this.samePrice
						console.log(this.changeProceedsPrice(el.name, el.proceeds, true))
						el.listPrice = this.changeProceedsPrice(el.name, el.proceeds, true)
					} else {
						el.listPrice = this.samePrice
						console.log(this.changePrice(el.name, el.listPrice, true))
						el.proceeds = this.changePrice(el.name, el.listPrice, true)
					}
				}
				return el
			})
			console.log(this.dataList)
		},
		changeSamePrice() {
			this.changeProceeds()
		},
		disabledDate(time) {
			return time.getTime() < Date.now()
		},
		dateChange() {
			this.form.time = dayjs().add(this.form.date, "day").format("YYYY/MM/DD HH:mm");
			console.log(this.form.time)
		},
		togglePlatform(name) {
			if (name === 'Opensea' && !this.isGetOSInfo) {
				this.$tools.message(this.$t('messageTip.loadingOSInfoWating'), 'warning');
				return
			}
			if (this.isSellOpensea && name === 'Opensea') {
				this.$tools.message(this.$t('messageTip.platformOneQuotation', { name: 'Opensea' }), 'warning');
				return
			}
			if (this.isSellCoresky && name === 'Coresky') {
				this.$tools.message(this.$t('messageTip.platformOneQuotation', { name: 'Coresky' }), 'warning');
				return
			}
			let obj = this.platformList.find(el => el.name === name)
			if (obj) {
				this.platformList = this.platformList.filter(el => el.name !== name)
			} else {
				this.platformList.push({ name })
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
				type: this.tokenInfo.contractType === 0 ? "IERC721" : "IERC1155",
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
			this.sellBtnLoading = true
			if (!isApproved) {
				let result = await this.$sdk.setApprovalForAll(
					order,
					this.user.coinbase,
					this.registryOwner,
					true
				);
				if (typeof result == "object" && result.error) {
					return result;
				}
				this.isApproved = await this.$sdk.isApprovedForAll(
					order,
					this.user.coinbase,
					this.registryOwner,
				);
				this.sellBtnLoading = false
				console.log(result)
			} else {
				console.log('true')
			}
			// return result;
		},
		// 挂单
		async getExchangeHashOrder() {
			if (this.platformList.find(el => el.name === 'Coresky')) {
				this.sellNftCoresky()
			} else if (this.platformList.find(el => el.name === 'Opensea')) {
				this.sellNftOS()
				// this.sellNftOsOrder()
			} else {
				this.$tools.message(this.$t('messageTip.ChooseMarket'), 'warning');
			}
		},
		async sellNftCoresky() {
			const price = this.dataList[0].listPrice
			if (!price || new BigNumber(price).isLessThan(0)) {
				this.$tools.message(this.$t('messageTip.SetPriceItem'), 'warning');
				return
			}
			if (!this.form.time) {
				this.$tools.message(this.$t('messageTip.SetDuration'), 'warning');
				return
			}
			console.log(typeof this.tokenInfo.tokenId)
			this.sellBtnLoading = true
			if (!this.isApproved) {
				await this.setApproveAll()
			}
			this.sellBtnLoading = true
			let seller = this.$sdk.makeOrder({
				exchangeAddress: process.env.VUE_APP_MARKET_EXCHANGE,
				sender: this.user.coinbase,
				nftAddress: this.tokenInfo.contract,
				side: 1,
				tokenId: this.tokenInfo.tokenId,
				feeRecipient: this.tokenInfo.ckCollectionsInfoEntity.feeContract,
				RelayerFee: this.tokenInfo.ckCollectionsInfoEntity.royalty,
				contractType: this.tokenInfo.contractType,
				value: Number(this.quantity)
			})
			seller.expirationTime = new Date(this.form.time).getTime() / 1000;
			// seller.expirationTime = 0;
			seller.listingTime = Date.parse(new Date().toString()) / 1000 - 600;
			seller.basePrice = this.$Web3.utils.toWei(price.toString());
			// console.log(this.$Web3.utils.toWei(price))
			// console.log(ethers)
			// seller.basePrice = ethers.BigNumber.from(this.$Web3.utils.toWei(price));
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
			try {
				const hashToSign = await this.$sdk.callhashToSign_(seller)
				if (typeof hashToSign == "object" && hashToSign.error) {
					this.sellBtnLoading = false
					return
				}
				console.log(seller)
				console.log()
				const sig = await this.$sdk.signature(seller, this.user.coinbase)
				if (typeof sig == "object" && sig.error) {
					this.sellBtnLoading = false
					return
				}
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
						contract: this.tokenInfo.contract,
						type: this.$sdk.valueOrderType("SALE"),
						v: sig.v,
						r: sig.r,
						s: sig.s,
						hash: hashToSign,
						sign: JSON.stringify(sig),
						basePrice: this.$Web3.utils.toWei(price.toString()),
						amount: this.tokenInfo.contractType === 1 ? Number(this.quantity) : 1
					}
				}

				const isSeleceOpensea = this.platformList.find(el => el.name === 'Opensea')
				if (isSeleceOpensea) {
					this.sellNftOS()
				}
				// this.nftToBuy = orderParams
				this.$api("order.create", orderParams).then((res) => {
					if (!isSeleceOpensea) {
						this.sellBtnLoading = false
						setTimeout(() => {
							window.history.go(-1)
						}, 500)
					}
					if (res.code === 200) {
						this.isShowSellDialog = false
						this.$tools.message('Coresky' + this.$t('messageTip.ListingSucceeded'), 'success');
						this.$emit('sellCreateSuccess', res)
					} else {
						this.$tools.message(res.message);
					}
				}).catch(e => {
					this.$tools.message(e.message || e);
					this.sellBtnLoading = false
				})
			} catch (e) {
				console.log(e)
				this.sellBtnLoading = false
			}
		},

		async sellNftOsOrder() {
			this.sellBtnLoading = true
			const price = this.dataList[1].listPrice
			if (!price || new BigNumber(price).isLessThan(0)) {
				this.$tools.message('请输入正确的价格', 'warning');
				this.sellBtnLoading = false
				return
			}
			if (!this.form.time) {
				this.$tools.message('请选择过期时间', 'warning');
				this.sellBtnLoading = false
				return
			}
			try {
				const openseaSDK = await this.$sdk.initOpenSea()
				let web3 = await utils_web3.getWeb3();
				const createSellOrder = new createSellOrderSDK(openseaSDK, web3)

				const asset = {
					...this.asset,
					...{
						schemaName: this.tokenInfo.contractType === 1 ? ItemType.ERC1155 : ItemType.ERC721
					}
				}
				const expirationTime = new Date(this.form.time).getTime() / 1000
				let sellOrderParams = {
					asset,
					// tokenAddress: this.tokenInfoParams.contract, // CryptoKitties
					// tokenId: this.tokenInfoParams.tokenId,
					// schemaName: this.tokenInfo.contractType === 1 ? ItemType.ERC1155 : ItemType.ERC721,

					accountAddress: this.user.coinbase,
					startAmount: parseFloat(price),
					endAmount: parseFloat(price),
					// If `endAmount` is specified, the order will decline in value to that amount until `expirationTime`. Otherwise, it's a fixed-price order:
					expirationTime,
					restrictedByZone: false,
					allowPartialFills: false
				}
				if (this.tokenInfo.contractType === 1) {
					sellOrderParams = {
						...sellOrderParams,
						...{
							quantity: Number(this.quantity)
							// address: CROSS_CHAIN_SEAPORT_ADDRESS
						}
					}
				}
				console.log(sellOrderParams)
				const createOrder = await createSellOrder.createSellOrder(sellOrderParams)
				console.log(createOrder)
			} catch (e) {
				this.sellBtnLoading = false
				this.$tools.message(this.$filters.filterMsgOpenseaErr(e), 'warning');
				console.log(e)
			}
		},
		async sellNftOS() {
			// if (!this.isGetOSInfo) {
			// 	this.$tools.message('正在拉取opensea数据，请稍等', 'warning');
			// 	await this.getOsTokenInfo()
			// }
			this.sellBtnLoading = true
			const price = this.dataList[1].listPrice
			if (!price || new BigNumber(price).isLessThan(0)) {
				this.$tools.message('请输入正确的价格', 'warning');
				this.sellBtnLoading = false
				return
			}
			if (!this.form.time) {
				this.$tools.message('请选择过期时间', 'warning');
				this.sellBtnLoading = false
				return
			}
			try {
				// let basePrice = new BigNumber(price)
				// let creatorFee = basePrice.multipliedBy(this.dataList[1].protocolFee / 10000)
				// let serviceFee = basePrice.multipliedBy(this.dataList[1].RoyaltiesFee / 10000)
				// let proceedsBig = basePrice.minus(creatorFee).minus(serviceFee)
				// let proceeds = this.$Web3.utils.toWei(proceedsBig.valueOf())
				// let getAmountBig = basePrice.minus(proceedsBig)
				// let getAmount = this.$Web3.utils.toWei(getAmountBig)
				// const SALT = new Date().getTime();
				// const params = {
				// 	"parameters": {
				// 		"offerer": this.user.coinbase,
				// 		"zone": "0x0000000000000000000000000000000000000000",
				// 		"zoneHash": "0x3000000000000000000000000000000000000000000000000000000000000000",
				// 		"startTime": listingTime,
				// 		"endTime": expirationTime,
				// 		"orderType": OrderType.FULL_OPEN,
				// 		"offer": [
				// 			{
				// 				"itemType": this.tokenInfo.contractType === 1 ? ItemType.ERC721 : ItemType.ERC1155,
				// 				"token": this.asset.tokenAddress,
				// 				"identifierOrCriteria": this.asset.tokenId.toString(),
				// 				"startAmount": this.tokenInfo.contractType === 1 ? this.quantity.toString() : '1',
				// 				"endAmount": this.tokenInfo.contractType === 1 ? this.quantity.toString() : '1'
				// 			}
				// 		],
				// 		"consideration": [
				// 			{
				// 				"itemType": 0,
				// 				"token": this.$sdk.NULL_ADDRESS(),
				// 				"identifierOrCriteria": "0",
				// 				"startAmount": getAmount,
				// 				"endAmount": getAmount,
				// 				"recipient": this.user.coinbase
				// 			},
				// 			{
				// 				"itemType": 0,
				// 				"token": this.$sdk.NULL_ADDRESS(),
				// 				"identifierOrCriteria": "0",
				// 				"startAmount": proceeds,
				// 				"endAmount": proceeds,
				// 				"recipient": OPENSEA_FEE_RECIPIENT
				// 			}
				// 		],
				// 		"totalOriginalConsiderationItems": 2,
				// 		"salt": SALT,
				// 		"conduitKey": process.env.VUE_APP_OPENSEA_KEY
				// 	},
				// 	"signature": "0x678d690063d18d93541c0793abdd2cb56685a4e567863e0b8417c3632c0788c7134de97978a97d0b17a863339f1f5dbb718cfa671302fa79a02f76e651bf34d0"
				// }
				const asset = {
					...this.asset,
					...{
						schemaName: this.tokenInfo.contractType === 1 ? ItemType.ERC1155 : ItemType.ERC721
					}
				}
				const expirationTime = new Date(this.form.time).getTime() / 1000
				let sellOrderParams = {
					asset,
					// tokenAddress: this.tokenInfoParams.contract, // CryptoKitties
					// tokenId: this.tokenInfoParams.tokenId,
					// schemaName: this.tokenInfo.contractType === 1 ? ItemType.ERC1155 : ItemType.ERC721,

					accountAddress: this.user.coinbase,
					startAmount: parseFloat(price),
					endAmount: parseFloat(price),
					// If `endAmount` is specified, the order will decline in value to that amount until `expirationTime`. Otherwise, it's a fixed-price order:
					expirationTime,
					restrictedByZone: false,
					allowPartialFills: false
				}

				if (this.tokenInfo.contractType === 1) {
					sellOrderParams = {
						...sellOrderParams,
						...{
							quantity: Number(this.quantity)
							// address: CROSS_CHAIN_SEAPORT_ADDRESS
						}
					}
				}
				const openseaSDK = await this.$sdk.initOpenSea()
				console.log(openseaSDK)
				// Expire this auction one day from now.
				// Note that we convert from the JavaScript timestamp (milliseconds):
				console.log(sellOrderParams)
				const listing = await openseaSDK.createSellOrder(sellOrderParams)
				this.$tools.message('Opensea' + this.$t('messageTip.ListingSucceeded'), 'success');
				console.log(listing)
				this.sellBtnLoading = false
				setTimeout(() => {
					window.history.go(-1)
				}, 1000)
			} catch (e) {
				this.sellBtnLoading = false
				this.$tools.message(this.$filters.filterMsgOpenseaErr(e), 'warning');
				console.log(e)
			}
		},
	},
	beforeUnmount() {

	}
};
</script>
<style lang="scss" scoped>
.main-wrapper {
	padding-bottom: 30px;
}

.mr10 {
	margin-right: 10px;
}

.mt5 {
	margin-top: 10px;
}

.listings-head {
	display: flex;
	align-items: center;

	.title {
		height: 41px;
		font-size: 32px;
		font-weight: bold;
		color: #000000;
		line-height: 41px;
	}

	.btn-back {
		margin-right: 10px;

		&:hover {
			border: 1px solid #dcdfe6;
			color: #000;
		}

		.el-icon {
			font-size: 18px;
		}
	}
}

.nft-box {
	width: 800px;
	display: flex;
	margin-top: 30px;
	padding: 14px;
	border: 1px solid $borderBg;
	border-radius: 12px;
	align-items: center;

	.img-box {
		width: 84px;
		height: 84px;
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
			font-weight: 600;
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

.title2 {
	padding-left: 24px;
	display: flex;
	margin-top: 30px;
	height: 75px;
	font-size: 18px;
	font-weight: bold;
	color: #717A83;
	line-height: 75px;
	border: 1px solid #E6E8EC;
	border-bottom: 0;
	border-radius: 12px 12px 0px 0px;
	align-items: center;

	.icon-lock {
		width: 24px;
		height: auto;
		margin-right: 8px;
	}
}

.title3 {
	margin: 30px 0 20px;
	font-size: 16px;
	font-weight: bold;
	color: #000000;
}

.platform {
	display: flex;
	height: 98px;
	padding-top: 24px;
	padding-left: 24px;
	border: 1px solid #E6E8EC;
	border-radius: 0px 0px 12px 12px;
	background: #FAFCFE;

	.item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 138px;
		margin-right: 20px;
		font-size: 14px;
		height: 44px;
		background: #ffffff;
		border-radius: 10px;
		border: 1px solid $borderBg;
		cursor: pointer;

		&.active {
			background: rgba(125, 71, 255, 0.04);
			border: 1px solid #7d47ff;
		}

		&:hover {
			border: 1px solid #7d47ff;
		}
	}
}

.platform-logo {
	width: 24px;
	height: 24px;
	margin-right: 10px;
}

.flex-com {
	margin-top: 30px;
	height: 70px;
	line-height: 70px;
	padding: 0 24px;
	display: flex;
	align-items: center;
	border: 1px solid #E6E8EC;
	border-bottom: 0;
	border-radius: 12px 12px 0px 0px;

	.item {
		margin-right: 50px;
	}
}

.mytable {
	border: 1px solid $borderBg;
	border-radius: 0 0 12px 12px;

	.flex-m {
		display: flex;
		align-items: center;
		min-height: 80px;
	}

	.txt1 {
		margin-top: 5px;
		font-size: 12px;
	}
}

::v-deep .el-table {
	.head-row th.el-table__cell {
		height: 66px;
		background: #FAFCFE;
		font-size: 18px;

	}

	.el-input-group__append {
		// background-color: transparent;
	}

	.el-input__wrapper {
		padding: 1px 5px;
		background: #fff;
	}

	.el-input__inner {
		font-size: 12px;

		&::-webkit-input-placeholder {
			font-size: 12px;
		}
	}
}

.el-select-dropdown__item {
	padding: 0 10px;
	height: 30px;
	line-height: 30px;
	font-size: 12px;
}

.coupons-wrap {
	display: flex;
	align-items: center;
	padding: 0 20px;
	height: 78px;
	background: $elButtonHoverBg;
	border-radius: 10px;
	border: 1px solid $borderBg;

	.txt1 {
		height: 18px;
		font-size: 14px;
		color: $color-black2;
		line-height: 18px;
		margin-right: 20px;
	}

	.txt2 {
		height: 18px;
		font-size: 14px;
		color: #000000;
		line-height: 18px;
	}
}

.btn-submit {
	margin-top: 30px;
	width: 337px;
	height: 60px;
	line-height: 60px;
	background: #1063E0;
	border-radius: 12px;
	color: $color-white;
	text-align: center;
	font-size: 18px;
	cursor: pointer;
	margin-bottom: 50px;
}

::v-deep {
	.custom-dialog {
		width: 480px;
		padding: 30px 30px;

		.txt1 {
			margin-bottom: 10px;
			height: 28px;
			font-size: 20px;
			font-weight: bold;
			color: #000000;
			line-height: 25px;
		}

		.txt2 {
			margin-bottom: 10px;
			height: 20px;
			font-size: 14px;
			color: #000000;
			line-height: 20px;
		}

		.txt3 {
			margin-bottom: 10px;
			display: flex;
			align-items: center;
			height: 18px;
			font-size: 14px;
			color: #000000;
			line-height: 18px;

			.el-icon,
			.svg-icon {
				font-size: 16px;
				margin-right: 5px;

				&.success {
					color: #17c586;
				}

				&.fail {
					color: #ff4949;
				}
			}

			.svg-icon {
				margin-left: 5px;
			}
		}

		.btnOption {
			width: 100%;
			height: 48px;
			padding: 10px 0;
			border-radius: 24px;
			font-weight: 700;
			border: none;
			cursor: pointer;
			color: $color-white;
			background: $mainLiner;

			&:hover {
				background: $mainLiner;
			}

			&.small {
				height: 38px;
				border-radius: 19px;
				width: 280px;
			}
		}
	}
}

.my-loading {
	color: #409eff;
	width: 16px;
	height: 16px;
	animation: icon-loading 2s infinite linear;
}

@keyframes icon-loading {
	0% {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(1turn);
	}
}
</style>
<style lang="scss">
.listings-box {
	margin-top: 40px;

	.el-input-number .el-input__inner {
		text-align: left;
	}

	.nft-box {
		.el-input-number .el-input__inner {
			text-align: center;
		}
	}

	.el-table .cell {
		padding-left: 16px !important;
		padding-right: 16px !important;
	}
}</style>


