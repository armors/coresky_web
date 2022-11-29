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
    <div class="list-search-wrap">
      <el-input class="search-input-wrap" v-model="keyword" @keyup.enter="searchClick">
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

.search-input-wrap {
  width: 600px;
  flex-grow: 0;
}
</style>


