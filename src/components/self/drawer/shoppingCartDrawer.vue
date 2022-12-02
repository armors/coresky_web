<template>
  <el-drawer v-model="visible" @closed="handleClose" size="406" :append-to-body="true" zIndex="99"
    custom-class="coresky-drawer" :withHeader="false">
    <div class="shopping-cart-header">
      <div class="txt">
        Shopping cart
      </div>
      <el-icon @click="visible=false">
        <Close />
      </el-icon>
    </div>
    <div class="shopping-cart-content-head">
      <div class="left">
        Items 12
      </div>
      <div class="right">
        <img src="@/assets/images/icons/icon_clearcart.svg" class="icon-clear" alt="">
        <span>Clear all</span>
      </div>
    </div>
    <div class="hidden-scrol shopping-cart-content">
      <div class="shopping-item" v-for="index in 3" :key="index">
        <div class="shopping-info">
          <img class="info-img"
            src="https://storage.nfte.ai/nft/img/eth/0x1/6079100774021590496_845241255.webp?x-oss-process=image/resize,m_lfit,h_900"
            alt="">
          <div class="info-txt">
            <div class="txt1">01523.eth</div>
            <div class="txt2">ENS :Ethereum Na…</div>
            <div class="txt3">Creator Fee 10%</div>
          </div>
        </div>
        <div class="shopping-price">
          <span class="price-value">
            <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
            28.80
          </span>
          <el-icon>
            <Delete />
          </el-icon>
        </div>
      </div>
    </div>
    <div class="shopping-cart-footer">
      <div class="total-box">
        <div class="title">Total</div>
        <div class="total">
          <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
          28.80
        </div>
      </div>
      <div>
        <button class="btnOption">Buy</button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: "userCenterDrawer",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show () {
      this.visible = this.show;
    },
  },
  data () {
    return {
      loading: true,
      visible: false,
    };
  },
  created () {

  },
  mounted () {
  },
  computed: {
    user () {
      return this.$store.state.user;
    },
  },
  methods: {
    handleClose () {
      this.$emit('update:show', false)
    }
  },
}
</script>

<style lang="scss">
.coresky-drawer {
  width: 406px;
  height: calc(100% - $headerHeight) !important;
  margin-top: $headerHeight;
  .el-drawer__body {
    padding: 20px 30px 20px;
  }
  .shopping-cart-header {
    align-items: center;
    display: flex;
    font-weight: 700;
    font-size: 22px;
    line-height: 28px;
    justify-content: space-between;
    width: 100%;
    .txt {
      color: $primaryColor;
    }
    .el-icon {
      cursor: pointer;
      font-size: 24px;
      margin-left: auto;
      color: $color-black2;
    }
  }
  .shopping-cart-content-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 20px 0 10px;
    font-weight: 500;
    font-size: 16px;
    color: $primaryColor;
    .left {
      color: $primaryColor;
    }
    .right {
      height: 32px;
      font-size: 16px;
      font-weight: 400;
      color: $primaryColor;
      border-radius: 12px;
      display: flex;
      align-items: center;
      padding: 4px 10px;
      cursor: pointer;
      &:hover {
        background: $elButtonHoverBg;
      }
      .icon-clear {
        width: 18px;
        height: 18px;
      }
    }
  }
  .shopping-cart-content {
    // padding:0 -8px;
    .shopping-item {
      display: flex;
      padding: 8px;
      margin: 0 -8px;
      border-radius: 12px;
      justify-content: space-between;
      cursor: pointer;
      &:hover {
        background: $elButtonHoverBg;
      }
      .shopping-info {
        display: flex;
        .info-img {
          width: 64px;
          height: 64px;
          border-radius: 8px;
        }
        .info-txt {
          margin-left: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .txt1 {
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            color: $primaryColor;
          }
          .txt2 {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            color: $color-black3;
          }
          .txt3 {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            color: $color-black2;
          }
        }
      }
      .shopping-price {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: self-end;
        margin-right: 5px;
        .price-value {
          font-weight: 500;
          font-size: 14px;
          line-height: 21px;
          color: $primaryColor;

          .token-icon {
            display: inline-block;
            width: 10px;
            height: 16px;
            margin-right: 8px;
            vertical-align: text-bottom;
          }
        }
        .el-icon {
          cursor: pointer;
          font-size: 16px;
          color: $color-black3;
        }
      }
    }
  }
  .shopping-cart-footer {
    margin-top: 20px;
    .total-box {
      display: flex;
      justify-content: space-between;
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      .title {
        font-weight: 400;
        color: $color-black3;
      }
      .total {
        color: #111111;
        display: flex;
        align-items: center;
        .token-icon {
          width: 10px;
          height: 16px;
          margin-right: 8px;
        }
        color: $primaryColor;
      }
    }
    .btnOption {
      margin-top: 20px;
      width: 100%;
      height: 48px;
      padding: 10px 0;
      border-radius: 12px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      color: $color-white;
      background: $mainLiner;
    }
  }
}
.hidden-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hidden-scroll::-webkit-scrollbar {
  display: none;
}
</style>
