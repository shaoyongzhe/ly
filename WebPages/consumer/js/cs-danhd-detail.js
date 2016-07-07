var pageType = 0;
function shareactivities() {
    var ajaxdata = {};
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
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/webapi/consumer/weixin/shareactivities',
        data: ajaxdata,//activity_id: "af8354af48ed490284aa7ede644677b5"
        beforeSend: function () {common.loading.show(); },
        complete: function () {common.loading.hide(); },
        success: function (jsondata) {

           common.loading.hide();//数据请求成功即隐藏转圈动画

            jsondata = jsondata || {};
            if (jsondata.error) {
                toasterextend.showtips(jsondata.error, "error", false);
                qrcode.href();
                return;
            }

            if (jsondata.user_notification != undefined) {
                toasterextend.showtips(jsondata.user_notification, "info");
                qrcode.href();
                return;
            }

            var obj = jsondata.data[0];
            if (!obj) {
                toasterextend.showtips("活动已结束，点一下 附近门店 找找其它活动", "info");
                qrcode.href();
                return;
            }
            var html;
            if (pageType == 0) {
                html = ' <div class="container-w"> <div class="mainpic"><img src="' + obj.posterpic + '" /><div class="state1 moreh">' + common.product.getFlag(obj.activity_flag) + '</div></div>'
                   + '<div class="dpdetail-info"><div class="hdname">' + obj.activitytitle + '</div>'
                   + '<div class="hdtime1"><img src="../image/icon02_2.png" />' + obj.begintime + '至' + obj.endtime + '</div></div>';

                if (obj.changes != null && obj.changes.length > 0) {
                    html += '<div class="chdetail-textbox">'
                    + '<div class="chtext-tit"><div class="bgline"></div><div class="bgcolor"></div><div class="tit">更正说明</div></div>';
                    for (var j = 0; j < obj.changes.length; j++) {
                        var change = obj.changes[j];
                        html += '<div class="chdetail-cont">' + change.correctdescription + '</div>';
                    }
                    html += '</div>';
                }
                html += '<div class="chdetail-textbox" style="padding-top:15px;"><div class="chtext-tit"><div class="bgline2"></div><div class="bgcolor2"></div><div class="tit">优惠详情</div></div></div>'
             + '<ul class="ul-list">';

            }
            var n = obj.items.length;
            for (var i = 0; i < n; i++)
                html += getActItem(obj.items[i]);
            if (pageType == 0) {
                html += '</ul><div class="more-md-w"><div class="more-md"><div class="text">活动共有<span>' + obj.retailer_count + '</span>家门店参加<br />看看有没有您附近的!</div>'
                    + '<a href="/consumer/page/retailerlist.html" > <div class="btn">点击查看</div></a></div> </div>';

                if (obj.description != '' && obj.description != null) {
                    html += '<div class="chdetail-textbox" style=" border-bottom:1px=border-bottom:1px solid #ccc;">'
					+ '<div class="chtext-tit"><div class="bgline2"></div><div class="bgcolor2"></div><div class="tit">补充信息</div></div><div class="chdetail-cont2">' + obj.description + '</div>'
					+ '</div>';
                }
                html += "</div>"


                $("#list").html(html);
            } else {
                $("#list>div[data-id=\"duohd_" + activity_id_list + "\"]").find(".duohdbox-cont ul").html(html);
            }
            if ($.isFunction(wxjsshare)) {
                wxjsshare(jsondata.share || {});
            }
            qrcode.show();
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
function getActItem(obj) {
    var html = ' <li><div class="maininfo"><div class="pic">'
         + '<img src="' + obj.itempic + '" alt="" /><span>' + obj.activitykind + '</span></div>'
         + '<div class="txt"><h3>' + obj.activitytitle + '</h3>';
    html += common.product.getActivityKind2(obj);
    html += ' </div></div>';
    if (obj.ruledesc != null && obj.ruledesc.length > 0)
        html += "<div class=\"note\">" + obj.ruledesc + "</div>";
    html += "</li>";
    return html;
}
function getFormatDate(_date) {
    var currDate = new Date(_date);
    return currDate.getFullYear() + "-" + (currDate.getMonth() + 1) + "-" + currDate.getDate();
}