<template>
	<div class="level">
		<h3>CoreCard Level</h3>
		<ul class="card-level-content">
			<li class="level-item-card" v-for="(item, i) in 6" :key="i">
				<img src="@/assets/core-card/level3.png" class="image" alt="" />
				<div class="info">
					<p>VIP level (centralization) <strong>VIP 1</strong></p>
					<p>Daily lottery output <strong>A</strong></p>
					<p>The number of consum <strong>100</strong></p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script setup></script>
<style lang="scss" scoped>
.level {
	width: 900px;
	height: 716px;
	border: 1px solid #e6e8ec;
	border-radius: 16px;
	background: rgba(255, 255, 255, 0.5);
	backdrop-filter: blur(10px);
	margin: 0 auto;
	padding: 30px;
	h3 {
		font-size: 30px;
		line-height: 35px;
	}
	.card-level-content {
		overflow: hidden;
		.level-item-card {
			float: left;
			width: 409px;
			height: 177px;
			padding: 30px;
			background: #ffffff;
			border: 1px solid #e6e8ec;
			border-radius: 8px;
			margin-top: 30px;
			overflow: hidden;
			margin-right: 20px;
			.image {
				width: 69px;
				height: 117px;
				float: left;
				margin-right: 20px;
			}
			.info {
				width: 258px;
				float: left;
				padding: 12px 0;
				p {
					margin-bottom: 18px;
					overflow: hidden;
					text-align: left;
					color: #717a83;
					&:last-child {
						margin-bottom: 0;
					}
					strong {
						float: right;
					}
				}
			}
		}
		:nth-child(2n) {
			margin-right: 0;
		}
	}
}
</style>
