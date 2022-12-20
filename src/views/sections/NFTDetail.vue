<template>
  <div class="main-wrapper nft-detail">
    <div class="flex-center">
      <div class="page-left">
        <div class="detail-img-box">
          <image-box :src="tokenInfo.oriImage"></image-box>
        </div>
        <div class="card-wrap mt30">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="Consistency" name="1">
              <template #title>
                <div class="card-head">
                  <img class="icon" src="@/assets/images/icons/icon_properties.svg" alt="">
                  <span class="card-title">Properties</span>
<!--                  <el-icon class="down">-->
<!--                    <ArrowUp />-->
<!--                  </el-icon>-->
                </div>
              </template>
<!--              <div class="card-body no-scroller" style="height: 392px;overflow: auto;">-->
              <div class="card-body" style="min-height: 392px;">
                <div class="arrt-list">
                  <div class="arrt-item" v-for="(v, i) in tokenInfo.attributeResList" :key="`attr-item-${i}`">
                    <p class="attr-name">{{v.type}}</p>
                    <p class="attr-value">{{v.value}}</p>
                    <div class="attr-bottom">
                      <span class="attr-num">{{$filters.milliFormat(v.count)}}({{v.percent}}%)</span>
                      <div class="attr-price">
                        <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                        <span class="value">{{v.price}}</span>
                      </div>
                    </div>
                  </div>
                  <!--              <div class="arrt-item">-->
                  <!--                <p class="attr-name">Clothes</p>-->
                  <!--                <p class="attr-value">Lumberjack Shirt</p>-->
                  <!--                <div class="attr-bottom">-->
                  <!--                  <span class="attr-num">1,232(12.32%)</span>-->
                  <!--                  <div class="attr-price">-->
                  <!--                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />-->
                  <!--                    <span class="value">530.73</span>-->
                  <!--                  </div>-->
                  <!--                </div>-->
                  <!--              </div>-->
                  <!--              <div class="arrt-item">-->
                  <!--                <p class="attr-name">Eyes</p>-->
                  <!--                <p class="attr-value">X Eyes</p>-->
                  <!--                <div class="attr-bottom">-->
                  <!--                  <span class="attr-num">1,232(12.32%)</span>-->
                  <!--                  <div class="attr-price">-->
                  <!--                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />-->
                  <!--                    <span class="value">530.73</span>-->
                  <!--                  </div>-->
                  <!--                </div>-->
                  <!--              </div>-->
                  <!--              <div class="arrt-item">-->
                  <!--                <p class="attr-name">Fur</p>-->
                  <!--                <p class="attr-value">Pink</p>-->
                  <!--                <div class="attr-bottom">-->
                  <!--                  <span class="attr-num">1,232(12.32%)</span>-->
                  <!--                  <div class="attr-price">-->
                  <!--                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />-->
                  <!--                    <span class="value">530.73</span>-->
                  <!--                  </div>-->
                  <!--                </div>-->
                  <!--              </div>-->
                  <!--              <div class="arrt-item">-->
                  <!--                <p class="attr-name">Hat</p>-->
                  <!--                <p class="attr-value">Girl's Hair Short</p>-->
                  <!--                <div class="attr-bottom">-->
                  <!--                  <span class="attr-num">1,232(12.32%)</span>-->
                  <!--                  <div class="attr-price">-->
                  <!--                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />-->
                  <!--                    <span class="value">530.73</span>-->
                  <!--                  </div>-->
                  <!--                </div>-->
                  <!--              </div>-->
                  <!--              <div class="arrt-item">-->
                  <!--                    <p class="attr-name">Mouth</p>-->
                  <!--                    <p class="attr-value">Bored</p>-->
                  <!--                    <div class="attr-bottom">-->
                  <!--                      <span class="attr-num">1,232(12.32%)</span>-->
                  <!--                      <div class="attr-price">-->
                  <!--                        <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />-->
                  <!--                    <span class="value">530.73</span>-->
                  <!--                  </div>-->
                  <!--                </div>-->
                  <!--              </div>-->
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="card-wrap mt30">
          <el-collapse v-model="activeName1" accordion>
            <el-collapse-item title="Consistency" name="1">
              <template #title>
                <div class="card-head">
                  <img class="icon" src="@/assets/images/icons/icon_token.svg" alt="">
                  <span class="card-title">Token Details</span>
<!--                  <el-icon class="down">-->
<!--                    <ArrowUp />-->
<!--                  </el-icon>-->
                </div>
              </template>
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
                      <el-tooltip
                        placement="right"
                      >
                        <template #content> The creator of this collection will receive a certain <br> percentage of amout for every sale. </template>
                        <div class="display-flex box-center-Y">
                          <div>0.5%</div>
                          <div class="tip-icon"><img src="../../assets/images/icons/icon_tip_black.svg" alt=""></div>
                        </div>
                      </el-tooltip>

                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>

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
              <div class="creator-name">{{$filters.ellipsisAddress(tokenInfo.ckCollectionsInfoEntity.owner)}}</div>
            </div>
            <div>
              <div class="creator">Current owner</div>
              <div class="creator-name">{{$filters.ellipsisAddress(tokenInfo.address)}}</div>
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
                  <span class="item-value">{{countDownTime}}</span>
                </div>
                <div class="row-item">
                  <img class="icon" src="@/assets/images/icons/icon_frame.svg" alt="">
                  <span>Best offer</span>
                  <span class="item-value">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    {{bestPrice}}
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
              <el-button class="btnWhite" v-if="!isSelf && !this.isMakeOffer" :disabled="!tokenInfo.contract" @click="showMakeOfferNFT">Make
                Offer</el-button>
              <el-button class="btnWhite" v-if="!isSelf && !this.isMakeOffer" :disabled="!tokenInfo.contract" @click="showMakeOfferCollect">
                Make Offer Collect</el-button>
<!--              <el-button v-if="isSelf && ckAuctionEntityList.length > 0" class="btnWhite"-->
<!--                :loading="acceptDialogBtnLoading" @click="showAcceptOfferNFT">Accept</el-button>-->
<!--              <el-button v-if="isSelf && ckAuctionEntityList.length > 0" class="btnWhite"-->
<!--                :loading="acceptDialogBtnLoading" @click="showAcceptOfferCollect">Accept Collect</el-button>-->
            </div>
          </div>
        </div>
        <div class="card-wrap mt30">
          <el-collapse v-model="activeName2" accordion>
            <el-collapse-item title="Consistency" name="1">
              <template #title>
                <div class="card-head">
                  <img class="icon" src="@/assets/images/icons/icon_pricehistory.svg" alt="">
                  <span class="card-title">Price History</span>
<!--                  <el-icon>-->
<!--                    <ArrowUp />-->
<!--                  </el-icon>-->
                </div>
              </template>
              <div class="card-body" style="height:200px">
              </div>
            </el-collapse-item>
          </el-collapse>


        </div>
        <div class="card-wrap mt30">
          <el-collapse v-model="activeName3" accordion>
            <el-collapse-item title="Consistency" name="1">
              <template #title>
                <div class="card-head">
                  <img class="icon" src="@/assets/images/icons/icon_offers.svg" alt="">
                  <span class="card-title">Offers</span>
<!--                  <el-icon class="down">-->
<!--                    <ArrowUp />-->
<!--                  </el-icon>-->
                </div>
              </template>
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
                      {{nftPriceFun(v.basePrice)}}
                    </div>
                    <div class="list-th th25">about 22 hours</div>
                    <div class="list-th th25 purple">{{$filters.ellipsisAddress(v.maker, 4)}}</div>
                    <div class="list-th th25 center">
                      <el-button type="primary" class="btnAccept" v-if="isSelfMakeOffer(v)" :loading="cancelMakeOfferBtnLoading" @click="cancelMakeOffer(v)">Cancel</el-button>
                      <el-button type="primary" class="btnAccept" v-else :disabled="!isSelf" :loading="acceptDialogBtnLoading" @click="showAcceptOfferNFT(v)">Accept</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>

    <div class="card-wrap mt30 activity-wrap">
      <el-collapse v-model="activeName4" accordion>
        <el-collapse-item title="Consistency" name="1">
          <template #title>
            <div class="card-head">
              <img class="icon" src="@/assets/images/icons/icon_Item_activity.svg" alt="">
              <span class="card-title">Item Activity</span>
<!--              <el-icon>-->
<!--                <ArrowUp />-->
<!--              </el-icon>-->
            </div>
          </template>
          <div class="card-body" style="height:580px;padding:0; overflow-y: auto">
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

              <div class="list-tr" v-for="(v, i) in tokenEventList" :key="`token-event-item-${i}`">
                <div class="list-th" style="width:20%">
                  {{v.type}}
                </div>
                <div class="list-th" style="width:20%">{{nftPriceFun(v.price) === '--' ? '--' : (nftPriceFun(v.price) + ' ETH')}}</div>
                <div class="list-th " style="width:20%">{{$filters.ellipsisAddress(v.from, 4)}}</div>
                <div class="list-th " style="width:20%">{{$filters.ellipsisAddress(v.to, 4)}}</div>
                <div class="list-th " style="width:20%">21 days ago</div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
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
      activeName: '1',
      activeName1: '1',
      activeName2: '1',
      activeName3: '1',
      activeName4: '1',
      cancelMakeOfferBtnLoading: false,
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
      tokenEventList: [],
      ckAuctionEntityList: [],
      isCart: false,
      nftPrice: '--',
      bestPrice: '--',
      countDownTime: '--',
      countDownFn: '',
      isMakeOffer: false,
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
    this.getTokenEvent()
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
  destroyed() {
    if (that.countDownFn) {
      clearInterval(that.countDownFn); //清除定时器
    }
  },
  methods: {
    isSelfMakeOffer (v) {
      const isMakeOffer = v.maker.toLocaleLowerCase() === this.user.coinbase.toLocaleLowerCase()
      if (isMakeOffer) {
        this.isMakeOffer = true
      }
      return isMakeOffer
    },
    //倒计时
    countDownFun(time) {
      // console.log(time)
      let startTime = new Date(); //当前时间
      let end = new Date(time * 1000); //结束时间
      // console.log(end)
      let result = parseInt((end - startTime) / 1000); //计算出豪秒
      let M = parseInt(result / (24 * 60 * 60 * 30)); //用总共的秒数除以月30天的秒数
      let d = parseInt(result / (24 * 60 * 60)); //用总共的秒数除以1天的秒数
      let h = parseInt((result / (60 * 60)) % 24); //精确小时，用去余
      let m = parseInt((result / 60) % 60); //剩余分钟就是用1小时等于60分钟进行趣余
      let s = parseInt(result % 60);
      //当倒计时结束时，改变内容
      if (result <= 0) {
        return "已过期";
      }
      if (M < 10) {
        M = "0" + M;
      }
      if (d < 10) {
        d = "0" + d;
      }
      if (h < 10) {
        h = "0" + h;
      }
      if (s < 10) {
        s = "0" + s;
      }
      if (parseInt(h) === 0 && parseInt(m) === 0) {
        return  s + "S";
      } else if (parseInt(h) === 0) {
        return  m + "M " + s + "S";
      } else if(parseInt(d) === 0) {
        return  h + "H " + m + "M " + s + "S";
      } else {
        return  d + "D " + h + "H " + m + "M " + s + "S";
      }
      // else if (parseInt(M) === 0){
      //   return  d + "d" + h + " H" + m + "M " + s + "S";
      // }
      // else {
      //   return  M + '月' + d + "d" + h + "d" + m + "M " + s + "S";
      // }
    },
    // 定时器
    // 页面多个倒计时 归零时清除
    countDown() {
      let that = this;
      that.countDownFn = setInterval(() => {
        //  console.log(that.countDownFun(item.endTime))
        if (that.countDownFun(that.countDownTime) === "倒计时结束") {
          clearInterval(that.countDownFn); //清除定时器
        } else {
          that.countDownTime = that.countDownFun(that.tokenInfo.ckOrdersEntity.expirationTime);
        }
      }, 1000);
    },
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
        this.nftPrice = this.$sdk.fromWeiNum(this.tokenInfo.ckOrdersEntity ? this.tokenInfo.ckOrdersEntity.basePrice : this.tokenInfo.basePrice)
        this.bestPrice = this.$sdk.fromWeiNum(this.tokenInfo.bestPrice)
        if (this.tokenInfo.ckOrdersEntity !== null) {
          this.countDown()
        }
        this.isInCart()
      })
    },
    getTokenEvent() {
      this.$api("collect.tokenEvent", this.tokenInfoParams).then((res) => {
        this.tokenEventList = res.debug
        console.log(this.tokenEventList)
      })
    },
    showSellNft () {
      this.sellDialogBtnLoading = true
      this.$refs.NFTDialogSell.showSell(this.tokenInfo)
    },
    async cancelMakeOffer (v) {
      this.cancelMakeOfferBtnLoading = true
      let seller = this.$sdk.getAtomicMatchWrapOrder(v, false)
      seller = {
        ...seller,
        ...{
          basePrice: seller.basePrice.toString(),
          v: v.v,
          s: v.s,
          r: v.r
        }
      }
      try {
        const hash = await this.$sdk.cancelOrder_(seller, this.user.coinbase);
        console.log(hash)
        this.$api("order.cancel", {
          id: v.id,
          type: this.$sdk.valueOrderType("MAKE_OFFER")
        }).then((res) => {
          this.cancelMakeOfferBtnLoading = false
          this.$tools.message('已取消报价', 'success');
          this.getTokenInfo()
        })
      } catch (e) {
        console.log(e)
        this.cancelMakeOfferBtnLoading = false
      }
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
          id: this.tokenInfo.ckOrdersEntity.id,
          type: this.$sdk.valueOrderType("SALE")
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
    nftPriceFun (basePrice) {
      console.log(basePrice)
      return basePrice !== null ? this.$Web3.utils.fromWei(basePrice.toString()) : '--'
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
<style lang="scss">
.main-wrapper.nft-detail {
  padding: 40px 0;
  margin-bottom: 20px;
  .flex-center {
    display: flex;
    /*flex-flow: row wrap;*/
    justify-content: space-between;
  }
  .page-left {
    width: 468px;
    display: flex;
    flex-direction: column;
    /*justify-content: space-between;*/
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
    /*justify-content: space-between;*/
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
      padding: 0 24px;
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
        top: 56px;
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
     //  border: 1px solid $borderBg;
    }
    .el-checkbox-group {
      padding-top: 15px;
      padding-left: 15px;
      .el-checkbox {
        // font-weight: 600;
      }
    }
    .filter-box {
      position: sticky;
      left: 0;
      top: 0;
      border-top: 1px solid $borderBg;
      background: $bg-white;
      z-index: 10;
      height: 56px;
      width: 100%;
      .el-checkbox-group{
        padding-top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        background: $elButtonHoverBg;
      }
      .el-checkbox__inner{
        background-color: transparent;
        border-color: $primaryColor;
      }
      .el-checkbox__input.is-checked+.el-checkbox__label{
        color: $primaryColor;
      }
      .el-checkbox__inner::after{
        border-color: $primaryColor;
      }
    }
  }
}
</style>

