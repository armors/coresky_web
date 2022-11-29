<template>
  <div class="main-wrapper">
    <div class="flex-center">
      <div class="page-left">
        <div class="detail-img-box">
          <img
            src="https://storage.nfte.ai/nft/img/eth/0x1/6079100774021590496_845241255.webp?x-oss-process=image/resize,m_lfit,h_900"
            alt="">
        </div>
        <div class="card-wrap mt30">
          <div class="card-head">
            <img class="icon" src="@/assets/images/icons/icon_properties.svg" alt="">
            <span class="card-title">Properties</span>
            <el-icon class="down">
              <ArrowUp />
            </el-icon>
          </div>
          <div class="card-body">
            <div class="arrt-list">
              <div class="arrt-item">
                <p class="attr-name">Background</p>
                <p class="attr-value">New Punk Blue</p>
                <dir class="attr-bottom">
                  <span class="attr-num">1,232(12.32%)</span>
                  <div class="attr-price">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    <span class="value">530.73</span>
                  </div>
                </dir>
              </div>
              <div class="arrt-item">
                <p class="attr-name">Background</p>
                <p class="attr-value">New Punk Blue</p>
                <dir class="attr-bottom">
                  <span class="attr-num">1,232(12.32%)</span>
                  <div class="attr-price">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    <span class="value">530.73</span>
                  </div>
                </dir>
              </div>
              <div class="arrt-item">
                <p class="attr-name">Background</p>
                <p class="attr-value">New Punk Blue</p>
                <dir class="attr-bottom">
                  <span class="attr-num">1,232(12.32%)</span>
                  <div class="attr-price">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    <span class="value">530.73</span>
                  </div>
                </dir>
              </div>
              <div class="arrt-item">
                <p class="attr-name">Background</p>
                <p class="attr-value">New Punk Blue</p>
                <dir class="attr-bottom">
                  <span class="attr-num">1,232(12.32%)</span>
                  <div class="attr-price">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    <span class="value">530.73</span>
                  </div>
                </dir>
              </div>
            </div>
          </div>
        </div>
        <div class="card-wrap mt30">
          <div class="card-head">
            <img class="icon" src="@/assets/images/icons/icon_token.svg" alt="">
            <span class="card-title">Token Details</span>
            <el-icon class="down">
              <ArrowUp />
            </el-icon>
          </div>
          <div class="card-body">
            <div class="flex-detial-list">
              <div class="flex-detial">
                <span class="name">Token ID</span>
                <span class="value">2974</span>
              </div>
              <div class="flex-detial">
                <span class="name">Blockchain</span>
                <span class="value">Ethereum</span>
              </div>
              <div class="flex-detial">
                <span class="name">Token Standard</span>
                <span class="value">ERC721</span>
              </div>
              <div class="flex-detial line">
              </div>
              <div class="flex-detial">
                <span class="name">Contract</span>
                <span class="value">0x..f13D</span>
              </div>
              <div class="flex-detial">
                <span class="name">Creator Rebate</span>
                <span class="value">0.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-right">
        <div class="detail-info">
          <div class="collection-name"><span>Name of this collection</span> <img class="tag"
              src="@/assets/images/icons/icon_tag.svg" alt=""></div>
          <div class="globle-floor">
            <span>Globle floor : </span>
            <img class="token-icon" src="@/assets/images/icons/token/token_eth.svg" alt="" />
            <span class="value">530.73</span>
          </div>
          <div class="nft-name">
            <span>Name of this NFT #4450</span>
            <div class="icon_shoucang" alt="" />
          </div>
          <div class="nft-address">
            <div class="add-item">
              <div class="creator">Creator</div>
              <div class="creator-name">0xb908f...f0c6</div>
            </div>
            <div>
              <div class="creator">Current owner</div>
              <div class="creator-name">0xb908f...f0c6</div>
            </div>
          </div>
          <div class="nft-bid-box">
            <div class="box-flex">
              <div class="box-left">
                <div>Current Price</div>
                <div class="row">
                  <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                  <span class="value">530.73</span>
                </div>
                <div class="row">
                  $45,332,02
                </div>
              </div>
              <div class="box-right">
                <div class="row-item">
                  <img class="icon" src="@/assets/images/icons/icon_time.svg" alt="">
                  <span>Time left</span>
                  <span class="item-value">28d 12h 32m</span>
                </div>
                <div class="row-item">
                  <img class="icon" src="@/assets/images/icons/icon_frame.svg" alt="">
                  <span>Best offer</span>
                  <span class="item-value">
                    <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
                    28.80
                  </span>
                </div>
              </div>
            </div>
            <div class="btn-box">
              <button class="btnBuy" @click="isShowBugDialog=!isShowBugDialog">Buy Now</button>
              <button class="btnBlack">Add to Cart</button>
              <button class="btnWhite">Make Offer</button>
            </div>
          </div>
        </div>
        <div class="card-wrap mt30">
          <div class="card-head">
            <img class="icon" src="@/assets/images/icons/icon_pricehistory.svg" alt="">
            <span class="card-title">Price History</span>
            <el-icon>
              <ArrowUp />
            </el-icon>
          </div>
          <div class="card-body" style="height:200px">

          </div>
        </div>
        <div class="card-wrap mt30">
          <div class="card-head">
            <img class="icon" src="@/assets/images/icons/icon_offers.svg" alt="">
            <span class="card-title">Offers</span>
            <el-icon class="down">
              <ArrowUp />
            </el-icon>
          </div>
          <div class="card-body" style="height:200px">
          </div>
        </div>
      </div>
    </div>
    <div class="page-activity"></div>
    <el-dialog :model-value="isShowBugDialog" :show-close="false" :close-on-click-modal="false" @closed="closed"
      custom-class="custom-dialog" destroy-on-close>
      <template #title>
        <div class="left">
          <span>Checkout</span>
        </div>
        <el-icon @click="isShowBugDialog=false">
          <Close />
        </el-icon>
      </template>
      <div class="nft-box">
        <img class="img-box"
          src="https://storage.nfte.ai/nft/img/eth/0x1/6079100774021590496_845241255.webp?x-oss-process=image/resize,m_lfit,h_900"
          alt="">
        <div class="box-center">
          <span class="tokenid">#5560</span>
          <span class="collection-name">Name of this collection
            <img class="tag" src="@/assets/images/icons/icon_tag.svg" alt="">
          </span>
        </div>
      </div>
      <div class="price-box">
        <div class="label">
          Price
        </div>
        <div class="price-wrap">
          <span class="buy-price">
            <img class="token-icon" src="@/assets/images/icons/token/token_eth2.svg" alt="" />
            23.22
          </span>
          <div class="total">$ 45,332.02</div>
        </div>
      </div>
      <button class="btnBuy">Buy</button>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "NFTDetail",
  components: {
  },
  mixins: [],
  data () {
    return {
      isShowBugDialog: false,
    };
  },
  created () {
  },
  computed: {
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.mt30 {
  margin-top: 30px;
}
.main-wrapper {
  padding: 40px 0;
  margin-bottom: 20px;
  .flex-center {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
  .page-left {
    width: 468px;
    .detail-img-box {
      border-radius: 20px;
    }
  }
  .page-right {
    width: 708px;
    .collection-name {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      background: $mainLiner;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      .tag {
        margin-left: 5px;
        vertical-align: middle;
        display: inline-block;
        width: 16px;
        height: 16px;
      }
    }
    .globle-floor {
      margin-top: 16px;
      font-weight: 400;
      font-size: 12px;
      color: $color-black2;
      display: flex;
      align-items: center;
      .token-icon {
        margin-left: 5pxs;
        width: 14px;
        height: 18px;
      }
      .value {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: $primaryColor;
      }
    }
    .nft-name {
      margin-top: 8px;
      font-weight: 700;
      font-size: 32px;
      line-height: 41px;
      color: $primaryColor;
      .icon_shoucang {
        margin-left: 16px;
        display: inline-block;
        width: 24px;
        height: 24px;
        cursor: pointer;
        background-image: url('@/assets/images/icons/icon_shoucang.svg');
        &.active,
        &:hover {
          background-image: url('@/assets/images/icons/icon_shoucang_active.svg');
        }
      }
    }
    .nft-address {
      margin-top: 16px;
      display: flex;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: $color-black3;
      .add-item {
        margin-right: 24px;
      }
      .creator-name {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        color: $primaryColor;
      }
    }
    .nft-bid-box {
      display: flex;
      margin-top: 24px;
      flex-direction: column;
      padding: 24px;
      border: 1px solid $borderBg;
      border-radius: 20px;
      font-size: 14px;
      color: $color-black2;

      .box-flex {
        width: 100%;
        display: flex;
        flex-direction: row;
      }
      .box-left {
        margin-right: 24px;
        width: 318px;
        padding: 16px;
        background: $elButtonHoverBg;
        border-radius: 8px;
        line-height: 24px;
        .row {
          margin-top: 8px;
        }
        .token-icon {
          display: inline-block;
          width: 15px;
          height: 24px;
        }
        .value {
          margin-left: 5px;
          font-size: 22px;
          line-height: 28px;
          font-weight: 600;
          // display: inline-block;
          color: $primaryColor;
        }
      }
      .box-right {
        flex-grow: 1;
        // margin-left: 24px;
        .row-item {
          display: flex;
          align-items: center;
          padding: 16px;
          height: 56px;
          background: $elButtonHoverBg;
          border-radius: 8px;
          line-height: 24px;
          &:first-child {
            margin-bottom: 10px;
          }
          .icon {
            margin-right: 6px;
            width: 20px;
            height: 20px;
          }
          .item-value {
            margin-left: 12px;
            font-weight: 700;
            font-size: 14px;
            color: $primaryColor;
            .token-icon {
              width: 10px;
              height: 16px;
              margin-right: 3px;
              display: inline-block;
              vertical-align: sub;
            }
          }
        }
      }
      .btn-box {
        margin-top: 24px;
        display: flex;
        justify-content: space-between;
        button {
          width: 210px;
          height: 48px;
          padding: 10px 0;
          border-radius: 12px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          &.btnBuy {
            color: $color-white;
            background: $mainLiner;
          }
          &.btnBlack {
            color: $color-white;
            background: $primaryColor;
          }
          &.btnWhite {
            color: $primaryColor;
            background: $color-white;
            border: 1px solid $primaryColor;
          }
          // &:hover {
          //   opacity: 0.8;
          // }
        }
      }
    }
  }
  .card-wrap {
    border-radius: 20px;
    border: 1px solid $color-black2;
    background: $bg-white;
    overflow: hidden;
    .card-head {
      display: flex;
      align-items: center;
      padding: 10px 24px;
      background: $elButtonHoverBg;
      .icon {
        width: 24px;
        height: 24px;
      }
      .card-title {
        margin-left: 10px;
        font-weight: 700;
        font-size: 16px;
      }
      .el-icon {
        cursor: pointer;
        font-size: 15px;
        margin-left: 5px;
        margin-left: auto;
        &.down {
          transform: rotate(180deg);
        }
      }
    }
    .card-body {
      padding: 24px;
      background: $bg-white;
    }
  }
  .arrt-list {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 18px;
    .arrt-item {
      width: 200px;
      padding: 12px;
      color: $color-black3;
      background: $elButtonHoverBg;
      border-radius: 16px;
      .attr-value {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        margin-top: 4px;
      }
      .attr-bottom {
        display: flex;
        margin-top: 18px;
        justify-content: space-between;
        .attr-num {
          font-weight: 400;
          font-size: 12px;
        }
        .token-icon {
          vertical-align: sub;
          display: inline-block;
          margin-right: 5px;
          width: 10px;
          height: 16px;
        }
      }
    }
  }
  .flex-detial-list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 24px;
    .flex-detial {
      display: flex;
      justify-content: space-between;
      height: 21px;
      line-height: 21px;
      font-weight: 500;
      font-size: 14px;
      color: $color-black3;
      &.line {
        height: 1px;
        background: $borderBg;
      }
    }
  }
}
::v-deep {
  .custom-dialog {
    padding: 40px;
    height: auto;
    .el-dialog__header {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: 0;
      .left {
        color: $color-black;
        font-weight: 700;
        font-size: 22px;
        line-height: 28px;
      }
      .el-icon {
        cursor: pointer;
        font-size: 20px;
      }
    }
    .el-dialog__body {
      padding: 40px 0 0;
    }
    .nft-box {
      display: flex;
      padding: 16px;
      border: 1px solid $borderBg;
      border-radius: 20px;
      .img-box {
        width: 100px;
        height: 100px;
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
    .price-box {
      display: flex;
      padding: 16px;
      border: 1px solid $borderBg;
      border-radius: 20px;
      justify-content: space-between;
      text-align: right;
      margin-top: 20px;
      .label {
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
        color: $primaryColor;
      }
      .buy-price {
        margin-bottom: 4px;
        height: 30px;
        line-height: 30px;
        font-weight: 500;
        font-size: 20px;
        .token-icon {
          width: 10px;
          height: 16px;
          display: inline-block;
        }
      }
    }
    .btnBuy {
      margin-top: 40px;
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
  }
}
</style>

