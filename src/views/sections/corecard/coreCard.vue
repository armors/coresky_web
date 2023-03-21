<template>
	<div class="core-card" id="coreCard">
		<div class="banner">
			<div class="banner-box">
				<div class="info">
					<div class="info-shadow">
						<div class="info-box">
							<div class="lv-box">
								<img :src="vipIcon" />
							</div>
							<a class="help"
								><img src="@/assets/core-card/help.png" alt=""
							/></a>
						</div>
						<div class="daily">
							<p>{{ $t('coreCard.ticketsWeek') }}</p>
							<strong>{{ state.daily }}</strong>
						</div>
					</div>
				</div>
				<!-- <core-card-wrapper :bindData="state.bindData" @handleSelect="handleSelect"
					:initLevel="state.initLevel"></core-card-wrapper> -->
				<coreCardView
					ref="coreCardViewRef"
					@handleSelect="handleSelect"
				/>
				<core-card-process
					:myCards="state.myCards"
					:bindData="state.bindData"
					@handleUpgrade="handleUpgradeDialog"
				></core-card-process>
			</div>
		</div>
		<core-card-level
			:cardConfigList="state.cardConfigList"
		></core-card-level>
		<h3>{{ $t('coreCard.faq') }}</h3>
		<core-card-FAQ></core-card-FAQ>
		<upgrade-dialog
			:bindData="state.bindData"
			:isShowUpgradeDialog="state.isShowUpgradeDialog"
			@handleClosed="handleUpgradeDialog"
			@handleReload="handleReload"
		></upgrade-dialog>
	</div>
</template>

<script setup>
import {
	onMounted,
	onBeforeUnmount,
	ref,
	reactive,
	computed,
	watch,
} from 'vue';
import { useStore } from 'vuex';
import coreCardWrapper from './coreCardWrapper.vue';
import coreCardView from './coreCardView.vue';

import coreCardLevel from './coreCardLevel.vue';
import coreCardFAQ from './coreCardFAQ.vue';
import coreCardProcess from './coreCardProcess.vue';
import upgradeDialog from './upgradeDialog.vue';
import { getCurrentInstance } from 'vue';
import { address } from '../../../wallet';

const { proxy } = getCurrentInstance();
const state = reactive({
	isShowUpgradeDialog: false,
	cardConfigList: [],
	daily: 0,
	connect: computed(() => proxy.$store.state.connected),
	token: computed(() => proxy.$store.state.token),
	user: computed(() => proxy.$store.state.user),
	myCards: [],
	bindData: [],
	initLevel: 0,
});
const store = useStore();
const bgColor = ref('#C4CCD5');
const bgBanner = ref('url(' + require(`@/assets/core-card/bg-3.webp`) + ')');
const vipIcon = ref(require(`@/assets/core-card/vip0.png`));
let isScrollTop = false;
const coreCardViewRef = ref(null);

watch(
	() => state.connect,
	() => {
		getUserStatus();
	}
);

/**
 *  监听钱包地址切换
 */
watch(
	() => state.token,
	() => {
		getUserStatus();
	}
);

function handleScroll() {
	let scrollTop = document.documentElement.scrollTop;
	if (scrollTop) {
		if (scrollTop > 3) {
			isScrollTop = false;
		} else {
			isScrollTop = true;
		}
	} else if (scrollTop === 0) {
		isScrollTop = true;
	}
	store.commit('setScrollTop', isScrollTop);
}

const handleSelect = (i) => {
	if (state.cardConfigList.length) {
		state.daily = state.cardConfigList[i].ticketIncome;
	}
	bgBanner.value =
		'url(' + require(`@/assets/core-card/bg-${i + 1}.webp`) + ')';
	vipIcon.value = require(`@/assets/core-card/vip${i}.png`);
	switch (i) {
		case 0:
			bgColor.value = '#E2E4E7';
			break;
		case 1:
			bgColor.value = '#DAD4CF';
			break;
		case 2:
			bgColor.value = '#C4CCD5';
			break;
		case 3:
			bgColor.value = '#EBDFC3';
			break;
		case 4:
			bgColor.value = '#B9D5EE';
			break;
		case 5:
			bgColor.value = '#E0DCF5';
			break;
		default:
			break;
	}
};

const handleUpgradeDialog = () => {
	state.isShowUpgradeDialog = !state.isShowUpgradeDialog;
};

const handleReload = () => {
	getUserStatus();
};
const getCoreCardList = () => {
	proxy.$api('corecard.cardConfigs', {}).then((res) => {
		if (proxy.$tools.checkResponse(res)) {
			if (res.debug) {
				state.cardConfigList = res.debug;
			}
		}
	});
};

const getUserStatus = () => {
	if (state.connect) {
		proxy.$api('corecard.myCards').then((res) => {
			proxy.$tools.checkResponse(res);
			state.myCards = res.debug;
			if (state.myCards.length !== 0) {
				state.bindData = state.myCards.filter((item) => {
					return item.pledge === 1;
				});
				console.log(state.bindData);
				if (state.bindData.length > 0) {
					handleSelect(state.bindData[0].level);
					coreCardViewRef.value.setViewIndex(state.bindData[0].level);
				} else {
					coreCardViewRef.value.setViewIndex(0);
				}
				proxy.$store.dispatch('authinfo');
			}
		});
	}
};

onMounted(() => {
	window.addEventListener('scroll', handleScroll);
	handleScroll();
	getCoreCardList();
	getUserStatus();
	proxy.$store.dispatch('authinfo');
});

onBeforeUnmount(() => {
	window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
.core-card {
	position: relative;
	width: 100%;
	margin-top: -76px;
	background: v-bind(bgColor);
	padding-bottom: 100px;
	.banner {
		height: 826px;
		background: v-bind(bgBanner);
		background-size: 100% 100%;
		position: relative;
		.banner-box {
			width: 997px;
			height: 826px;
			margin: 0 auto;
		}
		.info {
			width: 260px;
			height: 100px;
			background: url('@/assets/core-card/line.png') no-repeat;
			background-size: cover;
			padding: 8px 20px 30px 20px;
			position: relative;
			left: 130px;
			top: 180px;
			.info-shadow {
				border-radius: 16px;
				background: radial-gradient(
					60.15% 135.83% at 100% 0%,
					rgba(255, 255, 255, 0.45) 0%,
					rgba(255, 255, 255, 0) 100%
				);
			}
			.info-box {
				width: 240px;
				height: 40px;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
				}
				.lv-box {
					width: 83px;
					height: 40px;
					float: left;
					margin-right: 15px;
				}
				.help {
					display: block;
					width: 24px;
					height: 24px;
					margin: 8px auto;
					float: left;
					cursor: pointer;
				}
			}
			.daily {
				width: 240px;
				height: 49px;
				p {
					width: 120px;
					height: 30px;
					background: rgba(255, 255, 255, 0.3);
					border-radius: 8px;
					margin-top: 10px;
					line-height: 30px;
					margin-left: 7px;
					font-size: 12px;
					text-align: center;
					float: left;
					color: #454545;
				}
				strong {
					float: left;
					font-size: 36px;
					color: #fff;
					margin-left: 20px;
				}
			}
		}
	}
	h3 {
		width: 900px;
		margin: 50px auto 30px;
		font-size: 30px;
	}
}
</style>
