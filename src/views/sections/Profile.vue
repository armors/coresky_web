<template>
  <div class="main-wrapper">
    <div class="profile-wrapper display-flex box-column">
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
</template>

<script>
import { onMounted, ref } from "vue";
import { getLocalStorage } from "../../util/local-storage";
import store from "@/store";
import general from './components/setting/general'
import userCardList from './components/setting/userCardList'
import { throwStatement } from '@babel/types';
export default {
  name: "Profile",
  components: {
    general,
    userCardList
  },
  data: function () {
    return {
      tabName: 'general',

    };
  },
  created () {
    let tab = this.$route.query.corecard
    if (this.$route.query.tab === 'usercardlist') {
      this.tabName = this.$route.query.tab
    }
  },
  computed: {
    user () {
      return this.$store.state.user;
    },
  },
  methods: {
    setTab (name) {
      this.tabName = name
    }
  },
};
</script>
<style lang="scss" scoped>
.main-wrapper{
  width: 1080px;
  padding: 0 50px;
}
.profile-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 100px;
}

.top {
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid $borderBg;
  display: flex;
}

.go-back {
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  line-height: 48px;
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