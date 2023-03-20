<template>
	<div class="level">
		<h3>{{ $t('coreCard.cardLevel') }}</h3>
		<ul class="card-level-content">
			<li
				class="level-item-card"
				v-for="(item, i) in cardConfigList.slice(0, 6)"
				:key="i"
			>
				<img :src="getImageUrl(i, 'lv')" class="image" />
				<div class="info">
					<p>
						VIP level <sub>(centralization)</sub>
						<img :src="getImageUrl(i, 'vip')" alt="" />
					</p>
					<p>
						{{ $t('coreCard.ticketsWeek') }}
						<strong>{{ item.ticketIncome }}</strong>
					</p>
					<p>
						{{ $t('coreCard.coreskPoints')
						}}<span>{{ item.maxScore }}</span>
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	cardConfigList: {
		type: Array,
		default: [],
	},
});

const getImageUrl = (i, type) => {
	// 根据索引生成图像URL
	return type === 'lv'
		? require(`@/assets/core-card/v${i}.png`)
		: require(`@/assets/core-card/vip${i}.png`);
};
</script>
<style lang="scss" scoped>
.level {
	width: 904px;
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
			width: 411px;
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
				width: 260px;
				float: left;
				p {
					overflow: hidden;
					text-align: left;
					color: #717a83;
					line-height: 40px;
					font-size: 16px;
					font-weight: 400;
					&:last-child {
						margin-bottom: 0;
					}
					img {
						width: 83px;
						height: 40px;
						float: right;
					}
					sub {
						font-size: 12px;
						bottom: 0;
					}
					strong {
						color: #1063e0;
						float: right;
						font-weight: 700;
					}
					span {
						float: right;
						font-weight: 700;
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
