
avalon.ready(function () {
    vm.getVerifyInfo()
})


var vm = avalon.define({
    $id: 'verify',
    authrecordcount: 0,//待审核数量
    isbinding: false,//是否绑定核销永久码
    retailername: "哈哈",//门店名称
    authrecord: {},
    getVerifyInfo: function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            beforeSend: function () { shelter.init({ icos: "/js/shelter/image/loading.gif" }) },
            complete: function () { shelter.close() },
            url: '/webapi/retailer/weixin/verifyInfo',
            success: function (json) {
                shelter.close();//隐藏转圈动画
                json = json || {};   /* 统一加这句话 */

                vm.authrecordcount = json.authrecordcount
                vm.isbinding = json.isbinding
                vm.authrecord = json.authrecord[0]
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                shelter.close();//隐藏转圈动画

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
    verifyRecord: function () {//查看记录
        if (vm.authrecordcount > 0)
            location.href = "/retailer/page/verifyconfirm.html"
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
    singleVerify: function () {//单个确认
        shelter.init({
            title: "您真的要确认么？",
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
                    affirm("complete")
                } //确定按钮事件
            },
        })
    },
    singleFailure: function () {//单个拒绝
        shelter.init({
            title: "您真的要拒绝确认么？",
            shadeClose: true,
            showBtn: true,
            clearBtn: {
                name: "回去看看",//取消按钮名称
                click: function () {
                    shelter.close()
                } //取消按钮事件
            },
            confirmBtn: {
                name: "残忍拒绝",//确定按钮名称
                click: function () {
                    affirm("failure")
                } //确定按钮事件
            },
        })
    },
    scanBindVerifycode: function () {//绑定核销码。调用扫一扫
        //wx.scanQRCode({
        //    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        //    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        //    success: function (res) {
        //        var token = res.split('token=')
        //        location.href = "/retailer/page/verifycodebind.html?retailername=" + encodeURIComponent(vm.retailername) + "&qrlimitken=" + token[1];
        //    }
        //});

        location.href = "/retailer/page/verifycodebind.html?retailername=" + encodeURIComponent(vm.retailername) + "&qrlimitken=1111111";
    },
    affirm: function (state) {//单个确认、拒绝
        $.ajax({
            type: 'put',
            dataType: 'json',
            beforeSend: function () {
                shelter.init({ title: "提交中...", icos: "/js/shelter/image/loading.gif" })
            },
            // complete: function () { shelter.close() },
            url: '/webapi/retailer/weixin/verify/auth/' + state + '/' + vm.authrecord.verify_id,
            success: function (json) {
                shelter.close();//隐藏转圈动画
                json = json || {};   /* 统一加这句话 */

                //成功后，重新加载信息
                vm.getVerifyInfo()
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
    }
})