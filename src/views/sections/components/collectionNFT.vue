<template>
  <div class="item-page">
    <div class="filter-wrap" v-if="showFilterBox">
      <div class="filter-head">
        <span class="left" @click="showFilterBox=!showFilterBox">
          <el-icon>
            <ArrowLeft />
          </el-icon>Filter
        </span>
        <span class="right">
          <el-icon>
            <Refresh />
          </el-icon>
        </span>
      </div>
      <div class="filter-item flex border">
        <span class="left">Buy Now</span>
        <span class="right">
          <el-switch v-model="queryParams.buyNow" @change="searchClick" class="ml-2" />
        </span>
      </div>
      <div class="filter-item border">
        <div class="flex">
          <span class="left">Price</span>
          <span class="right" @click="isOpenPriceFilter=!isOpenPriceFilter">
            <el-icon style="font-size:16px">
              <ArrowUp />
            </el-icon>
          </span>
        </div>
        <template v-if="isOpenPriceFilter">
          <el-select v-model="queryParams.sort" placeholder="ETH" :teleported="false" popper-class="select-popper"
            class="select-sort">
            <el-option value="ETH">ETH</el-option>
          </el-select>
          <div class="price-range" style="margin-top:15px">
            <el-input type="number" class="input-number" :controls="false" v-model="queryParams.minPrice"
              :placeholder="$t('home.minPlaceholder')" />
            <div class="line"></div>
            <el-input type="number" class="input-number" :controls="false" v-model="queryParams.maxPrice"
              :placeholder="$t('home.maxPlaceholder')" />
          </div>
          <div class="btn-apply" @click="searchClick">Application</div>
        </template>
      </div>
      <div class="filter-item">
        <div class="flex">
          <span class="left">Attributes</span>
          <span class="right">
            <el-icon style="font-size:16px">
              <ArrowUp />
            </el-icon>
          </span>
        </div>
        <div class="gruop-wrap">
          <div class="type-item" v-for="(item,index) in attrList" :key="index">
            <div class="type-head">
              <span class="type-name">{{item.attrNm}}</span>
              <div class="type-num">
                <span>{{item.total}}</span>
                <el-icon :class="{'down':item.isShow}" @click="item.isShow=!item.isShow" style="font-size:15px">
                  <ArrowUp />
                </el-icon>
              </div>
            </div>
            <div class="attr-content" v-if="item.isShow">
              <div class="attr-item" v-for="(child,cindex) in item.dataList" :key="cindex">
                <span>{{child.name}}</span>
                <div class="attr-num">
                  <span>{{child.num}}</span>
                  <el-checkbox v-model="child.isChecked" @change="checkChange" label="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="list-search-wrap">
        <div class="btnfilter" @click="showFilterBox=!showFilterBox">
          <img src="../../../assets/images/icons/icon_filter.svg" alt="">
          Filter
        </div>
        <el-input class="search-input-wrap" style="width:400px" placeholder="Search by name or attribute"
          v-model="queryParams.keyword" @keyup.enter="searchClick">
          <template #prefix>
            <div class="img-search"><img src="../../../assets/images/icons/icon_search.svg" alt=""></div>
          </template>
        </el-input>
        <el-select v-model="queryParams.order" placeholder="Recently listed" @change="searchClick" :teleported="false"
          popper-class="select-popper" class="select-sort">
          <el-option :value="1" label="Price low to high" />
          <el-option :value="2" label="Price high to low" />
          <el-option :value="3" label="Recently listed" />
          <el-option :value="4" label="Recently sold" />
          <el-option :value="5" label="Ending soon" />
        </el-select>
        <div class="sort-wrap">
          <span class="icon-wrap icon_filter01" :class="{'active':viewType===1}" @click="viewType=1">
          </span>
          <span class="icon-wrap icon_filter02" :class="{'active':viewType===2}" @click="viewType=2"></span>
        </div>
      </div>
      <div v-if="loadStatus==='loading'">
        <p class="loading-txt">Coming soon…</p>
      </div>
      <div v-else>
        <div class="nft-list">
          <router-link :to="`/detail/${item.contract}/${item.tokenId}`" class="nft-card"
            v-for="(item,index) in dataList" :key="index">
            <div class="nft-content">
              <div class="card-top">
                <div class="card-img">
                  <image-box :src="item.oriImage"></image-box>
                </div>
              </div>
              <div class="card-bottom">
                <div class="nft-txt">
                  {{item.ckCollectionsInfoEntity.name}} #{{item.tokenId}}
                </div>
                <div class="nft-price">
                  <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="">
                  <span class="price">{{item.basePrice===0?'-- ':nftPrice(item.basePrice)}} ETH</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="custom-pagination" v-if="listCount>queryParams.limit">
          <div class="content">
            <el-pagination background v-model:current-page="queryParams.page" :page-size="queryParams.limit"
              :page-="queryParams.limit" @current-change="queryData" layout="prev, pager, next" align="center"
              :total="listCount" />
          </div>
        </div>
        <div class="empty-wrap" v-if="dataList.length===0">
          <p class="txt">No Data</p>
          <img src="@/assets/images/no-data.png" alt="">
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "collectionNFT",
  components: {

  },
  props: {
    contract: {
      type: String,
      default: ''
    },
  },
  computed: {

  },
  data () {
    return {
      queryParams: {
        page: 1,
        limit: 20,
        keyword: "",
        buyNow: false,
        minPrice: '',
        maxPrice: '',
        order: 1,
      },
      showFilterBox: true,
      isOpenPriceFilter: true,
      isOpenSearchCollection: true,
      viewType: 1,
      listCount: 0,
      dataList: [],
      attrList: [],
      loadStatus: 'over'
    }
  },
  created () {
  },
  mounted () {
    this.searchClick()
    this.initAttrList()
  },
  methods: {
    checkChange () {
      this.queryData()
      // console.log(this.attrList)
    },
    initAttrList () {
      this.attrList = []
      this.$api("collections.filter", { contract: this.contract }).then((res) => {
        if (this.$tools.checkResponse(res)) {
          let attrData = res.debug
          for (let attr of attrData) {
            let data = {
              attrNm: attr.name,
              total: attr.count,
              isShow: false,
              dataList: attr.list.map(el => {
                return {
                  name: el.name,
                  num: el.count,
                  isChecked: false,
                }
              })
            }
            this.attrList.push(data)
          }
        }
      })
    },
    nftPrice (basePrice) {
      return this.$filters.keepPoint(this.$Web3.utils.fromWei(basePrice.toString()))
    },
    searchClick () {
      this.queryParams.page = 1
      this.queryParams.contract = this.contract

      this.queryData()
    },
    queryData () {
      this.dataList = []
      this.getAttrFilter()
      this.loadStatus = 'loading'
      this.$api("token.query", this.queryParams).then((res) => {
        this.loadStatus = 'over'
        if (this.$tools.checkResponse(res)) {
          this.dataList = res.debug.listData
          this.listCount = res.debug.listCount
          this.queryParams.page = res.debug.curPage
        }
      })
    },
    getAttrFilter () {
      let listFilter = []
      this.attrList.map(el => {
        let vals = el.dataList.filter(el2 => el2.isChecked)
        if (vals.length > 0) {
          let filter = { name: el.attrNm, value: vals.map(el3 => el3.name).join(',') }
          listFilter.push(filter)
        }
      })
      if (listFilter.length > 0) {
        this.queryParams.filter = listFilter[0]
      }
      else {
        this.queryParams.filter = null
      }
    }
  },
}

</script>

<style lang="scss" scoped>
.item-page {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.right-content {
  width: 100%;
}
</style>
