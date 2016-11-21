var audio = document.getElementById("shakemusic");
var openAudio = document.getElementById("openmusic");
var flag = 1;
avalon.ready(function () {
    if (vm.distributor_id == null || vm.distributor_id == "" || vm.retailer_id == null || vm.retailer_id == "" || vm.activity_item_guid == null || vm.activity_item_guid == "" || vm.activity_id == null || vm.activity_id == "" || vm.shakekey == null || vm.shakekey == "") {
        toasterextend.showtips("参数错误", "error", false);
        $(".red_bg").hide()
        return
    }
    init()
    $(".red_bg").click(function () {
        shakeAfter()
    });
})
var vm = avalon.define({
    $id: "shakegame",
    shakeNum: 1,//摇一摇次数
    shakeStatus: 0,//摇一摇状态 0：未摇 1：中奖 2：未中奖 3：没有摇签机会
    winMoney: 0,//中奖金额
    IsShake: false,
    IsWin: false,
    IsPause: false,
    distributor_id: common.getUrlParam("distributor_id"),
    retailer_id: common.getUrlParam("retailer_id"),
    activity_item_guid: common.getUrlParam("activity_item_guid"),
    activity_id: common.getUrlParam("activity_id"),
    shakekey: common.getUrlParam("shakekey"),
    startShake: function () {//开始摇一摇
        vm.shakeNum--;
        $.ajax({
            type: 'post',
            dataType: 'json',
            async: false,
            data: {
                distributor_id: vm.distributor_id,
                retailer_id: vm.retailer_id,
                activity_item_guid: vm.activity_item_guid,
                activity_id: vm.activity_id,
                shakekey: vm.shakekey
            },
            url: '/webapi/consumer/weixin/verifyshake',
            success: function (result) {
                audio.pause();
                openAudio.play();//播放音乐
                vm.shakeStatus = result.result == 1 ? 1 : 2;
                if (vm.shakeStatus == 1) {
                    vm.winMoney = result.total_amount
                    vm.IsWin = true
                }
                $('.red-tc').css('display', 'block');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                vm.shakeStatus = 2;
                // vm.shakeNum--;
                $('.red-tc').css('display', 'block');
            }
        });
    },
    againClick: function () {
        vm.IsPause = false;
        vm.shakeStatus = 0;
        vm.IsShake = false
        flag = 1;
        $('.red-tc').css('display', 'none');
    }
})

function Pause(obj, iMinSecond) {
    if (window.eventList == null)
        window.eventList = new Array();
    var ind = -1;
    for (var i = 0; i < window.eventList.length; i++) {
        if (window.eventList[i] == null) {
            window.eventList[i] = obj;
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        ind = window.eventList.length;
        window.eventList[ind] = obj;
    }
    setTimeout("GoOn(" + ind + ")", iMinSecond);
}
/*
 * 该函数把要暂停的函数放到数组window.eventList里，同时通过setTimeout来调用继续函数。 继续函数如下：
 */
function GoOn(ind) {
    var obj = window.eventList[ind];
    window.eventList[ind] = null;
    if (obj.NextStep)
        obj.NextStep();
    else
        obj();
}
///生成随机数
function getRandom(n) {
    return Math.floor(Math.random() * n + 1)
}

function closeWindow() {
    wx.closeWindow();
}



var SHAKE_THRESHOLD = 3000;
var last_update = 0;
var x = y = z = last_x = last_y = last_z = 0;
function init() {
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        alert('not support mobile event');
    }
}
function deviceMotionHandler(eventData) {
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime - last_update) > 100) {
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

        if (speed > SHAKE_THRESHOLD) {
            shakeAfter()
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}


function shakeAfter() {
            if (!vm.IsShake) {
                vm.IsShake = true
                audio.play();
                $('.red-ss').addClass('wobble')

       // $('.red-ss').removeClass('wobble')
                if (vm.shakeNum > 0) {
                    if (!vm.IsWin) {
                        vm.startShake()
                    } else {
                        vm.shakeNum--
                        vm.shakeStatus = 2;
                        audio.pause();
                        $('.red-tc').css('display', 'block');
                    }
                } else {//没有抽奖次数
                    vm.shakeStatus = 3;
                    audio.pause();
                    $('.red-tc').css('display', 'block');
                }
            }
        }
