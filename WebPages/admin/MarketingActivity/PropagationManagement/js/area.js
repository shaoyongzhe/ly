$('.region-wrap').on('click', '.x', function() {
	var _this = $(this);

	if (_this.closest('.city').length == 1) {
		_this.closest('.row').remove()
		return;
	}

	if (_this.closest('.provice').length == 1) {
		_this.closest('.region-item').remove()
		return;
	}
	$(this).parent().remove();
	// $(this).parent().addClass('on');
	// _this.parent().fadeOut(300, function() {
	// 	_this.remove();
	// });

});

$('.setBtn').on('click', function() {

    // alert(1)
	layer.open({
		type: 1,
		// skin: 'layui-layer-lan', //加上边框
		skin: 'layui-layer', //加上边框
		area: ['850px', '80%'], //宽高
		shadeClose: true, //点击这招是否关闭 true,false
		time: 0, //默认关闭时间 0
		// anim: 5, //动画
		title: ['请选择活动区域（支持多选）', 'font-size:20px;text-align:center;padding-left:100px;border:2px solid #e4e4e4'],
		// shade: [0.6,'pink'],//莫太狂的颜色
		// maxmin: false, //最大化
		// resize:false,//允许拉伸
		// btn: ['清楚勾选', '确定'],
		// btn2: function(index, layero) {

		// },
		moveOut: true, //允许拖拽到川口外
		content: $('.area-list.wrapper')
	});

	dataLoad();


	// 改变背景色
	/*$('.Select_the_province').on('click', '.ui-selected', function() {
		$(this).addClass('on').siblings().removeClass('on');
	});*/

	$('.provice .shengName').each(function(){
		// debugger
		var shengName = $(this).text();
		$('.Select_the_province li span').each(function(){
			if($(this).text() == shengName){
				$(this).closest('li').addClass('on').find(':checkbox').prop("checked",true);
			}
		});
	});


	$('.Select_province1').empty();
	$('.Select_province2').empty();


	$('.quanbusheng').prop("checked",false);


});


function dataLoad() {
	// debugger;
	var area_key_list = ['北京市', '北京市 ', '海淀区'];
	var area_json = $.area_json['中国'];
	var area_selected = new Array(); //区域选中级别
	var area_selected_3 = new Array(); //区域选中级别
	$('.area_list_js').empty();
	var li_prev_html_selected = '<li class="ui-widget-content diqushezhi ui-selected"><span>';
	var li_prev_html = '<li class="ui-widget-content diqushezhi ui-selected"><span>';
	var img_prev_html = '</span><span class="select-wrap selece_option"></span><a class="choice"><input type="checkbox"';
	var img_prev_choiced_html = '</span><a class="choiced"><input type="checkbox"';
	var li_last_html = '/></a></li>';

	for (var i = 0; i < 3; i++) {
		for (var item in area_json) {
			if (area_key_list[i] == item) {
				$('.area_list_js').slice(i, i + 1).append(li_prev_html_selected + item + img_prev_html + li_last_html);
			} else {
				$('.area_list_js').slice(i, i + 1).append(li_prev_html + item + img_prev_html + li_last_html);
			}
		}
		area_json = area_json[area_key_list[i]];
	}

	$(".area-list-item1").find('.select-wrap').css('display', 'none');
	$(".area-list-item1").find('.ui-selected').removeClass('ui-selected');


	$('.area-list').off('click');
	$('.area-list').on('click', '.selectable li', function() {
		// alert('li');

		/*debugger

		if($(this).parents('.Select_the_procince2').length == 1){
			return;
		}*/

		// debugger
		// 改变背景色
		$(this).addClass('on').siblings().removeClass('on');

		var _this = $(this);
		var index = $('.area-list-item').index($(this).parents('.area-list-item'));

		// 更新下属区域
		var area_list = $.area_json['中国'];
		area_key_list[index] = $(this).find('span').text();

		for (var i = 0; i < index + 1; i++) {
			area_list = area_list[area_key_list[i]];
		}

		$(this).closest('.area-list-item').nextAll().find('.selectable').empty();
		// $(this).parents('.area-list-item').addClass('.selectable1 .ui-selected');
		var next_selectable = $(this).closest('.area-list-item').next().find('.selectable');

		var prev_text = '';
		var prev_all_div = _this.parents('.area-list-item').prevAll();
		for (var i = prev_all_div.length - 1; i >= 0; i--) {
			prev_text = prev_text + $(prev_all_div[i]).find('.ui-selected span').text() + '-';
		}

		for (var item in area_list) {
			var next_text = prev_text + area_key_list[index] + '-' + item;
			if (_this.find('a').hasClass('choiced') || $.inArray(next_text, area_selected) != -1) {
				next_selectable.append(li_prev_html + item + img_prev_choiced_html + li_last_html);
				// $('.area-list-item2').find('.ui-selected').css('background','#e7fff2');
				$(".area-list-item1").find('.select-wrap').remove().css('display', 'none');
				$(".area-list-item1").find('.ui-selected').removeClass('ui-selected');
			} else {
				next_selectable.append(li_prev_html + item + img_prev_html + li_last_html);
				// $('.area-list-item2').find('.ui-selected').css('background','#f5f9ff');
				$(".area-list-item1").find('.select-wrap').remove().css('display', 'none');
				$(".area-list-item1").find('.ui-selected').removeClass('ui-selected');
			}
		}


		if (_this.closest('.Select_province1').length == 1) {
			if (_this.find(':checkbox').is(':checked')) {
				// $(".Select_the_procince2 :checkbox").prop('checked', true);

				// getDistrict();

			} else {
				// $(".Select_the_procince2 :checkbox").prop('checked', false);
			}

		}


		if (_this.closest('.Select_province').length == 1){
			// console.log('sheng');
			$('.cityName').each(function(){
				// debugger
				var cityName = $(this).text();
				$('.Select_the_province1 li span').each(function(){
					if($(this).text() == cityName){
						$(this).closest('li').find(':checkbox').prop("checked",true);
					}
				})
			});
		}

		if (_this.closest('.Select_province1').length == 1){
			// console.log('quxian');
			var shi = _this.closest('li').find('span').text(); //alert(shi)
			var qx = $('.cityName:contains('+ shi +')').closest('.city-wrap').find('.district-wrap em'); 
			qx.each(function(){
				// debugger
				var quxian = $(this).text();
				$('.Select_province2 li span').each(function(){
					if($(this).text() == quxian){
						$(this).closest('li').find(':checkbox').prop("checked",true);
					}
				})
			});
		}

	});


	// 选择全国
	$('.quanguo').click(function(){
		if($(this).is(":checked")){
			// alert(1);
			$('.area-list :checked').not(this).prop('checked',false);
			$('.area-list li.on').removeClass('on');
			$('.region-wrap').html('<div class="region-item"><div class="row"><div class="provice"><span><em>全国</em><i class="x">×</i></span></div></div></div>');
			$('.Select_province1').empty();
			$('.Select_province2').empty();
		} else {
			// alert(2);
			$('.region-wrap').empty();
		}
	});


	// 选择省
	$('.Select_province').off('click');
	$('.Select_province').on('click', ".choice input", function(e) {
		
        // $(this).closest('li').click();
		var _this = $(this);
		// console.log(_this.length);

		$('.quanguo').prop('checked',false);
		$('.quanbushi').prop('checked',false);

		$('em:contains(全国)').closest('.region-item').remove();

		$('.quanbusheng').prop('checked',true);

		// debugger;
		var _this = $(this);
		var shengText = _this.closest('li').find('span').text();
		// var shengfzr = _this.closest('li').find('select').val();

		if (_this.is(':checked') == false) {
			// alert(1)
			$('.quanbusheng').prop("checked",false);
			$('.provice > span em').each(function(index, el) {
				// debugger;
				var _this = $(this),
					exsitProv = _this.text();

				if (exsitProv == shengText) {
					// alert(exsitProv);
					// alert(1);
					_this.next().click();
				}

			});

			return;
		}

		// console.log(shengText);
		if (shengText != "") {
			$('.region-wrap').append("<div class='region-item'><div class='row'><div class='provice'><span><em class='shengName' title="+ shengText +">" + shengText + "</em><i class='x'>×</i></span></div><div class='charge'></div></div><div class='allCity'>已选择全部市</div></div>");
		}

	});


	// 选择全部省
	$('.quanbusheng').off().click(function(){
		
		console.log('全省');
		if($(this).is(":checked")){
			// alert(1);return;
			// debugger;
			

			if($('.Select_the_province li.on :checkbox').is(":checked") == false){
				$('.Select_the_province li.on :checkbox').click();
				return;
			}



			$('.Select_the_province1 :checkbox').not(this).prop('checked',false);
			$('.quanbushi').prop('checked',false);
			$('.Select_province2').empty();

			var parentProv = $('.Select_province li.on span').text();
			$('.provice > span em').each(function(index, el) {
				// debugger;
				var _this = $(this),
					exsitProv = _this.text();

				if (exsitProv == parentProv) {
					// alert(exsitProv);
					_this.closest('.region-item').find('.city-wrap, .allCity').remove();
					_this.closest('.region-item').find('.row:eq(0)').after('<div class="allCity">已选择全部市</div>');

				}

			});


		} else {
			alert(2);
			// $('.Select_the_province1 :checkbox').not(this).prop('checked',false);
			var parentProv = $('.Select_province li.on span').text();
			$('.provice > span em').each(function(index, el) {
				// debugger;
				var _this = $(this),
					exsitProv = _this.text();

				if (exsitProv == parentProv) {
					// alert(exsitProv);
					// _this.closest('.region-item').find('.allCity').remove();

					$('.Select_the_province li.on :checkbox').click();
				}

			});
		}

	});

	// 选择市
	$('.Select_province1').off('click');
	$('.Select_province1').on('click', ".choice input", function(e) {
		// console.log('shi')
		// $(this).closest('li').click();
		var _this = $(this);
		// alert(_this.lenght)

		// alert(1)
		// debugger
		$('.quanbusheng').prop('checked',false);
		// $(".Select_the_province li.on").find(":checkbox").prop("checked",true);
		$('.quanbushi').prop('checked',true);


		// 如果取消所有省
		if($(".Select_province1 input[type=checkbox]:checked").length == 0){
			$(".Select_province li.on :checkbox").click();
			// $('.area-list li.on').removeClass('on');
			// $(".Select_province1 input[type=checkbox]").prop('disabled',true);
			$(".Select_province1").empty();
			return;
		}

		
		// 如果父级的省没有被选中
		if($('.Select_province li.on .choice input').is(":checked") == false){
			// alert(11111);

			$('.Select_province li.on .choice input').click();
			$('.quanbusheng').prop('checked',false);
			// console.log($(this).closest('li').find('span').text());
			var this_city = $(this).closest('li').find('span').text();
			$("span:contains("+ this_city +")").closest('li').find(":checkbox").click();

			return;
		}

		var parentProv = $(".Select_the_province li.on span").text();
		// alert(parentProv);
		var selectedshi = _this.closest('li').find('span').text();
		var shifzr = _this.closest('li').find('select').val();

		if (_this.is(':checked') == false) {
			$('.quanbushi').prop('checked',false);
			// alert('debugger')
			// debugger;
			$('.city > span em').each(function(index, el) {
				// debugger;
				var _this = $(this),
					exsitCity = _this.text();

				if (exsitCity == selectedshi) {
					// alert(exsitCity);
					// alert(1);
					_this.next().click();
				}

			});

			return;
		}

		$('.provice > span em').each(function(index, el) {
			// debugger;
			var _this = $(this),
				exsitProv = _this.text();

			if (exsitProv == parentProv) {
				// alert(exsitProv);
				
				_this.closest('.region-item').find('.allCity').remove();
				_this.closest('.region-item').find('em:contains('+ selectedshi +')').closest('.city-wrap').remove();
				_this.closest('.region-item').append("<div class='row city-wrap'><div class='city city-item'><span><em class='cityName'>" + selectedshi + "</em><i class='x'>&times;</i></span></div><div class='charge'></div></div>");
			}

		});

	});


	// 区县全选（全市）
	$('.quanbushi').off('click');
	$('.quanbushi').click(function(){
		// console.log('quanshi');
		if($(this).is(":checked")){
			// alert(1);
			$('.Select_province2 :checkbox').prop('checked',true);
			// $('.Select_province1 li.on :checkbox').prop('checked',true);
			$('.Select_province1 li.on :checkbox').click();
			// getDistrict();

		} else {
			// alert(2);
			$('.Select_province2 :checkbox').prop('checked',false);
			$('.Select_province1 li.on :checkbox').prop('checked',false);
			
			var parentCity = $('.Select_province1 li.on span').text();
			$('.cityName').each(function() {

				if ($(this).text() == parentCity) {
					// alert(exsitCity);
					$(this).closest('.city-wrap').remove();
				}

			});

		}

	});

	
	// 选择区县
	$('.Select_province2').off('click');
	$('.Select_province2').on('click', ".choice input", function(e) {//console.log('quxian')
		// alert(1);
		


		// 如果父级的市没有被选中
		/*if($('.Select_province1 li.on .choice input').is(":checked") == false){
			// alert(11111);

			$('.Select_province1 li.on .choice input').click();
			// $('.quanbusheng').prop('checked',false);
			// console.log($(this).closest('li').find('span').text());
			$('.quanbushi').prop('checked',false);
			$('.Select_province2 :checkbox').prop('checked',false);

			var this_quxian = $(this).closest('li').find('span').text();
			// alert(this_quxian);
			$('.cityName').each(function(){
				if($(this).text() == $('.Select_province1 li.on span').text()){
					alert(1);
				} else {

				}
			});

			$("span:contains("+ this_quxian +")").closest('li').find(":checkbox").click();

			return;
		}*/
		var _this = $(this);
		var quXian= _this.closest('li').find('span').text();
		if(_this.closest('.county').find(":checked").length != 0){
			// alert(1);

			// $('.Select_province1 li.on :checkbox').click();
			
				// debugger;
			$('.quanbushi').prop('checked',false);
			$('.quanbusheng').prop('checked',false);// debugger;

			if($('.Select_province li.on :checkbox').is(":checked") == false){
				// debugger
				if($('.Select_province1 li.on :checkbox').is(":checked") == false){
					// debugger
					_this.prop('checked',false);
					$('.Select_province1 li.on :checkbox').click();	
					$('span:contains('+ quXian +')').next().find(':checkbox').click();
					return;
				}
			}

			$('.Select_province1 li.on :checkbox').prop('checked',true);

			var parentProv = $('.Select_province li.on span').text();
			var selectedshi = $('.Select_province1 li.on span').text();
			var shifzr = $('.Select_province1 li.on select').val();

			$('.provice > span em').each(function(index, el) {
				// debugger;
				var _this = $(this),
					exsitProv = _this.text();

				if (exsitProv == parentProv) {
					// alert(exsitProv);
					
					/*var selectedshi = "";
					var cityName = _this.closest('.region-item').find('.cityName');
					cityName.each(function(){
						// debugger
						var _this = $(this);
						var exsitCity = _this.text();
						$('.Select_province1 li.on span').each(function(){
							// debugger;
							var parentCity = $(this).text();
							if(parentCity == exsitCity){
								selectedshi = parentCity;
								// alert(1);
							} else{
								// alert(2);
							}

						});

					});*/

					_this.closest('.region-item').find('.allCity').remove();
					// _this.closest('.region-item').find('.city-wrap').remove();
					_this.closest('.region-item').find('.cityName:contains('+ selectedshi +')').closest('.city-wrap').remove();
					
					_this.closest('.region-item').append("<div class='row city-wrap'><div class='city city-item'><span><em class='cityName'>" + selectedshi + "</em><i class='x'>&times;</i></span></div><div class='charge'><div class='district-wrap'>"+ getDistrictHtml() +"</div></div></div>");

					// $('.cityName').each(function(i,item){
					// 	if($(this).text() == $('.cityName').eq(i + 1).text()){
					// 		alert($(this).text())
					// 	} 
					// });

				}

			});

		} else {
			// alert(2);
			$('.Select_province1 li.on :checkbox').prop('checked',false);

			var parentCity = $('.Select_province1 li.on span').text();
			$('.cityName').each(function(index, el) {
				if ($(this).text() == parentCity) {
					$(this).next().click();
				}

			});
		}

		// getDistrict();

	});






	function getDistrict() {

		// debugger;
		var xian = "";
		$('.Select_province2 li :checkbox').each(function() {
			if ($(this).is(":checked") == true) {
				var selected = $(this).parent().prev().text();
				// console.log(selected);
				xian += "<span><em>" + selected + "</em><i class='x'>×</i></span>";
			}
		});

		var parentCity = $(".Select_the_province1 li.on span").text();
		// alert(parentCity);
		// var selectedshi = $(this).closest('li').find('span').text();
		// var shifzr = $(this).closest('li').find('select').val();

		$('.city > span em').each(function(index, el) {
			// debugger;
			var _this = $(this),
				exsitCity = _this.text();

			if (exsitCity == parentCity) {
				// alert(exsitCity);
				// _this.closest('.region-item').find('.row:eq(1) .charge .district-wrap').remove();
				// _this.closest('.region-item').find('.row:eq(1) .charge').append("<div class='district-wrap' value="+ parentCity +">"+ xian +"</div>");
				_this.closest('.row').find('.charge .district-wrap').remove();
				_this.closest('.row').find('.charge').append("<div class='district-wrap' value=" + parentCity + ">" + xian + "</div>");
			}

		});

	}

	function getDistrictHtml(){
		var xian = "";
		$('.Select_province2 li :checkbox').each(function() {
			if ($(this).is(":checked") == true) {
				var selected = $(this).parent().prev().text();
				// console.log(selected);
				xian += "<span><em>" + selected + "</em><i class='x'>×</i></span>";
			}
		});
		return xian;
	}


	/*// 选择省负责人
	$('.Select_the_province').on("change", "select",function(event) {
		event.stopPropagation();

		// alert($(this).val());
		var _this = $(this);
		var provfzr = _this.closest('li.on').find('span').text();


		$('.provice > span em').each(function(index, el) {
			// debugger;
			var _ths = $(this),
				exsitProv = _ths.text();

			if (exsitProv == provfzr) {
				// alert(exsitProv);
				_ths.closest('.row').find('.charge em').text(_this.val())
			}

		});

	});*/


	// 选择市负责人
	/*$('.Select_the_province1').on("change", "select",function(event) {
		// event.stopPropagation();

		// alert($(this).val());
		var _this = $(this);
		var cityfzr = _this.closest('li.on').find('span').text();

		$('.city-item .cityName').each(function(index, el) {
			// debugger;
			var _ths = $(this),
				exsitCity = _ths.text();

			if (exsitCity == cityfzr) {
				// alert(exsitCity);
				_ths.closest('.row').find('.charge-name em').text(_this.val())
			}

		});
		
	});*/



}

$("#count").click(function(){
	$('.area-list .save').click();
});

$('.area-list .save').off('click');
$('.area-list .save').click(function() {

	/*if ($('.Select_province :checkbox').is(':checked') == false) {
		layer.msg('请选择省份');
		return;
	}*/

	// if($('.Select_province .ui-selected.on span').siblings('a').find('input').is(':checked') == false){
	// 	layer.msg('请选择省份1');
	// 	return;
	// }
	/*var sheng = $('.Select_province .ui-selected.on span').text();
	var shengfzr = $('.Select_province .ui-selected.on .select-wrap').val();

	var shi = $('.Select_province1 .ui-selected.on span').text();
	var shifzr = $('.Select_province1 .ui-selected.on .select-wrap').val();

	if (sheng != "") {
		$('.region-wrap').append("<div class='region-item'><div class='row'><div class='provice'><span>" + sheng + "<i class='x'>×</i></span></div></div></div>");
	}


	$('.region-wrap').append("<div class='region-item'><div class='row'><div class='provice'><span>" + sheng + "<i class='x'>×</i></span></div><div class='charge '><span class='charge-name'>" + shengfzr + "<i class='x'>×</i></span></div></div><div class='row'><div class='city '><span>" + shi + "<i class='x'>×</i></span></div><div class='charge wAuto'><div>" + shifzr + "<i class='x'>×</i></div><div class='district-wrap'><span>县县县<i class='x'>×</i></span></div></div></div></div>");

	var quxianArr = [];
	var qx = $('.Select_the_procince2 .Select_province2 li :checked').parent().prev();
	qx.each(function(index, el) {
		quxianArr.push($(this).text());
		// if($(this).hasClass('on')){
		// $('.district-wrap').last().append('<span>'+ $(this).text() +'<i class="x">×</i></span>')
		// }
	});*/

	// console.log(sheng)
	// console.log(shengfzr)
	// console.log(shi)
	// console.log(shifzr)
	// console.log(quxianArr)
	// alert(2)

	// areaObj = {};
	

	var areaObj = {};
		areaObj["area"] = [];

	var provArr = [];
	var provObj = {};
	$('.region-item').each(function(){
		var _this = $(this);

		var sheng = _this.find('.provice span em').text();
		// var shengfzr = _this.find('.charge > span em').text();

		if($('.quanbusheng').is(":checked")){

			provObj = {
				// "charge": shengfzr,
				"name": sheng,
				"city": []
			}

		} else {
			
			var cityArr = [];
			var cityObj = {};
			_this.find('.city-wrap').each(function(){

				// debugger;
				var shi = $.trim($(this).find('.cityName').text());
				// var shifzr = $(this).find('.charge-name em').text();

				var quxianArr = [];
				$(this).find('.district-wrap span em').each(function(){
					quxianArr.push($(this).text());
				});

				cityObj = {
					// "charge": shifzr,
					"name": shi,
					"country": quxianArr
				}

				cityArr.push(cityObj);

			});

			provObj = {
				// "charge": shengfzr,
				"name": sheng,
				"city": cityArr
			}
		}

		// provArr.push(provObj);
		// alert(JSON.stringify(provObj, null, 4));

		areaObj["area"].push(provObj);

	});

	$('.area_val').val(JSON.stringify(areaObj, null, 4));
	console.log(JSON.stringify(areaObj, null, 4));

	// "area_condition": [
	//       [
	//           {
	//               "charge": "",
	//               "name": "",
	//               "city": [
	//                   {
	//                       "charge": "",
	//                       "name": "",
	//                       "country": []
	//                   }
	//               ]
	//           }
	//       ]
	// ],

	// return;
	$('.layui-layer-close').click();


});


$('.btn.clear').click(function(){
	$('.area-list :checkbox').prop('checked',false);
	$('.region-wrap').empty();
	$('.area_val ').empty();
});
	

$('.zhiding').click(function(){

	$(this).toggleClass('on');
	if($(this).hasClass('on')){
		// debugger
		var sheng = $('.Select_province li input:checked').closest('li').stop().slideUp(300).clone(true).addClass('clone');
		$(sheng).prependTo('.Select_province');

		var shi = $('.Select_province1 li input:checked').closest('li').stop().slideUp(300).clone(true).addClass('clone');
		$(shi).prependTo('.Select_province1');


	} else {
		// debugger
		
		$('.Select_province li.clone').remove();
		$('.Select_province1 li.clone').remove();
		$('.Select_province li').stop().slideDown(300);
		$('.Select_province1 li').stop().slideDown(300);

		
	}

});