<template>
  <div class="homeCollection">
    <div class="home-tab-wrap">
      <div class="tab-left">
        <div class="tab-item " :class="{active: collectionQuery.order === 1}" @click="changeOrder(1)">
          {{ $t("home.sortBtnText1") }}</div>
        <div class="tab-item" :class="{active: collectionQuery.order === 2}" @click="changeOrder(2)">
          {{ $t("home.sortBtnText2") }}</div>
        <div class="tab-item" :class="{active: collectionQuery.order === 3}" @click="changeOrder(3)">
          {{ $t("home.sortBtnText3") }}</div>
        <div class="tab-item" :class="{active: collectionQuery.order === 4}" @click="changeOrder(4)">
          {{ $t("home.sortBtnText4") }}</div>
      </div>
      <div class="tab-right sort-box">
        <el-switch v-model="collectionQuery.valueRewards" :inactive-text="$t('home.reward')" class="ml-2" />
        <div class="text">{{ $t("home.sortFloor") }}</div>
        <el-input-number class="input-number" @blur="blurPrice" :controls="false" v-model="collectionQuery.minPrice"
          :placeholder="$t('home.minPlaceholder')" />
        <div class="line"></div>
        <el-input-number class="input-number" @blur="blurPrice" :controls="false" v-model="collectionQuery.maxPrice"
          :placeholder="$t('home.maxPlaceholder')" />
        <el-select v-model="collectionQuery.valueChain" placeholder="Select" class="select-chain">
          <el-option v-for="item in optionsChain" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="volTime" placeholder="Select" class="select-times" @changeTime="changeTime">
          <el-option v-for="item in optionsTimes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
    <div class="table-fix" v-loading="loadStatusCollect==='loading'">
      <el-table :data="dataListA" v-if="dataListA.length>0" style="margin-right: 100px; width: 50%;"
        @row-click="rowClick">
        <el-table-column min-width="300px">
          <template #header>
            <div class="th1">
              {{$t('home.nftListTitle1')}}
            </div>
          </template>
          <template #default="scope">
            <div class="flex-column1">
              <div class="num">{{scope.$index+1}}</div>
              <image-box class="collection-image" :src="scope.row.image"></image-box>
              <div class="collection-name">{{ scope.row.name }}</div>
              <svg-icon class="icon-tag" icon-class="icon_tag" />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="right" min-width="160px">
          <template #header>
            <div class="th1">
              {{$t('home.nftListTitle2')}}
            </div>
          </template>
          <template #default="scope">
            <div class="floor-num" v-if="scope.row.foolPrice">{{ $filters.keepMaxPoint(scope.row.foolPrice)}}&nbsp;ETH
            </div>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #header>
            <div class="th1">
              {{$t('home.nftListTitle3' + volTime)}}
            </div>
          </template>
          <template #default="scope">
            <div class="floor-num">
              {{$filters.keepMaxPoint(volTime === 1 ? scope.row.dayVol : (volTime === 7 ?  scope.row.weekVol :  scope.row.monthVol))}}
              &nbsp;ETH
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="dataListB" v-if="dataListB.length>0" style="width: 50%;" @row-click="rowClick">
        <el-table-column min-width="300px">
          <template #header>
            <div class="th1">
              {{$t('home.nftListTitle1')}}
            </div>
          </template>
          <template #default="scope">
            <div class="flex-column1">
              <div class="num">{{scope.$index+6}}</div>
              <image-box class="collection-image" :src="scope.row.image"></image-box>
              <div class="collection-name">{{ scope.row.name }}</div>
              <svg-icon class="icon-tag" icon-class="icon_tag" />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="right" min-width="160px">
          <template #header>
            <div class="th1">
              {{$t('home.nftListTitle2')}}
            </div>
          </template>
          <template #default="scope">
            <div class="floor-num">
              {{$filters.keepMaxPoint(volTime === 1 ? scope.row.dayVol : (volTime === 7 ?  scope.row.weekVol :  scope.row.monthVol))}}
              &nbsp;ETH
            </div>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #header>
            <div class="th1">
              {{$t('home.nftListTitle3' + volTime)}}
            </div>
          </template>
          <template #default="scope">
            <div class="floor-num">
              {{$filters.keepMaxPoint(volTime === 1 ? scope.row.dayVol : (volTime === 7 ?  scope.row.weekVol :  scope.row.monthVol))}}
              &nbsp;ETH
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: "homeCollectionList",
  components: {

  },
  computed: {
    isHomeIndex () {
      return this.$route.name === 'home'
    },
    curBgImage () {
      if (this.bannerList && this.bannerList.length > 0) {
        return this.bannerList[this.bannerIndex].url
      }
      return ''
    },
    dataListA () {
      if (this.dataList && this.dataList.length > 0) {
        let list = JSON.parse(JSON.stringify(this.dataList))
        return list.splice(0, 5)
      }
      return []
    },
    dataListB () {
      if (this.dataList && this.dataList.length > 0) {
        let list = JSON.parse(JSON.stringify(this.dataList))
        return list.splice(5, 10)
      }
      return []
    },
  },
  props: {

  },
  data () {
    return {
      volTime: 1,
      dataList: [],
      loadStatusCollect: "",
      collectionQuery: {
        valueChain: 'eth',
        limit: 10,
        "keyword": "",
        "address": "",
        "contract": "",
        "buyNow": false,
        'valueRewards': true,
        "minPrice": undefined,
        "maxPrice": undefined,
        "order": 0,
        "filter": {
          "name": "",
          "value": ""
        },
        "page": 1
      },
      optionsChain: [
        {
          value: 'eth',
          label: 'ETH'
        }
      ],
      optionsTimes: [
        {
          value: 1,
          label: '24 hour'
        },
        {
          value: 7,
          label: '7 days'
        },
        {
          value: 30,
          label: '30 days'
        }
      ],
    }
  },
  methods: {
    rowClick (row) {
      this.$router.push({
        name: 'collection',
        params: { contract: row.contract }
      })
    },
    changeOrder (val) {
      if (this.collectionQuery.order !== val) {
        this.collectionQuery.order = val
      } else {
        this.collectionQuery.order = 0
      }
      this.getCollectionData()
    },
    getCollectionData () {
      this.dataList = []
      this.loadStatusCollect = "loading";
      this.$api("collect.query", this.collectionQuery).then((res) => {
        this.loadStatusCollect = 'over'
        if (this.$tools.checkResponse(res)) {
          this.dataList = res.debug.listData
        }
      })
    },
  },
  mounted () {
    this.changeOrder(1);
  }
}

</script>

<style lang="scss" scoped>
.homeCollection {
  margin: 0 40px;
  .home-tab-wrap {
    display: flex;
    height: 60px;
    border-bottom: 1px solid #e6e8ec;
    .tab-left {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      padding: 0px;
      gap: 50px;
      line-height: 60px;
      height: 60px;
      color: #717a83;
      font-weight: 500;
      font-size: 30px;
    }
    .tab-item {
      position: relative;
      cursor: pointer;
      &.active {
        color: #111111;
        &::after {
          position: absolute;
          bottom: 0px;
          content: '';
          left: 0;
          height: 3px;
          width: 100%;
          background: #111111;
        }
      }
    }
    .tab-right {
      display: flex;
      align-items: center;
      margin-left: auto;
      ::v-deep {
        .filter {
          padding: 10px 20px;
          border: none;
          color: $color-black3;
          border-radius: 12px;
          .icon-img {
            margin-right: 4px;
          }
          &:hover,
          &:focus,
          &.active {
            background-color: $elButtonHoverBg !important;
            color: $color-black3;
          }
        }
        .el-button + .el-button {
          margin-left: 6px;
        }
        .text {
          padding-right: 12px;
          font-weight: 500;
          font-size: 14px;
          color: $primaryColor;
          margin-left: 20px;
        }
        .line {
          width: 8px;
          height: 1px;
          margin: 0 10px;
          background-color: $grayColor;
        }
        .input-number {
          width: 80px;
          .el-input__wrapper {
            padding-left: 0 !important;
            padding-right: 0 !important;
            border: none;
            box-shadow: none;
          }
          .el-input__inner {
            border: none;
            /*padding: 11px 16px;*/
            gap: 8px;
            height: 40px;
            /* 黑_4 */
            background: $elButtonHoverBg;
            border-radius: 8px;

            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            color: $primaryColor;
          }
        }
      }
      ::v-deep .el-select {
        width: unset;
        margin-left: 10px;
        height: 40px;
        &.select-chain {
          width: 140px;
        }
        &.select-times {
          width: 110px;
        }
        .el-input__suffix {
          right: 16px;
        }
        .el-input__wrapper {
          padding: 10px 16px;
          border-radius: 12px;
          box-shadow: none;
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
    }
  }
  .table-fix {
    min-height: 560px;
    margin-top: 29px;
    display: flex;
    justify-content: space-between;
    .el-table {
      grid-column: 6;
      .th1 {
        padding-left: 10px;
        height: 20px;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #717a83;
      }
    }
    ::v-deep {
      .el-table td.el-table__cell,
      .el-table th.el-table__cell.is-leaf {
        border-bottom: none;
      }
    }
  }
  .flex-column1 {
    display: flex;
    height: 90px;
    align-items: center;
    .num {
      padding-left: 5px;
      font-weight: 500;
      font-size: 22px;
      line-height: 33px;
      color: #717a83;
      margin-right: 10px;
      width: 30px;
      flex-shrink: 0;
    }
    .collection-image {
      width: 68px;
      height: 68px;
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 12px;
      margin-right: 20px;
      flex-shrink: 0;
    }
    .collection-name {
      font-weight: 500;
      font-size: 20px;
      line-height: 27px;
      color: #111111;
    }
    .icon-tag {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }
  }
  .floor-num {
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
    text-align: right;
    color: #111111;
  }
}
</style>
