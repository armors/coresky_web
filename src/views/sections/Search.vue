<template>
  <div class="main-wrapper">
    <div class="account-page">
      <el-tabs v-model="activeName">
        <el-tab-pane label="Collection results" name="collection" :lazy="true">
          <div class="list-search-wrap" style="margin-top:10px">
            <el-input class="search-input-wrap" v-model="collectionQuery.keyword" @keyup.enter="searchCollection">
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
          <div class="custom-pagination" v-if="listCount>collectionQuery.limit">
            <div class="content">
              <el-pagination background v-model:current-page="collectionQuery.page" :page-size="collectionQuery.limit"
                :page-="collectionQuery.limit" @current-change="getCollectionData" layout="prev, pager, next"
                align="center" :total="listCount" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="NFT results" name="nft" :lazy="true">
          <markterplace ref="markterplaceRef" :searchKeyword="$route.query.keyword" style="padding-top:10px" />
        </el-tab-pane>
        <el-tab-pane label="User results" name="user" :lazy="true" :disabled="true">
          User results
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import markterplace from './Markterplace'

export default {
  mixins: [],
  components: { markterplace },
  data: function () {
    return {
      activeName: 'collection',
      dataList: [],
      listCount: 1,
      collectionQuery: {
        keyword: "",
        page: 1,
        limit: 20,
      },
      loadStatus: "",
      accountList: [],
    };
  },
  watch: {
    '$route.query' (val) {
      this.collectionQuery.keyword = val.keyword
      this.init()
    },
  },
  mounted () {
    this.collectionQuery.keyword = this.$route.query.keyword || ''
    this.init()
  },
  computed: {
    showAddress () {
      return (search) => {
        var res =
          search.address.slice(0, 11) + "..." + search.address.slice(-4);
        return res;
      };
    },
  },
  methods: {
    init () {
      this.activeName = 'collection'
      this.searchCollection();
    },
    searchCollection () {
      this.collectionQuery.page = 1
      this.getCollectionData()
    },
    getCollectionData () {
      this.$api("collect.query", this.collectionQuery).then((res) => {
        if (this.$tools.checkResponse(res)) {
          this.dataList = res.debug.listData
          this.listCount = res.debug.listCount
          this.collectionQuery.page = res.debug.curPage
        }
      })
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

.account-page {
  width: 1200px;
  margin: 40px auto;
  ::v-deep {
    .el-tabs__item {
      font-family: 'Plus Jakarta Display';
      padding: 0 40px;
      font-weight: 700;
      font-size: 32px;
      line-height: 40px;
      color: $color-black2;
      padding-bottom: 16px;
      height: 56px;
      &.is-active {
        color: $primaryColor;
      }
      &.is-top:nth-child(2) {
        padding-right: 40px;
      }
    }
    .el-tabs__active-bar {
      background-color: $bgPurple;
      height: 4px;
    }
  }
}

.search-input-wrap {
  width: 600px;
  flex-grow: 0;
}
</style>


