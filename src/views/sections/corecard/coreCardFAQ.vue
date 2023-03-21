<template>
	<div class="FAQ-card">
		<el-collapse class="box-card" v-for="(item, i) in 4" :key="i">
			<el-collapse-item
				:title="$t(`coreCard.q${i}`)"
				:name="i"
				class="faq-item"
			>
				<div class="answer">
					{{ $t(`coreCard.a${i}`) || '' }}
				</div>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>
<script setup></script>
<style lang="scss" scoped>
.FAQ-card {
	margin-bottom: 100px;
}
.box-card {
	padding: 30px 50px;
	width: 900px;
	background: #fff;
	margin: 20px auto;
	border-radius: 16px;
	border: 1px solid #e6e8ec !important;
	::v-deep(.el-card__body) {
		padding: 0;
	}
	::v-deep(.el-collapse-item__header) {
		height: auto;
		line-height: 20px;
		color: #717a83;
		font-size: 18px;
		font-weight: 500;
	}
	::v-deep(.el-collapse-item__header.is-active) {
		background: none !important;
		.el-collapse-item__arrow {
			transform: rotate(90deg);
		}
	}
	::v-deep(.el-collapse-item__content) {
		margin-top: 20px;
		color: #717a83;
	}
	::v-deep(.el-collapse-item__wrap) {
		border-bottom: none;
	}
	::v-deep(.el-collapse-item__arrow) {
		width: 20px;
		height: 20px;
		transform: rotate(-90deg);
	}
	::v-deep(.el-icon) svg {
		width: 20px;
		height: 20px;
		font-weight: bold;
		color: #04142a;
	}

	.answer {
		line-height: 30px;
		font-size: 16px;
		font-weight: 400;
	}
}
.clearfix:before,
.clearfix:after {
	display: table;
	content: '';
}
.clearfix:after {
	clear: both;
}
</style>
