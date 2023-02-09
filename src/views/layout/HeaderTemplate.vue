<template>
  <div class="home-header">
    <div class="header-container" :style="style">
      <router-link to="/" class="head-logo header-margin-r">
        <img fit="contain" class="logo-image" :src="require('../../assets/images/logo_black.svg')" />
      </router-link>

      <div class="header-search header-margin-r">
        <el-input class="search-input-wrap" v-model="keyword" @keyup.enter="searchClick"
          :placeholder="$t('navigation.searchTip')">
          <template #prefix>
            <div class="img-search"><img src="../../assets/images/icons/icon_search.svg" alt=""></div>
          </template>
        </el-input>
      </div>

      <div class="head-navs">
        <router-link class="nav-link" to="/reward">
          Rewards
        </router-link>
        <router-link class="nav-link" to="/markterplace">
          {{ $t("navigation.marketplace") }}
        </router-link>
        <router-link class="nav-link" to="/allcollection">
          {{ $t("navigation.collection") }}
        </router-link>
        <el-popover placement="bottom" trigger="click" :show-arrow="false" width="200" popper-class="nav-popover"
          :offset="15">
          <template #reference>
            <div class="nav-link" to="/erc721">
              <svg-icon class="head-icon mr8" icon-class="chain_eth" />
              Ethereum
            </div>
          </template>
          <div>
            <div class="chain-item active">
              <svg-icon class="head-icon mr8" icon-class="chain_eth" />
              <div class="item-txt">Ethereum</div>
              <div class="item-dot"></div>
            </div>
            <!-- <div class="chain-item">
              <svg-icon class="head-icon" icon-class="chain_bnb" />
              <div class="item-txt">BNB Chain</div>
              <div class="item-dot"></div>
            </div> -->
          </div>
        </el-popover>
        <el-popover placement="bottom" trigger="click" :show-arrow="false" width="180" popper-class="nav-popover"
          :offset="15">
          <template #reference>
            <div class="nav-link" to="/erc721">
              <svg-icon class="head-icon" icon-class="yuyan" />
            </div>
          </template>
          <div>
            <div class="chain-item two" @click="languageSelect('English')" :class="{'active':language =='English'}">
              <div class="item-txt">English</div>
              <div class="item-dot"></div>
            </div>
            <div class="chain-item two" @click="languageSelect('中文')" :class="{'active':language =='中文'}">
              <div class="item-txt">中文</div>
              <div class="item-dot"></div>
            </div>
          </div>
        </el-popover>
        <div class="nav-link shopping-cart" @click="showShoppingCartDrawer=true">
          <div class="notify-num" v-if="shoppingCartList&&shoppingCartList.length>0 || shoppingOpenseaCartList&&shoppingOpenseaCartList.length>0">{{ shoppingCartList.length + shoppingOpenseaCartList.length }}</div>
          <svg-icon class="head-icon" icon-class="gouwuche" />
        </div>
        <div class="head-connect display-flex box-center" v-if="!connected" @click="login">
          {{ $t("navigation.connectWallet") }}
        </div>
        <div class="nav-link" @click="showUserDrawer=true" v-else>
          <avatar class="avatar-img" :imageUrl="user.avatar || $filters.fullImageUrl(user.avatar)"
            :address="user.coinbase" :imgWidth="32" :imgHeight="32" shape="circular">
          </avatar>
        </div>
      </div>
      <!-- <div class="head-menus">
        <div class="head-connect display-flex box-center" v-if="!connected" @click="login">
          {{ $t("navigation.connectWallet") }}
        </div>

        <div class="user-link header-margin-l" v-else>
          <div class="user-popover">
            <profile-popover></profile-popover>
            <div class="user-avatar" @click="showUserDrawer=true">
              <avatar class="avatar-img" :imageUrl="user.avatar || $filters.fullImageUrl(user.avatar)"
                :address="user.coinbase" :imgWidth="40" :imgHeight="40" shape="circular">
              </avatar>
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <follow-popup :show="showFollowing" ftype="following" @close="showFollowing = false" v-if="connected"
      :address="user.coinbase">
    </follow-popup>
    <userCenterDrawer v-model:show="showUserDrawer" />
    <shoppingCartDrawer v-model:show="showShoppingCartDrawer" />
  </div>
</template>
<script>
import FollowPopup from "@/components/FollowPopup";
import userCenterDrawer from "@/components/self/drawer/userCenterDrawer";
import shoppingCartDrawer from "@/components/self/drawer/shoppingCartDrawer";

import { useDark, useToggle } from '@vueuse/core'

export default {
  name: "HeaderTemplate",
  components: {
    FollowPopup,
    userCenterDrawer,
    shoppingCartDrawer,
  },
  data: function () {
    return {
      showUserDrawer: false,
      showShoppingCartDrawer: false,
      isDark: false,
      style: {
        backgroundColor: "",
      },
      keyword: this.$route.query.keyword,
      showFollowing: false,
      networks: this.$store.state.networks,
      searchShow: false,
      menuShow: false,
      languagePopover: false
    };
  },
  computed: {
    notice () {
      return this.$store.state.notice;
    },
    connected () {
      return this.$store.state.connected;
    },
    user: function () {
      var user = this.$store.state.user;
      return user;
    },
    message () {
      return this.$store.state.message;
    },
    language () {
      return this.$store.state.language;
    },
    shoppingCartList () {
      return this.$store.state.shoppingCartList;
    },
    shoppingOpenseaCartList () {
      return this.$store.state.shoppingOpenseaCartList;
    }
  },
  created () {
    this.isDark = useDark()
    if (localStorage.getItem("locale") == "zh") {
      this.$store.state.language = "中文";
    } else {
      this.$store.state.language = "English";
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted () {
    // this.login()
    this.getCartInfo()
  },
  methods: {
    getCartInfo () {
      this.$store.commit('initShoppingCart')
    },
    async login (value = 'metamask') {
      console.log('header connectSign')
      this.$store.dispatch("connectAndSign", value).then(res => {
        if (res && this.$tools.checkResponse(res)) {
          console.log(res)
          // var query = this.$route.query;
          // if (query && query.redirect) {
          //   this.$router.push(query.redirect);
          // } else {
          //   this.$router.push("/");
          // }
        }
      });
    },
    toggleDark () {
      console.log('toggleDark')
      const isDark = useDark()
      useToggle(isDark)
      this.isDark = !this.isDark
    },
    handleScroll () {
      let scrollTop = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop) {
        if (scrollTop < 112) {
          this.style.backgroundColor = `rgba(255, 255, 255,${scrollTop / (scrollTop + 112)})`;
        } else {
          this.style.backgroundColor = "#fff";
        }
      } else if (scrollTop === 0) {
        this.style.backgroundColor = "transparent";
      }
    },
    async searchClick () {
      this.$router.push({ name: "Search", query: { keyword: this.keyword } });
    },
    goProfile () {
      if (!this.$tools.needLogin()) return;
      this.$router.push("/profile");
    },
    goItems () {
      this.$router.push({ name: "Items" });
    },
    logout () {
      this.$web3.disconnect();
    },
    languageSelect (parameter) {
      this.$store.state.language = parameter;
      if (parameter == "English") {
        localStorage.setItem("locale", "en");
        this.$i18n.locale = localStorage.getItem("locale");
      } else if (parameter == "中文") {
        localStorage.setItem("locale", "zh");
        this.$i18n.locale = localStorage.getItem("locale");
      }
      this.languagePopover = false;
    },
  },
};
</script>

<style lang="scss">
.header-search {
  .search-input {
    border-radius: 10px;
    overflow: hidden;
    height: 40px;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 16px;
    border-radius: 12px;
    .el-input__wrapper {
      height: 100%;
      padding: 0;
      border-radius: 12px;
    }
    .el-input__inner {
      font-size: 13px;
      padding-left: 38px !important;
      height: 100%;
      border: none;
      gap: 8px;
      background: rgba(0, 0, 0, 0.04);
      border-radius: 12px;
    }
    .el-input__prefix {
      line-height: 40px;
      left: 20px;
    }
    .img-search {
      width: 16px;
      height: 16px;
    }
  }

  .nav-popover {
    width: fit-content !important;
    height: fit-content !important;
    min-width: unset !important;
    padding-bottom: 0px !important;
    z-index: 15000 !important;
    :hover {
      color: grey;
    }
  }
}
</style>

<style lang="scss" scoped>
@import '../../styles/variables';
.home-header {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 100;
  background: $bg-white;
  .avatar-img {
    width: 32px;
    height: 32px;
  }
  .header-container {
    max-width: $maxWidthRate;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 15px;
    line-height: 40px;
    height: $headerHeight;
    color: $color-white;
  }
}

.head-navs {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}

.head-menus {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .round-link {
    color: #333;
    font-size: 28px;
    cursor: pointer;
  }
  .create-link {
    font-size: 16px;
  }
}
.link-btn {
  background: $primaryColor;
  border-radius: 10px;
  color: #fff;
  border: 0;
}
.header-search {
  display: flex;
  flex: 1;
  align-items: center;
  color: #333;
  font-size: 15px;
  font-weight: 900;
  width: 430px;
}
.nav-link {
  position: relative;
  white-space: nowrap;
  color: $color-black4;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  margin: 0 10px;
  display: flex;
  align-items: center;
  height: 40px;
  .svg-icon {
    font-size: 22px;
    color: #000;
    &:hover {
      color: $bgPurple;
    }
  }
  .mr8 {
    margin-right: 8px;
  }
  &:hover {
    color: $bgPurple;
  }
  &.active {
    border-bottom: 2px solid #333;
    line-height: 23px;
  }
}

.search-link {
  display: none;
}
.menu-link {
  display: none;
}

.user-popover {
  display: flex;
}
.user-dialog {
  display: none;
}

.user-link {
  cursor: pointer;
  display: flex;
}

.head-logo {
  display: flex;
  align-items: center;
}

.head-connect {
  cursor: pointer;
  display: flex;
  padding: 0 15px;
  color: $color-white;
  background: $primaryColor;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  width: 140px;
  height: 48px;
  margin-left: 24px;
}
.wallet-link {
  border: none;
  width: 50px;
  padding: 0;
  height: 48px;
  .el-icon {
    font-size: 30px;
    font-weight: 600;
  }
}
.red-tip {
  position: absolute;
  cursor: pointer;
  top: 8px;
  height: 8px;
  width: 8px;
  right: -5px;
  background: #dd3b3b;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  padding: 1px 3px;
}

.popover-menu-item {
  display: flex;
  flex: 1;
  cursor: pointer;
  padding: 5px 0;
  font-size: 14px;
  color: #666;
  &.active {
    color: $primaryColor;
  }
}

.chain-item {
  grid-column-gap: 8px;
  background: #fff;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  display: grid;
  grid-template-columns: 22px 1fr 6px;
  height: 48px;
  padding: 12px;
  place-items: center start;
  font-weight: 600;
  &.active,
  &:hover {
    background: #f4f7f9;
  }
  &.two {
    grid-template-columns: 1fr 6px;
  }
  &.active {
    .item-dot {
      background: #00926f;
    }
  }
  .svg-icon {
    width: 22px;
    height: 22px;
  }
  .item-dot {
    background: #fff;
    border-radius: 50%;
    height: 6px;
    width: 6px;
  }
}
.notify-num {
  border-radius: 7px;
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  height: 15px;
  left: 12px;
  line-height: 10px;
  padding: 2px 4px;
  position: absolute;
  text-align: center;
  top: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background: #e25555;
  border: 1px solid #fff;
  color: #fff;
}
</style>
