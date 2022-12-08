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
          <el-switch v-model="queryParams.buyNow" class="ml-2" />
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
          <el-input type="number" class="input-number" :controls="false" v-model="queryParams.minPrice"
            :placeholder="$t('home.minPlaceholder')" />
          <div class="line"></div>
          <el-input type="number" class="input-number" :controls="false" v-model="queryParams.maxPrice"
            :placeholder="$t('home.maxPlaceholder')" />
        </div>
        <div class="btn-apply" @click="searchClick">Application</div>
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
      <div class="list-search-wrap">
        <div class="btnfilter">
          <img src="../../assets/images/icons/icon_filter.svg" alt="">
          Filter
        </div>
        <el-input class="search-input-wrap" style="width:400px" placeholder="Search by name or attribute"
          v-model="queryParams.keyword" @keyup.enter="searchClick">
          <template #prefix>
            <div class="img-search"><img src="../../assets/images/icons/icon_search.svg" alt=""></div>
          </template>
        </el-input>
        <el-select v-model="queryParams.order" placeholder="Recently listed" :teleported="false"
          popper-class="select-popper" class="select-sort">
          <el-option :value="1" label="Price low to high" />
          <el-option :value="2" label="Price high to low" />
          <el-option :value="3" label="Recently listed" />
          <el-option :value="4" label="Recently sold" />
          <el-option :value="5" label="Ending soon" />
        </el-select>
        <div class="sort-wrap">
          <span class="icon-wrap icon_filter01 active">
          </span>
          <span class="icon-wrap icon_filter02"></span>
        </div>
      </div>
      <div class="nft-list">
        <router-link :to="`/detail/${item.contract}/${item.tokenId}`"  class="nft-card" v-for="(item,index) in dataList" :key="index">
          <div class="nft-content">
            <div class="card-top">
              <div class="card-img">
                <image-box :src="item.image"></image-box>
              </div>
            </div>
            <div class="card-bottom">
              <div class="nft-txt">
                {{item.ckCollectionsInfoEntity.name}} #{{item.tokenId}}
              </div>
              <div class="nft-price">
                <img class="token-icon" src="../../assets/images/icons/token/token_eth.svg" alt="">
                <span class="nft-price">{{nftPrice(item.basePrice)}} ETH</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="custom-pagination" v-if="listCount>queryParams.limit">
        <div class="content">
          <el-pagination background v-model:current-page="queryParams.page" :page-size="queryParams.limit"
            :page-="queryParams.limit" @current-change="queryData" layout="prev, pager, next" align="center"
            :total="listCount" />
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
        page: 1,
        limit: 20,
        keyword: "",
        buyNow: false,
        minPrice: '',
        maxPrice: '',
        order: 1,
      },
      listCount: 0,
      dataList: [],
    }
  },

  created () {
  },
  mounted () {
    this.searchClick()
  },
  methods: {
    nftPrice (basePrice) {
      return this.$Web3.utils.fromWei(basePrice.toString())
    },
    searchClick () {
      this.queryParams.page = 1
      this.queryData()
    },
    queryData () {
      this.$api("token.query", this.queryParams).then((res) => {
        if (this.$tools.checkResponse(res)) {
          this.dataList = res.debug.listData
          this.listCount = res.debug.listCount
          this.queryParams.page = res.debug.curPage
        }
      })
    }
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
  .right-content {
    width: 100%;
  }
}
</style>


