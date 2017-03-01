	$(document).ready(function(){
			localStorage.reload=1;
			asd()
	})
	function asd(){//购物车页起始调用函数
		var _list="";
		var _give="";
		var _color="";
		var _distrgive="";
		var _id="";
		var _count=0;
		var _save=0;
		var _arr=[];
		var _price=0;
		var _discount=0;
		var _Id=[];
		var _tt="";
		var _active="";
		var _dll=0;
		var _disId="";
		var _sv=[];
		var _dis=0
		var _pp=0;
		var _ct=0;
		var _qu=0;
		var _ges=0;
		var _cun=0;
		var _indd=localStorage.index
		_disId=location.search.replace("distributor_id=","").replace("?","");
		localStorage.disId=_disId
		console.log(_disId)
			_tt=JSON.parse(localStorage.retalerdata).data;
			console.log(_tt)
			
			$.ajax({//获取购物车业的数据
				url:"/webapi/distributor/"+getRetailerid()+"/shoppingcart/"+_disId+"?isvalid=0",
				async:true,
		    	cache:false,
		        dataType:"json",
		        type:"get",
		        error:function(){},
		        success:function(data1){
		        	console.log(data1)
		        	show(data1)
		        }
			})
		function aa(){//提交订单文字变化
			$(".commit").css({background:"#009f96",width:"24%"})
			$(".commit").html("去提交"+"<span>("+_ges+")</span>")
			console.log(_Id)
			_qu=0
			
				$(".commit").click(function(){
					if(_qu==0){
						localStorage.Id=_Id.join(",").replace(/\,+$/g,"").replace(/^\,+/,"")
						location.href="commit.html"
					}
				})	
			
		
		}
					function zz(){//起送价显示
						if(_price<_tt[_indd]["cutgift"]){
							_qu=1;
							$(".commit").css({background:"#ccc",width:"auto",padding:"0 3px"})
							$(".commit").text("还差 "+(_tt[_indd]["cutgift"]-_price).toFixed(1)+" 元起送")
						}else{
							aa()
						}						
					}
		function show(data1){//页面渲染
			

			console.log(_tt[_indd]["distributorname"])
			$(".addr").text(_tt[_indd]["distributorname"])
			var _name="";
			var _index=0;
			var _tell="";
			var _remark="";
			var _intr="";
			var _dd=""
			var _image=""
			for(var i=0;i<data1.length;i++){
						if(data1[i]["guid"]){
							_dd=data1[i]["guid"]
						}else{
							_dd=data1[i]["itemguid"]
						}
				if(data1[i]["itemcount"]<=data1[i]["salecount"] || data1[i]["itemcount"]<=1){
					_color="#dbdfe4"
				}else{
					_color="#009f96"
				}
				if(data1[i]["isyucun"]==1){
					console.log(11)
					_image+="<img class="+"\"img2\" "+"src="+"../../image/shop/yu.jpg"+" />"
				}
				if(data1[i]["itemquality"]!=="" && data1[i]["itemquality"]!=="1"){
					_image+="<img class="+"\"img2\" "+"src="+"../../image/shop/temp.jpg"+" />"
				}
				console.log(_image)

					_remark="<div class="+"\"disc2\" style="+(data1[i]["remark"]==""?"display:none":"")+"><div>留言：<input readonly=\"true\" style=\";outline:none;width:80%;font-size:1.6rem\" value="+(data1[i]["remark"]==""?"":data1[i]["remark"])+"></div></div>"
				_intr="";
				if(data1[i]["salestop"]==0){
					if(!data1[i]["itemslist"]){
						if(data1[i]["specification"]==null && data1[i]["packagetypename"]!==null){
							_intr=data1[i]["packagetypename"]
						}else if(data1[i]["packagetypename"]==null && data1[i]["specification"]!==null){
							_intr=data1[i]["specification"]
						}else if(data1[i]["specification"]!==null && data1[i]["packagetypename"]!==null){
							_intr=data1[i]["specification"]+" | "+data1[i]["packagetypename"]
						}else{
							intr=""
						}					
					}else{
						if(data1[i]["itemslist"][data1[i]["selectedindex"]]["specification"]==null && data1[i]["itemslist"][data1[i]["selectedindex"]]["packagetypename"]!==null){
							_intr=data1[i]["itemslist"][data1[i]["selectedindex"]]["packagetypename"]
						}else if(data1[i]["itemslist"][data1[i]["selectedindex"]]["packagetypename"]==null && data1[i]["itemslist"][data1[i]["selectedindex"]]["specification"]!==null){
							_intr=data1[i]["itemslist"][data1[i]["selectedindex"]]["specification"]
						}else if(data1[i]["itemslist"][data1[i]["selectedindex"]]["specification"]!==null && data1[i]["itemslist"][data1[i]["selectedindex"]]["packagetypename"]!==null){
							_intr=data1[i]["itemslist"][data1[i]["selectedindex"]]["specification"]+" | "+data1[i]["itemslist"][data1[i]["selectedindex"]]["packagetypename"]
						}else{
							intr=""
						}					
					}
				}

				_name=data1[i]["itemslist"]?data1[i]["itemslist"][data1[i]["selectedindex"]]["itemname"]:data1[i]["itemname"]
				if(!data1[i]["itemslist"]){
					if(data1[i]["activityitem_id"]=="" && data1[i]["salestop"]==0 && data1[i]["isyucun"]==0){
						_price+=Number(data1[i]["price"])*Number(data1[i]["itemcount"]);
						_count++;
						_ges+=Number(data1[i]["itemcount"])
						_arr.push(i)
						_Id.push(data1[i]["guid"])
						_list+="<li id=\""+i+"\""+" ip="+(_arr.length-1)+" guid="+_dd+"><div class="+"\"list\""+"><i class="+"\"gouxuan\" flag="+"\"1\""+"></i><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+_name+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+data1[i]["price"]+"</p></p></div></div></div>"+_remark+"<div class="+
						"\"set\""+"style="+"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div></li>"
					}else if(data1[i]["itemkind"]=="降价" && data1[i]["salestop"]==0){
						_price+=Number(data1[i]["price"])*Number(data1[i]["itemcount"]);
						_count++;
						_ges+=Number(data1[i]["itemcount"])
						_arr.push(i)
						_Id.push(data1[i]["guid"])
						_discount+=(data1[i]["originalprice"]-data1[i]["price"])*data1[i]["itemcount"]
						_list+="<li id=\""+i+"\""+" ip="+(_arr.length-1)+" guid="+_dd+"><div class="+"\"list\""+"><i class="+"\"gouxuan\" flag="+"\"1\""+"></i><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+_name+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+data1[i]["discountprice"]+"</p><p class="+"\"intail\""+"><span>￥"+data1[i]["originalprice"]+"</span></p></p></div></div></div><div class="+"\"disc\""+
						"><span>降价</span><span> "+data1[i]["discount"]+" 折</span></div>"+_remark+"<div class="+
						"\"set\""+"style="+
						"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div></li>"
					}else if(data1[i]["itemkind"]=="折扣" && data1[i]["salestop"]==0){
						_price+=Number(data1[i]["price"])*Number(data1[i]["itemcount"]);
						_count++;
						_ges+=Number(data1[i]["itemcount"])
						_arr.push(i)
						_Id.push(data1[i]["guid"])
						_discount+=(data1[i]["originalprice"]-data1[i]["price"])*data1[i]["itemcount"]
						_list+="<li id=\""+i+"\""+" ip="+(_arr.length-1)+" guid="+_dd+"><div class="+"\"list\""+"><i class="+"\"gouxuan\" flag="+"\"1\""+"></i><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+_name+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+data1[i]["price"]*data1[i]["discount"]+"</p><p class="+"\"intail\""+"><span>￥"+data1[i]["price"]+"</span></p></p></div></div></div><div class="+"\"disc\""+" id="+"\"disc\""+
						"><span>折扣</span><span>"+data1[i]["discount"]+"</span></div>"+_remark+"<div class="+
						"\"set\""+"style="+
						"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div></li>"
					}else if(data1[i]["itemkind"]=="有礼" && data1[i]["salestop"]==0){
						_price+=Number(data1[i]["price"])*Number(data1[i]["itemcount"]);
						_count++;
						_ges+=Number(data1[i]["itemcount"])
						_arr.push(i)
						_Id.push(data1[i]["guid"])
						_list+="<li id=\""+i+"\""+" ip="+(_arr.length-1)+" guid="+_dd+"><div class="+"\"list\""+"><i class="+"\"gouxuan\" flag="+"\"1\""+"></i><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+_name+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+data1[i]["price"]+"</p></p></div></div></div><div class="+"\"disc\""+
						"><span>有礼</span><span> 购买"+data1[i]["salecount"]+(data1[i]["packagetypename"]==null?"":data1[i]["packagetypename"])+data1[i]["itemname"]+"赠送"+
							data1[i]["giftcount"]+(data1[i]["giftitemobj"]["packagetypename"]==null?"":data1[i]["giftitemobj"]["packagetypename"])+data1[i]["giftitemobj"]["itemname"]+"</span></div>"+_remark+"<div class="+"\"giveTo\""+"><b style="+"\"margin-right:5px\""+">赠品</b><div><span>"+data1[i]["giftitemobj"]["itemname"]+"</span><span class=\"yuj\">"+Math.floor((data1[i]["itemcount"])/Number(data1[i]["salecount"]))*Number(data1[i]["giftcount"])+"</span>"+(data1[i]["giftitemobj"]["packagetypename"]==null?"":data1[i]["giftitemobj"]["packagetypename"])+"</div></div><div class="+
						"\"set\""+"style="+
						"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div></li>"					
					}else if(data1[i]["itemkind"]=="买赠" && data1[i]["salestop"]==0){
						_count++;
						_ges+=Number(data1[i]["itemcount"])
						_arr.push(i)
						_Id.push(data1[i]["guid"])
						_price+=Number(data1[i]["price"])*Number(data1[i]["itemcount"]);
						_list+="<li id=\""+i+"\""+" ip="+(_arr.length-1)+" guid="+_dd+"><div class="+"\"list\""+"><i class="+"\"gouxuan\" flag="+"\"1\""+"></i><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+_name+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+data1[i]["price"]+"</p></p></div></div></div><div class="+"\"disc\""+
						"><span>买赠</span><span> 买"+data1[i]["salecount"]+(data1[i]["packagetypename"]==null?"":data1[i]["packagetypename"])+data1[i]["itemname"]+"赠"+data1[i]["giftcount"]+(data1[i]["giftitemobj"]["packagetypename"]==null?"":data1[i]["giftitemobj"]["packagetypename"])+data1[i]["giftitemobj"]["itemname"]+"</span></div>"+_remark+"<div class="+"\"giveTo\""+"><b style="+"\"margin-right:5px\""+">赠品</b><div><span>"+data1[i]["giftitemobj"]["itemname"]+"</span><span class=\"yuj\">"+Math.floor((data1[i]["itemcount"])/Number(data1[i]["salecount"]))*Number(data1[i]["giftcount"])+"</span>"+data1[i]["giftitemobj"]["packagetypename"]+"</div></div><div class="+
						"\"set\""+"style="+"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div></li>"						
					}else if(data1[i]["isyucun"]==1 && data1[i]["salestop"]==0){
						console.log(1)
						_price+=Number(data1[i]["price"])*Number(data1[i]["itemcount"]);
						_count++;
						_ges+=Number(data1[i]["itemcount"])
						_arr.push(i)
						_Id.push(data1[i]["guid"])
						_list+="<li id=\""+i+"\""+" ip="+(_arr.length-1)+" guid="+_dd+"><div class="+"\"list\""+"><i class="+"\"gouxuan\" flag="+"\"1\""+"></i><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+_name+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+data1[i]["price"]+"</p><span class="+"\"pi\""+">￥"+data1[i]["itemunitcost"].toFixed(2)+"<span style="+"\"display:inline-block;width:1.4rem;height:1.4rem;border-radius:50%;text-align:center;border:1px solid #ccc\""+
						">预</span></span><p class=\"hp\" style="+"\"padding-left:82px\""+">可提<span>"+data1[i]["remaincount"]+"</span>"+data1[i]["packagetypename"]+"</p></p></div></div></div>"+_remark+"<div class="+
						"\"set\""+"style="+"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div></li>"
					}else if(data1[i]["salestop"]==1){
						_list+="<li id=\""+i+"\" style="+"\"position:relative\""+"><div class="+"\"list\""+"><b class="+"\"gouxuan2\""+"></b><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+data1[i]["itemname"]+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+data1[i]["price"]+"</p></p></div></div></div><div class="+
						"\"set\""+"style="+"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div><div style="+
						"\"position:absolute;left:0;top:0;width:100%;height:95px;background:#ddd;opacity:0.5\""+"></div><img src="+"\"../../image/shop/shopcart_down.png\""+" style="+"\"position:absolute;width:4rem;right:0;top:0\""+"></li>"
					}					
				}else{
					_index=data1[i]["selectedindex"];
					if(data1[i]["activityitem_id"]=="" && data1[i]["salestop"]==0){
						_price+=Number(data1[i]["itemslist"][_index]["price"])*Number(data1[i]["itemcount"]);
						_count++;
						_ges+=Number(data1[i]["itemcount"])
						_arr.push(i)
						_Id.push(data1[i]["guid"])
						_list+="<li id=\""+i+"\""+" ip="+(_arr.length-1)+" guid="+_dd+"><div class="+"\"list\""+"><i class="+"\"gouxuan\" flag="+"\"1\""+"></i><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemslist"][_index]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+_name+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+data1[i]["itemslist"][_index]["price"]+"</p></p></div></div></div>"+_remark+"<div class="+
						"\"set\""+"style="+"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div></li>"
					}else if(data1[i]["salestop"]==1){
						_list+="<li id=\""+i+"\" style="+"\"position:relative\""+"><div class="+"\"list\""+"><b class="+"\"gouxuan2\""+"></b><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+data1[i]["itemslist"][_index]["itemname"]+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+data1[i]["price"]+"</p></p></div></div></div><div class="+
						"\"set\""+" style="+"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div><div style="+
						"\"position:absolute;left:0;top:0;width:100%;height:100%;background:#ddd;opacity:0.5\""+"></div></li>"
					}
				}
				for(var z=0;z<_Id.length;z++){
					_sv[z]=_Id[z]
				}
				_image=""
			}
					zz()
			_save=_count;
			_dis=_discount
			_pp=_price
			_ct=_count
			_cun=_ges
			//_Id=_Id.join(",").replace(/\,$/,"")


			if(_distrgive!=""){
				$(".giveto").css({display:"block"})
				$(".gift").html(_distrgive)
			}
			$("section ul").html(_list)
			$(".summ").text(_ges)

			$(".amountBig span").text(_price.toFixed(1))
			$(".commit span").text("("+_ges+")")
			select()
			change(data1);
			deLete(data1)
			console.log(_discount)
			$(".ab span:nth-child(2)").text(_discount.toFixed(1))
			fg()
		}
			function deLete(data1){//删除商品
				var _dl="";
				$("#edit").click(function(){
					if($(this).text()=="编辑"){
						$(this).text("完成")
					}else{
						$(this).text("编辑")
					}
					if($(".set").css("display")=="none"){
						$(".set").css({display:"block"})
					}else{
						$(".set").css({display:"none"})
					}
				})
				$(".delete").click(function(){
					_dll=$(this).parent().parent().find(".amount").text()
					$(".ifDelt").css({display:"block"})
					$("html").css({overflow:"hidden"})
					$(".ifDelt div:nth-child(1)").attr("id","y"+$(this).parent().parent().attr("id"))
					$(".ifDelt div:nth-child(1)").attr("ip",$(this).parent().parent().attr("ip"))
					_arr.splice($(this).parent().parent().attr("ip"),1,-2)
				})
				$(".ly").click(function(){
					$(this).parent().parent().find(".disc2").css({display:"block"})
					console.log($(this).parent().parent().find(".disc2>div>input"))
					$(this).parent().parent().find(".disc2>div>input").attr("readonly",false);
					$(this).parent().parent().find(".disc2>div>input").focus()
			        var result=$(this).parent().parent().find(".disc2>div>input").val();//对input取值
			        $(this).parent().parent().find(".disc2>div>input").val("")//使input的值为空
			        $(this).parent().parent().find(".disc2>div>input").val(result);//重新负值
			        $(this).parent().parent().find(".disc2>div>input")[0].scrollLeft=700;//这里我对文本框的属性做了一个猜想，应该是有混动条的属性的，所以进行一个偏移

				})		
				$(".disc2>div>input").blur(function(){
					$(this).attr("readonly",true)
					if($(this).val()==""){
						$(this).parent().parent().css({display:"none"})
					}
				})
				$(".disc2>div>input").on("input propertychange",function(){
					console.log($(this).parent().parent().parent().find(".amount").text())
					var oThat=this;
					var _ind=$(this).parent().parent().parent().attr("id");
					$.ajax({
						type:"post",
						url:"/webapi/distributor/"+getRetailerid()+"/shoppingcart",
						async:true,
						data:{
							distributorid:_disId,
							itemid:data1[_ind]["itemid"],
							itemcount:$(oThat).parent().parent().parent().find(".amount").text(),
							itemquality:data1[_ind]["itemquality"],
							itemprice:data1[_ind]["price"],
							isyucun:data1[_ind]["isyucun"],
							activityitemid:data1[_ind]["activityitem_id"],
							versiontime:formaty(),
							remark:$(oThat).val()
						},
						error:function(){},
						success:function(data){}
					})
				})
				$(".ifDelt span:nth-child(1)").click(function(){
					$(".ifDelt").css({display:"none"})
					$("html").css({overflow:"auto"})
				})
				$(".ifDelt span:nth-child(2)").click(function(){
					_id=$(this).parent().prev().attr("id").replace("y","");
					 
					_dl=data1[_id]["guid"]
					 
					console.log(_dl)
					$.ajax({
						url:"/webapi/distributor/"+getRetailerid()+"/shoppingcart?distributor_id="+_disId+"&guid="+_dl,
						type:"delete",
						error:function(){},
						success:function(data){
							console.log(data)
							//$(".delete").remove($(".delete").parent().parent())
							$("html").css({overflow:"auto"})
							$(".ifDelt").css({display:"none"})
							_cun-=Number($("#"+_id).find(".amount").text());
							
							_pp-=Number(data1[_id]["price"])*Number(_dll)
							if($("#"+_id).find(".gouxuan").attr("flag")==1){
								_ges-=Number($("#"+_id).find(".amount").text())
								$(".summ").text(_ges)
							}else{
								_save-=1;
							}
							console.log(_ges)
							if(_count==_save && _count!=0){
								$(".gg").attr("flag","1")
								$(".gg").css({"background":"url(../../image/shop/crect.jpg) no-repeat center center",backgroundSize:"1.4rem 1.4rem",borderColor:"#3a3635"});
							}else{
								$(".gg").attr("flag","0")
								$(".gg").css({"background":"none",borderColor:"#fff"});
							}
							if(data1[_id]["salestop"]==0 && $("#"+_id).find(".gouxuan").attr("flag")==1){
								console.log(_id)
								_price-=Number(data1[_id]["price"])*Number(_dll)
								console.log(_price)
								$(".amountBig span").text(_price.toFixed(1))

							}
							if(data1[_id]["itemkind"]=="降价" || data1[_id]["itemkind"]=="折扣"){
									_dis-=((Number(data1[_id]["originalprice"])-Number(data1[_id]["price"]))*(Number(data1[_id]["itemcount"])))
									if($("#"+_id).find(".gouxuan").attr("flag")==1){
										_discount-=((Number(data1[_id]["originalprice"])-Number(data1[_id]["price"]))*(Number(data1[_id]["itemcount"])))
										$(".ab span:nth-child(2)").text(_discount.toFixed(1))										
									}
								}
							$("#"+_id).remove();
							fg()
							zz()
						}
					})
				})
			}
    	//}
    	function sendId(data1){
			$.ajax({
				url:"/webapi/distributor/"+getRetailerid()+"/shoppingcart/"+data1[_indd]["distributor_id"]+"?isvalid=0",
				dataType:"json",
				type:"get",
				error:function(){},
				success:function(){
					
				}
			})		
    	}

		function select(){//购物车商品的勾选
			var _ll=0;

			console.log(_arr)
			$("section").on('click','.gouxuan',function(){
				if($(this).attr("flag")==1){
					_Id.splice($(this).parent().parent().attr("ip"),1,"")
					console.log(_Id)
					$(this).attr("flag","0")
					$(this).css({"background":"none",borderColor:"#5d5c5c"});
					_arr.splice($(this).parent().parent().attr("ip"),1,-1)
					console.log(_arr)
					_count-=1
					_ges-=Number($(this).next().children().children().find(".amount").text())
					_price-=Number($(this).parent().find(".pp1").text().replace("￥",""))*Number($(this).next().find(".amount").text())
					if($(this).parent()){
						if($(this).parent().next().find("span:nth-child(1)").text()=="降价"){
							_discount-=(Number($(this).next().children().find(".intail").find("span").text().replace("￥",""))-Number($(this).next().children().find(".pp1").text().replace("￥","")))*Number($(this).next().find(".change").find(".amount").text())
							$(".amountBig").next().find("span:nth-child(2)").text(_discount.toFixed(2))
						}
					}
					zz()
					$(".amountBig span").text(_price.toFixed(1))
//					if(_count==0){
//						$(".yj").css({display:"block"})
//					}
				}else{
					if($(this).parent()){
						if($(this).parent().next().find("span:nth-child(1)").text()=="降价"){
							_discount+=(Number($(this).next().children().find(".intail").find("span").text().replace("￥",""))-Number($(this).next().children().find(".pp1").text().replace("￥","")))*Number($(this).next().find(".change").find(".amount").text())
							$(".amountBig").next().find("span:nth-child(2)").text(_discount.toFixed(2))
						}
					}
					_Id.splice($(this).parent().parent().attr("ip"),1,$(this).parent().parent().attr("guid"))
					console.log(_Id)
					_arr.splice($(this).parent().parent().attr("ip"),1,parseInt($(this).parent().parent().attr("id")))
					console.log(_arr)
					$(this).attr("flag","1")
					$(this).css({"background":"url(../../image/shop/crect1.jpg) no-repeat center center",backgroundSize:"1.4rem 1.4rem",borderColor:"#fff"});
					_count+=1
					_ges+=Number($(this).next().children().children().find(".amount").text())
					_price+=Number($(this).parent().find(".pp1").text().replace("￥",""))*Number($(this).next().find(".amount").text())
					$(".amountBig span").text(_price.toFixed(1))
					zz()
//					if(_count>0){
//						$(".yj").css({display:"none"})
//					}
					
				}

				if(_count==_save){
					$(".gg").attr("flag","1")
					$(".gg").css({"background":"url(../../image/shop/crect.jpg) no-repeat center center",backgroundSize:"1.4rem 1.4rem",borderColor:"#3a3635"});
				}else{
					$(".gg").attr("flag","0")
					$(".gg").css({"background":"none",borderColor:"#fff"});
				}
				$(".commit span").text("("+_ges+")")
				$(".summ").text(_ges)
				fg()
			});
			$(".all").on('click','.gg',function(){
				if($(this).attr("flag")==1){
					_count=0;
					_ges=0
					$(".commit span").text("("+_ges+")")
					$(".summ").text(_ges)
					$(this).attr("flag","0")
					$(this).css({"background":"none",borderColor:"#fff"});
					for(var k=0;k<$(".list i").length;k++){
						
							$(".list i")[k].setAttribute("style","background:none;border-color:#5d5c5c;")
							$(".list i")[k].setAttribute("flag","0")
//							$(".list i")[k].style.background="none";
//							$(".list i")[k].style.borderColor
							//$(".list i")[j].css({"background":"url(../../image/shop/crect1.jpg) no-repeat center center",backgroundSize:"1.4rem 1.4rem",borderColor:"#fff"});
										
					}
					_count=0
					$(".amountBig span").text("0.0")
					_price=0
					zz()
					_discount=0
					$(".amountBig").next().find("span:nth-child(2)").text("0.0")
//					if(_count==0){
//						$(".yj").css({display:"block"})
//					}
					for(var c=0;c<_Id.length;c++){
						_Id[c]=""
					}
					console.log(_Id)
				}else{
					_price=_pp
					zz()
					_discount=_dis
					_count=_ct
					_ges=_cun
					$(".commit span").text("("+_ges+")")
					$(".summ").text(_ges)
					$(this).attr("flag","1")
					$(this).css({"background":"url(../../image/shop/crect.jpg) no-repeat center center",backgroundSize:"1.4rem 1.4rem",borderColor:"#3a3635"});
						for(var j=0;j<$(".list i").length;j++){
						
							$(".list i")[j].setAttribute("style","background:url(../../image/shop/crect1.jpg) no-repeat center center;background-size:1.4rem 1.4rem;borderColor:#fff;flag:1")
							$(".list i")[j].setAttribute("flag","1")
							//$(".list i")[j].css({"background":"url(../../image/shop/crect1.jpg) no-repeat center center",backgroundSize:"1.4rem 1.4rem",borderColor:"#fff"});
										
					}
					_count=_save
					$(".amountBig span").text(_price.toFixed(1))
					$(".amountBig").next().find("span:nth-child(2)").text(_discount.toFixed(1))
//					if(_count>0){
//						$(".yj").css({display:"none"})
//					}
					console.log(_sv)
					for(var f=0;f<_sv.length;f++){
						_Id[f]=_sv[f]
					}
					console.log(_Id)
				}
				fg()
			});
		}
		function change(data1){//购物车数量改变
			$(".change").on('click','.reduce',function(){
				var tht=this					
				var _ind=$(this).parent().parent().parent().parent().parent().attr("id");
				var that=$(this).parent().find(".amount").text()
				console.log(data1[_ind]["salecount"])
				if(data1[_ind]["salecount"]){
					if(Number($(this).parent().find(".amount").text())>Number(data1[_ind]["salecount"])){
						_cun-=1;
						$(this).parent().find(".amount").text($(this).parent().find(".amount").text()-1);
						that=$(this).parent().find(".amount").text()
						$.ajax({
							type:"post",
							url:"/webapi/distributor/"+getRetailerid()+"/shoppingcart",
							async:true,
							data:{
								distributorid:_disId,
								itemid:data1[_ind]["itemid"],
								itemcount:that,
								itemquality:data1[_ind]["itemquality"],
								itemprice:data1[_ind]["price"],
								isyucun:data1[_ind]["isyucun"],
								activityitemid:data1[_ind]["activityitem_id"],
								versiontime:formaty(),
								remark:$(tht).parents(".list").parent().find(".disc2>div>input").val()
							},
							error:function(){},
							success:function(data){
								if(data.result==true){
									console.log(data);
									$(tht).parent().parent().parent().parent().parent().find(".yuj").text(Math.floor(Number($(tht).prev().text())/Number(data1[_ind]["salecount"]))*Number(data1[_ind]["giftcount"]));
									_pp-=Number($(tht).parent().parent().find(".pp1").text().replace("￥",""));
									if($(tht).parent().parent().parent().prev().attr("flag")==1){
										_price-=Number($(tht).parent().parent().find(".pp1").text().replace("￥",""))
										$(".amountBig span").text(_price.toFixed(1))
									}
									if($(tht).parent().parent().parent().parent().next().find("span:nth-child(1)").text()=="降价"){
										_dis-=(Number($(tht).parent().next().next().find("span").text().replace("￥",""))-Number($(tht).parent().next().text().replace("￥","")))
										if($(tht).parent().parent().parent().prev().attr("flag")==1){
											_discount-=(Number($(tht).parent().next().next().find("span").text().replace("￥",""))-Number($(tht).parent().next().text().replace("￥","")))
											$(".amountBig").next().find("span:nth-child(2)").text(_discount.toFixed(1))
										}									
									}
									fg();
									zz()
									$(".commit span").text("("+_ges+")")
									$(".summ").text(_ges)
									if(Number($(tht).parent().find(".amount").text())==Number(data1[_ind]["salecount"])){
										$(tht).css({color:"#e3e7ea"})
									}									
								}

							}
						});
					}
				}else{
					if($(this).parent().find(".amount").text()>1){
						$(this).parent().find(".amount").text($(this).parent().find(".amount").text()-1);
						that=$(this).parent().find(".amount").text()
						_cun-=1;
						$.ajax({
							type:"post",
							url:"/webapi/distributor/"+getRetailerid()+"/shoppingcart",
							async:true,
							data:{
								distributorid:_disId,
								itemid:data1[_ind]["itemid"],
								itemcount:that,
								itemquality:data1[_ind]["itemquality"],
								itemprice:data1[_ind]["price"],
								isyucun:data1[_ind]["isyucun"],
								activityitemid:data1[_ind]["activityitem_id"],
								versiontime:formaty(),
								remark:$(tht).parents(".list").parent().find(".disc2>div>input").val()	
							},
							error:function(){},
							success:function(data){
								console.log(data);
								_pp-=Number($(tht).parent().parent().find(".pp1").text().replace("￥",""));
								if($(tht).parent().parent().parent().prev().attr("flag")==1){
									_price-=Number($(tht).parent().parent().find(".pp1").text().replace("￥",""))
									$(".amountBig span").text(_price.toFixed(1))
								}
								if($(tht).parent().parent().parent().parent().next().find("span:nth-child(1)").text()=="降价"){
									_dis-=(Number($(tht).parent().next().next().find("span").text().replace("￥",""))-Number($(tht).parent().next().text().replace("￥","")))
									if($(tht).parent().parent().parent().prev().attr("flag")==1){
										_discount-=(Number($(tht).parent().next().next().find("span").text().replace("￥",""))-Number($(tht).parent().next().text().replace("￥","")))
										$(".amountBig").next().find("span:nth-child(2)").text(_discount.toFixed(1))
									}									
								}
								fg()
								zz()
								$(".commit span").text("("+_ges+")")
								$(".summ").text(_ges)
								if(Number($(tht).parent().find(".amount").text())<=1){
									$(tht).css({color:"#e3e7ea"})
								}
							}
						});						
					}

				}


				
			});
			$(".change").on('click','.increase',function(){
				var th=this;
				var _ind=$(this).parent().parent().parent().parent().parent().attr("id");
				var _xx=$(this).parents(".yuu").find(".hp>span").text();
				console.log(_xx)
				if(_xx && Number($(this).next().text())>=Number(_xx)){
					
				}else{
					$(this).parent().find(".amount").text(parseInt($(this).parent().find(".amount").text())+1)
					console.log(_ges)
					_cun+=1;
					console.log(_ges)
					var that=$(this).parent().find(".amount").text();
					$.ajax({
						type:"post",
						url:"/webapi/distributor/"+getRetailerid()+"/shoppingcart",
						async:true,
						data:{
							distributorid:_disId,
							itemid:data1[_ind]["itemid"],
							itemcount:that,
							itemquality:data1[_ind]["itemquality"],
							itemprice:data1[_ind]["price"],
							isyucun:data1[_ind]["isyucun"],
							activityitemid:data1[_ind]["activityitem_id"],
							versiontime:formaty(),
							remark:$(th).parents(".list").parent().find(".disc2>div>input").val()
						},
						error:function(){},
						success:function(data){
							if(data.result==true){
								$(th).parent().parent().parent().parent().parent().find(".yuj").text(Math.floor(Number($(th).next().text())/Number(data1[_ind]["salecount"]))*Number(data1[_ind]["giftcount"]));
								console.log(data);
								console.log(_price)
								console.log($(th).parent().parent().parent().prev().attr("flag"))
								_pp+=Number($(th).parent().parent().find(".pp1").text().replace("￥",""));
								if($(th).parent().parent().parent().prev().attr("flag")==1){
									_price+=Number($(th).parent().parent().find(".pp1").text().replace("￥",""))
									$(".amountBig span").text(_price.toFixed(1))
								}
								console.log($(th).parent().parent().parent().parent().next().find("span:nth-child(1)"))
								if($(th).parent().parent().parent().parent().next().find("span:nth-child(1)").text()=="降价"){
									_dis+=(Number($(th).parent().next().next().find("span").text().replace("￥",""))-Number($(th).parent().next().text().replace("￥","")))
									if($(th).parent().parent().parent().prev().attr("flag")==1){
										_discount+=(Number($(th).parent().next().next().find("span").text().replace("￥",""))-Number($(th).parent().next().text().replace("￥","")))
										$(".amountBig").next().find("span:nth-child(2)").text(_discount.toFixed(1))
									}									
								}
								fg()
								zz()
								$(".summ").text(_ges)
								if(data1[_ind]["salecount"]){
									if(Number($(th).parent().find(".amount").text())>Number(data1[_ind]["salecount"])){
										$(th).parent().find(".reduce").css({color:"#009f96"})
									}						
								}else{
									if(Number($(th).parent().find(".amount").text())>1){
										$(th).parent().find(".reduce").css({color:"#009f96"})
									}
								}							
							}
	
						}
					});
				}

			})
		}
		function formaty(){//计算当前时间传入参数post
			var d=new Date();
			_year=d.getFullYear();
			_month=d.getMonth()+1;
			_day=d.getDate();
			_hour=d.getHours();
			_minute=d.getMinutes();
			_second=d.getSeconds();
			_msecond=d.getMilliseconds();
			if(_hour<10){
				_hour="0"+_hour;
			}
			if(_month<10){
				_month="0"+_month;
			}
			if(_day<10){
				_day="0"+_day;
			}
			if(_minute<10){
				_minute="0"+_minute;
			}
			if(_second<10){
				_second="0"+_second;
			}
			if(_msecond<100 && _msecond>10){
				_msecond="0"+_msecond
			}else if(_msecond<10){
				_msecond="00"+_msecond
			}
			return _year+"-"+_month+"-"+_day+" "+_hour+":"+_minute+":"+_second+"."+_msecond
		}

		function fg(){//活动显示
				console.log(_price)
					var _nm="";
		        	var _jies="";
					if(_tt[_indd]["promotionactivity"] && _tt[_indd]["promotionactivity"]["details"].length>0){
		        	  	for(var p=0;p<_tt[_indd]["promotionactivity"]["details"].length;p++){
		        	  		if(_price>=_tt[_indd]["promotionactivity"]["details"][p]["moneysum"] && _tt[_indd]["itemkind"]=="满赠"){
		        	  			for(var c=0;c<_tt[_indd]["promotionactivity"]["details"][p]["giftitems"].length;c++){
		        	  				_distrgive+="<div>"+_tt[_indd]["promotionactivity"]["details"][p]["giftitems"][c]["itemname"]+"<span class="+"\"gifty\""+">x"+_tt[_indd]["promotionactivity"]["details"][p]["giftitems"][c]["count"]+"</span></div>"
		        	  				_active=_tt[_indd]["promotionactivity"]["details"][p]["giftitems"][c]["itemname"]
		        	  				_nm="满赠"
		        	  				_jies="您已满"+_tt[_indd]["promotionactivity"]["details"][p]["moneysum"]+"元，获赠"
		        	  			}
		        			}else if(_price>=_tt[_indd]["promotionactivity"]["details"][p]["moneysum"] && data[_indd]["itemkind"]=="满减"){
		        				for(var c=0;c<_tt[_indd]["promotionactivity"]["details"][p]["giftitems"].length;c++){
		        	  				_active="<span>"+data[_indd]["promotionactivity"]["details"][p]["moneysum"]+"</span>"
		        	  				_nm="满减"
		        	  				_jies="您已满"+_tt[_indd]["promotionactivity"]["details"][p]["giftitems"][c]["price"]+"元，已减"
		        	  			}
		        			}
						}					
						console.log(_nm)
						if(_active==""){
							$(".intr").css({display:"none"})
						}else{
							$(".intr").css({display:"flex"})
						}
						$(".intr div:nth-child(1)").text(_nm)
						$(".intr div:nth-child(2) span:nth-child(1)").text(_jies)
						$(".intr div:nth-child(2) span:nth-child(2)").text(_active)	
						_nm="";
						 _jies="";
						 _active=""
		        }
					$("html").css({overflow:"auto"})
					$(".loads").css({display:"none"})
		}
		}