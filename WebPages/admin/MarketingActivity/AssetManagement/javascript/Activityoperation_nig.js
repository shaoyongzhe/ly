$(function(){

	//城市三级联动
		comSelect();
		selectCity();

	//时间插件
		var start = {
		  elem: '#start',
		  format: 'YYYY/MM/DD ',
		  //min: laydate.now(), //设定最小日期为当前日期
		  max: '2099-06-16 23:59:59', //最大日期
		  istime: false,
		  istoday: false,
		  choose: function(datas){
		    end.min = datas; //开始日选好后，重置结束日的最小日期
		    end.start = datas //将结束日的初始值设定为开始日
		    layer.msg(datas);
		  }
		};
		var end = {
		  elem: '#end',
		  format: 'YYYY/MM/DD ',
		  // min: laydate.now(),
		  max: '2099-06-16 23:59:59',
		  istime: false,
		  istoday: false,
		  choose: function(datas){
		    start.max = datas; //结束日选好后，重置开始日的最大日期
		    layer.msg(datas);
		  }
		};
		laydate(start);
		laydate(end);

	//时间进去默认增加一年
		var time = new Date();
		var timer = time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate();
		var timer_tommory=time.getFullYear()+ 1 +"/"+(time.getMonth()+1)+"/"+time.getDate();
		$('#start').attr('value',timer); //start
		$('#end').attr('value',timer_tommory); //end

	//追加/缩减下拉
		function selec(name1,name2){
			name1.on('click',function(){
				$(this).next('.add_redd').stop().slideToggle(200);
			});
			name2.on('click',function(){
				var Xia_text=$(this).text();
				$(this).parent('.add_redd').prev('.parten_box').children('a').text(Xia_text);
				$(this).parent('.add_redd').slideUp();
			});
		};
		selec($('.parten_box'),$('.add_redd li'));

	//预算事由
	 _ajax('get','http://127.0.0.1:40010/webapi/budget/ipaloma/dict/purpose',{},'预算事由获取错误',function(data){

		// if(typeOf item == 'string'){
		// 	var item = JSON.parse(item);
		// }
		var res_select=data.purpose;
		var str='';
		for(var i=0; i<res_select.length;i++){
			str+="<li>"+
					'<input type="hidden" value="'+data.purpose[i].purpose_id+'">'+
					"<a href='javascript:;'>"+data.purpose[i].purpose+"</a>"+
				"</li>"
		}
		$('.regin_box_sonul').html(str);
	 })
	
	//负责人http://membership.ipaloma.com/webapi/budget/ipaloma/dict/responsible
	_ajax('get','http://127.0.0.1:40010/webapi/budget/ipaloma/dict/responsible',{},'负责人获取错误',function(data){
		var peson_charge=data.responsible;
		var str='';
		for(var i=0;i<peson_charge.length;i++){
			str+="<li>"+
					'<input type="hidden" value="'+peson_charge[i].responsible_id+'">'+
					"<a href='javascript:;'>"+peson_charge[i].responsible+"</a>"+
				 "</li>"
		}
		$('.Person_box_son').html(str)
	})

	//预算状态
	_ajax('get','http://127.0.0.1:40010/webapi/budget/ipaloma/dict/auditstatus',{},'预算状态获取错误',function(data){
		var yu_state=data.auditstatus;
		var str='';
		for(var i=0;i<yu_state.length;i++){
			str+="<li>"+
					"<a href='javascript:;'>"+yu_state[i]+"</a>"+
				 "</li>"
		}
		$('.Person2_sonul').html(str)
	})

		var regin_purpose_id=null;//预算事由id
		var Person_res_id=null;//负责人id

		//负责人下拉框
		$('.Person_box').on('click',function(event){
			event.stopPropagation();
			$(this).find('.Person_box_son').stop().slideToggle(200);
			//其他卷上
			$('.regin2_box_sonul,.Person2_sonul,.regin_box_sonul').slideUp();
			var title=$('.Person_box_ipt').val();
			$('.Person_box_ipt').attr('title',title);		
		});
		$(document).click(function(){	
			$('.Person_box_son').slideUp();
		})
		$('.Person_box').on('click','.Person_box_son li',function(){
			Person_res_id=$(this).find("input").val();
			$('.Person_box_ipt').attr('value',$(this).children('a').text());
		});

		//预算事由下拉框
		$('.regin_box1_son').on('click',function(event){
			event.stopPropagation(); //会冒泡到document 所以阻止
			$(this).find('.regin_box_sonul').stop().slideToggle(200);
			var title=$('.regin_box_ipt').val();
			$('.regin_box_ipt').attr('title',title);
			//其他卷上
			$('.regin2_box_sonul,.Person2_sonul,.Person_box_son').slideUp();
		});
		$(document).click(function(){
			$('.regin_box_sonul').slideUp();
		})
		$('.regin_box1_son').on('click','.regin_box_sonul li',function(){
			regin_purpose_id=$(this).find("input").val();
			$('.regin_box_ipt').attr('value',$(this).children('a').text());
		});

		//预算编号下拉框
		// $('.regin_box2_son').on('click',function(event){
		// 	event.stopPropagation()
		// 	$(this).find('.regin2_box_sonul').stop().slideToggle(200);	
		// 	//其他卷上 
		// 	$('.Person2_sonul,.Person_box_son,.regin_box_sonul').slideUp();	
		// });
		// $(document).click(function(){
		// 	$('.regin2_box_sonul').slideUp();
		// })
		// $('.regin_box2_son').on('click','.regin2_box_sonul li',function(){
		// 	$('.regin2_box_ipt').attr('value',$(this).children('a').text());
		// });

		//预算状态
		$('.Person2_son').on('click',function(event){
			event.stopPropagation();
			$(this).find('.Person2_sonul').stop().slideToggle(200);
			var title=$('.Person2_ipt').val();
			$('.Person2_ipt').attr('title',title);	
			//其他卷上 
			$('.regin2_box_sonul,.Person_box_son,.regin_box_sonul').slideUp();
		});
		$(document).click(function(){
			$('.Person2_sonul').slideUp();
		})
		$('.Person2_son').on('click','.Person2_sonul li',function(){
			$('.Person2_ipt').attr('value',$(this).children('a').text());
		});

    //页面刷新的时候触发查询事件(相当于页面刷新的时候默认点击了查询按钮，自动出数据)
	window.onload=function (){
		$('.query_iptn').click()
	}
//下拉滚动加载代码开始 
		var pagesize = 100;
		var pageindex = 0;
		var pagingJson={
			"pagesize":pagesize,
			"pageindex":pageindex,
			"sort":[{"oid":"asc"}]
		}

	//下拉加载
		//点击事件
		$(document).on('click', '.query_iptn', function() {
			autoLoad = true;
		    $(".table1 tbody").empty();
    		basicQuery(true);
		})
		//下拉事件
		// var to_server=1;
		$(".table1 tbody").scroll(function() {
			if($(".table1 tbody").scrollTop() >= ($(".table1 tbody").prop("scrollHeight") - 570) && $(".table1 tbody").prop("scrollHeight") > 500) {
				basicQuery();
				// console.log(to_server++);
			}
		});
		// }
		//如果文档高度不大于窗口高度，(数据少的话)，就让他自动加载下方数据(其实这块是通用的别管数据多不多)
		autoLoad = true;
		function qixiaofeiload(){
		//  if(autoLoad){
	        if($(".table1 tbody").prop("scrollHeight") <= 570){
	            basicQuery();
	        }
		//  }
		}
		//下拉事件合
		function basicQuery(resetQueryCondition){
			pagingJson.pageindex++;
		    var searchForm = {
				purpose_id :regin_purpose_id,//预算事由13
	            purpose_class:"tblipalomaactivity",//
	            area_province:$('#province span em').text(),//省
	            area_city:$('#city span em').text(),//市
	            area_district:$('#area span em').text(),//区
	            serailnumber:$('.regin2_box_ipt').val(),//预算编号456
	            responsible_id:Person_res_id,//负责人 ‘’
	            begintime:$('#start').val(),//使用预算开始时间 
	            endtime:$('#end').val(),//使用预算结束时间 ''
	            auditstatus:$('.Person2_ipt').val(),//预算状态 ''
	            applycount_min :$('.de_ipt1').val(),//申报min
	            applycount_max:$('.de_ipt2').val(),//申报max
	            budget_min:$('.de1_ipt1').val(),//审批min
	            budget_max:$('.de1_ipt2').val(),//审批max
	            paging:JSON.stringify(pagingJson)
			};
			//再次点击查询的时候 让他清理数据 再查询
			if (resetQueryCondition) {
			    searchForm.paging =JSON.stringify({
						                "pagesize": pagesize,
						                "pageindex": pageindex,
						                "sort": [{ "oid": "asc" }]
						            });
			}


			if(searchForm.purpose_id=='--请选择--'||searchForm.purpose_id==null){
				delete searchForm.purpose_id
			}
			if(searchForm.serailnumber==''){
				delete searchForm.serailnumber
			}
			if(searchForm.area_province=='省'||searchForm.area_province=='省份'){
				delete searchForm.area_province
			}
			if(searchForm.area_city=='市'||searchForm.area_city=='城市'){
				delete searchForm.area_city
			}
			if(searchForm.area_district=='区'||searchForm.area_district=='区县'){
				delete searchForm.area_district
			}
			if(searchForm.responsible_id=='--请选择--'||searchForm.responsible_id==null){
				delete searchForm.responsible_id
			}
			if(searchForm.begintime==''){
				delete searchForm.begintime
			}
			if(searchForm.endtime==''){
				delete searchForm.endtime
			}
			if(searchForm.auditstatus=='--请选择--'){
				delete searchForm.auditstatus
			}
			if(searchForm.applycount_min==''){
				delete searchForm.applycount_min
			}
			if(searchForm.applycount_max==''){
				delete searchForm.applycount_max
			}
			if(searchForm.budget_min==''){
				delete searchForm.budget_min
			}
			if(searchForm.budget_max==''){
				delete searchForm.budget_max
			}
			// return searchForm;
			console.log(searchForm)
			if($('#start').val()=='' || $('#end').val()==''){
				alert('请填写使用预算时间');
				return false;
			}

			$.ajax({
				type:"get",
				url:"http://membership.ipaloma.com/webapi/budget/purpose/summary",
				dataType:"json",
				data:searchForm,
				beforeSend: function() {  //请求前的操作
		           $('.loaded').show();
		           $('.query_iptn').attr('value','查询中');
		           $('.dropload-down').fadeIn(100);//中间消失
		           // $('.query_iptn').attr('disabled', true);
             	   //$('.reste_iptn').attr('disabled', true);
		        },
				complete: function(xhr, textStatus) {
					// console.log(xhr.status);
		            $('.query_iptn').attr('value','查询');
		            $('.loaded').hide();
		        },
				success: function(data){
					console.log(data);
					pagingJson = data['paging'];	//取出paging
					$('.dropload-load').css('display', 'none');

					if (data.error) {
                        layer.msg('暂无数据');
                        return;
                    }
					//判断如果数据都加载完 则出现
					if(data.content.length < 1){
						//layer.alert('数据已加载完', {icon: 1});
						$(".finished").fadeIn(500).delay(1000).fadeOut(500);
						return;
					}
					var Budgetary_reasons=data.content;
	        		var str="";
	        		var str1="";
	        		var str2="";
	        		var str3="";
	        		var str4="";
	        		var str5="";
	        			for(var i = 0;i < Budgetary_reasons.length;i++){     		
		        			str+='<tr>'
		        				//预算编号
		        				str+="<td>"
		        				if(Budgetary_reasons[i].serialnumber!==null){
		        					str+=Budgetary_reasons[i].serialnumber
			        				
		        				}else{
		        					str+='';
		        				}
		        				str+="</td>"
		        				//活动地区
		        				if( Budgetary_reasons[i].arealist!==null){
		        					str+="<td class='activityAreaAndCharge ac_tip'>";
		        					var strreas = '';
		        					var strqcity = '';
		        					var strqcountry = '';
		        					//省
			        				for(var y=0;y<Budgetary_reasons[i].arealist.length;y++){
			        					strreas+=Budgetary_reasons[i].arealist[y].name
			        					//市
										for(var k=0;k<Budgetary_reasons[i].arealist[y].city.length;k++){
			        					 	strreas+='-'+Budgetary_reasons[i].arealist[y].city[k].name
			        						strqcountry = strreas;
			        					 	//区
			        					 	for(var q=0;q<Budgetary_reasons[i].arealist[y].city[k].country.length;q++){
			        					 		strqcity+=strqcountry+'-'+Budgetary_reasons[i].arealist[y].city[k].country[q].name+','
			        					 	}
			        					}
			        				}
			        				if(strqcity){
			        					str+=strqcity+"</td>";
			        				}else{
			        					str+=strreas+"</td>";
			        				}
			        				
		        				}else{
		        					str+="<td>"+''+"</td>";
		        				}
		        				
		        				//预算事由
		        				str+= "<td>"+
		        					Budgetary_reasons[i].purpose_name+
		        					'<input type="hidden" value="'+Budgetary_reasons[i].purpose_id+'">'+
		        					// '<input type="hidden" value="'+Budgetary_reasons[i].purpose_class+'">'+
		        				"</td>"
		        				//负责人
		        				str+="<td>";
		        				for(var q=0;q<Budgetary_reasons[i].responsible.length;q++){
		        					str+=Budgetary_reasons[i].responsible[q].responsible_name+
		        						'<input type="hidden" value="'+Budgetary_reasons[i].responsible[q].responsible_id+'">'
		        				}
		        				str+="</td>";
		        				// /使用预算时间
		        				str+="<td title='"+Budgetary_reasons[i].begintime+'至'+Budgetary_reasons[i].endtime+"'>"+
		        					Budgetary_reasons[i].begintime+'至'+'<br />'+Budgetary_reasons[i].endtime+
		        					"</td>"
		        				//预算状态
		        				str+="<td title='"+Budgetary_reasons[i].auditstatus+"'>"+
		        					Budgetary_reasons[i].auditstatus+
		        					"</td>"
		        				//图片
		        				str+="<td>"+
		        						'<img src="images/icon5.png" uuid="'+Budgetary_reasons[i].purpose_id+'" />'+
		        					"</td>"	
		        			"</tr>";
		        		}
		        		
                        $('.table1 tbody').append(str);
                        $('.dropload-down').fadeOut(4000);

                            	
		        	//判断如果出现一下子加载的数据没有充满屏幕就再加载一次
	        		if(autoLoad){
						if($(".table1 tbody").prop("scrollHeight") > 570){
							autoLoad = false;
						}else{
							qixiaofeiload();
						}		
					}
				},
				error:function(){
					alert('查询出错啦');
				}
	        });

		}

//表格伸缩展开
$('.table1 tbody').on("click", ".activityAreaAndCharge",function(){
	$(this).toggleClass('ac_tip');
})

//下拉滚动代码结束

	//重置按钮
		$('.reste_iptn').on('click',function(){
			var time = new Date();
			var timer = time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate();
			var timer_tommory=time.getFullYear()+ 1 +"/"+(time.getMonth()+1)+"/"+time.getDate();
			$('.regin_box_ipt').attr('value','--请选择--');
			$('.regin2_box_ipt').val('');
			$('.Person_box_ipt').attr('value','--请选择--');
			$('.actBegin ').attr('value',timer_tommory)
			$('.actEnd ').attr('value',timer)
			$('.Person2_ipt').attr('value','--请选择--');
			$('.de_ipt1').val('');
			$('.de_ipt2').val('');
			$('.de1_ipt1').val('');
			$('.de1_ipt2').val('');
			$('#province span em').text('省');
			$('#city span em').text('市');
			$('#area span em').text('区');
			regin_purpose_id=null;  
			Person_res_id=null;  
		})

		

		//详情按钮表格弹窗 
		$(document).on('click','.table1 tbody tr td img',function(){
		  layer.open({ 
			  //anim:1,
			  type: 1,
			  title:'详情',
			  area: ['961px', '88%'],
			  shadeClose: false, //点击遮罩关闭
			  content: $('#layer_bigbox')
		  });

		    var this_uuid = $(this).attr('uuid');
			$.ajax({
				type: "get",
		        url:'http://membership.ipaloma.com/webapi/budget/purpose/summary?purpose_id='+this_uuid,
		        dataType: "json",
		        data:{},
		        beforeSend: function() { 
		         	// layer.msg('玩命加载中');
		         	$('.Loading').fadeIn();
		        },
		        complete: function() {  
		         	$('.Loading').fadeOut();
		        },
		        success:function(data){
		        	console.log(data);
		        	var Areamodule='';
		        	var str1='';
		        	var str2='';
		        	var str3='';
		        	var str4='';
		        	var str5='';
		        	var details_object='';
		        	var Budgetary_reasons=data.content;

			        //详情地区模块
					for(var i = 0;i < Budgetary_reasons.length;i++){
					    if(Budgetary_reasons[i].arealist!==null){
					        for(var y=0;y<Budgetary_reasons[i].arealist.length;y++){
								Areamodule+='<div>'+'<div class="provice">'+
												'<span style="float:left;" title="'+ Budgetary_reasons[i].arealist[y].name +'" class="provice_left">'+Budgetary_reasons[i].arealist[y].name+'</span>'
												if(Budgetary_reasons[i].arealist[y].charge.name!==null){
													Areamodule+='<span class="provice_right">'+Budgetary_reasons[i].arealist[y].charge.name+'</span>'

												}else{
													Areamodule+='<span class="provice_right">'+'暂无负责人'+'</span>'
												}
												
												'<input type="hidden" value="'+Budgetary_reasons[i].arealist[y].charge.guid+'">'+
											'</div>'

								for(var k=0;k<Budgetary_reasons[i].arealist[y].city.length;k++){
									Areamodule+='<div class="city">'+
										 	'<span class="city_left">'+Budgetary_reasons[i].arealist[y].city[k].name+'</span>'
										 	if(Budgetary_reasons[i].arealist[y].city[k].charge.name!==null){
										 		Areamodule+='<span class="city_right">'+Budgetary_reasons[i].arealist[y].city[k].charge.name+'</span>'
										 		
										 	}else{
										 		Areamodule+='<span class="city_right">'+'暂无负责人'+'</span>'
										 	}
										 	'<input type="hidden" value="'+Budgetary_reasons[i].arealist[y].city[k].charge.guid+'">'+
										 '</div>'
										Areamodule+='<div class="area">'
										for(var q=0;q<Budgetary_reasons[i].arealist[y].city[k].country.length;q++){
										 	Areamodule+='<i>'+Budgetary_reasons[i].arealist[y].city[k].country[q].name+'</i>'	 
										}
										Areamodule+='</div>';	
								}
								Areamodule+='</div>'
							}
							$('.areaallson').html(Areamodule)

					    }else{
					    	$('.areaallson').html('暂无活动地区');
					    }
					}

		        	//判断名字
	        		function keyg(keyy){
						if(keyy=='distributor'){
					 		keyy='分销商'
					 	}else if(keyy=='retailer'){
					 		keyy='门店'
					 	}else if(keyy=='consumer'){
					 		keyy='消费者'
					 	}else if(keyy=='distributor_employee'){
					 		keyy='分销商业务员'
					 	}else if(keyy=='retailer_employee'){
					 		keyy='门店店员'
						 	}
						return keyy;
					}
					// 判断内容
	        		function judgeEvent(keys){
	        			if(keys=='distributorinviteretailer'){
							keys='门店签约分销商'
						}else if(keys=='register'){
							keys='注册'
						}else if(keys=='invitefan'){
							keys='成功邀请朋友关注'
						}else if(keys=='verify_first'){
							keys='首次核销'	
						}else if(keys=='verify_normal'){
							keys='非首次核销'	
						}else if(keys=='shareverify'){
							keys='分享核销结果'	
						}else if(keys=='shareticket'){
							keys='分享超惠券'	
						}else if(keys=='shareretailer'){
							keys='分享门店'	
						}else if(keys=='openretailer'){
							keys='自主开店'	
						}else if(keys=='openmemsys'){
							keys='开通会员系统'	
						}
						return keys;
	        		}
	        		//判断内容
	        		function judgeEvent1(keys){
	        			if(keys=='randompoints'){
	        				keys='随机积分'
	        			}else if(keys=='fixedpoints'){
	        				keys='固定积分'
	        			}else if(keys=='fixedmoney'){
	        				keys='固定金额'
	        			}else if(keys=='randommoney'){
	        				keys='随机金额'
	        			}else if(keys=='randomredpacket'){
	        				keys='随机微信红包'
	        			}else if(keys=='fixedredpacket'){
	        				keys='固定微信红包'
	        			}else if(keys=='fixedmoneyticket'){
	        				keys='固定金额返现券'
	        			}else if(keys=='randommoneyticket'){
	        				keys='随机金额返现券'
	        			}
	        			return keys;
	        		}
	        			
	        		
			        for(var i = 0;i < Budgetary_reasons.length;i++){
			        		if(Budgetary_reasons[i].serialnumber!==null){
	        					str1+=Budgetary_reasons[i].serialnumber
		        				
	        				}else{
	        					str1+='';
	        				}
	        				
			        		str2+=Budgetary_reasons[i].purpose_name+
		    					  '<input type="hidden" value="'+Budgetary_reasons[i].purpose_id+'">'+
		    					  '<input type="hidden" value="'+Budgetary_reasons[i].purpose_class+'">';
                            var sum =0;
                            var sum2=0;
		    				//分销商 门店 消费者  门店店员 分销商店员
		    				for(key in Budgetary_reasons[i].benefit){
							//console.log(key)
								var keyall=Budgetary_reasons[i].benefit;
								function judgeMoney(money){
									if(money.length!==4){
										money='元'
									}else{
										if(money.charAt(3)=='分'){
											money='分'
										}else{
											money='元'
										}
										// money.charAt(3)=='分'?money='分':money='元'
									}
									return money
								}

		    					if(keyall[key]["min"]&&keyall[key]["max"]!==undefined){
									str4+='<div style="margin-bottom:15px;"><p style="margin-bottom: 3px">'+keyg(key)+'</p>'+
										  '<p>'+
										 	  judgeEvent(keyall[key]["event"])+judgeEvent1(keyall[key]["refund_content"])+keyall[key]["min"]+ '-' + keyall[key]["max"]+judgeMoney(judgeEvent1(keyall[key]["refund_content"]))+'/次,'+'一个'+keyg(key)+'在一个超惠卷主题活动中总补贴金额上限'+keyall[key]["ceiling"]+'元'+'<input type="hidden" value="'+keyall[key]["guid"]+'">'+
										  '</p></div>'
									//求出直发现金(有min和max)
									var single=Number(keyall[key]["ceiling"])*Number(keyall[key]["max"]);
									sum+=single;
								}else{
									str4+='<div style="margin-bottom:15px;"><p>'+keyg(key)+'</p>'+
											'<p>'+
											   judgeEvent(keyall[key]["event"])+judgeEvent1(keyall[key]["refund_content"])+keyall[key]["min"] +judgeMoney(judgeEvent1(keyall[key]["refund_content"]))+'/次,'+'一个'+keyg(key)+'在一个超惠卷主题活动中总补贴金额上限'+keyall[key]["ceiling"]+'元'+'<input type="hidden" value="'+keyall[key]["guid"]+'">'+
											'</p></div>'
									//求出直发现金(只有min)
									var double=Number(keyall[key]["ceiling"])*Number(keyall[key]["min"]);
									sum+=double;
								}

								//详情的小表格
								details_object+='<tr>'+
													'<td>'+keyg(key)+'</td>'+
													'<td>'+keyall[key]["refund_content"]+'</td>'+
													'<td>'+keyall[key]["applycount"]+'</td>'+
													'<td>'+'</td>'+
													'<td>'+'</td>'+
												'</tr>'
								
								sum2+=Number(keyall[key]["applycount"])
								console.log(sum2)
							}
							
						//预算状态：
		    			str5+=Budgetary_reasons[i].auditstatus
		    		}
		    		$('.Straight_cash_number').html(sum);//直发现金
		    		$('.Bud_number').html(str1); //详情-预算编号
		        	$('.purpose').html(str2); //详情-活动名称
		        	// $('.operation_right').html(str3); //详情-活动地区
		        	$('.Three_arrea').html(str4); //详情-
		        	$('.status_2').html(str5);//预算状态
		        	$('.table2 tbody').html(details_object+'<tr>'+
		        												'<td>'+'合计'+'</td>'+
		        												'<td>'+'</td>'+
		        												'<td>'+sum2+'</td>'+
		        												'<td>'+'</td>'+
		        												'<td>'+'</td>'+
		        											'</tr>')//详情小表格
		        },
		        error:function(){
		        	alert('详情分销商、门店、消费者信息加载失败');
		        }

			})
			
			//详情下面-操作信息
			$.ajax({
				type: "get",
		        url: "http://127.0.0.1:40010/webapi/budget/purpose/"+this_uuid+"/operation",
		        dataType: "json",
		        success:function(data){
		        	console.log(data)
		        	var str='';
		        	var li_list=data.content.flowing;
		        	function field(vale){
		        		if(vale=="现金"){
		        			change_name='元'
		        		}else if(vale=="积分"){
		        			change_name='分'
		        		}else if(vale=="返现卷"){
		        			change_name='卷'
		        		}
		        		return change_name;
		        	}
		        	for(var i = 0;i<li_list.length;i++){
		        	 	var change_name;
		        		var color = li_list[i].funding.count > 0  ? 'obj_green' : 'obj_red';
		        	 	str+='<li>'+'<input type="hidden" value="'+li_list[i].fowing_id+'">'+
		        	 			li_list[i].operator_name+', '+li_list[i].operation_time+', '+'进行了'+li_list[i].operation+'预算'+li_list[i].funding.assettype+'为'+'<a class="'+color+'">'+li_list[i].funding.count+'</a>'+field(li_list[i].funding.assettype);
		        	 		 '</li>'
		        	}
		        	$('.information_list').html(str);
		        },
		        error:function(){
		        	alert('操作信息加载失败')
		        }
		    });   
		  
		});

		//去审查按钮
		// $('.close_iptn').on('click',function(){
		// 	// $('.layui-layer-close').click();
		// 	alert('暂无审查内容');
		// });
		//追加缩减弹出框
		$('#Add_reed').on('click',function(){
		  //弹出框
		  layer.open({ 
			  //anim:1,
			  type: 1,
			  title:'追加缩减预算',
			  area: ['714px', '55%'],
			  shadeClose: false, //点击遮罩关闭

			  content: $('#layer_addreebox')
		  });

		  $('.cancel').on('click',function(){
		  	$(this).closest('.layui-layer').find('.layui-layer-close').click()
		  	$('.add_redd li').parent('.add_redd').slideUp();
		  });

		});	
		//去审批弹出框
		$('.close_iptn').on('click',function(){
		  //弹出框
		  layer.open({ 
			  //anim:1,
			  type: 1,
			  title:'审批预算',
			  area: ['714px', '55%'],
			  shadeClose: false, //点击遮罩关闭
			  content: $('#layer_approval')
		  });

		  // $('.cancel').on('click',function(){
		  // 	$(this).closest('.layui-layer').find('.layui-layer-close').click()
		  // });

		});		
		
//预算编号模糊查询
 	// $.ajax({
  //       type:"GET",
  //       url:'http://membership.ipaloma.com/webapi/budget/purpose/summary',
  //       dataType:"json", 
  //       data:queryState,   
  //       success:function(data){
  //           // console.log(data)
           
  //           var arr = new Array();
  //           $(data.content).each(function(i){ 
  //           	var sps=data.content[i].serialnumber
  //           	var sps2=sps.toString()
  //           	var sps3=typeof sps2;
  //           	console.log(sps3)             
  //               arr.push(sps2)
  //               // arr.push(sps)
  //           })
  //          console.log(arr)
  //           if(data != null && data.content != null) {
  //               $('#orgNameCom').autocomplete({
  //                   max: 12,    //列表里的条目数
  //                   minChars: 1,    //自动完成激活之前填入的最小字符
  //                   width: 400,     //提示的宽度，溢出隐藏
  //                   scrollHeight: 300,   //提示的高度，溢出显示滚动条
  //                   matchContains: true,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
  //                   autoFill: true,    //自动填充
  //                   lookup: arr
  //               })
  //           }
  //       }
  //   })


}) //jq结束标签

	// 封装ajax
	var _ajax = function(type, url, data, tip, success) {
	    $.ajax({
	        type: type,
	        url: url,
	        dataType: "json",
	        data: data,
	        beforeSend: function() {  //请求前的操作
	           $('.loaded').show();
	        },
	        complete: function() {}, //请求成功动作发生时 
	        timeout: function() {},  //延时请求
	        success: function(json) {//请求成功 JSON请求完成的数据
	            $('.loaded').hide();
	        },
	        error: function() {
	            alert(tip);
	        }
	    });
	}


         



















































