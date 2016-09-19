var audio = document.getElementById("shakemusic");
var openAudio = document.getElementById("openmusic");
var flag = 1;
avalon.ready(function () {
    if (vm.distributor_id == null || vm.distributor_id == "" || vm.retailer_id == null || vm.retailer_id == "" || vm.activity_item_guid == null || vm.activity_item_guid == "" || vm.activity_id == null || vm.activity_id == "") {
        toasterextend.showtips("参数错误", "error", false);
        $(".red_bg").hide()
        return
    }
    init()
    //if (window.DeviceMotionEvent) {
    //    var speed = 15;
    //    //var audio = document.getElementById("shakemusic");
    //    //var openAudio = document.getElementById("openmusic");
    //    var x = t = z = lastX = lastY = lastZ = 0;
    //    window.addEventListener('devicemotion',
    //		function () {

    //		    // if (!vm.IsShake) {
    //		    var acceleration = event.accelerationIncludingGravity;
    //		    x = acceleration.x;
    //		    y = acceleration.y;
    //		    if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
    //		        alert(flag)
    //		        if (flag == 0) {
    //		            return
    //		        } else {
    //		            flag = 0
    //		            //vm.IsPause = true;
    //		            //vm.IsShake = true
    //		            audio.play();
    //		            $('.red-ss').addClass('wobble')
    //		            var tt = document.querySelector('.red-ss');
    //		            var i = 0;
    //		            tt.addEventListener("webkitAnimationEnd", function () { //动画结束时事件 
    //		                alert(i + "动画结束" + flag)
    //		                if (i == 0) {
    //		                    $('.red-ss').removeClass('wobble')
    //		                    if (vm.shakeNum > 0) {
    //		                        vm.startShake()
    //		                    } else {//没有抽奖次数
    //		                        vm.shakeStatus = 3;
    //		                        audio.pause();
    //		                        $('.red-tc').css('display', 'block');
    //		                    }
    //		                }
    //		                i++;

    //		            }, false);
    //		            //Pause(this, 1500);// 调用暂停函数 
    //		            //this.NextStep = function () {

    //		            //}
    //		        }
    //		    };
    //		    lastX = x;
    //		    lastY = y;
    //		    // }
    //		}, false);

    //};
    // vm.startShake();
})
var vm = avalon.define({
    $id: "shakegame",
    shakeNum: 3,//摇一摇次数
    shakeStatus: 0,//摇一摇状态 0：未摇 1：中奖 2：未中奖 3：没有摇签机会
    winMoney: 0,//中奖金额
    IsShake: false,
    IsWin: false,
    IsPause: false,
    distributor_id: common.getUrlParam("distributor_id"),
    retailer_id: common.getUrlParam("retailer_id"),
    activity_item_guid: common.getUrlParam("activity_item_guid"),
    activity_id: common.getUrlParam("activity_id"),
    startShake: function () {//开始摇一摇

        //var num = getRandom(3)
        //if (num == 1 && !vm.IsWin) {//中奖
        //    vm.IsWin = true;
        //    vm.sendRedPack()
        //} else {
        //    openAudio.play();//播放音乐
        //    vm.shakeStatus = 2;
        //    vm.shakeNum--;
        //    $('.red-ss').removeClass('wobble')
        //    $('.red-tc').css('display', 'block');
        //}
        //vm.shakeStatus = 2;
        //vm.shakeNum--;
        //$('.red-tc').css('display', 'block');
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
            },
            url: '/webapi/consumer/weixin/shake',
            success: function (result) {
                audio.pause();
                openAudio.play();//播放音乐
                vm.shakeStatus = result.result == 1 ? 1 : 2;
                if (vm.shakeStatus == 1) {
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
    },
    sendRedPack: function () {
        //vm.winMoney = getRandom(2)
        //if (vm.winMoney <= 0) {//不中奖
        //    vm.shakeStatus = 2;
        //    vm.shakeNum--;
        //    $('.red-tc').css('display', 'block');
        //    return
        //}
        //$.ajax({
        //    type: 'GET',
        //    dataType: 'json',
        //    data: {
        //        distributor_id: vm.distributor_id,
        //        retailer_id: vm.retailer_id,
        //        activity_item_guid: vm.activity_item_guid,
        //        activity_id: vm.activity_id,
        //        total_amount: vm.winMoney * 100
        //    },
        //    url: '/webapi/consumer/weixin/sendredpack',
        //    success: function (result) {
        //        openAudio.play();//播放音乐
        //        vm.shakeStatus = 1;
        //        vm.shakeNum--;
        //        $('.red-tc').css('display', 'block');
        //    },
        //    error: function (XMLHttpRequest, textStatus, errorThrown) {
        //        vm.shakeStatus = 2;
        //        vm.shakeNum--;
        //        $('.red-tc').css('display', 'block');
        //    }
        //});
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
            //alert(!vm.IsShake)
            if (!vm.IsShake) {
                vm.IsShake = true
                audio.play();
                $('.red-ss').addClass('wobble')

                //var tt = document.querySelector('.red-ss');
                //tt.addEventListener("webkitAnimationEnd", function () { //动画结束时事件 
                //}, false);
                $('.red-ss').removeClass('wobble')
                if (vm.shakeNum > 0) {
                    //  vm.shakeNum++
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
            } else {
                //alert("已摇动")
            }
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}
