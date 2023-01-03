<template>
  <div class="launchpadItem-wrap">
    <div class="head">
      <image-box src="https://i.seadn.io/gcs/files/d54bb731a10636767f8ed4ba7eb9a4b9.png?auto=format&w=256">
      </image-box>
      <div class="title">TNOkibont</div>
      <svg-icon icon-class="tag_01" />
    </div>
    <div class="flex-wrap">
      <div class="flex-left">
        <div class="banner-wrap">
          <div class="box-img">
            <image-box
              src="https://storage.nfte.ai/asset/collection/featured/42673bda-bf33-439b-91a3-b4b005aa6ead.png?x-oss-process=image/resize,m_fill,w_504,h_252,limit_0" />
          </div>
          <div class="banner-swiper">
            <div class="banner-item">
              <image-box
                src="https://storage.nfte.ai/asset/collection/featured/9b32b83e-7194-4cb2-9229-0b78d3eae868.png?x-oss-process=image/resize,m_fill,w_504,h_252,limit_0" />
            </div>
            <div class="banner-item">
              <image-box
                src="https://storage.nfte.ai/asset/collection/featured/9b32b83e-7194-4cb2-9229-0b78d3eae868.png?x-oss-process=image/resize,m_fill,w_504,h_252,limit_0" />
            </div>
            <div class="banner-item">
              <image-box
                src="https://storage.nfte.ai/asset/collection/featured/9b32b83e-7194-4cb2-9229-0b78d3eae868.png?x-oss-process=image/resize,m_fill,w_504,h_252,limit_0" />
            </div>
            <div class="banner-item">
              <image-box
                src="https://storage.nfte.ai/asset/collection/featured/9b32b83e-7194-4cb2-9229-0b78d3eae868.png?x-oss-process=image/resize,m_fill,w_504,h_252,limit_0" />
            </div>
          </div>
        </div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
          <el-tab-pane label="Highlights" name="Highlights" :lazy="true">
            <div class="describe-txt" v-html="html">
            </div>
          </el-tab-pane>
          <el-tab-pane label="Team" name="Team" :lazy="true">
            <div class="describe-txt" v-html="html">
            </div>
            <image-box class="describe-img"
              src="https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840" />
            <div class="describe-txt" v-html="html">
            </div>
          </el-tab-pane>
          <el-tab-pane label="Roadmap" name="Roadmap" :lazy="true">
            Roadmap
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="flex-right">
        <div class="info-wrap">
          <div class="info-txt1">There is still time to start betting</div>
          <div class="time-wrap">
            <div class="item">
              <div class="num">0</div>
              <div class="time-txt">DAYS</div>
            </div>
            <div class="split">
              :
            </div>
            <div class="item">
              <div class="num">12</div>
              <div class="time-txt">HRS</div>
            </div>
            <div class="split">
              :
            </div>
            <div class="item">
              <div class="num">44</div>
              <div class="time-txt">MINS</div>
            </div>
            <div class="split">
              :
            </div>
            <div class="item">
              <div class="num">36</div>
              <div class="time-txt">SECS</div>
            </div>
          </div>
          <div class="flex-between">
            <div class="item">
              <div class="txt1">Launch price</div>
              <div class="txt2">0.08 ETH</div>
            </div>
            <div class="item">
              <div class="txt1">launch quantity</div>
              <div class="txt2">10,000</div>
            </div>
          </div>
          <div class="label-list">
            <div class="item">
              <div class="label">Number of lottery tickets in the prize pool: </div>
              <div class="val">189, 234</div>
            </div>
            <div class="item">
              <div class="label">Number of lottery tickets in the prize pool: </div>
              <div class="val">189, 234</div>
            </div>
            <div class="item">
              <div class="label">Number of lottery tickets in the prize pool: </div>
              <div class="val">189, 234</div>
            </div>
          </div>
          <div>
            <el-button type="primary" class="btnOption" @click="isShowAcceptDialog=false">查看中奖结果</el-button>
          </div>
          <div style="margin-top:34px;text-align: center;">
            <a target="_blank" class="link" href="http://www.baidu.com">开奖规则</a>
            <a target="_blank" class="link" href="http://www.baidu.com">服务条款</a>
          </div>
        </div>
        <div class="table-wrap">
          <div class="table-title">我的下注记录</div>
          <el-table :data="tableData2" height="250" style="width: 100%">
            <el-table-column align="left" prop="code" label="中奖号" width="120">
              <template #default="props">
                <a class="link">0012…6384</a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="num" label="投入彩票数" width="120" />
            <el-table-column align="center" prop="datetime" label="时间" />
          </el-table>
        </div>
        <div class="table-wrap">
          <div class="table-title">我的开奖记录</div>
          <el-table :data="tableData2" height="250" style="width: 100%">
            <el-table-column align="left" prop="code" label="中奖号" width="120">
              <template #default="props">
                <a class="link">00123747747575757…2757579283236384</a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="datetime" label="">
              <template #default="props">
                <a class="link">领奖</a>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: center;" v-if="tableData2.length>0">
            <el-button type="primary" class="btnOption small" @click="isShowAcceptDialog=false">一键领取奖励</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mixins: [],
  name: 'launchpadItem',
  components: {},
  data () {
    return {
      tableData2:[],
      tableData: [
        {
          code: '0012…6384',
          num: '5',
          datetime: '2022/9/10 14:00',
        },
      ],
      activeName: 'Highlights',
      html: `A good place to start is: what is Polkastarter? (We’ll give you the brief version). Polkastarter is a platform that connects young projects …A good place to start is: what is Polkastarter? (We’ll give you the brief version). Polkastarter is a platform that connects young projects A good place to start is: what is Polkastarter? (We’ll give you the brief version). Polkastarter is a platform that connects young projects A good place to start is: what is Polkastarter? (We’ll give you the brief version). Polkastarter is a 

platform that connects young projects A good place to start is: what is Polkastarter? (We’ll give you the brief version). Polkastarter is a platform that connects young projects A good place to start is: what is Polkastarter? (We’ll give you the brief version). Polkastarter is a platform that connects young projects A good place to start is: what is Polkastarter? (We’ll give you the brief version). Polkastarter is a platform that connects young projects A good place to start is: what is Polkastarter? (We’ll give you the brief version). Polkastarter is a platform that connects young projects `
    };
  },
  watch: {
  },
  created () {
    this.init();
  },
  mounted () { },
  computed: {
    showAddress () {
      return (search) => {
        var res =
          search.address.slice(0, 11) + "..." + search.address.slice(-4);
        return res;
      };
    },
    user: function () {
      var user = this.$store.state.user;
      return user;
    },
  },
  methods: {
    init () {

    },
  },
};
</script>
<style lang="scss" scoped>
.launchpadItem-wrap {
  width: 1200px;
  margin: 40px auto;
  .head {
    display: flex;
    align-items: center;
    .cover-image {
      border-radius: 50%;
      width: 100px;
      height: 100px;
    }
    .title {
      margin-left: 20px;
      font-size: 28px;
      font-weight: bold;
      color: $color-black;
    }
    .svg-icon {
      font-size: 26px;
      margin-left: 16px;
    }
  }
  .flex-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
    .flex-left {
      width: 630px;
      .banner-wrap {
        .box-img {
          width: 629px;
          height: 418px;
          background: #d8d8d8;
          border-radius: 24px;
          overflow: hidden;
          .cover-image {
            width: 100%;
            height: 100%;
          }
        }
        .banner-swiper {
          height: 96px;
          display: flex;
          margin-top: 14px;
          .banner-item {
            width: 146px;
            height: 100%;
            background: #d8d8d8;
            border-radius: 14px;
            overflow: hidden;
            margin-right: 15px;
            .cover-image {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .el-tabs {
        margin-top: 30px;
      }
      .describe-txt {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 400;
        color: $color-black3;
        line-height: 26px;
        white-space: pre-line;
      }
      .describe-img {
        margin-bottom: 20px;
        height: auto;
        width: auto;
        max-width: 100%;
        border-radius: 5px;
      }
    }
    .flex-right {
      width: 541px;
      .btnOption {
        margin-top: 20px;
        width: 100%;
        height: 48px;
        padding: 10px 0;
        border-radius: 24px;
        font-weight: 700;
        border: none;
        cursor: pointer;
        color: $color-white;
        background: $mainLiner;
        &:hover {
          background: $mainLiner;
        }
        &.small {
          height: 38px;
          border-radius: 19px;
          width: 280px;
        }
      }
      .info-wrap {
        width: 100%;
        height: 528px;
        padding: 30px 30px;
        border-radius: 20px;
        border: 1px solid $borderBg;
        .info-txt1 {
          font-size: 14px;
          color: $color-black2;
          line-height: 20px;
        }
        .time-wrap {
          display: flex;
          margin-top: 15px;
          color: $color-white;
          align-items: center;
          font-weight: 600;
          .item {
            padding-top: 15px;
            width: 78px;
            height: 78px;
            background-color: $bgPurple2;
            border-radius: 10px;
            font-size: 14px;
            text-align: center;
            // opacity: 0.2;
            .num {
              font-size: 20px;
              margin-bottom: 5px;
              color: $bgPurple;
            }
            .time-txt {
              font-size: 12px;
              color: $color-purple;
            }
          }
          .split {
            font-size: 20px;
            margin: 0 6px;
            color: $bgPurple;
          }
        }
        .flex-between {
          margin-top: 48px;
          display: flex;
          justify-content: space-between;
          .item {
            width: 228px;
            height: 75px;
            padding: 13px;
            background: $bg-black;
            border-radius: 10px;
            font-size: 16px;
            line-height: 22px;
            .txt1 {
              color: $color-black2;
            }
            .txt2 {
              margin-top: 6px;
              color: $color-black;
            }
          }
        }
        .label-list {
          margin-top: 32px;
          font-size: 14px;
          line-height: 18px;
          .item {
            display: flex;
            margin: 10px 0;
            justify-content: space-between;
            .label {
              font-size: 14px;
              font-weight: 400;
              color: $color-black4;
              line-height: 18px;
            }
            .val {
              color: $color-black;
            }
          }
        }

        .link {
          margin: 0 20px;
          line-height: 20px;
          color: $bgPurple;
        }
      }
      .table-wrap {
        margin-top: 30px;
        width: 100%;
        padding: 25px 20px;
        border-radius: 20px;
        border: 1px solid $borderBg;
        .table-title {
          line-height: 22px;
          font-size: 16px;
          text-align: center;
          margin-bottom: 25px;
          font-weight: 600;
        }
      }
    }
  }
}
::v-deep {
  .el-tabs__item {
    font-family: 'Plus Jakarta Display';
    padding: 0 30px;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    color: $color-black2;
    padding-bottom: 16px;
    height: 40px;
    &.is-active {
      color: $primaryColor;
    }
    &.is-top:nth-child(2) {
      padding-right: 30px;
    }
  }
  .el-tabs__active-bar {
    background-color: $bgPurple;
    height: 4px;
  }
}
</style>


