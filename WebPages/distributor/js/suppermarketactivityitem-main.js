function suppermarketactivityitem(container) {
    this.container = $(container);
    this.activityitemtemplate = [
    '<div class="mainpic">',
         '{@if posterpic.length>0&&posterpic!=null }',
                '<img src="${posterpic}" />',
            '{@else}',
                '<img src="http://dl.oss.ipaloma.com/common/membership/default/membership5ece179a10ad4b26b62d08c58be7634d.png" />',
            '{@/if}',
              '{@if activitystate=="已生效"||activitystate=="进行中"}',
                        '<div class="state1 moreh">${time_to_end_text} </div>',
                        '{@else}',
                        '<div class="state2 moreh"> ${time_to_end_text} </div>',
                        '{@/if}',
    '</div>',
    '<div class="dpdetail-info">',
        '<div class="hdname" style="max-height: 100%;">${activitytitle}</div>',
        '<div class="hdtime1"><img src="../image/icon02.png" />${begintime}至${endtime}</div>',
    '</div>',
    '{@if changes.length >0}',
    '<div class="chdetail-textbox">',
        '<div class="chtext-tit">',
            '<div class="bgline"></div>',
            '<div class="bgcolor"></div>',
            '<div class="tit">更正说明</div>',
        '</div>',
         '{@each changes as change}',
        '<div class="chdetail-cont">',
            '${change.correctdescription}',
        '</div>',
        '{@/each}',
    '</div>',
    '{@/if}',
   '{@if customerrequest !="" && customerrequest != null}',
    '<div class="chdetail-textbox" style="padding-top:15px;">',
            '<div class="chtext-tit">',
                '<div class="bgline1"></div>',
                '<div class="bgcolor1"></div>',
                '<div class="tit">门店要求</div>',
            '</div>',
            '<div class="chdetail-cont1">',
                '${customerrequest}',
            '</div>',
    '</div>',
   '{@/if}',
   '{@if items.length >0 }',
    '<div class="chdetail-textbox" style="padding-top:15px;">',
            '<div class="chtext-tit">',
                '<div class="bgline1"></div>',
                '<div class="bgcolor1"></div>',
                '<div class="tit">优惠详情</div>',
            '</div>',
    '</div>',
    '<ul class="ul-list">',
        '{@each items as item}',
        '<li>',
             '{@if item.activitykind ==="有礼"}',
               '<div class="pic">',
                    '<img src="${item.itempic}">',
                    '<span>${item.activitykind}</span>',
                '</div>',
                '<div class="txt">',
                    '<h3>${item.activitytitle}</h3>',
                    '<div class="pre">',
                        '<font class="l">赠</font>',
                        '<div class="txt-r">',
                            '${item.giftname}',
                        '</div>',
                    '</div>',
                    '<div class="t-sm">',
                    '</div>',
                '</div>',
            '{@if item.ruledesc !=""}',
                '<div class="note">${item.ruledesc}</div>',
            '{@/if}',
                '{@else if item.activitykind === "降价"}',
               '<div class="maininfo">',
                '<div class="pic">',
                    '<a href="">',
                        '<img alt="" src="${item.itempic}">',
                            '<span>${item.activitykind}</span>',
                    '</a>',
                '</div>',
                '<div class="txt">',
                    '<h3>${item.activitytitle}</h3>',
                    '<div class="t-sm">',
                        '<span class="s2">${item.discount}折</span>',
                    '</div>',
                    '<div class="jg">',
                        '<strong>￥${item.discountprice}</strong>',
                        '<del>￥${item.originalprice}</del>',
                    '</div>',
                '</div>',
            '</div>',
             '{@if item.ruledesc !=""}',
                '<div class="note">${item.ruledesc}</div>',
            '{@/if}',

                '{@else if item.activitykind === "临期" || item.activitykind === "临期特卖"}',
               '<div class="maininfo">',
                '<div class="pic">',
                    '<a href="">',
                        '<img alt="" src="${item.itempic}">',
                            '<span>${item.activitykind}</span>',
                    '</a>',
                '</div>',
                '<div class="txt">',
                    '<h3>${item.activitytitle}</h3>',
                    '<div class="t-sm">',
                        '<span class="s2">${item.discount}折</span>',
                    '</div>',
                    '<div class="jg">',
                        '<strong>￥${item.discountprice}</strong>',
                        '<del>￥${item.originalprice}</del>',
                    '</div>',
                '</div>',
            '</div>',
             '{@if item.ruledesc !=""}',
                '<div class="note">${item.ruledesc}</div>',
            '{@/if}',

                '{@else if item.activitykind === "赠品" || item.activitykind === "买赠"}',
                    '<div class="pic">',
                        '<img alt="" src="${item.itempic}">',
                        '<span>${item.activitykind}</span>',
                    '</div>',
                    '<div class="txt">',
                        '<h3>${item.activitytitle}</a></h3>',
                        '<div class="t-sm">',
                            '<span class="s2">买${item.buycount}赠${item.giftcount}</span>',
                        '</div>',
                        '<div class="jg">',
                            '<strong>￥${item.unitprice}</strong>',
                        '</div>',
                    '</div>',
                    '<div class="c"></div>',
                    '<div class="note">',
                    '</div>',
               '{@if item.ruledesc !=""}',
                   '<div class="note">${item.ruledesc}</div>',
               '{@/if}',
                '{@else if item.activitykind === "套餐"}',
                    '<div class="pic">',
                        '<img alt="" src="${item.itempic}">',
                        '<span>${item.activitykind}</span>',
                    '</div>',
                    '<div class="txt">',
                        '<h3>${item.activitytitle}</h3>',
                        '<div class="t-sm">',
                            '<span class="s2">已节省${item.sparevalue}元</span>',
                        '</div>',
                        '<div class="jg">',
                            '<strong>￥${item.discountprice}</strong>',
                            '<del>￥${item.originalprice}</del>',
                        '</div>',
                    '</div>',
                    '<div class="c"></div>',
                    '<div class="note">',
                    '</div>',
                     '{@if item.ruledesc !=""}',
                        '<div class="note">${item.ruledesc}</div>',
                    '{@/if}',
                '{@/if}',
        '</li>',
        '{@/each}',
    '</ul>',
      '{@/if}',
           '{@if description !="" && description != null }',
        '<div class="chdetail-textbox" style="border-top:1px solid #ccc; border-bottom:1px solid #ccc;">',
    '<div class="chtext-tit">',
        '<div class="bgline1"></div>',
        '<div class="bgcolor1"></div>',
        '<div class="tit">补充信息</div>',
    '</div>',
    '<div class="chdetail-cont1">',
        '${description}',
    '</div>',
'</div>',
'{@/if}'
    ].join('\n');
}


suppermarketactivityitem.prototype.render = function (sharefunction) {
    var activityitemtemplate = this.activityitemtemplate;
    var container = this.container;
    var activity_id = common.getUrlParam('activity_id');
    var ajaxdata = { activitykind: "distributor_to_consumer" };
    if (wxjsconfig.sharekey != null)
        ajaxdata[wxjsconfig.sharekey] = "_";
    $.getJSON2("/webapi/distributor/weixin/activities/" + activity_id, ajaxdata, function (data) {
        var jsondata = data.data[0] || {};
        var html = juicer(activityitemtemplate, jsondata);
        container.html(html);
        if ($.isFunction(sharefunction)) {
            var share = data.share || {};
            sharefunction($.extend(share, { activity_id: activity_id }));
        }

    });
}
$(function () {
    var s = new invitationfans("container");
    s.render();
    var s = new suppermarketactivityitem(".container-w");
    s.render(wxjsshare);
});


