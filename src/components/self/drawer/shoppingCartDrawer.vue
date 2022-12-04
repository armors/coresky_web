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
        Items {{coreskyCart.length}}
      </div>
      <div class="right" @click="clearCart">
        <img src="@/assets/images/icons/icon_clearcart.svg" class="icon-clear" alt="">
        <span>Clear all</span>
      </div>
    </div>
    <div class="hidden-scrol shopping-cart-content">
      <div class="shopping-item" v-for="(v, i) in coreskyCart" :key="`cart-item-${i}`">
        <div class="shopping-info">
          <image-box :src="v.ckCollectionsInfoEntity.image"></image-box>
          <div class="info-txt">
            <div class="txt1">{{v.name || '--'}}</div>
            <div class="txt2">ENS :Ethereum Na…</div>
            <div class="txt3">Creator Fee {{getRate(v)}}</div>
          </div>
        </div>
        <div class="shopping-price">
          <span class="price-value">
            <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
            {{getNftPrice(v)}}
          </span>
          <el-icon @click="deleteCart(v)">
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
          {{totalPrice}}
        </div>
      </div>
      <div>
        <el-button type="primary" :disabled="coreskyCart.length < 1" class="btnOption" :loading="buyBtnLoading" @click="manyBuy">Buy</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import {getLocalStorage, removeLocalStorage, setLocalStorage} from "@/util/local-storage";
import BigNumber from "bignumber.js";

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
      this.getCartInfo()
    },
  },
  data () {
    return {
      buyBtnLoading: false,
      visible: false,
      totalPrice: 0,
      coreskyCart: []
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
    cartName () {
      return `coresky_cart_${this.$store.state.user.coinbase}`
    },
  },
  methods: {
    clearCart () {
      removeLocalStorage([this.cartName])
      this.getCartInfo()
    },
    deleteCart (v) {
      const cart = this.coreskyCart.filter((item => !(item.contract === v.contract && item.tokenId === v.tokenId)))
      if (cart.length < 1) {
        this.clearCart()
      } else {
        let obj = []
        obj[this.cartName] = JSON.stringify(cart)
        setLocalStorage(obj)
      }
      this.getCartInfo()
    },
    getRate (v) {
      return (v.ckOrdersEntity.makerRelayerFee / 1000) +'%'
    },
    getCartInfo () {
      this.totalPrice = 0
      const local = getLocalStorage(this.cartName)
      console.log(local[this.cartName])
      let coresky_cart = local[this.cartName]
      if (local[this.cartName] !== null) {
        this.coreskyCart = JSON.parse(coresky_cart)
        this.coreskyCart.forEach(item => {
          this.totalPrice = new BigNumber(this.getNftPrice(item)).plus(new BigNumber(this.totalPrice))
        })
        this.totalPrice = this.totalPrice.toString()
      } else {
        this.coreskyCart = []
      }
      console.log(this.coreskyCart)
    },
    handleClose () {
      this.$emit('update:show', false)
    },
    getNftPrice(v) {
      return this.$Web3.utils.fromWei(v.ckOrdersEntity.basePrice.toString())
    },
    async manyBuy() {
      let sellers = []
      this.coreskyCart.forEach(item => {
        item.ckOrdersEntity.basePrice = item.ckOrdersEntity.basePrice.toString()
        sellers.push(item.ckOrdersEntity)
      })
      console.log(sellers)
      let buyers = []
      for (let i = 0; i < sellers.length; i++) {
        console.log(i)
        let buyer = this.$sdk.makeOrder(process.env.VUE_APP_MARKET_EXCHANGE, this.user.coinbase, sellers[i].target, 0, sellers[i].tokenId)
        buyer = {
          ...buyer,
          ...{
            maker: this.user.coinbase,
            taker: sellers[i].maker,
            paymentToken: sellers[i].paymentToken,
            basePrice: sellers[i].basePrice,
            listingTime: sellers[i].listingTime,
            expirationTime: sellers[i].expirationTime,
          }
        }
        const sigBuyer = {
          'v': 0,
          'r': this.$sdk.ZERO_HASH(),
          's': this.$sdk.ZERO_HASH()
        }
        buyer = {
          ...buyer,
          ...sigBuyer
        }
        buyers.push(buyer)
        console.log(sigBuyer)
      }
      console.log(buyers, sellers)
      const atomicMatchWrap = await this.$sdk._atomicMatchWrap(buyers, sellers, this.user.coinbase, this.totalPrice)
      console.log(atomicMatchWrap)
    },

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
