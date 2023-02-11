<template>
  <div class="accountFavorited">
    <div class="filter-wrap" v-if="showFilterBox">
      <div class="filter-head">
        <span class="left" @click="showFilterBox=!showFilterBox">
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
        <span class="left">Have an offer</span>
        <span class="right">
          <el-switch v-model="queryParams.hasOffer" @change="searchClick" class="ml-2" />
        </span>
      </div>
      <div class="filter-item flex border">
        <span class="left">Buy Now</span>
        <span class="right">
          <el-switch v-model="queryParams.buyNow" @change="searchClick" class="ml-2" />
        </span>
      </div>
      <div class="filter-item border">
        <div class="flex">
          <span class="left">Price</span>
          <span class="right" @click="isOpenPriceFilter=!isOpenPriceFilter">
            <el-icon style="font-size:16px">
              <ArrowUp />
            </el-icon>
          </span>
        </div>
        <template v-if="isOpenPriceFilter">
          <el-select v-model="queryParams.sort" placeholder="ETH" :teleported="false" popper-class="select-popper"
            class="select-sort">
            <el-option value="ETH">ETH</el-option>
          </el-select>
          <div class="price-range" style="margin-top:15px">
            <el-input-number
              v-model="queryParams.minPrice"
              :placeholder="$t('home.minPlaceholder')"
              :controls="false"
              :precision="4"
              :min="0.0001"
              :max="100000000000000"
              class="input-number"/>
            <!--            <el-input type="number" class="input-number" :controls="false" v-model="queryParams.minPrice"-->
            <!--              :placeholder="$t('home.minPlaceholder')" />-->
            <div class="line"></div>
            <!--            <el-input type="number" class="input-number" :controls="false" v-model="queryParams.maxPrice"-->
            <!--              :placeholder="$t('home.maxPlaceholder')" />-->
            <el-input-number
              v-model="queryParams.maxPrice"
              :placeholder="$t('home.maxPlaceholder')"
              :controls="false"
              :precision="4"
              :min="0.0001"
              :max="100000000000000"
              class="input-number"/>
          </div>
          <div class="btn-apply" @click="searchClick">Application</div>
        </template>
      </div>
      <div class="filter-item">
        <div class="flex">
          <span class="left">Collection</span>
          <span class="right" @click="isOpenSearchCollection=!isOpenSearchCollection">
            <el-icon style="font-size:16px">
              <ArrowUp />
            </el-icon>
          </span>
        </div>
        <template v-if="isOpenSearchCollection">
          <el-input class="search-input-wrap" placeholder="Search" v-model="keyword2" @keyup.enter="searchCollection"
            style="margin-top:15px;">
            <template #prefix>
              <div class="img-search"><img src="../../../assets/images/icons/icon_search.svg" alt=""></div>
            </template>
          </el-input>
          <div class="list-wrap">
            <router-link :to="`/collection/${item.contract}`" class="list-item" v-for="(item,index) in collectionList"
              :key="index">
              <div class="head-img">
                <image-box :src="item.image"></image-box>
                <img class="tag" src="../../../assets/images/icons/icon_tag.svg" alt="">
              </div>
              <div class="head-txt">
                {{item.name}}
              </div>
            </router-link>
          </div>
        </template>
      </div>
    </div>
    <div class="right-content">
      <div class="list-search-wrap">
        <div class="btnfilter" @click="showFilterBox=!showFilterBox">
          <img src="../../../assets/images/icons/icon_filter.svg" alt="">
          Filter
        </div>
        <el-input class="search-input-wrap" style="width:400px" placeholder="Search by name or attribute"
          v-model="queryParams.keyword" @keyup.enter="searchClick">
          <template #prefix>
            <div class="img-search"><img src="../../../assets/images/icons/icon_search.svg" alt=""></div>
          </template>
        </el-input>
        <el-select v-model="queryParams.order" placeholder="Recently listed" @change="searchClick" :teleported="false"
          popper-class="select-popper" class="select-sort">
          <el-option :value="1" label="Price low to high" />
          <el-option :value="2" label="Price high to low" />
          <el-option :value="3" label="Recently listed" />
          <el-option :value="4" label="Recently sold" />
          <el-option :value="5" label="Ending soon" />
        </el-select>
        <div class="sort-wrap">
          <span class="icon-wrap icon_filter01" :class="{'active':viewType===1}" @click="viewType=1">
          </span>
          <span class="icon-wrap icon_filter02" :class="{'active':viewType===2}" @click="viewType=2"></span>
        </div>
      </div>
      <div v-if="loadStatus==='loading'">
        <p class="loading-txt">Coming soon…</p>
      </div>
      <div v-else>
        <div class="nft-list">
          <router-link :to="`/detail/${item.contract}/${item.tokenId}`" class="nft-card" v-for="(item,index) in nftList"
            :key="index">
            <div class="nft-content">
              <div class="card-top">
                <div class="card-img">
                  <!-- <image-box src="https://storage.nfte.ai/asset/collection/featured/BEEWQLPGNIJCWCXJUDSRUWRWOWSOYCCT.jpg?x-oss-process=image/resize,m_fill,w_504,h_288,limit_0"></image-box> -->
                  <image-box :src="item.oriImage"></image-box>
                </div>
              </div>
              <div class="card-bottom">
                <div class="nft-txt">
                  {{item.name?item.name:('#'+item.tokenId)}}
                </div>
                <div class="nft-price"  v-if="item.basePrice">
                  <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="">
                  <span class="price">{{!!item.basePrice?nftPrice(item.basePrice):'-- '}} ETH</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="custom-pagination" v-if="queryParams.limit<listCount">
          <div class="content">
            <el-pagination background v-model:current-page="queryParams.page" :page-size="queryParams.limit"
              :page-="queryParams.limit" @current-change="pageHandle" layout="prev, pager, next" align="center"
              :total="listCount" />
          </div>
        </div>
        <div class="empty-wrap" v-if="nftList.length===0">
          <p class="txt">No Data</p>
          <img src="../../../assets/images/no-data.png" alt="">
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "accountFavorited",
  props: {
    address: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      nftList: [],
      queryParams: {
        hasOffer: false,
        buyNow: false,
        search: '',
        page: 1,
        limit: 20,
        keyword: '',
        contract: '',
        minPrice: undefined,
        maxPrice: undefined,
        order: 1,
        address: '',
        followAddress: ''
      },
      viewType: 1,

      listCount: 0,
      loadStatus: 'over',

      showFilterBox: true,
      isOpenPriceFilter: true,
      isOpenSearchCollection: true,
      keyword2: '',
      collectionList: []
    }
  },
  methods: {
    nftPrice (basePrice) {
      return this.$filters.keepMaxPoint(this.$Web3.utils.fromWei(basePrice.toString()))
    },
    init () {
      this.queryParams.page = 1
      this.queryParams.followAddress = this.address
      this.pageHandle()
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
    pageHandle () {
      this.nftList = [];
      this.loadStatus = "loading";
      this.$api("token.query", this.queryParams).then((res) => {
        this.loadStatus = 'over'
        if (this.$tools.checkResponse(res)) {
          this.nftList = res.debug.listData
          this.queryParams.page = res.debug.curPage
          this.listCount = res.debug.listCount
        } else {
          this.$tools.message(res.errmsg);
        }
      });
    },
    searchClick () {
      this.init()
    }
  },
  created () {
    this.init();
    this.searchCollection()
  },
}

</script>

<style lang="scss" scoped>
.accountFavorited {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.right-content {
  width: 100%;
}
</style>
