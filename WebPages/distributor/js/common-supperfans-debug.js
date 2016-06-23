function invitationfans(containerid) {
    this.containerid = containerid;
    this.fanstemplate = [
    '<div class="show-yqhf">',
        '<div class="closebtn"><img src="../image/closebtn.png" /></div>',
        '<div class="yqhf-box">',
            '<div class="companyname">${distributorname}</div>',
            '<div class="companyinfo">地址：${address}</div>',
            '<div class="companyinfo">电话：${fixline}</div>',
            '<div class="companyewm"><img id="qrcode" orgsrc="/webapi/consumer/weixin/register_generate_code?qrtype=20" /></div>',
            '<div class="text1">',
                '扫一扫上面的二维码,成为超惠买惠粉!<br />',
            '</div>',
            '<div class="text2">',
                '——长按二维码,可保存到手机!——',
            '</div>',
        '</div>',
        '</div>'
    ].join('\n');
}
invitationfans.prototype.render = function () {
    if ($('#' + this.containerid).length == 0) {
        $("<div class='showbox-w1' id='" + this.containerid + "'></div>").appendTo("body");
    }
    var container = $('#' + this.containerid);
    var fanstemplate = this.fanstemplate;
    $('.bottom-btnl').click(function () {
        $(window).bind("touchmove", function (e) {
            e.preventDefault();
        })
        if (container.children().length > 0) {
            container.fadeIn(1000);
            return;
        }
        $.getJSON2("/webapi/distributor/weixin/distributorinfo", function (data) {
            var html = juicer(fanstemplate, data);
            container.html(html);
            $("#qrcode").attr("src", $("#qrcode").attr("orgsrc"));
            container.fadeIn(1000);
            $('.closebtn').click(function () {
                $(window).unbind("touchmove");
                container.fadeOut(1000)
            });
        });
    });
}