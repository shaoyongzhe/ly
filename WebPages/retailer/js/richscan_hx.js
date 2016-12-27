wx.ready(function () {
    //  alert("开始扫一扫")
    //vm.scanwx()
});

avalon.ready(function () {
    $.ajax({//发起ajax请求，获取数据
        type:"GET",
        dataType:"json",
        data:{},
        url: "/webapi/earlywarningmanage/blacklist/3df60160f1c84346ae9bb96ff53e751e",
        success: function (data) {
            toggle(data);
        }
    });
    function toggle(data) {//判断用户是否违规
        if (data.penaltytype == "停止核销") {
            cooldown(data);
            durentime(data);
            $("#list").show();
            $(".upp img").click(function () {
                $("#list").hide();
                $(".f-list").show()
            })
            $(".f-list").click(function () {
                $("#list").show();
                $(".f-list").hide()
            })
        } else {

        }
    }
    function cooldown(data) {//违规倒计时
        var start = data.endtime;
        var _years = start.split("-")[0];
        var _months = start.split("-")[1].split("-")[0];
        var _days = start.split("-")[2].split(" ")[0];
        var _d = new Date();
        _endTm = (new Date(data.endtime)).getTime();
        var _newTm;
        var _Day;
        var _durnt;
        var _Hour;
        var _Minus;
        var _Seconds;
        var _timer=setInterval(function () {
            _d = new Date();
            _newTm = _d.getTime();
            _Day = Math.floor((_endTm - _newTm) / 1000 / 60 / 60 / 24);
            _durnt=(_endTm - _newTm) - _Day * 24 * 60 * 60 * 1000;
            _Hour=Math.floor(_durnt/1000/60/60);
            _durnt=_durnt-_Hour*1000*60*60
            _Minus=Math.floor(_durnt/1000/60);
            _durnt=_durnt-_Minus*1000*60;
            _Seconds = Math.floor(_durnt / 1000);
            if(_Hour<10){
                $(".sp1").text("0" + _Hour);
            } else {
                $(".sp1").text(_Hour);
            }
            if (_Minus < 10) {
                $(".sp2").text("0" + _Minus);
            } else {
                $(".sp2").text(_Minus);
            }
            if (_Seconds < 10) {
                $(".sp3").text("0" + _Seconds);
            } else {
                $(".sp3").text(_Seconds);
            }
            $(".sp4").text(_Day + "天 ")
            if (_endTm - _newTm <= 0) {
                $(".time-down p").text("处罚已结束");
                $(".sp1").text("00");
                $(".sp2").text("00");
                $(".sp3").text("00");
                clearInterval(_timer)
            }
        }, 1000)

    }
    function durentime(data){//违规处罚时间
        if (data.anticheating.breakruleslevel == "Lv1") {
            $(".stop").text("警告通知");
            $(".change").attr("src", "../image/punish1.jpg")
        } else if (data.anticheating.breakruleslevel == "Lv2") {
            $(".stop").html("暂停核销<span> 1天<span>")
            $(".change").attr("src", "../image/punish2.jpg")
        } else if (data.anticheating.breakruleslevel == "Lv3") {
            $(".stop").html("暂停核销<span> 7天<span>")
            $(".change").attr("src", "../image/punish3.jpg")
        }else if(data.anticheating.breakruleslevel == "Lv4"){
            $(".stop").html("暂停核销<span> 30天<span>")
            $(".change").attr("src", "../image/punish4.jpg")
        } else if (data.anticheating.breakruleslevel == "Lv5") {
            $(".stop").html("暂停核销<span> 1年<span>")
            $(".change").attr("src","../image/punish5.jpg")
        }
    }
    avalon.scan(document.body, vm)
   
    //H4sIAAAAAAAEADNOSkpOSjGxsEw1MzWxNDC0TE5LMzI2T0kxTkxJMzIy1DEEAMwE94AiAAAA
    // vm.cardkey = "H4sIAAAAAAAEAEWLQQrDIBBF7zLrLtTJaOxlZKKTItQEmjEQQu_ekE3_6j14_wTOWveqR6oqLb16LfAE5pEizxMHssMsmX1xlgI78QZLnOABuiq_l96uGi_N67L1Jp90_63DgXwYo_mTkXsYDRJ8f-EbdWN5AAAA"
    //vm.GetTicketInfo(vm.cardkey)
})

function isJson(obj) {
    var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}
var Interval;
var vm = avalon.define({
    $id: 'richscan_hx',
    pageStep: 1,
    jsondata: {},
    cardkey: "",
    imgurl: "",
    title: "",
    subTitle: "",
    hxNum: 0,
    scanwx: function () {//微信扫一扫
        vm.seconds = 8;
        vm.cardkey = "";
        vm.pageStep = 1
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                // var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                // alert(res.resultStr)
                vm.cardkey = res.resultStr
                if (vm.cardkey.indexOf('http') >= 0) {
                    Msg.show(2, "咦！该码来自火星吧~", "不是超惠券核销码！")

                    $(".btn").hide()
                    $("#btn_1").show()//返回
                } else
                    vm.GetTicketInfo(res.resultStr)
            }
        });
    },
    yhxNum: 0,//已核销
    whxNum: 0,//未核销
    youhui: 0,//优惠金额
    zengpin: 0,//赠品份数
    seconds: 8,//描述
    IsVerifycard: false,
    GetTicketInfo: function (cardkey) {//加载优惠卷
        $.ajax({
            type: 'GET',
            dataType: 'json',
            data: {},
            url: '/webapi/retailer/weixin/verifycardview/' + cardkey,
            beforeSend: function () { Msg.show(1, "超惠券信息加载中...") },
            // complete: function () { Msg.hide(); },
            success: function (result) {
                $(".stamp").hide()
                var jsondata = isJson(result) ? result : JSON.parse(result)
                //
                if (jsondata.user_notification != null || jsondata.user_notification != undefined) {
                    var tishi = jsondata.user_notification.toString().split('~');

                    Msg.show(2, tishi[0], tishi.length > 1 ? ("~" + tishi[1]) : "")
                    $(".btn").hide()
                    $("#btn_1").show()//返回

                } else {
                    Msg.hide()
                    vm.pageStep = 2;
                    vm.jsondata = jsondata.activityitemjson
                    vm.MsgShow(1, "消费者已选择" + result.verifynum + "张超惠券", "请确认")
                    vm.hxNum = result.verifynum

                    $(".btn").hide()
                    $("#hx_1").show();//数量不符
                    $("#hx_2").show();//确认核销
                    Interval = setInterval(function () {
                        vm.seconds--
                        $("#hx_2").html("确认核销（" + vm.seconds + "s）")
                        if (vm.seconds == 0) {
                            vm.seconds = 8
                            $("#hx_2").click()

                            $("#hx_2").html("确认核销（8s）")
                        }
                    }, 1000)

                    vm.favorable(vm.jsondata, vm.hxNum)
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                Msg.show(4, "网络不给力", "查不到超惠券信息，请重试！")
                $(".btn").hide()
                $("#btn_2").show()//返回
                $("#btn_3").show()//返回
            }
        });
    },
    verifycard: function () {//确认核销
        clearInterval(Interval);
        //  alert(vm.cardkey)
        if (vm.IsVerifycard == false) {
            vm.IsVerifycard = true;

            $.ajax({
                type: 'put',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                url: '/webapi/retailer/weixin/verifycard?cardkey=' + vm.cardkey,
                beforeSend: function () { Msg.show(1, "正在核销中...") },
                success: function (result) {
                   // alert(result)
                    var jsondata = isJson(result) ? result : JSON.parse(result)

                    Msg.hide()
                    vm.pageStep = 3
                    if (jsondata.verifynum > 0) {//核销成功
                        vm.yhxNum = jsondata.verifynum
                        vm.whxNum = vm.jsondata.totalnum - jsondata.verifynum
                        var whxMsg = vm.whxNum > 0 ? (vm.whxNum + "张超惠券未核销") : ""
                        vm.MsgShow(1, "您已经成功核销了" + jsondata.verifynum + "张超惠券", whxMsg)

                        $(".btn").hide()

                        $("#hx_3").show();//继续核销
                        vm.showUsage(1)

                    } else {//未核销成功
                        vm.yhxNum = 0
                        vm.whxNum = vm.hxNum - vm.yhxNum//失败核销数量

                        var msg = jsondata.user_notification.split('|');
                        vm.MsgShow(2, msg[0], msg.length == 1 ? '' : msg[1])

                        $(".btn").hide()

                        $("#hx_3").show();//继续核销
                        vm.showUsage(2)
                    }
                    vm.IsVerifycard = false
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var errormsg = "网络不给力";
                    try {
                        if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                            var json = JSON.parse(XMLHttpRequest.responseText);
                            errormsg = JSON.parse(json.Message).error;
                            if (errormsg == undefined || errormsg == '')
                                errormsg = "Http error: " + XMLHttpRequest.statusText;
                        }
                    } catch (e) {

                    }
                    if (errormsg.indexOf('网络') >= 0) {
                        Msg.show(4, errormsg, "核销失败，请重试")
                    } else {
                        Msg.show(2, errormsg, "核销失败，请重试")
                    }


                    $(".btn").hide()
                    $("#btn_2").show()//返回
                    $("#btn_4").show()//重试
                    vm.IsVerifycard = false
                }
            });
        }

    },
    MsgShow: function (type, title, subtitle) {
        if (type == 1) {//成功
            vm.imgurl = "/retailer/image/supercoupons/success.png";
        } else if (type == 2) {//错误
            vm.imgurl = "/retailer/image/supercoupons/msg_1.png";
        }
        vm.title = title
        vm.subTitle = subtitle
    },
    showUsage: function (type) {
        $("#tab_tishi li").removeClass("acitve")

        if (type == 1) {//已核销
            $("#tab_msg").css("border-top", "solid 1px #009f96")
            vm.hxNum = vm.yhxNum
            $("#msg_left").addClass("acitve")
            $("#tagMsg").hide()

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
            $("#tagMsg").show()

            vm.favorable(vm.jsondata, vm.whxNum)
            $("#tab_msg").removeClass("triangle_left").removeClass("tab_active")
            $("#tab_msg").addClass("triangle_right")
            if (vm.whxNum > 0) {
                $("#tab_msg").addClass("tab_active")
            }
        }
        if (vm.hxNum == 0) {//没有数据
            $(".div-list").hide();
            $("#nodata p").html("您没有" + (type == 1 ? "已" : "未") + "核销成功的超惠券~")
            $("#nodata").show();
        } else {
            $(".div-list").show();
            $("#nodata").hide();
        }
    },
    restartverifycard: function () {//数量不符合，重新核销
        clearInterval(Interval);
        $.ajax({
            type: 'get',
            dataType: 'json',
            // data: { cardkey: vm.cardkey },
            url: '/webapi/retailer/weixin/restartverifycard?cardkey=' + vm.cardkey,
            beforeSend: function () { Msg.show(1, "数量不符，重新核销...") },
            success: function (result) {
                $("#hx_2").html("确认核销（8s）")
                Msg.hide()
                vm.scanwx()
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var errormsg = "网络异常";
                try {
                    if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                        var json = JSON.parse(XMLHttpRequest.responseText);
                        errormsg = JSON.parse(json.Message).error;
                        if (errormsg == undefined || errormsg == '')
                            errormsg = "Http error: " + XMLHttpRequest.statusText;
                    }
                } catch (e) {

                }
                if (errormsg.indexOf('网络') >= 0) {
                    Msg.show(4, errormsg)
                } else {
                    Msg.show(2, errormsg)
                }

                $(".btn").hide()
                $("#btn_2").show()//返回
                $("#btn_5").show()//重试
            }
        });
    },
    fun_tautology: function () {//重试
        vm.GetTicketInfo(vm.cardkey)
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
    }
})

var Msg = avalon.define({
    $id: 'allMsg',
    imgurl: "",
    title: "",
    subTitle: "",
    show: function (type, title, subtitle) {
        $("#_loading").removeClass("fa fa-spin")
        $(".msg").hide()
        if (type == 1) {//加载中
            Msg.imgurl = "/retailer/image/supercoupons/loading.gif";
            $("#_loading").addClass("fa fa-spin")
        } else if (type == 2) {//错误
            Msg.imgurl = "/retailer/image/supercoupons/msg_1.png";

        } else if (type == 3) {//成功
            Msg.imgurl = "/retailer/image/supercoupons/success.png";
        } else if (type == 4) {//网络错误
            Msg.imgurl = "/retailer/image/supercoupons/no_network.png";
        }
        Msg.title = title
        Msg.subTitle = subtitle
        $("#Msg").show()
    },
    hide: function () {
        $("#Msg,.msg").hide()
    }
})
