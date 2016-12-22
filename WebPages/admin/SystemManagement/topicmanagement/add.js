	//cg
	// $('.select-wrap').click(function(e){
	// 	e.stopPropagation();
	// 	$(this).find('.select').toggle();
	// });		
	// $('.select .option').click(function(e){
	// 	e.stopPropagation();
	// 	$(this).parent().prev().text($(this).text());
	// 	$(this).parent().hide();		
	// });	
	// $(document).click(function(){
	// 	// debugger;
	// 	$('.select').hide();
	// });
	//lg
	// acSe1Tab();//函数名有待更换，更换封装内容	
	// function acSe1Tab(){//acSe1Tab封装关联切换
		//第一个关联下拉用selectWrap1，第二个关联下拉用selectWrap2
		/*$(".acSe1").find(".option").click(function(){		
		// alert(2)	
			var index=$(this).parents(".addSub1").find(".select-wrap").find(".option") .index($(this));	
			//第一个下拉切换
			$(this).parents(".addSub1").find(".selectWrap1").addClass("hi");
			$(this).parents(".addSub1").find(".selectWrap1").eq(index+1).removeClass("hi");
			//第2个下拉切换
			$(this).parents(".addSub1").find(".selectWrap2").addClass("hi");
			$(this).parents(".addSub1").find(".selectWrap2").eq(index+1).removeClass("hi");
		});*/
	// }
	
	// acSe2Tab();//函数名有待更换，更换封装内容	
	// function acSe2Tab(){//封装关联切换		
	// 	$(".acSe4").find(".option").click(function(){	

	// 		var index=$(this).parents(".addSub2").find(".select-wrap").find(".option").index($(this));	
	// 		$(this).parents(".addSub2").find(".selectWrap1").addClass("hi");
	// 		$(this).parents(".addSub2").find(".selectWrap1").removeClass("-hi");
	// 		$(this).parents(".addSub2").find(".selectWrap1").eq(index+1).removeClass("hi");
	// 		$(this).parents(".addSub2").find(".selectWrap1").eq(index+1).addClass("-hi");

	// 	});

	// }
	// acZige1Tab();
	// function acZige1Tab(){//封装关联切换
	// 	var arr=["次","名","名","%","级","级","时",]
	// 	$(".acZige1").find(".option").click(function(){			
	// 		var index=$(this).parents(".acZige1").find(".select-wrap").find(".option").index($(this));				
	// 		$(this).parents(".addSub3").find(".acZige1Tab").find("p:last").text(arr[index])
	// 	})			
	// }
	// acZige2Tab();	
	// function acZige2Tab(){//封装关联切换		
	// 	$(".acZige2").find(".option").click(function(){			
	// 		var index=$(this).parents(".acZige2").find(".select-wrap").find(".option").index($(this));	
	// 		$(this).parents(".addSub3").find(".acZige2tab").addClass("hi");
	// 		$(this).parents(".addSub3").find(".acZige2tab").eq(index).removeClass("hi");			
	// 	})	
	// }
	acZige4Tab();
	function acZige4Tab(){//封装关联切换		
		$(".acZige4").find(".option").click(function(){			
			var index=$(this).parents(".acZige4").find(".select-wrap").find(".option").index($(this));	
			$(this).parents(".addSub3").find(".acZige4tab").addClass("hi");
			$(this).parents(".addSub3").find(".acZige4tab").eq(index).removeClass("hi");			
		})	
	}	
	//控件1的添加删除
	acAdA();
	function acAdA(){
		$("body").on("click",".addSub1 .acAd1",function(e){
		// $(".addSub1 .acAd1").click(function(){			
			if($(".addSub1").length<=1){
				alert("至少需要一个");//等待修改该模块
			}else{
				$(this).parents(".addSub1").remove();
				if($(".addSub1").length<=1){					
					// $(".addSub1 .acAd2").removeClass("hi");
					$(".addSub1 .acAd1").css({"visibility":"hidden","cursor":"auto"});
				}
			}
			$(".addSub1").last().find(".acAd2").removeClass("hi");//让最后一个控件显示加号			
		});
		$("body").on("click",".addSub1 .acAd2",function(e){
		// $(".addSub1 .acAd2").click(function(){
			// debugger
			// alert(1)
			$(".addSub1 .acAd1").css({"visibility":"visible","cursor":"pointer"});
			var parent = $(this).parents(".addSub1");
			$(".chenlong01").append(parent.get(0).outerHTML);
			// parent.find('p').rempve()
			$(this).addClass("hi");

			// $(".addSub1").not(":first").find(".deleP").remove();//解决p标签bug

			//$('.addSub1').last().find('.selected,.selectWrap1,.selectWrap2').text('');
			//$('.addSub1').last().find('input').val('');
			//$('.addSub1').last().find('.selected,.selectWrap1,.selectWrap2').text().css({"visibility":"hidden"});
			//$('.addSub1').last().find('input').css({"visibility":"hidden"});

			// $('.addSub1').last().find('.selectWrap1').first().remove('hi').addClass('-hi');			
			// $('.addSub1').last().find('.selectWrap1').not(':first').addClass('hi').removeClass('-hi');
			// debugger;
			$(".addSub1").last().find(".selected").text('');
			$(".addSub1").last().find(".selectWrap1").first().removeClass('hi').addClass('-hi');
			$(".addSub1").last().find(".selectWrap1").not(':first').addClass('hi');
			$(".addSub1").last().find(".selectWrap2").first().removeClass('hi').addClass('-hi');
			$(".addSub1").last().find(".selectWrap2").not(':first').addClass('hi');
			$(".addSub1").last().find("input").val('');
		});
	}


	acAdB();
	function acAdB(){
		$("body").on("click",".addSub2 .acAd1",function(e){
			if($(".addSub2").length<=1){
				alert("至少需要一个");//等待修改该模块
			}else{
				$(this).closest(".addSub2").remove();
				if($(".addSub2").length<=1){
					$(".addSub2 .acAd1").css({"visibility":"hidden","cursor":"auto"});
				}
			}
			$(".addSub2").last().find(".acAd2").removeClass("hi");//让最后一个控件显示加号			
		})

		$("body").on("click",".addSub2 .acAd2",function(e){		
			$(".addSub2 .acAd1").css({"visibility":"visible","cursor":"pointer"});			
			$(".chenlong02").append(addsub2HTML);
			$(this).addClass("hi");		
			if($(".addSub2:last").find(".addSub3").length > 1){
				$(".addSub2:last").find(".addSub3").not(":first").remove();
				$('.acAd4:last').removeClass('hi');
			}
			$('.red').last().css({"visibility":"hidden"});
			$(".addSub2").last().find(".acAd2").removeClass("hi");
		});
		$(".addSub3:last .acAd3").css({"visibility":"hidden","cursor":"auto"});		
	}


	acAdC();
	var jkjk="";
	function acAdC(){
		$("body").on("click",".acZige .acAd3",function(e){	
			if($(this).closest(".acZige").find(".addSub3").length<=1){
				alert("至少需要一个");//等待修改该模块
			}else{				
				if($(this).closest(".addSub3").next().hasClass("yyy")){
					$(this).closest(".acZige").find(".addSub3:last").prev().find(".acAd4").removeClass("hi");					
				}								
				jkjk=$(this).closest(".addSub2")
				$(this).closest(".addSub3").remove();
				if(jkjk.find(".addSub3").length<=1){
					jkjk.find(".addSub3").find(".acAd3").css({"visibility":"hidden","cursor":"auto"});
				}				
			}
			linshiAddJs=$(this).parents(".acZige");				
		});

		$("body").on("click",".acZige .acAd4",function(e){		
			$(this).closest(".acZige").append(addsub3HTML);	
			$(this).closest(".acZige").find(".acAd3").css({"visibility":"visible","cursor":"pointer"});
			$(this).closest(".acZige").append($('<div class="yyy singleselection"><span class="radio" name="0">以上条件满足其一</span><span class="radio on" name="1">以上条件需全部满足</span></div>'));
			$(this).closest(".acZige").find(".yyy").not(':last').remove();
			$(this).addClass("hi");			
			$(this).closest('.acZige').addClass('on');			
		});
	}



	//设置参与资格显示隐藏
	$("body").on("click",".acMeD2",function(e){
	// $(".acMeD2").click(function(){
		$(this).parents(".addSub2").find(".acZige").toggleClass("hi");
	});
	
	
	//***************************第3个页面开始
//  	hdc1Tab()
// 	//一二级联动
// 	function hdc1Tab(){
// 		$(".hdc1").find(".option").click(function(){
// 			var lll=$(this).attr("typeL");
// 			$(this).parents(".addSub4").find(".hdc2 .option").addClass("hi");
// 			$(this).parents(".addSub4").find(".hdc2 ."+lll).removeClass("hi");
// 		})
// 	}
// 	hdc3Tab();
// 	//补贴形式，范围值联动
// 	function hdc3Tab(){
// 		$(".hdc3").find(".option").click(function(){	
// 			// alert(1)
// 			// debugger
// 			// alert($(this).text().indexOf('随机'))
// 			if($(this).text().indexOf('随机') != -1){
// 				// alert(1);
// 				$(this).closest('.addSub4').find('.hdc4 .hdc4d1 .hdc4In1').width(33)
// 				$(this).closest('.addSub4').find('.hdc4 .hdc4d1 span').show();
// 				$(this).closest('.addSub4').find('.hdc4 .hdc4d1 .hdc4In2').show();
// 			} else {
// 				$(this).closest('.addSub4').find('.hdc4 .hdc4d1 .hdc4In1').width(112)
// 				$(this).closest('.addSub4').find('.hdc4 .hdc4d1 span').hide();
// 				$(this).closest('.addSub4').find('.hdc4 .hdc4d1 .hdc4In2').hide();
// 			}
// 			// return
// 			var arr=["分/次","分/次","元/次","元/次","元/次","元/次","元/张","元/张","微信手机红包；随机金额返现","轮盘抽奖，祝你好运","蒙牛酸酸乳，买一赠一"];
// 			if($(this).text()!="摇一摇"&&$(this).text()!="轮盘抽奖"&&$(this).text()!="特定超慧券  >"){
// 				$(this).parents(".addSub4").find(".hdc4d1").removeClass('hi');
// 				$(this).parents(".addSub4").find(".hdc4d2").addClass('hi');					
// 					var index=$(this).parents(".addSub4").find(".hdc3").find(".option").index($(this));
// 					$(this).parents(".addSub4").find(".hdc4").find(".hdc4dA").text(arr[index]);		
// //				$(".hdc4").find(".hdc4dA").text(arr[index]);
	
// 			} else {
// 				// debugger
// 				$(this).parents(".addSub4").find(".hdc4d1").addClass('hi');
// 				$(this).parents(".addSub4").find(".hdc4d2").removeClass('hi');
// 				var index=$(this).parents(".addSub4").find(".hdc3").find(".option").index($(this));
// 				$(this).parents(".addSub4").find(".hdc4").find(".hdc4dB").text(arr[index]);	

// 				// if($(this).text().indexOf(''))	
// 			}

// 			if($(this).text()=="摇一摇"){
// 				$(this).closest('.addSub4').find('.hdc4 .hdc4d1 input.hdc4In1').val("");
// 				$(this).closest('.addSub4').find('.hdc4 .hdc4d1 input.hdc4In2').val("");
// 				$(this).closest('.addSub4').find('.hdc5 .acSe13 input').val("");
// 				$(this).closest('.addSub4').find('.hdc6 .acSe14 input').val("");
// 				// return;
// 			}

// 			$('.addSub4 .acSe13 input').keyup();

// 		});

// 	}
	
	// 控件4的添加删除
	acAdD();
	function acAdD(){
		$("body").on("click",".addSub4 .acAd1",function(e){
		// $(".addSub4 .acAd1").click(function(){
			if($(".addSub4").length<=1){				
				alert("至少需要一个");//等待修改该模块
			}else{
				$(this).parents(".addSub4").remove();
				if($(".addSub4").length<=1){					
					$(".addSub4 .acAd2").removeClass("hi");
					$(".addSub4 .acAd1").css({"visibility":"hidden","cursor":"auto"});
				}
			}
			$(".addSub4").last().find(".acAd2").css({"visibility":"visible","cursor":"pointer"});//新修改


			butiefz();


		})

		$("body").on("click",".section3 .addSub4 .acAd2",function(e){
		// $(".section3 .addSub4 .acAd2").click(function(){
			// alert(1)
			// debugger;
			$(".addSub4 .acAd1").css({"visibility":"visible","cursor":"pointer"});
			$(".chenlong04").append(addsub4HTML);							
			// $(this).addClass("hi");
			$(this).css({"visibility":"hidden"});
			// $(".addSub4").not(":first").find(".deleP").remove();//解决p标签bug,

			// $(".addSub4").not(":first").find(".deleP").css({"height":0,"fontSize":0})
			$(".addSub4").not(":first").find(".deleP").css({"visibility":"hidden","height":0});
			$('.addSub4').last().find('.selected').text('');
			$('.addSub4').last().find('input').val('');
			$('.addSub4').last().find('input[type=hidden]').remove();
			//新建默认用空白的摇一摇+
			$(".addSub4").last().find('.acSe12').find("div").addClass("hi");
			$(".addSub4").last().find('.acSe12').find("div.hdc4d2").removeClass("hi");
			$(".addSub4").last().find('.acSe12').find("div.hdc4d2").find("a").text("");
			//新建默认用空白的摇一摇-
			// hdc4d1
			// $('.addSub4').last().find('.hdc4d1 input').removeAttr('style');
		})			
	}

	//设置概率权限
//	if(){
//		console.log('等待补充');
//	}
//

//***************开始摇一摇**************************
// yaoyiyaoTab()
// function yaoyiyaoTab(){
// 	var arr=["无","元/次","元/次","分","蒙牛酸酸乳买一增益"];
// 	var arr2=["无","元","元","分","张"];
// 	$(".Yyy1 .option").click(function(){
// 		var index=$(this).parents(".Yyy1").find(".option").index($(this));		
// 		if($(this).text()!="特定超慧券"&&$(this).text()!="谢谢参与"){//范围/值
// 			$(this).parents(".yaoyiyao").find(".Yyy2d1").removeClass("hi");		
// 			$(this).parents(".yaoyiyao").find(".Yyy2d2").addClass("hi");	
// 			$(this).parents(".yaoyiyao").find(".Yyy2d3").addClass("hi");	
// 			$(this).parents(".yaoyiyao").find(".hdc4dA").text(arr[index]);
// 			$(this).parents(".yaoyiyao").find(".acSe15").css("background","white");
// 		}else if($(this).text()=="谢谢参与"){
// 			$(this).parents(".yaoyiyao").find(".Yyy2d1").addClass("hi");
// 			$(this).parents(".yaoyiyao").find(".Yyy2d2").addClass("hi");	
// 			$(this).parents(".yaoyiyao").find(".Yyy2d3").removeClass("hi");				
// 			$(this).parents(".yaoyiyao").find(".Yyy2d3").text(arr[index]);
// 			$(this).parents(".yaoyiyao").find(".acSe15").css("background","#FAF9F9");
// 		}else if($(this).text()=="特定超慧券"){
// 			$(this).parents(".yaoyiyao").find(".Yyy2d1").addClass("hi");
// 			$(this).parents(".yaoyiyao").find(".Yyy2d2").removeClass("hi");	
// 			$(this).parents(".yaoyiyao").find(".Yyy2d3").addClass("hi");	
// 			$(this).parents(".yaoyiyao").find(".Yyy2d2 a").text(arr[index]);
// 			$(this).parents(".yaoyiyao").find(".acSe15").css("background","white");
// 		}
// 		if($(this).text()!="谢谢参与"){//补贴峰值
// 			$(this).parents(".yaoyiyao").find(".Yyy5d1").removeClass("hi");		
// 			$(this).parents(".yaoyiyao").find(".Yyy5d2").addClass("hi");
// 			$(this).parents(".yaoyiyao").find(".Yyy5d1 span").text(arr2[index]);
// 		}else{
// 			$(this).parents(".yaoyiyao").find(".Yyy5d1").addClass("hi");
// 			$(this).parents(".yaoyiyao").find(".Yyy5d2").removeClass("hi");	
// 			$(this).parents(".yaoyiyao").find(".Yyy5d2").text(arr2[index]);
// 		}

// 		if($(this).text().indexOf('随机') != -1){
// 			// alert(1);
// 			$(this).closest('.yaoyiyao').find('.Yyy2 .Yyy2d1 .min').width(50)
// 			$(this).closest('.yaoyiyao').find('.Yyy2 .Yyy2d1 span').show();
// 			$(this).closest('.yaoyiyao').find('.Yyy2 .Yyy2d1 .max').show();
// 		} else {
// 			$(this).closest('.yaoyiyao').find('.Yyy2 .Yyy2d1 .min').width(100)
// 			$(this).closest('.yaoyiyao').find('.Yyy2 .Yyy2d1 span').hide();
// 			$(this).closest('.yaoyiyao').find('.Yyy2 .Yyy2d1 .max').hide();
// 		}

// 		$('.yaoyiyao .Yyy4 .Yyy4d1 input').keyup();

// 	})
// }
// //控件5摇一摇的添加删除
acAdE();
function acAdE(){
	$("body").on("click",".addSub5 .acAd1",function(e){
	// $(".addSub5 .acAd1").click(function(){				
		if($(".addSub5").length<=1){
			alert("至少需要一个");//等待修改该模块
		}else{
			$(this).parents(".addSub5").remove();
			if($(".addSub5").length<=1){
//					$(".addSub5 .acAd2").removeClass("hi");
				$(".addSub5 .acAd1").css({"visibility":"hidden","cursor":"auto"});
			}
		}		
		$(".addSub5").last().find(".acAd2").removeClass("hi");//让最后一个控件显示加号

		yfz();


	})		
	$("body").on("click",".addSub5 .acAd2",function(e){
	// $(".addSub5 .acAd2").click(function(){
		$(".addSub5 .acAd1").css({"visibility":"visible","cursor":"pointer"});
		$(".yaoWrap").append(addsub5HTML);	
		$(this).addClass("hi");
		// $(".addSub5").not(":first").find(".deleP").remove();//解决p标签bug
		$(".addSub5").last().find('.selected').text('');
		$(".addSub5").last().find('input').val('');

	});
}
//控件6轮盘抽奖的添加删除
acAdF();
function acAdF(){
	$("body").on("click",".addSub6 .acAd1",function(e){
	// $(".addSub6 .acAd1").click(function(){				
		if($(".addSub6").length<=1){
			alert("至少需要一个");//等待修改该模块
		}else{
			$(this).parents(".addSub6").remove();
			if($(".addSub6").length<=1){					
//					$(".addSub6 .acAd2").removeClass("hi");
				$(".addSub6 .acAd1").css({"visibility":"hidden","cursor":"auto"});
			}
		}		
		$(".addSub6").last().find(".acAd2").removeClass("hi");//让最后一个控件显示加号
	})	
	$("body").on("click",".addSub6 .acAd2",function(e){	
	// $(".addSub6 .acAd2").click(function(){
		$(".addSub6 .acAd1").css({"visibility":"visible","cursor":"pointer"});
		$(".用于存放控件6轮盘抽奖").append($(this).parents(".addSub6").get(0).outerHTML);	
		$(this).addClass("hi");
		$(".addSub6").not(":first").find(".deleP").remove();//解决p标签bug

		$(".addSub5").last().find('.selected').text('');
		$(".addSub5").last().find('input').val('');

	})			
}



