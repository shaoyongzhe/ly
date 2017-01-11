
var linshi = '';
var linshiCharge="";
var linshiStatus="";
var statusData="";//储存statusAjax()返回的数据。
/*模拟下拉*/
//$('body').on("click",".selectLWrapL",function(e){
$('.selectLWrapL').click(function(e){	
	e.stopPropagation();
	$(this).find('.selectL').toggle();//用于切换ul的显示隐藏
	$(".selectLWrapL").not(this).find('.selectL').hide();//点此关别		
	$(".qC_activityArea").not(this).find('ul').hide();//点此关城市列表	
	
});		
$('.selectL').on("click",".optionL",function(e){
//$('.selectL .optionL').click(function(e){
	e.stopPropagation();
	$(this).parent().prev().text($(this).text());//把li的内容放入em
	$(this).parent().hide();//点击li的时候隐藏ul
});	
$(document).click(function(){
	$('.selectL').hide();
});


/*起始时间laydate控件*/
var dataStart = {
  elem: '#dataStart',
  format: 'YYYY-MM-DD',
//min: laydate.now(), //设定最小日期为当前日期
  max: '2099-06-16', //最大日期
  istime: true,
  istoday: false,//是否显示今天这个按钮
  start: laydate.now(),  //开始日期
  choose: function(datas){
     dataEnd.min = datas; //开始日选好后，重置结束日的最小日期
     dataEnd.start = datas //将结束日的初始值设定为开始日
  }
};
var dataEnd = {
  elem: '#dataEnd',
  format: 'YYYY-MM-DD',
//min: laydate.now(),
  max: '2099-06-16',
  istime: true,
  istoday: false,
  start: laydate.now(),  //开始日期********************不方便就注释掉//不注释掉发现也么有用
  choose: function(datas){
    dataStart.max = datas; //结束日选好后，重置开始日的最大日期
  }
};
laydate(dataStart);
laydate(dataEnd);

/*查询按钮*/
var condition={}
$(".queryConditionButton .query").click(function(){
	/*判断是否输入了查询条件*/
	if($(".qC_aitivityTopic input").val()==""&&$(".qC_number input").val()==""&&$(".qC_principal .selectLedL").text()=="请选择"&&$(".qC_activityTime input:eq(0)").val()==""&&$(".qC_activityTime input:eq(1)").val()==""&&$(".qC_subsidyReleased input:eq(0)").val()==""&&$(".qC_subsidyReleased input:eq(1)").val()==""&&$(".qC_joinVipNumber input:eq(0)").val()==""&&$(".qC_joinVipNumber input:eq(1)").val()==""&&$("#gf-province em").text()=="省"&&$("#gf-city em").text()=="市"&&$("#gf-area em").text()=="区"&&$(".qC_activityBudget input:eq(0)").val()==""&&$(".qC_activityBudget input:eq(1)").val()==""&&$(".qC_status .selectLedL").text()=="请选择"){
		layer.alert('请输入查询条件', {icon: 5});
		return;
	}
	/*判断查询条件是否成对*/
	//活动时间
	if(($(".qC_activityTime input:eq(0)").val()==""&&$(".qC_activityTime input:eq(1)").val()!="")||($(".qC_activityTime input:eq(0)").val()!=""&&$(".qC_activityTime input:eq(1)").val()=="")){
		layer.alert('查询时间，需要成对出现', {icon: 5});
		return;
	}
	//已发放补贴金额
	if(($(".qC_subsidyReleased input:eq(0)").val()==""&&$(".qC_subsidyReleased input:eq(1)").val()!="")||($(".qC_subsidyReleased input:eq(0)").val()!=""&&$(".qC_subsidyReleased input:eq(1)").val()=="")){
		layer.alert('已发放补贴金额，需要成对出现', {icon: 5});
		return;
	}
	//参与会员数量
	if(($(".qC_joinVipNumber input:eq(0)").val()==""&&$(".qC_joinVipNumber input:eq(1)").val()!="")||($(".qC_joinVipNumber input:eq(0)").val()!=""&&$(".qC_joinVipNumber input:eq(1)").val()=="")){
		layer.alert('参与会员数量，需要成对出现', {icon: 5});
		return;
	}
	//活动预算
	//暂时不需要
	
	
	//负责人
	var charge="";
	if($(".qC_principal .selectLedL").text()=="请选择"){
		charge="";
	}else{
		charge=$(".qC_principal .selectLedL").text();
	}
	//活动时间
	var times="";
	if($(".qC_activityTime input:eq(0)").val()==""&&$(".qC_activityTime input:eq(1)").val()==""){
		times="";
	}else{
//		times='"'+$(".qC_activityTime input:eq(0)").val()+'","'+$(".qC_activityTime input:eq(1)").val()+'"';
		times=$(".qC_activityTime input:eq(0)").val()+','+$(".qC_activityTime input:eq(1)").val();
	}
	//已发放补贴金额
	var subsidy="";
	if($(".qC_subsidyReleased input:eq(0)").val()==""&&$(".qC_subsidyReleased input:eq(1)").val()==""){
		subsidy="";
	}else{
		subsidy=$(".qC_subsidyReleased input:eq(0)").val()+','+$(".qC_subsidyReleased input:eq(1)").val();
	}
	//参与会员数量
	var membercount="";
	if($(".qC_joinVipNumber input:eq(0)").val()==""&&$(".qC_joinVipNumber input:eq(1)").val()==""){
		membercount="";
	}else{
		membercount=$(".qC_joinVipNumber input:eq(0)").val()+','+$(".qC_joinVipNumber input:eq(1)").val();
	}
	//活动区域
	var districthash='';
	if($("#gf-province em").text()=="省"&&$("#gf-city em").text()=="市"&&$("#gf-area em").text()=="区"){
		districthash='';
	}else{
		districthash=$("#gf-province em").text()+","+$("#gf-city em").text()+","+$("#gf-area em").text();
	}	
	//状态
	var state="";
	if($(".qC_status .selectLedL").text()=="请选择"){
		state="";
	}else{
		state=$(".qC_status .selectLedL").text();
	}
	//活动预算
	//暂时不需要
	console.log("点击查询了，现在可以在控制台查询变量condition")
	condition={
		activitytitle:$(".qC_aitivityTopic input").val(),
		activitycode:$(".qC_number input").val(),
		charge:charge,
		times:times,
		subsidy:subsidy,
		membercount:membercount,
		districthash:districthash,
		state:state,
	}
	if(statusData==""){
		layer.alert('数据加载中，请稍后重试', {icon: 1});
		return;
	}
	/*活动列表*/
	$.ajax({
		type:"get",
		url:"/webapi/ipaloma/topic/list/query",
		async:true,
		data:condition,
		success:function(data){
		    if(data.error)
		        layer.alert(data.error);

			console.log('success')
			linshi=data;

			var activityListThead='';//表格Thead
			var activityListTbody='';//表格Tbody
			//表格Thead
			activityListThead+='<tr>'
			+'<th><p class="checkBox"></p></th>'
			+'<th>活动编号</th>'
			+'<th>活动主题</th>'
			+'<th>活动时间</th>'
			+'<th>活动区域及负责人</th>'
			+'<th>预计可参与活动的会员数量</th>'
			+'<th>已参加会员数量</th>'
//				+='<th>申报预算</th>'//哲哥说先不要这个
//				+='<th>审批预算/状态</th>'//哲哥说先不要这个
//				+='<th>已发放补贴</th>'//哲哥说先不要这个
			+'<th>状态</th>'
			+'<th class="last">操作</th>'
			+'<th style="display:none;">guid</th>'
			+'</tr>';
			$(".activityList thead").empty();
			$(".activityList thead").append(activityListThead);
		    //表格Tbody
			var contentBody = data.content;
			for(i=0;i<contentBody.length;i++){	
				var stateHtml='';
				//拼按钮
				for(var key in statusData){//暂不用for，防止数据变化还得换回for in//遍历所有的statusData
//					console.log(statusData[key].state);
				    if (statusData[key].state == contentBody[i].state) {
//						console.log("iff")						
						for(j=0;j<statusData[key].ops.length;j++){
//							debugger
							//判断是否是最后一个，决定是否有右border
							if(j<statusData[key].ops.length-1){
								stateHtml+='<p class="menuElement">';
							}else if(j==statusData[key].ops.length-1){//最后一个不要右border
								stateHtml+='<p class="menuElement" style="border:0px;">';								
							}							
							//判断其内容是什么，给对应的图标
							if(statusData[key].ops[j]=="保存"){
								stateHtml+='<i class="Hui-iconfont">&#xe632;</i>';
							}else if(statusData[key].ops[j]=="提交审核"){
								stateHtml+='<i class="Hui-iconfont">&#xe6e0;</i>';
							}else if(statusData[key].ops[j]=="审核通过"){
								stateHtml+='<i class="Hui-iconfont">&#xe6e1;</i>';
							}else if(statusData[key].ops[j]=="审核失败"){
								stateHtml+='<i class="Hui-iconfont">&#xe6dd;</i>';
							}else if(statusData[key].ops[j]=="立即发布"){
								stateHtml+='<i class="Hui-iconfont">&#xe603;</i>';
							}else if(statusData[key].ops[j]=="删除"){
								stateHtml+='<i class="Hui-iconfont">&#xe6e2;</i>';
							}else if(statusData[key].ops[j]=="下架"){
								stateHtml+='<i class="Hui-iconfont">&#xe6de;</i>';
							}else if(statusData[key].ops[j]=="上架"){
								stateHtml+='<i class="Hui-iconfont">&#xe6de;</i>';
							}else if(statusData[key].ops[j]=="修改"){
								stateHtml+='<i class="Hui-iconfont">&#xe6de;</i>';
							}else if(statusData[key].ops[j]=="详细"){
								stateHtml+='<i class="Hui-iconfont">&#xe6dc;</i>';
							}
							stateHtml+="<span class='handle "+statusData[key].ops[j]+"'>"+statusData[key].ops[j]+"</span>";
							stateHtml+='</p>';
						}
					}
				}
				if(stateHtml==''){
					stateHtml='<p class="menuElement" style="border:0px;"><span>不可操作</span></p>'
				}
				activityListTbody+='<tr guid='+contentBody[i].guid+'>'
				+'<td><p class="checkBox"></p></td>'
				+'<td class="activityCode">'+contentBody[i].activitycode+'</td>'
				+ '<td class="activitytitle">' + contentBody[i].activitytitle + '</td>'
				+ '<td class="activityTime">' + contentBody[i].begintime + '-' + contentBody[i].endtime + '</td>'
				+ '<td class="activityAreaAndCharge">' + JointDistrict(contentBody[i]["district"]) + '</td>'
				+ '<td class="estimateJoinVipQuantity">' + contentBody[i].membercount + '</td>'
				+ '<td class="JoinedVipQuantity">' + contentBody[i].alreadyinmembercount + '</td>'
//				+='<td class="declareBudget">'+data[i].xxxxxx+'</td>'//哲哥说先不要这个
//				+='<td><p class="approvalBudget">1</p><p class="_status">2</p>'+data[i].xxxxxx+'</td>'//哲哥说先不要这个
//				+='<td class="provideSubsidy">'+data[i].xxxxxx+'</td>'//哲哥说先不要这个
				+ '<td class="state">' + contentBody[i].state + '</td>'
				//具体的操作内容见
				+'<td class="edit last"><img src="img/iconss1.png" alt="" /><div class="menu"><div class="menuArrow"></div><div class="menuContent">'+stateHtml+'</div></div></td>'
				+ '<td style="display:none;">' + contentBody[i].guid + '</td>'
				+'</tr>';
			}			
			$(".activityList tbody").empty();
			$(".activityList tbody").append(activityListTbody+'</tr>');
			/*拼接完毕，开始事件*/
			//隐藏所有按钮详情
			$(".edit .menu").hide();
			//点击按钮，显示
			
		},
		error:function(data){
			linshi=data;
			layer.alert('获取活动列表失败:错误'+data.status, {icon: 5});
		},
	});
});

/*负责人*/
chargeAjax()
function chargeAjax(){
	$.ajax({
		type:"get",
		url:"/webapi/ipaloma/topic/charge",
		async:true,
		success:function(data){
			linshiCharge=data;
//			var chargeHtml='<li guid="" class="optionL">请选择</li>';//用于拼接
			var chargeHtml='';//用于拼接
			for(i=0;i<data.content.length;i++){
				chargeHtml+='<li guid="'+data.content[i].guid+'" class="optionL">'+data.content[i].name+'</li>'
			}
			$(".qC_principal .selectL").empty().append(chargeHtml);
			
		},
		error:function(data){
			linshiCharge=data;
			layer.alert('获取负责人失败:错误'+data.status, {icon: 5});
		}
	});
}
/*状态*/
statusAjax()
function statusAjax(){
	$.ajax({
		type:"get",
		url:"/webapi/ipaloma/topic/stateconfig",
		async:true,
		success:function(data){
			linshiStatus=data;
			statusData=data;
//			console.log(data)
			var chargeHtml="";//用于拼接
			for(i=0;i<data.length;i++){
				chargeHtml+='<li class="optionL">'+data[i].state+'</li>'
			}
			$(".qC_status .selectL").empty().append(chargeHtml);
			
		},
		error:function(data){
			linshiCharge=data;
			layer.alert('获取负责人失败:错误'+data.status, {icon: 5});
		}
	});
}

/*区域信息拼接*/
function JointDistrict(districts)
{
    var queryResult = $.Enumerable.From(districts)
    .Select(function (x) { return x["name"] })
    .ToArray();
    return queryResult.join(" - ");
    
}
/**/

/*新增按钮*/
$(".addButton").click(function(){
	window.location.href="CreateActivity.html";
})
/*打印按钮*/
$(".printButton").click(function(){
	layer.alert("暂不支持此功能，相关页面为完善")
})


/*表格th复选框*/
$(document).on("click",".activityList thead .checkBox",function(){
//$(".activityList thead .checkBox").click(function(){
	$(this).toggleClass("on");
	if($(this).hasClass("on")){
		$(".activityList tbody .checkBox").addClass("on");
	}else{
		$(".activityList tbody .checkBox").removeClass("on");
	}
	
})

/*表格td复选框*/
$(document).on("click",".activityList tbody .checkBox",function(){
//$(".activityList tbody .checkBox").click(function(){
	$(this).toggleClass("on");	
})

/*$(document).on("click","*",function(){
	console.log($(this).get(0).tagName)
	console.log($(this).text());
})*/

$(document).on("click",".edit",function(){
//$(".edit").click(function(){
	$(this).find(".menu").toggle();
	$(".edit").not(this).find(".menu").hide();
	return false;
})
$(document).click(function(){
	$(".edit .menu").hide();
})




$('table.activityList').on('click',".handle",function(){

	$('#guid').val($(this).closest('tr').attr('guid'));
	// alert($('#guid').val());

	if($(this).hasClass('下架')){

		layer.open({
			type: 2,
			title: '详情',
			shadeClose: true,
			// shade: false,
			maxmin: true, 
			area: ['90%', '90%'],
			content: 'detail.html',
		});
		
	}

	if($(this).hasClass('修改')){
		window.location.href = "activityModify.html?guid=" + $('#guid').val();
	}
	
});