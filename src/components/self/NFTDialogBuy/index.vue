<template>
  <el-dialog :model-value="isShowBuyDialog" :show-close="false" :close-on-click-modal="false" @closed="closed"
    custom-class="custom-dialog" destroy-on-close>
    <template #title>
      <div class="left">
        <span>Checkout</span>
      </div>
      <el-icon @click="isShowBuyDialog=false">
        <Close />
      </el-icon>
    </template>
    <div v-if="isBuyOver===false">
      <div class="nft-box">
        <image-box class="img-box" :src="tokenInfo.oriImage"></image-box>
        <div class="box-center">
          <span class="tokenid">#{{tokenInfo.tokenId}}</span>
          <span class="collection-name">{{tokenInfo.ckCollectionsInfoEntity.name || '--'}}
            <img class="tag" v-if="tokenInfo.ckCollectionsInfoEntity.isCertification === '1'" src="@/assets/images/icons/icon_tag.svg" alt="">
          </span>
        </div>
      </div>
      <div class="price-box" v-if="tokenInfo.contractType === 1">
        <div class="label">
          Quantity
        </div>
        <div class="price-wrap">
          <span class="buy-price">
            {{$filters.milliFormat(isOpensea ? sellInfo.protocolData.parameters.offer[0].startAmount : sellInfo.amount)}}
          </span>
        </div>
      </div>
      <div class="price-box">
        <div class="label">
          Price
        </div>
        <div class="price-wrap">
          <span class="buy-price">
            <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
            {{nftPrice}}
          </span>
           <div class="total">${{$filters.milliFormat($filters.ethToUsdt(nftPrice))}}</div>
        </div>
      </div>
      <el-button type="primary" class="btnBuy" :loading="buyBtnLoading" @click="buyNft">Buy</el-button>
    </div>
    <div v-else>
      <div class="nft-box">
        <image-box class="img-box" :src="tokenInfo.oriImage"></image-box>
        <div class="box-center">
          <span class="tokenid">Transaction hash</span>
          <a class="hash-txt" target="_blank"
            :href="$filters.hashExplore(hash).href">{{$filters.hashExplore(hash).hashShort}}
          </a>
        </div>
      </div>
      <el-button type="primary" class="btnBuy" @click="isShowBuyDialog=false">View project</el-button>
    </div>
  </el-dialog>
</template>

<script>
import BigNumber from "bignumber.js";
import {setLocalStorage} from "@/util/local-storage";

export default {
  name: "index",
  data () {
    return {
      isOpensea: false,
      isBuyOver: false,
      isShowBuyDialog: false,
      buyBtnLoading: false,
      options: [
        {
          value: 'ETH',
          label: 'ETH',
        }
      ],
      optionsDays: [
        {
          value: 1,
          label: '1days',
        },
        {
          value: 3,
          label: '3days',
        },
        {
          value: 5,
          label: '5days',
        },
        {
          value: 7,
          label: '7days',
        }
      ],
      tokenInfo: {},
      nftPrice: '--',
      hash: '',
      sellInfo: null
    }
  },
  computed: {
    user () {
      return this.$store.state.user;
    },
    cartName () {
      return `coresky_cart_${this.$store.state.user.coinbase}`
    },
    cartNameOpensea () {
      return `coresky_cart_opensea_${this.$store.state.user.coinbase}`
    },
    shoppingOpenseaCartList () {
      return this.$store.state.shoppingOpenseaCartList;
    },
    shoppingCartList () {
      return this.$store.state.shoppingCartList;
    }
  },
  methods: {
    async showBuy (tokenInfo, v = null, isOpensea = false) {
      console.log('showBuy', v, isOpensea)
      this.isOpensea = isOpensea
      this.isBuyOver = false
      this.tokenInfo = tokenInfo
      // if (this.tokenInfo.contractType === 0 && !isOpensea) {
      //   this.sellInfo = this.tokenInfo.ckOrdersEntityList[0]
      // } else {
      //   console.log(v)
      this.sellInfo = v
      // }
      console.log(this.sellInfo)
      const price = this.isOpensea ? this.sellInfo.currentPrice : this.sellInfo.basePrice
      try {
        const ethBalance = await this.$sdk.getBalance({
          address: this.$sdk.NULL_ADDRESS()
        }, this.user.coinbase)
        if (new BigNumber(ethBalance).isLessThan(
          this.$sdk.fromWeiNum(price)
        )) {
          this.$tools.message('No Enough Balance Of ETH');
          return
        }
        this.tokenInfo.tokenId = parseInt(this.tokenInfo.tokenId)
        this.isShowBuyDialog = true
        this.nftPrice = this.$sdk.fromWeiNum(price)
        console.log(this.tokenInfo)
      } catch (e) {
        console.log(e)
      }
    },
    async buyNft () {
      this.buyBtnLoading = true
      if (this.isOpensea) {
        this.fulfillOrderOpensea()
        return
      }
      console.log(this.sellInfo)
      let seller = this.$sdk.getAtomicMatchWrapOrder(this.sellInfo, false)
      seller = {
        ...seller,
        ...{
          _sender: this.sellInfo.maker,
          basePrice: seller.basePrice.toString(),
          // basePrice: ethers.BigNumber.from(seller.basePrice.toString()),
          v: this.sellInfo.v,
          s: this.sellInfo.s,
          r: this.sellInfo.r
        }
      }
      let buyParams = this.$sdk.makeOrder({
        exchangeAddress: process.env.VUE_APP_MARKET_EXCHANGE,
        sender: this.user.coinbase,
        nftAddress: this.tokenInfo.contract,
        side: 0,
        tokenId: this.tokenInfo.tokenId,
        // feeRecipient: this.tokenInfo.ckCollectionsInfoEntity.feeContract,
        RelayerFee: this.tokenInfo.ckCollectionsInfoEntity.royalty,
        contractType: this.tokenInfo.contractType,
        value: this.sellInfo.amount
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
          expirationTime: Date.parse(new Date().toString()) / 1000 + 60 * 60,
        }
      }
      console.log(buyer)
      try {
        const sigBuyer = await this.$sdk.signature(buyer, this.user.coinbase)
        if (typeof sigBuyer == "object" && sigBuyer.error) {
          this.buyBtnLoading = false
          return
        }
        console.log(sigBuyer)
        buyer = {
          ...buyer,
          ...{
            v: sigBuyer.v,
            r: sigBuyer.r,
            s: sigBuyer.s,
            sign: JSON.stringify(sigBuyer),
          }
        }
        console.log(JSON.stringify(buyer))
        console.log(JSON.stringify(seller))
        console.log('sell validateOrderParameters', await this.$sdk.validateOrderParameters(seller))
        console.log('buy validateOrderParameters', await this.$sdk.validateOrderParameters(buyer))
        // console.log(JSON.stringify(buyer), JSON.stringify(seller))
        console.log('orderCanMatch', await this.$sdk.orderCanMatch(buyer, seller))
        console.log('orderCalldataCanMatch', await this.$sdk.orderCalldataCanMatch(buyer, seller))
        console.log('buy validateOrder_', await this.$sdk.validateOrder_(buyer))
        console.log('sell validateOrder_', await this.$sdk.validateOrder_(seller))
        try {
          const hashAtomicMatch = await this.$sdk.atomicMatch(seller, buyer, this.user.coinbase, this.user.coinbase);
          console.log(hashAtomicMatch)
          if (typeof hashAtomicMatch == "object" && hashAtomicMatch.error) {
            this.buyBtnLoading = false
            return
          }
          this.hash = hashAtomicMatch.transactionHash
          console.log(hashAtomicMatch)

          let openseaCart = this.shoppingOpenseaCartList
          console.log(this.tokenInfo.contract, this.tokenInfo.tokenId)
          let hasOpensea = openseaCart.filter(v => !(v.makerAssetBundle.assets[0].tokenAddress === this.tokenInfo.contract && v.makerAssetBundle.assets[0].tokenId === this.tokenInfo.tokenId.toString()))
          console.log(hasOpensea)
          if (hasOpensea.length !== openseaCart.length) {
            openseaCart = hasOpensea
          }
          console.log(openseaCart)
          let obj = {}
          obj[this.cartNameOpensea] = JSON.stringify(openseaCart)
          setLocalStorage(obj)


          let coreskyCart = this.shoppingCartList
          // let hasCoresky = coreskyCart.filter(v => !(v.contract === this.tokenInfo.contract && v.makerAssetBundle.assets[0].tokenId === v.tokenId))
          // console.log(hasCoresky)
          // if (hasCoresky.length !== coreskyCart.length) {
          //   coreskyCart = hasCoresky
          // }
          let newCoresky = []
          coreskyCart.forEach(item => {
            let ckOrdersEntityList = []
            if (item.contract !== this.tokenInfo.contract || item.tokenId !== this.tokenInfo.tokenId) {
              newCoresky.push(item)
            } else {
              item.ckOrdersEntityList.forEach(v => {
                if (v.id !== this.sellInfo.id) {
                  ckOrdersEntityList.push(v)
                }
              })
              if (ckOrdersEntityList.length > 0) {
                item.ckOrdersEntityList = ckOrdersEntityList
                newCoresky.push(item)
              }
            }
          })
          let objCoresky = {}
          objCoresky[this.cartName] = JSON.stringify(newCoresky)
          setLocalStorage(objCoresky)
          this.$store.commit('initShoppingCart')

          const res = await this.$api("order.finish", {
            "orderId": this.sellInfo.id,
            "txHash": hashAtomicMatch.transactionHash,
            "taker": this.user.coinbase,
          })
          console.log(res)
          this.buyBtnLoading = false
          this.isBuyOver = true // 展示交易hash值
          this.$emit('buySuccess', hashAtomicMatch)
        } catch (e) {
          console.log(e)
        }
      } catch (e) {
        console.log(e)
        this.buyBtnLoading = false
      }
    },
    async fulfillOrderOpensea () {
      console.log(JSON.stringify(this.sellInfo))
      try {
        const openseaSDK = await this.$sdk.initOpenSea()
        console.log(openseaSDK)
        const transactionHash = await openseaSDK.fulfillOrder({
          order: this.sellInfo,
          accountAddress: this.user.coinbase
        })
        console.log(transactionHash)
        this.hash = transactionHash

        let openseaCart = this.shoppingOpenseaCartList
        console.log(this.tokenInfo.contract, this.tokenInfo.tokenId)
        let hasOpensea = openseaCart.filter(v => !(v.orderHash === this.sellInfo.orderHash))
        console.log(hasOpensea)
        if (hasOpensea.length !== openseaCart.length) {
          openseaCart = hasOpensea
        }
        console.log(openseaCart)
        let obj = {}
        obj[this.cartNameOpensea] = JSON.stringify(openseaCart)
        setLocalStorage(obj)


        let coreskyCart = this.shoppingCartList
        // let hasCoresky = coreskyCart.filter(v => !(v.contract === this.tokenInfo.contract && v.makerAssetBundle.assets[0].tokenId === v.tokenId))
        // console.log(hasCoresky)
        // if (hasCoresky.length !== coreskyCart.length) {
        //   coreskyCart = hasCoresky
        // }

        let newCoresky = []
        coreskyCart.forEach(item => {
          if (item.contract !== this.tokenInfo.contract || item.tokenId !== this.tokenInfo.tokenId) {
            newCoresky.push(item)
          }
        })
        let objCoresky = {}
        objCoresky[this.cartName] = JSON.stringify(newCoresky)
        setLocalStorage(objCoresky)
        this.$store.commit('initShoppingCart')




        setTimeout(() => {
          this.isBuyOver = true // 展示交易hash值
          this.buyBtnLoading = false
          this.$emit('buySuccess', transactionHash)
        }, 2000)
      } catch (e) {
        this.$tools.message(this.$filters.filterMsgOpenseaErr(e), 'warning');
        console.log(e)
        this.buyBtnLoading = false
      }
    },
  }
}
</script>

<style scoped lang="scss">
.nft-box {
  display: flex;
  padding: 16px;
  border: 1px solid $borderBg;
  border-radius: 20px;
  .img-box {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-right: 10px;
  }
  .box-center {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: self-start;
    .tokenid {
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      color: $primaryColor;
      margin-bottom: 5px;
    }
    .tag {
      width: 16px;
      height: 16px;
      display: inline-block;
      vertical-align: bottom;
      margin-left: 5px;
    }
  }
}
.price-box {
  display: flex;
  padding: 16px;
  border: 1px solid $borderBg;
  border-radius: 20px;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  margin-top: 20px;
  .label {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: $primaryColor;
  }
  .buy-price {
    margin-bottom: 4px;
    height: 30px;
    line-height: 30px;
    font-weight: 500;
    font-size: 20px;
    .token-icon {
      width: 10px;
      height: 16px;
      display: inline-block;
    }
  }
}
.btnBuy {
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
  &:hover {
    background: $mainLiner;
  }
}
.hash-txt {
  color: #038ddb;
}
</style>
