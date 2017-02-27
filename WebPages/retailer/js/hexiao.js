

function writeOff(callback) {
    $.ajax({//发起ajax请求，获取数据
        type: "GET",
        dataType: "json",
        url: "/webapi/earlywarningmanage/getblacklist",
        success: function (data) {
            if (data.penaltytype == "停止核销") {
                cooldown(data);
                durentime(data);
                $("#list").show();
                $(".upp img").click(function () {
                    $("#list").hide();
                    $(".f-list").show()
                });
                $(".f-list").click(function () {
                    $("#list").show();
                    $(".f-list").hide()
                })
            } else {
                callback();
            }
        },
        error: function (statecode) {
            callback();
        }
    });
    function toggle(data) {//判断用户是否违规

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
            _durnt = _durnt - _Hour * 1000 * 60 * 60;
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
            $(".sp4").text(_Day + "天 ");
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
            $(".stop").html("暂停核销<span> 1天<span>");
            $(".change").attr("src", "../image/punish2.jpg")
        } else if (data.anticheating.breakruleslevel == "Lv3") {
            $(".stop").html("暂停核销<span> 7天<span>");
            $(".change").attr("src", "../image/punish3.jpg")
        } else if (data.anticheating.breakruleslevel == "Lv4") {
            $(".stop").html("暂停核销<span> 30天<span>");
            $(".change").attr("src", "../image/punish4.jpg")
        } else if (data.anticheating.breakruleslevel == "Lv5") {
            $(".stop").html("暂停核销<span> 1年<span>");
            $(".change").attr("src", "../image/punish5.jpg")
        }
    }
}