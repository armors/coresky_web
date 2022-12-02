<template>
  <div class="account-wrap">
    <accountHead />
    <div class="account-page">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" :lazy="true">
        <el-tab-pane label="Collected" name="first">
          <accountCollected />
        </el-tab-pane>
        <el-tab-pane label="MyCollection" name="second">
          <accountCollection />
        </el-tab-pane>
        <el-tab-pane label="My Listing" name="third">
          <accountCollection />
        </el-tab-pane>
        <el-tab-pane label="My offer" name="fourth">My offer</el-tab-pane>
        <el-tab-pane label="Favorited" name="Favorited">Favorited</el-tab-pane>
        <el-tab-pane label="Trading History" name="Trading">Trading History</el-tab-pane>
        <el-tab-pane label="My Coupon" name="Coupon">My Coupon</el-tab-pane>
        <el-tab-pane label="My Launchpad" name="Launchpad">My Launchpad</el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>

import accountHead from './components/accountHead'
import accountCollected from './components/accountCollected'
import accountCollection from './components/accountCollection'
export default {
  name: "Items",
  mixins: [],
  components: {
    accountHead,
    accountCollected,
    accountCollection
  },
  data () {
    return {
      activeName: 'first'
    };
  },
  created () {
  },
  computed: {
    user () {
      return this.$store.state.user;
    },
  },
  watch: {

  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>
.account-page {
  width: 1200px;
  margin: 0 auto 40px;
  ::v-deep {
    .el-tabs__item {
      font-family: 'Plus Jakarta Display';
      padding: 0 20px;
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;
      color: $color-black2;
      height: 44px;
      &.is-active {
        color: $primaryColor;
      }
      &.is-top:nth-child(2) {
        padding-right: 20px;
      }
    }
    .el-tabs__active-bar {
      background-color: $bgPurple;
      height: 4px;
    }
  }
}
</style>
