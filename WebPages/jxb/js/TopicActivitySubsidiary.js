//20170210.9
//loadingStart();
var linshi='';
var linshi2="";

var allActivity='';//储存ajax收到的所有的活动
var topicactivity_id='';//存储的当前显示主题活动的id
var CbdDimgArr=["img/c7.png","img/c8.png"];//笑脸图标数组
var CimgArr2=["img/a4.png","img/a3.png"];//对勾数组

var isReceivedUpdateMatchedTopics=false;//0207,判断是否接收到经销宝数�?
var UpdateMatchedTopicsBol=true;//0207,只接收一次指�?

/*url截取*/
var UrlKeyValueData=getUrlKeyValue();
main();
function main(){
	/*url检�?/
    if($.isEmptyObject(UrlKeyValueData)){//如果是空对象，返�?    	
    	return;
    }
    /*是否有经销商id*/
    //在此只检测distributor_id，activity_idsArr需要在后面检�?
	if(UrlKeyValueData.distributor_id==undefined||UrlKeyValueData.distributor_id==""||UrlKeyValueData.distributor_id==" "||UrlKeyValueData.distributor_id==null){//如果经销商不合法，返�?
		return;
	}
	UrlDistributorIDRefresh();	
}
function UrlDistributorIDRefresh(){
	Cajax(UrlKeyValueData.distributor_id,UrlKeyValueData.activity_id);	//如果UrlKeyValueData.activity_id为undefined也用此。已总结�?
}

engine.on('UpdateMatchedTopics', UpdateMatchedTopics, this)
function UpdateMatchedTopics(){//经销宝页面传令刷新的过程，就是重新给allActivity赋值的过程�?
	isReceivedUpdateMatchedTopics=true;
    if(arguments.length<1){
		console.log('缺少参数');
		return;
	}	
	if(UpdateMatchedTopicsBol){
		allActivity=JSON.parse(arguments[0]);	
		console.log("UpdateMatchedTopics出现",allActivity);
		if(allActivity==undefined||allActivity==null||allActivity==''||allActivity==[]||allActivity.content==[]||allActivity.content==undefined||allActivity.content.length==0){
			console.log('活动列表为空，无法展示指定活�?, {icon: 5});
			return;
		}		
		ajaxSucFn(allActivity.content[0]);
		topicactivity_id=allActivity.content[0].guid;
		$(".CcButieRight").hide();
		UpdateMatchedTopicsBol=false;		
	}

}

function Cajax(m,a,b){
	console.log("ajax开�?)
	$.ajax({
		type:"get",//0121更新为post
		dataType:'json',	
		url:"/webapi/ipaloma/topic/jingxiaobao/activity/"+m+"/",//
//		url:"/webapi/ipaloma/topic/jingxiaobao/activity/",
		data:{
			"activityid": a, // 对应的活动id
   			"retailerids": b// 对应的门店id，以逗号分割
		},
		async:true,
		beforeSend:function(){
			loadingStart();
			$(".marginShade").hide();
		},		
		success:function(data){					
			if(data==""||data==[]){
//				layer.alert("数据为空，请重试", {icon: 5});
				popupsFn(function(){					
					Cajax(UrlKeyValueData.distributor_id,UrlKeyValueData.activity_id);
				})
				return;
			}
			if(data.content==undefined){
//				layer.alert('数据结构变化，请通知管理�?, {icon: 5});
				popupsFn(function(){					
					Cajax(UrlKeyValueData.distributor_id,UrlKeyValueData.activity_id);
				})
				return;
			}
			if(data.content==[]){
				popupsFn(function(){					
					Cajax(UrlKeyValueData.distributor_id,UrlKeyValueData.activity_id);
				})
				return;
			}
			if(data.content.length==0){
//				layer.alert('数据为空', {icon: 5});
				popupsFn(function(){					
					Cajax(UrlKeyValueData.distributor_id,UrlKeyValueData.activity_id);
				})
				return;
			}
			console.log(data);
			linshi=data;//存储所有活动，所有活动都在data.content[i]
			allActivity=data;
			ajaxSucFn(data.content[0]);//先显示第一个活动，			
			topicactivity_id=data.content[0].guid;//先存储第一个活动id
			$(".CcButieRight").hide();
			console.log(topicactivity_id);
			$(".initialHi").removeClass("initialHi");
		},
		error:function(data){
			console.log("error");
			linshi2=data;
//			layer.alert('通讯异常:错误'+data.status, {icon: 5});
			popupsFn(function(){					
				Cajax(UrlKeyValueData.distributor_id,UrlKeyValueData.activity_id);
			})
		},
		complete:function(data){
			linshi2=data;
			loadintEnd();
		}
	});
}



function ajaxSucFn(info){//ajax成功回调里调�?
//	debugger;
	if(info.match){//处理不规范的后台数据,
		info.matched=info.match;		
	}	
	$(".CbdD .CbdD1 img").attr("src",CbdDimgArr[info.matched]);//看看哲哥用的是matched还是match
//	console.log(info.matched);
	
	if(info.matched){
		$(".CbdD2P1").text("您已达到活动条件");
		$(".CbdD2P2").text("马上可以赚补贴喽�?);
		$(".Cccondition").hide();//1228加入
	}else{
		$(".CbdD2P1").text("您差一点点");
		$(".CbdD2P2").text("就可以赚补贴�?);
		$(".Cccondition").show();
	}
	$(".CcBigTitle").text(info.post);
	$(".CcSmallTitle").text(info.activitytitle);
	//*******数据规范后考虑删除开�?
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
//		info.condition=[{
//			localtype:"ajax请求成功",
//			description:"后台没有给我传该条件",
//			matched:"0",
//		}]
//		$(".CcconditionContent").append('<p class="'
//			+info.condition[0].localtype
//			+'"><img src="'
//			+CimgArr2[info.condition[0].matched]
//			+'" alt="" /><i><span>'
//			+info.condition[0].localtype
//			+':</span><span class="Cccspan dib">'
//			+info.condition[0].description
//			+'</span></i></p>')
//		return;
		console.log("条件为空,已经匹配,故无需条件");
	}else{
		for(i=0;i<info.condition.length;i++){	
//			debugger;
			if(info.condition[i].localtype==undefined){
				info.condition[i].localtype="";
			}
			var conditionHtml='<p class="'
			+info.condition[i].localtype
			+'"><img src="'
			+CimgArr2[info.condition[i].matched]
			+'" alt="" /><i><span>'
			+info.condition[i].localtype
			+':</span><span class="Cccspan dib">'
			+info.condition[i].description
			+'</span></i></p>';
			
			$(".CcconditionContent").append(conditionHtml);
		}		
	}	
	//活动补贴说明具体内容
	$(".CccDescriptionCon").empty();
	var typeCounts=0
	//分销�?
	if(info.subsidydescription.distributor){
		typeCounts++;
		var text1="";
		for(m=0;m<info.subsidydescription.distributor.length;m++){
			var dd=info.subsidydescription.distributor[m];
			for(i in dd){					
				if(typeof(dd[i])!="object"){						
					text1+=dd[i]+" ";
				}else{
					for (j in dd[i]){							
						text1+=dd[i][j]+" ";
					}
				}	
			}
		}
		$(".CccDescriptionCon").append('<p><strong>'+typeCounts+'、分销�?: </strong><span>'+text1+'</span></p>');				
	}
	//门店
	if(info.subsidydescription.retailer){
		typeCounts++;
		var text1="";
		for(m=0;m<info.subsidydescription.retailer.length;m++){
			var dd=info.subsidydescription.retailer[m];
			for(i in dd){					
				if(typeof(dd[i])!="object"){						
					text1+=dd[i]+" ";
				}else{
					for (j in dd[i]){							
						text1+=dd[i][j]+" ";
					}
				}	
			}
		}
		$(".CccDescriptionCon").append('<p><strong>'+typeCounts+'、门�?: </strong><span>'+text1+'</span></p>');
	}
	//消费�?
	if(info.subsidydescription.consumer){
//		debugger;
		typeCounts++;
		var text1="";
		for(m=0;m<info.subsidydescription.consumer.length;m++){
			var dd=info.subsidydescription.consumer[m];			
			for(i in dd){					
				if(typeof(dd[i])!="object"){						
					text1+=dd[i]+" ";
				}else{
					for (j in dd[i]){							
						text1+=dd[i][j]+" ";
					}
				}	
			}
		}
		$(".CccDescriptionCon").append('<p><strong>'+typeCounts+'、消费�?: </strong><span>'+text1+'</span></p>');
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

$(document)[0].oncontextmenu=function(event){
	var event=event||window.event;
	window.event.returnValue=false;
	event.preventDefault();
	console.log(8888);
	return false;
}


//测试函数
//dsj()
//function dsj(){
//	console.log(new Date(),topicactivity_id)
//	setTimeout(dsj,1000)
//}


/*//判断是否接收到经销商id，活动id	
isReceivedID();
var isReceivedIDNum=0;
var isReceivedIDTime='';
function isReceivedID(){
	isReceivedIDNum++;
	isReceivedIDTime=setTimeout(isReceivedID,500);
	console.log(isReceivedIDNum);
	if(isReceivedIDNum>=10){
//		if(isReceivedDistributorID==false){
//	//		layer.alert('缺少经销商id，请重试', {icon: 5});
//			console.log('缺少经销商id');			
//		}
//		if(isReceivedTopicActivityID==false){
//	//		layer.alert('缺少活动id，请重试', {icon: 5});
//			console.log('缺少活动id');			
//		}
		if(isReceivedUpdateMatchedTopics==false){
			console.log('缺少经销宝传来数�?);	
		}
		clearTimeout(isReceivedIDTime);
	}
}*/
//alert(8)
/*调试用代�?/
//$("body").on("mouseenter",".footerCkxq",function(){
//	console.log('OnShowDetailClick',topicactivity_id);
//})

/*左右箭头*/
//0208添加
var allActivityNum=0;
$(".CcButieLeft").click(function(){	
	if(allActivityNum<allActivity.content.length-1){
		allActivityNum++;
		ajaxSucFn(allActivity.content[allActivityNum]);
		topicactivity_id=allActivity.content[allActivityNum].guid;
//	}else{
//		$(".CcButieLeft").hide();
	}	
	if(allActivityNum>=allActivity.content.length-1){
		$(".CcButieLeft").hide();
	}
	if(allActivityNum>0){
		$(".CcButieRight").show();
	}
	console.log(topicactivity_id,allActivityNum);
})

$(".CcButieRight").click(function(){	
	if(allActivityNum>0){
		allActivityNum--;
		ajaxSucFn(allActivity.content[allActivityNum]);
		topicactivity_id=allActivity.content[allActivityNum].guid;
//	}else{
//		$(".CcButieRight").hide();
	}	
	if(allActivityNum<=0){//注意不能写在上面的eles�?
		$(".CcButieRight").hide();
	}
	if(allActivityNum<allActivity.content.length-1){
		$(".CcButieLeft").show();
	}
	console.log(topicactivity_id,allActivityNum);
})