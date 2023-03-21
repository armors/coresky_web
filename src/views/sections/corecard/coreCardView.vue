<template>
	<div class="corecard-view">
		<pre class="prev" @click="changePre()"><img src="@/assets/core-card/prev.png" alt=""></pre>
		<pre class="next" @click="changeNext()"><img src="@/assets/core-card/next.png" alt=""></pre>
		<div class="card-list">


			<div class="card-item" :class="getClassIndex(0)">
				<img :src="require(`@/assets/core-card/v0.png`)" v-if="getClassIndex(0) !== 'card-0'" alt="">
				<img :src="require(`@/assets/core-card/v0.webp`)" v-else alt="">
			</div>
			<div class="card-item" :class="getClassIndex(1)">
				<img :src="require(`@/assets/core-card/v1.png`)" v-if="getClassIndex(1) !== 'card-0'">
				<img :src="require(`@/assets/core-card/v1.webp`)" v-else alt="">
			</div>
			<div class="card-item" :class="getClassIndex(2)">
				<img :src="require(`@/assets/core-card/v2.png`)" v-if="getClassIndex(2) !== 'card-0'">
				<img :src="require(`@/assets/core-card/v2.webp`)" v-else alt="">
			</div>
			<div class="card-item" :class="getClassIndex(3)">
				<img :src="require(`@/assets/core-card/v3.png`)" v-if="getClassIndex(3) !== 'card-0'">
				<img :src="require(`@/assets/core-card/v3.webp`)" v-else alt="">
			</div>
			<div class="card-item" :class="getClassIndex(4)">
				<img :src="require(`@/assets/core-card/v4.png`)" v-if="getClassIndex(4) !== 'card-0'">
				<img :src="require(`@/assets/core-card/v4.webp`)" v-else alt="">
			</div>
			<div class="card-item" :class="getClassIndex(5)">
				<img :src="require(`@/assets/core-card/v5.png`)" v-if="getClassIndex(5) !== 'card-0'">
				<img :src="require(`@/assets/core-card/v5.webp`)" v-else alt="">
			</div>
		</div>
	</div>
</template>
<script>

export default {
	mixins: [],
	name: 'coreCardView',
	components: {
	},
	data () {
		return {
			activeIndex: 0
		};
	},
	watch: {
	},
	created () {

	},
	mounted () { },

	methods: {
		setViewIndex (index) {
			this.activeIndex = index
		},
		init () {

		},
		changePre () {
			if (this.activeIndex === 0) {
				this.activeIndex = 5
			}
			else {
				this.activeIndex -= 1
			}
			this.$emit('handleSelect', this.activeIndex);
		},
		changeNext () {
			if (this.activeIndex === 5) {
				this.activeIndex = 0
			}
			else {
				this.activeIndex += 1
			}
			this.$emit('handleSelect', this.activeIndex);
		},
		getClassIndex (index) {
			let arr = [0, 1, 2, 3, 4, 5]
			switch (this.activeIndex) {
				case 0:
					arr = [0, 1, 2, 3, 4, 5]
					break;
				case 1:
					arr = [5, 0, 1, 2, 3, 4]
					break;
				case 2:
					arr = [4, 5, 0, 1, 2, 3]
					break;
				case 3:
					arr = [3, 4, 5, 0, 1, 2]
					break;
				case 4:
					arr = [2, 3, 4, 5, 0, 1]
					break;
				case 5:
					arr = [1, 2, 3, 4, 5, 0]
					break;
			}
			return 'card-' + arr[index]
		}
	},
	beforeUnmount () {

	}
};
</script>
<style lang="scss" scoped>
.corecard-view {
	position: relative;
	width: 997px;
	height: 540px;
	margin: 0 auto;
	.card-list {
		position: relative;
		width: 919px;
		margin: 0 auto;
		top: 160px;
	}
}

.card-item {
	position: absolute;
	transition: all 0.3s;
	img {
		width: 100%;
		height: 100%;
		vertical-align: top;
		opacity: 0.35;
	}
}

.card-0 {
	width: 405px;
	height: 450px;
	top: -140px;
	left: 255px;
	z-index: 4;
	img {
		opacity: 1
	}
}
.card-1 {
	width: 98px;
	height: 165px;
	top: 97px;
	left: 738px;
	z-index: 3;
}
.card-2 {
	width: 65px;
	height: 109px;
	top: 101px;
	left: 570px;
	z-index: 2;

}
.card-3 {
	width: 65px;
	height: 109px;
	top: 71px;
	left: 428px;
	z-index: 1;
}
.card-4 {
	width: 65px;
	height: 109px;
	top: 101px;
	left: 270px;
	z-index: 2;
}
.card-5 {
	width: 98px;
	height: 165px;
	top: 97px;
	left: 100px;
	z-index: 3;
}

.prev,
.next {
	position: absolute;
	top: 450px;
	width: 15px;
	height: 30px;
	margin-top: -120px;
	overflow: hidden;
	cursor: pointer;
	background: no-repeat;
	color: #000;
}
.prev {
	left: 0px;
}
.next {
	right: 0px;
	background-position: -39px 0;
}
</style>


