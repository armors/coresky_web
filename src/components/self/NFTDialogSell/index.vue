<template>
  <el-dialog :model-value="isShowSellDialog" :show-close="false" :close-on-click-modal="false" @closed="closed"
    custom-class="custom-dialog" destroy-on-close>
    <template #title>
      <div class="left">
        <span>Sell NFT</span>
      </div>
      <el-icon @click="isShowSellDialog=false">
        <Close />
      </el-icon>
    </template>
    <div class="nft-box">
      <image-box class="img-box" :src="tokenInfo.oriImage"></image-box>
      <div class="box-center">
        <span class="tokenid">#{{tokenInfo.tokenId}}</span>
        <span class="collection-name">{{tokenInfo.name || '--'}}
          <img class="tag" v-if="tokenInfo.ckCollectionsInfoEntity.isCertification === '1'" src="@/assets/images/icons/icon_tag.svg" alt="">
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
      <el-form-item :label="`Quantity (Available:  ${nftAmount1155})`" prop="quantity" v-if="tokenInfo.contractType === 1">
        <div class="flex-content">
          <el-input v-model="form.quantity" size="large" style="width:100%;" />
          <el-button @click="form.quantity = nftAmount1155" type="primary" class="btnBuy ml20" style="width:180px;flex-shrink: 0;margin-top: 0" >MAX</el-button>
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
<!--      <el-form-item label="Fee and coupons">-->
<!--        <div class="describe-box">-->
<!--          <div class="describe-item">-->
<!--            <span class="lable">Coeesky service fee: </span>-->
<!--            <span class="value">0.5%</span>-->
<!--          </div>-->
<!--          <div class="describe-item mt15">-->
<!--            <span class="lable">coupon rewards:</span>-->
<!--            <div class="value">-->
<!--              <p>-->
<!--                1 coupon / 0.5 ETH-->
<!--              </p>-->
<!--              <p>1 coupon / listing / day</p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-form-item>-->
    </el-form>
    <el-button type="primary" class="btnBuy" :loading="sellBtnLoading" v-if="isApproved" @click="getExchangeHashOrder">
      Sell NFT</el-button>
    <el-button type="primary" class="btnBuy" :loading="sellBtnLoading" v-else @click="setApproveAll">Approve NFT
    </el-button>
  </el-dialog>
</template>

<script>
import BigNumber from "bignumber.js";
import tools from "@/util/tools";
import i18n from "@/i18n/i18n";
import { ethers } from 'ethers'
import dayjs from 'dayjs';

export default {
  name: "index",
  data () {
    return {
      nftAmount1155: 0,
      isShowSellDialog: false,
      sellBtnLoading: false,
      form: {
        price: '',
        date: '',
        time: '',
        symbol: 'ETH',
        quantity: ''
      },
      rules: null,
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
      isApproved: true,
      registryOwner: '',
      defaultTime: new Date()
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
    async showSell (tokenInfo) {
      this.isShowSellDialog = true
      this.tokenInfo = tokenInfo
      this.tokenInfo.tokenId = parseInt(this.tokenInfo.tokenId)
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
      console.log(this.tokenInfo)
      try {
        if (this.tokenInfo.contractType === 1) {
          const amount = await this.$sdk.getERC1155Amount(this.tokenInfo.contract, this.tokenInfo.tokenId, this.user.coinbase)
          console.log(amount)
          if (typeof amount == 'object' && amount.error) {
            this.$parent.sellDialogBtnLoading = false
            return
          }
          this.nftAmount1155 = amount
        }
        await this.getRegistryOwner()
        console.log(this.tokenInfo.contractType)
        let order = {
          type: this.tokenInfo.contractType === 0 ? "IERC721" : "IERC1155",
          address: this.tokenInfo.contract,
          tokenId: this.tokenInfo.tokenId,
        };
        console.log(order)
        this.isApproved = await this.$sdk.isApprovedForAll(
          order,
          this.user.coinbase,
          this.registryOwner,
        );
        this.isShowSellDialog = true
        this.$parent.sellDialogBtnLoading = false
      } catch (e) {
        console.log(e)
        this.$parent.sellDialogBtnLoading = false
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
        type: this.tokenInfo.contractType === 0 ? "IERC721" : "IERC1155",
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
      this.sellBtnLoading = true
      if (!isApproved) {
        let result = await this.$sdk.setApprovalForAll(
          order,
          this.user.coinbase,
          this.registryOwner,
          true
        );
        if (typeof result == "object" && result.error) {
          return result;
        }
        this.isApproved = await this.$sdk.isApprovedForAll(
          order,
          this.user.coinbase,
          this.registryOwner,
        );
        this.sellBtnLoading = false
        console.log(result)
      } else {
        console.log('true')
      }
      // return result;
    },
    // 挂单
    async getExchangeHashOrder () {
      console.log(this.form.price)
      console.log()
      if (!this.form.price || new BigNumber(this.form.price).isLessThan(0)) {
        this.$tools.message('请输入正确的价格');
        return
      }
      if (!this.form.time) {
        this.$tools.message('请选择过期时间');
        return
      }
      console.log(typeof this.tokenInfo.tokenId)
      this.sellBtnLoading = true
      let seller = this.$sdk.makeOrder({
        exchangeAddress: process.env.VUE_APP_MARKET_EXCHANGE,
        sender: this.user.coinbase,
        nftAddress:  this.tokenInfo.contract,
        side: 1,
        tokenId: this.tokenInfo.tokenId,
        feeRecipient: this.tokenInfo.ckCollectionsInfoEntity.feeContract,
        RelayerFee: this.tokenInfo.ckCollectionsInfoEntity.royalty,
        contractType: this.tokenInfo.contractType,
        value: Number(this.form.quantity)
      })
      seller.expirationTime = new Date(this.form.time).getTime() / 1000;
      // seller.expirationTime = 0;
      seller.listingTime = Date.parse(new Date().toString()) / 1000 - 600;
      seller.basePrice = this.$Web3.utils.toWei(this.form.price);
      // console.log(this.$Web3.utils.toWei(this.form.price))
      // console.log(ethers)
      // seller.basePrice = ethers.BigNumber.from(this.$Web3.utils.toWei(this.form.price));
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
      // const hash = await this.$sdk.callhashOrder_(arrayParams);
      try {
        const hashToSign = await this.$sdk.callhashToSign_(seller)
        if (typeof hashToSign == "object" && hashToSign.error) {
          this.sellBtnLoading = false
          return
        }
        console.log(seller)
        console.log()
        const sig = await this.$sdk.signature(seller, this.user.coinbase)
        if (typeof sig == "object" && sig.error) {
          this.sellBtnLoading = false
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
        // const resvalidateOrder_ = await this.$sdk.validateOrder_(validateOrderArrayParams)
        // console.log(resvalidateOrder_)
        const orderParams = {
          ...seller,
          ...{
            tokenId: this.tokenInfo.tokenId,
            contract: this.tokenInfo.contract,
            type: this.$sdk.valueOrderType("SALE"),
            v: sig.v,
            r: sig.r,
            s: sig.s,
            hash: hashToSign,
            sign: JSON.stringify(sig),
            basePrice: this.$Web3.utils.toWei(this.form.price),
            amount: this.tokenInfo.contractType === 1 ? Number(this.form.quantity) : 1
          }
        }
        console.log(orderParams)
        // this.nftToBuy = orderParams
        this.$api("order.create", orderParams).then((res) => {
          this.sellBtnLoading = false
          if (res.code === 200) {
            this.isShowSellDialog = false
            this.$tools.message('挂售成功', 'success');
            this.$emit('sellCreateSuccess', res)
          } else {
            this.$tools.message(res.message);
          }
        }).catch(e => {
          this.$tools.message(e.message || e);
          this.sellBtnLoading = false
        })
      } catch (e) {
        console.log(e)
        this.sellBtnLoading = false
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
