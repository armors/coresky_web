<template>
  <div class="collection-wrapper">
    <div class="collection-banner">
      <div class="page-top">
        <div class="page-title">Explore Categories!</div>
        <div class="page-title-sub">Choose collections whatever you like!</div>
      </div>
      <div class="top-nav">
        <div class="item-nav" :class="{ 'active': item.id === query.cid }" @click="changeCategory(item)"
          v-for="(item, index) in categoryList" :key="index">
          {{ item.name }}</div>
      </div>
    </div>
    <div v-if="loadStatus==='loading'">
      <p class="loading-txt">
        <el-icon class="my-loading">
          <Loading />
        </el-icon>
      </p>
    </div>
    <div v-else>
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
                {{ item.name }}
                <img class="tag" src="../../assets/images/icons/icon_list_blue.svg" alt="">
              </div>
            </div>

          </div>
        </router-link>
      </div>
      <div class="custom-pagination" v-if="listCount > query.limit">
        <div class="content">
          <el-pagination background v-model:current-page="query.page" :page-size="query.limit" :page-="query.limit"
            @current-change="search" layout="prev, pager, next" align="center" :total="listCount" />
        </div>
      </div>
      <div class="empty-wrap" v-if="dataList.length === 0">
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
      this.getCategoryList()
      this.search();
    },
    getCategoryList() {
      this.$api("collections.type").then((res) => {
        if (this.$tools.checkResponse(res)) {
          console.log('😺👉➡️', res)
          this.categoryList = res.debug;
        }
      });
    },
    changeCategory(item) {
      this.query.cid = item.id
      this.search()
    },
    search() {
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
@media screen and (max-width: 4000px) {
  .collection-list-new {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media screen and (max-width: 1800px) {
  .collection-card {
    zoom: .9;
  }
}

@media screen and (max-width: 1500px) {
  .collection-card {
    zoom: .8;
  }
}
@media screen and (max-width: 1500px) {
  .collection-card {
    zoom: .7;
  }
}
@media screen and (max-width: 1700px) {

  .collection-list-new {
    grid-template-columns: repeat(4, 1fr);
  }
}

.collection-wrapper {
  .collection-banner {
    background: linear-gradient(180deg, #E7EAF5 13.57%, rgba(231, 234, 245, 0) 100%);
    padding: 0 40px;
    padding-top: 60px;
    height: 300px;
  }

  .page-title {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 60px;
    line-height: 70px;
    height: 70px;
    color: #111111;
  }

  .page-title-sub {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    height: 21px;
    margin-top: 9px;

    color: #717A83;
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
      border: 2px solid #E6E8EC;

      &:hover {
        cursor: pointer;
      }

      &:hover {
        color: $color-black3;
        border: 2px solid #E6E8EC;
        box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.16);
      }

      &.active {
        background: #1063E0;
        color: #fff;
      }
    }
  }

  .collection-list-new {
    padding: 40px;
    display: grid;
    grid-auto-rows: minmax(0px, 1fr);
    grid-gap: 20px 20px;

    .collection-card {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0px 0px 20px $arrowBtnShadow;
    }

    .card-top {
      height: 360px;
      width: 100%;
      overflow: hidden;

      .card-img {
        height: 360px;

      }

      .card-img .cover-image {
        height: 360px;
        width: auto;
      }
    }

    .card-bottom {
      height: 90px;
      display: flex;

      .head-img {
        position: relative;
        width: 80px;
        height: 80px;
        background: #fff;
        padding: 2px;
        border-radius: 12px;
        margin-top: -24px;
        margin-left: 26px;

        .cover-image {
          width: 100%;
          height: 100%;
          border-radius: 12px;
        }
      }

      .head-txt {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 100%;
        display: flex;
        align-items: center;
        color: #111111;
        margin-left: 12px;

        img {
          height: 20px;
          width: 20px;
          margin-left: 8px;
        }
      }
    }

  }



}
</style>


