<template>
  <div class="search-wrapper" v-infinite-scroll="loadMoreData" :infinite-scroll-disabled="disabledLoadMore"
    :infinite-scroll-distance="50">
    <div class="account-page">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('common.Collection')" name="collection" :lazy="true">
          <div style="padding-top: 10px;">
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
        </el-tab-pane>
        <el-tab-pane label="NFT" name="nft" :lazy="true">
          <markterplace ref="markterplaceRef" :searchKeyword="this.collectionQuery.keyword"/>
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
      loadStatus: 'over',
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
    disabledLoadMore: function () {
      return this.loadStatus === 'loading' || this.dataList.length >= this.listCount
    },
  },
  methods: {
    init () {
      this.activeName = 'collection'
      this.searchCollection();
    },
    searchCollection () {
      this.dataList = []
      this.collectionQuery.page = 1
      this.getCollectionData()
    },
    getCollectionData () {
      // this.dataList = []
      this.loadStatus = "loading";
      this.$api("collect.query", this.collectionQuery).then((res) => {
        this.loadStatus = 'over'
        if (this.$tools.checkResponse(res)) {
          this.dataList = this.dataList.concat(res.debug.listData)
          this.listCount = res.debug.listCount
          this.collectionQuery.page = res.debug.curPage
        }
      })
    },
    loadMoreData () {
      console.log('😺👉➡️', 11)
      this.collectionQuery.page += 1
      this.getCollectionData()
    }
  },
};
</script>
<style lang="scss" scoped>
.search-wrapper {
  max-width: 100%;
  padding: 0 40px;
  margin-top: 40px;
}

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

  // overflow:auto;
  ::v-deep {
    .main-wrapper {
      padding: 0;
    }
    .el-tabs__content {
      overflow: visible;
    }

    .el-tabs__item {
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

.collection-list-new {
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
</style>


