  var distributor_id=top.window.parent.distributor_id;

  $(document).ready(function(){
  	var _flag=0;
  	var _timer="";
  	var _price=0;
  	var height=0;
  	var _add=0;
  	var _data2="";
  	var _image="";				 	
  	var _icn="";
  	localStorage.list=0;
  	(function dd(){
  			height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
  			console.log(height)
  			
  			$("#select").css("height",height);
  			$("#container").css("height",height)
  	})()
			 var _nameList="";
			 var _shopList="";
			 var _bookTm="";
			 var _historyList="";
			 var _d=new Date().getTime();
			 var _data1="";
			if(localStorage.reload){
				if(localStorage.reload==1){
					localStorage.reload=0
				}
			}
			if(localStorage.retalerdata && JSON.parse(localStorage.retalerdata).data.result!=false){
							data1=JSON.parse(localStorage.retalerdata).data;
	        		_data1=data1;
	        		console.log(_data1)
		  		 	  for(var i=0;i<_data1.length;i++){
					 	  		_nameList+="<li id="+i+"><span>"+_data1[i]["distributorname"]+"</span></li>";
					 	  }
		  		 	  //_nameList="<li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li>"
						  $("#select ul").html(_nameList);
						  		$("#select li:first-child").addClass("selected")
					 	  		if($("#select li span").css("width").replace("px","")+14<=$("#select li").css("width")){
						  				$("#select li").css({"textAlign":"center","lineHeight":"3rem"})
						 			}							


					   		$("#select li").click(function(){
					   			  localStorage.list=$(this).attr("id")
								 		$("#select li").removeClass("selected")
								 		$(this).attr("class","selected");
								 		that=$(this);
								 		_timer=setTimeout(function(){
								 			
								 			if(_flag==1){
								 					_flag=0;
								 					if(!that.css("border-left")){
								 						$(".onload").css({"display":"block"})
								 							shopList(that.attr("id"))
								 							
								 					}else{
								 						_flag=1
								 					}
								 			}else{
								 					
								 					_timer()
								 			}
								 			
								 		},10)
								 		
								 })
//					   		var width = (window.innerHeight > 0) ? window.innerHeight : screen.height;
					   		//alert(width)
					   		

					   	shopList(0)
					}
function shopList(pg){
			//alert(pg)
		 $.ajax({
			  url:"/webapi/distributor/"+getRetailerid()+"/orderforms?distributor_id="+_data1[pg]["distributor_id"]+"&paging=",
			  async:true,
			  cache:false,
			  dataType:"json",
			  type:"get",
			  error:function(){},
			  success:function(data)
				 {	
				 	var _imgs="";
				 	if(data["error"]==""){
				 	console.log(data)
				   	for(var j=0;j<data["content"].length;j++){

//								if(data[j]["isyucun"]==1){
//									_image="<img class="+"\"img2\" "+"src="+"../../image/shop/yu.jpg"+" />"
//								}else 
//								if(data[j]["itemquality"]===0){
//									_image="<img class="+"\"img2\" "+"src="+"../../image/shop/temp.jpg"+" />"
//								}else{
//									_image=""
//								}
				   			if(data["content"][j]["details"].length>1){
				   				if(data["content"][j]["details"].length>3){
					   				for(var w=0;w<3;w++){
					   					_imgs+="<a><img src="+data["content"][j]["details"][w]["itemobj"]["itemimage"]+"></a>";
					   				}		
				   				}else{
					   				for(var q=0;q<data["content"][j]["details"].length;q++){
					   					_imgs+="<a><img src="+data["content"][j]["details"][q]["itemobj"]["itemimage"]+"></a>";
					   				}	   					
				   				}
				   				_price=0;
			   				for(var z=0;z<data["content"][j]["details"].length;z++){
											if(data["content"][j]["details"][z]["itemtype"]!=3){
												_price+=Number(data["content"][j]["details"][z]["itemunitcost"])*Number(data["content"][j]["details"][z]["qualitycount"])
											}
								}
				   	_bookTm=data["content"][j]["issuetime"].replace(new RegExp("-","gm"),"/");
		  		_bookTm = (new Date(_bookTm)).getTime();
		  			_price=_price.toFixed(2)
				   	if(data["content"][j]["openflag"]=="0"){
				   			_historyList+="<dd style="+"\"padding-top:10px;\""+" idd="+JSON.stringify(data["paging"])+" index="+j+"><div class="+"\"image2box\""+">"+_imgs+"</div><i class="+"\"ammount\""+">共"+data["content"][j]["details"].length+"件</i><div class="+"\"descbox\""+"><p>订单号："+data["content"][j]["serialnumber"]+"</p><i class="+"\"il\""+">送货时间："+data["content"][j]["billexpecteddelivertime"].split(" ")[0].replace(/\-/g,"/")+"</i><i class="+"\"ir\""+">合计：<span class="+"\"pricstyle\""+">￥"+_price+"</span></i></div></dd>";	
				 		}else{
								_shopList+="<dd style="+"\"padding-top:10px;\""+" idd="+JSON.stringify(data["paging"])+" index="+j+"><div class="+"\"image2box\""+">"+_imgs+"</div><i class="+"\"ammount\""+">共"+data["content"][j]["details"].length+"件</i><div class="+"\"descbox\""+"><p>订单号："+data["content"][j]["serialnumber"]+"</p><i class="+"\"il\""+">送货时间："+data["content"][j]["billexpecteddelivertime"].split(" ")[0].replace(/\-/g,"/")+"</i><i class="+"\"ir\""+">合计：<span class="+"\"pricstyle\""+">￥"+_price+"</span></i></div></dd>";	
				 		}
				 		_imgs=""
					 			}else if(data["content"][j]["details"].length>0 && data["content"][j]["details"].length<=1){
					 				if(data["content"][j]["details"][0]["itemkind"]){
					 					if(data["content"][j]["details"][0]["itemkind"]=="买赠"){
					 						_icn+="<span class=\"icn\">买赠</span>"
					 					}else if(data["content"][j]["details"][0]["itemkind"]=="降价"){
					 						_icn+="<span class=\"icn\">降价</span>"
					 					}else if(data["content"][j]["details"][0]["itemkind"]=="折扣"){
					 						_icn+="<span class=\"icn\">折扣</span>"
					 					}else if(data["content"][j]["details"][0]["itemkind"]=="有礼"){
					 						_icn+="<span class=\"icn\">有礼</span>"
					 					}
						 			}
					 				if(data["content"][j]["details"][0]["itemgifttype"]){
					 					if(data["content"][j]["details"][0]["itemgifttype"]==3){
					 						_icn+="<img src="+"\"../../image/shop/yu.jpg\""+">"
					 					}
						 			}
					 				if(data["content"][j]["details"][0]["itemobj"]["itemtype"]){
							 			if(data["content"][j]["details"][0]["itembobj"]["itemtype"]==0){
					   					_icn+="<img src="+"\"../../image/shop/temp.jpg\""+">"
					   					console.log(_icn)
					   				}
						 			}
					 				if(data["content"][j]["details"][0]["itemquality"]){
					 					if(data["content"][j]["details"][0]["itemquality"]==0){
					 						_icn+="<img src="+"\"../../image/shop/temp.jpg\""+">"
					 					}
					 				}

					 				if(data["content"][j]["openflag"]=="0"){
					 						_historyList+="<dd style="+"\"padding-top:10px;\""+" idd="+JSON.stringify(data["paging"])+" index="+j+"><div style=\"display:flex;width:100%\"><div class="+"\"imagebox\""+"><a href="+"\"#\""+"><img src="+data["content"][j]["details"][0]["itemobj"]["itemimage"]+" ></a></div><div class="+"\"dectitlebox\""
					 				+"><div class="+"\"iconbox\""+">"+_icn+"</div><a style="+"\"float:left;\""+" href="+"\"#\""+">"+data["content"][j]["details"][0]["itemobj"]["itemname"]+"</a><i>共"+data["content"][j]["details"].length+"件</i></div></div><div class="+"\"descbox\""+"><p>订单号："+data["content"][j]["serialnumber"]+"</p><i class="+"\"il\""+">送货时间："+data["content"][j]["billexpecteddelivertime"].split(" ")[0].replace(/\-/g,"/")+"</i><i class="+"\"ir\""+">合计：<span class="+"\"pricstyle\""+">￥"+_price+"</span></i></div></dd>"
					 				}else{
					 						_shopList+="<dd style="+"\"padding-top:10px;\""+" idd="+JSON.stringify(data["paging"])+" index="+j+"><div style=\"display:flex;width:100%\"><div class="+"\"imagebox\""+"><a href="+"\"#\""+"><img src="+data["content"][j]["details"][0]["itemobj"]["itemimage"]+" ></a></div><div class="+"\"dectitlebox\""
					 				+"><div class="+"\"iconbox\""+">"+_icn+"</div><a style="+"\"float:left;\""+" href="+"\"#\""+">"+data["content"][j]["details"][0]["itemobj"]["itemname"]+"</a><i>共"+data["content"][j]["details"].length+"件</i></div></div><div class="+"\"descbox\""+"><p>订单号："+data["content"][j]["serialnumber"]+"</p><i class="+"\"il\""+">送货时间："+data["content"][j]["billexpecteddelivertime"].split(" ")[0].replace(/\-/g,"/")+"</i><i class="+"\"ir\""+">合计：<span class="+"\"pricstyle\""+">￥"+_price+"</span></i></div></dd>"
					 				}
					 				_icn="";
					 			}
								
				   	}
				   	_historyList="<dt>历史订单</dt>"+_historyList;
				   	_shopList="<dt>进行中的</dt>"+_shopList;
						$("#dl2").html(_historyList)
						$("#dl1").html(_shopList);
						$(".orderlistbox").html($(".orderlistbox").html()+"<div class="+"\"loadings\""+"style="+"\"display:none;width:100%;height:50px;background:url(../../image/shop/loading.gif) no-repeat 50% 50%;background-size:3rem 3rem\""+"></div>")
						_historyList="";
						_shopList="";
						_flag=1;
						$(".onload").css({"display":"none"})
						$("#container").scrollTop("0")
						toShop(data,pg)
						onScroll(data,pg)
						}
				 }//ajax的success方法结束
		 });
}
  //ajax结束

	function toShop(data,pg){
		$(".orderlistbox dd").click(function(){
				localStorage.pg=$(this).attr("idd")
				location.href="details.html?pg="+pg+"&index="+$(this).attr("index");
		})
	}
		
		function onScroll(data,pg){
			console.log($(".orderlistbox").css("height"))
			$("#container").scrollTop()
			var _page=data["paging"];
			var _fg=1;
			var _fl=data["paging"]["pageindex"];
			var _ff=1;
			var _ty=1;
			//alert($("#container").css("height").replace("px","")-height)
				$("#container").scroll(function (){
					if(_ty==1){
						
					if(_ff==1){
					if($("#container").scrollTop()>=($(".orderlistbox").css("height").replace("px","")-height)){
						_ty=0
				  	//data["paging"]["pageindex"]=_fl+1
						_page["pageindex"]=_fl+1
						console.log(_page)
						//$("#container").css({overflow:"hidden"})
							$(".loadings").css({display:"block"})
							function aa(){
								$.ajax({
									 	url:"/webapi/distributor/"+getRetailerid()+"/orderforms?distributor_id="+_data1[pg]["distributor_id"]+"&paging="+JSON.stringify(_page),
									  async:true,
									  cache:false,
									  type:"get",
									  error:function(){alert("网络出错")},
									  success:function(data2){
									  	var _img="";
									  	//$("#container").css({overflow:"scroll"})
									  	if(data2["content"].length!==0){
									  		_fl++	
									  	}else{
									  		_ff=0
									  	}
									  	_data2=data2
									  	console.log(data2)
									  		$(".loadings").css({display:"none"})
									  if(data2["error"]==""){
					   				for(var r=0;r<data2["content"].length;r++){
					   			if(data2["content"][r]["details"].length>1){
					   				_price=0;
				   				for(var t=0;t<data2["content"][r]["details"].length;t++){
												if(data2["content"][r]["details"][t]["itemtype"]!=3){
													_price+=Number(data2["content"][r]["details"][t]["itemunitcost"])*Number(data2["content"][r]["details"][t]["itemcount"])
												}
									}
				   				if(data2["content"][r]["details"].length>3){
					   				for(var t=0;t<3;t++){
					   					_img+="<a><img src="+data2["content"][r]["details"][t]["itemobj"]["itemimage"]+"></a>";
					   				}		
				   				}else{
					   				for(var y=0;y<data2["content"][r]["details"].length;y++){
					   					_img+="<a><img src="+data2["content"][r]["details"][y]["itemobj"]["itemimage"]+"></a>";
					   				}	   					
				   				}
								console.log(_img)
					   	_bookTm=data2["content"][r]["issuetime"].replace(new RegExp("-","gm"),"/");
			  		_bookTm = (new Date(_bookTm)).getTime();
			  		_price=_price.toFixed(2)
					   	if(data2["content"][r]["openflag"]=="0"){
					   			_historyList+="<dd style="+"\"padding-top:20px;\""+" idd="+JSON.stringify(data2["paging"])+" index="+r+"><div class="+"\"image2box\""+">"+_img+"</div><i class="+"\"ammount\""+">共"+data2["content"][r]["details"].length+"件</i><div class="+"\"descbox\""+"><p>订单号："+data2["content"][r]["serialnumber"]+"</p><i class="+"\"il\""+">送货时间："+data2["content"][r]["billexpecteddelivertime"].split(" ")[0]+"</i><i class="+"\"ir\""+">合计：<span class="+"\"pricstyle\""+">￥"+_price+"</span></i></div></dd>";
					 		}else{
									_shopList+="<dd style="+"\"padding-top:20px;\""+" idd="+JSON.stringify(data2["paging"])+" index="+r+"><div class="+"\"image2box\""+">"+_img+"</div><i class="+"\"ammount\""+">共"+data2["content"][r]["details"].length+"件</i><div class="+"\"descbox\""+"><p>订单号："+data2["content"][r]["serialnumber"]+"</p><i class="+"\"il\""+">送货时间："+data2["content"][r]["billexpecteddelivertime"].split(" ")[0]+"</i><i class="+"\"ir\""+">合计：<span class="+"\"pricstyle\""+">￥"+_price+"</span></i></div></dd>";	
					 		}
					 		_img="";
						 			}else if(data2["content"][r]["details"].length>0 && data2["content"][r]["details"].length<=1){
						 			if(data2["content"][r]["details"][0]["itemobj"]["itemtype"]){
							 			if(data2["content"][r]["details"][0]["itembobj"]["itemtype"]=="0"){
					   					_icn="<img src="+"\"../../image/shop/temp.jpg\""+">"
					   					console.log(_icn)
					   				}
						 			}
						 			
						 				if(data2["content"][r]["openflag"]=="0"){
						 						_historyList+="<dd style="+"\"padding-top:20px;\""+" idd="+JSON.stringify(data2["paging"])+" index="+r+"><div style=\"display:flex;width:100%\"><div class="+"\"imagebox\""+"><a href="+"\"#\""+"><img src="+data2["content"][r]["details"][0]["itemobj"]["itemimage"]+" ></a></div><div class="+"\"dectitlebox\""
						 				+"><div class="+"\"iconbox\""+">"+_icn+"</div><a style="+"\"float:left;\""+" href="+"\"#\""+">"+data2["content"][r]["details"][0]["itemobj"]["itemname"]+"</a><i>共"+data2["content"][r]["details"].length+"件</i></div></div><div class="+"\"descbox\""+"><p>订单号："+data2["content"][r]["serialnumber"]+"</p><i class="+"\"il\""+">送货时间："+data2["content"][r]["billexpecteddelivertime"].split(" ")[0]+"</i><i class="+"\"ir\""+">合计：<span class="+"\"pricstyle\""+">￥"+_price+"</span></i></div></dd>"
						 				}else{
						 						_shopList+="<dd style="+"\"padding-top:20px;\""+" idd="+JSON.stringify(data2["paging"])+" index="+r+"><div style=\"display:flex;width:100%\"><div class="+"\"imagebox\""+"><a href="+"\"#\""+"><img src="+data2["content"][r]["details"][0]["itemobj"]["itemimage"]+" ></a></div><div class="+"\"dectitlebox\""
						 				+"><div class="+"\"iconbox\""+">"+_icn+"</div><a style="+"\"float:left;\""+" href="+"\"#\""+">"+data2["content"][r]["details"][0]["itemobj"]["itemname"]+"</a><i>共"+data2["content"][r]["details"].length+"件</i></div></div><div class="+"\"descbox\""+"><p>订单号："+data2["content"][r]["serialnumber"]+"</p><i class="+"\"il\""+">送货时间："+data2["content"][r]["billexpecteddelivertime"].split(" ")[0]+"</i><i class="+"\"ir\""+">合计：<span class="+"\"pricstyle\""+">￥"+_price+"</span></i></div></dd>"
						 				}
						 				
						 			}
									
					   	}
	//				   		if(_fg==1){
	//				   			_historyList+="<div class="+"\"loadings\""+"style="+"\"display:none;width:100%;height:50px;background:url(../../image/shop/loading.gif) no-repeat 50% 50%;background-size:3rem 3rem\""+"></div>"
	//				   			_fg=0
	//				   		}
							$("#dl2").html($("#dl2").html()+_historyList)
							$("#dl1").html($("#dl1").html()+_shopList);
							_historyList="";
							_shopList="";
							toShop(data,pg)
							}
							
										_ty=1		
										
							}

								 })
								}
							aa()
							}
					}
					}
				})

		}
  }); //document结束