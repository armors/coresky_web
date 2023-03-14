<template>
	<div class="level">
		<h3>CoreCard Level</h3>
		<ul class="card-level-content">
			<li class="level-item-card" v-for="(item, i) in items" :key="i">
				<img :src="getImageUrl(i, 'lv')" class="image" />
				<div class="info">
					<p>
						VIP level (centralization)
						<img :src="getImageUrl(i, 'vip')" alt="" />
					</p>
					<p>
						Daily lottery output
						<strong>{{ item.dailyOut }}</strong>
					</p>
					<p>
						The number of consum <span>{{ item.consum }}</span>
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script setup>
const getImageUrl = (i, type) => {
	// 根据索引生成图像URL
	return type === 'lv'
		? require(`@/assets/core-card/level${i + 1}.png`)
		: require(`@/assets/core-card/vip${i}.png`);
};

const items = [
	{
		id: 1,
		level: 1,
		dailyOut: 10,
		consum: 100,
	},
	{
		id: 2,
		level: 2,
		dailyOut: 100,
		consum: 500,
	},
	{
		id: 3,
		level: 3,
		dailyOut: '1,000',
		consum: '1,000',
	},
	{
		id: 4,
		level: 4,
		dailyOut: '10,000',
		consum: '5,000',
	},
	{
		id: 5,
		level: 5,
		dailyOut: '100,000',
		consum: '10,000',
	},
	{
		id: 6,
		level: 6,
		dailyOut: '1,000,000',
		consum: '50,000',
	},
];
</script>
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
				p {
					overflow: hidden;
					text-align: left;
					color: #717a83;
					line-height: 40px;
					&:last-child {
						margin-bottom: 0;
					}
					img {
						width: 83px;
						height: 40px;
						float: right;
					}
					strong {
						color: #1063e0;
						float: right;
					}
					span {
						float: right;
						font-weight: 500;
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
