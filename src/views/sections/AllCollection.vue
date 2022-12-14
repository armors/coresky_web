<template>
  <div class="main-wrapper">
    <div class="page-top">
      <div class="page-title">Werfen Sie einen Blick！</div>
      <div class="page-title-sub">Kaufen und gehen，Zögern Sie nicht！Bitte wählen Sie die gewünschte Kategorie aus!</div>
    </div>
    <div class="top-nav">
      <div class="item-nav" :class="{'active':item.id===query.cid}" @click="changeCategory(item)"
        v-for="(item,index) in categoryList" :key="index">
        {{item.name}}</div>
    </div>
    <div v-if="loadStatus==='loading'">
      <p class="loading-txt">Coming soon…</p>
    </div>
    <div v-else>
      <div class="collection-list">
        <router-link :to="`/collection/${item.contract}`" class="collection-card" v-for="(item,index) in dataList"
          :key="index">
          <div class="collection-content">
            <div class="card-top">
              <div class="card-img">
                <image-box :src="item.bannerImage"></image-box>
              </div>
            </div>
            <div class="card-bottom">
              <div class="head-img">
                <image-box :src="item.image"></image-box>
                <img class="tag" src="../../assets/images/icons/icon_tag.svg" alt="">
              </div>
              <div class="head-txt">
                {{item.name}}
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="custom-pagination" v-if="listCount>query.limit">
        <div class="content">
          <el-pagination background v-model:current-page="query.page" :page-size="query.limit" :page-="query.limit"
            @current-change="search" layout="prev, pager, next" align="center" :total="listCount" />
        </div>
      </div>
      <div class="empty-wrap" v-if="dataList.length===0">
        <p class="txt">No Data</p>
        <img src="../../assets/images/no-data.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mixins: [],
  name: 'AllCollection',
  components: {},
  data: function () {
    return {
      nftList: [],
      query: {
        search: this.$route.query.keyword || "",
        page: 1,
        cid: 1,
        limit: this.$store.state.pageLimit,
      },
      keyword: '',
      loadStatus: 'over',
      sortIndex: "first",
      accountList: [],
      categoryList: [],
      dataList: [],
      listCount: 0,
      categoryId: 1,
    };
  },
  watch: {
    $route (to, from) {
      if (this.$route.path == "/search") {
        this.query.search = this.$route.query.keyword;
        this.query.page = 1;
        this.loadStatus = "";
        this.init();
      }
    },
  },
  created () {
    this.init();
  },
  mounted () { },
  computed: {
    showAddress () {
      return (search) => {
        var res =
          search.address.slice(0, 11) + "..." + search.address.slice(-4);
        return res;
      };
    },
    user: function () {
      var user = this.$store.state.user;
      return user;
    },
  },
  methods: {
    init () {
      this.getCategoryList()
      this.search();
    },
    getCategoryList () {
      this.$api("collections.type").then((res) => {
        if (this.$tools.checkResponse(res)) {
          this.categoryList = res.data;
        }
      });
    },
    changeCategory (item) {
      this.query.cid = item.id
      this.search()
    },
    search () {
      this.dataList = []
      this.loadStatus = "loading";
      this.$api("collect.query", this.query).then((res) => {
        this.loadStatus = 'over'
        if (this.$tools.checkResponse(res)) {
          this.dataList = res.debug.listData
          this.listCount = res.debug.listCount
          this.query.page = res.debug.curPage
        }
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.main-wrapper {
  padding: 40px 0;
  .page-title {
    font-weight: 700;
    font-size: 32px;
    line-height: 41px;
    color: $primaryColor;
  }
  .page-title-sub {
    margin-top: 20px;
    font-weight: 400;
    font-size: 20px;
    color: $color-black3;
    letter-spacing: 0.05em;
  }
  .top-nav {
    margin: 60px 0 30px;
    display: flex;
    .item-nav {
      height: 40px;
      margin-right: 20px;
      line-height: 40px;
      padding: 0 20px;
      border-radius: 20px;
      font-weight: 400;
      font-size: 16px;
      color: $color-black2;
      border: 1px solid $borderBg;
      &:hover {
        cursor: pointer;
      }
      &:hover {
        color: $color-black3;
        border: 1px solid $color-black3;
      }
      &.active {
        font-weight: 500;
        background: $mainLiner;
        color: $color-white;
      }
    }
  }
}
</style>


