<template>
  <el-dialog :model-value="isShowDialog" style="width:580px" :show-close="false" :close-on-click-modal="false"
    @closed="closed" custom-class="custom-dialog" destroy-on-close>
    <template #title>
      <div class="head">
        <image-box :src="dataInfo.image">
        </image-box>
        <div class="title">{{dataInfo.name}}</div>
        <svg-icon icon-class="tag_01" v-if="dataInfo.isCertification==='1'" />
      </div>
      <el-icon @click="isShowDialog=false">
        <Close />
      </el-icon>
    </template>
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
    <div class="txt3">
      Please enter the number of lottery tickets to bet on:
    </div>
    <el-form label-position="top" ref="form" class="custom-form" :rules="rules" :model="form">
      <el-form-item label="" prop="count">
        <el-input type="number" v-model="form.count" size="large" style="width:100%;" />
      </el-form-item>
    </el-form>
    <div class="txt4">
      Current number of lottery tickets held:：{{ dataInfo.countInfo&&numberParse(dataInfo.countInfo.myTotalCount) }}
    </div>
    <el-button type="primary" class="btnBuy" :loading="btnLoading" @click="launchpadBet">确认</el-button>
  </el-dialog>
</template>

<script>
import BigNumber from "bignumber.js";


export default {
  name: "launchpadBetDialog",
  data () {
    return {
      payment: {
        '0x0000000000000000000000000000000000000000': 'ETH',
        '0x55d398326f99059fF775485246999027B3197955': 'USDT'
      },
      isShowDialog: false,
      btnLoading: false,
      dataInfo: {

      },
      form: {
        contract: '',
        count: ''
      },
      rules: {
        count: [
          { required: true, message: "count required", trigger: "change" }
        ],
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user;
    }
  },
  methods: {
    numberParse (val, maxLen = 0) {
      let big = new BigNumber(new BigNumber(val).toFixed(maxLen, 1)).toFormat()
      return big
    },
    launchpadBet () {
      this.$refs["form"].validate(valid => {
        console.log(valid)
        if (!valid) return
        this.$api("launchpad.buy", {
          contract: this.form.contract,
          count: this.form.count
        }).then((res) => {
          if (res.code === 200) {
            this.$emit('launchpadBuy')
            this.$tools.message('success', 'success');
            setTimeout(() => {
              this.isShowDialog = false
            }, 500);

          }
          else {
            this.$tools.message(res.message, 'error');
          }
        })
      })
    },
    show (dataInfo) {
      this.isShowDialog = true
      this.dataInfo = dataInfo
      this.form.contract = dataInfo.contract
    }
  }
}
</script>

<style scoped lang="scss">
.txt4 {
  height: 20px;
  font-size: 14px;
  color: $color-black3;
  line-height: 18px;
  margin-bottom: 20px;
}
.txt3 {
  height: 21px;
  font-size: 16px;
  color: $color-black;
  font-weight: 600;
  margin: 30px 0 20px;
}
::v-deep .el-input__wrapper {
  border-radius: 12px;
}
.flex-between {
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
.head {
  display: flex;
  align-items: center;
  .cover-image {
    border-radius: 50%;
    width: 68px;
    height: 68px;
  }
  .title {
    margin-left: 20px;
    font-size: 22px;
    font-weight: bold;
    color: $color-black;
  }
  .svg-icon {
    font-size: 26px;
    margin-left: 16px;
  }
}

.btnBuy {
  margin-top: 20px;
  width: 100%;
  height: 48px;
  padding: 10px 0;
  border-radius: 12px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  color: $color-white;
  background: $mainLiner;
}
</style>
