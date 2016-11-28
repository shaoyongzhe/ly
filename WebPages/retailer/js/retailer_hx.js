var pageIndex = 1;
avalon.ready(function () {
    avalon.scan(document.body)
    vm.GetInfo()
})
var vm = avalon.define({
    $id: 'retailer_hx',
    isShow: false,
    jsondata: [],
    //activity_id: common.getUrlParam("activityid"),
    GetInfo: function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            data: { pageindex: pageIndex },
            beforeSend: function () { common.loading.show(); },
            complete: function () { common.loading.hide(); },
            url: '/webapi/retailer/weixin/verify/history/',
            success: function (json) {
                common.loading.hide();//隐藏转圈动画

                json = json || {};   /* 统一加这句话 */
                if (json.error) {
                    toasterextend.showtips(json.error, "error");
                    return;
                }
                if (json.user_notification != undefined) {
                    toasterextend.showtips(json.user_notification, "info");
                    return;
                }

                if ($.isFunction(wxjsshare)) {
                    wxjsshare(json.share || {});
                }
                vm.jsondata = json
                vm.isShow = true
                $("#div_qrcode").css("display", "block")
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $(".pin-spinner").hide();//隐藏转圈动画

                var errormsg = "访问异常";

                if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                    var json = JSON.parse(XMLHttpRequest.responseText);
                    errormsg = JSON.parse(json.Message).error;
                    if (errormsg == undefined || errormsg == '')
                        errormsg = "Http error: " + XMLHttpRequest.statusText;
                }

                toasterextend.showtips(errormsg, "error");
            }
        });
    }
})