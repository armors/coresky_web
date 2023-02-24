<template>
  <div class="collection-detail">
    <div class="bg-box"
      :style="collectInfo.bannerImage ? 'background: url(' + collectInfo.bannerImage + ') no-repeat; background-size: cover;' : ''">
    </div>
    <div class="collection-info">
      <div class="info-top">
        <div class="avatar-box">
          <img :src="collectInfo.image" alt="">
        </div>
        <div class="info-title">
          <div class="title">
            <span>{{ collectInfo.name }}</span>
            <img class="tag" src="../../assets/images/icons/icon_list_blue.svg" alt="">
          </div>
          <!-- <div class="creator">
            <span class="txt">By</span>
            <span class="name">{{$filters.ellipsisAddress(collectInfo.owner, 4)}}</span>
            <img src="../../assets/images/icons/icon_tag_purple.svg" alt="">
          </div> -->
        </div>
        <div class="share-wrap">
          <div class="icon-img " :class="{ active: collectInfo.followStatus }" @click="followContract">
            <img class="tag" src="../../assets/images/icons/icon_collect_collect.svg" alt="">
          </div>
          <a class="icon-img " target="_blank" :href="collectInfo.website">
            <img class="tag" src="../../assets/images/icons/icon_collect_global.svg" alt="">
          </a>
          <a class="icon-img " target="_blank" :href="collectInfo.twitter">
            <img class="tag" src="../../assets/images/icons/icon_collect_twitter.svg" alt="">
          </a>
          <a class="icon-img " target="_blank" :href="collectInfo.discord">
            <img class="tag" src="../../assets/images/icons/icon_collect_discord.svg" alt="">
          </a>
          <!-- <div class="icon-img icon-img-collect"></div> -->
          <!-- <div class="icon-img icon-img-share"></div> -->
          <!-- <div class="icon-img icon-img-more"></div> -->
        </div>
      </div>
      <div class="info-val">
        <div class="item">
          <span class="lable">{{ $t('collection.items') }}</span>
          <span class="value">{{ $filters.milliFormat(collectInfo.total) }}</span>
        </div>
        <!-- <div class="item">
          <span class="lable">{{ $t('collection.created') }}:</span>
          <span class="value">{{$filters.timeToUTC(collectInfo.deployTime)}}</span>
        </div> -->
        <div class="item">
          <span class="lable">{{ $t('collection.creatorFee') }}</span>
          <span class="value">{{ $filters.feeFormat(collectInfo.royalty) }}</span>
        </div>
        <div class="item">|</div>
        <div class="item">
          <span class="lable">{{ $t('collection.chain') }}</span>
          <span class="value">Ethereum</span>
        </div>
        <div class="item">|</div>
        <div class="item">
          <span class="lable">{{ $t('collection.contractADD') }}</span>
          <a class="value" target="_blank" :href="'https://etherscan.io/address/' + collectInfo.contract">{{
            $filters.ellipsisAddress(collectInfo.contract) }}</a>
          <el-icon v-clipboard:copy="collectInfo.contract" v-clipboard:success="onSuccessCopy"
            v-clipboard:error="onErrorCopy">
            <CopyDocument />
          </el-icon>
        </div>
      </div>
      <div class="info-rem">{{ collectInfo.info }}</div>
      <div class="info-card">
        <div class="item">
          <div class="value">
            <span>{{ $filters.keepMaxPoint(collectInfo.foolPrice) }}</span>
            <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="" />
          </div>
          <div class="lable">{{ $t('collection.floorPrice') }}</div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio red">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="value">
            <span>{{ $filters.keepMaxPoint(collectInfo.bestPriceFrom) }}</span>
            <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="" />
          </div>
          <div class="lable">{{ $t('collection.bestOffer') }}</div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio green">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="value">
            <span>{{ $filters.keepMaxPoint(collectInfo.dayVol) }}</span>
            <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="" />
          </div>
          <div class="lable">{{ $t('collection.hrVolume') }}</div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio green">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="value">
            <span>{{ $filters.keepMaxPoint(collectInfo.volume) }}</span>
            <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="" />
          </div>
          <div class="lable">{{ $t('collection.totalVolume') }}</div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio green">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="value">
            <span>{{ $filters.milliFormat(collectInfo.holder) }}</span>
          </div>
          <div class="lable">{{ $t('collection.owers') }}</div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio green">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="value">
            <span>{{ $filters.milliFormat(collectInfo.total) }}</span>
          </div>
          <div class="lable">{{ $t('collection.items') }}</div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio green">-254.75%</span>
          </div>
        </div>
      </div>
      <div class="tab-box-self">
        <collectionNFT :contract="contract" />
      </div>
    </div>
    <NFTDialogMakeOffer ref="NFTDialogMakeOffer" @makeOfferSuccess="makeOfferSuccess"></NFTDialogMakeOffer>
  </div>
</template>
<script>
import collectionNFT from './components/collectionNFT'
import NFTDialogMakeOffer from '../../components/self/NFTDialogMakeOffer'

export default {
  name: "Collection",
  components: {
    collectionNFT,
    NFTDialogMakeOffer
  },
  mixins: [],
  data() {
    return {
      EXPLORE_URL: process.env.VUE_APP_EXPLORE,
      activeName: 'collected',
      dataInfo: {
        imgUrl: "https://storage.nfte.ai/asset/collection/featured/LSIWBMDTLHJRKSITPNVQWFNCVCOKRIGG.jpg?x-oss-process=image/resize,m_fill,w_4096,h_180",
        address: "",
      },
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sort: '',
        minPrice: '',
        maxPrice: '',
        isNowBuy: true,
      },
      tokenQueryParams: {
        "keyword": "",
        "contract": this.contract,
        "buyNow": true,
        "minPrice": 0,
        "maxPrice": 0,
        "order": 0,
        "filter": {},
        page: 1,
        limit: 20
      },
      attrList: [],
      contract: '',
      collectInfo: {
        bannerImage: '',
        image: ''
      },
      tokenList: [],
      followStatus: false,
    };
  },

  created() {
    this.contract = this.$route.params.contract
    this.tokenQueryParams.contract = this.contract
  },
  mounted() {
    if (this.contract) {
      this.getCollectInfo()
    }
  },
  computed: {

  },

  methods: {
    showMakeOfferCollect() {
      this.$refs.NFTDialogMakeOffer.showMakeOffer(this.collectInfo, 2)
    },
    makeOfferSuccess(v) {
      console.log(v)
    },
    onSuccessCopy() {
      this.$tools.message(this.$t("request.copySuccess"), "success");
    },
    onErrorCopy() {
      this.$tools.message(this.$t("request.copyError"));
    },
    getCollectInfo() {
      this.$api("collect.info", {
        contract: this.contract
      }).then((res) => {
        this.collectInfo = res.debug
        this.collectInfo.bestPriceFrom = this.$sdk.fromWeiNum(this.collectInfo.bestPrice)
      })
    },
    followContract() {
      const tokenColloctUrl = this.collectInfo.followStatus ? "collect.contractCancel" : "collect.contractFollow"
      this.$api(tokenColloctUrl, {
        "contract": this.contract,
      }).then((res) => {

        this.collectInfo.followStatus = !this.collectInfo.followStatus
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.collection-detail {
  .bg-box {
    height: 390px;
    width: 100%;
  }

  .collection-info {
    margin: 0 auto;
    margin-top: 15px;
    padding: 0 40px;

    .info-top {
      position: relative;
      display: flex;

      .avatar-box {
        position: absolute;
        left: 0;
        bottom: 58px;
        z-index: 1;
        width: 170px;
        height: 170px;
        padding: 4px;
        background-color: $bg-white;
        border-radius: 16px;
        filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.08));
      }

      .info-title {
        margin-top: 30px;

        .title {
          display: flex;
          // width: 700px;
          align-items: center;
          font-size: 30px;
          line-height: 35px;

          height: 35px;
          color: #111111;

        }

        .tag {
          margin-left: 10px;
          width: 24px;
          height: 24px;
        }

        .creator {
          margin-top: 12px;

          .txt {
            font-size: 18px;
            line-height: 21px;
            color: #111111;
          }

          .name {
            margin-left: 8px;
            font-weight: 500;
            font-size: 18px;
            line-height: 21px;
            color: #111111;
          }

          img {
            margin-left: 8px;
            display: inline-block;
            width: 16px;
            height: 16px;
          }
        }
      }

      .share-wrap {
        margin-top: 22px;

        .icon-img-collect {
          background-color: #fff;
        }

        .icon-img {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          border-radius: 50%;
          &:hover{
            background: #fff;
            box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
          }
          img{
            width: 20px;
            height: auto;
          }
        }
      }
    }

    .info-val {
      display: flex;
      margin-top: 15px;

      .item {
        height: 21px;
        line-height: 21px;
        margin-right: 20px;
        color: #717A83;
        font-size: 16px;
        line-height: 24px;

        .value {
          font-weight: 700;
          margin-left: 5px;
          color: $color-black;
        }

        .el-icon {
          font-size: 15px;
          cursor: pointer;
          margin-left: 5px;
          color: $color-black;
        }
      }
    }

    .info-rem {
      margin-top: 15px;
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 21px;
      color: #000000;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .info-card {
      display: flex;
      // justify-content: space-between;
      margin-top: 60px;
      margin-bottom: 50px;
      color: $color-black3;

      .item {
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        border: 1px solid #E6E8EC;
        border-radius: 12px;
        border-radius: 12px;
        margin-right: 20px;
        padding: 0 26px;

        .lable {
          font-size: 14px;
          line-height: 16px;
          height: 16px;
          color: #717A83;
          margin-top: 4px;
          text-align: left;
        }

        .value {
          display: flex;
          align-items: center;
          line-height: 28px;
          font-weight: 700;
          font-size: 24px;
          color: #111111;

          .token-icon {
            display: inline-block;
            width: 8px;
            height: auto;
            margin-left: 4px;
          }
        }

        .rise {
          display: none;
          /*display: flex;*/
          margin-top: 12px;

          .time {
            font-weight: 500;
            font-size: 12px;
            line-height: 16px;
            height: 20px;
            padding: 2px 6px;
            background: $elButtonHoverBg;
            border-radius: 10px;
            color: $bgPurple;
          }

          .ratio {
            margin-left: 6px;
            font-weight: 700;
            font-size: 14px;
            line-height: 20px;
            height: 20px;

            &.green {
              color: $greenColor;
            }

            &.red {
              color: $redColor;
            }
          }
        }
      }
    }
  }

  ::v-deep {
    .el-tabs__item {
      padding: 0 30px;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: $color-black2;
      padding-bottom: 16px;
      height: 40px;

      &.is-active {
        color: $primaryColor;
      }

      &.is-top:nth-child(2) {
        // padding-right: 30px;
      }
    }

    .el-tabs__active-bar {
      background-color: #111111;
      height: 3px;
    }
  }

  .tab-box-self {
    position: relative;

    .btn-box {
      top: -16px;
      position: absolute;
      right: 0;

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
      }
    }

    .btnWhite {}
  }
}

.right-content {
  width: 100%;
}
</style>
