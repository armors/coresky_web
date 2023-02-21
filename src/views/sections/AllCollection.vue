<template>
  <div class="collection-wrapper" v-infinite-scroll="loadMoreData" :infinite-scroll-disabled="disabledLoadMore"
    :infinite-scroll-distance="50">
    <div class="collection-banner">
      <div class="page-top">
        <div class="page-title">Explore Categories!</div>
        <div class="page-title-sub">Choose collections whatever you like!</div>
      </div>
      <div class="top-nav">
        <div class="item-nav" :class="{ active: item.id === query.cid }" @click="changeCategory(item)"
          v-for="(item, index) in categoryList" :key="index">
          {{ item.name }}
        </div>
      </div>
    </div>

    <div>
      <div class="collection-list-new">
        <router-link :to="`/collection/${item.contract}`" class="collection-card" v-for="(item, index) in dataList"
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
                <!-- <img class="tag" src="../../assets/images/icons/icon_tag.svg" alt=""> -->
              </div>
              <div class="head-txt">
                <span>{{ item.name }}</span>

                <img class="tag" src="../../assets/images/icons/icon_list_blue.svg" alt="" />
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div v-if="loadStatus === 'loading'">
        <p class="loading-txt">
          <el-icon class="my-loading">
            <Loading />
          </el-icon>
        </p>
      </div>
      <div class="empty-wrap" v-if="dataList.length === 0 && loadStatus !== 'loading'">
        <p class="txt">No Data</p>
        <img src="../../assets/images/no-data.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mixins: [],
  name: "AllCollection",
  components: {},
  data: function () {
    return {
      nftList: [],
      query: {
        search: this.$route.query.keyword || "",
        page: 1,
        limit: 20,
        cid: 1,
        limit: this.$store.state.pageLimit,
      },
      keyword: "",
      loadStatus: "over",
      sortIndex: "first",
      accountList: [],
      categoryList: [],
      dataList: [],
      listCount: 0,
      categoryId: 1,
    };
  },
  watch: {
    $route(to, from) {
      if (this.$route.path == "/search") {
        this.query.search = this.$route.query.keyword;
        this.query.page = 1;
        this.loadStatus = "";
        this.init();
      }
    },
  },
  created() {
    this.init();
  },
  mounted() { },
  computed: {
    disabledLoadMore: function () {
      return this.loadStatus === 'loading' || this.dataList.length >= this.listCount
    },
    showAddress() {
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
    init() {
      this.getCategoryList();
      this.search();
    },
    getCategoryList() {
      this.$api("collections.type").then((res) => {
        if (this.$tools.checkResponse(res)) {
          console.log("😺👉➡️", res);
          this.categoryList = res.debug;
        }
      });
    },
    changeCategory(item) {
      this.query.cid = item.id;
      this.dataList = []
      this.search();
    },
    search() {
      this.loadStatus = "loading";
      this.$api("collect.query", this.query).then((res) => {
        this.loadStatus = "over";
        if (this.$tools.checkResponse(res)) {
          this.dataList = this.dataList.concat(res.debug.listData);
          this.listCount = res.debug.listCount;
          this.query.page = res.debug.curPage;
        }
      });
    },
    loadMoreData() {
      this.query.page += 1
      this.search()
    },
  },
};
</script>
<style lang="scss" scoped>
.collection-wrapper {
  .collection-banner {
    background: linear-gradient(180deg,
        #e7eaf5 13.57%,
        rgba(231, 234, 245, 0) 100%);
    padding: 0 40px;
    padding-top: 60px;
    height: 300px;
  }

  .page-title {
    font-style: normal;
    font-weight: 700;
    font-size: 60px;
    line-height: 70px;
    height: 70px;
    color: #111111;
  }

  .page-title-sub {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    height: 21px;
    margin-top: 9px;

    color: #717a83;
  }

  .top-nav {
    margin-top: 64px;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 20px;

    .item-nav {
      height: 46px;
      line-height: 46px;
      padding: 0 24px;
      border-radius: 12px;
      font-weight: 400;
      font-size: 16px;
      color: #111111;
      border: 2px solid #e6e8ec;

      &:hover {
        cursor: pointer;
      }

      &:hover {
        color: $color-black3;
        border: 2px solid #e6e8ec;
        box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.16);
      }

      &.active {
        background: #1063e0;
        color: #fff;
      }
    }
  }

  .collection-list-new {
    padding: 40px;
    display: grid;
    gap: 18px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

    .collection-card {
      min-height: 1px;
      position: relative;
      display: block;
      border-radius: 12px;
      border: 1px solid $borderBg;
      filter: drop-shadow(0px 0px 10px rgba(82, 77, 255, 0.05));

      &:hover {
        box-shadow: 0 7px 16px -8px rgba(0, 0, 0, 0.15);
      }

      .collection-content {
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.23s;
        background: $bg-white;
        position: relative;
      }
    }

    .card-top {
      z-index: 1;
      position: relative;

      .card-img {
        &::before {
          display: block;
          content: '';
          padding-bottom: 100%;
        }

        position: relative;
        transition: all 0.23s;

        img,
        .cover-image {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          height: 100%;
          width: 100%;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
      }
    }

    .card-bottom {
      height: 70px;
      display: flex;

      .head-img {
        z-index: 1;
        background: #fff;
        padding: 2px;
        border-radius: 12px;
        margin-top: -20px;
        margin-left: 26px;
        .cover-image {
          width: 60px;
          height: 60px;
          border-radius: 12px;
         box-shadow: 0 7px 16px -8px rgba(0, 0, 0, 0.2);
        }
      }

      .head-txt {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        color: #111111;
        margin-left: 8px;
        vertical-align: middle;
        overflow: auto;
        width: auto;
        padding-right: 20px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;

        span {
          display: block;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        img {
          display: inline-block;
          height: 20px;
          width: 20px;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>


