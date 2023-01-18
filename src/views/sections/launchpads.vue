<template>
  <div class="launchpads-wrapper">
    <div class="head">
      <div class="title">Welcome to Coresky Launchpad !</div>
      <div class="title-sub">Coresky is a new generation NFT exchange. It aims to leading a new trend of NFT trading.
      </div>
      <div class="banner-wrap"
        :style=" topDatInfo.bannerImage ? 'background: url('+ topDatInfo.bannerImage +') no-repeat; background-size: cover;':'' ">
        <div class="name">{{ topDatInfo.name }}</div>
        <div class="txt">By Name of Creator</div>
        <div class="txt">
          <span>{{ numberParse(topDatInfo.total) }} items</span>
          <span style="font-weight: 600;margin: 0 5px;">·</span>
          <span>{{ numberParse(topDatInfo.price,4) }} {{  curToken }}</span>
        </div>
        <div class="time-wrap">
          <div class="item">
            <div class="num">{{countDownData.d||'--'}}</div>
            <div class="time-txt">DAYS</div>
          </div>
          <div class="split">:</div>
          <div class="item">
            <div class="num">{{countDownData.h||'--'}}</div>
            <div class="time-txt">HRS</div>
          </div>
          <div class="split">:</div>
          <div class="item">
            <div class="num">{{countDownData.m||'--'}}</div>
            <div class="time-txt">MINS</div>
          </div>
          <div class="split">:</div>
          <div class="item">
            <div class="num">{{countDownData.s||'--'}}</div>
            <div class="time-txt">SECS</div>
          </div>
        </div>
        <div class="icon-wrap">
          <a class="icon-item" target="_blank" :href="topDatInfo.website">
            <svg-icon icon-class="websit" />
          </a>
          <a class="icon-item" target="_blank" :href="topDatInfo.twitter">
            <svg-icon icon-class="twitter" />
          </a>
          <a class="icon-item" target="_blank" :href="topDatInfo.discord">
            <svg-icon icon-class="discord" />
          </a>
          <a class="icon-item" target="_blank" :href="topDatInfo.telegram">
            <svg-icon icon-class="telegram" />
          </a>
        </div>
        <div>
          <el-button class="btn-detail" @click="$router.push('/launchpad/'+topDatInfo.contract)" :dark="false" plain>
            More details >></el-button>
        </div>
      </div>
    </div>
    <div class="describe-wrap">
      <div class="describe-conter">
        <div class="item">
          <img src="@/assets/images/icons/launchpad/1.svg" alt="">
          <div class="item-title">How to Participate ?</div>
          <div class="item-txt">place to start is: what is Polkastarter? (We’ll give you the brief version).
            PolkastarterPolkastarterPolkastarterPolkastarter</div>
          <a href="" class="item-link">Learn more >></a>
        </div>
        <div class="item">
          <img src="@/assets/images/icons/launchpad/1.svg" alt="">
          <div class="item-title">How to Participate ?</div>
          <div class="item-txt">place to start is: what is Polkastarter? (We’ll give you the brief version).
            Polkastarter</div>
          <a href="" class="item-link">Learn more >></a>
        </div>
        <div class="item">
          <img src="@/assets/images/icons/launchpad/1.svg" alt="">
          <div class="item-title">How to Participate ?</div>
          <div class="item-txt">place to start is: what is Polkastarter? (We’ll give you the brief version).
            Polkastarter</div>
          <a href="" class="item-link">Learn more >></a>
        </div>
      </div>
    </div>
    <div class="soon-wrap">
      <div class="soon-title">Upcoming on Coresky Launchpad</div>
      <div class="soon-list">
        <div class="soon-item" v-for="(item,index) in showList" :key="index"
          @click="$router.push('/launchpad/'+item.contract)">
          <image-box :src="item.bannerImage">
          </image-box>
          <div class="soon-content">
            <div class="item-title">{{item.name}}</div>
            <div class="item-txt">
              <span>By</span><span class="purple">{{item.ownerName}}</span>
            </div>
            <div class="item-info">
              <div class="item-row">
                <div class="label">Price：</div>
                <div class="value">{{ numberParse(item.price,4) }} {{ item.token }}</div>
              </div>
              <div class="item-row">
                <div class="label">Items：</div>
                <div class="value">{{ numberParse(item.total) }}</div>
              </div>
              <div class="item-row">
                <div class="label">Community</div>
                <div class="min-icon-wrap">
                  <a class="icon-item" target="_blank" :href="item.website">
                    <svg-icon icon-class="websit" />
                  </a>
                  <a class="icon-item" target="_blank" :href="item.twitter">
                    <svg-icon icon-class="twitter" />
                  </a>
                  <a class="icon-item" target="_blank" :href="item.discord">
                    <svg-icon icon-class="discord" />
                  </a>
                  <a class="icon-item" target="_blank" :href="item.telegram">
                    <svg-icon icon-class="telegram" />
                  </a>
                </div>
              </div>
            </div>
            <div class="item-bottom">
              {{item.countDownData.d}}d : {{item.countDownData.h}}h : {{item.countDownData.m}}m :
              {{item.countDownData.s}}s
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-wrap">
      <div class="bottom-title">Become a partner and accelerate project development</div>
      <div class="sub-title">
        Our council and internal team of analysts vet projects via a strict due diligence process.
      </div>
      <div style="margin-top:40px">
        <el-button class="btn-partner" :dark="false" plain>Apply to be a partner</el-button>
        <el-button class="btn-join" :dark="false" plain>Apply to join lacunch</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import BigNumber from "bignumber.js";
import dayjs from 'dayjs';
import config from '@/config/index'
export default {
  mixins: [],
  name: 'launchpads',
  components: {},
  data () {
    return {
      topDatInfo: {},
      payment: {
        '0x0000000000000000000000000000000000000000': 'ETH',
        '0x55d398326f99059fF775485246999027B3197955': 'USDT'
      },
      tokenList: config.tokenList(),
      countDown: undefined,
      countDownData: {},
      showList: [],
      curToken: ''
    };
  },
  watch: {
  },
  created () {
    this.init();
  },
  mounted () { },
  computed: {
  },
  methods: {
    getTokenCoin (val) {
      let curToken = ''
      for (let key in this.tokenList) {
        if (this.tokenList[key] === val) {
          curToken = key
          break
        }
      }
      return curToken
    },
    //倒计时
    countDownFun (time) {
      let startTime = new Date(); //当前时间
      let end = new Date(time * 1000); //结束时间
      let result = parseInt((end - startTime) / 1000); //计算出豪秒
      let M = parseInt(result / (24 * 60 * 60 * 30)); //用总共的秒数除以月30天的秒数
      let d = parseInt(result / (24 * 60 * 60)); //用总共的秒数除以1天的秒数
      let h = parseInt((result / (60 * 60)) % 24); //精确小时，用去余
      let m = parseInt((result / 60) % 60); //剩余分钟就是用1小时等于60分钟进行趣余
      let s = parseInt(result % 60);
      //当倒计时结束时，改变内容
      if (result <= 0) {
        return null
      }
      if (M < 10) {
        M = "0" + M;
      }
      if (d < 10) {
        d = "0" + d;
      }
      if (h < 10) {
        h = "0" + h;
      }
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      return {
        M,
        d,
        h,
        m,
        s,
      }
    },
    numberParse (val, maxLen = 0) {
      let big = new BigNumber(new BigNumber(val).toFixed(maxLen, 1)).toFormat()
      return big
    },
    getTop () {
      this.$api("launchpad.query", {
        top: true,
        state: 1,
      }).then((res) => {
        if (res.debug.listData.length > 0) {
          const data = res.debug.listData[0]
          this.curToken = this.getTokenCoin(data.payment)
          this.topDatInfo = JSON.parse(JSON.stringify(data))
          if (this.topDatInfo.endTime * 1000 > new Date().getTime()) {

            this.countDown = setInterval(() => {
              let time = this.countDownFun(data.endTime)
              if (!!time) {
                this.countDownData = time
              }
              else {
                clearInterval(this.countDown);
                this.countDownData = { M: '00', d: '00', h: '00', m: '00', s: '00' }
              }
            }, 1000);
          }
        }
      })
    },
    getList () {
      this.$api("launchpad.query", {
        top: false,
        state: 0,
        page: 1,
        limit: 3,
      }).then((res) => {
        this.showList = res.debug.listData.map(el => {
          let that = this
          let obj = el
          obj.token = this.getTokenCoin(el.payment)
          console.log(this.getTokenCoin(el.payment))
          obj.countDownData = {}
          obj.countDown = setInterval(() => {
            let time = that.countDownFun(el.endTime)
            if (!!time) {
              obj.countDownData = time
            }
            else {
              clearInterval(obj.countDown);
              this.countDownData = { M: '00', d: '00', h: '00', m: '00', s: '00' }
            }
          }, 1000);
          return obj
        })
      })
    },
    init () {
      this.getTop()
      this.getList()
    },
  },
  beforeUnmount () {
    clearInterval(this.countDown)
    for (let i = 0; i < this.showList.length; i++) {
      clearInterval(this.showList[i].countDown);
    }
  }
};
</script>
<style lang="scss" scoped>
.launchpads-wrapper {
  .head {
    height: 640px;
    text-align: center;
    background: $primaryColor;
    padding-top: 40px;
    .title {
      display: inline-block;
      margin: 0 auto;
      height: 62px;
      font-size: 48px;
      line-height: 62px;
      font-weight: 700;
      background: linear-gradient(to right, #30e8b6, #9f77ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: rgba(0, 0, 0, 0);
    }
    .title-sub {
      margin-top: 20px;
      height: 28px;
      font-size: 16px;
      color: $color-white;
      line-height: 28px;
      text-align: center;
    }
    .banner-wrap {
      width: 1200px;
      height: 374px;
      margin: 55px auto 66px;
      padding-top: 67px;
      padding-left: 77px;
      border-radius: 20px;
      // position: relative;
      cursor: pointer;
      // background: url('https://i.seadn.io/gcs/files/6fb0f06880c8cf8a2dce9014073fb4ef.jpg?auto=format&w=3840');
      background-size: cover;
      background-position: center;
      object-fit: cover;
      color: $color-white;
      text-align: left;
      .name {
        height: 62px;
        font-size: 48px;
        font-weight: bold;
        line-height: 62px;
      }
      .txt {
        margin-top: 10px;
        height: 21px;
        font-size: 16px;
        font-weight: bold;
        line-height: 21px;
      }
    }
    .icon-wrap {
      position: absolute;
      top: 41px;
      right: 45px;
    }
  }
}
.time-wrap {
  margin-top: 30px;
}
.time-wrap {
  display: flex;
  color: $color-white;
  align-items: center;
  font-weight: 600;
  .item {
    padding-top: 10px;
    width: 52px;
    height: 52px;
    background-color: $bg-white2;
    border-radius: 10px;
    font-size: 14px;
    text-align: center;
    // opacity: 0.2;
    .num {
      font-size: 14px;
      margin-bottom: 2px;
    }
    .time-txt {
      font-size: 12px;
    }
  }
  .split {
    font-size: 20px;
    margin: 0 6px;
  }
}
.btn-detail {
  display: inline-block;
  width: 150px;
  margin-top: 20px;
  height: 48px;
  padding: 10px 0;
  border-radius: 12px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  color: $bgPurple;
  background: $bg-white;
  // &:hover {
  //   background: $mainLiner;
  // }
}
.icon-wrap {
  display: flex;
  .icon-item {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: $borderBg2;
    // text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 17px;
    font-size: 20px;
    cursor: pointer;
    .svg-icon {
      // font-size: 20px;
    }
  }
}
.min-icon-wrap {
  display: flex;
  .icon-item {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: $elButtonHoverBg;
    // text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 17px;
    font-size: 14px;
    cursor: pointer;
    .svg-icon {
      // font-size: 20px;
    }
  }
}
.describe-wrap {
  background: $bg-white3;
  height: 240px;
  .describe-conter {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 300px;
      text-align: center;
      padding-top: 30px;

      img {
        width: 40px;
        height: 40px;
        // display: block;
      }
      .item-title {
        font-size: 22px;
        line-height: 29px;
        color: $color-black;
        margin-top: 10px;
        font-weight: 600;
      }
      .item-txt {
        margin-top: 10px;
        height: 48px;
        font-size: 14px;
        font-weight: 400;
        color: $color-black3;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .item-link {
        margin-top: 12px;
        height: 18px;
        font-size: 14px;
        font-weight: 400;
        color: $bgPurple;
        line-height: 18px;
        cursor: pointer;
      }
    }
  }
}
.soon-wrap {
  margin: 0 auto;
  width: 1200px;
  .soon-title {
    margin-top: 50px;
    line-height: 50px;
    font-size: 38px;
    color: $color-black;
    margin-bottom: 40px;
    font-weight: 600;
  }
  .soon-list {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: auto auto;

    .soon-item {
      // height: 537px;
      border-radius: 20px;
      border: 1px solid $borderBg;
      overflow: hidden;
      .cover-image {
        width: 100%;
        height: 250px;
        cursor: pointer;
      }
      .soon-content {
        padding: 10px 20px 15px;
        .item-title {
          height: 36px;
          font-size: 28px;
          font-weight: 500;
          color: $color-black;
          line-height: 36px;
        }
        .item-txt {
          margin-top: 10px;
          height: 21px;
          font-size: 16px;
          color: $color-black;
          line-height: 21px;
          .purple {
            margin-left: 5px;
            color: $bgPurple;
          }
        }
        .item-info {
          margin-top: 20px;
          .item-row {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            .label {
              color: $color-black3;
            }
          }
        }
        .item-bottom {
          margin-top: 20px;
          width: 100%;
          height: 38px;
          line-height: 38px;
          background: $elButtonHoverBg;
          color: $color-black;
          border-radius: 8px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }
}
.bottom-wrap {
  margin: 40px auto 40px;
  width: 1200px;
  height: 378px;
  background: url('../../assets/images/lanunch-b.jpg') center no-repeat;
  padding: 60px 70px;
  .bottom-title {
    width: 680px;
    font-size: 38px;
    font-weight: 600;
    color: $color-white;
    line-height: 46px;
  }
  .sub-title {
    margin-top: 20px;
    width: 550px;
    height: 44px;
    font-size: 16px;
    font-family: AppleSystemUIFont;
    color: $color-white3;
  }
  .btn-partner,
  .btn-join {
    display: inline-block;
    width: 200px;
    margin-top: 20px;
    height: 50px;
    padding: 10px 0;
    border-radius: 12px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    color: $color-black;
    background: #30e8b6;
  }
  .btn-join {
    background: $bg-white;
  }
}
</style>


