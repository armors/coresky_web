<template>
	<div class="core-card">
		<core-card-wrapper></core-card-wrapper>
		<core-card-process></core-card-process>
		<core-card-level></core-card-level>
		<h3>Introduction to Pass</h3>
		<div class="introduction">
			<img src="@/assets/core-card/image_156.png" alt="" />
		</div>
		<h3>FAQ</h3>
		<core-card-FAQ></core-card-FAQ>
	</div>
</template>

<script setup>
import coreCardWrapper from './coreCardWrapper.vue';
import coreCardLevel from './coreCardLevel.vue';
import coreCardFAQ from './coreCardFAQ.vue';
import coreCardProcess from './coreCardProcess.vue';
</script>
<style lang="scss" scoped>
.core-card {
	background: linear-gradient(
		245.4deg,
		#d8dfe6 1.4%,
		rgba(209, 213, 216, 0) 82.89%
	);
	.banner {
		height: 460px;
	}
	h3 {
		width: 900px;
		margin: 50px auto 30px;
		font-size: 30px;
	}
	.introduction {
		width: 900px;
		height: 331px;
		margin: 0 auto;
		background: #fff;
		border: 1px solid #e6e8ec;
		border-radius: 16px;
		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
