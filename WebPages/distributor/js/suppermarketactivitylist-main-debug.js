

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
        '<div class="hd-chbox-w">',
            '<a href="suppermarketactivityitems.html?activity_id=${item.guid}">',
                '<div class="hdbox">',
                    '<div class="img">',
                        '{@if item.posterpic.length>0&&item.posterpic!=null }',
                            '<img src="${item.posterpic}" />',
                        '{@else}',
                            '<img src="http://dl.oss.ipaloma.com/common/membership/default/membershipa698672ecafd48f5bd2f2e202659399d.png" />',
                        '{@/if}',
                        '{@if item.currentstate=="进行中"}',
                        '<div class="state1"> ${item.currentstate} </div>',
                        '{@else}',
                        '<div class="state2"> ${item.currentstate} </div>',
                        '{@/if}',
                    '</div>',
                    '<div class="text">',
                        '<div class="hdname">${item.activitytitle}</div>',
                        '<div class="hdnum">${item.serialnumber}<span><img src="../image/icon03.png" />${item.fanscount}</span></div>',
                        '<div class="hdtime2">${item.begintime}&nbsp;至&nbsp;${item.endtime}</div>',
                    '</div>',
                '</div>',
            '</a>',
            '<a href="participateretailer.html?activity_id=${item.guid}">',
                '<div class="joinmd">',
                    '参加门店：<font>${item.retailercount}</font>家<span><img src="../image/icon04.png" /></span>',
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
    var ajaxdata = {};
    if (wxjsconfig.sharekey != null)
        ajaxdata[wxjsconfig.sharekey] = "_";
    $.getJSON2('/webapi/distributor/weixin/active_consumer_activities', ajaxdata, function (data) {
        var html = juicer(activitylisttemplate, data);
        container.html(html);
        if ($.isFunction(sharefunction)) {
            sharefunction(data.share || {});
        }
    });
}
$(function () {
    var fans = new invitationfans("container");
    fans.render();
    var s = new suppermarketactivitylist(".container-w");
    s.render(wxjsshare);
});



