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

function fnclick() {
    $(".cgl-menu").on("click","li",function () {
        console.log(1)
        $(this).addClass("clion").siblings().removeClass("clion");
    })
}
$(function () {
    fnscroll();
    fnclick();
});



