<template>
  <div class="accountNFTs">
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
          <el-switch v-model="queryParams.hasOffer" class="ml-2" />
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
            <el-input type="number" class="input-number" :controls="false" v-model="queryParams.minPrice"
              :placeholder="$t('home.minPlaceholder')" />
            <div class="line"></div>
            <el-input type="number" class="input-number" :controls="false" v-model="queryParams.maxPrice"
              :placeholder="$t('home.maxPlaceholder')" />
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
                  {{item.ckCollectionsInfoEntity.name}} #{{item.tokenId}}
                </div>
                <div class="nft-price" v-if="item.ckOrdersEntity!==null">
                  <img class="token-icon" src="@/assets/images/icons/token/token_eth.svg" alt="">
                  <span class="nft-price">{{item.ckOrdersEntity.basePrice.toString()}} ETH</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="custom-pagination" v-if="queryParams.limit<listCount">
          <div class="content">
            <el-pagination background layout="prev, pager, next" align="center" :total="1000" />
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
  name: "accountNFTs",
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
        hasOffer: true,
        search: '',
        page: 1,
        limit: this.$store.state.pageLimit,
        keyword: '',
        contract: '',
        minPrice: 0,
        maxPrice: 0,
        order: 0,
        address: ''
      },
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
    init () {
      this.queryParams.page = 1
      this.queryParams.address = this.address
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
          this.queryParams.listCount = res.debug.listCount
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
.accountNFTs {
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
