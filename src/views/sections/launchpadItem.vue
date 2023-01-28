<template>
  <div class="launchpadItem-wrap">
    <div class="head">
      <image-box :src="dataInfo.image">
      </image-box>
      <div class="title">{{dataInfo.name}}</div>
      <svg-icon icon-class="tag_01" v-if="dataInfo.isCertification==='1'" />
    </div>
    <div class="flex-wrap">
      <div class="flex-left">
        <div class="banner-wrap">
          <div class="box-img">
            <image-box :src="dataInfo.bannerImage" />
          </div>
          <div class="banner-swiper">
            <div class="banner-item" v-for="(item,index) in imageList" :key="index">
              <image-box :src="item" />
            </div>
          </div>
        </div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
          <el-tab-pane label="Highlights" name="Highlights" :lazy="true">
            <div v-for="(item,index) in introduceList" :key="index">
              <div class="describe-txt" v-if="item.type==='text'" v-html="item.content">
              </div>
              <el-image class="describe-img" :src="item.content" v-if="item.type==='image'" :initial-index="2000">
              </el-image>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Team" name="Team" :lazy="true">
            <div v-for="(item,index) in teamIntroList" :key="index">
              <div class="describe-txt" v-if="item.type==='text'" v-html="item.content">
              </div>
              <el-image class="describe-img" :src="item.content" v-if="item.type==='image'" :initial-index="2000">
              </el-image>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Roadmap" name="Roadmap" :lazy="true">
            <div v-for="(item,index) in roadmapList" :key="index">
              <div class="describe-txt" v-if="item.type==='text'" v-html="item.content">
              </div>
              <el-image class="describe-img" :src="item.content" v-if="item.type==='image'" :initial-index="2000">
              </el-image>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="flex-right">
        <div class="info-wrap">
          <div class="info-txt1">There is still time to start betting</div>
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
          <div class="flex-between">
            <div class="item">
              <div class="txt1">Launch price</div>
              <div class="txt2">{{ numberParse(dataInfo.price,4) }} {{ payment[dataInfo.payment] }}</div>
            </div>
            <div class="item">
              <div class="txt1">launch quantity</div>
              <div class="txt2">{{numberParse(dataInfo.total)}}</div>
            </div>
          </div>
          <div class="label-list">
            <div class="item">
              <div class="label">Number of lottery tickets in the prize pool: </div>
              <div class="val">{{ dataInfo.countInfo&&numberParse(dataInfo.countInfo.totalCount) }}</div>
            </div>
            <div class="item">
              <div class="label">Number of lottery tickets I have played : </div>
              <div class="val">{{ dataInfo.countInfo&&numberParse(dataInfo.countInfo.currentCount) }}</div>
            </div>
            <div class="item">
              <div class="label">Number of tickets I hold: </div>
              <div class="val">{{ dataInfo.countInfo&&numberParse(dataInfo.countInfo.myTotalCount) }}</div>
            </div>
          </div>
          <div>
            <el-button type="primary" :disabled="disabledBet" class="btnOption" @click="showLaunchpadBetDialog">
              Betting</el-button>
          </div>
          <div style="margin-top:34px;text-align: center;">
            <a target="_blank" class="link" :href="dataInfo.rewardLink">Lottery rules</a>
            <a target="_blank" class="link" :href="dataInfo.privacyLink">Privacy Policy</a>
          </div>
        </div>
        <div class="table-wrap">
          <div class="table-title">我的下注记录</div>
          <el-table :data="betList" height="250" style="width: 100%">
            <el-table-column align="left" prop="code" label="中奖号" width="160">
              <template #default="props">
                <div class="txt3" v-for="(item) in props.row.records" :key="item"><a
                    class="link">{{$filters.ellipsisAddress(item)}}</a></div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="listCount" label="投入彩票数" width="120" />
            <el-table-column align="center" prop="datetime" label="时间">
              <template #default="scope">
                {{ dateParse(scope.row.date) }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table-wrap">
          <div class="table-title">我的开奖记录</div>
          <el-table :data="winList" height="250" style="width: 100%">
            <el-table-column align="left" prop="code" label="中奖号">
              <template #default="scope">
                <a class="link">{{scope.row.uuid}}</a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="datetime" width="120">
              <template #default="scope">
                <el-button type="danger" :loading="scope.row.loading" link @click="mintNft(scope.row)">Mint</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div style="text-align: center;" v-if="winList.length>0">
            <el-button type="primary" class="btnOption small" @click="isShowAcceptDialog=false">一键领取奖励</el-button>
          </div> -->
        </div>
      </div>
    </div>
    <launchpadBetDialog ref="launchpadBetDialogRef" @launchpadBuy="getInfo()" />
  </div>
</template>
<script>
import BigNumber from "bignumber.js";
import dayjs from 'dayjs';
import launchpadBetDialog from './components/launchpadBetDialog'
export default {
  mixins: [],
  name: 'launchpadItem',
  components: { launchpadBetDialog },
  data () {
    return {
      dataInfo: {},
      roadmapList: [],
      teamIntroList: [],
      introduceList: [],
      // tableData2: [],
      payment: {
        '0x0000000000000000000000000000000000000000': 'ETH',
        '0x55d398326f99059fF775485246999027B3197955': 'USDT'
      },
      activeName: 'Highlights',
      countDown: undefined,
      countDownData: {},
      disabledBet: true,
      betList: [],
      winList: [],
      imageList: []
    }
  },
  watch: {
  },
  created () {
    this.init();
  },
  computed: {
    user () {
      return this.$store.state.user;
    },
  },
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
    contract: function () {
      return this.$route.params.item
    }
  },
  methods: {
    dateParse (time) {
      return dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss')
    },
    showLaunchpadBetDialog () {
      this.$refs.launchpadBetDialogRef.show(this.dataInfo)
    },
    numberParse (val, maxLen = 0) {
      let big = new BigNumber(new BigNumber(val).toFixed(maxLen, 1)).toFormat()
      return big
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
    getBetList () {
      this.$api("launchpad.bet", {
        contract: this.contract,
        state: 0,
      }).then((res) => {
        this.betList = res.debug.map(el => {
          el.loading = false
          return el
        })
      })
    },
    getwinList () {
      this.$api("launchpad.result", {
        contract: this.contract
      }).then((res) => {
        this.winList = res.debug
      })
    },
    getInfo () {
      this.$api("launchpad.info", {
        contract: this.contract,
      }).then((res) => {
        this.dataInfo = res.debug
        this.roadmapList = []
        this.teamIntroList = []
        this.introduceList = []
        this.imageList = res.debug.imageList
        if (!!this.dataInfo.roadmap) {
          this.roadmapList = JSON.parse(this.dataInfo.roadmap) || []
        }
        if (!!this.dataInfo.teamIntro) {
          this.teamIntroList = JSON.parse(this.dataInfo.teamIntro) || []
        }
        if (!!this.dataInfo.introduce) {
          this.introduceList = JSON.parse(this.dataInfo.introduce) || []
        }
        if (this.dataInfo.startTime * 1000 < new Date().getTime() && this.dataInfo.endTime * 1000 > new Date().getTime()) {
          this.disabledBet = false
        }
        else {
          this.disabledBet = true
        }
        this.getwinList()
        // if (this.dataInfo.rewardTime * 1000 < new Date().getTime()) {
        //   this.getwinList()
        // }
        if (this.dataInfo.endTime * 1000 > new Date().getTime()) {
          this.countDown = setInterval(() => {
            let time = this.countDownFun(this.dataInfo.endTime)
            if (!!time) {
              this.countDownData = time
            }
            else {
              clearInterval(this.countDown);
              this.countDownData = {
                M: '00',
                d: '00',
                h: '00',
                m: '00',
                s: '00',
              }
            }
          }, 1000);
        }
      })
    },
    mintNft (item) {
      if (this.dataInfo.payment !== '0x0000000000000000000000000000000000000000') {
        return this.mintERC20(item)
      }
      else {
        this.mintByETH(item)
      }
    },
    async mintByETH (item) {
      try {
        item.loading = true
        const price = 0
        if (this.dataInfo.payment === '0x0000000000000000000000000000000000000000') {
          price = this.$Web3.utils.toWei(this.dataInfo.price)
        }
        const launchpadContract = await this.$sdk.getLaunchpadContract()
        console.log(item.lpId, parseInt(item.lpIndex), 1, item.calldata, JSON.parse(item.proof), {
          from: this.user.coinbase,
          value: price
        })

        const result = await launchpadContract.claim(
          item.lpId,
          parseInt(item.lpIndex),
          1,
          item.calldata,
          JSON.parse(item.proof),
          {
            from: this.user.coinbase,
            value: price
          })
        this.$tools.message('success', 'success');
        item.loading = false
      }
      catch (ex) {
        this.$tools.message(ex.message);
        item.loading = false
      }
    },
    async mintERC20 (item) {
      try {


        item.loading = true
        // 获取代币账户wei
        const balance = await this.$sdk.getBalance({
          address: this.dataInfo.payment
        }, this.user.coinbase)
        const userBalance = this.$Web3.utils.fromWei(balance.toString(), 'ether')
        if (new BigNumber(userBalance).isLessThan(this.dataInfo.price)) {
          this.$tools.message('No Enough Balance Of WETH');
          item.loading = false
          return
        }
        // 获取授权
        const launchpadContract = '0xee45A094ad3CCE1A8171eb00Af6862893AbD7dC5'
        const allowancePayToken = await this.$sdk.allowancePayToken({
          type: 5,
          address: this.dataInfo.payment // weth token
        }, this.user.coinbase, launchpadContract)
        if (parseFloat(allowancePayToken) === 0) {
          const approve = await this.$sdk.approvePayToken({
            type: 5,
            address: this.dataInfo.payment
          }, this.user.coinbase, launchpadContract)
          if (typeof approve == "object" && approve.error) {
            item.loading = false
            return
          }
        }
        // let data = JSON.parse(JSON.stringify(item))
        // data.price = 0
        this.mintByETH(item)
        console.log('allowancePayToken', allowancePayToken)
      }
      catch (ex) {
        this.$tools.message(ex.message);
        item.loading = false
      }
    },
    init () {
      this.getInfo()
      this.getBetList()
    },
  },
  beforeUnmount () {
    clearInterval(this.countDown)
  }
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
          overflow-x: auto;
          .banner-item {
            flex: 0 0 auto;
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
        word-break: break-all;
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
.txt3 {
  color: $bgPurple;
  line-height: 24px;
}
</style>


