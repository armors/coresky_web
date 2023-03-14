<template>
	<div class="process">
		<div class="level-info">
			<img src="@/assets/core-card/small-img1.png" alt="" />
			<div class="info-right">
				<p>Corecard #19990</p>
				<span>daily lotte output : 100</span>
				<button class="add-level">Upgrade</button>
			</div>
		</div>
		<div class="slider">
			<p><strong>LV 1</strong><strong>LV 4</strong></p>
			<el-slider v-model="value1" :min="0" :max="1000" />
			<p><span>0</span><span>1000</span></p>
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
const value1 = ref(368);
</script>
<style lang="scss" scoped>
.process {
	width: 960px;
	height: 133px;
	padding: 25px 40px 25px 50px;
	margin: 0px auto 60px;
	background: rgba(255, 255, 255, 0.35);
	border-radius: 80px;
	overflow: hidden;
	.slider {
		width: 606px;
		margin-left: 50px;
		float: left;
		padding-top: 3px;
		::v-deep(.el-slider__runway) {
			height: 20px;
			border-radius: 23px;
			background: #ffffff;
			opacity: 0.65;
		}
		::v-deep(.el-slider__bar) {
			background: none;
			height: 20px;
			border-radius: 23px;
			background: linear-gradient(
				270deg,
				#1063e0 -0.03%,
				#2998ff 45.82%,
				#00c2ff 100%
			);
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
			background: #ffffff;
			box-shadow: 0px 0px 8px 3px rgba(255, 255, 255, 0.55);
			margin: 3px 4px;
		}
		p {
			flex: 1;
			display: flex;
			justify-content: space-between;
			strong {
				font-size: 18px;
				color: #04142a;
			}
			span {
				font-size: 14px;
				color: #717a83;
			}
		}
	}
	.level-info {
		width: 210px;
		float: left;
		img {
			width: 49px;
			height: 83px;
			float: left;
			margin-right: 15px;
		}
		.info-right {
			width: 146px;
			float: right;
			p {
				color: #04142a;
				font-size: 16px;
			}
			span {
				color: #04142a;
				font-size: 14px;
			}
			.add-level {
				width: 146px;
				height: 36px;
				background: #000000;
				border-radius: 8px;
				color: #ffffff;
				border: none;
				cursor: pointer;
				margin-top: 8px;
			}
		}
	}
}
</style>
