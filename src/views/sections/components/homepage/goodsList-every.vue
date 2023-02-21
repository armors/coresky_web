<!--
 * @Author: zhaoyan
 * @Date: 2023-02-18 18:14:02
 * @LastEditors: zhaoyan
 * @LastEditTime: 2023-02-21 18:49:18
 * @Description: 
-->
<template>
    <div class="list-box">
        <div class="list-title">{{ title }}</div>
        <div class="trading-banner-box">
            <div class="swiper">
                <div class="trading-banner swiper-wrapper " height="390px" arrow="never" ref="tradingBanner"
                    :interval="6000">
                    <div class="trading-item swiper-slide" v-for="(v, i1) in arrList" :key="`trading-${i}`" @click="
                        $router.push({
                            name: 'collection',
                            params: { contract: v.contract },
                        })
                    ">
                        <image-box :src="v.image"></image-box>
                        <div class="nft-name">
                            <div class="name-top display-flex">
                                <div>{{ v.name }}</div>
                                <img :src="
                                    require(`../../../../assets/images/icons/icon_list_blue.svg`)
                                " alt="" />
                            </div>
                            <div class="name-bottom">
                                <span class="b-t">Floor</span>
                                <span class="b-value">{{ v.price }}ETH</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>

        </div>


    </div>
</template>

<script>
import Swiper from 'swiper';
// import 'swiper/css/swiper.min.css';
export default {
    name: "goodsListEvery",
    components: {
    },
    props: {
        title: {
            type: String,
            default: "",
        },
        arrList: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    data() {
        return {
        };
    },
    watch: {
        arrList() {
            this.swiperInit()
        }
    },
    mounted() {


    },
    computed: {
        _popularList() {
            return this.$tools.sliceArrayTo(this.arrList, 6);
        },
    },
    methods: {
        swiperInit() {
            const mySwiper = new Swiper('.swiper', {
                // 如果需要分页器
                slidesPerView: 'auto',
                slidesPerGroup: 4,
                // loopedSlides: 10,
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.swiper {
    // --swiper-theme-color: #ff6600;/* 设置Swiper风格 */
    // --swiper-navigation-color: #00ff33;/* 单独设置按钮颜色 */
    --swiper-navigation-size: 30px;
    /* 设置按钮大小 */
    overflow: hidden;

    .swiper-button-prev {
        left: -2px;
        width: 30px;
        height: 30px;
        background: #fff;
    }

    .swiper-button-next {
        width: 30px;
        height: 30px;
        background: #fff;
        z-index: 99;
    }
}

.list-box {
    padding: 0 40px;
    margin-bottom: 50px;

    .list-title {
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
        line-height: 35px;
        height: 35px;
        color: #111111;
    }
}

.trading-banner-box {
    margin-top: 40px;
    height: 400px;
    position: relative;

    ::v-deep {
        .el-carousel__indicators--horizontal {
            display: none;
        }

        .el-carousel__item {
            overflow: visible;
        }
    }
}

.trading-banner {
    padding-top: 10px;
    height: 100%;

    .el-carousel__container {
        height: 100%;
        padding-left: 4px;
        padding-right: 4px;
    }

    .el-carousel__indicators {
        display: none !important;
    }

    .el-carousel__arrow {
        width: 40px;
        height: 40px;
        /* 白 */
        background: $bg-white;
        /* 紫色 */
        box-shadow: 0px 0px 20px $arrowBtnShadow;
        border-radius: 20px;
        z-index: 100;

        .el-icon {
            color: $primaryColor;
        }

        &.el-carousel__arrow--left {
            left: -20px;
        }

        &.el-carousel__arrow--right {
            right: -20px;
        }

        &:hover {
            background: $bgPurple;

            .el-icon {
                color: $color-white;
            }
        }
    }



    .trading-item:hover {
        transform: translate3d(0, -5px, 0);
        box-shadow: 0px 10px 16px rgba(0, 0, 0, 0.1);
    }

    .trading-item {
        cursor: pointer;
        border-radius: 20px;
        width: 285px;
        height: 380px;
        box-shadow: rgb(0 0 0 / 8%) 0px 4px 8px;
        border-radius: 12px;
        transition: box-shadow 0.25s ease-in-out 0s, transform 0.25s ease 0s;

        .cover-image {
            width: 285px;
            height: 285px;
            border-radius: 20px 20px 0px 0px;
        }

        .nft-name {
            padding: 23px 0 0 26px;

            .name-top {
                font-weight: 700;
                font-size: 16px;
                line-height: 24px;
                height: 24px;
                align-items: center;

                div {
                    color: #111111;
                    margin-right: 4px;
                }

                img {
                    width: 16px;
                    height: 16px;
                }
            }

            .name-bottom {
                margin-top: 4px;
                height: 22px;
                line-height: 22px;

                .b-t {
                    font-size: 14px;
                    color: #717a83;
                }

                .b-value {
                    margin-left: 4px;
                    font-size: 14px;
                    color: #111111;
                    font-weight: 500;
                }
            }
        }

        &+.trading-item {
            margin-left: 18px;
        }
    }
}
</style>