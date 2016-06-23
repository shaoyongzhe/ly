$(function () {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    $.ajax2 = function (options) {

        var complete = options.complete;
        options.complete = function (httpRequest, status) {

            if ($(".pin-spinner"))
                $(".pin-spinner").hide();
            if (httpRequest == null) {
                showTips("网络不稳定，请退出重新进入！", "error", false);
                return;
            }
            httpRequest.responseJSON = httpRequest.responseJSON || {};
            if (httpRequest.responseJSON.error) {

                showTips(httpRequest.responseJSON.error, "error", false);
                return;
            }
            if (httpRequest.responseJSON.user_notification != undefined) {

                showTips(httpRequest.responseJSON.user_notification, "info");
                return;
            }
            if (complete) {
                complete(httpRequest, status);
            }
        };
        var beforeSend = options.beforeSend;

        options.beforeSend = function (XMLHttpRequest) {
            $(".pin-spinner").show();
            if (beforeSend) {
                beforeSend(httpRequest, status);
            }
        };
        options.error = function (XMLHttpRequest, textStatus, errorThrown) {
            $(".pin-spinner").hide()

            var errormsg = "访问异常";

            if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                var json = JSON.parse(XMLHttpRequest.responseText);
                errormsg = JSON.parse(json.Message).error;
                if (errormsg == undefined || errormsg == '')
                    errormsg = "Http error: " + XMLHttpRequest.statusText;
            }

            toasterextend.showtips(errormsg, "error");
        };

        options.async = true;
        $.ajax(options);
    };


    $.getJSON2 = function (url,data,callback) {		
        if ( jQuery.isFunction( data ) ) {			
			callback = data;
			data = undefined;
		}
        $.ajax2({
            type: 'GET',
            dataType: 'json',
            url: url,
			data: data,
            success: function (jsondata, textStatus, jqXHR) {	
				if(jQuery.isFunction(callback))
					callback(jsondata, textStatus, jqXHR);
            }
        });
    };
	
});


/*
 * 功能：生成一个GUID码，其中GUID以14个以下的日期时间及18个以上的16进制随机数组成，GUID存在一定的重复概率，但重复概率极低，理论上重复概率为每10ms有1/(16^18)，即16的18次方分之1，重复概率低至可忽略不计
 * 免责声明：此代码为作者学习专用，如在使用者在使用过程中因代码问题造成的损失，与作者没有任何关系
 * 日期：2014年9月4日
 * 作者：wyc
 * http://www.cnblogs.com/wuyuchang
 */

 
function GUID() {
    this.date = new Date();

    /* 判断是否初始化过，如果初始化过以下代码，则以下代码将不再执行，实际中只执行一次 */
    if (typeof this.newGUID != 'function') {
        
        /* 生成GUID码 */
        GUID.prototype.newGUID = function() {
            this.date = new Date();
            var guidStr = '';
                sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16);
                sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16);
            for (var i = 0; i < 9; i++) {
                guidStr += Math.floor(Math.random()*16).toString(16);
            }
            guidStr += sexadecimalDate;
            guidStr += sexadecimalTime;
            while(guidStr.length < 32) {
                guidStr += Math.floor(Math.random()*16).toString(16);
            }
            return this.formatGUID(guidStr);
        }

        /*
         * 功能：获取当前日期的GUID格式，即8位数的日期：19700101
         * 返回值：返回GUID日期格式的字条串
         */
        GUID.prototype.getGUIDDate = function() {
            return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date.getDay());
        }

        /*
         * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933
         * 返回值：返回GUID日期格式的字条串
         */
        GUID.prototype.getGUIDTime = function() {
            return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(this.date.getSeconds()) + this.addZero( parseInt(this.date.getMilliseconds() / 10 ));
        }

        /*
         * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现
         * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串
         * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串
         */
        GUID.prototype.addZero = function(num) {
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
        GUID.prototype.hexadecimal = function(num, x, y) {
            if (y != undefined) {
                return parseInt(num.toString(), y).toString(x);
            } else {
                return parseInt(num.toString()).toString(x);
            }
        }

        /*
         * 功能：格式化32位的字符串为GUID模式的字符串
         * 参数：第1个参数表示32位的字符串
         * 返回值：标准GUID格式的字符串
         */
        GUID.prototype.formatGUID = function(guidStr) {
            var str1 = guidStr.slice(0, 8) + '-',
                str2 = guidStr.slice(8, 12) + '-',
                str3 =  guidStr.slice(12, 16) + '-',
                str4 = guidStr.slice(16, 20) + '-',
                str5 = guidStr.slice(20);
            return str1 + str2 + str3 + str4 + str5;
        }
    }
}

function zReloadValidationImage(img_obj) {

    var img_orig_src = img_obj.attr('orig_src');

    img_obj.attr('src', img_orig_src + "?rand=" + Math.random());
}




function isEmpty(strVal) {
    if (strVal == null || $.trim(strVal).length < 1) return true;
    else return false;
}
 

function checkVerifyCode(vCode) {
    if (vCode.length != 6 || isNaN(vCode)) {
        return false
    }
    else {
        return true;
    }
}

function dialogWindow(title) {
    var dialogHtml = $("#dialogMessage");
    //console.log(dialogHtml.length);
    if (dialogHtml.length > 0) {
        $("#messageText").html(title);
    } else {
        dialogHtml = $("<div class='pop-box' id='dialogMessage'><h2 class='success' style='font-size:18px !important;'> <span id='messageText'>" + title + "</span></h2></div>");
    }

    var dialog = dialogHtml.removeClass('hide').dialog({
        modal: true,
        title: "消息提示",
        title_html: false,
        //隐藏默认的关闭按钮
        open: function (event, ui) {
            //$(".ui-widget-header", $(this).parent()).hide();
        }
    });
}

jQuery.fn.countDown = function (settings, to) {
    settings = jQuery.extend({
        startFontSize: '36px',
        endFontSize: '12px',
        duration: 1000,
        startNumber: 10,
        endNumber: 0,
        callBack: function () { }
    }, settings);
    return this.each(function () {

        //where do we start?
        if (!to && to != settings.endNumber) { to = settings.startNumber; }

        //set the countdown to the starting number
        $(this).text(to).css('fontSize', settings.startFontSize);

        //loopage
        $(this).animate({
            'fontSize': settings.endFontSize
        }, settings.duration, '', function () {
            if (to > settings.endNumber + 1) {
                $(this).css('fontSize', settings.startFontSize).text(to - 1).countDown(settings, to - 1);
            }
            else {
                settings.callBack(this);
            }
        });

    });
};
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) { }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));
