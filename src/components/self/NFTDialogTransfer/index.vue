<template>
  <el-dialog :model-value="isShowTransferDialog" :show-close="false" :close-on-click-modal="false" @closed="closed"
    custom-class="custom-dialog transfer-box" destroy-on-close>
    <template #title>
      <div class="left">
        <span>Transfer</span>
      </div>
      <el-icon @click="isShowTransferDialog=false">
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
          {{`Quantity (Available:  ${nftAmount1155})`}}
        </div>
        <div class="price-wrap">
          <el-input-number v-model="nftQuantity" :controls="true" :precision="0" :min="1"
                           class="input-with-select" :max="nftAmount1155" size="large" />
        </div>
      </div>

      <div class="price-box">
        <div class="label display-flex box-center-Y">
          Transfer To
        </div>
        <div class="price-wrap">
          <el-input v-model="recivierAddress" placeholder="e.g. 0x1ed3... or destination.eth, destination.lens" class="input-with-select" size="large" />
        </div>
      </div>
      <el-button type="primary" class="btnBuy" :loading="transferBtnLoading" @click="transferNft">Transfer</el-button>
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
      <el-button type="primary" class="btnBuy" @click="isShowTransferDialog=false">View project</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      isOpensea: false,
      isBuyOver: false,
      isShowTransferDialog: false,
      transferBtnLoading: false,
      tokenInfo: {},
      nftPrice: '--',
      nftQuantity: 1,
      recivierAddress: '',
      nftAmount1155: 0,
      hash: '',
      addressVild: true,
    }
  },
  computed: {
    user () {
      return this.$store.state.user;
    },
  },
  methods: {
    isAddressVild () {
      this.addressVild = this.$sdk.isAddressVild(this.recivierAddress)
    },
    async showTransfer (tokenInfo) {
      console.log('showTransfer')
      this.tokenInfo = tokenInfo
      this.tokenInfo.tokenId = parseInt(this.tokenInfo.tokenId)
      if (this.tokenInfo.contractType === 1) {
        const amount = await this.$sdk.getERC1155Amount(this.tokenInfo.contract, this.tokenInfo.tokenId, this.user.coinbase)
        console.log(amount)
        if (typeof amount == 'object' && amount.error) {
          return
        }
        this.nftAmount1155 = amount
      }
      this.isBuyOver = false
      this.nftQuantity = 1
      this.recivierAddress = ''
      this.nftAmount1155 =  0
      this.transferBtnLoading = false
      this.isShowTransferDialog = true
    },
    async transferNft () {
      if (this.tokenInfo.contractType === 1 && !this.nftQuantity) {
        this.$tools.message('请输入有效数量');
        return
      }
      if (!this.$sdk.isAddressVild(this.recivierAddress)) {
        this.$tools.message('地址异常');
        return
      }
      this.transferBtnLoading = true
      console.log({
        address: this.tokenInfo.contract,
        type: this.tokenInfo.contractType === 1 ? 6 : 3,
        amount: this.nftQuantity,
        from: this.user.coinbase,
        tokenId: this.tokenInfo.tokenId,
        to: this.recivierAddress
      })
      try {
        const hashTransfer = await this.$sdk.transferAsset({
          address: this.tokenInfo.contract,
          type: this.tokenInfo.contractType === 1 ? 6 : 3,
          amount: this.nftQuantity,
          from: this.user.coinbase,
          tokenId: this.tokenInfo.tokenId,
          to: this.recivierAddress
        })
        console.log(hashTransfer)
        if (typeof hashTransfer == "object" && hashTransfer.error) {
          this.transferBtnLoading = false
          return
        }
        console.log(hashTransfer)
        this.hash = hashTransfer.transactionHash
        this.isBuyOver = true // 展示交易hash值
        this.transferBtnLoading = false
      } catch (e) {
        console.log(e)
        this.transferBtnLoading = false
      }

    },
  }
}
</script>

<style lang="scss">
  .transfer-box{
    .el-input__wrapper{
      box-shadow: none !important;
    }
    .el-input__inner{
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
    }
    .el-input-number{
      width: 100%;
      >* {
        outline-color: transparent !important;
        outline: none !important;
      }
      .el-input-number__decrease, .el-input-number__increase{
        border: none !important;
        background-color: #E6E8EC;
        .el-icon{
          color: #717A83 !important;
        }
      }

    }
  }
</style>

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
  padding: 16px;
  .label {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: $primaryColor;
  }
  .price-wrap{
    margin-top: 8px;
    border: 1px solid $borderBg;
    border-radius: 12px;
    padding: 12px;
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
