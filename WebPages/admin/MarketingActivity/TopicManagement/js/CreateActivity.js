var addSub3Arr=[];
var addSub4Arr=[];
var addSub5Arr=[];
var yaoyiyaoArr1=[];
var yaoyiyaoArr2=[];
var addsub2HTML="";
var addsub3HTML="";
var addsub4HTML="";
var addsub5HTML="";


$(function(){

	/*$('.scroll').slimscroll({
		height: '670',
		// width: '530'
	});*/

	/*$(".pic-area").slide({ 
		mainCell: ".pic-list",
		effect: "leftLoop",
		vis: 6,
		// autoPlay: true
	});*/

});


document.onkeypress = showKeyPress;
function showKeyPress(evt) { 
    evt = (evt) ? evt : window.event 
    // document.title = evt.keyCode;
    // if (evt.charCode) { 
    //     document.title = evt.charCode 
    // }
    if(evt.keyCode == 43){
    	$('.btn.next').click();
    }
    if(evt.keyCode == 45){
    	$('.btn.prev').click();
    }

    // if(evt.keyCode == 49){
    // 	$('nav span:eq(0)').click();
    // }
    // if(evt.keyCode == 50){
    // 	$('nav span:eq(1)').click();
    // }
    // if(evt.keyCode == 51){
    // 	$('nav span:eq(2)').click();
    // }
    // if(evt.keyCode == 52){
    // 	$('nav span:eq(3)').click();
    // }

    // return false 
} 
// init();

//图片上传
// var pic_url = "";
function previewImage(file) {
	// console.log(file);
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
        // timeout: function () {alert(1)},
        success: function(data) {
            //console.warn(data.picture_url);
			// console.log(file);

			// debugger
            // pic_url = data.picture_url;
            // console.log(pic_url);
            // alert(pic_url);
            layer.msg("上传中...",{time:2000})
            setTimeout("$('.area.edit .haibao-wrap img').attr('src', '"+ data.picture_url +"');layer.msg('上传成功')",2000);

        },

        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("上传 error");
        }

    });

	// debugger

	/*// 判断图片类型
    var type_val = $('#fileid').val();
	if(type_val==""){
		layer.msg("请上传图片");
		return false;
	}

    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(type_val)){  
    	layer.msg("图片类型必须是.gif,jpeg,jpg,png中的一种");
        return false;
    }

    var MAXWIDTH = 360;
    var MAXHEIGHT = 200;
    var div = document.getElementById('preview');
    if (file.files && file.files[0]) {
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.onload = function() {
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
            // img.style.marginLeft = rect.left+'px';
            // img.style.marginTop = rect.top + 'px';
        }
        var reader = new FileReader();
        reader.onload = function(evt) { img.src = evt.target.result; }
        reader.readAsDataURL(file.files[0]);

    } else {
    	//兼容IE
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
    }*/
}

/*function clacImgZoomParam(maxWidth, maxHeight, width, height) {
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
}*/


$('body').on("click",".select-wrap",function(e){
	// $('.select-wrap').click(function(e){
	// debugger;
	e.stopPropagation();
	$(this).find('.select').toggle();
	$(".select-wrap").not(this).find('.select').hide();
});

/*$('.select .option').click(function(e){
	e.stopPropagation();
	$(this).text().parent().hide().prev().text($(this).text());
});*/

$(document).click(function(){
	$('.select').hide();
});



// 设置规则
$('body').on("click",".setRules",function(e){
// $('.setRules').click(function(){

	index = $(this).closest('.addSub4').index();
	// alert(index);
	//return


	$(this).find('.gz').remove();
	$(this).append('<input type="hidden" class="gz gzHidden'+ index +'">');
	// return;

	// $('.set-rules .on').removeClass('on');
	// return

	layer.open({

		type: 1,
		title: '设置规则-单个消费者',
		area: ['66%',"50%"],
		maxmin: true,
		content: $('.layer.set-rules')

	});

});

// 设置规则 确定按钮
// var gzObj = {};
$('.rulesok').click(function(){
	// alert(index);
	// var gzArr = [];
	// var guize = $(this).closest('.set-rules').find('.butie-item');
	var guize = $(this).closest('.set-rules');
	
	if($('.check.perdaySum').hasClass('on')){
		var perdaySum = guize.find('input.perdaySum').val();
	}
	if($('.check.perdayTime').hasClass('on')){
		var perdayTime = guize.find('input.perdayTime').val();
	}
	if($('.check.budgetSum').hasClass('on')){
		var budgetSum = guize.find('input.budgetSum').val();
	}
	if($('.check.budgetTime').hasClass('on')){
		var budgetTime = guize.find('input.budgetTime').val();
	}

	limit = {
		"count_on": guize.find('.selected').attr("name"),
        "perday": {
            "sum": perdaySum,
            "time": perdayTime
        },
        "totalbudget": {
            "sum": budgetSum,
            "time": budgetTime
        }
	}

	// console.log(gzObj);
	$(".gzHidden" + index).val(JSON.stringify(limit, null, 4));
	// console.log($(".y1yHidden" + index).val());
	$(this).closest('.layui-layer').find('.layui-layer-close').click();

});


// 设置摇一摇、设置轮盘抽奖
$('body').on("click",".set",function(e){
// $('.set').click(function(){
	// debugger;
	var addSub4 = $(this).closest('.addSub4');
	index = addSub4.index();
	// alert(index);
	//return

	var type = addSub4.find('.hdc3 .selected').text();
	if( type == '摇一摇'){
		$(this).next('.y1y').remove();
		$(this).after('<input type="hidden" class="y1y y1yHidden'+ index +'">');
		// return;

		$('.addSub5').not(':first').remove();
		$('.addSub5:first').find('.selected').text('');
		$('.addSub5:first').find('input').val('');
		$('.addSub5:first').find('.acAd2').removeClass('hi');

		$('.addSub5:first').find('.setgailv.on').removeClass('on').find('input').remove();

		// debugger
		// try {
		// 	alert(index - 1)
		// 	delete data.event_handler_list[index - 1].prize_content
		// } catch(e) {
		// 	// alert(2)
		// 	// delete data.event_handler_list[yglindex].prize_content
		// }

		layer.open({

			type: 1,
			title: '设置摇一摇',
			area: ['65%',"60%"],
			maxmin: true,
			content: $('.yao'),

		});

	} else if( type == '轮盘抽奖'){
		$(this).next('.lp').remove();
		$(this).after('<input type="hidden" class="lp lpHidden'+ index +'">');
		// return;

		$('.addSub6').not(':first').remove();
		$('.addSub6:first').find('.selected').text('');
		$('.addSub6:first').find('input').val('');
		$('.addSub6:first').find('.acAd2').removeClass('hi');

		layer.open({

			type: 1,
			title: '设置轮盘抽奖',
			area: ['75%',"60%"],
			maxmin: true,
			content: $('.lun'),

		});

	}

});

// 设置摇一摇 确定按钮
$('.yaook').click(function(){
	// alert(index);
	var y1yArr = [];
	var y1yObj = {};
	if($('.addSub5 .selected:eq(0)').text() != ""){

		var yaoyiyao = $(this).parent().find('.yaoWrap .addSub5');
		$(yaoyiyao).each(function(){
			// debugger;
			var _this = $(this);
			try {
				var a = JSON.parse(_this.find('.Yyy6 input').val())
			} catch(e) {
				console.log(e);
			}
			y1yObj = {
				"refund_content": _this.find('.Yyy1 .selected').text(),
				"min": _this.find('.Yyy2 input:eq(0)').val(),
				// "max": _this.find('.Yyy2 input:eq(1)').val(),
				"precentage": _this.find('.Yyy3 input').val(),
				"timelimit": _this.find('.Yyy4 input').val(),
				"probability": a
			}
			y1yArr.push(y1yObj);
		});

		// if(y1yObj['max'] == undefined){
		// 	delete y1yObj['max'];
		// }

		// console.log(y1yObj);
		$(".y1yHidden" + index).val(JSON.stringify(y1yArr, null, 4));
		// console.log($(".y1yHidden" + index).val());
		// return;

		// subsidyItem['prize_content'] = y1yArr;
		// layer.msg('已设置');
	} else {
		layer.msg('请先设置');
		return;
	}

	$(this).closest('.layui-layer').find('.layui-layer-close').click();

});


// 设置概率
var fwmin;
var fwmax;
var count = 10;
// $('.section3').off('click');
$('.section3').on('click','.setgailv.on',function(){
	
	$('.setProbability .yaoyiyaogailv').remove();

	// debugger;
	if($(this).closest('.addSub4').length == 1){
		index = $(this).closest('.addSub4').index();
		// alert(index);

		$(this).find('.gl').remove();
		$(this).append('<input type="hidden" class="gl glHidden'+ index +'">');

		fwmin = parseInt($(this).closest('.addSub4').find('.hdc4In1').val());
		fwmax = parseInt($(this).closest('.addSub4').find('.hdc4In2').val());

	} else if($(this).closest('.addSub5').length == 1) {	// 摇一摇设置概率
		yglindex = $(this).closest('.addSub5').index();
		// alert(index);
		$(this).find('.ygl').remove();
		$(this).append('<input type="hidden" class="ygl yglHidden'+ yglindex +'">');
		// return;
		$('.setProbability').append('<i class="yaoyiyaogailv"></i>');
	}

	var btfz = $(this).closest('.addSub4').find('.hdc6-1 .btfz p').text();//alert(btfz);
	$('.value_curve .number_doller em').text(btfz);

	layer.open({

		type: 1,
		title: '设置概率',
		area: ['1320px',"55%"],
		maxmin: true,
		content: $('.layer.setProbability'),

	});


	var each = (fwmax - fwmin)/count;
	for (var i=0; i<count+1; i++) {
	    $('.layer.setProbability .number_doller li b').eq(i).text((fwmin + each * i).toFixed(1));
	};

});

// 设置概率 确定按钮
var probabilityObj = {};
$('.gailvok').click(function(){
	// alert(1);
	// alert(index);
	// var gzArr = [];number_doller
	// debugger
	var selected = $(this).closest('.setProbability').find('.selected').text();
	var value = $(this).closest('.setProbability').find('.value_curve');
	var value_curve_arr = [];
	var value_curve_obj = {};
	value.find('.number_doller b').each(function(){
		value_curve_obj = {
			"value": $(this).text()
		}
		value_curve_arr.push(value_curve_obj);
	});

	value.find('.Probability_value input').each(function(i){
		value_curve_arr[i]['percentage'] = $(this).val();
	});

	var time = $(this).closest('.setProbability').find('.time_curve');
	var time_curve_arr = [];
	var time_curve_obj = {};
	time.find('.number_doller1 span').each(function(){
		time_curve_obj = {
			"value": $(this).text(),
		}
		time_curve_arr.push(time_curve_obj);
	});

	time.find('.Probability_value_two input').each(function(i){
		time_curve_arr[i]['percentage'] = $(this).val();
	});

	probabilityObj = {
		"range": selected,
		"time_curve": time_curve_arr,
		"value_curve": value_curve_arr
	}

	// if()
	// console.log(gailv);
	// alert(JSON.stringify(probabilityObj, null, 4));
	if($(this).closest('.setProbability').find('.yaoyiyaogailv').length == 1){
		// alert('yaoyiyaogailv');
		// debugger
		$(".yglHidden" + yglindex).val(JSON.stringify(probabilityObj, null, 4))//.parent().text('查看概率').addClass('o');

	} else {
		// alert(2)
		$(".glHidden" + index).val(JSON.stringify(probabilityObj, null, 4));
	}

	// console.log($(".y1yHidden" + index).val());
	// return

	$(this).closest('.layui-layer').find('.layui-layer-close').click();

	// return
})


var tomorrow = new Date((new Date() * 1) + (86400000 * 1)).toLocaleDateString().replace(/\//g, '-');
$('.begintime').val(tomorrow + " 00:00:00");
$('.endtime').val(tomorrow + " 23:59:59");
$('.earliestjointime').val(tomorrow + " 00:00:00");
$('.lastestjointime').val(tomorrow + " 23:59:59");
// laydate.skin('yalan');
$('.time').click(function(e){
	e.stopPropagation();
	// var id = $(this).attr('id');
	laydate({
		// elem: id,
		event: 'focus',
		format: 'YYYY-MM-DD hh:mm:ss',
		// format: 'YYYY-MM-DD',
		istime: true,
		/*choose: function(dates){
			layer.msg(dates);
		},*/
	});

});



// 点击导航
$('nav span').click(function(){
	$(this).addClass('on').siblings().removeClass('on');
	$('section').eq($(this).index()).addClass('on').siblings().removeClass('on');
	stepDis();
});


function stepDis(){

	if($('section.on').index() != 4){
		$('.btn.next').show();
		$('.btn.shenhe').hide();
	}

	if($('section.on').index() == 1){
		$('.btn.prev').hide();
	}

	if($('section.on').index() == 4){
		$('.btn.next').hide();
		$('.btn.shenhe').show();
	}

	if($('section.on').index() != 1){
		$('.btn.prev').show();
	}

}


// 上一步
$('.btn.prev').click(function(){
	$('section.on, nav span.on').removeClass('on').prev().addClass('on');

	if($('section.on').index() != 4){
		$('.btn.next').show();
		$('.btn.shenhe').hide();
	}

	if($('section.on').index() == 1){
		$('.btn.prev').hide();
	}

});

// 下一步
$('.btn.next').click(function(){
	$('section.on, nav span.on').removeClass('on').next().addClass('on');

	if($('section.on').index() == 4){
		$('.btn.next').hide();
		$('.btn.shenhe').show();
	}

	if($('section.on').index() != 1){
		$('.btn.prev').show();
	}

});




$('body.create').on('input','input',function(e){
	e.stopPropagation();


	if(isNaN(this.value)){
        layer.msg("请输入数字");
        $(this).val("");
        return;
    }

    // debugger
	var _this = $(this);
	var addSub2 = _this.closest('.addSub2');
    if(addSub2.length == 1){
    	// console.log(addSub2.find('.selected').text())
    	if(addSub2.find('.member .selected').text() == ""){
    		layer.msg('请先选择会员类型');
    	}

    }

});

// 文本框输入
$('textarea, input').on('input',function(){
	$(this).next().find('em').text($(this).val().length);
});

// 复选 多选
$(document).on('click','.check, .radio',function(){
// $('.check, .radio').on('click',function(){

	// debugger;
	if($(this).parent().hasClass('butie-inner-item')){
		// $(this).addClass('on').parent().siblings('.butie-inner-item').find('.check').removeClass('on');
		$(this).toggleClass('on');

		$(this).closest('.butie-item').find('.butie_type .check.buTie').addClass('on');

		if($(this).closest('.butie-item').find('.butie-inner-item .on').length == 0){
			$(this).closest('.butie-item').find('.butie_type .check.buTie').removeClass('on');
		}

		return;
	}

	if($(this).parent().hasClass('butie_type')){
		// $(this).addClass('on').parent().siblings('.butie-inner-item').find('.check').removeClass('on');
		// $(this).toggleClass('on');
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$(this).closest('.butie-item').find('.butie-inner-item .check.buTie').removeClass('on');
		} else {
			$(this).addClass('on');
			$(this).closest('.butie-item').find('.butie-inner-item .check.buTie').addClass('on');
		}

		return;
	}


	$(this).toggleClass('on').siblings().removeClass('on');

});


$('.btn.edit').click(function(){
	var _this = $(this);
	var edit = $('.area.edit');
	edit.show();

	var i = _this.closest('.area').index();

	layer.open({

		type: 1,
		title: "编辑"+ _this.parent().find('.heading-title').text() +"宣传资料",
		area: ['1110px',"80%"],
		maxmin: true,
		content: edit,

	});

	$('.area.edit .index').val(i);

});


$('.editok').click(function(){

	var _this = $(this);
	var i = $(this).parent().parent().prev().val();
	var area = $('.section4 .area').eq(i);

	var cont = _this.closest('.content'),
		hdBiaoyu = cont.find('#hdBiaoyu').val(),
		wxtw = cont.find('.wxtw').val(),
		xchb = cont.find('.xchb img').attr('src'),
		xcwa = cont.find('.xcwa').val();

	// console.log(hdBiaoyu)
	// console.log(wxtw)
	// console.log(xchb)
	// console.log(xcwa)

	area.find('.activitytitle').text(hdBiaoyu);
	area.find('.wechattitle').text(wxtw);
	area.find('.posterurl').attr('src',xchb);
	area.find('.propagation').text(xcwa);

	$('.layui-layer-close').click();

});



$('.heading-toggle').click(function(){
	$(this).toggleClass('on').parent().next().slideToggle();
	$(this).next().toggle();
});

/*function getSelected(_this, text){
	if(text == _this.parent().prev().text()){
		_this.parent().hide().prev().text(text);
		_this.parent().hide().prev().attr("name",_this.attr('name'));
		return;
	}
	return false
}*/
// $('.select .option').click(function(e){
$("body").on("click",".option",function(e){
	e.stopPropagation();
	// alert(1);
	var _this = $(this),
		text = _this.text();

	if(_this.closest('.fuzeren').length==1){
		_this.parent().hide().prev().text(text).attr({
			"guid": _this.attr('guid'),
			"oid": _this.attr('oid')
		});
		return;
	}

	// 活动类型
	if($(this).closest('.activity').length==1){
		// alert('活动类型');

		// getSelected(_this, text);
		// debugger
		if(text == _this.parent().prev().text()){
			_this.parent().hide().prev().text(text);
			_this.parent().hide().prev().attr("name",_this.attr('name'));
			return;
		}

		var c = true;
		$('.section2 .activity .selected').each(function(i,item){
			if(text == $(this).text()){
				layer.msg($(this).text()+' 已选');
				c = false;
				return false;
			}
		});

		if(c == true){
			_this.parent().hide().prev().text(text);
			_this.parent().hide().prev().attr("name",_this.attr('name'));

			// return
			var index=$(this).parents(".addSub1").find(".option").index($(this));
			
			$(this).parents(".addSub1").find(".selectWrap1").removeClass('-hi').addClass("hi");
			$(this).parents(".addSub1").find(".selectWrap1").eq(index+1).removeClass("hi").addClass("-hi");
			
			$(this).parents(".addSub1").find(".selectWrap2").removeClass('-hi').addClass("hi");
			$(this).parents(".addSub1").find(".selectWrap2").eq(index+1).removeClass("hi").addClass("-hi");
		}

		return;
	}

	// 会员类型
	if($(this).closest('.member-type').length==1){
		// alert('会员类型');

		if(text == '消费者'){
			var ul = _this.closest('.addSub2').find('.acZige1 .select');
			$(ul).find('li:contains(核销人数)').hide();
			$(ul).find('li:contains(惠粉数)').hide();
			$(ul).find('li:contains(粉丝留存率)').hide();
		} else {
			var ul = _this.closest('.addSub2').find('.acZige1 .select');
			$(ul).find('li:contains(核销人数)').show();
			$(ul).find('li:contains(惠粉数)').show();
			$(ul).find('li:contains(粉丝留存率)').show();
		}

		if(text == _this.parent().prev().text()){
			_this.parent().hide().prev().text(text);
			_this.parent().hide().prev().attr("name",_this.attr('name'));
			return;
		}

		var a = true;
		$('.section2 .member-type .selected').each(function(i,item){
			if(text == $(this).text()){
				layer.msg($(this).text() + ' 已选');
				a = false;
				return false;
			}
		});

		if(a == true){
			_this.parent().hide().prev().text(text);
			_this.parent().hide().prev().attr("name",_this.attr('name'));
			//开始*********************************************************************************************
			var index=$(this).parents(".addSub2").find(".select-wrap").find(".option").index($(this));	
			$(this).parents(".addSub2").find(".selectWrap1").addClass("hi");
			$(this).parents(".addSub2").find(".selectWrap1").removeClass("-hi");
			$(this).parents(".addSub2").find(".selectWrap1").eq(index+1).removeClass("hi");
			$(this).parents(".addSub2").find(".selectWrap1").eq(index+1).addClass("-hi");
			//结束*********************************************************************************************
			

			if(text != "分销商"){
				_this.closest('.addSub2').find('.selectWrap1.-hi input').attr('disabled',true);
			} else {
				_this.closest('.addSub2').find('.selectWrap1.-hi input').attr('disabled',false);
			}

		}

		return;

	}

	// 条件类型
	if($(this).closest('.condition-type').length==1){
		// alert('条件类型');
		// debugger;
		if(text == _this.parent().prev().text()){
			_this.parent().hide().prev().text(text);
			_this.parent().hide().prev().attr("name",_this.attr('name'));
			return;
		}

		var b = true;
		var thisSelected = $(this).closest('.addSub2').find('.acZige .addSub3 .selected.condition');
		$(thisSelected).each(function(i,item){
			if(text == $(this).text()){
				layer.msg($(this).text()+' 已选');
				b = false;
				return false;
			}
		});

		if(b == true){
			_this.parent().hide().prev().text(text);
			_this.parent().hide().prev().attr("name",_this.attr('name'));
			//开始*********************************************************************************************
			var index=$(this).closest(".acZige1").find(".select-wrap").find(".option").index($(this));				
			$(this).closest(".addSub3").find(".acZige1Tab").find("p:last").text(addSub3Arr[index+1])
			//结束*********************************************************************************************
		}
		return;
	}

	//统计范围
	// console.log(this)
	if($(this).closest('.acZige2')){
		// alert(4);
		// var index0=
		// $(".acZige2").find(".option").click(function(){			
			var index=$(this).parents(".acZige2").find(".select-wrap").find(".option").index($(this));	
			// console.log(index)
			$(this).parents(".acZige2").next().find(".acZige2tab").addClass("hi");
			$(this).parents(".acZige2").next().find(".acZige2tab").eq(index+1).removeClass("hi");			
		// })	
	}
	if($(this).closest('.acZige4')){
	// $(".acZige4").find(".option").click(function(){			
			var index=$(this).parents(".acZige4").find(".select-wrap").find(".option").index($(this));	
			$(this).parents(".acZige4").next().find(".acZige4tab").addClass("hi");
			$(this).parents(".acZige4").next().find(".acZige4tab").eq(index).removeClass("hi");			
		// })	
	}

	// 补贴对象
	if($(this).closest('.butie-select-wrap').length==1){
		// alert('补贴对象');
		// debugger;
		// alert(_this.attr('name'))
		if(text == _this.parent().prev().text()){
			_this.parent().hide().prev().text(text);
			_this.parent().hide().prev().attr("name",_this.attr('name'));
			return;
		}
		var d = true;
		var thisSelected = $('.addSub4 .butie-select-wrap .selected');
		$(thisSelected).each(function(i,item){
			if(text == $(this).text()){
				layer.msg($(this).text()+' 已选');
				d = false;
				return false;
			}
		});

		if(d == true){
			_this.parent().hide().prev().text(text);
			_this.parent().hide().prev().attr("name",_this.attr('name'));
			//开始*********************************************************************************************
			$(this).closest(".hdc1").next(".hdc2").find("em").text("");//新添加		
			$(this).parents(".addSub4").find(".hdc2 .option").addClass("hi");			
			var dArr=$(this).attr("attrArr").split(",");
			// console.log(dArr)
			for(i=0;i<dArr.length;i++){
				$(this).parents(".addSub4").find(".hdc2 .option").each(function(){					
					if($(this).text()==dArr[i]){
						$(this).removeClass("hi");
					}
				})	
			}
			//结束********************************************************************************************
		}
		return;
	}

	_this.parent().hide().prev().text(text);
	_this.parent().hide().prev().attr("name",_this.attr('name'));
	//开始*********************************************************************************************
	//控件4活动补贴规则****直接复制add.js中hdc3Tab()并纳入$('.select').on("click",".option",function(e){}
	// $(".hdc3").find(".option").click(function(){
	if($(this).closest('.acSe11').length==1){	
		// alert(1)

		// debugger;
		$(this).closest(".addSub4").find("input").val("");
		
		// return
		// var arr=["分/次","分/次","元/次","元/次","元/次","元/次","元/张","元/张","微信手机红包；随机金额返现","轮盘抽奖，祝你好运","蒙牛酸酸乳，买一赠一"];
		if($(this).text()!="摇一摇"&&$(this).text()!="轮盘抽奖"&&$(this).text()!="特定超慧券  >"){
			$(this).parents(".addSub4").find(".hdc4d1").removeClass('hi');
			$(this).parents(".addSub4").find(".hdc4d2").addClass('hi');					
			var index=$(this).parents(".addSub4").find(".hdc3").find(".option").index($(this));
			$(this).parents(".addSub4").find(".hdc4").find(".hdc4dA").text(addSub4Arr[index+1]);		
			// $(".hdc4").find(".hdc4dA").text(addSub4Arr[index]);
			//内部修改项开始**********************
			//补贴峰值
			var text="";
			if(addSub4Arr[index+1].indexOf("元")!=-1){
				text="元";		
			}else if(addSub4Arr[index+1].indexOf("分")!=-1){
				text="分";		
			}			
			$(this).parents(".addSub4").find(".hdc6").find(".acSe14 p").text(text);
			// $(this).parents(".addSub4").find(".hdc6.fz .acSe14 p").text(text);
			//设置概率
			/*$(this).parents(".addSub4").find(".hdc7").css({
				"color": "gray",   
			    "cursor": "default",
			    "border": "1px solid gray"
			})*/
			// $(this).parents(".addSub4").find(".hdc7").removeClass('on');
			//内部修改项结束**********************

		} else {
			// debugger
			$(this).parents(".addSub4").find(".hdc4d1").addClass('hi');
			$(this).parents(".addSub4").find(".hdc4d2").removeClass('hi');
			var index=$(this).parents(".addSub4").find(".hdc3").find(".option").index($(this));
			$(this).parents(".addSub4").find(".hdc4").find(".hdc4dB").text(addSub4Arr[index+1]);	
			//内部修改项开始**********************
			//补贴峰值
			// $(this).parents(".addSub4").find(".hdc6.fz").find(".acSe14 p").text("");
			$(this).parents(".addSub4").find(".hdc6").find(".acSe14 p").text("");
			//设置概率	
			/*$(this).parents(".addSub4").find(".hdc7").css({
				"color": "#4778C7",   
			    "cursor": "pointer",
			    "border": "1px solid #4778C7"
			})*/
			// $(this).parents(".addSub4").find(".hdc7").addClass('on');
			//内部修改项结束**********************
			
			// debugger
			if($(this).text()=="摇一摇"){
				$(this).closest('.addSub4').find('.hdc4 .hdc4d1 input.hdc4In1').val("");
				$(this).closest('.addSub4').find('.hdc4 .hdc4d1 input.hdc4In2').val("");
				$(this).closest('.addSub4').find('.hdc5 .acSe13 input').val("");
				// $(this).closest('.addSub4').find('.hdc6.fz .acSe14 input').val("");
				$(this).closest('.addSub4').find('.hdc6 .acSe14 input').val("");

				$(this).closest('.addSub4').find('.setgailv').addClass('on');
				return;
			}

		}


		// alert($(this).text().indexOf('随机'))
		if($(this).text().indexOf('随机') != -1){
			// alert(1);
			$(this).closest('.addSub4').find('.hdc4 .hdc4d1 .hdc4In1').width(33);
			$(this).closest('.addSub4').find('.hdc4 .hdc4d1 span').show();
			$(this).closest('.addSub4').find('.hdc4 .hdc4d1 .hdc4In2').show();
			$(this).closest('.addSub4').find('.setgailv').addClass('on');
		} else {
			$(this).closest('.addSub4').find('.hdc4 .hdc4d1 .hdc4In1').width(112);
			$(this).closest('.addSub4').find('.hdc4 .hdc4d1 span').hide();
			$(this).closest('.addSub4').find('.hdc4 .hdc4d1 .hdc4In2').hide();
			$(this).closest('.addSub4').find('.setgailv').removeClass('on');
		}
		
		//内部修改项开始**********************
		// $(this).closest('.addSub4').find('.hdc6 .acSe14 p').width(14);		
		//内部修改项结束**********************
		$('.addSub4 .acSe13 input').keyup();
		$('.butieSec .sbys').keyup();

	}
	// });
	//结束********************************************************************************************

	//开始*********************************************************************************************
	//控件5摇一摇//****直接复制add.js中yaoyiyaoTab()并纳入$('.select').on("click",".option",function(e){}
	if($(this).closest('.acSe15').length==1){	
		// debugger
		// alert('1')
		$(this).closest(".addSub5").find("input").val("");
		var arr=["无","元/次","元/次","分","蒙牛酸酸乳买一增益"];
		var arr2=["无","元","元","分","张"];
		// $(".Yyy1 .option").click(function(){
			// console.log($(this))
			// console.log($(this).parents(".Yyy1"))
			var index=$(this).parents(".Yyy1").find(".option").index($(this));		
			if($(this).text()!="特定超慧券"&&$(this).text()!="谢谢参与"){//范围/值
				$(this).parents(".yaoyiyao").find(".Yyy2d1").removeClass("hi");		
				$(this).parents(".yaoyiyao").find(".Yyy2d2").addClass("hi");	
				$(this).parents(".yaoyiyao").find(".Yyy2d3").addClass("hi");	
				$(this).parents(".yaoyiyao").find(".hdc4dA").text(addSub5Arr[index]);
				$(this).parents(".yaoyiyao").find(".acSe15").css("background","white");
			}else if($(this).text()=="谢谢参与"){
				$(this).parents(".yaoyiyao").find(".Yyy2d1").addClass("hi");
				$(this).parents(".yaoyiyao").find(".Yyy2d2").addClass("hi");	
				$(this).parents(".yaoyiyao").find(".Yyy2d3").removeClass("hi");				
				$(this).parents(".yaoyiyao").find(".Yyy2d3").text(addSub5Arr[index]);
				$(this).parents(".yaoyiyao").find(".acSe15").css("background","#FAF9F9");
			}else if($(this).text()=="特定超慧券"){
				$(this).parents(".yaoyiyao").find(".Yyy2d1").addClass("hi");
				$(this).parents(".yaoyiyao").find(".Yyy2d2").removeClass("hi");	
				$(this).parents(".yaoyiyao").find(".Yyy2d3").addClass("hi");
				$(this).parents(".yaoyiyao").find(".Yyy2d2 a").text(addSub5Arr[index]);
				$(this).parents(".yaoyiyao").find(".acSe15").css("background","white");
			}

			//补贴峰值
			var text="";
			// console.log(index)
			if(addSub5Arr[index].indexOf("元")!=-1){
				text="元";		
			}else if(addSub5Arr[index].indexOf("分")!=-1){
				text="分";		
			}
			// console.log(addSub4Arr[index],text)
			$(this).parents(".yaoyiyao").find(".Yyy5d1").removeClass("hi");		
			$(this).parents(".yaoyiyao").find(".Yyy5d2").addClass("hi");
			if($(this).text()!="谢谢参与"){//补贴峰值				
				$(this).parents(".yaoyiyao").find(".Yyy5d1 span").text(text);
				// $(this).parents(".yaoyiyao").find(".Yyy5d1.fz span").text(text);
			}else{
				$(this).parents(".yaoyiyao").find(".Yyy5d1 span").text('');
				// $(this).parents(".yaoyiyao").find(".Yyy5d1.fz span").text('');
			// 	$(this).parents(".yaoyiyao").find(".Yyy5d1").addClass("hi");
			// 	$(this).parents(".yaoyiyao").find(".Yyy5d2").removeClass("hi");
			// 	$(this).parents(".yaoyiyao").find(".Yyy5d2").text(text);
			}

			if($(this).text().indexOf('随机') != -1){
				// alert(1);
				$(this).closest('.yaoyiyao').find('.Yyy2 .Yyy2d1 .min').width(50);
				$(this).closest('.yaoyiyao').find('.Yyy2 .Yyy2d1 span').show();
				$(this).closest('.yaoyiyao').find('.Yyy2 .Yyy2d1 .max').show();
				$(this).closest('.yaoyiyao').find('.setgailv').addClass('on');
			} else {
				// alert(2);
				$(this).closest('.yaoyiyao').find('.Yyy2 .Yyy2d1 .min').width(100);
				$(this).closest('.yaoyiyao').find('.Yyy2 .Yyy2d1 span').hide();
				$(this).closest('.yaoyiyao').find('.Yyy2 .Yyy2d1 .max').hide();
				$(this).closest('.yaoyiyao').find('.setgailv').removeClass('on');
			}
			$('.yaoyiyao .Yyy4 .Yyy4d1 input').keyup();
	}
		// })
	//结束*****************************************************************************
});

// $('.addSub4').find('.hdc4 .hdc4d1 input.hdc4In2').on("input",function(){
$('.butieSec').on("input",'.hdc4 .hdc4d1 input.hdc4In2',function(){
	// alert(1)
	$('.addSub4').find('.acSe13 input').keyup();
});

// $('.addSub4').find('.acSe13 input').keyup(function(){
$('.butieSec').on('keyup','.acSe13 input',function(){
	// debugger;
	var _this = $(this);
	var thisText = _this.val();

	var m = 0;
	var minInput = _this.closest('.addSub4').find('.hdc4 .hdc4d1 input.hdc4In1');
	var maxInput = _this.closest('.addSub4').find('.hdc4 .hdc4d1 input.hdc4In2');
	if(maxInput.css('display') == 'block'){
		m = maxInput.val();
	} else {
		m = minInput.val();
		minInput.keyup(function(){
			_this.keyup();
		});
	}

	_this.closest('.addSub4').find('.hdc6.fz .acSe14 input').val(m * thisText);

	butiefz();

}).on('keyup','.sbys',function(){
	// alert($(this).val());

	var ysCount = 0;
	$('.hdc6-1:contains(元) input').each(function(){
		if($(this).val() == ""){return false;}
		ysCount += parseInt($(this).val());
	});

	$('.sec.rule .hdsbys_text.yuan').text(ysCount);

	var ysCountFen = 0;
	$('.hdc6-1:contains(分) input').each(function(){
		if($(this).val() == ""){return false;}
		ysCountFen += parseInt($(this).val());
	});

	$('.sec.rule .hdsbys_text.fen').text(ysCountFen);

});

var butiefz = function(){
	// debugger;
	var yuanDom = $('.butieSec .fz .acSe14:contains(元) input');
	var yuanL = yuanDom.length;
	var yuanNum = 0;
	if(yuanL != 0){
		yuanDom.each(function(){
			yuanNum += parseInt($(this).val());
			$('.ysfz .cash').text(yuanNum);
		});
	} else {
		$('.ysfz .cash').text('0');
	}

	var fenDom = $('.butieSec .fz .acSe14:contains(分) input');
	var fenL = fenDom.length;
	var fenNum = 0;
	if(fenL != 0){
		fenDom.each(function(){
			fenNum += parseInt($(this).val());
			$('.ysfz .score').text(fenNum);
		});
	} else {
		$('.ysfz .score').text('0');
	}
}


// 计算摇一摇补贴峰值
// $('.yaoyiyao .Yyy4 .Yyy4d1 input').keyup(function(){
$('.yaoWrap').on('keyup','.yaoyiyao .Yyy4d1 input',function(){

	debugger;
	var _this = $(this);
	var yaoyiyao = _this.closest('.yaoyiyao');

	var cishu = _this.val();
	var minInput = yaoyiyao.find('.Yyy2 .Yyy2d1 input.min');
	var maxInput = yaoyiyao.find('.Yyy2 .Yyy2d1 input.max');
	var gailvInput = yaoyiyao.find('.Yyy3 .Yyy3d1 input'), gailvVal = gailvInput.val();

	var m = 0;
	if(maxInput.css('display') == 'inline-block'){
		m = maxInput.val();
		maxInput.keyup(function(){
			_this.keyup();
		});
	} else {
		m = minInput.val();
		minInput.keyup(function(){
			_this.keyup();
		});
	}

	if(yaoyiyao.find('.hdc4dB').length == 1){
		yaoyiyao.find('.Yyy5 .Yyy5d1 input').val(cishu * gailvVal);
	} else {
		yaoyiyao.find('.Yyy5 .Yyy5d1 input').val(m * cishu * gailvVal);
	}

	gailvInput.keyup(function(){
		_this.keyup();
	});

	yfz();

	/*var quan = 0;
	$('.yaoWrap .Yyy5d1:contains(张) input').each(function(){
		quan += parseInt($(this).val());
	});
	$('.layer.yao .quan').text(quan);*/

});

function yfz(){
	var yuanDom = $('.yaoWrap .Yyy5d1.fz:contains(元) input');
	var yuanL = yuanDom.length;
	var yuanNum = 0;
	if(yuanL != 0){
		yuanDom.each(function(){
			yuanNum += parseInt($(this).val());
			$('.layer.yao .cash').text(yuanNum);
		});
	} else {
		$('.layer.yao .cash').text('0');
	}

	var fenDom = $('.yaoWrap .Yyy5d1.fz:contains(分) input');
	var fenL = fenDom.length;
	var fenNum = 0;
	if(fenL != 0){
		fenDom.each(function(){
			fenNum += parseInt($(this).val());
			$('.layer.yao .score').text(fenNum);
		});
	} else {
		$('.layer.yao .score').text('0');
	}
}

$('.areaSave').click(function(){
	$('.area-list .save').click();
});


var fzrurl = '/webapi/ipaloma/topic/charge';
_ajax("get", fzrurl, {}, '活动负责人', function (fzr){

	$(fzr.content).each(function(i,item){
		$('.fuzeren .select').append('<li class="option" guid='+ item.guid +' oid='+ item.oid +'>'+ item.name +'</li>');
	});

	$('.fzr .option').each(function(){
		$(this).click();
	});

});


// 拼数据
var data = {};
$('.saveToDb, .shenhe').click(function(){

	// debugger
	if($(this).text() ==  "提交审核"){


		var finished = true;


		if($('.section1 .activitytitle').val() == ""){
			$("nav span").eq(0).click();
			layer.tips('请先填写活动主题', $('.activitytitle'));
			$('.activitytitle').focus();
			return;
		}
		if($('.section1 .quhao').val() == ""){
			$("nav span").eq(0).click();
			layer.tips('请先填写区号', $('.quhao'));
			$('.quhao').focus();
			return;
		}
		if($('.section1 .tel').val() == ""){
			$("nav span").eq(0).click();
			layer.tips('请先填写电话', $('.tel'));
			$('.tel').focus();
			return;
		}
		if($('.section1 .begintime').val() == ""){
			$("nav span").eq(0).click();
			layer.tips('请先完善活动开始时间', $('.begintime'));
			$('.begintime').focus();
			return;
		}
		if($('.section1 .endtime').val() == ""){
			$("nav span").eq(0).click();
			layer.tips('请先完善活动结束时间', $('.endtime'));
			$('.endtime').focus();
			return;
		}
		if($('.section1 .earliestjointime').val() == ""){
			$("nav span").eq(0).click();
			layer.tips('请先完善会员参与开始时间', $('.earliestjointime'));
			$('.earliestjointime').focus();
			return;
		}
		if($('.section1 .lastestjointime').val() == ""){
			$("nav span").eq(0).click();
			layer.tips('请先完善会员参与结束时间', $('.lastestjointime'));
			$('.lastestjointime').focus();
			return;
		}
		if($('.section1 #shenbao').val() == ""){
			$("nav span").eq(0).click();
			layer.tips('请先填写申报说明', $('#shenbao'));
			$('#shenbao').focus();
			return;
		}


		// debugger
		

		// 会员活动条件
		if(finished == true){
			$('.section2 .addSub1').each(function(){
				// debugger
				var _this = $(this);
				if(_this.find('.activity .selected').text() == ""){
					// debugger
					$("nav span").eq(1).click();
					layer.tips('请先完善活动类型', _this.find('.activity .selected'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				} 
				if(_this.find('.acSe3 .selected').text() == ""){
					// debugger
					$("nav span").eq(1).click();
					layer.tips('请先完善', _this.find('.acSe3 .selected'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}
				if(_this.find('.selectWrap2.-hi input').val() == ""){
					// debugger
					$("nav span").eq(1).click();
					layer.tips('请先完善', _this.find('.selectWrap2.-hi input'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}
			});
		} else {
			return
		}

		// 参与会员
		if(finished == true){
			$('.section2 .addSub2').each(function(){
				// debugger
				var _this = $(this);

				if(_this.find('.acZige').css('display') == "block"){
					
					if(finished == true)
					$('.section2 .addSub3').each(function(){
						var _ths = $(this);

						if(_ths.closest('.acZige').hasClass('hi') == false){

							if(_ths.find('.condition-type .selected').text() == ""){
								$("nav span").eq(1).click();
								layer.tips('请先完善条件类型', _ths.find('.condition-type .selected'));
								// _ths.find('.selected').focus();
								finished = false;
								return false;
							}

							if(_ths.find('.acSe6 .selected').text() == ""){
								// debugger
								$("nav span").eq(1).click();
								layer.tips('请先完善统计范围', _ths.find('.acSe6 .selected'));
								// _ths.find('.selected').focus();
								finished = false;
								return false;
							}
							// debugger
							if(_ths.find('.acZige3 input:not(.dib)').val() == ""){
								// debugger
								$("nav span").eq(1).click();
								layer.tips('请先完善', _ths.find('.acZige3 input:not(.dib)'));
								// _ths.find('.selected').focus();
								finished = false;
								return false;
							}

							// debugger
						
							if(_ths.find('.select-wrap.acSe8 .selected').text() == ""){
								// debugger
								$("nav span").eq(1).click();
								layer.tips('请先完善条件', _ths.find('.select-wrap.acSe8 .selected'));
								// _ths.find('.selected').focus();
								finished = false;
								return false;
							}

							if(_ths.find('.select-wrap.acSe8 .selected').text() == "介于"){

								if(_ths.find('input.jieyu1').val() == ""){
									// debugger
									$("nav span").eq(1).click();
									layer.tips('请先完善最小值', _ths.find('input.jieyu1'));
									// _ths.find('.selected').focus();
									finished = false;
									return false;
								}

								if(_ths.find('input.jieyu2').val() == ""){
									// debugger
									$("nav span").eq(1).click();
									layer.tips('请先完善最大值', _ths.find('input.jieyu2'));
									// _ths.find('.selected').focus();
									finished = false;
									return false;
								}

							}  else if(_ths.find('.select-wrap.acSe8 .selected').text() == ">="){
								if(_ths.find('.acZige5a input:eq(0)').val() == ""){
									// debugger
									$("nav span").eq(1).click();
									layer.tips('请先完善', _ths.find('.acZige5a input.dayudengyu'));
									// _ths.find('.selected').focus();
									finished = false;
									return false;
								}
							}
						}
					})
				}

				if(_this.find('.member-type .selected').text() == ""){
					// debugger
					$("nav span").eq(1).click();
					layer.tips('请先完善会员类型', _this.find('.member-type .selected'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}

				// debugger
				// if(_this.find('.selectWrap1.-hi input').attr('disabled') == 'disabled'){
				// 	// alert(21)
				// 	finished = false;
				// 	// return false;
				// }

				if(_this.find('.selectWrap1.-hi input.acMeI1').not(':disabled').val() == ""){
					// debugger
					$("nav span").eq(1).click();
					layer.tips('请先完善', _this.find('.selectWrap1.-hi input.acMeI1'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}

				if(_this.find('.selectWrap1.-hi input.acMeI2').not(':disabled').val() == ""){
					// debugger
					$("nav span").eq(1).click();
					layer.tips('请先完善', _this.find('.selectWrap1.-hi input.acMeI2'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}

			});
		} else {
			return
		}
		
		// 活动补贴规则
		if(finished == true){

			$('.section3 .addSub4').each(function(){
				// debugger
				var _this = $(this);
				if(_this.find('.butie-select-wrap .selected').text() == ""){
					// debugger
					$("nav span").eq(2).click();
					layer.tips('请先完善补贴对象', _this.find('.butie-select-wrap .selected'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}
				if(_this.find('.select-wrap.acSe10 .selected').text() == ""){
					// debugger
					$("nav span").eq(2).click();
					layer.tips('请先完善补贴条件', _this.find('.select-wrap.acSe10'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}
				if(_this.find('.select-wrap.acSe11 .selected').text() == ""){
					// debugger
					$("nav span").eq(2).click();
					layer.tips('请先完善补贴条件', _this.find('.select-wrap.acSe11'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}
				if(_this.find('.hdc3 .selected').text().indexOf('随机') != -1){
					if(_this.find('.hdc4d1.-hi input.hdc4In1').val() == ""){
						// debugger
						$("nav span").eq(2).click();
						layer.tips('请先填写最小范围', _this.find('.hdc4d1.-hi input.hdc4In1'));
						// _this.find('.selected').focus();
						finished = false;
						return false;
					}
					if(_this.find('.hdc4d1.-hi input.hdc4In2').val() == ""){
						// debugger
						$("nav span").eq(2).click();
						layer.tips('请先填写最大范围', _this.find('.hdc4d1.-hi input.hdc4In2'));
						// _this.find('.selected').focus();
						finished = false;
						return false;
					}

				} else {
					if(_this.find('.hdc4d1.-hi input.hdc4In1').val() == ""){
						// debugger
						$("nav span").eq(2).click();
						layer.tips('请先填写值', _this.find('.hdc4d1.-hi input.hdc4In1'));
						// _this.find('.selected').focus();
						finished = false;
						return false;
					}
				}

				if(_this.find('.hdc5 input').val() == ""){
					// debugger
					$("nav span").eq(2).click();
					layer.tips('请先填写发放上限次数', _this.find('.hdc5 input'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}
				if(_this.find('.sbys').val() == ""){
					// debugger
					$("nav span").eq(2).click();
					layer.tips('请先填写申报预算', _this.find('.sbys'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}

				// debugger
				// alert(_this.find('.setgailv.on input').val())
				// alert(_this.find('.setgailv.on input').length)
				// if(_this.find('.setgailv.on input').val() != undefined || _this.find('.setgailv.on input').length != 0){
				// 	// debugger
				// 	if(_this.find('.setgailv.on input').val() != ""){
				// 		$("nav span").eq(2).click();
				// 		layer.tips('请先设置概率', _this.find('.setgailv.on'));
				// 		// _this.find('.selected').focus();
				// 		finished = false;
				// 		return false;
				// 	}
				// }

				if(_this.find('.setgailv').hasClass('on')){
					if(_this.find('.setgailv.on input').length == 0){

						$("nav span").eq(2).click();
						layer.tips('请先设置概率', _this.find('.setgailv.on'));
						// _this.find('.selected').focus();
						finished = false;
						return false;

					} else if(_this.find('.setgailv.on input').val() == ""){
						$("nav span").eq(2).click();
						layer.tips('请先设置概率', _this.find('.setgailv.on'));
						// _this.find('.selected').focus();
						finished = false;
						return false;
					}

				}

				// 	// debugger
				// if(_this.find('.acZige').attr('class').indexOf('hi') != -1){
				// 	// alert(1)
				// 	finished = false;
				// 	return false;
				// }

				// if(_this.find('.addSub3 .condition-type .selected').text() == ""){
				// 	$("nav span").eq(2).click();
				// 	layer.tips('请先完善条件类型', _this.find('.addSub3 .condition-type .selected'));
				// 	// _this.find('.selected').focus();
				// 	finished = false;
				// 	return false;
				// }

				// if(_this.find('.acSe6 .selected').text() == ""){
				// 	// debugger
				// 	$("nav span").eq(2).click();
				// 	layer.tips('请先完善统计范围', _this.find('.acSe6 .selected'));
				// 	// _this.find('.selected').focus();
				// 	finished = false;
				// 	return false;
				// }

			})
		} else {
			return
		}
		
		// 宣传图文资料
		// debugger
		if(finished == true)
		{
			$('.section4 .area').each(function(i){
				// debugger
				if(i == 3){return false;}
				var _this = $(this);
				// var a = _this.find('.activitytitle').text();
				// debugger
				// var index = $('.section4 .area .activitytitle').get(i); 
				// var title = $(index).text();
				if( _this.find('.activitytitle').text() == ""){
					// $("nav span").eq(2).click();
					layer.tips('请先完善活动标语', _this.find('.activitytitle'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}
				if(_this.find('.wechattitle').text() == ""){
					debugger
					// $("nav span").eq(2).click();
					layer.tips('微信图文消息标题', _this.find('.wechattitle'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}
				if(_this.find('.wenan-text').text() == ""){
					debugger
					// $("nav span").eq(2).click();
					layer.tips('请先完善宣传文案', _this.find('.wenan-text'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}

			});

			// finished = true;
			
		} else {
			return
		}

	}
	

	// delete data;
	// alert(1)
	debugger;
	if(finished == false){
		return
	}


	// 1.活动基础信息
	var basic = $('.basic-msg'),
		servicephone = basic.find('.quhao').val() + "-" + basic.find('.tel').val(),
		singleselection =  basic.find('.radio.on').text();
		if(singleselection == '以上条件满足其一'){
			singleselection = 1;
		} else {
			singleselection = 0;
		}
	
	data = {
	    "activity": {
	        "description"     : basic.find('.description').val(),
	        "begintime"       : basic.find('.begintime').val(),
	        "endtime"         : basic.find('.endtime').val(),
	        "earliestjointime": basic.find('.earliestjointime').val(),
	        "lastestjointime" : basic.find('.lastestjointime').val(),
	        "activitytitle"   : basic.find('.activityTitle').val(),
	        "servicephone"    : servicephone,
	        "singleselection" : singleselection,
	        "responsible_id": basic.find('.fzr1 .selected').attr('guid'),
	        "responsible_oid": parseInt(basic.find('.fzr1 .selected').attr('oid')),
	        "responsible_name": basic.find('.fzr1 .selected').text(),
	        "responsible_second_id": basic.find('.fzr2 .selected').attr('guid'),
	        "responsible_second_oid": parseInt(basic.find('.fzr2 .selected').attr('oid')),
	        "responsible_second_name": basic.find('.fzr2 .selected').text()
	    },
	    "area_condition": [],
        "sponser": sponser,
	}


	// 2.参与活动条件
	var condition = $('.condition'),
		sponser = $('.edit-area.condition .radio.on').text();

	// 参与会员（会员类型 + 条件类型）
	$('.member-type .selected').each(function(){
		var _this = $(this),
			memberType = _this.text();
			// alert(memberType)
			// console.log(memberType)
		// var memberRangeMin = _this.closest('.member').find('.acMe .selectWrap1.-hi .acMeI1').val(),
		// memberRangeMax = _this.closest('.member').find('.acMe .selectWrap1.-hi .acMeI2').val();
		// console.log("memberRangeMin: "+ memberRangeMin + ' memberRangeMax: ' + memberRangeMax);
		// alert("memberRangeMin: "+ memberRangeMin + ' memberRangeMax: ' + memberRangeMax);

		// return;
		// console.log(memberType);

		// debugger;
		if(memberType == '厂商'){
			getMemberType( _this, 'supplier_condition');
		}

		if(memberType == '分销商'){
			getMemberType( _this, 'distributor_condition');
		}

		if(memberType == '门店'){
			getMemberType( _this, 'retailer_condtion');
		}

		if(memberType == '消费者'){
			getMemberType( _this, 'consumer_condition');
		}

	});

	function getMemberType( _this, MemberType){

		// debugger;
		// _this;
		data[MemberType] = {};
		data[MemberType]['singleselection'] = _this.closest('.addSub2').find('.singleselection .radio.on').attr('name');
		data[MemberType]['state'] = 'active';
		if(_this.text() != "消费者"){
			data[MemberType]['number_range'] = {
				min: _this.closest('.member').find('.acMe .selectWrap1.-hi .acMeI1').val(),
				max: _this.closest('.member').find('.acMe .selectWrap1.-hi .acMeI2').val()
			};
		}

		// console.log(data[MemberType]['number_range'])
		_this.parents('.addSub2').find('.addSub3 .selected.condition').each(function(){
			var _self = $(this),
				thisText = _self.text(),
				name = _self.attr('name');

			// console.log(thisText)

			switch(name){
				case "ticket_verify": 
					getCondItemData( _self, MemberType, 'ticket_verify');
					break;

				case "verify_person_count": 
					getCondItemData( _self, MemberType, 'verify_person_count');
					break;

				case "fans_range": 
					getCondItemData( _self, MemberType, 'fans_range');
					break;

				case "activityfanspercentage": 
					getCondItemData( _self, MemberType, 'activityfanspercentage');
					break;

				case "level": 
					getCondItemData( _self, MemberType, 'level');
					break;

				case "credit_rating": 
					getCondItemData( _self, MemberType, 'credit_rating');
					break;

				case "member_time": 
					getCondItemData( _self, MemberType, 'member_time');
					break;

			}

		});
	}	

	function getCondItemData( _self, memberType, conditionType ){
		var acPrev = _self.parents('.addSub3').find('.acZige2 .selected').text();
		if(acPrev == "活动开始前"){
			var curDate = _self.parents('.addSub3').find('.acZige3 input.date').val(),
				begintimeInput = $('.begintime').val().substring(0,10),
				begintime = new Date((new Date(begintimeInput) * 1) - (86400000 * curDate)).toLocaleDateString().replace(/\//g, '-');
		}

		var operator = _self.parents('.addSub3').find('.acZige4 .selected').text();
		var min = '';
		if(operator == '>='){
			min = _self.parents('.addSub3').find('.acZige5 .acZige1Tab input.min').val();
		} else if(operator == '介于'){
			operator = "between";
			min = _self.parents('.addSub3').find('.acZige5 .-hi.acZige4tab input.min').val();
		}

		var max = _self.parents('.addSub3').find('.acZige5 .-hi.acZige4tab input').last().val();
		data[memberType][conditionType] = {
			"state": "active",
			"min" : min,
			"operator": operator,
			"max" : max,
			"begintime" : begintime
		}

	}

	// 会员活动条件（活动类型）
	var acArr = [];
	function getActivityType(_this, activitytype){
		var ra_min = _this.closest('.addSub1').find('.acPu .acPuI1').val(),
		ra_max = _this.closest('.addSub1').find('.acPu .acPuI2').val(),

		// cond1 = _this.closest('.addSub1').find('.acCoSc .bor.selectWrap1.-hi').text(),
		operator = _this.closest('.addSub1').find('.acCoRe .selected').text(),
		min = _this.closest('.addSub1').find('.acCoRa .bor.selectWrap2.-hi #acLabel1').val(),
		max = _this.closest('.addSub1').find('.acCoRa .bor.selectWrap2.-hi #acLabel2').val();

		// alert(max)
		if(_this.text() != '买赠'){
			min = _this.closest('.addSub1').find('.acCoRa .bor.selectWrap2.-hi .diInput').val();
		}

		switch (operator) {
			case "不低于":
				operator = ">=";
				break;
			case "高于":
				operator = ">";
				break;
			case "等于":
				operator = "==";
				break;
		}

		var item = {          
			"state": "active",                              
	    	"activitytype": activitytype, 
	        "retailer_count" : {"min": ra_min, "max": ra_max}, 
	        "discount":{"min":min, "operator": operator, "max" : max}
	        // "state":""
	    }

	    // if(max == undefined){
	    // 	delete item['max'];
	    // }

	    acArr.push(item);
	}

	$('.activity .selected').each(function(){
		var _this = $(this),
			thisText = _this.text();

		if(thisText == "买赠"){
			getActivityType( _this, "buycount");
		}

		if(thisText == "套餐"){
			getActivityType( _this, "package");
		}

		if(thisText == "降价"){
			getActivityType( _this, "discount");
		}

		/*if(thisText == "有礼"){
			var ra_min = _this.closest('.addSub1').find('.acPu .acPuI1').val(),
				ra_max = _this.closest('.addSub1').find('.acPu .acPuI2').val(),

				// cond1 = _this.closest('.addSub1').find('.acCoSc .bor.selectWrap1.-hi').text(),
				operator = _this.closest('.addSub1').find('.acCoRe .selected').text(),
				min = _this.closest('.addSub1').find('.acCoRa .bor.selectWrap2.-hi input').val()

			var item = {                                                                                
		    	"activitytype": _this.attr("name"), 
		        "retailer_count" : {"min": ra_min, "max": ra_max}, 
		        "discount":{"min": min, "operator": operator}, 
		        // "state":""
		    }

		    acArr.push(item);
		}*/

		// console.log(acArr)

		data['activity_condition'] = {
			"product_category": [],
			"activity_itemkind": acArr
		}

	});

	$('.areaSave').click();
	var areaData = $('#area-data').val();
	// alert(areaData);return;	

	data["area_condition"] = JSON.parse(areaData);
	// console.log(JSON.stringify(data, null, 4));
	// return;
	

	// 3.活动补贴规则
	var butieArr = [];
	var subsidyItem = {};
	$('.butie-select-wrap .selected').each(function(){
		var _this = $(this),
			thisText = _this.text();

		// debugger;
		var addSub4 = _this.closest('.addSub4');
		if(addSub4.find('.hdc3 .selected').text().indexOf('随机') != -1){
			var max = addSub4.find('.hdc4 .hdc4d1 .hdc4In2').val();
			// alert(max);
		}

		subsidyItem = {
			"state": "active",
            // "guid": "",
            "refund_to": _this.attr("name"),
            "event": addSub4.find('.hdc2 .selected').attr("name"),
            "refund_content": addSub4.find('.hdc3 .selected').attr("name"),
            "min": addSub4.find('.hdc4 .hdc4d1 .hdc4In1').val(),
            "max": max,
            "ceiling": addSub4.find('.hdc5 input').val(),
            "applycount": addSub4.find('.hdc6-1 input').val()
        }


		var refund_content = addSub4.find('.hdc3 .selected').text();
        if(refund_content == '摇一摇'){
        	var prize_content = addSub4.find('input.y1y').val();
        	try {
        		subsidyItem['prize_content'] = JSON.parse(prize_content);
        	} catch(e) {
        		// console.log(e);
        	}
        }

        if(addSub4.find('.gz').length == 1){
        	var gz = addSub4.find('input.gz').val();
        	try {
        		subsidyItem['limit'] = JSON.parse(gz);
        	} catch(e) {
        		// console.log(e);
        	}
        }

        if(addSub4.find('.gl').length == 1){
        	var gl = addSub4.find('input.gl').val();
        	try {
        		subsidyItem['probability'] = JSON.parse(gl);
        	} catch(e) {
        		// console.log(e);
        	}
        }

		butieArr.push(subsidyItem);

	});

	// console.log(butieArr);
	// console.log(subsidyItem);

	data['event_handler_list'] = butieArr;
	// console.log(data);



	// 4.宣传图文资料
	var tuwenArr = []; 
	var tuwenObj = {};
	var content = $('.section4 .content').not(':last');
	content.each(function(){
		var _this = $(this);

		tuwenObj = {
			"object": _this.prev().find('.heading-title').attr('name'),
	        "activitytitle": _this.find('.activitytitle').text(),
	        "wechattitle": _this.find('.wechattitle').text(),
	        "poster_url": _this.find('.posterurl').attr('src'),
	        "propagation": _this.find('.propagation').text()
		}

		tuwenArr.push(tuwenObj);

	});

	data["propagation"] = tuwenArr;
	// console.log(data);


	data["releaseset"] = {
		// "flag": "",
		// "releasetime":"",
        "optype": $(this).text()

    }

	console.log(JSON.stringify(data, null, 4));


    if($(this).text() == "提交审核"){

		// var saveurl = '/webapi/ipaloma/topic';
		$.ajax({
	        type: "post",
	        url: '/webapi/ipaloma/topic',
	        dataType: "json",
	        data: JSON.stringify(data),
	        // contentType: "application/json",
	        contentType: "application/json; charset=utf-8",
			/*beforeSend: function (x) {
	        	x.setRequestHeader("contentType", "application/json; charset=utf-8");
	        },*/
	        complete: function () {},
	        timeout: function () {},
	        success: function (json) {
	            if(!returnedData.error){
					layer.msg('创建成功');
					console.log(returnedData);
				} else {
				 	layer.msg(returnedData.error);
				}
	        },
	        error: function () {
	            console.warn("提交审核 error");
	        }
    	});
		
    } else {
    	layer.msg('数据已保存');
    }

});

function _ajax(type, url, data, tip, success) {
    $.ajax({
        type: type,
        url: url,
        dataType: "json",
        data: data,
        complete: function () {},
        timeout: function () {},
        success: function (json) {
            success(json);
        },
        error: function () {
            console.warn(tip + " error");
        }
    });
}

function c(sth){
	console.log(JSON.stringify(sth, null, 4));
}