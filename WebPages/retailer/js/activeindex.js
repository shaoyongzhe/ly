/**
 * Created by Administrator on 2017/1/3.
 */
//打电话滚动隐藏与显示
function fnscroll() {
    $(".container").scroll(function(){
        var scrolltop = $(".container").scrollTop();
        if(scrolltop > 100){
            $(".dealer-header").fadeIn();
        }else if(scrolltop <=100  ){
            $(".dealer-header").fadeOut();
        }
    });
}
//菜单点击事件
function fnclick() {
    $(".cgl-menu").on("click","li",function () {
        console.log(1)
        $(this).addClass("clion").siblings().removeClass("clion");
    })
}
//动态设置cgl-cont的高度
function fnmenuhei(){
	$("#cgl-cont").css("height",$(".cgl-menu").outerHeight()/20+1+"rem");
}
function fncarnum(){
	$("#cgl-cont").on("click",".jian",function () {
		var num=Number($(this).next().html());
		if(num<=1){
			$(this).hide().next().hide().html(0);
		}else{
			$(this).next().html(num-1);
			$(".ammount").html($(".ammount").html()-1);
			$(".num").html($(".ammount").html());
		}
	}).on("click",".add",function () {
		var num=Number($(this).prev().html());
		$(this).prev().html(num+1).show().prev().show();
		$(".ammount").html(Number($(".ammount").html())+1);
		$(".num").html($(".ammount").html());
	});
}

$(function () {
    fnscroll();
    fnclick();
    fnmenuhei();
    fncarnum();
});



