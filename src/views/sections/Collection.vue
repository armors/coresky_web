<template>
  <div class="collection-detail">
    <div class="bg-box"
      :style=" collectInfo.bannerImage ? 'background: url('+ collectInfo.bannerImage +') no-repeat; background-size: cover;':'' ">
    </div>
    <div class="collection-info">
      <div class="info-top">
        <div class="avatar-box">
          <img
            :src="collectInfo.image"
            alt="">
        </div>
        <div class="info-title">
          <div class="title">
            <span>{{collectInfo.name}}</span>
            <img class="tag" src="../../assets/images/icons/icon_tag.svg" alt="">
          </div>
          <div class="creator">
            <span class="txt">By</span>
            <span class="name">TeamAzuki</span>
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
          <span class="value">:{{$filters.ellipsisAddress(collectInfo.contract)}}</span>
          <el-icon>
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
            <span>{{collectInfo.foolPrice}}</span>
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
            <span>--</span>
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
            <span>{{collectInfo.dayVol}}</span>
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
            <span>{{collectInfo.volume}}</span>
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
      <div class="tab-wrap">
        <div class="tabClass active">
          Collected
        </div>
        <div class="tabClass">
          Transaction dynamics
        </div>
        <div class="tabClass">
          Data analysis
        </div>
      </div>

      <div class="item-page">

        <div class="filter-wrap">
          <div class="filter-head">
            <span class="left">
              <el-icon>
                <ArrowLeft />
              </el-icon>Filter
            </span>
            <span class="right">
              <el-icon>
                <Refresh />
              </el-icon>
            </span>
          </div>
          <div class="filter-item flex border">
            <span class="left">Buy Now</span>
            <span class="right">
              <el-switch v-model="queryParams.isNowBuy" class="ml-2" />
            </span>
          </div>
          <div class="filter-item border">
            <div class="flex">
              <span class="left">Price</span>
              <span class="right">
                <el-icon style="font-size:16px">
                  <ArrowUp />
                </el-icon>
              </span>
            </div>
            <el-select v-model="queryParams.sort" placeholder="ETH" :teleported="false" popper-class="select-popper"
              class="select-sort">
              <el-option value="ETH">ETH</el-option>
            </el-select>
            <div class="price-range" style="margin-top:15px">
              <el-input-number class="input-number" :controls="false" v-model="queryParams.minPrice"
                :placeholder="$t('home.minPlaceholder')" />
              <div class="line"></div>
              <el-input-number class="input-number" :controls="false" v-model="queryParams.maxPrice"
                :placeholder="$t('home.maxPlaceholder')" />
            </div>
            <div class="btn-apply">Application</div>
          </div>
          <div class="filter-item">
            <div class="flex">
              <span class="left">Attributes</span>
              <span class="right">
                <el-icon style="font-size:16px">
                  <ArrowUp />
                </el-icon>
              </span>
            </div>
            <div class="gruop-wrap">
              <div class="type-item" v-for="(item,index) in attrList" :key="index">
                <div class="type-head">
                  <span class="type-name">{{item.attrNm}}</span>
                  <div class="type-num">
                    <span>{{item.total}}</span>
                    <el-icon :class="{'down':item.isShow}" @click="item.isShow=!item.isShow" style="font-size:15px">
                      <ArrowUp />
                    </el-icon>
                  </div>
                </div>
                <div class="attr-content" v-if="item.isShow">
                  <div class="attr-item" v-for="(child,cindex) in item.dataList" :key="cindex">
                    <span>{{child.name}}</span>
                    <div class="attr-num">
                      <span>{{child.num}}</span>
                      <el-checkbox v-model="child.isChecked" label="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-content">
          <div class="list-search-wrap">
            <div class="btnfilter">
              <img src="../../assets/images/icons/icon_filter.svg" alt="">
              Filter
            </div>
            <el-input class="search-input-wrap" style="width:400px" placeholder="Search by name or attribute"
              v-model="keyword" @keyup.enter="searchClick">
              <template #prefix>
                <div class="img-search"><img src="../../assets/images/icons/icon_search.svg" alt=""></div>
              </template>
            </el-input>
            <el-select v-model="queryParams.sort" placeholder="Recently listed" :teleported="false"
              popper-class="select-popper" class="select-sort">
              <el-option value="Recently listed1">Recently listed</el-option>
              <el-option value="Recently listed2">Recently listed</el-option>
              <el-option value="Recently listed3">Recently listed</el-option>
              <el-option value="Recently listed4">Recently listed</el-option>
              <el-option value="Recently listed5">Recently listed</el-option>
            </el-select>
            <div class="sort-wrap">
              <span class="icon-wrap icon_filter01 active">
              </span>
              <span class="icon-wrap icon_filter02"></span>
            </div>
          </div>
          <div class="nft-list">
            <div class="nft-card" v-for="(v, i) in tokenList" :key="`token-item-${i}`" @click="toTokenDetail(v)">
              <div class="nft-content">
                <div class="card-top">
                  <div class="card-img">
                    <image-box :src="v.oriImage"></image-box>
                  </div>
                </div>
                <div class="card-bottom">
                  <div class="nft-txt">
                    {{v.name || '--'}} #{{v.tokenId}}
                  </div>
                  <div class="nft-price">
                    <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="">
                    <span class="nft-price">{{$Web3.utils.fromWei(v.basePrice.toString())}} ETH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="custom-pagination">
            <div class="content">
              <el-pagination background layout="prev, pager, next" align="center" :total="1000" />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "Collection",
  mixins: [],
  data () {
    return {
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
        "filter" : {},
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
  mounted() {
    console.log(this.contract)
    if (this.contract) {
      this.getCollectInfo()
      this.getTokenQuery()
    }
  },
  computed: {

  },

  methods: {
    getCollectInfo () {
      this.$api("collect.info", {
        contract: this.contract
      }).then((res) => {
        this.collectInfo = res.debug
      })
    },
    getTokenQuery () {
      this.$api("token.query", this.tokenQueryParams).then((res) => {
        this.tokenList = res.debug.listData
      })
    },
    toTokenDetail (v) {
      this.$router.push({
        name: 'detail',
        params: {
          contract: v.contract,
          tokenId: v.tokenId
        }
      })
    }
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
    .tab-wrap {
      display: flex;
      width: 100%;
      display: flex;
      border-bottom: 1px solid $borderBg;
    }
    .tabClass {
      cursor: pointer;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      margin-right: 60px;
      color: $color-black2;
      padding-bottom: 16px;
      &.active {
        color: $primaryColor;
        border-bottom: 4px solid $bgPurple;
      }
    }
  }
}

.item-page {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
