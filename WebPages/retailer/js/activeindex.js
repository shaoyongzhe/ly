/**
 * Created by Administrator on 2017/1/3.
 */

//获取地址栏参数
function fnurl () {
	var ourl=decodeURI(window.location.search.replace("?",""));
	if(ourl!=""){
		console.log(JSON.parse(ourl))
		var url1=JSON.parse(ourl);
		return url1;
	}
}
//通过参数渲染页面
function fnxrym() {
	var url1=fnurl();
	if(url1!=""){
		$("#distributornameh3").html(url1.distributorname);
		$(".dealer-header>i").html(url1.distributorname);
		$(".proTitleBoxl>img").attr("src",url1.distributorimg);
		$("#contactperson").html(url1.contactperson);
		$("#cutgift").html("￥"+url1.cutgift+"元");
		$(".ammount").html(url1.itemcount);
		$(".num").html($(".ammount").html());
		$(".proDetailBox").html(url1.active);
		$(".proTitleInfor>a").attr("href","tel:"+url1.mobilephone);
		$(".dealer-header>a").attr("href","tel:"+url1.mobilephone);
	}
}
//打电话滚动隐藏与显示
function fnscroll() {
    $(".container").scroll(function(){
        var scrolltop = $(".container").scrollTop();
        if(scrolltop > 100){
            $(".dealer-header").fadeIn();
        }else if(scrolltop <=100  ){
            $(".dealer-header").fadeOut();
        }
    });
}
//菜单点击事件
function fnclick() {
/*    $(".cgl-menu>li").on("click",function () {
        console.log(1)
        $(this).addClass("clion").siblings().removeClass("clion");
    })
*/    
    var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().addClass('clion');

/*		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('clion');
		};
*/	}	

	var accordion = new Accordion($('#cgl-menu'), false);
}
//动态设置cgl-cont的高度
function fnmenuhei(){
	$("#cgl-cont").css("height",$(".cgl-menu").outerHeight()/20+1+"rem");
}
//商品数量加减
function fncarnum(){
	$("#cgl-cont").on("click",".jian",function () {
		var num=Number($(this).next().html());
		if(num<=1){
			$(this).hide().next().hide().html(0);
			$(".ammount").html($(".ammount").html()-1);
			$(".num").html($(".ammount").html());
		}else{
			$(this).next().html(num-1);
			$(".ammount").html($(".ammount").html()-1);
			$(".num").html($(".ammount").html());
		}
	}).on("click",".add",function () {
		var num=Number($(this).prev().html());
		$(this).prev().html(num+1).show().prev().show();
		$(".ammount").html(Number($(".ammount").html())+1);
		$(".num").html($(".ammount").html());
	});
}
//获取菜单列表
function fnmenu () {
	$.ajax({
        type: "get",
      	//url: "/webapi/distributor/5ce1d14e07534139ae7774d8983f04f3/customer/57839d2ad6424786bd3c319585f2088e/itemtypegroups",
      	url: "../../data/menu.json",
        data: "",
        timeout:"2000",
        dataType:"json",
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	if(textStatus=="timeout"){
        		console.log("请求超时")
        		XMLHttpRequest.abort();
        	}
        },
        success: function(data){
        	//console.log(JSON.stringify(data))
        	console.log(data)
        	var oli="";
        	for(var k1 in data){
        		
        	}
        	//$("#cgl-contlist").find("ul").html(oli);
        }
    });
}

//获取活动列表
function fnhqactive () {
	$.ajax({
        type: "get",
      	//url: "/webapi/distributor/5ce1d14e07534139ae7774d8983f04f3/customer/57839d2ad6424786bd3c319585f2088e/activity",
      	url: "../../data/activeindex.json",
        data: {
        	"lastcount":0,
        	"pagecount":10
        },
        timeout:"5000",
        dataType:"json",
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	if(textStatus=="timeout"){
        		console.log("请求超时")
        		XMLHttpRequest.abort();
        	}
        },
        success: function(data){
        	//console.log(JSON.stringify(data))
        	console.log(data)
        	var oli="";
        	for(var k1 in data){
        		oli+="<li>" +
                    "<div class='cgl-top hori'> " +
                        "<img src='"+data[k1]["itemimage"]+"' alt=''> " +
                        "<div class='the-xiangxi'> " +
                            "<h3><span></span>"+data[k1]["itemname"]+"</h3>" +
                            "<p>"+data[k1]["specification"]+" | "+data[k1]["packagetypename"]+"</p>" +
                            "<div class='c-price'> ";
                            if(data[k1]["itemkind"]=="降价"){
                            	oli+="<span>￥"+Number(data[k1]["discountprice"]).toFixed(1)+"0</span>";
                            }else if(data[k1]["itemkind"]=="折扣"){
                            	oli+="<span>￥"+Number(data[k1]["price"]*data[k1]["discount"]).toFixed(1)+"0</span>";
                            }
                            	oli+="<div class='right'>";
                                if(data[k1]["itemcount"]<=0){
                                	oli+="<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>"+data[k1]["itemcount"]+"</span><span class='add'></span>";
                                }else{
                                	oli+="<span class='jian'></span><span class='price-z'>"+data[k1]["itemcount"]+"</span><span class='add'></span>";
                                }
                            oli+="</div>" +
                            " </div>";
                            if(data[k1]["itemkind"]=="降价"){
                            	oli+="<del>￥"+Number(data[k1]["originalprice"])+"0</del>";
                            }else if(data[k1]["itemkind"]=="折扣"){
                            	oli+="<del>￥"+Number(data[k1]["price"]).toFixed(1)+"0</del>";
                            }
                           
                        oli+="</div>" +
                    "</div> " +
                    "<div class='cgl-active'> <span>"+data[k1]["itemkind"]+"</span>"+data[k1]["discount"]+"折 </div> " +
                    "<p class='cgl-beizhu'>备注："+data[k1]["ruledesc"]+"</p>" +
                "</li>";
        	}
        	$("#cgl-contlist").find("ul").html(oli);
        }
    });
}

$(function () {
	fnurl();
	//fnxrym();
    fnscroll();
    fnclick();
    fnmenuhei();
    fncarnum();
    fnmenu();
    fnhqactive();
    
});

