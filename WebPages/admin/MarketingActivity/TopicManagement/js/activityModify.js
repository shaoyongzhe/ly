//20170123
var linshi="";
/*变量说明，resdataFix为创建活动拼接好的数据，阅后即焚。resdata为ajax的data，_resdata_为方便切换使用resdataFix和resdata的变量*/
var resdataFix = {
  "activity": {
    "description": "人员可见，用于活动",
    "begintime": "2017-1-20 00:00:00",
    "endtime": "2017-1-20 23:59:59",
    "earliestjointime": "2017-1-20 00:00:00",
    "latestjointime": "2017-1-20 00:00:00",
    "activitytitle": "活动主题",
    "servicephone": "111-111111",
    "singleselection": 0,
    "responsible_id": "4654269886BC4FD7B5914ED324208FB0",
    "responsible_oid": 2800992,
    "responsible_name": "shaoyongzhe",
    "responsible2nd_id": "4654269886BC4FD7B5914ED324208FB0",
    "responsible2nd_oid": 2800992,
    "responsible2nd_name": "shaoyongzhe"
  },
  "area_condition": [
    {
      "charge": {
        "state": "active",
        "name": "六月雪",
        "guid": "857392948940468784b73a94c6ab1c6c",
        "oid": "4"
      },
      "name": "河北省",
      "state": "active",
      "city": [
        {
          "state": "active",
          "charge": {
            "state": "active",
            "name": "六月雪",
            "guid": "857392948940468784b73a94c6ab1c6c",
            "oid": "4"
          },
          "name": "秦皇岛市",
          "country": [
            {
              "state": "active",
              "name": "海港区"
            },
            {
              "state": "active",
              "name": "卢龙县"
            }
          ]
        },
        {
          "state": "active",
          "charge": {
            "state": "active",
            "name": "六月雪",
            "guid": "857392948940468784b73a94c6ab1c6c",
            "oid": "4"
          },
          "name": "石家庄市",
          "country": [
            {
              "state": "active",
              "name": "无极县"
            },
            {
              "state": "active",
              "name": "藁城市"
            }
          ]
        }
      ]
    },
    {
      "charge": {
        "state": "active",
        "name": "六月雪",
        "guid": "857392948940468784b73a94c6ab1c6c",
        "oid": "4"
      },
      "name": "内蒙古自治区",
      "state": "active",
      "city": [
        {
          "state": "active",
          "charge": {
            "state": "active",
            "name": "六月雪",
            "guid": "857392948940468784b73a94c6ab1c6c",
            "oid": "4"
          },
          "name": "兴安盟市",
          "country": [
            {
              "state": "active",
              "name": "乌兰浩特市"
            },
            {
              "state": "active",
              "name": "阿尔山市"
            }
          ]
        },
        {
          "state": "active",
          "charge": {
            "state": "active",
            "name": "六月雪",
            "guid": "857392948940468784b73a94c6ab1c6c",
            "oid": "4"
          },
          "name": "赤峰市",
          "country": [
            {
              "state": "active",
              "name": "红山区"
            },
            {
              "state": "active",
              "name": "元宝山区"
            }
          ]
        }
      ]
    }
  ],
  "sponsor": "distributor",
  "distributor_condition": {
    "singleselection": "1",
    "state": "active",
    "number_range": {
      "min": "3",
      "max": "4"
    },
    "核销次数": {
      "state": "active",
      "min": "3",
      "operator": "between",
      "max": "4",
      "begintime": "2016-10-19",
      "statisticrange": "活动开始前",
      "timeunit": "天"
    },
    "核销人数": {
      "state": "active",
      "min": "3",
      "operator": ">=",
      "max": "",
      "begintime": "2016-11-19",
      "statisticrange": "活动开始前",
      "timeunit": "天"
    }
  },
  "retailer_condtion": {
    "state": "active",
    "number_range": {
      "min": "",
      "max": ""
    },
    "惠粉数": {
      "state": "active",
      "min": "5",
      "operator": ">=",
      "max": "",
      "begintime": "2016-10-19",
      "statisticrange": "活动开始前",
      "timeunit": "天"
    }
  },
  "activity_condition": {
    "product_category": [],
    "activity_itemkind": [
      {
        "state": "active",
        "activitytype": "套餐",
        "retailer_count": {
          "min": "10",
          "max": "20"
        },
        "discount": {
          "min": "23",
          "operator": ">="
        }
      },
      {
        "state": "active",
        "activitytype": "降价",
        "retailer_count": {
          "min": "2",
          "max": "3"
        },
        "discount": {
          "min": "23",
          "operator": ">"
        }
      }
    ]
  },
    "event_handler_list": [
        {
            "state": "active",
            "refund_to": "retailer_employee",
            "event": "拉粉",
            "refund_content": "固定金额返现",
            "min": "3",
            "ceiling": "4",
            "applycount": "5",
            "limit": {
                "count_on": "门店",
                "perday": {
                    "sum": "2",
                    "time": "4"
                },
                "totalbudget": {
                    "sum": "1",
                    "time": "3"
                }
            }
        },
        {
            "state": "active",
            "refund_to": "distributor",
            "event": "核销(消费者首次)",
            "refund_content": "随机微信红包",
            "min": "2",
            "max": "5",
            "ceiling": "4",
            "applycount": "3",
            "limit": {
                "count_on": "门店",
                "perday": {
                    "sum": "6",
                    "time": "8"
                },
                "totalbudget": {
                    "sum": "5",
                    "time": "7"
                }
            }
        },
        {
            "state": "active",
            "refund_to": "retailer_employee",
            "event": "门店签约分销商",
            "refund_content": "摇一摇",
            "min": "",
            "ceiling": "3",
            "applycount": "",
            "probability": [
                {
                    "refund_content": "固定金额返现",
                    "min": "2",
                    "max": "",
                    "precentage": "3",
                    "timelimit": "4",
                    "applycount": "5"
                },
                {
                    "refund_content": "谢谢参与",
                    "min": "",
                    "max": "",
                    "precentage": "3",
                    "timelimit": "4",
                    "applycount": ""
                },
                {
                    "refund_content": "随机微信红包",
                    "min": "3",
                    "max": "4",
                    "precentage": "5",
                    "timelimit": "6",
                    "applycount": "3",
                    "probability": {
                        "range": "平台活动1",
                        "time_curve": [],
                        "value_curve": [
                            {
                                "value": "3.0",
                                "percentage": "12"
                            },
                            {
                                "value": "3.1",
                                "percentage": "8"
                            },
                            {
                                "value": "3.2",
                                "percentage": "10"
                            },
                            {
                                "value": "3.3",
                                "percentage": "10"
                            },
                            {
                                "value": "3.4",
                                "percentage": "10"
                            },
                            {
                                "value": "3.5",
                                "percentage": "10"
                            },
                            {
                                "value": "3.6",
                                "percentage": "10"
                            },
                            {
                                "value": "3.7",
                                "percentage": "10"
                            },
                            {
                                "value": "3.8",
                                "percentage": "10"
                            },
                            {
                                "value": "3.9",
                                "percentage": "10"
                            },
                            {
                                "value": "4.0"
                            }
                        ]
                    }
                }
            ]
        }
    ],
  "propagation": [
    {
      "object": "distributor",
      "activitytitle": "1",
      "wechattitle": "1",
      "poster_url": "http://img6.bdstatic.com/img/image/smallpic/xingkong1201.jpg",
      "propagation": "1"
    },
    {
      "object": "retailer",
      "activitytitle": "2",
      "wechattitle": "2",
      "poster_url": "http://img6.bdstatic.com/img/image/smallpic/xingkong1201.jpg",
      "propagation": "2"
    },
    {
      "object": "consumer",
      "activitytitle": "3",
      "wechattitle": "3",
      "poster_url": "http://img6.bdstatic.com/img/image/smallpic/xingkong1201.jpg",
      "propagation": "3"
    }
  ],
  "releaseset": {
    "optype": "保存"
  }
}


/*if(location.href.indexOf("activityModify.htmlP")>0){
    resdata = {
        "activity": {
            "guid": "02e80f58cd594eb2a24cb413424e53c5",
            "description": "11111111111111111111111111",
            "state": "上架",
            "begintime": "2016-12-30 00:00:00",
            "endtime": "2017-01-06 23:59:59",
            "earliestjointime": "2017-01-08 00:00:00",
            "lastestjointime": "2017-01-16 23:59:59",
            "activitytitle": "活动主题活动主题",
            "servicephone": "111-1111111",
            "singleselection": 0,
            "responsible_id": "0FF73F905D8746C19A7152A6AC805755",
            "responsible_oid": 2801470,
            "responsible_name": "shaoyongzhe",
            "responsible_second_id": "0FF73F905D8746C19A7152A6AC805755",
            "responsible_second_oid": 2801470,
            "responsible_second_name": "shaoyongzhe"
        },
        "area_condition":{ 
            "topicid": "74f7dc5f232747b2a6db56e4dd0e8b15",
            "districts": [
                {
                    "charge": {
                        "state": "unactivated",
                        "name": "shaoyongzhe",
                        "guid": "4654269886BC4FD7B5914ED324208FB0",
                        "oid": "2800992"
                    },
                    "name": "河北省",
                    "city": [
                        {
                            "charge": {
                                "state": "active",
                                "name": "shaoyongzhe",
                                "guid": "4654269886BC4FD7B5914ED324208FB0",
                                "oid": "2800992"
                            },
                            "name": "秦皇岛市",
                            "country": [
                                {
                                    "state": "active",
                                    "name": "海港区"
                                },
                                {
                                    "state": "active",
                                    "name": "卢龙县"
                                }
                            ]
                        },
                        {
                            "charge": {
                                "state": "unactivated",
                                "name": "shaoyongzhe",
                                "guid": "4654269886BC4FD7B5914ED324208FB0",
                                "oid": "2800992"
                            },
                            "name": "邯郸市",
                            "country": [
                                {
                                    "state": "unactivated",
                                    "name": "邯山区"
                                },
                                {
                                    "state": "active",
                                    "name": "成安县"
                                },
                                {
                                    "state": "active",
                                    "name": "邱　县"
                                }
                            ]
                        }
                    ]
                },
                {
                    "charge": {
                        "state": "active",
                        "name": "shaoyongzhe",
                        "guid": "4654269886BC4FD7B5914ED324208FB0",
                        "oid": "2800992"
                    },
                    "name": "山西省",
                    "city": [
                        {
                            "charge": {
                                "state": "unactivated",
                                "name": "shaoyongzhe",
                                "guid": "4654269886BC4FD7B5914ED324208FB0",
                                "oid": "2800992"
                            },
                            "name": "长治市",
                            "country": [
                                {
                                    "state": "active",
                                    "name": "黎城县"
                                },
                                {
                                    "state": "active",
                                    "name": "潞城市"
                                }
                            ]
                        },
                        {
                            "charge": {
                                "state": "active",
                                "name": "shaoyongzhe",
                                "guid": "4654269886BC4FD7B5914ED324208FB0",
                                "oid": "2800992"
                            },
                            "name": "晋城市",
                            "country": [
                                {
                                    "state": "active",
                                    "name": "城　区"
                                },
                                {
                                    "state": "active",
                                    "name": "沁水县"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "distributor_condition": {
            "singleselection": "1",
            "state": "active",
            "number_range": {
                "min": "1",
                "max": "2"
            },
            "ticket_verify": {
                "state": "active",
                "min": "2",
                "operator": "between",
                "max": "3",
                "begintime": "2016-12-28"
            },
            "verify_person_count": {
                "state": "active",
                "min": "3",
                "operator": ">=",
                "max": "",
                "begintime": "2016-12-27"
            }
        },
        "retailer_condtion": {
            "state": "active",
            "number_range": {
                "min": "",
                "max": ""
            },
            "fans_range": {
                "state": "active",
                "min": "3",
                "operator": "between",
                "max": "6",
                "begintime": "2016-12-27"
            }
        },
        "activity_condition": {
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
        },

        "event_handler_list": [
            {
                "state": "active",
                "refund_to": "retailer_employee",
                "event": "拉粉",
                "refund_content": "固定金额返现",
                "min": "3",
                "ceiling": "4",
                "applycount": "5"
            },
            {
                "state": "active",
                "refund_to": "distributor",
                "event": "核销(消费者首次)",
                "refund_content": "随机微信红包",
                "min": "2",
                "max": "5",
                "ceiling": "4",
                "applycount": "3",
                "probability": {
                    "range": "平台活动1",
                    "time_curve": [],
                    "value_curve": [
                        {
                            "value": "2.0",
                            "percentage": "10"
                        },
                        {
                            "value": "2.3",
                            "percentage": "10"
                        },
                        {
                            "value": "2.6",
                            "percentage": "10"
                        },
                        {
                            "value": "2.9",
                            "percentage": "10"
                        },
                        {
                            "value": "3.2",
                            "percentage": "10"
                        },
                        {
                            "value": "3.5",
                            "percentage": "10"
                        },
                        {
                            "value": "3.8",
                            "percentage": "10"
                        },
                        {
                            "value": "4.1",
                            "percentage": "10"
                        },
                        {
                            "value": "4.4",
                            "percentage": "10"
                        },
                        {
                            "value": "4.7",
                            "percentage": "10"
                        },
                        {
                            "value": "5.0"
                        }
                    ]
                }
            },
            {
                "state": "active",
                "refund_to": "retailer_employee",
                "event": "门店签约分销商",
                "refund_content": "摇一摇",
                "min": "",
                "ceiling": "3",
                "applycount": "",
                "prize_content": [
                    {
                        "refund_content": "固定金额返现",
                        "min": "2",
                        "max": "",
                        "precentage": "3",
                        "timelimit": "4",
                        "applycount": "5"
                    },
                    {
                        "refund_content": "谢谢参与",
                        "min": "",
                        "max": "",
                        "precentage": "3",
                        "timelimit": "4",
                        "applycount": ""
                    },
                    {
                        "refund_content": "随机微信红包",
                        "min": "3",
                        "max": "4",
                        "precentage": "5",
                        "timelimit": "6",
                        "applycount": "3",
                        "probability": {
                            "range": "平台活动1",
                            "time_curve": [],
                            "value_curve": [
                                {
                                    "value": "3.0",
                                    "percentage": "12"
                                },
                                {
                                    "value": "3.1",
                                    "percentage": "8"
                                },
                                {
                                    "value": "3.2",
                                    "percentage": "10"
                                },
                                {
                                    "value": "3.3",
                                    "percentage": "10"
                                },
                                {
                                    "value": "3.4",
                                    "percentage": "10"
                                },
                                {
                                    "value": "3.5",
                                    "percentage": "10"
                                },
                                {
                                    "value": "3.6",
                                    "percentage": "10"
                                },
                                {
                                    "value": "3.7",
                                    "percentage": "10"
                                },
                                {
                                    "value": "3.8",
                                    "percentage": "10"
                                },
                                {
                                    "value": "3.9",
                                    "percentage": "10"
                                },
                                {
                                    "value": "4.0"
                                }
                            ]
                        }
                    }
                ]
            }
        ],


        "propagation": [
            {
                "object": "distributor",
                "activitytitle": "活动标语1",
                "wechattitle": "微信图文消息标题1",
                "poster_url": "http://img6.bdstatic.com/img/image/smallpic/fengjing1201.jpg",
                "propagation": "宣传文案1"
            },
            {
                "object": "retailer",
                "activitytitle": "活动标语2",
                "wechattitle": "微信图文消息标题2",
                "poster_url": "http://img6.bdstatic.com/img/image/smallpic/fengjing1201.jpg",
                "propagation": "宣传文案2"
            },
            {
                "object": "consumer",
                "activitytitle": "活动标语3",
                "wechattitle": "微信图文消息标题3",
                "poster_url": "http://img6.bdstatic.com/img/image/smallpic/fengjing1201.jpg",
                "propagation": "宣传文案3"
            }
        ],
        "releaseset": {
            "optype": "提交审核"
        }
    }
}//if结束*/

//var resdata="";


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
        complete: function (){ $('.loading').fadeOut();addAjax(); },
        success: function (resdata){ console.log(JSON.stringify(resdata, null, 4)); render(resdata);addSubJoint(resdata) },
        error: function (){ console.warn("修改详情 error") }
    });

} else {
    // layer.alert("跳转到修改失败了");
    render(resdata)
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
    basic.find('.latestjointime').val(activity.latestjointime);
    basic.find('.activityTitle').val(activity.activitytitle);
    basic.find('.activityTitle').attr("guid",activity.guid);//0124添加
    basic.find('.tel').val(tel);
    basic.find('.quhao').val(quhao);
//  debugger;
    basic.find('.fzr1 .selected').text(activity.responsible_id.nickname);
    basic.find('.fzr2 .selected').text(activity.responsible2nd_id.nickname);
    
    if(activity.singleselection == 1){
        $('.radio:contains(是)').addClass('on');
    } else {
        $('.radio:contains(否)').addClass('on');
    }


    // 地区
    // debugger
    // $('nav span:eq(1)').click();
    for(var i=0; i<resdata.area_condition.length; i++){

        var area = resdata.area_condition[i];

        // alert(area.charge.state);
        // debugger;
        // console.log(area.charge.state);
        var state = "";
        if(area.charge.state == "active"){
            state = "status on";
        } else {
            state = "status";
        }

        $('.region-wrap').append("<div class='region-item'><div class='row'><div class='provice'><span><em class='shengName' title="+ area.name +">"+ area.name +"</em><i class='x'>&times;</i></span></div><div class='charge'><span><em shengfzr='"+ JSON.stringify(area.charge, null, 4) +"'>"+ area.charge.name +"</em><i class='x'>&times;</i></span></div></div></div>");


        for(var j=0; j<area.city.length; j++){

            if(area.city[j].charge.state == "active"){
                state = "status on";
            } else {
                state = "status";
            }

            $('.region-item').last().append("<div class='row city-wrap'><div class='city city-item'><span><em class='cityName'>"+ area.city[j].name +"</em><i class='x'>&times;</i></span></div><div class='charge'><div class='charge-name'><em shifzr='"+ JSON.stringify(area.city[j].charge, null, 4) +"'>负责人 "+ area.city[j].charge.name +"</em><i class='x'>&times;</i></div><div class='district-wrap'></div></div></div>");


            for(var k=0; k<area.city[j].country.length; k++){

                if(area.city[j].country[k].state == "active"){
                    state = "status on";
                } else {
                    state = "status";
                }

                $('.district-wrap').last().append("<span><em qx='"+ JSON.stringify(area.city[j].country[k], null, 4) +"'>"+ area.city[j].country[k].name +"</em><i class='x'>&times;</i></span>");
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


/*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
//addSubJoint()
function addSubJoint(a){//把之前根据死数据拼接好的js都放到这个函数里，然后上面ajax中调用		
	var _resdata_="";	
		_resdata_=linshi=a;	
//		_resdata_=resdataFix;

	console.log(_resdata_);
	/*增减控件1-会员活动条件拼接*/
	/*移除页面中已经有的addSub1Manger*/
	//$(".addSub1Mange").remove();
	/*开始拼js生成的addSub1Manger*/
	var activityManger_addSub1Data=_resdata_.activity_condition;//_resdata_.activity_condition.activity_itemkind;
	var activityManger_addSub1Html='';
	activityManger_addSub1Html=''
	    +               '<div class="addSub1 addSub1Mange">'                        
	    +                   '<div class="dib acTy ver re">'                         
	    +                       '<div class="select-wrap  acSe1 ba activity mangeStyle">'   
	    +                           '<i></i>'
	    +                           '<em class="selected"></em>'                    
	    +                           '<ul class="select">'
	    +                           '</ul>'
	    +                       '</div>'
	    +                   '</div>         '           
	    +                   '<!--优惠力度条件activity condition-->'
	    +                   '<div class="dib acCo ver">'                        
	    +                       '<div class="dib acCoSc re ver mangeStyle">'
	    +                           '<p class="bor -hi selectWrap1"></p><!--此处把所有的值直接写入-hi中，与西晨取值方式保持一致-->'
	//  +                           '<p class="bor hi -hi selectWrap1">赠品比例</p>'
	//  +                           '<p class="bor hi -hi selectWrap1">套餐价优惠幅度</p>'
	//  +                           '<p class="bor hi -hi selectWrap1">降价幅度</p>'
	    +                       '</div><div class="select-wrap  acCoRe ver re dib acSe3 mangeStyle">'
	    +                           '<i></i>'
	    +                           '<em class="selected"></em>'
	    +                           '<ul class="select">'
	    +                               '<li class="option" name=">=">不低于</li>'
	    +                               '<li class="option" name=">">高于</li>'
	    +                               '<li class="option" name="==">等于</li>   '                       
	    +                           '</ul>'
	    +                       '</div><div class="dib acCoRa ver mangeStyle">'
	    +                           '<div class="bor -hi selectWrap2">'
	    +                               '<input class="bor diInput mangeStyle" type="text" value="" disableds______="disabled"/><span class="diSpan por mangeStyle" ></span>'
	    +                           '</div>'                                
	    +                       '</div>'
	    +                   '</div>'
	    +                   '<!--投放门店数-->'
	    +                   '<div class="dib acPu mds">'                            
	    +                       '<input class="bor acPuI1 mangeStyle" type="text" value="" disableds______="disabled"/><span class="to"></span><input class="bor acPuI2 mangeStyle" type="text"  value="" disableds______="disabled"/><span class="tip">不输入代表不限</span>'
	    +                   '</div>'
	    +                   '<!--添加删除按钮-->'
	    +                   '<div class="acAd dib">'
	    +                       '<span class="minus acAd1 -hi"></span>'
	    +                       '<span class="plus acAd2 hi"></span>'           
	    +                       '<span class="activityManger_addsub1State activityManger_startStop status hi"></span>'              
	    +                   '</div>'
	    +               '</div>';       
	for(i=0;i<activityManger_addSub1Data.length;i++){   
	    // debugger;
	    //插入
	    $(".addSub1").last().before(activityManger_addSub1Html);
	//  /*判断是否是买赠类型，显示隐藏*/
	//  if(activityManger_addSub1Data[i].activitytype=="买赠"||activityManger_addSub1Data[i].activitytype=="满返"){//等待换成买赠对应单词
	//      $(".addSub1Mange:last").find(".discount3 a").removeClass("hi");
	//      $(".addSub1Mange:last").find(".discount3 b").addClass("hi");
	//  }else{
	//      $(".addSub1Mange:last").find(".discount3 a").addClass("hi");
	//      $(".addSub1Mange:last").find(".discount3 b").removeClass("hi");
	//  }
	    //启动图标
	    if(activityManger_addSub1Data[i].state=="active"){
	        $(".addSub1Mange:last").find(".activityManger_addsub1State").addClass("on");        
	    }
	    //套餐降价买赠的等
	    var activitytype_suited_conditon="";
	    /*活动类型*/
	    var activitytype_suited_unit="";
	    $(".addSub1Mange:last").find(".acSe1 .selected").text(activityManger_addSub1Data[i].activitytype);
	    $(".addSub1Mange:last").find(".acSe1 .selected").attr("guid",activityManger_addSub1Data[i].guid);
	    if(activityManger_addSub1Data[i].activitytype=="套餐"){//未完待续，等待其他类型
	        activitytype_suited_conditon="套餐价优惠幅度";
	        activitytype_suited_unit='%';
	    }else if(activityManger_addSub1Data[i].activitytype=="降价"){     
	        activitytype_suited_conditon="降价幅度";
	        activitytype_suited_unit='%';
	    }
	    /*优惠力度条件*/
	    $(".addSub1Mange:last").find(".acCoSc .-hi.selectWrap1").text(activitytype_suited_conditon);
	    if(activityManger_addSub1Data[i].discount.operator==">="){activityManger_addSub1Data[i].discount.operator="不低于"}
	    else if(activityManger_addSub1Data[i].discount.operator=="="){activityManger_addSub1Data[i].discount.operator="等于"}
	    else if(activityManger_addSub1Data[i].discount.operator==">"){activityManger_addSub1Data[i].discount.operator="高于"}
	    $(".addSub1Mange:last").find(".acSe3 .selected").text(activityManger_addSub1Data[i].discount.operator);
	//  //买赠类型（略）
	//  $(".addSub1Mange:last").find(".activityManger_discount .discount3 .a1").text('等待变量');
	//  $(".addSub1Mange:last").find(".activityManger_discount .discount3 .a2").text('等待变量');
	//  $(".addSub1Mange:last").find(".activityManger_discount .discount3 .a3").text('等待变量');
	//  $(".addSub1Mange:last").find(".activityManger_discount .discount3 .a4").text('等待变量');
	    //非买赠类型
	    $(".addSub1Mange:last").find(".acCoRa  input").val(activityManger_addSub1Data[i].discount.min);
	    $(".addSub1Mange:last").find(".acCoRa  span").text(activitytype_suited_unit);
	    /*投放门店数量*/
	    $(".addSub1Mange:last").find(".acPu .acPuI1").val(activityManger_addSub1Data[i].retailer_count.min);
	    $(".addSub1Mange:last").find(".acPu .acPuI2").val(activityManger_addSub1Data[i].retailer_count.max);
	}
	
	
	/*增减控件1-会员活动条件事件*/
	$(document).on('click','.addSub1Mange .activityManger_addsub1State',function(){
	    $(this).toggleClass("on");
	})
	
	
	/*增减控件2-参与会员拼接*/
	/*移去页面中已经有的addSub2Mange*/
	//$(".addSub2Mange").remove();	
	if(!$.isEmptyObject(_resdata_.distributor_condition)&&_resdata_.distributor_condition!=undefined){
	    var activityManger_addSub2Data_distributor=_resdata_.distributor_condition;
	    activityManger_addSub2HtmlFn(activityManger_addSub2Data_distributor,"分销商","家");
	    console.log('分销商')
	}
	if(!$.isEmptyObject(_resdata_.retailer_condtion)&&_resdata_.retailer_condtion!=undefined){
	    var activityManger_addSub2Data_retailer=_resdata_.retailer_condtion;  
	    activityManger_addSub2HtmlFn(activityManger_addSub2Data_retailer,"门店","家");
	    console.log('门店')
	}
	if(!$.isEmptyObject(_resdata_.consumer_condition)&&_resdata_.consumer_condition!=undefined){
	    var activityManger_addSub2Data_consumer=_resdata_.consumer_condition;
	    activityManger_addSub2HtmlFn(activityManger_addSub2Data_consumer,"消费者","人");
	    console.log('消费者')
	}
	function activityManger_addSub2HtmlFn(obj, participants,unit){// participants为参与者，其值为分销商，门店，消费者等    
	    /*开始拼js生成的addSub2Mange*/
	    var activityManger_addSub2Html="";
	    activityManger_addSub2Html=''
	        +           '<div class="addSub2 addSub2Mange">'
	        +               '<div class="member">'
	        +                   '<!--会员类型acLy-->'
	        +                   '<div class="dib acLy ver">'
	        +                       '<div class="select-wrap acSe4 member-type mangeStyle">'
	        +                           '<i></i>'
	        +                           '<em class="selected"></em>'
	        +                           '<ul class="select"></ul>'
	        +                       '</div>'    
	        +                   '</div>'
	        +                   '<div class="dib red vihi" style="">*主办方</div>'
	        +                   '<!--参加名额acMe-->'
	        +                   '<div class="dib acMe" style="margin-left:8px">'
	        +                       '<div class="selectWrap1 -hi">'
	        +                           '<span>'
	        +                               '<input class="bor acMeI1 mangeStyle" type="text" value="" disableds______/><span class="acMeS1">家</span>'
	        +                           '</span><span class="to"></span><span>'
	        +                               '<input class="bor acMeI2 mangeStyle" type="text"  value=""  disableds______/>'
	        +                               '<span class="acMeS2">家</span>'
	        +                           '</span>'
	        +                       '</div>'                                
	        +                   '</div>'
	        +                   '<div class="dib acMeD1 dib" style="margin: 0 4px 0 8px;">不输入代表不限，未达到最低名额，活动不予开始</div>'
	        +                   '<div class="dib acMeD2 dib mangeStyle" style_="border:0;color:black;height:24px;line-height:24px;" >设置参与资格</div>'
	        +                   '<div class="dib acMeD3 dib">不设置代表不限</div>'
	        +                   '<!--添加删除按钮-->'
	        +                   '<div class="acAdB dib">'
	        +                       '<span class="minus acAd1 acAd3 -hi" style_="visibility:hidden"></span>'
	        +                       '<span class="plus acAd2 hi"></span>'
	        +                       '<span class="activityManger_addsub2State activityManger_startStop status hi"></span>'
	        +                   '</div>'
	        +               '</div>'
	        +               '<!--设置参与资格默认隐藏acZige-->'
	        +               '<div class="acZige -hi">'
	        +                   '<div class="addSub3P68">'
	        +                       '<p class="p68 deleP dib">条件类型</p><p class="p68 deleP dib">统计范围</p><p class="p68 deleP dib">条件</p>'             
	        +                   '</div>'
	        +               '<!--控件3放在下面-->'
	        
	        
	        +                   '<div class="addSub3 created_l">'
	        +                       '<!--条件类型-->'
	        +                       '<div class="dib acZige1 ver">'
	        +                           '<div class="select-wrap acSe5 ba condition-type mangeStyle">'
	        +                               '<i></i>'
	        +                               '<em class="selected"></em>'
	        +                               '<ul class="select"></ul>'
	        +                           '</div>'                
	        +                       '</div>'        
	        +                       '<!--统计范围-->'
	        +                       '<div class="dib acZige2 ver" style="margin: 0 4px">'
	        +                           '<div class="select-wrap  acSe6 mangeStyle">'                                       
	        +                               '<i></i>'
	        +                               '<em class="selected"></em>'
	        +                               '<ul class="select">'
	        +                                   '<li class="option">活动开始前</li>'
	        +                                   '<li class="option">活动开始时</li>'
	        +                                   '<li class="option">至今</li>'
	        +                               '</ul>'                                                                 
	        +                           '</div>'
	        +                       '</div>'        
	        +                       '<!--天月or至今-->'
	        +                       '<div class="dib acZige3 ver">'
	        +                           '<div class="acZige3z -hi acZige2tab">'
	        +                               '<p></p>'
	        +                           '</div>'
	        +                           '<!--类型1开始前，内容同类型2-->'
	        +                           '<div class="acZige3a hi acZige2tab n2">'
	        +                               '<input type="text" class="date" />'
	        +                               '<div class="select-wrap  acSe7 dib">'
	        +                                   '<i></i>'
	        +                                   '<em class="selected">天</em>'
	        +                                   '<ul class="select">'
	        +                                       '<li class="option">天</li>'
	        +                                       '<li class="option">月</li>' 
	        +                                   '</ul>'
	        +                               '</div>'                            
	        +                           '</div>'
	        +                           '<!--类型2开始时，内容同类型1-->'
	        +                           '<div class="acZige3a hi acZige2tab n2">'
	        +                               '<input type="text" class="date" />'
	        +                               '<div class="select-wrap  acSe7 dib">'
	        +                                   '<i></i>'
	        +                                   '<em class="selected">天</em>'
	        +                                   '<ul class="select">'
	        +                                       '<li class="option">天</li>'
	        +                                       '<li class="option">月</li>' 
	        +                                   '</ul>'
	        +                               '</div> '                       
	        +                           '</div>'
	        +                           '<!--类型3至今-->'
	        +                           '<div class="acZige3b hi acZige2tab n2">'
	        +                               '<input type="text" class="dib" value="不限" disabled/>'
	        +                               '<p class="dib">- 至今</p>'
	        +                           '</div>'            
	        +                       '</div>'
	        +                       '<!--条件-->'
	        +                       '<!--大于或介于-->'
	        +                       '<div class="dib acZige4 ver" style="margin-left: 8px;">'
	        +                           '<div class="select-wrap  acSe8 mangeStyle">'                                       
	        +                               '<i></i>'
	        +                               '<em class="selected"></em>'
	        +                               '<ul class="select">'
	        +                                   '<li class="option">>=</li>'
	        +                                   '<li class="option">介于</li>'
	        +                               '</ul>'
	        +                           '</div>'                
	        +                       '</div>'
	        +                       '<div class="dib acZige5 ver">'
	        +                           '<!--大于对应的-->'
	        +                           '<div class="-hi acZige5a acZige1Tab acZige4tab mangeStyle">'
	        +                               '<!--最后一个p标签内容随时变-->'
	        +                               '<input type="text" class="min dayudengyu mangeStyle" disableds______/><p class="dib">次</p>'
	        +                           '</div>'    
	        +                           '<!--介于对应的-->'
	        +                           '<div class="-hi hi acZige5c acZige1Tab acZige4tab mangeStyle">'
	        +                               '<!--最后一个p标签内容随时变-->'
	        +                               '<input type="text" class="min jieyu1 mangeStyle" value="" disabled/><p>-</p><input type="text" class="jieyu2 mangeStyle" value="" disableds______/><p class="dib"></p>'
	        +                           '</div>'                                                            
	        +                       '</div>'
	        +                       '<!--添加删除按钮-->'
	        +                       '<div class="acAdC dib">'
	        +                           '<span class="minus-o acAd3 " style="visibility:hidden"></span>'
	        +                           '<span class="plus-o acAd4 -hi"></span>'
	        +                           '<span class="activityManger_addsub3State activityManger_startStop status hi"></span>'
	        +                       '</div>'
	        +                   '</div>'    
	        
	        
	        +                   '<!--活动管理的控件3内容见外面拼接-->'
	        +               '<!--控件3放在上面-->'
	        +               '</div>'
	        +           '</div>';   
	    $('.addSub2:last').before(activityManger_addSub2Html);
//	  debugger;
	    $('.addSub2Mange:last').find(".acSe4 .selected").text(participants);
	    $('.addSub2Mange:last').find(".acMeS1").text(unit);
	    $('.addSub2Mange:last').find(".acMeS2").text(unit);
	    if(obj.number_range){
		    $('.addSub2Mange:last').find(".acMeI1").val(obj.number_range.min);//obj.number_range.min
		    $('.addSub2Mange:last').find(".acMeI2").val(obj.number_range.max);	    	
	    }else{
	    	$('.addSub2Mange:last').find(".acMeI1").attr("disabled","disabled");
	    	$('.addSub2Mange:last').find(".acMeI2").attr("disabled","disabled");
	    }
	    /*主办方*/
	   	$('.red:first').removeClass("vihi");
	    //启动图标  
	    if(obj.state=="active"){
	        $(".addSub2Mange:last").find(".activityManger_addsub2State").addClass("on");
	    }
	    /*增减控件3（控件2内含）-参与会员拼接*///数据沿用addsub2传来的obj  
	    var activityManger_addSub3Html=''
	        +                   '<div class="addSub3 addSub3Mange">'
	        +                       '<!--条件类型-->'
	        +                       '<div class="dib acZige1 ver">'
	        +                           '<div class="select-wrap acSe5 ba condition-type mangeStyle">'
	        +                               '<i></i>'
	        +                               '<em class="selected condition"></em>'
	        +                               '<ul class="select"></ul>'
	        +                           '</div>'
	        +                       '</div>'        
	        +                       '<!--统计范围-->'
	        +                       '<div class="dib acZige2 ver" style="margin: 0 4px">'
	        +                           '<div class="select-wrap  acSe6 mangeStyle">'                                       
	        +                               '<i></i>'
	        +                               '<em class="selected"></em>'
	        +                               '<ul class="select">'
	        +                                   '<li class="option">活动开始前</li>'
	        +                                   '<li class="option">活动开始时</li>'
	        +                                   '<li class="option">至今</li>'
	        +                               '</ul>'                                                                 
	        +                           '</div>'
	        +                       '</div>'        
	        +                       '<!--天月or至今-->'
	        +                       '<div class="dib acZige3 ver">'
	        +                           '<div class="acZige3z -hi acZige2tab">'
	        +                               '<p></p>'
	        +                           '</div>'
	        +                           '<!--类型1开始前，内容同类型2-->'
	        +                           '<div class="acZige3a hi acZige2tab n2">'
	        +                               '<input type="text" class="date" />'
	        +                               '<div class="select-wrap  acSe7 dib">'
	        +                                   '<i></i>'
	        +                                   '<em class="selected">天</em>'
	        +                                   '<ul class="select">'
	        +                                       '<li class="option">天</li>'
	        +                                       '<li class="option">月</li>' 
	        +                                   '</ul>'
	        +                               '</div>'                            
	        +                           '</div>'
	        +                           '<!--类型2开始时，内容同类型1-->'
	        +                           '<div class="acZige3a hi acZige2tab n2">'
	        +                               '<input type="text" class="date" />'
	        +                               '<div class="select-wrap  acSe7 dib">'
	        +                                   '<i></i>'
	        +                                   '<em class="selected">天</em>'
	        +                                   '<ul class="select">'
	        +                                       '<li class="option">天</li>'
	        +                                       '<li class="option">月</li>' 
	        +                                   '</ul>'
	        +                               '</div> '                       
	        +                           '</div>'
	        +                           '<!--类型3至今-->'
	        +                           '<div class="acZige3b hi acZige2tab n2">'
	        +                               '<input type="text" class="dib" value="不限" disabled/>'      
	        +                               '<p class="dib">- 至今</p>'
	        +                           '</div>'            
	        +                       '</div>'
	        +                       '<!--条件-->'
	        +                       '<!--大于或介于-->'
	        +                       '<div class="dib acZige4 ver" style="margin-left: 8px">'
	        +                           '<div class="select-wrap  acSe8 mangeStyle">'                                       
	        +                               '<i></i>'
	        +                               '<em class="selected"></em>'
	        +                               '<ul class="select">'
	        +                                   '<li class="option">>=</li>'
	        +                                   '<li class="option">介于</li>'
	        +                               '</ul>'
	        +                           '</div>'                
	        +                       '</div>'
	        +                       '<div class="dib acZige5 ver" style="margin: 0 4px">'
	        +                           '<!--大于对应的-->'
	        +                           '<div class="-hi acZige5a acZige1Tab acZige4tab mangeStyle">'
	        +                               '<!--最后一个p标签内容随时变-->'
	        +                               '<input type="text" class="min dayudengyu mangeStyle" disableds______/><p class="dib">次</p>'
	        +                           '</div>'    
	        +                           '<!--介于对应的-->'
	        +                           '<div class="-hi hi acZige5c acZige1Tab acZige4tab mangeStyle">'
	        +                               '<!--最后一个p标签内容随时变-->'
	        +                               '<input type="text" class="min jieyu1 mangeStyle" value="" disableds______/><p>-</p><input type="text" class="jieyu2 mangeStyle" value="" disableds______/><p class="dib"></p>'
	        +                           '</div>'                                                            
	        +                       '</div>'
	        +                       '<!--添加删除按钮-->'
	        +                       '<div class="acAdC dib">'
	        +                           '<span class="minus-o acAd3 -hi" style_="visibility:hidden"></span>'
	        +                           '<span class="plus-o acAd4 hi"></span>'
	        +                           '<span class="activityManger_addsub3State activityManger_startStop status hi"></span>'
	        +                       '</div>'
	        +                   '</div>'    
	    for (key in obj){
//	        	debugger;
	        switch(key){//等待补充case
	            case '核销次数' : activityManger_addSub3HtmlFn('核销次数');break;
	            case '核销人数' : activityManger_addSub3HtmlFn('核销人数');break;
	            case '惠粉数' : activityManger_addSub3HtmlFn('惠粉数');break;
	            case '粉丝留存率' : activityManger_addSub3HtmlFn('粉丝留存率');break;
	            case '会员时长' : activityManger_addSub3HtmlFn('会员时长');break;
	            case '会员等级' : activityManger_addSub3HtmlFn('会员等级');break;
	            case '' : activityManger_addSub3HtmlFn('核销次数');break;//别忘去掉。
	        }
	        function activityManger_addSub3HtmlFn(a){
	            $('.addSub2Mange:last .acZige .addSub3').last().before(activityManger_addSub3Html);
	            console.log(key)
	            /*条件类型*/
	            $('.addSub3Mange:last').find(".acSe5 em").text(a);//
	            $('.addSub3Mange:last').find(".acSe5 em").attr("guid",obj[key].guid);//
	            /*统计范围*/
	            $('.addSub3Mange:last .acZige2tab').addClass("hi");//0119把.acZige2tab.n2改为.acZige2tab
	            //两种类型，至今或者活动开始前
	            if(obj[key].statisticrange!="至今"){
	                if(obj[key].statisticrange=="活动开始时"){
	                    $('.addSub3Mange:last .acZige3a:eq(0)').removeClass("hi");
	                }else if(obj[key].statisticrange=="活动开始前"){
	                    $('.addSub3Mange:last .acZige3a:eq(1)').removeClass("hi");
	                }else if(obj[key].statisticrange==""){//先认为空就是活动开始时，稍后继续处理
	                		$('.addSub3Mange:last .acZige3a:eq(0)').removeClass("hi");
	                }
	                /*0123添加假数据开始*/	               
	               /* obj[key].statisticrange="ajax匹词空";
	                obj[key].begintime="2017-01-19 23:59:59";	                
	                obj[key].operator="between";
	                obj[key].min="1";
	                obj[key].max="2";	                
	                obj[key].statisticrange="活动开始前";
	                obj[key].timeunit="天";
	                obj[key].guid="7097e5b33e0f4944897240d008bb2f81";*/
	                /*0123添加假数据结束*/
	                $('.addSub3Mange:last').find(".acSe6 em").text(obj[key].statisticrange);//活动开始前     
	                console.log(_resdata_.activity.begintime,obj[key].begintime)
	//              debugger
	                var bgt1_ = new Date(_resdata_.activity.begintime) * 1;
	                var bgt2_ = new Date(obj[key].begintime) * 1;
	                console.log(bgt1_,bgt2_)
	                var preDays_ = parseInt((bgt1_ - bgt2_) / 86400000);
	                var preMonths_=parseInt(preDays_/30);               
	                $('.addSub3Mange:last .acZige3a').find("input").val(obj[key].timeunit=="天"?preDays_:preMonths_);//数字
	                $('.addSub3Mange:last .acZige3a').find(".acSe7 em").text(obj[key].timeunit);//天/月
	            }else{
	                $('.addSub3Mange:last .acZige3b').removeClass("hi");        
	                $('.addSub3Mange:last').find(".acSe6 em").text(obj[key].statisticrange);//至今
	                var addSub3MangeAcZige3b=obj[key].begintime?obj[key].begintime:"不限";
	                $('.addSub3Mange:last .acZige3b').find("input").val(addSub3MangeAcZige3b);//至今      
	            }
	            /*条件*/
	            var operator="";
	            if(obj[key].operator=="between"){
	                obj[key].operator="介于"
	            }
	            $('.addSub3Mange:last').find(".acSe8 em").text(obj[key].operator);//大于或介于
	            //两种类型介于或者大于对应不同
	            $('.addSub3Mange:last .acZige4tab').addClass("hi");
	            if(obj[key].operator==">="){//注意上面把between换成了介于
	                $('.addSub3Mange:last .acZige5a').removeClass("hi");
	                $('.addSub3Mange:last').find(".acZige5a input").val(obj[key].min);
	            }else{
	                $('.addSub3Mange:last .acZige5c').removeClass("hi");    
	                
	                $('.addSub3Mange:last').find(".acZige5 .jieyu1").val(obj[key].min);
	                $('.addSub3Mange:last').find(".acZige5 .jieyu2").val(obj[key].max);
	            }
	            /*启停按钮*/
	            //启动图标  
	            if(obj[key].state=="active"){
	                $(".addSub3Mange:last").find(".activityManger_addsub3State").addClass("on");
	            }           
	            
	        }
	    }   
	}
	
	/*增减控件2-参与会员事件*/
	$(document).on('click','.addSub2Mange .activityManger_addsub2State',function(){
	    $(this).toggleClass("on");
	})
	/*增减控件3-参与会员事件*/
	$(document).on('click','.addSub3Mange .activityManger_addsub3State',function(){
	    $(this).toggleClass("on");
	})
	
	
	/*增减控件4-活动补贴*/
	//$(".addSub4Mange").remove();
	var activityManger_addSub4Data=_resdata_.event_handler_list;
	var activityManger_addSub4Html='';
	activityManger_addSub4Html=''
	        +       '<div class="addSub4 addSub4Mange">'
	        +           '<!--等待更改下面的类名acTy-->'
	        +           '<div class="dib hdc1 ver re">'
	        +               '<div class="select-wrap acSe9 ba butie-select-wrap mangeStyle">'
	        +                   '<i></i>'
	        +                   '<em class="selected"></em>'
	        +                   '<ul class="select"></ul>'
	        +               '</div>'
	        +           '</div>'
	        +           '<!--等待更改下面的类名acTy-->'
	        +           '<div class="dib hdc2 ver re">'
	        +               '<div class="select-wrap  acSe10 ba mangeStyle">'
	        +                   '<i></i>'
	        +                   '<em class="selected"></em>'
	        +                   '<ul class="select"></ul>'
	        +               '</div>'
	        +           '</div>'
	        +           '<!--等待更改下面的类名acTy-->'
	        +           '<div class="dib hdc3 ver re">'
	        +               '<div class="select-wrap  acSe11 ba mangeStyle">'                       
	        +                   '<i></i>'
	        +                   '<em class="selected"></em>'
	        +                   '<ul class="select"></ul>'
	        +               '</div>'
	        +           '</div>'
	        +           '<!--等待更改下面的类名acTy-->'
	        //这段代码最终放弃，而被注释掉，所以下次要保持高度一致！才可以沿用一套逻辑。
	//      +           '<div class="dib hdc4 ver re">'                     
	//      +               '<div class="acSe12 ba">'
	//      +           '<!--范围值-->'
	//      +           '<!--*****来自cg随机积分或金额******-->'
	//      +           '<div class="dib -hi hdc4d1 addsub4_fanweizhi1 addsub4_fanweizhi mangeStyle">'
	//      +               '<input type="text" placeholder="" class="hdc4In1 dib mangeStyle" style="width: 33px;"><span class="dib  ba hdc4P1 mangeStyle" style="display: block;">-</span><input type="text" placeholder="" class="hdc4In2 dib mangeStyle" style="display: block;"><p class="dib hdc4dA ba hdc4P2 mangeStyle">分/次</p><!--即将被替代为别的单位-->'
	//      +           '</div>'                    
	//      +           '<!--******来自cg固定积分或金额*******-->'
	//      +           '<div class="dib -hi hdc4d1 addsub4_fanweizhi2 addsub4_fanweizhi mangeStyle">'
	//      +               '<input type="text" placeholder="" class="hdc4In1 dib mangeStyle" style="width: 112px;"><span class="dib  ba hdc4P1 " style="display: none;">-</span><input type="text" placeholder="" class="hdc4In2 dib" style="display: none;"><p class="dib hdc4dA ba hdc4P2 mangeStyle">分/次</p>'
	//      +           '</div>'
	//      +           '<!--来自旧的范围值是链接，用于摇一摇等-->'      
	//      +                   '<div class="dib hi hdc4d2 link addsub4_fanweizhi3 addsub4_fanweizhi">'
	//      +                       '<a href="#" class="dib hdc4dB ver set"></a>'
	//      +                   '</div>'
	//      +               '</div>'
	//      +           '</div>'
	        +           '<div class="dib hdc4 ver re">'
	        +               '<!-- <p class="p68 deleP">范围/值<i class="i">i</i></p> -->'
	        +               '<div class="acSe12 ba">'                       
	        +                    '<!-- <div class="dib -hi hdc4d1">'
	        +                       '<input type="text" placeholder="请输入"/>'                        
	        +                       '<p class="dib hdc4dA ba">分/次</p>'
	        +                   '</div> -->'
	        +                   '<div class="dib -hi hdc4d1">'
	        +                       '<input type="text" placeholder="" class="hdc4In1 dib" /><span class="dib  ba hdc4P1">-</span><input type="text" placeholder="" class="hdc4In2 dib" /><p class="dib hdc4dA ba hdc4P2"></p><!--即将被替代为别的单位-->'
	        +                   '</div>'
	        +                   '<div class="dib hi hdc4d2 link">'
	        +                       '<a href="#" class="dib hdc4dB ver set"></a>'
	        +												'<input type="hidden" class="y1y">'
	        +                   '</div>'
	        +               '</div>'
	        +           '</div>'
	        +           '<!--等待更改下面的类名acTy-->'
	        +           '<div class="dib hdc5 ver re">'
	        +               '<div class="acSe13 ba mangeStyle">'                        
	        +                   '<input type="text" class="mangeStyle" />'
	        +               '</div>'
	        +           '</div>'
	        +           '<!--补贴峰值-->'
	        +           '<div class="dib hdc6 ver re fz ">'
	        +               '<div class="acSe14 ba btfz mangeStyle">'                       
	        +                   '<input type="text" disabled class="mangeStyle"/>'
	        +                   '<p class="dib"></p><!--即将被替代为别的单位-->'
	        +               '</div>'
	        +           '</div>'
	        +           '<!--申报预算-->'
	        +           '<div class="dib hdc6 hdc6-1 ver re mangeStyle">'
	        +               '<div class="acSe14 ba btfz ">'                     
	        +                   '<input type="text" class="sbys " />'
	        +                   '<p class="dib ">元</p><!--即将被替代为别的单位-->'
	        +               '</div>'
	        +           '</div>'
	        +           '<div class="dib hdc7 setgailv">设置<br>概率<input type="hidden" class="gl" value=""></div>'//第1个就加类名glHidden1,把json串存入value中
	        +           '<div class="dib hdc8 setRules">设置<br>规则<input type="hidden" class="gz" value=""></div>'//第1个就加类名gzHidden1,把json串存入value中
	        +           '<!--添加删除按钮-->'
	        +           '<div class="hdc9 acAd dib">'
	        +               '<img src="img/minus.png" alt="" class="acAd1" style_="visibility:hidden;"/>'
	        +               '<img src="img/plus.png" alt="" class="acAd2 hi" />'        
	        +               '<span class="activityManger_addsub4State activityManger_startStop status hi"></span>'
	        +           '</div>'
	        +       '</div>';
	for(i=0;i<activityManger_addSub4Data.length;i++){
	    $('.addSub4:last').before(activityManger_addSub4Html);
	    /*补贴对象补贴条件补贴形式翻译*/
	    var btduixiang = "";
	    // debugger;
	    switch(activityManger_addSub4Data[i].refund_to){
	
	        case "distributor":
	            btduixiang = '分销商';
	            break;
	
	        case "distributor_employee":
	            btduixiang = '分销商业务员';
	            break;
	
	        case "retailer":
	            btduixiang = '门店';
	            break;
	
	        case "retailer_employee":
	            btduixiang = '门店店员';
	            break;
	
	        case "consumer":
	            btduixiang = '消费者';
	            break;
	
	    }
	
	    var btCond = activityManger_addSub4Data[i].event;
	    switch(activityManger_addSub4Data[i].event){//兼容，将英文转为中文，若本身是中文则可注释掉可不注释掉
	
	        case "distributorinviteretailer":
	            btCond = '门店签约分销商';
	            break;
	
	        case "register":
	            btCond = '注册';
	            break;
	
	        case "invitefan":
	            btCond = '成功邀请朋友关注';
	            break;
	
	        case "verify":
	            btCond = '首次核销?';
	            break;
	
	        case "verify_first":
	            btCond = '首次核销';
	            break;
	
	        case "verify_normal":
	            btCond = '非首次核销';
	            break;
	
	        case "shareverify":
	            btCond = '分享核销结果';
	            break;
	
	        case "shareticket":
	            btCond = '分享超惠券';
	            break;
	
	        case "shareretailer":
	            btCond = '分享门店';
	            break;
	
	        case "openretailer":
	            btCond = '自主开店';
	            break;
	
	        case "openmemsys":
	            btCond = '开通会员系统';
	            break;
	
	    }
	
	    var btType = activityManger_addSub4Data[i].refund_content;
	    switch(activityManger_addSub4Data[i].refund_content){//同上
	
	        case "randompoints":
	            btType = '随机积分';
	            break;
	
	        case "fixedpoints":
	            btType = '固定积分';
	            break;
	
	        case "fixedmoney":
	            btType = '固定金额';
	            break;
	
	        case "randommoney":
	            btType = '随机金额';
	            break;
	
	        case "randommoney":
	            btType = '随机金额';
	            break;
	
	        case "randomredpacket":
	            btType = '随机微信红包';
	            break;
	
	        case "fixedredpacket":
	            btType = '固定微信红包';
	            break;
	
	        case "randommoneyticket":
	            btType = '随机金额返现券';
	            break;
	    }
	    /*处理是否有单位字段*/
	    if(activityManger_addSub4Data[i].unit==""||activityManger_addSub4Data[i].unit==undefined){
	    	if(btType.indexOf("元")!=-1||btType.indexOf("金额")!=-1||btType.indexOf("红包")!=-1){
	    		activityManger_addSub4Data[i].unit="元";
	    	}else if(btType.indexOf("分")!=-1){
	    		activityManger_addSub4Data[i].unit="分";
	    	}else if(btType.indexOf("摇一摇")!=-1){
	    		activityManger_addSub4Data[i].unit="次";
	    	}
	    }	
	    /*补贴对象*/
	    $(".addSub4Mange:last").find(".acSe9 .selected").text(btduixiang)
	    .attr('name',activityManger_addSub4Data[i].refund_to)
	    .attr('guid',activityManger_addSub4Data[i].guid);
	    // $(".addSub4Mange:last").find(".acSe9 .selected").text(btduixiang);
	    
	    /*补贴条件*/
	//  $(".addSub4Mange:last").find(".acSe10 .selected").text(activityManger_addSub4Data[i].event);
	    $(".addSub4Mange:last").find(".acSe10 .selected").text(btCond);
	
	    /*补贴形式*/
	//  $(".addSub4Mange:last").find(".acSe11 .selected").text(activityManger_addSub4Data[i].refund_content);
	    $(".addSub4Mange:last").find(".acSe11 .selected").text(btType);
	
	    if(btType.indexOf('随机') != -1){
	        $(".addSub4Mange:last").find('.setgailv').addClass('on');
	    }
	
	    /*三种类型的范围值*/
	//  $(".addSub4Mange:last").find(".addsub4_fanweizhi").addClass("hi");  
	//  if(activityManger_addSub4Data[i].max&&activityManger_addSub4Data[i].min){
	//      $(".addSub4Mange:last").find(".addsub4_fanweizhi1").removeClass("hi");
	//      $(".addSub4Mange:last").find(".addsub4_fanweizhi1 .hdc4In1").val(activityManger_addSub4Data[i].min);
	//      $(".addSub4Mange:last").find(".addsub4_fanweizhi1 .hdc4In2").val(activityManger_addSub4Data[i].max);
	//      $(".addSub4Mange:last").find(".addsub4_fanweizhi1 .hdc4P2").text(activityManger_addSub4Data[i].unit);
	//  }else if(activityManger_addSub4Data[i].max||activityManger_addSub4Data[i].min){
	//      $(".addSub4Mange:last").find(".addsub4_fanweizhi2").removeClass("hi");
	//      $(".addSub4Mange:last").find(".addsub4_fanweizhi2 .hdc4In1").val(activityManger_addSub4Data[i].min);
	//      $(".addSub4Mange:last").find(".addsub4_fanweizhi2 .hdc4P2").val(activityManger_addSub4Data[i].unit);
	//  }else{//摇一摇
	//      $(".addSub4Mange:last").find(".addsub4_fanweizhi3").removeClass("hi");
	//      $(".addSub4Mange:last").find(".addsub4_fanweizhi3").text("有相关字段的时候，改变这里");      
	//  }
	
	    if(activityManger_addSub4Data[i].refund_content!="摇一摇"){//shake
	//      debugger
	        $(".addSub4Mange:last").find(".hdc4d1").removeClass('hi');
	        $(".addSub4Mange:last").find(".hdc4d2").addClass('hi'); 
	        $(".addSub4Mange:last").find(".acSe12 .hdc4In1").val(activityManger_addSub4Data[i].min);
	        $(".addSub4Mange:last").find(".acSe12 .hdc4In2").val(activityManger_addSub4Data[i].max);
	        $(".addSub4Mange:last").find(".acSe12 .hdc4P2").text(activityManger_addSub4Data[i].unit);
	        if(btType.indexOf("随机")<0){
	            $(".addSub4Mange:last").find(".acSe12 .hdc4In2").addClass("hi");
	            $(".addSub4Mange:last").find(".acSe12 .hdc4P1").addClass("hi");
	            
	        }       
	    }else if(activityManger_addSub4Data[i].refund_content=="摇一摇"){
	        $(".addSub4Mange:last").find(".hdc4d2").removeClass('hi');
	        $(".addSub4Mange:last").find(".hdc4d1").addClass('hi');     
	        $(".addSub4Mange:last").find(".hdc4dB").addClass("set").text("次")
	    }
	
	    /*发放上限*/
	    $(".activityManger_issueCeil:last").text(activityManger_addSub4Data[i].ceiling);
	
	    /*补贴峰值*/
	    $(".addSub4Mange:last").find(".acSe13 input").val(activityManger_addSub4Data[i].ceiling);
	    var subsidyTopValue=activityManger_addSub4Data[i].max?activityManger_addSub4Data[i].max:activityManger_addSub4Data[i].min;
	    $(".addSub4Mange:last").find(".acSe14:eq(0) input").val(subsidyTopValue*activityManger_addSub4Data[i].ceiling);
			$(".addSub4Mange:last").find(".acSe14:eq(0) p").text(activityManger_addSub4Data[i].unit);//单位
	    /*申报预算*/
	    $(".addSub4Mange:last").find(".acSe14:eq(1) input").val(activityManger_addSub4Data[i].applycount); 
	    $(".addSub4Mange:last").find(".acSe14:eq(1) p").text(activityManger_addSub4Data[i].unit);//单位
			/*设置摇一摇*/
			if(activityManger_addSub4Data[i].prize_content){
				var addSub4MangeYaoyiyao=JSON.stringify(activityManger_addSub4Data[i].prize_content, null, 4);
				$(".addSub4Mange:last").find(".hdc4d2 .y1y").val(addSub4MangeYaoyiyao);   
			}
			 $(".addSub4Mange:last").find(".hdc4d2 .y1y").addClass("y1yHidden"+(i+1));
	    /*设置概率*/
	    if(activityManger_addSub4Data[i].probability){//prize_content
	    		var addSub4MangeProbability=JSON.stringify(activityManger_addSub4Data[i].probability, null, 4);
	    		$(".addSub4Mange:last").find(".hdc7 .gl").val(addSub4MangeProbability);   
	    }
	    $(".addSub4Mange:last").find(".hdc7 .gl").addClass("glHidden"+(i+1));
	
	    /*设置规则*/
	    if(activityManger_addSub4Data[i].limit){
	        var addSub4MangeLimit=JSON.stringify(activityManger_addSub4Data[i].limit, null, 4);
	        $(".addSub4Mange:last").find(".hdc8 .gz").val(addSub4MangeLimit);
	    }
	    $(".addSub4Mange:last").find(".hdc8 .gz").addClass("gzHidden"+(i+1));
	
	    /*启停按钮*/
	    if(activityManger_addSub4Data[i].state=="active"){
	        $(".addSub4Mange:last").find(".activityManger_addsub4State").addClass("on");
	    }
	}
	
	
	/*增减控件4-参与会员事件*/
	$(document).on('click','.addSub4Mange .activityManger_addsub4State',function(){
	    $(this).toggleClass("on");
	})
	
//	/*增减控件5摇一摇拼接*/
//	var deng_yaoYiYaoDate={
//	  "subsidymethod": [
//	    {
//	      "localtype": "refund_content",
//	      "category": "积分",
//	      "showtype": "random",
//	      "unit": "分",
//	      "state": "active",
//	      "min": "1",
//	      "max": "3",
//	      "gailv": "10",
//	      "jiangpincishu": "10",
//	      "ceiling": "4",
//	      "applycount": "23"
//	    },
//	    {
//	      "localtype": "固定积分",
//	      "category": "积分",
//	      "showtype": "fixed",
//	      "unit": "分",
//	      "state": "active",
//	      "min": "1",
//	      "max": "3",
//	      "gailv": "10",
//	      "jiangpincishu": "10",
//	      "ceiling": "4",
//	      "applycount": "23"
//	    },
//	    {
//	      "localtype": "固定金额",
//	      "category": "现金",
//	      "showtype": "fixed",
//	      "unit": "元",
//	      "state": "active",
//	      "min": "1",
//	      "max": "3",
//	      "gailv": "10",
//	      "jiangpincishu": "10",
//	      "ceiling": "4",
//	      "applycount": "23"
//	    },
//	    {
//	      "localtype": "随机金额",
//	      "category": "现金",
//	      "showtype": "random",
//	      "unit": "元",
//	      "state": "active",
//	      "min": "1",
//	      "max": "3",
//	      "gailv": "10",
//	      "jiangpincishu": "10",
//	      "ceiling": "4",
//	      "applycount": "23"
//	    },
//	    {
//	      "localtype": "随机微信红包",
//	      "category": "红包",
//	      "showtype": "random",
//	      "unit": "元",
//	      "state": "active",
//	      "min": "1",
//	      "max": "3",
//	      "gailv": "10",
//	      "jiangpincishu": "10",
//	      "ceiling": "4",
//	      "applycount": "23"
//	    },
//	    {
//	      "localtype": "固定微信红包",
//	      "category": "红包",
//	      "showtype": "fixed",
//	      "unit": "元",
//	      "state": "active",
//	      "min": "1",
//	      "max": "3",
//	      "gailv": "10",
//	      "jiangpincishu": "10",
//	      "ceiling": "4",
//	      "applycount": "23"
//	    },
//	    {
//	      "localtype": "固定金额返现券",
//	      "category": "返现券",
//	      "showtype": "fixed",
//	      "unit": "元",
//	      "state": "active",
//	      "min": "1",
//	      "max": "3",
//	      "gailv": "10",
//	      "jiangpincishu": "10",
//	      "ceiling": "4",
//	      "applycount": "23"
//	    },
//	    {
//	      "localtype": "随机金额返现券",
//	      "category": "返现券",
//	      "showtype": "random",
//	      "unit": "元",
//	      "state": "active",
//	      "min": "1",
//	      "max": "3",
//	      "gailv": "10",
//	      "jiangpincishu": "10",
//	      "ceiling": "4",
//	      "applycount": "23"
//	    },
//	    {
//	      "localtype": "摇一摇",
//	      "category": "摇一摇",
//	      "showtype": "compose",
//	      "unit": "次",
//	      "state": "active",
//	      "min": "1",
//	      "max": "3",
//	      "gailv": "10",
//	      "jiangpincishu": "10",
//	      "ceiling": "4",
//	      "applycount": "23"
//	    }
//	  ]
//	}
//	//var activityManger_addSub5Data=_resdata_.等待字段;
//	var activityManger_addSub5Data=deng_yaoYiYaoDate.subsidymethod;//有字段的时候修改这个就ok
//	var activityManger_addSub5Html=''
//	        +           '<div class="yaoyiyao addSub5 addSub5Mange">'
//	        +               '<div class="dib Yyy1 ver re">'                     
//	        +                   '<div class="select-wrap acSe15 ba">'
//	        +                       '<i></i>'
//	        +                       '<em class="selected"></em>'
//	        +                       '<ul class="select">'
//	        +                           '<li class="option">静谢谢参与</li>'
//	        +                           '<li class="option">静微信手气红包</li>'
//	        +                           '<li class="option">静随机金额返现券</li>'
//	        +                           '<li class="option">静固定积分</li>'                                 
//	        +                       '</ul>'
//	        +                   '</div>'
//	        +               '</div>'
//	        +               '<div class="dib Yyy2 ver re">'
//	        +                   '<div class="acSe16 ba">'       
//	        +                       '<div class="dib -hi Yyy2d1 ver">'
//	        +                           '<input type="text" placeholder="请输入" class="dib min"/>'
//	        +                           '<span>-</span>'
//	        +                           '<input type="text" placeholder="请输入" class="dib max"/>'
//	        +                           '<p class="dib hdc4dA ba fr"></p>'
//	        +                       '</div>'
//	        +                       '<div class="dib hi Yyy2d2">'
//	        +                           '<a href="#" class="dib hdc4dB ver"></a>'
//	        +                       '</div>'
//	        +                       '<div class="dib hi Yyy2d3">'
//	        +                       '</div>'
//	        +                   '</div>'
//	        +               '</div>'
//	        +               '<div class="dib Yyy3 ver re">'                         
//	        +                   '<div class="dib Yyy3d1 ver">'
//	        +                       '<input type="text" value=""/>'
//	        +                       '<span>%</span>'
//	        +                   '</div>'
//	        +               '</div>'    
//	        +               '<div class="dib Yyy4 ver re">'                         
//	        +                   '<div class="dib Yyy4d1 ver">'
//	        +                       '<input type="text" />'
//	        +                       '<span>次</span>'
//	        +                   '</div>'
//	        +               '</div>'
//	        +               '<div class="dib Yyy5 ver re">'                         
//	        +                   '<div class="dib -hi Yyy5d1 ver fz">'
//	        +                       '<input type="text" value="" class="dib"/>'                     
//	        +                       '<span class="dib ba"></span>'
//	        +                   '</div>'
//	        +                   '<div class="dib hi Yyy5d2">'
//	        +                   '</div>'
//	        +               '</div>'
//	        +               '<div class="dib Yyy5-1 ver re">'                           
//	        +                   '<div class="dib -hi Yyy5d1 ver">'
//	        +                       '<input type="text" value="" class="dib"/>'                     
//	        +                       '<span class="dib ba">元</span>'
//	        +                   '</div>'
//	        +                   '<div class="dib hi Yyy5d2">'                                   
//	        +                   '</div>'
//	        +               '</div>'
//	        +               '<div class="dib Yyy6 setgailv">设置概率</div>'
//	        +               '<!--添加删除按钮-->'
//	        +               '<div class="dib acAdE Yyy7 ver">'
//	        +                   '<img src="img/minus.png" height="32" width="32" alt="" class="acAd1"/>'
//	        +                   '<img src="img/plus.png" height="32" width="32" alt="" class="acAd2 hi" />'             
//	        +               '</div>'
//	        +           '</div>';
//	for(i=0;i<activityManger_addSub5Data.length;i++){   
//	    if(activityManger_addSub5Data[i].localtype!="摇一摇"){//等待字段更新，可能会是refund_content，shake
//	        $(".addSub5:last").before(activityManger_addSub5Html);      
//	        //处理单位  
//	        if(activityManger_addSub5Data[i].localtype.indexOf("分")>0){
//	            activityManger_addSub5Data[i].unit="分";
//	        }else{
//	            activityManger_addSub5Data[i].unit="元";
//	        }
//	        //范围值
//	        $(".addSub5Mange:last").find(".Yyy2d1").removeClass('hi');
//	        $(".addSub5Mange:last").find(".Yyy2d2").addClass('hi'); 
//	        $(".addSub5Mange:last").find(".Yyy2d1 .min").val(activityManger_addSub5Data[i].min);
//	        $(".addSub5Mange:last").find(".Yyy2d1 .max").val(activityManger_addSub5Data[i].max);
//	        $(".addSub5Mange:last").find(".Yyy2d1 .hdc4dA").text(activityManger_addSub5Data[i].unit);
//	        if(activityManger_addSub5Data[i].localtype.indexOf("随机")<0){//处理2种形式的范围值
//	            $(".addSub5Mange:last").find(".Yyy2d1 .max").addClass("hi");
//	            $(".addSub5Mange:last").find(".Yyy2d1 span").addClass("hi");            
//	        }       
//	    }
//	
//	    $(".addSub5Mange:last").find(".acSe15 em").text(activityManger_addSub5Data[i].localtype);
//	    $(".addSub5Mange:last").find(".acSe16 .min").val(activityManger_addSub5Data[i].min);//范围值
//	    $(".addSub5Mange:last").find(".acSe16 .max").val(activityManger_addSub5Data[i].max);//范围值
//	    $(".addSub5Mange:last").find(".Yyy3d1 input").val(activityManger_addSub5Data[i].gailv);//摇一摇概率
//	    $(".addSub5Mange:last").find(".Yyy4d1 input").val(activityManger_addSub5Data[i].jiangpincishu);//奖品次数
//	    $(".addSub5Mange:last").find(".Yyy5d1 input").val(activityManger_addSub5Data[i].ceiling);//补贴峰值
//	    $(".addSub5Mange:last").find(".Yyy5-1 input").val(activityManger_addSub5Data[i].applycount);//申报预算
//	    
//	    
//	}
//	
//	        
	        
	/*备注:数据activity_condition下product_category暂时不作处理*/
	$("*").removeClass("mangeStyle");
//	$(".addSub4Mange input").removeAttr("disabled");
//	$(".addSub3Mange input").removeAttr("disabled");
//	$(".addSub2Mange input").removeAttr("disabled");
//	$(".addSub1Mange input").removeAttr("disabled");
	/*只保留有数据的控件，加号再其后*/
	if(location.href.indexOf("activityModify.html")>0){         
	    //控件1
	    if($(".addSub1Mange").length>0){
		    $(".addSub1.created_l").remove();//去除页面初始的addSub1	    	
	    }
//	    $(".addSub1Mange:last").find(".acAd1").css("visibility","hidden");//最后一个控件减号隐藏
	    $(".addSub1Mange:last").find(".acAd2").removeClass("hi");//最后一个控件加号显示
	    //控件2
	    //去除页面初始的addSub2,见add.js中'//控件4参与活动条件'上方代码$(".addSub2.created_l").remove();
	    //因为控件2和控件1的html拼接方式不同，所以这里移除方式也不同
//	    $(".addSub2Mange:last").find(".acAd1").css("visibility","hidden");//最后一个控件减号隐藏
	    $(".addSub2Mange:last").find(".acAd2").removeClass("hi");//最后一个控件加号显示
	    //控件3
	    //时刻记住，我是在控件2里的
	    $(".addSub2Mange").each(function(){
		    if($(this).find(".addSub3Mange").length>0){
			   $(this).find(".addSub3.created_l").remove();
		    }  	
	    })

//	    $(".addSub2Mange").find(".addSub3Mange:last").find(".acAd3").css("visibility","hidden");//最后一个控件减号隐藏
	    $(".addSub2Mange").find(".addSub3Mange:last").find(".acAd4").removeClass("hi");//最后一个控件加号显示
	    //控件4
	    //去除页面初始的addSub4,见add.js中'// 控件5摇一摇'上方代码$(".addSub4.created_l").remove();
//	    $(".addSub4Mange:last").find(".acAd1").css("visibility","hidden");//最后一个控件减号隐藏
	    $(".addSub4Mange:last").find(".acAd2").removeClass("hi");//最后一个控件加号显示   
	    //控件5//等待和西晨商量，是否要变换布局。
	    //等待清空
//	    $(".addSub5Mange:last").find(".acAd1").css("visibility","hidden");//最后一个控件减号隐藏
	    $(".addSub5Mange:last").find(".acAd2").removeClass("hi");//最后一个控件加号显示       
	}

}




/*调试用代码*/
/*
$("section").removeClass("on");
$(".section3").addClass("on");
$(".acZige").removeClass("hi");
//0123临时注释掉
*/