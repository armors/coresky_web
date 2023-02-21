<template>
  <div>
    <homeBanner />
    <homeCollectionList style="margin-bottom:30px" />
    <GoodsList />
    <EmailDom />
    <FooterTemplate />
  </div>
</template>
<script>
import FooterTemplate from "@/views/layout/FooterTemplate";
import homeCollectionList from '@/views/sections/components/homeCollectionList'
import homeBanner from "@/views/sections/components/homeBanner";
import EmailDom from "@/views/sections/components/homepage/emailMod.vue";
import GoodsList from "@/views/sections/components/homepage/goodsList";
export default {
  name: "HIndex",
  components: {
    homeBanner,
    homeCollectionList,
    EmailDom,
    GoodsList,
    FooterTemplate
  },
  mixins: [],
  data () {
    return {
      isScrollTop: false
    };
  },
  created () { },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  computed: {},
  methods: {
    handleScroll () {
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop) {
        if (scrollTop > 3) {
          this.isScrollTop = false
        } else {
          this.isScrollTop = true
        }
      } else if (scrollTop === 0) {
        this.isScrollTop = true
      }
      this.$store.commit('setScrollTop', this.isScrollTop)
    }
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }
};
</script>
<style lang="scss" scoped>
.no-margin {
  margin: 0 !important;
}

.sort-icon {
  width: 7px;
  height: 4px;
  margin-left: 5px;
}
.body-wrapper {
  width: 100%;
  /*background: #dde8ff;*/
  min-height: 100vh;
}
.carousel-section {
  position: relative;
  .tip {
    font-size: 16px;
    color: #3c4784;
    margin-top: 20px;
  }
}

.head-box {
  align-items: flex-end;
  padding: 20px 0px;
  .title {
    font-size: 28px;
    color: #000;
  }
  .iconfont {
    font-size: 36px;
    font-weight: bold;
  }
  .filter-more {
    font-size: 36px;
  }
}

.goods-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .top-item {
    display: inline-flex;
    align-items: center;
    width: 25%;
    margin-bottom: 40px;
    color: #fff;
    font-size: 20px;
    font-family: Poppins-SemiBold;
    line-height: 24px;
    .top-num {
      width: 30px;
      text-align: right;
      margin-right: 10px;
    }
    .top-avatar {
      border-radius: 50%;
      border: 2px solid #4d0c94;
      overflow: hidden;
    }
    .top-avatar-mini {
      border-radius: 50%;
      border: 2px solid #4d0c94;
      overflow: hidden;
      display: none;
    }
    .top-text {
      margin-left: 23px;
      font-size: 18px;
      word-break: break-all;
      .top-deal {
        font-size: 16px;
        font-family: Poppins-Light;
      }
    }
  }
}

.category-tags {
  display: flex;
}
.category-tags-item {
  background: none;
  border: none;
  color: #999;
  font-weight: bold;
  padding: 0;
  height: auto;
  margin: 0;
  margin-right: 20px;
  cursor: pointer;
  &.active {
    color: #333;
    border-bottom: 2px solid #333;
    border-radius: 0;
  }
}

/*
  .search-options {
    position: relative;
    display: flex;
    align-items: center;
    margin: 20px 0;
    .title {
      fonts-size: 28px;
      color: #000;
    }
  }
  .nft-sorts {
    display: flex;
    align-items: center;
    line-height: 18px;
  }
  .nft-sorts-item {
    white-space: nowrap;
    display: flex;
    fonts-size: 13px;
    align-items: center;
    fonts-weight: 400;
    cursor: pointer;
    margin-right: 16px;
    .text {
      display: flex;
    }
    .sort-icon {
      display: flex;
      height: 13px;
      margin-left: 3px;
    }
    &.active {
      color: $primaryColor;
    }
  } */

.content-bottom {
  padding-bottom: 100px;
}

.new-nft-list {
  margin: 0 -10px;
}

.nft {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>


<style lang="scss">
@import '../../styles/variables';
.home-wrapper {
  max-width: $maxWidth;
  margin: 0 auto;
  width: 100%;
}
.home-banner {
  height: 524px;
  background: url('../../assets/images/bg_home.png') no-repeat;
  background-size: cover;
  padding-top: 76px;

  .banner-box {
    padding-left: 20px;
    padding-right: 32px;
    .create-app-box {
      .title {
        width: 583px;
        font-style: normal;
        font-weight: 700;
        font-size: 50px;
        line-height: 65px;
        color: $primaryColor;
      }
      .desc {
        padding-top: 30px;
        width: 621px;
        /* Body_1_regular */
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 150%;
        /* 黑-3 */
        color: $color-black3;
      }
      .btn-list {
        margin-top: 60px;
        .btn {
          width: 180px;
          height: 48px;
          background: $color-black;
          font-weight: 500;
          font-size: 16px;
          color: $color-white;
          cursor: pointer;
          &:hover {
            background: #4136f5;
          }
        }
      }
    }
    .carousel-box {
      width: 520px;
      height: 328px;
      .el-carousel {
        width: 100%;
        height: 100%;
      }
      .el-carousel__container {
        width: 100%;
        height: 294px !important;
      }
      .el-carousel__item {
        border-radius: 20px !important;
        .img-box {
          cursor: pointer;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: $color-white !important;
          border: 10px solid #ffffff !important;
          filter: drop-shadow(0px 0px 40px rgba(82, 77, 255, 0.2));
          border-radius: 20px !important;
        }
      }

      .el-carousel__indicators {
        .el-carousel__indicator {
          margin-right: 10px;
          &:last-child {
            margin-right: 0;
          }
          .el-carousel__button {
            width: 20px;
            height: 8px;
            /* 紫色背景 */
            background: rgba(118, 74, 246, 0.1);
            border-radius: 4px;
          }
          &.is-active {
            .el-carousel__button {
              width: 70px;
              height: 8px;
              /* 主色渐变 */
              background: $mainLiner;
            }
          }
        }
      }
    }
  }
}
.body-wrapper {
  padding-bottom: 120px;
  .sort-box {
    padding-top: 40px;
    .filter {
      padding: 10px 20px;
      border: none;
      color: $color-black3;
      border-radius: 12px;
      .icon-img {
        margin-right: 4px;
      }
      &:hover,
      &:focus,
      &.active {
        background-color: $elButtonHoverBg !important;
        color: $color-black3;
      }
    }
    .el-button + .el-button {
      margin-left: 6px;
    }
    .text {
      padding-right: 12px;
      font-weight: 500;
      font-size: 14px;
      color: $primaryColor;
      margin-left: 20px;
    }
    .line {
      width: 8px;
      height: 1px;
      margin: 0 10px;
      background-color: $grayColor;
    }
    .input-number {
      width: 80px;
      .el-input__wrapper {
        padding-left: 0 !important;
        padding-right: 0 !important;
        border: none;
        box-shadow: none;
      }
      .el-input__inner {
        border: none;
        /*padding: 11px 16px;*/
        gap: 8px;
        height: 40px;
        /* 黑_4 */
        background: $elButtonHoverBg;
        border-radius: 8px;

        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: $primaryColor;
      }
    }

    .el-select {
      width: unset;
      margin-left: 10px;
      height: 40px;
      &.select-chain {
        width: 140px;
      }
      &.select-times {
        width: 110px;
      }
      .el-input__suffix {
        right: 16px;
      }
      .el-input__wrapper {
        padding: 10px 16px;
        border-radius: 12px;
        box-shadow: none;
        border: 1px solid $borderBg;
      }
      .el-input.is-focus .el-input__wrapper {
        box-shadow: none !important;
      }
      &:first-child {
        margin-left: 10px;
      }
      .el-input__inner {
        height: 20px;
        padding: 0;
      }
    }
  }
  .see-more {
    margin: 40px auto 0;
    width: 180px;
    height: 48px;
    background: $color-black;
    font-weight: 500;
    font-size: 16px;
    color: $color-white;
    cursor: pointer;
    &:hover {
      background: #4136f5;
    }
  }
}
</style>