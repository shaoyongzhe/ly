//20170207
//$(".BDcyhdCityD").empty();
//$(".BDcyhdRequireD").empty();
//$(".BDQFd1").empty();
//$(".BDQFd2").empty();
//$(".BDQFd3").empty();
//用于城市列表展开收起的变量，主要是收起状态下
//目前情况是，省、市都不可共行，如果有一天，省，市也可以共行了，那就修改一下�?
var linshi='';
var linshi1=linshi2="";
var zksq3Num=0;//数�?
var zksq3Bq=0;//标签内容
var zksq3Qy=0;//区域
var zksq3Bol=true;//处理没有6的情�?
var zksq3q5s=0;//存储，如果没�?，那存跳�?之后的那个�?


/*调试代码，经销宝内，不可使�?/
//ajaxActivityDetails("5ce1d14e07534139ae7774d8983f04f3","a486c6fdfd0b4e339014b16bc6b685d6");console.log("调试代码没有注释�?);
//调试链接
//http://membership.ipaloma.com/jxb/TopicActivityDetail.html?switchfrom=ticketlist&distributor_id=5ce1d14e07534139ae7774d8983f04f3&activity_id=a486c6fdfd0b4e339014b16bc6b685d6

/*url截取*/
var UrlKeyValueData=getUrlKeyValue();
var DistributorIDRefresh=UrlKeyValueData.distributor_id;//0207添加用于网络出错刷新
var TopicIDRefresh=UrlKeyValueData.activity_id;//0207添加用于网络出错刷新

main();
function main(){//无论从超慧券列表还是从活动列表，都会有这些id了，所以，�?套逻辑变为1套逻辑
	if(UrlKeyValueData.distributor_id==undefined||UrlKeyValueData.distributor_id==""||UrlKeyValueData.distributor_id==" "||UrlKeyValueData.distributor_id==null){//如果经销商id不合法，返回
		return;
	}
	if(UrlKeyValueData.activity_id==undefined||UrlKeyValueData.activity_id==""||UrlKeyValueData.activity_id==" "||UrlKeyValueData.activity_id==null){//如果活动id不合法，返回
		return;
	}
	UrlDisID_ActIDRefresh();
}
function UrlDisID_ActIDRefresh(){
	ajaxActivityDetails(DistributorIDRefresh,TopicIDRefresh);
	if(UrlKeyValueData.switchfrom=="ticketlist"){//情形一，从超慧券列表过来的
		$(".returnChaohuiquanList").removeClass("hi");
		$(".returnTopicList").addClass("hi");		
	}else if(UrlKeyValueData.switchfrom=="toplicactivitylist"){//情形二，从活动列表过来的，稍后改成else if
		$(".returnChaohuiquanList").addClass("hi");
		$(".returnTopicList").removeClass("hi");
	}else{
		console.log("从不明页面跳�?);
	}
}
//情形1.等待经销宝传令刷新页�?
//engine.on('OnDisID_ActIDRefresh', OnDisID_ActIDRefresh, this);//主题活动id///***对接经销宝后解除注释####
//ajaxActivityDetails("5ce1d14e07534139ae7774d8983f04f3","a486c6fdfd0b4e339014b16bc6b685d6");console.log("调试代码没有注释�?);//***对接经销宝后注释�?**链接活动详情页面后注释掉
/*function OnDisID_ActIDRefresh(){
	isReceivedDistributorID=true;//可能需要改�?
	isReceivedTopicActivityID=true;//可能需要改�?
	if(arguments.length<1){
//		layer.alert('缺少参数', {icon: 5});
		console.log("缺少参数");
		return;
	}	
	localStorage.fromTopicActivityList_DistributorID="";//防止情形1和情�?同时发生
	localStorage.fromTopicActivityList_ActivityID="";
	var parameter0=JSON.parse(arguments[0]);
	var parameter1=JSON.parse(arguments[1]);
	var OnDisID_ActIDRefreshParameter0=JSON.parse(arguments[0]);
	var OnDisID_ActIDRefreshParameter1=JSON.parse(arguments[1]);
	ajaxActivityDetails(DistributorIDRefresh,TopicIDRefresh);
	//0114添加用于调试开�?
	if(arguments[0]){
		console.log(arguments[0],"id�?,OnDisID_ActIDRefreshParameter0.data[0]);		
	}
	if(arguments[1]){
		console.log(arguments[1],OnDisID_ActIDRefreshParameter1.data[0]);		
	}	
	0114添加用于调试结束
	0121添加，如果是从列表来，则显示返回活动列表按钮，隐藏返回超慧券列表按钮；如果从超慧券列表过来，反之
	$(".returnChaohuiquanList").removeClass("hi");
	$(".returnTopicList").addClass("hi");
}*/

/*//情形2.由活动列表跳转至�?
if(location.href.indexOf('fromList')!=-1){
	console.log("来自列表�?);
	if(localStorage.fromTopicActivityList_DistributorID!=undefined&&localStorage.fromTopicActivityList_ActivityID!=undefined&&localStorage.fromTopicActivityList_DistributorID!=""&&localStorage.fromTopicActivityList_ActivityID!=""){//不要把undefined错写�?"	
//		isReceivedDistributorID=true;//可能需要改�?
//		isReceivedTopicActivityID=true;//可能需要改�?
		ajaxActivityDetails(localStorage.fromTopicActivityList_DistributorID,localStorage.fromTopicActivityList_ActivityID);//***对接经销宝后解除注释####
	}
	//0121添加，如果是从列表来，则显示返回活动列表按钮，隐藏返回超慧券列表按钮；如果从超慧券列表过来，反之
//	$(".returnChaohuiquanList").addClass("hi");
//	$(".returnTopicList").removeClass("hi");
	
}*/


function ajaxActivityDetails(a,b){
	console.log("ajax开�?)
	$.ajax({
		type:"get",
//		url:"http://localhost:3000/b",
		url:"/webapi/ipaloma/topic/jingxiaobao/detail/"+a+"/"+b,
		async:true,
		beforeSend:function(){
			loadingStart();
			$(".marginShade").hide();
		},
		success:function(data){		
			linshi=data;
/*			data={
  "topicid": "a486c6fdfd0b4e339014b16bc6b685d6",
  "matched": false,
  "joinedcount": 0,
  "poster": "超惠券列表以及公众号超惠券主�?,
  "activitytitle": "疯闷郁主题活动花开放假啦放辣椒法拉盛放辣椒烦死了积分酸辣粉�?,
  "poster_url": "http://img6.bdstatic.com/img/image/smallpic/xingkong1201.jpg",
  "content": "超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题活动、超惠券上超惠券列表以及公众号超惠券主题�?,
  "begintime": "2017-01-17 00:00:00",
  "endtime": "2017-02-21 23:59:59",
  "earliestjointime": "2017-01-17 00:00:00",
  "latestjointime": "2017-02-20 23:59:59",
  "servicephone": "122-7148302",
  "budget": {
    "subsidyreleased": 0,
    "subisdytotal": 1400,
    "obtained": 0,
    "days": 0
  },
  "subsidy_description": {
    "consumer": [
      {
        "subsidyevent": "分享超惠�?,
        "subsidymethod": "送固定金额返�?�?,
        "ruledescription": [
          "总补贴金额上�?00"
        ]
      },
      {
        "subsidyevent": "分享超惠�?,
        "subsidymethod": "送固定金额返�?�?,
        "ruledescription": [
          "总补贴金额上�?00"
        ]
      },
      {
        "subsidyevent": "分享超惠�?,
        "subsidymethod": "送固定金额返�?�?,
        "ruledescription": [
          "总补贴金额上�?00"
        ]
      },
      {
        "subsidyevent": "分享超惠�?,
        "subsidymethod": "送固定金额返�?�?,
        "ruledescription": [
          "总补贴金额上�?00"
        ]
      },
      {
        "subsidyevent": "分享超惠�?,
        "subsidymethod": "送固定金额返�?�?,
        "ruledescription": [
          "总补贴金额上�?00"
        ]
      },
      {
        "subsidyevent": "分享超惠�?,
        "subsidymethod": "送固定金额返�?�?,
        "ruledescription": [
          "总补贴金额上�?00"
        ]
      },
      {
        "subsidyevent": "分享超惠�?,
        "subsidymethod": "送固定金额返�?�?,
        "ruledescription": [
          "总补贴金额上�?00"
        ]
      }
    ],
    "distributor": [
      {
        "subsidyevent": "门店签约分销�?,
        "subsidymethod": "送固定微信红�?�?,
        "ruledescription": []
      }
    ],
    "retailer": [
      {
        "subsidyevent": "门店签约分销�?,
        "subsidymethod": "送固定微信红�?�?,
        "ruledescription": []
      }
    ]
  },
  "activity_condition": [
    {
      "matched": 1,
      "description": "套餐优惠幅度高于80% 投放门店数量�?1-20",
      "localtype": "套餐"
    },
    {
      "matched": 1,
      "description": "�?,
      "localtype": "降价"
    }
  ],
  "distributor": [
    {
      "matched": 0,
      "description": "活动开始前1�?不低�?000�?,
      "localtype": "核销次数"
    }
  ],
  "retailer": [],
  "consumer": [],
  "district_condition": [
    {
      "name": "北京�?,
      "state": "active",
      "charge": {
        "name": null,
        "guid": null,
        "oid": null
      },
      "city": [
        {
          "name": "北京�?,
          "state": "active",
          "charge": {
            "name": null,
            "guid": null,
            "oid": null
          },
          "country": [
            {
              "name": "东城�?,
              "state": "active"
            },
            {
              "name": "石景山区",
              "state": "active"
            }
          ]
        }
      ]
    },
    {
      "name": "天津�?,
      "state": "active",
      "charge": {
        "name": "六月�?,
        "guid": "857392948940468784b73a94c6ab1c6c",
        "oid": 4
      },
      "city": [
        {
          "name": "天津�?,
          "state": "active",
          "charge": {
            "name": "六月�?,
            "guid": "857392948940468784b73a94c6ab1c6c",
            "oid": 4
          },
          "country": [
            {
              "name": "和平�?,
              "state": "active"
            },
            {
              "name": "河东�?,
              "state": "active"
            },
            {
              "name": "河西�?,
              "state": "active"
            },
            {
              "name": "南开�?,
              "state": "active"
            },
            {
              "name": "河北�?,
              "state": "active"
            },
            {
              "name": "红桥�?,
              "state": "active"
            },
            {
              "name": "塘沽�?,
              "state": "active"
            },
            {
              "name": "汉沽�?,
              "state": "active"
            },
            {
              "name": "大港�?,
              "state": "active"
            },
            {
              "name": "东丽�?,
              "state": "active"
            },
            {
              "name": "西青�?,
              "state": "active"
            },
            {
              "name": "津南�?,
              "state": "active"
            },
            {
              "name": "北辰�?,
              "state": "active"
            },
            {
              "name": "武清�?,
              "state": "active"
            },
            {
              "name": "宝坻�?,
              "state": "active"
            },
            {
              "name": "宁河�?,
              "state": "active"
            },
            {
              "name": "静海�?,
              "state": "active"
            },
            {
              "name": "�? �?,
              "state": "active"
            }
          ]
        }
      ]
    },
    {
      "name": "河北�?,
      "state": "active",
      "charge": {
        "name": "六月�?,
        "guid": "857392948940468784b73a94c6ab1c6c",
        "oid": 4
      },
      "city": [
        {
          "name": "石家庄市",
          "state": "active",
          "charge": {
            "name": "六月�?,
            "guid": "857392948940468784b73a94c6ab1c6c",
            "oid": 4
          },
          "country": [
            {
              "name": "井陉�?,
              "state": "active"
            },
            {
              "name": "正定�?,
              "state": "active"
            },
            {
              "name": "栾城�?,
              "state": "active"
            },
            {
              "name": "行唐�?,
              "state": "active"
            },
            {
              "name": "灵寿�?,
              "state": "active"
            },
            {
              "name": "深泽�?,
              "state": "active"
            },
            {
              "name": "赞皇�?,
              "state": "active"
            },
            {
              "name": "无极�?,
              "state": "active"
            },
            {
              "name": "平山�?,
              "state": "active"
            },
            {
              "name": "元氏�?,
              "state": "active"
            },
            {
              "name": "辛集�?,
              "state": "active"
            },
            {
              "name": "藁城�?,
              "state": "active"
            },
            {
              "name": "晋州�?,
              "state": "active"
            },
            {
              "name": "新乐�?,
              "state": "active"
            },
            {
              "name": "鹿泉�?,
              "state": "active"
            }
          ]
        }
      ]
    },
    {
      "name": "山西�?,
      "state": "active",
      "charge": {
        "name": "六月�?,
        "guid": "857392948940468784b73a94c6ab1c6c",
        "oid": 4
      },
      "city": [
        {
          "name": "长治�?,
          "state": "active",
          "charge": {
            "name": "六月�?,
            "guid": "857392948940468784b73a94c6ab1c6c",
            "oid": 4
          },
          "country": [
            {
              "name": "�? �?,
              "state": "active"
            },
            {
              "name": "�? �?,
              "state": "active"
            },
            {
              "name": "长治�?,
              "state": "active"
            },
            {
              "name": "襄垣�?,
              "state": "active"
            },
            {
              "name": "黎城�?,
              "state": "active"
            },
            {
              "name": "壶关�?,
              "state": "active"
            },
            {
              "name": "长子�?,
              "state": "active"
            },
            {
              "name": "武乡�?,
              "state": "active"
            }
          ]
        }
      ]
    }
  ]
};
*/			
			if(data==""||data==[]){
//				layer.alert("数据为空，请重试", {icon: 5});
				console.log("数据为空，请重试");
				popupsFn(function(){	
					ajaxActivityDetails(DistributorIDRefresh,TopicIDRefresh);
//					if(location.href.indexOf('fromList')!=-1){
//						ajaxActivityDetails(localStorage.fromTopicActivityList_DistributorID,localStorage.fromTopicActivityList_ActivityID);
//					}else{
//						ajaxActivityDetails(OnDisID_ActIDRefreshParameter0.data[0],OnDisID_ActIDRefreshParameter1.data[0]);						
//					}
				})
				return;
			}
			if(data.topicid==undefined){
//				layer.alert('数据为空', {icon: 5});
				console.log("数据为空，请重试");
				popupsFn(function(){	
					ajaxActivityDetails(DistributorIDRefresh,TopicIDRefresh);
//					if(location.href.indexOf('fromList')!=-1){
//						ajaxActivityDetails(localStorage.fromTopicActivityList_DistributorID,localStorage.fromTopicActivityList_ActivityID);
//					}else{
//						ajaxActivityDetails(OnDisID_ActIDRefreshParameter0.data[0],OnDisID_ActIDRefreshParameter1.data[0]);						
//					}
				})			
				return;
			}
			console.log(data);
			//1226添加开�?
			$('.BtuwenTu img').attr('src',data.poster_url)
			//1226添加结束
			var Barrzige=["img/b5.png","img/b6.png"];
			var welcomeArr=["哎呦，您差一点点就可以赚补贴哦！","哇哦，您完全符合活动条件！赚补贴不要手软哦！"];
			var colorArr=["#ff0000","#3fbe00"];
//			data.matched=1;//调试�?
			if(data.matched==true){
				data.matched=1;
			}else if(data.matched==false){
				data.matched=0;
			}
			$(".Bzige img").attr("src",Barrzige[data.matched])			
			$(".Bzige span").text(welcomeArr[data.matched]).css("color",colorArr[data.matched]);
			$(".Btitle p").text(data.poster);			
			if(data.activitytitle==""){
				data.activitytitle=data.poster;
			}
			$(".BsmallTitle").text(data.activitytitle);
			$(".BbigTitle span").text("已参与分销商数:"+data.joinedcount+"�?);
			$(".BtuwenWenP1").text(data.content);
			//展开收起
//			debugger;
			$(".BtuwenWenP1").append("<a style='color:red;' class='more' href='#'>展开更多>></a><a style='color:#3FBE00;' class='less' href='#'><<收起</a>");
			zksq1();
			data.time=data.begintime+"-"+data.endtime;
			$(".BtuwenWenP2 .BtuwenWenS2").text(data.time);
			$(".BtuwenWenP3 .BtuwenWenS2").text(data.servicephone);
			if(data.budget.subisdytotal==undefined){
				data.budget.subisdytotal=0;
			}
			if(data.budget.subsidyreleased==undefined){
				data.budget.subsidyreleased=0;
			}
			if(data.budget.days==undefined){
				data.budget.days=0;
			}
			if(data.budget.obtained==undefined){
				data.budget.obtained=0;
			}			
			//最高补�?
			$(".BsubsidyAP1S1").text(data.budget.subisdytotal+"�?);//情形1			
			$(".BsubsidyBP1").text(data.budget.subisdytotal);//情形2
			//已发�?
			$(".BsubsidyAP2S1").text(data.budget.subsidyreleased+"�?);//情形1	
			$(".BsubsidyBP2").text(data.budget.subsidyreleased);//情形2
			//已享受补贴时�?
			$(".BsubsidyAP3").text(data.budget.days);
			//已获得多少元
			$(".BsubsidyAP4").text(data.budget.obtained);
			//活动补贴说明开�?
			//0103添加会员参与时间//有结束时间则是范围，没有结束时间则是开始时�?
			$(".BbtsmRright12 span").text(data.latestjointime?data.earliestjointime+'-'+data.latestjointime:data.earliestjointime);			
			/*倒计�?/
			countDownCirculation($(".BsubsidyB span"),data.endtime);

			/*给每个btsm填充内容*/
			var hm="";	
			var heightXdjsljg=0;
			if(data.subsidy_description.distributor){
//				debugger
				for(i=0;i<data.subsidy_description.distributor.length;i++){
					hm+='<p class="btsmPs">'+(i+1)+"�?+data.subsidy_description.distributor[i].subsidyevent+data.subsidy_description.distributor[i].subsidymethod+'</p>';	
				}
				$(".btsm1").find(".btsmD1").html(hm);	
				if(heightXdjsljg<$(".btsm1").find(".btsmD1").height()){
					heightXdjsljg=$(".btsm1").find(".btsmD1").height();
				}
				console.log(heightXdjsljg+"调试高度")
			}
			hm="";//懒得重新弄变量了�?
			if(data.subsidy_description.retailer){
				for(i=0;i<data.subsidy_description.retailer.length;i++){
					hm+='<p class="btsmPs">'+(i+1)+"�?+data.subsidy_description.retailer[i].subsidyevent+data.subsidy_description.retailer[i].subsidymethod+'</p>';
	//				hm+='<p class="btsmPs">'+(i+1)+data.subsidy_description.retailer[i]+'</p>';	
				}
				$(".btsm2").find(".btsmD1").html(hm);		
				if(heightXdjsljg<$(".btsm2").find(".btsmD1").height()){
					heightXdjsljg=$(".btsm2").find(".btsmD1").height();
				}
				console.log(heightXdjsljg+"调试高度")
			};
			hm="";//懒得重新弄变量了�?
			if(data.subsidy_description.consumer){
				for(i=0;i<data.subsidy_description.consumer.length;i++){
					hm+='<p class="btsmPs">'+(i+1)+"�?+data.subsidy_description.consumer[i].subsidyevent+data.subsidy_description.consumer[i].subsidymethod+'</p>';
	//				hm+='<p class="btsmPs">'+(i+1)+data.subsidy_description.consumer[i]+'</p>';	
				}
				$(".btsm3").find(".btsmD1").html(hm);	
				if(heightXdjsljg<$(".btsm3").find(".btsmD1").height()){
					heightXdjsljg=$(".btsm3").find(".btsmD1").height();
				}
				console.log(heightXdjsljg+"调试高度")
			}
			console.log(heightXdjsljg+"调试高度")
			
			/*判断有几个btsm,用于确定btsm宽度*/
			//有谁显示谁，无则隐藏
			$(".btsm").addClass("hi");
			var num=0;
			if(data.subsidy_description.distributor){
				num++;
//				console.log(num)
				$(".btsm1").removeClass("hi");
			}
			if(data.subsidy_description.retailer){
				num++;
//				console.log(num)
				$(".btsm2").removeClass("hi");
			}
			if(data.subsidy_description.consumer){
				num++;
//				console.log(num)
				$(".btsm3").removeClass("hi");
			}
//			alert($(window).width());
			//确定有无按钮
			if(heightXdjsljg>144){
				$(".BbtsmRright3").remove();
			}
			//不同数量，有无按钮，btsm的宽度各不相�?
			var widthNum=0;
			if($(window).width()>1000){				
				if(heightXdjsljg>144){
					widthNum=861
					$(".BbtsmRright2Content").width(861)
				}else{
					widthNum=801
				}
				console.log(widthNum);
				$(".btsm").css({					
					width:(widthNum-10*2)/num
				})
//				console.log("if")
			}else{
				if(heightXdjsljg>144){
					widthNum=707
					$(".BbtsmRright2Content").width(707)
				}else{
					widthNum=667
				}
				console.log(widthNum);
				$(".btsm").css({					
					width:(widthNum-10*2)/num
				})
//				console.log("else")
			}
			
			zksq2();
			//活动补贴说明结束
			//地区开�?
			var hmSheng=$(".BDcyhdCityDsSheng").get(0).outerHTML;
			var hmShi=$(".BDcyhdCityDsShi").get(0).outerHTML;
			var hmQv=$(".BDcyhdCityDsqv").get(0).outerHTML;
			$(".BDcyhdCityD").empty();
			//�?
			for(i=0;i<data.district_condition.length;i++){				
				$(".BDcyhdCityD").append(hmSheng);
				$(".BDcyhdCityDsSheng:last").find(".BDcyhdCityDsP").text(data.district_condition[i].name);
				zksq3Num++;
				if(zksq3Num==6){//条件需�?
					zksq3Bq=data.district_condition[i].name;
					zksq3Qy="�?;
					zksq3Bol=false;
				}
				//�?
				for(j=0;j<data.district_condition[i].city.length;j++){//如果市为空，自然for一次都不执�?
					$(".BDcyhdCityD").append(hmShi);
					$(".BDcyhdCityDsShi:last").find(".BDcyhdCityDsP").text(data.district_condition[i].city[j].name);						
					zksq3Num++;
					if(zksq3Num==6){//条件需�?
						zksq3Bq=data.district_condition[i].city[j].name;
						zksq3Qy="�?;
						zksq3Bol=false;
					}
					//�?因为区要求同行，这里处理就特殊点
					$(".BDcyhdCityD").append(hmQv);
					var hmQvText="";
					
					for(m=0;m<data.district_condition[i].city[j].country.length;m++){//如果区为空，自然for一次都不执�?
						//0116之前，区用以下代码进行遍�?
//						hmQvText+=data.district_condition[i].city[j].country[m]+"�?;
						//0116起，数据结构变化了，区用以下代码进行遍历�?
						hmQvText+=data.district_condition[i].city[j].country[m].name+"�?;
					}
					hmQvText=hmQvText.substr(0,hmQvText.length-1);
					$(".BDcyhdCityDsqv:last").find(".BDcyhdCityDsP").text(hmQvText);
					zksq3Num+=Math.ceil(hmQvText.length/52);
					if(zksq3Num>=6&&zksq3Bol==true){//条件需�?
						zksq3Bq=hmQvText;
						zksq3Qy="�?;
						zksq3Bol=false;
						zksq3q5s=zksq3Num;
					}
				}
				//隐藏之前给省市区的外层标签加上类名wcl，我错了的缩写，哈哈	
				$(".BDcyhdCityDsP").parent().addClass("wcl");
				//市、区隐藏//隐藏的同时给其去掉类名wcl	.
//				console.log($(".BDcyhdCityDsP").length)					
				//如果省、市、区为空，则隐藏之；
				$(".BDcyhdCityDsP").each(function(){
					if($(this).text()==""){
						$(this).parent().addClass("hi").removeClass("wcl");
					}
				})					
			}
			//如果是全�?
			if(data.district_condition[0].name=="全国"){//有必要的时候，吧上面的三层for放入else里�?
				$(".BDcyhdCityD").empty();
				$(".BDcyhdCityD").append(hmSheng);
				$(".BDcyhdCityDsSheng:last").find(".BDcyhdCityDsP").text("全国");	
			}
			//为了哲哥说的只让第一个显示图，其他的都不显示了�?
			$(".BDcyhdCityD").find("img").addClass("vis");
			$(".BDcyhdCityD").find("img").eq(0).removeClass("vis");		
//				
			$(".BDcyhdCityDsMore").text("展开更多>>").css({
				color:'red',
				left:mmm()
			});
			//参与活动条件继续
			//超惠活动要求
			$(".BDcyhdRequireD").empty();
			var BDcyhdRequireDarr=["img/a4.png","img/a3.png"]
			for(i=0;i<data.activity_condition.length;i++){	
				//0207处理"投放门店"前的间隔宽度
				var hm0207="";
				var arr0207=[];
				if(data.activity_condition[i].description.indexOf("投放门店数量")!=-1){
					arr0207=data.activity_condition[i].description.split("投放门店数量");
					hm0207=arr0207[0]+'<i style="display:inline-block;width:15px;"></i>'+'投放门店数量'+arr0207[1];
				}else{
					hm0207=data.activity_condition[i].description;
				}
				$(".BDcyhdRequireD").append('<p class="dib BDcyhdRequireDP"><img src="'
				+BDcyhdRequireDarr[data.activity_condition[i].matched]
				+'" alt="" class="" /><span class="dib">'
				+data.activity_condition[i].localtype
				+"("
				+hm0207//data.activity_condition[i].description
				+")"
				+'</span></p>')
				if(i%2){
//					console.log(i)
					$(".BDcyhdRequireDP:last").addClass("ml50")
				}
			}
			
			//会员参与资格
			//会员参与资格--分销�?
			$(".BDQFd1").empty();
			if(data.distributor.length){
				for(i=0;i<data.distributor.length;i++){
					$(".BDQFd1").append('<p><img src="'
					+BDcyhdRequireDarr[data.distributor[i].matched]
					+'" class="BDQFdsImg" /><span class="BDQFdsSpan" >'
					+data.distributor[i].localtype
					+":"
					+data.distributor[i].description
					+'</span></p>')
				}
				/*//0208添加，门店独有说�?
				$(".BDQFd1").append('<p><span class="BDQFd2_span1">*</span><span class="BDQFd2_span2">如您的投放门店不在平台活动区域范围内的，这些门店将不能享受平台补贴！</span></p>');*/
			}else{
				$(".BDQFd1").append('<img src="img/b4.png" alt="" class="BDcyhdQualifiedXFZimg"/>')
			}
			//会员参与资格--门店
			$(".BDQFd2").empty();
			if(data.retailer.length){
				for(i=0;i<data.retailer.length;i++){//先翻译至此，等待哲哥补充字段localtype，以及所有的type，然后消费者同此�?
//					if(data.retailer[i].type=="member_time"){
//						data.retailer[i].localtype="会员时长";
//					}else if(data.retailer[i].type=="fans_range"){
//						data.retailer[i].localtype="粉丝范围";
//					}else if(data.retailer[i].type=="activityfanspercentage"){
//						data.retailer[i].localtype="粉丝留存�?;
//					}else if(data.retailer[i].type=="ticket_verify"){
//						data.retailer[i].localtype="核销次数";
//					}else if(data.retailer[i].type=="verify_person_count"){
//						data.retailer[i].localtype="核销人数";
//					}else{
//						data.retailer[i].localtype=data.retailer[i].type;
//					}
					$(".BDQFd2").append('<p><img class="hi" src="'
					+BDcyhdRequireDarr[data.retailer[i].matched]
					+'" class="BDQFdsImg" /><span class="BDQFdsSpan" >'
					+data.retailer[i].localtype
					+" : "
					+data.retailer[i].description
					+'</span></p>')
				}
				//0208添加，门店独有说�?
				$(".BDQFd2").append('<p><span class="BDQFd2_span1">*</span><span class="BDQFd2_span2">如您的投放门店不在平台活动区域范围内的，这些门店将不能享受平台补贴！</span></p>')
			}else{
				$(".BDQFd2").append('<img src="img/b4.png" alt="" class="BDcyhdQualifiedXFZimg"/>')
			}	
			
			//会员参与资格--消费�?
			$(".BDQFd3").empty();
			if(data.consumer.length){
				for(i=0;i<data.consumer.length;i++){
//					data.consumer[i].localtype=data.consumer[i].type;
					$(".BDQFd3").append('<p><img class="vis" src="'
					+BDcyhdRequireDarr[data.consumer[i].matched]
					+'" class="BDQFdsImg" /><span class="BDQFdsSpan" >'
					+data.consumer[i].localtype
					+" : "					
					+data.consumer[i].description
					+'</span></p>')
				}
			}else{
				$(".BDQFd3").append('<img src="img/b4.png" alt="" class="BDcyhdQualifiedXFZimg"/>')
			}
			if($(".BDcyhdCityXianzhi").height()<144){//后期加上
				$(".BDcyhdCityDsMore").addClass("hi");
			}
			//
			zksq3();
//			console.log(8888666)
//			loadintEnd();
			$(".initialHi").removeClass("initialHi");//因为展开收起插件与显示隐藏冲突，所以，本页面dom中将initialHi变成�?initialHi
			
			/*if(data.matched){//0121左晓雪告诉我，因为现在文案是必填项，所以标题大小标题以及是否显示文案已经统一了，无论是否满足要求，都是stateYes方案。所以这里注释掉。但是文案后续可能变成非必填项，所以还是要考虑的�?
				$(".stateNo").addClass("hi")
			}else{
				$(".stateYes").addClass("hi");
			}*/
			if(data.content!=undefined&&data.content.length>0){//文案是必填项的处理，即后台传来数据一定有文案
				$(".stateNo.BtitleB").hide();//现在的标题不存在位置差别，都在图片上面，因为文案是一定有�?
				if(data.matched){
					$(".stateNo.BsubsidyB").hide();
				}else{
					$(".stateYes.BsubsidyA").hide();
				}				
				
			}else{//文案是非必填项的处理，即后台传来，匹配则有文案，不匹配则无文�?
				if(data.matched){
					$(".stateNo").hide();
				}else{
					$(".stateYes").hide();
				}
			}
		},//success结束
		error:function(data){			
//			layer.alert('通讯异常:错误'+data.status, {icon: 5});
			console.log('通讯异常:错误'+data.status);
			popupsFn(function(){	
				ajaxActivityDetails(DistributorIDRefresh,TopicIDRefresh);
//				if(location.href.indexOf('fromList')!=-1){
//					ajaxActivityDetails(localStorage.fromTopicActivityList_DistributorID,localStorage.fromTopicActivityList_ActivityID);
//				}else{
//					ajaxActivityDetails(OnDisID_ActIDRefreshParameter0.data[0],OnDisID_ActIDRefreshParameter1.data[0]);						
//				}
			})		
//			loadintEnd();
			linshi1=data;
			console.log(linshi);
			$(".Bwrap").removeClass("hi");
		},
		complete:function(data){
			linshi2=data;
			loadintEnd();
		}
	});//ajax结束
}


//展开收起1
//zksq1();//对接后台后请注释�?*****
//展开收起函数封装，用于页面上面的活动介绍
function zksq1(){
//	debugger;
//	$(".BtuwenWenP1").append("<a style='color:red;' class='more' href='#'>展开更多>></a><a style='color:#3FBE00;' class='less' href='#'><<收起</a>");
    $("p.ellipsis-text").dotdotdot({
        after: 'a.more',
        callback: dotdotdotCallback
    });
    $("p.ellipsis-text").on('click','a',function() {
        if ($(this).text() == "展开更多>>") {
            var div = $(this).closest('p.ellipsis-text');
            div.trigger('destroy').find('a.more').hide();
            div.css('max-height', '9999px');
            $("a.less", div).show();
        }
        else {
            $(this).hide();
            $(this).closest('p.ellipsis-text').css("max-height", 22*6).dotdotdot({ after: "a.more", callback: dotdotdotCallback });
        }
    });
    function dotdotdotCallback(isTruncated, originalContent) {
        if (!isTruncated) {
        	$("a", this).remove();   
        }
    }
}
//箭头滚动
var BbtsmRright3ImgBol=true;
$(".BbtsmRright3Img").click(function(){
	//考虑使用展开收起
	if(BbtsmRright3ImgBol){
		$(".BbtsmRright3Img").attr("src","img/b9.png");
		BbtsmRright3ImgBol=false;
	}else{
		$(".BbtsmRright3Img").attr("src","img/b8.png");
		BbtsmRright3ImgBol=true;
	}		
})	
//展开收起函数封装，用于页面中间的活动补贴说明的按�?
//活动补贴说明的展开收起
function zksq2(){//obj可以是jq对象的类�?
//	debugger;
	/*if($(".btsmD1").height()<140){//修复数据不满而反复清空的bug以及调用dotdotdot的bug//后期加上//0206将其注释掉，以修改bug14632 
    	return;
    }*/
    $(".btsm").dotdotdot({
	        'ellipsis': '',
        callback: dotdotdotCallback
    });
    $(".BbtsmRright3Img").click(function() {
    	console.log(887878)
//  	debugger;
        if (BbtsmRright3ImgBol!=true) {
            $(".btsm").trigger('destroy');
            var maxHeight=0;
            $(".btsm").each(function(){//遍历，取最大高度�?/为了让对分销商，对门店对消费者的框等高�?
            	//之所以不遍历$(".btsm")是因为其受max-height限制，恒定。�?".btsmD1")是自适应的�?
            	if($(this).find(".btsmD1").height()>maxHeight){
            		maxHeight=$(this).find(".btsmD1").height();	  
            		console.log(maxHeight)
            	}
            })
			maxHeight+=30;//别忘记加上btsmP1的高�?
			$(".btsm").css({
				'max-height':'9900px',//设置一个足够大的�?
				"height":maxHeight
			})
			$(".Bbtsm").css({
				'height':$(".BbtsmRright12").height(),//�?为了弥补
			})			
        }
        else {
            $(".btsm").css({"max-height":"180px",height:"auto"}).dotdotdot({ 
            	'ellipsis': '',
            	callback: dotdotdotCallback
            });
            $(".Bbtsm").css({
				'height':"228px",//�?24多了6，目前不考虑是啥原因需要加这个6，只知道目测�?
			})
	    }
    });
    function dotdotdotCallback(isTruncated, originalContent) {
        if (!isTruncated) {
         $("a", this).remove();   
        }
    }   
}

//zksq3();//应该放在success中�?
//地区列表展开收起
function zksq3(){	
//	console.log("展开收起3�?)
	$(".BDcyhdCityDsMore").click(function(){
//		debugger;
		console.log("展开收起3�?)
		if($(this).text()=="展开更多>>"){
			console.log(1)
			$(".BDcyhdCityXianzhi").css({
				"max-height":"9999px",
			})
			$(this).text("<<收起").css({
				color:'#3FBE00',
				left:nnn()
			});
		}else{
			console.log(2)
			$(".BDcyhdCityXianzhi").css({
				"max-height":"144px",
			})
			$(this).text("展开更多>>").css({
				color:'red',
				left:mmm()
			});;
		}
	})
}
//zksq3收起的位置，即展开状态下，按钮的位置
function nnn(){
	var kkk=220;
	if($(".wcl:last").hasClass("BDcyhdCityDsqv")){//展开状态下最后一个标签是否是�?
		kkk=$(".wcl:last").find(".BDcyhdCityDsP").text().length%52*14+220;	
	}else{
		kkk=220;
	}
	return kkk;
}
//zksq3展开的位置，即收起状态下，按钮的位置
function mmm(){
	var kkk=220;
	if(zksq3Qy=="�?){//收起状态下，最后一行是否是区，具体怎么判断哪个是最后一行，见相应代�?
		if(zksq3q5s>6){//大于6
			kkk=923;
			//0118添加开�?
			if($(window).width()<1000){//小屏�?		
				kkk=732;	
			}
			//0118添加结束
		}else{//等于6，小�?的情况不需要考虑，因为只看第6行。废话；�?
			if(zksq3Bq.length%52==0){//处理刚好6行整
				kkk=923;
				//0118添加开�?
				if($(window).width()<1000){//小屏�?		
					kkk=732;	
				}
				//0118添加结束				
			}else{//6行，但不�?
				kkk=(zksq3Bq.length%52)*14+220;		
				//0118添加开�?
				if($(window).width()<1000){//小屏�?		
					kkk=(zksq3Bq.length%38)*14+220;		
				}
				//0118添加结束					
			}					
		}
	}else{
		kkk=220;
	}
	return kkk;		
}



returnToList()
//返回超慧券列�?
function returnToList(){
	$(".BreList .returnTopicList").click(function(){
		engine.call('ClosePage');
	})
	$(".BreList .returnChaohuiquanList").click(function(){
		engine.call('ClosePage');
	})	
	$("header").click(function(){			
		engine.call('ClosePage');
//		alert("header触发")
	})
}



//判断是否接收到经销商id，活动id	
/*isReceivedID();
var isReceivedIDNum=0;
var isReceivedIDTime='';
$(document).scrollTop(0); 
function isReceivedID(){
//		document.documentElement.scrollTop=0;
//	document.body.scrollTop=0;
//	console.log(document.documentElement.scrollTop,document.body.scrollTop);
//$(document).scrollTop(0); 
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

}*/


