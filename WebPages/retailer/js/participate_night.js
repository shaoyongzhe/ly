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
		var topid=window.location.search;
		var topids=topid.split('=')[1].split(',');
		for (var i = 0; i <topids.length ; i++) {
			new_arr.push(topids[i]);
		    console.log(topids[i]);
		}
		 // _ajax_paly(new_arr[0]);
		 for (var index = 0; index <new_arr.length; index++) {
		 	 _ajax_paly(new_arr[index]);
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
				url:'/webapi/ipaloma/topic/wechat/detail?contributortype=retailer&contributorid=2fb9767e4d2b4667a22e082ddc7cade3&topicid='+topidcont,
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
											'<p class="active_font">'+'活动补贴规则'+'</p>'+
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
										//allSubsidy()+
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
														'<a href="javascript:;">'+'使用超惠卷'+'</a>'+
													'</div>'+
													'<div class="xsp_x_right">'+
														'<a href="javascript:;">'+'无'+'</a>'+
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
				
	 					
	 				// var str_svg='<div class="more_active hidden_page_b">'+
						// 		 	'<img class="more_active_left" src="../image/6.png" alt="">'+
						// 		 	'<p class="more_active_cen">'+
						// 		 		'更多活动'+
						// 		 	'<p>'+
						// 		 	'<div class="more_active_right">'+
						// 		 		'<p>'+ '向左滑' +'</p>'+
						// 		 	'</div>'+
						// 		 '</div>'+
						// 		 '<div class="Popup">'+
						// 		 '</div>'


	 				

					/*var _guid = data.guid; //获取guid
					var _oid = data.oid; //获取oid;
					$('.oid_ipt').val(_oid);
					$('.guid_ipt').val(_guid);

					var subsidiesstart = data.begintime; //补贴开始时间
					var subsidiesend = data.endtime;	//补贴结束时间
					$('.begin_times').html(subsidiesstart); //补贴时间输出到页面
					$('.end_times').html(subsidiesend);

					//服务电话
					var Service_telephone=data.servicephone;
					$('.T_time p a span').html(Service_telephone);

					var postslogan = data.post; //获取标题
					$('header h1').html(postslogan); //标题输出到页面

					var Activity_theme = data.activitytitle; //获取主题
					$('.Topbanner_contimgbox a').html(Activity_theme); //主题输出到页面

					var posturlpic = data.poster_url; //获取图片
					$('.Topbanner_contimg img').attr('src',posturlpic); //图片输出到页面
					
					var Advertising_copywriter = data.content; //获取宣传文案
					$('.Bottombanner_cont a').html(Advertising_copywriter); //宣传文案输出到页面*/

					

				//钱袋
					var Platform_subsidies=data.budget.subsidytotal; //平台最高补贴
					var issued=data.budget.subsidyreleased; //已发放
					/*var enjoys=data.budget.days; //已经补贴
					$('.enjoy a').html(enjoys); //已经补贴输出到页面*/
					var getmoneys=data.budget.obtained; //获取获得
					var str_small='';
					for(var p=0;p<getmoneys.length;p++){
						str_small+=getmoneys[p]
					}
					//$('.enjoy span:eq(1)').html(formatCash1(str_small))
					//console.log(getmoneys)

				//三位数加上小数点	
					/*function init1(){
						$('.yellow_money span').html(formatCash1(Platform_subsidies)); //平台最高补贴输出页面
						$('.issued a:eq(1)').html(formatCash1(issued)) //已发放输出页面
						//$('.enjoy span span').html(formatCash1(getmoneys)); //获得输出到页面
					}
					init1()*/
					function formatCash1( cash ){
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
					}


				allSubsidy();
				function allSubsidy(){
					var subsidy=data.subsdiydescription;
					var str='';
					var keyy = '';
				 	function keyg(keyy){
					 if(keyy=='distributor'){
					 		keyy='分销商'
					 	}else if(keyy=='retailer'){
					 		keyy='门店'
					 	}else if(keyy=='consumer'){
					 		keyy='消费者'
					 	}else if(keyy=='distributor_employee'){
					 		keyy='分銷商店员'
					 	}else if(keyy=='retailer_employee'){
							keyy='门店店员'
					 	}
					 	return keyy;
				 	}
				 	/*if(subsidy.distributor == undefined && subsidy.retailer == undefined && subsidy.consumer == undefined &&subsidy.distributor_employee == undefined &&subsidy.retailer_employee == undefined ){
				 		return str='';
				 		
				 	}else{*/
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
								 $('.tablecont:last').html(str)		
						}
					// }
					//$('.tablecont').html(str);
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
						li += '<li style="text-indent: 0.3rem;border-left: 1px solid #ffcccc;" class="swiper-slide">';
						for (var i = 0; i <= subsidyparameter.length - 1; i++) 
						{
							li += '<a style="line-height: 1.1rem;font-size: 0.4rem;display: block;background: #fff2f2;">' + subsidyparameter[i].subsidyevent + '</a>'
								+ '<a style="line-height: 1.1rem;font-size: 0.4rem;display: block;background: #ffe5e5;">' + subsidyparameter[i].subsidymethod + '</a>'
								+ '<a style="line-height: 0.66rem;height:4rem;font-size: 0.4rem;display: block;background: #fff2f2;text-indent: 0;float: left;margin-left: 0.3rem;">'+'1个'+keyg(key) +'在一个超惠卷主题活动中:'+'<br/>';
								
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



			

				//参与资格（条件）
			/*Participationqualification()
			function Participationqualification(){

				var conditions=data.condition;
				if(conditions.retailer==undefined){
					$('.lification').html('<a class="Unlimited">'+ '不限' +'</a>')
				}else if(conditions.consumer==undefined){
					$('.consum').html('<a class="Unlimited">'+ '不限' +'</a>')
				}else if(conditions.retailer!==undefined){
					var strs='';
					for(var i=0;i<conditions.retailer.length;i++){
						strs+='<div class="xsp_x">'+
								'<div class="xsp_x_left">'+
									'<a href="javascript">'+conditions.retailer[i].localtype+'</a>'+
								'</div>'+
								'<div class="xsp_x_right">'+
									'<a href="javascript">'+conditions.retailer[i].description+'</a>'+
								'</div>'+
							 '</div>'
					}
					$('.lification').html(strs);
					//$('.xsp_x_right a').html(description);
				}
				if(conditions.consumer!==undefined){
					var strs2='';
					for(var i=0;i<conditions.consumer.length;i++){
						strs2+='<div class="xsp_x">'+
									'<div class="xsp_x_left">'+
										'<a href="javascript">'+conditions.consumer[i].localtype+'</a>'+
									'</div>'+
									'<div class="xsp_x_right">'+
										'<a href="javascript">'+conditions.consumer[i].description+'</a>'+
									'</div>'+
							   '</div>'
					}
					$('.consum').html(strs2);
				}
				//console.log(conditions.retailer.length)
			}*/

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
					 		key='分銷商店员'
					 	}else if(key=='retailer_employee'){
							key='门店店员'
					 	}
					 	return key;
				 	}
				 	jQuery.each(conditions, function(key, value) {  
                         	str+='<div class="variety">'+
								'<a href="javascript:;">'+keyname(key)+'</a>'+
							'</div>';

							if(conditions==undefined){
								$('.xsp_x').html('<a class="Unlimited">'+ '不限' +'</a>')
							}else if(conditions.length==0){
								$('.xsp_x').html('<a class="Unlimited">'+ '不限' +'</a>')
							}else{
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
							};
                    });  
					
					$('.qua_box:last').html(str);
			}


			//参与资格（条件）
					/*var conditions=data.condition;
					if(conditions==undefined){
						$('.xsp_x').html('<a class="Unlimited">'+ '不限' +'</a>')
					}else if(conditions.length==0){
						$('.xsp_x').html('<a class="Unlimited">'+ '不限' +'</a>')
					}else{
						for(var i=0;i<conditions.length;i++){
							var description=conditions[i].description;
							var localtype = conditions[i].localtype;
						}
						$('.xsp_x_left a').html(localtype);
						$('.xsp_x_right a').html(description);

					}*/
					//console.log(conditions.length)

				//调整度数
				if($('.issued a:nth-child(2)').text().length < 4){
					$('.issued a:nth-child(1)').css({
						'transform':'rotate(3deg)',
						'-webkit-transform':'rotate(3deg)',
						'margin-top':'0.3rem'
					})
				}

				//活动编号
				$('.active1font').html(function(index){
					return "活动" + (index+1);
				});

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
					    //allowSwipeToPrev : true, //禁止向左滑动
					    // swipeHandler : '.swipe-handler', //作用域
					    onProgress: function(swiper){
					     
					     // alert(123)
					     console.log(1)
					      //currentindex++;
					       //alert(currentindex); //切换结束时，告诉我现在是第几个slide
					       // if(currentindex<new_arr.length)
					       // {
					       //     //_ajax_paly(new_arr[currentindex]);
					       //     console.log(currentindex);
					       // }
					       // alert(1)
					    }
					})
				}






	 //}

		
	 /*};*/
	






















})