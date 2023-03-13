<template>
	<div id="box">
		<pre class="prev">prev</pre>
		<pre class="next">next</pre>
		<ul>
			<li
				style="display: block; width: 65px; height: 109px; top: 71px; left: 131px; z-index: 1;"
			>
				<img src="@/assets/core-card/img1.png" />
			</li>
			<li
				style="display: block; width: 65px; height: 109px; top: 61px; left: 2px; z-index: 2;"
			>
				<img src="@/assets/core-card/img2.png" />
			</li>
			<li
				style="display: block; width: 98px; height: 165px; top: 37px; left: 114px; z-index: 3;"
			>
				<img src="@/assets/core-card/img3.png" />
			</li>
			<li
				style="display: block; width: 264px; height: 450px; top: 0px; left: 267px; z-index: 4;"
			>
				<img src="@/assets/core-card/img4.png" />
			</li>
			<li
				style="display: block; width: 98px; height: 165px; top: 37px; left: 472px; z-index: 3;"
			>
				<img src="@/assets/core-card/img5.png" />
			</li>
			<li
				style="display: block; width: 65px; height: 109px;top: 61px; left: 617px; z-index: 2;"
			>
				<img src="@/assets/core-card/img6.png" />
			</li>
		</ul>
	</div>
</template>
<script setup>
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
			{ width: 65, height: 109, top: 71, left: 134, zIndex: 1 },
			{ width: 65, height: 109, top: 61, left: 0, zIndex: 2 },
			{ width: 98, height: 165, top: 37, left: 110, zIndex: 3 },
			{ width: 264, height: 450, top: -100, left: 262, zIndex: 4 },
			{ width: 98, height: 165, top: 37, left: 468, zIndex: 3 },
			{ width: 65, height: 109, top: 61, left: 620, zIndex: 2 },
		];
		for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
		this.aSort.unshift(this.aSort.pop());
		this.setUp();
		this.addEvent(this.prev, 'click', this._doPrev);
		this.addEvent(this.next, 'click', this._doNext);
		this.doImgClick();
		this.timer = setInterval(function() {
			_this.doNext();
		}, 3000);
		this.wrap.onmouseover = function() {
			clearInterval(_this.timer);
		};
		this.wrap.onmouseout = function() {
			_this.timer = setInterval(function() {
				_this.doNext();
			}, 3000);
		};
	},
	doPrev: function() {
		this.aSort.unshift(this.aSort.pop());
		this.setUp();
	},
	doNext: function() {
		this.aSort.push(this.aSort.shift());
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
								{ opacity: 100 },
								function() {
									_this.aSort[
										_this.iCenter
									].onmouseover = function() {
										_this.doMove(
											this.getElementsByTagName('div')[0],
											{ bottom: 0 }
										);
									};
									_this.aSort[
										_this.iCenter
									].onmouseout = function() {
										_this.doMove(
											this.getElementsByTagName('div')[0],
											{ bottom: -100 }
										);
									};
								}
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
window.onload = function() {
	new ZoomPic('box');
};
</script>

<style lang="scss" scoped>
body,
div,
ul,
li,
h4,
p {
	margin: 0;
	padding: 0;
}
body {
	font: 12px/1.8 arial;
	color: #fff;
	background: 50% 0 no-repeat #000;
}
a {
	color: #fff;
	text-decoration: none;
	background: #666;
	padding: 2px 5px;
}
a:hover {
	background: #f90;
}
#box {
	position: relative;
	width: 754px;
	height: 496px;
	margin: 0 auto;
	padding-top: 130px;
}
#box ul {
	position: relative;
	width: 754px;
	height: 292px;
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
	width: 39px;
	height: 80px;
	margin-top: -40px;
	overflow: hidden;
	text-indent: -999px;
	cursor: pointer;
	background: no-repeat;
}
#box .prev {
	left: -60px;
}
#box .next {
	right: -60px;
	background-position: -39px 0;
}
#copyright {
	padding-top: 10px;
	text-align: center;
}
</style>
