<template>
	<div>
		<div class="launch-calender">
			<div class="home-title">{{$t("home.launchCalendar")}}</div>
			<div class="display-flex box-between nft-title box-center-Y">
				<div class="index-num"></div>
				<div class="nft-info">{{ $t('home.nftListTitle1') }}</div>
				<div class="time">{{ $t('home.nftListTitle8') }}</div>
				<div class="chain">{{ $t('home.nftListTitle9') }}</div>
				<div class="mine-link">{{ $t('home.nftListTitle10') }}</div>
				<div class="community">{{ $t('home.nftListTitle11') }}</div>
			</div>
			<div class="nft-item display-flex box-between box-center-Y" v-for="(v, i) in launchList" :key="`nft-item-${i}`">
				<div class="index-num">{{i + 1}}</div>
				<div class="nft-info display-flex box-center-Y">
					<el-image class="cover-image" placeholder="loading" :src="$filters.fullImageUrl($filters.nftURI(v).image)" fit="cover">
						<template v-slot:placeholder>
							<el-skeleton class="placeholder-image" animated>
								<template #template>
									<el-skeleton-item class="nft-image-skeleton" variant="h3" />
								</template>
							</el-skeleton>
						</template>
						<template v-slot:error>
							<el-image class="error-image" :src="require('@/assets/create-img/non-existent.png')" fit="contain"></el-image>
						</template>
					</el-image>
					<div class="nft-name">{{ $filters.nftURI(v).name }}</div>
				</div>
				<div class="time">{{formatTime()}}</div>
				<div class="chain">ETH</div>
				<div class="mine-link">3242</div>
				<div class="community">google  face</div>
			</div>
		</div>
		<load :loadStatus="loadStatus"></load>
	</div>

</template>

<script>
	import MixinsNFTInfo from "@/mixins/NftInfo";
	import load from './load'
	import moment from "moment";
	export default {
		name: "launchCalender",
		mixins: [MixinsNFTInfo],
		components: {
			load
		},
		props: {
			loadStatus: {
				type: String,
				default: "",
			},
			launchList: {
				type: Object,
				default: [],
			},
			address: {
				type: String,
				default: "",
			},
			size: {
				type: String,
				default: "",
			},
		},
		data () {
			return {
				loading: true,
				visible: false,
			};
		},
		created () {
			this.$nextTick(function () {
				this.loading = false;
			});
		},
		mounted () {
			let that = this;
		},
		computed: {
			isOwner(){
				var itemOwner = this.nft.items[0].itemOwner;
				if(!this.connected || this.user.coinbase != itemOwner) return false;
				return true;
			},
			config () {
				return this.$store.state.config;
			},
			connected () {
				return this.$store.state.connected;
			},
			asset(){
				var item = this.nft.items[0];
				if(item.onsell && this.nft.sale){
					var sale = this.nft.sale;
					return { ...sale, ...item };
				}
				return item;
			},
			myBid () {
				if (!this.connected || !this.nft.bids) return;
				var itemOwner = this.nft.items[0].itemOwner;
				if (itemOwner == this.user.coinbase) return;
				return this.getActiveAddressBid(this.nft.bids, this.user.coinbase);
			},
			highestBid () {
				if (!this.nft.bids || !this.nft.items) return;
				var itemOwner = this.nft.items[0].itemOwner;
				return this.getHighestBid(this.nft.bids, itemOwner);
			},
			user () {
				return this.$store.state.user;
			},
		},
		methods: {
			formatTime(datas, type) {
				let time
				let format = 'MMM DD , HH:mm'
				if (type) {
					format = type
				}
				datas = parseInt(datas)
				if (isNaN(datas)) {
					time = moment()
				} else {
					time = moment(datas * 1000)
				}
				return time.format(format)
			},
			goUser (address) {
				this.$router.push({ path: "/account/" + address });
			},
			clickLike () {
				let data = {
					address: this.nft.address,
					tokenId: this.nft.tokenId,
				};
				if (!this.nft.like) {
					this.$api("like.add", data).then((res) => {
						if (this.$tools.checkResponse(res)) {
							this.$emit("onLike", data, true);
						}
					});
				} else {
					this.$api("like.remove", data).then((res) => {
						if (this.$tools.checkResponse(res)) {
							this.$emit("onLike", data, false);
						}
					});
				}
			},
			showDialog (name, asset) {
				let nft = this.nft;
				if (name == "opensea") {
					if (!this.config.network.opensea) return;

					let url = this.config.network.opensea + '/' + nft.address + "/" + nft.tokenId;
					window.open(url, "_blank");
					return;
				}
				if (!this.$tools.needLogin(this.$route.path)) return;
				let order = asset;
				this.$emit("showDialog", name, nft, order, this.nftURI);
			},
			goDetail () {
				var ids = this.nft.address + ":" + this.nft.tokenId;
				this.$router.push("/detail/" + ids);
			},
		},
	}
</script>

<style scoped lang="scss">
	.launch-calender{
		.nft-title{
			height: 80px;
			border-bottom: 1px solid $grayColor;
		}
		.nft-item{
			padding: 20px 0;
			.cover-image{
				width: 60px;
				height: 60px;
				border-radius: 8px;
			}
		}
		.nft-info{
			width: 560px;
			.nft-name{
				padding-left: 16px;
				font-size: 16px;
			}
		}
		.index-num{
			width: 100px;
			text-align: center;
		}
		.time{
			width: 150px;
		}
		.chain{
			width: 100px;
		}
		.mine-link{
			width: 120px;
		}
		.community{
			width: 160px;

		}
		border-bottom: 1px solid $grayColor;
	}
</style>
