<template>
  <div class="main-wrapper">
    <div class="flex-center">
      <div class="page-left">
        <div class="detail-img-box">
          <image-box :src="tokenInfo.ckCollectionsInfoEntity.image"></image-box>
        </div>
        <div class="card-wrap mt30">
          <div class="card-head">
            <img class="icon" src="@/assets/images/icons/icon_properties.svg" alt="">
            <span class="card-title">Properties</span>
            <el-icon class="down">
              <ArrowUp />
            </el-icon>
          </div>
          <div class="card-body">
            <div class="arrt-list">
              <div class="arrt-item">
                <p class="attr-name">Background</p>
                <p class="attr-value">New Punk Blue</p>
                <div class="attr-bottom">
                  <span class="attr-num">1,232(12.32%)</span>
                  <div class="attr-price">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    <span class="value">530.73</span>
                  </div>
                </div>
              </div>
              <div class="arrt-item">
                <p class="attr-name">Clothes</p>
                <p class="attr-value">Lumberjack Shirt</p>
                <div class="attr-bottom">
                  <span class="attr-num">1,232(12.32%)</span>
                  <div class="attr-price">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    <span class="value">530.73</span>
                  </div>
                </div>
              </div>
              <div class="arrt-item">
                <p class="attr-name">Eyes</p>
                <p class="attr-value">X Eyes</p>
                <div class="attr-bottom">
                  <span class="attr-num">1,232(12.32%)</span>
                  <div class="attr-price">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    <span class="value">530.73</span>
                  </div>
                </div>
              </div>
              <div class="arrt-item">
                <p class="attr-name">Fur</p>
                <p class="attr-value">Pink</p>
                <div class="attr-bottom">
                  <span class="attr-num">1,232(12.32%)</span>
                  <div class="attr-price">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    <span class="value">530.73</span>
                  </div>
                </div>
              </div>
              <div class="arrt-item">
                <p class="attr-name">Hat</p>
                <p class="attr-value">Girl's Hair Short</p>
                <div class="attr-bottom">
                  <span class="attr-num">1,232(12.32%)</span>
                  <div class="attr-price">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    <span class="value">530.73</span>
                  </div>
                </div>
              </div>
              <div class="arrt-item">
                <p class="attr-name">Mouth</p>
                <p class="attr-value">Bored</p>
                <div class="attr-bottom">
                  <span class="attr-num">1,232(12.32%)</span>
                  <div class="attr-price">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    <span class="value">530.73</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-wrap mt30">
          <div class="card-head">
            <img class="icon" src="@/assets/images/icons/icon_token.svg" alt="">
            <span class="card-title">Token Details</span>
            <el-icon class="down">
              <ArrowUp />
            </el-icon>
          </div>
          <div class="card-body">
            <div class="flex-detial-list">
              <div class="flex-detial">
                <span class="name">Token ID</span>
                <span class="value primaryColor">{{tokenInfo.tokenId}}</span>
              </div>
              <div class="flex-detial">
                <span class="name">Blockchain</span>
                <span class="value">Ethereum</span>
              </div>
              <div class="flex-detial">
                <span class="name">Token Standard</span>
                <span class="value">ERC721</span>
              </div>
              <div class="flex-detial line">
              </div>
              <div class="flex-detial">
                <span class="name">Contract</span>
                <div class="value display-flex box-center-Y color-purple" @click="$filters.openWindow($filters.contractExplore(tokenInfo.contract).href)">
                  <div>{{$filters.contractExplore(tokenInfo.contract).hashShort}}</div>
                  <div class="share-icon"><img src="../../assets/images/icons/icon_share_purple.svg" alt=""></div>
                </div>

              </div>
              <div class="flex-detial">
                <span class="name">Creator Rebate</span>
                <div class="value primaryColor display-flex box-center-Y">
                  <div>0.5%</div>
                  <div class="tip-icon"><img src="../../assets/images/icons/icon_tip_black.svg" alt=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-right">
        <div class="detail-info">
          <div class="collection-name"><span>{{tokenInfo.ckCollectionsInfoEntity.name}}</span> <img class="tag"
              src="@/assets/images/icons/icon_tag.svg" alt=""></div>
          <div class="globle-floor">
            <span>Globle floor : </span>
            <img class="token-icon" src="@/assets/images/icons/token/token_eth.svg" alt="" />
            <span class="value">{{tokenInfo.ckCollectionsInfoEntity.floorPrice}}</span>
          </div>
          <div class="nft-name">
            <span>{{tokenInfo.ckCollectionsInfoEntity.name}} #{{tokenInfo.tokenId}}</span>
            <div class="icon_shoucang" :class="{active: tokenInfo.followStatus}" alt="" @click="followNft" />
          </div>
          <div class="nft-address">
            <div class="add-item">
              <div class="creator">Creator</div>
              <div class="creator-name">{{$filters.ellipsisAddress(tokenInfo.contract)}}</div>
            </div>
            <div>
              <div class="creator">Current owner</div>
              <div class="creator-name">{{$filters.ellipsisAddress(tokenInfo.ckCollectionsInfoEntity.owner)}}</div>
            </div>
          </div>
          <div class="nft-bid-box">
            <div class="box-flex">
              <div class="box-left">
                <div>Current Price</div>
                <div class="row">
                  <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                  <span class="value">{{nftPrice}}</span>
                </div>
                <div class="row">
                  $45,332,02
                </div>
              </div>
              <div class="box-right">
                <div class="row-item">
                  <img class="icon" src="@/assets/images/icons/icon_time.svg" alt="">
                  <span>Time left</span>
                  <span class="item-value">28d 12h 32m</span>
                </div>
                <div class="row-item">
                  <img class="icon" src="@/assets/images/icons/icon_frame.svg" alt="">
                  <span>Best offer</span>
                  <span class="item-value">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    28.80
                  </span>
                </div>
              </div>
            </div>
            <div class="btn-box display-flex box-center-Y">
              <template v-if="isSelf">
                <el-button type="primary" class="btnBuy" v-if="!tokenInfo.state" :loading="sellDialogBtnLoading"
                  @click="showSellNft">Sell Now</el-button>
                <el-button type="primary" class="btnBuy" v-else :loading="cancelBtnLoading" @click="cancelSell">Cancel
                  Sell</el-button>
              </template>
              <el-button type="primary" class="btnBuy" v-else-if="tokenInfo.state" @click="showBuyNft">Buy Now
              </el-button>
<!--              <el-button class="btnBlack" v-if="!isSelf && !isCart" :disabled="!(!isSelf && !isCart) || !tokenInfo.contract || !tokenInfo.state"-->
              <el-button class="btnBlack" :disabled="!(!isSelf && !isCart) || !tokenInfo.contract || !tokenInfo.state"
                @click="addCart">Add to Cart</el-button>
              <el-button class="btnWhite" v-if="!isSelf" :disabled="!tokenInfo.contract" @click="showMakeOfferNFT">Make
                Offer</el-button>
              <el-button class="btnWhite" v-if="!isSelf" :disabled="!tokenInfo.contract" @click="showMakeOfferCollect">
                Make Offer Collect</el-button>
<!--              <el-button v-if="isSelf && ckAuctionEntityList.length > 0" class="btnWhite"-->
<!--                :loading="acceptDialogBtnLoading" @click="showAcceptOfferNFT">Accept</el-button>-->
<!--              <el-button v-if="isSelf && ckAuctionEntityList.length > 0" class="btnWhite"-->
<!--                :loading="acceptDialogBtnLoading" @click="showAcceptOfferCollect">Accept Collect</el-button>-->
            </div>
          </div>
        </div>
        <div class="card-wrap mt30">
          <div class="card-head">
            <img class="icon" src="@/assets/images/icons/icon_pricehistory.svg" alt="">
            <span class="card-title">Price History</span>
            <el-icon>
              <ArrowUp />
            </el-icon>
          </div>
          <div class="card-body" style="height:200px">

          </div>
        </div>
        <div class="card-wrap mt30">
          <div class="card-head">
            <img class="icon" src="@/assets/images/icons/icon_offers.svg" alt="">
            <span class="card-title">Offers</span>
            <el-icon class="down">
              <ArrowUp />
            </el-icon>
          </div>
          <div class="card-body" style="height:480px;padding:0;overflow: auto;">
            <div class="offer-list">
              <div class="list-tr head">
                <div class="list-th th25">Price</div>
                <div class="list-th th25">Exporation</div>
                <div class="list-th th25">From</div>
                <div class="list-th th25 center">Status</div>
              </div>

              <div class="list-tr" v-for="(v, i) of ckAuctionEntityList" :key="`make-offer-${i}`">
                <div class="list-th th25">
                  <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                  {{nftPrice(v.basePrice)}}
                </div>
                <div class="list-th th25">about 22 hours</div>
                <div class="list-th th25 purple">{{$filters.ellipsisAddress(v.maker, 4)}}</div>
                <div class="list-th th25 center">
                  <el-button type="primary" class="btnAccept" :disabled="!isSelf" :loading="acceptDialogBtnLoading" @click="showAcceptOfferNFT(v)">Accept</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-wrap mt30 activity-wrap">
      <div class="card-head">
        <img class="icon" src="@/assets/images/icons/icon_pricehistory.svg" alt="">
        <span class="card-title">Item Activity</span>
        <el-icon>
          <ArrowUp />
        </el-icon>
      </div>
      <div class="card-body" style="height:580px;padding:0;">
        <div class="filter-box">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="Sales" />
            <el-checkbox label="Listings" />
            <el-checkbox label="Offers" />
            <el-checkbox label="Collection offers" />
            <el-checkbox label="Transfers" />
          </el-checkbox-group>
        </div>
        <div class="offer-list">
          <div class="list-tr head">
            <div class="list-th" style="width:20%">Event</div>
            <div class="list-th" style="width:20%">Price</div>
            <div class="list-th" style="width:20%">From</div>
            <div class="list-th" style="width:20%">To</div>
            <div class="list-th" style="width:20%">Date</div>
          </div>

          <div class="list-tr" v-for="i of 20" :key="i">
            <div class="list-th" style="width:20%">
              Transfer
            </div>
            <div class="list-th" style="width:20%">0.065 ETH</div>
            <div class="list-th " style="width:20%">Hayiyi</div>
            <div class="list-th " style="width:20%">Hayiyi</div>
            <div class="list-th " style="width:20%">21 days ago</div>
          </div>
        </div>
      </div>
    </div>
    <NFTDialogBuy ref="NFTDialogBuy" @buySuccess="buySuccess"></NFTDialogBuy>
    <NFTDialogSell ref="NFTDialogSell" @sellCreateSuccess="sellCreateSuccess"></NFTDialogSell>
    <NFTDialogMakeOffer ref="NFTDialogMakeOffer" @makeOfferSuccess="makeOfferSuccess"></NFTDialogMakeOffer>
    <NFTDialogAcceptOffer ref="NFTDialogAcceptOffer" @acceptOfferSuccess="acceptOfferSuccess" />

  </div>
</template>

<script>
import NFTDialogSell from '../../components/self/NFTDialogSell'
import NFTDialogMakeOffer from '../../components/self/NFTDialogMakeOffer'
import NFTDialogAcceptOffer from '../../components/self/NFTDialogAcceptOffer'

import NFTDialogBuy from '../../components/self/NFTDialogBuy'
import { setLocalStorage, getLocalStorage, removeLocalStorage } from "@/util/local-storage";

export default {
  name: "NFTDetail",
  components: {
    NFTDialogSell,
    NFTDialogBuy,
    NFTDialogMakeOffer,
    NFTDialogAcceptOffer
  },
  mixins: [],
  data () {
    return {
      buyBtnLoading: false,
      cancelBtnLoading: false,
      sellDialogBtnLoading: false,
      acceptDialogBtnLoading: false,
      checkList: [],
      form: {
        price: '',
        date: '',
        time: ''
      },
      rules: {
        price: [
          { required: true, message: 'Please input price', trigger: 'blur' },
        ],
      },
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        }
      ],
      tokenInfo: {
        contract: '',
        tokenId: '',
        ckCollectionsInfoEntity: {
          bannerImage: '',
          image: ''
        }
      },
      tokenInfoParams: {
        contract: '',
        tokenId: ''
      },
      ckAuctionEntityList: [],
      isCart: false,
      nftPrice: '--',
    };
  },
  created () {
    this.tokenInfoParams = {
      contract: this.$route.params.contract,
      tokenId: this.$route.params.tokenId
    }
  },
  mounted () {
    this.getTokenInfo()
    this.isInCart()
  },
  computed: {
    user () {
      console.log(this.$store.state.user)
      return this.$store.state.user;
    },
    cartName () {
      return `coresky_cart_${this.$store.state.user.coinbase}`
    },
    isSelf () {
      return this.tokenInfo.address && this.user.coinbase && this.tokenInfo.address.toLowerCase() === this.user.coinbase.toLowerCase()
    },
  },
  methods: {
    isInCart () {
      const local = getLocalStorage(this.cartName)
      console.log(local[this.cartName])
      let coresky_cart = local[this.cartName]
      if (local[this.cartName] !== null) {
        coresky_cart = JSON.parse(coresky_cart)
        const token = coresky_cart.find(item => item.contract === this.tokenInfo.contract && item.tokenId === this.tokenInfo.tokenId)
        console.log(token)
        this.isCart = token !== undefined
      } else {
        coresky_cart = []
        this.isCart = false
      }
    },
    getTokenInfo () {
      this.$api("collect.tokenInfo", this.tokenInfoParams).then((res) => {
        this.tokenInfo = res.debug
        // this.tokenInfo.ckCollectionsInfoEntity.floorPrice = '0.02'
        this.ckAuctionEntityList = this.tokenInfo.ckAuctionEntityList || []
        this.nftPrice = this.$sdk.fromWeiNum(this.tokenInfo.ckOrdersEntity.basePrice)
        this.isInCart()
      })
    },
    showSellNft () {
      this.sellDialogBtnLoading = true
      this.$refs.NFTDialogSell.showSell(this.tokenInfo)
    },
    async cancelSell () {
      this.cancelBtnLoading = true
      let seller = this.$sdk.getAtomicMatchWrapOrder(this.tokenInfo.ckOrdersEntity, false)
      seller = {
        ...seller,
        ...{
          basePrice: seller.basePrice.toString(),
          v: this.tokenInfo.ckOrdersEntity.v,
          s: this.tokenInfo.ckOrdersEntity.s,
          r: this.tokenInfo.ckOrdersEntity.r
        }
      }
      try {
        const hash = await this.$sdk.cancelOrder_(seller, this.user.coinbase);
        console.log(hash)
        this.$api("order.cancel", {
          id: this.tokenInfo.ckOrdersEntity.id
        }).then((res) => {
          this.cancelBtnLoading = false
          this.$tools.message('已取消挂售', 'success');
          this.getTokenInfo()
        })
      } catch (e) {
        console.log(e)
        this.cancelBtnLoading = false
      }
    },
    showBuyNft () {
      this.$refs.NFTDialogBuy.showBuy(this.tokenInfo)
    },
    nftPrice (basePrice) {
      return this.$Web3.utils.fromWei(basePrice.toString())
    },
    // 添加购物车
    addCart () {
      const local = getLocalStorage(this.cartName)
      console.log(local[this.cartName])
      let coresky_cart = local[this.cartName]
      if (local[this.cartName] !== null) {
        coresky_cart = JSON.parse(coresky_cart)
      } else {
        coresky_cart = []
      }
      console.log(coresky_cart)
      coresky_cart.push(this.tokenInfo)
      const obj = {}
      obj[this.cartName] = JSON.stringify(coresky_cart)
      setLocalStorage(obj)
      this.isInCart()
    },
    showMakeOfferNFT () {
      this.$refs.NFTDialogMakeOffer.showMakeOffer(this.tokenInfo)
    },
    showMakeOfferCollect () {
      this.$refs.NFTDialogMakeOffer.showMakeOffer(this.tokenInfo, 2)
    },
    sellCreateSuccess (v) {
      console.log(v)
      this.getTokenInfo()
    },
    buySuccess (v) {
      console.log(v)
      this.getTokenInfo()
    },
    makeOfferSuccess (v) {
      console.log(v)
      this.getTokenInfo()
    },
    acceptOfferSuccess (v) {
      console.log(v)
      this.getTokenInfo()
    },
    showAcceptOfferNFT (v) {
      this.acceptDialogBtnLoading = true
      this.$refs.NFTDialogAcceptOffer.show(this.tokenInfo, v, v.tokenId === '0' ? 2 : 1)
    },
    followNft () {
      if (!this.tokenInfo.contract || !this.tokenInfo.tokenId) return
      const tokenColloctUrl = this.tokenInfo.followStatus ? "collect.tokenCancel" : "collect.tokenFollow"
      this.$api(tokenColloctUrl, {
        "contract": this.tokenInfo.contract,
        "tokenId": this.tokenInfo.tokenId
      }).then((res) => {
        this.tokenInfo.followStatus = !this.tokenInfo.followStatus
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.main-wrapper {
  padding: 40px 0;
  margin-bottom: 20px;
  .flex-center {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
  .page-left {
    width: 468px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .detail-img-box {
      border-radius: 20px;
      height: 468px;
      .cover-image {
        width: 100%;
        height: 100%;
        border-radius: 20px;
      }
    }
  }
  .page-right {
    width: 708px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .collection-name {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      background: $mainLiner;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      .tag {
        margin-left: 5px;
        vertical-align: middle;
        display: inline-block;
        width: 16px;
        height: 16px;
      }
    }
    .globle-floor {
      margin-top: 16px;
      font-weight: 400;
      font-size: 12px;
      color: $color-black2;
      display: flex;
      align-items: center;
      .token-icon {
        margin-left: 5px;
        width: 14px;
        height: 18px;
      }
      .value {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: $primaryColor;
      }
    }
    .nft-name {
      margin-top: 8px;
      font-weight: 700;
      font-size: 32px;
      line-height: 41px;
      color: $primaryColor;
      .icon_shoucang {
        margin-left: 16px;
        display: inline-block;
        width: 24px;
        height: 24px;
        cursor: pointer;
        background-image: url('@/assets/images/icons/icon_shoucang.svg');
        &.active,
        &:hover {
          background-image: url('@/assets/images/icons/icon_shoucang_active.svg');
        }
      }
    }
    .nft-address {
      margin-top: 16px;
      display: flex;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: $color-black3;
      .add-item {
        margin-right: 24px;
      }
      .creator-name {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        color: $primaryColor;
      }
    }
    .nft-bid-box {
      display: flex;
      margin-top: 24px;
      flex-direction: column;
      padding: 24px;
      border: 1px solid $borderBg;
      border-radius: 20px;
      font-size: 14px;
      color: $color-black2;

      .box-flex {
        width: 100%;
        display: flex;
        flex-direction: row;
      }
      .box-left {
        margin-right: 24px;
        width: 318px;
        padding: 16px;
        background: $elButtonHoverBg;
        border-radius: 8px;
        line-height: 24px;
        .row {
          margin-top: 8px;
        }
        .token-icon {
          display: inline-block;
          width: 15px;
          height: 24px;
        }
        .value {
          margin-left: 5px;
          font-size: 22px;
          line-height: 28px;
          font-weight: 600;
          // display: inline-block;
          color: $primaryColor;
        }
      }
      .box-right {
        flex-grow: 1;
        // margin-left: 24px;
        .row-item {
          display: flex;
          align-items: center;
          padding: 16px;
          height: 56px;
          background: $elButtonHoverBg;
          border-radius: 8px;
          line-height: 24px;
          &:first-child {
            margin-bottom: 10px;
          }
          .icon {
            margin-right: 6px;
            width: 20px;
            height: 20px;
          }
          .item-value {
            margin-left: 12px;
            font-weight: 700;
            font-size: 14px;
            color: $primaryColor;
            .token-icon {
              width: 10px;
              height: 16px;
              margin-right: 3px;
              display: inline-block;
              vertical-align: sub;
            }
          }
        }
      }
      .btn-box {
        margin-top: 24px;
        button {
          width: 210px;
          height: 48px;
          padding: 10px 0;
          border-radius: 12px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          &.btnBuy {
            color: $color-white;
            background: $mainLiner;
          }
          &.btnBlack {
            color: $color-white;
            background: $primaryColor;
          }
          &.btnWhite {
            color: $primaryColor;
            background: $color-white;
            border: 1px solid $primaryColor;
          }
          // &:hover {
          //   opacity: 0.8;
          // }
        }
      }
    }
  }
  .card-wrap {
    border-radius: 20px;
    border: 1px solid $color-black2;
    background: $bg-white;
    overflow: hidden;
    .card-head {
      display: flex;
      align-items: center;
      padding: 10px 24px;
      background: $elButtonHoverBg;
      .icon {
        width: 24px;
        height: 24px;
      }
      .card-title {
        margin-left: 10px;
        font-weight: 700;
        font-size: 16px;
      }
      .el-icon {
        cursor: pointer;
        font-size: 15px;
        margin-left: 5px;
        margin-left: auto;
        &.down {
          transform: rotate(180deg);
        }
      }
    }
    .card-body {
      padding: 24px;
      background: $bg-white;
    }
  }
  .arrt-list {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 18px;
    .arrt-item {
      width: 200px;
      padding: 12px;
      color: $color-black3;
      background: $elButtonHoverBg;
      border-radius: 16px;
      .attr-value {
        color: $primaryColor;
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        margin-top: 4px;
      }
      .attr-bottom {
        display: flex;
        margin-top: 18px;
        justify-content: space-between;
        .attr-num {
          font-weight: 400;
          font-size: 12px;
        }
        .token-icon {
          vertical-align: sub;
          display: inline-block;
          margin-right: 5px;
          width: 10px;
          height: 16px;
        }
      }
    }
  }
  .flex-detial-list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 24px;
    .flex-detial {
      display: flex;
      justify-content: space-between;
      height: 21px;
      line-height: 21px;
      font-weight: 500;
      font-size: 14px;
      color: $color-black3;
      cursor: pointer;
      &.line {
        height: 1px;
        background: $borderBg;
      }
    }
  }
  .offer-list {
    position: relative;
    .list-tr {
      display: flex;
      padding: 8px 15px 8px 20px;
      line-height: 40px;
      border-bottom: 1px solid $borderBg;
      color: $color-black3;
      font-size: 14px;
      &.head {
        position: sticky;
        left: 0;
        top: 0;
        height: 56px;
        width: 100%;
        font-size: 12px;
        background: $bg-white;
        font-weight: 600;
      }
      &.placeholder {
        height: 56px;
      }
    }
    .purple {
      color: $bgPurple;
    }
    .th1 {
      width: 25%;
      color: $primaryColor;
      font-weight: 500;
      font-size: 14px;
      .token-icon {
        display: inline-block;
        vertical-align: sub;
        width: 10px;
        height: 16px;
        margin-right: 2px;
      }
    }
    .th25 {
      width: 25%;
      &.center{
        text-align: center;
      }
      .token-icon {
        display: inline-block;
        vertical-align: sub;
        width: 10px;
        height: 16px;
        margin-right: 2px;
      }
    }
    .btnAccept {
      width: 80px;
      height: 30px;
      padding: 10px 0;
      border-radius: 12px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      color: $color-white;
      background: $mainLiner;
    }
  }
  .activity-wrap {
    .card-head {
      border: 1px solid $borderBg;
    }
    .el-checkbox-group {
      padding-top: 15px;
      padding-left: 15px;
      .el-checkbox {
        // font-weight: 600;
      }
    }
    .filter-box {
      background: $elButtonHoverBg;
      height: 56px;
    }
  }
}
</style>

