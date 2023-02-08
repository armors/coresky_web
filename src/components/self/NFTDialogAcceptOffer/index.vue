<template>
  <el-dialog :model-value="isShowAcceptDialog"
             :show-close="false"
             :close-on-click-modal="false"
             @closed="closed"
    custom-class="custom-dialog acceptOffer" destroy-on-close>
    <template #title>
      <div class="left">
        <span>Accept the offer</span>
      </div>
      <el-icon @click="isShowAcceptDialog=false">
        <Close />
      </el-icon>
    </template>
    <div v-if="isFinished===false">

      <div class="nft-box">
        <image-box class="img-box" :src="tokenInfo.oriImage">
        </image-box>
        <div class="box-center">
          <span class="tokenid">#{{tokenInfo.tokenId}}</span>
          <span class="collection-name">
            {{tokenInfo.ckCollectionsInfoEntity.name || '--'}}
            <img class="tag" src="@/assets/images/icons/icon_tag.svg" alt="">
          </span>
        </div>
        <div class="box-right">
          <div class="price">{{nftPrice}} WETH</div>
          <div class="price2">${{$filters.milliFormat($filters.ethToUsdt(nftPrice))}}</div>
        </div>
      </div>
      <div class="info-box">
        <div class="title">Price</div>
        <div class="box-item">
          <div class="left">Floor Price Difference</div>
          <div class="right">{{floorDiff}} above</div>
        </div>
        <div class="box-item">
          <div class="left">Seller</div>
          <div class="right">{{tokenInfo.ckCollectionsInfoEntity.sellReward}}</div>
        </div>
        <div class="box-item">
          <div class="left">Quantity</div>
          <div class="right">{{$filters.milliFormat(acceptInfo.amount)}}</div>
        </div>
        <div class="box-item">
          <div class="left">Maturity</div>
          <div class="right">{{$filters.timeFormatTime(acceptInfo.expirationTime)}}</div>
        </div>
      </div>
      <div class="info-box">
        <div class="title">Cost</div>
        <div class="box-item">
          <div class="left">Service Charge</div>
          <div class="right">{{isOpensea ? protocolFee : config.protocolFeeHan}}</div>
        </div>
        <div class="box-item">
          <div class="left">Creator Fee</div>
          <div class="right">{{isOpensea ? royaltyFee :  $filters.feeFormat(this.tokenInfo.ckCollectionsInfoEntity.royalty)}}</div>
        </div>
      </div>
      <div class="total-box">
        <div class="title">Total Revenue</div>
        <div class="number">
          <span>{{totalRevenue}} WETH</span>
          <span>${{$filters.milliFormat($filters.ethToUsdt(totalRevenue))}}</span>
        </div>
      </div>
      <el-button type="primary" class="btnBuy" v-if="isApproved" :loading="acceptBtnLoading" @click="acceptOffer">Accept
        Offer</el-button>
      <el-button type="primary" class="btnBuy" :loading="acceptBtnLoading" v-else @click="setApproveAll">Approve NFT
      </el-button>
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
      <el-button type="primary" class="btnBuy" @click="isShowAcceptDialog=false">View project</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {keepPoint} from "@/filters";
import BigNumber from 'bignumber.js'
export default {
  name: "NFTDialogAcceptOffer",
  data () {
    return {
      isOpensea: false,
      isFinished: false,
      isShowAcceptDialog: false,
      acceptBtnLoading: false,
      tokenInfo: {},
      acceptInfo: {},
      isApproved: true,
      registryOwner: '',
      nftPrice: '--',
      form: {
        price: '',
        date: '',
        time: '',
        symbol: ''
      },
      protocolFee: '--',
      hash: '',
      floorDiff: '--',
      totalRevenue: '--',
      makeOfferType: 1 // 1单个nft报价 2 对集合报价
    }
  },
  computed: {
    user () {
      return this.$store.state.user;
    },
    config () {
      return this.$store.state.config;
    }
  },
  methods: {
    async initAcceptTokenInfo () {
      this.tokenInfo.tokenId = parseInt(this.tokenInfo.tokenId)
      console.log(this.tokenInfo)
      this.nftPrice = this.$sdk.fromWeiNum(this.acceptInfo.basePrice)
      try {
        await this.getRegistryOwner()
        let order = {
          type: this.tokenInfo.contractType === 0 ? "IERC721" : "IERC1155",
          address: this.tokenInfo.contract,
          tokenId: this.tokenInfo.tokenId,
        };
        this.isApproved = await this.$sdk.isApprovedForAll(
          order,
          this.user.coinbase,
          this.registryOwner,
        );
        this.$parent.acceptDialogBtnLoading = false
      } catch (e) {
        console.log(e)
        this.$parent.acceptDialogBtnLoading = false
      }
      this.floorDiff = this.tokenInfo.ckCollectionsInfoEntity.foolPrice !== 0
        ? (parseFloat(keepPoint(this.nftPrice * 100 / this.tokenInfo.ckCollectionsInfoEntity.foolPrice, 2)) + '%')
        : '--'
      let basePrice = new BigNumber(this.$sdk.fromWeiNumOrigin(this.acceptInfo.basePrice))
      let creatorFee = basePrice.multipliedBy(this.tokenInfo.ckCollectionsInfoEntity.royalty / 10000).div(100)
      let serviceFee = basePrice.multipliedBy((parseInt(this.config.protocolFee)) / 10000).div(100)
      console.log(basePrice.minus(creatorFee).minus(serviceFee).valueOf())
      this.totalRevenue = keepPoint(basePrice.minus(creatorFee).minus(serviceFee).valueOf(), 6)
    },
    async initAcceptTokenInfoOpensea () {
      this.$parent.acceptDialogBtnLoading = false
      this.nftPrice = this.$sdk.fromWeiNum(this.acceptInfo.currentPrice)
      try {
        const openseaSDK = await this.$sdk.initOpenSea()
        console.log(openseaSDK)
        const asset = {
          tokenAddress: this.$route.params.contract, // CryptoKitties
          tokenId: this.$route.params.tokenId
        }
        const assetInfo = await openseaSDK.api.getAsset(asset)

        const royalty = assetInfo.assetContract.openseaSellerFeeBasisPoints
        const fee = assetInfo.assetContract.sellerFeeBasisPoints
        this.protocolFee = this.$filters.feeFormat(assetInfo.assetContract.sellerFeeBasisPoints)
        this.royaltyFee = this.$filters.feeFormat(assetInfo.assetContract.openseaSellerFeeBasisPoints)
        this.floorDiff = this.tokenInfo.ckCollectionsInfoEntity.foolPrice !== 0
          ? (parseFloat(keepPoint(this.nftPrice * 100 / this.tokenInfo.ckCollectionsInfoEntity.foolPrice, 2)) + '%')
          : '--'
        let basePrice = new BigNumber(this.$sdk.fromWeiNumOrigin(this.acceptInfo.currentPrice))
        let creatorFee = basePrice.multipliedBy(royalty / 10000).div(100)
        let serviceFee = basePrice.multipliedBy((fee) / 10000).div(100)
        console.log(basePrice.minus(creatorFee).minus(serviceFee).valueOf())
        this.totalRevenue = keepPoint(basePrice.minus(creatorFee).minus(serviceFee).valueOf(), 6)
      } catch (e) {
        console.log(e)
      }
    },
    async show (tokenInfo, acceptInfo, makeOfferType = 1, isOpensea = false) {
      this.isOpensea = isOpensea
      this.isFinished = false
      this.tokenInfo = tokenInfo
      this.acceptInfo = acceptInfo
      this.makeOfferType = makeOfferType
      this.isShowAcceptDialog = true
      this.loading = true
      console.log(acceptInfo)
      if (isOpensea) {
        await this.initAcceptTokenInfoOpensea()
      } else {
        await this.initAcceptTokenInfo()
      }
      this.loading = false
    },
    // 挂单开始
    // 注册地址
    async getRegistryOwner () {
      console.log(this.user.coinbase)
      let registryOwner = await this.$sdk.getOwnerProxy(this.user.coinbase);
      if (typeof registryOwner == 'object' && registryOwner.error) {
        return registryOwner;
      }
      this.registryOwner = registryOwner.proxiesAddress
      console.log(registryOwner)
    },

    // 授权
    async setApproveAll () {
      let order = {
        type: this.tokenInfo.contractType === 0 ? "IERC721" : "IERC1155",
        address: this.tokenInfo.contract,
        tokenId: this.tokenInfo.tokenId,
      };
      let isApproved = await this.$sdk.isApprovedForAll(
        order,
        this.user.coinbase,
        this.registryOwner,
      );
      this.isApproved = isApproved
      console.log(isApproved)
      if (typeof isApproved == "object" && isApproved.error) {
        return isApproved;
      }
      if (!isApproved) {
        this.acceptBtnLoading = true
        let result = await this.$sdk.setApprovalForAll(
          order,
          this.user.coinbase,
          this.registryOwner,
          true
        );
        if (typeof result == "object" && result.error) {
          this.acceptBtnLoading = false
          return result;
        }
        this.isApproved = await this.$sdk.isApprovedForAll(
          order,
          this.user.coinbase,
          this.registryOwner,
        );
        this.acceptBtnLoading = false
        console.log(result)
      } else {
        this.acceptBtnLoading = false
        console.log('true')
      }
      // return result;
    },
    async acceptOffer () {
      this.acceptBtnLoading = true
      if (this.isOpensea) {
        await this.fulfillOrderOpensea()
        return
      }
      let buyer = this.acceptInfo
      buyer.basePrice = buyer.basePrice.toString()
      buyer.tokenId = this.tokenInfo.tokenId
      let seller = null
      console.log(this.tokenInfo.ckCollectionsInfoEntity)
      if (this.makeOfferType === 1) {
        seller = this.$sdk.makeOrder({
          exchangeAddress: process.env.VUE_APP_MARKET_EXCHANGE,
          sender: this.user.coinbase,
          nftAddress: buyer.contract,
          side: 1,
          tokenId: buyer.tokenId,
          RelayerFee: this.tokenInfo.ckCollectionsInfoEntity.royalty,
          feeType: 2,
          contractType: this.tokenInfo.contractType,
          value: this.acceptInfo.amount
        })
      } else {
        seller = this.$sdk.makeOrder({
          exchangeAddress: process.env.VUE_APP_MARKET_EXCHANGE,
          sender: this.user.coinbase,
          nftAddress: buyer.contract,
          side: 1,
          tokenId: buyer.tokenId,
          isMaker: true,
          buyerAddress: buyer.maker,
          RelayerFee: this.tokenInfo.ckCollectionsInfoEntity.royalty,
          feeType: 2,
          contractType: this.tokenInfo.contractType,
          value: this.acceptInfo.amount
        })
      }
      seller = {
        ...seller,
        // makerRelayerFee: 0,                           // 版税  default: 0 挂单版税卖家出在此设置
        // takerRelayerFee: 100,                            // 版税  default: 0
        // makerProtocolFee: 0,                         // 手续费  default: 0 挂单手续费卖家出在此设置
        // takerProtocolFee: 100,                           // 手续费  default: 0
        taker: buyer.maker,
        expirationTime: buyer.expirationTime,
        paymentToken: process.env.VUE_APP_WETH,
        listingTime: buyer.listingTime,
        basePrice: buyer.basePrice
      }
      const arrayParams = [
        [
          seller.exchange,
          seller.maker,
          seller.taker,
          seller.feeRecipient,
          seller.target,
          seller.staticTarget,
          seller.paymentToken
        ],
        [
          seller.makerRelayerFee,
          seller.takerRelayerFee,
          seller.makerProtocolFee,
          seller.takerProtocolFee,
          seller.basePrice,
          seller.extra,
          seller.listingTime,
          seller.expirationTime,
          seller.salt
        ],
        seller.feeMethod,
        seller.side,
        seller.saleKind,
        seller.howToCall,
        seller.calldata,
        seller.replacementPattern,
        seller.staticExtradata
      ]
      console.log(buyer, seller)
      try {
        const hashToSign = await this.$sdk.callhashToSign_(seller)
        console.log(hashToSign)
        if (typeof hashToSign == "object" && approve.error) {
          this.acceptBtnLoading = false
          return
        }
        const sig = await this.$sdk.signature(seller, this.user.coinbase)
        console.log(sig)
        if (typeof sig == "object" && sig.error) {
          this.acceptBtnLoading = false
          return
        }
        seller = {
          ...seller,
          ...{
            v: sig.v,
            r: sig.r,
            s: sig.s,
            hash: hashToSign,
            sign: JSON.stringify(sig),
          }
        }
        const orderCreate = await this.$api("order.create", {
          ...seller,
          ...{
            tokenId: buyer.tokenId,
            contract: buyer.contract,
            type: this.$sdk.valueOrderType("MAKE_OFFER"),
            auctionId: this.acceptInfo.id,
            v: sig.v,
            r: sig.r,
            s: sig.s,
            hash: hashToSign,
            sign: JSON.stringify(sig),
            amount: this.acceptInfo.amount
          }
        })
        console.log(orderCreate)
        if (orderCreate.code !== 200) {
          this.acceptBtnLoading = false
          this.$tools.message(orderCreate.message);
          return
        }
        const validateOrderArrayParams = [
          ...arrayParams,
          ...[
            sig.v,
            sig.r,
            sig.s
          ]
        ]
        console.log(validateOrderArrayParams)
        const validateOrderArrayParams1 = [
          [
            seller.exchange,
            seller.maker,
            seller.taker,
            seller.feeRecipient,
            seller.target,
            seller.staticTarget,
            seller.paymentToken
          ],
          [
            seller.makerRelayerFee,
            seller.takerRelayerFee,
            seller.makerProtocolFee,
            seller.takerProtocolFee,
            seller.basePrice,
            seller.extra,
            seller.listingTime,
            seller.expirationTime,
            seller.salt
          ],
          seller.feeMethod,
          seller.side,
          seller.saleKind,
          seller.howToCall,
          seller.calldata,
          seller.replacementPattern,
          seller.staticExtradata,
          sig.v,
          sig.r,
          sig.s
        ]
        console.log(validateOrderArrayParams1)
        console.log(arrayParams)
        console.log(JSON.stringify(buyer))
        console.log(JSON.stringify(seller))
        console.log(await this.$sdk.validateOrderParameters(seller))
        console.log(await this.$sdk.validateOrderParameters(buyer))
        console.log(buyer, seller)
        console.log(await this.$sdk.orderCanMatch(buyer, seller))
        const hashAtomicMatch = await this.$sdk.atomicMatch(seller, buyer, this.user.coinbase, buyer.maker);
        console.log(hashAtomicMatch)
        if (typeof hashAtomicMatch == "object" && hashAtomicMatch.error) {
          this.acceptBtnLoading = false
          return
        }
        const res = await this.$api("order.auctionFinish", {
          "orderId": orderCreate.debug.id,
          "txHash": hashAtomicMatch.transactionHash,
        })
        console.log(res)
        this.acceptBtnLoading = false
        // this.isShowAcceptDialog = false
        this.hash = hashAtomicMatch.transactionHash
        this.isFinished = true
        this.$emit('acceptOfferSuccess', hashAtomicMatch)
      } catch (e) {
        console.log(e)
        this.acceptBtnLoading = false
      }
    },

    async fulfillOrderOpensea () {
      console.log(this.user.coinbase)
      try {
        const openseaSDK = await this.$sdk.initOpenSea()
        console.log(openseaSDK)
        const transactionHash = await openseaSDK.fulfillOrder({
          order: this.acceptInfo,
          accountAddress: this.user.coinbase
        })
        // {
        // 	// order: order.data.order,
        // 	order: orders,
        // 		accountAddress: asset.tokenAddress
        // }
        console.log(transactionHash)
        this.acceptBtnLoading = false
        this.$emit('acceptOfferSuccess', transactionHash)
        // const balance= await openseaSDK.createBuyOrder({
        // 	asset,
        // 	accountAddress: this.user.coinbase,
        // 	// Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
        // 	startAmount: 1.2,
        // })
        // console.log(balance)
      } catch (e) {
        this.acceptBtnLoading = false
        console.log(e)
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
  margin-bottom: 40px;
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
.box-right {
  margin-left: auto;
  color: $primaryColor;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  .price {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
  }
  .price2 {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
}
.info-box {
  border-bottom: 1px solid $borderBg;
  margin-bottom: 20px;
  padding-bottom: 10px;
  .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: $primaryColor;
    margin-bottom: 16px;
  }
  .box-item {
    display: flex;
    justify-content: space-between;
    color: $primaryColor;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 14px;
    .left {
      color: $color-black3;
    }
    .right {
    }
  }
}
.total-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: $primaryColor;
  .number {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: 24px;
    font-size: 16px;
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
<style lang="scss">
.custom-dialog.acceptOffer {
  width: 700px;
}
</style>
