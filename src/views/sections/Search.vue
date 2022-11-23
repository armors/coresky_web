<template>
  <div class="main-wrapper">
    <div class="tab-wrap">
      <div class="tabClass" :class="sortIndex == 'first' ? 'active' : ''" @click="handleClick('first')">
        Collection results
      </div>
      <div class="tabClass m-left-20" :class="sortIndex == 'second' ? 'active' : ''" @click="handleClick('second')">
        NFT results
      </div>
      <div class="tabClass m-left-20" :class="sortIndex == 'three' ? 'active' : ''" @click="handleClick('three')">
        User results
      </div>
    </div>
    <div class="search-wrap">
      <el-input class="search-input-wrap" style="width:400px" v-model="keyword" @keyup.enter="searchClick">
        <template #prefix>
          <div class="img-search"><img src="../../assets/images/icons/icon_search.svg" alt=""></div>
        </template>
      </el-input>
      <div class="sort-wrap">
        <span class="icon-wrap icon_filter01 active">
        </span>
        <span class="icon-wrap icon_filter02"></span>
      </div>
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
.title {
  margin-bottom: 20px;
  margin-top: 13px;
  font-size: 17px;
  font-weight: 400;
  color: #999;
}

.m-list {
  margin-top: 28px;
  width: 100%;
}

.user-tab {
  width: 80%;
  margin-bottom: 40px;
}
.user-item {
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  width: 50%;
  .inner {
    width: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    padding: 10px;
    border-radius: $borderRadius;
    margin: 0 5px;
    cursor: pointer;
  }
  .user-item-left {
    cursor: pointer;
    align-items: center;
    flex: 1;
    .image2 {
      align-self: flex-end;
      margin-left: -13px;
      width: 13px;
      height: 13px;
    }
    .name {
      margin-left: 9px;
      font-size: 13px;
      font-weight: bold;
      color: #1b1b1b;
    }
  }
  .user-item-right {
    font-size: 12px;
    color: #999;
  }
}

.nft-tab {
  width: 100%;
}

.account-item {
  width: 50%;
}

.tab-wrap {
  display: flex;
  margin: 40px 0;
  width: 100%;
  display: flex;
  border-bottom: 1px solid $borderBg;
}
.tabClass {
  cursor: pointer;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 41px;
  margin-right: 60px;
  color: $color-black2;
  padding-bottom: 16px;
  &.active {
    color: $primaryColor;
    border-bottom: 4px solid $bgPurple;
  }
}
.search-wrap {
  height: 40px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;

  .sort-wrap {
    display: flex;
    background: $elButtonHoverBg;
    border-radius: 12px;
    align-items: center;
    width: 128px;
    padding: 4px;
    .icon-wrap {
      height: 32px;
      width: 58px;
      line-height: 32px;
      border-radius: 8px;

      &.icon_filter01 {
        background-image: url('../../assets/images/icons/icon_filter01.svg');
        &.active {
          background-image: url('../../assets/images/icons/icon_filter01_active.svg');
          background-color: $bg-white;
        }
      }
      &.icon_filter02 {
        background-image: url('../../assets/images/icons/icon_filter02.svg');
        &.active {
          background-image: url('../../assets/images/icons/icon_filter02_active.svg');
          background-color: $bg-white;
        }
      }
      &:hover {
        cursor: pointer;
      }
      // &.active {
      //   background: $bg-white;
      // }
    }
  }
}
.search-input-wrap {
  overflow: hidden;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 16px;
  // height: 40px;
  border: none;
  ::v-deep {
    .el-input__inner {
      height: 40px;
      border: none;
      font-size: 14px;
    }
    .el-input__wrapper {
      border-radius: 12px;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
      background: $elButtonHoverBg;
      border: none;
      .el-input__inner {
        background-color: transparent;
      }
    }
    .el-input__prefix {
      line-height: 40px;
      left: 15px;
    }
    .img-search {
      width: 16px;
      height: 16px;
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


