<template>
  <div class="profile-page">
    <div class="profile-wrapper">
      <div class="top">
        <div class="top-Row1" :class="{ 'active': tabName === 'general' }" @click="setTab('general')">{{
          $t('profile.editProfile') }}</div>
        <div class="top-Row1" :class="{ 'active': tabName === 'usercardlist' }" @click="setTab('usercardlist')">{{
          $t('profile.userCardList') }}</div>
      </div>
      <general v-if="tabName === 'general'" />
      <userCardList v-if="tabName === 'usercardlist'" />
    </div>
  </div>
  <FooterTemplate />
</template>

<script>
import { onMounted, ref } from "vue";
import { getLocalStorage } from "../../util/local-storage";
import store from "@/store";
import general from './components/setting/general'
import userCardList from './components/setting/userCardList'
import { throwStatement } from '@babel/types';
import FooterTemplate from "@/views/layout/FooterTemplate";

export default {
  name: "Profile",
  components: {
    general,
    userCardList,
    FooterTemplate
  },
  data: function () {
    return {
      tabName: 'general',

    };
  },
  created () {
    this.init()
  },
  watch: {
    tag (val) {
      this.init()
    },
  },
  computed: {
    tag () {
      return this.$route.query.tab
    },
    user () {
      return this.$store.state.user;
    },
  },
  methods: {
    setTab (name) {
      let path = this.$route.path
      this.$router.push({
        path,
        query: { tab: name }
      })
      this.tabName = name
    },
    init () {
      if (this.$route.query.tab === 'usercardlist') {
        this.tabName = this.$route.query.tab
      }
      else {
        this.tabName = 'general'
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.profile-page {
  background-color: #E6E8EC;
  min-height: calc(100vh - $headerHeight - $bottomHeight);
  padding: 30px 0;
}
.profile-wrapper {
  width: 1080px;
  margin: 0 auto;
  background: #FFFFFF;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  height: 100%;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
}

.top {
  padding-bottom: 10px;
  border-bottom: 1px solid $borderBg;
  display: flex;
}

.top-Row1 {
  font-size: 30px;
  font-weight: bold;
  line-height: 66px;
  color: #717A83;
  cursor: pointer;
  margin-right: 30px;
  &.active {
    color: #04142A;
  }

}
</style>]