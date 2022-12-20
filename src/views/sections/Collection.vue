<template>
  <div class="collection-detail">
    <div class="bg-box"
      :style=" collectInfo.bannerImage ? 'background: url('+ collectInfo.bannerImage +') no-repeat; background-size: cover;':'' ">
    </div>
    <div class="collection-info">
      <div class="info-top">
        <div class="avatar-box">
          <img :src="collectInfo.image" alt="">
        </div>
        <div class="info-title">
          <div class="title">
            <span>{{collectInfo.name}}</span>
            <img class="tag" src="../../assets/images/icons/icon_tag.svg" alt="">
          </div>
          <div class="creator">
            <span class="txt">By</span>
            <span class="name">{{$filters.ellipsisAddress(collectInfo.owner, 4)}}</span>
            <img src="../../assets/images/icons/icon_tag_purple.svg" alt="">
          </div>
        </div>
        <div class="info-share">
        </div>
      </div>
      <div class="info-val">
        <div class="item">
          <span class="lable">Items:</span>
          <span class="value">{{$filters.milliFormat(collectInfo.total)}}</span>
        </div>
        <div class="item">
          <span class="lable">Created:</span>
          <span class="value">{{$filters.timeToUTC(collectInfo.createTime)}}</span>
        </div>
        <div class="item">
          <span class="lable">Creator fee:</span>
          <span class="value">10%</span>
        </div>
        <div class="item">
          <span class="lable">Chain:</span>
          <span class="value">Ethereum</span>
        </div>
        <div class="item">
          <span class="lable">Contract ADD:</span>
          <span class="value">{{$filters.ellipsisAddress(collectInfo.contract)}}</span>
          <el-icon v-clipboard:copy="collectInfo.contract" v-clipboard:success="onSuccessCopy"
            v-clipboard:error="onErrorCopy">
            <CopyDocument />
          </el-icon>
        </div>
      </div>
      <div class="info-rem">{{collectInfo.info}}</div>
      <div class="info-card">
        <div class="item">
          <div class="lable">Floor Price</div>
          <div class="value">
            <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="" />
            <span>{{$filters.keepPoint(collectInfo.foolPrice)}}</span>
          </div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio red">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="lable">Best Offier</div>
          <div class="value">
            <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="" />
            <span>{{collectInfo.bestPriceFrom}}</span>
          </div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio green">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="lable">24h Volume</div>
          <div class="value">
            <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="" />
            <span>{{$filters.keepPoint(collectInfo.dayVol)}}</span>
          </div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio green">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="lable">total volume</div>
          <div class="value">
            <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="" />
            <span>{{$filters.keepPoint(collectInfo.volume)}}</span>
          </div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio green">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="lable">Owers</div>
          <div class="value">
            <span>{{$filters.milliFormat(collectInfo.holder)}}</span>
          </div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio green">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="lable">Items</div>
          <div class="value">
            <span>{{$filters.milliFormat(collectInfo.total)}}</span>
          </div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio green">-254.75%</span>
          </div>
        </div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="Collected" name="collected" :lazy="true">
          <collectionNFT :contract="contract" />
        </el-tab-pane>
        <el-tab-pane label="Transaction dynamics" name="transaction" :lazy="true" :disabled="true">
          Transaction dynamics
        </el-tab-pane>
        <el-tab-pane label="Data analysis" name="analysis" :lazy="true" :disabled="true">
          Data analysis
        </el-tab-pane>
      </el-tabs>

    </div>

  </div>
</template>
<script>
import collectionNFT from './components/collectionNFT'

export default {
  name: "Collection",
  components: {
    collectionNFT,
  },
  mixins: [],
  data () {
    return {
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
      attrList: [
        {
          attrNm: 'Background1',
          total: 99,
          isShow: false,
          dataList: [
            {
              name: 'Pearl1',
              num: 100,
              isChecked: false,
            },
            {
              name: 'Pearl2',
              num: 100,
              isChecked: false,
            },
            {
              name: 'Pearl3',
              num: 100,
              isChecked: false,
            }
          ]
        },
        {
          attrNm: 'Background2',
          total: 99,
          isShow: false,
          dataList: [
            {
              name: 'Pearl1',
              num: 100,
              isChecked: false,
            },
            {
              name: 'Pearl2',
              num: 100,
              isChecked: false,
            },
            {
              name: 'Pearl3',
              num: 100,
              isChecked: false,
            }
          ]
        },
        {
          attrNm: 'Background3',
          total: 99,
          isShow: false,
          dataList: [
            {
              name: 'Pearl1',
              num: 100,
              isChecked: false,
            },
            {
              name: 'Pearl2',
              num: 100,
              isChecked: false,
            },
            {
              name: 'Pearl3',
              num: 100,
              isChecked: false,
            }
          ]
        }
      ],
      contract: '',
      collectInfo: {
        bannerImage: '',
        image: ''
      },
      tokenList: []
    };
  },
  created () {
    this.contract = this.$route.params.contract
    this.tokenQueryParams.contract = this.contract
  },
  mounted () {
    if (this.contract) {
      this.getCollectInfo()
    }
  },
  computed: {

  },

  methods: {
    onSuccessCopy () {
      this.$tools.message(this.$t("request.copySuccess"), "success");
    },
    onErrorCopy () {
      this.$tools.message(this.$t("request.copyError"));
    },
    getCollectInfo () {
      this.$api("collect.info", {
        contract: this.contract
      }).then((res) => {
        this.collectInfo = res.debug
        this.collectInfo.bestPriceFrom = this.$sdk.fromWeiNum(this.collectInfo.bestPrice)
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.collection-detail {
  .bg-box {
    height: 320px;
    width: 100%;
  }
  .collection-info {
    width: 1200px;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 40px;
    .info-top {
      height: 80px;
      position: relative;
      .avatar-box {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
        width: 168px;
        height: 168px;
        padding: 5px;
        background-color: $bg-white;
        border-radius: 50%;
      }
      .info-title {
        margin-left: 178px;
        .title {
          display: flex;
          // width: 700px;
          align-items: center;
          font-style: normal;
          font-weight: 700;
          font-size: 32px;
          line-height: 41px;
        }
        .tag {
          margin-left: 10px;
          width: 24px;
          height: 24px;
        }
        .creator {
          .txt {
            font-size: 20px;
            line-height: 30px;
            color: $color-black2;
          }
          .name {
            margin-left: 8px;
            font-weight: 500;
            font-size: 20px;
            line-height: 30px;
          }
          img {
            margin-left: 8px;
            display: inline-block;
            width: 16px;
            height: 16px;
          }
        }
      }
    }
    .info-val {
      display: flex;
      margin-top: 15px;
      .item {
        margin-right: 30px;
        color: $color-black2;
        font-size: 16px;
        line-height: 24px;
        .value {
          font-weight: 700;
          margin-left: 3px;
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
      font-weight: 400;
      font-size: 20px;
      line-height: 30px;
      color: $color-black3;
    }
    .info-card {
      display: flex;
      justify-content: space-between;
      margin-top: 60px;
      margin-bottom: 60px;
      color: $color-black3;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 8px;
        width: 186px;
        /*height: 108px;*/
        border-radius: 12px;
        border: 1px solid $borderBg;
        .lable {
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 12px;
        }
        .value {
          display: flex;
          align-items: center;
          line-height: 24px;
          font-weight: 700;
          font-size: 18px;
          color: $primaryColor;
          .token-icon {
            display: inline-block;
            width: 15px;
            height: 20px;
            margin-right: 5px;
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
      font-family: 'Plus Jakarta Display';
      padding: 0 30px;
      font-weight: 700;
      font-size: 18px;
      line-height: 24px;
      color: $color-black2;
      padding-bottom: 16px;
      height: 40px;
      &.is-active {
        color: $primaryColor;
      }
      &.is-top:nth-child(2) {
        padding-right: 30px;
      }
    }
    .el-tabs__active-bar {
      background-color: $bgPurple;
      height: 4px;
    }
  }
}



.right-content {
  width: 100%;
}
</style>
