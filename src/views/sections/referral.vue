<template>
  <div>

  </div>
</template>
<script>

export default {
  mixins: [],
  name: 'referral',
  components: {
  },
  data () {
    return {
      activeName: 'mining',
      dataList: [
      ],
      queryParams: {
        page: 1,
        limit: 10,
        address: '',
      },
      score: '',
      isLoading: false,
      listCount: 0,
    };
  },
  watch: {
  },
  created () {
    localStorage.setItem('inviteCode', this.$route.params.code)
    this.$router.replace('/')
  },
  mounted () { },

  methods: {

    init () {
      if (this.user && this.user.coinbase) {
        this.queryParams.address = this.user.coinbase
        this.queryParams.page = 1
        this.queryData()
      }
    },

  },
  beforeUnmount () {

  }
};
</script>
<style lang="scss" scoped>
.reward-wrapper {
  .banner-wrap {
    height: 197px;
    background: linear-gradient(180deg, #ECEFFC 0%, rgba(231, 234, 245, 0) 100%);
    // background: linear-gradient(133deg, #ece4ff 0%, #ddf1f8 100%) #e9e6fe;
    .btn {
      width: 140px;
      height: 48px;
      // background: #7d47ff;
      border-radius: 12px;
    }
    .banner-txt-box {
      width: 1280px;
      height: 197px;
      margin: 0 auto;
      background: url('@/assets/images/reward-bg.png') no-repeat;
    }
    .banner-txt {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      height: 100%;
      position: relative;
      .txt1 {
        margin-top: 52px;
        height: 41px;
        font-size: 32px;
        font-weight: bold;
        color: #000000;
        line-height: 41px;
      }
      .txt2 {
        margin-top: 10px;
        margin-bottom: 20px;
        height: 18px;
        font-size: 14px;
        color: rgba(46, 46, 46, 0.6);
        line-height: 18px;
      }
      .image {
        position: absolute;
        right: 0;
        top: 0;
        width: 408px;
        height: 100%;
      }
    }
  }
  .page-center {
    width: 1200px;
    margin: 0 auto;
  }
  .title1 {
    margin: 40px 0;
    height: 29px;
    font-size: 30px;
    font-weight: 600;
    color: #000000;
    line-height: 35px;
    .sub-title {
      font-size: 18px;
      margin-left: 5px;
      color: rgba(0, 0, 0, 0.3);
    }
  }
  .card-list {
    margin-top: 40px;
    display: grid;
    grid-gap: 15px;
    grid-template-rows: auto auto;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    .card-item {
      position: relative;
      width: 1200px;
      height: 393px;
      background: #ededed;
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;

      .item-content {
        width: 780px;
        height: 62px;
        margin: 0 auto;
        margin-top: 145px;
        position: relative;

        font-weight: 800;
        font-size: 50px;
        line-height: 150%;
        color: #04142A;
        display: flex;
        align-items: center;
        transition: all 0.3s ease-out;
        z-index: 1;
        &:hover {
          color: #1063E0;
          .btn-right {
            margin-left: 50px;
          }
        }

        .btn-right {
          width: 50px;
          height: 50px;
          margin-left: 30px;
          transition: all 0.3s ease-out;
        }
      }


      .image {
        position: absolute;
        left: 0;
        border: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  .mytable {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  ::v-deep {
    .el-tabs__header.is-top {
      margin-bottom: 0;
    }
    .el-tabs__item {
      padding: 0 20px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: $color-black2;
      height: 40px;
      &.is-active {
        color: $primaryColor;
      }
    }
    .el-tabs__active-bar {
      height: 3px;
    }
    .el-table__header th {
      height: 18px;
      font-size: 12px;
      font-weight: 600;
      color: #717A83;
      line-height: 18px;
    }
    .el-table__body-wrapper tr {
      height: 60px;
    }
  }
}
</style>


