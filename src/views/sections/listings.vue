<template>
  <div class="main-wrapper">
    <div>
      <div class="listings-head">
        <el-button class="btn-back" plain>
          <el-icon>
            <Back />
          </el-icon>
        </el-button>
        <span class="title">Cross-Market Listing</span>
      </div>
      <div class="nft-box">
        <image-box class="img-box" src="http://54.169.232.16:8083/nft/0x6c3dc05a3ee2f15e010d02a4a4daca8251cc7511/2.jpg">
        </image-box>
        <div class="box-center">
          <span class="tokenid">Bean #11566</span>
          <span class="collection-name">ENS: Ethereum Name Service
            <img class="tag" src="@/assets/images/icons/icon_tag.svg" alt="">
          </span>
        </div>
        <div style="margin-right: 30px;">
          <el-input-number :min="1" :max="999" />
        </div>
      </div>
      <div class="title2">
        NFT Marketplace
      </div>
      <div class="platform">
        <div class="item" :class="{'active':platformList.find(el => el.name === 'Coresky')}"
          @click="togglePlatform('Coresky')">
          <svg-icon class="platform-logo" icon-class="logo" />
          <span class="name">Coresky</span>
        </div>
        <div class="item" :class="{'active':platformList.find(el => el.name === 'Opensea')}"
          @click="togglePlatform('Opensea')">
          <svg-icon class="platform-logo" icon-class="os-logo" />
          <span class="name">Opensea</span>
        </div>
      </div>
      <div class="flex-com" style="">
        <div class="item">
          <span class="mr10">Same price </span>
          <el-switch v-model="isSamePrice" size="small" :active-value="true" :inactive-value="false" />
        </div>
        <div class="item" v-if="isSamePrice">
          <el-input v-model="samePrice" @change="samePriceChange" size="small" type="number" style="width:140px"
            class="input-with-select">
            <template #append>
              <el-select model-value="eth" placeholder=" " size="small" style="width:60px" :teleported="false">
                <el-option label="ETH" value="eth" />
              </el-select>
            </template>
          </el-input>
        </div>
        <div class="item">
          <span class="mr10">Auto Adjust for Fees </span>
          <el-switch v-model="isProceeds" size="small" :active-value="true" :inactive-value="false" />
        </div>
        <div style="margin-left: auto;">
          <div>
            <el-date-picker v-model="form.time" type="datetime" placeholder="Pick a Date" style=""
              format="YYYY-MM-DD HH:mm" :default-time="defaultTime" :disabled-date="disabledDate" />
            <el-select v-model="form.date" class="ml20" placeholder="Select" @change="dateChange"
              style="width:120px;flex-shrink: 0;">
              <el-option v-for="item in optionsDays" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
      </div>
      <el-table :data="dataList" style="width: 100%" class="mytable" header-row-class-name="head-row">
        <el-table-column prop="date" label="Market" width="180">
          <template #default="props">
            <div class="flex-m">
              <svg-icon class="platform-logo" v-if="props.row.name==='Coresky'" icon-class="logo" />
              <svg-icon class="platform-logo" v-if="props.row.name==='Opensea'" icon-class="os-logo" />
              <span>{{ props.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Item" label="List Price" width="200" :show-overflow-tooltip="true">
          <template #default="props">
            <el-input v-model="props.row.listPrice" size="small" type="number" style="width:140px"
              class="input-with-select" :teleported="false">
              <template #append>
                <el-select model-value="eth" placeholder=" " size="small" style="width:60px">
                  <el-option label="ETH" value="eth" />
                </el-select>
              </template>
            </el-input>
            <div class="txt1">
              <span>Floor:</span>
              <svg-icon class="token" icon-class="token_eth2" />
              <span class="item-name">0.0075</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="Last Sale">
          <template #default="props">
            <svg-icon class="token" icon-class="token_eth2" />
            <span class="item-name">0.0075</span>
          </template>
        </el-table-column>
        <el-table-column prop="Item" label="Fees" width="140">
          <template #default="props">
            0.5%
          </template>
        </el-table-column>
        <el-table-column label="Royalties">
          <template #default="props">
            0.5%
          </template>
        </el-table-column>
        <el-table-column prop="address" label="Proceeds">
          <template #default="props">
            <el-input v-model="props.row.proceeds" size="small" type="number" style="width:140px"
              class="input-with-select" :teleported="false">
              <template #append>
                <el-select model-value="eth" placeholder=" " size="small" style="width:60px">
                  <el-option label="ETH" value="eth" />
                </el-select>
              </template>
            </el-input>
          </template>
        </el-table-column>
        <template #empty>
          <div class="empty-wrap">
            <p class="txt">No Data</p>
            <img src="@/assets/images/no-data.png" alt="">
          </div>
        </template>
      </el-table>
      <div class="title3">
        Coupons:
      </div>
      <div class="coupons-wrap">
        <div class="txt1">
          Coupon rewadrds:
        </div>
        <div>
          <div class="txt2">
            1 coupon / 0.5eth
          </div>
          <div class="txt2 mt5">
            1 coupon / listing / day
          </div>
        </div>
      </div>
      <div class="btn-submit">Confirm the price</div>
    </div>
    <el-dialog :model-value="isShowDialog" :show-close="false" :close-on-click-modal="false"
      @closed="isShowDialog=false" class="custom-dialog" destroy-on-close>
      <template #title>
        <div class="left">
          <span>正在进行中的挂单</span>
        </div>
        <el-icon @click="isShowDialog=false">
          <Close />
        </el-icon>
      </template>
      <div>
        <el-steps direction="vertical" :active="3">
          <el-step>
            <template #title>
              <div class="txt1">
                授权收藏品
              </div>
            </template>
            <template #description>
              <div class="txt2">
                还剩余1个合集的授权
              </div>
              <div class="txt3">
                <el-icon class="success">
                  <SuccessFilled />
                </el-icon>
                <span>ENS: Ethereum Name Service for</span>
                <svg-icon icon-class="logo" />
              </div>
              <div class="txt3">
                <el-icon class="fail">
                  <CircleCloseFilled />
                </el-icon>
                <span>ENS: Ethereum Name Service for</span>
                <svg-icon icon-class="os-logo" />
              </div>
              <div class="txt3">
                <el-icon class="my-loading">
                  <Loading />
                </el-icon>
                <span>ENS: Ethereum Name Service for</span>
                <svg-icon icon-class="os-logo" />
              </div>
            </template>
          </el-step>
          <el-step>
            <template #title>
              <div class="txt1">
                上架签名
              </div>
            </template>
            <template #description>
              <div class="txt2">
                剩余0个签名
              </div>
              <div class="txt3">
                <el-icon class="success">
                  <SuccessFilled />
                </el-icon>
                <span>masturbat.eth</span>
                <svg-icon icon-class="logo" />
              </div>
              <div class="txt3">
                <el-icon class="fail">
                  <CircleCloseFilled />
                </el-icon>
                <span>masturbat.eth</span>
                <svg-icon icon-class="os-logo" />
              </div>
              <div class="txt3">
                <el-icon class="my-loading">
                  <Loading />
                </el-icon>
                <span>masturbat.eth</span>
                <svg-icon icon-class="os-logo" />
              </div>
            </template>
          </el-step>
          <el-step title="">
            <template #icon>
              <div></div>
            </template>
            <template #title>
            </template>
          </el-step>
        </el-steps>
      </div>
      <div>
        <el-button type="primary" class="btnOption" loading="true" >
          授权藏品</el-button>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import BigNumber from "bignumber.js";
import dayjs from 'dayjs';
import config from '@/config/index'
export default {
  mixins: [],
  name: 'listings',
  components: {},
  data () {
    return {
      optionsDays: [
        {
          value: 1,
          label: '1days',
        },
        {
          value: 3,
          label: '3days',
        },
        {
          value: 5,
          label: '5days',
        },
        {
          value: 7,
          label: '7days',
        }
      ],
      platformList: [],
      dataList: [{
        name: 'Coresky',
        logo: 'logo',
        coin: 'eth',
        listPrice: '',
      }, {
        name: 'Opensea',
        logo: 'os-logo',
        coin: 'eth',
        listPrice: ''
      }],
      isSamePrice: false,
      samePrice: '',
      isProceeds: false,
      defaultTime: new Date(),
      form: {
        time: ''
      },
      isShowDialog: true
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
    samePriceChange () {

      this.dataList.map(el => {
        console.log()
        el.listPrice = this.samePrice
      })
    },
    disabledDate (time) {
      return time.getTime() < Date.now()
    },
    dateChange () {
      this.form.time = dayjs().add(this.form.date, "day").format("YYYY-MM-DD HH:mm");
    },
    togglePlatform (name) {
      let obj = this.platformList.find(el => el.name === name)
      if (obj) {
        this.platformList = this.platformList.filter(el => el.name !== name)
      }
      else {
        this.platformList.push({ name })
      }
    },
    init () {
    },
  },
  beforeUnmount () {

  }
};
</script>
<style lang="scss" scoped>
// .main-wrapper {
//   ::v-deep .el-input__wrapper {
//     padding: 1px 5px;
//     --el-input-focus-border-color: #7d47ff;
//     --el-input-hover-border-color: #7d47ff;
//   }
// }
.mr10 {
  margin-right: 10px;
}
.mt5 {
  margin-top: 10px;
}
.listings-head {
  display: flex;
  align-items: center;
  .title {
    height: 41px;
    font-size: 32px;
    font-weight: bold;
    color: #000000;
    line-height: 41px;
  }
  .btn-back {
    margin-right: 10px;
    &:hover {
      border: 1px solid #dcdfe6;
      color: #000;
    }
    .el-icon {
      font-size: 18px;
    }
  }
}
.nft-box {
  width: 800px;
  display: flex;
  margin-top: 30px;
  padding: 14px;
  border: 1px solid $borderBg;
  border-radius: 12px;
  align-items: center;
  .img-box {
    width: 84px;
    height: 84px;
    border-radius: 10px;
    margin-right: 10px;
  }
  .box-center {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: self-start;
    .tokenid {
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      color: $primaryColor;
      margin-bottom: 5px;
      font-weight: 600;
    }
    .tag {
      width: 16px;
      height: 16px;
      display: inline-block;
      vertical-align: bottom;
      margin-left: 5px;
    }
  }
}
.title2 {
  margin: 30px 0 20px;
  height: 29px;
  font-size: 22px;
  font-weight: bold;
  color: #000000;
  line-height: 29px;
}
.title3 {
  margin: 30px 0 20px;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
}
.platform {
  display: flex;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 138px;
    margin-right: 20px;
    font-size: 14px;
    height: 44px;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid $borderBg;
    cursor: pointer;
    &.active {
      background: rgba(125, 71, 255, 0.04);
      border: 1px solid #7d47ff;
    }
    &:hover {
      border: 1px solid #7d47ff;
    }
  }
}
.platform-logo {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.flex-com {
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  .item {
    margin-right: 50px;
  }
}
.mytable {
  border: 1px solid $borderBg;
  border-radius: 10px;
  .flex-m {
    display: flex;
    align-items: center;
    min-height: 80px;
  }
  .txt1 {
    margin-top: 5px;
    font-size: 12px;
  }
}

::v-deep .el-table {
  .head-row th.el-table__cell {
    height: 50px;
    background-color: $elButtonHoverBg;
  }
  .el-input-group__append {
    // background-color: transparent;
  }
  .el-input__wrapper {
    padding: 1px 5px;
  }
  .el-input__inner {
    font-size: 12px;
    &::-webkit-input-placeholder {
      font-size: 12px;
    }
  }
}
.el-select-dropdown__item {
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.coupons-wrap {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 78px;
  background: $elButtonHoverBg;
  border-radius: 10px;
  border: 1px solid $borderBg;
  margin-bottom: 30px;
  .txt1 {
    height: 18px;
    font-size: 14px;
    color: $color-black2;
    line-height: 18px;
    margin-right: 20px;
  }
  .txt2 {
    height: 18px;
    font-size: 14px;
    color: #000000;
    line-height: 18px;
  }
}
.btn-submit {
  width: 320px;
  height: 44px;
  line-height: 44px;
  color: $color-white;
  background: $mainLiner;
  border-radius: 12px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 30px;
}
::v-deep {
  .custom-dialog {
    width: 480px;
    padding: 30px 30px;
    .txt1 {
      margin-bottom: 10px;
      height: 28px;
      font-size: 20px;
      font-weight: bold;
      color: #000000;
      line-height: 25px;
    }
    .txt2 {
      margin-bottom: 10px;
      height: 20px;
      font-size: 14px;
      color: #000000;
      line-height: 20px;
    }
    .txt3 {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      height: 18px;
      font-size: 14px;
      color: #000000;
      line-height: 18px;

      .el-icon,
      .svg-icon {
        font-size: 16px;
        margin-right: 5px;
        &.success {
          color: #17c586;
        }
        &.fail {
          color: #ff4949;
        }
      }
      .svg-icon {
        margin-left: 5px;
      }
    }
    .btnOption {
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
  }
}
.my-loading {
  color: #409eff;
  width: 16px;
  height: 16px;
  animation: icon-loading 2s infinite linear;
}
@keyframes icon-loading {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>


