
avalon.ready(function () {
    vm.verifycode()
})


var vm = avalon.define({
    $id: 'verifycodebind',
    state: 0,//1.二维码校验成功，2.二维码校验失败
    qrlimitken: common.getUrlParam("qrlimitken"),
    retailername: common.getUrlParam("retailername"),
    bindcode: function () {
        $.ajax({
            type: 'put',
            dataType: 'json',
            beforeSend: function () {
                shelter.init({ icos: "/js/shelter/image/loading.gif" })
            },
            //complete: function () { shelter.close() },
            url: '/webapi/retailer/weixin/qrlimitverify/binding?qrlimitken=' + vm.qrlimitken,
            success: function (json) {
                shelter.close();
                json = json || {};   /* 统一加这句话 */
                if (json.error != undefined && json.error != null) {
                    shelter.init({
                        name: json.error,
                        icos: "/js/shelter/image/ico_error.png",
                        autoClear: 5
                    })
                    return
                }
                shelter.init({
                    name: "已绑定",
                    icos: "/js/shelter/image/ico_success.png",
                    autoClear: 5
                })
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                var errormsg = "访问异常";

                if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                    var json = JSON.parse(XMLHttpRequest.responseText);
                    errormsg = JSON.parse(json.Message).error;
                    if (errormsg == undefined || errormsg == '')
                        errormsg = "Http error: " + XMLHttpRequest.statusText;
                }
                shelter.init({
                    title: "当前网络不给力，请稍候重试",
                    icos: "/js/shelter/image/ico_warn.png",
                    autoClear: 5,
                    shadeClose: true
                })
                // toasterextend.showtips(errormsg, "error");
            }
        });
    },
    verifycode: function () {//校验二维码是否正确
        $.ajax({
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                shelter.init({ icos: "/js/shelter/image/loading.gif" })
            },
            url: '/webapi/retailer/weixin/qrlimitverify/binding?qrlimitken=' + vm.qrlimitken,
            success: function (json) {
                vm.state = 1
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                vm.state = 2
                vm.getQRcode()
            }
        });
    },
    getQRcode: function () {
        $("#QRCode_img").attr("src", '/webapi/retailer/weixin/limit_verify_code?qrtype=1013' + "&random=" + Math.random())
        $("#QRCode_img").load(function () {//二维码加载成功
            draw()
        });
        $('#QRCode_img').error(function () {
            shelter.init({
                title: "专属核销码加载失败", icos: "/js/shelter/image/ico_error.png",
                autoClear: 5,
                shadeClose: true
            })
        });
    }
})