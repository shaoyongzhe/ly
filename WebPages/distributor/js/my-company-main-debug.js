    function suppermarketactivitylist(container) {
        this.container = $(container);
        this.companytemplate = [
       '<div class="m-company-top">',
            '<div class="userimg"><img src="{@if distributor_pic ==""}../image/cs04.jpg {@else}${distributor_pic}{@/if}" /></div>',
            '<div class="userinfo">',
                '<div class="zi">',
                    '<span>${distributorname}</span><br />',
                    '${address}<br />',
                    '${mobilephone}',
                '</div>',
                '<div class="ewm">',
                    '<a href="m-company-ewm.html"><img id="qrcode" orgsrc="/webapi/consumer/weixin/register_generate_code?qrtype=20"/></a>',
                '</div>',
            '</div>',
        '</div>',
        '<div class="m-company-listbox-w">',
            '<div class="m-company-listbox1-w">',
                '<div class="m-company-listbox1">',
                    '<div class="listbox-zi">',
                        '${invitedretailercount}<br />邀请店铺',
                    '</div>',
                '</div>',
                '<div class="m-company-listbox1-right">',
                    '<div class="m-company-listbox2">',
                        '<div class="listbox-zi">',
                            '${retaileractivitycount}<br />店铺活动',
                        '</div>',
                    '</div>',
                    '<div class="m-company-listbox3">',
                        '<div class="listbox-zi">',
                            '${consumeractivitycount}<br />超惠活动',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
            '<div class="m-company-listbox4-w">',
                '<div class="m-company-listbox4" style="border-left:0;">',
                    '<div class="listbox-zi">',
                        '<aa num="${sharecount}"></aa><br />分享',
                    '</div>',
                '</div>',
                '<div class="m-company-listbox4">',
                    '<div class="listbox-zi">',
                        '<ab num="${fansinhistorycount}"></ab><br />惠粉',
                    '</div>',
                '</div>',
                '<div class="m-company-listbox4">',
                    '<div class="listbox-zi">',
                        '<ac>${percentageretained}</ac><br />留存',
                    '</div>',
                '</div>',
            '</div>',
        '</div>'
        ].join('\n');
    }


suppermarketactivitylist.prototype.render = function () {
        var container = this.container;
        var companytemplate = this.companytemplate;
    $.getJSON2("/webapi/distributor/weixin/distributorstat", function (data) {
            var html = juicer(companytemplate, data);
            container.after(html);
            $("#qrcode").attr("src", $("#qrcode").attr("orgsrc"))
            var $divWidth = $('.m-company-listbox1').width();
            $('.m-company-listbox1').css({ 'height': $divWidth * 2 });

            var $divWidth = $('.m-company-listbox1').height();
            $('.m-company-listbox1-right').css({ 'height': $divWidth });

            var $divWidth = $('.m-company-listbox1').height();
            $('.m-company-listbox2').css({ 'height': $divWidth / 2 });

            var $divWidth = $('.m-company-listbox1').height();
            $('.m-company-listbox3').css({ 'height': $divWidth / 2 });

            var $divWidth = $('.m-company-listbox4').width();
            $('.m-company-listbox4').css({ 'height': $divWidth });

            var aa = $('aa').attr('num');
            var ab = $('ab').attr('num');
            $('aa').text(common.str_pep_num(aa))
            $('ab').text(common.str_pep_num(ab))

       
        });
    }
$(function () {

    var s = new invitationfans("container");
    s.render();
    var s = new suppermarketactivitylist("#company");
    s.render();

});


