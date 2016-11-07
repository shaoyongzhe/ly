﻿var consumer_id = getUrlParam("consumer_id");

avalon.ready(function () {
    avalon.scan(document.body)

    $('.tip-w').click(function () {
        $('.tip-w').fadeOut(200);
    })

    $('.share').click(function () {
        $('.tip-w').fadeIn(200);
    })
    waitloadaddress(function () {
        loaddata(wxlocation.longitude, wxlocation.latitude);
    });
})
var vm = avalon.define({
    $id: "supercouponslist",
    jsondata: [],
    isShow: false,
    useticket: function (el) {// 码上用

        if (el.verifylimit > 0) {//可用状态，跳转到码上用核销界面
            var originalurl = "/consumer/page/superticket_hx.html?activity_item_guid=" + el.guid ;

            var search = window.location.search;
            var isshare = common.getUrlParam(wxjsconfig.sharekey);
            if (isshare != null && isshare != '' && search.length > 0) {
                var qrtype = common.getUrlParam("qrtype");
                var qrtypeNumber;
                if (qrtype != null && qrtype != '')
                    qrtypeNumber = new Number(qrtype);
                var category = 'consumer';
                var qrurl = 'register_generate_code'
                if (qrtypeNumber == 4000) {
                    category = 'consumer';
                    qrurl = 'share_generate_code';
                } else if (qrtypeNumber >= 34 && qrtypeNumber <= 41) {
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
                var share_id = common.getUrlParam("share_id");

                var qrcode_url = "/webapi/" + category + "/weixin/" + qrurl + search;

                var updatecounturl = "/webapi/" + category + "/weixin/shareupdateopencount" + search;
                if (share_id != undefined) {
                    $.getJSON(updatecounturl);
                }

                var shareRegisterPage = "/" + category + "/page/shareqrcode.html?" + encodeURIComponent(qrcode_url);
                location.href = wxjsconfig.authurl.replace("__jump__", encodeURIComponent(encodeURIComponent(shareRegisterPage) + "-_-" + encodeURIComponent(originalurl)))
            }
            else {
                location.href = originalurl;
            }
        }


    }
});

function loaddata(longitude, latitude) {

    var ajaxdata = { consumer_id: consumer_id, "activitykind": "distributor_to_consumer", "activitytype": "ticket" };
    if (wxjsconfig.sharekey != null)
        ajaxdata[wxjsconfig.sharekey] = "_";

    var search = window.location.search;
    if (search.length > 0) {
        var keyvalue = [];
        var key = "", value = "";
        var paraString = search.substring(search.indexOf("?") + 1, search.length).split("&");
        for (var i in paraString) {
            keyvalue = paraString[i].split("=");
            key = keyvalue[0];
            value = keyvalue[1];
            ajaxdata[key] = value;
        }
    }
    if (longitude != undefined && longitude != '' && latitude != undefined && latitude != '') {
        ajaxdata["longitude"] = longitude;
        ajaxdata["latitude"] = latitude
    }

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/webapi/consumer/weixin/nearby/tickets',// webapi/consumer/weixin/nearby/tickets
        data: ajaxdata,
        beforeSend: function () { common.loading.show(); },
        complete: function () { common.loading.hide(); },
        success: function (jsondata) {

            common.loading.hide();//数据请求成功即隐藏转圈动画
            vm.isShow = true
            jsondata = jsondata || {};
            if (jsondata.error) {
                toasterextend.showtips(jsondata.error, "error", false);
                qrcode.href();
                return;
            }

            if (jsondata.user_notification != undefined) {
                toasterextend.showtips(jsondata.user_notification, "info");
                $("#list").html(' <img class="lazy" src="/consumer/image/no-ticket.png"  style="width:60%;margin:120px 0 0 20%;" />');
                qrcode.href();
                return;
            }

            if (jsondata.data == undefined || jsondata.data.length == 0) {
                $("#list").html(' <img class="lazy" src="/consumer/image/no-ticket.png"  style="width:60%;margin:120px 0 0 20%;" />');
                qrcode.href();
                return;
            }
            if ($.isFunction(wxjsshare)) {
                wxjsshare(jsondata.share || {});
            }
            vm.jsondata = jsondata.data


            $("img.lazy").lazyload();
            setTimeout(qrcode.show, 200)
            setTimeout(function () {
                $('#ad_title').fadeOut(200);
            }, 6000)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            common.loading.hide();//隐藏转圈动画

            var errormsg = "访问异常";

            if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                var json = JSON.parse(XMLHttpRequest.responseText);
                errormsg = JSON.parse(json.Message).error;
                if (errormsg == undefined || errormsg == '')
                    errormsg = "Http error: " + XMLHttpRequest.statusText;
            }
            qrcode.href();
            toasterextend.showtips(errormsg, "error");
        }
    });
};