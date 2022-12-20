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
            <img class="tag" src="@/assets/images/icons/icon_tag.svg" alt="">
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
          <div class="total">$ 45,332.02</div>
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

export default {
  name: "index",
  data () {
    return {
      isBuyOver: false,
      isShowBuyDialog: false,
      buyBtnLoading: false,
      form: {
        price: '',
        date: '',
        time: '',
        symbol: ''
      },
      rules: {
        price: [
          { required: true, message: 'Please input price', trigger: 'blur' },
        ],
      },
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
      hash: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user;
    }
  },
  methods: {
    async showBuy (tokenInfo) {
      this.isBuyOver = false
      this.tokenInfo = tokenInfo
      const ethBalance = await this.$sdk.getBalance({
        address: this.$sdk.NULL_ADDRESS()
      }, this.user.coinbase)
      if (new BigNumber(ethBalance).isLessThan(
        this.$sdk.fromWeiNum(this.tokenInfo.ckOrdersEntity.basePrice)
      )) {
        this.$tools.message('No Enough Balance Of ETH');
        return
      }

      this.tokenInfo.tokenId = parseInt(this.tokenInfo.tokenId)
      this.isShowBuyDialog = true
      this.nftPrice = this.$sdk.fromWeiNum(this.tokenInfo.ckOrdersEntity.basePrice)
      console.log(this.tokenInfo)
    },
    async buyNft () {
      this.buyBtnLoading = true
      let seller = this.$sdk.getAtomicMatchWrapOrder(this.tokenInfo.ckOrdersEntity, false)
      seller = {
        ...seller,
        ...{
          _sender: this.tokenInfo.ckOrdersEntity.maker,
          basePrice: seller.basePrice.toString(),
          // basePrice: ethers.BigNumber.from(seller.basePrice.toString()),
          v: this.tokenInfo.ckOrdersEntity.v,
          s: this.tokenInfo.ckOrdersEntity.s,
          r: this.tokenInfo.ckOrdersEntity.r
        }
      }
      let buyParams = this.$sdk.makeOrder(process.env.VUE_APP_MARKET_EXCHANGE, this.user.coinbase, this.tokenInfo.contract, 0, this.tokenInfo.tokenId)
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
        console.log(buyer)
        console.log(seller)
        // console.log('sell validateOrderParameters', await this.$sdk.validateOrderParameters(seller))
        // console.log('buy validateOrderParameters', await this.$sdk.validateOrderParameters(buyer))
        // console.log(JSON.stringify(buyer), JSON.stringify(seller))
        // console.log('orderCanMatch', await this.$sdk.orderCanMatch(buyer, seller))
        // console.log('orderCalldataCanMatch', await this.$sdk.orderCalldataCanMatch(buyer, seller))
        // console.log('buy validateOrder_', await this.$sdk.validateOrder_(buyer))
        // console.log('sell validateOrder_', await this.$sdk.validateOrder_(seller))
        const hashAtomicMatch = await this.$sdk.atomicMatch(seller, buyer, this.user.coinbase, this.user.coinbase);
        console.log(hashAtomicMatch)
        if (typeof hashAtomicMatch == "object" && hashAtomicMatch.error) {
          this.buyBtnLoading = false
          return
        }
        this.hash = hashAtomicMatch.transactionHash
        console.log(hashAtomicMatch)
        const res = await this.$api("order.finish", {
          "orderId": this.tokenInfo.ckOrdersEntity.id,
          "txHash": hashAtomicMatch.transactionHash,
          "taker": buyer.taker,
        })
        console.log(res)
        this.buyBtnLoading = false
        this.isBuyOver = true // 展示交易hash值
        this.$emit('buySuccess', hashAtomicMatch)
      } catch (e) {
        console.log(e)
        this.buyBtnLoading = false
      }
    }
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
