<template>
  <div class="CoreCardBind">

    <div class="page-content">
      <div class="content-head">
        <img :src="require(`@/assets/core-card/vip_m_${viplevel}.png`)" class="vip-img" alt="">
        <div>
          <div class="txt1">Your Corecard "kite" VIP {{ viplevel }}</div>
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
              <el-icon color="#35C955" size="20" v-if="user.id" class="icon_success">
                <SuccessFilled />
              </el-icon>
              <span class="icon-none" v-else></span>
              <div class="job-content">
                <img src="@/assets/core-card/icon_1.png" class="icon" alt="">
                <span class="job-name">Connect wallet</span>
                <el-button type="primary" :disabled="user.id !== ''" class="">Connect Wallet</el-button>
              </div>
            </div>
            <div class="job-item">
              <el-icon color="#35C955" size="20" v-if="isBindTwitter" class="icon_success">
                <SuccessFilled />
              </el-icon>
              <span class="icon-none" v-else></span>
              <div class="job-content">
                <img src="@/assets/core-card/icon_2.png" class="icon" alt="">
                <span class="job-name">Bind to Twitter</span>
                <el-button type="primary" :disabled="isBindTwitter" @click="bindTwitter">Connect</el-button>
              </div>
            </div>
            <div class="job-item">
              <el-icon color="#35C955" size="20" v-if="isRelayTwitter" class="icon_success">
                <SuccessFilled />
              </el-icon>
              <span class="icon-none" v-else></span>
              <div class="job-content">
                <img src="@/assets/core-card/icon_3.png" class="icon" alt="">
                <span class="job-name">Retweet Twitter</span>
                <el-button type="primary" :loading="reTweetLoading" :disabled="isRelayTwitter"
                  @click="relayTwitter">Casting</el-button>
              </div>
            </div>
          </div>
          <div>
            <el-button class="btn-mint" :loading="isMinting" :disabled="viplevel !== 0 && finishTask === false"
              @click="cardMint" type="primary">Mint
            </el-button>
          </div>
        </div>
        <div class="right">
          <img class="vip-card-img"
            src="https://i.seadn.io/gae/iGVQ_0I1nj4paQ1GJemfCwNqTm64XRMU3CO7y0bi-C-im7edte2YWf1hgNuShpRXC70xBoUVGFQCjTsyXkMD2tPX17VOJBn1wjQZ?auto=format&w=256"
            alt="">
          <img class="vip-level" :src="require(`@/assets/core-card/vip${viplevel}.png`)" alt="">
        </div>
      </div>
    </div>
  </div>
  <FooterTemplate />
</template>
<script>
import BigNumber from "bignumber.js";
import ERC721Template from '@/util/sdk/ERC721Template'
import FooterTemplate from "@/views/layout/FooterTemplate";
import Cookies from "js-cookie";
import dayjs from 'dayjs';
import config from '@/config/index'
import { rowProps } from 'element-plus';
import { getLocalStorage, removeLocalStorage } from "@/util/local-storage.js";
export default {
  mixins: [],
  name: 'coreCardMint',
  components: {
    FooterTemplate
  },
  data () {
    return {
      viplevel: 0,
      isLoading: false,
      isMinting: false,
      isBindTwitter: false,
      bindTwitterURL: '',
      isRelayTwitter: false,
      relayTwitterURL: '',
      dataList: [],
      reTweetLoading: false,
    };
  },
  watch: {
    user: {
      handler (val) {
        if (this.user.id && this.isLoading === false && this.$store.state.useAuthorization) {
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
    finishTask () {
      if (!this.user || !this.user.id)
        return false
      if (!this.isBindTwitter)
        return false
      if (!this.isRelayTwitter)
        return false
      return true
    }
  },
  methods: {
    init () {
      if (this.user && this.user.coinbase) {
        this.queryData()
        this.twitterInfo()
      }
    },
    queryData () {
      this.isLoading = true
      this.$api("corecard.availableCard", this.queryParams).then((res) => {
        if (res.code === 200 && res.debug !== null) {
          this.viplevel = 0
          this.proot = res.debug.proot
          this.tokenId = res.debug.tokenId
          this.uri = res.debug.uri
        }
        else {
          this.viplevel = 0
        }
        this.isLoading = false
      })
    },
    twitterInfo () {
      this.$api("corecard.myTwitterInfo", this.queryParams).then((res) => {
        if (res.code === 200 && res.debug !== null) {
          this.isBindTwitter = res.debug.bind === 1
          this.bindTwitterURL = res.debug.bindUrl
          this.isRelayTwitter = res.debug.relay === 1
          this.relayTwitterURL = res.debug.relayUrl
        }
      })
    },
    bindTwitter () {
      let obj = getLocalStorage(this.$store.state.useAuthorization)
      let token = obj[this.$store.state.useAuthorization];
      Cookies.set("coresky_web_token", token);
    },
    relayTwitter () {
      this.reTweetLoading = true
      setTimeout(() => {
        this.reTweetLoading = false
        this.isRelayTwitter = 1
      }, 3000);
      this.$api("corecard.relayTwitter")
      window.open(this.relayTwitterURL, "_blank");
    },
    async cardMint () {
      this.isMinting = true
      const result = await ERC721Template.selfMint(this.user.coinbase)
      if (result && result.status === true && result.blockHash) {
        this.$tools.notification('success', '');
        setTimeout(() => {
          this.$router.push('/coreCardBind')
        }, 1000);
      } else if (result.error) {
        this.$tools.notification('fail', result.error, 'error');
      }
      this.isMinting = false
    }
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
        .btn-mint {
          border-radius: 12px;
          height: 60px;
          width: 100%;
          border: none;
          font-size: 18px;
          line-height: 120%;
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


