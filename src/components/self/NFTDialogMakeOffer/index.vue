<template>
  <el-dialog :model-value="isShowMakeOfferDialog" :show-close="false" :close-on-click-modal="false" @closed="closed"
    custom-class="custom-dialog" destroy-on-close>
    <template #title>
      <div class="left">
        <span>Make an offer</span>
      </div>
      <el-icon @click="isShowMakeOfferDialog=false">
        <Close />
      </el-icon>
    </template>
    <div class="nft-box">
      <image-box class="img-box" :src="tokenInfo.ckCollectionsInfoEntity.image"></image-box>
      <div class="box-center">
        <span class="tokenid">#{{tokenInfo.tokenId}}</span>
        <span class="collection-name">{{tokenInfo.name || '--'}}
          <img class="tag" src="@/assets/images/icons/icon_tag.svg" alt="">
        </span>
      </div>
    </div>
    <el-form label-position="top" class="custom-form" :rules="rules" :model="form" style="margin-top:40px">
      <el-form-item label="Price" prop="price">
        <div class="flex-content">
          <el-input v-model="form.price" size="large" style="width:100%;" />
          <el-select v-model="form.symbol" size="large" class="ml20" placeholder="Select"
            style="width:180px;flex-shrink: 0;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="Expiration date">
        <div class="flex-content">
          <el-date-picker v-model="form.time" size="large" type="datetime" placeholder="Pick a Date" style=""
            format="YYYY-MM-DD HH:mm" />
          <el-select v-model="form.date" class="ml20" size="large" placeholder="Select"
            style="width:180px;flex-shrink: 0;">
            <el-option v-for="item in optionsDays" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="Fee and coupons">
        <div class="describe-box">
          <div class="describe-item">
            <span class="lable">Coeesky service fee: </span>
            <span class="value">0.5%</span>
          </div>
          <div class="describe-item mt15">
            <span class="lable">coupon rewards:</span>
            <div class="value">
              <p>
                1 coupon / 0.5 ETH
              </p>
              <p>1 coupon / listing / day</p>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="btnBuy" :loading="btnMakeOfferLoading" @click="makerBuyer">Make Offer</el-button>
  </el-dialog>
</template>

<script>
import BigNumber from "bignumber.js";

export default {
  name: "index",
  data () {
    return {
      isShowMakeOfferDialog: false,
      btnMakeOfferLoading: false,
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
          value: 'WETH',
          label: 'WETH',
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
      tokenInfo: {}
    }
  },
  computed: {
    user () {
      return this.$store.state.user;
    }
  },
  methods: {
    async showMakeOffer (tokenInfo) {
      this.tokenInfo = tokenInfo
      this.tokenInfo.tokenId = parseInt(this.tokenInfo.tokenId)
      this.isShowMakeOfferDialog = true
      console.log(this.tokenInfo)
    },
    async makerBuyer () {
      if (!this.form.price || new BigNumber(this.form.price).isLessThan(0)) {
        this.$tools.message('请输入正确的价格');
        return
      }
      if (!this.form.time) {
        this.$tools.message('请选择过期时间');
        return
      }
      this.btnMakeOfferLoading = true
      let buyer = this.$sdk.makeOrder(process.env.VUE_APP_MARKET_EXCHANGE, this.user.coinbase, this.tokenInfo.contract, 0, this.tokenInfo.tokenId)
      buyer = {
        ...buyer,
        ...{
          expirationTime: new Date(this.form.time).getTime() / 1000,
          // expirationTime: 0,
          paymentToken: process.env.VUE_APP_WETH,
          listingTime: Date.parse(new Date().toString()) / 1000 - 600,
          feeRecipient: this.$sdk.FEE_ADDRESS(),
          basePrice: this.$Web3.utils.toWei('0.02')
        }
      }
      const sigBuyer = await this.$sdk.signature(buyer, this.user.coinbase)
      console.log(sigBuyer)
      const hashToSign = await this.$sdk.callhashToSign_(buyer)
      buyer = {
        ...buyer,
        ...{
          hash: hashToSign,
          tokenId: this.tokenInfo.tokenId,
          contract: this.tokenInfo.contract,
          type: this.$sdk.valueOrderType("MAKE_OFFER"),
          v: sigBuyer.v,
          r: sigBuyer.r,
          s: sigBuyer.s,
          sign: JSON.stringify(sigBuyer),
        }
      }
      console.log(buyer)
      console.log(JSON.stringify(buyer))
      const allowancePayToken = await this.$sdk.allowancePayToken({
        type: 5,
        address: process.env.VUE_APP_WETH
      }, this.user.coinbase, process.env.VUE_APP_MARKET_TOKEN_TRANSFER_PROXY)
      console.log(allowancePayToken)
      if (parseFloat(allowancePayToken) === 0) {
        const approve = await this.$sdk.approvePayToken({
          type: 5,
          address: process.env.VUE_APP_WETH
        }, this.user.coinbase, process.env.VUE_APP_MARKET_TOKEN_TRANSFER_PROXY)
        console.log(approve)
        const allowancePayToken1 = await this.$sdk.allowancePayToken({
          type: 5,
          address: process.env.VUE_APP_WETH
        }, this.user.coinbase, process.env.VUE_APP_MARKET_TOKEN_TRANSFER_PROXY)
        console.log(parseFloat(allowancePayToken1))
      }
      this.$api("order.create", buyer).then((res) => {
        this.btnMakeOfferLoading = false
        this.isShowMakeOfferDialog = false
        this.$tools.message('报价成功', 'success');
        this.$emit('makeOfferSuccess', res)
      })
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

.describe-box {
  width: 100%;
  padding: 16px;
  border: 1px solid $borderBg;
  border-radius: 12px;
  line-height: 21px;
  .describe-item {
    display: flex;
    .lable {
      font-weight: 400;
      font-size: 14px;
      color: $color-black2;
      min-width: 130px;
      margin-right: 20px;
    }
    .value {
    }
  }
}
.custom-form ::v-deep {
  .el-form-item__label {
    font-size: 16px;
    color: $primaryColor;
  }
  .el-input__wrapper {
    border-radius: 12px;
  }
  .el-input__inner {
    padding: 0;
  }
  .el-select {
    .el-input__wrapper {
      padding: 1px 15px;
    }
  }
  .flex-content {
    display: flex;
    width: 100%;
  }
  .el-date-editor.el-input {
    width: 100%;
    .el-input__prefix {
      display: none;
    }
  }
}
</style>
