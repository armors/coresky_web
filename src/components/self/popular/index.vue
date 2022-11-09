<template>
	<div class="popular-list">
		<div class="home-title">{{$t("home.popularTitle")}}</div>
		<el-carousel class="popular-banner" arrow="always" :interval="6000" :height="bannerHeight">
			<el-carousel-item v-for="(popular, i) in _popularList" :key="i">
					<div class="popular-box display-flex box-center-Y box-nowrap box-between">
						<div class="popular-item" v-for="(v, i1) in popular" :key="`popular-${i}`">
							<el-image class="cover-image" placeholder="loading" :src="$filters.fullImageUrl(($filters.nftURI(v)).image)" fit="cover">
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
							<div class="nft-name">{{ ($filters.nftURI(v)).name }}</div>
						</div>
					</div>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	export default {
		name: "index",
		props: {
			popularList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		watch: {
			popularList: {
				handler: (newValue) => {
				},
				immediate: false
			}
		},
		computed: {
			_popularList () {
				console.log(this.$tools.sliceArrayTo(this.popularList))
				return this.$tools.sliceArrayTo(this.popularList)
			},
		},
		data () {
			return {
				bannerHeight: "500px",
			}
		},
		methods: {
			handleResize () {
				let header_height = 112;
				let banner = document.getElementById("popular-banner");
				if (!banner) return;
				banner.style.paddingTop = header_height + 10 + "px";
				let width = banner.clientWidth;
				this.bannerHeight = (width / 1.8) ;
				if (this.bannerHeight < 600) {
					this.bannerHeight = '600px'
				} else {
					this.bannerHeight = this.bannerHeight + 'px'
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.popular-list{
		padding-top: 24px;
		.popular-banner{
			.popular-box{
				width: 85%;
				height: 100%;
				margin: 0 auto;
				.popular-item{
					width: 30%;
					height: 180px;
					.cover-image{
						width: 100%;
						height: 120px;
					}
					.nft-name{
						font-size: 24px;
						text-align: center;
					}
				}
			}
		}
	}
</style>
