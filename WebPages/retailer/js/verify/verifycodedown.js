
avalon.ready(function () {
    vm.getQRcode()
})


var vm = avalon.define({
    $id: 'verifycodedown',
    loadState: 0,//0:加载中，1.加载失败 2.加载成功
    getQRcode: function () {
        vm.loadState = 0;
        $("#QRCode_img").attr("src", '/webapi/retailer/weixin/limit_verify_code?qrtype=1013' + "&random=" + Math.random())
        $("#QRCode_img").load(function () {//二维码加载成功
            draw()
        });
        $('#QRCode_img').error(function () {
            vm.loadState = 1
        }); 
    }
})

