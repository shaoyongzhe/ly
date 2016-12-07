// 导航切换
$("nav span").click(function(){
	var cur = $(this).index();
	$(this).addClass("on").siblings().removeClass('on');
	$('.sec').eq(cur).show().siblings('.sec').hide();
});


// 点击遮罩关闭
$('body').on('click','.layui-layer-shade',function(){
	$('.layui-layer-close').click();
});


// 点击按钮组图标
$('table.notify').on('click','.handle-icon',function(e){
	e.stopPropagation();

	// $(this).toggleClass('on').parents('tr').siblings().find('.handle-icon').removeClass('on');

	$(this).toggleClass('on');
	$(".handle-icon").not(this).removeClass('on');

});


$(document).click(function(){
	$('.handle-icon').removeClass('on');
});


function getList( curr, handle, searchForm ){

	if(curr == undefined || curr == ""){
		curr = 1;
	}

	var df = {};
	// if(searchForm){
	if(handle=='search'){
		df = searchForm;
	} else {
		df = null;
	}

	var pagesize = 6;
	var url = 'http://192.168.1.102:56009/webapi/notify/template?pageindex=' + curr +'&pagesize=' + pagesize;
	_ajax("get", url, df, '刷新列表', function(data) {

		if(data.error){
			layer.msg('暂无数据');
			return;
		}

		$(".totalcount").text(data.totalcount);
		$("table.notify tbody").empty();

		var isSet = "",
		autoW = "",
		tr = "",
		td = data.content;
		for(var i=0; i < td.length; i++){

			if(td[i].currentflag == 0){
				td[i].currentflag = "未启用";
				isSet = "<span class='btn open'>启用</span><span class='btn del' title='删除'>删除</span>";
				autoW = "183";
			} else {
				td[i].currentflag = "已启用";
				isSet = "";
				autoW = "75";
			}

			// var isHtml;
			var contentFormat = "";
			try {
				var obj = JSON.parse(td[i].content);
				contentFormat = JSON.stringify(obj, null, 4);
				// isHtml = false;
			} catch(e) {
				// console.log(e);
				contentFormat = td[i].content;
				// isHtml = true;
				// $('.cont').addClass('on')
			}

			//<td><input type='checkbox' name='' value=''></td>
			tr += "<tr class='text-c'><td><input type='hidden' class='guid' value="+ td[i].guid +">"+td[i].title
			+"</td><td class='templateid'>"+td[i].templateid
			+"</td><td>"+td[i].firsttype
			+"</td><td>"+td[i].secondtype
			+"</td><td title='"+ contentFormat +"'><span class='content'>"+td[i].content
			+"</span></td><td>"+td[i].description
			// +"</td><td>"+td[i].state
			+"</td><td class='state'>"+td[i].currentflag
			+"</td><td>"+td[i].version
			+" </td><td><div class='handle'><div class='handle-icon'></div><div class='handle-btns-wrap' style='width:"+ autoW +"px'><div class='handle-btns'>"+ isSet +"<span class='arrow-right'></span><span class='btn modify'>修改</span></div></div></div></td></tr>";
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

		$('td span.content').each(function(){
			$(this).text($(this).html())
		});

		// 显示分页
		laypage({
			cont: 'pager',
			pages: data.pagecount,
			curr: curr || 1,
			skip: true,
			jump: function(obj, first){

				if(!first){
					
					layer.msg('第'+ obj.curr +'页加载中...');
					if(handle=='search'){
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

					getList(obj.curr,'page');

					/*if(handle=='open'){
						layer.msg('正在查询...',{time:0});
						getList(obj.curr, 'search');
					}*/

				}

			}

		});

		if(handle){

			$('.layui-layer-close').click();

			if(handle=='add'){
				layer.msg("新增成功");
				return;
			}

			if(handle=='del'){
				layer.msg("删除成功");
				return;
			}

			/*if(handle=='edit'){
				layer.msg("修改成功");
			}*/

			/*if(handle=='search'){
				layer.msg("查询成功");
			}*/

			/*if(handle=='open'){
				layer.msg("已开启为当前使用模板");
			}*/

			if(handle=='page'){
				layer.msg("加载成功");
				return;
			}

			layer.msg("操作成功");

		}

		

	});

};


function getType(){

	_ajax("get", 'http://192.168.1.102:56009/webapi/notify/template/gettype', null, "获取类型", function(data) {

		for (var key in data.firsttype) {
		   $('.first-type, .firsttype').append("<option data-key="+ key +">"+ data.firsttype[key] +"</option>");
		}

		for(var key in data){
			for(var i=0; i<data[key].length; i++ ){
				$('body').append('<i class='+ key +'><i>'+ data[key][i].secondtype +'</i><i>'+ data[key][i].secondname +'</i></i>');
			}
		}

		$('.first-type').change(function(){
			var key = $(this).find('option:selected').attr('data-key');

			// $('.second-type').empty();
			$('.second-type').children(":not('option:first')").remove()
			$('.' + key).each(function(){
				// console.log($(this).html());
				var secondtype = $(this).find('i').first().html();
				var secondname = $(this).find('i').last().html();
				$('.second-type').append('<option key='+ secondtype +'>'+ secondname +'</option>');
			});

			$('.second-type option').eq(1).attr('selected',true)

		});

		// $('.first-type').change();


		$('.firsttype').change(function(){
			var key = $(this).find('option:selected').attr('data-key');

			$('.secondtype').empty();
			// $('.secondtype').children(":not('option:first')").remove()
			$('.' + key).each(function(){
				var secondtype = $(this).find('i').first().html();
				var secondname = $(this).find('i').last().html();
				$('.secondtype').append('<option key='+ secondtype +'>'+ secondname +'</option>');
			});

			if(key != "wechat"){
				getguid();
			} else {
				$(".addForm .templateid").val("");
			}

		});

		// $('.firsttype').change();

	});

}

$(function(){
	
	$("nav span").first().click();

	getList();
	getType();

});

function getguid(){

	_ajax("GET", 'http://192.168.1.102:56009/webapi/notify/template/getguid', null, "getguid", function(guid) {
		$(".addForm .templateid").val(guid);
	});

}

// 新增
$(".add").click(function(){
	$('.addForm').show();

	layer.open({
		type: 1,
		// shift: 4,
		moveType:2,
		title: "新增通知模板",
		area: [500],
		content: $('.addForm'),
	});

});


// 新增提交
$('.add-btn').click(function(){

	var title = $('.addForm .title').val();
	// var content = $('.addForm .content').val();
		// content = encodeURIComponent(content);

	var addForm = {
		title: $('.addForm .title').val(),
		templateid: $('.addForm .templateid').val(),
		dataexample: $('.addForm .dataexample').val(),
		firsttype: $('.addForm .firsttype :selected').attr('data-key'),
		secondtype: $('.addForm .secondtype :selected').attr('key'),
		content: $('.addForm .content').val(),
		description: $('.addForm .description').val(),
		state: "state"
	}

	// console.log(addForm);//return;

	if(addForm.title==""){
		layer.msg('请输入模板名称');
		return;
	}

	if(addForm.dataexample==""){
		layer.msg('请输入数据示例');
		return;
	}

	if(addForm.firsttype == undefined){
		layer.msg('请选择模板一级类型');
		return;
	}

	if(addForm.secondtype == undefined){
		layer.msg('请选择模板二级类型');
		return;
	}

	if(addForm.content == ""){
		layer.msg('请输入内容');
		return;
	}

	if(addForm.description == ""){
		layer.msg('请输入描述');
		return;
	}

	// console.log(addForm);
	// return;

	// var content = $('textarea.content');
	try{

		var obj = JSON.parse(addForm.content);
		var html = "";
		for(var key in obj){
			html = obj[key];
			html = html.replace(/[<]/g,"&lt;");
			html = html.replace(/[>]/g,"&gt;");
			// html = html.replace(/[']/g,"");
			html = html.replace(/[ ]/g,"&nbsp;");
			// console.log(html);//return
			obj[key] = html;
		}

		var str = $.trim(JSON.stringify(obj));
		addForm['content'] = str;
		// content.removeClass('border-warn');
		// return;

	} catch(e) {
		
		// layer.msg('请输入JSON格式的数据');
		// content.addClass('border-warn');
		// return;

	}


	// return;
	$('.layui-layer-close').click();
	layer.msg( '正在新增...',{time:0});

	_ajax("POST", "http://192.168.1.102:56009/webapi/notify/template/", addForm, '新增', function(){
    	// var cur = $('.laypage_curr').text();
        // getList(cur,'add');
        getList(1,'add');
    });

});


// 单行删除
$('table.notify').on('click', 'span.del', function(){

	var thisTr = $(this).parents("tr");
	var guid = thisTr.find('.guid').val();

	layer.confirm('确定要删除吗？', {
		btn: ['确定','取消']

	}, function(){

		layer.msg('正在删除...', {time: 0} );

        _ajax("DELETE", "http://192.168.1.102:56009/webapi/notify/template/" + guid, null, '删除', function(){

			var cur = $('.laypage_curr').text();

			if(cur){

				if($('table.notify tbody tr').length == 1){
					cur -= 1;
					if(cur <= 0){
						cur = 1;
					}
				}

			}

			/*else {
				thisTr.remove();
				layer.msg("删除成功");
				return;
			}*/

			getList(cur,'del');

        });

	});

});


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


// 单行修改	弹出插件本身
$('table.notify').on('click','.modify',function(){

	var tr = $(this).parents('tr');
	var trIndex = $(this).parents('tr').index();
	$('#trIndex').val(trIndex);

	var data = {
		guid: tr.find('td:eq(0) .guid').val(),
		title: tr.find('td:eq(0)').text(),
		templateid: tr.find('td:eq(1)').text(),
		firsttype: tr.find('td:eq(2)').text(),
		secondtype: tr.find('td:eq(3)').text(),
		content: tr.find('td:eq(4)').text(),
		description: tr.find('td:eq(5)').text(),
		state: tr.find('td:eq(6)').text(),
	};

	try {

		var contentObj = JSON.parse(data.content);
		data.content = contentObj;

	} catch(e) {
		// console.log(e);
		// alert(data.content);
	}

	var jsonStr =JSON.stringify(data,null,4);
	$('#add').val(jsonStr);
	// return;

	var index = layer.open({

		type: 2,
		title: '修改',
		area: ['90%',"80%"],
		maxmin: true,
		content: 'json/index.html',

	});

});


// 查询
$(".search-btn").click(function(){

	layer.msg('正在查询...',{time:0});
	getList(1, 'search', getSearchForm());

});

// 获取查询数据
function getSearchForm(){

	var searchForm = {
		title: $('.search-area .title').val(),
		templateid: $('.search-area .templateid').val(),
		firsttype: $('.search-area .first-type :selected').attr('data-key'),
		secondtype: $('.search-area .second-type :selected').attr('key')
	}

	// console.log(searchForm);//return
	if(searchForm.firsttype == "-- 请选择 --"){
		searchForm.firsttype == "";
	}

	if(searchForm.secondtype == "-- 请选择 --"){
		searchForm.secondtype == "";
	}
	return searchForm;

}

$("#refresh").click(function(){
	getList();
});

// 设置为当前使用模板
$('table').on('click','.open',function(){
	
    layer.msg('开启中...',{time:0});
    var thisTr = $(this).parents('tr');
	var guid = thisTr.find('.guid').val();
	var state = thisTr.find('.state');
	// state.text("已启用");return
	_ajax('PUT', 'http://192.168.1.102:56009/webapi/notify/template/' + guid, null, "设置为当前使用模板", function(data) {

		if(data.error == ""){

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


var _ajax = function(type, url, data, tip, success){

	$.ajax({

        type: type,
        url: url,
        dataType: "json",
        data: data,

        beforeSend: function () {
        	// $('.pager-wrap').fadeOut(1000);
        },
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