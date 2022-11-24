<template>
  <div class="main-wrapper">
    <div class="page-top">
      <div class="page-title">Werfen Sie einen Blick！</div>
      <div class="page-title-sub">Kaufen und gehen，Zögern Sie nicht！Bitte wählen Sie die gewünschte Kategorie aus!</div>
    </div>
    <div class="top-nav">
      <div class="item-nav active">PFP</div>
      <div class="item-nav">Art</div>
      <div class="item-nav">Passcard</div>
      <div class="item-nav">Game</div>
      <div class="item-nav">Music</div>
    </div>
    <div class="collection-list">
      <div class="collection-card" v-for="i in 12" :key="i">
        <div class="collection-content">
          <div class="card-top">
            <div class="card-img">
              <img class="img-lazy"
                src="https://storage.nfte.ai/asset/collection/featured/BEEWQLPGNIJCWCXJUDSRUWRWOWSOYCCT.jpg?x-oss-process=image/resize,m_fill,w_504,h_288,limit_0"
                alt="Image" _nk="p/rO21">
            </div>
          </div>
          <div class="card-bottom">
            <div class="head-img">
              <img
                src="https://storage.nfte.ai/asset/collection/featured/MFYROFVZKZSCSHUWXRGBZAAQPZWMOKFM.jpg?x-oss-process=image/resize,m_fill,w_108,h_108,limit_0"
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

    <div class="custom-pagination">
      <div class="content">
        <el-pagination background layout="prev, pager, next" align="center" :total="1000" />
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
        limit: this.$store.state.pageLimit,
      },
      keyword: '',
      loadStatus: "",
      sortIndex: "first",
      accountList: [],
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
    handleClick (tab) {
      this.loadStatus = "";
      this.sortIndex = tab;
      this.query.page = 1;
      this.search();
    },
    init () {
      this.search();
    },
    reloadList () {
      this.query.page = 1;
      this.search();
    },
    loadsearchList () {
      if (this.loadStatus == "over") return;
      this.search();
    },
    search () {
      if (this.loadStatus == "loading") return;
      this.loadStatus = "loading";
      let data = {
        ...this.query,
      };
      if (this.sortIndex == "second") {
        this.getAccounts(data);
      } else {
        this.getNFTs(data);
      }
    },
    getNFTs (parameter) {
      var data = {
        ...this.query,
      };
      this.$api("home.search", data).then((res) => {
        this.loadStatus = "loaded";
        if (this.$tools.checkResponse(res)) {
          if (data.page == 1) this.nftList = [];
          this.nftList = this.nftList.concat(res.data.list);
          this.queryFunction(res.data.list);
          if (res.data.list.length < data.limit) {
            this.loadStatus = "over";
          } else {
            this.query.page += 1;
          }
        } else {
          this.$tools.message(res.errmsg);
        }
      });
    },
    getAccounts (data) {
      this.$api("home.searchuser", data).then((res) => {
        this.loadStatus = "loaded";
        if (this.$tools.checkResponse(res)) {
          if (data.page == 1) this.accountList = [];
          this.accountList = this.accountList.concat(res.data.list);
          if (res.data.list.length < data.limit) {
            this.loadStatus = "over";
          } else {
            this.query.page += 1;
          }
        } else {
          this.$tools.message(res.errmsg);
        }
      });
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
      &:hover,
      &.active {
        font-weight: 500;
        background: $mainLiner;
        color: $color-white;
      }
    }
  }
}

.collection-list {
  display: flex;
  flex-flow: row wrap;
  margin-left: -9px;
  margin-right: -9px;
  row-gap: 20px;
  margin-bottom: 20px;
  .collection-card {
    min-height: 1px;
    position: relative;
    display: block;
    flex: 0 0 33.3333333333%;
    max-width: 33.3333333333%;
    padding-left: 9px;
    padding-right: 9px;
    .collection-content {
      height: 308px;
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.23s;
      background: $bg-white;
      filter: drop-shadow(0px 0px 10px rgba(82, 77, 255, 0.05));
      &:hover {
        box-shadow: 0 7px 16px -8px rgba(0, 0, 0, 0.15);
      }
      .card-top {
        overflow: hidden;
        height: 237px;
        position: relative;
        width: 100%;
        .card-img {
          left: 0;
          position: absolute;
          top: 0;
          transition: all 0.23s;
          height: 237px;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
      .card-bottom {
        display: flex;
        height: 71px;
        padding: 0 20px;
        padding-right: 30px;
        .head-img {
          margin-top: -20px;
          z-index: 1;
          width: 79px;
          height: 79px;
          background-color: $bg-white;
          border-radius: 50px;
          padding: 5px;
          flex-shrink: 0;
          position: relative;
          .tag {
            width: 24px;
            height: 24px;
            position: absolute;
            bottom: 4px;
            right: 0;
            z-index: 2;
          }
        }
        .head-txt {
          margin-left: 15px;
          margin-top: 16px;
          font-weight: 700;
          font-size: 22px;
          line-height: 28px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: $primaryColor;
        }
      }
    }
  }
}
.custom-pagination {
  text-align: center;
  margin: 20px;
  .content {
    display: inline-block;
  }
  ::v-deep {
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .btn-next {
      padding: 0;
      height: 32px;
      border-radius: 8px;
    }
    .el-pagination.is-background .el-pager li {
      height: 32px;
      border-radius: 8px;
      &.is-active {
        background-color: $bgPurple;
        color: $color-white;
      }
    }
  }
}
</style>


