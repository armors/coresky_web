<template>
  <div class="CoreCardBind">

    <div class="page-content">
      <div class="content-head">
        <img src="@/assets/core-card/vip_m_0.png" class="vip-img" alt="">
        <div>
          <div class="txt1">Your Corecard "kite" VIP 0</div>
          <div class="txt2">You must be in the Hunters On-Chain Discord server. You must also have at least one of the
            following roles:OG Lander, Early Lander</div>
        </div>
      </div>
      <div class="content-body">
        <div class="left">
          <div class="txt1">
            Corecard
          </div>
          <div class="txt2">
            You must be in the Hunters On-Chain Discord server. You must also have at least one of the following roles:OG
            Lander, Early Lander
          </div>
          <div class="job-list">
            <div class="job-item">
              <!-- <span class="icon-none"></span> -->
              <el-icon color="#35C955" size="20" class="icon_success">
                <SuccessFilled />
              </el-icon>
              <div class="job-content">
                <img src="@/assets/core-card/icon_1.png" class="icon" alt="">
                <span class="job-name">Connect wallet</span>
                <el-button type="primary" disabled class="">Connect Wallet</el-button>
              </div>
            </div>
            <div class="job-item">
              <span class="icon-none"></span>
              <div class="job-content">
                <img src="@/assets/core-card/icon_2.png" class="icon" alt="">
                <span class="job-name">Bind to Twitter</span>
                <el-button type="primary" class="">Connect</el-button>
              </div>
            </div>
            <div class="job-item">
              <span class="icon-none"></span>
              <div class="job-content">
                <img src="@/assets/core-card/icon_3.png" class="icon" alt="">
                <span class="job-name">Complete casting</span>
                <el-button type="primary" class="">Casting</el-button>
              </div>
            </div>
          </div>
          <div>
            <el-button class="btn-bind" disabled type="info">Cast and bind</el-button>
          </div>
        </div>
        <div class="right">
          <img class="vip-card-img"
            src="https://i.seadn.io/gae/iGVQ_0I1nj4paQ1GJemfCwNqTm64XRMU3CO7y0bi-C-im7edte2YWf1hgNuShpRXC70xBoUVGFQCjTsyXkMD2tPX17VOJBn1wjQZ?auto=format&w=256"
            alt="">
          <img class="vip-level" :src="require(`@/assets/core-card/vip0.png`)" alt="">
        </div>
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
  name: 'coreCardMint',
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
    init () {
      if (this.user && this.user.coinbase) {
        this.queryData()
      }
    },
    queryData () {

      setTimeout(() => {
        this.dataList = []
      })
      return
      this.isLoading = true
      this.$api("corecard.myCards", this.queryParams).then((res) => {
        this.isLoading = false
        this.dataList = res.data
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
    padding: 50px 100px;
    margin: 0 auto;
    width: 1080px;
    background: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    overflow: hidden;

    .content-head {
      display: flex;
      padding-bottom: 30px;
      border-bottom: 1px solid #E6E8EC;
      .vip-img {
        width: 150px;
        height: 150px;
        margin-right: 28px;
      }
      .txt1 {
        padding: 18px 0;
        font-weight: 700;
        font-size: 26px;
        line-height: 150%;
        text-transform: capitalize;
        color: #04142A;
      }
      .txt2 {
        font-size: 18px;
        line-height: 150%;
        color: #04142A;
        mix-blend-mode: normal;
        opacity: 0.5;
      }
    }
    .content-body {
      margin-top: 30px;
      display: flex;

      .left {
        margin-right: 40px;
        .txt1 {
          font-weight: 500;
          font-size: 18px;
          line-height: 150%;
          color: #04142A;
          margin-bottom: 15px;
        }
        .txt2 {
          font-weight: 400;
          font-size: 16px;
          line-height: 150%;
          color: #04142A;
          mix-blend-mode: normal;
          opacity: 0.6;
          margin-bottom: 40px;
        }
        .job-list {
          margin-bottom: 60px;
          .job-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            .icon-none {
              width: 20px;
              height: 20px;
              background: #FAFCFE;
              border: 2px solid #D3D3D3;
              border-radius: 50%;
              margin-right: 22px;
            }
            .icon_success {
              font-size: 20px;
              margin-right: 22px;
            }
            .job-content {
              flex-grow: 1;
              height: 76px;
              background: #FAFAF8;
              border: 1px solid #E6E8EC;
              border-radius: 12px;
              display: flex;
              align-items: center;
              padding: 15px 20px;
              .icon {
                width: 20px;
                border-radius: 0;
                margin-right: 15px;
              }
              .job-name {
                font-weight: 500;
                font-size: 16px;
                line-height: 19px;
                color: #717A83;
              }
              .el-button {
                margin-left: auto;
                border-radius: 12px;
                height: 46px;
                width: 131px;
              }
            }
          }
        }
        .btn-bind {
          background: #D3D3D3;
          border-radius: 12px;
          height: 60px;
          width: 100%;
          border: none;
          font-size: 18px;
          line-height: 120%;
          opacity: 1;
        }
      }
      .right {
        width: 346px;
        // height: 512px;
        background: #FAFAF8;
        border-radius: 16px;
        overflow: hidden;
        flex-shrink: 0;
        position: relative;
        .vip-card-img {
          width: 100%;
          height: 100%;
        }
        .vip-level {
          width: 83px;
          height: 40px;
          position: absolute;
          left: 26px;
          top: 22px;
        }
      }
    }

  }
}
</style>


