
avalon.ready(function () {
    vm.getQRcode()
})


var vm = avalon.define({
    $id: 'verifycodedown',
    loadState: 0,//0:加载中，1.加载失败 2.加载成功
    getQRcode: function () {
        vm.loadState = 0;
        //$("#QRCode_img").attr("src", '/webapi/retailer/weixin/limit_verify_code?qrtype=10001&sendimage=false')
        //$("#QRCode_img").load(function () {//二维码加载成功
        //    draw()
        //});
        //$('#QRCode_img').error(function () {
        //    vm.loadState = 1
        //}); 

        $.ajax({
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                shelter.init({ icos: "/js/shelter/image/loading.gif" })
            },
            url: '/webapi/retailer/weixin/limit_verify_code?qrtype=10001&buildtype=web',
            success: function (json) {
                if (json.user_notification != undefined && json.user_notification != null) {
                    vm.loadState = 1
                } else {
                    shelter.close()
                    draw(json.content)
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                vm.loadState = 1
            }
        });
    }
})

