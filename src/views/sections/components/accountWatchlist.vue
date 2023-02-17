<template>
  <div>
    <div v-if="loadStatus==='loading'">
      <p class="loading-txt">
        <el-icon class="my-loading">
          <Loading />
        </el-icon>
      </p>
    </div>
    <div v-else>
      <nft-list :nftList="dataList" :volTime="1" @onLike="onLike"></nft-list>
      <div class="custom-pagination" v-if="listCount>queryParams.limit">
        <div class="content">
          <el-pagination background v-model:current-page="queryParams.page" :page-size="queryParams.limit"
            :page-="queryParams.page" @current-change="pageHandle" layout="prev, pager, next" align="center"
            :total="listCount" />
        </div>
      </div>
      <div class="empty-wrap" v-if="dataList.length===0">
        <p class="txt">No Data</p>
        <img src="@/assets/images/no-data.png" alt="">
      </div>
    </div>
  </div>

</template>

<script>
import nftList from '@/components/self/nftList/index'

export default {
  name: "accountWatchlist",
  components: {
    nftList,
  },
  props: {
    address: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      dataList: [],
      queryParams: {
        page: 1,
        limit: 10,
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
    nftPriceFun (basePrice) {
      return basePrice !== null && basePrice !== 0 ? this.$filters.keepPoint(this.$Web3.utils.fromWei(basePrice.toString())) : '--'
    },
    init () {
      this.queryParams.page = 1
      this.queryParams.followAddress = this.address
      this.pageHandle()
    },
    pageHandle () {
      this.dataList = [];
      this.loadStatus = "loading";
      this.$api("collect.query", this.queryParams).then((res) => {
        this.loadStatus = 'over'
        if (this.$tools.checkResponse(res)) {
          this.dataList = res.debug.listData
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
