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

	/*$('section').slimscroll({
		height: '270',
		// width: '530'
	});*/

	/*$(".pic-area").slide({ 
		mainCell: ".pic-list",
		effect: "leftLoop",
		vis: 6,
		// autoPlay: true
	});*/

});


/*document.onkeypress = showKeyPress;
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

    // return false;
}*/
// init();

//图片上传
// var pic_url = "";
function previewImage(file) {
	// 齐枭飞修改
  var form = new FormData($('form')[0]);
	var imgSize = file.files[0].size;
	if(imgSize > 1048576){
		layer.msg('活动海报不能上传大于1M的图片');
    	return;
	}

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

			// debugger;
            // pic_url = data.picture_url;
            // console.log(pic_url);
            // alert(pic_url);
            layer.msg("上传中...",{time:2000});
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


// 设置规则 按钮
$('body').on("click",".setRules",function(e){
	// $('.setRules').click(function(){

	// debugger;
	// alert(index);
	//return

	// alert($(this).closest('.butie-select-wrap .selected').text());

	// $(this).find('.gz').remove();
	if($(this).closest('.addSub4').find('.butie-select-wrap .selected').text() == ""){
		layer.tips('请先完善补贴对象', $(this).closest('.addSub4').find('.butie-select-wrap'));
		return;
	}

	// $(this).closest('.butieSec').find('.butie-select-wrap .selected').text("");
	// debugger
	// $('.rules-title').remove();

	var butieduixiang = $(this).closest('.addSub4').find('.butie-select-wrap .selected').text();
	layer.open({

		type: 1,
		title: "设置规则-单个<i class='rules-title'>" + butieduixiang + "</i>",
		area: ['66%',"50%"],
		maxmin: true,
		content: $('.layer.set-rules')

	});


	// debugger;
	var forPath = $('.addSub2:contains(主办方) .member-type:eq(0) .selected').text();
	switch (forPath) {
		case '厂商':
			$('.path').html('平台活动 <i>&gt;</i> 厂商 <i>&gt;</i> 分销商 <i>&gt;</i> 超惠券主题 <i>&gt;</i> 超惠券 <i>&gt;</i> 门店');
			break;
		case '分销商':
			$('.path').html('平台活动 <i>&gt;</i> 分销商 <i>&gt;</i> 超惠券主题 <i>&gt;</i> 超惠券 <i>&gt;</i> 门店');
			break;
		case '门店':
			$('.path').html('平台活动 <i>&gt;</i> 超惠券主题 <i>&gt;</i> 超惠券 <i>&gt;</i> 门店');
			break;
	}

	$('.guizerules-wrap .butieduixiang').text(butieduixiang);


	// debugger
	$('.select-wrap.xzfw').find('ul').empty();
	$('.member-type .selected').each(function(){
		$('.select-wrap.xzfw').find('ul').append("<li class='option'>"+ $(this).text() +"</li>");
	});

	// debugger
	index = $(this).closest('.addSub4').index();
	$('.set-rules .check.on').removeClass('on');
	$('.set-rules input').val('');

	$('.xzfw .selected').text("");
	$('.forBudgetSum').text("");
	$('.forPerdayTime').text("");

	if($(this).find('.gz').length == 0){
		$(this).append('<input type="hidden" class="gz gzHidden'+ index +'">');
		$('.xzfw .selected').text("请选择");

	} else {

		var gz = $('.gzHidden'+ index).val();

		if(gz != ""){

			var gzVal = JSON.parse(gz);
			if(gzVal.perday.sum != "" && gzVal.perday.sum != undefined){
				$('.layer.set-rules .check.perdaySum').click();
				$('input.perdaySum').val(gzVal.perday.sum);

			}
			if(gzVal.perday.time != "" && gzVal.perday.time != undefined){
				$('.layer.set-rules .check.perdayTime').click();
				$('input.perdayTime').val(gzVal.perday.time);
			}

			if(gzVal.totalbudget.sum != "" && gzVal.totalbudget.sum != undefined){
				$('.layer.set-rules .check.budgetSum').click();
				$('input.budgetSum').val(gzVal.totalbudget.sum);
			}
			if(gzVal.totalbudget.time != "" && gzVal.totalbudget.time != undefined){
				$('.layer.set-rules .check.budgetTime').click();
				$('input.budgetTime').val(gzVal.totalbudget.time);

			}

			$('.forBudgetSum').text(gzVal.totalbudget.sum);
			$('.forPerdayTime').text(gzVal.perday.time);
			$('.xzfw .selected').text(gzVal.count_on);
			$('.forXzfw').text(gzVal.count_on);

		}
	}

	// debugger
	// console.log($(this).closest('.butieSec').find('.hdc6-1 .acSe14 .btfz p').text())

	// debugger;
	// $('.butie-inner-item .sum').text("");
	$('.butie-inner-item .sum').text($(this).closest('.addSub4').find('.hdc6-1 p').text());

});


// 设置规则 输入框输入
$('.butie-inner-item input').keyup(function(){
	// debugger
	if($(this).val().length != 0){
		$(this).closest('.butie-inner-item').find('span.check').addClass('on');
		$(this).closest('.butie-item').find('.butie_type span.buTie').addClass('on');
	} else {
		$(this).closest('.butie-inner-item').find('span.check').removeClass('on');
		if($(this).closest('.butie-item').find('.butie-inner-item .check.on').length == 0){
			$(this).closest('.butie-item').find('.butie_type span.buTie').removeClass('on');
		}
	}

	if($(this).hasClass('budgetSum')){
		$('.forBudgetSum').text($(this).val());
	}

	if($(this).hasClass('perdayTime')){
		$('.forPerdayTime').text($(this).val());
	}

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

	var a = true;
	$('.butie-inner-item .check.on').next().find('input').each(function(){
		if($(this).val() == ""){
			layer.tips('请先输入',$(this));
			a = false;
			return false;
		}
	});

	if(!a){return}

	limit = {
		// "count_on": guize.find('.selected').attr("name"),
		"count_on": guize.find('.selected').text(),
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
	// alert(index);
	//return

	var type = addSub4.find('.hdc3 .selected').text();
	if( type == '摇一摇'){

		y1yindex = addSub4.index();
		layer.open({

			type: 1,
			title: '设置摇一摇',
			area: ['65%',"60%"],
			maxmin: true,
			content: $('.yao'),

		});

		// debugger;
		// debugger;
		$('.yaoyiyao').not(':last').remove();
		$('.yaoyiyao').find('.selected').text("");
		$('.yaoyiyao').find('input').val("");


		if($(this).closest('.hdc4d2').find('.y1y').length == 0){
			$(this).after('<input type="hidden" class="y1y y1yHidden'+ y1yindex +'">');
			// $('.yaoyiyao').not(':first').remove();

		} else {

			if($(this).next('.y1y').val() == ""){
				return;
			}

			var y1yObj = {};
			y1yObj = JSON.parse($(this).next('.y1y').val());
			c(y1yObj);
			c(y1yObj.length);

			// $('.Probability_value input').val(0);
			// $.each(y1yObj.value_curve,function(i){
			// 	$('.Probability_value input').eq(i).val(y1yObj.value_curve[i].percentage);
			// });
			// $('.yaoyiyao').remove();
			// $('.addSub5P68').after("<div class='preView'>dsadsa</div>");

			for(var i=0; i<y1yObj.length; i++){

				$('.yaoyiyao').last().find('.acAd2').click();
				if(i == 0){
					$('.yaoyiyao').first().remove();
				}

				var y1yItem = $('.yaoyiyao').eq(i);
				// if(y1yObj[i].refund_content.indexOf('固定') != -1){
					// y1yItem.find("li:contains("+ y1yObj[i].refund_content +")").click();
				// } else {
					// y1yItem.find('.selected').text(y1yObj[i].refund_content);
				// }

				y1yItem.find('li').each(function(){
					if($(this).text() == y1yObj[i].refund_content){
						$(this).click();
					}
				});

				y1yItem.find('.min').val(y1yObj[i].min);
				y1yItem.find('.max').val(y1yObj[i].max);
				y1yItem.find('.Yyy3d1 input').val(y1yObj[i].precentage);
				y1yItem.find('.Yyy4d1 input').val(y1yObj[i].timelimit).keyup();
				y1yItem.find('.Yyy5-1 input').val(y1yObj[i].applycount);
				// y1yItem.find('.Yyy6').append("<input type='hidden' class='ygl yglHidden"+ yglindex +"' value='" + JSON.stringify(y1yObj[i].probability, null, 4) + "'");
				// y1yItem.find('.Yyy6').append($(y1yObj[i].probability));

				y1yItem.find('.setgailv.on').click();
				$('.value_curve').closest('.layui-layer').find('.layui-layer-close').click();

				y1yItem.find('.setgailv.on input').val(JSON.stringify(y1yObj[i].probability, null, 4));

			}

		}

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
				var yaoyiyaogailv = JSON.parse(_this.find('.Yyy6 input').val())
				// var yaoyiyaogailv = _this.find('.Yyy6 input').prop("outerHTML");
			} catch(e) {
				// console.log(e);
			}
			y1yObj = {
				"refund_content": _this.find('.Yyy1 .selected').text(),
				"min": _this.find('.Yyy2 input:eq(0)').val(),
				"max": _this.find('.Yyy2 input:eq(1)').val(),
				"precentage": _this.find('.Yyy3 input').val(),
				"timelimit": _this.find('.Yyy4 input').val(),
				"applycount": _this.find('.Yyy5-1 input').val(),
				"probability": yaoyiyaogailv
			}
			y1yArr.push(y1yObj);
		});

		// if(y1yObj['max'] == undefined){ 
		// 	delete y1yObj['max'];
		// }

		// console.log(y1yObj);
		$(".y1yHidden" + y1yindex).val(JSON.stringify(y1yArr, null, 4));
		// console.log($(".y1yHidden" + index).val());
		// return;

		// subsidyItem['prize_content'] = y1yArr;
		layer.msg('摇一摇数据已保存');

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
	var _this = $(this);


	var addSub4 = _this.closest('.addSub4');
	if(addSub4.find('.hdc3 .selected').text().indexOf('随机') != -1){
		if(addSub4.find('.hdc4d1.-hi input.hdc4In1').val() == ""){
			// debugger
			layer.tips('请先填写最小范围', addSub4.find('.hdc4d1.-hi input.hdc4In1'));
			// addSub4.find('.selected').focus();
			return;
		}
		if(addSub4.find('.hdc4d1.-hi input.hdc4In2').val() == ""){
			// debugger
			layer.tips('请先填写最大范围', addSub4.find('.hdc4d1.-hi input.hdc4In2'));
			// addSub4.find('.selected').focus();
			return;
		}

	} else {
		if(addSub4.find('.hdc4d1.-hi input.hdc4In1').val() == ""){
			// debugger
			layer.tips('请先填写值', addSub4.find('.hdc4d1.-hi input.hdc4In1'));
			// addSub4.find('.selected').focus();
			return;
		}
	}

	if(addSub4.find('.hdc5 input').val() == ""){
		// debugger
		layer.tips('请先填写发放上限次数', addSub4.find('.hdc5 input'));
		// addSub4.find('.selected').focus();
		finished = false;
		return false;
	}

	if(addSub4.find('.sbys').val() == ""){
		// debugger
		layer.tips('请先填写申报预算', addSub4.find('.sbys'));
		// addSub4.find('.selected').focus();
		finished = false;
		return false;
	}


	// 摇一摇中设置概率
	if(_this.closest('.yaoyiyao').length == 1){

		if(_this.closest('.yaoyiyao').find('input.min').val() == ""){
			layer.tips('请先填写最小范围值', _this.closest('.yaoyiyao').find('input.min'));
			return;
		}

		if(_this.closest('.yaoyiyao').find('input.max').val() == ""){
			layer.tips('请先填写最大范围值', _this.closest('.yaoyiyao').find('input.max'));
			return;
		}

	}


	$('.setProbability .yaoyiyaogailv').remove();

	layer.open({

		type: 1,
		title: '设置概率',
		area: ['1320px',"55%"],
		maxmin: true,
		content: $('.layer.setProbability'),

	});


	// debugger;
	if(_this.closest('.addSub4').length == 1){
		index = _this.closest('.addSub4').index();
		// alert(index);

		fwmin = parseInt(_this.closest('.addSub4').find('.hdc4In1').val());
		fwmax = parseInt(_this.closest('.addSub4').find('.hdc4In2').val());

		// debugger;
		if(_this.find('.gl').length == 0){
			_this.append('<input type="hidden" class="gl glHidden'+ index +'">');
			$('.Probability_value input').val(10);

		} else {
			var glObj = "";
			if(_this.find('.gl').val() != ""){
				glObj = JSON.parse(_this.find('.gl').val());
				// console.log(glObj.value_curve);
				$.each(glObj.value_curve,function(i){
					$('.Probability_value input').eq(i).val(glObj.value_curve[i].percentage);
				});
			}
		}

	} else if(_this.closest('.addSub5').length == 1) {
		// debugger;
		yglindex = _this.closest('.addSub5').index();

		fwmin = parseInt(_this.closest('.addSub5').find('.min').val());
		fwmax = parseInt(_this.closest('.addSub5').find('.max').val());

		// alert(index);
		// _this.find('.ygl').remove();
		if(_this.find('.ygl').length == 0){
			_this.append('<input type="hidden" class="ygl yglHidden'+ yglindex +'">');
			$('.Probability_value input').val(10);
		} else {
			var yglObj = "";
			if(_this.find('.ygl').val() != ""){
				yglObj = JSON.parse(_this.find('.ygl').val());
				// console.log(glObj.value_curve);
				$.each(yglObj.value_curve,function(i){
					$('.Probability_value input').eq(i).val(yglObj.value_curve[i].percentage);
				});
			}
		}

		// return;
		$('.setProbability').append('<i class="yaoyiyaogailv"></i>');
	}

	var btfz = _this.closest('.addSub4').find('.hdc6-1 .btfz p').text();//alert(btfz);
	$('.value_curve .number_doller em').text(btfz);

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
	
	if($('.gailvok').hasClass('disabled')){return}
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
});

	


var tomorrow = new Date((new Date() * 1) + (86400000 * 1)).toLocaleDateString().replace(/\//g, '-');
$('.begintime').val(tomorrow + " 00:00:00");
$('.endtime').val(tomorrow + " 23:59:59");
$('.earliestjointime').val(tomorrow + " 00:00:00");
$('.latestjointime').val(tomorrow + " 00:00:00");
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

	$(this).val($.trim($(this).val()));

	if(isNaN($(this).val())){

		// debugger
		if($(this).closest('.area-list').length == 1){
			return;
		}

        layer.msg("请输入数字");
        $(this).val("");
        return;

    }


	// debugger
	if($(this).val() == ""){
		if($(this).closest('.sbys')){
			// $(this).val(0);
			$(this).keyup();
		}
		return;
	}

	if($(this).closest('.sbys')){
		// $(this).val(0);
		$(this).keyup();
	}

	if($(this).closest('.dianhua').length == 1){return;}
	if($(this).closest('.input_a').length == 1 || 
	   $(this).closest('.hdc4d1').length == 1 || 
	   $(this).closest('.Yyy2d1').length == 1 ||
	   $(this).closest('.btfz').length == 1){
		
		if($(this).val().indexOf('.') == 1){
			$(this).attr("maxlength","4");
			return
		}

		if($(this).val().indexOf('.') == 2){
			$(this).attr("maxlength","5");
			return
		}

		if($(this).val().indexOf('.') == 3){
			$(this).attr("maxlength","6");
			return
		}

	}

	
	$(this).val(parseInt($(this).val()));


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


$('.Probability_value input').on("blur",function(){

	// debugger
	var total = 0;
	$('.Probability_value input').each(function(){

		// if($(this).val() == ""){
		// 	$(this).val(0);
		// }

		// if($(this).val().indexOf('.') == -1){
		// 	total += Number($(this).val()).toFixed(2);
		// } else {
			total += Number($(this).val());
		// }

	});

	// debugger
	if(total != 100){
		layer.msg('概率值总和应为100%');
		$('.gailvok').addClass('disabled');
	} else {
		$('.gailvok').removeClass('disabled');
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


	if($(this).hasClass('zhiding')){
		$(this).toggleClass('on');
		return;
	}

	$(this).addClass('on').siblings().removeClass('on');


});


// 宣传图文资料 编辑按钮
$('.btn.edit').click(function(){
	// debugger

	var _this = $(this);
	var area = _this.closest('.area');
	var i = _this.closest('.area').index();$('.area.edit .index').val(i);
	var edit = $('.area.edit');
	layer.open({

		type: 1,
		title: "编辑"+ _this.parent().find('.heading-title').text() +"宣传资料",
		area: ['1110px',"80%"],
		maxmin: true,
		content: edit,

	});

	
	edit.find('#hdBiaoyu').val(area.find('.activitytitle').text());
	edit.find('.wxtw').val(area.find('.wechattitle').text());
	edit.find('.xchb').attr('src', area.find('.posterurl').attr('src'));
	edit.find('.xcwa').val(area.find('.wenan-text').text());

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


// 补贴条件
/*$('.xzfw .select').click(function(){
	
	var _this = $(this);

	// debugger
	_this.find('li').remove();
	$('.member-type .selected').each(function(){
		_this.append("<li class='option'>"+ $(this).text() +"</li>");
	});

	// return;

});*/



// $('.select .option').click(function(e){
$("body").on("click","li.option",function(e){
	e.stopPropagation();

	// debugger;
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

		/*if(text == '消费者'){
			var ul = _this.closest('.addSub2').find('.acZige1 .select');
			$(ul).find('li:contains(核销人数)').hide();
			$(ul).find('li:contains(惠粉数)').hide();
			$(ul).find('li:contains(粉丝留存率)').hide();
		} else {
			var ul = _this.closest('.addSub2').find('.acZige1 .select');
			$(ul).find('li:contains(核销人数)').show();
			$(ul).find('li:contains(惠粉数)').show();
			$(ul).find('li:contains(粉丝留存率)').show();
		}*/

		var arr=$(this).attr("conditiontype").split(',');			
		var li = _this.closest('.addSub2').find('.acZige1 .option');
		$(li).each(function(){
			// console.log($(this).text());		
			$(this).hide();
			for(i=0;i<arr.length;i++){
				if($(this).text()==arr[i]){
					$(this).show();
				}
			}
		});

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
		// var d = true;
		// var thisSelected = $('.addSub4 .butie-select-wrap .selected');
		// $(thisSelected).each(function(i,item){
		// 	if(text == $(this).text()){
		// 		layer.msg($(this).text()+' 已选');
		// 		d = false;
		// 		return false;
		// 	}
		// });

		// if(d == true){
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
				});
			}
			//结束********************************************************************************************
		// }
		return;
	}


	// 补贴条件
	if($(this).closest('.butieCond').length==1){
		var _this = $(this);

		var butieduixiang = $('.addSub4 .butie-select-wrap .selected');
		var this_duixiang_txt = _this.closest('.addSub4').find('.butie-select-wrap .selected').text();
		
		var selected = false;
		$(".addSub4 .butie-select-wrap .selected:contains("+ this_duixiang_txt +")").each(function(){
			// alert($(this).text());
			$(this).closest('.addSub4').find('.butieCond .selected').each(function(){

				if($(this).text() == _this.text()){
					layer.msg(_this.text() + " 已选");
					selected = true;
				}
			});
		});

		// return;
	}



	// 选择限制范围
	if($(this).closest('.xzfw').length==1){
		// debugger
		$('.forXzfw').text($(this).text())
	}


	if(!selected){
		_this.parent().hide().prev().text(text);
		_this.parent().hide().prev().attr("name",_this.attr('name'));
	}

	//开始*********************************************************************************************
	//控件4活动补贴规则****直接复制add.js中hdc3Tab()并纳入$('.select').on("click",".option",function(e){}
	// $(".hdc3").find(".option").click(function(){
	if($(this).closest('.acSe11').length==1){	
		// alert(1);

		// debugger;
		$(this).closest(".addSub4").find("input").val("");
		

		// return
		// var arr=["分/次","分/次","元/次","元/次","元/次","元/次","元/张","元/张","微信手机红包；随机金额返现","轮盘抽奖，祝你好运","蒙牛酸酸乳，买一赠一"];

		var shenbaoyusuanInput = $(this).closest('.addSub4').find('.hdc6-1 input');

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
			shenbaoyusuanInput.removeClass('vihi');

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
				$(this).closest('.addSub4').find('.setgailv').removeClass('on');
				$(this).parents(".addSub4").find("input.sbys + p").text('次');
				shenbaoyusuanInput.addClass('vihi');
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


		// $('.addSub4 .acSe13 input').keyup();
		// $('.butieSec .sbys').keyup();

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
			}else if($(this).text()=="特定超慧券"){
				$(this).parents(".yaoyiyao").find(".Yyy2d1").addClass("hi");
				$(this).parents(".yaoyiyao").find(".Yyy2d2").removeClass("hi");	
				$(this).parents(".yaoyiyao").find(".Yyy2d3").addClass("hi");
				$(this).parents(".yaoyiyao").find(".Yyy2d2 a").text(addSub5Arr[index]);
				$(this).parents(".yaoyiyao").find(".acSe15").css("background","white");
			}

			if($(this).text()=="谢谢参与"){
				$(this).parents(".yaoyiyao").find(".Yyy2d1").addClass("hi");
				$(this).parents(".yaoyiyao").find(".Yyy2d2").addClass("hi");	
				$(this).parents(".yaoyiyao").find(".Yyy2d3").removeClass("hi");				
				$(this).parents(".yaoyiyao").find(".Yyy2d3").text(addSub5Arr[index]);
				$(this).parents(".yaoyiyao").find(".acSe15").css("background","#FAF9F9");
				// debugger
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

			var shenbaoyusuanInput = $(this).closest('.yaoyiyao').find('.Yyy5-1 input');
			if($(this).text()=="谢谢参与"){//补贴峰值				
				$(this).parents(".yaoyiyao").find(".Yyy5d1 span").text('');
				// $(this).parents(".yaoyiyao").find(".Yyy5d1.fz span").text(text);
				shenbaoyusuanInput.hide();
			}else{
				$(this).parents(".yaoyiyao").find(".Yyy5d1 span").text(text);
				// $(this).parents(".yaoyiyao").find(".Yyy5d1.fz span").text('');
			// 	$(this).parents(".yaoyiyao").find(".Yyy5d1").addClass("hi");
			// 	$(this).parents(".yaoyiyao").find(".Yyy5d2").removeClass("hi");
			// 	$(this).parents(".yaoyiyao").find(".Yyy5d2").text(text);
				shenbaoyusuanInput.show();
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
			// $('.yaoyiyao .Yyy4 .Yyy4d1 input').keyup();
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
	if(isNaN(thisText)){
		thisText = 0;
	}

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

	// debugger;
	if( isNaN(maxInput.val()) || isNaN(minInput.val()) ){
		_this.closest('.addSub4').find('.hdc6.fz .acSe14 input').val(Number(0 * thisText));
		butiefz();
		return;
	}

	_this.closest('.addSub4').find('.hdc6.fz .acSe14 input').val(Number(m * thisText).toFixed(2));

	butiefz();

}).on('keyup','.sbys',function(){
	// alert($(this).val());

	var ysCount = 0;
	$('.hdc6-1:contains(元) input').each(function(){
		// if($(this).val() == ""){return false;}
		ysCount += Number($(this).val());
	});

	$('.sec.rule .hdsbys_text.yuan').text(ysCount.toFixed(2));

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
			// if($(this).val() == ""){return false}
			yuanNum += Number($(this).val());
		});

		$('.ysfz .cash').text(yuanNum);

	} else {
		$('.ysfz .cash').text('0');
	}

	var fenDom = $('.butieSec .fz .acSe14:contains(分) input');
	var fenL = fenDom.length;
	var fenNum = 0;
	if(fenL != 0){
		fenDom.each(function(){
			fenNum += Number($(this).val()).toFixed(2);
			$('.ysfz .score').text(Number(fenNum));
		});
	} else {
		$('.ysfz .score').text('0');
	}
}


// 计算摇一摇补贴峰值
// $('.yaoyiyao .Yyy4 .Yyy4d1 input').keyup(function(){
$('.yaoWrap').off('keyup');
$('.yaoWrap').on('keyup','.yaoyiyao .Yyy4d1 input',function(){

	// debugger;
	var _this = $(this);
	var yaoyiyao = _this.closest('.yaoyiyao');

	var cishu = Number(_this.val());
	if(isNaN(cishu)){
		cishu = 0;
	}

	var minInput = yaoyiyao.find('.Yyy2 .Yyy2d1 input.min');
	var maxInput = yaoyiyao.find('.Yyy2 .Yyy2d1 input.max');

	var m = 0;
	if(maxInput.css('display') == 'inline-block'){
		m = maxInput.val();
		
	} else {
		m = minInput.val();
	}

	// debugger;
	if( isNaN(maxInput.val()) || isNaN(minInput.val()) ){
		yaoyiyao.find('.Yyy5 .Yyy5d1 input').val(cishu * 0);
		yaoyiyaofengzhi();
		return;
	}

	// if(yaoyiyao.find('.hdc4dB').length == 1){
	// if(m != 0) {
		yaoyiyao.find('.Yyy5 .Yyy5d1 input').val(Number(m * cishu).toFixed(2));
		yaoyiyaofengzhi();
	// }

	// } else {
		// yaoyiyao.find('.Yyy5 .Yyy5d1 input').val(m * cishu * gailvVal);
	// }

	// yaoyiyao.find('.Yyy3 .Yyy3d1 input').keyup(function(){
	// 	_this.keyup();
	// });

});


$('.yaoWrap').on('keyup','.yaoyiyao .Yyy2d1 input.min',function(){
	$(this).closest('.yaoyiyao').find('.Yyy4d1 input').keyup();
});

$('.yaoWrap').on('keyup','.yaoyiyao .Yyy2d1 input.max',function(){
	$(this).closest('.yaoyiyao').find('.Yyy4d1 input').keyup();
});

// 摇一摇补贴峰值
function yaoyiyaofengzhi(){

	/*// debugger
	var yuanNum = 0;
	$('.yaoWrap .Yyy5d1.fz:contains(元) input').each(function(){
		yuanNum += parseInt($(this).val());
		$('.layer.yao .cash').text(yuanNum);
	});
	
	var fenNum = 0;
	$('.yaoWrap .Yyy5d1.fz:contains(分) input').each(function(){
		fenNum += parseInt($(this).val());
		$('.layer.yao .score').text(fenNum);
	});*/

	// debugger;
	var yuanDom = $('.yaoWrap .Yyy5d1.fz:contains(元) input');
	var yuanL = yuanDom.length;
	var yuanNum = 0;
	if(yuanL != 0){

		yuanDom.each(function(){
			// if($(this).val() == ""){return false}
			yuanNum += Number($(this).val());
		});

		$('.layer.yao .cash').text(yuanNum);

	} else {
		$('.layer.yao .cash').text('0');
	}

	
}


$('.areaSave').click(function(){
	$('.area-list .save').click();
});


var fzrurl = '/webapi/ipaloma/topic/charge';
_ajax("get", fzrurl, {}, '活动负责人', function (fzr){

	$(fzr.content).each(function(i,item){
		$('.fuzeren .select').append('<li class="option" guid='+ item.guid +' oid='+ item.oid +'>'+ item.nickname +'</li>');
	});

	/*$('.fzr .option').each(function(){
		$(this).click();
	});*/

});



// debugger
var data = {};
$('.saveToDb, .shenhe').click(function(){

	// debugger
	if($(this).text() ==  "提交审核"){

		var finished = true;

		if($('.section1 .activityTitle').val() == ""){
			$("nav span").eq(0).click();
			layer.tips('请先填写活动主题', $('.section1 .activityTitle'));
			$('.section1 .activityTitle').focus();
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
		if($('.section1 .latestjointime').val() == ""){
			$("nav span").eq(0).click();
			layer.tips('请先完善会员参与结束时间', $('.latestjointime'));
			$('.latestjointime').focus();
			return;
		}
		if($('.section1 #shenbao').val() == ""){
			$("nav span").eq(0).click();
			layer.tips('请先填写申报说明', $('#shenbao'));
			$('#shenbao').focus();
			return;
		}
		if($('.fzr1 em.selected').text() == '选择第一负责人'){
			$("nav span").eq(0).click();
			layer.tips('请先选择第一负责人', $('.fzr1'));
			return;
		}
		if($('.fzr2 em.selected').text() == '选择第二负责人'){
			$("nav span").eq(0).click();
			layer.tips('请先选择第二负责人', $('.fzr2'));
			return;
		}


		// debugger
		
		if($('.region-item').length == 0){
			$("nav span").eq(1).click();
			layer.tips('请先完善地区', $('.setAreaBtn'));
			return;
		}

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
//				 debugger
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
				var isShake = false;
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
						
						if(_this.find('.select-wrap.acSe11 .selected').text() == "摇一摇"){
							isShake = true;
						}

						if(!isShake){
							layer.tips('请先填写值', _this.find('.hdc4d1.-hi input.hdc4In1'));
							// _this.find('.selected').focus();
							finished = false;
						}
						
//						return false;
						
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
				if(!isShake){
					if(_this.find('.sbys').val() == ""){
						// debugger
						$("nav span").eq(2).click();
						layer.tips('请先填写申报预算', _this.find('.sbys'));
						// _this.find('.selected').focus();
						finished = false;
						return false;
					}
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
					 $("nav span").eq(3).click();
					layer.tips('请先完善活动标语', _this.find('.activitytitle'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}
				if(_this.find('.wechattitle').text() == ""){
//					debugger
					 $("nav span").eq(3).click();
					layer.tips('微信图文消息标题', _this.find('.wechattitle'));
					// _this.find('.selected').focus();
					finished = false;
					return false;
				}
				if(_this.find('.wenan-text').text() == ""){
//					debugger
					 $("nav span").eq(3).click();
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
	// debugger;
	if(finished == false){
		return
	}

	if($(this).hasClass('disabled')){return}


	// 拼数据
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
//	    	"guid":basic.find('.activityTitle').attr("guid"),//0124添加
	        "description"     : basic.find('.description').val(),
	        "begintime"       : basic.find('.begintime').val(),
	        "endtime"         : basic.find('.endtime').val(),
	        "earliestjointime": basic.find('.earliestjointime').val(),
	        "latestjointime" : basic.find('.latestjointime').val(),
	        "activitytitle"   : basic.find('.activityTitle').val(),
	        "servicephone"    : servicephone,
	        "singleselection" : singleselection,
	        "responsible_id": basic.find('.fzr1 .selected').attr('guid'),
	        "responsible_oid": parseInt(basic.find('.fzr1 .selected').attr('oid')),
	        "responsible_name": basic.find('.fzr1 .selected').text(),
	        "responsible2nd_id": basic.find('.fzr2 .selected').attr('guid'),
	        "responsible2nd_oid": parseInt(basic.find('.fzr2 .selected').attr('oid')),
	        "responsible2nd_name": basic.find('.fzr2 .selected').text()
	    },
	    "area_condition": [],
	    "sponsor": $('.edit-area.condition .radio.on').attr("name")
	}
	if(location.href.indexOf("activityModify.html")>0){
		data.guid=basic.find('.activityTitle').attr("guid");//0124添加
	}	

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
			getMemberType( _this, 'retailer_condition');
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
				thisText = _self.text();

			getCondItemData(_self, MemberType, thisText);
		});

	}

	function getCondItemData( _self, memberType, conditionType ){
		// debugger
		var acPrev = _self.parents('.addSub3').find('.acZige2 .selected').text();		
		var curDate = _self.parents('.addSub3').find('.acZige3 input.date').val();
		var begintime = "";
		if(acPrev == "活动开始前"){
			if(_self.parents('.addSub3').find('.select-wrap.acSe7 .selected').first().text() == "天"){
				begintimeInput = $('.begintime').val().substring(0,10);
				begintime = new Date((new Date(begintimeInput) * 1) - (86400000 * curDate)).toLocaleDateString().replace(/\//g, '-');
			} else {
				begintime = new Date(new Date().setMonth((new Date().getMonth() - curDate))).toLocaleDateString().replace(/\//g, '-');
			}
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
		var statisticrange = _self.parents('.addSub3').find('.select-wrap.acSe6 .selected').text();
		var timeunit = _self.parents('.addSub3').find('.select-wrap.acSe7 .selected').first().text();
		if(conditionType == ""){return}
		data[memberType][conditionType] = {
//			"guid":_self.parents('.addSub3').find('.acZige1 .acSe5 em').attr("guid"),//0124添加
			"state": "active",
			"min": min,
			"operator": operator,
			"max": max,
			"begintime": begintime,
			"statisticrange": statisticrange,
			"timeunit": timeunit
		}
		if(location.href.indexOf("activityModify.html")>0){
			data[memberType][conditionType].guid=_self.parents('.addSub3').find('.acZige1 .acSe5 em').attr("guid");//0124添加
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
//			"guid":_this.closest('.addSub1').find('.acTy .acSe1 .selected').attr("guid"),//0124添加
			"state": "active",                              
	    	"activitytype": activitytype, 
	        "retailer_count" : {"min": ra_min, "max": ra_max}, 
	        "discount":{"min":min, "operator": operator, "max" : max}
	        // "state":""
	    }
		if(location.href.indexOf("activityModify.html")>0){
			item.guid=_this.closest('.addSub1').find('.acTy .acSe1 .selected').attr("guid");//0124添加
		}	
	    // if(max == undefined){
	    // 	delete item['max'];
	    // }

	    acArr.push(item);
	}

	$('.activity .selected').each(function(){
		var _this = $(this),
			thisText = _this.text();
		getActivityType(_this, thisText);

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
//			"guid":addSub4.find('.acSe9 .selected').attr("guid"),//0124添加
			"state": "active",
            // "guid": "",
            "refund_to": _this.attr("name"),
            "event": addSub4.find('.hdc2 .selected').text(),
            "refund_content": addSub4.find('.hdc3 .selected').text(),
            "min": addSub4.find('.hdc4 .hdc4d1 .hdc4In1').val(),
            "max": max,
            "ceiling": addSub4.find('.hdc5 input').val(),
            "applycount": addSub4.find('.hdc6-1 input').val()
        }
		if(location.href.indexOf("activityModify.html")>0){
			subsidyItem.guid=addSub4.find('.acSe9 .selected').attr("guid");//0124添加
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

	var optype = $(this).text();
	data["releaseset"] = {
		// "flag": "",
		// "releasetime":"",
	    "optype": optype

    }

	console.log(JSON.stringify(data, null, 4));

    
	if ($('nav span:last').hasClass('on')) {
	    $.ajax({
	        type: "post",
	        url: '/webapi/ipaloma/topic',
	        dataType: "json",
	        data: JSON.stringify(data),
	        // contentType: "application/json",
	        contentType: "application/json; charset=utf-8",
	        beforeSend: function (x) {
	        	// x.setRequestHeader("contentType", "application/json; charset=utf-8");
	        	layer.msg('数据正在保存...');
	        	$('.shenhe').addClass('disabled');
	        },
	        complete: function () { $('.shenhe').removeClass('disabled'); },
	        timeout: function () { },
	        success: function (returnedData) {
	            if (!returnedData.error) {
	                layer.msg('创建成功');
	                console.log(returnedData);
	            } else {
	                layer.msg(returnedData.error);
	            }
	        },
	        error: function () {
	            // console.warn("提交审核失败");
	            layer.msg(optype + "失败");
	        }
    	});
		
		return;
	}

	
	if (!$('nav span:last').hasClass('on') && $(this).text() == "保存"){
		layer.msg('数据已保存');
		return;
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
        error: function (data) {
            console.warn(tip + " error");
            // layer.alert(tip + ' :错误'+data.status, {icon: 5});
        }
    });
}

function c(sth){
	console.log(JSON.stringify(sth, null, 4));
}