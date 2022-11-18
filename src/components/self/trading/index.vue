<template>
	<div class="trading-list">
		<div class="home-title title-margin-top">{{$t("home.tradeTitle")}}</div>
		<el-carousel class="trading-banner" arrow="always" :interval="6000">
			<el-carousel-item v-for="(popular, i) in _popularList" :key="i">
					<div class="trading-box display-flex box-between">
						<div class="trading-item" v-for="(v, i1) in popular" :key="`trading-${i}`">
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
							<div class="nft-name">
								{{ ($filters.nftURI(v)).name }}
								<div class="img-logo"><img :src="$filters.fullImageUrl(($filters.nftURI(v)).image)" alt=""></div>
							</div>
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
				return this.$tools.sliceArrayTo(this.popularList, 3)
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
				let banner = document.getElementById("trading-banner");
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

<style lang="scss">
	.trading-list{
		padding-top: 14px;
		.trading-banner{
			margin-top: 40px;
			height: 318px;
			.el-carousel__container{
				height: 100%;
				padding-left: 4px;
				padding-right: 4px;
			}

			.el-carousel__indicators{
				display: none !important;
			}
			.el-carousel__arrow{
				width: 40px;
				height: 40px;
				/* 白 */
				background: $bg-white;
				/* 紫色 */
				box-shadow: 0px 0px 20px $arrowBtnShadow;
				border-radius: 20px;
				z-index: 100;
				.el-icon{
					color: $primaryColor;
				}
				&.el-carousel__arrow--left{
					left: -20px;
				}
				&.el-carousel__arrow--right{
					right: -20px;
				}
				&:hover{
					background: $bgPurple;
					.el-icon{
						color: $color-white;
					}
				}
			}
			.trading-box{
				width: 100%;
				height: 308px;
				margin: 0 auto;

				.trading-item{
					cursor: pointer;
					border-radius: 20px;
					width: 388px;
					height: 308px;
					/* 紫色 */
					/* box-shadow:
						-5px 5px 10px -4px $arrowBtnShadow,
						5px 5px 10px -4px $arrowBtnShadow;*/
					.cover-image{
						width: 100%;
						height: 236px;
						border-radius: 20px 20px 0px 0px;
					}
					.nft-name{
						padding: 16px 24px 0 110px;
						height: 72px;
						border-radius: 0 0 20px 20px;
						box-shadow:
							-5px 5px 10px -4px $arrowBtnShadow,
							5px 5px 10px -4px $arrowBtnShadow;
						font-family: 'Plus Jakarta Display';
						font-style: normal;
						font-weight: 700;
						font-size: 22px;
						position: relative;
						.img-logo{
							position: absolute;
							width: 79px;
							height: 79px;
							border-radius: 50%;
							border: 4px solid $bg-white;
							top: -20px;
							left: 20px;
							overflow: hidden;
							img{
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}
	}
</style>
