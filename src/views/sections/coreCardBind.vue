<template>
  <div class="CoreCardMint">
    <div class="page-content">
      <div class="title">
        <span>Bind Corecard</span>
        <el-icon>
          <CloseBold />
        </el-icon>
      </div>
      <div class="card-list" v-loading="isLoading">
        <div class="card-item" :class="{ 'active': item.pledge === 1 }" v-for="(item, index) in dataList" :key="index">
          <!-- <img src="@/assets/core-card/level1.png" class="card-img" alt=""> -->
          <img :src="item.avatarFrame" class="card-img" alt="">
          <div class="card-info">
            <div class="card-name">
              <span>{{ item.name }}</span>
              <el-icon class="" color="#35C955" size="20">
                <SuccessFilled />
              </el-icon>
            </div>
            <div class="card-vip">
              <img :src="require(`@/assets/core-card/vip${item.level}.png`)" class="vip-img" alt="">
              <div class="vip-progress">
                <div class="vip-val" :style="{ width: (item.ratio * 100) + '%' }"></div>
              </div>
              <div class="vip-txt">{{ item.ratio * 100 }}%</div>
            </div>
            <div>
              <el-button type="primary" :loading="item.isloading" v-if="item.pledge === 1"
                @click="unBindCard(item)">UnBind</el-button>
              <el-button v-if="item.pledge === 0" :loading="item.isloading" @click="bindCard(item)" plain>Bind</el-button>
            </div>
          </div>
        </div>
        <div class="card-item">
          <img src="@/assets/core-card/vip_m_0.png" class="vip-img-0" alt="">
          <div>
            <div class="vip-txt-0">Mint Corecard VIP-0</div>
            <el-button class="vip-btn-0" type="primary" @click="$router.push('/corecardmint')">Mint</el-button>
          </div>
        </div>
      </div>
      <!-- <div class="empty-wrap" v-if="dataList.length === 0 && isLoading === false">
        <img src="../../assets/images/no-data.png" alt="" />
        <p class="txt">No Data</p>
      </div> -->
    </div>
  </div>
  <FooterTemplate />
</template>
<script>
import BigNumber from "bignumber.js";
import FooterTemplate from "@/views/layout/FooterTemplate";
import ERC721Template from '@/util/sdk/ERC721Template'

import dayjs from 'dayjs';
import config from '@/config/index'
import { rowProps } from 'element-plus';
export default {
  mixins: [],
  name: 'CoreCardMint',
  components: {
    FooterTemplate
  },
  data () {
    return {
      isLoading: false,
      dataList: []
    };
  },
  watch: {
    user: {
      handler (val) {
        if (this.user.id && this.isLoading === false) {
          this.init();
        }
      },
      immediate: true
    }
  },
  created () {
  },
  mounted () {

  },
  computed: {
    user: function () {
      var user = this.$store.state.user;
      return user;
    },
  },
  methods: {
    init () {
      if (this.user && this.user.coinbase) {
        this.queryData()
      }
    },
    queryData () {
      this.isLoading = true
      this.$api("corecard.myCards", this.queryParams).then((res) => {
        this.isLoading = false
        this.dataList = res.debug.map(el => {
          el.isloading = false
          return el
        })
      })
    },
    async bindCard (item) {
      for (let i = 0; i <= this.dataList.length; i++) {
        if (this.dataList[i].pledge === 1) {
          this.$tools.notification('', '只能绑定一张coreCrad', 'error');
          return
        }
      }
      item.isloading = true
      const result = await ERC721Template.depositCard(item.tokenId, this.user.coinbase)
      if (result && result.status === true && result.blockHash) {
        this.$tools.notification('success', '');
        setTimeout(() => {
          this.init();
        }, 1000);
      } else if (result.error) {
        this.$tools.notification('fail', result.error, 'error');
      }
      item.isloading = false
    },
    async unBindCard (item) {
      item.isloading = true
      const result = await ERC721Template.withdrawCard(item.tokenId, this.user.coinbase)
      if (result && result.status === true && result.blockHash) {
        this.$tools.notification('success', '');
        setTimeout(() => {
          this.init();
        }, 1000);
      } else if (result.error) {
        this.$tools.notification('fail', result.error, 'error');
      }
      item.isloading = false
    }
  },
  beforeUnmount () {

  }
};
</script>
<style lang="scss" scoped>
.CoreCardMint {
  background-color: #E6E8EC;
  min-height: calc(100vh - $headerHeight - $bottomHeight);
  padding: 30px 0;
  .page-content {
    margin: 0 auto;
    width: 1080px;
    background: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    overflow: hidden;
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
      margin-bottom: 50px;
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
        .vip-img-0 {
          width: 150px;
          height: 150px;
          margin-right: 30px;
        }
        .vip-txt-0 {
          font-weight: 500;
          font-size: 18px;
          line-height: 21px;
          color: #04142A;
          margin-bottom: 15px;
        }
        .vip-btn-0 {
          width: 240px;
          height: 46px;
          border-radius: 12px;
        }
      }
    }
  }
}
</style>


