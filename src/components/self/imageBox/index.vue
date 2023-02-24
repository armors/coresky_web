<template>
  <el-image class="cover-image" placeholder="loading" :src="src" fit="cover">
    <template v-slot:placeholder>
      <el-skeleton class="placeholder-image" animated>
        <template #template>
          <el-skeleton-item class="nft-image-skeleton" variant="h3" />
        </template>
      </el-skeleton>
    </template>
    <template v-slot:error>
      <div class="display-flex box-center error-image-box">
        <el-image class="error-image" :src="require('@/assets/create-img/non-existent.png')" fit="contain"></el-image>
      </div>
    </template>
  </el-image>
</template>

<script>
export default {
  name: "index",
  props: {
    src: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.nft-image-skeleton {
  width: 100%;
  height: 100%;
}
.cover-image {
  overflow: hidden;
  ::v-deep img {
    transition: all 0.3s;
    &:hover {
      transform: scale(1.05);
      transition: all 0.3s ease-out;
    }
  }
  .error-image {
    ::v-deep img {
      &:hover {
        transform: scale(1);
        transition: all 0.3s ease-out;
      }
    }
  }
}
</style>
