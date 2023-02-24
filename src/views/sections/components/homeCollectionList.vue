<template>
  <div class="homeCollection">
    <div class="home-tab-wrap">
      <div class="tab-left">
        <div class="tab-item " :class="{ active: collectionQuery.order === 1 }" @click="changeOrder(1)">
          {{ $t("home.sortBtnText1") }}</div>
        <div class="tab-item" :class="{ active: collectionQuery.order === 2 }" @click="changeOrder(2)">
          {{ $t("home.sortBtnText2") }}</div>
        <!-- <div class="tab-item" :class="{ active: collectionQuery.order === 3 }" @click="changeOrder(3)">
          {{ $t("home.sortBtnText3") }}</div>
        <div class="tab-item" :class="{ active: collectionQuery.order === 4 }" @click="changeOrder(4)">
          {{ $t("home.sortBtnText4") }}</div> -->
      </div>
      <!-- <div class="tab-right sort-box">
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
      </div> -->
    </div>
    <div class="table-fix" v-loading="loadStatusCollect === 'loading'">
      <div v-if="dataListA.length > 0" style="margin-right: 50px; width: 50%;">
        <div class="table-head">
          <div class="w60 th1"> {{ $t('home.nftListTitle1') }}</div>
          <div class="w20 th1"> {{ $t('home.nftListTitle2') }}</div>
          <div class="w20 th1"> {{ collectionQuery.order === 1 ? $t('collection.totalVolume') : $t('home.nftListTitle3')
          }}
          </div>
        </div>
        <div class="table-body">
          <div class="table-row" v-for="(item, index) in dataListA" :key="index" @click="rowClick(item)">
            <div class="w60">
              <div class="flex-column1">
                <div class="num">{{ index + 1 }}</div>
                <image-box class="collection-image" :src="item.image"></image-box>
                <div class="collection-name">
                  <div class="collection-name-txt"> {{ item.name }}</div>
                </div>
                <svg-icon class="icon-tag" icon-class="icon_tag" />
              </div>
            </div>
            <div class="w20">
              <div class="floor-num" v-if="item.foolPrice">{{ prasePrice(item.foolPrice) }}&nbsp;ETH
              </div>
            </div>
            <div class="w20">
              <div class="floor-num" v-if="collectionQuery.order === 1">
                {{ $filters.keepMaxPoint(item.volume) }}
                ETH
              </div>
              <div class="floor-num" v-else>
                {{ $filters.keepMaxPoint(item.dayVol) }}
                ETH
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dataListB.length > 0" style="width: 50%;">
        <div class="table-head">
          <div class="w60 th1"> {{ $t('home.nftListTitle1') }}</div>
          <div class="w20 th1"> {{ $t('home.nftListTitle2') }}</div>
          <div class="w20 th1">
            {{ collectionQuery.order === 1 ? $t('collection.totalVolume') : $t('home.nftListTitle3') }}
          </div>
        </div>
        <div class="table-body">
          <div class="table-row" v-for="(item, index) in dataListB" :key="index" @click="rowClick(item)">
            <div class="w60">
              <div class="flex-column1">
                <div class="num">{{ index + 6 }}</div>
                <image-box class="collection-image" :src="item.image"></image-box>
                <div class="collection-name">
                  <div class="collection-name-txt"> {{ item.name }}</div>
                </div>
                <svg-icon class="icon-tag" icon-class="icon_tag" />
              </div>
            </div>
            <div class="w20">
              <div class="floor-num" v-if="item.foolPrice">{{ prasePrice(item.foolPrice) }}&nbsp;ETH
              </div>
            </div>
            <div class="w20">
              <div class="floor-num" v-if="collectionQuery.order === 1">
                {{ $filters.keepMaxPoint(item.volume) }}
                ETH
              </div>
              <div class="floor-num" v-else>
                {{ $filters.keepMaxPoint(item.dayVol) }}
                ETH
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";

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
        "order": 1,
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
    prasePrice (price) {
      if (new BigNumber(price).isLessThan(0.01)) {
        return '<0.01'
      }
      return this.$filters.keepPoint(price, 2)
    },
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
        this.collectionQuery.order = 1
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
        .el-button+.el-button {
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

    .table-head {
      width: 100%;
      display: flex;
      padding-right: 8px;
    }
    .table-body {
      // padding-right: 8px;
    }
    .table-row {
      width: 100%;
      display: flex;
      // padding-right: 5px;
      padding-right: 8px;
      cursor: pointer;
      &:hover {
        background: #FAFCFE;
      }
    }
    .th1 {
      padding-left: 10px;
      height: 20px;
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      color: #717a83;
    }
    .w60 {
      width: 60%;
      display: flex;
      justify-content: flex-start;
      flex: 0 0 60%;
      align-items: center;
    }
    .w20 {
      width: 20%;
      display: flex;
      justify-content: flex-end;
      flex: 0 0 20%;
      align-items: center;
    }
  }
  .flex-column1 {
    display: flex;
    height: 90px;
    align-items: center;
    width: 100%;
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
      display: flex;
      max-width: 100%;
      overflow: hidden;

      .collection-name-txt {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

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
    // padding-right: 5px;
    color: #111111;
  }
}
</style>
