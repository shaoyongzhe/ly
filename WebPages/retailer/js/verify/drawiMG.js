﻿function draw(fn,text) {
 
    var c = document.createElement('canvas'),
        ctx = c.getContext('2d');
    
    c.width = 420;
    c.height = 595;
    ctx.rect(0, 0, c.width, c.height);
    ctx.fillStyle = 'transparent';//画布填充颜色
    ctx.fill();
    var qcwidth = c.width * 0.44

    var data1 = ["/retailer/image/verify/verifycode.png", qrCode(text, qcwidth, 185)]
    var len = data1.length;
    function drawing(n) {
        if (n < len) {
            var img = new Image;
            //img.crossOrigin = 'Anonymous'; //解决跨域
            img.src = data1[n];
            img.onload = function () {
                if (n == 1) {//计算二维码大小
                   
                    ctx.drawImage(img, (c.width / 2) - (qcwidth / 2), 126, qcwidth, 185);
                }
                else
                    ctx.drawImage(img, 0, 0, c.width, c.height);
                drawing(n + 1);//递归
            }
        } else {
            //保存生成作品图片
            convertCanvasToImage(c);
            // Canvas2Image.saveAsJPEG(c); //保存到电脑
        }
    }
    drawing(0);
}

function convertCanvasToImage(canvas) {
    var hc_image = new Image();
    hc_image.src = canvas.toDataURL("image/png");
    hc_image.style = "width:100%;height:100%"
    $('#verifycode').html(hc_image);
}

function qrCode(text, width,height) {
    $('#divQrcode').qrcode({
        text: text,
        render: 'canvas',
        height: width,
        width: height,
        typeNumber: -1,      //计算模式
        correctLevel: QRErrorCorrectLevel.H,//纠错等级
        src: '/retailer/image/2.jpg'//这里配置Logo的地址即可。
    });
}