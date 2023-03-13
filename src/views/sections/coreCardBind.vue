<template>
  <div class="CoreCardBind">
    <div class="page-content">
      <div class="title">
        Bind Corecard
      </div>
    </div>
  </div>
  <FooterTemplate />
</template>
<script>
import BigNumber from "bignumber.js";
import FooterTemplate from "@/views/layout/FooterTemplate";

import dayjs from 'dayjs';
import config from '@/config/index'
import { rowProps } from 'element-plus';
export default {
  mixins: [],
  name: 'CoreCardBind',
  components: {
    FooterTemplate
  },
  data () {
    return {
    };
  },
  watch: {
  },
  created () {
    this.init();
  },
  mounted () { },
  computed: {
    user: function () {
      var user = this.$store.state.user;
      return user;
    },
  },
  methods: {
    parseTime (time) {
      return dayjs(time * 1000).format('YYYY-MM-DD HH:mm')
    },
    init () {
      if (this.user && this.user.coinbase) {
      }
    },
    queryData () {
      this.isLoading = true
      this.$api("user.scoreDetail", this.queryParams).then((res) => {
        this.isLoading = false
        let data = res
        if (this.$tools.checkResponse(data)) {
          this.score = data.debug.score
          this.listCount = data.debug.detail.listCount
          this.dataList = data.debug.detail.listData
          this.queryParams.page = data.debug.detail.curPage
        }
      })
    },
  },
  beforeUnmount () {

  }
};
</script>
<style lang="scss" scoped>
.CoreCardBind {
  background-color: #E6E8EC;
  min-height: calc(100vh - $headerHeight - $bottomHeight);
  .page-content {
    width: 1080px;
    margin: 30px auto;
    background: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    .title {
      height: 85px;
      margin: 0 50px;
      display: flex;
      font-size: 30px;
      display: flex;
      
    }
  }
}
</style>


