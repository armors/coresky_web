<template>
	<div class="core-card" id="coreCard">
		<div class="banner">
			<div class="info">
				<div class="info-shadow">
					<div class="info-box">
						<div class="lv-box">
							<img src="@/assets/core-card/vip1.png" />
						</div>
						<a class="help"
							><img src="@/assets/core-card/help.png" alt=""
						/></a>
					</div>
					<div class="daily">
						<p>Daily Lotte Output</p>
						<strong>10</strong>
					</div>
				</div>
			</div>
			<core-card-wrapper @handleSelect="handleSelect"></core-card-wrapper>
			<core-card-process></core-card-process>
		</div>
		<core-card-level></core-card-level>
		<h3>FAQ</h3>
		<core-card-FAQ></core-card-FAQ>
	</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import coreCardWrapper from './coreCardWrapper.vue';
import coreCardLevel from './coreCardLevel.vue';
import coreCardFAQ from './coreCardFAQ.vue';
import coreCardProcess from './coreCardProcess.vue';

const store = useStore();
let isScrollTop = false;

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

const bgColor = ref('#C4CCD5');
const bgBanner = ref('url(' + require(`@/assets/core-card/bg-3.png`) + ')');

const handleSelect = (i) => {
	bgBanner.value =
		'url(' + require(`@/assets/core-card/bg-${i + 1}.png`) + ')';
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

onMounted(() => {
	window.addEventListener('scroll', handleScroll);
	handleScroll();
});

onBeforeUnmount(() => {
	window.removeEventListener('scroll', handleScroll);
});
</script>
<style lang="scss" scoped>
.core-card {
	position: relative;
	top: -76px;
	background: v-bind(bgColor);
	padding-bottom: 100px;
	.banner {
		height: 826px;
		background: v-bind(bgBanner);
		padding-top: 270px;
		background-size: 100% 100%;
		position: relative;
		.info {
			width: 240px;
			height: 100px;
			background: url('@/assets/core-card/line.png') no-repeat;
			background-size: cover;
			padding: 8px 20px 30px 20px;
			position: absolute;
			left: 380px;
			top: 160px;
			.info-shadow {
				border-radius: 16px;
				background: radial-gradient(
					60.15% 135.83% at 100% 0%,
					rgba(255, 255, 255, 0.45) 0%,
					rgba(255, 255, 255, 0) 100%
				);
			}
			.info-box {
				width: 200px;
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
				width: 200px;
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
