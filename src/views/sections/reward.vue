<template><div class="reward-wrapper">
  <div class="banner-wrap">
    <div class="banner-txt-box">
      <div class="banner-txt">
        <div class="txt1">{{ $t('rewards.title') }} </div>
        <div class="txt2">{{ $t('rewards.subTitle') }}</div>
        <div class="txt3">
          <el-button class="btn" @click="$router.push('/markterplace?rewards=1')" type="primary">{{ $t('rewards.goTrade') }}
          </el-button>
        </div>
        <!-- <img class="image" src="@/assets/images/reward.png" alt=""> -->
      </div>
    </div>
  </div>
  <div class="page-center">
    <!-- <div class="title1">{{ $t('rewards.HotActivities') }}</div> -->
    <div class="card-list">
      <div class="card-item">
        <img class="image" src="@/assets/images/reward02.jpg" alt="">
        <a href="https://docs.coresky.com/doc/20/" target="_blank" class="item-content">
          <span class="ml20">Rewards Rules</span>
          <img class="btn-right" src="@/assets/images/right.png" alt="">
        </a>

      </div>
      <!-- <div class="card-item"></div>
        <div class="card-item"></div> -->
    </div>
  </div>
  <div class="page-center" style="margin-bottom:30px">
    <div class="title1">{{ $t('rewards.MyRewards') }}
      <span class="sub-title"> ({{ score }} {{ $t('rewards.CTScore') }})</span>
    </div>

    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane :label="$t('rewards.TransactionMining')" name="mining" :lazy="true">
        <el-table :data="dataList" style="width: 100%" class="mytable" v-loading="isLoading">
          <el-table-column prop="createTime" :label="$t('rewards.Time')" width="160">
              <template #default=" props">
            {{ parseTime(props.row.createTime) }}
            </template>
          </el-table-column>
          <el-table-column prop="event" :label="$t('rewards.Event')" align="right" width="260">
            <template #default="props">
              <span v-if="props.row.type === 0">{{ $t('rewards.Event') }}</span>
              <span v-if="props.row.type === 1">{{ $t('rewards.Sale') }}</span>
              <span v-if="props.row.type === 3">{{ $t('rewards.Rewards') }}</span>
              <span v-if="props.row.type === 4">{{ $t('rewards.ConvertTickets') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="itemName" align="right" :label="$t('rewards.Item')">
            <!-- <template #default="props">
                Lazy Cubs Official #1231
              </template> -->
          </el-table-column>
          <el-table-column prop="score" :label="$t('rewards.Rewards')" align="right">
            <template #default="props">
              {{ props.row.score }} CT
            </template>
          </el-table-column>
          <template #empty>
                        <div class="empty-wrap">
                          <img src="@/assets/images/no-data.png" alt="">
                          <p class="txt">No Data</p>
                        </div>
                    </template>
        </el-table>
        <div class="custom-pagination" v-if="listCount > queryParams.limit">
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
<FooterTemplate /></template>
<script>
import BigNumber from "bignumber.js";
import FooterTemplate from "@/views/layout/FooterTemplate";

import dayjs from 'dayjs';
import config from '@/config/index'
import { rowProps } from 'element-plus';
export default {
  mixins: [],
  name: 'launchpads',
  components: {
    FooterTemplate
  },
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
      return dayjs(time * 1000).format('YYYY-MM-DD HH:mm')
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
    height: 197px;
    background: linear-gradient(180deg, #ECEFFC 0%, rgba(231, 234, 245, 0) 100%);
    // background: linear-gradient(133deg, #ece4ff 0%, #ddf1f8 100%) #e9e6fe;
    .btn {
      width: 140px;
      height: 48px;
      // background: #7d47ff;
      border-radius: 12px;
    }
    .banner-txt-box {
      width: 1280px;
      height: 197px;
      margin: 0 auto;
      background: url('@/assets/images/reward-bg.png') no-repeat;
    }
    .banner-txt {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      height: 100%;
      position: relative;
      .txt1 {
        margin-top: 52px;
        height: 41px;
        font-size: 32px;
        font-weight: bold;
        color: #000000;
        line-height: 41px;
      }
      .txt2 {
        margin-top: 10px;
        margin-bottom: 20px;
        height: 18px;
        font-size: 14px;
        color: rgba(46, 46, 46, 0.6);
        line-height: 18px;
      }
      .image {
        position: absolute;
        right: 0;
        top: 0;
        width: 408px;
        height: 100%;
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
    font-size: 30px;
    font-weight: 600;
    color: #000000;
    line-height: 35px;
    .sub-title {
      font-size: 18px;
      margin-left: 5px;
      color: rgba(0, 0, 0, 0.3);
    }
  }
  .card-list {
    margin-top: 40px;
    display: grid;
    grid-gap: 15px;
    grid-template-rows: auto auto;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    .card-item {
      position: relative;
      width: 1200px;
      height: 393px;
      background: #ededed;
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;

      .item-content {
        width: 780px;
        height: 62px;
        margin: 0 auto;
        margin-top: 145px;
        position: relative;

        font-weight: 800;
        font-size: 50px;
        line-height: 150%;
        color: #04142A;
        display: flex;
        align-items: center;
        transition: all 0.3s ease-out;
        z-index: 1;
        &:hover {
          color: #1063E0;
          .btn-right {
            margin-left: 50px;
          }
        }

        .btn-right {
          width: 50px;
          height: 50px;
          margin-left: 30px;
          transition: all 0.3s ease-out;
        }
      }


      .image {
        position: absolute;
        left: 0;
        border: 0;
        width: 100%;
        height: 100%;
      }
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
      font-size: 12px;
      font-weight: 600;
      color: #717A83;
      line-height: 18px;
    }
    .el-table__body-wrapper tr {
      height: 60px;
    }
  }
}
</style>


