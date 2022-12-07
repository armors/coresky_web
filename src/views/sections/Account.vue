<template>
  <div class="account-wrap">
    <accountHead :address="address" />
    <div class="account-page">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
        <el-tab-pane label="My NFTs" name="NFTs" :lazy="true">
          <accountNFTs :address="address" />
        </el-tab-pane>
        <el-tab-pane label="My Collections" name="Collections" :lazy="true">
          Collections
        </el-tab-pane>
        <el-tab-pane label="My Favorites" name="Favorites" :lazy="true">
          Favorites
        </el-tab-pane>
        <el-tab-pane label="My Listing" name="Listing" :lazy="true">
          Listing
        </el-tab-pane>
        <el-tab-pane label="My Activites" name="Activites" :lazy="true">My Activites</el-tab-pane>
        <!-- <el-tab-pane label="Favorited" name="Favorited">Favorited</el-tab-pane>
        <el-tab-pane label="Trading History" name="Trading">Trading History</el-tab-pane> -->
        <el-tab-pane label="My Coupons" name="Coupons" :lazy="true">My Coupon</el-tab-pane>
        <el-tab-pane label="My Launchpad" name="Launchpad" :lazy="true">My Launchpad</el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>

import accountHead from './components/accountHead'
import accountNFTs from './components/accountNFTs'
import accountCollected from './components/accountCollected'
import accountCollection from './components/accountCollection'
export default {
  name: "Items",
  mixins: [],
  components: {
    accountHead,
    accountCollected,
    accountCollection,
    accountNFTs
  },
  data () {
    return {
      activeName: 'NFTs'
    };
  },
  watch: {
    tag (val) {
      this.init()
    },
  },
  created () {
    this.init()
  },
  computed: {
    tag () {
      return this.$route.query.tag
    },
    address () {
      return this.$route.params.address
    }
  },
  methods: {
    init () {
      if (this.tag) {
        this.activeName = this.tag
      }
    },
    handleClick (val) {
      this.$router.push(`/account/${this.address}?tag=${this.activeName}`)
    }
  },
  mounted () {
    // this.init()
  }
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
