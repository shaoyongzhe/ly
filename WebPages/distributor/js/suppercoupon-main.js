

function suppermarketactivitylist(container) {
    this.container = $(container);
    this.activitylisttemplate = [
        '{@if error  !=""}',
        '<div class="nohd">',
            '<img src="../image/超惠活动.png" /><br />',
        '</div>',
        '{@/if}',
        '{@if data != null}',
        '{@each data as item}',
        '<div class="hd-chbox-w " style="margin-bottom:0px">',
            '<a href="suppercouponitems.html?activity_id=${item.guid}">',
                '<div class="hdbox">',
                    '<div class="img">',
                        '{@if item.posterpic.length>0&&item.posterpic!=null }',
                            '<img class="lazy" src="${item.posterpic}" />',
                        '{@else}',
                            '<img class="lazy" src="http://dl.oss.ipaloma.com/common/membership/default/membershipa698672ecafd48f5bd2f2e202659399d.png" />',
                        '{@/if}',
                        '{@if item.currentstate=="已生效"}',
                        '<div class="state1 p_css2"> ${item.currentstate} </div>',
                        '{@else}',
                        '<div class="state2 p_css1"> ${item.currentstate} </div>',
                        '{@/if}',
                    '</div>',
                    '<div class="text">',
                        '<div class="hdname" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;width: 98%;" >${item.activitytitle}</div>',
                        '<div class="hdnum">${item.serialnumber}<span><img style="display: inline;" class="lazy" src="/distributor/image/icon03.png" />${item.fanscount}</span></div>',
                        '<div class="hdtime2">${item.activitycode}</div>',
                        '<div class="hdtime2">${item.begintime}&nbsp;至&nbsp;${item.endtime}</div>',
                    '</div>',
                '</div>',
            '</a>',
            '<a href="participateretailer_ticket.html?activity_id=${item.guid}">',
                '<div class="joinmd blx">',
                    '投放门店：<font>${item.retailercount}</font>家<span><img src="/distributor/image/icon04.png" /></span>',
                '</div>',
            '</a>',
        '</div>',
        '{@/each}',
        '{@if data.length  > 0 }',
        '<div class="space1"></div>',
        '{@/if}',
        '{@/if}'
    ].join('\n');
}


suppermarketactivitylist.prototype.render = function (sharefunction) {
    var activitylisttemplate = this.activitylisttemplate;
    var container = this.container;
    var ajaxdata = { activitykind: "distributor_to_consumer", activitytype: "ticket" };
    if (wxjsconfig.sharekey != null)
        ajaxdata[wxjsconfig.sharekey] = "_";

    $.getJSON2('/webapi/distributor/weixin/activities', ajaxdata, function (data) {
        var html = juicer(activitylisttemplate, data);
        container.html(html);
        common.loading.hide();
     
        if ($.isFunction(sharefunction)) {
            sharefunction(data.share || {});
        }

       // $("img.lazy").lazyload();
    });
}
$(function () {
    common.loading.show();
    var fans = new invitationfans("container");
    fans.render();
    var s = new suppermarketactivitylist(".container-w");
    s.render(wxjsshare);
});



