<template>
  <div>
    <div class="body-wrapper">
      <div class="home-banner">
        <div class="max-width">
          <div class="display-flex box-between banner-box">
            <div class="create-app-box">
              <div class="title">{{$t('home.createApp')}}</div>
              <div class="desc">{{$t('home.createAppDesc')}}</div>

              <div class="btn-list display-flex box-center-Y">
                <router-link to="/markterplace" class="btn display-flex box-center">
                  Marketplace
                </router-link>
              </div>
            </div>
            <div class="carousel-box">
              <el-carousel :autoplay="false" arrow="never" v-if="topCollection.length > 0" @change="changeTop">
                <el-carousel-item v-for="(v, i) in topCollection" :key="`recommend-item-${i}`" @click="openURL(v.url)">
                  <!-- {{ v }} -->
                  <image-box class="img-box" :src="v.image"></image-box>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>

      <div class="home-wrapper main-wrapper">
        <nftRecommend :recommendCollection="recommendCollection"></nftRecommend>
        <nftTrade :popularList="popularList"></nftTrade>
        <div class="home-title title-margin-top">{{$t('home.realTitle')}}</div>
        <div class="sort-box display-flex box-center-Y box-between">
          <div class="display-flex box-center-Y">
            <el-button class="filter display-flex box-center" :class="{active: collectionQuery.order === 1}"
              @click="changeOrder(1)">
              <div class="icon-img"><img src="../../assets/images/icons/icon_top.svg" alt=""></div>
              <div>{{ $t("home.sortBtnText1") }}</div>
            </el-button>
            <el-button class="filter display-flex box-center" :class="{active: collectionQuery.order === 2}"
              @click="changeOrder(2)">
              <div class="icon-img"><img src="../../assets/images/icons/icon_trending.svg" alt=""></div>
              <div>{{ $t("home.sortBtnText2") }}</div>
            </el-button>
            <el-button class="filter display-flex box-center" :class="{active: collectionQuery.order === 3}"
              @click="changeOrder(3)">
              <div class="icon-img"><img src="../../assets/images/icons/icon_mints.svg" alt=""></div>
              <div>{{ $t("home.sortBtnText3") }}</div>
            </el-button>
            <el-button class="filter display-flex box-center" :class="{active: collectionQuery.order === 4}"
              @click="changeOrder(4)">
              <div class="icon-img"><img src="../../assets/images/icons/icon_watchlist.svg" alt=""></div>
              <div>{{ $t("home.sortBtnText4") }}</div>
            </el-button>
          </div>
          <div class="display-flex box-center-Y">
            <el-switch v-model="collectionQuery.valueRewards" :inactive-text="$t('home.reward')" class="ml-2" />
            <div class="text">{{ $t("home.sortFloor") }}</div>
            <el-input-number class="input-number" @blur="blurPrice" :controls="false" v-model="collectionQuery.minPrice"
              :placeholder="$t('home.minPlaceholder')" />
            <div class="line"></div>
            <el-input-number class="input-number" @blur="blurPrice" :controls="false" v-model="collectionQuery.maxPrice"
              :placeholder="$t('home.maxPlaceholder')" />
            <el-select v-model="collectionQuery.valueChain" placeholder="Select" class="select-chain">
              <el-option v-for="item in optionsChain" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="volTime" placeholder="Select" class="select-times" @changeTime="changeTime">
              <el-option v-for="item in optionsTimes" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
        <div v-infinite-scroll="loadNftList">
          <nft-list :nftList="nftList" :volTime="volTime" @showDialog="showDialog" @onLike="onLike"></nft-list>
          <!--        <nft-item v-for="(nft, i) in nftList" :nft="nft" :key="i" :index="i" @showDialog="showDialog" @onLike="onLike"></nft-item>-->
          <nft-item-load :loadStatus="loadStatus"></nft-item-load>
          <router-link to="/allcollection" class="see-more display-flex box-center">{{$t("home.seeMoreCollects")}}
          </router-link>
        </div>

        <!-- <nftDrop :dropList="dropList"></nftDrop> -->
        <partners></partners>

        <!--      <nft-item-load :loadStatus="loadStatus"></nft-item-load>-->
      </div>

      <sale-dialog :show="showSaleDialog" @close="closeDialog" @confirm="dialogConfirm" :asset="dialogOrder"
        :nft="dialogNft" :uri="dialogNftURI">
      </sale-dialog>
      <cancel-sale-dialog :show="showCancelSaleDialog" @close="closeDialog" @confirm="dialogConfirm"
        :asset="dialogOrder" :nft="dialogNft" :uri="dialogNftURI">
      </cancel-sale-dialog>
      <buy-dialog :show="showBuyDialog" @close="closeDialog" @confirm="dialogConfirm" :asset="dialogOrder"
        :nft="dialogNft" :uri="dialogNftURI">
      </buy-dialog>

      <bid-dialog :show="showBidDialog" @close="closeDialog" @confirm="dialogConfirm" :bid="dialogOrder"
        :nft="dialogNft" :uri="dialogNftURI">
      </bid-dialog>
      <cancel-bid-dialog :show="showCancelBidDialog" @close="closeDialog" @confirm="dialogConfirm" :bid="dialogOrder"
        :nft="dialogNft" :uri="dialogNftURI">
      </cancel-bid-dialog>
      <accept-dialog :show="showAcceptDialog" @close="closeDialog" @confirm="dialogConfirm" :bid="dialogOrder"
        :nft="dialogNft" :uri="dialogNftURI">
      </accept-dialog>
      <transfer-dialog :show="showTransferDialog" @close="closeDialog" @confirm="dialogConfirm" :asset="dialogOrder"
        :nft="dialogNft" :uri="dialogNftURI">
      </transfer-dialog>
      <burn-dialog :show="showBurnDialog" @close="closeDialog" @confirm="dialogConfirm" :asset="dialogOrder"
        :nft="dialogNft" :uri="dialogNftURI">
      </burn-dialog>

    </div>
    <div class="email-wrap">
      <div class="email-content">
        <div class="txt1">Never miss a drop</div>
        <div class="txt2">Subscribe for the latest news, drops & collectibles</div>
        <div>
          <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm"
            style="width:600px;margin: 0 auto;">
            <el-form-item label="" prop="name">
              <el-input v-model="ruleForm.name" clearable class="input-email">
                <template #append>
                  <el-button class="btn-sub" @click="addTopic" style="font-weight: 600;">Subscribe</el-button>
                  <!-- <div class="btn-sub"> -->
                  <!-- <el-button class="btn-sub" text :loading="true">Subscribe</el-button> -->
                  <!-- </div> -->
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import FilterAndSort from "@/components/FilterAndSort";
import NftDialog from "@/mixins/NftDialog";
import NftInfo from "@/mixins/NftInfo";
import NftItem from "@/mixins/NftItem";
import nftList from '@/components/self/nftList/index'
import nftRecommend from '@/components/self/recommend/index'
import nftTrade from '@/components/self/trading/index'
import nftDrop from '@/components/self/drop/index'
import partners from '@/components/self/partners'
export const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

export default {
  name: "HIndex",
  components: {
    FilterAndSort,
    nftList,
    nftRecommend,
    nftTrade,
    nftDrop,
    partners
  },
  mixins: [
    NftDialog,
    NftItem,
    NftInfo,
  ],
  data: function () {
    return {
      volTime: 1,
      collectionQuery: {
        valueChain: 'eth',
        "keyword": "",
        "address": "",
        "contract": "",
        "buyNow": false,
        valueRewards: true,
        "minPrice": undefined,
        "maxPrice": undefined,
        "order": 0,
        "filter": {
          "name": "",
          "value": ""
        },
        "page": 1
      },
      optionsChain: [
        {
          value: 'eth',
          label: 'ETH'
        },
        // {
        //   value: 'heco',
        //   label: 'HECO'
        // },
        // {
        //   value: 'bsc',
        //   label: 'BSC'
        // }
      ],
      optionsTimes: [
        {
          value: 1,
          label: '24 hour'
        },
        {
          value: 7,
          label: '7 days'
        },
        {
          value: 30,
          label: '30 days'
        }
      ],
      banner: require("@/assets/img/home/index_bg.png"),
      sortKey: "",
      filterId: "",
      filters: [],
      sortValue: "",
      nftList: [],
      popularList: [],
      dropList: [],
      topCollection: [],
      recommendCollection: [],
      query: {
        page: 1,
        limit: this.$store.state.pageLimit,
      },
      loadStatus: "",
      loadStatusCollect: "",
      bannerHeight: "500px",
      topIndex: 0,
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
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, type: 'email', message: 'Please input Email', trigger: 'blur' },
        ]
      },
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
    openURL (url) {
      window.open(url)
    },
    changeTop (index) {
      this.topIndex = index
      console.log(index)
    },
    goMarket () {
      this.$filters.openWindow(this.topCollection[this.topIndex].url)
    },
    blurPrice () {
      this.getCollectionData()
    },
    changeTime () {

    },
    changeOrder (val) {
      if (this.collectionQuery.order !== val) {
        this.collectionQuery.order = val
      } else {
        this.collectionQuery.order = 0
      }
      this.getCollectionData()
    },
    getCollectionData () {
      this.dataList = []
      this.loadStatusCollect = "loading";
      this.$api("collect.query", this.collectionQuery).then((res) => {
        this.loadStatusCollect = 'over'
        if (this.$tools.checkResponse(res)) {
          this.nftList = res.debug.listData
          this.listCount = res.debug.listCount
          this.collectionQuery.page = res.debug.curPage
        }
      })
    },
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
      this.getCollectionData();
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
        console.log(res)
        this.loadStatus = "";
        if (this.$tools.checkResponse(res)) {
          this.loadStatus = "over";
          // this.popularList = []
          // this.nftList = []
          // this.banner = []
          // this.dropList = []
          // this.topCollection = []
          // const homeData = {"partners":[{"id":1,"deleted":0,"createTime":0,"updateTime":0,"title":"BSC","logoUrl":null,"createDate":"1970-01-01 08:00:00","updateDate":"1970-01-01 08:00:00"},{"id":2,"deleted":0,"createTime":0,"updateTime":0,"title":"HOT","logoUrl":null,"createDate":"1970-01-01 08:00:00","updateDate":"1970-01-01 08:00:00"}],"recommendCollection":[{"id":7,"deleted":0,"createTime":null,"updateTime":null,"advId":2,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","image":null,"weight":0,"ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":8,"deleted":0,"createTime":null,"updateTime":null,"advId":2,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","image":null,"weight":0,"ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":9,"deleted":0,"createTime":null,"updateTime":null,"advId":2,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","image":null,"weight":0,"ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":10,"deleted":0,"createTime":null,"updateTime":null,"advId":2,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","image":null,"weight":0,"ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":11,"deleted":0,"createTime":null,"updateTime":null,"advId":2,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","image":null,"weight":0,"ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""}],"popularCollection":[{"id":12,"deleted":0,"createTime":null,"updateTime":null,"advId":3,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","image":null,"weight":0,"ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":13,"deleted":0,"createTime":null,"updateTime":null,"advId":3,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","image":null,"weight":0,"ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":14,"deleted":0,"createTime":null,"updateTime":null,"advId":3,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","image":null,"weight":0,"ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":15,"deleted":0,"createTime":null,"updateTime":null,"advId":3,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","image":null,"weight":0,"ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""}],"topCollection":[{"id":4,"deleted":0,"createTime":null,"updateTime":null,"advId":1,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","image":null,"weight":0,"ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":5,"deleted":0,"createTime":null,"updateTime":null,"advId":1,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","image":null,"weight":0,"ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":6,"deleted":0,"createTime":null,"updateTime":null,"advId":1,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","image":null,"weight":0,"ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""}],"dataCollection":[{"id":null,"deleted":null,"createTime":null,"updateTime":null,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","floorPrice":"100.00","dayAmount":"100.00","totalAmount":"100.00","ownerCount":"100.00","totalCount":"100.00","orderCount":"100.00","ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":null,"deleted":null,"createTime":null,"updateTime":null,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","floorPrice":"100.00","dayAmount":"100.00","totalAmount":"100.00","ownerCount":"100.00","totalCount":"100.00","orderCount":"100.00","ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":null,"deleted":null,"createTime":null,"updateTime":null,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","floorPrice":"100.00","dayAmount":"100.00","totalAmount":"100.00","ownerCount":"100.00","totalCount":"100.00","orderCount":"100.00","ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":null,"deleted":null,"createTime":null,"updateTime":null,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","floorPrice":"100.00","dayAmount":"100.00","totalAmount":"100.00","ownerCount":"100.00","totalCount":"100.00","orderCount":"100.00","ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":null,"deleted":null,"createTime":null,"updateTime":null,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","floorPrice":"100.00","dayAmount":"100.00","totalAmount":"100.00","ownerCount":"100.00","totalCount":"100.00","orderCount":"100.00","ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":null,"deleted":null,"createTime":null,"updateTime":null,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","floorPrice":"100.00","dayAmount":"100.00","totalAmount":"100.00","ownerCount":"100.00","totalCount":"100.00","orderCount":"100.00","ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":null,"deleted":null,"createTime":null,"updateTime":null,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","floorPrice":"100.00","dayAmount":"100.00","totalAmount":"100.00","ownerCount":"100.00","totalCount":"100.00","orderCount":"100.00","ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":null,"deleted":null,"createTime":null,"updateTime":null,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","floorPrice":"100.00","dayAmount":"100.00","totalAmount":"100.00","ownerCount":"100.00","totalCount":"100.00","orderCount":"100.00","ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":null,"deleted":null,"createTime":null,"updateTime":null,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","floorPrice":"100.00","dayAmount":"100.00","totalAmount":"100.00","ownerCount":"100.00","totalCount":"100.00","orderCount":"100.00","ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""},{"id":null,"deleted":null,"createTime":null,"updateTime":null,"contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","floorPrice":"100.00","dayAmount":"100.00","totalAmount":"100.00","ownerCount":"100.00","totalCount":"100.00","orderCount":"100.00","ckCollectionsInfoEntity":{"id":13,"deleted":0,"createTime":1666344370,"updateTime":1666344370,"name":"Lu-demo","info":"Lu-demo thanks for checking us out. If you're interest in early dev, you can see some AI creation over here:","contract":"0xEb1e502410Bb45e51907b88B0Ea9A08Fb575D3C2","total":"0","foolPrice":"0.00000","volume":"0.00000","listed":"0","image":"https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256","bannerImage":"https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840","startHeight":"7836728","weights":null,"isCertification":null,"currencyAddress":"1,2,3,8","exchangeRate":"0.05","isCacheJson":"1","cacheStatus":"0","feeContract":"0x3C8ef9F2599871Da49F6bF285A9e0B7FF618d19e","website":"https://www.youtube.com/watch?v=dMUUbpEHjKo","discord":"https://discord.com/invite/pancakeswap","twitter":"https://twitter.com/pancakeswap","telegram":null,"createDate":"2022-10-21 17:26:10","updateDate":"2022-10-21 17:26:10"},"createDate":"","updateDate":""}]}
          this.topCollection = res.debug.topCollection
          this.recommendCollection = res.debug.recommendCollection
          this.popularList = res.debug.popularCollection
          this.dropList = res.debug.dropCalendar
          // this.banners = this.$tools.sliceArrayTo(res.data.list, 4);
          // this.queryFunction(res.data.list, this.nftList);
          // if (res.data.list.length < data.limit) {
          // } else {
          //   this.query.page += 1;
          // }
        } else {
          this.$tools.message(res.errmsg);
        }
      });
    },
    queryDataImg (data) {
      return data.map(item => {
        item.bannerImage = item.ckCollectionsInfoEntity.bannerImage
        item.image = item.ckCollectionsInfoEntity.image
        item.name = item.ckCollectionsInfoEntity.name
        return item
      })
    },
    addTopic () {
      this.$refs.ruleFormRef.validate(valid => {
        if (valid) {

          this.$api("home.addTopic", { email: this.ruleForm.name }).then((res) => {
            if (this.$tools.checkResponse(res)) {
              this.$tools.message('You’ve subscribed!', 'success');
            }
          });
        }
      });
    }
  },
};
</script>
<style lang="scss" scoped>
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

/*
  .search-options {
    position: relative;
    display: flex;
    align-items: center;
    margin: 20px 0;
    .title {
      fonts-size: 28px;
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
    fonts-size: 13px;
    align-items: center;
    fonts-weight: 400;
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
  } */

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


<style lang="scss">
@import '../../styles/variables';
.home-wrapper {
  max-width: $maxWidth;
  margin: 0 auto;
  width: 100%;
}
.home-banner {
  height: 524px;
  background: url('../../assets/images/bg_home.png') no-repeat;
  background-size: cover;
  padding-top: 76px;

  .banner-box {
    padding-left: 20px;
    padding-right: 32px;
    .create-app-box {
      .title {
        width: 583px;
        font-style: normal;
        font-weight: 700;
        font-size: 50px;
        line-height: 65px;
        color: $primaryColor;
      }
      .desc {
        padding-top: 30px;
        width: 621px;
        /* Body_1_regular */
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 150%;
        /* 黑-3 */
        color: $color-black3;
      }
      .btn-list {
        margin-top: 60px;
        .btn {
          width: 180px;
          height: 48px;
          background: $color-black;
          font-weight: 500;
          font-size: 16px;
          color: $color-white;
          cursor: pointer;
          &:hover {
            background: #4136f5;
          }
        }
      }
    }
    .carousel-box {
      width: 520px;
      height: 328px;
      .el-carousel {
        width: 100%;
        height: 100%;
      }
      .el-carousel__container {
        width: 100%;
        height: 294px !important;
      }
      .el-carousel__item {
        border-radius: 20px !important;
        .img-box {
          cursor: pointer;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: $color-white !important;
          border: 10px solid #ffffff !important;
          filter: drop-shadow(0px 0px 40px rgba(82, 77, 255, 0.2));
          border-radius: 20px !important;
        }
      }

      .el-carousel__indicators {
        .el-carousel__indicator {
          margin-right: 10px;
          &:last-child {
            margin-right: 0;
          }
          .el-carousel__button {
            width: 20px;
            height: 8px;
            /* 紫色背景 */
            background: rgba(118, 74, 246, 0.1);
            border-radius: 4px;
          }
          &.is-active {
            .el-carousel__button {
              width: 70px;
              height: 8px;
              /* 主色渐变 */
              background: $mainLiner;
            }
          }
        }
      }
    }
  }
}
.body-wrapper {
  padding-bottom: 120px;
  .sort-box {
    padding-top: 40px;
    .filter {
      padding: 10px 20px;
      border: none;
      color: $color-black3;
      border-radius: 12px;
      .icon-img {
        margin-right: 4px;
      }
      &:hover,
      &:focus,
      &.active {
        background-color: $elButtonHoverBg !important;
        color: $color-black3;
      }
    }
    .el-button + .el-button {
      margin-left: 6px;
    }
    .text {
      padding-right: 12px;
      font-weight: 500;
      font-size: 14px;
      color: $primaryColor;
      margin-left: 20px;
    }
    .line {
      width: 8px;
      height: 1px;
      margin: 0 10px;
      background-color: $grayColor;
    }
    .input-number {
      width: 80px;
      .el-input__wrapper {
        padding-left: 0 !important;
        padding-right: 0 !important;
        border: none;
        box-shadow: none;
      }
      .el-input__inner {
        border: none;
        /*padding: 11px 16px;*/
        gap: 8px;
        height: 40px;
        /* 黑_4 */
        background: $elButtonHoverBg;
        border-radius: 8px;

        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: $primaryColor;
      }
    }

    .el-select {
      width: unset;
      margin-left: 10px;
      height: 40px;
      &.select-chain {
        width: 140px;
      }
      &.select-times {
        width: 110px;
      }
      .el-input__suffix {
        right: 16px;
      }
      .el-input__wrapper {
        padding: 10px 16px;
        border-radius: 12px;
        box-shadow: none;
        border: 1px solid $borderBg;
      }
      .el-input.is-focus .el-input__wrapper {
        box-shadow: none !important;
      }
      &:first-child {
        margin-left: 10px;
      }
      .el-input__inner {
        height: 20px;
        padding: 0;
      }
    }
  }
  .see-more {
    margin: 40px auto 0;
    width: 180px;
    height: 48px;
    background: $color-black;
    font-weight: 500;
    font-size: 16px;
    color: $color-white;
    cursor: pointer;
    &:hover {
      background: #4136f5;
    }
  }
}
</style>
<style lang="scss" scoped>
.email-wrap {
  height: 308px;
  background: linear-gradient(313deg, #37c9a1 0%, #7d47ff 100%);
  .email-content {
    width: 1200px;
    margin: 0 auto;
    padding-top: 54px;
    .txt1 {
      text-align: center;
      height: 57px;
      font-size: 44px;
      font-weight: bold;
      color: #ffffff;
      line-height: 57px;
    }
    .txt2 {
      margin-top: 20px;
      margin-bottom: 30px;
      text-align: center;
      height: 34px;
      font-size: 26px;
      color: #ffffff;
      line-height: 34px;
    }
    .input-email {
      // margin: 0 auto;
      width: 600px;
      height: 52px;
      border-radius: 12px;
      overflow: hidden;
    }
    .btn-sub {
      // background: #7d47ff;
    }
  }
  ::v-deep {
    .el-input__inner {
      border-radius: 2px;
      padding: 0 10px;
      font-weight: 600;
    }
    .el-input__wrapper {
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
    }
    .el-form-item__error {
      margin-top: 10px;
    }

    .el-input-group__append {
      background: #7d47ff;
      box-shadow: none;
      font-size: 16px;
      color: #ffffff;
      font-weight: 600;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>

