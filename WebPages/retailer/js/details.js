	$(document).ready(function(){
		

		var _page=localStorage.pg;
		if(JSON.parse(_page)["pageindex"]==1){
			_page=""
		}
		var commodity=location.search.split("&")[1].replace("index=","")
		var pg=location.search.split("&")[0].replace("?pg=","")
		var _list="";
		var _list2="";
		var _kind="";
		var _give="";
		var _flag=1;
		var _price=0;
		var _amount=0;
		var _data1=JSON.parse(localStorage.retalerdata).data
		var _pp="";
		var _image="";
		var _img="";
		var _discount=0
		var _zeng=0;
		var _get=0;
		var _list3="";
		var _indd=localStorage.list;
		var _ly="";
		var _zengg=""
		console.log(pg)
		console.log(_data1[pg]["distributor_id"])
		console.log(commodity)
		$.ajax({
			type:"get",
			url:"/webapi/distributor/"+getRetailerid()+"/orderforms?distributor_id="+_data1[pg]["distributor_id"]+"&paging="+_page,
			async:true,
			success:function(data){
										console.log(data)
						$(".emp li:nth-child(1)").text("订单号："+data["content"][commodity]["serialnumber"])
						$(".emp li:nth-child(2)").text("下单时间："+data["content"][commodity]["issuetime"])
						$(".emp li:nth-child(3)").text("期望配送时间："+data["content"][commodity]["billexpecteddelivertime"])
						$(".emp li:nth-child(4)").text("订单备注："+(data["content"][commodity]["description"]==null?"":data["content"][commodity]["description"]))
						$(".emp li:nth-child(5)").text("分销商名称："+_data1[pg]["distributorname"])
						$(".emp li:nth-child(6)").text("联系方式："+_data1[pg]["mobilephone"])
						//alert(data["content"][7]["details"].length)
						_image="<img src=../../image/shop/yu.jpg />"
						for(var i=0;i<data["content"][commodity]["details"].length;i++){
							if(data["content"][commodity]["details"][i]["description"]){
								if(data["content"][commodity]["details"][i]["description"]!="" || data["content"][commodity]["details"][i]["description"]!=null){
									_remark="<div class="+"\"give\""+"><div class="+"\"give-tit\""+">留言：</div><div class="+"\"give-con\""+">"+data["content"][commodity]["details"][i]["description"]+"</div></div>"
								}							
							}else{
								_remark="";
							}
							console.log(data["content"][commodity]["details"][i]["itemquality"])
							if(data["content"][commodity]["details"][i]["itemquality"]==0){
								_img="<img src=\"../../image/shop/icon_lin.png\" style=\"float: left;width: 1.6rem;height: 1.6rem;\">"
							}else{
								_img="";
							}
//							if(data["content"][commodity]["details"][i]["description"]!="" || data["content"][commodity]["details"][i]["description"]!=null){
//								_ly="<div class="+"\"disc2\" style="+(data1[i]["remark"]==""?"display:none":"")+"><div>留言：<input readonly=\"true\" style=\";outline:none;width:80%;font-size:1.6rem\" value="+(data1[i]["remark"]==""?"":data1[i]["remark"])+"></div></div>"
//							}
							if(data["content"][commodity]["details"][i]["billid_class"]==="tblbillpofromcustomer"){
//								_list+="<li><div class="+"\"shop-con\""+"><img src="+data["content"][commodity]["details"][i]["itemobj"]["itemimage"]+" /><div class="+"\"shop-con-bd\""+">"+_image+"<div class="+"\"shop-tit\""+"><span>"+data["content"][commodity]["details"][i]["itemobj"]["itemname"]+"</span></div><div class="+"\"shop-body\""+">￥"+(data["content"][commodity]["details"][i]["itemunitcost"]*data["content"][commodity]["details"][i]["qualitycount"]).toFixed(1)+
//								"</div><div class="+"\"number\""+"><div style="+"\"text-align:left\">"+data["content"][commodity]["details"][i]["itemobj"]["specification"]+" | "+
//								data["content"][commodity]["details"][i]["itemobj"]["packagetypename"]+"</div><div>x"+data["content"][commodity]["details"][i]["qualitycount"]+
//								"</div></div></div></div><div class="+
//								"\"discount\""+"></li>";
						if(data["content"][commodity]["details"][i]["itemgifttype"]!=3){
						if(!data["content"][commodity]["details"][i]["activityitem_id"]){
		       			//_price+=data[i]["price"]*data[i]["itemcount"];
		       			//_get+=Number(Number(data["content"][commodity]["details"][i]["itemunitcost"])*Number(data["content"][commodity]["details"][i]["itemcount"]))
//		       			_list+="<li><div class="+"\"shop-con\""+"><img src="+data["content"][commodity]["details"][i]["itemobj"]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
//			       		">"+data["content"][commodity]["details"][i]["itemobj"]["itemname"]+_img+"</div><div class="+"\"shop-body\""+">￥"+data["content"][commodity]["details"][i]["itemobj"]["itemunitcost"]+"</div><div class="+"\"number\""+
//			       		"><div></div><div>×"+data["content"][commodity]["details"][i]["itemcount"]+"</div></div><span class="+"\"pi\""+">￥"+data["content"][commodity]["details"][i]["itemunitcost"].toFixed(2)+"<span style="+"\"display:inline-block;width:1.4rem;height:1.4rem;border-radius:50%;text-align:center;border:1px solid #ccc\""+
//							">预</span></span><p>可提"+data["content"][commodity]["details"][i]["prepaycount"]+data[i]["packagetypename"]+"</p></div></div></li>"
								_get+=data["content"][commodity]["details"][i]["itemunitcost"]*data["content"][commodity]["details"][i]["itemcount"]
								_list+="<li><div class="+"\"shop-con\""+"><img src="+data["content"][commodity]["details"][i]["itemobj"]["itemimage"]+" /><div class="+"\"shop-con-bd\""+">"+/*_image+*/"<div class="+"\"shop-tit\""+"><span>"+data["content"][commodity]["details"][i]["itemobj"]["itemname"]+"</span></div><div class="+"\"shop-body\""+">￥"+(data["content"][commodity]["details"][i]["itemunitcost"]).toFixed(1)+
								"</div><div class="+"\"number\""+"><div style="+"\"text-align:left\">"+(data["content"][commodity]["details"][i]["itemobj"]["specification"]==null?"":data["content"][commodity]["details"][i]["itemobj"]["specification"]+" | ")+
								(data["content"][commodity]["details"][i]["itemobj"]["packagetypename"]==null?"":data["content"][commodity]["details"][i]["itemobj"]["packagetypename"])+"</div><div>x"+data["content"][commodity]["details"][i]["itemcount"]+
								"</div></div></div></div><div class="+
								"\"discount\""+">"+_remark+"</li>";
			       		}else if(data["content"][commodity]["details"][i]["itemkind"]=="降价"){
			       			//_price+=data[i]["price"]*data[i]["itemcount"];
			       			_get+=data["content"][commodity]["details"][i]["itemunitcost"]*data["content"][commodity]["details"][i]["itemcount"]
			       			_discount+=(data["content"][commodity]["details"][i]["itemoriginalcost"]-data["content"][commodity]["details"][i]["itemunitcost"])*data["content"][commodity]["details"][i]["itemcount"]
			       			_list+="<li><div class="+"\"shop-con\""+"><img src="+data["content"][commodity]["details"][i]["itemobj"]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+data["content"][commodity]["details"][i]["itemobj"]["itemname"]+_img+"</div><div class="+"\"shop-body\""+">￥"+data["content"][commodity]["details"][i]["itemunitcost"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div style="+"\"text-align:left\">"+data["content"][commodity]["details"][i]["itemobj"]["specification"]+" | "+
								data["content"][commodity]["details"][i]["itemobj"]["packagetypename"]+"</div><div>×"+data["content"][commodity]["details"][i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">降价</div><span class="+"\"discount-con\""+
			       		">"+data["content"][commodity]["details"][i]["discount"]+" 折</span></div>"+_remark+"</li>"
			       		}else if(data["content"][commodity]["details"][i]["itemkind"]=="买赠"){
			       			//_price+=data[i]["price"]*data[i]["itemcount"];
			       			for(var r=0;r<data["content"][commodity]["details"].length;r++){
			       				if(data["content"][commodity]["details"][r]["billid_class"]==="tblbillgift" && data["content"][commodity]["details"][r]["promotionno"]==data["content"][commodity]["details"][i]["guid"]){
									_zengg=data["content"][commodity]["details"][r]["itemobj"]["itemname"]+data["content"][commodity]["details"][r]["itemcount"]+(data["content"][commodity]["details"][r]["itemobj"]["packagetypename"]==null?"":data["content"][commodity]["details"][r]["itemobj"]["packagetypename"])
								}
			       			}
			       			_get+=data["content"][commodity]["details"][i]["itemunitcost"]*data["content"][commodity]["details"][i]["itemcount"]
			       			_list+="<li><div class="+"\"shop-con\""+"><img src="+data["content"][commodity]["details"][i]["itemobj"]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+data["content"][commodity]["details"][i]["itemobj"]["itemname"]+_img+"</div><div class="+"\"shop-body\""+">￥"+data["content"][commodity]["details"][i]["itemunitcost"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div style="+"\"text-align:left\">"+data["content"][commodity]["details"][i]["itemobj"]["specification"]+" | "+
								data["content"][commodity]["details"][i]["itemobj"]["packagetypename"]+"</div><div>×"+data["content"][commodity]["details"][i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">买赠</div><span class="+"\"discount-con\""+
			       		">买"+data["content"][commodity]["details"][i]["salecount"]+data["content"][commodity]["details"][i]["itemobj"]["packagetypename"]+data["content"][commodity]["details"][i]["giftitemobj"]["itemname"]+"赠"+data["content"][commodity]["details"][i]["giftcount"]+data["content"][commodity]["details"][i]["itemobj"]["packagetypename"]+data["content"][commodity]["details"][i]["giftitemobj"]["itemname"]+"</span></div><div class="+"\"give\""+"><div class="+"\"give-tit\""+">赠品：</div><div class="+"\"give-con\""+">"+_zengg+"</div></div>"+_remark+"</li>"
			       		}else if(data["content"][commodity]["details"][i]["itemkind"]=="有礼"){
			       			//_price+=data[i]["price"]*data[i]["itemcount"];
			       			for(var r=0;r<data["content"][commodity]["details"].length;r++){
			       				if(data["content"][commodity]["details"][r]["billid_class"]==="tblbillgift" && data["content"][commodity]["details"][r]["promotionno"]==data["content"][commodity]["details"][i]["guid"]){
									_zengg=data["content"][commodity]["details"][r]["itemobj"]["itemname"]+data["content"][commodity]["details"][r]["itemcount"]+(data["content"][commodity]["details"][r]["itemobj"]["packagetypename"]==null?"":data["content"][commodity]["details"][r]["itemobj"]["packagetypename"])
								}
			       			}
			       			_get+=data["content"][commodity]["details"][i]["itemunitcost"]*data["content"][commodity]["details"][i]["itemcount"]
			       			    _list+="<li><div class="+"\"shop-con\""+"><img src="+data["content"][commodity]["details"][i]["itemobj"]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+data["content"][commodity]["details"][i]["itemobj"]["itemname"]+_img+"</div><div class="+"\"shop-body\""+">￥"+data["content"][commodity]["details"][i]["itemunitcost"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div style="+"\"text-align:left\">"+data["content"][commodity]["details"][i]["itemobj"]["specification"]+" | "+
								data["content"][commodity]["details"][i]["itemobj"]["packagetypename"]+"</div><div>×"+data["content"][commodity]["details"][i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">有礼</div><span class="+"\"discount-con\""+
			       		">购买"+data["content"][commodity]["details"][i]["salecount"]+data["content"][commodity]["details"][i]["itemobj"]["packagetypename"]+data["content"][commodity]["details"][i]["itemobj"]["itemname"]+"赠送"+
								data["content"][commodity]["details"][i]["giftcount"]+data["content"][commodity]["details"][i]["itemobj"]["packagetypename"]+data["content"][commodity]["details"][i]["giftitemobj"]["itemname"]+"</span></div><div class="+"\"give\""+"><div class="+"\"give-tit\""+">赠品：</div><div class="+"\"give-con\""+">"+_zengg+"</div></div>"+_remark+"</li>"
			       		}else if(data["content"][commodity]["details"][i]["itemkind"]=="折扣"){
			       			//_price+=data[i]["price"]*data[i]["itemcount"];
			       			_get+=data["content"][commodity]["details"][i]["itemunitcost"]*data["content"][commodity]["details"][i]["itemcount"]
			       			_discount+=(data["content"][commodity]["details"][i]["itemoriginalcost"]-data["content"][commodity]["details"][i]["itemunitcost"])*data["content"][commodity]["details"][i]["itemcount"]
			       			_list+="<li><div class="+"\"shop-con\""+"><img src="+data["content"][commodity]["details"][i]["itemobj"]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+_img+"</div><div class="+"\"shop-body\""+">￥"+data["content"][commodity]["details"][i]["itemunitcost"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div></div><div>×"+data[i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">折扣</div><span class="+"\"discount-con\""+
			       		">"+data["content"][commodity]["details"][i]["discount"]+"</span></div>"+_remark+"</li>"   			
			       		}
			       		}
								//_amount+=Number(data["content"][commodity]["details"][i]["itemunitcost"]*data["content"][commodity]["details"][i]["qualitycount"])

								//_price+=data["content"][commodity]["details"][i]["itemunitcost"]*data["content"][commodity]["details"][i]["qualitycount"]
								var _ll="";
								var _kk=0;
								console.log(_price)

								
								
								console.log(_give)

								
							}else{
								_zeng+=Number(data["content"][commodity]["details"][i]["itemunitcost"]*data["content"][commodity]["details"][i]["itemcount"])
							}
							console.log(i)
							if(data["content"][commodity]["details"][i]["billid_class"]=="tblbillgift" && data["content"][commodity]["details"][i]["itemkind"]=="满赠"){
											_ll=data["content"][commodity]["details"][i]["itemobj"]["itemname"];
											_kk=Number(data["content"][commodity]["details"][i]["itemcount"])
											if(_flag==1){
												_give+="<li><div class="+"\"gg\""+">满赠</div><span class="+"\"gif\""+">"+_ll+"<span>×"+_kk+"</span></span></li>"
												_flag++
											}else{
												_give+="<li><div class="+"\"gift\""+">"+_ll+"<span>×"+_kk+"</span></div></li>"
											}
							}
						}
						$("#pp span").text(_discount.toFixed(1))
						if(_data1[_indd]["specialprice"]!==0){
		        			$("#vv").css({display:"flex"})
		        			_discount+=Number(_data1[_indd]["specialprice"])
		        			$("#vv span").text(_data1[_indd]["specialprice"].toFixed(1))
		        		}
						console.log(_get)
						
						$("#ss span").text(_zeng.toFixed(1))
						
//								for(var b=0;b<_data1[pg]["promotionactivity"]["details"].length;b++){
//									if(_amount>=_data1[pg]["promotionactivity"]["details"][b]["moneysum"]){
//										console.log(1)
//										for(var c=0;c<_data1[pg]["promotionactivity"]["details"][b]["giftitems"].length;c++){
//											_ll=_data1[pg]["promotionactivity"]["details"][b]["giftitems"][c]["itemname"];
//											_kk=Number(_data1[pg]["promotionactivity"]["details"][b]["giftitems"][c]["count"])
//											if(_flag==1){
//												_give+="<li><div class="+"\"gg\""+">满赠</div><span class="+"\"gif\""+">"+_ll+"<span>×"+_kk+"</span></span></li>"
//												_flag++
//											}else{
//												_give+="<li><div class="+"\"gift\""+">"+_ll+"<span>×"+_kk+"</span></div></li>"
//											}										
//										}
//
//									}
//								}
						$(".shoplist").html($(".shoplist").html()+_list)
						if(_list2!=""){
							$(".gflist").html($(".gflist").html()+_list2)
						}else{
							$(".gflist").css({display:"none"})
						}
						if(_list3!==""){
							$(".yucunList").html($(".yucunList").html()+_list3)
						}else{
							$(".yucunList").css({display:"none"})
						}
						
						//alert(_give)
						if(_give!=""){
							$(".kind").html(_give)
						}else{
							$(".giveto").remove()
						}
						$("#dd span").text(_get.toFixed(1))
						_get-=Number($("#vv span").text())
						if(_data1["itemkind"]=="满减"){						
							if(_get>=100 && _get<500){
								$("#same-ss div:nth-child(3)").text("￥10.0")
								_get-=10
							}else if(_get>=500){
								$("#same-ss div:nth-child(3)").text("￥50.0")
								_get-=50
							}else if(_get<100){
								$("#same-ss div:nth-child(3)").text("￥0.0")
								$("#same-ss").css({display:"none"})
							}
							_discount+=Number($("#same-ss div:nth-child(3)").text().replace("￥",""))
						}else{
							$("#same-ss").css({display:"none"})
						}
						
						$(".amountBig").next().find("span").text(_discount.toFixed(1))
						$(".amountBig span").text(_get.toFixed(1))
				console.log($("section").css("height"))
				console.log($("body").css("height"))
				if(Number($("section").css("height").replace("px",""))<=Number($("body").css("height").replace("px",""))){
					$("html").css({overflow:"hidden"})
				}else{
					$("html").css({overflow:"scroll"})
				}
				$(".loads").css({display:"none"})
				
			}
		});

	})