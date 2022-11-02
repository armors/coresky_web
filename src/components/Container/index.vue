<template>
	<div class="common-layout">
		<el-container>
			<el-header class="display-flex box-between header-box box-center-Y">
				<div class="logo-box"><img src="../../assets/images/logo.ico" alt=""></div>
				<div class="box-flex1"></div>
				<button @click="toggleDark()">
					<i inline-block align-middle i="dark:carbon-moon carbon-sun" />
					<span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
				</button>
				<div>connect</div>
			</el-header>
			<el-main>
				<slot></slot>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import { useDark, useToggle } from '@vueuse/core'

	export default {
		name: "index",
		setup () {
			const isDark = useDark()
			const toggleDark = useToggle(isDark)
			return {
				toggleDark
			}
		}
	}
</script>

<style lang="less">
	.common-layout{
		max-width: 1280px;
		margin: 0 auto;
		.header-box{
			height: 80px;
			.logo-box{
				width: 60px;
				height: 60px;
			}
		}
	}
</style>
