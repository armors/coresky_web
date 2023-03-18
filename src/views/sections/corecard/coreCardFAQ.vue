<template>
	<div class="FAQ-card">
		<el-collapse class="box-card" v-for="(item, i) in FAQList" :key="i">
			<el-collapse-item :title="item.title" :name="i" class="faq-item">
				<div class="answer">
					{{ item.content || '' }}
				</div>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>
<script setup>
const FAQList = [
	{
		title: 'What is CoreCard?',
		content:
			"CoreCard is Coresky's Membership NFT, a decentralized VIP governance system based on the Coresky ecosystem. Holding CoreCard automatically makes you a member of the Coresky community, and you will enjoy various benefits offered by the Coresky platform. CoreCard holders will receive Tickets regularly put out by the Coresky platform, which are used as tickets to participate in Coresky Launchpad.",
	},
	{
		title: 'How many levels does CoreCard have?',
		content:
			'CoreCard is divided into six levels of equity, from level 0 to level 5. They are respectively called: CoreCardV0 Kite, CoreCardV1 Balloon, CoreCardV2 Biplane, CoreCardV3 Jet, CoreCardV4 Satellite, and CoreCardV5 Spacecraft.',
	},
	{
		title: 'What are the differences between different levels of CoreCard?',
		content:
			'Different levels of CoreCard will generate a different number of Tickets weekly, and the higher the level of CoreCard held by the user, the more Ticket deposits they will receive.',
	},
	{
		title: 'How to upgrade CoreCard?',
		content:
			'Increasing CoreCard levels can be done by burning platform token $CT or completing other tasks set by the platform. Coresky encourages users to upgrade CoreCard to get more Tickets.',
	},
];
</script>
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
