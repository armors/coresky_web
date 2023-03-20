<template>
  <el-collapse-transition>
    <div class="header-tip" v-if="showCradTip">
      <span>{{ message() }}</span>
      <div class="right">
        <!-- <div href="" v-if="connected" class="btn-card" @click="goCoreCard">Receive And Bind</div> -->
        <div @click="linkClick" class="btn-card">{{ linkTxt() }}</div>
        <el-icon color="#ffffff" size="20" @click="closeTip">
          <Close />
        </el-icon>
      </div>
    </div>
  </el-collapse-transition>
</template>

<script>
export default {
  name: "HeaderTip",
  props: {
    currentView: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      showCradTip: false,
      message: '',
      linkTxt: '',
      linkUrl: ''
    };
  },
  methods: {
    closeTip () {
      if (this.closeHandle && typeof this.closeHandle === 'function') {
        this.closeHandle()
      }
      this.showCradTip = false
    },
    show (option) {
      this.showCradTip = true
      this.message = option.message || ''
      this.linkTxt = option.linkTxt || ''
      this.linkClose = option.linkClose || false
      this.callBack = option.callBack || undefined
      this.closeHandle = option.closeHandle || undefined
    },
    linkClick () {
      if (this.linkClose) {
        this.showCradTip = false
      }
      if (this.callBack && typeof this.callBack === 'function') {
        this.callBack()
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.header-tip {
  display: flex;
  align-items: center;
  padding: 0px 40px;
  height: 75px;
  color: #ffffff;
  font-size: 18px;
  line-height: 21px;
  background: linear-gradient(90deg, #03A5D8 0%, #3965FF 38.54%, #B439FF 100%);
  .right {
    margin-left: auto;
    display: flex;
    align-items: center;

    .btn-card {
      // width: 185px;
      padding: 0 30px;
      height: 50px;
      line-height: 50px;
      margin: 0 8px;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 12px;
      font-weight: 500;
      font-size: 16px;
      color: #FFFFFF;
      text-align: center;
      cursor: pointer;
    }
    .el-icon {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
