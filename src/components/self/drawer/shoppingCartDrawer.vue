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
        <el-button type="primary" :disabled="coreskyCart.length < 1" class="btnOption" :loading="buyBtnLoading" @click="cartBuy">Buy</el-button>
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
    cartBuy () {
      if (this.coreskyCart.length > 1) {
        this.manyBuy()
      } else {
        this.buyNft()
      }
    },
    async manyBuy() {
      this.buyBtnLoading = true
      let sellers = []
      this.coreskyCart.forEach(item => {
        item.ckOrdersEntity.basePrice = item.ckOrdersEntity.basePrice.toString()
        sellers.push(item.ckOrdersEntity)
      })
      console.log(sellers)
      let buyers = []
      for (let i = 0; i < sellers.length; i++) {
        console.log(sellers[i].basePrice)
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
            expirationTime: Date.parse(new Date().toString()) / 1000 + 60 * 60,
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

      try {
        const atomicMatchWrap = await this.$sdk._atomicMatchWrap(buyers, sellers, this.user.coinbase, this.totalPrice)
        console.log(atomicMatchWrap)
        // const atomicMatchWrap = await this.$sdk._atomicMatchWrap(buyers, sellers, this.user.coinbase, this.totalPrice)
        if (typeof atomicMatchWrap === 'object' && atomicMatchWrap.error)  {
          this.buyBtnLoading = false
          this.$tools.message(atomicMatchWrap.error, 'error');
        } else {
          this.clearCart()
          this.buyBtnLoading = false
          this.$tools.message('购买成功', 'success');
          let batchFinish = []
          sellers.forEach((item => {
            batchFinish.push({
              "orderId": item.id,
              "txHash": atomicMatchWrap.transactionHash,
              "taker": item.maker,
            })
          }))
          const res = await this.$api("order.batchFinish", batchFinish)
          console.log(res)
        }
      } catch (e) {
        this.buyBtnLoading = false
      }

    },
    async buyNft () {
      this.buyBtnLoading = true
      const sellerToken = this.coreskyCart[0]
      let seller = this.$sdk.getAtomicMatchWrapOrder(sellerToken.ckOrdersEntity, false)
      seller = {
        ...seller,
        ...{
          _sender: sellerToken.ckOrdersEntity.maker,
          basePrice: seller.basePrice.toString(),
          // basePrice: ethers.BigNumber.from(seller.basePrice.toString()),
          v: sellerToken.ckOrdersEntity.v,
          s: sellerToken.ckOrdersEntity.s,
          r: sellerToken.ckOrdersEntity.r
        }
      }
      let buyParams = this.$sdk.makeOrder(process.env.VUE_APP_MARKET_EXCHANGE, this.user.coinbase, sellerToken.contract, 0, sellerToken.tokenId)
      console.log(seller)
      let buyer = {
        ...buyParams,
        ...{
          maker: this.user.coinbase,
          taker: seller.maker,
          paymentToken: seller.paymentToken,
          basePrice: seller.basePrice,
          listingTime: seller.listingTime,
          expirationTime: seller.expirationTime,
        }
      }
      console.log(buyer)
      try {
        const sigBuyer = await this.$sdk.signature(buyer, this.user.coinbase)
        console.log(sigBuyer)
        if (typeof sigBuyer === 'object' && sigBuyer.error) {
          this.buyBtnLoading = false
          return
        }
        buyer = {
          ...buyer,
          ...{
            v: sigBuyer.v,
            r: sigBuyer.r,
            s: sigBuyer.s,
            sign: JSON.stringify(sigBuyer),
          }
        }
        console.log(buyer)
        console.log(seller)
        console.log('sell validateOrderParameters', await this.$sdk.validateOrderParameters(seller))
        console.log('buy validateOrderParameters', await this.$sdk.validateOrderParameters(buyer))
        console.log(JSON.stringify(buyer), JSON.stringify(seller))
        console.log('orderCanMatch', await this.$sdk.orderCanMatch(buyer, seller))
        console.log('orderCalldataCanMatch', await this.$sdk.orderCalldataCanMatch(buyer, seller))
        console.log('buy validateOrder_',await this.$sdk.validateOrder_(buyer))
        console.log('sell validateOrder_',await this.$sdk.validateOrder_(seller))
        const hashAtomicMatch = await this.$sdk.atomicMatch(seller, buyer, this.user.coinbase, this.user.coinbase);
        console.log(hashAtomicMatch)
        if (typeof hashAtomicMatch === 'object' && hashAtomicMatch.error) {
          this.buyBtnLoading = false
          return
        }
        this.$tools.message('购买成功', 'success');
        this.buyBtnLoading = false
        this.clearCart()
        const res = await this.$api("order.finish", {
          "orderId": this.tokenInfo.ckOrdersEntity.id,
          "txHash": hashAtomicMatch.transactionHash,
          "taker": buyer.taker,
        })
        console.log(res)
      } catch (e) {
        console.log(e)
        this.buyBtnLoading = false
      }
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
