var qrcodeconfig = {
    "distributor": {
        "logo": "/consumer/image/consumer_logo.png",
        "loadsuccess": function () { },
        "loaderror": function () { },
        "consumercard": {
            "title": {
                "type": "text",
                "text": "",
                "fontsize": 30,
                "font": "Courier New",
                "fontcolor": "#000000",
                "width": 384,
                "height": 60,
                "single":true,
                "x": 0,
                "y": 0
            },
            "nav": {
                "type": "image",
                "url": "/distributor/image/invitecardnav.png",
                "width": 384,
                "height": 81,
                "single": true,
                "depend": "title",
                "x": 0,
                "y": 60
            },
            "navtext": {
                "type": "text",
                "text": "邀请惠粉码",
                "fontsize": 30,
                "font": "Courier New",
                "fontcolor": "#ffffff",
                "depend": "title",
                "width": 384,
                "height": 81,
                "single": false,
                "x": 0,
                "y": 95
            },
            "qrcode": {
                "type": "qrcode",
                "depend": "nav",
                "bordercolor": "#d9d9d9",
                "url": "/webapi/consumer/weixin/register_generate_code?qrtype=20&combinetitle=0&sendimage=false&resetcache=true",
                "width": 348,
                "height": 348,
                "single": true,
                "x": 18,
                "y": 145
            },            
            "bottom": {
                "type": "text",
                "depend": "qrcode",
                "text": "扫一扫上面的二维码，成为超惠买惠粉！",
                "fontsize": 20,
                "font": "Courier New",
                "fontcolor": "#457181",
                "width": 384,
                "height": 81,
                "single": true,
                "x": 0,
                "y": 520
            },

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
                "single": true,
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
                "single": false,
                "x": 0,
                "y": 0
            },
            "qrcode": {
                "type": "qrcode",
                "bordercolor": "#d9d9d9",
                "url": "/consumer/image/qrcodetest.gif",
                "width": 348,
                "height": 348,
                "single": true,
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

function SingleTextDraw(canvas, config,dependconfig )
{
    console.log("dependconfig");
    console.log(dependconfig);
    if (dependconfig == undefined)
    {
        canvas.font = config.fontsize + "px " + config.font;
        canvas.textBaseline = 'middle';//更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
        canvas.textAlign = 'left';
        canvas.fillStyle = config.fontcolor;
        var textlength = config.text.length * config.fontsize;
        canvas.fillText(config.text, config.width / 2 - textlength / 2, config.y);
    } else
    {
        console.log("success:" + dependconfig.success);
        var textinterval = setInterval(function () {
            if (dependconfig.success) {
                canvas.font = config.fontsize + "px " + config.font;
                canvas.textBaseline = 'middle';//更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
                canvas.textAlign = 'left';
                canvas.fillStyle = config.fontcolor;
                var textlength = config.text.length * config.fontsize;

                canvas.fillText(config.text, config.width / 2 - textlength / 2, config.y);
                clearInterval(textinterval);
            }
        }, 500);
    }
   

}

function TextDraw(canvas, config) {

    var textinterval = setInterval(function () {
        if (ImageDrawEnd) {
            canvas.font = config.fontsize + "px " + config.font;
            canvas.textBaseline = 'middle';//更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
            canvas.textAlign = 'left';
            canvas.fillStyle = config.fontcolor;
            var textlength = config.text.length * config.fontsize;
            
            canvas.fillText(config.text, config.width/2 - textlength / 2, config.y);
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
                if (data.qrstring == undefined) {
                    ImageQrEnd = true;
                    config["error"] = "出错了";
                    return;

                }
                $("#canvasqrcode").remove()
                $('#qrcodediv').qrcode({
                    text: data.qrstring,
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

}

function draw(config, configname, logo) {


    var c = document.createElement('canvas'),
    ctx = c.getContext('2d');


    var width = 0;
    var height = 0;
    $.each(config[configname], function (name, jsondata) {

        var type = jsondata["type"];
        console.log("type=" + type)
        console.log(jsondata);
        if (width < jsondata.width)
            width = jsondata.width;
        if (jsondata.single)
            height += jsondata.height;
        switch (type) {
            case "text":
                if (jsondata.single)
                    SingleTextDraw(ctx, jsondata, config[configname][jsondata.depend]);
                else
                    TextDraw(ctx, jsondata, config[configname][jsondata.depend]);
                break;
            case "image":
                ImageDraw(ctx, name, jsondata, config[configname][jsondata.depend]);
                break;
            case "qrcode":
                QrcodeDraw(ctx, name, jsondata, logo, config[configname][jsondata.depend]);
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