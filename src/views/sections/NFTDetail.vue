<template>
  <div class="nft-detail">
    <div class="flex-center">
      <div class="page-left">
        <div class="detail-img-box">
          <div class="detail-img-box-center">
            <el-skeleton v-if="!tokenInfo.oriImage" animated>
              <template #template>
                <el-skeleton-item class="nft-image-skeleton" variant="h3" style="height: 100%;" />
              </template>
            </el-skeleton>
            <div class="img-inset" v-else>
              <div style="width: 100%;height:100%;margin: 0 auto;">
                <el-image :src="tokenInfo.oriImage" fit="contain" lazy>
                </el-image>
              </div>
            </div>
          </div>
        </div>
        <div class="card-wrap mt30">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="Consistency" name="1">
              <template #title>
                <div class="card-head">
                  <img class="icon" src="@/assets/images/icons/icon_properties.svg" alt="">
                  <span class="card-title">{{ $t('nftDetail.Properties') }}</span>
                </div>
              </template>
              <!--              <div class="card-body no-scroller" style="height: 392px;overflow: auto;">-->
              <div class="card-body" style="min-height: 392px;">
                <div class="arrt-list">
                  <div class="arrt-item" v-for="(v, i) in tokenInfo.attributeResList" :key="`attr-item-${i}`">
                    <p class="attr-name">{{ v.type }}</p>
                    <p class="attr-value">{{ v.value }}</p>
                    <div class="attr-bottom">
                      <span class="attr-num"></span>
                      <div>
                        {{ v.percent }}%
                      </div>
                    </div>
                    <div class="attr-bottom">
                      <span class="attr-num">{{ $filters.milliFormat(v.count) }}</span>
                      <div class="attr-bar">
                        <div class="attr-bar-num" :style="{ width: v.percent + '%' }"></div>
                      </div>
                      <!-- <div class="attr-price">
                        <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                        <span class="value">{{nftPriceFun(v.price)}}</span>
                      </div> -->
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
                  <span class="card-title">{{ $t('nftDetail.TokenDetails') }}</span>
                  <!--                  <el-icon class="down">-->
                  <!--                    <ArrowUp />-->
                  <!--                  </el-icon>-->
                </div>
              </template>
              <div class="card-body" style="height: 279px">
                <div class="flex-detial-list">
                  <div class="flex-detial">
                    <span class="name">{{ $t('nftDetail.TokenID') }}</span>
                    <span class="value primaryColor">{{ tokenInfo.tokenId }}</span>
                  </div>
                  <div class="flex-detial">
                    <span class="name">{{ $t('nftDetail.Chain') }}</span>
                    <span class="value">Ethereum</span>
                  </div>
                  <div class="flex-detial">
                    <span class="name">{{ $t('nftDetail.TokenStandard') }}</span>
                    <span class="value">{{ tokenInfo.contractType === 1 ? 'ERC1155' : 'ERC721' }}</span>
                  </div>
                  <div class="flex-detial line">
                  </div>
                  <div class="flex-detial">
                    <span class="name">{{ $t('nftDetail.Contract') }}</span>
                    <div class="value display-flex box-center-Y color-purple"
                      @click="$filters.openWindow($filters.contractExplore(tokenInfo.contract).href)">
                      <div>{{ $filters.contractExplore(tokenInfo.contract).hashShort }}</div>
                      <div class="share-icon"><img src="../../assets/images/icons/share.svg" alt=""></div>
                    </div>
                  </div>
                  <div class="flex-detial">
                    <span class="name">{{ $t('nftDetail.CreatorRebate') }}</span>
                    <div class="value primaryColor display-flex box-center-Y">
                      <el-tooltip placement="right">
                        <template #content>{{ $t('nftDetail.Tip.First') }}<br> {{ $t('nftDetail.Tip.Second') }}</template>
                        <div class="display-flex box-center-Y">
                          <div>{{ $filters.feeFormat(tokenInfo.ckCollectionsInfoEntity.royalty) }}</div>
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
          <router-link :to="`/collection/${$route.params.contract}`" tag="div" class="collection-name">
            <span>{{ tokenInfo.ckCollectionsInfoEntity.name }}</span>
            <svg-icon class="tag" v-if="tokenInfo.ckCollectionsInfoEntity.isCertification === '1'"
              icon-class="icon_tag" />
          </router-link>
          <div class="nft-name">
            <span> {{ tokenInfo.name ? tokenInfo.name : ('#' + tokenInfo.tokenId) }}</span>
            <div class="icon_shoucang" :class="{ active: tokenInfo.followStatus }" alt="" @click="followNft" />
          </div>
          <div class="nft-address" v-if="tokenInfo.contractType === 0">
            <div class="flex-owner">
              <div class="creator">{{ $t('nftDetail.CurrentOwner') }}</div>
              <router-link
                :to="`/account/${(tokenInfo.ownersEntityList !== null && tokenInfo.ownersEntityList.length > 0) ? tokenInfo.ownersEntityList[0].address : ''}`"
                tag="div" class="creator-name">
                {{ $filters.ellipsisAddress((tokenInfo.ownersEntityList !== null && tokenInfo.ownersEntityList.length > 0)
                  ? tokenInfo.ownersEntityList[0].address : '') }}
              </router-link>
            </div>
          </div>
          <div class="display-flex box-center-Y erc1155 nft-address" v-if="tokenInfo.contractType === 1">
            <div class="box-flex1 display-flex box-center-Y">
              <div class="icon-img"><img src="@/assets/images/icons/icon_detail_owner.svg" alt=""></div>
              <div class="txt">{{ tokenInfo.ownersEntityList.length }}</div>
              <div class="tip">{{ $t('nftDetail.Owner') }}</div>
            </div>
            <div class="box-flex1 display-flex box-center-Y">
              <div class="icon-img"><img src="@/assets/images/icons/icon_detail_item.svg" alt=""></div>
              <div class="txt">{{ tokenInfo.ckCollectionsInfoEntity.total }}</div>
              <div class="tip">{{ $t('nftDetail.Item') }}</div>
            </div>
            <div class="box-flex1 display-flex box-center-Y">
              <div class="icon-img"><img src="@/assets/images/icons/icon_detail_own.svg" alt=""></div>
              <div class="txt">{{ youOwnAmount }}</div>
              <div class="tip">{{ $t('nftDetail.YouOwn') }}</div>
            </div>
          </div>
          <div class="nft-bid-box">
            <div class="box-count-down" v-if="ckOrdersEntityList.length > 0">
              <div class="icon-box">
                <img class="icon" src="@/assets/images/icons/icon_time.svg" alt="">
                <span>{{ $t('nftDetail.TimeLeft') }}</span>
              </div>
              <div class="down-flex" v-if="countDownTime !== null">
                <span class="num"> {{ countDownTime.d }}</span>
                <span class="down-label"> DAYS</span>
                <span class="num"> {{ countDownTime.h }}</span>
                <span class="down-label"> HRS</span>
                <span class="num"> {{ countDownTime.m }}</span>
                <span class="down-label"> MINS</span>
                <span class="num"> {{ countDownTime.s }}</span>
                <span class="down-label"> SECS</span>
              </div>
            </div>
            <div class="box-bottom">
              <div class="box-flex" v-if="!(ckAuctionEntityList.length < 1 && ckOrdersEntityList.length < 1)">
                <div class="box-best-offer">
                  <div class="box-title">
                    <img class="icon" src="@/assets/images/icons/price.svg" alt="">
                    {{ $t('nftDetail.CurrentPrice') }}
                  </div>
                  <div class="box-val">
                    <span class="value">{{ nftPrice }}</span>
                    <span class="value">ETH</span>
                    <span class="value-u" v-if="nftPrice && nftPrice !== '--'"> ${{
                      $filters.milliFormat($filters.ethToUsdt(nftPrice)) }}</span>
                  </div>
                </div>
                <div class="box-flex-line" v-if="bestPrice && bestPrice !== '--'"></div>
                <div class="box-best-offer" v-if="bestPrice && bestPrice !== '--'">
                  <div class="box-title">
                    <img class="icon" src="@/assets/images/icons/bestoffer.svg" alt="">
                    {{ $t('nftDetail.BestOffer') }}
                  </div>
                  <div class="box-val">
                    <span class="value">{{ bestPrice }}</span>
                    <span class="value">ETH</span>
                    <span class="value-u" v-if="bestPrice && bestPrice !== '--'"> ${{
                      $filters.milliFormat($filters.ethToUsdt(bestPrice)) }}</span>
                  </div>
                </div>
              </div>
              <div class="btn-box">
                <template v-if="isSelf">
                  <!--                <el-button type="primary" :disabled="youSellAmount >= youOwnAmount || (isSellCoresky === true && isSellOpensea === true)" class="btnBuy" :loading="sellDialogBtnLoading" @click="showSellNft">Sell Now</el-button>-->
                  <el-button type="primary"
                    :disabled="youSellAmount === youOwnAmount || (isSellCoresky === true && isSellOpensea === true)"
                    class="btnBuy" :loading="sellDialogBtnLoading" @click="showSellNft">{{ $t('nftDetail.Sell') }}
                  </el-button>

                  <el-button type="primary" :disabled="youSellAmount === youOwnAmount" class="btnBuy"
                    @click="showTransferNft">Transfer</el-button>

                  <!--                <el-button type="primary" class="btnBuy" v-if="!tokenInfo.state || tokenInfo.contractType === 1"-->
                  <!--                  :loading="sellDialogBtnLoading" @click="showSellNft">Sell Now</el-button>-->
                  <!--                <el-button type="primary" class="btnBuy" v-if="tokenInfo.contractType === 0 && ckOrdersEntityList.length > 0" :loading="cancelBtnLoading"-->
                  <!--                  @click="cancelSell()">Cancel-->
                  <!--                  Sell</el-button>-->
                  <!--                <el-button type="primary" class="btnBuy" v-if="!tokenInfo.state || tokenInfo.contractType === 1"-->
                  <!--                  :loading="sellDialogBtnLoading" @click="showSellNft">Sell Now</el-button>-->
                  <!--                <el-button type="primary" class="btnBuy" v-if="tokenInfo.contractType === 0 && ckOrdersEntityList.length > 0" :loading="cancelBtnLoading"-->
                  <!--                  @click="cancelSell()">Cancel-->
                  <!--                  Sell</el-button>-->
                </template>
                <el-button type="primary" class="btnBuy"
                  v-if="(ckOrdersEntityList.length > 0 && !isSelf && tokenInfo.contractType === 0) || (tokenInfo.contractType === 1 && isSellSelfNft1155)"
                  @click="showBuyNftNow">Buy Now
                </el-button>
                <!--              <el-button class="btnBlack" v-if="!isSelf && !isCart" :disabled="!(!isSelf && !isCart) || !tokenInfo.contract || !tokenInfo.state"-->

                <!--              <el-button class="btnBlack" v-if="tokenInfo.contractType === 0"-->
                <!--                :disabled="(isIncartInit || !tokenInfo.contract || !tokenInfo.state)" @click="addCart">Add to Cart</el-button>-->

                <el-button class="btnWhite" plain
                 v-if="
                 (tokenInfo.contractType === 1 || (tokenInfo.contractType === 0 && !isSelf))
                  && ckAuctionEntityList.filter(item => item.source === 'coresky' && item.maker === user.coinbase).length < 1"
                  :disabled="!tokenInfo.contract || ckAuctionEntityList.filter(item => item.source === 'coresky' && item.maker === user.coinbase).length > 0"
                  @click="showMakeOfferNFT">{{ $t('nftDetail.MakeOffer') }}</el-button>
                <!--              <el-button class="btnWhite" v-if="tokenInfo.contractType === 1 || (!isSelf && !this.isMakeOffer)"-->
                <!--                :disabled="!tokenInfo.contract" @click="showMakeOfferCollect">Make Offer Collect</el-button>-->
              </div>
            </div>
            <!-- v-if="!(ckAuctionEntityList.length < 1 && ckOrdersEntityList.length < 1)" -->
            <!-- <div class="box-flex" v-if="false">
              <div class="box-left">
                <div>{{ $t('nftDetail.CurrentPrice') }}</div>
                <div class="row">
                  <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                  <span class="value">{{ nftPrice }}</span>
                </div>
                <div class="row" v-if="nftPrice && nftPrice !== '--'">
                  ${{ $filters.milliFormat($filters.ethToUsdt(nftPrice)) }}
                </div>
              </div>
              <div class="box-right">
                <div class="row-item">
                  <img class="icon" src="@/assets/images/icons/icon_time.svg" alt="">
                  <span>{{ $t('nftDetail.TimeLeft') }}</span>
                  <span class="item-value" v-html="countDownTime"></span>
                </div>
                <div class="row-item">
                  <img class="icon" src="@/assets/images/icons/icon_frame.svg" alt="">
                  <span>{{ $t('nftDetail.BestOffer') }}</span>
                  <span class="item-value ellipsis" v-if="ckAuctionEntityList.length > 0">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    <el-popover placement="top-start" title="" :width="200" trigger="hover" :content="bestPrice">
                      <template #reference>
                        {{ bestPrice }}
                      </template>
                    </el-popover>
                  </span>
                  <span class="item-value" v-else>--</span>
                </div>
              </div>
            </div> -->

          </div>
        </div>
        <!--        <div class="card-wrap mt30" v-if="tokenInfo.contractType === 1">-->
        <div class="card-wrap mt30">
          <el-collapse v-model="activeName3" accordion>
            <el-collapse-item title="Consistency" name="1">
              <template #title>
                <div class="card-head">
                  <img class="icon" src="@/assets/images/icons/icon_offers.svg" alt="">
                  <span class="card-title">{{ $t('nftDetail.Listing') }}</span>
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
                    <div class="list-th th25">{{ $t('nftDetail.ListingTb.Market') }}</div>
                    <div class="list-th th25">{{ $t('nftDetail.ListingTb.Price') }}</div>
                    <div class="list-th th25" v-if="tokenInfo.contractType === 1">{{ $t('nftDetail.ListingTb.Quantity') }}
                    </div>
                    <div class="list-th th25">{{ $t('nftDetail.ListingTb.Expiration') }}</div>
                    <div class="list-th th25">{{ $t('nftDetail.ListingTb.From') }}</div>
                    <div class="list-th th25 center">{{ $t('nftDetail.ListingTb.Status') }}</div>
                    <div class="list-th th25 center">{{ $t('nftDetail.ListingTb.Cart') }}</div>
                  </div>

                  <div class="list-tr" v-for="(v, i) of ckOrdersEntityList" :key="`listing-item-${i}`">
                    <template v-if="v.source === 'coresky'">
                      <div class="list-th th25">
                        <svg-icon class="platform-logo" icon-class="logo" />
                      </div>
                      <div class="list-th th25 ellipsis">
                        <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                        <el-popover placement="top-start" title="" :width="200" trigger="hover"
                          :content="nftPriceFun(v.basePrice)">
                          <template #reference>
                            {{ nftPriceFun(v.basePrice) }}
                          </template>
                        </el-popover>
                      </div>
                      <div class="list-th th25" v-if="tokenInfo.contractType === 1">{{ $filters.milliFormat(v.amount) }}
                      </div>
                      <div class="list-th th25" :class="isExpired(v.expirationTime) ? 'expired' : ''">
                        {{ $filters.timeFormatTime(v.expirationTime) }}</div>
                      <div class="list-th th25 purple" @click="goExplore(v.maker)">
                        {{ $filters.ellipsisAddress(v.maker, 4) }}</div>
                      <div class="list-th th25 center">
                        <el-button type="primary" :disabled="isExpired(v.expirationTime)" class="btnAccept"
                          v-if="isSelfMakeOffer(v.maker)" :loading="v.id === cancelIdOrHash"
                          @click="cancelSell(v, false)">{{ $t('nftDetail.Cancel') }}</el-button>
                        <el-button type="primary" class="btnAccept" v-else :loading="acceptDialogBtnLoading"
                          :disabled="isExpired(v.expirationTime) || isSelf1155(v.maker)" @click="showBuyNft(v, false)">
                          {{ $t('nftDetail.Buy') }}</el-button>
                      </div>
                      <div class="list-th th25 center">
                        <el-button type="primary" class="btnAccept"
                          :disabled="isCartCoresky(v.id) || isSelfSell(v.maker) || isExpired(v.expirationTime)"
                          @click="addCartList(v.id)">{{ $t('nftDetail.Add') }}</el-button>
                      </div>
                    </template>
                    <template v-else>
                      <div class="list-th th25">
                        <svg-icon class="platform-logo" icon-class="os-logo" />
                      </div>
                      <div class="list-th th25 ellipsis">
                        <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                        <el-popover placement="top-start" title="" :width="200" trigger="hover"
                          :content="nftPriceFun(v.currentPrice)">
                          <template #reference>
                            {{ nftPriceFun(v.currentPrice) }}
                          </template>
                        </el-popover>
                      </div>
                      <div class="list-th th25" v-if="tokenInfo.contractType === 1">
                        {{ $filters.milliFormat(v.protocolData.parameters.offer[0].startAmount) }}</div>
                      <div class="list-th th25" :class="isExpired(v.expirationTime) ? 'expired' : ''">
                        {{ $filters.timeFormatTime(v.expirationTime) }}</div>
                      <div class="list-th th25 purple" @click="goExplore(v.maker.address)">
                        {{ $filters.ellipsisAddress(v.maker.address, 4) }}</div>
                      <div class="list-th th25 center">
                        <el-button type="primary" class="btnAccept" :disabled="isExpired(v.expirationTime)"
                          v-if="isSelfMakeOffer(v.maker.address)" :loading="v.orderHash === cancelIdOrHash"
                          @click="cancelSell(v, true)">{{ $t('nftDetail.Cancel') }}</el-button>
                        <el-button type="primary" class="btnAccept" v-else
                          :disabled="isSelf1155(v.maker.address) || isExpired(v.expirationTime)"
                          :loading="acceptDialogBtnLoading" @click="showBuyNft(v, true)">Buy</el-button>
                      </div>
                      <div class="list-th th25 center">
                        <el-button type="primary" class="btnAccept"
                          :disabled="isInCartOpensea(v.orderHash) || isSelfSell(v.maker.address) || isExpired(v.expirationTime)"
                          @click="addCartOpensea(v)">{{ $t('nftDetail.Add') }}</el-button>
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
                  <span class="card-title">{{ $t('nftDetail.Offers') }}</span>
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
                    <div class="list-th th25">{{ $t('nftDetail.ListingTb.Market') }}</div>
                    <div class="list-th th25">{{ $t('nftDetail.ListingTb.Price') }}</div>
                    <div class="list-th th25" v-if="tokenInfo.contractType === 1">{{ $t('nftDetail.ListingTb.Quantity') }}
                    </div>
                    <div class="list-th th25">{{ $t('nftDetail.ListingTb.Expiration') }}</div>
                    <div class="list-th th25">{{ $t('nftDetail.ListingTb.From') }}</div>
                    <div class="list-th th25 center">{{ $t('nftDetail.ListingTb.Status') }}</div>
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
                        <svg-icon class="platform-logo" icon-class="logo" />
                      </div>
                      <div class="list-th th25 ellipsis">
                        <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                        <el-popover placement="top-start" title="" :width="200" trigger="hover"
                          :content="nftPriceFun(v.basePrice)">
                          <template #reference>
                            {{ nftPriceFun(v.basePrice) }}
                          </template>
                        </el-popover>
                      </div>
                      <div class="list-th th25" v-if="tokenInfo.contractType === 1">{{ $filters.milliFormat(v.amount) }}
                      </div>
                      <div class="list-th th25" :class="isExpired(v.expirationTime) ? 'expired' : ''">
                        {{ $filters.timeFormatTime(v.expirationTime) }}</div>
                      <div class="list-th th25 purple" @click="goExplore(v.maker)">
                        {{ $filters.ellipsisAddress(v.maker, 4) }}</div>
                      <div class="list-th th25 center">
                        <el-button type="primary" :disabled="isExpired(v.expirationTime)" class="btnAccept"
                          v-if="isSelfMakeOffer(v.maker)" :loading="v.id === cancelIdOrHash"
                          @click="cancelMakeOffer(v, false)">{{ $t('nftDetail.Cancel') }}</el-button>
                        <el-button type="primary" class="btnAccept" v-else
                          :disabled="!isSelf || isExpired(v.expirationTime)" :loading="acceptDialogBtnLoading"
                          @click="showAcceptOfferNFT(v, false)">{{ $t('nftDetail.Accept') }}</el-button>
                      </div>
                    </template>
                    <template v-else>
                      <div class="list-th th25">
                        <svg-icon class="platform-logo" icon-class="os-logo" />
                      </div>
                      <div class="list-th th25 ellipsis">
                        <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                        <el-popover placement="top-start" title="" :width="200" trigger="hover"
                          :content="nftPriceFun(v.currentPrice)">
                          <template #reference>
                            {{ nftPriceFun(v.currentPrice) }}
                          </template>
                        </el-popover>
                      </div>
                      <div class="list-th th25" v-if="tokenInfo.contractType === 1">
                        {{ $filters.milliFormat(v.protocolData.parameters.consideration[0].startAmount) }}</div>
                      <div class="list-th th25" :class="isExpired(v.expirationTime) ? 'expired' : ''">
                        {{ $filters.timeFormatTime(v.expirationTime) }}</div>
                      <div class="list-th th25 purple" @click="goExplore(v.maker.address)">
                        {{ $filters.ellipsisAddress(v.maker.address, 4) }}</div>
                      <div class="list-th th25 center">
                        <el-button type="primary" :disabled="isExpired(v.expirationTime)" class="btnAccept"
                          v-if="isSelfMakeOffer(v.maker.address)" :loading="v.orderHash === cancelIdOrHash"
                          @click="cancelMakeOffer(v, true)">{{ $t('nftDetail.Cancel') }}</el-button>
                        <el-button type="primary" class="btnAccept" v-else
                          :disabled="!isSelf || isExpired(v.expirationTime)" :loading="acceptDialogBtnLoading"
                          @click="showAcceptOfferNFT(v, true)">{{ $t('nftDetail.Accept') }}</el-button>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="card-wrap mt30">
          <el-collapse v-model="activeName2" accordion>
            <el-collapse-item title="Consistency" name="1">
              <template #title>
                <div class="card-head">
                  <img class="icon" src="@/assets/images/icons/icon_pricehistory.svg" alt="">
                  <span class="card-title">{{ $t('nftDetail.PriceHistory') }}</span>
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
      </div>
    </div>

    <div class="card-wrap mt30 activity-wrap">
      <el-collapse v-model="activeName4" accordion>
        <el-collapse-item title="Consistency" name="1">
          <template #title>
            <div class="card-head">
              <img class="icon" src="@/assets/images/icons/icon_Item_activity.svg" alt="">
              <span class="card-title">{{ $t('nftDetail.ItemActivity') }}</span>
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
                <div class="list-th" style="width:20%">{{ $t('nftDetail.ListingTb.Market') }}</div>
                <div class="list-th" style="width:20%">{{ $t('nftDetail.ActivityTb.Event') }}</div>
                <div class="list-th" style="width:20%">{{ $t('nftDetail.ActivityTb.Price') }}</div>
                <div class="list-th" style="width:20%">{{ $t('nftDetail.ActivityTb.From') }}</div>
                <div class="list-th" style="width:20%">{{ $t('nftDetail.ActivityTb.To') }}</div>
                <div class="list-th" style="width:20%">{{ $t('nftDetail.ActivityTb.Date') }}</div>
              </div>
              <div class="list-tr" v-for="(v, i) in tokenEventList" :key="`token-event-item-${i}`">
                <div class="list-th display-flex box-center-Y" style="width:20%">
                  <svg-icon class="platform-logo" icon-class="logo" v-if="!v.source" />
                  <svg-icon class="platform-logo" v-else icon-class="os-logo" />
                </div>
                <div class="list-th display-flex box-center-Y" style="width:20%">
                  <div class="event-icon"><img :src="require(`../../assets/images/icons/icon_event_${v.type}.svg`)"
                      alt=""></div>
                  <div>{{ v.typeUp }}</div>
                  <div class="expired" v-if="status === 3">Expired</div>
                </div>
                <div class="list-th" style="width:20%">
                  {{ nftPriceFun(v.price) === '--' ? '--' : (nftPriceFun(v.price) + ' ETH') }}</div>
                <div class="list-th" @click="goExplore(v.addressFrom)" :class="{ purple: v.addressFrom !== null }"
                  style="width:20%">
                  {{ $filters.ellipsisAddress(v.addressFrom, 4) }}</div>
                <div class="list-th" @click="goExplore(v.addressTo)" :class="{ purple: !!v.addressTo }" style="width:20%">
                  {{ $filters.ellipsisAddress(v.addressTo, 4) }}</div>
                <div class="list-th display-flex box-center-Y" style="width:20%" :class="{ gray: v.hash === null }">
                  <div>{{ $filters.timeFormat(v.createTime) }}</div>
                  <div class="share-icon" v-show="v.hash !== null" @click="goExplore(v.hash, true)"><img
                      src="../../assets/images/icons/share.svg" alt=""></div>
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
    <NFTDialogTransfer ref="NFTDialogTransfer" @transferSuccess="transferSuccess" />
    <div class="web-loading" v-if="loading" v-loading.fullscreen.lock="loading"></div>
  </div>
</template>

<script>
import NFTDialogSell from '../../components/self/NFTDialogSell'
import NFTDialogMakeOffer from '../../components/self/NFTDialogMakeOffer'
import NFTDialogAcceptOffer from '../../components/self/NFTDialogAcceptOffer'

import NFTDialogBuy from '../../components/self/NFTDialogBuy'
import NFTDialogTransfer from '../../components/self/NFTDialogTransfer'
import { setLocalStorage, getLocalStorage, removeLocalStorage } from "@/util/local-storage";
import BigNumber from 'bignumber.js'
import * as echarts from "echarts";

export default {
  name: "NFTDetail",
  components: {
    NFTDialogSell,
    NFTDialogBuy,
    NFTDialogMakeOffer,
    NFTDialogAcceptOffer,
    NFTDialogTransfer
  },
  mixins: [],
  data () {
    return {
      loading: true,
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
      cancelIdOrHash: undefined,
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
      youSellAmount: 0,
      isSellCoresky: false,
      isSellOpensea: false,
      tokenInfo: {
        contract: '',
        tokenId: '',
        ckCollectionsInfoEntity: {
          bannerImage: '',
          image: ''
        },
        oriImage: ''
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
      countDownTime: null,
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
    // this.getOrdersAndOffers()
    // this.isInCart()
  },
  computed: {
    config () {
      return this.$store.state.config;
    },
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
    isSellSelfNft1155 () {
      let otherOrder = this.ckOrdersEntityList.filter(item => !((item.source === 'coresky' && item.maker === this.user.coinbase) || (item.source === 'opensea' && item.maker.address === this.user.coinbase)))
      return otherOrder.length > 0
    },
    isSelf1155 (maker) {
      return maker.toLowerCase() === this.user.coinbase.toLowerCase()
    },
    isExpired (time) {
      return time !== null ? new Date().getTime() > time * 1000 : false
    },
    goExplore (address, isTx = false) {
      console.log(address, isTx)
      if (address !== null && address !== '--' && !!address) {
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
                color: '#1063E0',
                lineStyle: {
                  color: '#1063E0'
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
        return null
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
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      // if (parseInt(h) === 0 && parseInt(m) === 0) {
      //   return s + "s";
      // } else if (parseInt(h) === 0) {
      //   return m + "m  " + s + "s";
      // } else if (parseInt(d) === 0) {
      //   return h + "h    " + m + "m    " + s + "s";
      // } else {
      //   return d + "d    " + h + "h    " + m + "m    " + s + "s";
      // }
      return {
        M,
        d,
        h,
        m,
        s,
      }
    },
    // 定时器
    // 页面多个倒计时 归零时清除
    countDown () {
      let that = this;
      that.countDownFn = setInterval(() => {
        //  console.log(that.countDownFun(item.endTime))
        if (that.ckOrdersEntityList.length < 1) {
          clearInterval(that.countDownFn); //清除定时器
        } else {
          let countDownTime = that.countDownFun(that.ckOrdersEntityList[0].expirationTime);
          if (countDownTime !== null) {
            this.countDownTime = countDownTime
          }
          else {
            clearInterval(that.countDownFn); //清除定时器
          }
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
      let shoppingList = this.$store.state.shoppingCartList || []
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
      if (coresky_cart.length > 0) {
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
      this.$tools.notification(this.$t('messageTip.addedCart'))
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
    addCartOpensea (v) {
      if (!v) {
        return
      }
      this.$store.commit('addShoppingCartOpensea', v)
      this.$tools.notification(this.$t('messageTip.addedCart'))
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
    sortOrdersAndOffer (data, isOrder = false) {
      if (data.length === 0) return []
      function compare () { //这是比较函数
        return function (m, n) {
          let mmprice = m.source === 'coresky' ? m.basePrice : m.currentPrice
          let mprice = new BigNumber(mmprice)
          let nnprice = n.source === 'coresky' ? n.basePrice : n.currentPrice
          let nprice = new BigNumber(nnprice)
          if (mprice.isEqualTo(nprice)) {
            if (m.expirationTime > n.expirationTime) {
              return -1;
            } else if (m.expirationTime < n.expirationTime) {
              return 1;
            } else {
              return 0
            }
          }
          if (nprice.isLessThan(mprice)) {
            return isOrder ? 1 : -1;
          } else if (mprice.isLessThan(nprice)) {
            return isOrder ? -1 : 1;
          } else {
            return 0
          }
        }
      }
      return data.sort(compare())
    },
    getTokenInfo () {
      this.isSellCoresky = false
      this.isSellOpensea = false
      this.getTokenEvent()
      this.loading = true
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
        this.youSellAmount = 0
        if (listed.length > 0) {
          listed = listed.filter(item => item.expirationTime > (new Date().getTime() / 1000))
          listed = listed.map(item => {
            item.source = "coresky"
            if (this.tokenInfo.contractType === 1 && item.maker === this.user.coinbase) {
              this.youSellAmount += item.amount
            }
            return item
          })
        }
        const sellSelf = listed.filter(item => item.maker === this.user.coinbase)
        this.isSellCoresky = sellSelf.length > 0

        this.ckAuctionEntityList = this.sortOrdersAndOffer(offer)
        this.ckOrdersEntityList = this.sortOrdersAndOffer(listed, true)
        this.bestPrice = this.ckAuctionEntityList.length > 0 ? this.nftPriceFun(this.ckAuctionEntityList[0].basePrice) : '--'
        this.nftPrice = this.ckOrdersEntityList.length > 0 ? this.nftPriceFun(this.ckOrdersEntityList[0].basePrice) : '--'
        setTimeout(() => {
          this.loading = false
        }, 3000)
        await this.getOrdersAndOffers()
        if (this.ckOrdersEntityList.length > 0) {
          this.countDown()
        } else {
          this.countDownTime = null
        }
        this.loading = false
        // this.isInCart()
      })
    },
    putTokenPrice (params) {
      this.$api("token.price", {
        ...{
          "tokenId": Number(this.tokenInfo.tokenId),
          "contract": this.tokenInfo.contract,
        },
        ...params
      }).then(res => {
        console.log(res)
      })
    },
    async getOrdersAndOffers () {
      let params = {
        "osMinListedPrice": "0",
        "osListingTime": "0",
        "osExpirationTime": "0",
        "osMaxOfferPrice": "0"
      }
      const openseaListed = await this.$sdk.getOrdersOpensea(this.asset, this.user.coinbase, this.tokenInfo.contractType)
      if (openseaListed.code === 200) {
        if (this.tokenInfo.contractType === 1) {
          this.youSellAmount += openseaListed.sellAmount
        }
        const sellSelf = openseaListed.data.filter(item => item.maker.address === this.user.coinbase)
        this.isSellOpensea = sellSelf.length > 0
        this.ckOrdersEntityList = [...this.ckOrdersEntityList, ...openseaListed.data]
        this.ckOrdersEntityList = this.sortOrdersAndOffer(this.ckOrdersEntityList, true)
        console.log(this.ckOrdersEntityList)
        if (openseaListed.data.length > 0) {
          this.nftPrice = this.nftPriceFun(this.ckOrdersEntityList[0].source === 'opensea' ? this.ckOrdersEntityList[0].currentPrice : this.ckOrdersEntityList[0].basePrice)
          const filtersListing = this.sortOrdersAndOffer(openseaListed.data, true)
          params.osMinListedPrice = filtersListing[0].currentPrice
          params.osListingTime = filtersListing[0].listingTime
        }
        console.log(this.nftPrice)
      } else {
        this.isSellOpensea = false
      }
      console.log('this.youSellAmount', this.youSellAmount)
      await this.$sdk._sleep(2000)
      const openseaOffers = await this.$sdk.getOffersOpensea(this.asset)
      if (openseaOffers.code === 200) {
        this.ckAuctionEntityList = [...this.ckAuctionEntityList, ...openseaOffers.data]
        this.ckAuctionEntityList = this.sortOrdersAndOffer(this.ckAuctionEntityList)
        console.log('openseaOffers.data', openseaOffers.data)
        if (openseaOffers.data.length > 0) {
          this.bestPrice = this.nftPriceFun(this.ckAuctionEntityList[0].source === 'opensea' ? this.ckAuctionEntityList[0].currentPrice : this.ckAuctionEntityList[0].basePrice)
          const filtersOffer = this.sortOrdersAndOffer(openseaOffers.data)
          params.osMaxOfferPrice = filtersOffer[0].currentPrice
          params.osExpirationTime = filtersOffer[0].expirationTime
        }
      }
      console.log(this.ckAuctionEntityList, this.ckOrdersEntityList)
      if (openseaOffers.code === 200 && openseaListed.code === 200) {
        this.putTokenPrice(params)
      }
      // await this.$sdk._sleep(2000)
      // await this.$sdk.getOffersOpenseaCollect(this.asset)
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
        this.tokenEventList.sort((function (a, b) {
          return b.createTime - a.createTime
        }))
        this.tokenEventType = tokenEventType
        this.checkList = tokenEventType
        this.tokenEventListOrigin = this.tokenEventList
        console.log(this.tokenEventList, tokenEventType)
      })
    },
    showSellNft () {
      if (this.isSellCoresky && this.isSellOpensea) {
        this.$tools.message(this.$t('messageTip.platformOneQuotation'), 'warning');
        return
      }
      this.$router.push({
        path: `/listings/${this.tokenInfoParams.contract}/${this.tokenInfoParams.tokenId}`
      })
      // this.sellDialogBtnLoading = true
      // this.$refs.NFTDialogSell.showSell(this.tokenInfo)
    },
    showTransferNft () {
      this.$refs.NFTDialogTransfer.showTransfer(this.tokenInfo)
    },
    async cancelMakeOffer (v, isOpensea = false) {
      this.cancelIdOrHash = isOpensea ? v.orderHash : v.id
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
          this.cancelIdOrHash = undefined
          this.cancelMakeOfferBtnLoading = false
          return
        }
        this.$api("order.cancel", {
          id: v.id,
          type: this.$sdk.valueOrderType("MAKE_OFFER")
        }).then((res) => {
          this.cancelIdOrHash = undefined
          this.cancelMakeOfferBtnLoading = false
          this.$tools.message(this.$t('messageTip.OfferCanceled'), 'success');
          this.getTokenInfo()
        })
      } catch (e) {
        console.log(e)
        this.cancelIdOrHash = undefined
        this.cancelMakeOfferBtnLoading = false
      }
    },
    async cancelSell (cancelItem = null, isOpensea = false) {
      this.cancelIdOrHash = isOpensea ? cancelItem.orderHash : cancelItem.id
      if (isOpensea) {
        this.cancelSellOpensea(cancelItem)
      } else {
        this.cancelSellCoresky(cancelItem)
      }
    },
    async cancelSellCoresky (cancelItem) {
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
          this.cancelIdOrHash = undefined
          return
        }
        this.$api("order.cancel", {
          id: cancelItem.id,
          type: this.$sdk.valueOrderType("SALE")
        }).then((res) => {
          this.cancelIdOrHash = undefined
          this.cancelBtnLoading = false
          this.$tools.message(this.$t('messageTip.SellCanceled'), 'success');
          this.getTokenInfo()
        })
      } catch (e) {
        console.log(e)
        this.cancelIdOrHash = undefined
        this.cancelBtnLoading = false
      }
    },
    async cancelSellOpensea (cancelItem) {
      console.log(cancelItem)
      if (cancelItem === null) {
        this.cancelIdOrHash = undefined
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
        this.$tools.message(this.$t('messageTip.SellCanceled'), 'success');
        this.getTokenInfo()
        this.cancelIdOrHash = undefined
      } catch (e) {
        console.log(e)
        this.$tools.message(this.$filters.filterMsgOpenseaErr(e), 'warning');
        this.cancelIdOrHash = undefined
        this.cancelBtnLoading = false
      }
    },
    showBuyNftNow () {
      this.showBuyNft()
    },
    showBuyNft (v = null, isOpensea = false) {
      if (v === null) {
        let otherOrder = this.ckOrdersEntityList.filter(item => !((item.source === 'coresky' && item.maker === this.user.coinbase) || (item.source === 'opensea' && item.maker.address === this.user.coinbase)))
        if (otherOrder.length === 1 || (otherOrder.length > 1 && otherOrder[0].source === 'coresky')) {
          this.$refs.NFTDialogBuy.showBuy(this.tokenInfo, otherOrder[0], otherOrder[0].source === 'opensea')
        } else if (otherOrder.length > 1) {
          if (otherOrder[1].source === 'coresky') {
            let basePrice0 = otherOrder[0].source === 'opensea' ? otherOrder[0].currentPrice : otherOrder[0].basePrice
            let basePrice1 = otherOrder[1].source === 'opensea' ? otherOrder[1].currentPrice : otherOrder[1].basePrice
            if (new BigNumber(basePrice0).isEqualTo(new BigNumber(basePrice1))) {
              this.$refs.NFTDialogBuy.showBuy(this.tokenInfo, otherOrder[1], otherOrder[1].source === 'opensea')
            } else {
              this.$refs.NFTDialogBuy.showBuy(this.tokenInfo, otherOrder[0], otherOrder[0].source === 'opensea')
            }
          } else {
            this.$refs.NFTDialogBuy.showBuy(this.tokenInfo, otherOrder[0], otherOrder[0].source === 'opensea')
          }
        }
      } else {
        this.$refs.NFTDialogBuy.showBuy(this.tokenInfo, v, isOpensea)
      }
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
        this.$tools.message(this.$filters.filterMsgOpenseaErr(e), 'warning');
      }
    },
    nftPriceFun (basePrice) {
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
    transferSuccess (v) {
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
      this.$refs.NFTDialogAcceptOffer.show(this.tokenInfo, v, 1, isOpensea)
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
.nft-detail {
  padding: 36px 40px;
  margin-bottom: 20px;
  .flex-center {
    display: flex;
    /*flex-flow: row wrap;*/
    justify-content: space-between;
  }
  .page-left {
    flex: 3 0 0%;
    max-width: 50%;
    min-width: 40%;
    width: 0px;

    display: flex;
    flex-direction: column;
    /*justify-content: space-between;*/
    .detail-img-box {
      border-radius: 10px;
      border: 1px solid rgb(229, 232, 235);
      overflow: hidden;

      .detail-img-box-center {
        position: relative;
        height: 0px;
        padding-bottom: 100%;
        .img-inset {
          inset: 0px;
          position: absolute;
          .el-image {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }
  .page-right {
    flex: 4 0 0%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    /*justify-content: space-between;*/
    .collection-name {
      cursor: pointer;
      color: #1063e0;
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      // background: $mainLiner;
      // -webkit-text-fill-color: transparent;
      // background-clip: text;
      .tag {
        margin-left: 5px;
        vertical-align: middle;
        display: inline-block;
        width: 20px;
        height: 20px;
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
      margin-top: 30px;
      font-weight: 700;
      font-size: 30px;
      line-height: 35px;
      color: #111111;
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
      .flex-owner {
        display: flex;
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
        text-transform: capitalize;
        .creator {
          color: #717a83;
          margin-right: 10px;
        }
        .creator-name {
          color: #1063e0;
        }
      }
      &.erc1155 {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: #717a83;
        padding-top: 26px;
        padding-bottom: 10px;
        font-size: 18px;
        line-height: 21px;
        .tip {
          // margin-right: 4px;
        }
        .icon-img {
          width: 24px;
          height: 24px;
        }
        .txt {
          margin: 0 10px;
          font-weight: 500;

          color: #1063e0;
        }
      }
    }
    .nft-bid-box {
      margin-top: 24px;
      border: 1px solid $borderBg;
      border-radius: 12px;
      font-size: 14px;
      color: $color-black2;
      overflow: hidden;
      .box-count-down {
        height: 124px;
        background: #ffffff;
        border-bottom: 1px solid #E6E8EC;
        padding: 24px;
        .icon-box {
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 18px;
          line-height: 27px;
          color: #717A83;
          .icon {
            width: 24px;
            height: 24px;
            margin-right: 8px;
          }
        }
        .down-flex {
          margin-top: 5px;
          display: flex;
          align-items: center;
          .num {
            width: 46px;
            font-size: 30px;
            line-height: 45px;
            color: #111111;
            text-align: center;
          }
          .down-label {
            width: 46px;
            height: 26px;
            font-weight: 700;
            line-height: 26px;
            text-align: center;
            background: #E6E8EC;
            border-radius: 4px;
            font-size: 12px;
            color: #717A83;
            margin-right: 25px;
          }
        }

      }
      .box-bottom {
        padding: 24px;
        background: #FAFCFE;
      }


      .box-flex {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-bottom: 24px;
        // justify-content: space-between;
        .box-flex-line {
          width: 1px;
          background: #D9D9D9;
          margin: 0 40px;

        }
        .box-best-offer {
          min-width: 280px;
          // width: ;
          flex: 1 0 0;
        }
        .box-title {
          display: flex;
          font-size: 18px;
          line-height: 27px;
          color: #717A83;
          .icon {
            width: 24px;
            height: 24px;
            margin-right: 5px;
          }
        }
        .box-val {
          margin-top: 5px;
          display: flex;
          font-weight: 700;
          font-size: 30px;
          line-height: 150%;
          color: #111111;
          .value {
            margin-right: 5px;
          }
          .value-u {
            font-weight: 500;
            font-size: 18px;
            display: flex;
            align-items: flex-end;
            color: #717A83;
          }

        }
      }
      .box-left {
        margin-right: 24px;
        // width: 318px;
        flex: 3 0 0;
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
        flex: 4 0 0;
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
            font-weight: 500;
            font-size: 14px;
            color: $primaryColor;
            width: 160px;
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
        display: flex;


        button {
          width: 210px;
          height: 48px;
          padding: 10px 0;
          border-radius: 12px;
          font-weight: 700;
          border-width: 2px;
          cursor: pointer;
          flex: 1 0 0;
          &.btnBuy {
            color: $color-white;
            // background: $mainLiner;
          }
          &.btnBlack {
            color: $color-white;
            background: $primaryColor;
          }
          &.btnWhite {
            // color: $primaryColor;
            // background: $color-white;
            // border: 1px solid $primaryColor;
          }
          // &:hover {
          //   opacity: 0.8;
          // }
        }
      }
    }
  }
  .card-wrap {
    border-radius: 12px;
    border: 1px solid #e6e8ec;
    background: #fafcfe;
    overflow: hidden;
    ::v-deep {
      .el-collapse-item {
        .el-collapse-item__header.is-active {
          background: #ffffff !important;
        }
      }
    }
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
      background: #fafcfe;
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
    display: grid;
    gap: 18px;
    grid-auto-rows: minmax(0px, 1fr);
    grid-template-columns: repeat(2, minmax(0, 1fr));

    .arrt-item {
      padding: 12px;
      color: $color-black3;
      background: #ffffff;
      border: 1px solid #e6e8ec;
      border-radius: 10px;
      .attr-name {
        font-size: 16px;
        color: #717a83;
      }
      .attr-value {
        color: #1063e0;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        margin-top: 4px;
        margin-bottom: 8px;
      }
      .attr-bottom {
        display: flex;
        align-items: center;
        font-size: 14px;
        .attr-num {
          font-weight: 400;
          width: 60px;
          flex-grow: 0;
        }
        .attr-bar {
          flex-grow: 1;
          background: #ebefff;
          border-radius: 8px;
          height: 10px;
          overflow: hidden;
          .attr-bar-num {
            background: #1063e0;
            width: 50px;
            height: 100%;
          }
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
      height: 24px;
      line-height: 24px;
      font-weight: 500;
      font-size: 16px;
      color: #717a83;
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
        font-weight: 600;
        z-index: 10;
        background: #fafcfe;
        &.top0 {
          top: 0;
        }
      }
      &.placeholder {
        height: 56px;
      }
      .list-th {
        cursor: pointer;
        padding-right: 8px;
        font-size: 16px;
        color: #717a83;
        font-weight: 400;
        .event-icon {
          width: 24px;
          height: 24px;
          margin-right: 4px;
        }
        .share-icon {}
        &.gray {
          color: $color-black3;
        }
        .expired,
        &.expired {
          padding-left: 4px;
          color: $color-red;
          font-weight: 500;
        }
      }
      .platform-logo {
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
      // cursor: pointer;
      // color: $color-white;
      // background: $mainLiner;
      &.is-disabled {
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
      .el-checkbox__input.is-checked+.el-checkbox__label {
        color: $primaryColor;
      }
      .el-checkbox__inner::after {
        border-color: $primaryColor;
      }
    }
  }
}
.colorPrimary {
  color: #1063e0;
}
</style>

