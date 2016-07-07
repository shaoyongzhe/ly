!function (factory) {

    // amd & cmd
    if (typeof define == 'function' && (define.amd != undefined || define.cmd != undefined)) {
        define(function (require) {
            var wx = require('wx');
            var wxjsconfig = require('wxjsconfig');
            var toasterextend = require('toasterextend');
            return factory(wx, wxjsconfig, toasterextend);
        });
    } else {
        var ex = factory($, Guid, wx);
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
(function (wx, wxjsconfig, toasterextend) {
    var wxlocation = {};

    function saveLocation(latitude, longitude) {
        setCookie("wx-lat", latitude);
        setCookie("wx-lng", longitude);
    }

    function setCookie(name, value) {
        //var days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + 5* 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    wxlocation.latitude = getCookie("wx-lat");
    wxlocation.longitude = getCookie("wx-lng");
    if (wxlocation.latitude != undefined && wxlocation.latitude != null && wxlocation.latitude.length > 0 && wxlocation.longitude.length > 0) {
        wxlocation.wxlocation = wxlocation
        return wxlocation;
    }
    if (typeof (wxjsconfig.apimode) != 'undefined'
            && (wxjsconfig.apimode == "test" || wxjsconfig.apimode == "demo")
             && typeof (wxjsconfig.testdata) != 'undefined' && typeof (wxjsconfig.testdata.location) != 'undefined'
             && typeof (wxjsconfig.testdata.location.latitude) != 'undefined'
             && typeof (wxjsconfig.testdata.location.longitude) != 'undefined')
        saveLocation(wxjsconfig.testdata.location.latitude, wxjsconfig.testdata.location.longitude);
    else
        wx.ready(function () {
            toasterextend.showtips("正在获取位置", "info");
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    toasterextend.hidetips();
                    alert(res);
                    saveLocation(res.latitude, res.longitude);
                },
                fail: function () {
                    toasterextend.hidetips();
                }
            });
        });
    wxlocation.wxlocation = wxlocation
    return wxlocation;
});