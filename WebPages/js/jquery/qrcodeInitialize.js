var qrcodeconfig = {
    "distributor": {
        "logo": "",
        "width": 480,
        "bordercolor": "#d9d9d9",
        "data": {
            "backgroudcolor": "#e7e7e7",
            "fontcolor": "#666666",
            "fontsize": 24
        },
        "navigation": {
            "backgroundcolor": "",
            "text": "邀请惠粉码",
            "fontsize": 30,
            "fontcolor": "#ffffff"
        },
        "bottom": {
            "text": "扫一扫上面的二维码，成为超惠买惠粉!",
            "fontcolor": "#457181",
            "fontsize": 24
        }
    },
    "consumer": {
        "logo": "/consumer/image/consumer_logo.png",
        "consumercard": {
            "nav": {
                "type": "image",
                "url": "/consumer/image/consumercard_verfiy.png",
                "width": 384,
                "height": 81,
                "x": 0,
                "y": 0
            },
            "navtext": {
                "type": "text",
                "text": "超惠券核销码",
                "fontsize": 30,
                "font": "Courier New",
                "fontcolor": "#ffffff",
                "width": 384,
                "height": 81,
                "x": 0,
                "y": 0
            },
            "qrcode": {
                "type": "qrcode",
                "bordercolor": "#d9d9d9",
                "url": "/consumer/image/qrcodetest.gif",
                "width": 348,
                "height": 348,
                "x": 18,
                "y": 75
            }
        }
    }
};
var ImageDrawEnd = false;
var ImageQrEnd = false;
var ImageGetJSON = false;
$(function () {
    if ($("#divQrcode").length == 0) {
        var boarddiv = "<div id='divQrcode'></div>";
        $(document.body).append(boarddiv);
    }
});

function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

function TextDraw(canvas, newcanvasname, config) {

    var textinterval = setInterval(function () {
        if (ImageDrawEnd) {
            console.log("TextDraw onload");
            canvas.font = config.fontsize + "px " + config.font;
            canvas.textBaseline = 'middle';//更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
            canvas.textAlign = 'left';
            canvas.fillStyle = config.fontcolor;

            canvas.fillText(config.text, config.width / 4, config.fontsize + 10);
            console.log(config.text);
            clearInterval(textinterval);
        }
    }, 500);

}

function ImageDraw(canvas, imagename, config) {

    var img = new Image(config.width, config.height);
    img.src = config.url;
    //setTimeout(function () {
    //    canvas.drawImage(img, config.x, config.y, config.width, config.height);
    //},800);
    //if (img.complete) { //加载完成后直接缓存读取                             
    //    canvas.drawImage(img, config.x, config.y, config.width, config.height);       
    //}; 
    img.onload = function () {
        canvas.drawImage(img, config.x, config.y, config.width, config.height);
        ImageDrawEnd = true;
        console.log("ImageDraw onload")
    }
}

function QrcodeDraw(canvas, imagename, config, logo) {
    if (config.url == "")
        return;

    var qrinterval = setInterval(function () {
        if (ImageDrawEnd && !ImageGetJSON) {
            ImageGetJSON = true;
            $.getJSON(config.url, function (data) {
                $('#qrcodediv').qrcode({
                    text: data.qrcachekey,
                    render: 'canvas',
                    height: config.height,
                    width: config.width,
                    typeNumber: -1,      //计算模式
                    correctLevel: QRErrorCorrectLevel.H,//纠错等级
                    src: logo//这里配置Logo的地址即可。
                });

                setTimeout(function () {
                    var qrcanvas = document.getElementById('canvasqrcode');
                    var qrcodeimage = new Image();
                    qrcodeimage.src = qrcanvas.toDataURL("image/png");
                    qrcodeimage.onload = function () {

                        canvas.strokeStyle = "#ccc";
                        canvas.lineWidth = 1;
                        canvas.strokeRect(config.x, config.y, config.width, config.height);
                        canvas.drawImage(qrcodeimage, config.x + 10, config.y + 10, config.width - 20, config.height - 20);



                        ImageQrEnd = true;

                        console.log("QrcodeDraw onload")
                    }
                    clearInterval(qrinterval);
                }, 500)
            });
        }
    }, 500);

    //var qrcodeimage = new Image();
    //qrcodeimage.src = config.url;
    //canvas.drawImage(qrcodeimage, config.x, config.y, config.width, config.height);

    //$.getJSON(config.url, function (data) {
    //    var qrstring = data.qrstring;
    //    if ($("#qrcodediv").length == 0) {
    //        var boarddiv = "<div id='qrcodediv'></div>";
    //        $(document.body).append(boarddiv);
    //    }

    //    $('#qrcodediv').qrcode({
    //        text: qrstring,
    //        render: 'canvas',
    //        height: config.height,
    //        width: config.width,
    //        typeNumber: -1,      //计算模式
    //        correctLevel: QRErrorCorrectLevel.H,//纠错等级
    //        src: logo//这里配置Logo的地址即可。
    //    });

    //    setTimeout(function () {
    //        var qrcanvas = document.getElementById('canvasqrcode');
    //        var qrcodeimage = new Image();
    //        qrcodeimage.src = qrcanvas.toDataURL("image/png");
    //        canvas.drawImage(qrcodeimage, config.x, config.y, config.width, config.height);
    //    }, 500);
    //});

}

function draw(config, logo) {
    var c = document.createElement('canvas'),
    ctx = c.getContext('2d');

    c.width = 420;
    c.height = 800;

    $.each(config, function (name, jsondata) {

        var type = jsondata["type"];
        console.log("type=" + type)
        switch (type) {
            case "text":
                TextDraw(ctx, name, jsondata);


                break;
            case "image":
                ImageDraw(ctx, name, jsondata);

                setTimeout(function () { console.log("setTimeout") }, 1000)
                break;
            case "qrcode":
                QrcodeDraw(ctx, name, jsondata, logo);
                break;
            default:

        }
    });
    var drawinterval = setInterval(function () {
        if (ImageQrEnd) {
            var hc_image = new Image();
            hc_image.src = c.toDataURL("image/png");
            hc_image.style = "width:384px;height:100%"
            $('#divQrcode').html(hc_image);
            clearInterval(drawinterval);
        }
    }, 500);

}