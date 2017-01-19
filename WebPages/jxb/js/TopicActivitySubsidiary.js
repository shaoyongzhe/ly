//20170117
//loadingStart();
//如果想查看静态页面，请注释掉Cajax()
var linshi='';
var linshi2="";
var allActivity='';//储存ajax收到的所有的活动
var topicactivity_id='';//存储的当前显示主题活动的id
var CbdDimgArr=["img/c7.png","img/c8.png"];//笑脸图标数组
var CimgArr2=["img/a4.png","img/a3.png"];//对勾数组
var isReceivedDistributorID=false;//判断是否接收到指令经销商id。
var isReceivedTopicActivityID=false;//判断是否接收到指令活动列表id。

InitailCallBack();//***对接经销宝后解除注释####
function InitailCallBack(){   
//	layer.alert("我来证明我动了，但是engine.on动了吗，请期待，调试好，请删除我	", {icon: 5});
    engine.on('OnDistributorIDRefresh', OnDistributorIDRefresh, this);//经销商id//	  
    engine.on('OnTopicActivityIDRefresh', OnTopicActivityIDRefresh, this);//主题活动id/
}
//Cajax("5ce1d14e07534139ae7774d8983f04f3?ticketid=e6eebb40b33443edb4aed35215ce75e8");	//***对接经销宝后注释掉***
function OnDistributorIDRefresh(){
	isReceivedDistributorID=true;
//	layer.alert(arguments[0], {icon: 5});
    if(arguments.length<1){
		layer.alert('缺少参数', {icon: 5});
		return;
	}
	var parameter0=JSON.parse(arguments[0])
	Cajax(parameter0.data[0]);	
	//0114添加用于调试开始
	if(arguments[0]){
		console.log(arguments[0],parameter0.data[0]);		
	}
	if(arguments[1]){
		console.log(arguments[1],parameter0.data[0]);		
	}	
	//0114添加用于调试结束	
}
function OnTopicActivityIDRefresh(){
	isReceivedTopicActivityID=true;
//	layer.alert(arguments[0], {icon: 5});
	var parameter0=JSON.parse(arguments[0])
	if(arguments.length<1){
    	console.log('缺少参数', {icon: 5});
    	return;
    }
	if(parameter0==undefined){
		console.log('参数未定义', {icon: 5});
		return;
	};
	if(allActivity==undefined||allActivity==null||allActivity==''){
		console.log('活动列表为空，无法展示指定活动', {icon: 5});
		return;
	}
	for(i=0;i<allActivity.content.length;i++){
		if(allActivity.content[i].guid==parameter0.data[0]){
			ajaxSucFn(allActivity.content[i]);//刷新活动。
			topicactivity_id=allActivity.content[i].guid;
			console.log(topicactivity_id)
			break;
		}
	}	
	//0114添加用于调试开始
	if(arguments[0]){
		console.log(arguments[0],parameter0.data[0]);		
	}
	if(arguments[1]){
		console.log(arguments[1],parameter0.data[0]);		
	}	
	//0114添加用于调试结束	
}
function Cajax(d){
	console.log("ajax开始")
	$.ajax({
		type:"get",
		dataType:'json',	
//		url:"http://localhost:3000/c",//本地模拟
		url:"/webapi/ipaloma/topic/jingxiaobao/activity/"+d,//代理到哲哥电脑
//		url:"http://192.168.10.61:40007/webapi/ipaloma/topic/jingxiaobao/activity/"+d,//
		async:true,
			beforeSend:function(){
				loadingStart();
			},		
		success:function(data){			
			if(data==""||data==[]){
				layer.alert("数据为空，请重试", {icon: 5});
				return;
			}
			if(data.content==undefined){
				layer.alert('数据结构变化，请通知管理员', {icon: 5});
				return;
			}
			if(data.content.length==0){
				layer.alert('数据为空', {icon: 5});
				return;
			}
			console.log(data);
			linshi=data;//存储所有活动，所有活动都在data.content[i]
			allActivity=data;
			ajaxSucFn(data.content[0]);//先显示第一个活动，			
			topicactivity_id=data.content[0].guid;//先存储第一个活动id
			console.log(topicactivity_id);
//			loadintEnd();
			$(".initialHi").removeClass("initialHi");
		},
		error:function(data){
			console.log("error");
			linshi2=data;
			layer.alert('通讯异常:错误'+data.status, {icon: 5});
//			loadintEnd();
		},
		complete:function(data){
			linshi2=data;
			loadintEnd();
		}
	});
}



function ajaxSucFn(info){//ajax成功回调里调用
	if(info.match){//处理不规范的后台数据,
		info.matched=info.match;		
	}	
	$(".CbdD .CbdD1 img").attr("src",CbdDimgArr[info.matched]);//看看哲哥用的是matched还是match
//	console.log(info.matched);
	if(info.matched){
		$(".CbdD2P1").text("您已达到活动条件");
		$(".CbdD2P2").text("马上可以赚补贴喽！");
		$(".Cccondition").hide();//1228加入
	}else{
		$(".CbdD2P1").text("您差一点点");
		$(".CbdD2P2").text("就可以赚补贴喽");
	}
	$(".CcBigTitle").text(info.post);
	$(".CcSmallTitle").text(info.activitytitle);
	//*******数据规范后考虑删除开始
	if(info.budget==undefined&&info.budget==null){
		info.budget={};
	}
	//*******数据规范后考虑删除结束
	if(info.budget.subsidytotal==null){info.budget.subsidytotal=0;}
	$(".CcButieMax").text(info.budget.subsidytotal);
	if(info.budget.subsidyreleased==null){info.budget.subsidyreleased=0;}
	$(".CcButieAlready").text(info.budget.subsidyreleased);			
	//参与活动条件具体内容
	$(".CcconditionContent").empty();	
	if(info.condition==undefined||info.budget==null){//后台可能不给我condition,若数据规范该if可以删除	
		info.condition=[{
			localtype:"ajax请求成功",
			description:"后台没有给我传该条件",
			matched:"0",
		}]
		$(".CcconditionContent").append('<p class="'
			+info.condition[0].localtype
			+'"><img src="'
			+CimgArr2[info.condition[0].matched]
			+'" alt="" /><i><span>'
			+info.condition[0].localtype
			+':</span><span class="Cccspan dib">'
			+info.condition[0].description
			+'</span></i></p>')
	}else{
		for(i=0;i<info.condition.length;i++){		
			if(info.condition[i].localtype==undefined){
				info.condition[i].localtype="找后台要";
			}
			$(".CcconditionContent").append('<p class="'
			+info.condition[i].localtype
			+'"><img src="'
			+CimgArr2[info.condition[i].matched]
			+'" alt="" /><i><span>'
			+info.condition[i].localtype
			+':</span><span class="Cccspan dib">'
			+info.condition[i].description
			+'</span></i></p>')
		}		
	}	
	//活动补贴说明具体内容
	$(".CccDescriptionCon").empty();
	//分销商
	if(info.subsidydescription.distributor){
		for(m=0;m<info.subsidydescription.distributor.length;m++){
			var dd=info.subsidydescription.distributor[m];
			var text1="";
			for(i in dd){					
				if(typeof(dd[i])!="object"){						
					text1+=dd[i]+" ";
				}else{
					for (j in dd[i]){							
						text1+=dd[i][j]+" ";
					}
				}	
			}
			$(".CccDescriptionCon").append('<p><strong>1、分销商 : </strong><span>'+text1+'</span></p>');				
		}
	}
	//门店
	if(info.subsidydescription.retailer){
		for(m=0;m<info.subsidydescription.retailer.length;m++){
			var dd=info.subsidydescription.retailer[i];
			var text1="";
			for(i in dd){					
				if(typeof(dd[i])!="object"){						
					text1+=dd[i]+" ";
				}else{
					for (j in dd[i]){							
						text1+=dd[i][j]+" ";
					}
				}	
			}
			$(".CccDescriptionCon").append('<p><strong>2、门店 : </strong><span>'+text1+'</span></p>');
		}
	}
	//消费者
	if(info.subsidydescription.consumer){
		for(m=0;m<info.subsidydescription.consumer.length;m++){
			var dd=info.subsidydescription.consumer[i];
			var text1="";
			for(i in dd){					
				if(typeof(dd[i])!="object"){						
					text1+=dd[i]+" ";
				}else{
					for (j in dd[i]){							
						text1+=dd[i][j]+" ";
					}
				}	
			}
			$(".CccDescriptionCon").append('<p><strong/3、消费者 : </strong><span>'+text1+'</span></p>');
		}
	}
}
$(".footerCkxq").click(function(){
	console.log('OnShowDetailClick',topicactivity_id);
	engine.call('OnShowDetailClick', topicactivity_id);//第一个参数不改，第二参数传当前显示主题活动id;
})
$(".footerCkgd").click(function(){
	console.log('ShowMoreTopicActivityClick');
	engine.call('ShowMoreTopicActivityClick', "");//第一个参数不改，第二参数传空;
})

//测试函数
//dsj()
//function dsj(){
//	console.log(new Date(),topicactivity_id)
//	setTimeout(dsj,1000)
//}


//判断是否接收到经销商id，活动id	
isReceivedID();
var isReceivedIDNum=0;
var isReceivedIDTime='';
function isReceivedID(){
	isReceivedIDNum++;
	isReceivedIDTime=setTimeout(isReceivedID,500);
	console.log(isReceivedIDNum);
	if(isReceivedIDNum>=10){
		if(isReceivedDistributorID==false){
	//		layer.alert('缺少经销商id，请重试', {icon: 5});
			console.log('缺少经销商id');			
		}
		if(isReceivedTopicActivityID==false){
	//		layer.alert('缺少活动id，请重试', {icon: 5});
			console.log('缺少活动id');			
		}
		clearTimeout(isReceivedIDTime);
	}
}
//alert(8)
