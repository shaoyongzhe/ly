
avalon.ready(function () {
    $.ajax({//发起ajax请求，获取数据
        type: "GET",
        dataType: "json",
        data: {},
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
        var _timer = setInterval(function () {
            _d = new Date();
            _newTm = _d.getTime();
            _Day = Math.floor((_endTm - _newTm) / 1000 / 60 / 60 / 24);
            _durnt = (_endTm - _newTm) - _Day * 24 * 60 * 60 * 1000;
            _Hour = Math.floor(_durnt / 1000 / 60 / 60);
            _durnt = _durnt - _Hour * 1000 * 60 * 60
            _Minus = Math.floor(_durnt / 1000 / 60);
            _durnt = _durnt - _Minus * 1000 * 60;
            _Seconds = Math.floor(_durnt / 1000);
            if (_Hour < 10) {
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
    function durentime(data) {//违规处罚时间
        if (data.anticheating.breakruleslevel == "Lv1") {
            $(".stop").text("警告通知");
            $(".change").attr("src", "../image/punish1.jpg")
        } else if (data.anticheating.breakruleslevel == "Lv2") {
            $(".stop").html("暂停核销<span> 1天<span>")
            $(".change").attr("src", "../image/punish2.jpg")
        } else if (data.anticheating.breakruleslevel == "Lv3") {
            $(".stop").html("暂停核销<span> 7天<span>")
            $(".change").attr("src", "../image/punish3.jpg")
        } else if (data.anticheating.breakruleslevel == "Lv4") {
            $(".stop").html("暂停核销<span> 30天<span>")
            $(".change").attr("src", "../image/punish4.jpg")
        } else if (data.anticheating.breakruleslevel == "Lv5") {
            $(".stop").html("暂停核销<span> 1年<span>")
            $(".change").attr("src", "../image/punish5.jpg")
        }
    }
    avalon.scan(document.body)
    $("#dialog").click(function () {
        vm.dialog.Hide()
    })
    // vm.dialog.Show()
    vm.GetMoney();
})

var vm = avalon.define({
    $id: 'withdraw',
    IsShow: false,
    IsWithdraw: false,
    Moneys: 0,
    state: -1,
    dialog: {
        title: "",
        subtitle: "",
        Show: function () {
            $("#dialog").show();

            setTimeout(function () {
                $("#dialog").hide();
            }, 2500)
        },
        Hide: function () {
            $("#dialog").hide();
        }
    },
    GetMoney: function () {//获取提现金额
        $.ajax({
            type: 'GET',
            dataType: "json",
            url: '/webapi/retailer/mine/money',
            beforeSend: function () { common.loading.show(); },
            complete: function () { common.loading.hide(); },
            success: function (jsondata) {

                common.loading.hide();//数据请求成功即隐藏转圈动画
                jsondata = jsondata || {};
                if (jsondata.error) {
                    toasterextend.showtips(jsondata.error, "error", false);
                    return;
                }

                if (jsondata.user_notification != undefined) {
                    toasterextend.showtips(jsondata.user_notification, "info");
                    return;
                }
                vm.IsShow = true;
                vm.Moneys = jsondata["total_amount"]
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
    MoneyWithdraw: function () {//提现
        if (vm.Moneys >= 1) {
            if (vm.IsWithdraw == false) {
                vm.IsWithdraw = true
                $.ajax({
                    type: 'post',
                    dataType: "json",
                    url: '/webapi/retailer/mine/money/tixian',
                    beforeSend: function () { common.loading.show(); },
                    complete: function () { common.loading.hide(); },
                    success: function (jsondata) {

                        common.loading.hide();//数据请求成功即隐藏转圈动画
                        jsondata = jsondata || {};
                        if (jsondata.error) {
                            vm.dialog.subtitle = jsondata.user_notification
                            vm.state = 0;
                            vm.IsWithdraw = false;//提现失败，重置状态，可以重新点击提现
                            vm.dialog.Show()
                            return;
                        }

                        if (jsondata.state != undefined && jsondata.state == 0) {
                            vm.dialog.subtitle = jsondata.user_notification
                            vm.state = 0;
                            vm.IsWithdraw = false;//提现失败，重置状态，可以重新点击提现
                            vm.dialog.Show()
                            return;
                        }
                        var title = jsondata.user_notification.split('|')
                        vm.dialog.title = title[0]
                        vm.dialog.subtitle = title[1]
                        ///提现成功，
                        vm.Moneys = 0
                        vm.state = 1
                        vm.dialog.Show();
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

        }
    }

});