//20170207
/*滚动条返回顶端*/
//setTimeout(function(){window.scrollTo(0,0);}, 50);
/*loading*/
function loadingStart(){
	$(document.body).css({//禁用滚动条
	   "overflow-x":"hidden",
	   "overflow-y":"hidden"
	});
	$("body").prepend("<div class='loadingDiv'><img src='img/loading.gif' class='loadingImg'></div>");
//	$("body").prepend("<div class='loadingDiv'><img src='img/loading.png' class='loadingImg'></div>");
}

function loadintEnd(){
	$(document.body).css({//启用滚动条
		"overflow-x":"auto",
		"overflow-y":"auto"
	});			
	$(".loadingDiv").remove();
}

/*白板遮罩*/
/*
用的时候直接如下操作
1.复制样式，本处3个页面都在public.css中含了此样式
.marginShade{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:white;
    z-index: 99999;
}
2.复制下面标签到body标签内，最上面。
<script type="text/javascript">
	var marginShade=document.createElement("div");			
	marginShade.className="marginShade";
	document.getElementsByTagName("body")[0].appendChild(marginShade);	
</script>
3.ajax开始前移除
beforeSend:function(){
	loadingStart();
	$(".marginShade").remove();
},
*/

/*弹窗刷新*/
var popups=''
	+	'<div class="popups">'
	+		'<p class="popups_networkError">网络异常哦，请再刷新看看<sub>~</sub></p>'
	+		'<span class="popups_refreshAgain">再次刷新</span><span class="popups_refreshOff">取消</span>'
	+	'</div>';



/*通讯异常弹窗*/
function popupsFn(fn1,fn2){
	$(".marginShade").show();
	var popupsFnLayerIndex=layer.open({
	  type: 1,
	  title:false,
	  skin: 'layui-layer-rim', //加上边框
	  area: ['402px', '170px'], //宽高
	  content: popups,
	  closeBtn: 0,
	  skin: false,
	});
	$(".popups_refreshAgain").click(function(){
		console.log("弹窗刷新");
		if(fn1){
			fn1();
		}	
		layer.close(popupsFnLayerIndex);
	})	
	$(".popups_refreshOff").click(function(){
		console.log("弹窗取消");
		if(fn2){
			fn2();
		}
		layer.close(popupsFnLayerIndex);
	})	
}
/*倒计时*/
//用于活动列表，活动详情
function countDown(obj,timeArr){//第一个参数是要显示倒计时的对象，第二个参数是时间
	var presentTime=new Date();
	var endtime=new Date(timeArr);
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
	obj.eq(0).text(days[0]);
	obj.eq(1).text(days[1]);
	obj.eq(2).text(days[2]);
	obj.eq(3).text(hours[0]);
	obj.eq(4).text(hours[1]);
	obj.eq(5).text(mins[0]);
	obj.eq(6).text(mins[1]);
	obj.eq(7).text(seconds[0]);
	obj.eq(8).text(seconds[1]);		
}

//countDownCirculation($(".BsubsidyB span"),"2017-01-22 00:00:00");//写在调用出，注意a参数是一个数据
function countDownCirculation(obj,time){
	countDown(obj,time);
	setTimeout(function(){
		countDownCirculation(obj,time)
	},500);
}

/*地址栏传值*/
function getUrlKeyValue(){			
    var url = location.search; 
    var thisParam = {};	
    if (url.indexOf("?") != -1) {

        var str = url.substr(1);
        strs = str.split("&");

        for(var i = 0; i < strs.length; i ++) {
            thisParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }

    }	
    console.log("地址栏传值是"+JSON.stringify(thisParam));
    console.log("当前网址是"+window.location.href);
    return thisParam;
    
}

