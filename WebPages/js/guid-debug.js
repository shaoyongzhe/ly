!function (factory) {

	// amd & cmd
	if (typeof define == 'function' && (define.amd != undefined || define.cmd != undefined)) {
		define(function () {
			return factory();
		});
	} else {
		var ex = factory();
		// CommonJS NodeJS
		if (typeof module !== 'undefined' && typeof exports === 'object') {
			module.exports = ex;
		}
		// without module
		else {
			for (var i in ex) {
				window[i] = ex[i];
			}
		}
	}
}
(function () {

	var common = {};

	function Guid() {
        this.date = new Date();        
    }
    /* 生成Guid码 */
    Guid.prototype.newGuid = function () {
        this.date = new Date();
        var guidStr = '';
        sexadecimalDate = this.hexadecimal(this.getGuidDate(), 16);
        sexadecimalTime = this.hexadecimal(this.getGuidTime(), 16);
        for (var i = 0; i < 9; i++) {
            guidStr += Math.floor(Math.random() * 16).toString(16);
        }
        guidStr += sexadecimalDate;
        guidStr += sexadecimalTime;
        while (guidStr.length < 32) {
            guidStr += Math.floor(Math.random() * 16).toString(16);
        }
        return this.formatGuid(guidStr);
    }

    /*
     * 功能：获取当前日期的Guid格式，即8位数的日期：19700101
     * 返回值：返回Guid日期格式的字条串
     */
    Guid.prototype.getGuidDate = function () {
        return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date.getDay());
    }

    /*
     * 功能：获取当前时间的Guid格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933
     * 返回值：返回Guid日期格式的字条串
     */
    Guid.prototype.getGuidTime = function () {
        return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(this.date.getSeconds()) + this.addZero(parseInt(this.date.getMilliseconds() / 10));
    }

    /*
     * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现
     * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串
     * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串
     */
    Guid.prototype.addZero = function (num) {
        if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
            return '0' + Math.floor(num);
        } else {
            return num.toString();
        }
    }

    /* 
     * 功能：将y进制的数值，转换为x进制的数值
     * 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10
     * 返回值：返回转换后的字符串
     */
    Guid.prototype.hexadecimal = function (num, x, y) {
        if (y != undefined) {
            return parseInt(num.toString(), y).toString(x);
        } else {
            return parseInt(num.toString()).toString(x);
        }
    }

    /*
     * 功能：格式化32位的字符串为Guid模式的字符串
     * 参数：第1个参数表示32位的字符串
     * 返回值：标准Guid格式的字符串
     */
    Guid.prototype.formatGuid = function (guidStr) {
        var str1 = guidStr.slice(0, 8),
            str2 = guidStr.slice(8, 12),
            str3 = guidStr.slice(12, 16),
            str4 = guidStr.slice(16, 20),
            str5 = guidStr.slice(20);
        return str1 + str2 + str3 + str4 + str5;
    }
	Guid.Guid= Guid;
	return Guid;

});
