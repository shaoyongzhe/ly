/*
 * @Author: Administrator
 * @Date:   2016-11-19 19:58:44
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-12-16 00:25:37
 * 注:如有不明白的逻辑找齐枭飞
 */

// 'use strict';



// <!-- textarea输入框统计字数 -->
$(function() {
    //先选出 textarea 和 统计字数 dom 节点
    var wordCount = $("#wordCount"),
        textArea = wordCount.find("textarea"),
        word = wordCount.find(".word");
    $('textarea').on('input', function() {
        $(this).next().find('var').text($(this).val().length);
    });
    //点击关闭
    $('.close').click(function() {
        layer.msg("正在关闭···");
        window.history.back();
        layer.msg("已关闭");
    })
$('.mode1').find('div:eq(0) img').addClass('xiyin_son');
    //保存---本地保存


    //点击预览
    $('.preview').click(function() {
        if ($('.send_object dir').find('div:eq(0) img').hasClass('xiyin_son') == true) {
            var a = $('.send_object dir').find('a:eq(0)').text();
        }
        if ($('.send_object dir').find('div:eq(1) img').hasClass('xiyin_son') == true) {
            var b = $('.send_object dir').find('a:eq(1)').text();
        }
        if ($('.send_object dir').find('div:eq(2) img').hasClass('xiyin_son') == true) {
            var c = $('.send_object dir').find('a:eq(2)').text();
        }
        if ($('.mode1').find('div:eq(0) img').hasClass('xiyin_son') == true) {
            var d = $('.mode1').find('a').text();
        };
        var pic1_url = $('#preview img').attr('src');
        var form_value = {
            textarea_value: $('#textarea_value').val(),
            objective: $('.input-text').find('option:selected').text(),
            area: $('area').val(),
            send_object: a + b + c,
            mode1: d,
            post_url: pic_url,
            send_text: $('#send_text').val(),
            together: $('input[name="Fruit"]:checked').val(),
            pushtime: $('#serverBeginTime').val()

        }

        if (form_value.textarea_value == "") {
            layer.msg('请输入文案标题');
            return;
        }

         if ($('.region-item').length==0) {
            layer.msg('请选择地区');
            return;
        }

        if (form_value.push_distributor == 0 && form_value.push_consumer== 0 && form_value.push_retailer== 0) {
            layer.msg('请选择发送对象');
            return;
        }

        if (form_value.mode1 == undefined) {
            layer.msg('请选择发送方式');
            return;
        }

        if (form_value.post_url == "") {
            layer.msg('请选择封面图片');
            return;
        }

        if (form_value.send_text == "") {
            layer.msg('请填写发送内容');
            return;
        }

        if (form_value.together == "") {
            layer.msg('请选择图文消息发送时间');
            return;
        }
        if (form_value.pushtime == "") {
            layer.msg('请选择时间');
            return;
        }
        var index = layer.open({
            type: 1,
            title: '预览',
            area: ['57.3%', "100%"],
            // maxmin: true,
            content: '<div class="Text_Title">' +
                '<div class="Float_Title">文案标题</div>' +
                '<div class="Float_text">' + form_value.textarea_value + '</div></div>' +
                '<div class="Text_Title">' +

                // '<div class="Float_Title">发送目的</div>'+
                // '<div class="Float_text">'+form_value.objective+'</div></div>'+
                '<div class="Text_Title">' +

                '<div class="Float_Title">发送地区</div>' +
                '<div class="Float_text">' +
                '<div class="province">某某省</div><div class="Person">负责人xxx</div><br>' +
                '<div class="city">北京市</div><div class="county">xxx县</div><div class="county">xxx县</div><div class="county">xxx县</div><div class="county">xxx县</div><div class="county">xxx县</div><br>' +
                '<div class="province">某某省</div><div class="Person">负责人xxx</div><br>' +
                '<div class="city">北京市</div><div class="county">xxx县</div><div class="county">xxx县</div><div class="county">xxx县</div><div class="county">xxx县</div><div class="county">xxx县</div><div class="county">xxx县</div>' +
                '</div></div>' +
                '<div class="Text_Title">' +
                '<div class="Float_Title">发送对象</div>' +
                '<div class="Float_text">' + form_value.send_object + '</div></div>' +
                '<div class="Text_Title">' +
                '<div class="Float_Title">发送方式</div>' +
                '<div class="Float_text">图文消息推送</div></div>' +
                '<div class="Text_Title">' +
                '<div class="Float_Title">封面图片</div>' +
                '<div class="Float_text srcPic"><img src="Images/QQ截图20161118203155.png" width="400" height="300" alt="" /></div></div>' +
                '<div class="Text_Title">' +
                '<div class="Float_Title">发送内容</div>' +
                '<div class="Float_text">' + form_value.send_text + '</div></div>' +
                '<div class="Text_Title">' +
                '<div class="Float_Title">图文消息</div>' +
                '<div class="Float_text">2016 19:28:31</div></div>' +
                '<div class="Text_Title">' +
                '<div class="Float_Title">发送时间</div>' +
                '<div class="Float_text">null</div></div>' +
                '<div class="button">' +
                '</div>'
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


    // 新增Preservation 提交审核
    $('.examine').click(function() {
        // var audit = $('.examine').find('input').val();
        if ($('.send_object dir').find('div:eq(0) img').hasClass('xiyin_son') == true) {
            var a = 1;
        } else {
            var a = 0;
        };
        if ($('.send_object dir').find('div:eq(1) img').hasClass('xiyin_son') == true) {
            var b = 1;
        } else {
            var b = 0;
        };
        if ($('.send_object dir').find('div:eq(2) img').hasClass('xiyin_son') == true) {
            var c = 1;
        } else {
            var c = 0;
        };
        if ($('.mode1').find('div:eq(0) img').hasClass('xiyin_son') == true) {
            var d = 1;
        } else {
            var d = 0;
        };
        if ($('input[name="Fruit"]:checked').val()) {
            var e = 1;
        } else {
            var e = 0;
        };
        var area_text = JSON.stringify(JSON.parse($('.area_val').text()).area);
        var pic1_url = $('#preview img').attr('src');
        var form_value = {
            state: $('.content_information .state').val(),
            optype: "draft",
            service: $('#textarea_value').val(),
            belong_group: $('.input-text').find('option:selected').text(),
            area:area_text,
            push_distributor: a,
            push_consumer: b,
            push_retailer: c,
            category: d,
            poster_url: pic_url,
            copywriting: $('.mode textarea').val(),
            bindwithperiodpush: e,
            pushtime: $('#serverBeginTime').val()
                // audit:audit
        };
        // console.log(typeof(form_value.area[0]));
        //form_value.area = JSON.stringify(form_value.area);
        if (form_value.service == "") {
            layer.msg('请输入文案标题');
            return;
        }

        if ($('.region-item').length==0) {
            layer.msg('请选择地区');
            return;
        }

        if (form_value.push_distributor == 0 && form_value.push_consumer== 0 && form_value.push_retailer== 0) {
        	layer.msg('请选择发送对象');
        	return;
        }

        if (form_value.category == "") {
            layer.msg('请选择发送方式');
            return;
        }

        if (form_value.poster_url == '') {
            layer.msg('请选择封面图片');
            return;
        }

        if (form_value.copywriting == "") {
            layer.msg('请填写发送内容');
            return;
        }

        if (form_value.bindwithperiodpush == "") {
            layer.msg('请选择图文消息发送时间');
            return;
        }
        if (form_value.pushtime_supplier == "") {
            layer.msg('请选择发送方式');
            return;
        }
        if (form_value.pushtime == "") {
            layer.msg('请选择时间');
            return;
        }
        $('.layui-layer-close').click();
        layer.msg('正在新增...', { time: 2000 });
        // var value = JSON.stringify(form_value);
        // window.localStorage.setItem ("text_val",value);
        // var data = window.localStorage.getItem("text_val");
        // var a  = JSON.stringify(text);
        // console.log(data);
        _ajax("POST", "http://127.0.0.1:40007/webapi/ipaloma/propagation", form_value, '新增错误', function(data) {
            window.history.back();
        });
    })


    // 保存并继续新增
    $(".Newly_added").click(function() {
        // var audit = $('.examine').find('input').val();
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
        if ($('input[name="Fruit"]:checked').val()) {
            var e = 1;
        } else {
            var e = 0;
        }
        var pic1_url = $('#preview img').attr('src');
        var form_value = {
            state: $('.content_information .state').val(),
            optype: "draft",
            service: $('#textarea_value').val(),
            belong_group: $('.input-text').find('option:selected').text(),

            area: JSON.stringify(JSON.parse($('.area_val').text()).area),
            // area = JSON.stringify(area); 
            push_distributor: a,
            push_consumer: b,
            push_retailer: c,
            category: d,
            poster_url: pic_url,
            copywriting: $('.mode textarea').val(),
            bindwithperiodpush: e,
            pushtime: $('#serverBeginTime').val()
                // audit:audit
        }
        // console.log(typeof(form_value.area[0]));
        // form_value.area = JSON.stringify(form_value.area);
        if (form_value.service == "") {
            layer.msg('请输入文案标题');
            return;
        }

         if ($('.region-item').length==0) {
            layer.msg('请选择地区');
            return;
        }
        if (form_value.push_distributor == 0 && form_value.push_consumer== 0 && form_value.push_retailer== 0) {
            layer.msg('请选择发送对象');
            return;
        }

        if (form_value.category == "") {
            layer.msg('请选择发送方式');
            return;
        }

        if (form_value.poster_url == '') {
            layer.msg('请选择封面图片' + "undefined");
            return;
        }

        if (form_value.copywriting == "") {
            layer.msg('请填写发送内容');
            return;
        }

        if (form_value.bindwithperiodpush == "") {
            layer.msg('请选择图文消息发送时间');
            return;
        }
        if (form_value.pushtime_supplier == "") {
            layer.msg('请选择发送方式');
            return;
        }
         if (form_value.pushtime == "") {
            layer.msg('请选择时间');
            return;
        }
        $('.layui-layer-close').click();

        layer.msg('正在保存...', { time: 2000 });

        _ajax("POST", "http://127.0.0.1:40007/webapi/ipaloma/propagation", form_value, '保存错误', function(data) {
            layer.msg('保存成功，请继续填写',{time:1500});
            window.location.reload();
        });
});

// 保存
 $(".Preservation").click(function() {
        // var audit = $('.examine').find('input').val();
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
        if ($('input[name="Fruit"]:checked').val()) {
            var e = 1;
        } else {
            var e = 0;
        }
        var pic1_url = $('#preview img').attr('src');
        var form_value = {
            state: $('.content_information .state').val(),
            optype: "draft",
            service: $('#textarea_value').val(),
            belong_group: $('.input-text').find('option:selected').text(),

            area:JSON.stringify(JSON.parse($('.area_val').text()).area),
            // area = JSON.stringify(area); 
            push_distributor: a,
            push_consumer: b,
            push_retailer: c,
            category: d,
            poster_url: pic_url,
            copywriting: $('.mode textarea').val(),
            bindwithperiodpush: e,
            pushtime: $('#serverBeginTime').val()
                // audit:audit
        }
        // console.log(typeof(form_value.area[0]));
        // form_value.area = JSON.stringify(form_value.area);
        if (form_value.service == "") {
            layer.msg('请输入文案标题');
            return;
        }

         if ($('.region-item').length==0) {
            layer.msg('请选择地区');
            return;
        }

       if (form_value.push_distributor == 0 && form_value.push_consumer== 0 && form_value.push_retailer== 0) {
            layer.msg('请选择发送对象');
            return;
        }

        if (form_value.category == "") {
            layer.msg('请选择发送方式');
            return;
        }

        if (form_value.poster_url == '') {
            layer.msg('请选择封面图片');
            return;
        }

        if (form_value.copywriting == "") {
            layer.msg('请填写发送内容');
            return;
        }

        if (form_value.bindwithperiodpush == "") {
            layer.msg('请选择图文消息发送时间');
            return;
        }
        if (form_value.pushtime_supplier == "") {
            layer.msg('请选择发送方式');
            return;
        }
         if (form_value.pushtime == "") {
            layer.msg('请选择时间');
            return;
        }
        $('.layui-layer-close').click();

        layer.msg('正在新增...', { time: 2000 });

        _ajax("POST", "http://127.0.0.1:40007/webapi/ipaloma/propagation", form_value, '保存错误', function(data) {
            layer.msg('保存成功');
            $(".Preservation").unbind("click");
        });
});


    var _ajax = function(type, url, data, tip, success) {
        // console.log(JSON.stringify(data, null, 4));
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
});

var pic_url = "";
//图片上传预览   
function previewImage(file) {
    var form = new FormData($('form')[0]);
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:40007/webapi/ipaloma/propagation/upload/imgupload",
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
            console.log(pic_url)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("上传失败，请检查网络后重试");
        }
    });
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
            img.style.marginTop = rect.top + 'px';
        }
        var reader = new FileReader();
        reader.onload = function(evt) { img.src = evt.target.result; }
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
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
    }
}

function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = { top: 0, left: 0, width: width, height: height };
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