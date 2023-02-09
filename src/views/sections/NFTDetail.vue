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
              <div class="card-body" style="height: 279px">
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
                    <span class="value">{{tokenInfo.contractType === 1 ? 'ERC1155' : 'ERC721'}}</span>
                  </div>
                  <div class="flex-detial line">
                  </div>
                  <div class="flex-detial">
                    <span class="name">Contract</span>
                    <div class="value display-flex box-center-Y color-purple"
                      @click="$filters.openWindow($filters.contractExplore(tokenInfo.contract).href)">
                      <div>{{$filters.contractExplore(tokenInfo.contract).hashShort}}</div>
                      <div class="share-icon"><img src="../../assets/images/icons/icon_share_purple.svg" alt=""></div>
                    </div>
                  </div>
                  <div class="flex-detial">
                    <span class="name">Creator Rebate</span>
                    <div class="value primaryColor display-flex box-center-Y">
                      <el-tooltip placement="right">
                        <template #content> The creator of this collection will receive a certain <br> percentage of
                          amout for every sale. </template>
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
            <span> {{tokenInfo.name?tokenInfo.name:('#'+tokenInfo.tokenId)}}</span>
            <div class="icon_shoucang" :class="{active: tokenInfo.followStatus}" alt="" @click="followNft" />
          </div>
          <div class="nft-address" v-if="tokenInfo.contractType === 0">
            <div class="add-item">
              <div class="creator">Creator</div>
              <div class="creator-name">{{$filters.ellipsisAddress(tokenInfo.ckCollectionsInfoEntity.owner)}}</div>
            </div>
            <div>
              <div class="creator">Current owner</div>
              <div class="creator-name">{{$filters.ellipsisAddress(tokenInfo.address)}}</div>
            </div>
          </div>
          <div class="display-flex box-center-Y erc1155 nft-address" v-if="tokenInfo.contractType === 1">
            <div class="box-flex1 display-flex box-center-Y">
              <div class="icon-img"><img src="@/assets/images/icons/icon_detail_owner.svg" alt=""></div>
              <div class="tip">Owner</div>
              <!--              <div>{{tokenInfo.ckCollectionsInfoEntity.holder}}</div>-->
              <div>{{tokenInfo.ownersEntityList.length}}</div>
            </div>
            <div class="box-flex1 display-flex box-center-Y">
              <div class="icon-img"><img src="@/assets/images/icons/icon_detail_item.svg" alt=""></div>
              <div class="tip">Item</div>
              <div>{{tokenInfo.ckCollectionsInfoEntity.total}}</div>
            </div>
            <div class="box-flex1 display-flex box-center-Y">
              <div class="icon-img"><img src="@/assets/images/icons/icon_detail_own.svg" alt=""></div>
              <div class="tip">You own</div>
              <div>{{youOwnAmount}}</div>
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
                  ${{$filters.milliFormat($filters.ethToUsdt(nftPrice))}}
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
                <el-button type="primary" class="btnBuy" :loading="sellDialogBtnLoading" @click="showSellNft">Sell Now</el-button>
<!--                <el-button type="primary" class="btnBuy" v-if="!tokenInfo.state || tokenInfo.contractType === 1"-->
<!--                  :loading="sellDialogBtnLoading" @click="showSellNft">Sell Now</el-button>-->
<!--                <el-button type="primary" class="btnBuy" v-if="tokenInfo.contractType === 0 && ckOrdersEntityList.length > 0" :loading="cancelBtnLoading"-->
<!--                  @click="cancelSell()">Cancel-->
<!--                  Sell</el-button>-->
              </template>
<!--              <el-button type="primary" class="btnBuy"-->
<!--                v-else-if="tokenInfo.state && tokenInfo.contractType === 0 && tokenInfo.basePrice > 0"-->
<!--                @click="showBuyNft">Buy Now-->
<!--              </el-button>-->
              <!--              <el-button class="btnBlack" v-if="!isSelf && !isCart" :disabled="!(!isSelf && !isCart) || !tokenInfo.contract || !tokenInfo.state"-->
              <el-button class="btnBlack" v-if="tokenInfo.contractType === 0"
                :disabled="(isIncartInit || !tokenInfo.contract || !tokenInfo.state)" @click="addCart">Add to Cart</el-button>
              <el-button class="btnWhite" v-if="tokenInfo.contractType === 1 || (!isSelf && !this.isMakeOffer)"
                :disabled="!tokenInfo.contract" @click="showMakeOfferNFT">Make Offer</el-button>
              <el-button class="btnWhite" v-if="tokenInfo.contractType === 1 || (!isSelf && !this.isMakeOffer)"
                :disabled="!tokenInfo.contract" @click="showMakeOfferCollect">Make Offer Collect</el-button>
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
              <div class="card-body price-history" style="height:177px">
                <div id="priceHistory"></div>
              </div>
            </el-collapse-item>
          </el-collapse>

        </div>
<!--        <div class="card-wrap mt30" v-if="tokenInfo.contractType === 1">-->
        <div class="card-wrap mt30">
          <el-collapse v-model="activeName3" accordion>
            <el-collapse-item title="Consistency" name="1">
              <template #title>
                <div class="card-head">
                  <img class="icon" src="@/assets/images/icons/icon_offers.svg" alt="">
                  <span class="card-title">Listings</span>
                  <!--                  <el-icon class="down">-->
                  <!--                    <ArrowUp />-->
                  <!--                  </el-icon>-->
                </div>
              </template>
<!--              <div class="card-body" style="height:156px;padding:0;overflow: auto;" :style="{-->
<!--                height: tokenInfo.contractType === 0 ? '480px' : '156px'-->
<!--              }">-->
              <div class="card-body" style="height:156px;padding:0;overflow: auto;">
                <div class="offer-list">
                  <div class="list-tr head top0">
                    <div class="list-th th25">Market</div>
                    <div class="list-th th25">Unit Price</div>
                    <div class="list-th th25" v-if="tokenInfo.contractType === 1">Quantity</div>
                    <div class="list-th th25">Exporation</div>
                    <div class="list-th th25">From</div>
                    <div class="list-th th25 center">Status</div>
                    <div class="list-th th25 center">Cart</div>
                  </div>

                  <div class="list-tr" v-for="(v, i) of ckOrdersEntityList" :key="`listing-item-${i}`">
                    <template v-if="v.source === 'coresky'">
                      <div class="list-th th25">
                        <svg-icon class="platform-logo" icon-class="logo"/>
                      </div>
                      <div class="list-th th25">
                        <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                        {{nftPriceFun(v.basePrice)}}
                      </div>
                      <div class="list-th th25" v-if="tokenInfo.contractType === 1">{{$filters.milliFormat(v.amount)}}</div>
                      <div class="list-th th25" :class="isExpired(v.expirationTime) ? 'expired' : ''">{{$filters.timeFormatTime(v.expirationTime)}}</div>
                      <div class="list-th th25 purple" @click="goExplore(v.maker)">
                        {{$filters.ellipsisAddress(v.maker, 4)}}</div>
                      <div class="list-th th25 center">
                        <el-button type="primary" :disabled="isExpired(v.expirationTime)" class="btnAccept" v-if="isSelfMakeOffer(v.maker)"
                                   :loading="cancelMakeOfferBtnLoading" @click="cancelSell(v, false)">Cancel</el-button>
                        <el-button type="primary" class="btnAccept" v-else
                                   :loading="acceptDialogBtnLoading" :disabled="isExpired(v.expirationTime) || isSelf1155(v.maker)" @click="showBuyNft(v, false)">Buy</el-button>
                      </div>
                      <div class="list-th th25 center">
                        <el-button type="primary" class="btnAccept" :disabled="isCartCoresky(v.id) || isSelfSell(v.maker) || isExpired(v.expirationTime)"
                                   @click="addCartList(v.id)">Add</el-button>
                      </div>
                    </template>
                    <template v-else>
                      <div class="list-th th25">
                        <svg-icon class="platform-logo" icon-class="os-logo"/>
                      </div>
                      <div class="list-th th25">
                        <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                        {{nftPriceFun(v.currentPrice)}}
                      </div>
                      <div class="list-th th25" v-if="tokenInfo.contractType === 1">{{$filters.milliFormat(v.protocolData.parameters.offer[0].startAmount)}}</div>
                      <div class="list-th th25" :class="isExpired(v.expirationTime) ? 'expired' : ''">{{$filters.timeFormatTime(v.expirationTime)}}</div>
                      <div class="list-th th25 purple" @click="goExplore(v.maker.address)">
                        {{$filters.ellipsisAddress(v.maker.address, 4)}}</div>
                      <div class="list-th th25 center">
                        <el-button type="primary" class="btnAccept" :disabled="isExpired(v.expirationTime)" v-if="isSelfMakeOffer(v.maker.address)"
                                   :loading="cancelMakeOfferBtnLoading" @click="cancelSell(v, true)">Cancel</el-button>
                        <el-button type="primary" class="btnAccept" v-else :disabled="isSelf1155(v.maker.address) || isExpired(v.expirationTime)"
                                   :loading="acceptDialogBtnLoading" @click="showBuyNft(v, true)">Buy</el-button>
                      </div>
                      <div class="list-th th25 center">
                        <el-button type="primary" class="btnAccept" :disabled="isInCartOpensea(v.orderHash) || isSelfSell(v.maker.address) || isExpired(v.expirationTime)"
                                   @click="addCartOpensea(v)">Add</el-button>
                      </div>
                    </template>

                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="card-wrap mt30">
          <el-collapse v-model="activeName5" accordion>
            <el-collapse-item title="Consistency" name="1">
              <template #title>
                <div class="card-head">
                  <img class="icon" src="@/assets/images/icons/icon_offer.svg" alt="">
                  <span class="card-title">Offers</span>
                  <!--                  <el-icon class="down">-->
                  <!--                    <ArrowUp />-->
                  <!--                  </el-icon>-->
                </div>
              </template>
<!--              <div class="card-body" style="height:279px;padding:0;overflow: auto;" :style="{-->
<!--                height: tokenInfo.contractType === 0 ? '570px' : '279px'-->
<!--              }">-->
              <div class="card-body" style="height:279px;padding:0;overflow: auto;">
                <div class="offer-list">
                  <div class="list-tr head top0">
                    <div class="list-th th25">Market</div>
                    <div class="list-th th25">Price</div>
                    <div class="list-th th25" v-if="tokenInfo.contractType === 1">Quantity</div>
                    <div class="list-th th25">Exporation</div>
                    <div class="list-th th25">From</div>
                    <div class="list-th th25 center">Status</div>
                  </div>

                  <div class="list-tr" v-for="(v, i) of ckAuctionEntityList" :key="`make-offer-${i}`">
<!--                    <div class="list-th th25">-->
<!--                        <svg-icon class="platform-logo" icon-class="logo"/>-->
<!--                        &lt;!&ndash;                        Coresky&ndash;&gt;-->
<!--                      </template>-->
<!--                      <template v-else>-->
<!--                        <svg-icon class="platform-logo" icon-class="os-logo"/>-->
<!--                        &lt;!&ndash;                        Opensea&ndash;&gt;-->
<!--                      </template>-->
<!--                    </div>-->
                    <template v-if="v.source === 'coresky'">
                      <div class="list-th th25">
                        <svg-icon class="platform-logo" icon-class="logo"/>
                      </div>
                      <div class="list-th th25">
                        <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                        {{nftPriceFun(v.basePrice)}}
                      </div>
                      <div class="list-th th25" v-if="tokenInfo.contractType === 1">{{$filters.milliFormat(v.amount)}}</div>
                      <div class="list-th th25" :class="isExpired(v.expirationTime) ? 'expired' : ''">{{$filters.timeFormatTime(v.expirationTime)}}</div>
                      <div class="list-th th25 purple" @click="goExplore(v.maker)">
                        {{$filters.ellipsisAddress(v.maker, 4)}}</div>
                      <div class="list-th th25 center">
                        <el-button type="primary" :disabled="isExpired(v.expirationTime)" class="btnAccept" v-if="isSelfMakeOffer(v.maker)"
                                   :loading="cancelMakeOfferBtnLoading" @click="cancelMakeOffer(v, false)">Cancel</el-button>
                        <el-button type="primary" class="btnAccept" v-else :disabled="!isSelf || isExpired(v.expirationTime)"
                                   :loading="acceptDialogBtnLoading" @click="showAcceptOfferNFT(v, false)">Accept</el-button>
                      </div>
                    </template>
                    <template v-else>
                      <div class="list-th th25">
                        <svg-icon class="platform-logo" icon-class="os-logo"/>
                      </div>
                      <div class="list-th th25">
                        <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                        {{nftPriceFun(v.currentPrice)}}
                      </div>
                      <div class="list-th th25" v-if="tokenInfo.contractType === 1">{{$filters.milliFormat(v.protocolData.parameters.consideration[0].startAmount)}}</div>
                      <div class="list-th th25" :class="isExpired(v.expirationTime) ? 'expired' : ''">{{$filters.timeFormatTime(v.expirationTime)}}</div>
                      <div class="list-th th25 purple" @click="goExplore(v.maker.address)">
                        {{$filters.ellipsisAddress(v.maker.address, 4)}}</div>
                      <div class="list-th th25 center">
                        <el-button type="primary" :disabled="isExpired(v.expirationTime)" class="btnAccept" v-if="isSelfMakeOffer(v.maker.address)"
                                   :loading="cancelMakeOfferBtnLoading" @click="cancelMakeOffer(v, true)">Cancel</el-button>
                        <el-button type="primary" class="btnAccept" v-else :disabled="!isSelf || isExpired(v.expirationTime)"
                                   :loading="acceptDialogBtnLoading" @click="showAcceptOfferNFT(v, true)">Accept</el-button>
                      </div>
                    </template>
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
              <el-checkbox-group v-model="checkList" @change="changeFilter">
                <el-checkbox v-for="(v, i) in tokenEventType" :label="v" :key="`chec-item-${i}`" />
              </el-checkbox-group>
            </div>
            <div class="offer-list">
              <div class="list-tr head">
                <div class="list-th" style="width:20%">Market</div>
                <div class="list-th" style="width:20%">Event</div>
                <div class="list-th" style="width:20%">Price</div>
                <div class="list-th" style="width:20%">From</div>
                <div class="list-th" style="width:20%">To</div>
                <div class="list-th" style="width:20%">Date</div>
              </div>
              <div class="list-tr" v-for="(v, i) in tokenEventList" :key="`token-event-item-${i}`">
                <div class="list-th display-flex box-center-Y" style="width:20%">
                  <svg-icon class="platform-logo" icon-class="logo" v-if="!v.source"/>
                  <svg-icon class="platform-logo" v-else icon-class="os-logo"/>
                </div>
                <div class="list-th display-flex box-center-Y" style="width:20%">
                  <div class="event-icon"><img :src="require(`../../assets/images/icons/icon_event_${v.type}.svg`)"
                      alt=""></div>
                  <div>{{v.typeUp}}</div>
                  <div class="expired" v-if="status === 3">Expired</div>
                </div>
                <div class="list-th" style="width:20%">
                  {{nftPriceFun(v.price) === '--' ? '--' : (nftPriceFun(v.price) + ' ETH')}}</div>
                <div class="list-th" @click="goExplore(v.addressFrom)" :class="{purple: v.addressFrom!== null}" style="width:20%">
                  {{$filters.ellipsisAddress(v.addressFrom, 4)}}</div>
                <div class="list-th" @click="goExplore(v.addressTo)" :class="{purple: !!v.addressTo}" style="width:20%">
                  {{$filters.ellipsisAddress(v.addressTo, 4)}}</div>
                <div class="list-th display-flex box-center-Y" style="width:20%" :class="{gray: v.hash === null}">
                  <div>{{$filters.timeFormat(v.createTime)}}</div>
                  <div class="share-icon" v-show="v.hash !== null" @click="goExplore(v.hash, true)"><img
                      src="../../assets/images/icons/icon_share_purple.svg" alt=""></div>
                </div>
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
import BigNumber from 'bignumber.js'
import * as echarts from "echarts";

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
      activeName5: '1',
      cancelMakeOfferBtnLoading: false,
      buyBtnLoading: false,
      cancelBtnLoading: false,
      sellDialogBtnLoading: false,
      acceptDialogBtnLoading: false,
      checkList: ['Chain'],
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
      youOwnAmount: '--',
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
      tokenEventListOrigin: [],
      tokenEventType: ['Chain'],
      ckAuctionEntityList: [],
      ckOrdersEntityList: [],
      historyPrice: [],
      myChart: null,
      // isCart: false,
      nftPrice: '--',
      bestPrice: '--',
      countDownTime: '--',
      countDownFn: '',
      isMakeOffer: false,
      asset: {}
    };
  },
  created () {
    this.tokenInfoParams = {
      contract: this.$route.params.contract,
      tokenId: this.$route.params.tokenId
    }
    this.asset = {
      // tokenAddress: "0x317a8fe0f1c7102e7674ab231441e485c64c178a", // CryptoKitties
      // tokenId: "227856", // Token ID
      assetContractAddress: this.$route.params.contract, // CryptoKitties
      tokenId: this.$route.params.tokenId, // Token ID
      // schemaName: WyvernSchemaName.ERC721
    }
  },
  mounted () {
    this.getTokenInfo()
    this.getTokenEvent()
    // this.getOrdersAndOffers()
    // this.isInCart()
  },
  computed: {
    user () {
      console.log(this.$store.state.user)
      return this.$store.state.user;
    },
    cartName () {
      return `coresky_cart_${this.$store.state.user.coinbase}`
    },
    cartNameOpensea () {
      return `coresky_cart_opensea_${this.$store.state.user.coinbase}`
    },
    isSelf () {
      console.log(this.tokenInfo)
      if (this.tokenInfo?.ownersEntityList) {
        let ownerList = []
        this.tokenInfo.ownersEntityList.forEach(item => {
          ownerList.push(item.address)
        })
        console.log(ownerList, this.user.coinbase.toLowerCase())
        console.log(ownerList.indexOf(this.user.coinbase.toLowerCase()) > -1)
        return ownerList.indexOf(this.user.coinbase.toLowerCase()) > -1
      } else {
        return false
      }
    },
    isIncartInit () {
      return this.isCartCoresky() || this.isInCartOpensea()
    },
  },
  destroyed () {
    if (that.countDownFn) {
      clearInterval(that.countDownFn); //清除定时器
    }
  },
  methods: {
    isSelf1155 (maker) {
      return maker.toLowerCase() === this.user.coinbase.toLowerCase()
    },
    isExpired (time) {
      return time !== null ? new Date().getTime() > time * 1000 : false
    },
    goExplore (address, isTx = false) {
      console.log(address, isTx)
      if (address !== null) {
        this.$filters.openWindow(isTx ? this.$filters.hashExplore(address).href : this.$filters.contractExplore(address).href)
      }
    },
    initPriceHistory () {
      if (!this.myChart) {
        let chartDom = document.getElementById('priceHistory');
        this.myChart = echarts.init(chartDom);
      }
      let xAxisData = []
      let data = []
      this.historyPrice.reverse().forEach(item => {
        xAxisData.push(this.$filters.timeToUTC(item.date, true))
        data.push(this.nftPriceFun(item.price))
      })

      const option = {
        grid: {
          bottom: '30px',
          top: '20px'
        },
        tooltip: {//提示框组件
          trigger: 'item', //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '{b}: {c}ETH' //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(0, 0, 0, 0.6)'
            },
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#7D47FF',
                lineStyle: {
                  color: '#7D47FF'
                },
              }
            },
          }
        ]
      };
      option && this.myChart.setOption(option);

    },
    changeFilter (val) {
      console.log(val)
      this.checkList = val
      console.log(this.checkList)
      this.tokenEventList = this.tokenEventListOrigin.filter(item => this.checkList.indexOf(item.typeUp) > -1)
    },
    firstWorkToUp (word) {
      return word.charAt(0).toUpperCase()
        + word.slice(1)
    },
    isSelfMakeOffer (maker) {
      const isMakeOffer = maker.toLocaleLowerCase() === this.user.coinbase.toLocaleLowerCase()
      if (isMakeOffer) {
        this.isMakeOffer = true
      }
      return isMakeOffer
    },
    //倒计时
    countDownFun (time) {
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
        return s + "S";
      } else if (parseInt(h) === 0) {
        return m + "M " + s + "S";
      } else if (parseInt(d) === 0) {
        return h + "H " + m + "M " + s + "S";
      } else {
        return d + "D " + h + "H " + m + "M " + s + "S";
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
    countDown () {
      let that = this;
      that.countDownFn = setInterval(() => {
        //  console.log(that.countDownFun(item.endTime))
        if (that.countDownFun(that.countDownTime) === "倒计时结束") {
          clearInterval(that.countDownFn); //清除定时器
        } else {
          that.countDownTime = that.countDownFun(that.tokenInfo.expirationTime);
        }
      }, 1000);
    },
    // isInCart (id) {
    //   const local = getLocalStorage(this.cartName)
    //   console.log(local[this.cartName])
    //   let coresky_cart = local[this.cartName]
    //   if (local[this.cartName] !== null) {
    //     coresky_cart = JSON.parse(coresky_cart)
    //     const token = coresky_cart.find(item => item.contract === this.tokenInfo.contract && item.tokenId === this.tokenInfo.tokenId)
    //     console.log(token)
    //     this.isCart = token !== undefined
    //   } else {
    //     coresky_cart = []
    //     this.isCart = false
    //   }
    // },
    isSelfSell (maker) {
      console.log()
      return maker === this.user.coinbase.toLowerCase()
    },
    isCartCoresky (id = 0) {
      if (this.tokenInfo.contractType === 0) {
        console.log(this.isInCartCoresky721())
        return this.isInCartCoresky721()
      } else {
        console.log(this.isInCart1155())
        return this.isInCart1155(id)
      }
    },
    isInCartCoresky721 () {
      let shoppingList =  this.$store.state.shoppingCartList || []
      if (shoppingList === null || shoppingList.length === 0) {
        return false
      }
      console.log('shoppingList', shoppingList)
      const token = shoppingList.find(item => item.contract === this.tokenInfo.contract && item.tokenId === this.tokenInfo.tokenId)
      console.log(token)
      return !!token;
    },
    isInCart1155 (id) {
      let coresky_cart = this.$store.state.shoppingCartList || []
      let isCart = false
      if (local[this.cartName] !== null) {
        coresky_cart = JSON.parse(coresky_cart)
        const token = coresky_cart.find(item => item.contract === this.tokenInfo.contract && item.tokenId === this.tokenInfo.tokenId)
        console.log(token)
        if (token !== undefined) {
          // const ckOrdersEntityListInfo = this.tokenInfo.ckOrdersEntityList
          const ckOrdersEntityList = token.ckOrdersEntityList
          let v = ckOrdersEntityList.find(v => v.id === id)
          isCart = v !== undefined
        } else {
          isCart = false
        }
      } else {
        coresky_cart = []
        isCart = false
      }
      return isCart
    },
    // 添加购物车
    addCart () {
      // const local = getLocalStorage(this.cartName)
      // console.log(local[this.cartName])
      // let coresky_cart = local[this.cartName]
      // if (local[this.cartName] !== null) {
      //   coresky_cart = JSON.parse(coresky_cart)
      // } else {
      //   coresky_cart = []
      // }
      // console.log(coresky_cart)
      // coresky_cart.push(this.tokenInfo)
      // const obj = {}
      // obj[this.cartName] = JSON.stringify(coresky_cart)
      // setLocalStorage(obj)
      // addShoppingCart(this.tokenInfo)
      // this.isInCart()
      console.log(this.ckOrdersEntityList)
      if (this.ckOrdersEntityList.length > 1) {
        const openseaSell = this.ckOrdersEntityList.filter(item => item.source === 'opensea')
        const coreskySell = this.ckOrdersEntityList.find(item => item.source === 'coresky')
        function compare (prop) {
          return function (obj1, obj2) {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (new BigNumber(val1).isLessThan(new BigNumber(val2))) {
              return -1;
            } else if (new BigNumber(val2).isLessThan(new BigNumber(val1))) {
              return 1;
            } else {
              return 0;
            }
          }
        }
        openseaSell.sort(compare("currentPrice"))
        if (openseaSell.length > 0 && coreskySell) {
          console.log(coreskySell.basePrice, openseaSell[0].currentPrice, new BigNumber(coreskySell.basePrice).isLessThan(new BigNumber(openseaSell[0].currentPrice)))
          if (new BigNumber(coreskySell.basePrice).isLessThan(new BigNumber(openseaSell[0].currentPrice))) {
            this.$store.commit('addShoppingCart', this.tokenInfo)
          } else {
            // this.addCartOpensea(openseaSell[0])
            this.$store.commit('addShoppingCartOpensea', openseaSell[0])
          }
        } else if (!coreskySell) {
          // this.addCartOpensea(openseaSell[0])
          this.$store.commit('addShoppingCartOpensea', openseaSell[0])
        }
      } else if (this.ckOrdersEntityList[0].source === 'coresky') {
        this.$store.commit('addShoppingCart', this.tokenInfo)
      } else if (this.ckOrdersEntityList[0].source === 'opensea') {
        this.addCartOpensea(this.ckOrdersEntityList[0])
      }
    },
    isInCartOpensea (orderHash = null) {
      let coresky_cart = this.$store.state.shoppingOpenseaCartList || []
      if (coresky_cart.length < 1) {
        return false
      }
      let orders
      console.log('coresky_cart', coresky_cart, this.tokenInfo.tokenId, this.tokenInfo.contract)
      console.log('coresky_cart', coresky_cart, coresky_cart[0].makerAssetBundle.assets[0].tokenId === this.tokenInfo.tokenId, coresky_cart[0].makerAssetBundle.assets[0].tokenAddress === this.tokenInfo.contract)
      console.log('coresky_cart', coresky_cart, coresky_cart[0].makerAssetBundle.assets[0].tokenId, coresky_cart[0].makerAssetBundle.assets[0].tokenAddress)
      if (orderHash === null) {
        orders = coresky_cart.filter(item =>
          item.makerAssetBundle.assets[0].tokenId === this.tokenInfo.tokenId
          && item.makerAssetBundle.assets[0].tokenAddress === this.tokenInfo.contract)
      } else {
        orders = coresky_cart.filter(item => item.orderHash === orderHash)
      }
      console.log(orders)
      console.log(orders.length > 0)
      return orders.length > 0
    },
    addCartOpensea(v) {
      if (!v) {
        return
      }
      this.$store.commit('addShoppingCartOpensea', v)
      // let cartName = this.cartNameOpensea
      // const local = getLocalStorage(cartName)
      // let coresky_cart = local[cartName]
      // if (local[cartName] !== null) {
      //   coresky_cart = JSON.parse(coresky_cart)
      // } else {
      //   coresky_cart = []
      // }
      // const isInCart = coresky_cart.find(item => item.orderHash === v.orderHash)
      // if (!isInCart) {
      //   coresky_cart.push(v)
      //   const obj = {}
      //   obj[cartName] = JSON.stringify(coresky_cart)
      //   setLocalStorage(obj)
      // }
    },
    addCart1155 (id) {
      this.tokenInfo.ckOrdersEntityList.map(item => {
        if (this.isInCart1155(id)) {
          item.isIncart = true
        } else if (item.id === id) {
          item.isIncart = true
        }
        return item
      })
      this.$store.commit('addShoppingCart', this.tokenInfo)
    },
    addCartList (id) {
      if (this.tokenInfo.contractType === 0) {
        this.$store.commit('addShoppingCart', this.tokenInfo)
      } else {
        this.addCart1155(id)
      }
    },
    getTokenInfo () {
      this.$api("collect.tokenInfo", this.tokenInfoParams).then(async (res) => {
        this.tokenInfo = res.debug
        this.nftPrice = this.nftPriceFun(this.tokenInfo.basePrice)
        this.tokenInfo.ownersEntityList.forEach(item => {
          if (item.address === this.user.coinbase.toLowerCase()) {
            this.youOwnAmount = item.amount
          }
        })
        this.bestPrice = this.nftPriceFun(this.tokenInfo.bestPrice)
        this.historyPrice = this.tokenInfo.historyPrice
        this.initPriceHistory()

        let offer = res.debug.ckAuctionEntityList || []
        let listed = res.debug.ckOrdersEntityList || []
        offer = offer.map(item => {
          item.source = "coresky"
          return item
        })
        listed = listed.map(item => {
          item.source = "coresky"
          return item
        })
        this.ckAuctionEntityList = offer
        this.ckOrdersEntityList = listed
        await this.getOrdersAndOffers()
        if (this.ckOrdersEntityList.length > 0) {
          this.countDown()
        }
        // this.isInCart()
      })
    },
    async getOrdersAndOffers () {
        const openseaListed = await this.$sdk.getOrdersOpensea(this.asset)
        if (openseaListed.code === 200) {
          this.ckOrdersEntityList = [...this.ckOrdersEntityList, ...openseaListed.data]
        }
        await this.$sdk._sleep(2000)
        const openseaOffers = await this.$sdk.getOffersOpensea(this.asset)
        if (openseaOffers.code === 200) {
          this.ckAuctionEntityList = [...this.ckAuctionEntityList, ...openseaOffers.data]
        }
        console.log(this.ckAuctionEntityList, this.ckOrdersEntityList)
    },
    getTokenEvent () {
      this.$api("collect.tokenActivity", this.tokenInfoParams).then((res) => {
        this.tokenEventList = res.debug
        let tokenEventType = []
        this.tokenEventList.forEach(item => {
          item.typeUp = this.firstWorkToUp(item.type)
          if (!(tokenEventType.indexOf(item.typeUp) > -1)) {
            tokenEventType.push(item.typeUp)
          }
        })
        this.tokenEventType = tokenEventType
        this.checkList = tokenEventType
        this.tokenEventListOrigin = this.tokenEventList
        console.log(this.tokenEventList, tokenEventType)
      })
    },
    showSellNft () {
      console.log(this.ckOrdersEntityList)
      const sellOpenseaOrder = this.ckOrdersEntityList.filter(item => item.source === 'opensea')
      const sellCoreskyOrder = this.ckOrdersEntityList.filter(item => item.source === 'coresky')
      if (sellOpenseaOrder.length > 0 && sellCoreskyOrder.length > 0) {
        this.$tools.message('每个平台仅支持一次报价，请取消挂单后重新挂售', 'warning');
        return
      }
      this.$router.push({
        path: `/listings/${this.tokenInfoParams.contract}/${this.tokenInfoParams.tokenId}`
      })
      // this.sellDialogBtnLoading = true
      // this.$refs.NFTDialogSell.showSell(this.tokenInfo)
    },
    async cancelMakeOffer (v, isOpensea = false) {
      if (isOpensea) {
        await this.cancelSellOpensea(v)
        return
      }
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
        if (typeof hash == "object" && hash.error) {
          this.cancelMakeOfferBtnLoading = false
          return
        }
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
    async cancelSell (cancelItem = null, isOpensea = false) {
      if (isOpensea) {
        this.cancelSellOpensea(cancelItem)
      } else {
        this.cancelSellCoresky(cancelItem)
      }
    },
    async cancelSellCoresky (cancelItem) {
      this.cancelBtnLoading = true
      if (this.tokenInfo.contractType === 0 && cancelItem === null) {
        cancelItem = this.tokenInfo.ckOrdersEntityList[0]
      }
      let seller = this.$sdk.getAtomicMatchWrapOrder(cancelItem, false)
      seller = {
        ...seller,
        ...{
          basePrice: seller.basePrice.toString(),
          v: cancelItem.v,
          s: cancelItem.s,
          r: cancelItem.r
        }
      }
      console.log(seller)
      try {
        const hash = await this.$sdk.cancelOrder_(seller, this.user.coinbase);
        console.log(hash)
        if (typeof hash == "object" && hash.error) {
          this.cancelMakeOfferBtnLoading = false
          return
        }
        this.$api("order.cancel", {
          id: cancelItem.id,
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
    async cancelSellOpensea (cancelItem) {
      console.log(cancelItem)
      if (cancelItem === null) {
        return
      }
      this.cancelBtnLoading = true
      try {
        const openseaSDK = await this.$sdk.initOpenSea()
        console.log(openseaSDK)
        const transactionHash = await openseaSDK.cancelOrder({
          order: cancelItem,
          accountAddress: this.user.coinbase
        })
        console.log(transactionHash)
        this.cancelBtnLoading = false
        this.$tools.message('已取消挂售', 'success');
        this.getTokenInfo()
      } catch (e) {
        console.log(e)
        this.cancelBtnLoading = false
      }
    },
    async showBuyNft (v, isOpensea = false) {
      this.$refs.NFTDialogBuy.showBuy(this.tokenInfo, v, isOpensea)
    },
    async fulfillOrderOpensea (v) {
      console.log(v)
      console.log(this.user.coinbase)
      console.log(JSON.stringify(v))
      try {
        const openseaSDK = await this.$sdk.initOpenSea()
        console.log(openseaSDK)
        const transactionHash = await openseaSDK.fulfillOrder({
          order: v,
          accountAddress: this.user.coinbase
        })
        // {
        // 	// order: order.data.order,
        // 	order: orders,
        // 		accountAddress: asset.tokenAddress
        // }
        console.log(transactionHash)
        // const balance= await openseaSDK.createBuyOrder({
        // 	asset,
        // 	accountAddress: this.user.coinbase,
        // 	// Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
        // 	startAmount: 1.2,
        // })
        // console.log(balance)
      } catch (e) {
        console.log(e)
      }
    },
    nftPriceFun (basePrice) {
      console.log(basePrice)
      return (basePrice !== null && basePrice !== undefined) ? this.$filters.keepMaxPoint(this.$Web3.utils.fromWei(basePrice.toString())) : '--'
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
    showAcceptOfferNFT (v, isOpensea = false) {
      // if (isOpensea) {
      //   this.fulfillOrderOpensea(v)
      //   return
      // }
      // this.acceptDialogBtnLoading = false
      this.$refs.NFTDialogAcceptOffer.show(this.tokenInfo, v, v.tokenId === '0' ? 2 : 1, isOpensea)
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
        &.active {
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
      &.erc1155 {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: $primaryColor;
        padding-top: 26px;
        padding-bottom: 10px;
        .tip {
          font-size: 12px;
          color: $color-black3;
          margin-right: 4px;
        }
        .icon-img {
          width: 18px;
          height: 18px;
          margin-right: 6px;
        }
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
      &.price-history {
        padding: 0;
      }
      #priceHistory {
        width: 100%;
        height: 100%;
      }
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
    padding-left: 20px;
    padding-right: 16px;
    .list-tr {
      display: flex;
      padding: 8px 0 8px 0;
      line-height: 40px;
      border-bottom: 1px solid $borderBg;
      color: $primaryColor;
      font-size: 14px;
      font-weight: 500;
      &:last-child {
        border-bottom: none;
      }
      &.head {
        position: sticky;
        left: 0;
        top: 56px;
        height: 56px;
        width: 100%;
        font-size: 12px;
        background: $bg-white;
        font-weight: 600;
        z-index: 10;
        &.top0 {
          top: 0;
        }
      }
      &.placeholder {
        height: 56px;
      }
      .list-th {
        cursor: pointer;
        .event-icon {
          width: 24px;
          height: 24px;
          margin-right: 4px;
        }
        .share-icon {
        }
        &.gray {
          color: $color-black3;
        }
        .expired, &.expired {
          padding-left: 4px;
          color: $color-red;
          font-weight: 500;
        }
      }
      .platform-logo{
        width: 24px;
        height: 24px;
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
      &.center {
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
      &.is-disabled{
        opacity: 0.8;
      }
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
      .el-checkbox-group {
        padding-top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        background: $elButtonHoverBg;
      }
      .el-checkbox__inner {
        background-color: transparent;
        border-color: $primaryColor;
      }
      .el-checkbox__input.is-checked + .el-checkbox__label {
        color: $primaryColor;
      }
      .el-checkbox__inner::after {
        border-color: $primaryColor;
      }
    }
  }
}
</style>

