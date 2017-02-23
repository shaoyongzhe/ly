/**
 * Created by Administrator on 2016/12/21.
 */

/*城市联动*/
comSelect();
selectCity();

/*字数限制*/
$("#ar,#ar_tx").on("input propertychange", function() {
    var $this = $(this),
        _val = $this.val(),
        count = "";
    if (_val.length > 100) {
        $this.val(_val.substring(0, 100));
    }
    count = 100 - $this.val().length;
    $("#text-count,#text-count_tx").text(count);
});

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



