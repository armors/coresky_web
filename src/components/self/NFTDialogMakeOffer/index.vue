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
      <image-box class="img-box" :src="tokenInfo.oriImage"></image-box>
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
      <el-form-item :label="`Quantity`" prop="quantity" v-if="tokenInfo.contractType === 1">
        <div class="flex-content">
          <el-input v-model="form.quantity" size="large" style="width:100%;" />
<!--          <el-button @click="form.quantity = nftAmount1155" type="primary" class="btnBuy ml20" style="width:180px;flex-shrink: 0;margin-top: 0" >MAX</el-button>-->
        </div>
      </el-form-item>
      <el-form-item label="Expiration date" prop="time">
        <div class="flex-content">
          <el-date-picker v-model="form.time" size="large" type="datetime" placeholder="Pick a Date" style=""
            format="YYYY-MM-DD HH:mm" :default-time="defaultTime" :disabled-date="disabledDate" />
          <el-select v-model="form.date" class="ml20" size="large" placeholder="Select" @change="dateChange"
            style="width:180px;flex-shrink: 0;">
            <el-option v-for="item in optionsDays" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="Fee and coupons">
        <div class="describe-box">
          <div class="describe-item">
            <span class="lable">Coeesky service fee: </span>
            <span class="value">{{serviceFee}}</span>
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
import dayjs from 'dayjs';

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
        symbol: 'WETH',
        quantity: ''
      },
      rules: {
        price: [
          { required: true, message: 'Please input price', trigger: 'blur' },
        ],
        time: [
          { required: true, message: 'Please Pick a Date', trigger: 'change' },
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
      tokenInfo: {},
      makeOfferType: 1, // 1单个nft报价 2 对集合报价
      defaultTime: new Date(),
      serviceFee: '--',
    }
  },
  computed: {
    user () {
      return this.$store.state.user;
    }
  },
  methods: {
    disabledDate (time) {
      return time.getTime() < Date.now()
    },
    dateChange () {
      this.form.time = dayjs().add(this.form.date, "day").format("YYYY-MM-DD HH:mm");
    },
    async showMakeOffer (tokenInfo, makeOfferType = 1) {
      this.tokenInfo = tokenInfo
      this.rules = this.tokenInfo.contractType === 0 ? {
        price: [
          { required: true, message: 'Please input price', trigger: 'blur' },
        ],
        time: [
          { required: true, message: 'Please Pick a Date', trigger: 'change' },
        ],
      } : {
        price: [
          { required: true, message: 'Please input price', trigger: 'blur' },
        ],
        quantity: [
          { required: true, message: 'Please input quantity', trigger: 'blur' },
        ],
        time: [
          { required: true, message: 'Please Pick a Date', trigger: 'change' },
        ],
      }
      const wethBalance = await this.$sdk.getBalance({
        address: process.env.VUE_APP_WETH
      }, this.user.coinbase)
      console.log(wethBalance)
      if (new BigNumber(wethBalance).isLessThan(0.0000000000000001)) {
        this.$tools.message('No Enough Balance Of WETH');
        return
      }
      this.makeOfferType = makeOfferType
      this.tokenInfo.tokenId = parseInt(this.tokenInfo.tokenId)
      this.isShowMakeOfferDialog = true
      this.serviceFee = this.tokenInfo.ckCollectionsInfoEntity.royalty / 1000 + '%'
      console.log(this.tokenInfo)
    },
    async makerBuyer () {
      if (!this.form.price || new BigNumber(this.form.price).isLessThan(0)) {
        this.$tools.message('请输入正确的价格');
        return
      }
      const wethBalance = await this.$sdk.getBalance({
        address: process.env.VUE_APP_WETH
      }, this.user.coinbase)
      if (new BigNumber(this.$sdk.fromWeiNum(wethBalance)).isLessThan(this.form.price)) {
        this.$tools.message('No Enough Balance Of WETH');
        return
      }
      if (!this.form.time) {
        this.$tools.message('请选择过期时间');
        return
      }
      this.btnMakeOfferLoading = true
      let buyer = null
      if (this.makeOfferType === 1) { // 单个nft报价
        buyer = this.$sdk.makeOrder({
          exchangeAddress: process.env.VUE_APP_MARKET_EXCHANGE,
          sender: this.user.coinbase,
          nftAddress:  this.tokenInfo.contract,
          side: 0,
          tokenId: this.tokenInfo.tokenId,
          feeRecipient: this.tokenInfo.ckCollectionsInfoEntity.feeContract,
          RelayerFee: this.tokenInfo.ckCollectionsInfoEntity.royalty,
          feeType: 2,
          contractType: this.tokenInfo.contractType,
          value: Number(this.form.quantity)
        })
      } else { // 集合报价
        buyer = this.$sdk.makeOrder({
          exchangeAddress: process.env.VUE_APP_MARKET_EXCHANGE,
          sender: this.user.coinbase,
          nftAddress:  this.tokenInfo.contract,
          side: 0,
          tokenId: 0,
          isMaker: true,
          feeRecipient: this.tokenInfo.ckCollectionsInfoEntity.feeContract,
          RelayerFee: this.tokenInfo.ckCollectionsInfoEntity.royalty,
          feeType: 2,
          contractType: this.tokenInfo.contractType,
          value: Number(this.form.quantity)
        })
      }
      buyer = {
        ...buyer,
        ...{
          // makerRelayerFee: 0,                          // 版税
          // takerRelayerFee: 100,                        // 版税
          // makerProtocolFee: 0,                         // 手续费
          // takerProtocolFee: 100,                       // 手续费
          expirationTime: new Date(this.form.time).getTime() / 1000,
          // expirationTime: 0,
          paymentToken: process.env.VUE_APP_WETH,
          listingTime: Date.parse(new Date().toString()) / 1000 - 600,
          basePrice: this.$Web3.utils.toWei(this.form.price)
        }
      }
      const sigBuyer = await this.$sdk.signature(buyer, this.user.coinbase)
      if (typeof sigBuyer == "object" && sigBuyer.error) {
        this.btnMakeOfferLoading = false
        return
      }
      const hashToSign = await this.$sdk.callhashToSign_(buyer)
      if (typeof hashToSign == "object" && hashToSign.error) {
        this.btnMakeOfferLoading = false
        return
      }
      buyer = {
        ...buyer,
        ...{
          hash: hashToSign,
          tokenId: this.makeOfferType === 1 ? this.tokenInfo.tokenId : 0,
          contract: this.tokenInfo.contract,
          v: sigBuyer.v,
          r: sigBuyer.r,
          s: sigBuyer.s,
          sign: JSON.stringify(sigBuyer),
          amount: this.tokenInfo.contractType === 1 ? Number(this.form.quantity) : 1
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
        if (typeof approve == "object" && approve.error) {
          this.btnMakeOfferLoading = false
          return
        }
        const allowancePayToken1 = await this.$sdk.allowancePayToken({
          type: 5,
          address: process.env.VUE_APP_WETH
        }, this.user.coinbase, process.env.VUE_APP_MARKET_TOKEN_TRANSFER_PROXY)
        console.log(parseFloat(allowancePayToken1))
      }
      this.$api("order.orderAuction", buyer).then((res) => {
        this.btnMakeOfferLoading = false
        if (res.code === 200) {
          this.isShowMakeOfferDialog = false
          this.$tools.message(this.makeOfferType === 1 ? '报价成功' : '集合报价成功', 'success');
          this.$emit('makeOfferSuccess', res)
        } else {
          this.$tools.message(res.message);
        }
      }).catch(e => {
        this.$tools.message(e.message || e);
        this.btnMakeOfferLoading = false
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
