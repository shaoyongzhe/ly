$(function(){

	//var url     = 'http://membership.ipaloma.com/webapi/ipaloma/topic/wechat/detail?contributortype=distributor&contributorid=5ce1d14e07534139ae7774d8983f04f3&topicid=bf5708cb24e844a5a3216ffaf96f7247';
	// var arr_two = url.split('?');  	
	// var arr_thr = arr_two[1].split('&'); 
	// var overarr = [arr_thr[0].split('=')[1],arr_thr[1].split('=')[1],arr_thr[2].split('=')[1]];
	//  overarr[0] == distributor
	var new_arr=[];
	//var currentindex=0;
	replace()
	function replace(){
		//var topid=window.location.search;
	    var topids =  decodeURIComponent(common.getUrlParam("topicid")).split(',');
		for (var i = 0; i <topids.length ; i++) {
			new_arr.push(topids[i]);
		    console.log(topids[i]);
		}
		 // _ajax_paly(new_arr[0]);
		 for (var index = 0; index <new_arr.length; index++) {
		 	 _ajax_paly(new_arr[index]);
		 	 console.log(new_arr[index])
		 }
	}
	/* function GetQueryString(name)
    {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    }
    GetQueryString("search")*/

	 function _ajax_paly(topidcont){
		
		// for(var k=0;k<topid.length;k++){
			//var topidval=topid[i];
			$.ajax({
				url:'/webapi/ipaloma/topic/wechat/detail?contributortype=consumer&topicid='+topidcont,
				//url:url,
				type:'get',
				dataType:'json',
				// data:{},
				success:function(data){ 
					console.log(data);
					var str_sum='';
					str_sum+='<div class="swiper-slide">'+
								'<header class="hidden_page_b">'+
									'<h1 class="head_font">'+data.post+'</h1>'+
									'<input class="oid_ipt" type="hidden" value="'+data.oid+'">'+
									'<input class="guid_ipt" type="hidden" value="'+data.guid+'">'+
									// '<img class="closepage" src="../image/1-1-1.png" alt="">'+
									'<img class="activesmallpic" src="../image/5-1.png" alt="">'+
									'<a class="active1font" href="javascript:;">'+'</a>'+
								'</header>'+
								'<article class="hidden_page_b">'+
									'<section class="Topbanner swipe-handler">'+
										'<div class="Topbanner_cont">'+
											'<div class="Topbanner_contimg" href="javascript:void(0);">'+
												'<img src="'+data.poster_url+'" alt="">'+
												'<p class="Topbanner_contimgbox">'+
													'<a href="javascript:;">'+data.activitytitle+'</a>'+
												'</p>'+
											'</div>'+
											'<div id="pl_1" class="Bottombanner_cont">'+
												'<a class="Bottombanner_contfont" href="javascript:void(0)">'+data.content+'</a>'+
											'</div>'+
										'</div>'+
									'</section>'+
									'<section class="Activity">'+
										'<div class="Activitytop">'+
											'<p class="active_font">'+'活动规则说明'+'</p>'+
										'</div>'+
										'<div class="Activitytoppic">'+
											'<a class="subsidies" href="javascript:void(0)">'+'平台最高补贴'+'</a>'+
											'<a class="yellow_money" href="javascript:void(0)">'+'￥'+
												'<span>'+formatCash1(data.budget.subsidytotal)+'</span>'+
											'</a>'+
											'<p class="issued">'+
												'<a href="javascript:void(0)">'+'已发放￥'+'</a>'+
												'<a href="javascript:void(0)">'+formatCash1(data.budget.subsidyreleased)+'</a>'+
											'</p>'+
											'<p class="enjoy">'+'你已经享受补贴'+
												'<a style="color: #ffff36;" href="javascript:;">'+data.budget.days+'</a>'+'天,获得'+
												'<span>'+'￥'+'</span>'+'<span>'+formatCash1(data.budget.obtained)+'</span>'+
											'</p>'+
										'</div>'+
									'</section>'+
									'<section class="tablecont">'+
									'</section>'+
									'<footer>'+
										'<div class="Bu_time">'+
											'<p>'+
												'<span>'+'补贴时间:&nbsp;'+'</span>'+
												'<a href="javascript:void(0)">'+
													'<span class="begin_times">'+data.begintime+
													'</span>'+'-'+
													'<span class="end_times">'+data.endtime+
													'</span>'+
												'</a>'+
											'</p>'+
										'</div>'+
										'<section class="qualification">'+
											'<div class="qualification_top">'+
												'<h2>'+'参与资格'+'</h2>'+
											'</div>'+
											'<div class="qua_box">'+
												'<div class="variety">'+
													'<a href="javascript:;">'+'活动商'+'</a>'+
												'</div>'+
												'<div class="xsp_x">'+
													'<div class="xsp_x_left">'+
														'<a href="javascript:;">'+'不限'+'</a>'+
													'</div>'+
													'<div class="xsp_x_right">'+
														'<a href="javascript:;">'+'</a>'+
													'</div>'+
												'</div>'+
											'</div>'+
										'</section>'+
										'<div class="T_time">'+
											'<p>'+
												'<img src="../image/4-1.png" alt="">'+
												'<a href="javascript:void(0)">'+
													'服务电话&nbsp;&nbsp;&nbsp;'+
													'<span>'+data.servicephone+'</span>'+
												'</a>'+
											'</p>'+
										'</div>'+
										'<p class="ownership">'+
											'本次活动最终解释权归凌云科技所有'
										'</p>'+
									'</footer>'+
								'</article>'+
							'</div>'
							 
					$('.swiper2>.swiper-wrapper').append(str_sum);

				//钱袋
					
					var getmoneys=data.budget.obtained; //获取获得
					var str_small='';
					for(var p=0;p<getmoneys.length;p++){
						str_small+=getmoneys[p]
					}
					
				function formatCash1(num) {
				    var result = '', counter = 0;
				    var num = (num || 0).toString();
				    var str_cash_unit = num.split('.')[0]
					var str_cash_decimals = num.split('.')[1];
				    for (var i = str_cash_unit.length - 1; i >= 0; i--) {
				        counter++;
				        result = num.charAt(i) + result;
				        if (!(counter % 3) && i != 0) { result = ',' + result; }
				    }
				    if(str_cash_decimals != undefined){
				    	if(str_cash_decimals.length != 0  ){
				    	return result + '.' + str_cash_decimals;
				    }
					}else{
					    	return result;
					    }
				}

					/*function formatCash1( cash ){
						var str_cash = cash + "";
						var ret_cash = "";
						var counter = 0;
						for(var i=str_cash.length-1;i>=0;i--){
							ret_cash = str_cash.charAt(i) + ret_cash;
							counter++;
							if(counter==3){
								counter = 0;
							if(i!=0)
								ret_cash = "," + ret_cash;
							}
						}
						return ret_cash;
					}*/

				allSubsidy();
				function allSubsidy(){
					var subsidy=data.subsdiydescription;
					var str='';
					// console.log(str);
					var keyy = '';
				 	function keyg(keyy){
					 if(keyy=='distributor'){
					 		keyy='分销商'
					 	}else if(keyy=='retailer'){
					 		keyy='门店'
					 	}else if(keyy=='consumer'){
					 		keyy='消费者'
					 	}else if(keyy=='distributor_employee'){
					 		keyy='分销商店员'
					 	}else if(keyy=='retailer_employee'){
							keyy='门店店员'
					 	}
					 	return keyy;
				 	}
				 	
					for(key in subsidy){
						str+='<div class="tablecont_one">'+
								'<div class="xps_q">'+
									'<a href="javascript:;">'+keyg(key) +'</a>'+
								'</div>'+
								'<div class="Focus_box">'+
									'<div class="Focus_box_left">'+
										'<ul>'+
											'<li style="background: #fff2f2; "><a href="javascript:;">补贴条件(次)</a></li>'+
											'<li style="background: #ffe5e5;"><a href="javascript:;">补贴形式</a></li>'+
											'<li style="background: #fff2f2;"><a href="javascript:;">补贴规则</a></li>'+
										'</ul>'+
									'</div>'+
									'<div class="Focus_box_right">'+
										'<div class="swiper-container swiper1">'+
											'<ul class="swiper-wrapper FenX">'+ composeSubsidyObject(subsidy[key]) +'</ul>'+
										'</div>'+
									'</div>'+
								'</div>'+
							 '</div>'	
							 $('.tablecont:last').html(str);	
					}
					/*jQuery.each(str, function(i, val) {  

					    $('.tablecont').html(str[i]);
					}); */ 
					// console.log(str);
					// function composeSubsidyDescription(subsidycontent)
					// {
					// 	var subsidyevent = subsidycontent["subsidyevent"];
					// 		return '<a style="line-height: 1.1rem;font-size: 0.4rem;display: block;background: #fff2f2;">' + subsidycontent.subsidyevent + '</a>'
					// 		+ '<a style="line-height: 1.1rem;font-size: 0.4rem;display: block;background: #ffe5e5;">' + subsidycontent.subsidymethod + '</a>'
					// 		+ '<a style="line-height: 0.8rem;font-size: 0.4rem;display: block;background: #fff2f2;text-indent: 0;float: left;margin-left: 0.3rem;">1个分销商在一个超惠卷主题活动中:' +
					// 			subsidycontent.ruledescription+ '...</a>';
					// }
					function composeSubsidyObject(subsidyparameter)
					{
						var li = "";
						
						for (var i = 0; i <= subsidyparameter.length - 1; i++)
						{	
							var str = "";
							if(subsidyparameter[i].subsidymethod.split(',')[1] != undefined){
								 str = subsidyparameter[i].subsidymethod.split(',')[0]+subsidyparameter[i].subsidymethod.split(',')[1]
							}else{
								 str = subsidyparameter[i].subsidymethod.split(',')[0]
							}
							li += '<li style="text-indent: 0.3rem;border-left: 1px solid #ffcccc;" class="swiper-slide">';
							li += '<a style="line-height: 1.1rem;font-size: 0.4rem;display: block;background: #fff2f2;">' + subsidyparameter[i].subsidyevent + '</a>'
								+ '<a style="line-height: 1.1rem;font-size: 0.4rem;display: block;background: #ffe5e5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + str + '</a>'
								+ '<a style="line-height: 0.66rem;height:4rem;font-size: 0.4rem;display: block;background: #fff2f2;text-indent: 0;float: left;margin-left: 0.3rem;">'
							if(subsidyparameter[i].ruledescription.length != 0){
								li+= subsidyparameter[i].rulerestrict +'：'+'<br/>';
							}
								
								var textson = subsidyparameter[i].ruledescription;
								for( var y = 0; y < textson.length; y++ ){
									console.log( textson[y] )
									li += textson[y]+'<br/>';
								}
								li += '</a>';
						}
						li+='</li>';
						return li;
					}
					
				}

				swiper2()
				//swiper
				var Swiper1 = new Swiper ('.swiper1', { 
				    speed:1200,
					slidesPerView :2,
				});				
				//参与资格
				Participationqualification();
				function Participationqualification(){
						var conditions = data.condition;
						var str='';
						var key = '';
					 	function keyname(key){
						 if(key=='distributor'){
						 		key='分销商'
						 	}else if(key=='retailer'){
						 		key='门店'
						 	}else if(key=='consumer'){
						 		key='消费者'
						 	}else if(key=='distributor_employee'){
						 		key='分销商店员'
						 	}else if(key=='retailer_employee'){
								key='门店店员'
						 	}
						 	return key;
					 	}
					 	jQuery.each(conditions, function(key, value) {  
					 			console.log(key)
	                         	str+='<div class="variety">'+
									'<a href="javascript:;">'+keyname(key)+'</a>'+
								'</div>';
								//console.log(conditions.consumer[0])
							    if(conditions.distributor!==undefined){
									//$('.xsp_x').html('<a class="Unlimited">'+ '不限' +'</a>')
									if(conditions.distributor.length==0){
										str+='<div class="xsp_x">'+'<a class="Unlimited">'+ '不限' +'</a>'+'</div>';
									}else{
										detail()
									}
								}else if(conditions.retailer!==undefined){
									if(conditions.retailer.length==0){
										str+='<div class="xsp_x">'+'<a class="Unlimited">'+ '不限' +'</a>'+'</div>';
									}else{
										detail()
									}
								}else if(conditions.consumer!==undefined){
									if(conditions.consumer.length==0){
										str+='<div class="xsp_x">'+'<a class="Unlimited">'+ '不限' +'</a>'+'</div>';
									}else{
										detail()
									}
								}else if(conditions.distributor_employee!==undefined){
									if(conditions.distributor_employee.length==0){
										str+='<div class="xsp_x">'+'<a class="Unlimited">'+ '不限' +'</a>'+'</div>';
									}else{
										detail()
									}
								}else if(conditions.retailer_employee!==undefined){
									if(conditions.retailer_employee.length==0){
										str+='<div class="xsp_x">'+'<a class="Unlimited">'+ '不限' +'</a>'+'</div>';
									}else{
										detail()
									}
								}
						function detail(){
							for (var i = 0; i <value.length; i++) {
								str+= '<div class="xsp_x">'+
										'<div class="xsp_x_left">'+
											'<a href="javascript:;">'+value[i].localtype+'</a>'+
										'</div>'+
										'<div class="xsp_x_right">'+
											'<a href="javascript:;">'+value[i].description+'</a>'+
										'</div>'+
									'</div>';
								}
						}

	                    });  
						
						$('.qua_box:last').html(str);
				}
					//调整度数
					if($('.issued a:nth-child(2)').text().length < 4){
						$('.issued a:nth-child(1)').css({
							'transform':'rotate(3deg)',
							'-webkit-transform':'rotate(3deg)',
							'margin-top':'0.3rem'
						})
					}

					//活动编号
					activityNumber();
					function activityNumber(i){
						var topids =  decodeURIComponent(common.getUrlParam("topicid")).split(',');
						/*var topid=window.location.search;
						var topids=topid.split('=')[1].split(',');*/
						for (var i = 0; i <topids.length ; i++) {
							if(i==0){
								$('.activesmallpic').attr({
									src:""
								});
								$('.active1font').html();
								$('.more_active').hide();
							}else{
								$('.activesmallpic').attr({
									src:"../image/5-1.png"
								});
								$('.more_active').show();
								$('.active1font').html(function(index){
									return "活动" + (index+1);
								})
							}
						}
						
					}

				},
				error:function(jqXHR){
					console.log('异常');
					console.warn('wechat/detail error');
					var jqXHRstr=JSON.stringify(jqXHR.status);
					//console.log(jqXHRstr.charAt(0))
					if(jqXHRstr.charAt(0)==3){
						tishi('请求重定向')
					}else if(jqXHRstr.charAt(0)==4){
		            	tishi('请求错误');
		            }else if(jqXHR.status==5){
		            	tishi('服务器错误');
		            }
		        //请求错误出现弹窗
		            function tishi(content) {
						var html ='<div id="mask" style="width:100%;height:100%;background: rgba(0,0,0,0.4);position: fixed;left: 0;top: 0;z-index: 100;">'+'</div>' +'<div class="xiaoxi none" id="msg" style="z-index:9999;left: 5%;width: 90%;position: fixed;background:none;top:50%;"> <p class="msg" style="background: none repeat scroll 0 0 #000; border-radius: 30px;color: #fff; margin: 0 auto;padding: 1.5em;text-align: center;width: 70%;opacity: 0.8;"></p></div>';
						$(document.body).append(html); 
						$("#msg,#mask").show();
						$(".msg").html(content);
						setTimeout('$("#msg,#mask").fadeOut()', 3000);
					}
				}
			});

	}


				function swiper2(){
				//swiper big
				// debugger;
					var Swiper2 = new Swiper ('.swiper2', {
					    loop: false, //禁止循环 
					    //paginationClickable: true,
					    //spaceBetween: 30,	
					    //centeredSlides: true,
					    //autoplayDisableOnInteraction: false, 
					    //effect: 'slide',
					    speed:1200,
					    observer:true,//修改swiper2自己或子元素时，自动初始化swiper2
						observeParents:true,//修改swiper2的父元素时，自动初始化swiper2
						autoHeight:true,
					    //allowSwipeToPrev : true, //禁止向左滑动
					    //swipeHandler : '.swipe-handler', //作用域
					    onProgress: function(swiper){
					      //currentindex++;
					       //alert(currentindex); //切换结束时，告诉我现在是第几个slide
					       // if(currentindex<new_arr.length)
					       // {
					       //     //_ajax_paly(new_arr[currentindex]);
					       //     console.log(currentindex);
					       // }
					     
					    }
					})
				}






	 //}

		
	 /*};*/
	






















})