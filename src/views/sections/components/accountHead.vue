<template>
  <div class="account-wrap">
    <div class="bg-box"
      :style=" account.background ? 'background: url('+ account.background +') no-repeat; background-size: cover;':'' ">
      <div class="avatar-box">
        <img :src="account.photo" alt="">
      </div>
    </div>
    <div class="account-info">
      <div class="info-top">

        <div class="info-title">
          <div class="title">
            <span>{{account.nickname}}</span>
            <svg-icon class="tag" icon-class="icon_tag" />
            <!-- <img class="tag" src="@/assets/images/icons/icon_tag.svg" alt=""> -->
          </div>
          <div class="creator">
            <span class="txt">{{$filters.ellipsisAddress(account.address)}}</span>
            <el-icon v-clipboard:copy="account.address" v-clipboard:success="onSuccessCopy"
              v-clipboard:error="onErrorCopy">
              <CopyDocument />
            </el-icon>
          </div>
        </div>
        <div class="info-share">
        </div>
      </div>
      <div class="info-rem">{{ account.intro || 'The brief introduction has not been filled in yet'}}</div>
    </div>
  </div>

</template>

<script>

export default {
  name: "accountHead",
  components: {

  },
  props: {
    address: {
      type: String,
      default: ''
    },
  },
  watch: {
    address () {
      if (this.address) {
        this.init()
      }
    }
  },
  data () {
    return {
      // account: {
      //   bannerImage: "https://storage.nfte.ai/asset/collection/featured/BEEWQLPGNIJCWCXJUDSRUWRWOWSOYCCT.jpg?x-oss-process=image/resize,m_fill,w_4096,h_320",
      //   image: 'https://storage.nfte.ai/asset/collection/featured/MFYROFVZKZSCSHUWXRGBZAAQPZWMOKFM.jpg?x-oss-process=image/resize,m_fill,w_256,h_256',
      //   name: 'Azuki123',
      //   info: 'Here is a self introduction Here is a self introduction Here is a self introduction'
      // },
      account: {
        address: '',
        background: '',
        createDate: '',
        email: '',
        nickname: '',
        photo: '',
        telegram: '',
        twitter: '',
        intro: 'Here is a self introduction Here is a self introduction Here is a self introduction'
      }
    }
  },
  methods: {
    onSuccessCopy () {
      this.$tools.message(this.$t("request.copySuccess"), "success");
    },
    onErrorCopy () {
      this.$tools.message(this.$t("request.copyError"));
    },
    init () {
      if (this.address) {
        this.$api("user.info", { address: this.address }).then((res) => {
          if (this.$tools.checkResponse(res)) {
            this.account = res.debug
            console.log(this.account)
            // this.account.info = 'Here is a self introduction Here is a self introduction Here is a self introduction'
          } else {
            this.$tools.message(res.errmsg);
          }
        });
      }
    }
  },
  mounted () {
    this.init()
  }
}

</script>

<style lang="scss" scoped>
.account-wrap {
  margin-top: -76px;
  .bg-box {
    height: 350px;
    width: 100%;
    position: relative;
    .avatar-box {
      position: absolute;
      left: 40px;
      bottom: -20px;
      z-index: 1;
      width: 168px;
      height: 168px;
      padding: 5px;
      background-color: $bg-white;
      border-radius: 10px;
      overflow: hidden;
      filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.08));
      img {
        border-radius: 10px;
        overflow: hidden;
      }
    }
  }
  .account-info {
    // width: 1200px;
    margin: 0 40px;
    margin-top: 20px;
    margin-bottom: 40px;
    .info-top {
      // height: 80px;
      margin-top: 35px;
      position: relative;

      .info-title {
        // margin-left: 178px;
        .title {
          display: flex;
          align-items: center;
          font-style: normal;
          font-weight: 700;
          font-size: 30px;
          line-height: 35px;
          margin-bottom: 10px;
          color: #111111;
          .tag {
            margin-left: 5px;
            font-size: 22px;
          }
        }
        .creator {
          .txt {
            font-weight: 700;
            font-size: 18px;
            line-height: 21px;
          }
          .el-icon {
            cursor: pointer;
            font-size: 16px;
            height: 16px;
            margin-left: 5px;
          }
          .name {
            margin-left: 8px;
            font-weight: 500;
            font-size: 20px;
            line-height: 30px;
          }
        }
      }
    }
    .info-rem {
      margin-top: 15px;
      font-weight: 400;
      font-size: 20px;
      line-height: 30px;
      color: $color-black3;
    }
  }
}
</style>
