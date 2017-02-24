function writeOff() {
    $.ajax({//发起ajax请求，获取数据
        type: "GET",
        dataType: "json",
        data: {},
        url: "/webapi/earlywarningmanage/blacklist/3df60160f1c84346ae9bb96ff53e751e",
        success: function (data) {
            toggle(data);
        }
    });
}
function toggle(data) {//判断用户是否违规
    var _endTm = (new Date(data.endtime)).getTime();
    if (data.penaltytype == "停止核销" && (_endTm-_d.getTime()>0)) {
        cooldown(data,_endTm);
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
    } else if (_d.getTime() - _endTm > 0 && _d.getTime()-_endTm<threeDays) {
            durentime(data);
            $("#list").show();
            $(".f-p").text("处罚已结束");
            $(".sp1").text("00");
            $(".sp2").text("00");
            $(".sp3").text("00");
            var _keep = setTimeout(function () {
                
                $("#list").hide();
            },5000)
    } else {

    }
    $(".upp img").click(function () {
        $("#list").hide();
        $(".f-list").show()
    })
    $(".f-list").click(function () {
        $("#list").show();
        $(".f-list").hide()
    })
}
var threeDays=1000*60*60*24*3;
var _newTm;
var _Day;
var _durnt;
var _Hour;
var _Minus;
var _Seconds;
var _d = new Date();
function cooldown(data,_endTm) {//违规倒计时
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
            toggle(data);
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