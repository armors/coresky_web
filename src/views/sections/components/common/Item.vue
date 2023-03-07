<template>
  <div class="item" 
    :set="
      (I = props.item)
    ">
    <div class="nft-content">
      <div class="card-top">
        <div class="card-img">
          <image-box :src="I.oriImage"></image-box>
        </div>
      </div>
      <div class="card-bottom">
        <div class="nft-txt">
          {{ I.name ? I.name : ('#' + I.tokenId) }}
        </div>
        <div class="nft-price" v-if="I.basePrice && I.basePrice !== '0'">
          <span class="price"> {{ !!I.basePrice ? nftPrice(I.basePrice) : '-- '}} ETH</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  item: {},
  obj: {}
});
const nftPrice = (basePrice) => {
  return props.obj.$filters.keepMaxPoint(props.obj.$Web3.utils.fromWei(basePrice.toString()))
}

</script>

<style lang="scss" scoped>  
  .nft-content {
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.23s;
    background: $bg-white;
    position: relative;
    height: 100%;
    .card-top {
      z-index: 1;
      position: relative;
      .card-img {
        &::before {
          display: block;
          content: '';
          padding-bottom: 100%;
        }
        position: relative;
        transition: all 0.23s;
        img,
        .cover-image {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          height: 100%;
          width: 100%;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
      }
    }
    .card-bottom {
      flex: 1 1 0%;
      padding: 12px 12px;
      padding-right: 20px;
      .nft-txt {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: $color-black3;
      }

      .nft-price {
        display: flex;
        height: 22px;
        align-items: center;

        .token-icon {
          width: 10px;
          height: 15px;
          margin-right: 5px;
        }

        .price {
          font-weight: 700;
          font-size: 14px;
          line-height: 22px;
          color: $primaryColor;
        }

        span {
          font-weight: 700;
          font-size: 14px;
          line-height: 22px;
          color: $primaryColor;
        }
      }
    }
  }
</style>