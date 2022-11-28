<template>
  <div class="collection-detail">
    <div class="bg-box"
      :style=" dataInfo.imgUrl ? 'background: url('+$filters.fullImageUrl(dataInfo.imgUrl)+') no-repeat; background-size: cover;':'' ">
    </div>
    <div class="collection-info">
      <div class="info-top">
        <div class="avatar-box">
          <img
            src="https://storage.nfte.ai/asset/collection/featured/MFYROFVZKZSCSHUWXRGBZAAQPZWMOKFM.jpg?x-oss-process=image/resize,m_fill,w_108,h_108,limit_0"
            alt="">
        </div>
        <div class="info-title">
          <div class="title">
            <span>Azuki</span>
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
          <span class="value">10,000</span>
        </div>
        <div class="item">
          <span class="lable">Created:</span>
          <span class="value">Jul 2022</span>
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
          <span class="value">:0x595…da687</span>
          <el-icon>
            <CopyDocument />
          </el-icon>
        </div>
      </div>
      <div class="info-rem">
        Introduction of the project introduction of the project Introduction of the project
      </div>
      <div class="info-card">
        <div class="item">
          <div class="lable">Floor Price</div>
          <div class="value">
            <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="" />
            <span>530.73</span>
          </div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio red">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="lable">Floor Price</div>
          <div class="value">
            <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="" />
            <span>530.73</span>
          </div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio green">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="lable">Floor Price</div>
          <div class="value">
            <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="" />
            <span>530.73</span>
          </div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio green">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="lable">Floor Price</div>
          <div class="value">
            <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="" />
            <span>530.73</span>
          </div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio green">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="lable">Floor Price</div>
          <div class="value">
            <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="" />
            <span>530.73</span>
          </div>
          <div class="rise">
            <span class="time">24h</span>
            <span class="ratio green">-254.75%</span>
          </div>
        </div>
        <div class="item">
          <div class="lable">Floor Price</div>
          <div class="value">
            <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="" />
            <span>530.73</span>
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
              <div class="type-item">
                <div class="type-head">
                  <span class="type-name">Background</span>
                  <div class="type-num">
                    <span>100</span>
                    <el-icon class="down" style="font-size:15px">
                      <ArrowUp />
                    </el-icon>
                  </div>
                </div>
                <div class="attr-content">
                </div>
              </div>
              <div class="type-item">
                <div class="type-head">
                  <span class="type-name">Background</span>
                  <div class="type-num">
                    <span>100</span>
                    <el-icon class="down" style="font-size:15px">
                      <ArrowUp />
                    </el-icon>
                  </div>
                </div>
                <div class="attr-content">
                </div>
              </div>
              <div class="type-item">
                <div class="type-head">
                  <span class="type-name">Background</span>
                  <div class="type-num">
                    <span>100</span>
                    <el-icon class="down" style="font-size:15px">
                      <ArrowUp />
                    </el-icon>
                  </div>
                </div>
                <div class="attr-content">
                </div>
              </div>
              <div class="type-item">
                <div class="type-head">
                  <span class="type-name">Background</span>
                  <div class="type-num">
                    <span>100</span>
                    <el-icon>
                      <ArrowUp />
                    </el-icon>
                  </div>
                </div>
                <div class="attr-content">
                  <div class="attr-item">
                    <span>Pearl</span>
                    <div class="attr-num">
                      <span>100</span>
                      <el-checkbox v-model="checked1" label="" />
                    </div>
                  </div>
                  <div class="attr-item">
                    <span>Pearl</span>
                    <div class="attr-num">
                      <span>100</span>
                      <el-checkbox v-model="checked1" label="" />
                    </div>
                  </div>
                  <div class="attr-item">
                    <span>Pearl</span>
                    <div class="attr-num">
                      <span>100</span>
                      <el-checkbox v-model="checked1" label="" />
                    </div>
                  </div>
                  <div class="attr-item">
                    <span>Pearl</span>
                    <div class="attr-num">
                      <span>100</span>
                      <el-checkbox v-model="checked1" label="" />
                    </div>
                  </div>
                  <div class="attr-item">
                    <span>Pearl</span>
                    <div class="attr-num">
                      <span>100</span>
                      <el-checkbox v-model="checked1" label="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-content">
          <div class="search-wrap">
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
            <div class="nft-card" v-for="i in 20" :key="i">
              <div class="nft-content">
                <div class="card-top">
                  <div class="card-img">
                    <img class="img-lazy"
                      src="https://storage.nfte.ai/asset/collection/featured/BEEWQLPGNIJCWCXJUDSRUWRWOWSOYCCT.jpg?x-oss-process=image/resize,m_fill,w_504,h_288,limit_0"
                      alt="Image" _nk="p/rO21">
                  </div>
                </div>
                <div class="card-bottom">
                  <div class="nft-txt">
                    Azuki #9251
                  </div>
                  <div class="nft-price">
                    <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="">
                    <span class="nft-price">0.073 ETH</span>
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
    };
  },
  created () {
  },
  computed: {

  },

  methods: {
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
        height: 108px;
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
          display: flex;
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
  .filter-wrap {
    width: 210px;
    // height: 520px;
    flex-shrink: 0;
    margin-right: 30px;
    background: $bg-white;
    border: 1px solid $borderBg;
    border-radius: 12px;
    overflow: hidden;
    .filter-head {
      display: flex;
      justify-content: space-between;
      // height: 56px;
      padding: 16px;
      line-height: 24px;
      background: #ffffff;
      font-weight: 400;
      font-size: 14px;
      color: $primaryColor;
      border-bottom: 1px solid $borderBg;
      .left {
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 14px;
        color: $primaryColor;
        cursor: pointer;
        .el-icon {
          margin-right: 2px;
        }
      }
      .right {
        cursor: pointer;
      }
    }
    .flex {
      display: flex;
      justify-content: space-between;
    }
    .filter-item {
      padding: 16px;
      line-height: 24px;
      &.border {
        border-bottom: 1px solid $borderBg;
      }
      .left {
        font-weight: 500;
        font-size: 14px;
        color: $primaryColor;
      }
      .right {
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }
    ::v-deep .el-select {
      margin-top: 15px;
      position: relative;
      // width: 180px;
      height: 32px;
      .el-popper {
        top: 42px !important;
      }
      .el-select-dropdown__item {
        height: 32px;
        line-height: 32px;
      }
      .el-input__suffix {
        right: 16px;
      }
      .el-input__wrapper {
        padding: 6px 10px;
        border-radius: 8px;
        box-shadow: none;
        height: 32px;
        box-sizing: border-box;
        border: none;
        box-shadow: none;
        background-color: $elButtonHoverBg;
      }
      .el-input.is-focus .el-input__wrapper {
        box-shadow: none !important;
      }
      &:first-child {
        margin-left: 10px;
      }
      .el-input__inner {
        height: 20px;
        background-color: transparent;
        padding: 0;
      }
    }
    .price-range {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .input-number {
        width: 80px;
        ::v-deep {
          .el-input__wrapper {
            padding-left: 0 !important;
            padding-right: 0 !important;
            border: none;
            box-shadow: none;
          }
          .el-input__inner {
            border: none;
            gap: 8px;
            height: 32px;
            background: $elButtonHoverBg;
            border-radius: 8px;

            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            color: $primaryColor;
          }
        }
      }
      .line {
        width: 8px;
        height: 1px;
        margin: 0 10px;
        background-color: $grayColor;
      }
    }
    .btn-apply {
      margin-top: 15px;
      height: 32px;
      line-height: 32px;
      color: $color-white;
      background: $mainLiner;
      border-radius: 12px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
    }
    .gruop-wrap {
      margin-top: 15px;
      .type-item {
        margin: 16px 0;
        .type-head {
          display: flex;
          font-size: 12px;
          height: 18px;
          line-height: 18px;
          justify-content: space-between;
          .type-num {
            display: flex;
            align-items: center;
          }
          .el-icon {
            cursor: pointer;
            font-size: 15px;
            margin-left: 5px;
            &.down {
              transform: rotate(180deg);
            }
          }
        }
        .attr-content {
          .attr-item {
            margin: 16px 0;
            display: flex;
            font-size: 12px;
            height: 18px;
            line-height: 18px;
            justify-content: space-between;
            color: $color-black3;
            .attr-num {
              display: flex;
              align-items: center;
              color: $color-black2;
            }
            .el-checkbox {
              margin-left: 5px;
              height: 18px;
            }
          }
        }
      }
    }
  }

  .list-wrap {
    margin-top: 15px;
    .list-item {
      display: flex;
      padding: 8px;
      border-radius: 12px;
      cursor: pointer;
      &:hover {
        background: $elButtonHoverBg;
      }

      .head-img {
        width: 40px;
        height: 40px;
        background-color: $bg-white;
        border-radius: 50px;
        padding: 2px;
        flex-shrink: 0;
        position: relative;
        .tag {
          width: 16px;
          height: 16px;
          position: absolute;
          bottom: 4px;
          right: 0;
          z-index: 2;
        }
      }
      .head-txt {
        margin-left: 8px;
        font-weight: 500;
        font-size: 14px;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: $primaryColor;
      }
    }
  }

  .search-wrap {
    height: 40px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    .btnfilter {
      display: flex;
      align-items: center;
      padding: 0px 16px;
      width: 93px;
      height: 40px;
      border: 1px solid $borderBg;
      border-radius: 12px;
      cursor: pointer;
      margin-right: 20px;
      img {
        width: 18px;
        height: 18px;
        margin-right: 7px;
      }
    }
    ::v-deep .el-select {
      position: relative;
      width: 180px;
      margin-left: 10px;
      height: 40px;
      .el-popper {
        top: 42px !important;
      }
      .el-select-dropdown__item {
        height: 40px;
        line-height: 40px;
      }
      .el-input__suffix {
        right: 16px;
      }
      .el-input__wrapper {
        padding: 10px 16px;
        border-radius: 12px;
        box-shadow: none;
        height: 40px;
        box-sizing: border-box;
        border: 1px solid $borderBg;
      }
      .el-input.is-focus .el-input__wrapper {
        box-shadow: none !important;
      }
      &:first-child {
        margin-left: 10px;
      }
      .el-input__inner {
        height: 20px;
        padding: 0;
      }
    }
    .select-sort {
      margin-right: 20px;
    }
    .sort-wrap {
      display: flex;
      background: $elButtonHoverBg;
      border-radius: 12px;
      align-items: center;
      width: 128px;
      padding: 4px;
      .icon-wrap {
        height: 32px;
        width: 58px;
        line-height: 32px;
        border-radius: 8px;
        &.icon_filter01 {
          background-image: url('../../assets/images/icons/icon_filter01.svg');
          &.active {
            background-image: url('../../assets/images/icons/icon_filter01_active.svg');
            background-color: $bg-white;
          }
        }
        &.icon_filter02 {
          background-image: url('../../assets/images/icons/icon_filter02.svg');
          &.active {
            background-image: url('../../assets/images/icons/icon_filter02_active.svg');
            background-color: $bg-white;
          }
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .search-input-wrap {
    overflow: hidden;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 16px;
    // height: 40px;
    margin-right: 20px;
    border: none;
    flex-grow: 1;
    ::v-deep {
      .el-input__inner {
        height: 40px;
        border: none;
        font-size: 14px;
      }
      .el-input__wrapper {
        border-radius: 12px;
        box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
        background: $elButtonHoverBg;
        border: none;
        .el-input__inner {
          background-color: transparent;
        }
      }
      .el-input__prefix {
        line-height: 40px;
        left: 15px;
      }
      .img-search {
        width: 16px;
        height: 16px;
      }
    }
  }
  .custom-pagination {
    text-align: center;
    margin: 20px;
    .content {
      display: inline-block;
    }
    ::v-deep {
      .el-pagination.is-background .btn-prev,
      .el-pagination.is-background .btn-next {
        padding: 0;
        height: 32px;
        border-radius: 8px;
      }
      .el-pagination.is-background .el-pager li {
        height: 32px;
        border-radius: 8px;
        &.is-active {
          background-color: $bgPurple;
          color: $color-white;
        }
      }
    }
  }
  .nft-list {
    display: flex;
    flex-flow: row wrap;
    margin-left: -9px;
    margin-right: -9px;
    row-gap: 18px;
    .nft-card {
      min-height: 1px;
      position: relative;
      display: block;
      flex: 0 0 225.6px;
      width: 225.6px;
      margin-left: 9px;
      margin-right: 9px;
      .nft-content {
        height: 302px;
        border-radius: 20px;
        overflow: hidden;
        transition: all 0.23s;
        background: $bg-white;
        border: 1px solid $borderBg;
        filter: drop-shadow(0px 0px 10px rgba(82, 77, 255, 0.05));
        &:hover {
          box-shadow: 0 7px 16px -8px rgba(0, 0, 0, 0.15);
        }
        .card-top {
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 225.6px;
          .card-img {
            left: 0;
            position: absolute;
            top: 0;
            transition: all 0.23s;
            height: 225.6px;
            img {
              height: 100%;
              width: 100%;
            }
          }
        }
        .card-bottom {
          height: 75px;
          padding: 12px 12px;
          padding-right: 20px;

          .nft-txt {
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: $color-black3;
          }
          .nft-price {
            display: flex;
            height: 22px;
            .token-icon {
              width: 15px;
              height: 20px;
              margin-right: 5px;
            }
            .nft-price {
              font-weight: 700;
              font-size: 14px;
              line-height: 22px;
              color: $primaryColor;
            }
          }
        }
      }
    }
  }
}
</style>
