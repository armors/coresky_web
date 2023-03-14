<template>
	<div id="box">
		<pre class="prev"><img src="@/assets/core-card/prev.png" alt=""></pre>
		<pre class="next"><img src="@/assets/core-card/next.png" alt=""></pre>
		<ul>
			<li v-for="(item, i) in 6" :key="i">
				<img :src="getImageUrl(i, 'png')" />
			</li>
		</ul>
	</div>
</template>
<script setup>
import { onMounted, defineEmits } from 'vue';

const getImageUrl = (i, type) => {
	// 根据索引生成图像URL
	return type === 'webp'
		? require(`@/assets/core-card/v${i}.webp`)
		: require(`@/assets/core-card/v${i}.png`);
};

const emits = defineEmits(['handleSelect']);

let selectedIndex = 2;

function ZoomPic() {
	this.initialize.apply(this, arguments);
}
ZoomPic.prototype = {
	initialize: function(id) {
		var _this = this;
		this.wrap = typeof id === 'string' ? document.getElementById(id) : id;
		this.oUl = this.wrap.getElementsByTagName('ul')[0];
		this.aLi = this.wrap.getElementsByTagName('li');
		this.prev = this.wrap.getElementsByTagName('pre')[0];
		this.next = this.wrap.getElementsByTagName('pre')[1];
		this.timer = null;
		this.aSort = [];
		this.iCenter = 3;
		this._doPrev = function() {
			return _this.doPrev.apply(_this);
		};
		this._doNext = function() {
			return _this.doNext.apply(_this);
		};
		this.options = [
			{ width: 65, height: 109, top: 71, left: 450, zIndex: 1 },
			{ width: 65, height: 109, top: 101, left: 270, zIndex: 2 },
			{ width: 98, height: 165, top: 97, left: 100, zIndex: 3 },
			{ width: 405, height: 450, top: -140, left: 255, zIndex: 4 },
			{ width: 98, height: 165, top: 97, left: 738, zIndex: 3 },
			{ width: 65, height: 109, top: 101, left: 570, zIndex: 2 },
		];
		for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
		this.aSort.unshift(this.aSort.pop());
		this.setUp();
		this.addEvent(this.prev, 'click', this._doPrev);
		this.addEvent(this.next, 'click', this._doNext);
		// this.doImgClick();
	},
	doPrev: function() {
    let i = selectedIndex <= 0 ? 5 : selectedIndex - 1;
    selectedIndex = this.aSort[i].index;
		this.aSort.unshift(this.aSort.pop());
    emits('handleSelect', selectedIndex);
		this.setUp();
	},
	doNext: function() {
    let i = selectedIndex >= 5 ? 0 : selectedIndex + 1;
    selectedIndex = this.aSort[i].index;
		this.aSort.push(this.aSort.shift());
    emits('handleSelect', selectedIndex);
		this.setUp();
	},
	doImgClick: function() {
		var _this = this;
		for (var i = 0; i < this.aSort.length; i++) {
			this.aSort[i].onclick = function() {
				if (this.index > _this.iCenter) {
					for (var i = 0; i < this.index - _this.iCenter; i++)
						_this.aSort.push(_this.aSort.shift());
					_this.setUp();
				} else if (this.index < _this.iCenter) {
					for (var i = 0; i < _this.iCenter - this.index; i++)
						_this.aSort.unshift(_this.aSort.pop());
					_this.setUp();
				}
			};
		}
	},
	setUp: function() {
		var _this = this;
		var i = 0;
		for (i = 0; i < this.aSort.length; i++)
			this.oUl.appendChild(this.aSort[i]);
		for (i = 0; i < this.aSort.length; i++) {
			this.aSort[i].index = i;
			if (i < 7) {
				this.css(this.aSort[i], 'display', 'block');
				this.doMove(this.aSort[i], this.options[i], function() {
					_this.doMove(
						_this.aSort[_this.iCenter].getElementsByTagName(
							'img'
						)[0],
						{ opacity: 100 },
						function() {
							_this.doMove(
								_this.aSort[_this.iCenter].getElementsByTagName(
									'img'
								)[0],
								{ opacity: 100 }
							);
						}
					);
				});
			} else {
				this.css(this.aSort[i], 'display', 'none');
				this.css(this.aSort[i], 'width', 0);
				this.css(this.aSort[i], 'height', 0);
				this.css(this.aSort[i], 'top', 37);
				this.css(this.aSort[i], 'left', this.oUl.offsetWidth / 2);
			}
			if (i < this.iCenter || i > this.iCenter) {
				this.css(
					this.aSort[i].getElementsByTagName('img')[0],
					'opacity',
					30
				);
				this.aSort[i].onmouseover = function() {
					_this.doMove(this.getElementsByTagName('img')[0], {
						opacity: 100,
					});
				};
				this.aSort[i].onmouseout = function() {
					_this.doMove(this.getElementsByTagName('img')[0], {
						opacity: 35,
					});
				};
				this.aSort[i].onmouseout();
			} else {
				this.aSort[i].onmouseover = this.aSort[i].onmouseout = null;
			}
      
		}
    this.aSort[3].getElementsByTagName('img')[0].src = getImageUrl(
			selectedIndex,
			'webp'
		);
	},
	addEvent: function(oElement, sEventType, fnHandler) {
		return oElement.addEventListener
			? oElement.addEventListener(sEventType, fnHandler, false)
			: oElement.attachEvent('on' + sEventType, fnHandler);
	},
	css: function(oElement, attr, value) {
		if (arguments.length == 2) {
			return oElement.currentStyle
				? oElement.currentStyle[attr]
				: getComputedStyle(oElement, null)[attr];
		} else if (arguments.length == 3) {
			switch (attr) {
				case 'width':
				case 'height':
				case 'top':
				case 'left':
				case 'bottom':
					oElement.style[attr] = value + 'px';
					break;
				case 'opacity':
					oElement.style.filter = 'alpha(opacity=' + value + ')';
					oElement.style.opacity = value / 100;
					break;
				default:
					oElement.style[attr] = value;
					break;
			}
		}
	},
	doMove: function(oElement, oAttr, fnCallBack) {
		var _this = this;
		clearInterval(oElement.timer);
		oElement.timer = setInterval(function() {
			var bStop = true;
			for (var property in oAttr) {
				var iCur = parseFloat(_this.css(oElement, property));
				property == 'opacity' &&
					(iCur = parseInt(iCur.toFixed(2) * 100));
				var iSpeed = (oAttr[property] - iCur) / 5;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if (iCur != oAttr[property]) {
					bStop = false;
					_this.css(oElement, property, iCur + iSpeed);
				}
			}
			if (bStop) {
				clearInterval(oElement.timer);
				fnCallBack && fnCallBack.apply(_this, arguments);
			}
		}, 30);
	},
};
onMounted(() => {
	function wrapper() {
		new ZoomPic('box');
	}
	wrapper();
});
</script>
<style lang="scss" scoped>
#box {
	position: relative;
	width: 997px;
	height: 360px;
	margin: 0 auto;
}
#box ul {
	position: relative;
	width: 919px;
	height: 360px;
  margin: 0 auto;
}
#box li {
	position: absolute;
	list-style: none;
	width: 0;
	height: 0;
	top: 146px;
	left: 377px;
	z-index: 0;
	cursor: pointer;
	overflow: hidden;
	border-radius: 3px;
}
#box li img {
	width: 100%;
	height: 100%;
	vertical-align: top;
}
#box li div {
	position: absolute;
	bottom: -100px;
	width: 100%;
	height: 100px;
	background: #000;
	filter: alpha(opacity=70);
	opacity: 0.7;
}
#box li div h4 {
	margin: 0 10px;
	font: 12px/24px arial;
	border-bottom: 1px #333 solid;
}
#box li div h4 span {
	color: red;
	margin-left: 10px;
}
#box li div p {
	margin: 5px 10px 0;
	text-indent: 2em;
}
#box .prev,
#box .next {
	position: absolute;
	top: 50%;
	width: 15px;
	height: 30px;
	margin-top: -40px;
	overflow: hidden;
	cursor: pointer;
	background: no-repeat;
	color: #000;
}
#box .prev {
	left: 0px;
}
#box .next {
	right: 0px;
	background-position: -39px 0;
}
#copyright {
	padding-top: 10px;
	text-align: center;
}
</style>
