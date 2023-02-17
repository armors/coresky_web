<template>
  <div>
    <div class="banner-wrap">
      <div class="banner-swiper">
        <el-carousel trigger="click" height="460px">
          <el-carousel-item v-for="item in bannerList" :key="item">
            <div class="swiper-item-wrap">
              <div class="swiper-item-left">
                <div>
                  <img src="img-avatar" alt="">
                </div>
              </div>
              <div class="swiper-item-right">
                2
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "HIndex",
  components: {

  },
  mixins: [

  ],
  data: function () {
    return {
      bannerList: [{
        url: 'https://image.mux.com/y5HuZ1Dwo7028cvHGV00ULReakKKrmv014DHivjdQPqVbk/thumbnail.jpg?time=0',
      },
        // {
        //   url: 'https://i.seadn.io/gcs/files/3d34cef09b4043aa12bce1bed65ebdff.png?auto=format&w=1920',
        // }
      ]
    };
  },
  created () {
  },
  mounted () {

  },
  computed: {
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
.banner-wrap {
  overflow: hidden;
  width: 100%;
  height: 600px;
  position: relative;
  &::after {
    inset: 0;
    backdrop-filter: blur(20px);
    background: linear-gradient(0deg, rgb(255, 255, 255) 5%, rgba(0, 0, 0, 0) 60%)
      rgba(0, 0, 0, 0.6);
    pointer-events: none;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .banner-swiper {
    width: 100%;
    height: 460px;
    margin: 20px 40px;
  }
  .swiper-item-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 26px;
    background: #ffffff;
    .swiper-item-left {
      width: 50%;
      border-right: 1px solid red;
      padding-left: 60px;
      padding-top: 60px;
      .img-avatar {
        width: 31px;
        height: 31px;
        border-radius: 4px;
      }
    }
    .swiper-item-right {
      width: 50%;
    }
  }
  .swiper-img {
    position: absolute;
    inset: 0px;
    box-sizing: border-box;
    padding: 0px;
    border: none;
    margin: auto;
    display: block;
    width: 0px;
    height: 0px;
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
    object-fit: cover;
    object-position: center center;
  }
}
</style>