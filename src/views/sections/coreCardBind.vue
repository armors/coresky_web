<template>
  <div class="CoreCardBind">
    <div class="page-content">
      <div class="title">
        <span>Bind Corecard</span>
        <el-icon>
          <CloseBold />
        </el-icon>
      </div>
      <div class="card-list">
        <div class="card-item active">
          <img src="@/assets/core-card/level1.png" class="card-img" alt="">
          <div class="card-info">
            <div class="card-name">
              <span>Corecard #19990</span>
              <el-icon class="" color="#35C955" size="20">
                <SuccessFilled />
              </el-icon>
            </div>
            <div class="card-vip">
              <img src="@/assets/core-card/vip0.png" class="vip-img" alt="">
              <div class="vip-progress">
                <div class="vip-val" :style="{ width: '22%' }"></div>
              </div>
              <div class="vip-txt">22%</div>
            </div>
            <div>
              <el-button plain class="btnAccept">Bind</el-button>
            </div>
          </div>
        </div>
        <div class="card-item">1</div>

        <div class="card-item">1</div>

        <div class="card-item">1</div>

        <div class="card-item">1</div>

      </div>
    </div>
  </div>
  <FooterTemplate />
</template>
<script>
import BigNumber from "bignumber.js";
import FooterTemplate from "@/views/layout/FooterTemplate";

import dayjs from 'dayjs';
import config from '@/config/index'
import { rowProps } from 'element-plus';
export default {
  mixins: [],
  name: 'CoreCardBind',
  components: {
    FooterTemplate
  },
  data () {
    return {
      dataList: [
        {
          "level": 1,
          "tokenId": 123123,
          "avatarFrame": "http://ASDASD",
          "pledge": 1
        },
        {
          "level": 2,
          "tokenId": 3123,
          "avatarFrame": "http://ASDASD",
          "pledge": 0
        }
      ]
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
.CoreCardBind {
  background-color: #E6E8EC;
  min-height: calc(100vh - $headerHeight - $bottomHeight);
  padding: 30px 0;
  .page-content {
    margin: 0 auto;
    width: 1080px;
    background: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 16px;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 85px;
      margin: 0 50px;
      display: flex;
      font-size: 30px;
      display: flex;
      font-weight: 700;
      line-height: 85px;
      color: #04142A;
      .el-icon {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .card-list {
      padding: 0 50px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px 20px;
      .card-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 20px 15px;
        border: 2px solid #E6E8EC;
        border-radius: 16px;
        &.active {
          background-color: #FAFCFE;
          .card-info .card-name .el-icon {
            display: block;
          }
        }
        .card-img {
          width: 90px;
          height: 152px;
        }
        .card-info {
          margin-left: 30px;
          height: 100%;
          .card-name {
            margin: 10px 0;
            display: flex;
            align-items: center;
            font-weight: 500;
            font-size: 18px;
            line-height: 21px;
            color: #04142A;
            .el-icon {
              display: none;
              margin-left: 22px;
            }

          }
          .card-vip {
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            .vip-img {
              width: 83px;
              height: 40px;
              margin-right: 40px;
            }
            .vip-progress {
              width: 150px;
              background: #E6E8EC;
              border-radius: 29px;
              height: 10px;
              position: relative;
            }
            .vip-txt {
              font-weight: 400;
              font-size: 16px;
              line-height: 19px;
              color: #717A83;
              margin-left: 8px;
            }
            .vip-val {
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              background: linear-gradient(270deg, #1063E0 0%, #7190FF 100%);
              border-radius: 29px;
            }
          }
          button {
            width: 100%;
            height: 46px;
            padding: 10px 0;
            border-radius: 12px;
            font-weight: 700;
            border-width: 2px;
            cursor: pointer;
            flex: 1 0 0;
            transition: all .2s;
            font-size: 16px;
            // color: #04142A;
          }
        }
      }
    }
  }
}
</style>


