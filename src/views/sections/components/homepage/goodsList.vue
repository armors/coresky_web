<!--
 * @Author: zhaoyan
 * @Date: 2023-02-18 16:37:58
 * @LastEditors: zhaoyan
 * @LastEditTime: 2023-02-21 18:29:32
 * @Description: 首页中间列表轮播
-->
<template>
  <!-- <GoodsListEvery :arrList="nftList.recommendCollection" :title="$t('home.topTitle1')" /> -->
  <test :arrList="nftList.recommendCollection" :title="$t('home.topTitle1')" />
  <test :arrList="nftList.popularCollection" :title="$t('home.trendingNow')" />
</template>

<script>
import GoodsListEvery from "./goodsList-every";
import test from "./test";

export default {
  name: "goodsList",
  components: {
    GoodsListEvery,
    test
  },
  data () {
    return {
      loadStatus: false,
      nftList: {
        recommendCollection: [],
        popularCollection: []
      }
    };
  },
  created () { },
  mounted () {
    this.getNftList();
  },
  methods: {
    getNftList () {
      if (this.loadStatus) return;
      this.loadStatus = true;
      var data = {
        page: 1,
        limit: 10,
      };
      this.$api("home.list", data).then((res) => {
        console.log(res);
        this.loadStatus = false;
        if (this.$tools.checkResponse(res)) {
          this.nftList = res.debug;
          // let arr = JSON.parse(JSON.stringify(res.debug.recommendCollection))
          // this.nftList.recommendCollection.push(...arr)
        } else {
          this.$tools.message(res.errmsg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>