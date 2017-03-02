/**
 * Created by Administrator on 2017/1/3.
 */
//品牌商品搜索下拉事件
function fnpinpai() {
	var _tg=1;
    $(".titlestyle").on("click", function() {
    	if(_tg==1){
    		$(this).find("img").css({transform:"rotate(90deg)",transitionDuration:"0.2s"})
    		$(this).find("ul").show()
    		_tg=0
    	}else{
     		$(this).find("img").css({transform:"rotate(0deg)",transitionDuration:"0.2s"})
    		$(this).find("ul").hide()
    		_tg=1  		
    	}
    	
        
    }).on("click", "ul>li", function() {
        $(".titlestyle>span").html($(this).html());
        $(".titlestyle>ul").hide();
    });
    $(document).click(function(e) {
        if(!$(e.target).closest(".titlestyle").length) {
            $(".titlestyle>ul").hide();
        }
    });
}
//获取地址栏参数
function fnurl() {
    var ourl = decodeURI(window.location.search.replace("?", ""));
    if(ourl != "") {
        //console.log(JSON.parse(ourl))
        var url1 = JSON.parse(ourl);
        return url1;
    }
}
var _flag=1;
//通过参数渲染页面
function fnxrym() {
    var url1 = fnurl();
    if(url1 != "") {
        $("#distributornameh3").html(url1.distributorname);
        $(".dealer-header>i").html(url1.distributorname);
        $(".proTitleBoxl>img").attr("src", url1.distributorimg);
        $("#contactperson").html(url1.contactperson);
        $("#cutgift").html("￥" + url1.cutgift + "元");
        $(".num").html($(".ammount").html());
        $(".proDetailBox").html("<div style=\"float:left\">"+url1.active+"</div>"+"<img class=\"imgg\" src=\"../../image/shop/down.jpg\" style=\"float:right;margin-top:6%;margin-right: -11%;width: 0.8rem;height: 0.5rem;\">");
        $(".proTitleInfor>a").attr("href", "tel:" + url1.mobilephone);
        $(".dealer-header>a").attr("href", "tel:" + url1.mobilephone);
        $(".footerl>a").attr("href", "shopcar.html?distributor_id=" + url1.distributor_id);
        $(".footerr>a").attr("href", "shopcar.html?distributor_id=" + url1.distributor_id)
        var _hh=1;
        $(".imgg").click(function(){
	        if($(".proDetailBox>div>p:nth-child(2)").height()>20){
	        	if(_hh==1){
	        		$(".proDetailBox>div").height("auto");
	        		$(".proDetailBox").height($(".proDetailBox>div").height());
	        		$(".imgg").css({transform:"rotate(180deg)",transitionDuration:"0.2s"})
	        		_hh=0;
	        	}else{
	        		$(".proDetailBox>div").height("1.9rem");
	        		$(".proDetailBox").height("1.9rem");
	        		$(".imgg").css({transform:"rotate(0deg)",transitionDuration:"0.2s"})
	        		_hh=1;
	        	}
	        	
	        }
        })

    }
}
//获取购物车总金额和总数量
function fnpricenum() {
    $("#zhezao").show();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + localStorage.retaler + "/shoppingcart/" + fnurl().distributor_id + "/count",
        //url: "../../data/menu.json",
        data: "",
        timeout: "9000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#zhezao").hide();
			$(".tsh").show();
			$(".ms").text("网络异常")
        },
        success: function(data) {
            console.log(data)
            $("#zhezao").hide();
            $(".ammount").html(data.itemcount);
            $(".num").html(data.itemcount);
            $(".price>i").html(data["moneycount"].toFixed(1));
            fnqisong();
        }
    })
}
//打电话滚动隐藏与显示
function fnscroll() {
    $(".container").scroll(function() {
        var scrolltop = $(".container").scrollTop();
        if(scrolltop > 100) {
            $(".dealer-header").fadeIn();
        } else if(scrolltop <= 100) {
            $(".dealer-header").fadeOut();
        }
    });
}
//菜单(手风琴样式)点击事件
function fnclick() {
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        var links = this.el.find('.link');
        links.on('click', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown);
        var submenu = this.el.find('.submenu');
        //品牌下的一级分类点击
        submenu.on("click", "li", function() {
            $(this).parent().parent().parent().parent().prev().find("h4").html("全部子类型<i> > </i>")
            submenu.find("li").removeClass("col1");
            $(this).addClass("col1");
            if($(this).find(".hide1").length > 0) {
                $(".sanji").slideDown(300).find("h4>i").css("transform", "rotateZ(90deg)");
                $("#cgl-contlist").find("ul").animate({
                    "margin-top": "1.95rem"
                }, 300);
                $(".sanji-zi").hide().find(">ul").html($(this).find(".hide1").html());
            } else {
                $(".sanji").slideUp(300);
                $("#cgl-contlist").find("ul").animate({
                    "margin-top": "0"
                }, 300);
            }
            fnmclick1($(this).attr("id"),"itemcategory");
        })
    }
    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el,
            $this = $(this),
            $next = $this.next();
        $next.find("li").removeClass("col1"); //删除橙色字的颜色
        $(".sanji").hide(); //隐藏一级分类右下角的三角
        $(".cgl-contlist").find(">ul>li").show();
        $("#cgl-contlist").find("ul").animate({
            "margin-top": 0
        }, 300);
        $next.stop().slideToggle(300,function () {
            fnmenuhei();
        });
        $el.find(">li").removeClass('clion');
        $this.parent().addClass('clion');
        $el.find(".link>i").show();
        $this.find("i").hide();
        if(!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp(300,function () {
                fnmenuhei();
            });
        };
    }
    var accordion = new Accordion($('#cgl-menu'), false);
}
//菜单点击事件
function fnmenuclick() {
    var thetext = "";

    $("#cgl-menu").off("click").on("click", ".link", function() {
        thetext = $(this).text();
        if(thetext == "我的预存货") {
            $("#cgl-menu").find("li").show();
            fnyucun();
            $(".cgl-contlist").off("scroll");
        } else if(thetext == "促销活动") {
            fnhqactive();
            $(".cgl-contlist").off("scroll");
        } else {
            var ckid = $(this).parents("li").attr("id");
            var odata = {
                "filter": "",
                "filtertype": 0,
                "supplierid": ckid,
                "lastcount": 0,
                "pagecount": 5000
            }
            fnlist2(odata);
        }
    });
}
//二级菜单遮罩上部点击事件
function fnerji() {
    $(".sanji").on("click", function() {
        $(".sanji-zi", this).toggle().show;
        if($(".sanji-zi", this).is(":visible") == true) {
            $("h4>i", this).css("transform", "rotateZ(-90deg)");
        } else {
            $("h4>i", this).css("transform", "rotateZ(90deg)");
        }
    });
}
//品牌下一级分类筛选
function fnmclick1(theid,idd) {
    var n1=$(".cgl-contlist").find(">ul>li");
    for(var i=0;i<n1.length;i++){
        if(n1.eq(i).attr(idd)==theid){
            n1.eq(i).show();
        }else{
            n1.eq(i).hide();
        }
    }
    $("#cgl-contlist").scrollTop(0);
}
//品牌下二级分类筛选
function fnmclick2 () {
    $(".sanji-zi").on("click","ul>li",function () {
        var id3=$(this).attr("id");
        fnmclick1(id3,"itemsubcategory");
        $(this).parent().parent().prev().html($(this).text()+"<i> > </i>")
        $(this).css({background:"#e7fefd",color:"#009f96"})
        $(this).siblings().css({background:"#fff",color:"#acadad"})
    });
}
//动态设置cgl-cont的高度
function fnmenuhei() {
    $(".cgl-contlist").css("height", $(".cgl-menu").height());
}
//获取菜单列表
function fnmenu() {
    $("#zhezao").show();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + fnurl().distributor_id + "/customer/" + localStorage.retaler + "/itemtypegroups",
        data: "",
        timeout: "9000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#zhezao").hide();
            if(textStatus == "timeout") {
                console.log("请求超时")
                XMLHttpRequest.abort();
            }
        },
        success: function(data) {
            console.log(data)
            $("#zhezao").hide();
            if(data.result == false) {
                console.log(data.error)
            } else {
                xuanrmenu(data);
            }
        }
    });
}
//菜单列表渲染
function xuanrmenu(data) {
    var oli = "";
    for(var k1 in data) {
        oli += "<li id='" + data[k1]["supplierid"] + "'>" +
            "<div class='link'>" + data[k1]["suppliername"];
        if(data[k1]["itemcategory"].length > 0) {
            oli += "<i></i>";
        }
        oli += "</div>" +
            "<ul class='submenu'> ";
        for(var k2 in data[k1]["itemcategory"]) {
            oli += "<li id='" + data[k1]["itemcategory"][k2]["itemcategory"] + "'>" + data[k1]["itemcategory"][k2]["itemcategoryname"] + "<i> > </i><ul class='hide1' style='display: none;'>";
            for(var k3 in data[k1]["itemcategory"][k2]["itemsubcategory"]) {
                oli += "<li id='" + data[k1]["itemcategory"][k2]["itemsubcategory"][k3]["itemsubcategory"] + "'>" + data[k1]["itemcategory"][k2]["itemsubcategory"][k3]["itemsubcategoryname"] + "</li>";
            }
            oli += "</ul></li>";
        }
        oli += "</ul>" +
            "</li>";
    }
    $("#cgl-menu").append(oli);
    fnclick();
    fnmenuclick();
    fnmenuhei(); //动态设置菜单右侧高度
}
//预存货列表
function fnyucun() {
    $("#cgl-contlist").find("ul").html("");
    $("#loading").show();
    $("#zhezao").show();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + fnurl().distributor_id + "/customer/" + localStorage.retaler + "/prepayinventorys",
        //url: "../../data/activeindex.json",
        data: "",
        timeout: "2000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#zhezao").hide();
            $("#loading").hide();
            if(textStatus == "timeout") {
                console.log("请求超时")
                XMLHttpRequest.abort();
            }
        },
        success: function(data) {
        	$("#zhezao").hide();
        	if(data.length==0){
        		$("#loading").hide()
        		var _lli="<img src=\"../../image/shop/icon_cry.png\" style=\"width:1.6rem;height:1.6rem;position:relative;left:44%;top:25%\">"+
        		"<p style=\"position: relative;top: 30%;text-align: center;color：#333333\">您暂无预存货，看看其他商品吧~</p>"
        		$("#cgl-contlist").html(_lli)
        	}else{
	            fnychxr(data);        		
        	}

            //sessionStorage.setItem("yucunhuo", JSON.stringify(data));
        }
    });

}
//预存货列表渲染
function fnychxr(data) {
    console.log(data)
    $("#loading").hide();
    var oli = "",
        dataid = null;
    for(var k1 in data) {
        dataid = {
            distributorid: fnurl().distributor_id,
            itemid: data[k1]["itemid"],
            itemquality: data[k1]["itemquality"],
            itemprice: 0,
            isyucun: 1
        }
        oli += "<li yucun='yucun'>" +
            "<div class='cgl-top hori'> " +
            "<img src='" + data[k1]["itemimage"] + "' alt=''> " +
            "<div class='the-xiangxi'> " +
            "<h3><span></span>" + data[k1]["itemname"] + "</h3>" +
            "<p>" + data[k1]["specification"] + " | " + data[k1]["packagetypename"] + "</p>" +
            "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'><span>￥<i>0</i></span>";
        oli += "<div class='right'>";
        if(data[k1]["itemcount"] <= 0) {
            oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
        } else {
            oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
        }
        oli += "</div><span class='del'>￥" + Number(data[k1]["itemunitcost"]).toFixed(1) + "0<i></i></span>" +
            " </div>" +
            "<div class='cgl-syu'>可提<span> " + data[k1]["remaincount"] + " </span>" + data[k1]["packagetypename"] + "</div>";
        oli += "</div>" +
            "</div> " +
            "</li>";
    }
    $("#cgl-contlist").find("ul").html(oli);
	$("#loading").hide();
}
//获取促销活动列表
function fnhqactive() {
    $("#cgl-contlist").find("ul").html("");
    $("#zhezao").show();
    $("#loading").show();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + fnurl().distributor_id + "/customer/" + localStorage.retaler + "/activity",
        data: {
            "lastcount": 0,
            "pagecount": 5000
        },
        timeout: "9000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#zhezao").hide();
            if(textStatus == "timeout") {
                console.log("请求超时")
                XMLHttpRequest.abort();
            }
        },
        success: function(data) {
            //console.log(JSON.stringify(data))
            console.log(data)
            $("#loading").hide();
            $("#zhezao").hide();
            fncuxiao(data)
        }
    });
}
//促销活动列表渲染
function fncuxiao(data) {
    var oli = "",
        dataid = null;
    for(var k1 in data) {
        dataid = {
            distributorid: fnurl().distributor_id,
            itemid: data[k1]["itemid"],
            activityitemid: data[k1]["activityitem_id"],
            remark:"",
            itemquality: data[k1]["itemquality"],
            itemprice: Number(data[k1]["discountprice"]).toFixed(1),
            isyucun: 0
        }
        //折扣和降价活动时
        if(data[k1]["itemkind"] == "折扣" || data[k1]["itemkind"] == "降价") {
            oli += "<li id=\""+k1+"\">" +
                "<div class='cgl-top hori'> " +
                "<img src='" + data[k1]["itemimage"] + "' alt=''> " +
                "<div class='the-xiangxi'> " +
                "<h3>";
            if(data[k1]["itemquality"] == 0) {
                oli += "<span class='cgl-linqi'></span>";
            }
            oli += data[k1]["itemname"] + "</h3>" +
                "<p>" + (data[k1]["specification"] == null ? "1*24" : data[k1]["specification"]) + " | " + (data[k1]["packagetypename"] == null ? "箱" : data[k1]["packagetypename"]) + "</p>" +
                "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'>" +
                "<span>￥<i>" + Number(data[k1]["discountprice"] || data[k1]["price"]*data[k1]["discount"]*0.1).toFixed(1) + "0</i></span>" +
                "<div class='right'>";
            if(data[k1]["itemcount"] <= 0) {
                oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            } else {
                oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            }
            oli += "</div>" +
                " </div><del>￥" + Number(data[k1]["originalprice"] || data[k1]["price"]).toFixed(1) + "0</del></div>" +
                "</div> " +
                "<div class='cgl-active'> <span>" + data[k1]["itemkind"] + "</span>" + data[k1]["discount"] + "折 </div> ";
            if(data[k1]["ruledesc"] != null) {
                oli += "<p class='cgl-beizhu'>备注：" + (data[k1]["ruledesc"] == null ? "" : data[k1]["ruledesc"]) + "</p>";
            }
            oli += "</li>";
        } else if(data[k1]["itemkind"] == "有礼" || data[k1]["itemkind"] == "买赠") {
            //有礼和买赠活动时
            dataid.itemprice = Number(data[k1]["saleprice"] || data[k1]["unitprice"]).toFixed(1);
            oli += "<li id=\""+k1+"\">" +
                "<div class='cgl-top hori'> " +
                "<img src='" + data[k1]["itemimage"] + "' alt=''> " +
                "<div class='the-xiangxi'> " +
                "<h3>";
            if(data[k1]["itemquality"] == 0) {
                oli += "<span class='cgl-linqi'></span>";
            }
            oli += data[k1]["itemname"] + "</h3>" +
                "<p style=\"height:16px\">" + (data[k1]["specification"]==null?"":data[k1]["specification"]+" | ") + (data[k1]["packagetypename"]==undefined?"":data[k1]["packagetypename"]) + "</p>" +
                "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'>" +
                "<span>￥<i>" + Number(data[k1]["saleprice"] || data[k1]["unitprice"]).toFixed(1) + "0</i></span>" +
                "<div class='right'>";
            if(data[k1]["itemcount"] <= 0) {
                oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            } else {
                oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            }
            oli += "</div></div></div></div>" +
                "<div class='cgl-active'><span>" + data[k1]["itemkind"] + "</span><p class='youligift'>购买 " + data[k1]["salecount"] + " " + (data[k1]["packagetypename"]==undefined?"":data[k1]["packagetypename"]) + data[k1]["itemname"] + "送" + data[k1]["giftitemobj"]["itemname"] + " " + data[k1]["giftcount"] + " " + (data[k1]["giftitemobj"]["packagetypename"]==null?"":data[k1]["giftitemobj"]["packagetypename"]);            
            if(data[k1]["giftitemquality"]){
            	data[k1]["giftitemquality"] == 0 ? oli += "(临期)" : oli += "";
            }else{
            	data[k1]["itemquality"] == 0 ? oli += "(临期)" : oli += "";
            }
            oli += "</p></div>";
            if(data[k1]["ruledesc"] != null) {
                oli += "<p class='cgl-beizhu'>备注：" + (data[k1]["ruledesc"] == null ? "" : data[k1]["ruledesc"]) + "</p>";
            }
            oli += "</li>";
        }
    }
    $("#cgl-contlist").find("ul").html(oli);
    if(_flag==1){
        fncarnum(data);
        _flag=0
    }


	

	
}
//一般列表
function fnlist(odata) {
    $("#cgl-contlist").find("ul").html("");
    $("#loading").show();
    $("#zhezao").show();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + fnurl().distributor_id + "/customer/" + localStorage.retaler + "/items",
        data: odata,
        timeout: "9000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#zhezao").hide();
            if(textStatus == "timeout") {
                $("#loading img").remove();
                $("#loading div").text("请求超时");
                console.log("请求超时")
                XMLHttpRequest.abort();
            }
        },
        success: function(data) {
            console.log(data)
            $("#loading").hide();
            $("#zhezao").hide();
            if(data.result == false) {
                console.log(data.error)
                $("#cgl-contlist").find("ul").html("<P style='padding-top:0.25rem'>暂无与“<b style='color:red'>"+$(".content").val()+"</b>”有关的商品</p>");
            } else {
                fnyibanlist(data)
            }
        }
    });
}
//一般列表渲染
function fnyibanlist(data) {
    var oli = "",
        dataid = null;
    for(var k1 in data) {
        if(data[k1]["itemslist"]) {
            if(data[k1]["itemslist"].length > 1) {
                //多种包装情况下包装大于1时
                oli += "<li class='cgl-ggmore " + data[k1].supplierid + "' itemcategory='" + data[k1]["itemcategory"] + "' itemsubcategory='" + data[k1]["itemsubcategory"] + "'>";
                for(var k2 in data[k1]["itemslist"]) {
                    dataid = {
                        distributorid: fnurl().distributor_id,
                        itemquality: data[k1]["itemquality"],
                        itemid: data[k1]["itemslist"][k2]["guid"],
                        itemprice: Number(data[k1]["itemslist"][k2]["price"]).toFixed(1),
                        isyucun: 0
                    }
                    oli += "<div class='cgl-top hori'> " +
                        "<img src='" + data[k1]["itemslist"][k2]["itemimage"] + "' alt=''> " +
                        "<div class='the-xiangxi'> " +
                        "<h3><span></span>" + data[k1]["itemslist"][k2]["itemname"] + "</h3>" +
                        "<div class='ggdiv'><p class='ggborder'>" + (data[k1]["itemslist"][k2]["specification"]==null?"":data[k1]["itemslist"][k2]["specification"]+" | ") + data[k1]["itemslist"][k2]["packagetypename"]==undefined?"":data[k1]["itemslist"][k2]["packagetypename"] + " > </p></div>" +
                        "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'><span>￥<i>" + data[k1]["itemslist"][k2]["price"] + "</i></span>" +
                        "<div class='right'>";
                    if(data[k1]["itemslist"][k2]["itemcount"] <= 0) {
                        oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemslist"][k2]["itemcount"] + "</span><span class='add'></span>";
                    } else {
                        oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemslist"][k2]["itemcount"] + "</span><span class='add'></span>";
                    }
                    oli += "</div></div></div>" +
                        "</div>";
                }	
            } else {
                //多种包装情况下包装等于1时
                for(var k3 in data[k1]["itemslist"]) {
                    dataid = {
                        distributorid: fnurl().distributor_id,
                        itemquality: data[k1]["itemquality"],
                        itemid: data[k1]["itemslist"][k3]["guid"],
                        itemprice: Number(data[k1]["itemslist"][k3]["price"]).toFixed(1),
                        isyucun: 0
                    }
                    oli += "<li class='" + data[k1].supplierid + "' itemcategory='" + data[k1]["itemcategory"] + "' itemsubcategory='" + data[k1]["itemsubcategory"] + "'>" +
                        "<div class='cgl-top hori'> " +
                        "<img src='" + data[k1]["itemslist"][k3]["itemimage"] + "' alt=''> " +
                        "<div class='the-xiangxi'> " +
                        "<h3><span></span>" + data[k1]["itemslist"][k3]["itemname"] + "</h3>" +
                        "<p style=\"height:16px\">" + (data[k1]["itemslist"][k3]["specification"]==null?"":data[k1]["itemslist"][k3]["specification"]+" | ") + (data[k1]["itemslist"][k3]["packagetypename"]==undefined?"":data[k1]["itemslist"][k3]["packagetypename"]) + "</p>" +
                        "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'><span>￥<i>" + data[k1]["itemslist"][k3]["price"] + "</i></span>" +
                        "<div class='right'>";
                    if(data[k1]["itemcount"] <= 0) {
                        oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
                    } else {
                        oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
                    }
                    oli += "</div></div></div></div></li>";
                }
            }
        } else {
            //一种包装时
            dataid = {
                distributorid: fnurl().distributor_id,
                itemquality: data[k1]["itemquality"],
                itemid: data[k1]["itemid"],
                itemprice: Number(data[k1]["originalprice"] || data[k1]["saleprice"] || data[k1]["unitprice"]).toFixed(1),
                isyucun: 0
            };
            oli += "<li class='" + data[k1].supplierid + "' itemcategory='" + data[k1]["itemcategory"] + "' itemsubcategory='" + data[k1]["itemsubcategory"] + "'>" +
                "<div class='cgl-top hori'> " +
                "<img src='" + data[k1]["itemimage"] + "' alt=''> " +
                "<div class='the-xiangxi'> " +
                "<h3><span></span>" + data[k1]["itemname"] + "</h3>" +
                "<p>" + (data[k1]["specification"] == null ? "" : data[k1]["specification"]+" | ") + (data[k1]["packagetypename"] == undefined ? "" : data[k1]["packagetypename"]) + "</p>" +
                "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'><span>￥<i>" + (data[k1]["originalprice"] || data[k1]["saleprice"] || data[k1]["unitprice"]) + "</i></span>";
            oli += "<div class='right'>";
            if(data[k1]["itemcount"] <= 0) {
                oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            } else {
                oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            }
            oli += "</div></div></div></div></li>";
        }
    }
    $("#cgl-contlist").find("ul").html(oli);
    //fncontscroll();
	}


function fnlist2(odata) {
    $("#cgl-contlist").find("ul").html("");
    $("#loading").show();
    $("#zhezao").show();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + fnurl().distributor_id + "/customer/" + localStorage.retaler + "/items",
        data: odata,
        timeout: "9000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#zhezao").hide();
            if(textStatus == "timeout") {
                $("#loading img").remove();
                $("#loading div").text("请求超时");
                console.log("请求超时");
                XMLHttpRequest.abort();
            }
        },
        success: function(data) {
            console.log(data);
            $("#loading").hide();
            $("#zhezao").hide();
            if(data.result == false) {
                console.log(data.error);
                $("#cgl-contlist").find("ul").html("<P style='padding-top:0.25rem'>暂无与“<b style='color:red'>"+$(".content").val()+"</b>”有关的商品</p>");
            } else {
                fnyibanlist2(data)
            }
        }
    });
}
function fnyibanlist2(data) {
    var oli = "",
        dataid = null;
    for(var k1 in data) {
        dataid = {
            distributorid: fnurl().distributor_id,
            itemid: data[k1]["itemid"],
            activityitemid: data[k1]["activityitem_id"],
            remark:"",
            itemquality: data[k1]["itemquality"],
            itemprice: Number(data[k1]["discountprice"]).toFixed(1),
            isyucun: 0
        }
        //折扣和降价活动时
        if(data[k1]["itemkind"] == "折扣" || data[k1]["itemkind"] == "降价") {
            oli += "<li active='active' class='" + data[k1].supplierid + "' itemcategory='" + data[k1]["itemcategory"] + "' itemsubcategory='" + data[k1]["itemsubcategory"] + "'>" +
                "<div class='cgl-top hori'> " +
                "<img src='" + data[k1]["itemimage"] + "' alt=''> " +
                "<div class='the-xiangxi'> " +
                "<h3>";
            if(data[k1]["itemquality"] == 0) {
                oli += "<span class='cgl-linqi'></span>";
            }
            oli += data[k1]["itemname"] + "</h3>" +
                "<p>" + (data[k1]["specification"] == null ? "" : data[k1]["specification"]+" | ") + (data[k1]["packagetypename"] == undefined ? "" : data[k1]["packagetypename"]) + "</p>" +
                "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'>" +
                "<span>￥<i>" + Number(data[k1]["discountprice"] || data[k1]["price"]*data[k1]["discount"]*0.1).toFixed(1) + "0</i></span>" +
                "<div class='right'>";
            if(data[k1]["itemcount"] <= 0) {
                oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            } else {
                oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            }
            oli += "</div>" +
                " </div><del>￥" + Number(data[k1]["originalprice"] || data[k1]["price"]).toFixed(1) + "0</del></div>" +
                "</div> " +
                "<div class='cgl-active'> <span>" + data[k1]["itemkind"] + "</span>" + data[k1]["discount"] + "折 </div> ";
            if(data[k1]["ruledesc"] != null) {
                oli += "<p class='cgl-beizhu'>备注：" + (data[k1]["ruledesc"] == null ? "" : data[k1]["ruledesc"]) + "</p>";
            }
            oli += "</li>";
        } else if(data[k1]["itemkind"] == "有礼" || data[k1]["itemkind"] == "买赠") {
            //有礼和买赠活动时
            dataid.itemprice = Number(data[k1]["saleprice"] || data[k1]["unitprice"]).toFixed(1);
            oli += "<li active='active' class='" + data[k1].supplierid + "' itemcategory='" + data[k1]["itemcategory"] + "' itemsubcategory='" + data[k1]["itemsubcategory"] + "'>" +
                "<div class='cgl-top hori'> " +
                "<img src='" + data[k1]["itemimage"] + "' alt=''> " +
                "<div class='the-xiangxi'> " +
                "<h3>";
            if(data[k1]["itemquality"] == 0) {
                oli += "<span class='cgl-linqi'></span>";
            }
            oli += data[k1]["itemname"] + "</h3>" +
                "<p>" + (data[k1]["specification"]==null?"":data[k1]["specification"]+" | ") + (data[k1]["packagetypename"]==undefined?"":data[k1]["packagetypename"]) + "</p>" +
                "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'>" +
                "<span>￥<i>" + Number(data[k1]["saleprice"] || data[k1]["unitprice"]).toFixed(1) + "0</i></span>" +
                "<div class='right'>";
            if(data[k1]["itemcount"] <= 0) {
                oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            } else {
                oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            }
            oli += "</div></div></div></div>" +
                "<div class='cgl-active'><span>" + data[k1]["itemkind"] + "</span><p class='youligift'>购买 " + data[k1]["salecount"] + " " + (data[k1]["packagetypename"]==undefined?"":data[k1]["packagetypename"]) + data[k1]["itemname"] + "送" + data[k1]["giftitemobj"]["itemname"] + " " + data[k1]["giftcount"] + " " + (data[k1]["giftitemobj"]["packagetypename"]==null?"":data[k1]["giftitemobj"]["packagetypename"]);
            if(data[k1]["giftitemquality"]){
            	data[k1]["giftitemquality"] == 0 ? oli += "(临期)" : oli += "";
            }else{
            	data[k1]["itemquality"] == 0 ? oli += "(临期)" : oli += "";
            }
            oli += "</p></div>";
            if(data[k1]["ruledesc"] != null) {
                oli += "<p class='cgl-beizhu'>备注：" + (data[k1]["ruledesc"] == null ? "" : data[k1]["ruledesc"]) + "</p>";
            }
            oli += "</li>";
        }else if(data[k1]["itemslist"]) {
            if(data[k1]["itemslist"].length > 1) {
                //多种包装情况下包装大于1时
                oli += "<li class='cgl-ggmore " + data[k1].supplierid + "' itemcategory='" + data[k1]["itemcategory"] + "' itemsubcategory='" + data[k1]["itemsubcategory"] + "'>";
                for(var k2 in data[k1]["itemslist"]) {
                    dataid = {
                        distributorid: fnurl().distributor_id,
                        itemquality: data[k1]["itemquality"],
                        itemid: data[k1]["itemslist"][k2]["guid"],
                        itemprice: Number(data[k1]["itemslist"][k2]["price"]).toFixed(1),
                        isyucun: 0
                    }
                    oli += "<div class='cgl-top hori'> " +
                        "<img src='" + data[k1]["itemslist"][k2]["itemimage"] + "' alt=''> " +
                        "<div class='the-xiangxi'> " +
                        "<h3><span></span>" + data[k1]["itemslist"][k2]["itemname"] + "</h3>" +
                        "<div class='ggdiv'><p class='ggborder'>" + (data[k1]["itemslist"][k2]["specification"]==null?"":data[k1]["itemslist"][k2]["specification"]+" | ") + (data[k1]["itemslist"][k2]["packagetypename"]==undefined?"":data[k1]["itemslist"][k2]["packagetypename"]) + " > </p></div>" +
                        "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'><span>￥<i>" + data[k1]["itemslist"][k2]["price"] + "</i></span>" +
                        "<div class='right'>";
                    if(data[k1]["itemslist"][k2]["itemcount"] <= 0) {
                        oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemslist"][k2]["itemcount"] + "</span><span class='add'></span>";
                    } else {
                        oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemslist"][k2]["itemcount"] + "</span><span class='add'></span>";
                    }
                    oli += "</div></div></div>" +
                        "</div>";
                }	
            } else {
                //多种包装情况下包装等于1时
                for(var k3 in data[k1]["itemslist"]) {
                    dataid = {
                        distributorid: fnurl().distributor_id,
                        itemquality: data[k1]["itemquality"],
                        itemid: data[k1]["itemslist"][k3]["guid"],
                        itemprice: Number(data[k1]["itemslist"][k3]["price"]).toFixed(1),
                        isyucun: 0
                    }
                    oli += "<li class='" + data[k1].supplierid + "' itemcategory='" + data[k1]["itemcategory"] + "' itemsubcategory='" + data[k1]["itemsubcategory"] + "'>" +
                        "<div class='cgl-top hori'> " +
                        "<img src='" + data[k1]["itemslist"][k3]["itemimage"] + "' alt=''> " +
                        "<div class='the-xiangxi'> " +
                        "<h3><span></span>" + data[k1]["itemslist"][k3]["itemname"] + "</h3>" +
                        "<p style=\"height:16px\">" + (data[k1]["itemslist"][k3]["specification"]==null?"":data[k1]["itemslist"][k3]["specification"]+" | ") + (data[k1]["itemslist"][k3]["packagetypename"]==undefined?"":data[k1]["itemslist"][k3]["packagetypename"]) + "</p>" +
                        "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'><span>￥<i>" + data[k1]["itemslist"][k3]["price"] + "</i></span>" +
                        "<div class='right'>";
                    if(data[k1]["itemslist"][k3]["itemcount"] <= 0) {
                        oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemslist"][k3]["itemcount"] + "</span><span class='add'></span>";
                    } else {
                        oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemslist"][k3]["itemcount"] + "</span><span class='add'></span>";
                    }
                    oli += "</div></div></div></div></li>";
                }
            }
        } else {
            //一种包装时
            dataid = {
                distributorid: fnurl().distributor_id,
                itemquality: data[k1]["itemquality"],
                itemid: data[k1]["itemid"],
                itemprice: Number(data[k1]["originalprice"] || data[k1]["saleprice"] || data[k1]["unitprice"]).toFixed(1),
                isyucun: 0
            }
            oli += "<li class='" + data[k1].supplierid + "' itemcategory='" + data[k1]["itemcategory"] + "' itemsubcategory='" + data[k1]["itemsubcategory"] + "'>" +
                "<div class='cgl-top hori'> " +
                "<img src='" + data[k1]["itemimage"] + "' alt=''> " +
                "<div class='the-xiangxi'> " +
                "<h3><span></span>" + data[k1]["itemname"] + "</h3>" +
                "<p>" + (data[k1]["specification"] == null ? "" : data[k1]["specification"]+ " | ") + (data[k1]["packagetypename"] == undefined ? "" : data[k1]["packagetypename"]) + "</p>" +
                "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'><span>￥<i>" + (data[k1]["originalprice"] || data[k1]["saleprice"] || data[k1]["unitprice"]) + "</i></span>";
            oli += "<div class='right'>";
            if(data[k1]["itemcount"] <= 0) {
                oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            } else {
                oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            }
            oli += "</div></div></div></div></li>";
        }
    }
    $("#cgl-contlist").find("ul").html(oli);
    //fncontscroll();
	
}
//商品规格点击切换
function fnggmore() {
    $("#cgl-contlist").on("click", ".cgl-ggmore .ggborder", function() {
        var odiv = $(this).parents(".cgl-ggmore").find(">div");
        for(var i = 0; i < odiv.length; i++) {
            //console.log(odiv.eq(i)[0]==$(this).parents(".cgl-top")[0])
            if(odiv.eq(i)[0] == $(this).parents(".cgl-top")[0]) {
                odiv.eq(i).hide();
                if(i + 1 >= odiv.length) {
                    odiv.eq(0).show().css({
                        "display": "-webkit-box"
                    });
                } else {
                    odiv.eq(i + 1).show().css({
                        "display": "-webkit-box"
                    });
                }

            }
        }
    });
}
//商品数量加减
function fncarnum(data) {
    $("#cgl-cont").on("click", ".jian", function() {
        var num = Number($(this).next().html());
        console.log(num)
        if($(this).parent().parent().parent().parent().parent().attr("id") && num>1){
            if(num==data[$(this).parent().parent().parent().parent().parent().attr("id")]["salecount"]){

                $(".ammount").html($(".ammount").html() - num);
                $(".num").html($(".ammount").html())
                num=0
                $(".price>i").html((Number($(".price>i").html())-(Number($(this).next().html())-num)*Number($(this).parent().prev().find("i").html())).toFixed(1));
                $(this).hide().next().hide().html(0);
            }else{
                $(".price>i").html((Number($(".price>i").html())-Number($(this).parent().prev().find("i").html())).toFixed(1));
                $(".ammount").html($(".ammount").html() - 1);
                $(".num").html($(".ammount").html())
                $(this).next().html(Number($(this).next().html())-1)
            }

        }else{

            if(num <= 1) {
                $(this).hide().next().hide().html(0);
                $(".ammount").html($(".ammount").html() - 1);
                $(".num").html($(".ammount").html());
            } else {
                $(this).next().html(num - 1);
                $(".ammount").html($(".ammount").html() - 1);
                $(".num").html($(".ammount").html());
            }
            $(".price>i").html(($(".price>i").html()-$(this).parent().prev().find("i").html()).toFixed(1));
        }
        fnaddcar(this, $(this).next().html() - 0);
    }).on("click", ".add", function() {
        var num = Number($(this).prev().html());
        
        var xian = Number($(this).parents(".the-xiangxi").find(".cgl-syu>span").html());
		console.log($(this).prev().text())
        if(xian && Number($(this).prev().text())>=xian) {
            console.log("购买已到上限")
        } else {
	        if(num==0 && $(this).parent().parent().parent().parent().parent().attr("id") && data[$(this).parent().parent().parent().parent().parent().attr("id")]["salecount"]){
	            num+=Number(data[$(this).parent().parent().parent().parent().parent().attr("id")]["salecount"])
	            var _l=(Number($(".price>i").html())+(num-Number($(this).prev().html()))*Number($(this).parent().prev().find("i").html())).toFixed(1)
	            $(".ammount").html(Number($(".ammount").html()) +num);
	            $(this).prev().html(Number($(this).prev().html())+num).show().prev().show();
	            $(".price>i").html(_l);
	
	        }else{
	            $(".ammount").html(Number($(".ammount").html()) +1);
	            $(this).prev().html(num + 1).show().prev().show();
	            $(".price>i").html((Number($(".price>i").html())+Number($(this).parent().prev().find("i").html())).toFixed(1));
	        }

            $(".num").html($(".ammount").html());


            fnaddcar(this, $(this).prev().html() - 0);
        }

    });
}
//添加购物车
function fnaddcar(that, a) {
    fnqisong();
    var dataid = JSON.parse($(that).parents(".c-price").attr("dataid"));
    dataid.itemcount = a;
    dataid.versiontime = formaty();
    console.log(dataid)
    $("#zhezao").show();
    $.ajax({
        url: "/webapi/distributor/" + localStorage.retaler + "/shoppingcart",
        contentType: "application/json; charset=utf-8",
        async: true,
        cache: false,
        data: JSON.stringify(dataid),
        dataType: "json",
        type: "post",
        timeout: "9000",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#zhezao").hide();
            if(textStatus == "timeout") {
                console.log("请求超时")
                XMLHttpRequest.abort();
            }
        },
        success: function(data) {
            console.log(data)
            $("#zhezao").hide();
        }
    })

}
//生成当前时间
function formaty() {
    var d = new Date();
    _year = d.getFullYear();
    _month = d.getMonth() + 1;
    _day = d.getDate();
    _hour = d.getHours();
    _minute = d.getMinutes();
    _second = d.getSeconds();
    _msecond = d.getMilliseconds();
    if(_hour < 10) {
        _hour = "0" + _hour;
    }
    if(_month < 10) {
        _month = "0" + _month;
    }
    if(_day < 10) {
        _day = "0" + _day;
    }
    if(_minute < 10) {
        _minute = "0" + _minute;
    }
    if(_second < 10) {
        _second = "0" + _second;
    }
    if(_msecond < 100 && _msecond > 10) {
        _msecond = "0" + _msecond
    } else if(_msecond < 10) {
        _msecond = "00" + _msecond
    }
    return _year + "-" + _month + "-" + _day + " " + _hour + ":" + _minute + ":" + _second + "." + _msecond;
}
//起送价
function fnqisong() {
    $(".footerr>span>i").html(Number(fnurl().cutgift - $(".price>i").html()).toFixed(1));
    if($(".price>i").html() >= fnurl().cutgift) {
        $(".footerr>span").hide();
        $(".footerr>a").show();
    } else {
        $(".footerr>a").hide();
        $(".footerr>span").show();
    }
}
//获取每个品牌对应所有商品高度
function fngethei(idclass) {
    var heigh = 0;
    $("." + idclass).each(function(i) {
        heigh += $(this).outerHeight();
    })
    return heigh;
}
//一般商品列表滚动事件
function fncontscroll() {
    //var thetop=$(".cgl-contlist").find("li:eq("+n+")").offset().top - $('#cgl-cont').offset().top;
    var n = 0;
    var arr = $(".cgl-menu>li:gt(1)");
    var heiarr = [];
    arr.each(function(i) {
        n += fngethei(arr.eq(i).attr("id"));
        heiarr[i] = [arr.eq(i).attr("id")] + "=" + n;
    });
    //console.log(heiarr);

    $(".cgl-contlist").off("scroll").scroll(function() {
        for(var j = 0; j < heiarr.length; j++) {
            if($(this)[0].scrollTop < heiarr[0].split("=")[1]) {
                $(".cgl-menu").find(">li").removeClass('clion').find('.submenu').slideUp(300);
                $(".link>i").show();
                $("#" + heiarr[0].split("=")[0]).addClass("clion").find(">.link>i").hide();
            } else if($(this)[0].scrollTop > heiarr[j].split("=")[1] && $(this)[0].scrollTop < heiarr[j + 1].split("=")[1]) {
                $(".cgl-menu").find(">li").removeClass('clion').find('.submenu').slideUp(300);
                $(".link>i").show();
                $("#" + heiarr[j + 1].split("=")[0]).addClass("clion").find(">.link>i").hide();
            }
        }

    });
}
//搜索
function fnserach() {
    $(".clear").on("click", function() {
        $(".content").val("");
    });
    var odata = {
        "filter": "",
        "filtertype": 0,
        "lastcount": 0,
        "pagecount": 5000
    };
    $(".searchbtn").on("click", function() {
        $(".sanji").slideUp(300).find("h4>i").css("transform", "rotateZ(90deg)");
        $("#cgl-contlist").find("ul").animate({
            "margin-top": "0"
        }, 300);
        $(".sanji-zi").hide().find(">ul").html($(this).find(".hide1").html());
        if($(".titlestyle>span").html() == "品牌") {
            odata.filtertype = 1;
        } else {
            odata.filtertype = 0;
        }
/*
        $(".sanji").slideUp(300).find("h4>i").css("transform", "rotateZ(90deg)");
        $("#cgl-contlist").find("ul").animate({
            "margin-top": "0"
        }, 300);
        $(".sanji-zi").hide().find(">ul").html($(this).find(".hide1").html());

        odata.filter = $(".content").val();
        if($(".titlestyle>span").html() == "品牌") {
            odata.filtertype = 1;
        } else {
            odata.filtertype = 0;
        }
        fnlist2(odata);
        $("#cgl-menu").find(">li").removeClass("clion").find(">ul").slideUp(300,function () {
            fnmenuhei();
        });
        $("#cgl-menu").find(">li").removeClass("clion").find(".link>i").show();
*/
        odata.filter = $(".content").val();
        if(odata.filter==0){
            $("#cgl-menu").find("li:gt(1)").remove();
            $("#cgl-menu").find("li:eq(1)").show();
            $("#cgl-menu").find("li").removeClass("clion");
            $(".sale ").addClass("clion");
            fnmenu(); //获取菜单列表
            fnhqactive();//获取促销活动列表
        }else if($(">li:eq(0)","#cgl-menu").attr("class")=="clion"){
            var ycdata={
                "filter": odata.filter,
                "filtertype": odata.filtertype
            }
            $("#cgl-menu").off("click").find("li:gt(1)").remove();
            $("#cgl-menu").find("li:eq(1)").hide();
            $("#yucun").off("click").on("click",function () {
                $(">ul>li","#cgl-contlist").show();
            },300);
            fnsearchyc(ycdata);//预存货搜索

        }else{

            if($(".titlestyle>span").html() == "品牌") {
                odata.filtertype = 1;
            } else {
                odata.filtertype = 0;
            }
            fnserchapi(odata);

        }
    });
}

//预存货搜索
function fnsearchyc(odata) {
    $("#cgl-contlist").find("ul").html("");
    $("#loading").show();
    $("#zhezao").show();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + fnurl().distributor_id + "/customer/" + localStorage.retaler + "/prepayinventorys",
        //url: "../../data/activeindex.json",
        data: odata,
        timeout: "2000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#zhezao").hide();
            $("#loading").hide();
            if(textStatus == "timeout") {
                console.log("请求超时")
                XMLHttpRequest.abort();
            }
        },
        success: function(data) {
            $("#zhezao").hide();
            fnychxr(data);
            //sessionStorage.setItem("yucunhuo", JSON.stringify(data));
        }
    });

}
//搜索功能ajax请求
function fnserchapi(odata) {
    $("#cgl-contlist").find("ul").html("");
    $("#loading").show();
    $("#zhezao").show();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + fnurl().distributor_id + "/customer/" + localStorage.retaler + "/items",
        data: odata,
        timeout: "9000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#zhezao").hide();
            if(textStatus == "timeout") {
                $("#loading img").remove();
                $("#loading div").text("请求超时");
                //console.log("请求超时");
                XMLHttpRequest.abort();
            }
        },
        success: function(data) {
            console.log(data);
            $("#loading").hide();
            $("#zhezao").hide();
            menusx(data["groupdata"]);
            $(".sale ").addClass("clion");
            if(data.result == false) {
                console.log(data.error);
                $("#cgl-contlist").find("ul").html("<P style='padding-top:0.25rem'>暂无与“<b style='color:red'>"+$(".content").val()+"</b>”有关的商品</p>");
            } else {
                fnyibanlist2(data["datalist"]);
            }
        }
    });
}
function menusx(data) {
    var putli=$("#cgl-menu").find("li:gt(1)");
    putli.remove();
    xuanrmenu(data);
    $("#cgl-menu").off("click").find(">li").on("click",function () {
        var theid=$(this).attr("id");
        fnmclick(theid,"class")
    });
    $("#cgl-menu").find(">li:eq(0)").on("click",function () {
        $(".cgl-contlist").find(">ul>li").hide();
    });

}
//搜索功能下品牌筛选
function fnmclick(theid,idd) {
    var n1=$(".cgl-contlist").find(">ul>li");

    for(var i=0;i<n1.length;i++){
        if(theid=="active" && n1.eq(i).attr("active")=="active"){
            n1.eq(i).show();
        }else if(n1.eq(i).attr(idd)==theid){
            n1.eq(i).show();
        }else{
            n1.eq(i).hide();
        }
    }
    $("#cgl-contlist").scrollTop(0);
}
$(function() {
    if(localStorage.reload==1){
        var _tt=setInterval(function(){
            localStorage.reload=0;

            fnpinpai(); //品牌下拉点击事件
            fnurl(); //获取地址栏参数
            fnpricenum(); //获取购物车总金额和总数量
            fnxrym(); //通过参数渲染页面
            fnscroll(); //打电话显示与隐藏
            fnmenu(); //获取菜单列表
            fnhqactive();//获取促销活动列表
            fnerji(); //遮罩点击
            fnggmore(); //商品规格点击切换
            //商品数量加减
            fnserach(); //搜索
            fnmclick2 ();
            //guowu()
            clearInterval(_tt);
        },100)
    }else{
        localStorage.reload=1;
        fnpinpai(); //品牌下拉点击事件
        fnurl(); //获取地址栏参数
        fnpricenum(); //获取购物车总金额和总数量
        fnxrym(); //通过参数渲染页面
        fnscroll(); //打电话显示与隐藏
        fnmenu(); //获取菜单列表
        fnhqactive();//获取促销活动列表
        fnerji(); //遮罩点击
        fnggmore(); //商品规格点击切换
        //商品数量加减
        fnserach(); //搜索
        fnmclick2 ();
        //guowu()
    }
});