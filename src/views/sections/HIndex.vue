<template>
  <div class="body-wrapper">
    <div class="carousel-section">
      <el-carousel id="home-banner" class="home-banner" arrow="always" :interval="6000" :height="bannerHeight">
        <el-carousel-item v-for="(banner, i) in banners" :key="i">
          <div class="banner-box display-flex box-center-Y">
            <div class="banner-item" v-for="(v, i1) in banner" :key="`popular-${i}`">
              <el-image class="cover-image" placeholder="loading" :src="$filters.fullImageUrl($filters.nftURI(v).image)" fit="cover">
                <template v-slot:placeholder>
                  <el-skeleton class="placeholder-image" animated>
                    <template #template>
                      <el-skeleton-item class="nft-image-skeleton" variant="h3" />
                    </template>
                  </el-skeleton>
                </template>
                <template v-slot:error>
                  <el-image class="error-image" :src="require('@/assets/create-img/non-existent.png')" fit="contain"></el-image>
                </template>
              </el-image>
              <div class="nft-name">{{ $filters.nftURI(v).name }}</div>
              <div class="nft-price">{{$t('home.nftListTitle2')}} {{v.quantity}}</div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="home-wrapper main-wrapper">

      <div class="search-options justify-between">
        <div class="home-title">{{ $t("home.saleList") }}</div>
        <div class="nft-sorts">
          <div class="nft-sorts-item" :class="sortKey == 'update_time' ? 'active' : ''" @click="seleteSort('update_time')">
            <span class="text">{{ $t("hindex.time") }}</span>
            <template v-if="sortKey == 'update_time'">
              <img v-if="sortValue == 'desc'" class="sort-icon" src="@/assets/img/sort_desc.png" />
              <img v-else class="sort-icon" src="@/assets/img/sort_asc.png" />
            </template>
            <img v-else class="sort-icon" src="@/assets/img/no_sort.png" alt="" />
          </div>
          <filter-and-sort :filters="filters" :filterId="filterId" @selectFilter="selectFilter">
          </filter-and-sort>
        </div>
      </div>

      <div v-infinite-scroll="loadNftList">
        <nft-list :nftList="nftList" @showDialog="showDialog" @onLike="onLike"></nft-list>
<!--        <nft-item v-for="(nft, i) in nftList" :nft="nft" :key="i" :index="i" @showDialog="showDialog" @onLike="onLike"></nft-item>-->
        <nft-item-load :loadStatus="loadStatus"></nft-item-load>
      </div>
      <nftPopular :popularList="popularList"></nftPopular>
<!--      <nft-item-load :loadStatus="loadStatus"></nft-item-load>-->
    </div>
    <sale-dialog :show="showSaleDialog" @close="closeDialog" @confirm="dialogConfirm" :asset="dialogOrder" :nft="dialogNft" :uri="dialogNftURI">
    </sale-dialog>
    <cancel-sale-dialog :show="showCancelSaleDialog" @close="closeDialog" @confirm="dialogConfirm" :asset="dialogOrder" :nft="dialogNft" :uri="dialogNftURI">
    </cancel-sale-dialog>
    <buy-dialog :show="showBuyDialog" @close="closeDialog" @confirm="dialogConfirm" :asset="dialogOrder" :nft="dialogNft" :uri="dialogNftURI">
    </buy-dialog>

    <bid-dialog :show="showBidDialog" @close="closeDialog" @confirm="dialogConfirm" :bid="dialogOrder" :nft="dialogNft" :uri="dialogNftURI">
    </bid-dialog>
    <cancel-bid-dialog :show="showCancelBidDialog" @close="closeDialog" @confirm="dialogConfirm" :bid="dialogOrder" :nft="dialogNft" :uri="dialogNftURI">
    </cancel-bid-dialog>
    <accept-dialog :show="showAcceptDialog" @close="closeDialog" @confirm="dialogConfirm" :bid="dialogOrder" :nft="dialogNft" :uri="dialogNftURI">
    </accept-dialog>
    <transfer-dialog :show="showTransferDialog" @close="closeDialog" @confirm="dialogConfirm" :asset="dialogOrder" :nft="dialogNft" :uri="dialogNftURI">
    </transfer-dialog>
    <burn-dialog :show="showBurnDialog" @close="closeDialog" @confirm="dialogConfirm" :asset="dialogOrder" :nft="dialogNft" :uri="dialogNftURI">
    </burn-dialog>

  </div>
</template>
<script>
  import FilterAndSort from "@/components/FilterAndSort";
  import NftDialog from "@/mixins/NftDialog";
  import NftInfo from "@/mixins/NftInfo";
  import NftItem from "@/mixins/NftItem";
  import nftList from '@/components/self/nftList/index'
  import nftPopular from '@/components/self/popular/index'
  export default {
    name: "HIndex",
    components: {
      FilterAndSort,
      nftList,
      nftPopular
    },
    mixins: [
      NftDialog,
      NftItem,
      NftInfo,
    ],
    data: function () {
      return {
        banner: require("@/assets/img/home/index_bg.png"),
        sortKey: "",
        filterId: "",
        filters: [],
        sortValue: "",
        nftList: [],
        popularList: [],
        query: {
          page: 1,
          limit: this.$store.state.pageLimit,
        },
        loadStatus: "",
        bannerHeight: "500px",
        banners: [
          // {
          //   src: null,
          //   name: "Fingerchar NFT",
          //   title: this.$t('home.tip1'),
          //   text: this.$t('home.tip2'),
          //   url: "https://github.com/fingerchar/fingernft",
          //   urlText: this.$t('home.explore')
          // },
        ],
      };
    },
    created () {
      this.init();
    },
    mounted () {
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
    },
    unmounted () {
      window.removeEventListener("resize", this.handleResize);
    },
    computed: {
      user () {
        return this.$store.state.user;
      },
    },
    methods: {
      reloadList () {
        this.query.page = 1;
        this.getNftList();
      },
      handleResize () {
        let header_height = 112;
        let banner = document.getElementById("home-banner");
        if (!banner) return;
        banner.style.paddingTop = header_height + 10 + "px";
        let width = banner.clientWidth;
        this.bannerHeight = (width / 1.8) * this.imgRatio;
        if (this.bannerHeight < 600) {
          this.bannerHeight = '600px'
        } else {
          this.bannerHeight = this.bannerHeight + 'px'
        }
      },
      async init () {
        this.getCategoryList();
        this.getNftList();
      },
      toRouter (url) {
        if (!url.startsWith("http")) {
          this.$router.push({
            path: url,
          });
        } else {
          window.open(url)
        }
      },
      selectFilter (filterId) {
        this.filterId = this.filterId == filterId ? "" : filterId;
        this.query.page = 1;
        this.getNftList();
      },
      getCategoryList () {
        this.$api("category.list").then((res) => {
          if (this.$tools.checkResponse(res)) {
            this.filters = res.data;
          }
        });
      },
      seleteSort (sort) {
        if (this.sortKey == sort) {
          this.sortValue = this.sortValue == "asc" ? "desc" : "asc";
        } else {
          this.sortKey = sort;
          this.sortValue = "desc";
        }
        this.query.page = 1;
        this.getNftList();
      },
      loadNftList () {
        if (this.loadStatus == "over") return;
        this.getNftList();
      },
      getNftList () {
        if (this.loadStatus == "loading") return;
        this.loadStatus = "loading";
        var data = {
          page: this.query.page,
          limit: this.query.limit,
          cate: this.filterId,
          sort: this.sortKey,
          order: this.sortValue,
        };
        this.$api("home.list", data).then((res) => {
          this.loadStatus = "";
          if (this.$tools.checkResponse(res)) {
            if (data.page == 1){
              this.popularList = []
              this.nftList = [];
              this.banner = []
            }
            this.nftList = this.nftList.concat(res.data.list);
            this.popularList = this.popularList.concat(res.data.list);
            this.banners = this.$tools.sliceArrayTo(res.data.list, 4);
            this.queryFunction(res.data.list, this.nftList);
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
  .home-wrapper {
    max-width: 1320px;
    margin: 0 auto;
    width: 100%;
  }
  .no-margin {
    margin: 0 !important;
  }

  .sort-icon {
    width: 7px;
    height: 4px;
    margin-left: 5px;
  }
  .body-wrapper {
    width: 100%;
    /*background: #dde8ff;*/
    min-height: 100vh;
  }

  .home-banner {
    padding-top: 122px;
    margin-top: -112px;
    padding-bottom: 40px;
    background: url("../../assets/img/home/index_bg.png") no-repeat;
    background-size: cover;
    .banner-box {
      width: 85%;
      height: 100%;
      margin: 0 auto;
      .banner-item{
        width: 23%;
        height: 80%;
        margin-right: 2.6%;
        position: relative;
        &:last-child{
          margin-right: 0;
        }
        .cover-image{
          width: 100%;
          height: 100%;
          position: relative;
        }
        .nft-name{
          padding-left: 32px;
          position: absolute;
          font-size: 24px;
          text-align: center;
          bottom: 56px;
        }
        .nft-price{
          padding-left: 32px;
          position: absolute;
          font-size: 24px;
          text-align: center;
          bottom: 24px;
        }
      }
    }
  }
  .carousel-section {
    position: relative;
    .tip {
      font-size: 16px;
      color: #3c4784;
      margin-top: 20px;
    }
  }

  .head-box {
    align-items: flex-end;
    padding: 20px 0px;
    .title {
      font-size: 28px;
      color: #000;
    }
    .iconfont {
      font-size: 36px;
      font-weight: bold;
    }
    .filter-more {
      font-size: 36px;
    }
  }

  .goods-top {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .top-item {
      display: inline-flex;
      align-items: center;
      width: 25%;
      margin-bottom: 40px;
      color: #fff;
      font-size: 20px;
      font-family: Poppins-SemiBold;
      line-height: 24px;
      .top-num {
        width: 30px;
        text-align: right;
        margin-right: 10px;
      }
      .top-avatar {
        border-radius: 50%;
        border: 2px solid #4d0c94;
        overflow: hidden;
      }
      .top-avatar-mini {
        border-radius: 50%;
        border: 2px solid #4d0c94;
        overflow: hidden;
        display: none;
      }
      .top-text {
        margin-left: 23px;
        font-size: 18px;
        word-break: break-all;
        .top-deal {
          font-size: 16px;
          font-family: Poppins-Light;
        }
      }
    }
  }

  .category-tags {
    display: flex;
  }
  .category-tags-item {
    background: none;
    border: none;
    color: #999;
    font-weight: bold;
    padding: 0;
    height: auto;
    margin: 0;
    margin-right: 20px;
    cursor: pointer;
    &.active {
      color: #333;
      border-bottom: 2px solid #333;
      border-radius: 0;
    }
  }
  .search-options {
    position: relative;
    display: flex;
    align-items: center;
    margin: 20px 0;
    .title {
      font-size: 28px;
      color: #000;
    }
  }
  .nft-sorts {
    display: flex;
    align-items: center;
    line-height: 18px;
  }
  .nft-sorts-item {
    white-space: nowrap;
    display: flex;
    font-size: 13px;
    align-items: center;
    font-weight: 400;
    cursor: pointer;
    margin-right: 16px;
    .text {
      display: flex;
    }
    .sort-icon {
      display: flex;
      height: 13px;
      margin-left: 3px;
    }
    &.active {
      color: $primaryColor;
    }
  }

  .content-bottom {
    padding-bottom: 100px;
  }

  .new-nft-list {
    margin: 0 -10px;
  }

  .nft {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

</style>


<style lang="scss" scoped>
</style>


