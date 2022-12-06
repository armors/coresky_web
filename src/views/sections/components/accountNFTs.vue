<template>
  <div class="accountNFTs">
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
      <!-- <div class="filter-item flex border">
        <span class="left">Buy Now</span>
        <span class="right">
          <el-switch v-model="queryParams.isNowBuy" class="ml-2" />
        </span>
      </div> -->
      <div class="filter-item flex border">
        <span class="left">Have an offer</span>
        <span class="right">
          <el-switch v-model="queryParams.hasOffer" class="ml-2" />
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
        <div class="btn-apply" @click="init">Application</div>
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
            <div class="img-search"><img src="@/assets/images/icons/icon_search.svg" alt=""></div>
          </template>
        </el-input>
        <div class="list-wrap">
          <div class="list-item" v-for="key in 8" :key="key">
            <div class="head-img">
              <img
                src="https://storage.nfte.ai/asset/collection/featured/SIPGAWJPYHJAGSVGQIXWOKPHREVQFDSL.jpg?x-oss-process=image/resize,m_fill,w_108,h_108,limit_0"
                alt="">
              <img class="tag" src="@/assets/images/icons/icon_tag.svg" alt="">
            </div>
            <div class="head-txt">
              HUGO x Imaginary Ones: Embrace Your Emotionss
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="nft-list">
        <router-link :to="`/detail/${item.contract}/${item.tokenId}`" class="nft-card" v-for="(item,index) in nftList" :key="index">
          <div class="nft-content">
            <div class="card-top">
              <div class="card-img">
                <!-- <image-box src="https://storage.nfte.ai/asset/collection/featured/BEEWQLPGNIJCWCXJUDSRUWRWOWSOYCCT.jpg?x-oss-process=image/resize,m_fill,w_504,h_288,limit_0"></image-box> -->
                <image-box :src="item.image"></image-box>
              </div>
            </div>
            <div class="card-bottom">
              <div class="nft-txt">
                {{item.name}} #{{item.tokenId}}
              </div>
              <div class="nft-price">
                <img class="token-icon" src="@/assets/images/icons/token/token_eth.svg" alt="">
                <span class="nft-price">0.073 ETH</span>
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
      loadStatus: 'over'
    }
  },
  methods: {
    init () {
      this.queryParams.page = 1
      this.queryParams.address = this.address
      this.pageHandle()
    },
    pageHandle () {
      this.nftList = [];
      this.loadStatus = "loading";
      this.$api("user.token", this.queryParams).then((res) => {
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