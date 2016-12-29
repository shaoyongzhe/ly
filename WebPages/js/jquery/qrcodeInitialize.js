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
        "loadsuccess": function () { },
        "loaderror": function () { },
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


function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

function TextDraw(canvas, newcanvasname, config) {

    var textinterval = setInterval(function () {
        if (ImageDrawEnd) {
            canvas.font = config.fontsize + "px " + config.font;
            canvas.textBaseline = 'middle';//更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
            canvas.textAlign = 'left';
            canvas.fillStyle = config.fontcolor;

            canvas.fillText(config.text, config.width / 4, config.fontsize + 10);
            clearInterval(textinterval);
        }
    }, 500);

}

function ImageDraw(canvas, imagename, config) {

    var img = new Image(config.width, config.height);
    img.src = config.url;
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
                data = data || {};
                if (data.qrcachekey == undefined) {
                    ImageQrEnd = true;
                    config["error"] = "出错了";
                    return;

                }
                $("#canvasqrcode").remove()
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

function draw(config, configname, logo) {


    var c = document.createElement('canvas'),
    ctx = c.getContext('2d');


    var width = 0;
    var height = 0;
    $.each(config[configname], function (name, jsondata) {

        var type = jsondata["type"];
        console.log("type=" + type)
        if (width < jsondata.width)
            width = jsondata.width;
        switch (type) {
            case "text":
                TextDraw(ctx, name, jsondata);
                break;
            case "image":

                height += jsondata.height;
                ImageDraw(ctx, name, jsondata);
                break;
            case "qrcode":
                height += jsondata.height;
                QrcodeDraw(ctx, name, jsondata, logo);
                break;
            default:

        }
    });
    c.width = width;
    c.height = height + 20;

    var drawinterval = setInterval(function () {
        if (ImageQrEnd) {
            var iserror = false;
            $.each(config[configname], function (name, jsondata) {
                console.log(jsondata.error);
                if (jsondata.error != undefined) {
                    clearInterval(drawinterval);
                    config.loaderror();
                    iserror = true;
                }
            });
            if (iserror)
                return;
            var hc_image = new Image();
            $('#QRCode_img').attr("src", c.toDataURL("image/png"))
            //hc_image.src = c.toDataURL("image/png");
            //console.log(hc_image.src)
            //// hc_image.style = "width:384px;height:100%"
            //$('#divQrcode').html(hc_image);
            config.loadsuccess();

            ImageDrawEnd = false;
            ImageQrEnd = false;
            ImageGetJSON = false;
            clearInterval(drawinterval);
        }
    }, 500);

}