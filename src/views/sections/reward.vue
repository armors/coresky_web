<template>
  <div class="reward-wrapper">
    <div class="banner-wrap">
      <div class="banner-txt">
        <div class="txt1">Trade to get CoreToken </div>
        <div class="txt2">X2Y2 will share 100% of the proceeds with X2Y2 token holders.</div>
        <div class="txt3">
          <el-button class="btn" @click="$router.push('/markterplace')" type="primary">Go to trade</el-button>
        </div>
      </div>
    </div>
    <div class="page-center">
      <div class="title1">Hot activity</div>
      <div class="card-list">
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
      </div>
    </div>
    <div class="page-center" style="margin-bottom:30px">
      <div class="title1">My rewards
        <span class="sub-title"> ({{ score }} CoreToken)</span>
      </div>

      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="Transaction mining" name="mining" :lazy="true">
          <el-table :data="dataList" style="width: 100%" class="mytable" v-loading="isLoading">
            <el-table-column prop="createTime" label="Time" width="325">
              <template #default="props">
                {{ parseTime(props.row.createTime) }}
              </template>
            </el-table-column>
            <el-table-column prop="event" label="Event" width="300">
              <template #default="props">
                <span v-if="props.row.type===0">挂单奖励</span>
                <span v-if="props.row.type===1">购买</span>
                <span v-if="props.row.type===3">积分发放</span>
                <span v-if="props.row.type===4">购买彩票</span>
              </template>
            </el-table-column>
            <el-table-column prop="itemName" label="Item">
              <!-- <template #default="props">
                Lazy Cubs Official #1231
              </template> -->
            </el-table-column>
            <el-table-column prop="score" label="Rewards" width="140">
              <template #default="props">
                {{ props.row.score }} CT
              </template>
            </el-table-column>
            <template #empty>
              <div class="empty-wrap">
                <p class="txt">No Data</p>
                <img src="@/assets/images/no-data.png" alt="">
              </div>
            </template>
          </el-table>
          <div class="custom-pagination" v-if="listCount>queryParams.limit">
            <div class="content">
              <el-pagination background v-model:current-page="queryParams.page" :page-size="queryParams.limit"
                :page-="queryParams.limit" @current-change="queryData" layout="prev, pager, next" align="center"
                :total="listCount" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>
<script>
import BigNumber from "bignumber.js";
import dayjs from 'dayjs';
import config from '@/config/index'
import { rowProps } from 'element-plus';
export default {
  mixins: [],
  name: 'launchpads',
  components: {},
  data () {
    return {
      activeName: 'mining',
      dataList: [
      ],
      queryParams: {
        page: 1,
        limit: 10,
        address: '',
      },
      score: '',
      isLoading: false,
      listCount: 0,
    };
  },
  watch: {
  },
  created () {
    this.init();
  },
  mounted () { },
  computed: {
    user: function () {
      var user = this.$store.state.user;
      return user;
    },
  },
  methods: {
    parseTime (time) {
      return dayjs(time * 1000).format('YYYY-MM-DD hh:mm')
    },
    init () {
      if (this.user && this.user.coinbase) {
        this.queryParams.address = this.user.coinbase
        this.queryParams.page = 1
        this.queryData()
      }
    },
    queryData () {
      this.isLoading = true
      this.$api("user.scoreDetail", this.queryParams).then((res) => {
        this.isLoading = false
        let data = res
        if (this.$tools.checkResponse(data)) {
          this.score = data.debug.score
          this.listCount = data.debug.detail.listCount
          this.dataList = data.debug.detail.listData
          this.queryParams.page = data.debug.detail.curPage
        }
      })
    },
  },
  beforeUnmount () {

  }
};
</script>
<style lang="scss" scoped>
.reward-wrapper {
  .banner-wrap {
    height: 260px;
    background: linear-gradient(133deg, #ece4ff 0%, #ddf1f8 100%) #e9e6fe;
    .btn {
      width: 140px;
      height: 48px;
      // background: #7d47ff;
      border-radius: 12px;
    }
    .banner-txt {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .txt1 {
        margin-top: 52px;
        height: 41px;
        font-size: 32px;
        font-weight: bold;
        color: #000000;
        line-height: 41px;
      }
      .txt2 {
        margin-top: 18px;
        margin-bottom: 32px;
        height: 18px;
        font-size: 14px;
        color: rgba(46, 46, 46, 0.6);
        line-height: 18px;
      }
    }
  }
  .page-center {
    width: 1200px;
    margin: 0 auto;
  }
  .title1 {
    margin: 40px 0;
    height: 29px;
    font-size: 22px;
    font-weight: 600;
    color: #000000;
    line-height: 29px;
    .sub-title {
      margin-left: 5px;
      color: rgba(0, 0, 0, 0.3);
    }
  }
  .card-list {
    display: grid;
    grid-gap: 15px;
    grid-template-rows: auto auto;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    .card-item {
      width: 390px;
      height: 248px;
      background: #ededed;
      border-radius: 12px;
    }
  }
  .mytable {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  ::v-deep {
    .el-tabs__header.is-top {
      margin-bottom: 0;
    }
    .el-tabs__item {
      padding: 0 20px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: $color-black2;
      height: 40px;
      &.is-active {
        color: $primaryColor;
      }
    }
    .el-tabs__active-bar {
      height: 3px;
    }
    .el-table__header th {
      height: 18px;
      font-size: 14px;
      font-weight: 600;
      color: #000000;
      line-height: 18px;
    }
    .el-table__body-wrapper tr {
      height: 60px;
    }
  }
}
</style>


