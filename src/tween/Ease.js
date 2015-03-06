/**
 * 缓动函数集合，用于实现不同变化速度类型的动画。
 * @author Lanfei
 * @class go2d.Ease
 * @extends go2d.Class
 */
var Ease = go2d.Ease = Class.extend({}, {
	/**
	 * 匀速缓动函数
	 * @static
	 * @function go2d.Ease.linear
	 * @param {number} t 当前时间
	 * @param {number} b 初始值
	 * @param {number} c 变化量
	 * @param {number} d 持续时间
	 * @return {number} 当前值
	 */
	linear: function(t, b, c, d) {
		return c * t / d + b;
	},
	/**
	 * 加速的二次方缓动函数
	 * @function go2d.Ease.easeInQuad
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInQuad: function(t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	/**
	 * 减速的二次方缓动函数
	 * @function go2d.Ease.easeOutQuad
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeOutQuad: function(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	/**
	 * 先加速后减速的二次方缓动函数
	 * @function go2d.Ease.easeInOutQuad
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInOutQuad: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	/**
	 * 加速的三次方缓动函数
	 * @function go2d.Ease.easeInCubic
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInCubic: function(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},
	/**
	 * 减速的三次方缓动函数
	 * @function go2d.Ease.easeOutCubic
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeOutCubic: function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	},
	/**
	 * 先加速后减速的三次方缓动函数
	 * @function go2d.Ease.easeInOutCubic
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInOutCubic: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	},
	/**
	 * 加速的四次方缓动函数
	 * @function go2d.Ease.easeInQuart
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInQuart: function(t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	/**
	 * 减速的四次方缓动函数
	 * @function go2d.Ease.easeOutQuart
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeOutQuart: function(t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	/**
	 * 先加速后减速的四次方缓动函数
	 * @function go2d.Ease.easeInOutQuart
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInOutQuart: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	/**
	 * 加速的五次方缓动函数
	 * @function go2d.Ease.easeInQuint
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInQuint: function(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	/**
	 * 减速的五次方缓动函数
	 * @function go2d.Ease.easeOutQuint
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeOutQuint: function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	/**
	 * 先加速后减速的五次方缓动函数
	 * @function go2d.Ease.easeInOutQuint
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInOutQuint: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	},
	/**
	 * 加速的正弦曲线缓动函数
	 * @function go2d.Ease.easeInSine
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInSine: function(t, b, c, d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	},
	/**
	 * 减速的正弦曲线缓动函数
	 * @function go2d.Ease.easeOutSine
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeOutSine: function(t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	},
	/**
	 * 先加速后减速的正弦曲线缓动函数
	 * @function go2d.Ease.easeInOutSine
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInOutSine: function(t, b, c, d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	},
	/**
	 * 加速的指数曲线缓动函数
	 * @function go2d.Ease.easeInExpo
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInExpo: function(t, b, c, d) {
		return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	},
	/**
	 * 减速的指数曲线缓动函数
	 * @function go2d.Ease.easeOutExpo
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeOutExpo: function(t, b, c, d) {
		return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	},
	/**
	 * 先加速后减速的指数曲线缓动函数
	 * @function go2d.Ease.easeInOutExpo
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInOutExpo: function(t, b, c, d) {
		if (t === 0) return b;
		if (t === d) return b + c;
		if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	/**
	 * 加速的圆形曲线缓动函数
	 * @function go2d.Ease.easeInCirc
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInCirc: function(t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},
	/**
	 * 减速的圆形曲线缓动函数
	 * @function go2d.Ease.easeOutCirc
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeOutCirc: function(t, b, c, d) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	},
	/**
	 * 先加速后减速的圆形曲线缓动函数
	 * @function go2d.Ease.easeInOutCirc
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInOutCirc: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	},
	/**
	 * 加速的指数衰减正弦曲线缓动
	 * @function go2d.Ease.easeInElastic
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInElastic: function(t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t === 0) return b;
		if ((t /= d) === 1) return b + c;
		if (!p) p = d * 0.3;
		if (a < Math.abs(c)) {
			a = c;
			s = p / 4;
		} else s = p / (2 * Math.PI) * Math.asin(c / a);
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	/**
	 * 减速的指数衰减正弦曲线缓动
	 * @function go2d.Ease.easeOutElastic
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeOutElastic: function(t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t === 0) return b;
		if ((t /= d) === 1) return b + c;
		if (!p) p = d * 0.3;
		if (a < Math.abs(c)) {
			a = c;
			s = p / 4;
		} else s = p / (2 * Math.PI) * Math.asin(c / a);
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	/**
	 * 先加速后减速的指数衰减正弦曲线缓动
	 * @function go2d.Ease.easeInOutElastic
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInOutElastic: function(t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t === 0) return b;
		if ((t /= d / 2) === 2) return b + c;
		if (!p) p = d * (0.3 * 1.5);
		if (a < Math.abs(c)) {
			a = c;
			s = p / 4;
		} else s = p / (2 * Math.PI) * Math.asin(c / a);
		if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	},
	/**
	 * 加速的超范围三次方缓动
	 * @function go2d.Ease.easeInBack
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInBack: function(t, b, c, d, s) {
		if (s === undefined) s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	/**
	 * 减速的超范围三次方缓动
	 * @function go2d.Ease.easeOutBack
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeOutBack: function(t, b, c, d, s) {
		if (s === undefined) s = 1.70158;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	/**
	 * 先加速后减速的超范围三次方缓动
	 * @function go2d.Ease.easeInOutBack
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInOutBack: function(t, b, c, d, s) {
		if (s === undefined) s = 1.70158;
		if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	/**
	 * 加速的指数衰减反弹缓动
	 * @function go2d.Ease.easeInBounce
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInBounce: function(t, b, c, d) {
		return c - jQuery.easing.easeOutBounce(d - t, 0, c, d) + b;
	},
	/**
	 * 减速的指数衰减反弹缓动
	 * @function go2d.Ease.easeOutBounce
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeOutBounce: function(t, b, c, d) {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
		} else {
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
		}
	},
	/**
	 * 先加速后减速的指数衰减反弹缓动
	 * @function go2d.Ease.easeInOutBounce
	 * @see 参数及返回值同 {@link go2d.Ease.linear}
	 */
	easeInOutBounce: function(t, b, c, d) {
		if (t < d / 2) return jQuery.easing.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
		return jQuery.easing.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	}
});
