
	
	$(function(){

		//城市三级联动
		comSelect();
		selectCity();

		//时间插件
		var start = {
		  elem: '#start',
		  format: 'YYYY/MM/DD ',
		  min: laydate.now(), //设定最小日期为当前日期
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
		  min: laydate.now(),
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
	 _ajax('get','http://127.0.0.1:40010/webapi/budget/ipaloma/dict/purpose?parameter=%7B%7D',{},'出错了',function(data){

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
	
	//负责人
	_ajax('get','http://127.0.0.1:40010/webapi/budget/ipaloma/dict/responsible?parameter=%7B%7D',{},'出错了',function(data){
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
	_ajax('get','http://127.0.0.1:40010/webapi/budget/ipaloma/dict/auditstatus?parameter=%7B%7D',{},'出错了',function(data){
		var yu_state=data.auditstatus;
		var str='';
		for(var i=0;i<yu_state.length;i++){
			str+="<li>"+
					"<a href='javascript:;'>"+yu_state[i]+"</a>"+
				 "</li>"
		}
		$('.Person2_sonul').html(str)
	})


//城市三级联动
		//省
		 // _ajax('get','ipaloma/dict/area_province',{},'出错了',function(data){
			var str="";
			str+="<li>"+
					data.area_province +
				 "</li>"
			$('#province ul').html(str);
		 // })

		//市
		$('#province ul').on('click','#province ul li',function(){
			//var province_parameter=$(this).attr('id','this_prov')
			/*var province_parameter={
				area_province:"";
				return province_parameter;
			}*/
			// _ajax('get','ipaloma/dict/area_city',{},'出错了',function(data){
				var str='';
				str+="<li>"+
						data.area_city+
					 "</li>"
				$('#city ul').html(str);
			// })
		}) 
		//区
		$('#city ul').on('click','#city ul li',function(){
			//var city_parameter=$(this).attr('id','this_city')
			_ajax('get','ipaloma/dict/area_district',{},'出错了',function(data){
				var str='';
				str+="<li>"+
						data.area_district
					 "</li>"
				$('#area ul').html(str);
			})
		})
		
		//负责人下拉框
		$('.Person_box').on('click',function(event){
			event.stopPropagation();
			$(this).find('.Person_box_son').stop().slideToggle(200);
			//其他卷上
			$('.regin2_box_sonul,.Person2_sonul,.regin_box_sonul').slideUp();		
		});
		$(document).click(function(){
			$('.Person_box_son').slideUp();
		})
		$('.Person_box').on('click','.Person_box_son li',function(){
			$('.Person_box_ipt').attr('value',$(this).children('a').text());
		});

		//预算事由下拉框
		$('.regin_box1_son').on('click',function(event){
			event.stopPropagation(); //会冒泡到document 所以阻止
			$(this).find('.regin_box_sonul').stop().slideToggle(200);
			//其他卷上
			$('.regin2_box_sonul,.Person2_sonul,.Person_box_son').slideUp();
		});
		$(document).click(function(){
			$('.regin_box_sonul').slideUp();
		})
		$('.regin_box1_son').on('click','.regin_box_sonul li',function(){
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
			//其他卷上 
			$('.regin2_box_sonul,.Person_box_son,.regin_box_sonul').slideUp();		
		});
		$(document).click(function(){
			$('.Person2_sonul').slideUp();
		})
		$('.Person2_son').on('click','.Person2_sonul li',function(){
			$('.Person2_ipt').attr('value',$(this).children('a').text());
		});

	//重置按钮
		$('.reste_iptn').on('click',function(){
			$('.regin_box_ipt').attr('value','--请选择--');
			$('.regin2_box_ipt').val('');
			$('.Person_box_ipt').attr('value','--请选择--');
			$('.actBegin ').val('');
			$('.actEnd ').val('');
			$('.Person2_ipt').attr('value','--请选择--');
			$('.de_ipt1').val('');
			$('.de_ipt2').val('');
			$('.de1_ipt1').val('');
			$('.de1_ipt2').val('');
			$('#province span em').text('省');
			$('#city span em').text('市');
			$('#area span em').text('区');
		})
// *************************************************************
		//查询按钮
		$('.query_iptn').on('click',function(){

			var queryState={
				purpose_id :$('.regin_box_ipt').val(),//预算事由
	            purpose_class:"tblipalomaactivity",//
	            // area_province:"",//省
	            // area_city:"",//市
	            // area_district:"",//区
	            serailnumber:$('.regin2_box_ipt').val(),//预算编号
	            responsible_id:$('.Person_box_ipt').val(),//负责人
	            begintime:$('.actBegin ').val(),//使用预算开始时间
	            endtime:$('.actEnd ').val(),//使用预算结束时间
	            auditstatus:$('.Person2_ipt').val(),//预算状态
	            applycount_min :$('.de_ipt1').val(),//申报min
	            applycount_max:$('.de_ipt2').val(),//申报max
	            budget_min:$('.de1_ipt1').val(),//审批min
	            budget_max:$('.de1_ipt2').val()//审批max
			}
			// console.log(queryState);
			// console.log(JSON.stringify(queryState))
			console.log( queryState )
			_ajax('get','http://127.0.0.1:40010/webapi/budget/purpose/summary?parameter=',queryState,'查询出错',function(data){

				console.log(data)
				// alert(1 )

			})
		})

		// function fnchaxun(){
		// 	$.ajax({
		// 		type: "get",
		//         url: "http://127.0.0.1:40010/webapi/budget/purpose/summary",
		//         // data:queryState,
		//         dataType: "json",

		//         success:function(data){
		// 			var Budgetary_reasons=data.content;
	 //        		var str="";
	 //        		var str1="";
	 //        		var str2="";
	 //        		var str3="";
	 //        		var str4="";
	 //        		var str5="";
	 //        		var str6="";
	 //        		var str7="";
	 //        		var str8="";
	 //        		var str9="";
	 //        		var str10="";
	 //        		var str11="";
	 //        		var str12="";

	 //        		function judgeEvent(keys){
	 //        			if(keys=='distributorinviteretailer'){
		// 					keys='门店签约分销商'
		// 				}else if(keys=='register'){
		// 					keys='注册'
		// 				}else if(keys=='invitefan'){
		// 					keys='成功邀请朋友关注'
		// 				}else if(keys=='verify_first'){
		// 					keys='首次核销'	
		// 				}else if(keys=='verify_normal'){
		// 					keys='非首次核销'	
		// 				}else if(keys=='shareverify'){
		// 					keys='分享核销结果'	
		// 				}else if(keys=='shareticket'){
		// 					keys='分享超惠券'	
		// 				}else if(keys=='shareretailer'){
		// 					keys='分享门店'	
		// 				}else if(keys=='openretailer'){
		// 					keys='自主开店'	
		// 				}else if(keys=='openmemsys'){
		// 					keys='开通会员系统'	
		// 				}
		// 				return keys;
	 //        		}
	 //        		function judgeEvent1(keys){
	 //        			if(keys=='randompoints'){
	 //        				keys='随机积分'
	 //        			}else if(keys=='fixedpoints'){
	 //        				keys='固定积分'
	 //        			}else if(keys=='fixedmoney'){
	 //        				keys='固定金额'
	 //        			}else if(keys=='randommoney'){
	 //        				keys='随机金额'
	 //        			}else if(keys=='randomredpacket'){
	 //        				keys='随机微信红包'
	 //        			}else if(keys=='fixedredpacket'){
	 //        				keys='固定微信红包'
	 //        			}else if(keys=='fixedmoneyticket'){
	 //        				keys='固定金额返现券'
	 //        			}else if(keys=='randommoneyticket'){
	 //        				keys='随机金额返现券'
	 //        			}
	 //        			return keys;
	 //        		}
	        		
	 //        		for(var i = 0;i < Budgetary_reasons.length;i++){     		
		//         		str+="<tr>"+'<input type="hidden" value="'+Budgetary_reasons[i].guid+'">'+
		//         				"<td>"+
		//         					Budgetary_reasons[i].serialnumber+
		//         				"</td>"
		//         				//活动地区
		//         				str+="<td>";
		//         				for(var j = 0; j < Budgetary_reasons[i].arealist.length; j++){
		//         					str+=Budgetary_reasons[i].arealist[j].districthash+','
		//         				}
		//         				str+= "</td>";
		//         				//预算事由
		//         				str+= "<td>"+
		//         					Budgetary_reasons[i].purpose_name+
		//         					'<input type="hidden" value="'+Budgetary_reasons[i].purpose_id+'">'+
		//         					'<input type="hidden" value="'+Budgetary_reasons[i].purpose_class+'">'+
		//         				"</td>"
		//         				//负责人
		//         				str+="<td>";
		//         				for(var q=0;q<Budgetary_reasons[i].responsible.length;q++){
		//         					str+=Budgetary_reasons[i].responsible[q].responsible_name+
		//         						'<input type="hidden" value="'+Budgetary_reasons[i].responsible[q].responsible_id+'">'
		//         				}
		//         				str+="</td>";
		//         				//活动地区
		//         				for(var k = 0; k < Budgetary_reasons[i].arealist.length; k++){
		//         					str3+=Budgetary_reasons[i].arealist[k].districthash+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ '负责人:'+
		//         						  Budgetary_reasons[i].arealist[k].chargename+'<input type="hidden" value="'+Budgetary_reasons[i].arealist[k].chargeid+'">'+'<br />';      
		//         				}
		        				
		//         				// /使用预算时间
		//         				str+="<td>"+
		//         					Budgetary_reasons[i].begintime+'至'+'<br />'+Budgetary_reasons[i].endtime+
		//         					"</td>"
		//         				//预算状态
		//         				str+="<td>"+
		//         					Budgetary_reasons[i].auditstatus+
		//         					"</td>"
		//         				//图片
		//         				str+="<td>"+
		//         						'<img src="images/icon5.png" />'+
		//         					"</td>"	
		//         			"</tr>";

		//         		str1+=Budgetary_reasons[i].serialnumber;
		//         		str2+=Budgetary_reasons[i].purpose_name+
	 //    					  '<input type="hidden" value="'+Budgetary_reasons[i].purpose_id+'">'+
	 //    					  '<input type="hidden" value="'+Budgetary_reasons[i].purpose_class+'">';
	 //    				//分销商
	 //    				var dis_total=Budgetary_reasons[i].benefit.distributor;

	 //    				if(dis_total==undefined){
	 //    					$('.distributor_bigson,.distributor_son').hide();
	 //    				}else{

	 //    					$('.distributor_bigson').html('分销商');

	 //    					if(dis_total.min&&dis_total.max!==undefined){
	 //    						judgeEvent(dis_total.event);
	 //    						judgeEvent1(dis_total.refund_content);
		//     					str4+=judgeEvent(dis_total.event)+','+
		//     						  judgeEvent1(dis_total.refund_content)+dis_total.min+'-'+dis_total.min+'/次,'+'一个分销商在一个超惠卷主题活动中总补贴金额上限'+dis_total.ceiling+'元'+'<input type="hidden" value="'+dis_total.guid+'">';
	 //    					}else{
	 //    						judgeEvent(dis_total.event);
	 //    						judgeEvent1(dis_total.refund_content);
	 //    						str4+=judgeEvent(dis_total.event)+','+
	 //    						      judgeEvent1(dis_total.refund_content)+dis_total.min+'/次,'+'一个分销商在一个超惠卷主题活动中总补贴金额上限'+dis_total.ceiling+'元'+'<input type="hidden" value="'+dis_total.guid+'">';
	 //    					}
	 //    					//$('.distributor_bigson,.distributor_son').show();
	 //    				}

	 //    				//门店 
	 //    				var retail_total=Budgetary_reasons[i].benefit.retailer;
	 //    				if(retail_total==undefined){
	 //    					$('.retailer_bigson,.retailer_son').hide();
	 //    				}else{
	 //    					$('.retailer_bigson').html('门店');
	 //    					if(retail_total.min&&retail_total.max!==undefined){
	 //    						judgeEvent();
	 //    						judgeEvent1();
		//     					str5+=judgeEvent(retail_total.event)+','+
		//     						  judgeEvent1(retail_total.refund_content)+retail_total.min+'-'+retail_total.min+'/次,'+'一个门店在一个超惠卷主题活动中总补贴金额上限'+retail_total.ceiling+'元'+'<input type="hidden" value="'+retail_total.guid+'">';
	 //    					}else{
	 //    						judgeEvent();
	 //    						judgeEvent1();
	 //    						str5+=judgeEvent(retail_total.event)+','+
	 //    						      judgeEvent1(retail_total.refund_content)+retail_total.min+'/次,'+'一个门店在一个超惠卷主题活动中总补贴金额上限'+retail_total.ceiling+'元'+'<input type="hidden" value="'+retail_total.guid+'">';
	 //    					}
	 //    				}

	 //    				//消费者 
	 //    				var consu_total=Budgetary_reasons[i].benefit.consumer;
	 //    				if(consu_total==undefined){
	 //    					$('.consumer_bigson,.consumer_son').hide();
	 //    				}else{
	 //    					$('.consumer_bigson').html('消费者');
	 //    					if(consu_total.min&&consu_total.max!==undefined){
	 //    						judgeEvent(consu_total.event);
	 //    						judgeEvent1(consu_total.refund_content);
		//     					str6+=judgeEvent(consu_total.event)+','+
		//     						  judgeEvent1(consu_total.refund_content)+consu_total.min+'-'+consu_total.min+'/次,'+'一个消费者在一个超惠卷主题活动中总补贴金额上限'+consu_total.ceiling+'元'+'<input type="hidden" value="'+consu_total.guid+'">';
	 //    					}else{
	 //    						 judgeEvent(consu_total.event);
	 //    						 judgeEvent1(consu_total.refund_content);
	 //    						str6+=judgeEvent(consu_total.event)+','+
	 //    						     judgeEvent1(consu_total.refund_content)+consu_total.min+'/次,'+'一个消费者在一个超惠卷主题活动中总补贴金额上限'+consu_total.ceiling+'元'+'<input type="hidden" value="'+consu_total.guid+'">';
	 //    					}
	 //    				}

	 //    				//分销商业务员
	 //    				var rempl_total=Budgetary_reasons[i].benefit.distributoremployee;
	 //    				if(rempl_total==undefined){
	 //    					$('.distributoremployee_bigson,.distributoremployee_son').hide();
	 //    				}else{
	 //    					$('.distributoremployee_bigson').html('分销商业务员');
	 //    					if(rempl_total.min&&rempl_total.max!==undefined){
	 //    						judgeEvent(rempl_total.event);
	 //    						judgeEvent1(rempl_total.refund_content);
		//     					str7+=judgeEvent(rempl_total.event)+','+
		//     						  judgeEvent1(rempl_total.refund_content)+rempl_total.min+'-'+rempl_total.min+'/次,'+'一个分销商业务员在一个超惠卷主题活动中总补贴金额上限'+rempl_total.ceiling+'元'+'<input type="hidden" value="'+rempl_total.guid+'">';
	 //    					}else{
	 //    						judgeEvent(rempl_total.event);
	 //    						judgeEvent1(rempl_total.refund_content);
	 //    						str7+=judgeEvent(rempl_total.event)+','+
	 //    						     judgeEvent1(rempl_total.refund_content)+rempl_total.min+'/次,'+'一个分销商业务员在一个超惠卷主题活动中总补贴金额上限'+rempl_total.ceiling+'元'+'<input type="hidden" value="'+rempl_total.guid+'">';
	 //    					}
	 //    				}

	 //    				//门店店员
	 //    				var retaileremployee_total=Budgetary_reasons[i].benefit.retaileremployee;
	 //    				if(retaileremployee_total==undefined){
	 //    					$('.distributoremployee_bigson,.distributoremployee_son').hide();
	 //    				}else{
	 //    					$('.distributoremployee_bigson').html('分销商业务员');
	 //    					if(retaileremployee_total.min&&retaileremployee_total.max!==undefined){
	 //    						judgeEvent(retaileremployee_total.event);
	 //    						judgeEvent1(retaileremployee_total.refund_content);
		//     					str7+=judgeEvent(retaileremployee_total.event)+','+
		//     						  judgeEvent1(retaileremployee_total.refund_content)+retaileremployee_total.min+'-'+retaileremployee_total.min+'/次,'+'一个分销商业务员在一个超惠卷主题活动中总补贴金额上限'+retaileremployee_total.ceiling+'元'+'<input type="hidden" value="'+retaileremployee_total.guid+'">';
	 //    					}else{
	 //    						judgeEvent(retaileremployee_total.event);
	 //    						judgeEvent1(retaileremployee_total.refund_content);
	 //    						str7+=judgeEvent(retaileremployee_total.event)+','+
	 //    						     judgeEvent1(retaileremployee_total.refund_content)+retaileremployee_total.min+'/次,'+'一个分销商业务员在一个超惠卷主题活动中总补贴金额上限'+retaileremployee_total.ceiling+'元'+'<input type="hidden" value="'+retaileremployee_total.guid+'">';
	 //    					}
	 //    				}

	 //    				//预算状态：
	 //    				str7+=Budgetary_reasons[i].auditstatus
		        					


		//         	}
		        
	        		        	
	 //        	$('.table1 tbody').html(str);
	 //        	$('.Bud_number').html(str1); //详情-预算编号
	 //        	$('.purpose').html(str2); //详情-活动名称
	 //        	$('.operation_right').html(str3); //详情-活动地区
	 //        	$('.distributor_son').html(str4); //详情-活动分销商
	 //        	$('.retailer_son').html(str5); //详情-活动门店
	 //        	$('.consumer_son').html(str6); //详情-活动消费者
	 //        	$('.status_2').html(str7); //详情-预算状态

		//         },
		//         error:function(sbys){
		        	
		//         }
		//     })
		// }


// *************************************************************
		//表格	
		$.ajax({
			type: "get",
	        url: "http://127.0.0.1:40010/webapi/budget/purpose/summary?parameter=%7B%22purpose_id%22%3A%227c5c8d3c5a124c6bb58932b19df21051%22%7D",
	        dataType: "json",
	        //data: {},
	        success:function(data){
		        	//console.log(data);
        		var Budgetary_reasons=data.content;
        		var str="";
        		var str1="";
        		var str2="";
        		var str3="";
        		var str4="";
        		//判断名字
        		function keyg(keyy){
					if(keyy=='distributor'){
				 		keyy='分销商'
				 	}else if(keyy=='retailer'){
				 		keyy='门店'
				 	}else if(keyy=='consumer'){
				 		keyy='消费者'
				 	}else if(keyy=='distributoremployee'){
				 		keyy=='分销商业务员'
				 	}else if(keyy=='retaileremployee'){
				 		keyy=='门店店员'
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
	        		str+='<tr>'+'<input type="hidden" value="'+Budgetary_reasons[i].guid+'">'+
	        				"<td>"+
	        					Budgetary_reasons[i].serialnumber+
	        				"</td>"
	        				//活动地区
	        				str+="<td>";
	        				for(var j = 0; j < Budgetary_reasons[i].arealist.length; j++){
	        					str+=Budgetary_reasons[i].arealist[j].districthash+','
	        				}
	        				str+= "</td>";
	        				//预算事由
	        				str+= "<td>"+
	        					Budgetary_reasons[i].purpose_name+
	        					'<input type="hidden" value="'+Budgetary_reasons[i].purpose_id+'">'+
	        					'<input type="hidden" value="'+Budgetary_reasons[i].purpose_class+'">'+
	        				"</td>"
	        				//负责人
	        				str+="<td>";
	        				for(var q=0;q<Budgetary_reasons[i].responsible.length;q++){
	        					str+=Budgetary_reasons[i].responsible[q].responsible_name+
	        						'<input type="hidden" value="'+Budgetary_reasons[i].responsible[q].responsible_id+'">'
	        				}
	        				str+="</td>";
	        				//活动地区
	        				for(var k = 0; k < Budgetary_reasons[i].arealist.length; k++){
	        					str3+=Budgetary_reasons[i].arealist[k].districthash+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ '负责人:'+
	        						  Budgetary_reasons[i].arealist[k].chargename+'<input type="hidden" value="'+Budgetary_reasons[i].arealist[k].chargeid+'">'+'<br />';      
	        				}
	        				
	        				// /使用预算时间
	        				str+="<td>"+
	        					Budgetary_reasons[i].begintime+'至'+'<br />'+Budgetary_reasons[i].endtime+
	        					"</td>"
	        				//预算状态
	        				str+="<td>"+
	        					Budgetary_reasons[i].auditstatus+
	        					"</td>"
	        				//图片
	        				str+="<td>"+
	        						'<img src="images/icon5.png" />'+
	        					"</td>"	
	        			"</tr>";

	        		str1+=Budgetary_reasons[i].serialnumber;
	        		str2+=Budgetary_reasons[i].purpose_name+
    					  '<input type="hidden" value="'+Budgetary_reasons[i].purpose_id+'">'+
    					  '<input type="hidden" value="'+Budgetary_reasons[i].purpose_class+'">';

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
							}
							return money
						}
    					if(keyall[key]["min"]&&keyall[key]["max"]!==undefined){
							str4+='<p>'+keyg(key)+'</p>'+
									 '<p>'+
									 	judgeEvent(keyall[key]["event"])+judgeEvent1(keyall[key]["refund_content"])+keyall[key]["min"]+ '-' + keyall[key]["max"]+judgeMoney(judgeEvent1(keyall[key]["refund_content"]))+'/次,'+'一个'+keyg(key)+'在一个超惠卷主题活动中总补贴金额上限'+keyall[key]["ceiling"]+'元'+'<input type="hidden" value="'+keyall[key]["guid"]+'">'+
									 '</p>'
						}else{
							str4+='<p>'+keyg(key)+'</p>'+
									 '<p>'+
									 	judgeEvent(keyall[key]["event"])+judgeEvent1(keyall[key]["refund_content"])+keyall[key]["min"] +judgeMoney(judgeEvent1(keyall[key]["refund_content"]))+'/次,'+'一个'+keyg(key)+'在一个超惠卷主题活动中总补贴金额上限'+keyall[key]["ceiling"]+'元'+'<input type="hidden" value="'+keyall[key]["guid"]+'">'+
									 '</p>'
						}
					}



    				/*var dis_total=Budgetary_reasons[i].benefit.distributor;

    				if(dis_total==undefined){
    					$('.distributor_bigson,.distributor_son').hide();
    				}else{

    					$('.distributor_bigson').html('分销商');

    					if(dis_total.min&&dis_total.max!==undefined){
    						judgeEvent(dis_total.event);
    						judgeEvent1(dis_total.refund_content);
	    					str4+=judgeEvent(dis_total.event)+','+
	    						  judgeEvent1(dis_total.refund_content)+dis_total.min+'-'+dis_total.min+'/次,'+'一个分销商在一个超惠卷主题活动中总补贴金额上限'+dis_total.ceiling+'元'+'<input type="hidden" value="'+dis_total.guid+'">';
    					}else{
    						judgeEvent(dis_total.event);
    						judgeEvent1(dis_total.refund_content);
    						str4+=judgeEvent(dis_total.event)+','+
    						      judgeEvent1(dis_total.refund_content)+dis_total.min+'/次,'+'一个分销商在一个超惠卷主题活动中总补贴金额上限'+dis_total.ceiling+'元'+'<input type="hidden" value="'+dis_total.guid+'">';
    					}
    					//$('.distributor_bigson,.distributor_son').show();
    				}

    				//门店 
    				var retail_total=Budgetary_reasons[i].benefit.retailer;
    				if(retail_total==undefined){
    					$('.retailer_bigson,.retailer_son').hide();
    				}else{
    					$('.retailer_bigson').html('门店');
    					if(retail_total.min&&retail_total.max!==undefined){
    						judgeEvent();
    						judgeEvent1();
	    					str5+=judgeEvent(retail_total.event)+','+
	    						  judgeEvent1(retail_total.refund_content)+retail_total.min+'-'+retail_total.min+'/次,'+'一个门店在一个超惠卷主题活动中总补贴金额上限'+retail_total.ceiling+'元'+'<input type="hidden" value="'+retail_total.guid+'">';
    					}else{
    						judgeEvent();
    						judgeEvent1();
    						str5+=judgeEvent(retail_total.event)+','+
    						      judgeEvent1(retail_total.refund_content)+retail_total.min+'/次,'+'一个门店在一个超惠卷主题活动中总补贴金额上限'+retail_total.ceiling+'元'+'<input type="hidden" value="'+retail_total.guid+'">';
    					}
    				}

    				//消费者 
    				var consu_total=Budgetary_reasons[i].benefit.consumer;
    				if(consu_total==undefined){
    					$('.consumer_bigson,.consumer_son').hide();
    				}else{
    					$('.consumer_bigson').html('消费者');
    					if(consu_total.min&&consu_total.max!==undefined){
    						judgeEvent(consu_total.event);
    						judgeEvent1(consu_total.refund_content);
	    					str6+=judgeEvent(consu_total.event)+','+
	    						  judgeEvent1(consu_total.refund_content)+consu_total.min+'-'+consu_total.min+'/次,'+'一个消费者在一个超惠卷主题活动中总补贴金额上限'+consu_total.ceiling+'元'+'<input type="hidden" value="'+consu_total.guid+'">';
    					}else{
    						 judgeEvent(consu_total.event);
    						 judgeEvent1(consu_total.refund_content);
    						str6+=judgeEvent(consu_total.event)+','+
    						     judgeEvent1(consu_total.refund_content)+consu_total.min+'/次,'+'一个消费者在一个超惠卷主题活动中总补贴金额上限'+consu_total.ceiling+'元'+'<input type="hidden" value="'+consu_total.guid+'">';
    					}
    				}

    				//分销商业务员
    				var rempl_total=Budgetary_reasons[i].benefit.distributoremployee;
    				if(rempl_total==undefined){
    					$('.distributoremployee_bigson,.distributoremployee_son').hide();
    				}else{
    					$('.distributoremployee_bigson').html('分销商业务员');
    					if(rempl_total.min&&rempl_total.max!==undefined){
    						judgeEvent(rempl_total.event);
    						judgeEvent1(rempl_total.refund_content);
	    					str7+=judgeEvent(rempl_total.event)+','+
	    						  judgeEvent1(rempl_total.refund_content)+rempl_total.min+'-'+rempl_total.min+'/次,'+'一个分销商业务员在一个超惠卷主题活动中总补贴金额上限'+rempl_total.ceiling+'元'+'<input type="hidden" value="'+rempl_total.guid+'">';
    					}else{
    						judgeEvent(rempl_total.event);
    						judgeEvent1(rempl_total.refund_content);
    						str7+=judgeEvent(rempl_total.event)+','+
    						     judgeEvent1(rempl_total.refund_content)+rempl_total.min+'/次,'+'一个分销商业务员在一个超惠卷主题活动中总补贴金额上限'+rempl_total.ceiling+'元'+'<input type="hidden" value="'+rempl_total.guid+'">';
    					}
    				}

    				//门店店员
    				var retaileremployee_total=Budgetary_reasons[i].benefit.retaileremployee;
    				if(retaileremployee_total==undefined){
    					$('.distributoremployee_bigson,.distributoremployee_son').hide();
    				}else{
    					$('.distributoremployee_bigson').html('门店店员');
    					if(retaileremployee_total.min&&retaileremployee_total.max!==undefined){
    						judgeEvent(retaileremployee_total.event);
    						judgeEvent1(retaileremployee_total.refund_content);
	    					str8+=judgeEvent(retaileremployee_total.event)+','+
	    						  judgeEvent1(retaileremployee_total.refund_content)+retaileremployee_total.min+'-'+retaileremployee_total.min+'/次,'+'一个分销商业务员在一个超惠卷主题活动中总补贴金额上限'+retaileremployee_total.ceiling+'元'+'<input type="hidden" value="'+retaileremployee_total.guid+'">';
    					}else{
    						judgeEvent(retaileremployee_total.event);
    						judgeEvent1(retaileremployee_total.refund_content);
    						str8+=judgeEvent(retaileremployee_total.event)+','+
    						     judgeEvent1(retaileremployee_total.refund_content)+retaileremployee_total.min+'/次,'+'一个分销商业务员在一个超惠卷主题活动中总补贴金额上限'+retaileremployee_total.ceiling+'元'+'<input type="hidden" value="'+retaileremployee_total.guid+'">';
    					}
    				}*/




    	//////////循环详情里面的门店 分销商 消费者 分销商店员 门店店员
    	     




























    				//预算状态：
    				str7+=Budgetary_reasons[i].auditstatus
	        					


	        	}
	        
        		        	
        	$('.table1 tbody').html(str);
        	$('.Bud_number').html(str1); //详情-预算编号
        	$('.purpose').html(str2); //详情-活动名称
        	$('.operation_right').html(str3); //详情-活动地区
        	$('.Three_arrea').html(str4); //详情-
        	


	        },
	        error:function(){
	        	console.log("异常")
	        }
		})
		$.ajax({
			type: "get",
	        url: "http://127.0.0.1:40010/webapi/budget/purpose/5ee52eb7419740dca75eb3190863fe79/operation",
	        dataType: "json",
	        success:function(data){
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
	        	}
	        	 for(var i = 0;i<li_list.length;i++){
	        	 	var change_name;
	        	 	str+='<li>'+
	        	 			li_list[i].operator_name+','+li_list[i].operation_time+','+'进行了'+li_list[i].operation+'预算'+field(li_list[i].funding.assettype)+'为'+li_list[i].funding.count+change_name;
	        	 		 '</li>'
	        	 }
	        	 $('.information_list').html(str);
	        },
	        error:function(){
	        	alert('网络异常')
	        }
		});
		//表格弹窗
		$(document).on('click','.table1 tbody tr td img',function(){
		  //弹出框
		  layer.open({ 
			  //anim:1,
			  type: 1,
			  title:'详情',
			  area: ['961px', '90%'],
			  shadeClose: false, //点击遮罩关闭

			  content: $('#layer_bigbox')
		  });
		  // var thatVal = $(this).attr('thatid');
		  // data:{"aaa":thatVal}

		})

		$('.close_iptn').on('click',function(){
			$('.layui-layer-close').click();
		});
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


		

	})
		





// // 获取城市中省
// $('span em:eq(0)').text();
// // 获取城市中市
// $('span em:eq(1)').text();
// // 获取城市中区
// $('span em:eq(2)').text();


// table数据S
var data={
    "error":"",
    "content":[
        {
            "purpose_id":"5ee52eb7419740dca75eb3190863fe79",
            "purpose_name":"主题活动测试-2",
            "purpose_class":"tblipalomaactivity",
            "arealist":[
                {
                    "districthash":"东城区,北京市,北京市",
                    "chargeid":"4654269886BC4FD7B5914ED324208FB0",
                    "chargename":"shaoyongzhe"
                },
                {
                    "districthash":"西城区,北京市,北京市",
                    "chargeid":"4654269886BC4FD7B5914ED324208FB0",
                    "chargename":"shaoyongzhe"
                },
                {
                    "districthash":"崇文区,北京市,北京市",
                    "chargeid":"4654269886BC4FD7B5914ED324208FB0",
                    "chargename":"shaoyongzhe"
                },
                {
                    "districthash":"宣武区,北京市,北京市",
                    "chargeid":"4654269886BC4FD7B5914ED324208FB0",
                    "chargename":"shaoyongzhe"
                },
                {
                    "districthash":"石景山区,北京市,北京市",
                    "chargeid":"4654269886BC4FD7B5914ED324208FB0",
                    "chargename":"shaoyongzhe"
                },
                {
                    "districthash":"海淀区,北京市,北京市",
                    "chargeid":"4654269886BC4FD7B5914ED324208FB0",
                    "chargename":"shaoyongzhe"
                },
                {
                    "districthash":"门头沟区,北京市,北京市",
                    "chargeid":"4654269886BC4FD7B5914ED324208FB0",
                    "chargename":"shaoyongzhe"
                },
                {
                    "districthash":"房山区,北京市,北京市",
                    "chargeid":"4654269886BC4FD7B5914ED324208FB0",
                    "chargename":"shaoyongzhe"
                },
                {
                    "districthash":"昌平区,北京市,北京市",
                    "chargeid":"4654269886BC4FD7B5914ED324208FB0",
                    "chargename":"shaoyongzhe"
                },
                {
                    "districthash":"大兴区,北京市,北京市",
                    "chargeid":"4654269886BC4FD7B5914ED324208FB0",
                    "chargename":"shaoyongzhe"
                },
                {
                    "districthash":"平谷区,北京市,北京市",
                    "chargeid":"4654269886BC4FD7B5914ED324208FB0",
                    "chargename":"shaoyongzhe"
                },
                {
                    "districthash":"怀柔区,北京市,北京市",
                    "chargeid":"4654269886BC4FD7B5914ED324208FB0",
                    "chargename":"shaoyongzhe"
                }
            ],
            "serialnumber":null,
            "responsible":Array[1],
            "begintime":"2017-01-08 00:00:00",
            "endtime":"2017-02-22 23:59:59",
            "balance":Array[1],
            "auditstatus":"预算执行中",
            "benefit":{
                "consumer":{
                    "state":"active",
                    "refund_to":"consumer",
                    "event":"verify_first",
                    "refund_content":"fixedmoney",
                    "min":"1",
                    "ceiling":"111",
                    "applycount":"111111",
                    "limit":{
                        "perday":{
                            "sum":"1000",
                            "time":"1000"
                        },
                        "totalbudget":{
                            "sum":"10000",
                            "time":"1000"
                        }
                    },
                    "guid":"8a79f7d6a33d4ac4a5012e3701daf0c1"
                },
                "distributor":{
                    "state":"active",
                    "refund_to":"distributor",
                    "event":"verify_first",
                    "refund_content":"fixedmoney",
                    "min":"1",
                    "ceiling":"1111",
                    "applycount":"11111",
                    "limit":{
                        "perday":{

                        },
                        "totalbudget":{

                        }
                    },
                    "guid":"a22f126f28cc4c34b0eec35c559109c2"
                },
                "retailer":{
                    "state":"active",
                    "refund_to":"retailer",
                    "event":"verify_normal",
                    "refund_content":"randommoney",
                    "min":"1",
                    "max":"11",
                    "ceiling":"1111",
                    "applycount":"111111",
                    "limit":{
                        "perday":{

                        },
                        "totalbudget":{

                        }
                    },
                    
                    "guid":"30f6c76ed3084296bac07d90f82bf146"
                }
            }
        }
    ]
}
// table数据e



	// 封装ajax
	var _ajax = function(type, url, data, tip, success) {
	    $.ajax({
	        type: type,
	        url: url,
	        dataType: "json",
	        data: data,
	        beforeSend: function() {  //请求前的操作
	            		
	        },
	        complete: function() {}, //请求成功后 
	        timeout: function() {},  //延时请求

	        success: function(json) {//请求成功 JSON请求完成的数据
	            success(json);

	        },
	        error: function() {
	            alert(tip + "网络出错了");
	        }
	    });
	}


         













