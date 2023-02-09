<template>
  <div class="account-wrap">
    <accountHead :address="address" />
    <div class="account-page">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
        <el-tab-pane label="Collected" name="Collected" :lazy="true">
          <accountNFTs :address="address" />
        </el-tab-pane>
        <el-tab-pane label="Created" name="Created" :lazy="true">
          <accountCollection :address="address" />
        </el-tab-pane>
        <el-tab-pane label="Favorited" name="Favorited" :lazy="true">
          <accountFavorited :address="address" />
        </el-tab-pane>
        <el-tab-pane label="Watchlist" name="Watchlist" :lazy="true">
          <accountWatchlist :address="address" />
        </el-tab-pane>
        <el-tab-pane label="Activities" name="Activities" :lazy="true">
          <accountActivities :address="address" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>

import accountHead from './components/accountHead'
import accountNFTs from './components/accountNFTs'
import accountCollected from './components/accountCollected'
import accountCollection from './components/accountCollection'
import accountFavorited from './components/accountFavorited'
import accountWatchlist from './components/accountWatchlist'
import accountActivities from './components/accountActivities'
export default {
  name: "Items",
  mixins: [],
  components: {
    accountHead,
    accountCollected,
    accountCollection,
    accountFavorited,
    accountWatchlist,
    accountActivities,
    accountNFTs
  },
  data () {
    return {
      activeName: 'Collected'
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
    .el-tabs__header.is-top {
      margin-bottom: 0;
    }
    .el-tabs__item {
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
