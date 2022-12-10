<template>
  <div class="app-wrapper no-scroller">
    <div class="web-loading" v-if="!webLoading" v-loading.fullscreen.lock="!webLoading"></div>
    <div class="common-wraper no-scroller" v-else>
      <HeaderTemplate />
        <div class="widClass">
          <router-view v-if="isRouterAlive" :current-view="currentView" />
        </div>
      <FooterTemplate />
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import HeaderTemplate from "./views/layout/HeaderTemplate";
  import BodyTemplate from "./views/layout/BodyTemplate";
  import FooterTemplate from "./views/layout/FooterTemplate";

  export default {
    name: "App",
    beforeCreate: async function () {
      await this.$store.dispatch("config");
      // await this.$store.dispatch("categorys");
      // await this.$store.dispatch("payTokens");
      // this.$store.dispatch("countNotices");
      this.$store.commit("WEB_LOADING");
    },
    data () {
      return {
        isRouterAlive: true,
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
    },
    components: {
      HeaderTemplate,
      BodyTemplate,
      FooterTemplate,
    },
    watch: {
      $route (newRoute) {
        this["changeCurrentRouteTo"](newRoute);
        this["setCurrentView"](newRoute);
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
      setTimeout(() => {
        this.initWeb3()
      }, 300);
    },
    destroyed () {
      clearInterval(this.$store.state.heartbeatTimer)
    },
    methods: {
      reload () {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      },
      async connectWalletE () {
        let connected = this.$web3.checkWeb3();
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
    font-family: Montserrat-Regular;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .router-view {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
  }
  .app-wrapper {
    height: 100%;
  }
</style>

<style lang="scss">
  @import "./styles/variables";
  #home {
    width: 100%;
  }
  .common-wraper {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .widClass {
    width: 100%;
    padding-top: $headerHeight;
    min-height: 100vh;
  }
</style>

