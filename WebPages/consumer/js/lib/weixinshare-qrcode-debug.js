!function (factory) {

    // amd & cmd
    if (typeof define == 'function' && (define.amd != undefined || define.cmd != undefined)) {
        define(function (require) {
            var jquery = require('jquery');
            var common = require('common');
            return factory(jquery, common);
        });
    } else {
        var ex = factory(jQuery, common);
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
(function ($, common) {

    var qrcode = {};

    qrcode.covershow = function () {
        $(window).bind("touchmove", function (e) {
            e.preventDefault();
        })
        $("<div class='showbox-w1' id='shareqrcode'><div class='show-yqhf'></div></div>").appendTo("body");
        $("#shareqrcode .show-yqhf").append($(".ewmboxz1-w").html());
        $("#shareqrcode").show();
    };

    qrcode.show = function () {
        if ("undefined" != typeof (wxjsconfig) && "undefined" != typeof (wxjsconfig.sharekey) && "undefined" != typeof (wxjsconfig.authurl)) {

            var search = window.location.search;
            if (search.length == 0)
                return;
            var qrtype = common.getUrlParam("qrtype");
            var qrtypeNumber;
            if (qrtype != null && qrtype != '')
                qrtypeNumber = new Number(qrtype);
            var category = 'consumer';
            var qrurl = 'register_generate_code'
            if (qrtypeNumber >= 34 && qrtypeNumber <= 41) {
                category = 'consumer';
                qrurl = 'share_generate_code';
            } else if (qrtypeNumber >= 30) {
                category = 'consumer';
                qrurl = 'activity_generate_code';
            } else if (qrtypeNumber >= 20) {
                category = 'consumer';

            } else if (qrtypeNumber >= 10) {

                category = 'retailer';
            } else {
                category = 'distributor';
            }

            var isshare = common.getUrlParam(wxjsconfig.sharekey);
            if (isshare != null && isshare != '') {

                var share_id = common.getUrlParam("share_id");

                var qrcode_url = "/webapi/" + category + "/weixin/" + qrurl + search;

                var qrtemtemplate = [
                	'<div class="ewmboxz1-w" id="shareqrcode">',
                	'<div class="ewmboxz1">',
                	'<img class="ewm" src="' + qrcode_url + '" /><br />',
                	'长按上方二维码图片关注超惠买<br />',
                	'<img class="adtext1" src="../image/adtext.png" />',
                	'</div>',
                	'</div>'
                ].join('');
                $("footer").before(qrtemtemplate);

                var updatecounturl = "/webapi/" + category + "/weixin/shareupdateopencount" + search;
                if (share_id != undefined) {
                    $.getJSON(updatecounturl);
                }

                var shareRegisterPage = "/" + category + "/page/shareqrcode.html?" + encodeURIComponent(qrcode_url);
                $("a").each(function () {
                    if ($(this).attr("href").indexOf('.html') > -1) {
                        var originalurl = $(this).attr("href");
                        $(this).attr("href", wxjsconfig.authurl.replace("__jump__", encodeURIComponent(encodeURIComponent(shareRegisterPage) + "-_-" + originalurl)))
                    }
                });
            };
        }

    }
    //兼容全局JS
    qrcode.qrcode = qrcode;
    return qrcode;

});
