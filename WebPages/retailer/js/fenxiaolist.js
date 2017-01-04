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
    console.log(1)
    $.ajax({
        type: "get",
      	url: "/webapi/distributor/57839d2ad6424786bd3c319585f2088e/distributors",
      	//url: "../../data/fenxiaolist.json",
        data: "",
        timeout:"3000",
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
            for(var k1 in data){
            	oli+="<li class='hori'>" +
                        "<div class='main-l'>" +
                            "<a href='fenxiaoindex.html'>" +
                                "<img src='"+data[k1]["distributorimg"]+"'>" +
                            "</a>" +
                        "</div>" +
                        "<div class='main-r'>" +
                            "<div class='main-rt'>" +
                                "<div class='namejia left'>" +
                                    "<a href='fenxiaoindex.html'>" +
                                        "<h3>"+data[k1]["distributorname"]+"</h3>" +
                                    "</a>" +
                                    "<p>起送价 ￥<strong>"+data[k1]["cutgift"]+"</strong>元</p>" +
                                "</div>" +
                                "<span class='joincar right'><em>"+data[k1]["salecount"]+"</em></span>" +
                            "</div>" +
                            "<div class='cgl-manj'><p>微信下单立减5元</p><p>满400减40；满200减20；满100减10</p></div>" +
                        "</div>" +
                    "</li>";
            }
            $("#cgl-main").html(oli);
        }
    });
}
$(function () {
	$.get("/webapi/account/login/test-2-135-1",{},function(){},false);
    fnfooterclick();
    fngetlist();
});
