<template>
  <el-drawer v-model="visible" @closed="handleClose" size="406" :append-to-body="true" zIndex="99"
    custom-class="coresky-drawer" :withHeader="false">
    <div class="drawer-top">
      <avatar class="avatar-box" :imageUrl="user.avatar || $filters.fullImageUrl(user.avatar)" :address="user.coinbase"
        :imgWidth="52" :imgHeight="52" shape="circular">
      </avatar>
      <div class="info">
        <div class="user-name display-flex box-center-Y">
          {{user.nickname}}
          <div class="edit-icon" @click="goProfile"><img src="../../../assets/images/icons/icon_edit_profile.svg"
              alt=""></div>
        </div>
        <!--        profile-->
        <div class="token-address">View profile</div>
      </div>
      <el-icon @click="visible=false">
        <Close />
      </el-icon>
    </div>
    <div class="drawer-nav">
      <div class="nav-item" @click="goView('/account/'+ user.coinbase)">
        <img class="icon" src="@/assets/images/icons/icon_nft.svg" alt="">
        <span>Collected</span>
      </div>
      <div class="nav-item" @click="goView('/account/'+ user.coinbase+'?tag=Created')">
        <img class="icon" src="@/assets/images/icons/icon_collection.svg" alt="">
        <span>Created</span>
      </div>
      <div class="nav-item" @click="goView('/account/'+ user.coinbase+'?tag=Favorited')">
        <img class="icon" src="@/assets/images/icons/icon_watchlist2.svg" alt="">
        <span>Favorited</span>
      </div>
      <!-- <div class="nav-item">
        <img class="icon" src="@/assets/images/icons/icon_quotation.svg" alt="">
        <span>My Quotation</span>
      </div> -->
      <!-- <div class="nav-item">
        <img class="icon" src="@/assets/images/icons/icon_collect2.svg" alt="">
        <span>My Collect</span>
      </div> -->
      <div class="nav-item" @click="goView('/account/'+ user.coinbase+'?tag=Watchlist')">
        <img class="icon" src="@/assets/images/icons/icon_quotation.svg" alt="">
        <span>Watchlist</span>
      </div>
      <div class="nav-item" @click="goView('/account/'+ user.coinbase+'?tag=Activities')">
        <img class="icon" src="@/assets/images/icons/icon_transaction.svg" alt="">
        <span>Activities</span>
      </div>
      <!-- <div class="nav-item">
        <img class="icon" src="@/assets/images/icons/icon_transaction.svg" alt="">
        <span>My Coupon</span>
      </div>
      <div class="nav-item">
        <img class="icon" src="@/assets/images/icons/icon_transaction.svg" alt="">
        <span>My Launchpad</span>
      </div> -->
      <div class="nav-item line">
      </div>
      <div class="nav-item">
        <img class="icon" src="@/assets/images/icons/icon_collect2.svg" alt="">
        <span>My Coupons</span>
      </div>
      <div class="nav-item">
        <img class="icon" src="@/assets/images/icons/icon_nft.svg" alt="">
        <span>My Launchpad</span>
      </div>
      <div class="nav-item" @click="logout">
        {{ $t("navigation.disconnect") }}
      </div>
      <!-- <div class="nav-item">
        <img class="icon" src="@/assets/images/icons/icon_nft.svg" alt="">
        <span>My Collect</span>
      </div>
      <div class="nav-item">
        <img class="icon" src="@/assets/images/icons/icon_nft.svg" alt="">
        <span>Transaction Record</span>
      </div> -->
    </div>
    <div class="drawer-wallet">
      <div class="wallet-item">
        <div class="coin-box">
          <img class="coin-img" src="@/assets/images/icons/token/token_eth2.svg" alt="">
        </div>
        <div class="coin-name">
          ETH
        </div>
        <div class="price-box">
          <div class="num">{{balanceETH}}</div>
          <!--          <div class="num2">$0</div>-->
        </div>
      </div>
      <div class="wallet-item">
        <div class="coin-box">
          <img class="coin-img" src="@/assets/images/icons/token/token_eth2.svg" alt="">
        </div>
        <div class="coin-name">
          WETH
        </div>
        <div class="price-box">
          <div class="num">{{balanceWETH}}</div>
          <!--          <div class="num2">$0</div>-->
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { keepPoint } from "@/filters";

export default {
  name: "userCenterDrawer",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show () {
      this.visible = this.show;
      // this.initGetBalance()
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
    async initGetBalance () {
      this.balanceETH = keepPoint(await this.$sdk.getBalance({
        address: this.$sdk.NULL_ADDRESS()
      }, this.user.coinbase))
      const balanceWETH = await this.$sdk.getBalance({
        address: process.env.VUE_APP_WETH
      }, this.user.coinbase)
      this.balanceWETH = this.$sdk.fromWeiNum(balanceWETH)
    },
    logout () {
      this.$web3.disconnect();
    },
    goProfile () {
      this.visible = false
      this.$router.push({ path: '/profile' });
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
.coresky-drawer {
  width: 406px;
  height: calc(100% - $headerHeight) !important;
  margin-top: $headerHeight;
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
    }
  }
}
</style>
