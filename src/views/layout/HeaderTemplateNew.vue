<template>
  <div class="page-header">
    <div class="header-container" :style="style">
      <router-link to="/" class="head-logo header-margin-r">
        <img fit="contain" class="logo-image" :src="require('../../assets/images/logo_black.svg')" />
      </router-link>
      <div class="header-search">
        <el-input class="search-input-wrap" v-model="keyword" @keyup.enter="searchClick"
          :placeholder="$t('navigation.searchTip')">
          <template #prefix>
            <svg-icon icon-class="search" style="font-size: 16px;" />
          </template>
        </el-input>
      </div>
      <div class="head-navs">
        <router-link class="nav-link" to="/launchpads">
          {{ $t("navigation.launchpad") }}
        </router-link>
        <router-link class="nav-link" to="/markterplace">
          {{ $t("navigation.marketplace") }}
        </router-link>
        <router-link class="nav-link" to="/allcollection">
          {{ $t("navigation.collection") }}
        </router-link>
        <el-popover v-model:visible="languagePopover" placement="bottom" trigger="hover" :show-arrow="false"
          popper-class="nav-popover">
          <template #reference>
            <svg-icon class="head-icon" icon-class="yuyan" style="font-size:20px" />
          </template>
          <div class="popover-menu-item" @click="languageSelect('English')" :class="language =='English' ? 'active':''">
            English</div>
          <div class="popover-menu-item" @click="languageSelect('中文')" :class="language =='中文' ? 'active':''">中文</div>
        </el-popover>
      </div>
      <div class="head-menus">
        <svg-icon class="head-icon" icon-class="qingtian" @click="toggleDark" />
        <svg-icon class="head-icon" @click="showShoppingCartDrawer=true" icon-class="gouwuche" style="margin-left:0;font-size: 24px;" />

        <div class="head-connect" v-if="!connected || !token" @click="login">
          {{ $t("navigation.connectWallet") }}
        </div>
        <div class="user-link header-margin-l" v-else>
          <div class="user-popover">
            <!-- <profile-popover></profile-popover> -->
            <div class="user-avatar" @click="showUserDrawer=true">
<!--              <avatar class="avatar-img" :imageUrl="user.avatar || $filters.fullImageUrl(user.avatar)"-->
<!--                :address="user.coinbase" :imgWidth="40" :imgHeight="40" shape="circular">-->
<!--              </avatar>-->
              <div class="avatar-img">
                <img :src="user.avatar || $filters.fullImageUrl(user.avatar)" alt="">
              </div>
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
  name: "HeaderTemplateNew",
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
    token () {
      console.log('this.$store.state.token', this.$store.state.token)
      return this.$store.state.token;
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
    this.isDark = useDark({
      attribute: 'theme',
      valueDark: 'dark',
      valueLight: 'light',
    })
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
      const isDark = useDark({
        attribute: 'theme',
        valueDark: 'dark',
        valueLight: 'light',
      })
      useToggle(isDark)
      this.isDark = !this.isDark
    },
    handleScroll () {
      // let scrollTop = window.pageYOffset ||
      //   document.documentElement.scrollTop ||
      //   document.body.scrollTop;
      // if (scrollTop) {
      //   if (scrollTop < 112) {
      //     this.style.backgroundColor = `rgba(255, 255, 255,${scrollTop / (scrollTop + 112)})`;
      //   } else {
      //     this.style.backgroundColor = "#fff";
      //   }
      // } else if (scrollTop === 0) {
      //   this.style.backgroundColor = "transparent";
      // }
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

<style lang="scss" scoped>
.header-search {
  ::v-deep {
    .search-input-wrap {
      width: 360px;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      align-items: center;
      font-size: 12px;
      .el-input__wrapper {
        background-color: var(--page-head-bg2);
        .el-input__inner {
          color: var(--page-head-color1);
        }
      }
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
.page-header {
  padding: 0 25px;
  background: var(--page-head-bg1);
  display: flex;
  justify-content: space-between;
  .avatar-img {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .header-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 15px;
    line-height: 40px;
    height: 62px;
    color: $color-white;
  }
}

.head-navs {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}
.head-icon {
  cursor: pointer;
  font-size: 24px;
  color: var(--page-head-color1);
  margin: 0 10px;
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
.nav-link {
  position: relative;
  white-space: nowrap;
  color: var(--page-head-color4);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  margin-right: 20px;
  &:hover {
    color: var(--page-head-color4-hover);
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
  text-align: center;
  color: #ffffff;
  background: var(--page-head-btn-bg1);
  border-radius: 10px;
  font-size: 13px;
  font-weight: bold;
  width: 140px;
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
