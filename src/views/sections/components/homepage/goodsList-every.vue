<!--
 * @Author: zhaoyan
 * @Date: 2023-02-18 18:14:02
 * @LastEditors: zhaoyan
 * @LastEditTime: 2023-02-18 22:53:37
 * @Description: 
-->
<template>
    <div class="list-box">
        <div class="list-title">{{ title }}</div>
        <div class="trading-banner-box">
            <div class="arrow-prev arrow-icon" @click="arrowClick('prev')"></div>
            <div class="arrow-next arrow-icon" @click="arrowClick('next')"></div>
            <el-carousel class="trading-banner" height="390px" arrow="never" ref="tradingBanner" :interval="6000">
                <el-carousel-item v-for="(popular, i) in _popularList" :key="i">
                    <div class="trading-box display-flex">
                        <div class="trading-item" v-for="(v, i1) in popular" :key="`trading-${i}`" @click="
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
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
export default {
    name: "goodsListEvery",
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
        return {};
    },
    computed: {
        _popularList() {
            return this.$tools.sliceArrayTo(this.arrList, 6);
        },
    },
    methods: {
        arrowClick(val) {
            if (val === 'next') {
                this.$refs.tradingBanner.next()
            } else {
                this.$refs.tradingBanner.prev()
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.list-box {
    padding: 0 40px;
    margin-bottom: 50px;

    .list-title {
        font-family: "Roboto";
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
    height: 390px;
    position: relative;
}

.trading-banner {
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

    .trading-box {
        width: 100%;
        height: 380px;
        margin: 0 auto;

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
                        color: #717A83;

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
}</style>