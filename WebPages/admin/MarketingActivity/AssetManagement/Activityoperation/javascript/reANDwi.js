/**
 * Created by Administrator on 2016/12/21.
 */

/*��������*/
comSelect();
selectCity();

/*��������*/
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

/*�ϴ�ͼƬ*/
$(function() {
    $(".filepath").on("change",function() {
        var srcs = getObjectURL(this.files[0]);   //��ȡ·��
        $(this).nextAll(".img2").show();  //fireBUg�鿴�ڶ��λ�ͼƬ��������
        $(this).nextAll(".img1").hide();   //thisָ����input
        $(this).nextAll(".img2").attr("src",srcs);    //thisָ����input
        $(this).val('');    //�����ƿ�
    })
})
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
    }
    return url
};

$(".filepath_T").click (function () {
    $(".filepath").trigger("click");
})

/*ȷ�����ֵǼ�*/

$(".confirm").click(function(){
    $(".non,.ares").css({
        "background": "none",
        "border": "none"
    });
    $(".pic_r").css("background","none");
    $(".ze").css("display","block");
    $(".icon-jt").css("background","none");
    $(".non img").css("visibility","hidden")

    $(this).css("display","none");
    $(".cancel").css("display","none");
    $(".revise").css("display","block");

    $('.cz_dialog_bom input,.cz_dialog_bom select,.cz_dialog_bom textarea').attr('readonly',true);

})


//$(".tx_dialog .confirm").click(function(){
//    $(".non").css({
//        "background": "none",
//        "border": "none"
//    });
//    $(".ze").css("display","block");
//    $(".icon-jt").css("background","none");
//    $(".non img").css("visibility","hidden")
//
//    $(this).css("display","none");
//    $(".cancel").css("display","none");
//    $(".revise").css("display","block");
//
//    $('.tx_dialog input,.tx_dialog select,.tx_dialog textarea').attr('readonly',true);
//})

$(".revise").click(function(){
    $(".non,.ares").css({
        background: "#ffffff",
        border: "1px solid #BFBFBF"
    });
    $(".pic_r").css("background","url(../images/2.png) no-repeat 325px 4px")
    $(".ze").css("display","none");
    $(".icon-jt").css("background","url(../images/2.png) center right no-repeat");
    $(".non img").css("visibility","visible")

    $('.cz_dialog input,.cz_dialog select,.cz_dialog textarea').attr('readonly',false);
    $('.tx_dialog input,.tx_dialog select,.tx_dialog textarea').attr('readonly',false);

    $(this).css("display","none");
    $(".cz_dialog_Btn .cancel").css("display","inline");
    $(".cz_dialog_Btn .confirm").css("display","inline");
})


/*ȡ����ť--�˳�*/
var index = parent.layer.getFrameIndex(window.name); //��ȡ��ǰ��������
$('.cancel').on('click', function(){
    parent.layer.close(index); //ִ�йر�
});



























