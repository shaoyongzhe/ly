
avalon.ready(function () {


    $('body').dropload({//上拉加载
        scrollArea: window,
        loadUpFn: function (me) {
            vm.getVerifyList(1, me)
            me.resetload();
        }
    });
    vm.getVerifyList(1)
})


var vm = avalon.define({
    $id: 'verifyconfirm',
    authrecordcount: 0,
    array: [],
    pageIndex: 1,
    getVerifyList: function (pageindex, me) {
        vm.pageIndex = pageindex
        $.ajax({
            type: 'GET',
            dataType: 'json',
            data: { pageindex: pageindex },
            beforeSend: function () { shelter.init({ icos: "/js/shelter/image/loading.gif" }) },
            url: '/webapi/retailer/weixin/verify/auth/list',
            success: function (json) {
                if (me != undefined)
                    me.resetload();
                json = json || {};   /* 统一加这句话 */
                shelter.close()
                vm.authrecordcount = json.authrecordcount
                vm.array = json.data
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (me != undefined)
                    me.resetload();
                shelter.init({
                    title: "当前网络不给力，请稍候重试",
                    icos: "/js/shelter/image/ico_warn.png",
                    autoClear: 5,
                    shadeClose: true
                })

            }
        });
    },
    allVerify: function () {//全部确认
        if (vm.authrecordcount > 0) {
            shelter.init({
                title: "您真的要全部确认么？",
                shadeClose: true,
                showBtn: true,
                clearBtn: {
                    name: "回去看看",//取消按钮名称
                    click: function () {
                        shelter.close()
                    } //取消按钮事件
                },
                confirmBtn: {
                    name: "确认",//确定按钮名称
                    click: function () {
                        $.ajax({
                            type: 'put',
                            dataType: 'json',
                            beforeSend: function () {
                                shelter.init({ title: "提交中...", icos: "/js/shelter/image/loading.gif" })
                            },
                            // complete: function () { shelter.close() },
                            url: '/webapi/retailer/weixin/verify/auth/all/list',
                            success: function (json) {
                                shelter.close();//隐藏转圈动画
                                json = json || {};   /* 统一加这句话 */


                                //成功后，重新加载信息
                                vm.getVerifyInfo()
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                var errormsg = "访问异常";
                                shelter.init({
                                    title: "当前网络不给力，请稍候重试",
                                    icos: "/js/shelter/image/ico_warn.png",
                                    autoClear: 5,
                                    shadeClose: true
                                })
                                //if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                                //    var json = JSON.parse(XMLHttpRequest.responseText);
                                //    errormsg = JSON.parse(json.Message).error;
                                //    if (errormsg == undefined || errormsg == '')
                                //        errormsg = "Http error: " + XMLHttpRequest.statusText;
                                //}

                                //toasterextend.showtips(errormsg, "error");
                            }
                        });
                    } //确定按钮事件
                },
            })
        }
    },
    singleVerify: function (state, el) {//单个确认
        shelter.init({
            title: state == "complete" ? "您真的要确认么？" : "您真的要拒绝确认么？",
            shadeClose: true,
            showBtn: true,
            clearBtn: {
                name: "回去看看",//取消按钮名称
                click: function () {
                    shelter.close()
                } //取消按钮事件
            },
            confirmBtn: {
                name: state == "complete" ? "确认" : "残忍拒绝",//确定按钮名称
                click: function () {
                    vm.affirm(state, el)
                } //确定按钮事件
            },
        })
    },
    //singleFailure: function (el) {//单个拒绝
    //    shelter.init({
    //        title: "您真的要拒绝确认么？",
    //        shadeClose: true,
    //        showBtn: true,
    //        clearBtn: {
    //            name: "回去看看",//取消按钮名称
    //            click: function () {
    //                shelter.close()
    //            } //取消按钮事件
    //        },
    //        confirmBtn: {
    //            name: "残忍拒绝",//确定按钮名称
    //            click: function () {
    //                vm.affirm("failure", el.verify_id)
    //            } //确定按钮事件
    //        },
    //    })
    //},
    affirm: function (state, verify_id) {//单个确认、拒绝
        $.ajax({
            type: 'put',
            dataType: 'json',
            beforeSend: function () {
                shelter.init({ title: "提交中...", icos: "/js/shelter/image/loading.gif" })
            },
            // complete: function () { shelter.close() },
            url: '/webapi/retailer/weixin/verify/auth/single/' + state + '/' + verify_id,
            success: function (json) {
                shelter.close();//隐藏转圈动画
                json = json || {};   /* 统一加这句话 */

                //成功后，重新加载信息
                shelter.init({
                    title: state == "failure" ? "已拒绝确认" : "已确认",
                    icos: "/js/shelter/image/ico_success.png",
                    autoClear: 5,
                    shadeClose: true,
                    closeEnd: function () {
                        vm.getVerifyList(vm.pageIndex)
                    }
                })
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                shelter.init({
                    title: "当前网络不给力，请稍候重试",
                    icos: "/js/shelter/image/ico_warn.png",
                    autoClear: 5,
                    shadeClose: true
                })

            }
        });
    },
    getTicketCssType: function (el) {//根据券的类型，返回券使用什么css样式
        var activitykind = el.activitykind
        if (activitykind == "单品")
            return 1
        else if (activitykind == "满返")
            return 2
        else if (activitykind == "套餐")
            return 3
        else if (activitykind == "有礼")
            return 4
        else
            return 5
    },
    showTitle: function () {//展示/隐藏全部提示
        var prevjd = $(this).prev(".ztitle")//查找点击所在的同级节点
        $(prevjd).css("height", "auto")
    }

})

