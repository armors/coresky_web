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
					<span>{{ $t('coreCard.energy') }}</span>
				</div>
				<el-icon @click="closed">
					<Close />
				</el-icon>
			</template>
			<div class="content">
				<div class="img-box">
					<img
						:src="require(`@/assets/core-card/v${B.level}.png`)"
						alt=""
					/>
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
						<span>{{ B.experience }} / {{ B.maxScore }}</span>
					</div>
					<div class="max">
						<div class="max-value">
							<el-input
								v-model="state.amount"
								:placeholder="$t('coreCard.placeholderInput')"
								:controls="false"
								v-input-limit="'9,4'"
								class="max-input"
								@blur="inputLimit"
							/>
							<span @click="setMax">MAX</span>
						</div>
						<p class="core-token">
							{{ $t('coreCard.availableCoresky') }}: {{ U.score }}
						</p>
					</div>
				</div>
			</div>
			<el-button type="primary" class="accept" @click="levelUp">{{
				$t('coreCard.input')
			}}</el-button>
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

const inputLimit = (e) => {
	if (e.target.value.indexOf('.') > 0) {
		let str = e.target.value.slice(
			e.target.value.indexOf('.'),
			e.target.value.length
		);
		if (str / 1 <= 0) {
			state.amount = e.target.value.replace(str, '');
		}
	}
};

const levelUp = () => {
	if (state.amount !== '' && state.amount != '0') {
		let params = { ctAmount: state.amount };
		proxy.$api('corecard.levelUp', params).then((res) => {
			proxy.$tools.checkResponse(res);
			if (res.code === 200) {
				proxy.$tools.message(
					proxy.$t('coreCard.succeedUpgrade'),
					'success'
				);
			} else {
				proxy.$tools.message(
					proxy.$t('coreCard.faildUpgrade'),
					'error'
				);
			}
			closed();
		});
	} else {
		proxy.$tools.message(proxy.$t('coreCard.pleaseInput'), 'warning');
	}
};

const closed = () => {
	state.amount = '';
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
				justify-content: space-between;
				img {
					width: 83px;
					height: 40px;
				}
				.process {
					width: 248px;
					height: 10px;
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
