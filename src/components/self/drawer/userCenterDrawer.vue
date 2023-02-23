<template>
  <el-drawer v-model="visible" @closed="handleClose" size="380" :append-to-body="true" zIndex="99"  custom-class="coresky-drawer user-window" :withHeader="false">
    <div class="drawer-top">
<!--      <avatar class="avatar-box" :imageUrl="user.avatar || $filters.fullImageUrl(user.avatar)" :address="user.coinbase"-->
<!--        :imgWidth="52" :imgHeight="52" shape="circular">-->
<!--      </avatar>-->

      <div class="avatar-box">
          <img :src="user.avatar || $filters.fullImageUrl(user.avatar)" alt="">
        </div>
      <div class="info">
        <div class="user-name display-flex box-center-Y">
          {{user.nickname}}
          <div class="edit-icon" @click="goProfile"><img src="../../../assets/images/icons/icon_edit_profile.svg"
              alt=""></div>
        </div>
        <!--        profile-->
        <div class="token-address">View profile</div>
      </div>
      <!-- <el-icon @click="visible=false">
        <Close />
      </el-icon> -->
    </div>
    <div class="drawer-nav">
      <div class="nav-item" @click="goView('/account/'+ user.coinbase+'?tag=Collected')">
        <img class="icon" src="@/assets/images/icons/icon_nft.svg" alt="">
        <span>{{$t('userCenter.myCollection')}}</span>
      </div>
      <!-- <div class="nav-item" @click="goView('/account/'+ user.coinbase+'?tag=Created')">
        <img class="icon" src="@/assets/images/icons/icon_collection.svg" alt="">
        <span>Created</span>
      </div> -->
      <div class="nav-item" @click="goView('/account/'+ user.coinbase+'?tag=Favorited')">
        <img class="icon" src="@/assets/images/icons/icon_watchlist2.svg" alt="">
        <span>{{$t('userCenter.favorites')}}</span>
      </div>
      <!-- <div class="nav-item">
        <img class="icon" src="@/assets/images/icons/icon_quotation.svg" alt="">
        <span>My Quotation</span>
      </div> -->
      <!-- <div class="nav-item">
        <img class="icon" src="@/assets/images/icons/icon_collect2.svg" alt="">
        <span>My Collect</span>
      </div> -->
      <!-- <div class="nav-item" @click="goView('/account/'+ user.coinbase+'?tag=Watchlist')">
        <img class="icon" src="@/assets/images/icons/icon_quotation.svg" alt="">
        <span>Watchlist</span>
      </div> -->
      <!-- <div class="nav-item" @click="goView('/account/'+ user.coinbase+'?tag=Activities')">
        <img class="icon" src="@/assets/images/icons/icon_transaction.svg" alt="">
        <span>Activities</span>
      </div> -->
      <div class="nav-item" @click="goProfile">
        <svg-icon class="icon" icon-class="setting" />
        {{$t('userCenter.setting')}}
      </div>
      <div class="nav-item" @click="logout">
        <svg-icon class="icon" icon-class="tuichu" />
        {{$t('userCenter.quit')}}
      </div>
      <div class="nav-item line" style="margin:25px 0"></div>
    </div>
    <div class="drawer-wallet">
      <div class="wallet-item">
        <div class="coin-box">
          <svg-icon class="eth-icon" icon-class="eth_01" />
        </div>
        <div class="coin-name">
          ETH
        </div>
        <div class="price-box">
          <div class="num">{{balanceETH}}</div>
          <div class="num2">${{$filters.milliFormat($filters.ethToUsdt(balanceETH))}}</div>
        </div>
        <div class="swap-icon" @click="showUniswap('ETH')"><img src="../../../assets/images/icons/icon_swap.svg" alt=""></div>
      </div>
      <div class="wallet-item">
        <div class="coin-box">
          <svg-icon class="eth-icon weth" icon-class="eth_01" />
        </div>
        <div class="coin-name">
          WETH
        </div>
        <div class="price-box">
          <div class="num">{{balanceWETH}}</div>
          <div class="num2">${{$filters.milliFormat($filters.ethToUsdt(balanceWETH))}}</div>
        </div>
        <div class="swap-icon" @click="showUniswap('WETH')"><img src="../../../assets/images/icons/icon_swap.svg" alt=""></div>
      </div>
    </div>
    <div class="drawer-wallet" style="margin-top:30px;">
      <div class="wallet-item">
        <!-- <div class="coin-box">
        </div> -->
        <div class="coin-name">
          {{$t('userCenter.score')}}:
        </div>
        <div class="price-box">
          <div class="num">{{user&&user.score}}</div>
        </div>
      </div>
      <div class="wallet-item">
        <el-link :underline="false" type="primary" @click="goView('/reward')" class="btnDetail"> {{$t('userCenter.details')}}</el-link>
      </div>
    </div>
    <uniswapDialog ref="uniswapDialog"></uniswapDialog>
  </el-drawer>
</template>

<script>
import { keepPoint } from "@/filters";
import uniswapDialog from '@/components/self/uniswapDialog'

export default {
  name: "userCenterDrawer",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    uniswapDialog
  },
  watch: {
    show () {
      this.visible = this.show;
      if (this.visible) {
        this.initGetBalance()
      }
    },
    '$store.state.user': function () {
      this.initGetBalance()
    }
  },
  data () {
    return {
      loading: true,
      visible: false,
      balanceETH: '--',
      balanceWETH: '--',
    };
  },
  created () {

  },
  mounted () {

  },
  computed: {
    user () {
      return this.$store.state.user;
    },
  },
  methods: {
    showUniswap (type) {
      this.$refs.uniswapDialog.showUniswap(type)
    },
    async initGetBalance () {
      this.balanceETH = keepPoint(await this.$sdk.getBalance({
        address: this.$sdk.NULL_ADDRESS()
      }, this.user.coinbase))

      try {
        let balanceWETH = await this.$sdk.getBalance({
          address: process.env.VUE_APP_WETH
        }, this.user.coinbase)
        this.balanceWETH = this.$sdk.fromWeiNum(balanceWETH)
      }
      catch (err) {

      }
      console.log(this.user)
    },
    logout () {
      this.$web3.disconnect();
      this.handleClose()
    },
    goProfile () {
      this.visible = false
      this.$router.push({ path: '/profile' });
      this.handleClose()
    },
    goView (path) {
      this.$router.push(path)
      this.handleClose()
    },
    handleClose () {
      this.$emit('update:show', false)
    }
  },
}
</script>

<style lang="scss">
.user-window{
  right: 10px!important;
  margin-top: calc($headerHeight + 10px)!important;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
border-radius: 16px;
height: 650px!important;
}
.coresky-drawer {
  // height: calc(100% - $headerHeight) !important;
  .el-drawer__body {
    padding: 20px 30px 20px;
  }
  .drawer-top {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    .avatar-box {
      width: 52px;
      height: 52px;
      margin-right: 12px;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      .user-name {
        font-weight: 700;
        font-size: 22px;
        line-height: 28px;
        color: $primaryColor;
        .edit-icon {
          cursor: pointer;
          width: 24px;
          height: 24px;
          margin-left: 24px;
        }
      }
      .token-address {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: $color-black2;
      }
    }
    .el-icon {
      cursor: pointer;
      font-size: 24px;
      margin-left: auto;
      color: $color-black2;
    }
  }
  .drawer-nav {
    margin: 12px 0;
    .nav-item {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      border-radius: 12px;
      padding: 12px 16px;
      line-height: 30px;
      font-weight: 500;
      font-size: 20px;
      color: $primaryColor;
      cursor: pointer;
      &:hover {
        background: $elButtonHoverBg;
      }
      &.line {
        height: 1px;
        padding: 0;
        background: $borderBg;
      }
      .icon {
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }
    }
  }
  .drawer-wallet {
    border: 1px solid $borderBg;
    border-radius: 12px;
    .wallet-item {
      display: flex;
      padding: 16px;
      align-items: center;
      &:not(:last-child) {
        border-bottom: 1px solid $borderBg;
      }
      .coin-box {
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: $borderBg;
        .coin-img {
          width: 12px;
          height: 20px;
        }
        .eth-icon {
          color: #728be7;
          font-size: 18px;
          &.weth {
            color: #ed8ee4;
          }
        }
      }
      .coin-name {
        margin-left: 10px;
        font-size: 16px;
        line-height: 24px;
        color: $color-black3;
      }
      .price-box {
        margin-left: auto;
        text-align: right;
        .num {
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          color: $primaryColor;
        }
        .num2 {
          font-weight: 400;
          font-size: 12px;
          line-height: 18px;
          color: $color-black2;
        }
      }
      .swap-icon{
        cursor: pointer;
        width: 24px;
        height: 24px;
        margin-left: 14px;
      }
      .btnDetail {
        margin: 0 auto;
        font-size: 16px;
        color: #7d47ff;
      }
    }
  }
}
</style>
