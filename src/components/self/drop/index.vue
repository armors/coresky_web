<template>
	<div class="drop-list">
		<div class="home-title title-margin-top">{{$t("home.dropTitle")}}</div>
		<el-carousel class="drop-banner" arrow="always" :interval="10000">
			<el-carousel-item v-for="(v, i) in _popularList" :key="i">
				<div class="drop-box display-flex">
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
					<div class="box-flex1">
						<div class="nft-name">
							{{ ($filters.nftURI(v)).name }}
						</div>
						<div class="display-flex box-center-Y info-item launch-time">
							<div class="label">{{$t("home.launchingTime")}}</div>
							<div>2022.12.12</div>
						</div>
						<div class="display-flex box-center-Y info-item">
							<div class="label">{{$t("home.blockchain")}}</div>
							<div class="chain-icon"><img src="../../../assets/images/icons/token/token_eth.svg" alt=""></div>
							<div>Ethereum</div>
						</div>
						<div class="display-flex box-center-Y info-item">
							<div class="label">{{$t("home.community")}}</div>
							<div class="icon-img icon-img-lang"></div>
							<div class="icon-img icon-img-tg"></div>
							<div class="icon-img icon-img-twitter"></div>
							<div class="icon-img icon-img-collect"></div>
							<div class="icon-img icon-img-share"></div>
							<div class="icon-img icon-img-more"></div>
						</div>
						<div class="display-flex box-center-Y info-item">
							<div class="label">{{$t("home.mintingLink")}}</div>
							<div class="icon-img icon-link-img"></div>
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
				return this.popularList
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
				let banner = document.getElementById("drop-banner");
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
	.drop-list{
		padding-top: 14px;
		.drop-banner{
			margin-top: 40px;
			height: 414px;
			.el-carousel__container{
				height: 100%;
				padding-left: 4px;
				padding-right: 4px;
				border-radius: 20px;
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
			.el-carousel__item{
				border-radius: 20px;
			}
			.drop-box{
				border-radius: 20px;
				width: 100%;
				height: 100%;
				margin: 0 auto;
				padding: 42px 0 42px 42px;
				background: $purpleLiner;
				cursor: pointer;
				.cover-image{
					width: 582px;
					height: 330px;
					border-radius: 16px;
					margin-right: 54px;
				}
				.nft-name{
					font-family: 'Plus Jakarta Display';
					font-style: normal;
					font-weight: 700;
					font-size: 22px;
					color: $color-black;
				}
				.info-item {
					margin-top: 36px;
					/* Body_1_medium */
					font-family: 'Plus Jakarta Display';
					font-style: normal;
					font-weight: 500;
					font-size: 20px;
					color: $primaryColor;
					padding-bottom: 0;

					.label {
						/* Body_2_bold */
						font-family: 'Plus Jakarta Display';
						font-style: normal;
						font-weight: 500;
						font-size: 16px;
						line-height: 150%;
						color: $color-black3;
						margin-right: 16px;
					}

					.chain-icon {
						width: 30px;
						height: 30px;
						margin-right: 8px;
					}

					&.launch-time {
						margin-top: 24px;
					}

					.icon-img {
						width: 44px;
						height: 44px;
						background-repeat: no-repeat;
						background-position: center;
						background-size: 100% 100%;
					}

					.icon-img + .icon-img {
						margin-left: 16px;
					}

					.icon-link-img {
						background-image: url("../../../assets/images/icons/icon_link.svg");

						&:hover {
							background-image: url("../../../assets/images/icons/icon_link_active.svg");
						}
					}

					.icon-img-lang {
						background-image: url("../../../assets/images/icons/icon_lang_active_gray.svg");
						&:hover {
							background-image: url("../../../assets/images/icons/icon_lang_active.svg");
						}
					}

					.icon-img-tg {
						background-image: url("../../../assets/images/icons/media/media_tg.svg");
						&:hover {
							background-image: url("../../../assets/images/icons/media/media_tg_active.svg");
						}
					}

					.icon-img-twitter {
						background-image: url("../../../assets/images/icons/media/media_twitter.svg");
						&:hover {
							background-image: url("../../../assets/images/icons/media/media_twitter_active.svg");
						}
					}

					.icon-img-collect {
						background-image: url("../../../assets/images/icons/icon_collect.svg");
						&:hover {
							background-image: url("../../../assets/images/icons/icon_collect_active.svg");
						}
					}

					.icon-img-share {
						background-image: url("../../../assets/images/icons/icon_share.svg");
						&:hover {
							background-image: url("../../../assets/images/icons/icon_share_active.svg");
						}
					}

					.icon-img-more {
						background-image: url("../../../assets/images/icons/icon_more.svg");
						&:hover {
							background-image: url("../../../assets/images/icons/icon_more_active.svg");
						}
					}
				}

			}
		}
	}
</style>
