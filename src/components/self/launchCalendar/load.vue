<template>
	<!--<el-skeleton class="nft-item display-flex box-between" :class="size"-->
	<el-skeleton class="nft-item display-flex box-between" :class="size" v-if="loadStatus != 'over'"
	             :loading="true" v-for="i in 10" :key="i" animated>
		<template #template>
			<div class="index-num"><el-skeleton-item variant="h3"/></div>
			<div class="nft-info"><el-skeleton-item variant="h3"/></div>
			<div class="time"><el-skeleton-item variant="h3"/></div>
			<div class="chain"><el-skeleton-item variant="h3"/></div>
			<div class="mine-link"><el-skeleton-item variant="h3"/></div>
			<div class="community"><el-skeleton-item variant="h3"/></div>
		</template>
	</el-skeleton>
	<!--<div class="cel-load-status" v-else>-->
	<!--  <div class="loading-over">{{$t('loadStatus.end')}}</div>-->
	<!--</div>-->

</template>
<script>
	export default {
		name: "lunchLoad",
		props: {
			loadStatus: {
				type: String,
				default: "",
			},
			size: {
				type: String,
				default: "",
			},
		},
		data() {
			return {
				limit: this.$store.state.pageLimit,
			};
		},
		created(){
		},
		methods: {
		},
	};
</script>

<style lang="scss" scoped>
	.loading-over{
		text-align: center;
		padding: 30px 0;
		color: $grayColor;
	}
	.nft-item{
		padding: 20px 0;
		.cover-image{
			width: 60px;
			height: 60px;
			border-radius: 8px;
		}
	}
	.nft-info{
		width: 560px;
		.nft-name{
			padding-left: 16px;
			font-size: 16px;
		}
	}
	.index-num{
		width: 100px;
		text-align: center;
	}
	.time{
		width: 150px;
	}
	.chain{
		width: 100px;
	}
	.mine-link{
		width: 120px;
	}
	.community{
		width: 160px;

	}
</style>
