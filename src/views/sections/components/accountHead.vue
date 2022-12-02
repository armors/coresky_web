<template>
  <div class="account-wrap">
    <div class="bg-box"
      :style=" account.bannerImage ? 'background: url('+ account.bannerImage +') no-repeat; background-size: cover;':'' ">
    </div>
    <div class="account-info">
      <div class="info-top">
        <div class="avatar-box">
          <img :src="account.image" alt="">
        </div>
        <div class="info-title">
          <div class="title">
            <span>{{account.name}}</span>
            <!-- <img class="tag" src="@/assets/images/icons/icon_tag.svg" alt=""> -->
          </div>
          <div class="creator">
            <span class="txt">0x595…da687</span>
            <el-icon>
              <CopyDocument />
            </el-icon>
          </div>
        </div>
        <div class="info-share">
        </div>
      </div>
      <div class="info-rem">{{account.info}}</div>
    </div>
  </div>

</template>

<script>

export default {
  name: "accountHead",
  components: {

  },
  props: {

  },
  computed: {

  },
  data () {
    return {
      account: {
        bannerImage: "https://storage.nfte.ai/asset/collection/featured/BEEWQLPGNIJCWCXJUDSRUWRWOWSOYCCT.jpg?x-oss-process=image/resize,m_fill,w_4096,h_320",
        image: 'https://storage.nfte.ai/asset/collection/featured/MFYROFVZKZSCSHUWXRGBZAAQPZWMOKFM.jpg?x-oss-process=image/resize,m_fill,w_256,h_256',
        name: 'Azuki123',
        info: 'Here is a self introduction Here is a self introduction Here is a self introduction'
      }
    }
  },
  methods: {
  },
}

</script>

<style lang="scss" scoped>
.account-wrap {
  .bg-box {
    height: 320px;
    width: 100%;
  }
  .account-info {
    width: 1200px;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 40px;
    .info-top {
      height: 80px;
      position: relative;
      .avatar-box {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
        width: 168px;
        height: 168px;
        padding: 5px;
        background-color: $bg-white;
        border-radius: 50%;
      }
      .info-title {
        margin-left: 178px;
        .title {
          display: flex;
          align-items: center;
          font-style: normal;
          font-weight: 700;
          font-size: 32px;
          line-height: 41px;
        }
        .creator {
          .txt {
            font-size: 20px;
            line-height: 30px;
            color: $color-black2;
          }
          .el-icon{
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