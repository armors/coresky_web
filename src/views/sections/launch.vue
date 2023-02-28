<template>
  <div class="launch-wrap" :class="{ 'wait': stauts === 'wait', 'doing': stauts === 'doing' }"
    @keyup.enter.native="keyDown">
    <div class="launch-center" v-show="stauts === 'wait'">
      <div class="launch-logo">
        <img src="@/assets/launch/logo.png" alt="">
      </div>
      <div class="txt1">
        The most valuable NFT trading platform in the market.
      </div>
      <div class="txt2">
        <span>2023</span>
        <span>02</span>
        <span>28</span>
      </div>
      <div class="txt3">
        <span class="num">{{ timeHH }}</span>
        <span class="split">:</span>
        <span class="num">{{ timemm }}</span>
        <span class="split">:</span>
        <span class="num">{{ timess }}</span>
      </div>
      <div class="btn-wrap">
        <el-button type="primary" class="btn-launch" ref="btnLaunch" @keyup.enter.native="changeLaunch()"
          @click="changeLaunch()">Launch</el-button>
      </div>
    </div>
    <div class="launch-doing" v-show="stauts === 'doing'">
      <div class="mini-logo">
        <img src="@/assets/launch/min-logo.png" alt="">
      </div>
      <div class="txt4">
        TO THE MOON
      </div>
      <div class="down-box" :class="{ 'down': isTimeDown }">
        <!-- :class="'bg' + downNum" -->
        <div class="downNum" v-if="isStart === false">
          <img :src="require(`@/assets/launch/s${downNum}.png`)" alt="">
        </div>
        <div class="down-start" v-if="isStart === true">
          <img src="@/assets/launch/start.png" alt="">
        </div>
      </div>

    </div>
  </div>
  <div class="turn-off" :class="{ 'close': closeTurn }"></div>
</template>
<script>
import BigNumber from "bignumber.js";
import FooterTemplate from "@/views/layout/FooterTemplate";
import moment from 'moment'
import dayjs from 'dayjs';
import config from '@/config/index'
import { rowProps } from 'element-plus';
import { thisExpression } from '@babel/types';
import { data } from 'dom7';
export default {
  mixins: [],
  name: 'launch',
  components: {
  },
  data () {
    return {
      timeHH: '00',
      timemm: '00',
      timess: '00',
      stauts: 'wait',
      timeInterval: null,
      downNum: 5,
      downNumInterval: null,
      isTimeDown: false,
      isStart: false,
      closeTurn: false,
    };
  },
  watch: {
  },
  created () {
    this.init()
    // this.changeLaunch()
  },
  mounted () {
  },
  methods: {
    init () {
      this.timeInterval = setInterval(() => {
        this.timeHH = moment().format('hh')
        this.timemm = moment().format('mm')
        this.timess = moment().format('ss')
      }, 1000);
      document.addEventListener('keydown', this.keyDown);
    },
    keyDown (e) {
      var key = window.event ? e.keyCode : e.which;
      if (key === 13 || key === 32) {
        this.changeLaunch()
      }
    },
    changeLaunch () {
      this.stauts = 'doing'
      this.isTimeDown = true
      this.downNumInterval = setInterval(() => {
        if (this.downNum <= 1) {
          clearInterval(this.downNumInterval)
          this.isTimeDown = false

          setInterval(() => {
            this.isStart = true
            setTimeout(() => {
              this.closeTurn = true
              this.$nextTick(() => {
                setTimeout(() => {
                  location.href = '/'
                }, 1000);
              })
            }, 1000);
          }, 300)

        }
        else {
          this.downNum -= 1
        }
        console.log(this.downNum)
      }, 1000);
    }
  },
  beforeUnmount () {
    clearInterval(this.timeInterval)
    document.removeEventListener('keydown', this.keyDown);
  }
};
</script>
<style lang="scss" scoped>
.turn-off {
  position: fixed;
  background: #ffffff80;
  left: 0;
  width: 100vw;
  height: 0vh;
  z-index: 7;
  &::before,
  &::after {
    content: "";
    position: fixed;
    left: 0;
    top: 0;
    height: 0vh;
    background: #000;
    width: 100vw;
    transition: height 0.5s ease 0s;
  }
  &::after {
    top: inherit;
    bottom: 0;
  }
  &.close {
    height: 100vh;
  }

  &.close::before,
  &.close::after {
    transition: height 0.1s ease 0.1s;
    height: 49.98vh;
  }
}
.launch-wrap {
  width: 100%;
  height: 100vh;
  background: #2F57E5;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1.6s;
  // background: url('');
  &.wait {
    background: url(~@/assets/launch/bj01.jpg) center center no-repeat;
    background-position: center;
    background-size: cover;
  }
  &.doing {
    background: url(~@/assets/launch/bj02.jpg) center center no-repeat;
    background-position: center;
    background-size: cover;
    display: block;
  }
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
    .txt2 {
      margin-top: 36px;
      font-weight: 700;
      font-size: 40px;
      line-height: 125%;
      text-align: center;
      span {
        margin: 0 15px;
      }
    }
    .txt3 {
      display: flex;
      justify-content: center;
      line-height: 150%;
      font-size: 80px;
      text-align: center;
      .num {
        width: 150px;
      }
      .split {
        margin: 0 10px;
      }
    }
    .btn-wrap {
      text-align: center;
      margin-top: 57px;
    }
    .btn-launch {
      width: 360px;
      height: 100px;
      font-weight: 500;
      font-size: 32px;
      line-height: 150%;
      color: #1063E0;
      /* 灰色4 */
      background: #ffffff;
      border: 1px solid #D3D3D3;
      // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px -6px 4px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .launch-doing {
    margin: 0 auto;
    overflow: hidden;
    .mini-logo {
      width: 153px;
      height: 35px;
      margin: 40px auto 30px;
    }
    .txt4 {
      font-size: 60px;
      font-weight: 700;
      text-align: center;
    }
    .down-box {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 30px;
      &.down {
        .downNum img {
          animation: box-ligth 1s 0s infinite;
        }
      }
    }
    .downNum {
      background-repeat: no-repeat;
      background-position: center;
      background-size: auto 330px;
      display: block;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 300px;
        height: 386px;
        display: block;
      }

      &.bg0 {
        background-image: url(~@/assets/launch/s0.png);
      }
      &.bg1 {
        background-image: url(~@/assets/launch/s1.png);
      }
      &.bg2 {
        background-image: url(~@/assets/launch/s2.png);
      }
      &.bg3 {
        background-image: url(~@/assets/launch/s3.png);
      }
      &.bg4 {
        background-image: url(~@/assets/launch/s4.png);
      }
      &.bg5 {
        background-image: url(~@/assets/launch/s5.png);
      }
    }
    .down-start {
      text-align: center;
      animation: blink 0.25s 0s infinite;
      margin-top: 40px;
      img {
        width: 680px;
        height: 280px;
      }
    }
    @keyframes box-ligth {
      0% {
        // width: 300px;
        // height: 386px;
        // display: block;
        // width: 450px;
        // height: 578px;
        // display: block;
      }
      50% {
        // width: 450px;
        // height: 578px;
        // display: block;
        width: 450px;
        height: 578px;
        display: block;
      }
    }
    @keyframes blink {
      50% {
        opacity: 0;
      }
    }
  }
}

@media (max-width: 1512px) {
  .launch-wrap {
    width: 100%;
    height: 100vh;
    background: #2F57E5;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    // background: url('');
    &.wait {
      background: url(~@/assets/launch/bj01.jpg) center center no-repeat;
      background-position: center;
      background-size: cover;
    }
    .launch-center {
      width: 1200px;
      .launch-logo {
        width: 428px;
        height: 105px;
        margin: 0 auto;
      }
      .txt1 {
        text-align: center;
        text-transform: capitalize;
        color: #FFFFFF;
        font-weight: 700;
        font-size: 22px;
        line-height: 150%;
        margin-top: 32px;
      }
      .txt2 {
        margin-top: 25px;
        font-weight: 700;
        font-size: 28px;
        line-height: 125%;
        text-align: center;
        span {
          margin: 0 10px;
        }
      }
      .txt3 {
        display: flex;
        justify-content: center;
        line-height: 150%;
        font-size: 56px;
        text-align: center;
        .num {
          width: 105px;
        }
        .split {
          margin: 0 10px;
        }
      }
      .btn-wrap {
        text-align: center;
        margin-top: 40px;
      }
      .btn-launch {
        width: 252px;
        height: 70px;
        font-weight: 500;
        font-size: 22px;
        line-height: 150%;
        color: #1063E0;
        /* 灰色4 */
        background: #ffffff;
        border: 1px solid #D3D3D3;
        // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px -6px 4px rgba(0, 0, 0, 0.25);
        border-radius: 14px;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>


