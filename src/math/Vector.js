/**
 * 向量类，实现向量基本运算，可表达一个二维坐标。
 * @author Lanfei
 * @class go2d.Vector
 * @extends go2d.Class
 * @param {number} x 向量水平坐标
 * @param {number} y 向量垂直坐标
 */
var Vector = go2d.Vector = Class.extend({
	__init: function(x, y) {
		this.set(x, y);

		/**
		 * 向量长度
		 * @readonly
		 * @member go2d.Vector#length
		 * @type {number}
		 */
		Object.defineProperty(this, 'length', {
			set: function() {},
			get: function() {
				return Math.sqrt(this.x * this.x + this.y * this.y);
			}
		});
	},
	/**
	 * 设置向量属性值，参数同构造函数
	 * @function go2d.Vector#set
	 * @return {this}
	 */
	set: function(x, y) {
		if (x instanceof Vector) {
			this.set(x.x, x.y);
		} else {

			/**
			 * 向量水平坐标
			 * @member go2d.Vector#x
			 * @type {number}
			 */
			this.x = x || 0;

			/**
			 * 向量垂直坐标
			 * @member go2d.Vector#y
			 * @type {number}
			 */
			this.y = y || 0;
		}
		return this;
	},
	/**
	 * 向量加法
	 * @function go2d.Vector#add
	 * @param {go2d.Vector} vector 要相加的向量
	 * @return {this}
	 */
	add: function(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	},
	/**
	 * 向量减法
	 * @function go2d.Vector#subtract
	 * @param {go2d.Vector} vector 要相减的向量
	 * @return {this}
	 */
	subtract: function(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	},
	/**
	 * 向量除法
	 * @function go2d.Vector#divide
	 * @param {go2d.Vector} vector 要除以的向量
	 * @return {this}
	 */
	divide: function(v) {
		this.x /= v.x;
		this.y /= v.y;
		return this;
	},
	/**
	 * 向量点乘
	 * @function go2d.Vector#dotProduct
	 * @param {go2d.Vector} vector 要点乘的向量
	 * @return {this}
	 */
	dotProduct: function(v) {
		return this.x * v.x + this.y * v.y;
	},
	/**
	 * 求单位向量
	 * @function go2d.Vector#normalize
	 * @return {this}
	 */
	normalize: function() {
		var length = this.length;
		this.x = this.x / length;
		this.y = this.y / length;
		return this;
	},
	/**
	 * 向量缩放
	 * @function go2d.Vector#scale
	 * @param {number} x 水平方向缩放比例
	 * @param {number} y 垂直方向缩放比例
	 * @return {this}
	 */
	scale: function(x, y) {
		this.x *= x;
		this.y *= y === undefined ? x : y;
		return this;
	},
	/**
	 * 向量缩放
	 * @function go2d.Vector#rotate
	 * @param {number} angle 旋转的角度（弧度制）
	 * @return {this}
	 */
	rotate: function(angle) {
		var x = this.x;
		var y = this.y;
		this.x = x * Math.cos(angle) - y * Math.sin(angle);
		this.y = x * Math.sin(angle) + y * Math.cos(angle);
		return this;
	},
	/**
	 * 求向量与水平方向的夹角
	 * @function go2d.Vector#angle
	 * @return {number} 向量与水平方向的夹角（弧度制）
	 */
	angle: function() {
		return Math.atan2(this.y, this.x);
	},
	/**
	 * 求与另一个向量之间的距离
	 * @function go2d.Vector#distance
	 * @param {go2d.Vector} vector 要求距离的向量
	 * @return {number} 两向量之间的距离
	 */
	distance: function(v) {
		return Math.sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
	},
	/**
	 * 创建当前向量的克隆对象
	 * @function go2d.Vector#clone
	 * @return {go2d.Vector} 当前向量的克隆对象
	 */
	clone: function() {
		return new Vector(this);
	}
});
