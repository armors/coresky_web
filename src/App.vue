<template>
  <div class="app-wrapper" ref="appWrapperRef" @scroll="pageScroll">
    <HeaderTemplate :isScrollTop="isScrollTop" />
    <router-view />
    <FooterTemplate />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import HeaderTemplate from "./views/layout/HeaderTemplate";
import HeaderTemplateNew from "./views/layout/HeaderTemplateNew";

import BodyTemplate from "./views/layout/BodyTemplate";
import FooterTemplate from "./views/layout/FooterTemplate";

export default {
  name: "App",
  beforeCreate: async function () {
    await this.$store.dispatch("config");
    // await this.$store.dispatch("categorys");
    // await this.$store.dispatch("payTokens");
    // this.$store.dispatch("countNotices");
    this.$store.commit("WEB_LOADING", true);
  },
  data () {
    return {
      isRouterAlive: true,
      isScrollTop: true,
    };
  },
  computed: {
    user () {
      return this.$store.state.user;
    },
    ...mapState({
      currentView: (state) => state.currentView,
    }),
    webLoading () {
      return this.$store.state.webLoading;
    },
    layout () {
      return this.$route.meta.layout || 'default'
    }
  },
  components: {
    HeaderTemplate,
    BodyTemplate,
    FooterTemplate,
    HeaderTemplateNew,
  },
  watch: {
    $route (newRoute) {
      this["changeCurrentRouteTo"](newRoute);
      this["setCurrentView"](newRoute);
      // newRoute.meta.layout || 'defalut'
      // console.log(newRoute)
    },
    user (val1, val2) {
      if (val1.coinbase != val2.coinbase && this.user.coinbase) {
        this.reload();
      }
    }
  },
  mounted () {
    this["changeCurrentRouteTo"](this.$route);
    this["setCurrentView"](this.$route);
    // setTimeout(() => {
    //   this.initWeb3()
    // }, 300);
    console.log(this.$route)
    // this.$refs.appWrapperRef.addEventListener
  },
  destroyed () {
    clearInterval(this.$store.state.heartbeatTimer)
  },
  methods: {
    pageScroll () {
      let scrollTop = this.$refs.appWrapperRef.pageYOffset ||
        this.$refs.appWrapperRef.scrollTop ||
        document.body.scrollTop;
      if (scrollTop) {
        if (scrollTop > 3) {
          this.isScrollTop = false
        } else {
          this.isScrollTop = true
        }
      } else if (scrollTop === 0) {
        this.isScrollTop = true
      }
    },
    reload () {
      this.isRouterAlive = false;
      this.$store.dispatch("authinfo")
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    async connectWalletE () {
      let connected = this.$web3.checkWeb3();
      console.log('connectWalletE', connected)
      if (!connected) {
        setTimeout(() => {
          this.connectWalletE()
        }, 1000)
      } else {
        if (connected) {
          this.$web3.changeNetwork(this.$tools.network())
          let result = await this.$store.dispatch("connectAndSign");
          console.log(result)
          // 连接成功，则重新加载用户信息
          // this.$store.dispatch("reload");
          // this.$store.dispatch("authinfo");
        }
      }
    },
    initWeb3 () {
      // console.log('initWeb3')
      // var connected = this.$web3.checkWeb3();
      // let result = await this.$store.dispatch("connectAndSign");
      // console.log(result)

      this.connectWalletE()
      // let connected = this.$web3.checkWeb3();
      // if (!connected) {
      //   setTimeout(() => {
      //     let connected = this.$web3.checkWeb3();
      //   })
      // } else {
      //   if (connected) {
      //     let result = await this.$store.dispatch("connectAndSign");
      //     // 连接成功，则重新加载用户信息
      //     // this.$store.dispatch("reload");
      //     // this.$store.dispatch("authinfo");
      //   }
      // }

    },
    ...mapActions(["changeCurrentRouteTo", "setCurrentView"]),
  },
};
</script>


<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
.router-view {
  width: 100%;
  height: auto;
  // position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  margin-top: -76px;
  -webkit-overflow-scrolling: touch;
}
.app-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  overflow-y: auto;
}
</style>

<style lang="scss">
</style>
