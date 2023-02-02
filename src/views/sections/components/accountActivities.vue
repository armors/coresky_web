<template>
  <div class="accountCollected">
    <div class="filter-wrap">
      <div class="filter-head">
        <span class="left">
          <!-- <el-icon>
            <ArrowLeft />
          </el-icon> -->
          Filter
        </span>
        <span class="right">
          <!-- <svg-icon icon-class="discord" />
          <svg-icon icon-class="telegram" />
          <svg-icon icon-class="twitter" />
          <svg-icon icon-class="websit" />
          <svg-icon icon-class="zip" /> -->
          <!-- <el-icon>
            <Refresh />
          </el-icon> -->
        </span>
      </div>

      <div class="filter-item">
        <div class="gruop-wrap">
          <div class="type-item">
            <div class="attr-content">
              <el-checkbox-group v-model="checkList" @change="changeChecked">

                <div class="attr-item">
                  <span>Sale</span>
                  <div class="attr-num">
                    <el-checkbox label="Sale">
                      <template #default>
                      </template>
                    </el-checkbox>
                  </div>
                </div>
                <div class="attr-item">
                  <span>Listings</span>
                  <div class="attr-num">
                    <el-checkbox label="Listings">
                      <template #default>
                      </template>
                    </el-checkbox>
                  </div>
                </div>
                <div class="attr-item">
                  <span>Make offer</span>
                  <div class="attr-num">
                    <el-checkbox label="Make offer">
                      <template #default>
                      </template>
                    </el-checkbox>
                  </div>
                </div>
                <div class="attr-item">
                  <span>Receive offer</span>
                  <div class="attr-num">
                    <el-checkbox label="Receive offer">
                      <template #default>
                      </template>
                    </el-checkbox>
                  </div>
                </div>
                <div class="attr-item">
                  <span>Transfer</span>
                  <div class="attr-num">
                    <el-checkbox label="Transfer">
                      <template #default>
                      </template>
                    </el-checkbox>
                  </div>
                </div>
                <div class="attr-item">
                  <span>Collection offer</span>
                  <div class="attr-num">
                    <el-checkbox label="Collection offer">
                      <template #default>
                      </template>
                    </el-checkbox>
                  </div>
                </div>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content">
      <el-table :data="dataList" style="width: 100%">
        <el-table-column prop="date" label="Activitiy" width="180">
          <template #default="props">
            <div class="activity-wrap" style="min-height:67px;line-height: 67px;">
              <img :src="require(`@/assets/images/icons/activities/${props.row.activity}.svg`)" alt="">
              <span>{{ props.row.activity }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Item" label="Item" width="200" :show-overflow-tooltip="true">
          <template #default="props">
            <image-box v-if="props.row.itemImage!=null" :src="props.row.itemImage" />
            <span class="item-name">{{ props.row.itemName||'--' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="Price">
          <template #default="props">
            <div class="flex-center" v-if="props.row.price">
              <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="">
              <span class="item-name">{{!!props.row.price?nftPrice(props.row.price):'-- '}}</span>
            </div>
            <div v-else>
              --
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Item" label="From" width="140">
          <template #default="props">
            <a class="link">{{$filters.ellipsisAddress(props.row.from, 4)}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="To" width="140">
          <template #default="props">
            <a class="link">{{$filters.ellipsisAddress(props.row.to, 4)}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="Date">
          <template #default="props">
            <div>{{$filters.timeFormat(props.row.date)}}</div>
          </template>
        </el-table-column>
        <template #empty>
          <div class="empty-wrap">
            <p class="txt">No Data</p>
            <img src="@/assets/images/no-data.png" alt="">
          </div>
        </template>
      </el-table>
      <!-- <div class="custom-pagination" v-if="listCount>queryParams.limit">
        <div class="content">
          <el-pagination background v-model:current-page="queryParams.page" :page-size="queryParams.limit"
            :page-="queryParams.limit" @current-change="queryData" layout="prev, pager, next" align="center"
            :total="listCount" />
        </div>
      </div> -->

    </div>
  </div>

</template>

<script>

export default {
  name: "accountCollected",
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
      dataList: [
      ],
      checkList: [],
      queryParams: {
        page: 1,
        limit: 2,
        address: '',
      },
      allDataList: [],
    }
  },
  methods: {
    nftPrice (basePrice) {
      return this.$filters.keepMaxPoint(this.$Web3.utils.fromWei(basePrice.toString()))
    },
    changeChecked () {
      if (this.checkList === undefined || this.checkList.length == 0) {
        this.dataList = this.allDataList
        return
      }
      let datalist = this.allDataList.filter(el => {
        let obj = this.checkList.find(item => item === el.activity)
        if (obj) {
          return true
        }
        else {
          return false
        }
      })
      this.dataList = datalist
    },
    goExplore (address, isTx = false) {
      if (address !== null) {
        this.$filters.openWindow(isTx ? this.$filters.hashExplore(address).href : this.$filters.contractExplore(address).href)
      }
    },
    queryData () {
      this.dataList = []
      this.loadStatus = 'loading'
      this.queryParams.address = this.address
      this.$api("user.activity", this.queryParams).then((res) => {
        this.loadStatus = 'over'
        if (this.$tools.checkResponse(res)) {
          this.dataList = res.debug
          this.allDataList = res.debug
          // this.listCount = res.debug.listCount
          // this.queryParams.page = res.debug.curPage
        }
      })
    },
    searchClick () {
      this.queryParams.page = 1
      this.queryData()
    },
    init () {

    }
  },
  mounted () {
    this.searchClick()
  },
}

</script>

<style lang="scss" scoped>
.accountCollected {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  .right-content {
    width: 100%;
  }
}

.filter-item {
  padding-top: 0;
}
.gruop-wrap {
  margin-top: 0;
}
.flex-center {
  display: flex;
  align-items: center;
}
.cover-image {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
.token-icon {
  width: 10px;
  height: 16px;
  display: inline-block;
  margin-right: 5px;
}
.link {
  color: #7d47ff;
  cursor: pointer;
}
.activity-wrap {
  display: flex;
  img {
    width: inherit;
    margin-right: 5px;
  }
}
</style>