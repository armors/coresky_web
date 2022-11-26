<template>
	<div class="popular-list">
		<div class="home-title">{{$t("home.exploreTitle")}}</div>
		<div class="popular-banner-box">
			<div class="arrow-prev arrow-icon" @click="arrowClick('prev')"></div>
			<div class="arrow-next arrow-icon" @click="arrowClick('next')"></div>
			<el-carousel class="popular-banner" arrow="never" :interval="6000" ref="popularBanner">
				<el-carousel-item v-for="(popular, i) in _recommendCollection" :key="i">
					<div class="popular-box display-flex box-center-Y">
						<div class="popular-item" v-for="(v, i1) in popular" :key="`popular-${i1}`">
							<el-image class="cover-image" placeholder="loading" :src="v.image" fit="cover">
<!--							<el-image class="cover-image" placeholder="loading" src="https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840" fit="cover">-->
								<template v-slot:placeholder>
									<el-skeleton class="placeholder-image" animated>
										<template #template>
											<el-skeleton-item class="nft-image-skeleton" variant="h3" />
										</template>
									</el-skeleton>
								</template>
								<template v-slot:error>
									<div class="display-flex box-center error-image-box">
										<el-image class="error-image" :src="require('@/assets/create-img/non-existent.png')" fit="contain"></el-image>
									</div>
								</template>
							</el-image>
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
					this.$refs.popularBanner.next()
				} else {
					this.$refs.popularBanner.prev()
				}
			},
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

<style lang="scss">
	.popular-list{
		padding-top: 14px;
		.popular-banner-box{
			height: 286px;
			position: relative;
		}
		.popular-banner{
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
			.popular-box{
				width: 100%;
				height: 286px;
				margin: 0 auto;

				.popular-item{
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
					& + .popular-item{
						margin-left: 18px;
					}
				}
			}
		}
	}
</style>
