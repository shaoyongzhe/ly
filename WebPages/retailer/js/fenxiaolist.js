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
$(function () {
    fnfooterclick();
});
