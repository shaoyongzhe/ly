/**
 * Created by Administrator on 2016/12/30.
 */





function fnfooterclick() {
    $("footer").on("click","div",function () {
        if($(this).find("ul").attr("class")=="on"){
            $("footer").find("ul").removeClass("on");
        }else {
            $("footer").find("ul").removeClass("on");
            $(this).find("ul").addClass("on");
        }
    });
    $(document).click(function (e) {
        if (!$(e.target).closest("footer").length) {
            $("footer ul").removeClass("on");
        }
    });
}
//获取数据
function fngetlist() {
    $.ajax({
        type: "get",
      	url: "/webapi/distributor/57839d2ad6424786bd3c319585f2088e/distributors",
      	//url: "../../data/fenxiaolist.json",
        data:"",
        timeout:"1000",
        dataType:"json",
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	if(textStatus=="timeout"){
        		console.log("请求超时")
        		XMLHttpRequest.abort();
        	}
        },
        success: function(data){
            console.log(data)
            var oli="";
            var ceng1=null;
            var ceng2=null;
            var ceng3=null;
            var thissp={
            	distributorname:null,
            	distributorimg:null,
            	contactperson:null,
            	mobilephone:null,
            	cutgift:null,
            	itemcount:null,
            	active:null
            };
            for(var k1 in data){
            	ceng1=data[k1];
            	thissp.distributorname=ceng1["distributorname"];
            	thissp.distributorimg=ceng1["distributorimg"];
            	thissp.contactperson=ceng1["contactperson"];
            	thissp.mobilephone=ceng1["mobilephone"];
            	thissp.cutgift=ceng1["cutgift"];
            	thissp.itemcount=ceng1["itemcount"];
            	oli+="<li class='hori' data-xx='"+JSON.stringify(thissp)+"'>" +
                        "<div class='main-l'>" +
                            "<a href='activeindex.html'>" +
                                "<img src='"+ceng1["distributorimg"]+"'>" +
                            "</a>" +
                        "</div>" +
                        "<div class='main-r'>" +
                            "<div class='main-rt'>" +
                                "<div class='namejia left'>" +
                                    "<a href='activeindex.html'>" +
                                        "<h3>"+ceng1["distributorname"]+"</h3>" +
                                    "</a>" +
                                    "<p>起送价 ￥<strong>"+ceng1["cutgift"]+"</strong>元</p>" +
                                "</div>" +
                                "<span class='joincar right'><em>"+ceng1["itemcount"]+"</em></span>" +
                            "</div>" +
                            "<div class='cgl-manj'>"+
	                            "<p>微信下单立减5元</p>";
	                            if(ceng1["itemkind"]=="满赠"){
	                            	oli+="<p style='background-image:url(../../image/shop/icon_zeng.png);'>";
	                            	for(var k2 in ceng1["promotionactivity"]["details"]){
		                            	ceng2=ceng1['promotionactivity']['details'][k2];
		                            	oli+="满"+ceng2["moneysum"]+"元赠";
		                            	for(var k3 in ceng2["giftitems"]){
		                            		ceng3=ceng2['giftitems'][k3];
		                            		oli+=ceng3["itemname"]+ceng3["count"]+ceng3["unit"];
		                            		if(ceng3["itemquality"]==0){
		                            			oli+="(临期)"
		                            		}
		                            		oli+="，";
		                            	}
		                            	oli=oli.substring(0,oli.length-1);
		                            	oli+="；";
	                            	}
	                          		oli=oli.substring(0,oli.length-1);
	                            }
	                            if(ceng1["itemkind"]=="满减"){
	                            	oli+="<p>";
	                            	for(var k2 in ceng1["promotionactivity"]["details"]){
		                            	ceng2=ceng1['promotionactivity']['details'][k2];
		                            	oli+="满"+ceng2["moneysum"]+"元赠";
		                            	for(var k3 in ceng2["giftitems"]){
		                            		ceng3=ceng2['giftitems'][k3];
		                            		oli+=ceng3["itemname"]+ceng3["count"]+ceng3["unit"]+"，";
		                            	}
		                            	oli=oli.substring(0,oli.length-1);
		                            	oli+="；";
	                            	}
	                          		oli=oli.substring(0,oli.length-1);
	                            }
                            oli+="</p></div>";
                        "</div>" +
                    "</li>";
            }
            $("#cgl-main").html(oli).on("click","li",function () {
            	var thissp1=JSON.parse($(this).attr("data-xx"));
            	thissp1.active=$(this).find(".cgl-manj").html();
            	//console.log(thissp)
            	window.location="activeindex.html?"+JSON.stringify(thissp1);
            });  
            
        }
    });
}
$(function () {
	$.ajax({
        type: "get",
      	url: "/webapi/account/login/test-2-135-1",
        data: "",
        timeout:"1000",
        dataType:"json",
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	if(textStatus=="timeout"){
        		console.log("请求超时")
        		XMLHttpRequest.abort();
        	}
        }
   });
    fnfooterclick();
    fngetlist();
});
