<template>
	<div class="welcome">
		<el-dialog
			:model-value="isShowWelcomeDialog"
			:show-close="false"
			:close-on-click-modal="false"
			@closed="closed"
			custom-class="custom-dialog"
			destroy-on-close
		>
			<template #title>
				<div class="left">
					<span>{{ $t('coreCard.mintTitle') }}</span>
				</div>
				<el-icon @click="closed()">
					<Close />
				</el-icon>
			</template>
			<div class="content">
				<div class="img-box">
					<img src="@/assets/core-card/benefits-img.png" alt="" />
				</div>
				<div class="step">
					<ul>
						<li>
							<img src="@/assets/core-card/step.png" alt="" />
							<p>{{ $t('coreCard.mintP1') }}</p>
						</li>
						<li>
							<img src="@/assets/core-card/step.png" alt="" />
							<p>{{ $t('coreCard.mintP2') }}</p>
						</li>
						<li>
							<img src="@/assets/core-card/step.png" alt="" />
							<p>{{ $t('coreCard.mintP3') }}</p>
						</li>
					</ul>
				</div>
			</div>
			<el-button type="primary" class="receive" @click="goMint">{{
				$t('coreCard.mint')
			}}</el-button>
		</el-dialog>
	</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
	isShowWelcomeDialog: {
		type: Boolean,
		default: false,
	},
});
const emits = defineEmits(['handleClose']);

const goMint = () => {
	localStorage.setItem('firstEnter', false);
	router.push({
		path: '/coreCardMint',
	});
	closed();
};

const closed = () => {
	emits('handleClose', false);
	localStorage.setItem('firstEnter', false);
};
</script>

<style lang="scss" scoped>
.welcome {
	.content {
		.img-box {
			width: 620px;
			padding: 41px 257px;
			background: url('@/assets/core-card/benefits-bg.png') no-repeat;
			img {
				width: 107px;
				height: 176px;
			}
		}
		.step {
			margin-top: 30px;
			ul li {
				display: flex;
				margin-bottom: 20px;
				font-size: 16px;
				img {
					width: 20px;
					height: 20px;
					margin-right: 20px;
				}
			}
		}
	}
	.receive {
		width: 100%;
		height: 48px;
		padding: 10px 0;
		border-radius: 12px;
		font-weight: 700;
		border: none;
		cursor: pointer;
		color: $color-white;
	}
}
</style>
