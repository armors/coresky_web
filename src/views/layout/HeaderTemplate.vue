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
        <router-link class="nav-link" to="/erc721">
          {{ $t("navigation.launchpad") }}
        </router-link>
        <router-link class="nav-link" to="/markterplace">
          {{ $t("navigation.marketplace") }}
        </router-link>
        <router-link class="nav-link" to="/allcollection">
          {{ $t("navigation.collection") }}
        </router-link>
        <router-link class="nav-link" to="/erc721">
          {{ $t("navigation.create") }}
        </router-link>
        <router-link class="nav-link" to="/erc721">
          {{ $t("navigation.ETH") }}
        </router-link>
        <!--        <router-link class="nav-link header-margin-r"-->
        <!--          :class="$route.name == 'Items' ? 'active' : ''"-->
        <!--          :to="!connected ? '/connect' : '/items'"-->
        <!--        >-->
        <!--          {{ $t("navigation.myItems") }}-->
        <!--        </router-link>-->

        <!--        <router-link v-if="connected"-->
        <!--          class="nav-link header-margin-r" to="/message?tab=unread"-->
        <!--          :class="$route.name == 'Message' ? 'active' : ''"-->
        <!--        >-->
        <!--          {{$t('navigation.news')}}-->
        <!--          <span v-if="message.unread" class="red-tip"></span>-->
        <!--        </router-link>-->
        <el-popover v-model:visible="languagePopover" placement="bottom" trigger="hover" :show-arrow="false"
          popper-class="nav-popover" :offset="-8">
          <template #reference>
            <el-button class="wallet-link">
              <img src="../../assets/images/icons/icon_lang.svg" alt="">
            </el-button>
            <!--            <div class="nav-link header-margin-r">-->
            <!--              &lt;!&ndash; {{$t('footer.language')}} &ndash;&gt;{{language}}-->
            <!--              <span class="iconfont icon-arrow-down bfont"></span>-->
            <!--            </div>-->
          </template>
          <div class="popover-menu-item" @click="languageSelect('English')" :class="language =='English' ? 'active':''">
            English</div>
          <div class="popover-menu-item" @click="languageSelect('中文')" :class="language =='中文' ? 'active':''">中文</div>
        </el-popover>
      </div>
      <div class="head-menus">
        <el-button class="wallet-link" @click="toggleDark">
          <img src="../../assets/images/icons/icon_sun.svg" alt="">
          <!--          <el-icon v-if="isDark"><Sunny /></el-icon>-->
          <!--          <el-icon v-else><Moon /></el-icon>-->
        </el-button>
        <!-- <router-link to="/erc721"> -->
        <el-button class="wallet-link" @click="showShoppingCartDrawer=true" style="margin-left:0">
          <img src="../../assets/images/icons/icon_cart.svg" alt="">
        </el-button>
        <!-- </router-link> -->

        <div class="head-connect display-flex box-center" v-if="!connected" @click="login">
          {{ $t("navigation.connectWallet") }}
        </div>

        <div class="user-link header-margin-l" v-else>
          <div class="user-popover">
            <!-- <profile-popover></profile-popover> -->
            <div class="user-avatar" @click="showUserDrawer=true">
              <avatar class="avatar-img" :imageUrl="user.avatar || $filters.fullImageUrl(user.avatar)" :address="user.coinbase"
                :imgWidth="40" :imgHeight="40" shape="circular">
              </avatar>
            </div>
          </div>
        </div>

      </div>
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
  },
  methods: {
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
  .avatar-img{
    width: 40px;
    height: 40px;
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
  margin-right: 20px;
  &:hover{
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
</style>
