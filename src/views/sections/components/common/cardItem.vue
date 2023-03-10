<template>
  <router-link :to="`/detail/${item.contract}/${item.tokenId}`" class="nft-card">
    <div class="item">
      <div class="nft-content">
        <div class="card-top">
          <div class="card-img">
            <image-box :src="oriImage()"></image-box>
          </div>
        </div>
        <div class="card-bottom">
          <div class="nft-txt">
            {{ item.name ? item.name : ('#' + item.tokenId) }}
          </div>
          <div class="nft-price" v-if="item.basePrice && item.basePrice !== '0'">
            <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="">
            <span class="price"> {{ !!item.basePrice ? nftPrice(item.basePrice) : '-- ' }} ETH</span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script setup>
import { inject } from 'vue'

const filters = inject('filters');
const Web3 = inject('Web3');

const props = defineProps({
  item: {}
});

const nftPrice = (basePrice) => {
  return filters.keepMaxPoint(Web3.utils.fromWei(basePrice.toString()))
}
const oriImage = () => {
  let imgSrc = props.item.oriImage;
  if (imgSrc.indexOf('?') == -1 && imgSrc.indexOf('base64') == -1) {
    return props.item.oriImage + "?x-oss-process=image/resize,l_300"
  } else {
    return props.item.oriImage
  }
}

</script>

<style lang="scss" scoped> 
 .nft-card {
    min-height: 1px;
    position: relative;
    display: block;
    border-radius: 12px;
    filter: drop-shadow(0px 0px 10px rgba(82, 77, 255, 0.05));
    transition: all .3s;
    &:hover {
      box-shadow: 0 7px 16px -8px rgba(0, 0, 0, 0.15);
      transform: translateY(-5px);
    }
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
  }
</style>