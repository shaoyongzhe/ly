/**
 * Created by Administrator on 2016/12/30.
 */





function fnfooterclick() {
    $("footer").on("click","div",function () {
        if($(this).find("ul").attr("class")=="on"){
            $("footer").find("ul").removeClass("on");
        }else {
            $("footer").find("ul").removeClass("on");
            $(this).find("ul").addClass("on");
        }
    });
    $(document).click(function (e) {
        if (!$(e.target).closest("footer").length) {
            $("footer ul").removeClass("on");
        }
    });
}
//获取数据
function fngetlist() {
    console.log(1)
    $.ajax({
        type: "get",
        url: "/webapi/distributor/{57839d2ad6424786bd3c319585f2088e}/distributors",
        data: "",
/*
        error:function () {
            alert("网络出错，请重新加载")
        },
*/
        success: function(data){
            console.log(data)
        }
    });
}
$(function () {
    fnfooterclick();
    fngetlist();
});
