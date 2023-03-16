<template>
	<div class="upgrade">
		<el-dialog
			:model-value="isShowUpgradeDialog"
			:show-close="false"
			:close-on-click-modal="false"
			@closed="closed"
			custom-class="custom-dialog"
			destroy-on-close
			:set="(B = props.bindData[0])"
		>
			<template #title>
				<div class="left">
					<span>Invest in energy storage</span>
				</div>
				<el-icon @click="isShowUpgradeDialog = false">
					<Close />
				</el-icon>
			</template>
			<div class="content">
				<div class="img-box">
					<img :src="B.avatarFrame" alt="" />
				</div>
				<div class="info">
					<p>{{ B.name }}</p>
					<div class="vip-info">
						<img src="@/assets/core-card/vip5.png" alt="" />
						<el-progress
							:percentage="B.experience"
							class="process"
							:show-text="false"
						></el-progress>
						<span>{{ B.mixScore }} / {{ B.maxScore }}</span>
					</div>
					<div class="max">
						<div class="max-value">
							<el-input
								v-model="value1"
								placeholder="Please input"
								class="max-input"
							/>
							<span>MAX</span>
						</div>
						<p class="core-token">
							Core Token in the wallet: 1,000
						</p>
					</div>
				</div>
			</div>
			<el-button type="primary" class="accept" @click="goMint"
				>Accept</el-button
			>
		</el-dialog>
	</div>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue';
const emits = defineEmits(['handleClosed']);

const value1 = ref(368);

const props = defineProps({
	isShowUpgradeDialog: {
		type: Boolean,
		default: false,
	},
	bindData: {
		type: Array,
		default: [],
	},
});

const closed = () => {
	emits('handleClosed', false);
};
</script>
<style lang="scss" scoped>
.upgrade {
	.content {
		.img-box {
			width: 107px;
			height: 180px;
			float: left;
			margin-right: 30px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.info {
			float: left;
			width: 472px;
			p {
				color: #04142a;
			}
			.vip-info {
				display: flex;
				height: 40px;
				margin-top: 20px;
				img {
					width: 83px;
					height: 40px;
				}
				.process {
					width: 248px;
					height: 10px;
					margin-left: 40px;
					margin-top: 19px;
					::v-deep(.el-progress-bar__inner) {
						background: linear-gradient(
							270deg,
							#1063e0 0%,
							#7190ff 100%
						);
					}
				}
				span {
					line-height: 40px;
					margin-left: 8px;
				}
			}
			.max {
				margin-top: 20px;
				height: 99px;
				.max-value {
					display: flex;
					border: 2px solid #e6e8ec;
					border-radius: 12px;
					.max-input {
						width: 400px;
						height: 66px;

						::v-deep(.el-input__wrapper) {
							box-shadow: none;
							border-radius: 15px;
							border: none;
						}
					}
					span {
						font-size: 18px;
						color: #1063e0;
						position: relative;
						cursor: pointer;
						line-height: 66px;
					}
				}
				.core-token {
					margin-top: 14px;
					text-align: right;
					color: #717a83;
				}
			}
		}
	}
	.accept {
		width: 100%;
		height: 48px;
		padding: 10px 0;
		margin-top: 50px;
		border-radius: 12px;
		font-weight: 700;
		border: none;
		cursor: pointer;
		color: $color-white;
	}
}
</style>
