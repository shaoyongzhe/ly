
//切换
$("nav span").click(function () {
    var cur = $(this).index();
    $(this).addClass("on").siblings().removeClass('on');
    $('.sec').eq(cur).show().siblings('.sec').hide();
});
// 点击遮罩关闭
$('body').on('click', '.layui-layer-shade', function () {
    $('.layui-layer-close').click();
});
// 点击按钮组图标
$('table.notify,table.modulePeople').on('click', '.Hui-iconfont', function (e) {
    e.stopPropagation();
    // $(this).toggleClass('on').parents('tr').siblings().find('.Hui-iconfont').removeClass('on');
    $(this).toggleClass('on');
    $(".Hui-iconfont").not(this).removeClass('on');
});
$(document).click(function () {
    $('.Hui-iconfont').removeClass('on');
});
$(function () {
    $("nav span").first().click();
    getList();
    getModulePeopleList();
    getOptionsValue();
});

function getList(curr, handle, searchForm) {
    if (curr == undefined || curr == "") {
        curr = 1;
    }
    var df = {};
    if (handle == 'search') {
        df = searchForm;
    }
    var pagesize = 25;
    var url = '/webapi/operation/notification/templates?pageindex=' + curr + '&pagesize=' + pagesize;
    _ajax("get", url, df, '刷新列表', function (data) {
        //if (data.error) {
        //    layer.msg('查询出错，出错原因：' + data.error);
        //    return;
        //}
        $(".totalcount").text(data.totalcount);
        $("table.notify tbody").empty();

        var isSet = "<span class='btn setDefault'>设为默认</span><span class='btn del' title='删除'>删除</span>",
		autoW = "210",//75
        tr = "",
		td = data.content;
        for (var i = 0; i < td.length; i++) {
            var isHtml;
            var contentFormat = td[i].content;
            //try {
            //    var obj = JSON.parse(td[i].content);
            //    contentFormat = JSON.stringify(obj, null, 4);
            //} catch (e) {
            //    contentFormat = td[i].content;
            //}
            tr += "<tr class='text-c'><td><input type='hidden' class='guid' value=" + td[i].guid + "><span>" + td[i].category
			+ "</span></td><td>" + td[i].subcategory
            + "</td><td>" + td[i].channel
            + "</td><td>" + td[i].groupname
            + "</td><td>" + td[i].area
            + "</td><td>" + td[i].description
            + "</td><td class='templateid'>" + td[i].gateway_templateid
			+ "</td><td title='" + contentFormat + "'><span class='content'>" + contentFormat
			+ "</span></td><td>" + (td[i].state == "Normal" ? "正常状态" : "新增待编辑")
			+ "</td><td class='state'>" + (td[i].isdefault == "1" ? "默认" : "")
			+ " </td><td style='overflow: visible;'><div class='handle'><div class='Hui-iconfont'>&#xe61d;</div><div class='handle-btns-wrap' style='width:" + autoW + "px'><div class='handle-btns'>" + isSet + "<span class='btn modify'>修改</span></div></div></div></td></tr>";
        }

        $("table.notify tbody").append(tr);
        // $(tr).appendTo($("table.notify tbody")).show(600);

        /*$(tr).appendTo($("table.notify tbody"));
		// alert($(tr).length);
		var len = $(tr).length;
		var index = 0;
		var interval = setInterval(next, 100);

		function next() {
			$('.notify tbody tr').eq(index).show(300);
			index++;
			if(index > len){
				clearInterval(interval);
				console.log(interval);
				// return;
				$('.pager-wrap').fadeIn(1000);
			}
		}*/

        $('td span.content').each(function () {
            $(this).text($(this).html())
        });

        // 显示分页
        laypage({
            cont: 'pager',
            pages: data.pagecount,
            curr: curr || 1,
            skip: true,
            jump: function (obj, first) {

                if (!first) {

                    layer.msg('第' + obj.curr + '页加载中...');
                    if (handle == 'search') {
                        getList(obj.curr, 'search', getSearchForm());
                        return;
                    }
                    /*// alert($(tr).length);
					var len = $('.notify tbody tr').length + 1;
					var index = len;
					var interval = setInterval(prev, 100);
					layer.msg('正在查询...');
					function prev() {
						$('.notify tbody tr').eq(index).hide(600);
						index--;
					}*/
                    getList(obj.curr, 'page');
                    /*if(handle=='open'){
						layer.msg('正在查询...',{time:0});
						getList(obj.curr, 'search');
					}*/
                }
            }
        });

        if (handle) {
            $('.layui-layer-close').click();
            if (handle == 'add') {
                layer.msg("新增成功");
                return;
            }
            if (handle == 'del') {
                layer.msg("删除成功");
                return;
            }
            /*if(handle=='edit'){
				layer.msg("修改成功");
			}*/
            /*if(handle=='search'){
				layer.msg("查询成功");
			}*/
            if (handle == 'setDefault') {
                layer.msg("设置默认模板成功");
            }
            /*if(handle=='open'){
				layer.msg("已开启为当前使用模板");
			}*/
            if (handle == 'page') {
                layer.msg("加载成功");
                return;
            }
            layer.msg("操作成功");
        }
    });
};

function getModulePeopleList(curr, handle, searchForm) {
    var url = '/webapi/operation/' + "notification" + '/managers';
    _ajax("get", url, {}, '刷新列表', function (data) {
        //if (data.error) {
        //    layer.msg('查询出错，出错原因：' + data.error);
        //    return;
        //}
        $("table.modulePeople tbody").empty();
        var isSet = "";
        var autoW = "75";//75
        var contentFormat = JSON.stringify(data, null, 4);
        var tr = "<tr class='text-c'><td><input type='hidden' class='guid' value'notification'>" + "通知"
             + "</td><td>" + contentFormat
             + " </td><td style='overflow: visible;'><div class='handle'><div class='Hui-iconfont'>&#xe61d;</div><div class='handle-btns-wrap' style='width:" + autoW + "px'><div class='handle-btns'>" + isSet + "<span class='btn modify'>修改</span></div></div></div></td></tr>";

        $("table.modulePeople tbody").append(tr);
        //$('td span.content').each(function () {
        //    $(this).text($(this).html())
        //});
        if (handle) {
            $('.layui-layer-close').click();
            if (handle == 'update') {
                layer.msg("更新成功");
                return;
            }
            layer.msg("操作成功");
        }
    });
};
// 查询
$(".search-btn").click(function () {
    layer.msg('正在查询...', { time: 20 });
    getList(1, 'search', getSearchForm());
});
//重置
$(".reset-btn").click(function () {
    $('.search-area .gateway_templateid').val("");
    $('.search-area .first-type option:first').prop("selected", 'selected');
    $('.search-area .second-type option:first').prop("selected", 'selected');
    $('.search-area .third-type option:first').prop("selected", 'selected');
    $('.search-area .fourth-type option:first').prop("selected", 'selected');
    $('.search-area .fifth-type option:first').prop("selected", 'selected');
    $('.search-area .area').val("");
    $(".inra").attr("checked", false)
    getList();
    layer.msg('重置完成...');
});
// 获取查询数据
function getSearchForm() {
    var searchForm = {
        gateway_templateid: $('.search-area .gateway_templateid').val(),
        category: $('.search-area .first-type :selected').val(),
        subcategory: $('.search-area .second-type :selected').val(),
        channel: $('.search-area .third-type :selected').val(),
        groupname: $('.search-area .fourth-type :selected').val(),
        state: $('.search-area .fifth-type :selected').val(),
        isdefault: $(".inra").is(":checked") == true ? 1 : 0,
        area: $('.search-area .area').val()
    }
    return searchForm;
}
function getOptionsValue() {
    _ajax("get", '/webapi/operation/notification/dict/category', null, "获取使用场景", function (data) {
        for (var key in data) {
            $('.first-type, .firsttype').append("<option data-key=" + data[key] + ">" + data[key] + "</option>");
        }
    });
    //搜索区域场景改变
    $('.first-type, .firsttype').change(function () {
        var firstType = $(this).find('option:selected').attr('data-key');
        $('.second-type').children(":not('option:first')").remove();
        $('.secondtype').children(":not('option:first')").remove();
        $('.third-type').children(":not('option:first')").remove();
        $('.fourth-type').children(":not('option:first')").remove();
        if (firstType != "") {
            $('.addForm .firsttype').find("option[data-key='" + firstType + "']").attr("selected", true);
            var jsonData = {
                "category": firstType
            };
            _ajax("get", '/webapi/operation/notification/dict/subcategory', jsonData, "获取场景对应事件", function (data) {
                for (var key in data) {
                    $('.second-type, .secondtype').append("<option data-key=" + data[key] + ">" + data[key] + "</option>");
                }
            });
        }
    });
    //搜索区域事件改变
    $('.second-type').change(function () {
        var firstType = $('.search-area .first-type').find("option:selected").text();
        var secondType = $(this).find('option:selected').attr('data-key');
        $('.third-type').children(":not('option:first')").remove();
        $('.fourth-type').children(":not('option:first')").remove();
        if (secondType != "") {
            $('.addForm .secondtype').find("option[data-key='" + secondType + "']").attr("selected", true);
            $('.secondtype').change();
            var jsonData = {
                "category": firstType,
                "subcategory": secondType
            };
            _ajax("get", '/webapi/operation/notification/dict/channel', jsonData, "获取场景事件下的发送途径", function (data) {
                for (var key in data) {
                    $('.third-type').append("<option data-key=" + data[key] + ">" + data[key] + "</option>");
                }
            });
        }
    });
    //新增区域
    $('.secondtype').change(function () {
        var firstType = "";//$('.addForm .firsttype').find("option:selected").text();
        var secondType = ""; //$(this).find('option:selected').attr('data-key');
        $('.fourthtype').children(":not('option:first')").remove();
        if (secondType != "") {
            var jsonData = {
                "category": firstType,
                "subcategory": secondType
            };
            _ajax("get", '/webapi/operation/notification/dict/groupname', jsonData, "获取场景事件下的发送分组", function (data) {
                for (var key in data) {
                    $('.fourthtype').append("<option data-key=" + data[key] + ">" + data[key] + "</option>");
                }
            });
        }
    });
    //途径改变
    $('.third-type').change(function () {
        var firstType = $('.search-area .first-type').find("option:selected").text();
        var secondType = $('.search-area .second-type').find("option:selected").text();
        var thirdType = $(this).find('option:selected').attr('data-key');
        $('.fourth-type').children(":not('option:first')").remove();
        if (thirdType != "") {
            var jsonData = {
                "category": firstType,
                "subcategory": secondType,
                "channel": thirdType
            };
            console.log(jsonData);
            _ajax("get", '/webapi/operation/notification/dict/groupname', jsonData, "获取场景事件发送途径下的组名", function (data) {
                for (var key in data) {
                    $('.fourth-type, .fourthtype').append("<option data-key=" + data[key] + ">" + data[key] + "</option>");
                }
            });
        }
    });
    //设置所有组
    _ajax("get", '/webapi/operation/notification/dict/groupname', null, "获取所有组名", function (data) {
        for (var key in data) {
            $('.group_type').append("<option data-key=" + data[key] + ">" + data[key] + "</option>");
        }
        _ajax("get", '/webapi/operation/notification/template/currentgroup', null, "获取默认分组", function (data) {
            if (data != "")
                $('.group_type').find("option[data-key='" + data + "']").attr('selected', true);
        });
    });
}

function getguid() {

    _ajax("GET", '/webapi/notify/template/getguid', null, "getguid", function (guid) {
        $(".addForm .templateid").val(guid);
    });

}
// 新增
$(".add").click(function () {
    $('.addForm').show();
    //获取所有发送途径
    _ajax("get", '/webapi/operation/notification/dict/allchannel', null, "发送途径", function (data) {
        $('.addForm .template_sendway').children().remove();

        for (var key in data) {
            //$('.addForm .template_sendway').append("<li>sms</li>");  //"<li data-key=" + data[key] + ">" + data[key] + "</li>"
            $('.addForm .template_sendway').append("<li class='option'>" + data[key] + "</li>");
        }
    });
    _ajax("get", '/webapi/operation/notification/dict/category?parameters={"category":""}', null, "发送途径", function (data) {
        $('.addForm .template_category').children().remove();
        for (var key in data) {
            //$('.addForm .template_sendway').append("<li>sms</li>");  //"<li data-key=" + data[key] + ">" + data[key] + "</li>"
            $('.addForm .template_category').append("<li class='option'>" + data[key] + "</li>");
        }
    });
    layer.open({
        type: 1,
        // shift: 4,
        moveType: 2,
        title: "新增通知模板",
        area: [500],
        content: $('.addForm'),
    });
});


// 新增提交
$('.add-btn').click(function () {




    var addForm = {
        gateway_templateid: $('.addForm .gateway_templateid').val(),//外部模板编号
        category: $('.addForm .category_input').val(),//场景
        subcategory: $('.addForm .event_input').val(),
        channel: $('.addForm .sendway_input').val().trim(),
        groupname: $('.addForm .group_input').val(),
        content: $('.addForm .content').val(),
        description: $('.addForm .description').val(),
        area: getDistrict($('#province span em').text(), $('#city span em').text(), $('#area span em').text()),
        isdefault: parseInt($('.addForm .isDefault').val())
    }
    if (addForm.category == "-- 请选择 --") {
        layer.msg('请选择或输入场景');
        return;
    }
    if (addForm.subcategory == "-- 请选择 --") {
        layer.msg('请选择或输入事件');
        return;
    }
    if (addForm.channel == "-- 请选择 --") {
        layer.msg('请选择发送途径');
        return;
    }
    if (addForm.groupname == "-- 请选择 --") {
        layer.msg('请选择或输入组名');
        return;
    }
    if (addForm.content == "") {
        layer.msg('请输入正文内容');
        return;
    }
    try {
        var obj = JSON.parse(addForm.content);
        var html = "";
        for (var key in obj) {
            html = obj[key];
            html = html.replace(/[<]/g, "&lt;");
            html = html.replace(/[>]/g, "&gt;");
            // html = html.replace(/[']/g,"");
            html = html.replace(/[ ]/g, "&nbsp;");
            obj[key] = html;
        }
        var str = $.trim(JSON.stringify(obj));
        addForm['content'] = str;
    } catch (e) {
        layer.msg('内容区域请输入JSON格式的数据！');
    }
    $('.layui-layer-close').click();
    layer.msg('正在新增...', { time: 0 });
    console.log(addForm);
    _ajax("POST", "/webapi/operation/notification/template", addForm, '新增', function () {
        getList(1, 'add');
    });
});

function getDistrict(province, city, county) {
    if (province == "省份") return ",,";
    if (city == "城市") return ",," + province;
    if (county == "区县") return "," + city + "," + province;
    return province + "," + city + "," + county;
}
//设置默认分组
$(".setDefaultGroup").click(function () {
    var groupNameText = $('.group_type :selected').text()
    if (groupNameText == "-- 请选择 --") {
        layer.msg("请先选择默认分组...");
        return;
    }
    layer.msg('设置默认分组中...', { time: 0 });
    _ajax("put", '/webapi/operation/notification/template/currentgroup', {
        "groupname": groupNameText
    }, "设置默认分组", function (data) {
        layer.msg('默认分组设置完成...');
    });
});

$('table.notify')
                 .on('click', 'span.del', function () {
                     var thisTr = $(this).parents("tr");
                     var guid = thisTr.find('.guid').val();
                     layer.confirm('确定要删除吗？', {
                         btn: ['确定', '取消']
                     }, function () {
                         layer.msg('正在删除...', { time: 0 });
                         _ajax("DELETE", "/webapi/operation/notification/template/" + guid, null, '删除', function () {
                             var cur = $('.laypage_curr').text();
                             if (cur) {
                                 if ($('table.notify tbody tr').length == 1) {
                                     cur -= 1;
                                     if (cur <= 0) {
                                         cur = 1;
                                     }
                                 }
                             }
                             getList(cur, 'del');
                         });
                     });
                 })// 单行删除
                 .on('click', 'span.setDefault', function () {
                     var thisTr = $(this).parents("tr");
                     var guid = thisTr.find('.guid').val();
                     layer.confirm('确定要设置为默认模板吗？', {
                         btn: ['确定', '取消']
                     }, function () {
                         layer.msg('设置中...', { time: 0 });
                         _ajax("put", "/webapi/operation/notification/template/" + guid + "/defaultflag", null, '设置默认模板', function () {
                             var cur = $('.laypage_curr').text();
                             getList(cur, 'setDefault');
                         });
                     });
                 })//设为默认
                 .on('click', '.modify', function () {
                     var tr = $(this).parents('tr');
                     var trIndex = $(this).parents('tr').index();
                     $('#trIndex').val(trIndex);
                     var data = {
                         guid: tr.find('td:eq(0) .guid').val(),
                         category: tr.find('td:eq(0)').text(),
                         subcategory: tr.find('td:eq(1)').text(),
                         channel: tr.find('td:eq(2)').text(),
                         groupname: tr.find('td:eq(3)').text(),
                         area: tr.find('td:eq(4)').text(),
                         gateway_templateid: tr.find('td:eq(5)').text(),
                         content: JSON.parse(tr.find('td:eq(6)').text()),
                         state: tr.find('td:eq(7)').text(),
                         isdefault: tr.find('td:eq(8)').text().trim() == "默认" ? 1 : 0
                     };
                     //try {
                     //    var contentObj = JSON.parse(data.content);
                     //    data.content = contentObj;
                     //} catch (e) {
                     //    console.log(e);
                     //    //alert("测试使用" + data.content);
                     //}
                     //var jsonStr = JSON.stringify(data, null, 4);

                     var jsonStr = JSON.stringify(data, null, 4);
                     $('#add').val(jsonStr);
                     $('#opType').val("notify");
                     //防止被修改
                     $('#isDefault').val(tr.find('td:eq(8)').text().trim() == "默认" ? 1 : 0);
                     var index = layer.open({
                         type: 2,
                         title: '修改(以左边为准)',
                         area: ['90%', "80%"],
                         maxmin: true,
                         content: 'json/index.html',
                     });
                 });// 单行修改	弹出插件本身
$('table.modulePeople')
                 .on('click', '.modify', function () {
                     var tr = $(this).parents('tr');
                     var data = tr.find('td:eq(1)').text();
                     //var jsonStr = JSON.stringify(data, null, 4);
                     $('#add').val(data);
                     $('#opType').val("modulePeople");
                     var index = layer.open({
                         type: 2,
                         title: '修改(以左边为准)',
                         area: ['90%', "80%"],
                         maxmin: true,
                         content: 'json/index.html',
                     });
                 });// 单行修改	弹出插件本身

// 批量删除
/*$('.batchDel').click(function(){

    if($('tbody :checked').length == 0){
        layer.msg('请先选择要删除的通知！');
        return;
    }

    layer.confirm('确认要删除本页所有未启用的通知吗？',function(index){
        // $("tbody :checked").parents('tr').find('td.posted').parents('tr').find(':checked').prop('checked',false);
        $("tbody :checked").parents('tr').find('td:contains(已启用)').parents('tr').find(':checked').prop('checked',false);
        $("tbody :checked").not('thead :checked').parents('tr').hide();
        // $(_this).parents("tr").remove();
        layer.msg('已删除本页所有未启用的通知');
    });

});*/

$("#refresh").click(function () {
    getList();
});

// 设置为当前使用模板
$('table').on('click', '.open', function () {
    layer.msg('开启中...', { time: 0 });
    var thisTr = $(this).parents('tr');
    var guid = thisTr.find('.guid').val();
    var state = thisTr.find('.state');
    // state.text("已启用");return
    _ajax('PUT', '/webapi/notify/template/' + guid, null, "设置为当前使用模板", function (data) {
        if (data.error == "") {
            /*state.text("已启用");
            state.parents("tr").find('.handle-btns-wrap').innerWidth(75).html("<div class='handle-btns'><span class='arrow-right'></span><span class='btn modify'>修改</span></div>");
            var tmpId = thisTr.find('.templateid').text();
            // $('.text-c.m').find('td:contains('+ a +')').parents('tr').find('.state');
            state.parents("tr").find('td:contains('+ tmpId +')').parents('tr').find('.state').text('未启用');
            state.parents("tr").siblings().find('.handle-btns-wrap').innerWidth(183).empty().html("<div class='handle-btns'><span class='btn open'>启用</span><span class='btn del' title='删除''>删除</span><span class='arrow-right'></span><span class='btn modify'>修改</span></div>");
            layer.msg('已开启为当前使用模板');*/
            var cur = $('.laypage_curr').text();
            /*if(cur){

                if($('table.notify tbody tr').length == 1){
                    cur -= 1;
                    if(cur <= 0){
                        cur = 1;
                    }
                }
            } else {
                layer.msg("已开启为当前使用模板");
                return;
            }*/
            // getList(cur, 'search', getSearchForm());
            getList(cur);
        }
    });
});

var _ajax = function (type, url, data, tip, success) {
    $.ajax({
        type: type,
        url: url,
        dataType: "json",
        data: data,
        beforeSend: function () {
            //$('.pager-wrap').fadeOut(1000);
        },
        complete: function () { },
        timeout: function () { },
        success: function (json) {
            if (json["error"] != undefined && json.error) {
                layer.msg("【" + tip + '】出错，出错原因：' + json.error);
                return;
            }
            success(json);
        },
        error: function (ex) {
            console.warn(tip + " error,errMsg is " + ex);
        }
    });
}


$('body').on("click", ".select-wrap", function (e) {
    // $('.select-wrap').click(function(e){
    // debugger;
    e.stopPropagation();
    $(this).find('.select').toggle();
    $(".select-wrap").not(this).find('.select').hide();
});

var staticcategory = "";
$('.select').on('click', '.option', function (e) {
    e.stopPropagation();
    $(this).parent().hide().prev().val($(this).text());
    if ($(this).parent().hasClass('template_category')) {
        var category = $(this).parent().prev().val();
        staticcategory = category;
        var jsonData = {
            "category": category
        };
        _ajax("get", '/webapi/operation/notification/dict/subcategory', jsonData, "发送途径", function (data) {
            $('.addForm .template_event').children().remove();
            for (var key in data) {
                //$('.addForm .template_sendway').append("<li>sms</li>");  //"<li data-key=" + data[key] + ">" + data[key] + "</li>"
                $('.addForm .template_event').append("<li class='option'>" + data[key] + "</li>");
            }
        });
    } else if ($(this).parent().hasClass('template_event')) {
        var subcategory = $(this).parent().prev().val();
        var jsonData = {
            "category": staticcategory,
            "subcategory": subcategory
        }
        _ajax("get", '/webapi/operation/notification/dict/groupname', jsonData, "发送途径", function (data) {
            $('.addForm .template_group').children().remove();
            for (var key in data) {
                //$('.addForm .template_sendway').append("<li>sms</li>");  //"<li data-key=" + data[key] + ">" + data[key] + "</li>"
                $('.addForm .template_group').append("<li class='option'>" + data[key] + "</li>");
            }
        });
    }
});

$(document).click(function () {
    $('.select').hide();
});