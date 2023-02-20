<template>
  <div class="banner-wrap-out">
    <div class="banner-wrap" :style="{'background-image':`url(${curBgImage})`}">
      <div class="banner-swiper">
        <el-carousel trigger="click" height="460px" @change="bannerChange" :interval="5000" style="    overflow: hidden;
    border-radius: 26px;">
          <el-carousel-item v-for="item in bannerList" :key="item">
            <div class="swiper-item-wrap">
              <div class="swiper-item-left">
                <!-- <div class="flex-name">
                  <img :src="'https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256'"
                    class="img-avatar" alt="">
                  <span>tiffatronn</span>
                </div> -->
                <div class="item-box">
                  <div class="item-title">
                    {{ item.name }}
                  </div>
                  <div class="item-des">
                    We help connect game developers and future players and give them
                  </div>
                </div>
                <a class="btn-more" :href="item.url">
                  {{ $t('home.MoreDetails') }}
                </a>
              </div>
              <div class="swiper-item-right">
                <div class="item-cover-mask"></div>
                <img :src="item.image" class="item-cover-img" alt="">
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "homeBanner",
  components: {

  },
  computed: {
    isHomeIndex () {
      return this.$route.name === 'home'
    },
    curBgImage () {
      if (this.bannerList && this.bannerList.length > 0) {
        return this.bannerList[this.bannerIndex].image
      }
      return ''
    }
  },
  props: {

  },
  data () {
    return {
      bannerIndex: 0,
      bannerList: [
      ]
    }
  },
  methods: {
    bannerChange (index) {
      this.bannerIndex = index
    },
    init () {
      var data = {
        page: 1,
        limit: 5,
        cate: '',
        sort: '',
        order: '',
      };
      this.$api("home.list", data).then((res) => {
        if (this.$tools.checkResponse(res)) {
          this.loadStatus = "over";
          this.bannerList = res.debug.topCollection
        }
      })
    }
  },
  mounted () {
    this.init()
    console.log(this.$route)
  }
}

</script>

<style lang="scss" scoped>
.banner-wrap-out {
  margin-top: -$headerHeight;
}
.banner-wrap {
  overflow: hidden;
  width: 100%;
  height: 600px;
  position: relative;
  padding-top: $headerHeight;

  z-index: 1;
  // position: absolute;
  inset: 0px 0px -1px;
  background-size: cover;
  transition: background 0.3s linear 0s;
  &::after {
    inset: 0;
    backdrop-filter: blur(20px);
    background: linear-gradient(0deg, rgb(255, 255, 255) 5%, rgba(0, 0, 0, 0) 60%)
      rgba(0, 0, 0, 0.6);
    pointer-events: none;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .banner-swiper {
    height: 460px;
    margin: 20px 40px;
    ::v-deep {
      .el-carousel__arrow {
        background: #a6a6a8;
        font-size: 20px;
        i {
          color: #ffffff;
        }
      }
    }
  }
  .swiper-item-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 26px;
    background: #ffffff;
    overflow: hidden;
    .swiper-item-left {
      width: 40%;
      // border-right: 1px solid red;
      padding-left: 60px;
      padding-top: 60px;
      .flex-name {
        display: flex;
        color: var(--cs-color-grey-1);
        font-size: 16px;
        align-items: center;
        gap: 10px;
        margin-bottom: 27px;
      }
      .item-box {
        min-height: 203px;
        margin-bottom: 10px;
        .item-title {
          font-weight: 700;
          font-size: 60px;
          line-height: 72px;
          letter-spacing: 0.01em;
          color: var(--cs-color-grey-1);
          margin-bottom: 10px;
        }
      }
      .item-des {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.05em;
        color: var(--cs-color-grey-3);
      }
      .btn-more {
        width: 140px;
        height: 46px;
        background: var(--cs-color-grey-1);
        font-weight: 500;
        font-size: 14px;
        color: var(--cs-color-white);
        cursor: pointer;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          background: var(--cs-color-primary);
        }
      }
      .img-avatar {
        width: 31px;
        height: 31px;
        border-radius: 4px;
      }
    }
    .swiper-item-right {
      width: 60%;
      position: relative;
      .item-cover-mask {
        position: absolute;
        width: 46%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 1;
        background: linear-gradient(90.98deg, #ffffff 0.7%, rgba(255, 255, 255, 0) 99.01%);
      }
      .item-cover-img {
        position: absolute;
        inset: 0px;
        box-sizing: border-box;
        padding: 0px;
        border: none;
        margin: auto;
        display: block;
        width: 0px;
        height: 0px;
        min-width: 100%;
        max-width: 100%;
        min-height: 100%;
        max-height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
