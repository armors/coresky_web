<template>
	<div class="core-card" id="coreCard">
		<div class="banner">
			<div class="info"></div>
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

const bgColor = ref('#DAD4CF');
const bgBanner = ref('url(' + require(`@/assets/core-card/bg-1.png`) + ')');

const handleSelect = (i) => {
	bgBanner.value =
		'url(' + require(`@/assets/core-card/bg-${i + 1}.png`) + ')';
	switch (i) {
		case 0:
			bgColor.value = '#DAD4CF';
			break;
		case 1:
			bgColor.value = '#C4CCD5';
			break;
		case 2:
			bgColor.value = '#EBDFC3';
			break;
		case 3:
			bgColor.value = '#B9D5EE';
			break;
		case 4:
			bgColor.value = '#E0DCF5';
			break;
		case 5:
			bgColor.value = '#E2E4E7';
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
		height: 726px;
		background: v-bind(bgBanner);
		padding-top: 110px;
		background-size: 100% 100%;
		.info {
			width: 240px;
			height: 100px;
		}
	}
	h3 {
		width: 900px;
		margin: 50px auto 30px;
		font-size: 30px;
	}
}
</style>
