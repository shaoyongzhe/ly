
var qrcode = {};
qrcodeIsShow = false;
qrcode.covershow = function () {
    $(window).bind("touchmove", function (e) {
        e.preventDefault();
    })
    $("<div class='showbox-w1' id='shareqrcode'><div class='show-yqhf'></div></div>").appendTo("body");
    $("#shareqrcode .show-yqhf").append($(".ewmboxz1-w").html());
    $("#shareqrcode").show();
};
qrcode.href = function () {
    $("a[data-original]").each(function () {
        var originalurl = $(this).data("original");
        $(this).attr("href", originalurl);
    });

};
qrcode.show = function () {

    var htmlinterval = setInterval(function () {

        if ($("#commonbotton") != undefined) {
            clearInterval(htmlinterval);
            if ("undefined" != typeof (wxjsconfig) && "undefined" != typeof (wxjsconfig.sharekey) && "undefined" != typeof (wxjsconfig.authurl)) {

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
                    //search = search + "&sendimage=false"
                    var qrcode_url = "/webapi/" + category + "/weixin/" + qrurl + search;


                    var qrtemtemplate = [
                        '<div class="ewmboxz1-w" id="shareqrcode">',
                        '<div class="ewmboxz1">',
                        '<img class="ewm" id="QRCode_img" /><br />',
                        '长按上方二维码图片关注超惠买<br />',
                        '<img class="adtext1" src="../image/adtext.png" />',
                        '</div>',
                        '</div><div id="qrcodediv" hidden></div>'
                    ].join('');

                    if (!qrcodeIsShow) {
                        $("footer").before(qrtemtemplate);
						 qrcodeIsShow = true;
                    }
                   
                    var qrcode = qrcodeconfig["consumer"];
                    qrcodeconfig["consumer"]["sharecard"]["url"] = qrcode_url;
                    draw(qrcode, "sharecard", qrcode["logo"]);

                    var updatecounturl = "/webapi/" + category + "/weixin/shareupdateopencount" + search;
                    if (share_id != undefined) {
                        $.getJSON(updatecounturl);
                    }

                    var shareRegisterPage = "/" + category + "/page/shareqrcode.html?" + encodeURIComponent(qrcode_url);
                    $("a[data-original]").each(function () {
                        if ($(this).data("original").indexOf('.html') > -1) {
                            var originalurl = $(this).data("original");
                            $(this).attr("href", wxjsconfig.authurl.replace("__jump__", encodeURIComponent(encodeURIComponent(shareRegisterPage) + "-_-" + originalurl)));
                        }
                    });
                }
                else {
                    $("a[data-original]").each(function () {
                        var originalurl = $(this).data("original");
                        $(this).attr("href", originalurl);
                    });
                }
            }
        }

    }, 200);

}


