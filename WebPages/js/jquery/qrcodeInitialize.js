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
            0: {                
                "type": "image",
                "url": "/consumer/image/consumercard_verfiy.png",
                "width": 384,
                "height": 81,
                "x": 0,
                "y": 0
            },
            1: {
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
            2: {
                "type": "qrcode",
                "bordercolor": "#d9d9d9",
                "url":"/webapi/consumer/weixin/card_generate_code",
                "width": 384,
                "height": 384,
                "x": 0,
                "y": 0
            }
        }
    }
};
$(function () {
    if ($("#divQrcode").length == 0) {
        var boarddiv = "<div id='divQrcode'></div>";
        $(document.body).append(boarddiv);
    }
    draw(qrcodeconfig["consumer"]["consumercard"], "", "");
});

function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

function TextDraw(canvas, newcanvasname, config) {    
    console.log("TextDraw onload");
    canvas.font =  config.fontsize + "px " + config.font;
    canvas.textBaseline = 'middle';//更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
    canvas.textAlign = 'left';    
    canvas.fillStyle = config.fontcolor;
    
    canvas.fillText(config.text, config.width / 4, config.fontsize + 10);
    console.log(config.text);
}

function ImageDraw(canvas, imagename, config) {

    var img = new Image(config.width,config.height);    
    img.src = config.url;    
    if (img.complete) { //加载完成后直接缓存读取                             
        canvas.drawImage(img, config.x, config.y, config.width, config.height);       
    }; 
    console.log('2');    
}

function qrcodeDraw(canvas,imagename,config)
{

}

function draw(config, logopath, encodestring) {
    var c = document.createElement('canvas'),
    ctx = c.getContext('2d');

     c.width = 420;
    //c.height = 595;
    //ctx.rect(0, 0, c.width, c.height);
    //ctx.fillStyle = 'transparent';//画布填充颜色
    //ctx.fill();
    $.each(config, function (name, jsondata) {      
        var type = jsondata["type"];
        console.log(type);
        switch (type) {
            case "text":
                TextDraw(ctx, name, jsondata);
                //TextDraw(ctx, name, jsondata);
                break;
            case "image":
                ImageDraw(ctx, name,jsondata);
                break;
            default:

        }
    });
    var hc_image = new Image();
    
    hc_image.src = c.toDataURL("image/png");
    hc_image.style = "width:384px;height:100%"
    $('#divQrcode').html(hc_image);
}