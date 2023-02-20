<!--
 * @Author: zhaoyan
 * @Date: 2023-02-18 16:37:58
 * @LastEditors: zhaoyan
 * @LastEditTime: 2023-02-19 10:04:34
 * @Description: 首页中间列表轮播
-->
<template>
  <GoodsListEvery :arrList="nftList.recommendCollection" :title="$t('home.topTitle1')" />
  <GoodsListEvery :arrList="nftList.popularCollection" :title="$t('home.trendingNow')" />
</template>

<script>
import GoodsListEvery from "./goodsList-every";
export default {
  name: "goodsList",
  components: {
    GoodsListEvery,
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
        limit: 5,
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

<style lang="scss" scoped>
</style>