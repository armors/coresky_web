<template>
	<div class="body-wrapper">
		<div class="main-wrapper">
			<el-row class="mb-2">
				<el-button type="primary" @click="getList">getList</el-button>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		name: "reservoir",
		mounted() {
		},
		methods: {
			getList () {
				console.log('listToken')
			},
		}
	}
</script>

<style scoped lang="scss">
	.mb-2 {
		margin-top: 12px;
	}
</style>
