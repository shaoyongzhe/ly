/*
 * @Author: Administrator
 * @Date:   2016-11-21 15:50:13
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-01-18 17:19:53
 */


// (function(window, $) {
//     $(function() {

//         if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0") 
//         { 
//         layer.msg("该网站暂不支持Ie 浏览器，请用其它浏览器打开",{ time: 3000 }); //IE 6.0
//                 return;
//         } 
//         else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0") 
//         { 
//         layer.msg("该网站暂不支持Ie 浏览器，请用其它浏览器打开",{ time: 3000 }); //IE 7.0
//                 return;
//         } 
//         else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0") 
//         { 
//         layer.msg("该网站暂不支持Ie 浏览器，请用其它浏览器打开",{ time: 3000 }); //IE 8.0
//                 return;
//         } 
//         else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0") 
//         { 
//         layer.msg("该网站暂不支持Ie 浏览器，请用其它浏览器打开",{ time: 3000 }); //IE 9.0
//                 return;
//         }
//         else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE10.0") 
//         { 
//         layer.msg("该网站暂不支持Ie 浏览器，请用其它浏览器打开",{ time: 3000 }); //IE 10.0
//                 return;
//         }
//         else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE11.0") 
//         { 
//         layer.msg("该网站暂不支持Ie 浏览器，请用其它浏览器打开",{ time: 3000 }); //IE 10.0
//                 return;
//         }


//         // 首先清空页面
//         $("table.notify tbody").empty();
//         // 页数
//         var pageindex = 0;
//         // 每页展示5个
//         var pagesize = 10;
//         // dropload
//         $('.content_drop').dropload({
//             scrollArea: $('tbody'),
//             loadDownFn: function(me) {
//                 pageindex++;
//                 // 拼接HTML
//                 var df = {};
//                 df = getSearch();
//                 df.pageindex = pageindex;
//                 df.pagesize = pagesize;
//                 $.ajax({
//                     type: 'get',
//                     url: '/webapi/ipaloma/propagation?parameters=' + JSON.stringify(df),
//                     dataType: 'json',
//                     beforeSend: function() {
//                         $('.dropload-load').css('display', 'block');
//                     },
//                     success: function(data) {
//                         $('.dropload-load').css('display', 'none');
//                         if (data.error) {
//                             layer.msg('暂无数据');
//                             return;
//                         }
//                         // $(".totalcount").text(data.content.length);
//                         // $("table.notify tbody").empty();
//                         var isSet = "",
//                             autoW = "",
//                             tr = "",
//                             td = data.content;
//                         if (td.length > 0) {
//                             for (var i = 0; i < td.length; i++) {
//                                 // 状态
//                                 if (td[i].state == "draft") {
//                                     td[i].draft = "草稿";
//                                     isSet = "<a class='ml-5 detailed' title='详细'>" + "<i class='Hui-iconfont'>" + '&#xe681;' + "</i>" + '详细' + "</a>" + "<a class='ml-5 exm'  title='提交审核'>" + "<input type='hidden' value='draft' />" + "<i class='Hui-iconfont'>" + "&#xe615;" + "</i>" + '提交审核' + "</a>" + "<a class='ml-5 modify' title='修改'>" + "<i class='Hui-iconfont'>" + "&#xe60c;" + "</i>" + '修改' + "</a>" + "<a class='ml-5 del' title='删除'>" + "<i class='Hui-iconfont'>" + "&#xe6e2;" + "</i>" + '删除' + "</a>";
//                                     autoW = "310";
//                                 } else if (td[i].state == "auditsuccess") {
//                                     td[i].auditsuccess = "待发送";
//                                     isSet = "<a class='ml-5 detailed' title='详细'>" + "<i class='Hui-iconfont'>" + "&#xe6f5;" + "</i>" + '详细' + "</a>";
//                                     autoW = "75";
//                                 } else if (td[i].state == 'auditfail') {
//                                     td[i].auditfail = "审核未通过";
//                                     isSet = "<a class='ml-5 detailed'title='详细'>" + "<i class='Hui-iconfont'>" + "&#xe6f5;" + "</i>" + '详细' + "</a>" + "<a class='ml-5 modify'  title='修改'>" + "<input type='hidden' value='auditfail' />" + "<i class='Hui-iconfont'>" + "&#xe60c;" + "</i>" + '修改' + "</a>" + "<a class='ml-5 del' title='删除'>" + "<i class='Hui-iconfont'>" + "&#xe6e2;" + "</i>" + '删除' + "</a>";
//                                     autoW = "180";
//                                 } else if (td[i].state == 'toberelease') {
//                                     td[i].toberelease = "待发送";
//                                     isSet = "<a class='ml-5 detailed' title='详细'>" + "<i class='Hui-iconfont'>" + "&#xe6f5;" + "</i>" + '详细' + "</a>" + "<a class='ml-5 modify' title='修改'>" + "<input type='hidden' value='store' />" + "<i class='Hui-iconfont'>" + "&#xe60c;" + "</i>" + '修改' + "</a>" + "<a class='ml-5 release' title='立即发送'>" + "<i class='Hui-iconfont'>" + "&#xe68a;" + "</i>" + '立即发送' + "</a>" + "<a class='ml-5 del' title='删除'>" + "<i class='Hui-iconfont'>" + "&#xe6e2;" + "</i>" + '删除' + "</a>";
//                                     autoW = "310";
//                                 } else if (td[i].state == 'audit') {
//                                     td[i].audit = "审核中";
//                                     isSet = "<a class='ml-5 detailed' title='详细'>" + "<i class='Hui-iconfont'>" + "&#xe6f5;" + "</i>" + '详细' + "</a>" + "<a class='ml-5 modify'  title='修改'>" + "<i class='Hui-iconfont'>" + "&#xe60c;" + "</i>" + '修改' + "</a>" + "<a class='ml-5 del' title='删除'>" + "<i class='Hui-iconfont'>" + "&#xe6e2;" + "</i>" + '删除' + "</a>" + "<a class='ml-5 Reject'  title='驳回'>" + "<input type='hidden' value='audit' />" + "<i class='Hui-iconfont'>" + "&#xe6a6;" + "</i>" + '驳回' + "</a>" + "<a class='ml-5 adopt' title='审核通过'>" + "<i class='Hui-iconfont'>" + "&#xe6a7;" + "</i>" + '审核通过' + "</a>";
//                                     autoW = "317";
//                                 } else if (td[i].state == 'released') {
//                                     td[i].released = "已发送";
//                                     isSet = "<a class='ml-5 detailed' title='详细'>" + "<i class='Hui-iconfont'>" + "&#xe6f5;" + "</i>" + '详细' + "</a>";
//                                     autoW = "75";
//                                 }

//                                 if (td[i].push_consumer == 1) {
//                                     var a = td[i].push_consumer = "消费者";
//                                 } else {
//                                     var a = td[i].push_consumer = ""
//                                 }
//                                 if (td[i].push_distributor == 1) {
//                                     var b = td[i].push_distributor = "分销商"
//                                 } else {
//                                     var b = td[i].push_distributor = ""
//                                 }
//                                 if (td[i].push_retailer == 1) {
//                                     var c = td[i].push_retailer = "门店"
//                                 } else {
//                                     var c = td[i].push_retailer = ""
//                                 };
//                                 var areastring = "";
//                                 var provinces = td[i].area;
//                                 var array = [];
//                                 if (provinces.length == 1 && provinces[0].name == "fullcountry") {
//                                     areastring = "全国";
//                                 } else {
//                                     for (var j = 0; j < provinces.length; j++) {
//                                         //process province
//                                         var temp = provinces[j].name + ' ';
//                                         areastring += temp;
//                                         if (provinces[j].city.length > 0) {
//                                             for (var k = 0; k < provinces[j].city.length; k++) {
//                                                 //process city
//                                                 var citytemp = provinces[j].city[k].name + ' ';
//                                                 areastring += citytemp;
//                                                 if (provinces[j].city[k].country.length > 0) {
//                                                     //process country
//                                                     for (var l = 0; l < provinces[j].city[k].country.length; l++) {
//                                                         var countrytemp = provinces[j].city[k].country[l] + ' ';
//                                                         areastring += countrytemp;
//                                                     };
//                                                 }
//                                             };
//                                         }
//                                     }
//                                 }
//                                 //<td><input type='checkbox' name='' value=''></td>
//                                 tr += "<tr class='text-c'><input type='hidden' class='guid' value=" + td[i].guid + "><input type='hidden' class='imgUrl' value=" + td[i].poster_url + "><input type='hidden' class='area_json' value=" + JSON.stringify(td[i].area) + "/><td class='td'>" + td[i].propagationsubjectcode  + "</td><td class='service'>" + td[i].service + "</td><td>" + areastring + "</td><td title='" + td[i].copywriting + "'><span class='content'>" + td[i].copywriting + "</span></td><td>" + "<span>" + b + "</span>" + "<br/>" + "<span>" + c + "</span>" +
//                                     "<br />" + "<span>" + a + "</span>" + "</td><td>" + td[i].pushtime + "</td><td>" + (td[i].draft || td[i].auditsuccess || td[i].auditfail || td[i].toberelease || td[i].audit || td[i].released) + "</td><td class='f-14 td-manage'><div class='handle'><div class='handle-icon'><i class='Hui-iconfont'>" + "</i></div><div class='handle-btns-wrap' style='width:" + autoW + "px'><div class='handle-btns'>" + isSet + "<span class='arrow-right'></span></div></div></div></td></tr>";
//                             }
//                             // 如果没有数据
//                         } else {
//                             // 锁定
//                             me.lock('down');
//                             // 无数据
//                             me.noData(true);
//                         }
//                         //延迟1秒加载
//                         setTimeout(function() {
//                             // 插入数据到页面，放到最后面
//                             // $('.lists').append(result);
//                             $("table.notify tbody").prepend(tr);
//                             // 每次数据插入，必须重置
//                             me.resetload();
//                         });
//                     },
//                     error: function(xhr, type) {
//                         console.log('Ajax error!');
//                         // 即使加载出错，也得重置
//                         // me.resetload();
//                           layer.msg('加载出错');
//                     }
//                 });
//             }
//         });
//     });

// })(window, jQuery)

// 遮罩加载层
// function tishi(content, url) {
    // var html = '';
    // $(document.body).append(html);
    // $("#msg").show();
    // $(".msgg").html(content);
    // if (url) {
        // window.setTimeout("location.href='" + url + "'", 1500);
    // } else {
        // setTimeout('$("#msg").fadeOut()', 1500);
    // }
// }
// tishi('加载中···');



$('table.notify').on('click', '.handle-icon', function(e) {
    e.stopPropagation();

    // $(this).toggleClass('on').parents('tr').siblings().find('.handle-icon').removeClass('on');

    $(this).toggleClass('on');
    $(".handle-icon").not(this).removeClass('on');

});
$(document).click(function() {
    $('.handle-icon').removeClass('on');
});

// 重置按钮
$('.resetting').on('click', function() {

    $('#service_val').val("");
    $('#serverBeginTime').val("");
    $('#serverEndTime').val("");
    $(".text2").val('--请选择--');
    $(".text1").val('--请选择--');
    $('.gf-select span em:eq(0)').text('省份');
    $('.gf-select span em:eq(1)').text('城市');
    $('.gf-select span em:eq(2)').text('区县');
    $('#numbul_val').val("");

    $('.search-btn').click();
});



function getList(curr, handle, searchForm) {
    $("table.notify tbody").empty();
    $('.layui-layer-close').click();
    // console.log(searchForm)
    if (curr == undefined || curr == "") {
        curr = 1;
    }
    var df = {};
    // if(searchForm){
    // if (handle == 'search') {
    df = searchForm;
    // 页数
    var pageindex = 0;
    // 每页展示5个
    var pagesize = 40;
    // $('.content_drop .dropload-down').siblings().remove()
    // 每次刷新的时候清空上一次的记录（加载记录）
    $('.content_drop .dropload-down').remove();
    // dropload
    $('.content_drop').Drop_down_loading({

        gundong: $('tbody'),
        loadDownFn: function(me) {
            pageindex++;
            // 拼接HTML
            var df = {};
            df = searchForm;
            df.pageindex = pageindex;
            df.pagesize = pagesize;

            $.ajax({
                type: "get",
                // url: "/webapi/ipaloma/propagation?parameters=" + JSON.stringify(df),
                url: "/webapi/ipaloma/propagation?parameters=" + JSON.stringify(df),
                dataType: "json",
                beforeSend: function() {
                    $('.search-btn').css('background', '#8D8B8E');
                    $('.search-btn').attr('disabled', true);
                    $('.search-btn2').attr('disabled', true);
                    $('.search-btn').val('查询中');
                    $('.dropload-down').fadeIn(100)
                },
                success: function(data) {
                    // console.log(data);
                    $('.dropload-load').css('display', 'none');
                    if (data.error) {
                        layer.msg('暂无数据');
                         $('.search-btn').css('background', '#009DD9');
                         $('.search-btn').attr('disabled', false);
                         $('.search-btn2').attr('disabled', false);
                         $('.search-btn').val('查询');
                        return;
                    }
                    $('.search-btn').attr('disabled', false);
                    $('.search-btn2').attr('disabled', false);
                    $('.search-btn').css('background', '#009DD9');
                    $('.search-btn').val('查询');
                    var isSet = "",
                        autoW = "",
                        tr = "",
                        td = data.content;

                    if (td.length>0) {
                        // $('.tiaoshu').html('当前共有数据'+td.length+'条');
                        for (var i = 0; i < td.length; i++) {
                            // 状态
                            if (td[i].state == "draft") {
                                td[i].draft = "草稿";
                                isSet = "<a class='ml-5 detailed' title='详细'>" + "<i class='Hui-iconfont'>" + '&#xe6f5;' + "</i>" + '详细' + "</a>" + "<a class='ml-5 exm'  title='提交审核'>" + "<input type='hidden' value='draft' />" + "<i class='Hui-iconfont'>" + "&#xe615;" + "</i>" + '提交审核' + "</a>" + "<a class='ml-5 modify' title='修改'>" + "<i class='Hui-iconfont'>" + "&#xe60c;" + "</i>" + '修改' + "</a>" + "<a class='ml-5 del' title='删除'>" + "<i class='Hui-iconfont'>" + "&#xe6e2;" + "</i>" + '删除' + "</a>";
                                autoW = "310";
                            } else if (td[i].state == "auditsuccess") {
                                td[i].auditsuccess = "待发送";
                                isSet = "<a class='ml-5 detailed' title='详细'>" + "<i class='Hui-iconfont'>" + "&#xe6f5;" + "</i>" + '详细' + "</a>";
                                autoW = "75";
                            } else if (td[i].state == 'auditfail') {
                                td[i].auditfail = "审核未通过";
                                isSet = "<a class='ml-5 detailed'title='详细'>" + "<i class='Hui-iconfont'>" + "&#xe6f5;" + "</i>" + '详细' + "</a>" + "<a class='ml-5 modify'  title='修改'>" + "<input type='hidden' value='auditfail' />" + "<i class='Hui-iconfont'>" + "&#xe60c;" + "</i>" + '修改' + "</a>" + "<a class='ml-5 del' title='删除'>" + "<i class='Hui-iconfont'>" + "&#xe6e2;" + "</i>" + '删除' + "</a>";
                                autoW = "180";
                            } else if (td[i].state == 'toberelease') {
                                td[i].toberelease = "待发送";
                                isSet = "<a class='ml-5 detailed' title='详细'>" + "<i class='Hui-iconfont'>" + "&#xe6f5;" + "</i>" + '详细' + "</a>" + "<a class='ml-5 modify' title='修改'>" + "<input type='hidden' value='store' />" + "<i class='Hui-iconfont'>" + "&#xe60c;" + "</i>" + '修改' + "</a>" + "<a class='ml-5 release' title='立即发送'>" + "<i class='Hui-iconfont'>" + "&#xe68a;" + "</i>" + '立即发送' + "</a>" + "<a class='ml-5 del' title='删除'>" + "<i class='Hui-iconfont'>" + "&#xe6e2;" + "</i>" + '删除' + "</a>";
                                autoW = "310";
                            } else if (td[i].state == 'audit') {
                                td[i].audit = "审核中";
                                isSet = "<a class='ml-5 detailed' title='详细'>" + "<i class='Hui-iconfont'>" + "&#xe6f5;" + "</i>" + '详细' + "</a>" + "<a class='ml-5 modify'  title='修改'>" + "<i class='Hui-iconfont'>" + "&#xe60c;" + "</i>" + '修改' + "</a>" + "<a class='ml-5 del' title='删除'>" + "<i class='Hui-iconfont'>" + "&#xe6e2;" + "</i>" + '删除' + "</a>" + "<a class='ml-5 Reject'  title='驳回'>" + "<input type='hidden' value='audit' />" + "<i class='Hui-iconfont'>" + "&#xe6a6;" + "</i>" + '驳回' + "</a>" + "<a class='ml-5 adopt' title='审核通过'>" + "<i class='Hui-iconfont'>" + "&#xe6a7;" + "</i>" + '审核通过' + "</a>";
                                autoW = "317";
                            } else if (td[i].state == 'released') {
                                td[i].released = "已发送";
                                isSet = "<a class='ml-5 detailed' title='详细'>" + "<i class='Hui-iconfont'>" + "&#xe6f5;" + "</i>" + '详细' + "</a>";
                                autoW = "75";
                            }


                            if (td[i].push_consumer == 1) {
                                var a = td[i].push_consumer = "消费者" + '<br>';
                            } else {
                                var a = td[i].push_consumer = ""

                            }
                            if (td[i].push_distributor == 1) {
                                var b = td[i].push_distributor = "分销商" + '<br>';
                            } else {
                                var b = td[i].push_distributor = ""

                            }
                            if (td[i].push_retailer == 1) {
                                var c = td[i].push_retailer = "门店" + '<br>';
                            } else {
                                var c = td[i].push_retailer = ""
                            };

                            var areastring = "";
                            var provinces = td[i].area;
                            var array = [];
                            if (provinces.length == 1 && provinces[0].name == "全国") {
                                areastring = "全国";
                            } else {
                                for (var j = 0; j < provinces.length; j++) {
                                    //process province
                                    var temp = provinces[j].name + ' ';
                                    areastring += temp;
                                    if (provinces[j].city.length > 0) {
                                        for (var k = 0; k < provinces[j].city.length; k++) {
                                            //process city
                                            var citytemp = provinces[j].city[k].name + ' ';
                                            areastring += citytemp;
                                            if (provinces[j].city[k].country.length > 0) {
                                                //process country
                                                for (var l = 0; l < provinces[j].city[k].country.length; l++) {
                                                    var countrytemp = provinces[j].city[k].country[l] + ' ';
                                                    areastring += countrytemp;
                                                };
                                            }
                                        };
                                    }
                                }
                            }
                            tr += "<tr class='text-c'><input type='hidden' class='guid' value=" + td[i].guid + "><input type='hidden' class='imgUrl' value=" + td[i].poster_url + "><input type='hidden' class='area_json' value=" + JSON.stringify(td[i].area) + "/><td class='td'>" + td[i].propagationsubjectcode + "</td><td title='" + td[i].service + "' class='service'>" + td[i].service + "</td><td title='" + areastring + "'>" + areastring + "</td><td title='" + td[i].copywriting + "'><span class='content'>" + td[i].copywriting + "</span></td><td>" + "<span>" + b + "</span>" + "<span>" + c + "</span>" +
                                "<span>" + a + "</span>" + "</td><input type='hidden' class='pushtime' value=" + ProcessDate1(td[i].pushtime) + "><td>" + ProcessDate(td[i].pushtime) + "</td><td>" + (td[i].draft || td[i].auditsuccess || td[i].auditfail || td[i].toberelease || td[i].audit || td[i].released) + "</td><td class='f-14 td-manage'><div class='handle'><div class='handle-icon'><i class='Hui-iconfont'>" + "</i></div><div class='handle-btns-wrap' style='width:" + autoW + "px'><div class='handle-btns'>" + isSet + "<span class='arrow-right'></span></div></div></div></td></tr>";
                        }
                        
                        // 如果没有数据
                    } else {
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData(true);
                    }
                    $("table.notify tbody").append(tr);
                    $('.tiaoshu').html('当前共有数据'+'<span>'+ $('.pagesTbodyLong tr').length +'</span>'+ '条');
                        $('.dropload-down').fadeOut(4000);
                        me.resetload();

                },
                error: function() {
                    console.log('加载出错');
                    // layer.msg('加载出错');
                    // 即使加载出错，也得重置
                    // me.resetload();
                    $('.loading').remove();
                    $('.dropload-load').html('没有加载到数据，请重新查询');
                    $('.search-btn').attr('disabled', false);
                    $('.search-btn').css('background', '#009DD9');
                    $('.search-btn').val('查询');
                }
            });
        }
    });
};

function ProcessDate(date)
{
    if(date!=null||date!=undefined){
        var temp=date.split(/\s/g); 
        return temp[0];
    }
}


function ProcessDate1(date)
{
    if(date!=null||date!=undefined){
        var temp=date.split(/\s/g); 
        return temp;
    }
}
// $('.pushtime').val().split(',')[1]

$(document).on('click', '.search-btn', function() {
    getList(1, 'search', getSearch());
})


// 查询
// $("body").on("click", ".search-btn", function() {
//     getList(1, 'search', getSearch());
// });


// 查询文案		
function getSearch() {
    // alert('1');
    $('.tiaoshu').html('当前共有数据'+'<span>'+ 0 +'</span>'+ '条');
    var send_object = $(".text2").find("option:selected").text();
    if (send_object == "分销商") {
        var a = 1;
    } else {
        var a = 0;
    }

    if (send_object == "消费者") {
        var b = 1;
    } else {
        var b = 0;
    }

    if (send_object == "门店") {
        var c = 1;
    } else {
        var c = 0;
    }


    var send_state = $(".text1").find("option:selected").text();
    if (send_state == "草稿") {
        var send_state = 'draft';

    } else if (send_state == "审核中") {
        var send_state = 'audit';

    } else if (send_state == "审核未通过") {
        var send_state = 'auditfail';

    } else if (send_state == "待发送") {
        var send_state = 'toberelease';

    } else if (send_state == "已发送") {
        var send_state = 'released';
    }

    // 获取地区的值
    var sheng_val = "";// + ',';
    var shi_val = "";// + ',';
    var qu_val = "";//;

    if ($('.gf-select span em:eq(0)').text() == '省份') {
        sheng_val = "";
    }else{
        sheng_val = $('.gf-select span em:eq(0)').text();
    }

    if ($('.gf-select span em:eq(1)').text() == '城市') {
        shi_val = "";
    }else{
        shi_val =  ',' + $('.gf-select span em:eq(1)').text();
    }
    if ($('.gf-select span em:eq(2)').text() == '区县') {
        qu_val = "";
    }else
    {
        qu_val = ',' + $('.gf-select span em:eq(2)').text();
    }

    var searchForm = {
        // 编号
        propagationsubjectcode: $.trim($('#numbul_val').val()),
        // 标题
        service: $.trim($('#service_val').val()),

        begintime: $('#serverBeginTime').val(),
        // begintime:"gfdgfdg",
        // 结束时间
        endtime: $('#serverEndTime').val() + ' 23:59:59',

        area: $.trim(sheng_val + shi_val + qu_val),
        // area:"河北省",
        // 发送状态
        // state:  "draft",
        state: send_state,
        // 发送对象
        push_distributor: a,
        push_consumer: b,
        push_retailer: c
            // state:d
    };
    // console.log(searchForm.area);
    if (searchForm.service == "") {

        delete searchForm.service;
    };

    if (searchForm.begintime == "") {

        delete searchForm.begintime;
    };

    if (searchForm.endtime == " 23:59:59") {

        delete searchForm.endtime;
    };

    if (searchForm.area == "") {

        delete searchForm.area;
    };

    if (searchForm.state == '--请选择--'||searchForm.state == '') {

        delete searchForm.state;
    };
    if (searchForm.push_distributor == 0) {
        delete searchForm.push_distributor;
    };
    if (searchForm.push_consumer == 0) {
        delete searchForm.push_consumer;
    };
    if (searchForm.push_retailer == 0) {
        delete searchForm.push_retailer;
    };
    if (searchForm.propagationsubjectcode == "") {

        delete searchForm.propagationsubjectcode;
    };
    // layer.msg('正在加载，请稍等');
    return searchForm;
}


// 删除文案的某一行
$('table.notify').on('click', '.handle-btns .del', function() {
    var tr = $(this).closest('tr');
    var trIndex = $(this).closest('tr').index();
    $("#trIndex").val(trIndex);
    var guid = tr.find('input').val();
    layer.confirm('确定要删除？', {
        title: '删除',
        btn: ['确定', '取消']
    }, function() {
        layer.msg('正在删除，请稍等', {
            time: 2000
        });
        // 此处只是演示，并没有真正的删除数据，如果有api的话 直接传个guid，后台就给删除数据了，然后再传给getlist，走ajax刷新页面
        // parentTr.remove();
        // window.localStorage.clear();
        // layer.msg('删除成功');
        // return;
        _ajax("delete", '/webapi/ipaloma/propagation/' + guid + '', null, '删除失败', function() {
            var cur = $('.laypage_curr').text();
            if (cur) {
                if ($('table.notify tbody tr').length == 1) {
                    cur -= 1;
                    if (cur <= 0) {
                        cur = 1;
                    }
                }
            }
            getList(cur, 'del', getSearch());
        })
    })
})


// 提交审核
$('table.notify').on('click', '.exm', function() {
    // var guid_val = $(this).parents("tr").find('.guid').val();
    var tr = $(this).closest('tr');
    var trIndex = $(this).closest('tr').index();
    $("#trIndex").val(trIndex);
    var guid = tr.find('input').val();
    var state1 = tr.find('td:eq(6)').text();
    if (state1 == "草稿") {
        var realstate = "draft";
    };
    if (state1 == "审核中") {
        var realstate = "audit";
    }
    if (state1 == "审核成功") {
        var realstate = "auditsuccess";
    }
    if (state1 == "审核失败") {
        var realstate = "auditfail";
    }
    if (state1 == "保存") {
        var realstate = "store";
    }
    if (state1 == "待发送") {
        var realstate = "toberelease";
    }
    console.log(state1);
    layer.msg('正在提交,请稍等', {
        time: 2000
    });
    // _ajax("post","webapi/ipaloma/propagation/{'"+guid_val+"'}/audit/",GetInformation(),'提交失败',function(){
    var currentstate = {
        currentstate: realstate,
        optype: "audit"
    }
    _ajax('post', '/webapi/ipaloma/propagation/' + guid + '/op', currentstate, '提交失败', function() {
        getList(1, 'exm', getSearch());
    });
});



// 驳回
$('table.notify').on('click', '.Reject', function() {
    // var guid_val = $(this).parents("tr").find('.guid').val();
    var tr = $(this).closest('tr');
    var trIndex = $(this).closest('tr').index();
    $("#trIndex").val(trIndex);
    var guid = tr.find('input').val();
    var state1 = tr.find('td:eq(6)').text();
    if (state1 == "草稿") {
        var realstate = "draft";
    };
    if (state1 == "审核中") {
        var realstate = "audit";
    }
    if (state1 == "审核成功") {
        var realstate = "auditsuccess";
    }
    if (state1 == "审核失败") {
        var realstate = "auditfail";
    }
    if (state1 == "保存") {
        var realstate = "store";
    }
    if (state1 == "待发送") {
        var realstate = "toberelease";
    }
    console.log(state1);
    layer.msg('正在驳回，请稍等', {
        time: 2000
    });

    // _ajax("post","webapi/ipaloma/propagation/{'"+guid_val+"'}/audit/",GetInformation(),'提交失败',function(){
    var currentstate = {
        currentstate: realstate,
        optype: "auditfail"
    }
    _ajax('post', '/webapi/ipaloma/propagation/' + guid + '/op', currentstate, '驳回失败', function() {
        getList(1, 'Reject', getSearch());
    });
});

// 审核通过
$('table.notify').on('click', '.adopt', function() {
    // var guid_val = $(this).parents("tr").find('.guid').val();
    var tr = $(this).closest('tr');
    var trIndex = $(this).closest('tr').index();
    $("#trIndex").val(trIndex);
    var guid = tr.find('input').val();
    var state1 = tr.find('td:eq(6)').text();
    if (state1 == "草稿") {
        var realstate = "draft";
    };
    if (state1 == "审核中") {
        var realstate = "audit";
    }
    if (state1 == "审核成功") {
        var realstate = "auditsuccess";
    }
    if (state1 == "审核失败") {
        var realstate = "auditfail";
    }
    if (state1 == "保存") {
        var realstate = "store";
    }
    if (state1 == "待发送") {
        var realstate = "toberelease";
    }
    console.log(state1);
    layer.msg('正在审核，请稍等', {
        time: 2000
    });

    // _ajax("post","webapi/ipaloma/propagation/{'"+guid_val+"'}/audit/",GetInformation(),'提交失败',function(){
    var currentstate = {
        currentstate: realstate,
        optype: "auditsuccess"
    }
    _ajax('post', '/webapi/ipaloma/propagation/' + guid + '/op', currentstate, '审核失败', function() {
        getList(1, 'adopt', getSearch());
    });
});

// 立即发送
$('table.notify').on('click', '.release', function() {
    // var guid_val = $(this).parents("tr").find('.guid').val();
    var tr = $(this).closest('tr');
    var trIndex = $(this).closest('tr').index();
    $("#trIndex").val(trIndex);
    var guid = tr.find('input').val();
    var state1 = tr.find('td:eq(6)').text();
    if (state1 == "草稿") {
        var realstate = "draft";
    };
    if (state1 == "审核中") {
        var realstate = "audit";
    }
    if (state1 == "审核成功") {
        var realstate = "auditsuccess";
    }
    if (state1 == "审核失败") {
        var realstate = "auditfail";
    }
    if (state1 == "保存") {
        var realstate = "store";
    }
    if (state1 == "待发送") {
        var realstate = "toberelease";
    }
    console.log(state1);
    layer.msg('正在发送，请稍等', {
        time: 2000
    });

    // _ajax("post","webapi/ipaloma/propagation/{'"+guid_val+"'}/audit/",GetInformation(),'提交失败',function(){
    var currentstate = {
        currentstate: realstate,
        optype: "release"
    }
    _ajax('post', '/webapi/ipaloma/propagation/' + guid + '/op', currentstate, '发送失败', function() {
        getList(1, 'release', getSearch());
    });
});

// 发布
$('table.notify').on('click', '.release', function() {
    var guid_val = $(this).parents("tr").find('.guid').val();
    layer.msg('正在发布，请稍等', {
        time: 2000
    });

    _ajax("get", "/webapi/ipaloma/propagation/{'" + guid_val + "'}/release", '发布失败', function() {
        getList(1, 'released', getSearch());

    })
})

var pic_url = "";
//图片上传预览  
function previewImage(file) {
    var form = new FormData($('form')[0]);
    $.ajax({
        type: "POST",
        url: "/webapi/ipaloma/propagation/upload/imgupload",
        data: form,
        xhr: function() {
            return $.ajaxSettings.xhr();
        },
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            //console.warn(data.picture_url);
            pic_url = data.picture_url;
            // console.log(pic_url)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("上传失败，请检查网络后重试");
        }
    });
    // 判断图片类型
    var type_val = $('#fileid').val();

    if (!/\.(gif|GIF|jpg|png|JPG|PNG)$/.test(type_val)) {
        layer.msg("图片类型必须是gif | jpg | png中的一种");
        $('#fileid').val("");
        $('#imghead').attr('src', '');
        return false;
    }
    if (type_val == "") {
        layer.msg("请上传图片");
        return false;
    }


    var MAXWIDTH = 360;
    var MAXHEIGHT = 320;
    var div = document.getElementById('preview');
    if (file.files && file.files[0]) {
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.onload = function() {
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
            //                 img.style.marginLeft = rect.left+'px';
            img.style.marginTop = 0 + 'px';
        }
        var reader = new FileReader();
        reader.onload = function(evt) {
            img.src = evt.target.result;
        }
        reader.readAsDataURL(file.files[0]);
    } else //兼容IE
    {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + 0 + "px;" + sFilter + src + "\"'></div>";
    }
}

function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = {
        top: 0,
        left: 0,
        width: width,
        height: height
    };
    if (width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}
// 修改
$('table.notify').on('click', '.modify', function() {
    // $('.layui-layer-setwin a').css('display','none');
    var tr = $(this).closest('tr');
    var trIndex = $(this).closest('tr').index();
    $("#trIndex").val(trIndex);
    var guid = tr.find('input').val();
    var picture = tr.find('.imgUrl').val();
    $.ajax({
        type: "get",
        url: '/webapi/ipaloma/propagation/' + guid + '/detail',
        dataType: "json",
        // data: data,
        // 获取地区放到隐藏域
        success: function(data_text) {
            var areaobj = {};
            areaobj["area"] = [];
            areaobj["area"] = data_text.content.area;
            for (var i = 0; i < areaobj["area"].length; i++) {
                var areaobj1 = areaobj["area"][i];
                // console.log(areaobj1.name);
                if (areaobj1.name == '全国') {
                    areaobj1.name = '全国';
                }
            }
            $('.area_val').val(JSON.stringify(areaobj, null, 4));
            // 地区
            // debugger
            // $('nav span:eq(1)').click();

            // console.log(JSON.stringify(areaobj, null, 4))
            for (var i = 0; i < areaobj.area.length; i++) {
                // debugger
                var area = areaobj.area[i];
                if (area.name == '全国') {
                    area.name = '全国';
                }
                // debugger
                $('.region-wrap').append("<div class='region-item'><div class='row'><div class='provice'><span><em class='shengName' title=" + area.name + ">" + area.name + "</em><i class='x'>×</i></span></div></div>");

                // $('.region-wrap').append("<div class='row'><div class='provice'><span><em class='shengName' title=" + area.name + ">" + area.name + "</em><i class='x'>×</i></span></div><div class='charge'></div></div>");
                if (area.city) {
                    for (var j = 0; j < area.city.length; j++) {
                        $('.region-item').last().append("<div class='row city-wrap'><div class='city city-item'><span><em class='cityName'>" + area.city[j].name + "</em><i class='x'>×</i></span></div><div class='charge'><div class='district-wrap'></div></div></div>");

                        for (var k = 0; k < area.city[j].country.length; k++) {
                            // console.log(area.city[j].country[k].name);

                            $('.district-wrap').last().append("<span><em qx='" + JSON.stringify(area.city[j].country[k], null, 4) + "'>" + area.city[j].country[k] + "</em><i class='x'>×</i></span>");
                        }

                    }
                }


            }
        }

        // <div class="region-item"><div class='row'><div class='provice'><span><em class='shengName' title='天津市'>天津市</em><i class='x'>×</i></span></div><div class='charge'></div></div><div class='row city-wrap'><div class='city city-item'><span><em class='cityName'>天津市 </em><i class='x'>×</i></span></div><div class='charge'><div class='district-wrap'><span><em>红桥区</em><i class='x'>×</i></span><span><em>西青区</em><i class='x'>×</i></span><span><em>宁河县</em><i class='x'>×</i></span></div></div></div></div>

    });
    var data = {
        guid: tr.find('.guid').val(),
        service: tr.find('td:eq(1)').text(),
        purpose: tr.find('td:eq(0)').text(),
        area: tr.find('td:eq(2)').text(),
        senfContent: tr.find('td:eq(3)').text(),
        readyNumber: tr.find('td:eq(4) span:eq(0)').text(),
        readyNumber2: tr.find('td:eq(4) span:eq(1)').text(),
        readyNumber3: tr.find('td:eq(4) span:eq(2)').text(),
        time: tr.find('td:eq(5)').text(),
        poster_url: tr.find('.imgUrl').val()
    };
    layer.msg('正在操作，请稍等')
    layer.open({
        type: 1,
        shadeClose: true,
        anim: 2,
        title: '修改文案',
        area: ["70%", "100%"],
        content: $('.c'),
        end: function(){ 
            // layer.open({
            //   type: 2,
            //   title: '很多时候',
            //   shadeClose: true,
            //   shade: false,
            //   maxmin: true, //
            //   area: ['893px', '600px'],
            //   content: 'http://qixiaofei.com/'
            // });
            // window.location='Marketcopymanagement.html';
            // console.log(1);
            // $('.search-btn').click();
        }
    });
    
    $('.qxf_colse').css('display','none');
    $('.region-wrap').empty();
    // 获取到数据放到输入框中
    $('._guid').val(data.guid);
    $('.word').text(data.service.length);
    $('#textarea_value').val(data.service);
    $('#send_text').val(data.senfContent);
    // 显示到页面上的地区，并不能传给后台，传给后台的是隐藏域的数据 input type =  hidden
    // $('.region-wrap').append(data.area);


    // $('#data_time').val(data.time);
    // 判断今天是周几，如果是周五的时候，进行判断（ 跟随每周推送消息一同推送【画对勾】）
    var riqi = tr.find('td:eq(5)').text().substring(0, 10);
    var arys1 = new Array();
    arys1 = riqi.split('-'); //日期为输入日期，格式为 2013-3-10
    var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
    // console.log(ssdate.getDay());
    var minute = tr.find('.pushtime').val().split(',')[1];;
        
    if (ssdate.getDay() == 5 && minute=='09:00:00') {
        $('.Graphic_message .ck:eq(1)').find('img').removeClass('xiyin_son');
        $('.Graphic_message .ck:eq(0)').find('img').addClass('xiyin_son');
        $('#data_time').val('');
    } else {
        $('.Graphic_message .ck:eq(1)').find('img').addClass('xiyin_son');
        $('.Graphic_message .ck:eq(0)').find('img').removeClass('xiyin_son');
        $('#data_time').val(data.time);
    }

    if (data.readyNumber == "分销商") {
        $('.send_object dir div:eq(0)').find('img').addClass('xiyin_son');
    } else {
        $('.send_object dir div:eq(0)').find('img').removeClass('xiyin_son');
    }
    if (data.readyNumber2 == "门店") {
        $('.send_object dir div:eq(1)').find('img').addClass('xiyin_son');
    } else {
        $('.send_object dir div:eq(1)').find('img').removeClass('xiyin_son');
    }
    if (data.readyNumber3 == "消费者") {
        $('.send_object dir div:eq(2)').find('img').addClass('xiyin_son');
    } else {
        $('.send_object dir div:eq(2)').find('img').removeClass('xiyin_son');
    }
    var data_pic = data.poster_url;
    $('#imghead').attr('src', data_pic);


    var area_val5 = $('.area_val').val();
    if(area_val5!=''){
        var area_val3 = JSON.parse(area_val5);
    }
   

    if (!area_val3) {
        $('.region-wrap').text('');
    } 
})

// 修改 里面的提交审核
$('.examine1').on('click', function() {

    if ($('.send_object dir').find('div:eq(0) img').hasClass('xiyin_son') == true) {
        var a = 1;
    } else {
        var a = 0;
    }
    if ($('.send_object dir').find('div:eq(1) img').hasClass('xiyin_son') == true) {
        var b = 1;
    } else {
        var b = 0;
    }
    if ($('.send_object dir').find('div:eq(2) img').hasClass('xiyin_son') == true) {
        var c = 1;
    } else {
        var c = 0;
    }
    if ($('.mode1').find('div:eq(0) img').hasClass('xiyin_son') == true) {
        var d = 1;
    } else {
        var d = 0;
    }

    if ($('.Graphic_message .ck:eq(0)').find('img').hasClass('xiyin_son') == true) {
        var e = 1;
    } else {
        var e = undefined;
    }


    if ($('.Graphic_message .ck:eq(1)').find('img').hasClass('xiyin_son') == true) {
        var time_val = $('#data_time').val();
        if (time_val == '') {
            // layer.msg('请选择时间');
            layer.tips('请选择时间', '#data_time', {
                tips: [3, '#F22525'],
                time: 4000
            });
            return;
        };
    }

    if (pic_url == "") {
        pic_url = $('#imghead').attr('src');
    }

    $('#count').click();
    var guid = $(this).closest('.layui-layer-content').find('._guid').val();
    var state1 = $(this).closest('.layui-layer-content').find('.state').val();
    var textarea_value = JSON.stringify($.trim($('#textarea_value').val()));
    var form_value = {
        guid: guid,
        service: textarea_value,
        area: JSON.stringify(JSON.parse($('.area_val').val()).area),
        push_distributor: a,
        push_consumer: b,
        push_retailer: c,
        category: d,
        poster_url: pic_url,
        copywriting: $('#send_text').val(),
        bindwithperiodpush: e,
        pushtime: time_val,
        currentstate: state1,
        state: "audit",
        optype: "store"
    };


         if (form_value.service == ""||$('#textarea_value').val().length=='0') {
        layer.msg('请输入文案标题');
        layer.tips('请输入文案标题', '#wordCount', {
            tips: [4, '#F22525'],
            time: 4000
        });
        return;
    }

        if(!$('#textarea_value').val()){
        layer.msg('请输入文案标题');
        layer.tips('请输入文案标题', '#wordCount', {
            tips: [4, '#F22525'],
            time: 4000
        });
        return;
    }

    // 最新地区判断有没有值   // 
    var area_val2 = JSON.parse($('.area_val').val());
    if (area_val2.area.length == 0) {
        layer.msg('请选择地区');
        layer.tips('请选择地区', '.area', {
            tips: [1, '#F22525'],
            time: 4000
        });
        return;
    }
    if ($('.region-wrap').text() == '') {
        layer.msg('请选择地区');
        layer.tips('请选择地区', '.area', {
            tips: [1, '#F22525'],
            time: 4000
        });
        return;
    }
    if (form_value.push_distributor == 0 && form_value.push_consumer == 0 && form_value.push_retailer == 0) {
        layer.msg('请选择发送对象');
        layer.tips('请选择发送对象', '.send_object', {
            tips: [4, '#F22525'],
            time: 4000
        });
        return;
    }

    if (form_value.category == "") {
        // layer.msg('请选择发送方式');
        layer.tips('请选择发送方式', '.mode1', {
            tips: [1, '#F22525'],
            time: 4000
        });
        return;
    }

    // if (form_value.poster_url == '') {
    //     layer.msg('请选择封面图片');
    //     return;
    // }
    if ($('#imghead').attr('src') == '') {
        // layer.msg('请选择封面图片');
        layer.tips('请选择封面图片', '.cover_photo', {
            tips: [4, '#F22525'],
            time: 4000
        });
        return;
    }
    if (form_value.copywriting == "") {
        // layer.msg('请填写发送内容');
        layer.tips('请填写发送内容', '.mode', {
            tips: [1, '#F22525'],
            time: 4000
        });
        return;
    }

    // form_value.area = JSON.stringify(form_value.area);
    layer.msg('正在提交');
    _ajax('put', '/webapi/ipaloma/propagation/', form_value, '修改失败', function() {
        getList(1, 'release', getSearch());
    })
})

//修改里面的关闭
$('.examine1_close').on('click', function() {
    // $('.layui-layer-close').click();
        //并提交审核后 回到页面刷新
        $('.search-btn').click();
})

// 修改中的预览  S
$('.examine1_preview').click(function() {
        if ($('.send_object dir').find('div:eq(0) img').hasClass('xiyin_son') == true) {
            var a = $('.send_object dir').find('a:eq(0)').text() +'<br>';
        } else {
            var a = '';
        }
        if ($('.send_object dir').find('div:eq(1) img').hasClass('xiyin_son') == true) {
            var b = $('.send_object dir').find('a:eq(1)').text()  +'<br>';
        } else {
            var b = '';
        }
        if ($('.send_object dir').find('div:eq(2) img').hasClass('xiyin_son') == true) {
            var c = $('.send_object dir').find('a:eq(2)').text()  +'<br>';
        } else {
            var c = '';
        }

        if ($('.mode1').find('div:eq(0) img').hasClass('xiyin_son') == true) {
            var d = $('.mode1').find('a').text();
        };

        if ($('.area_val').val() == '') {

        } else {
            // 地区负责人显示到预览上
            areastring = "";
            var provinces = JSON.parse($('.area_val').val()).area;
            var array = [];
            if (provinces.length == 1 && provinces[0].name == "全国") {
                areastring = "全国";
            } else {
                for (var j = 0; j < provinces.length; j++) {
                    //process province
                    var provincecharge = "";
                    // if (provinces[j].charge) {
                    // provincecharge = provinces[j].charge;
                    // }
                    var temp = provinces[j].name + '<br />';
                    areastring += temp;
                    if (provinces[j].city) {
                        for (var k = 0; k < provinces[j].city.length; k++) {
                            //process city
                            var citycharge = "";
                            // if (provinces[j].city[k].charge) {
                            // citycharge = provinces[j].city[k].charge;
                            // }
                            var citytemp = provinces[j].city[k].name + '<br />';
                            areastring += citytemp;
                            if (provinces[j].city[k].country.length > 0) {
                                //process country
                                areastring += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                                for (var l = 0; l < provinces[j].city[k].country.length; l++) {
                                    var countrytemp = provinces[j].city[k].country[l] + ' ';
                                    areastring += countrytemp;
                                };
                                areastring += '<br />';
                            }
                        };
                    }
                }
            }
        }
        $('#count').click();
        // 图片
        var pic1_url = $('#preview img').attr('src');
        var form_value = {
            textarea_value: $('#textarea_value').val(),
            objective: $('.input-text').find('option:selected').text(),
            area: $('area').val(),
            send_object: a + b + c,
            mode1: d,
            post_url: pic1_url,
            send_text: $('#send_text').val(),
            together: $('input[name="Fruit"]:checked').val(),
            pushtime: time_val,
            // 这个是假的
            push_distributor: a,
            push_consumer: b,
            push_retailer: c,
        }

        if (form_value.service == ""||$('#textarea_value').val().length=='0') {
        layer.msg('请输入文案标题');
        layer.tips('请输入文案标题', '#wordCount', {
            tips: [4, '#F22525'],
            time: 4000
        });
        return;
    }

        if(!$('#textarea_value').val()){
        layer.msg('请输入文案标题');
        layer.tips('请输入文案标题', '#wordCount', {
            tips: [4, '#F22525'],
            time: 4000
        });
        return;
    }
        // 判断地区
        var area_val2 = JSON.parse($('.area_val').val());
        if (area_val2.area.length == 0) {
            layer.msg('请选择地区');
            layer.tips('请选择地区', '.area', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }
        if ($('.region-wrap').text() == '') {
            layer.msg('请选择地区');
            layer.tips('请选择地区', '.area', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }

        if (form_value.push_distributor == '' && form_value.push_consumer == '' && form_value.push_retailer == '') {
            layer.msg('请选择发送对象');
            layer.tips('请选择发送对象', '.send_object', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }

        if (form_value.mode1 == undefined) {
            // layer.msg('请选择发送方式');
            layer.tips('请选择发送方式', '.mode1', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }

        if (form_value.post_url == "") {
            // layer.msg('请选择封面图片');
            layer.tips('请选择封面图片', '.cover_photo', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }

        if (form_value.send_text == "") {
            // layer.msg('请填写发送内容');
            layer.tips('请填写发送内容', '.mode', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }
        // 最后判断单选框
        var radio_val = $('.Graphic_message').find('.ck:eq(0) img').hasClass('xiyin_son');
        var radio_val1 = $('.Graphic_message').find('.ck:eq(1) img').hasClass('xiyin_son');
        if (radio_val == false && radio_val1 == false) {
            layer.tips('请选择图文发送方式', '.Graphic_message', {
                tips: [3, '#F22525'],
                time: 4000
            });
            return;
        }

        var time_val = $('#data_time').val();
        if (radio_val == true) {
            var e = 1;
            $('#data_time').val('');
            // var time_val = new Date();
            var time_val = '跟随每周推送消息一同推送';
        } else if (radio_val1 == true) {
            // $('#LAY_demorange_s').attr('disabled',false);
            if (time_val == '') {
                // layer.msg('请选择时间');
                layer.tips('请选择时间', '#data_time', {
                    tips: [3, '#F22525'],
                    time: 4000
                });
                return;
            };
        };
        // if (form_value.together == "") {
        //     layer.msg('请选择图文消息发送时间');
        //     return;
        // }
        // if (form_value.pushtime == "") {
        //     layer.msg('请选择时间');
        //     return;
        // }


        var index = layer.open({
            type: 1,
            title: '预览',
            area: ['51.3%', "100%"],
            // maxmin: true,
            content: '<div class="Text_Title">' +
                '<div class="Float_Title">文案标题</div>' +
                '<div class="Float_text">' + form_value.textarea_value + '</div>' +
                '</div>' +
                '<div class="Text_Title">' +
                '<div class="Float_Title">发送地区</div>' +
                '<div class="Float_text">' + areastring + '</div>' +
                '</div>' +

                '<div class="Text_Title">' +
                '<div class="Float_Title">发送对象</div>' +
                '<div class="Float_text">' + form_value.send_object + '</div>' +
                '</div>' +

                '<div class="Text_Title">' +
                '<div class="Float_Title">发送方式</div>' +
                '<div class="Float_text">' + form_value.mode1 + '</div>' +
                '</div>' +
                '<div class="Text_Title">' +
                '<div class="Float_Title">封面图片</div>' +
                '<div class="Float_text srcPic"><img src="Images/QQ截图20161118203155.png" width="400" height="300" alt="" /></div>' +
                '</div>' +
                '<div class="Text_Title">' +
                '<div class="Float_Title">发送内容</div>' +
                '<div class="Float_text">' + form_value.send_text + '</div>' +
                '</div>' +
                '<div class="Text_Title">' +
                '<div class="Float_Title">' +
                '<div class="Float_Title2">图文消息<br />发送时间</div>' +
                '<div class="Float_text2">' + time_val + '</div>' +
                '</div>' +
                '</div>' +
                '<div class="button">' + '</div>'
        });
        //两种方法获取图片 
        $('.srcPic').html($('#preview').html())
            // var a=$('.upload_img img ').attr('src');
            // $('.Float_text img').attr('src',a);
        var picwidth = $('.upload_img img').width();
        // alert(picwidth)
        var picheight = $('.upload_img img').height();
        $('#preview').css('width', picwidth);
        $('#preview').css('height', picheight);
    })
    // E


//修改中的保存并继续新增
$('.examine1_Newly_added').on('click', function() {

    // IsTrue1=2;
    // $('#service_val').val($('#textarea_value').val());
    if ($('.send_object dir').find('div:eq(0) img').hasClass('xiyin_son') == true) {
        var a = 1;
    } else {
        var a = 0;
    }
    if ($('.send_object dir').find('div:eq(1) img').hasClass('xiyin_son') == true) {
        var b = 1;
    } else {
        var b = 0;
    }
    if ($('.send_object dir').find('div:eq(2) img').hasClass('xiyin_son') == true) {
        var c = 1;
    } else {
        var c = 0;
    }
    if ($('.mode1').find('div:eq(0) img').hasClass('xiyin_son') == true) {
        var d = 1;
    } else {
        var d = 0;
    }

    if ($('.Graphic_message .ck:eq(0)').find('img').hasClass('xiyin_son') == true) {
        var e = 1;
    } else {
        var e = undefined;
    }

    if ($('.Graphic_message .ck:eq(1)').find('img').hasClass('xiyin_son') == true) {
        var time_val = $('#data_time').val();
        if (time_val == '') {
            // layer.msg('请选择时间');
            layer.tips('请选择时间', '#data_time', {
                tips: [3, '#F22525'],
                time: 4000
            });
            return;
        };
    }
    if (pic_url == "") {
        pic_url = $('#imghead').attr('src');
    }

    $('#count').click();
    var guid = $(this).closest('.layui-layer-content').find('._guid').val();
    var state1 = $(this).closest('.layui-layer-content').find('.state').val();
    var textarea_value = JSON.stringify($.trim($('#textarea_value').val()));
    var form_value = {
        guid: guid,
        service: textarea_value,
        area: JSON.stringify(JSON.parse($('.area_val').val()).area),
        push_distributor: a,
        push_consumer: b,
        push_retailer: c,
        category: d,
        poster_url: pic_url,
        copywriting: $('#send_text').val(),
        bindwithperiodpush: e,
        pushtime: time_val,
        currentstate: state1,
        state: "draft",
        optype: "draft"
    };

    if (form_value.service == ""||$('#textarea_value').val().length=='0') {
        layer.msg('请输入文案标题');
        layer.tips('请输入文案标题', '#wordCount', {
            tips: [4, '#F22525'],
            time: 4000
        });
        return;
    }

if(!$('#textarea_value').val()){
        layer.msg('请输入文案标题');
        layer.tips('请输入文案标题', '#wordCount', {
            tips: [4, '#F22525'],
            time: 4000
        });
        return;
    }
    // 最新地区判断有没有值   // 
    var area_val2 = JSON.parse($('.area_val').val());
    if (area_val2.area.length == 0) {
        layer.msg('请选择地区');
        layer.tips('请选择地区', '.area', {
            tips: [1, '#F22525'],
            time: 4000
        });
        return;
    }

    if ($('.region-wrap').text() == '') {
        layer.msg('请选择地区');
        layer.tips('请选择地区', '.area', {
            tips: [1, '#F22525'],
            time: 4000
        });
        return;
    }

    if (form_value.push_distributor == 0 && form_value.push_consumer == 0 && form_value.push_retailer == 0) {
        layer.msg('请选择发送对象');
        layer.tips('请选择发送对象', '.send_object', {
            tips: [4, '#F22525'],
            time: 4000
        });
        return;
    }

    if (form_value.category == "") {
        // layer.msg('请选择发送方式');
        layer.tips('请选择发送方式', '.mode1', {
            tips: [1, '#F22525'],
            time: 4000
        });
        return;
    }

    // if (form_value.poster_url == '') {
    //     layer.msg('请选择封面图片');
    //     return;
    // }
    if ($('#imghead').attr('src') == '') {
        // layer.msg('请选择封面图片');
        layer.tips('请选择封面图片', '.cover_photo', {
            tips: [4, '#F22525'],
            time: 4000
        });
        return;
    }
    if (form_value.copywriting == "") {
        // layer.msg('请填写发送内容');
        layer.tips('请填写发送内容', '.mode', {
            tips: [1, '#F22525'],
            time: 4000
        });
        return;
    }

    // form_value.area = JSON.stringify(form_value.area);
    // $('.layui-layer-close').click();

    layer.msg('正在保存...', {
        time: 2000
    });

    _ajax("put", "/webapi/ipaloma/propagation", form_value, '保存错误', function(data) {
        layer.msg('保存成功，请继续填写', {
            time: 1500
        });
        // window.location.reload();


        // 清空输入框里面的内容
        $('#textarea_value').val('');
        $('.word').text('0');
        // 清空隐藏域的地区
        $('.area_val ').val('');
        // 清空页面中的地区
        $('.region-wrap').text('');
        // 清空发送对象
        $('.send_object dir').find('div:eq(0) img').removeClass('xiyin_son');
        $('.send_object dir').find('div:eq(1) img').removeClass('xiyin_son');
        $('.send_object dir').find('div:eq(2) img').removeClass('xiyin_son');
        // 清空发送方式
        $('.mode1').find('div:eq(0) img').removeClass('xiyin_son');
        // 清空图片
        $('#imghead').attr('src', '');
        // $('#imghead').css('height', '0px');
        // $('#imghead').css('width', '0px');
        //清空发送内容
        $('#send_text').val('');
        // 新增标题
        $('.layui-layer-title').text('新增文案');
        // 默认选择发送方式
        $('.mode1').find('div:eq(0) img').addClass('xiyin_son');
        // console.log(1);
        // 清空发送时间选择项
        // 
        $('.Graphic_message .ck:eq(0)').find('img').removeClass('xiyin_son');
        $('.Graphic_message .ck:eq(1)').find('img').removeClass('xiyin_son');
        // 清空时间
        $('#data_time').val('');
    });
})

//修改中的保存
$('.examine1_Preservation').on('click', function() {
    // IsTrue=2;
    // $('#service_val').val($('#textarea_value').val());
    if ($('.send_object dir').find('div:eq(0) img').hasClass('xiyin_son') == true) {
        var a = 1;
    } else {
        var a = 0;
    }
    if ($('.send_object dir').find('div:eq(1) img').hasClass('xiyin_son') == true) {
        var b = 1;
    } else {
        var b = 0;
    }
    if ($('.send_object dir').find('div:eq(2) img').hasClass('xiyin_son') == true) {
        var c = 1;
    } else {
        var c = 0;
    }
    if ($('.mode1').find('div:eq(0) img').hasClass('xiyin_son') == true) {
        var d = 1;
    } else {
        var d = 0;
    }

    if ($('.Graphic_message .ck:eq(0)').find('img').hasClass('xiyin_son') == true) {
        var e = 1;
    } else {
        var e = undefined;
    }

    if ($('.Graphic_message .ck:eq(1)').find('img').hasClass('xiyin_son') == true) {
        var time_val = $('#data_time').val();
        if (time_val == '') {
            // layer.msg('请选择时间');
            layer.tips('请选择时间', '#data_time', {
                tips: [3, '#F22525'],
                time: 4000
            });
            return;
        };
    }
    if (pic_url == "") {
        pic_url = $('#imghead').attr('src');
    }

    $('#count').click();
    // var area_fullcountry = ;
    // for(var i = 0;i<area_fullcountry.length;i++){
    //     var area_fullcountry1 = area_fullcountry[i];
    //     if(area_fullcountry1.name=='fullcountry'){
    //         area_fullcountry2='全国';
    //     }
    // }

    var guid = $(this).closest('.layui-layer-content').find('._guid').val();
    var state1 = $(this).closest('.layui-layer-content').find('.state').val();
    var textarea_value = JSON.stringify($.trim($('#textarea_value').val()));
    var form_value = {
        guid: guid,
        service: textarea_value,
        area: JSON.stringify(JSON.parse($('.area_val').val()).area),
        push_distributor: a,
        push_consumer: b,
        push_retailer: c,
        category: d,
        poster_url: pic_url,
        copywriting: $('#send_text').val(),
        bindwithperiodpush: e,
        pushtime: time_val,
        currentstate: state1,
        state: "draft",
        optype: "draft"
    };

    if (form_value.service == "") {
        layer.msg('请输入文案标题');
        layer.tips('请输入文案标题', '#wordCount', {
            tips: [4, '#F22525'],
            time: 4000
        });
        return;
    }

    if(!$('#textarea_value').val()){
        layer.msg('请输入文案标题');
        layer.tips('请输入文案标题', '#wordCount', {
            tips: [4, '#F22525'],
            time: 4000
        });
        return;
    }

    // 最新地区判断有没有值   // 
    var area_val2 = JSON.parse($('.area_val').val());
    if (area_val2.area.length == 0) {
        layer.msg('请选择地区');
        layer.tips('请选择地区', '.area', {
            tips: [1, '#F22525'],
            time: 4000
        });
        return;
    }

    if ($('.region-wrap').text() == '') {
        layer.msg('请选择地区');
        layer.tips('请选择地区', '.area', {
            tips: [1, '#F22525'],
            time: 4000
        });
        return;
    }
    if (form_value.push_distributor == 0 && form_value.push_consumer == 0 && form_value.push_retailer == 0) {
        layer.msg('请选择发送对象');
        layer.tips('请选择发送对象', '.send_object', {
            tips: [4, '#F22525'],
            time: 4000
        });
        return;
    }

    if (form_value.category == "") {
        // layer.msg('请选择发送方式');
        layer.tips('请选择发送方式', '.mode1', {
            tips: [1, '#F22525'],
            time: 4000
        });
        return;
    }

    // if (form_value.poster_url == '') {
    //     layer.msg('请选择封面图片');
    //     return;
    // }
    if ($('#imghead').attr('src') == '') {
        // layer.msg('请选择封面图片');
        layer.tips('请选择封面图片', '.cover_photo', {
            tips: [4, '#F22525'],
            time: 4000
        });
        return;
    }
    if (form_value.copywriting == "") {
        // layer.msg('请填写发送内容');
        layer.tips('请填写发送内容', '.mode', {
            tips: [1, '#F22525'],
            time: 4000
        });
        return;
    }

    // form_value.area = JSON.stringify(form_value.area);
    // $('.layui-layer-close').click();

    layer.msg('正在保存...', {
        time: 2000
    });

    _ajax("put", "/webapi/ipaloma/propagation", form_value, '保存错误', function(data) {
        layer.msg('保存成功', {
            time: 1500
        });
        // window.history.back();
        // $('.layui-layer-close').click();
        // getList(1, 'search', getSearch());
    });
})

// 详情
$('table.notify').on('click', '.detailed', function() {
    var tr = $(this).parents('tr');
    var trIndex = $(this).parents('tr').index();
    $("#trIndex").val(trIndex);
    var guid = tr.find('input').val();
    var state = tr.find('td:eq(6)').text();
    var picture = tr.find('.imgUrl').val()
        // console.log(state);
    var isInput = "";
    if (state == "已发送") {
        isInput = "<span class='btn_center'><button style='color:#fff;' type='button' class='btn btn-close btn-default'>关闭</button></span>";
    } else if (state == "审核中") {
        isInput = "<span class='btn_center'>" + "<button style='color:#fff;' type='button' class='btn btn-close btn-default'>关闭</button>" +
            "<button style='color:#fff;' type='button' class='btn btn_modify'>修改</button>" +
            "<button style='color:#fff;' type='button' class='btn btn_adopt'>审核通过</button>" +
            "<button style='color:#fff;' type='button' class='btn btn_Reject'>驳回</button>" + "</span>";
    } else if (state == "草稿") {
        isInput = "<span class='btn_center'>" + "<button style='color:#fff;' type='button' class='btn btn-close btn-default'>关闭</button>" +
            "<button style='color:#fff;' type='button' class='btn btn_modify'>修改</button>" +
            "<button style='color:#fff;' type='button' class='btn btn_send D_examine'>提交审核</button>" + "</span>";
    } else if (state == "审核未通过") {
        isInput = "<span class='btn_center'>" + "<button style='color:#fff;' type='button' class='btn btn-close btn-default'>关闭</button>" +
            "<button style='color:#fff;' type='button' class='btn btn_modify btn-default'>修改</button>" + "</span>";

    } else if (state == "待发送") {
        isInput = "<span class='btn_center'>" + "<button style='color:#fff;' type='button' class='btn btn-close btn-default'>关闭</button>" +
            "<button style='color:#fff;' type='button' class='btn btn_modify'>修改</button>" +
            "<button style='color:#fff;' type='button' class='btn D_send'>立即发送</button>" + "</span>";
    };

    // var data = {
    // 	guid: tr.find('.guid').val(),
    // 	title: tr.find('td:eq(0)').text(),
    // 	objective: tr.find('td:eq(1)').text(),
    // 	area: tr.find('td:eq(2)').text(),
    // 	sendObject: tr.find('td:eq(3)').text(),
    // 	senfContent: tr.find('td:eq(4)').text(),
    // 	readyNumber: tr.find('td:eq(5)').text(),
    // 	state: tr.find('td:eq(9)').text()
    // }
    // 
    /* if($('.button_two button').length==1){
             $('.btn:first-child').css('margin-left','450px');
     }*/


    layer.msg('正在处理，请稍等', {
        time: 3000
    });
    // _ajax("get","/webapi/ipaloma/propagation/{'"+guid+"'}/detail","获取详情失败",function(data_text){
    // 	})
    $.ajax({
        type: "get",
        url: '/webapi/ipaloma/propagation/' + guid + '/detail',
        dataType: "json",
        // data: data,
        success: function(data_text) {
            // console.log(data_text);
            var a = "";
            if (data_text.content.push_consumer == 1) {
                var temp = "消费者" + '<br />'
                a += temp;
            }
            if (data_text.content.push_distributor == 1) {
                var temp = "分销商" + '<br />'
                a += temp;
            }
            if (data_text.content.push_retailer == 1) {
                var temp = "门店";
                a += temp;
            }
            var areastring = "";
            var provinces = data_text.content.area;
            var array = [];
            if (provinces.length == 1 && provinces[0].name == "全国") {
                areastring = "全国";
            } else {
                for (var j = 0; j < provinces.length; j++) {
                    //process province
                    // var provincecharge = "";
                    // if (provinces[j].charge) {
                    //     provincecharge = provinces[j].charge;
                    // }
                    var temp = provinces[j].name + '<br />';
                    areastring += temp;
                    if (provinces[j].city.length > 0) {
                        for (var k = 0; k < provinces[j].city.length; k++) {
                            //process city
                            // var citycharge = "";
                            // if (provinces[j].city[k].charge) {
                            //     citycharge = provinces.city[k].charge;
                            // }
                            var citytemp = provinces[j].city[k].name + '<br />';
                            areastring += citytemp;
                            if (provinces[j].city[k].country.length > 0) {
                                //process country
                                areastring += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                                for (var l = 0; l < provinces[j].city[k].country.length; l++) {
                                    var countrytemp = provinces[j].city[k].country[l] + ' ';
                                    areastring += countrytemp;
                                };
                                areastring += '<br />';
                            }
                        };
                    }
                }
            }

            var riqi = data_text.content.pushtime.substring(0, 10);
            var arys1 = new Array();
            arys1 = riqi.split('-'); //日期为输入日期，格式为 2013-3-10
            var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
            var minute = data_text.content.pushtime.split(' ')[1];
        
                if (ssdate.getDay() == 5 && minute=='09:00:00') {
                    var pushtime_val = '跟随每周推送消息一同推送';
                }else{
                    var pushtime_val = riqi;
                }

            var index = layer.open({
                type: 1,
                title: '详情',
                area: ['57.3%', "100%"],
                // maxmin: true,
                content: '<input type="hidden" id="guid_val" value="' + guid + '">' +
                    '<input type="hidden" id="state_val" value="' + state + '">' +
                    '<input type="hidden" id="trIndex" value="' + trIndex + '">' +
                    '<div class="Text_Title">' +
                    '<div class="Float_Title">文案标题</div>' +
                    '<div class="Float_text">' + data_text.content.service + '</div></div>' +

                    // '<div class="Text_Title">'+
                    // '<div class="Float_Title">发送目的</div>'+
                    // '<div class="Float_text">'+data_text.content.belong_group+'</div></div>'+

                    '<div class="Text_Title">' +
                    '<div style="float:left" class="Float_Title">发送地区</div>' +
                    '<div class="Float_text">' +
                    areastring +
                    '</div></div>' +

                    '<div class="Text_Title">' +
                    '<div style="float:left" class="Float_Title">发送对象</div>' +
                    '<div class="Float_text">' + a + '</div></div>' +

                    '<div class="Text_Title">' +
                    '<div style="float:left" class="Float_Title">发送方式</div>' +
                    '<div style="float:left" class="Float_text">图文消息推送</div></div>' +

                    '<div class="Text_Title">' +
                    '<div style="float:left" class="Float_Title">封面图片</div>' +
                    '<div class="Float_text"><img src=' + picture + ' width="400" height="300" alt="" /></div></div>' +

                    '<div class="Text_Title">' +
                    '<div class="Float_Title">发送内容</div>' +
                    '<div class="Float_text">' + data_text.content.copywriting + '</div></div>' +

                    '<div class="Text_Title">' +
                    '<div class="Float_Title1">图文消息<br />发送时间</div>' +
                    '<div class="Float_text1">' + pushtime_val + '</div></div>' +

                    '<div class="Text_Title">' +
                    '<div class="Float_Title">发送状态</div>' +
                    '<div class="Float_text"><span>' + state + '</span></div></div>' +
                    // '<div class="Text_Title">' +
                    // '<div class="Float_Title">发送时间</div>' +
                    // '<div class="Float_text">' + data_text.content.pushtime + '</div></div>' +
                    '<span class="button_two">' +
                    isInput +
                    '</span>'

            })
            var abc = $('.button_two .btn_center button');
            if (abc.length == 1) {
                $('.btn_center .btn').css('display', 'block');
                $('.btn_center .btn').css('margin-left', '45%');

            } else if (abc.length == 2) {
                $('.btn_center .btn').css('display', 'inline-block');
                $('.btn_center .btn:eq(0)').css('margin-left', '40%');
            } else if (abc.length == 4) {
                $('.btn_center .btn:eq(0)').css('margin-left', '26%');
                $('.btn_center .btn').css('display', 'inline-block');
                // $('.Float_Title1').css('margin-left','0px');
            } else if (abc.length == 3) {
                $('.btn_center .btn').css('display', 'inline-block');
                $('.btn_center .btn:eq(0)').css('margin-left', '31%');
                // $('.Float_Title1').css('margin-left','0px');
            }
        },
        error: function() {
            alert('出错了');
        }

    })
});

// 详情中的关闭
$(document).on("click", ".btn-close", function() {
    $('.layui-layer-close').click();
});
//详情中的提交审核
$(document).on('click', '.D_examine', function() {
    var guid = $(this).closest('.layui-layer-content').find('#guid_val').val();
    var state1 = $(this).closest('.layui-layer-content').find('#state_val').val();
    if (state1 == "草稿") {
        var realstate = "draft";
    };
    if (state1 == "审核中") {
        var realstate = "audit";
    }
    if (state1 == "审核成功") {
        var realstate = "auditsuccess";
    }
    if (state1 == "审核失败") {
        var realstate = "auditfail";
    }
    if (state1 == "保存") {
        var realstate = "store";
    }
    layer.msg('正在处理，请稍后', {
        time: 2000
    });
    // _ajax("post","webapi/ipaloma/propagation/{'"+guid_val+"'}/audit/",GetInformation(),'提交失败',function(){
    var currentstate = {
        currentstate: realstate,
        optype: "audit"
    }
    _ajax('post', '/webapi/ipaloma/propagation/' + guid + '/op', currentstate, '提交失败', function() {
        getList(1, 'exm', getSearch());
    });
});
// 详情中的立即发送
$(document).on('click', '.D_send', function() {
    var guid = $(this).closest('.layui-layer-content').find('#guid_val').val();
    var state1 = $(this).closest('.layui-layer-content').find('#state_val').val();
    if (state1 == "草稿") {
        var realstate = "draft";
    };
    if (state1 == "审核中") {
        var realstate = "audit";
    }
    if (state1 == "审核成功") {
        var realstate = "auditsuccess";
    }
    if (state1 == "审核失败") {
        var realstate = "auditfail";
    }
    if (state1 == "保存") {
        var realstate = "store";
    }
    if (state1 == "待发送") {
        var realstate = "toberelease";
    }
    console.log(state1);
    layer.msg('正在发送', {
        time: 2000
    });

    // _ajax("post","webapi/ipaloma/propagation/{'"+guid_val+"'}/audit/",GetInformation(),'提交失败',function(){
    var currentstate = {
        currentstate: realstate,
        optype: "release"
    }
    _ajax('post', '/webapi/ipaloma/propagation/' + guid + '/op', currentstate, '发送失败', function() {
        getList(1, 'release', getSearch());
    });
});
// 详情中的修改
$(document).on('click', '.btn_modify', function() {
        $('.layui-layer-close').click();
        var i = $(this).closest('.layui-layer-content').find('#trIndex').val();
        // console.log(typeof parseInt(i) + '1303行')
        var index_val = parseInt(i);
        $('tr:eq(' + index_val + ') td:eq(7) .modify').click()
    })
    // 详情中的驳回
$(document).on('click', '.btn_Reject', function() {
        $('.layui-layer-close').click();
        var i = $(this).closest('.layui-layer-content').find('#trIndex').val();
        // console.log(typeof parseInt(i) + '1161行')
        var index_val = parseInt(i);
        $('tr:eq(' + index_val + ') td:eq(7) .Reject').click()
    })
    // 详情中的审核通过
$(document).on('click', '.btn_adopt', function() {
    $('.layui-layer-close').click();
    var i = $(this).closest('.layui-layer-content').find('#trIndex').val();
    // console.log(typeof parseInt(i) + '1161行')
    var index_val = parseInt(i);
    $('tr:eq(' + index_val + ') td:eq(7) .adopt').click()
});



// 封装
var _ajax = function(type, url, data, tip, success) {
    $.ajax({
        type: type,
        url: url,
        dataType: "json",
        data: data,

        beforeSend: function() {
            // $('.pager-wrap').fadeOut(1000);
        },
        complete: function() {},
        timeout: function() {},

        success: function(json) {
            success(json);
        },
        error: function() {
            console.warn(tip + " error");
        }
    });
}