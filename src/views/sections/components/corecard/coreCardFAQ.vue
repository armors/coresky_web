<template>
	<div class="FAQ-card">
		<el-collapse class="box-card" v-for="(item, i) in 4" :key="i">
			<el-collapse-item
				:title="
					item.title ||
						'How do I get a RarePass and how much do they cost?'
				"
				:name="i"
				class="faq-item"
			>
				<div class="answer">
					{{ item.content || '' }}
					RarePass #1 will be available to the public beginning with a
					24 hr timed auction on SuperRare that starts November 15th,
					2022 at 10:00 AM E.T. Once the RarePass #1 auction
					concludes, the winning bid will set the starting price of
					the Dutch Auction on rarepass. superrare.com. The Dutch
					Auction on rarepass.superrare.com will start at 1:00 PM E.T.
					on November 16th 2022. Once the auction begins, the price of
					the passes will decrease every 15 mins for 6 hours until
					hitting a floor price of $0 at 7:00 PM E.T.
				</div>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>
<script setup></script>
<style lang="scss" scoped>
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
	}
	::v-deep(.el-collapse-item__header.is-active) {
		background: none !important;
	}
	::v-deep(.el-collapse-item__content) {
		margin-top: 20px;
		color: #717a83;
	}
	::v-deep(.el-collapse-item__wrap) {
		border-bottom: none;
	}
	.answer {
		line-height: 30px;
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
