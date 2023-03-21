<template>
  <div class="CoreCardBind">
    <div class="page-content">
      <div class="content-head">
        <img :src="require(`@/assets/core-card/vip_m_${viplevel}.png`)" class="vip-img" alt="">
        <div>
          <div class="txt1"> {{ $t('coreCardMint.title', { name: viplevel }) }}</div>
          <div class="txt2">{{ $t('coreCardMint.subTitle') }}</div>
        </div>
      </div>
      <div class="content-body">
        <div class="left">
          <!-- <div class="txt1">
            Corecard
          </div>
          <div class="txt2">
            You must be in the Hunters On-Chain Discord server. You must also have at least one of the following roles:OG
            Lander, Early Lander
          </div> -->
          <div class="job-list">
            <div class="job-item">
              <!-- <span class="icon-none"></span> -->
              <el-icon color="#35C955" size="20" v-if="token" class="icon_success">
                <SuccessFilled />
              </el-icon>
              <span class="icon-none" v-else></span>
              <div class="job-content">
                <img src="@/assets/core-card/icon_1.png" class="icon" alt="">
                <span class="job-name">{{ $t('coreCardMint.connectWallet') }}</span>
                <el-button type="primary" @click="login" :disabled="token" class="">{{ $t('coreCardMint.connect')
                }}</el-button>
              </div>
            </div>
            <div class="job-item">
              <el-icon color="#35C955" size="20" v-if="isBindTwitter" class="icon_success">
                <SuccessFilled />
              </el-icon>
              <span class="icon-none" v-else></span>
              <div class="job-content">
                <img src="@/assets/core-card/icon_2.png" class="icon" alt="">
                <span class="job-name">{{ $t('coreCardMint.bindtoTwitter') }}</span>
                <el-button type="primary" :disabled="isBindTwitter || !token" @click="bindTwitter">{{
                  $t('coreCardMint.bind')
                }}</el-button>
              </div>
            </div>
            <div class="job-item">
              <el-icon color="#35C955" size="20" v-if="isRelayTwitter" class="icon_success">
                <SuccessFilled />
              </el-icon>
              <span class="icon-none" v-else></span>
              <div class="job-content">
                <img src="@/assets/core-card/icon_3.png" class="icon" alt="">
                <span class="job-name">{{ $t('coreCardMint.retweetTwitter') }}</span>
                <el-button type="primary" :loading="reTweetLoading" :disabled="isRelayTwitter || !token"
                  @click="relayTwitter">{{
                    $t('coreCardMint.retweet') }}</el-button>
              </div>
            </div>
          </div>
          <div>
            <el-button class="btn-mint" :loading="isMinting"
              :disabled="(viplevel !== 0 && finishTask === false) || isSuccess == true || !token" @click="cardMint"
              type="primary">{{
                $t('coreCardMint.mint') }}
            </el-button>
          </div>
        </div>
        <div class="right" :class="'level' + viplevel">
          <img class="vip-card-img" :src="require(`@/assets/core-card/v${viplevel}.webp`)" alt="">
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
      isSuccess: false,
    };
  },
  watch: {
    token: {
      handler (val) {
        this.init();
      },
      immediate: true
    }
  },
  created () {

  },
  mounted () {
  },
  computed: {
    token () {
      return this.$store.state.token;
    },
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
    login () {
      this.$store.dispatch("connectAndSign")
    },
    init () {
      if (this.token) {
        this.queryData()
        this.twitterInfo()
      }
      else {
        this.viplevel = 0
        this.isMinting = false
        this.isBindTwitter = false
        this.isRelayTwitter = false
        this.isSuccess = false
      }
    },
    queryData () {
      this.isLoading = true
      this.$api("corecard.availableCard", this.queryParams).then((res) => {
        if (res.code === 200 && res.debug !== null) {
          this.viplevel = res.debug.level
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
      location.href = this.bindTwitterURL
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
      if (this.viplevel > 0) {
        let res = await this.$api("corecard.reserve", { level: this.viplevel })
        if (res.debug === false) {
          this.$tools.notification('', this.$t('corecard.coreCardMintErr'), 'error');
          this.isMinting = false
          return
        }
      }
      this.isMinting = true
      let result = null
      result = await ERC721Template.selfMint(this.user.coinbase)
      if (result && result.status === true && result.blockHash) {
        this.$tools.notification('success', '');
        this.isSuccess = true
        setTimeout(() => {
          this.$router.push('/profile?tab=usercardlist')
        }, 2000);
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
    width: 1032px;
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
        width: 445px;
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
        display: flex;
        align-items: center;
        justify-content: center;
        .vip-card-img {
          height: 300px;
          width: auto;
        }
        .vip-level {
          width: 83px;
          height: 40px;
          position: absolute;
          left: 26px;
          top: 22px;
        }
        &.level0 {
          background: #E6E8EC;
        }
        &.level1 {
          background: #ECEAE9;
        }
        &.level2 {
          background: #E6E7E9;
        }
        &.level3 {
          background: #F5F4E7;
        }
        &.level4 {
          background: #E6EDF1;
        }
        &.level5 {
          background: #E3E3EA;
        }
      }
    }

  }
}
</style>


