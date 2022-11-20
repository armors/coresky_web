<template>
  <div class="footer-wrapper">
    <div class="footer-box display-flex box-center-Y box-between">
      <div class="box-flex1">
        <div class="display-flex box-center-Y">
          <div class="logo-white"><img src="../../assets/images/logo_white.svg" alt=""></div>
          <div class="project-desc">{{$t('footer.projectDesc')}}</div>
        </div>
        <div class="display-flex box-center-Y item-list">
          <div class="item-box">{{$t('footer.itemDocs')}}</div>
          <div class="item-box">{{$t('footer.itemAuditReport')}}</div>
          <div class="item-box">{{$t('footer.itemJobs')}}</div>
          <div class="item-box">{{$t('footer.itemDeveloper')}}</div>
          <div class="item-box">{{$t('footer.itemAPI')}}</div>
          <div class="item-box">{{$t('footer.itemCommunity')}}</div>
          <div class="item-box">{{$t('footer.itemPrivacyStatement')}}</div>
          <div class="item-box">{{$t('footer.itemTermsService')}}</div>
        </div>
      </div>
      <div class="footer-right">
        <div>{{$t('footer.joinCommunity')}}</div>
        <div class="media-list display-flex box-center-Y">
          <div class="media-item" v-for="(v, i) in mediaList" :key="`media-item-${i}`">
            <img :src="require(`../../assets/images/icons/media/media_${v}_white.svg`)" alt="">
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
        'twitter',
        'ins',
        'discord',
        'reddit',
        'youtube',
        'tiktok',
        'email',
      ]
    };
  },
  computed: {
    share(){
      return this.$store.state.share;
    },
    connected() {
      return this.$store.state.connected;
    },
    user() {
      return this.$store.state.user;
    },
    locale(){
      return this.$i18n.locale;
    },
    language() {
      return this.$store.state.language;
    }
  },
  created() {
    if (localStorage.getItem("locale") == "zh") {
      this.$store.state.language = "中文";
    } else {
      this.$store.state.language = "English";
    }
  },
  methods: {
    send() {
      var site_name = this.$store.state.name;
      location =
        "mailto:?cc=" +
        this.share.email.url +
        "&subject=" +
        site_name +
        "&body=email content";
    },
    open(name) {
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
    async searchClick() {
      this.$router.push({ name: "Search", query: { keyword: this.searchKey } });
    },
    languageSelect(parameter) {
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
.footer-search{
  .search-input {
    border-radius: 15px;
    overflow: hidden;
    background: #fff;
    height: 30px;
    color: black;
    display: flex;
    align-items: center;
    .el-input__inner {
      padding-left: 30px !important;
      height: 100%;
      border: none;
      background: #eeeeee6e;
    }
    .el-input__prefix {
      line-height: 30px;
    }
    .iconfont {
      font-size: 22px;
      font-weight: bold;
      color: #000;
    }
  }
}
</style>

<style lang="scss" scoped>
.footer-wrapper {
  width: 100%;
  backdrop-filter: blur(28px);
  background-color: $primaryColor;
  height: 111px;
  .footer-box{
    max-width: $maxWidth;
    margin: 0 auto;
    height: 100%;
    padding: 26px 0;
    font-family: 'Plus Jakarta Display';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: $color-white3;
    line-height: 1.5;
    .logo-white{
      width: 110px;
      height: 28.55px;
    }
    .project-desc{
      margin-left: 20px;
      /* Body_3_regular */
      color: $color-white4;
    }
    .item-list{
      margin-top: 10px;
      .item-box{
        cursor: pointer;
        line-height: 1.5;
      }
      .item-box + .item-box{
        margin-left: 30px;
      }
    }
    .footer-right{
      .media-list{
        margin-top: 12px;
        .media-item{
          cursor: pointer;
          width: 24px;
          height: 24px;
        }
        .media-item + .media-item{
          margin-left: 12px;
        }
      }

    }
  }
}


</style>
