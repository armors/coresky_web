<template>
	<div class="nft-list">
		<div class="display-flex box-center-Y nft-title">
			<div class="index-num"></div>
			<div class="nft-info">{{ $t('home.nftListTitle1') }}</div>
			<div class="price box-flex1 display-flex box-center-Y">
				<div class="box-flex1"></div><div class="icon-token"></div>
				{{ $t('home.nftListTitle2') }}</div>
			<div class="exchange-volume box-flex1 display-flex box-center-Y">
				<div class="box-flex1"></div><div class="icon-token"></div>
				{{ $t('home.nftListTitle3') }}</div>
			<div class="total-exchange-volume box-flex1 display-flex box-center-Y">
				<div class="box-flex1"></div><div class="icon-token"></div>
				{{ $t('home.nftListTitle4') }}</div>
			<div class="holder box-flex1">{{ $t('home.nftListTitle5') }}</div>
			<div class="total box-flex1">{{ $t('home.nftListTitle6') }}</div>
			<div class="order-volume box-flex1">{{ $t('home.nftListTitle7') }}</div>
		</div>
		<div class="nft-item display-flex box-center-Y" v-for="(v, i) in nftList" :key="`nft-item-${i}`" :class="{'bg-gray': i === 0}">
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
				<div class="icon-tag"><img src="../../../assets/images/icons/icon_tag.svg" alt=""></div>
			</div>
			<div class="price box-flex1 display-flex box-center-Y">
				<div class="box-flex1"></div>
				<div class="icon-token"><img src="../../../assets/images/icons/token/token_eth.svg" alt=""></div>
				<div>{{0.05 + i}}ETH</div>
			</div>
			<div class="exchange-volume box-flex1 display-flex box-center-Y">
				<div class="box-flex1"></div>
				<div class="icon-token"><img src="../../../assets/images/icons/token/token_eth.svg" alt=""></div>
				<div>123</div>
			</div>
			<div class="total-exchange-volume box-flex1 display-flex box-center-Y">
				<div class="box-flex1"></div>
				<div class="icon-token"><img src="../../../assets/images/icons/token/token_eth.svg" alt=""></div>
				<div>123</div>
			</div>
			<div class="holder box-flex1">234</div>
			<div class="total box-flex1">3242</div>
			<div class="order-volume box-flex1">93847</div>
		</div>
	</div>
</template>

<script>
	import MixinsNFTInfo from "@/mixins/NftInfo";
	export default {
		name: "nftList",
		mixins: [MixinsNFTInfo],
		props: {
			nftList: {
				type: Object,
				default: {},
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
	@import "./nftList";
</style>
