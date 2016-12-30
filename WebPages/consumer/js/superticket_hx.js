
avalon.ready(function () {

    $('.tip-w').click(function () {
        $(".share_hb").show()
        $('.tip-w').fadeOut(200);
    })

    $('.share_hb').click(function () {
        $('.tip-w').fadeIn(200);
        $(".share_hb").hide()
    })

    if (vm.pageStep == 0) {
        waitloadaddress(function () {
            vm.getInfo(wxlocation.latitude, wxlocation.longitude);
        });
        // vm.getInfo();
    }

    setTimeout(function () {
        qrcode.href();
    }, 1000)
})
var Interval = null;
var times = 0;//请求次数
var hxchjNum = 0;
var vm = avalon.define({
    $id: 'superticket_hx',
    //maxNum: 10,//最大可核销数量
    hxNum: 1,
    jsondata: {},
    pageStep: 0,//控制页面展示
    activityitem_id: common.getUrlParam("activityitem_id"),
    // verifylimit: 10,//最大可核销数量
    verifylimit: 0,
    yhxNum: 0,//成功核销数量
    whxNum: 0,//失败核销数量
    hxstate: "",
    IsScan: false,//门店是否扫码
    youhui: 0,
    zengpin: 0,
    tagType: 0,//标签类型 0：数量不足 1:门店不支持
    distributor_id: "",//分销商Id
    retailer_id: "",//门店Id
    span_tishi: "让店家扫一扫下方二维码立享优惠",
    IsSearchStatus: false,//是否在查询状态
    IsVerifySuccess: false,//是否核销成功
    isselfverify: true,//是否允许消费者自助核销，超惠券24小时内结束，不允许核销
    additions: function () {//加
        if (vm.hxNum < vm.verifylimit) {
            vm.hxNum++
            $("#txt_hx").val(vm.hxNum)
        }
    },
    subtractions: function () {//减
        if (vm.hxNum > 1) {
            vm.hxNum--
            $("#txt_hx").val(vm.hxNum)
        }
    },
    getInfo: function (latitude, longitude) {
        var ajaxdata = { activityitem_id: vm.activityitem_id, consumer_id: "" };
        if (wxjsconfig.sharekey != null)
            ajaxdata[wxjsconfig.sharekey] = "_";

        if (longitude != undefined && longitude != '' && latitude != undefined && latitude != '') {
            ajaxdata["longitude"] = longitude;
            ajaxdata["latitude"] = latitude
        }

        $.ajax({
            type: 'GET',
            dataType: "json",
            url: '/webapi/consumer/weixin/activities/verifyticket',
            data: ajaxdata,
            beforeSend: function () { common.loading.show(); },
            complete: function () { common.loading.hide(); },
            success: function (jsondata) {
                common.loading.hide();//数据请求成功即隐藏转圈动画
                $(".stamp").hide()
                jsondata = jsondata || {};
                if (jsondata.error) {
                    toasterextend.showtips(jsondata.error, "error", false);
                    qrcode.href();
                    return;
                }

                if (jsondata.user_notification != undefined) {
                    toasterextend.showtips(jsondata.user_notification, "info");
                    qrcode.href();
                    return;
                }
                vm.isShow = true
                vm.jsondata = jsondata
                vm.isselfverify = jsondata.isselfverify
                vm.verifylimit = vm.jsondata.verifylimit
                vm.pageStep = 1;
                if (vm.verifylimit <= 0) {
                    vm.hxNum = 0;
                    vm.pageStep = 0;
                    var msg = vm.jsondata.state == 1 ? '太火爆了，该券已被抢光，下次要趁早！' : vm.jsondata.state == 2 ? "您今天已使用该券，明天再来吧！" : "该券您已用尽，看看其它券吧！";
                    toasterextend.showtips(msg, "error");
                    return;
                }
                //else if (vm.verifylimit == 1) {//只有一张超惠券，直接加在二维码
                //    vm.span_tishi = "该券仅剩一张可供您使用,已为您生成二维码"
                //    vm.btnClick();
                //}
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

                Msg.show(4, "网络不给力", errormsg)
                qrcode.href();
                toasterextend.showtips(errormsg, "error");
            }
        });
    },
    btnClick: function () {
        var value = $("#txt_hx").val().trim();
        var reg = /^[1-9]\d*$/;
        if (value == "") {
            $("#txt_hx").val("1")
            vm.hxNum = 1
            toasterextend.showtips("请至少选择一张超惠券", "error");
            return false
        } else
            if (!reg.test(value)) {
                $("#txt_hx").val("1")
                vm.hxNum = 1
                toasterextend.showtips("只能填写数字", "error");
                return false
            }
            else if (value <= 0) {
                $("#txt_hx").val("1")
                vm.hxNum = 1
                toasterextend.showtips("请至少选择一张超惠券", "error");
                return false
            } else if (parseInt(value) > vm.verifylimit) {
                $("#txt_hx").val(vm.verifylimit)
                vm.hxNum = vm.verifylimit
                toasterextend.showtips("最多只能选择" + vm.verifylimit + "张", "error");
                return false
            }

        vm.hxNum = parseInt($("#txt_hx").val())
        vm.pageStep = 2;
        vm.IsScan = false;
        $(".msg").hide()
        Msg.show(1, "核销二维码加载中...")
        $("#QRCode_img").attr("src", '/webapi/consumer/weixin/card_generate_code?activityitem_id=' + vm.activityitem_id + "&totalnum=" + vm.hxNum + "&activity_id=" + vm.jsondata.activity_id + "&distributor_id=" + vm.jsondata.distributor_id + "&random=" + Math.random())
        $("#QRCode_img").load(function () {//二维码加载成功后，每秒请求服务器，判断门店有没有开始扫码
            //  console.log("二维码加载成功")
            $(".stamp").hide()
            Msg.hide();
            $("#QRCode").show()
            $("#p_yxchj font").html(vm.hxNum)
            vm.hxstate = ""
            vm.favorable(vm.jsondata, vm.hxNum)
            vm.getVerifyState()

        });
        $('#QRCode_img').error(function () {
            Msg.show(2, "核销二维码加载失败");

            $("#btnlist").show();
            $(".btn").hide()
            $("#btn_1").show()//返回
            $("#btn_2").show()//重试
        });

    },
    //getVerifyState: function () {//获取门店扫描状态
    //    if (vm.hxstate == "0") {//开始记时
    //        times++;
    //    }
    //    $.ajax({
    //        type: 'GET',
    //        dataType: 'json',
    //        //timeout: 5000, //超时时间设置，单位毫秒
    //        data: { activityitem_id: vm.activityitem_id, totalnum: vm.hxNum },
    //        url: '/webapi/consumer/weixin/getVerifyState',
    //        success: function (result) {
    //            /* state
    //               1：进行中
    //               2：已完成
    //               3：失败
    //            */
    //            vm.hxstate = result.state == undefined ? "" : result.state
    //            if (result.state != null) {
    //                vm.IsScan = true
    //                //clearInterval(Interval);//查询成功，停止请求
    //                //console.log("停止")
    //                $(".msg,#QRCode").hide()
    //                if (result.state == 0) {
    //                    Msg.show(1, result.message);
    //                    // console.log(Interval)
    //                    if (Interval == null) {
    //                        Interval = setInterval(vm.getVerifyState, 2000)
    //                        //console.log("未扫码")
    //                    }
    //                    ///超过10秒请求未得到结果，提示网络问题
    //                    if (times >= 25) {
    //                        $(".msg,#QRCode").hide()
    //                        Msg.show(4, "网络不给力", "查不到超惠券信息，请重试！")
    //                        clearInterval(Interval);//停止请求
    //                        Interval = null
    //                        $("#btnlist").show();
    //                        //$("#btn_right").html("继续等待")
    //                        //$("#btn_right").on("click", page2.againRequest)
    //                        //$("#btn_left").html("退出")
    //                        //$("#btn_left").on("click", page2.quit)
    //                        $(".btn").hide()
    //                        $("#btn_3").show()//退出
    //                        $("#btn_4").show()//继续等待
    //                        times = 0;
    //                        return
    //                    } else {
    //                        //setTimeout(function () {
    //                        //    vm.getVerifyState()
    //                        //}, 1000)
    //                    }
    //                } else if (result.state == 10) {//门店核销成功
    //                    if (!vm.IsVerifySuccess) {
    //                        vm.IsVerifySuccess = true
    //                        clearInterval(Interval);//查询成功，停止请求
    //                        Interval = null
    //                        times = 0;
    //                        vm.yhxNum = result.verifynum//成功核销数量
    //                        vm.whxNum = vm.hxNum - result.verifynum//失败核销数量
    //                        var whxMsg = "";
    //                        if (vm.whxNum > 0) {
    //                            whxMsg = "其中" + vm.whxNum + "张超惠券未使用";
    //                        }
    //                        vm.pageStep = 3
    //                        // $("#qt_msg").show();
    //                        /// vm.favorable(vm.jsondata, vm.hxNum)
    //                        page2.showUsage(1)
    //                        Msg.show(3, result.message, whxMsg)
    //                        vm.distributor_id = result.distributor_id
    //                        vm.retailer_id = result.retailer_id
    //                        if (result.share != undefined && result.share != null && result.share != "") {
    //                            if ($.isFunction(wxjsshare)) {
    //                                $(".share_hb").show()
    //                                wxjsshare(vm.jsondata.share);
    //                            }
    //                            //if (result.redpackinfo != undefined && result.redpackinfo != null && result.redpackinfo != "") {
    //                            //    $("#sharetitle").show()
    //                            //    $("#sharetitle").html(result.redpackinfo)
    //                            //}
    //                            location.href = "/consumer/page/shakegame.html?distributor_id=" + vm.distributor_id + "&retailer_id=" + vm.retailer_id + "&activityitem_id=" + vm.activityitem_id + "&activity_id=" + vm.jsondata.activity_id + "&shakekey=" + result.shakekey
    //                        }
    //                    }
    //                } else if (result.state == 20) {//数量不符，重新选择
    //                    clearInterval(Interval);//查询成功，停止请求
    //                    Interval = null
    //                    times = 0;
    //                    $(".msg,#QRCode").hide()
    //                    vm.hxNum = 1;
    //                    $("#txt_hx").val("1")
    //                    vm.pageStep = 1;
    //                }
    //                else if (result.state == -1) {//未核销成功
    //                    clearInterval(Interval);//查询成功，停止请求
    //                    Interval = null
    //                    times = 0;
    //                    $(".msg,#QRCode").hide()
    //                    vm.pageStep = 3
    //                    vm.yhxNum = 0
    //                    vm.whxNum = vm.hxNum - vm.yhxNum//失败核销数量
    //                    // vm.favorable(vm.jsondata, vm.yhxNum)
    //                    // var errmsg = result.message
    //                    //if (errmsg.indexOf("门店") >= 0) {
    //                    //    Msg.show(2, "很抱歉，没有成功使用的超惠券")
    //                    //    //  page2.showUsage(3)
    //                    //    vm.tagType = 1;
    //                    //} else {
    //                    //    Msg.show(2, result.message)
    //                    //    vm.tagType = 0;
    //                    //}
    //                    var msg = result.message.split('|');
    //                    Msg.show(2, msg[0], msg.length == 1 ? '' : msg[1])
    //                    vm.tagType = result.tagtype;
    //                    page2.showUsage(2)
    //                } else {
    //                }
    //            }
    //            else {//每秒执行
    //                //setTimeout(function () {
    //                //    vm.getVerifyState()
    //                //}, 1000)
    //                // setTimeout(vm.getVerifyState, 1000)
    //                if (Interval == null) {
    //                    Interval = setInterval(vm.getVerifyState, 1000)
    //                }
    //            }
    //        },
    //        error: function (XMLHttpRequest, textStatus, errorThrown) {
    //            if (!vm.IsScan || vm.IsVerifySuccess) {//未扫描，超时
    //                return
    //            } else {
    //                $(".msg,#QRCode").hide()
    //                Msg.show(4, "网络不给力", "查不到超惠券信息，请重试！")
    //                clearInterval(Interval);//停止请求
    //                Interval = null
    //                $("#btnlist").show();
    //                //$("#btn_right").html("继续等待")
    //                //$("#btn_right").on("click", page2.againRequest)
    //                //$("#btn_left").html("退出")
    //                //$("#btn_left").on("click", page2.quit)
    //                $(".btn").hide()
    //                $("#btn_3").show()//退出
    //                $("#btn_4").show()//继续等待
    //            }
    //        }
    //    });
    //},
    txtChange: function () {
        var value = $("#txt_hx").val().trim();
        var reg = /^[0-9]\d*$/;
        if (value == "") {
            //$("#txt_hx").val("1")
            //vm.hxNum = 1
            //toasterextend.showtips("请至少选择一张超惠券", "error");
            return false
        } else
            if (!reg.test(value)) {
                $("#txt_hx").val("1")
                vm.hxNum = 1
                toasterextend.showtips("只能填写数字", "error");
                return false
            }
            else if (value <= 0) {
                $("#txt_hx").val("1")
                vm.hxNum = 1
                toasterextend.showtips("请至少选择一张超惠券", "error");
                return false
            } else if (parseInt(value) > vm.verifylimit) {
                $("#txt_hx").val(vm.verifylimit)
                vm.hxNum = vm.verifylimit
                toasterextend.showtips("最多只能选择" + vm.verifylimit + "张", "error");
                return false
            }
        vm.hxNum = parseInt(value)
        return true
    },
    favorable: function (el, num) {
        vm.youhui = 0;
        vm.zengpin = 0
        if (el.itemkind == "降价" || el.itemkind == "套餐") {//计算优惠价
            var _price = (el.originalprice - el.discountprice) * num
            vm.youhui = _price.toFixed(2).replace(".00", "")
        } else if (el.itemkind == "有礼" || el.itemkind == "买赠") {
            vm.zengpin = num
        }
        //else if (el.itemkind == "买赠") {//计算赠品
        //    var nums = num / el.buycount
        //    vm.zengpin = parseInt(nums) * el.giftcount
        //}

    },
    getVerifyState: function () {
        if (vm.IsSearchStatus)//如果正在查询，就不要再重新请求了
            return
        vm.IsSearchStatus = true;
        times++;
        if (Interval == null) {
            Interval = setInterval(vm.getVerifyState, 2000)
        }
        if (times > 10) {//请求10次后，暂停请求，提示网络不给力
            Msg.show(4, "网络不给力", "查不到超惠券信息，请重试！")
            clearInterval(Interval);//停止请求
            Interval = null
            $("#btnlist,#btn_3,#btn_4").show();//退出 继续等待
            $(".btn").hide()
        }

        $.ajax({
            type: 'GET',
            dataType: 'json',
            data: { activityitem_id: vm.activityitem_id, totalnum: vm.hxNum },
            url: '/webapi/consumer/weixin/getVerifyState',
            success: function (result) {
                /* state
                   1：进行中
                   2：已完成
                   3：失败
                */
                if (result.state == 1) {//进行中

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (!vm.IsScan || vm.IsVerifySuccess) {//未扫描，超时
                    return
                } else {
                    $(".msg,#QRCode").hide()
                    Msg.show(4, "网络不给力", "查不到超惠券信息，请重试！")
                    clearInterval(Interval);//停止请求
                    Interval = null
                    $("#btnlist").show();

                    $(".btn").hide()
                    $("#btn_3").show()//退出
                    $("#btn_4").show()//继续等待
                }
            }
        });



    }
    //sendRedPack: function (total_amount) {
    //    $.ajax({WW
    //        type: 'post',
    //        dataType: 'json',
    //        data: {
    //            distributor_id: vm.distributor_id,
    //            retailer_id: vm.retailer_id,
    //            activity_item_guid: vm.activity_item_guid,
    //            activity_id: vm.jsondata.activity_id,
    //            total_amount: total_amount
    //        },
    //        url: '/webapi/consumer/weixin/sendredpack',
    //        success: function (result) {
    //        },
    //        error: function (XMLHttpRequest, textStatus, errorThrown) {
    //        }
    //    });
    //}
})

var page2 = avalon.define({
    $id: 'superticket_page2',
    testname: "page2name",
    goBack: function () {// 返回重新选择超惠券数量
        vm.pageStep = 1;
    },
    againLoadQRCode: function () {//重新加载核销二维码
        vm.btnClick()
    },
    retailerScan: function () {//检测门店是否扫码
        //$(".msg,#QRCode").hide()
        //Msg.show(1, "正在提交信息...")
        //setTimeout(function () {
        //    $("#btnlist").show();
        //    //vm.pageStep = 3;
        //    // Msg.show(3, "恭喜您成功使用19张超惠券！")
        //    Msg.show(4, "网络不给力")
        //    $(".btn").hide()
        //    $("#btn_3").show()//退出
        //    $("#btn_4").show()//继续等待
        //    //$("#btn_right").html("继续等待")
        //    //$("#btn_right").on("click", page2.againRequest)
        //    //$("#btn_left").html("退出")
        //    //$("#btn_left").on("click", page2.quit)
        //}, 3000)
    },
    againRequest: function () {
        $(".msg,#QRCode").hide()
        Msg.show(1, "正在提交信息...")

        vm.getVerifyState();
    },
    quit: function () {
        location.href = "/consumer/page/supercouponslist.html";
    },
    showUsage: function (type) {
        $("#tab_tishi li").removeClass("acitve")

        if (type == 1) {//已核销
            $("#tab_msg").css("border-top", "solid 1px #ff6600")
            vm.hxNum = vm.yhxNum
            $("#msg_left").addClass("acitve")
            $(".stamp").hide()
            vm.favorable(vm.jsondata, vm.yhxNum)
            $("#tab_msg").removeClass("triangle_right").removeClass("tab_active")
            $("#tab_msg").addClass("triangle_left")
            if (vm.yhxNum > 0) {
                $("#tab_msg").addClass("tab_active")
            }
        } else {//未核销
            $("#tab_msg").css("border-top", "solid 1px #adabab")
            vm.hxNum = vm.whxNum;
            $("#msg_right").addClass("acitve")
            $(".stamp").hide()
            vm.favorable(vm.jsondata, vm.whxNum)
            $("#tab_msg").removeClass("triangle_left").removeClass("tab_active")
            $("#tab_msg").addClass("triangle_right")
            if (vm.whxNum > 0) {
                $("#tab_msg").addClass("tab_active")
            }
            if (vm.tagType == 0) {
                $("#tagMsg").show()//数量不足
            } else {
                $("#tagMsg1").show()//门店不支持
            }
        }
        if (vm.hxNum == 0) {//没有数据
            $(".div-list").hide();
            $("#nodata p").html("您没有" + (type == 1 ? "已" : "未") + "使用成功的超惠券~")
            $("#nodata").show();
        } else {
            $(".div-list").show();
            $("#nodata").hide();
        }
    }
})

var Msg = avalon.define({
    $id: 'allMsg',
    imgurl: "",
    title: "",
    subtitle: "",
    show: function (type, msg, subtitle) {
        $("#_loading").removeClass("fa fa-spin")
        if (type == 1) {//加载中
            $(".btn").hide()
            Msg.imgurl = "/consumer/image/supercoupons/loading.png";
            $("#_loading").addClass("fa fa-spin")
        } else if (type == 2) {//错误
            Msg.imgurl = "/consumer/image/msg_1.png";
        } else if (type == 3) {//成功
            Msg.imgurl = "/consumer/image/supercoupons/success.png";
        } else if (type == 4) {//网络错误
            Msg.imgurl = "/consumer/image/supercoupons/no_network.png";
        }
        Msg.title = msg
        Msg.subtitle = subtitle
        $("#page_msg").show()
    },
    hide: function () {
        $("#page_msg,.msg,#QRCode").hide()
    }
})

var selfVerify = avalon.define({//自助核销
    $id: 'selfVerify',
    token: common.getUrlParam("token"),
    VerifyScan: function () {
        if (selfVerify.token.length == 0) { //自助核销，调用微信扫一扫
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var token = res.split('token=')
                    selfVerify.scanSuccess(token[1])
                }
            });
        }
        else
            selfVerify.scanSuccess(selfVerify.token)

        // selfVerify.scanSuccess("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJndWlkIjoiODgzYzBkNTE4MDhjNGJiZjhhZjE4YTMyZTE5NWMwZjEifQ.3_IPUE26EI49wv8VLL4GmD7sSsWe_3d5We0ri7qlXEQ")
    },
    scanSuccess: function (qrlimitken) {//开始自助核销
        vm.pageStep = 2;
        $.ajax({
            type: 'post',
            dataType: 'json',
            data: {
                activityitem_id: vm.activityitem_id,
                token: qrlimitken,
                totalnum: parseInt($("#txt_hx").val())
            },
            beforeSend: function () { Msg.show(1, "自助核销中...") },
            url: '/webapi/consumer/weixin/qrlimitverify/scan',
            success: function (result) {
                if (result.user_notification != undefined) {
                    Msg.show(2, result.user_notification, "")
                    $("#btnlist").show();
                    $(".btn").hide()
                    $("#btn_5").show()//返回
                    return;
                }

                vm.yhxNum = result.verifynum//成功核销数量
                vm.whxNum = vm.hxNum - result.verifynum//失败核销数量
                vm.pageStep = 3
                page2.showUsage(1)
                Msg.show(3, "自助核销成功", "")
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var errormsg = "网络不给力";
                if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                    var json = JSON.parse(XMLHttpRequest.responseText);
                    if (json.Message != undefined && json.Message != null) {
                        errormsg = JSON.parse(json.Message).error;
                    }
                    else
                        errormsg = json.error;
                    if (errormsg == undefined || errormsg == '')
                        errormsg = "Http error: " + XMLHttpRequest.statusText;
                }
                var msg = errormsg.split('|')
                Msg.show(2, msg[0], msg.length > 1 ? msg[1] : "")
                $("#btnlist").show();
                $(".btn").hide()
                $("#btn_5").show()//返回
            }
        });
    },
    closeWin: function () {
        wx.closeWindow();
    }
})
///分享成功跳转到摇一摇
//function sharesuccess() {
//    location.href = "/consumer/page/shakegame.html?distributor_id=" + vm.distributor_id + "&retailer_id=" + vm.retailer_id + "&activity_item_guid=" + vm.activity_item_guid + "&activity_id=" + vm.jsondata.activity_id
//}