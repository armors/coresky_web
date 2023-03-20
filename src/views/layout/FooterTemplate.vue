<template>
  <div class="footer-wrapper">
    <div class="footer-box display-flex box-center-Y box-between">
      <div class="box-flex1">
        <div class="display-flex box-center-Y">
          <div class="logo-black">
            <img src="../../assets/images/bottom_logo.svg" alt="" />
          </div>
          <!-- <div class="project-desc">{{$t('footer.projectDesc')}}</div> -->
        </div>
        <div class="display-flex link-box">
          <div class="display-flex box-center-Y item-list">
            <a class="item-box" target="_blank" href="https://docs.coresky.com/">{{ $t("footer.itemDocs") }}</a>
            <a class="item-box" target="_blank" href="https://f.coresky.com/file/AuditReport.pdf">{{
              $t("footer.itemAuditReport") }}</a>
            <!-- <div class="item-box">{{$t('footer.itemJobs')}}</div> -->
            <!-- <div class="item-box">{{$t('footer.itemDeveloper')}}</div> -->
            <!-- <div class="item-box">{{$t('footer.itemAPI')}}</div> -->
            <!-- <div class="item-box">{{$t('footer.itemCommunity')}}</div> -->
            <a href="https://f.coresky.com/file/PrivacyPolicy.pdf" target="_blank" class="item-box">{{
              $t("footer.itemPrivacyStatement") }}</a>
            <a href="https://f.coresky.com/file/TermsService.pdf" target="_blank" class="item-box">{{
              $t("footer.itemTermsService")
            }}</a>
          </div>
          <div class="display-flex box-center-Y link-right">
            <div>{{ $t("footer.itemCommunity") }}</div>
            <div class="media-list display-flex box-center-Y">
              <a class="media-item" v-for="(v, i) in mediaList" :key="`media-item-${i}`" :href="v.url" target="_blank">
                <!-- <el-tooltip class="item" effect="dark" :content="v.tip" placement="top"> -->
                <img :src="
                  require(`../../assets/images/icons/media/media_${v.name}_black.svg`)
                " alt="" />
                <!-- </el-tooltip> -->
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
export default {
  name: "FooterTemplate",
  data: function () {
    return {
      languagePopover: false,
      searchKey: this.$route.query.keyword,
      mediaList: [
        {
          url: "https://twitter.com/Coreskyofficial",
          name: "twitter",
          tip: 'website'
        },
        {
          url: "https://discord.gg/coresky",
          name: "discord",
          tip: 'website2'
        },
        {
          url: "mailto:info@coresky.com",
          name: "email",
          tip: 'website'
        },
        // 'ins',
        // 'reddit',
        // 'youtube',
        // 'tiktok',
      ],
    };
  },
  computed: {
    share () {
      return this.$store.state.share;
    },
    connected () {
      return this.$store.state.connected;
    },
    user () {
      return this.$store.state.user;
    },
    locale () {
      return this.$i18n.locale;
    },
    language () {
      return this.$store.state.language;
    },
  },
  created () {
    // if (localStorage.getItem("locale") == "zh") {
    //   this.$store.state.language = "中文";
    // } else {
    //   this.$store.state.language = "English";
    // }
  },
  methods: {
    send () {
      var site_name = this.$store.state.name;
      location =
        "mailto:?cc=" +
        this.share.email.url +
        "&subject=" +
        site_name +
        "&body=email content";
    },
    open (name) {
      switch (name) {
        case "twitter":
          window.open(this.share.twitter.url);
          break;
        case "telegram":
          window.open(this.share.twitter.url);
          break;
        case "youtube":
          window.open(this.share.youtube.url);
          break;
      }
    },
    async searchClick () {
      this.$router.push({ name: "Search", query: { keyword: this.searchKey } });
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-wrapper {
  width: 100%;
  backdrop-filter: blur(28px);
  background-color: #fafaf8;
  height: 200px;

  .footer-box {
    margin: 0 auto;
    height: 200px;
    padding: 26px 40px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #717a83;

    .logo-black {
      width: auto;
      height: 30px;
    }

    .project-desc {
      margin-left: 20px;
      /* Body_3_regular */
      // color: $color;
    }

    .link-box {
      margin-top: 18px;
      justify-content: space-between;
    }

    .item-list {
      font-weight: 400;
      :hover {
        color: #1063e0;
      }
      height: 30px;
      .item-box+.item-box {
        margin-left: 30px;
      }
    }
    .link-right {
      .media-item {
        margin-left: 56px;
        display: flex;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        justify-content: center;
        img {
          width: 30px;
          height: auto;
          border-radius: 0;
        }

      }
      .media-item:hover {
        background: #fff;
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
      }
    }

  }
}
</style>
