avalon.ready(function () {
    //$('.Wallet_list ul li').on('click', function () {
    //    $('.Wallet_list ul li').removeClass('on');
    //    $(this).addClass('on');
    //})
    writeOff()
    vm.getMoney()

    vm.getAssetFlow(1, null)
})


var tmdropme = null;
var tmdropme2 = null;
var vm = avalon.define({
    $id: 'mywallet',
    showType: 0,//0：个人。 1:公共
    Moneys: { account: {}, retailer: {} },
    individual: { array: [], current: {}, category: "all", pageIndex: 1, paging: {} },//个人收支记录 category:all|income|expend
    retail: { array: [], current: {}, category: "all", pageIndex: 1, paging: {} },//公共(门店)收支记录
    getMoney: function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/webapi/asset/member/my/asset',
            data: { assettype: '现金', withemployer: false },
            beforeSend: function () { common.loading.show(); },
            complete: function () { common.loading.hide(); },
            success: function (json) {
                json = json || {};   /* 统一加这句话 */
                if (json.error) {
                    toasterextend.showtips(json.error, "error");
                    return;
                }
                if (json.user_notification != undefined) {
                    toasterextend.showtips(json.user_notification, "info");
                    return;
                }
                if (json.content.length > 0) {
                    var account = $.grep(json.content, function (item) {
                        return item.owner_class == "tblaccount";//个人收入信息
                    })
                    vm.Moneys.account = account == undefined || account == "" ? {} : account[0];
                    var retailer = $.grep(json.content, function (item) {
                        return item.owner_class == "tblretailer";//门店收入信息
                    })
                    vm.Moneys.retailer = retailer == undefined || retailer == "" ? {} : retailer[0];

                }
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

                toasterextend.showtips(errormsg, "error");
            }
        });
    },
    getAssetFlow: function (index, me) {
        var paging = { pageindex: index, current: {} }
        if (index > 1) {
            paging = $.extend({}, vm.individual.paging, { pageindex: index });
        }
        var data = {
            paging: JSON.stringify(paging),
            myemployer: vm.showType == 0 ? false : true,
            category: vm.showType == 0 ? vm.individual.category : vm.retail.category
        }

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/webapi/asset/member/my/asset/flowing',
            data: data,
            success: function (json) {
                if (vm.showType == 0) {
                    tmdropme = me
                } else
                    tmdropme2 = me
                json = json || {};   /* 统一加这句话 */
                if (json.error) {
                    dealdropme(me);
                   // toasterextend.showtips(json.error, "error");
                    return;
                }
                if (json.user_notification != undefined) {
                    dealdropme(me);
                    //toasterextend.showtips(json.user_notification, "info");
                    return;
                }

               

                if (index != 1) {
                    if (vm.showType == 0) {//个人
                        $.each(json.content, function (i, v) {
                            vm.individual.array.push(v)
                        });

                    } else {//门店，公共收入
                        $.each(json.content, function (i, v) {
                            vm.retail.array.push(v)
                        });
                        vm.retail.current = json.paging.current
                    }

                } else {
                    if (vm.showType == 0) {//个人
                        vm.individual.array = json.content
                        vm.individual.paging = json.paging
                    } else {//门店，公共收入
                        vm.retail.array = json.content
                        vm.retail.paging = json.paging
                    }
                }
                if (json.content.length == 0) {
                    dealdropme(me);
                    $(".dropload-down").remove()
                    return;
                }
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

                toasterextend.showtips(errormsg, "error");
            }
        });
    },
    budgetswitch: function (type) {
        vm.showType = type
        if ((type == 0 && vm.individual.array.length == 0) || (type == 1 && vm.retail.array.length == 0)) {
            vm.getAssetFlow(1, null)
        }
    },
    categoryChange: function (category) {//0.全部 1.收入 2.支出
        if (vm.showType == 0) {
            vm.individual.category = category
        } else {
            vm.retail.category = category
        }
        vm.getAssetFlow(1, null)
    },
    jsondataReadered: function (e) {
        if (vm.individual.pageIndex == 1) {
            $(".dropload-down").remove()
            $('#list_1').dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑加载更多</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData: '<div class="dropload-noData">暂无数据</div>'
                },
                loadDownFn: function (me) {
                    vm.individual.pageIndex++
                    tmdropme = me;
                    vm.getAssetFlow(vm.individual.pageIndex, me)
                }
            });
        }
        if (tmdropme != null)
            tmdropme.resetload();
    },
    jsondataReadered2: function (e) {
        if (vm.retail.pageIndex == 1) {
            $(".dropload-down").remove()
            $('#list_2').dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑加载更多</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData: '<div class="dropload-noData">暂无数据</div>'
                },
                loadDownFn: function (me) {
                    vm.retail.pageIndex++
                    tmdropme2 = me;
                    vm.getAssetFlow(vm.retail.pageIndex, me)
                }
            });
        }
        if (tmdropme2 != null)
            tmdropme2.resetload();
    }
})

function toNumner(str) {
    return str == undefined ? 0 : str
}