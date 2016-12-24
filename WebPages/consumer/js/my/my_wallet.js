avalon.ready(function () {
    $('.Wallet_list ul li').on('click', function () {
        $('.Wallet_list ul li').removeClass('on');
        $(this).addClass('on');
    })

    vm.getMoney()

    vm.getAssetFlow(1, null)

    setTimeout(function () {
        qrcode.href();
    }, 1000)
})

var tmdropme = null;
var tmdropme2 = null;
var tmdropme3 = null;

var vm = avalon.define({
    $id: 'mywallet',
    Moneys: { count: 0 },
    category: "all",
    //list: { all_array: [], income_array: [], expend_array: [] },
    alllist: { array: [], paging: {}, pageIndex: 1 },//全部
    incomelist: { array: [], paging: {}, pageIndex: 1 },//收入
    expendlist: { array: [], paging: {}, pageIndex: 1 },//支出
    getMoney: function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/webapi/asset/member/my/asset',
            data: { assettype: '现金', withemployer: false },
            beforeSend: function () { common.loading.show(); },
            complete: function () { common.loading.hide(); },
            success: function (json) {
                common.loading.hide();
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
                    vm.Moneys = account == undefined || account == "" ? {} : account[0];
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
    categorychange: function (type) {
        vm.category = type

        if ((type == "all" && vm.alllist.array.length == 0) || (type == "income" && vm.alllist.array.length == 0) || (type == "expend" && vm.alllist.array.length == 0)) {
            vm.getAssetFlow(1, null)
        }
    },
    getAssetFlow: function (index, me) {
        var paging = { pageindex: index, current: {} }
        if (index > 1) {
            if (vm.category == "all") {//全部
                paging = $.extend({}, vm.alllist.paging, { pageindex: index });
            } else if (vm.category == "income") {//收入
                paging = $.extend({}, vm.incomelist.paging, { pageindex: index });
            } else {
                paging = $.extend({}, vm.expendlist.paging, { pageindex: index });
            }

        }
        var data = {
            paging: JSON.stringify(paging),
            myemployer: false,
            category: vm.category
        }
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/webapi/asset/member/my/asset/flowing',
            data: data,
            success: function (json) {
                if (vm.category == "all") {
                    tmdropme = me
                } else if (vm.category == "income") {
                    tmdropme2 = me
                } else
                    tmdropme3 = me
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
                    if (vm.category == "all") {//全部
                        $.each(json.content, function (i, v) {
                            vm.alllist.array.push(v)
                        });

                    } else if (vm.category == "income") {//收入
                        $.each(json.content, function (i, v) {
                            vm.incomelist.array.push(v)
                        });
                    } else {
                        $.each(json.content, function (i, v) {
                            vm.expendlist.array.push(v)
                        });
                    }

                } else {
                    if (vm.category == "all") {//全部
                        vm.alllist.array = json.content
                        vm.alllist.paging = json.paging
                    } else if (vm.category == "income") {//收入
                        vm.incomelist.array = json.content
                        vm.incomelist.paging = json.paging
                    } else {
                        vm.expendlist.array = json.content
                        vm.expendlist.paging = json.paging
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
    jsondataReadered: function (e) {
        if (vm.alllist.pageIndex == 1) {
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
                    vm.alllist.pageIndex++
                    tmdropme = me;
                    vm.getAssetFlow(vm.alllist.pageIndex, me)
                }
            });
        }
        if (tmdropme != null)
            tmdropme.resetload();
    },
    jsondataReadered2: function (e) {
        if (vm.incomelist.pageIndex == 1) {
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
                    vm.incomelist.pageIndex++
                    tmdropme2 = me;
                    vm.getAssetFlow(vm.incomelist.pageIndex, me)
                }
            });
        }
        if (tmdropme2 != null)
            tmdropme2.resetload();
    },
    jsondataReadered3: function (e) {
        if (vm.expendlist.pageIndex == 1) {
            $(".dropload-down").remove()
            $('#list_3').dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑加载更多</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData: '<div class="dropload-noData">暂无数据</div>'
                },
                loadDownFn: function (me) {
                    vm.expendlist.pageIndex++
                    tmdropme3 = me;
                    vm.getAssetFlow(vm.expendlist.pageIndex, me)
                }
            });
        }
        if (tmdropme3 != null)
            tmdropme3.resetload();
    },
    userwithdraw: function () {//用户提现
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/webapi/consumer/mine/consumer/withdraw',
            success: function (json) {
                common.loading.hide();
                json = json || {};   /* 统一加这句话 */
                if (json.error) {
                    toasterextend.showtips(json.error, "error");
                    return;
                }
                if (json.user_notification != undefined) {
                    toasterextend.showtips(json.user_notification, "info");
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
    }
})