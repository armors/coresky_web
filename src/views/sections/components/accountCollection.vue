<template>
  <div class="accountCollection">
    <div v-if="loadStatus==='loading'">
      <p class="loading-txt">Coming soon…</p>
    </div>
    <div v-else>
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
                <img class="tag" src="@/assets/images/icons/icon_tag.svg" alt="">
              </div>
              <div class="head-txt">
                {{item.name}}
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="custom-pagination" v-if="listCount>query.limit">
        <div class="content">
          <el-pagination background v-model:current-page="query.page" :page-size="query.limit" :page-="query.limit"
            @current-change="pageHandle" layout="prev, pager, next" align="center" :total="listCount" />
        </div>
      </div>
      <div class="empty-wrap" v-if="dataList.length===0">
        <p class="txt">No Data</p>
        <img src="@/assets/images/no-data.png" alt="">
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "accountCollection",
  components: {

  },
  props: {
    address: {
      type: String,
      default: ''
    },
  },
  computed: {

  },
  data () {
    return {
      query: {
        page: 1,
        limit: 3,
        owner: ''
      },
      keyword: '',
      loadStatus: 'over',
      accountList: [],
      categoryList: [],
      dataList: [],
      listCount: 0,
      categoryId: 1,
    }
  },
  methods: {
    init () {
      this.query.page = 1
      this.query.owner = this.address
      this.pageHandle()
    },
    pageHandle () {
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
  created () {
    this.init();
  },
}

</script>

<style lang="scss" scoped>
.accountCollection {
  margin-top: 25px;
}
</style>