//loadingStart();
//$(".contentCont").empty();
//如果想查看静态页面，请注释掉$(".contentCont").empty();	ajaxAlready();ajaxNo()，当前函数是28 29 30
	var linshi1='';
	var linshi2='';
	var linshi3=linshi4="";
	var ajaxBol1=false;//用于保证2个异步都执行完毕
	var ajaxBol2=false;//用于保证2个异步都执行完毕
	var DistributorIDRefreshBol=true;//只接收一次指令
	var TopicActivityIDRefreshBol=true;//只接收一次指令
	var isReceivedDistributorID=false;//判断是否接收到指令经销商id。
	var isReceivedTopicActivityID=false;//判断是否接收到指令活动列表id。
	
	InitailCallBack();//***对接经销宝后解除注释####
	function InitailCallBack(){  		
	  engine.on('OnDistributorIDRefresh', OnDistributorIDRefresh, this);//经销商id
	  engine.on('OnTopicActivityIDRefresh', OnTopicActivityIDRefresh, this);//主题活动id
	}	

//  ajaxAlready("5ce1d14e07534139ae7774d8983f04f3");//***对接经销宝后注释掉***
//	ajaxNo("5ce1d14e07534139ae7774d8983f04f3");//***对接经销宝后注释掉***
	console.log(7878)
    //1.根据经销商id查询匹配和不匹配活动，同时将经销商id存入到localstorage中，传到详情页面
    function OnDistributorIDRefresh(){
    	isReceivedDistributorID=true;//接收到指令则赋值true；
    	if(arguments.length<1){
    		layer.alert('缺少参数', {icon: 5});
    		return;
    	}
    	if(DistributorIDRefreshBol){
	     	var parameter0=JSON.parse(arguments[0])
	    	localStorage.fromTopicActivityList_DistributorID=parameter0.data[0];
	    	ajaxNo(parameter0.data[0]);
	    	ajaxAlready(parameter0.data[0]);   	
	    	DistributorIDRefreshBol=false;
	    	console.log(999)
			//0114添加用于调试开始
			if(arguments[0]){
				console.log(arguments[0],"id是",parameter0.data[0]);		
			}
			if(arguments[1]){
				console.log(arguments[1],parameter1.data[0]);		
			}	
			//0114添加用于调试结束
    	}
    }
    //2.根据主题活动id，决定显示隐藏哪些活动
    function OnTopicActivityIDRefresh(){
    	isReceivedTopicActivityID=true;//接收到指令则赋值true；
    	if(arguments.length<1){
    		layer.alert('缺少参数', {icon: 5});
    		return;
    	}
    	if(TopicActivityIDRefreshBol){
	    	var parameter0=JSON.parse(arguments[0])
			$(".Aguid").each(function(){//遍历所有的guid	
	//			debugger
				$(this).parents(".alist").addClass("hi2");
				for(i=0;i<parameter0.data[i].length;i++){//***对接经销宝后解除注释####
					if($(this).text()==parameter0.data[i]){
						$(this).parents(".alist").removeClass("hi2");
					}				
				}
				console.log($(this).text());
				/*if($(this).text()=="6ce1d14e07534139ae7774d8983f04f3"||$(this).text()=="e5f584447329429f99ee924983e48c32"){//***对接经销宝后注释掉***				
					$(this).parents(".alist").removeClass("hi2");
				}*/
			})
    		TopicActivityIDRefreshBol=false;
			//0114添加用于调试开始
			if(arguments[0]){
				console.log(arguments[0],parameter0.data[0]);		
			}
			if(arguments[1]){
				console.log(arguments[1],parameter0.data[0]);		
			}	
			//0114添加用于调试结束    	
    	}
    } 

	//选项卡
	$(".yeNo li").click(function(){
		//重置
		$(".yeNo li").css({
			"color":"#333",
			"borderBottom":"4px solid #ccc"
		});
		var index=$(".yeNo li").index(this);
		$(".content").addClass("hi");		
		//切换
		$(this).css({
			"color":"#2580e6",
			"borderBottom":"4px solid #2580e6"
		});
		$(".content").eq(index).removeClass("hi");
	})
	//马上参与或活动详情
	$(".contentCont").on("click",".ccfoot2",function(){
		localStorage.fromTopicActivityList_ActivityID=$(this).parents(".con").find(".Aguid").text();
		location.href="TopicActivityDetail.html";
//		console.log($(this).parents(".con").find(".Aguid").text());
//		engine.call('OnShowDetailClick', $(this).parents(".con").find(".Aguid").text())
		
	})	
	//保存初始的dom,用于生成。
	var initialDom=$(".alist").get(0).outerHTML;
	//清空
	$(".contentCont").empty();	//若查看静态页面，请注释掉	
	//ajax已经参与活动,因为ui图上没有地区区别，所以不需要考虑地区
	function ajaxAlready(a){
		console.log("ajax开始ajaxAlready")
		$.ajax({
			type:"get",
//			url:"http://localhost:3000/a",
//			url:'http://192.168.10.61:40007/webapi/ipaloma/topic/jingxiaobao/'+'5ce1d14e07534139ae7774d8983f04f3'
			url:"/webapi/ipaloma/topic/jingxiaobao/"+a,	
			data:{
				"matchtype":"matched"//等unmatched有数据的时候，unmatched
			},
			async:true,
			beforeSend:function(){
				loadingStart()
			},			
			success:function(data){
				linshi1=data;
				sucessFn($(".Aalready"),data)				
			},
			error:function(data){
				console.log(data,"请求失败");
				layer.alert('通讯异常:错误'+data.status+"无法获取已参与活动，请稍后重试", {icon: 5});				
			},
			complete:function(data){
				linshi3=data
				ajaxBol1=true;	
				if(ajaxBol1&&ajaxBol2){
					loadintEnd();
				}
			}
		});	
	}		
	//ajax未参与活动
	function ajaxNo(a){
		console.log("ajax开始ajaxNo")
		$.ajax({
			type:"get",
//			url:"http://localhost:3000/a",
			url:"/webapi/ipaloma/topic/jingxiaobao/"+a,	
			data:{
				"matchtype":"unmatched"//等unmatched有数据的时候，unmatched
			},
			async:true,
			beforeSend:function(){
				loadingStart()
			},
			success:function(data){
				linshi2=data;
				sucessFn($(".Ano"),data);
			},
			error:function(data){
				console.log(data,"请求失败");
				layer.alert('通讯异常:错误'+data.status+"无法获取未参与活动，请稍后重试", {icon: 5});					
			},
			complete:function(data){
				linshi4=data;
				ajaxBol2=true;	
				if(ajaxBol1&&ajaxBol2){
					loadintEnd();
				}
			}
		});	
	}	

	//	地区点击
	var contentDqBol=true;
	$(".contentDq span").click(function(){
		if(contentDqBol){
			$(".contentDq span").text("其他地区");
			contentDqBol=false;
		}else{
			$(".contentDq span").text("本地区");
			contentDqBol=true;
		}
		$(".Ano").find(".alist").toggleClass("hi")
	})
	

	function sucessFn(obj,info){
		console.log(info,'sucessFn');
		if(info.error){
			layer.alert(info.error, {icon: 5});
			return;
		}
		var src=["img/a4.png","img/a3.png"];
		var endtimeArr=[];
		for(i=0;i<info.content.length;i++){	
//			console.log(info.content[i]);
			obj.find(".contentCont").append(initialDom);
			//新存入guid开始****
			obj.find(".con:last").append('<i style="display:none" class="Aguid">'+info.content[i].guid+'</i>');//id名可能变化为topid、**id
			//新存入guid结束****
			//20170109添加已参与数量开始***
			if(info.content[i].participate_count!=undefined){
				$(".cCHeadSp2:last").removeClass("hi").text("已参与分销商数："+info.content[i].participate_count);				
			}
			//20170109添加已参与数量结束***			
			if(info.content[i].budget==undefined){
				info.content[i].budget={};
			}
			if(info.content[i].budget.subsidytotal==undefined){
				info.content[i].budget.subsidytotal=0;
			}
			if(info.content[i].budget.subsidyreleased==undefined){
				info.content[i].budget.subsidyreleased=0;
			}		
			var budgetSubsidytotal=moneyTransform(info.content[i].budget.subsidytotal,4);//万，元，单位处理
			obj.find(".conImg:last").find("span").eq(0).text(budgetSubsidytotal);
			var hanzi="";//已参与与未参与的补贴提示不一样
			if(obj.hasClass("Aalready")){
				hanzi="您已获得";
			}else{
				hanzi="已发放";
			}					
			var budgetSubsidyreleased=moneyTransform(info.content[i].budget.subsidyreleased,4);//万，元，单位处理
			obj.find(".conImg:last").find("span").eq(1).text(hanzi+budgetSubsidyreleased);
			obj.find(".cCHead:last").find(".cCHeadSp1").text(info.content[i].post);
			if(info.content[i].activitytitle==""){
				info.content[i].activitytitle=info.content[i].post;
			}
			obj.find(".ccBt:last").text(info.content[i].activitytitle);
			obj.find(".ccCo:last").text(info.content[i].content);
			obj.find(".ccTi:last").find(".ccTis1").text(info.content[i].begintime.substr(0,16)+"-"+info.content[i].endtime.substr(0,16));
			obj.find(".ccTi:last").find(".ccTis2").eq(0).prev("img").attr("src",src[info.content[i].condition.area_matched]);
			obj.find(".ccTi:last").find(".ccTis2").eq(2).prev("img").attr("src",src[info.content[i].condition.activity_matched]);
			obj.find(".ccTi:last").find(".ccTis2").eq(3).prev("img").attr("src",src[info.content[i].condition.condition_matched]);
			endtimeArr.push(info.content[i].endtime);
			//多行溢出隐藏//因为只需要支持谷歌浏览器，所以换成css来实现多行溢出
//			zhanShou(obj.find('.ccCo:last'));		
			//封装区别,不需要判断，建议封装		
			if(obj.hasClass("Aalready")){			
				$(".Aalready").find(".ccNo:last").addClass("hi");
				$(".Aalready").find(".ccfoot2:last").text("活动详情");			
			}else if(obj.hasClass("Ano")){			
				//处理是否能参与活动
				if(info.content[i].cannotaccess=="1"){
					$(".Ano").find(".ccNo:last").addClass("hi");
//					$(".Ano").find(".ccfoot2:last").text("马上参与");
				}else{
					$(".Ano").find(".ccNo:last").removeClass("hi");
//					$(".Ano").find(".ccfoot2:last").text("活动详情");
				}
				$(".Ano").find(".ccfoot2:last").text("活动详情");//去掉马上参与显示，一律为活动详情
				//处理本地区其他地区
				if(info.content[i].condition.area_matched=="1"){//本地区显示，不要用district了，哲哥会删掉的。
					$(".Ano").find(".alist:last").removeClass("hi");
				}else{
					$(".Ano").find(".alist:last").addClass("hi");
				}			
			}
	
		}
		djs()
		function djs(){
			countDown(obj,endtimeArr);	
			setTimeout(djs,500);
		}
		if(obj.hasClass("Ano")){
			//处理溢出省略
			$(".Ano").addClass("hi");		
		}
//		OnTopicActivityIDRefresh();//***对接经销宝后注释掉***
	}
	
	returnToList()
	//返回超慧券列表
	function returnToList(){
		$(".returnToList .p2").click(function(){
			engine.call('ClosePage');
		})
		$("header").click(function(){			
			engine.call('ClosePage');
		})
	}

	//展开收起函数封装
	function zhanShou(obj){
		var objGet0=obj.get(0);	
		$clamp(objGet0,{clamp:2,useNativeClamp:false,truncationChar:'...',truncationHTML:""});
	}
	//倒计时函数
	function countDown(obj,timeArr){
		obj.find(".ccfoot").each(function(){
			var index=obj.find(".ccfoot").index(this)
			var presentTime=new Date();
			var endtime=new Date(timeArr[index]);
			var cha=endtime-presentTime;
			//一天86400000毫秒，一小时3600000毫秒,一分60000毫秒
			var days=Math.floor(cha/86400000)+"";				
			if(days.length==1){
				days="00"+days;
			}else if(days.length==2){
				days="0"+days;
			}
			var hours=Math.floor(cha%86400000/3600000)+"";
			if(hours.length==1){
				hours="0"+hours;
			}
			var mins=Math.floor(cha%3600000/60000)+"";
			if(mins.length==1){
				mins="0"+mins;
			}
			var seconds=Math.floor(cha%60000/1000)+"";
			if(seconds.length==1){
				seconds="0"+seconds;
			}				
			if(seconds<0){
				days="000";
				hours=mins=seconds="00";					
			}
			obj.find(".ccfoot").eq(index).find(".ccfootRight").find("span").eq(0).text(days[0]);
			obj.find(".ccfoot").eq(index).find(".ccfootRight").find("span").eq(1).text(days[1]);
			obj.find(".ccfoot").eq(index).find(".ccfootRight").find("span").eq(2).text(days[2]);
			obj.find(".ccfoot").eq(index).find(".ccfootRight").find("span").eq(3).text(hours[0]);
			obj.find(".ccfoot").eq(index).find(".ccfootRight").find("span").eq(4).text(hours[1]);
			obj.find(".ccfoot").eq(index).find(".ccfootRight").find("span").eq(5).text(mins[0]);
			obj.find(".ccfoot").eq(index).find(".ccfootRight").find("span").eq(6).text(mins[1]);
			obj.find(".ccfoot").eq(index).find(".ccfootRight").find("span").eq(7).text(seconds[0]);
			obj.find(".ccfoot").eq(index).find(".ccfootRight").find("span").eq(8).text(seconds[1]);
			if(days<3){
				obj.find(".ccfoot").eq(index).find(".ccfootRight").find("span").css({
					background:"#f9d1d1",
					color:"#e83734",
				})
			}	
		})			
	}
	

function loadingStart(){
	$(document.body).css({//禁用滚动条
	   "overflow-x":"hidden",
	   "overflow-y":"hidden"
	});
	$("body").prepend("<div class='loadingDiv'><img src='img/loading.gif' class='loadingImg'></div>")		
}

function loadintEnd(){
	$(document.body).css({//启用滚动条
		"overflow-x":"auto",
		"overflow-y":"auto"
	});			
	$(".loadingDiv").remove();
}


//下面djs2()随时删除，仅仅用来测试
//djs2();
//function djs2(){
//	var nnnnn=new Date();
//	console.log(ajaxBol1,ajaxBol2,nnnnn);
//	setTimeout(djs2,500);
//}


//判断是否接收到经销商id，活动id	
/*isReceivedID();
var isReceivedIDNum=0;
var isReceivedIDTime='';
function isReceivedID(){
	isReceivedIDNum++;
	isReceivedIDTime=setTimeout(isReceivedID,500);
	console.log(isReceivedIDNum);
	if(isReceivedIDNum>=10&&isReceivedDistributorID==false){
		layer.alert('缺少经销商id，请重试', {icon: 5});
		clearTimeout(isReceivedIDTime);
	}
	if(isReceivedIDNum>=10&&isReceivedTopicActivityID==false){
		layer.alert('缺少活动id，请重试', {icon: 5});
		clearTimeout(isReceivedIDTime);
	}
}*/

/*满n位，变'元'为'万'*/
function moneyTransform(money,n){
	var newMoney=parseInt(money).toString();//倪总允许取整
	if(newMoney.length<=n){
		newMoney=newMoney+"元";
	}else{
		if(n==4){//根据需要补充
			var moneyUnit="万";
		}else if(n==8){
			var moneyUnit="亿";
		}
		newMoney=parseInt(newMoney/10000).toString()+moneyUnit;
	}
	return newMoney;
}
