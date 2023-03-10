<template>
  <div class="process">
    <div class="slider">
      <p>
        <strong>LV 1</strong><strong>LV 4</strong>
      </p>
      <el-slider v-model="value1" :min="0" :max="1000"/>
      <p>
        <span>0</span><span>1000</span>
      </p>
    </div>
    <button class="addLevel">Upgrade</button>
  </div>  
</template>
<script setup>
import { ref } from "vue";
const value1 = ref(368)
</script>
<style lang="scss" scoped>
.process {
  width: 960px;
  height: 113px;
  padding: 25px 52px 25px 59px;
  margin: 0px auto 60px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 80px;
  overflow: hidden;
  .slider {
    width: 669px;
    margin-right: 40px;
    float: left;
    ::v-deep(.el-slider__runway) {
      height: 20px;
      border-radius: 23px;
      background: #FFFFFF;
      opacity: 0.65;
      
    }
    ::v-deep(.el-slider__bar) {
      background: none;
      height: 20px;
      border-radius: 23px;
      background: linear-gradient(270deg, #1063E0 -0.03%, #2998FF 45.82%, #00C2FF 100%);  
    }
    ::v-deep(.el-slider__button-wrapper) {
      width: 20px;
      height: 20px;
      top: -2px;
      margin-left: -12px;
    }
    ::v-deep(.el-slider__button) {
      width: 14px;
      height: 14px;
      border: none;
      background: #FFFFFF;
      box-shadow: 0px 0px 8px 3px rgba(255, 255, 255, 0.55);
      margin: 3px 4px;
    }
    p {
      flex: 1;
      display: flex;
      justify-content: space-between;
      strong {
        font-size: 18px;
        color: #04142A;
      }
      span {
        font-size: 14px;
        color: #717A83;
      }
    }
  }
  .addLevel {
    width: 140px;
    height: 57px;
    float: left;
    background: #000000;
    border-radius: 12px;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
    margin-top: 3px;
  }
}
</style>