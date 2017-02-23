      //解析URL




  $(document).ready(function()
  {
  		var pg=0;//门店        后续需要加js！！！！！！！！！！！！！
  		var _list="";
  		var _cost=0;
  		var _send="";
  		var _flag=0;
  		var _year=new Date().getFullYear()
  		var _month=(new Date().getMonth()+1)>10?new Date().getMonth()+1:("0"+(new Date().getMonth()+1))
  		var _day=new Date().getDate()>=10?Number(new Date().getDate())+1:"0"+Nmber(new Date().getDate())+1
  		var _distrgive="";
  		var _reduce=0;
  		var _discount=0;
  		var _mz="";
  		var _dx={};
  		var _indd=localStorage.index;
  		$("#beginTime").val(_year+"-"+_month+"-"+_day)
		var _index=[];
//		if(location.search.replace("?","").split("/")){
//			if(location.search.replace("?","").split("-2")){
//				if(location.search.replace("?","").split("-2/")){
//					_index=location.search.replace("?","").replace("-2/","").split("/")
//				}else{
//					_index=location.search.replace("?","").replace("-2","").split("/")
//				}
//			}else{
//				_index=location.search.replace("?","").split("/")
//			}
//		}else{
//			_index.push(location.search.replace("?",""))
//		};
//		console.log(_index)
		var _Id="";
		var _sub="";
		var _url=location.href;
			if(localStorage.Id){
				_Id=localStorage.Id
			}else if(location.search==""){
				window.history.go(-1)
			}

		if(_Id!==""){
			_sub="&submitids="+_Id
		}
		console.log(_Id)


      $.ajax({
      url:"/webapi/distributor/"+getRetailerid()+"/orderform/items?distributor_id="+localStorage.disId+_sub,
      async:true,
      cache:false,
      dataType:"json",
      type:"get",
      error:function(){},
      success:function(data)
       {

//     	else if(localStorage.Id){
//			for(var k in data){
//				_Id+=data[k]["guid"]+","
//			}
//			_Id=_Id.replace(/\,$/g,"")
//			console.log(_Id)
//		}

       	//checkChange(data)
       	console.log(data)
//     	for(var x=0;x<_index.length;x++){
//     		if(_index[x]!=-1){
//     			console.log(data[x])
//     			_data.push(data[x])
//     		}
//     	}
//     	_data.push
       	var _list="";
       	var _name="";
       	var _price=0;
       	var _zengprice=0;
       	var _intr="";
       	var _ltr="";
       	var _data=data
       	var _remark="";
       	var _image="";
       	var _zz=0;
       	if(_data!=""){
	       	for(var i=0;i<_data.length;i++){
	       		if(_data[i]["isyucun"]==1){
					_image="<img class="+"\"img2\" "+"src="+"../../image/shop/yu.jpg"+" />"
				}else if(_data[i]["itemquality"]===0){
					_image="<img class="+"\"img2\" "+"src="+"../../image/shop/temp.jpg"+" />"
				}else{
					_image=""
				}
	       		if(_data[i]["specification"]==null && _data[i]["packagetypename"]==null){
					_intr=""
				}else if(_data[i]["specification"]==null && _data[i]["packagetypename"]!=null){
					_intr=_data[i]["packagetypename"]
				}else if(_data[i]["specification"]!=null && _data[i]["packagetypename"]==null){
					_intr=_data[i]["specification"]
				}else{
					_intr=_data[i]["specification"]+" | "+_data[i]["packagetypename"]
				}
	       		if(_data[i]["itemslist"]){
	       			_name=_data[i]["itemslist"][_data[i]["selectedindex"]]["itemname"]
	       		}else{
	       			_name=_data[i]["itemname"]
	       		}
	       		if(_data[i]["itemslist"]){
		       		if([_data[i]["selectedindex"]]["specification"]==null || _data[i]["itemslist"][_data[i]["selectedindex"]]["packagetypename"]==null){
		       			_ltr=""
		       		}else{
		       			_ltr=_data[i]["itemslist"][_data[i]["selectedindex"]]["specification"]+" | "+_data[i]["itemslist"][_data[i]["selectedindex"]]["packagetypename"]
		       		}	       			
	       		}
	       		_remark="";
				if(_data[i]["remark"]!=""){
					_remark="<div class="+"\"give\""+"><div class="+"\"give-tit\""+">备注：</div><div class="+"\"give-con\""+">"+_data[i]["ruledesc"]+"</div></div>"
				}
	       		if(_data[i]["isyucun"]===0){
	       			if(!_data[i]["itemslist"]){
		       			if(_data[i]["activityitem_id"]==""){
		       			_zz+=Number(_data[i]["itemcount"])
		       			_price+=_data[i]["price"]*_data[i]["itemcount"];
		       			_list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+_data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div>"+_ltr+"</div><div>×"+_data[i]["itemcount"]+"</div></div></div></div></li>"
			       		}else if(_data[i]["itemkind"]=="降价"){
			       			_zz+=Number(_data[i]["itemcount"])
			       			_price+=_data[i]["price"]*_data[i]["itemcount"];
			       			_discount+=(_data[i]["originalprice"]-_data[i]["price"])*_data[i]["itemcount"]
			       			_list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+_data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div>"+_intr+"</div><div>×"+_data[i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">降价</div><span class="+"\"discount-con\""+
			       		">"+_data[i]["discount"]+" 折</span></div>"+_remark+"</li>"
			       		}else if(_data[i]["itemkind"]=="买赠"){
			       			_zz+=Number(_data[i]["itemcount"])
			       			_zengprice+=Number(_data[i]["unitprice"])
			       			_price+=_data[i]["price"]*_data[i]["itemcount"];
			       			_list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+_data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div>"+_intr+"</div><div>×"+_data[i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">买赠</div><span class="+"\"discount-con\""+
			       		">买"+_data[i]["salecount"]+(_data[i]["packagetypename"]==null?"":_data[i]["packagetypename"])+_data[i]["itemname"]+"赠"+_data[i]["giftcount"]+(_data[i]["giftitemobj"]["packagetypename"]==null?"":_data[i]["giftitemobj"]["packagetypename"])+_data[i]["giftitemobj"]["itemname"]+"</span></div><div class="+"\"give\""+"><div class="+"\"give-tit\""+">赠品：</div><div class="+"\"give-con\""+">"+_data[i]["giftitemobj"]["itemname"]+Math.floor(Number(_data[i]["itemcount"])/Number(_data[i]["salecount"]))*Number(_data[i]["giftcount"])+(_data[i]["giftitemobj"]["packagetypename"]==null?"":_data[i]["giftitemobj"]["packagetypename"])+"</div></div>"+_remark+"</li>"
			       		}else if(_data[i]["itemkind"]=="有礼"){
			       			_zz+=Number(_data[i]["itemcount"])
			       			_zengprice+=Number(_data[i]["giftprice"])
			       			_price+=_data[i]["price"]*_data[i]["itemcount"];
			       			    _list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+_data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div>"+_intr+"</div><div>×"+_data[i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">有礼</div><span class="+"\"discount-con\""+
			       		">购买"+_data[i]["salecount"]+(_data[i]["packagetypename"]==null?"":_data[i]["packagetypename"])+_data[i]["itemname"]+"赠送"+
								_data[i]["giftcount"]+(_data[i]["giftitemobj"]["packagetypename"]==null?"":_data[i]["giftitemobj"]["packagetypename"])+_data[i]["giftitemobj"]["itemname"]+"</span></div><div class="+"\"give\""+"><div class="+"\"give-tit\""+">赠品：</div><div class="+"\"give-con\""+">"+_data[i]["giftitemobj"]["itemname"]+Math.floor(Number(_data[i]["itemcount"])/Number(_data[i]["salecount"]))*Number(_data[i]["giftcount"])+(_data[i]["giftitemobj"]["packagetypename"]==null?"":_data[i]["giftitemobj"]["packagetypename"])+"</div></div>"+_remark+"</li>"
			       		}else if(_data[i]["itemkind"]=="折扣"){
			       			_zz+=Number(_data[i]["itemcount"])
			       			_price+=_data[i]["price"]*_data[i]["itemcount"];
			       			_discount+=(_data[i]["originalprice"]-_data[i]["price"])*_data[i]["itemcount"]
			       			_list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div>"+_intr+"</div><div>×"+_data[i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">折扣</div><span class="+"\"discount-con\""+
			       		">"+_data[i]["discount"]+"</span></div><div class="+"\"give\""+"><div class="+"\"give-tit\""+">备注：</div><div class="+"\"give-con\""+">"+_data[i]["ruledesc"]+"</div></div></li>"   			
			       		}	       				
	       			}else{
		       			if(_data[i]["activityitem_id"]==""){
		       				_zz+=Number(_data[i]["itemcount"])
		       			_price+=_data[i]["price"]*_data[i]["itemcount"];
		       			_list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemslist"][_data[i]["selectedindex"]]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+_data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div>"+_ltr+"</div><div>×"+_data[i]["itemcount"]+"</div></div><span class="+"\"pi\""+">￥"+_data[i]["itemslist"][_data[i]["selectedindex"]]["price"].toFixed(2)+"<span style="+"\"display:inline-block;width:1.4rem;height:1.4rem;border-radius:50%;text-align:center;border:1px solid #ccc\""+
							">预</span></span><p>可提"+_data[i]["prepaycount"]+_data[i]["packagetypename"]+"</p></div></div></li>"
			       		}else if(_data[i]["itemkind"]=="降价"){
			       			_zz+=Number(_data[i]["itemcount"])
			       			_price+=_data[i]["price"]*_data[i]["itemcount"];
			       			_discount+=(_data[i]["originalprice"]-_data[i]["price"])*_data[i]["itemcount"]
			       			_list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+_data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div>"+_intr+"</div><div>×"+_data[i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">降价</div><span class="+"\"discount-con\""+
			       		">"+_data[i]["discount"]+"</span></div>"+_remark+"</li>"
			       		}else if(_data[i]["itemkind"]=="买赠"){
			       			_zz+=Number(_data[i]["itemcount"])
			       			_zengprice+=Number(_data[i]["unitprice"])
			       			_price+=_data[i]["price"]*_data[i]["itemcount"];
			       			_list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+_data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div>"+_intr+"</div><div>×"+_data[i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">买赠</div><span class="+"\"discount-con\""+
			       		">买"+_data[i]["salecount"]+_data[i]["giftitemobj"]["packagetypename"]+_data[i]["itemname"]+"赠"+_data[i]["giftcount"]+_data[i]["giftitemobj"]["packagetypename"]+_data[i]["giftitemobj"]["itemname"]+"</span></div><div class="+"\"give\""+"><div class="+"\"give-tit\""+">赠品：</div><div class="+"\"give-con\""+">"+_data[i]["giftitemobj"]["itemname"]+Math.floor(Number(_data[i]["itemcount"])/Number(_data[i]["salecount"]))*Number(_data[i]["giftcount"])+(_data[i]["giftitemobj"]["packagetypename"]==null?"":_data[i]["giftitemobj"]["packagetypename"])+"</div></div>"+_remark+"</li>"
			       		}else if(_data[i]["itemkind"]=="有礼"){
			       			_zz+=Number(_data[i]["itemcount"])
			       			_zengprice+=Number(_data[i]["giftprice"])
			       			_price+=_data[i]["price"]*_data[i]["itemcount"];
			       			    _list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+_data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div>"+_intr+"</div><div>×"+_data[i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">有礼</div><span class="+"\"discount-con\""+
			       		">购买"+_data[i]["salecount"]+_data[i]["packagetypename"]+_data[i]["itemname"]+"赠送"+
								_data[i]["giftcount"]+_data[i]["giftitemobj"]["packagetypename"]+_data[i]["giftitemobj"]["itemname"]+"</span></div><div class="+"\"give\""+"><div class="+"\"give-tit\""+">赠品：</div><div class="+"\"give-con\""+">"+_data[i]["giftitemobj"]["itemname"]+Math.floor(Number(_data[i]["itemcount"])/Number(_data[i]["salecount"]))*Number(_data[i]["giftcount"])+(_data[i]["giftitemobj"]["packagetypename"]==null?"":_data[i]["giftitemobj"]["packagetypename"])+"</div></div>"+_remark+"</li>"
			       		}else if(_data[i]["itemkind"]=="折扣"){
			       			_zz+=Number(_data[i]["itemcount"])
			       			_price+=_data[i]["price"]*_data[i]["itemcount"];
			       			_discount+=(_data[i]["originalprice"]-_data[i]["price"])*_data[i]["itemcount"]
			       			_list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div>"+_intr+"</div><div>×"+_data[i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">折扣</div><span class="+"\"discount-con\""+
			       		">"+_data[i]["discount"]+"</span></div>"+_remark+"</li>"   			
			       		}	  	       				
	       			}
	       		}else{
	       			if(_data[i]["activityitem_id"]==""){
	       				_zz+=Number(_data[i]["itemcount"])
	       			_price+=_data[i]["price"]*_data[i]["itemcount"];
	       			_list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
		       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+_data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
		       		"><div>"+_intr+"</div><div>×"+_data[i]["itemcount"]+"</div></div><span class="+"\"pi\""+">￥"+_data[i]["itemunitcost"].toFixed(2)+"<span style="+"\"display:inline-block;width:1.4rem;height:1.4rem;border-radius:50%;text-align:center;border:1px solid #ccc\""+
							">预</span></span><p>可提"+_data[i]["prepaycount"]+_data[i]["packagetypename"]+"</p></div></div></li>"
		       		}else if(_data[i]["itemkind"]=="降价"){
		       			_zz+=Number(_data[i]["itemcount"])
		       			_price+=_data[i]["price"]*_data[i]["itemcount"];
		       			_discount+=(_data[i]["originalprice"]-_data[i]["price"])*_data[i]["itemcount"]
		       			_list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
		       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+_data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
		       		"><div>"+_intr+"</div><div>×"+_data[i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">降价</div><span class="+"\"discount-con\""+
		       		">"+_data[i]["discount"]+"</span></div></li>"
		       		}else if(_data[i]["itemkind"]=="买赠"){
		       			_zz+=Number(_data[i]["itemcount"])
		       			_zengprice+=Number(_data[i]["unitprice"])
			       			_list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
			       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+_data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
			       		"><div>"+_intr+"</div><div>×"+_data[i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">买赠</div><span class="+"\"discount-con\""+
			       		">买"+_data[i]["salecount"]+_data[i]["giftitemobj"]["packagetypename"]+_data[i]["itemname"]+"赠"+_data[i]["giftcount"]+_data[i]["giftitemobj"]["packagetypename"]+_data[i]["giftitemobj"]["itemname"]+"</span></div><div class="+"\"give\""+"><div class="+"\"give-tit\""+">赠品：</div><div class="+"\"give-con\""+">"+_data[i]["giftitemobj"]["itemname"]+Math.floor(Number(_data[i]["itemcount"])/Number(_data[i]["salecount"]))*Number(_data[i]["giftcount"])+(_data[i]["giftitemobj"]["packagetypename"]==null?"":_data[i]["giftitemobj"]["packagetypename"])+"</div></div>"+_remark+"</li>"
		       		}else if(_data[i]["itemkind"]=="有礼"){
		       			_zz+=Number(_data[i]["itemcount"])
		       			_zengprice+=Number(_data[i]["giftprice"])
		       			    _list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
		       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
		       		"><div>"+_intr+"</div><div>×"+_data[i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">满赠</div><span class="+"\"discount-con\""+
		       		">购买"+_data[i]["salecount"]+_data[i]["packagetypename"]+_data[i]["itemname"]+"赠送"+
							_data[i]["giftcount"]+_data[i]["giftitemobj"]["packagetypename"]+_data[i]["giftitemobj"]["itemname"]+"</span></div><div class="+"\"give\""+"><div class="+"\"give-tit\""+">赠品：</div><div class="+"\"give-con\""+">"+_data[i]["giftitemobj"]["itemname"]+Math.floor(Number(_data[i]["itemcount"])/Number(_data[i]["salecount"]))*Number(_data[i]["giftcount"])+(_data[i]["giftitemobj"]["packagetypename"]==null?"":_data[i]["giftitemobj"]["packagetypename"])+"</div></div>"+_remark+"</li>"
		       		}else if(_data[i]["itemkind"]=="折扣"){
		       			_zz+=Number(_data[i]["itemcount"])
		       			_discount+=(_data[i]["originalprice"]-_data[i]["price"])*_data[i]["itemcount"]
		       			_list+="<li><div class="+"\"shop-con\""+"><img src="+_data[i]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
		       		">"+_name+_image+"</div><div class="+"\"shop-body\""+">￥"+data[i]["price"].toFixed(1)+"</div><div class="+"\"number\""+
		       		"><div>"+_intr+"</div><div>×"+_data[i]["itemcount"]+"</div></div></div></div><div class="+"\"discount\""+"><div class="+"\"discount-tit\""+">折扣</div><span class="+"\"discount-con\""+
		       		">"+_data[i]["discount"]+"</span></div>"+_remark+"</li>"   			
		       		}       			
	       		}
	
	       	}
       	}
       	sdd()
			function sdd(){
					data=JSON.parse(localStorage.retalerdata).data;
		        	console.log(data)
		        	console.log(_Id)
		        	$("#phoneto").attr("href","tel:"+data[_indd]["mobilephone"])
		        	if(data[_indd]["activityitem_id"]!=""){
		        	_dx["activityitem_id"]=data[_indd]["activityitem_id"]
		        	for(var t=0;t<data[_indd]["promotionactivity"]["details"].length;t++){
			        	if(_price>=Number(data[_indd]["promotionactivity"]["details"][t]["moneysum"])){
			        		//data[0]["promotionactivity"]["details"]
			        		
			        			_mz=data[_indd]["promotionactivity"]["details"][t]["giftitems"]
			        		
			        	}
		        	}
		        	_dx["giftitems"]=_mz
		        	if(_dx=={}){
		        		_dx=""
		        	}else{
		        		_dx=JSON.stringify(_dx)
		        	}
					console.log(_dx)
		        	if(data[_indd]["specialprice"]){
		        		$("#vv").css({display:"flex"})
		        		_discount+=Number(data[_indd]["specialprice"])
		        		$("#vv span").text(data[_indd]["specialprice"].toFixed(1))
		        	}else{
		        		$("#vv").css({display:"none"})
		        	}
		        	var _yu=0;
		        	if(data[_indd]["promotionactivity"] && data[_indd]["promotionactivity"]["details"].length>0){
		        	  	for(var p=0;p<data[_indd]["promotionactivity"]["details"].length;p++){
		        	  		if(_price>=data[_indd]["promotionactivity"]["details"][p]["moneysum"]){
		        	  			_yu=p;

		        			}
						}
		        	}
		        	for(var c=0;c<data[_indd]["promotionactivity"]["details"][_yu]["giftitems"].length;c++){
		        	  	_zengprice+=Number(data[_indd]["promotionactivity"]["details"][_yu]["giftitems"][c]["price"])
		        	  				
		        	  	_distrgive+="<div style="+"\"padding-left:11%\""+">"+data[_indd]["promotionactivity"]["details"][_yu]["giftitems"][c]["itemname"]+"<span style="+"\"margin-left:15px\""+">"+data[_indd]["promotionactivity"]["details"][_yu]["giftitems"][c]["count"]+data[_indd]["promotionactivity"]["details"][_yu]["giftitems"][c]["unit"]+"</span><span class="+"\"gifty\""+">x"+data[_indd]["promotionactivity"]["details"][_yu]["giftitems"][c]["count"]+"</span></div>"		        	  						        	  					
		        	  				
		        	}
		        	if(_distrgive!=""){
						$(".giveto").css({display:"block"})
						$(".gt").html(_distrgive)
					}
		        	}
		        	$("#ss div:nth-child(2)").text("￥"+_zengprice.toFixed(1))
		        	$(".loads").css({display:"none"})
		        	$(".amountBig span").text((_price-data[_indd]["specialprice"]).toFixed(1))
		        }
       	
       	console.log(_discount)
       	$("#cc div:nth-child(2)").text("￥"+_discount.toFixed(1))
		$("#kk div:nth-child(2)").text("￥"+_price.toFixed(1))
		
		if(JSON.parse(localStorage.retalerdata).data["itemkind"]=="满减"){
			if(_price>=100 && _price<500){
				$("#same-ss div:nth-child(3)").text("￥10.0")
			}else if(_price>=500){
				$("#same-ss div:nth-child(3)").text("￥50.0")
			}else{
				$("#same-ss div:nth-child(3)").text("￥0.0")
				$("#same-ss").css({display:"none"})
			}
			_discount+=Number($("#same-ss div:nth-child(3)").text().replace("￥",""))			
		}


		
		
		$(".ab span").text((Number(_discount)+Number(data[_indd]["specialprice"])).toFixed(1))
       	$(".shoplist").html(_list)
       	if(_distrgive!=""){
       		$("#sp3").text(_zz+Number($(".gifty").text().replace("x","")))	
       	}
       	$(".submit span").text("("+data.length+")")
       	$(".loads2").height($("body").height())
       }//ajax的success方法结束
		
	   });      	

  //ajax结束
	if(localStorage.Id!=""){
	   	$(".submit").click(function(){
	   		$("body").css({overflow:"hidden"})
	   		console.log(_Id)
	   		console.log(localStorage.disId)
	   		localStorage.removeItem("Id");
	   		$(".submit").text("提交中...")
	   		$(".loads2").css({display:"block"})
	   		$.ajax({
	   			url:"/webapi/distributor/"+getRetailerid()+"/orderform",
	   			type:"post",
	   			data:{
	   				distributor_id:localStorage.disId,
					remark:$("#inp2").val(), 
					deliverdate:$("#beginTime").val(),
					submitids:_Id,
					manzeng:_dx
	   			},
	   			error:function(){},
	   			success:function(data){
	   				console.log(_Id)
	   				console.log(data)
	   				if(data.result==true){
		   				$(".loads2").css({display:"none"})
		   				$(".loads2 span").text("提交中...")	   					
	   					window.location="myorder.html"
	   				}else{
	   					$(".loads2 span").text("提交失败...")
		   				$(".loads2 span").css({color:"red"})
		   				var _tm=setTimeout(function(){
		   					$(".loads2").css({display:"none"})
		   					$(".loads2 span").text("提交中...")
		   					clearTimeout(_tm)
		   				},500)
	   				}
	   			}
	   		})
	   	})		
	}

   
	$("#sp1").click(function(){
		$(".canlendar").css({display:"block"})
		$("html").css({overflow:"hidden"})
	})

	$(function(){
	
		$('#beginTime').date();
	
		$('#endTime').date({theme:"datetime"});
	
	});

//	$("#inp2").focus(function(){
//		$(this).css({textAlign:"left"})
//	}).blur(function(){
//		if($(this).val()==""){
//			$(this).css({textAlign:"right"})
//		}
//		
//	})
	function checkChange(data11){
		var _tm=setInterval(function(){
			$.ajax({
	      		url:"/webapi/distributor/"+getRetailerid()+"/orderform/items?distributor_id=5ce1d14e07534139ae7774d8983f04f3&submitids="+_Id,
	    		async:true,
	      		cache:false,
	      		dataType:"json",
	     		type:"get",
	      		success:function(data0){
	      			if(JSON.stringify(data11)!==JSON.stringify(data0)){
	      				var _vm=0.8;
	      				$(".chg").css({display:"block"})
	      				clearInterval(_tm)
	      				var _yu=setInterval(function(){
	      					_vm-=0.1;
	      					$(".chg").css({background:"rgba(248,236,235,"+_vm+")"})
	      					console.log(_vm)
	      					if(_vm<=0){
	      						$(".chg").css({display:"none"})
	      						clearInterval(_yu)
	      					}
	      				},300)
	      			}
	      		}
      		})
		},5000)
	}

  }); //document结束