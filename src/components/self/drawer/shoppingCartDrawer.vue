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
    <div class="shopping-cart-content-head display-flex box-center-Y">

      <el-menu
        :default-active="activeIndex"
        class="el-menu-cart box-flex1"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-badge :value="items" class="item">
          <el-menu-item index="1">CoreSky</el-menu-item>
        </el-badge>
        <el-badge :value="shoppingOpenseaCartList.length" class="item">
          <el-menu-item index="2">Other</el-menu-item>
        </el-badge>
      </el-menu>
      <div class="right" @click="clearCart">
        <img src="@/assets/images/icons/icon_clearcart.svg" class="icon-clear" alt="">
        <span>Clear all</span>
      </div>
    </div>
    <template v-if="activeIndex === '1'">
      <div class="hidden-scrol shopping-cart-content">
        <template v-for="(v, i) in coreskyCart" :key="`cart-item-p-${i}`">
          <div class="shopping-item" v-for="(vc, ic) in v.ckOrdersEntityList" :key="`cart-item-${i}`">
            <div class="shopping-info">
              <image-box :src="v.oriImage"></image-box>
              <div class="info-txt">
                <div class="txt1 ellipsis">{{v.ckCollectionsInfoEntity.name || '--'}}</div>
                <div class="txt2 display-flex box-center-Y">
                  <div>ENS :Ethereum Na…</div>
                  <img class="tag" src="@/assets/images/icons/icon_tag.svg" alt="">
                </div>
                <div class="txt3">Creator Fee {{$filters.feeFormat(vc.makerRelayerFee)}}</div>
              </div>
            </div>
            <div class="shopping-price">
              <el-popover
                placement="top-start"
                title=""
                :width="200"
                trigger="hover"
              >
                <template #reference>
                  <div class="price-value ellipsis">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    {{$filters.milliFormat(getNftPrice(vc, true))}}
                  </div>
                </template>
                <template #default>
                  <div class="price-value">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    {{$filters.milliFormat(getNftPrice(vc, true), false)}}
                  </div>
                </template>
              </el-popover>
              <el-icon @click="deleteCart(v, vc.id)">
                <Delete />
              </el-icon>
            </div>
          </div>
        </template>
      </div>
      <div class="shopping-cart-footer">
        <div class="total-box">
          <div class="title">Total</div>
          <div class="total">
            <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
            {{totalPriceShow}}
          </div>
        </div>
        <div>
          <el-button type="primary" :disabled="coreskyCart.length < 1" class="btnOption" :loading="buyBtnLoading" @click="cartBuy">Purchase</el-button>
        </div>
      </div>
    </template>
    <template v-if="activeIndex === '2'">
      <div class="hidden-scrol shopping-cart-content">
        <div class="shopping-item" v-for="(v, ic) in shoppingOpenseaCartList" :key="`cart-item-opensea-${i}`">
          <div class="shopping-info">
            <image-box :src="v.makerAssetBundle.assets[0].imageUrl"></image-box>
            <div class="info-txt">
              <div class="txt1 ellipsis">{{v.makerAssetBundle.assets[0].assetContract.name || '--'}}</div>
              <div class="txt2 display-flex box-center-Y">
                <div>ENS :Ethereum Na…</div>
                <img class="tag" src="@/assets/images/icons/icon_tag.svg" alt="">
              </div>
              <div class="txt3">Creator Fee {{$filters.feeFormat(v.makerAssetBundle.assets[0].assetContract.openseaSellerFeeBasisPoints)}}</div>
            </div>
          </div>
          <div class="shopping-price">

            <el-popover
              placement="top-start"
              title=""
              :width="200"
              trigger="hover"
            >
              <template #reference>
                <div class="price-value ellipsis">
                  <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                  {{$filters.milliFormat(nftPriceFun(v.currentPrice, true))}}
                </div>
              </template>
              <template #default>
                <div class="price-value">
                  <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                  {{$filters.milliFormat(nftPriceFun(v.currentPrice, true), false)}}
                </div>
              </template>
            </el-popover>
            <el-icon @click="deleteCartOpensea(v)">
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
            {{totalOpenseaPriceShow}}
          </div>
        </div>
        <div>
          <el-button type="primary" :disabled="openseaCart.length < 1" class="btnOption" :loading="buyOpenseaBtnLoading" @click="cartBuyOpensea">Purchase</el-button>
        </div>
      </div>
    </template>
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
      buyOpenseaBtnLoading: false,
      visible: false,
      totalPrice: 0,
      totalPriceShow: 0,
      totalOpenseaPrice: 0,
      totalOpenseaPriceShow: 0,
      coreskyCart: [],
      openseaCart: [],
      items: 0,
      itemsOpensea: 0,
      ids: [],
      checkOrderData: [],
      activeIndex: '1'
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
    cartNameOpensea() {
      return `coresky_cart_opensea_${this.$store.state.user.coinbase}`
    },
    shoppingOpenseaCartList () {
      return this.$store.state.shoppingOpenseaCartList;
    }
  },
  methods: {
    handleSelect (index) {
      console.log(this.activeIndex)
      this.activeIndex = index
    },
    clearCart () {
      removeLocalStorage([this.cartName])
      removeLocalStorage([this.cartNameOpensea])
      this.$store.commit('initShoppingCart')
      this.getCartInfo()
    },
    deleteCart (v, id) {
      const coreskyCartLength = this.coreskyCart.length
      let cart = []
      for (let i = 0;i < coreskyCartLength; i++) {
        let item = this.coreskyCart[i]
        if (item.contract === v.contract && item.tokenId === v.tokenId) {
          let ckOrdersEntityList = item.ckOrdersEntityList.filter(vc => vc.id !== id)
          if (ckOrdersEntityList.length > 0) {
            item.ckOrdersEntityList = ckOrdersEntityList
            cart.push(item)
          }
        } else {
          cart.push(item)
        }
      }
      if (cart.length < 1) {
        removeLocalStorage([this.cartName])
      } else {
        let obj = []
        obj[this.cartName] = JSON.stringify(cart)
        setLocalStorage(obj)
      }
      this.$store.commit('initShoppingCart')
      this.getCartInfo()
    },
    deleteCartOpensea (v) {
      const shoppingOpenseaCartList = this.shoppingOpenseaCartList.filter(item => item.orderHash !== v.orderHash)
      if (shoppingOpenseaCartList.length < 1) {
        removeLocalStorage([this.cartNameOpensea])
      } else {
        let obj = []
        obj[this.cartNameOpensea] = JSON.stringify(shoppingOpenseaCartList)
        setLocalStorage(obj)
      }
      this.$store.commit('initShoppingCart')
    },
    async getCartInfo (isCheckOrder) {
      this.totalPrice = 0
      this.totalPriceShow = 0
      const local = getLocalStorage(this.cartName)
      console.log(local[this.cartName])
      let coresky_cart = local[this.cartName]
      this.ids = []
      this.items = 0
      if (coresky_cart !== null) {
        this.coreskyCart = JSON.parse(coresky_cart)
        this.coreskyCart.forEach(v => {
          this.items += v.ckOrdersEntityList.length
          v.ckOrdersEntityList.forEach(item => {
            this.totalPrice = new BigNumber(this.getNftPrice(item)).plus(new BigNumber(this.totalPrice))
            this.ids.push(item.id)
          })
        })
        this.totalPrice = this.totalPrice.toString()
        this.totalPriceShow = parseFloat(this.$filters.keepPoint(this.totalPrice))
        if (!isCheckOrder) {
          await this.checkOrder(true)
        }
      } else {
        this.coreskyCart = []
      }
      this.totalOpenseaPrice = 0
      this.totalOpenseaPriceShow = 0
      const localOpensea = getLocalStorage(this.cartNameOpensea)
      console.log(localOpensea[this.cartNameOpensea])
      let coresky_opensea_cart = localOpensea[this.cartNameOpensea]
      coresky_opensea_cart = coresky_opensea_cart.filter(item=> item.expirationTime > (new Date().getTime()/ 1000))
      if (coresky_opensea_cart !== null) {
        this.openseaCart = JSON.parse(coresky_opensea_cart)
        this.openseaCart.forEach(item => {
          this.totalOpenseaPrice = new BigNumber(this.$sdk.fromWeiNumOrigin(item.currentPrice)).plus(new BigNumber(this.totalOpenseaPrice))
        })
        this.totalOpenseaPrice = this.totalOpenseaPrice.toString()
        this.totalOpenseaPriceShow = parseFloat(this.$filters.keepPoint(this.totalOpenseaPrice))
        let obj = {}
        obj[this.cartNameOpensea] = JSON.stringify(coresky_opensea_cart)
        setLocalStorage(obj)
        this.$store.commit('initShoppingCart')
      } else {
        this.openseaCart = []
      }
    },
    handleClose () {
      this.$emit('update:show', false)
    },
    getNftPrice(v, isShow=false) {
      return isShow ? parseFloat(this.$filters.keepPoint(this.$Web3.utils.fromWei(v.basePrice.toString()))) : this.$Web3.utils.fromWei(v.basePrice.toString())
    },
    nftPriceFun (basePrice) {
      console.log(basePrice)
      return (basePrice !== null && basePrice !== undefined) ? this.$filters.keepMaxPoint(this.$Web3.utils.fromWei(basePrice.toString())) : '--'
    },
    async checkOrder (isInitCart) {
      try {
        const res = await this.$api('order.check', {
          ids: this.ids
        })
        if (res.code !== 200) {
          this.buyBtnLoading = false
          return
        }
        console.log(res)
        this.checkOrderData = res.debug
        if (this.items !== this.checkOrderData.length){
          if (!isInitCart) {
            this.$tools.message('已过滤掉无效订单，请重新确认购买');
          }
          if (this.checkOrderData.length < 1) {
            removeLocalStorage([this.cartName])
          } else {
            const ids = []
            this.checkOrderData.forEach(item => {
              ids.push(item.id)
            })
            const coreskyCart = []
            this.coreskyCart.forEach(item => {
              let ckOrdersEntityList = []
              item.ckOrdersEntityList.forEach(v => {
                if (ids.includes(v.id)) {
                  ckOrdersEntityList.push(v)
                }
              })
              if (ckOrdersEntityList.length > 1) {
                item.ckOrdersEntityList = ckOrdersEntityList
                coreskyCart.push(item)
              }
            })
            let obj = []
            obj[this.cartName] = JSON.stringify(coreskyCart)
            setLocalStorage(obj)
            this.getCartInfo(true)
          }
          return {
            error: e.error,
            code: 500
          }
        } else {
          return res
        }
      } catch (e) {
        return {
          error: e.error,
          code: 500
        }
      }
    },
    async cartBuy () {
      this.buyBtnLoading = true
      const res = await this.checkOrder()
      if (res.code !== 200) {
        this.$tools.message(res.errmsg || res.error);
        this.buyBtnLoading = false
        return
      }
      const ethBalance = await this.$sdk.getBalance({
        address: this.$sdk.NULL_ADDRESS()
      }, this.user.coinbase)
      if (new BigNumber(ethBalance).isLessThan(
        this.totalPrice
      )) {
        this.buyBtnLoading = false
        this.$tools.message('No Enough Balance Of ETH');
        return
      }
      if (this.coreskyCart.length > 1) {
        await this.manyBuy()
      } else {
        await this.buyNft()
      }
    },
    async manyBuy() {
      let sellers = []
      this.checkOrderData.forEach(item => {
        item.basePrice = item.basePrice.toString()
        sellers.push(item)
      })
      console.log(sellers)
      let buyers = []
      for (let i = 0; i < sellers.length; i++) {
        console.log(sellers[i].basePrice)
        console.log(i)
        let buyer = this.$sdk.makeOrder({
          exchangeAddress: process.env.VUE_APP_MARKET_EXCHANGE,
          sender: this.user.coinbase,
          nftAddress: sellers[i].target,
          side: 0,
          tokenId: sellers[i].tokenId,
          RelayerFee: sellers[i].makerRelayerFee,
          contractType: sellers[i].contractType,
          value: sellers[i].amount
        })
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
          removeLocalStorage([this.cartName])
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
      const sellerToken = this.checkOrderData[0]
      let seller = this.$sdk.getAtomicMatchWrapOrder(sellerToken, false)
      seller = {
        ...seller,
        ...{
          _sender: sellerToken.maker,
          basePrice: seller.basePrice.toString(),
          // basePrice: ethers.BigNumber.from(seller.basePrice.toString()),
          v: sellerToken.v,
          s: sellerToken.s,
          r: sellerToken.r
        }
      }
      let buyParams = this.$sdk.makeOrder({
        exchangeAddress: process.env.VUE_APP_MARKET_EXCHANGE,
        sender: this.user.coinbase,
        nftAddress: sellerToken.contract,
        side: 0,
        tokenId: sellerToken.tokenId,
        // feeRecipient: sellerToken.feeRecipient,
        RelayerFee: sellerToken.makerRelayerFee,
        contractType: sellerToken.contractType,
        value: sellerToken.amount
      })
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
        removeLocalStorage([this.cartName])
        const res = await this.$api("order.finish", {
          "orderId": sellerToken.id,
          "txHash": hashAtomicMatch.transactionHash,
          "taker": buyer.taker,
        })
        console.log(res)
      } catch (e) {
        console.log(e)
        this.buyBtnLoading = false
      }
    },
    async cartBuyOpensea () {
      // isOrderFulfillable
      console.log(this.openseaCart)
      this.buyOpenseaBtnLoading= true
      try {
        const openseaSDK = await this.$sdk.initOpenSea()
        console.log(openseaSDK)
        // for (let i = 0; i < this.openseaCart.length; i++) {
        //   const isOrder = await openseaSDK.isOrderFulfillable(this.openseaCart[i])
        //   console.log(isOrder)
        // }
        this.buyOpenseaBtnLoading= false
        const transactionHash = await openseaSDK.fulfillOrder({
          order:this.openseaCart[0],
          accountAddress: this.user.coinbase
        })
        // this.$tools.message('购买成功', 'success');
        // this.buyOpenseaBtnLoading= false
        removeLocalStorage([this.cartNameOpensea])
      } catch (e) {
        console.log(e)
        this.$tools.message(this.$filters.filterMsgOpenseaErr(e), 'warning');
        this.buyOpenseaBtnLoading= false
      }
    }
  },
}
</script>

<style lang="scss">
  .el-popper{
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
  }
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
    width: 100%;
    padding: 20px 0 10px;
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
        .cover-image {
          width: 64px;
          height: 64px;
          border-radius: 8px;
        }
        .info-txt {
          margin-left: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 160px;
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
            .tag{
              margin-left: 5px;
              display: block;
              width: 16px;
              height: 16px;
            }
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
          width: 120px;
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
