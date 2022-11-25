<template>
  <div class="main-wrapper">

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
          <span class="left">Collection</span>
          <span class="right">
            <el-icon style="font-size:16px">
              <ArrowUp />
            </el-icon>
          </span>
        </div>
        <el-input class="search-input-wrap" placeholder="Search" v-model="keyword" @keyup.enter="searchClick"
          style="margin-top:15px;">
          <template #prefix>
            <div class="img-search"><img src="../../assets/images/icons/icon_search.svg" alt=""></div>
          </template>
        </el-input>
        <div class="list-wrap">
          <div class="list-item" v-for="key in 8" :key="key">
            <div class="head-img">
              <img
                src="https://storage.nfte.ai/asset/collection/featured/SIPGAWJPYHJAGSVGQIXWOKPHREVQFDSL.jpg?x-oss-process=image/resize,m_fill,w_108,h_108,limit_0"
                alt="">
              <img class="tag" src="../../assets/images/icons/icon_tag.svg" alt="">
            </div>
            <div class="head-txt">
              HUGO x Imaginary Ones: Embrace Your Emotionss
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
</template>
<script>
export default {
  mixins: [],
  name: 'MarkterPlace',
  components: {},
  data: function () {
    return {
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
  watch: {

  },
  created () {
  },
  mounted () { },
  computed: {
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.main-wrapper {
  padding: 40px 0;
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
</style>


