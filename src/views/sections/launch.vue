<template>
  <div class="launch-wrap">
    <div class="launch-center">
      <div class="launch-logo">
        <img src="/launch/logo.png" alt="">
      </div>
      <div class="txt1">
        The most valuable NFT trading platform in the market.
      </div>
      <div class="txx2">
        <span>2023</span>
        <span>02</span>
        <span>28</span>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>
<script>
import BigNumber from "bignumber.js";
import FooterTemplate from "@/views/layout/FooterTemplate";

import dayjs from 'dayjs';
import config from '@/config/index'
import { rowProps } from 'element-plus';
export default {
  mixins: [],
  name: 'launch',
  components: {
  },
  data () {
    return {
    };
  },
  watch: {
  },
  created () {
  },
  mounted () { },
  computed: {

  },
  methods: {
  },
  beforeUnmount () {

  }
};
</script>
<style lang="scss" scoped>
.launch-wrap {
  width: 100%;
  height: 100vh;
  background: #2F57E5;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  .launch-center {
    width: 1200px;
    .launch-logo {
      width: 612.84px;
      height: 151.02px;
      margin: 0 auto;
    }
    .txt1 {
      text-align: center;
      text-transform: capitalize;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 32px;
      line-height: 150%;
      margin-top: 46px;
    }
  }
}
</style>


