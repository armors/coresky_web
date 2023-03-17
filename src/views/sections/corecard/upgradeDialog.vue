<template>
	<div class="upgrade">
		<el-dialog
			:model-value="isShowUpgradeDialog"
			:show-close="false"
			:close-on-click-modal="false"
			custom-class="custom-dialog"
			destroy-on-close
			:set="((B = props.bindData[0]), (U = state.userData))"
		>
			<template #title>
				<div class="left">
					<span>Invest in energy storage</span>
				</div>
				<el-icon @click="closed">
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
						<img
							:src="
								require('@/assets/core-card/vip' +
									B.level +
									'.png')
							"
							alt=""
						/>
						<el-progress
							:percentage="B.ratio * 100"
							class="process"
							:show-text="false"
						></el-progress>
						<span>{{ B.minScore }} / {{ B.maxScore }}</span>
					</div>
					<div class="max">
						<div class="max-value">
							<el-input
								v-model="state.amount"
								placeholder="Please input"
								:controls="false"
								@input="inputValidata(state.amount)"
								class="max-input"
							/>
							<span @click="setMax">MAX</span>
						</div>
						<p class="core-token">
							Core Token in the wallet: {{ U.score }}
						</p>
					</div>
				</div>
			</div>
			<el-button type="primary" class="accept" @click="levelUp"
				>Accept</el-button
			>
		</el-dialog>
	</div>
</template>
<script setup>
import {
	defineProps,
	defineEmits,
	ref,
	reactive,
	computed,
	getCurrentInstance,
} from 'vue';
const emits = defineEmits(['handleClosed']);

const { proxy } = getCurrentInstance();
const state = reactive({
	userData: computed(() => proxy.$store.state.user),
	amount: '',
	loading: false,
});

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

const setMax = () => {
	state.amount = state.userData.score;
};

const inputValidata = (val) => {
	let checkPlan = val;

	checkPlan = checkPlan
		.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
		.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
		.replace(/^\./g, '') // 保证第一个为数字而不是.
		.replace('.', '$#$')
		.replace(/\./g, '')
		.replace('$#$', '.');
	if (checkPlan.indexOf('.') < 0 && checkPlan !== '') {
		checkPlan = parseFloat(checkPlan) + '';
	} else if (checkPlan.indexOf('.') >= 0) {
		checkPlan = checkPlan.replace(/^()*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
	}

	return checkPlan;
};
const levelUp = () => {
	let params = { ctAmount: state.amount };
	proxy.$api('corecard.levelUp', params).then((res) => {
		proxy.$tools.checkResponse(res);
		if (res.code === 200) {
			proxy.$tools.message('更新成功', 'success');
		} else {
			proxy.$tools.message('更新失败', 'error');
		}
		state.amount = '';
		closed();
	});
};

const closed = () => {
	emits('handleReload');
	emits('handleClosed', !props.isShowUpgradeDialog);
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
				font-size: 18px;
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
