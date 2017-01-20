var resdata = {
    "activity": {
        "guid": "02e80f58cd594eb2a24cb413424e53c5",
        "description": "11111111111111111111111111",
        "state": "上架",
        "begintime": "2017-01-10 00:00:00",
        "endtime": "2017-01-11 23:59:59",
        "earliestjointime": "2017-01-11 00:00:00",
        "latestjointime": null,
        "activitytitle": "shaoyongzhe: 测试6",
        "servicephone": "111-1111111",
        "singleselection": 0
    },
    "area_condition": {
        "topicid": "02e80f58cd594eb2a24cb413424e53c5",
        "districts": [
            {
                "name": "北京市",
                "state": "active",
                "charge": {
                    "name": "shaoyongzhe",
                    "guid": "4654269886BC4FD7B5914ED324208FB0",
                    "oid": 2800992
                },
                "city": [
                    {
                        "name": "北京市",
                        "state": "active",
                        "charge": {
                            "name": "shaoyongzhe",
                            "guid": "4654269886BC4FD7B5914ED324208FB0",
                            "oid": 2800992
                        },
                        "country": []
                    }
                ]
            }
        ]
    },
    "supplier_condition": {},
    "distributor_condition": {
        "state": "active",
        "number_range": {
            "min": "1",
            "max": "11"
        },
        "ticket_verify": {
            "state": "active",
            "min": "111",
            "operator": ">=",
            "max": "",
            "begintime": "2017-1-9",
            "guid": "767f81af8bcb48d485071c1ad1a29874"
        }
    },
    "consumer_condition": {},
    "retailer_condition": {},
    "activity_condition": [
        {
            "state": "active",
            "activitytype": "package",
            "retailer_count": {
                "min": "1",
                "max": "20"
            },
            "discount": {
                "min": "1",
                "operator": ">="
            },
            "guid": "af741cca16644d1ab84cc4ec987ca707"
        }
    ],
    "event_handler_list": [
        {
            "state": "active",
            "refund_to": "distributor",
            "event": "verify_first",
            "refund_content": "fixedmoney",
            "min": "1",
            "ceiling": "1111",
            "applycount": "11111",
            "limit": {
                "perday": {
                    "sum": "1",
                    "time": "1"
                },
                "totalbudget": {
                    "sum": "11",
                    "time": "11"
                }
            },
            "guid": "5ee9fd80764944569f50bf6fdede688e"
        }
    ],
    "sponsor": "distributor",
    "propagation": [
        {
            "activitytitle": "11",
            "wechattitle": "11",
            "propagation": "11",
            "poster_url": "http://img6.bdstatic.com/img/image/smallpic/xingkong1201.jpg",
            "object": "distributor"
        },
        {
            "activitytitle": "22",
            "wechattitle": "22",
            "propagation": "111",
            "poster_url": "http://img6.bdstatic.com/img/image/smallpic/xingkong1201.jpg",
            "object": "retailer"
        },
        {
            "activitytitle": "33",
            "wechattitle": "33",
            "propagation": "33",
            "poster_url": "http://img6.bdstatic.com/img/image/smallpic/xingkong1201.jpg",
            "object": "consumer"
        }
    ]
}

function GetUrlParam() {
    
    var url = location.search; 
    var thisParam = {};

    if (url.indexOf("?") != -1) {

        var str = url.substr(1);
        strs = str.split("&");

        for(var i = 0; i < strs.length; i ++) {
            thisParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }

    }

    return thisParam;
}



// debugger
if(!$.isEmptyObject(GetUrlParam())){

    $.ajax({
        type: "get",
        url: '/webapi/ipaloma/topic/detail/' + GetUrlParam().guid,
        dataType: "json",
        beforeSend: function (){ $('.loading').fadeIn() },
        complete: function (){ $('.loading').fadeOut() },
        success: function (resdata){ console.log(JSON.stringify(resdata, null, 4)); render(resdata) },
        error: function (){ console.warn("修改详情 error") }
    });

} else {
    layer.alert("跳转到修改失败了");
    // render(resdata)
}

function render(resdata){

    var basic = $('.basic-msg');
    var activity = resdata.activity;
    var dianhua = activity.servicephone;
    var tel = dianhua.substring(dianhua.indexOf('-')+1);
    var quhao = dianhua.substring(0,dianhua.indexOf('-'));
    basic.find('.description').val(activity.description);
    basic.find('.begintime').val(activity.begintime);
    basic.find('.endtime').val(activity.endtime);
    basic.find('.earliestjointime').val(activity.earliestjointime);
    basic.find('.lastestjointime').val(activity.lastestjointime);
    basic.find('.activityTitle').val(activity.activitytitle);
    basic.find('.tel').val(tel);
    basic.find('.quhao').val(quhao);
    if(activity.singleselection == 1){
        $('.radio:contains(是)').addClass('on');
    } else {
        $('.radio:contains(否)').addClass('on');
    }


    // 地区
    // debugger
    // $('nav span:eq(1)').click();
    for(var i=0; i<resdata.area_condition.districts.length; i++){

        var area = resdata.area_condition.districts[i];

        // alert(area.charge.state);
        // debugger;
        // console.log(area.charge.state);
        var state = "";
        if(area.charge.state == "active"){
            state = "status on";
        } else {
            state = "status";
        }

        $('.region-wrap').append("<div class='region-item'><div class='row'><div class='provice'><span><em class='shengName' title="+ area.name +">"+ area.name +"</em></span></div><div class='charge'><span><em shengfzr='"+ JSON.stringify(area.charge, null, 4) +"'>负责人 "+ area.charge.name +"</em><i class='"+ state +"'></i></span></div></div></div>");


        for(var j=0; j<area.city.length; j++){

            if(area.city[j].charge.state == "active"){
                state = "status on";
            } else {
                state = "status";
            }

            $('.region-item').last().append("<div class='row city-wrap'><div class='city city-item'><span><em class='cityName'>"+ area.city[j].name +"</em></span></div><div class='charge'><div class='charge-name'><em shifzr='"+ JSON.stringify(area.city[j].charge, null, 4) +"'>负责人 "+ area.city[j].charge.name +"</em><i class='"+ state +"'></i></div><div class='district-wrap'></div></div></div>");


            for(var k=0; k<area.city[j].country.length; k++){

                if(area.city[j].country[k].state == "active"){
                    state = "status on";
                } else {
                    state = "status";
                }

                $('.district-wrap').last().append("<span><em qx='"+ JSON.stringify(area.city[j].country[k], null, 4) +"'>"+ area.city[j].country[k].name +"</em><i class='"+ state +"'></i></span>");
            }

        }

    }

    // debugger
    // if(search != ""){
        // $('.status').hide();
    // }




    /*"activity_condition": {
        "product_category": [],
        "activity_itemkind": [
            {
                "state": "active",
                "activitytype": "package",
                "retailer_count": {
                    "min": "10",
                    "max": "20"
                },
                "discount": {
                    "min": "20",
                    "operator": ">="
                }
            },
            {
                "state": "active",
                "activitytype": "discount",
                "retailer_count": {
                    "min": "2",
                    "max": "3"
                },
                "discount": {
                    "min": "21",
                    "operator": ">="
                }
            }
        ]
    },*/

    // debugger;
    // $("nav span:eq(1)").click();
    // return

        // console.log(kj);


    // function kj1(){
        // debugger;
        // var res_kj1 = false;
        /*var hyItem = resdata.activity_condition.activity_itemkind;
        var hyItemL = resdata.activity_condition.activity_itemkind.length;
        var hdTypeText = "";
        var hdTypeArr = [];
        for(var i=0; i<hyItemL; i++){
            // var hyItem = hyItem[i];
            // alert(hyItem[i].activitytype);
            if(hyItem[i].activitytype == "package"){
                hdTypeText = "套餐";
                hdTypeArr.push("套餐");
            }
            if(hyItem[i].activitytype == "discount"){
                hdTypeText = "降价";
                hdTypeArr.push("降价");
            }
            $('.addSub1').last().before("<div class='addSub1'><div class='dib acTy ver re'><div class='select-wrap acSe1 ba activity'><i></i><em class='selected activeType'>"+ hdTypeText +"</em><ul class='select'></ul></div></div><div class='dib acCo ver'><div class='dib acCoSc re ver'><p class='bor selectWrap1'></p><p class='bor hi selectWrap1'>套餐优惠幅度</p><p class='bor hi selectWrap1'>降价幅度</p></div><div class='select-wrap acCoRe ver re dib acSe3'><i></i><em class='selected'></em><ul class='select'><li class='option' name='>='>不低于</li><li class='option' name='>'>高于</li><li class='option' name='=='>等于</li></ul></div><div class='dib acCoRa ver'><div class='bor selectWrap2'><span class='diSpan'></span></div><div class='bor hi selectWrap2'><input class='bor diInput' type='text' value='20'><span class='diSpan por'>%</span></div><div class='bor hi selectWrap2'><input class='bor diInput' type='text' value='20'><span class='diSpan por'>%</span></div></div></div><div class='dib acPu mds'><input class='bor acPuI1' type='text' value='10'><span class='to'></span><input class='bor acPuI2' type='text' value='20'><span class='tip'>不输入代表不限</span></div><div class='acAd dib'><span class='minus acAd1'></span><span class='plus acAd2'></span></div>");

            // $(".addSub1:eq("+ i +") .activity .option:contains("+ hdType +")").click();

        }*/

        // res_kj1 = true;

        /*if($('.kj1ok').length == 1){
            alert(1)
        }
    */
    // }

    // $("nav span:eq(3)").click();
    for(var i=0; i<resdata.propagation.length; i++){
        var xuanchuan = resdata.propagation[i];
        $('.section4 .area').eq(i).find('.activitytitle').text(xuanchuan.activitytitle);
        $('.section4 .area').eq(i).find('.wechattitle').text(xuanchuan.wechattitle);
        $('.section4 .area').eq(i).find('.posterurl').attr('src', xuanchuan.poster_url);
        $('.section4 .area').eq(i).find('.propagation').text(xuanchuan.propagation);
    }

}



