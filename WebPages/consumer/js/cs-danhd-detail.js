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
        beforeSend: function () { common.loading.show(); },
        complete: function () { common.loading.hide(); },
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
            if (obj.activitytype == "ticket") {
                html = '<div class="duohdbox-w">'
                           + '<div class="duohdbox" cls="a" style="height: 255px; padding: 0px;">' + '<div style="border-radius: 0px;" class="adimg">'
                           + '  <img style="display: block;" src="' + obj.posterpic + '" class="lazy">   </div>'
                          // + ' <div class="ceng1"><div class="tit">' + obj.activitytitle + '</div>'
                          // + '<div class="time">' + obj.begintime + '至' + obj.endtime + '</div>'
                           //+ ' <div class="statebox"><div class="statebtn1" style="width:100px; white-space:nowrap;overflow:hidden">' + obj.time_to_end_text + '</div>'
                          // + ' </div>'
                           + '<div id="title-css" class="ceng3" > <div id="title-left">超惠券</div>'
                           + ' <div style="background:' + (obj.activity_flag == 1 ? ' rgba(220, 0, 0, 0.8)' : '  rgba(51,51,51,.9)') + ' none repeat scroll 0% 0%;" id="title-right">' + (obj.activity_flag == 1 ? "已生效" : "未生效") + '</div> <div id="bianjiao"></div> </div> </div>'
                           + ' <div class="duohdbox-cont" style=display:block>  <div class="dpdetail-info">'
                           + '  <div class="hdname">' + obj.activitytitle + '</div> <div class="hdtime1">'
                           + ' <img style="display: inline;" src="/consumer/image/icon02_2.png" class="lazy">' + obj.begintime + '至' + obj.endtime + ' </div> </div>'
                //if (obj.changes != null && obj.changes.length > 0) {
                //    html += '<div class="chdetail-textbox">'
                //    + '<div class="chtext-tit"><div class="bgline"></div><div class="bgcolor"></div><div class="tit">更正说明</div></div>';
                //    for (var j = 0; j < obj.changes.length; j++) {
                //        var change = obj.changes[j];
                //        html += '<div class="chdetail-cont">' + change.correctdescription + '</div>';
                //    }
                //    html += '</div>';
                //}
                html += '<div class="chdetail-textbox" style="padding:30px 0px 15px 0px;"> <div class="chtext-tit" style="margin-bottom:20px">'
                + ' <div class="bgline2"></div> <div class="bgcolor2"></div> <div class="tit">超惠券</div> </div>'

                for (var j = 0; j < obj.items.length; j++) {
                    var item = obj.items[j]
                    html += '<div class="div-list ' + (item.activitykind == '降价' ? 'jiangjia' : item.activitykind == '有礼' ? 'youli' : item.activitykind == '买赠' ? 'maizeng' : 'taocan') + '">'
                    + ' <div class="div-top" style="padding: 30px 10px 30px 10px;">'
                    + ' <div class="li-img"><img src="' + item.itempic + '" alt="">'
                    + ' <p class="' + (obj.activity_flag == '1' ? 'state_sx' : 'state_wsx') + '">' + obj.time_to_end_text + '</p> </div>'
                     + '<div class="li-text">  <p>' + item.activitytitle + '</p>'
                    if (item.activitykind == '降价') {
                        //html += '  <ul class="jiangjia_price">   <li>￥' + item.discountprice + '</li>'
                        //+ '<li>  <span>' + item.discount + '折</span> <p>￥' + item.originalprice + '</p></li> </ul>'
                        html += '<table class="tbl_tc"><tr>'
                        + '<td rowspan="2" class="tbl_td_left">￥' + item.discountprice + '</td>'
                        + '<td class="tbl_td_right"> <p>' + item.discount + '折</p></td> </tr>'
                        + ' <tr><td style="text-decoration:line-through;padding-left:8px;">￥' + item.originalprice + '</td></tr></table>'
                    } else if (item.activitykind == '有礼') {
                        html += ' <div class="pre"><font>赠</font><div class="txt-r">' + item.giftname + '</div></div>'
                    } else if (item.activitykind == '买赠') {
                        html += '  <ul class="jiangjia_price"> <li style="width: 100%;padding-top:0;">￥' + item.unitprice + '<span style="font-size: 15px;">买' + item.buycount + '赠' + item.giftcount + '</span> </li>'
                        + ' </ul>'
                    } else if (item.activitykind == '套餐') {
                        //html += ' <ul class="jiangjia_price"> <li>￥' + item.discountprice + '</li>'
                        //+ ' <li> <span>已节省' + item.sparevalue + '元</span> <p>￥' + item.originalprice + '</p> </li></ul>'
                        html += ' <table class="tbl_tc"><tr>'
                        + '<td rowspan="2" class="tbl_td_left">￥' + item.discountprice + '</td>'
                        + '<td class="tbl_td_right"> <p>已节省' + item.sparevalue + '元</p></td> </tr>'
                        + ' <tr > <td style="text-decoration:line-through;padding-left:8px; color:#fff">￥' + item.originalprice + '</td></tr> </table>'
                    }
                    html += ' </div> <div class="img_tag"> </div> <div class="clear"></div></div><div class="whiteblock"></div>'
                    + '  <ul class="div-down "> <li>' + (item.itemtotalnum == null ? '0' : item.itemtotalnum) + ' <p>投放</p></li>'
                    + ' <li style="border-right:none">' + (item.totalverifynum == null ? '0' : item.totalverifynum) + ' <p>已用</p></li>'
                    + '<li style="min-height:40px;border-right:none"></li>'
                    + ' <li style="width:40%;border-right:none"><div style="margin-top:9px" class="btn_css ' + (item.verifylimit > 0 ? 'btn_css1' : ' btn_css2') + '" onclick="useticket(\'' + item.guid + '\',' + item.verifylimit + ')">'
                    + (item.verifylimit > 0 ? '码上用' : item.state == 0 ? '还未生效' : item.state == 1 ? '来晚了,已抢光' : item.state == 2 ? '明日再来' : item.state == 3 ? '您已用完' : '码上用') + '</div> </li><div class="clear"></div>'
                    + '</ul> '
                    if (item.returnticket_id != null && item.returnticket_id != '') {
                        html += ' <div class="rulecss " onclick="actionsheetclick()">已参加<font color="red"><b>' + item.participantnum + '</b></font>人 </div>'
                    }
                    html += '  <hr />  </div>'
                }
                html += '<div class="more-md-w" style="padding:0; border:none; border-bottom:solid 1px #ccc; "><div class="more-md" style="border:none">'
                + '<div class="text"> 共有<span>' + obj.retailer_count + '</span>家门店可以用以上超惠券<br>找找你身边的门店吧!</div>'
                + '<a data-original="/consumer/page/retailerlist.html"> <div class="btn">点击查看</div></a></div></div>'
                if (obj.description != '' && obj.description != null) {
                    html += '<div class="chdetail-textbox" style=" border-bottom:1px=border-bottom:1px solid #ccc;">'
                    + '<div class="chtext-tit"><div class="bgline2"></div><div class="bgcolor2"></div><div class="tit">补充信息</div></div><div class="chdetail-cont2">' + obj.description + '</div>'
                        + '</div>';
                }
                html += '</div></div></div>';
                $("#list").html(html);
            } else {
                if (pageType == 0) {
                    html = ' <div class="container-w"> <div class="mainpic"><img src="' + obj.posterpic + '" /><div class="state1 moreh">' + common.product.getFlag(obj.activity_flag) + '</div></div>'
                       + '<div class="dpdetail-info"><div class="hdname">' + obj.activitytitle + '</div>'
                       + '<div class="hdtime1"><img src="../image/icon02_2.png" />' + obj.begintime + '至' + obj.endtime + '</div></div>';

                    //if (obj.changes != null && obj.changes.length > 0) {
                    //    html += '<div class="chdetail-textbox">'
                    //    + '<div class="chtext-tit"><div class="bgline"></div><div class="bgcolor"></div><div class="tit">更正说明</div></div>';
                    //    for (var j = 0; j < obj.changes.length; j++) {
                    //        var change = obj.changes[j];
                    //        html += '<div class="chdetail-cont">' + change.correctdescription + '</div>';
                    //    }
                    //    html += '</div>';
                    //}
                    html += '<div class="chdetail-textbox" style="padding-top:15px;"><div class="chtext-tit"><div class="bgline2"></div><div class="bgcolor2"></div><div class="tit">优惠详情</div></div></div>'
                 + '<ul class="ul-list">';

                }
                var n = obj.items.length;
                for (var i = 0; i < n; i++)
                    html += getActItem(obj.items[i]);
                if (pageType == 0) {
                    html += '</ul><div class="more-md-w"><div class="more-md"><div class="text">活动共有<span>' + obj.retailer_count + '</span>家门店参加<br />看看有没有您附近的!</div>'
                        + '<a data-original="/consumer/page/retailerlist.html" > <div class="btn">点击查看</div></a></div> </div>';

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

function useticket(guid, verifylimit) {
  
    if (verifylimit > 0) {//可用状态，跳转到码上用核销界面

        var search = window.location.search;
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
        var originalurl = "/consumer/page/superticket_hx.html?activityitem_id=" + guid;
        var url = wxjsconfig.authurl.replace("__jump__", encodeURIComponent(encodeURIComponent(shareRegisterPage) + "-_-" + encodeURIComponent(originalurl)))//wxjsconfig.authurl.replace("__jump__", encodeURIComponent(encodeURIComponent(shareRegisterPage) + "-_-" + encodeURIComponent(originalurl)))
        location.href = url;

    }
}