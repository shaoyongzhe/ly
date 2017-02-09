/**
 * Created by Administrator on 2016/12/21.
 */

/*城市联动*/
comSelect();
selectCity();

/*字数限制*/
$("#ar").on("input propertychange", function() {
    var $this = $(this),
        _val = $this.val(),
        count = "";
    if (_val.length > 100) {
        $this.val(_val.substring(0, 100));
    }
    count = 100 - $this.val().length;
    $("#text-count").text(count);
});
/*上传图片*/
//$(function() {
//    $(".filepath").on("change",function() {
//        var srcs = getObjectURL(this.files[0]);   //获取路径
//        $(this).nextAll(".img2").show();  //fireBUg查看第二次换图片不起做用
//        $(this).nextAll(".img1").hide();   //this指的是input
//        $(this).nextAll(".img2").attr("src",srcs);    //this指的是input
//        $(this).val('');    //必须制空
//    })
//})
//function getObjectURL(file) {
//    var url = null;
//    if (window.createObjectURL != undefined) {
//        url = window.createObjectURL(file)
//    } else if (window.URL != undefined) {
//        url = window.URL.createObjectURL(file)
//    } else if (window.webkitURL != undefined) {
//        url = window.webkitURL.createObjectURL(file)
//    }
//    return url
//};
//
//$(".filepath_T").click (function () {
//    $(".filepath").trigger("click");
//})

/*确认提现登记*/

$(".cz_dialog .confirm").click(function(){
    $(".non,.ares").css({
        background: "none",
        border: "none"
    });
    $(".ze").css("display","block");
    $(".icon-jt").css("background","none");
    $(".non img").css("visibility","hidden")

    $('.cz_dialog input,.cz_dialog select,.cz_dialog textarea').attr('readonly',true);

    $(this).css("display","none");
    $(".cz_dialog_Btn .cancel").css("display","none");
    $(".cz_dialog_Btn .revise").css("display","block");

})


$(".tx_dialog .confirm").click(function(){
    $(".non,.ares").css({
        background: "none",
        border: "none"
    });
    $(".ze").css("display","block");
    $(".icon-jt").css("background","none");
    $(".non img").css("visibility","hidden")

    $('.tx_dialog input,.tx_dialog select,.tx_dialog textarea').attr('readonly',true);

    $(this).css("display","none");
    $(".cz_dialog_Btn .cancel").css("display","none");
    $(".cz_dialog_Btn .revise").css("display","block");
})

$(".revise").click(function(){
    $(".non,.ares").css({
        background: "#ffffff",
        border: "1px solid #BFBFBF"
    });
    $(".ze").css("display","none");
    $(".icon-jt").css("background","url(../images/2.png) center right no-repeat");
    $(".non img").css("visibility","visible")

    $('.cz_dialog input,.cz_dialog select,.cz_dialog textarea').attr('readonly',false);
    $('.tx_dialog input,.tx_dialog select,.tx_dialog textarea').attr('readonly',false);

    $(this).css("display","none");
    $(".cz_dialog_Btn .cancel").css("display","inline");
    $(".cz_dialog_Btn .confirm").css("display","inline");
})



/*取消按钮--退出*/
var index = parent.layer.getFrameIndex(window.name); //获取当前窗体索引
$('.cancel').on('click', function(){
    parent.layer.close(index); //执行关闭
});



























