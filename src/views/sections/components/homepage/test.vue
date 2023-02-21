
<template>
    <div class="list-box">
        <div class="list-title">{{ title }}</div>
        <div class="trading-banner-box">
            <swiper ref="mySwiper" slidesPerView="auto" @swiper="onSwiper" :spaceBetween="18" :navigation="{
                nextEl: '.arrow-right',
                prevEl: '.arrow-left',
            }" :freeMode="true" :modules="modules" class="swiper">
                <swiper-slide v-for="(v, i1) in arrList" :key="`trading-${i}`" @click="
                    $router.push({
                        name: 'collection',
                        params: { contract: v.contract },
                    })">
                    <div class="trading-item">
                        <image-box :src="v.image"></image-box>
                        <div class="nft-name">
                            <div class="name-top display-flex">
                                <div>{{ v.name }}</div>
                                <img :src="require(`../../../../assets/images/icons/icon_list_blue.svg`)" alt="" />
                            </div>
                            <div class="name-bottom">
                                <span class="b-t">Floor</span>
                                <span class="b-value">222ETH</span>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
                <!-- <div class="swiper-button-prev" slot="button-prev" @click="next"></div> -->
            <!-- <div class="arrow-prev arrow-icon" slot="button-prev" @click="prev"></div>
                                                                                                                                    <div class="arrow-next arrow-icon" slot="button-next" @click="next"></div> -->

            </swiper>
            <div class="arrow-left" slot="button-prev" @click="prev">
                <el-icon>
                    <ArrowLeftBold />
                </el-icon>
            </div>
            <div class="arrow-right" slot="button-next" @click="next">
                <el-icon>
                    <ArrowRightBold />
                </el-icon>
            </div>

        </div>
    </div>
</template>

<script>
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export default {
    name: "test",
    components: {
        Swiper,
        SwiperSlide,
    },
    computed: {
        // swiper () {
        //     return this.$refs.mySwiper.$swiper
        // }
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
    data () {
        return {
            swiper: undefined,
            slidesNum: 3,
            modules: [Navigation, Pagination, Mousewheel, Keyboard],
        };
    },
    methods: {
        onSwiper (swiper) {
            this.swiper = swiper
            setTimeout(() => {

            }, 300);
            console.log(222, swiper)
        },
        prev () {
            this.swiper.slidePrev()
            // console.log(this.$refs.mySwiper.$el.slideNext)
            // this.swiper.slidePrev();
        },
        next () {
            this.swiper.slideNext()
            // console.log(this.$refs.mySwiper)
            // this.swiper.slideNext();
        },
        handleResize () {

            console.log(document.body.clientWidth)
        }
    },
    mounted () {
        window.addEventListener('resize', this.handleResize)
    },
    beforeUnmount () {
        window.removeEventListener('resize', this.handleResize)
    }
};
</script>

<style lang="scss" scoped>
::v-deep {

    .swiper {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    .swiper-slide {
        width: auto;
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
    position: relative;
}
.trading-item {
    margin: 16px 0;
    cursor: pointer;
    border-radius: 20px;
    width: 285px;
    height: 380px;
    box-shadow: 0px 4px 8px rgb(0 0 0 / 8%);
    border-radius: 12px;
    transition: box-shadow 0.25s ease-in-out 0s, transform 0.25s ease 0s;
    &:hover {
        transform: translate3d(0, -4px, 0);
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.09);
    }
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
}
.arrow-left,
.arrow-right {
    position: absolute;
    left: -25px;
    top: calc(50% - 25px);
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 4px 16px rgb(0 0 0 / 8%);
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #111111;
    cursor: pointer;
    z-index: 111;
    &:hover {
        background: #FFFFFF;
        box-shadow: 0px 10px 16px rgba(0, 0, 0, 0.1);
        color: #1063E0;
    }
    &.swiper-button-disabled {
        opacity: 0;
    }
}
.arrow-right {
    left: auto;
    right: -25px;
}
</style>