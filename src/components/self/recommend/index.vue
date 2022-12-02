<template>
	<div class="recommend-list">
		<div class="home-title">{{$t("home.exploreTitle")}}</div>
		<div class="recommend-banner-box">
			<div class="arrow-prev arrow-icon" @click="arrowClick('prev')"></div>
			<div class="arrow-next arrow-icon" @click="arrowClick('next')"></div>
			<el-carousel class="recommend-banner" arrow="never" :interval="6000" ref="recommendBanner">
				<el-carousel-item v-for="(recommend, i) in _recommendCollection" :key="i">
					<div class="recommend-box display-flex box-center-Y">
						<div class="recommend-item" v-for="(v, i1) in recommend" :key="`recommend-${i1}`" @click="$router.push({
				name: 'collection',
				params: { contract: v.contract }
				})">
							<image-box :src="v.image"></image-box>
							<div class="nft-name display-flex box-center-Y">
								<div>{{ v.name }}</div>
								<div class="icon-tag"><img src="../../../assets/images/icons/icon_tag.svg" alt=""></div>
							</div>
						</div>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		props: {
			recommendCollection: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		watch: {
			recommendCollection: {
				handler: (newValue) => {
				},
				immediate: false
			}
		},
		computed: {
			_recommendCollection () {
				console.log(this.$tools.sliceArrayTo(this.recommendCollection, 4))
				return this.$tools.sliceArrayTo(this.recommendCollection, 4)
			},
		},
		data () {
			return {
				bannerHeight: "500px",
			}
		},
		methods: {
			arrowClick (val) {
				if(val === 'next') {
					this.$refs.recommendBanner.next()
				} else {
					this.$refs.recommendBanner.prev()
				}
			},
			handleResize () {
				let header_height = 112;
				let banner = document.getElementById("recommend-banner");
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
	.recommend-list{
		padding-top: 14px;
		.recommend-banner-box{
			height: 286px;
			position: relative;
		}
		.recommend-banner{
			margin-top: 40px;
			height: 100%;
			.el-carousel__container{
				height: 286px;
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
			.recommend-box{
				width: 100%;
				height: 286px;
				margin: 0 auto;

				.recommend-item{
					position: relative;
					cursor: pointer;
					width: 286px;
					height: 286px;
					border-radius: 20px;
					.cover-image{
						border-radius: 20px;
						width: 100%;
						height: 100%;
					}
					.nft-name{
						line-height: 1;
						left: 12px;
						bottom: 40px;
						position: absolute;
						font-family: 'Plus Jakarta Display';
						font-style: normal;
						font-weight: 700;
						font-size: 16px;
						color: $color-white;
					}
					& + .recommend-item{
						margin-left: 18px;
					}
				}
			}
		}
	}
</style>
