
//***********************会员钱包************************//


/*城市联动*/
comSelect();
selectCity();

/*提现、充值的字数限制*/
$("#ar,#ar_tx").on("input propertychange", function() {  //文本域发生改变时触发事件(即时搜索)
    var ar_this = $(this),
        _val = ar_this.val(),
        count = "";
    if (_val.length > 100) {
        ar_this.val(_val.substring(0, 100));
    }
    count = 100 - _val.length;
    $("#text-count,#text-count_tx").text(count);
});

/*确认充值登记按钮*/
$(".cz_dialog .confirm").click(function(){ //确定充值登记按钮
    $(".non,.ares").css({
        background: "none",
        border: "none"
    });
    $(".ze").css("display","block"); //点击确定的时候 遮罩显示
    $(".icon-jt").css("background","none"); //省市区向下的箭头隐藏
    $(".non img").css("visibility","hidden")

    $('.cz_dialog input,.cz_dialog select,.cz_dialog textarea').attr('readonly',true); //input select 文本域 全都禁用

    $(this).css("display","none"); //自己隐藏
    $(".cz_dialog_Btn .cancel").css("display","none");  //取消按钮隐藏
    $(".cz_dialog_Btn .revise").css("display","block"); //修改按钮显示

})

/*确认提现登记按钮*/
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
/*修改按钮*/
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



