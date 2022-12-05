<template>
  <el-dialog :model-value="isShowDialog" :show-close="false" :close-on-click-modal="false" @closed="closed"
    custom-class="custom-dialog acceptOffer" destroy-on-close>
    <template #title>
      <div class="left">
        <span>Accept the offer</span>
      </div>
      <el-icon @click="isShowDialog=false">
        <Close />
      </el-icon>
    </template>
    <div class="nft-box">
      <image-box class="img-box"
        src="https://storage.nfte.ai/nft/img/eth/0x1/8144772932469079235_604207782.webp?x-oss-process=image/resize,m_lfit,h_900">
      </image-box>
      <div class="box-center">
        <span class="tokenid">#5576</span>
        <span class="collection-name">
          Name of this collection
          <img class="tag" src="@/assets/images/icons/icon_tag.svg" alt="">
        </span>
      </div>
      <div class="box-right">
        <div class="price">0.0045 WETH</div>
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

    <el-button type="primary" class="btnBuy" :loading="buyBtnLoading" @click="buyNft">Buy</el-button>
  </el-dialog>
</template>

<script>
import { ethers } from 'ethers'

export default {
  name: "NFTDialogAcceptOffer",
  data () {
    return {
      isShowDialog: false,
      buyBtnLoading: false,
      form: {
        price: '',
        date: '',
        time: '',
        symbol: ''
      },
    }
  },
  computed: {
    user () {
      return this.$store.state.user;
    }
  },
  methods: {
    show () {
      this.isShowDialog = true
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
}
</style>
<style lang="scss">
.custom-dialog.acceptOffer {
  width: 700px;
}
</style>
