<template>
  <div class="main-wrapper" id="marketPlace" ref="marketPlace" v-infinite-scroll="loadMoreData"
    :infinite-scroll-disabled="disabledLoadMore" :infinite-scroll-distance="50">
    <div class="filter-wrap" v-if="showFilterBox">
      <div class="filter-head">
        <span class="left btnfilter" @click="showFilterBox=!showFilterBox">
          <el-icon>
            <img src="../../assets/images/icons/icon_filter_open.svg" alt="">
          </el-icon>{{ $t('common.Filter') }}
        </span>
        <span class="right">
          <el-icon>
            <img src="../../assets/images/icons/icon_filter_refresh.svg" alt="">
          </el-icon>
        </span>
      </div>
      <div class="filter-item filter-item-buy flex border">
        <span class="left">{{ $t('common.BuyNow') }}</span>
        <span class="right">
          <el-switch v-model="queryParams.buyNow" @change="searchClick" class="ml-2" />
        </span>
      </div>
      <div class="filter-item border">
        <div class="flex filter-box">
          <span class="left">{{ $t('common.Price') }}</span>
          <span class="right" @click="isOpenPriceFilter=!isOpenPriceFilter">
            <el-icon style="font-size:16px" :class="{ 'down': isOpenPriceFilter }">
              <!-- <img src="../../assets/images/icons/icon_filter_up.svg" alt=""> -->
            </el-icon>
          </span>
        </div>
        <template v-if="isOpenPriceFilter">
          <el-select v-model="queryParams.sort" placeholder="ETH" :teleported="false" popper-class="select-popper"
            class="select-sort">
            <el-option value="ETH">ETH</el-option>
          </el-select>
          <div class="price-range" style="margin-top:15px">
            <el-input-number v-model="queryParams.minPrice" :placeholder="$t('common.Min')" :controls="false"
              :precision="4" :min="0.0001" :max="100000000000000" class="input-number" />
            <div class="line"></div>
            <el-input-number v-model="queryParams.maxPrice" :placeholder="$t('common.Max')" :controls="false"
              :precision="4" :min="0.0001" :max="100000000000000" class="input-number" />
          </div>
          <div class="btn-apply" @click="searchClick">{{$t('common.Application')  }}</div>
        </template>
      </div>
      <div class="filter-item select-box">
        <div class="flex select-title">
          <span class="left">{{$t('common.Collection')  }}</span>
          <span class="right" @click="isOpenSearchCollection=!isOpenSearchCollection">
            <el-icon style="font-size:16px" :class="{ 'down': isOpenSearchCollection }">
              <!-- <img src="../../assets/images/icons/icon_filter_up.svg" alt=""> -->
            </el-icon>
          </span>
        </div>
        <template v-if="isOpenSearchCollection">
          <el-input class="search-input-wrap" :placeholder="$t('common.Search')" v-model="keyword2"
            @keyup.enter="searchCollection" style="margin-top:15px;">
            <template #prefix>
              <div class="img-search"><img src="../../assets/images/icons/icon_search.svg" alt=""></div>
            </template>
          </el-input>
          <div class="list-wrap">
            <router-link :to="`/collection/${item.contract}`" class="list-item" v-for="(item,index) in collectionList"
              :key="index">
              <div class="head-img">
                <image-box :src="item.image"></image-box>
                <!-- <img class="tag" src="../../assets/images/icons/icon_tag.svg" alt=""> -->
              </div>
              <div class="head-txt">
                {{item.name}}
                <img class="tag" src="../../assets/images/icons/icon_list_blue.svg" alt="">
              </div>
            </router-link>
          </div>
        </template>
      </div>
    </div>
    <div class="right-content">
      <div class="list-search-wrap">
        <div class="btnfilter" v-if="!showFilterBox" @click="showFilterBox=!showFilterBox">
          <img src="../../assets/images/icons/icon_filter_close.svg" alt="">
          {{ $t('common.Filter') }}
        </div>
        <el-input class="search-input-wrap" style="width:400px" :placeholder="$t('common.SearchPlaceholder')"
          v-model="queryParams.keyword" @keyup.enter="searchClick">
          <template #prefix>
            <div class="img-search"><img src="../../assets/images/icons/icon_search.svg" alt=""></div>
          </template>
        </el-input>
        <el-select v-model="queryParams.order" placeholder="Recently listed" @change="searchClick" :teleported="false"
          popper-class="select-popper" class="select-sort select-sort-right">
          <el-option :value="1" :label="$t('common.PriceLowToHigh')" />
          <el-option :value="2" :label="$t('common.PriceHighToLow')" />
          <el-option :value="3" :label="$t('common.RecentlyListed')" />
          <el-option :value="4" :label="$t('common.RecentlySold')" />
          <el-option :value="5" :label="$t('common.EndingSoon')" />
        </el-select>
        <!-- <div class="sort-wrap">
          <span class="icon-wrap icon_filter01" :class="{'active':viewType===1}" @click="viewType=1">
          </span>
          <span class="icon-wrap icon_filter02" :class="{'active':viewType===2}" @click="viewType=2"></span>
        </div> -->
      </div>
      <div>
        <div class="nft-list">
          <card-item :item=item v-for="(item,index) in dataList" :key="index"></card-item>
        </div>
        <!-- <div class="custom-pagination" v-if="listCount>queryParams.limit">
          <div class="content">
            <el-pagination background v-model:current-page="queryParams.page" :page-size="queryParams.limit"
              :page-="queryParams.limit" @current-change="queryData" layout="prev, pager, next" align="center"
              :total="listCount" />
          </div>
        </div> -->
        <div v-if="loadStatus==='loading'">
          <p class="loading-txt">
            <el-icon class="my-loading">
              <Loading />
            </el-icon>
          </p>
        </div>
        <div class="empty-wrap" v-if="dataList.length===0&& loadStatus!=='loading'">
          <p class="txt">No Data</p>
          <img src="../../assets/images/no-data.png" alt="">
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import CardItem from './components/common/cardItem.vue';
export default {
  mixins: [],
  name: 'MarkterPlace',
  components: {
    CardItem,
  },
  props: {
    searchKeyword: {
      type: String,
      default: ''
    },
  },
  computed: {
    disabledLoadMore: function () {
      return this.loadStatus === 'loading' || this.dataList.length >= this.listCount
    },
  },
  data: function () {
    return {
      queryParams: {
        page: 1,
        limit: 20,
        keyword: "",
        buyNow: true,
        minPrice: undefined,
        maxPrice: undefined,
        order: 1,
      },
      showFilterBox: true,
      isOpenPriceFilter: true,
      isOpenSearchCollection: true,
      viewType: 1,
      listCount: 1,
      dataList: [],
      loadStatus: 'over',
      keyword2: '',
      collectionList: [],
    }
  },
  created () {
  },
  mounted () {
    this.dataList = []
    this.queryParams.page = 0
    this.queryParams.keyword = this.searchKeyword || ''
    this.searchClick()
    this.searchCollection()
  },
  methods: {
    loadMoreData () {
      console.log(33377)
      this.queryParams.page += 1
      this.queryData()
    },
    searchCollection () {
      let params = {
        keyword: this.keyword2,
        page: 1,
        order: 2,
        limit: 6,
      }
      this.$api("collect.query", params).then((res) => {
        if (this.$tools.checkResponse(res)) {
          this.collectionList = res.debug.listData
        }
      })
    },
    searchClick () {
      this.queryParams.page = 1
      this.dataList = []
      this.queryData()
    },
    queryData () {
      // this.dataList = []
      this.loadStatus = 'loading'
      this.$api("token.query", this.queryParams).then((res) => {
        this.loadStatus = 'over'
        if (this.$tools.checkResponse(res)) {
          if (res.debug.listData.length > 0) {
            this.dataList = this.dataList.concat(res.debug.listData)
            this.listCount = res.debug.listCount
            this.queryParams.page = res.debug.curPage
          }
        }
      })
    }
  },
};
 
</script>
<style lang="scss" scoped>
.main-wrapper {
  padding: 40px 40px;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  .right-content {
    width: 100%;
    margin-top: -10px;
  }
}
#marketPlace{
  // padding: 40px 0;
  // align-items: inherit;
}
.accountFavorited {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>


