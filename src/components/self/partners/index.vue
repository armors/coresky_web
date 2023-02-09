<template>
  <div class="partners-box">
    <div class="home-title title-margin-top">{{$t("home.partnerTitle")}}</div>
    <div class="partner-list display-flex box-between box-nowrap">
      <div class="partner-item" v-for="(v, i) in 10" :key="`partners-item-${i}`">
        <img :src="require(`../../../assets/images/partners/partners${v}.png`)" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped lang="scss">
.partners-box {
  .partner-list {
    padding-top: 24px;
    .partner-item {
      margin-top: 16px;
      width: 227px;
      height: 140px;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
        height: auto;
        // &:hover {
        //   transform: scale(1.2);
        //   transition: all 0.3s ease-out;
        // }
      }
    }
  }
}
</style>
