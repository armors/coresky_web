<template>
  <el-dialog :model-value="isShowAcceptDialog" :show-close="false" :close-on-click-modal="false" @closed="closed"
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
        <image-box class="img-box" :src="tokenInfo.ckCollectionsInfoEntity.image">
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
          <div class="price2">$4.79</div>
        </div>
      </div>
      <div class="info-box">
        <div class="title">Price</div>
        <div class="box-item">
          <div class="left">floor price difference</div>
          <div class="right">1,025% above</div>
        </div>
        <div class="box-item">
          <div class="left">seller</div>
          <div class="right">814596</div>
        </div>
        <div class="box-item">
          <div class="left">maturity</div>
          <div class="right">3days</div>
        </div>
      </div>
      <div class="info-box">
        <div class="title">Cost</div>
        <div class="box-item">
          <div class="left">service charge</div>
          <div class="right">2.5%</div>
        </div>
        <div class="box-item">
          <div class="left">creator fee</div>
          <div class="right">10%</div>
        </div>
      </div>
      <div class="total-box">
        <div class="title">Total revenue</div>
        <div class="number">
          <span>0.0039 WETH</span>
          <span>$4.79</span>
        </div>
      </div>
      <el-button type="primary" class="btnBuy" v-if="isApproved" :loading="acceptBtnLoading" @click="acceptOffer">Accept
        Offer</el-button>
      <el-button type="primary" class="btnBuy" :loading="acceptBtnLoading" v-else @click="setApproveAll">Approve NFT
      </el-button>
    </div>
    <div v-else>
      <div class="nft-box">
        <image-box class="img-box" :src="tokenInfo.ckCollectionsInfoEntity.image"></image-box>
        <div class="box-center">
          <span class="tokenid">Transaction hash</span>
          <a class="hash-txt" target="_blank"
            href="https://etherscan.io/tx/0xf68937328056209c137e9ded6b3de343c6ff0e8e8b12fb93918bc7b59e8deb22">0x1234......5678
          </a>
        </div>
      </div>
      <el-button type="primary" class="btnBuy" @click="isShowAcceptDialog=false">View project</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { ethers } from 'ethers'

export default {
  name: "NFTDialogAcceptOffer",
  data () {
    return {
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
      makeOfferType: 1 // 1单个nft报价 2 对集合报价
    }
  },
  computed: {
    user () {
      return this.$store.state.user;
    }
  },
  methods: {
    async show (tokenInfo, acceptInfo, makeOfferType = 1) {
      this.isFinished = false
      this.isShowAcceptDialog = true
      this.tokenInfo = tokenInfo
      this.acceptInfo = acceptInfo
      this.makeOfferType = makeOfferType
      this.tokenInfo.tokenId = parseInt(this.tokenInfo.tokenId)
      console.log(this.tokenInfo)
      this.nftPrice = await this.$sdk.fromWeiNum(this.acceptInfo.basePrice)
      try {
        await this.getRegistryOwner()
        let order = {
          type: 'IERC721',
          address: this.tokenInfo.contract,
          tokenId: this.tokenInfo.tokenId,
        };
        this.isApproved = await this.$sdk.isApprovedForAll(
          order,
          this.user.coinbase,
          this.registryOwner,
        );
        this.isShowAcceptDialog = true
        this.$parent.acceptDialogBtnLoading = false
      } catch (e) {
        console.log(e)
        this.$parent.acceptDialogBtnLoading = false
      }
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
        type: 'IERC721',
        address: this.tokenInfo.contract,
        tokenId: this.tokenInfo.tokenId,
      };
      let isApproved = await this.$sdk.isApprovedForAll(
        order,
        this.user.coinbase,
        this.registryOwner,
      );
      console.log(isApproved)
      if (typeof isApproved == "object" && isApproved.error) {
        return isApproved;
      }
      if (!isApproved) {
        let result = await this.$sdk.setApprovalForAll(
          order,
          this.user.coinbase,
          this.registryOwner,
          true
        );
        console.log(result)
      } else {
        console.log('true')
      }
      // return result;
    },
    async acceptOffer () {
      this.acceptBtnLoading = true
      let buyer = this.acceptInfo
      buyer.basePrice = buyer.basePrice.toString()
      buyer.tokenId = this.tokenInfo.tokenId
      let seller = null
      if (this.makeOfferType === 1) {
        seller = this.$sdk.makeOrder(process.env.VUE_APP_MARKET_EXCHANGE, this.user.coinbase, buyer.contract, 1, buyer.tokenId)
      } else {
        seller = this.$sdk.makeOrder(process.env.VUE_APP_MARKET_EXCHANGE, this.user.coinbase, buyer.contract, 1, buyer.tokenId, true, buyer.maker)
      }
      seller = {
        ...seller,
        // taker: buyer.maker,
        expirationTime: buyer.expirationTime,
        paymentToken: process.env.VUE_APP_WETH,
        listingTime: buyer.listingTime,
        // feeRecipient: this.$sdk.FEE_ADDRESS(),
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
        const sig = await this.$sdk.signature(seller, this.user.coinbase)
        console.log(sig)
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
          }
        })
        console.log(orderCreate)
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
        const res = await this.$api("order.auctionFinish", {
          "orderId": orderCreate.debug.id,
          "txHash": hashAtomicMatch.transactionHash,
        })
        console.log(res)
        this.acceptBtnLoading = false
        // this.isShowAcceptDialog = false
        this.isFinished = true
        this.$tools.message('接受报价完成', 'success');
        this.$emit('acceptOfferSuccess', hashAtomicMatch)
      } catch (e) {
        console.log(e)
        this.acceptBtnLoading = false
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
