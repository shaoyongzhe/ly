!function (factory) {

    // amd & cmd
    if (typeof define == 'function' && (define.amd != undefined || define.cmd != undefined)) {
        define(function (require) {
            var jquery = require('jquery');
            var toastr = require('jquery-toastr');
            return factory(jquery, toastr);
        });
    } else {
        var ex = factory(jQuery, toastr);
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
(function ($, toastr) {

    var toasterextend = {};

    toasterextend.showTipsAttach = function (msg, title, shortCutFunction, attachWindowClose) {

        if ($("#toast-container").children().length > 0) {
            $("#toast-container").children().remove(0);
        }

        if (msg == "") msg = "未知错误，请确保网络信号稳定！";

        if (attachWindowClose == 'undefined') attachWindowClose = false;

        var toastCount = 0;
        var toastIndex = toastCount++;
        toastr.options = {
            closeButton: false,
            debug: false,
            newestOnTop: false,
            progressBar: true,
            positionClass: "toast-top-full-width",
            preventDuplicates: false,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "2000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
            attachCloseWinxinWindow: attachWindowClose
        }
        var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
        $toastlast = $toast;

        if (typeof $toast === 'undefined') {
            return;
        }
    };

    toasterextend.showtipsautoclose = function (msg, shortCutFunction) {
        toasterextend.showTipsAttach(msg, "", shortCutFunction, true);
    }
    toasterextend.showtips = function (msg, shortCutFunction) {
        toasterextend.showTipsAttach(msg, "", shortCutFunction);
    }
    toasterextend.hidetips = function () {
        //toastr.hideToast(); 没有这个属性报错阻塞数据加载
    }
    toasterextend.toasterextend = toasterextend;
    return toasterextend;
});

