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
        beforeSend: function () { $(".pin-spinner").show(); },
        complete: function () { $(".pin-spinner").hide(); },
        success: function (jsondata) {

            $(".pin-spinner").hide();//数据请求成功即隐藏转圈动画

            jsondata = jsondata || {};
            if (jsondata.error) {
                toasterextend.showtips(jsondata.error, "error", false);
                return;
            }

            if (jsondata.user_notification != undefined) {
                toasterextend.showtips(jsondata.user_notification, "info");
                return;
            }

            var obj = jsondata.data[0];
            if (!obj) {
                toasterextend.showtips("活动已结束，点一下 附近门店 找找其它活动", "info");
                return;
            }
            var flag;
            if (obj.activity_flag == 0)
                flag = "没开始";
            else if (obj.activity_flag == 1)
                flag = "进行中";
            else if (obj.activity_flag == 2)
                flag = "已结束";
            var html;
            if (pageType == 0) {
                html = ' <div class="container-w"> <div class="mainpic"><img src="' + obj.posterpic + '" /><div class="state1 moreh">' + flag + '</div></div>'
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
                    + '<a href="/consumer/page/retailerlist.html"> <div class="btn">点击查看</div></a></div> </div>';

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
            $(".pin-spinner").hide();//隐藏转圈动画

            var errormsg = "访问异常";

            if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
               var json = JSON.parse(XMLHttpRequest.responseText); 				
				 errormsg = JSON.parse(json.Message).error;
				 if(errormsg == undefined || errormsg == '')
					errormsg = "Http error: " + XMLHttpRequest.statusText;
            }

            toasterextend.showtips(errormsg, "error");
        }
    });
};
function getActItem(obj) {
    var html = ' <li><div class="maininfo"><div class="pic">'
         + '<img src="' + obj.itempic + '" alt="" /><span>' + obj.activitykind + '</span></div>'
         + '<div class="txt"><h3>' + obj.activitytitle + '</h3>';
    //活动类型
    if (obj.activitykind == "有礼")
        html += ' <div class="pre"><font class="l">赠</font><div class="txt-r">' + obj.giftname + '</div></div>';
    else if (obj.activitykind == "降价")
        html += ' <div class="t-sm"><span class="s2">' + obj.discount + '折</span></div><div class="jg"><strong>￥' + obj.discountprice + '</strong><del>￥' + obj.originalprice + '</del></div>';
    else if (obj.activitykind == "买赠" || obj.activitykind == "赠品") {

        var cont = obj.buycount + '赠' + obj.giftcount;

        //var cont = new numberCovert(obj.buycount).pri_ary() + '赠' + ($.isNumeric(obj.ruledesc) ? new numberCovert(obj.ruledesc).pri_ary() : obj.ruledesc);

        html += '<div class="t-sm"><span class="s2">买' + cont + '</span></div><div class="jg"><strong>￥' + obj.unitprice + '</strong></div>';
    } else if (obj.activitykind == "套餐")
        html += '<div class="t-sm"><span class="s2">已节省' + obj.sparevalue + '元</span></div><div class="jg"><strong>￥' + obj.discountprice + '</strong><del>￥' + obj.originalprice + '</del></div>';
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