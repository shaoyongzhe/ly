/**
 * Created by Administrator on 2017/2/7.
 */

$(function(){

    /*流水编号自动匹配*/
    serialNumber();
    function serialNumber(){
        $.ajax({
            type:"GET",
            // url:"javascript/json/list.json",
            url:"http://127.0.0.1:40010/webapi/asset/member/trading/list",
            dataType:"json",
            success:function(data){
                /*重置按钮*/
                $(".reset_b").click(function(){
                    $(".edit_input.serialnumber").val("");
                })
//                    console.log(data.content[0].serialnumber)
                var arr = new Array();
//                    console.log(data.content)
                $(data.content).each(function(i){
//                        console.log($(data.content)[i].serialnumber)
//                        console.log(typeof $(data.content)[i].serialnumber)
                    var ww=data.content[i].serialnumber.toString();
                    arr.push(ww)
//                        console.log(typeof  arr[1])
                })
                console.log(arr)
//                    var arr=JSON.parse(data.content)
//                    console.log(arr);
                if(data != null && data.content != null) {
                    $('#orgNameCom').autocomplete({
                        max: 12,    //列表里的条目数
                        minChars: 1,    //自动完成激活之前填入的最小字符
                        width: 225,     //提示的宽度，溢出隐藏
                        scrollHeight: 300,   //提示的高度，溢出显示滚动条
                        matchContains: true,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
                        autoFill: true,    //自动填充
                        lookup: arr
                    })
                }
            }
        })
    }

    /*创建日期函数*/
    function myDate(){
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1; // 当前月是要+1
        month = month < 10 ? ("0" + month) : month;
        var dt = d.getDate();
        dt = dt < 10 ? ("0" + dt) : dt;
        return today = year + "-" + month + "-" + dt;
    }
    /*重置按钮*/
    $(".reset_b").click(function(){
//                $(".membertype").val("");
        myDate();
        $("#city em").html("");
        $("#province em").html("");
        $("#area em").html("");
        $("#serialnumber").val("");
        $(".expenses_son").val("");
//                $(".resonDown").val("");
        $(".de_ipt1 input").val("");
        $(".de_ipt2 input").val("");
        $("#start").val(today + " 00:00:00");
        $("#end").val(today + " 23:59:59");
        $("#start").val("");
        $("#end").val("");
        $("#ipacasher").val("");
        $("#register_time").val("");
        $(".check").css("background",'url("./images/check1.png") no-repeat')
    })

    //    在页面中显示出列表页的
    /* **会员类型*/
    mumberClass();
    function mumberClass (){
        $.ajax({
            url:"http://127.0.0.1:40010/webapi/asset/member/dict/member_class",
            dataType:"json",
            success:function(data){
                var str="";
                var str_M=data.member_class[0];
//                    console.log(str_M)
                for(var key in str_M){
                    str+='<li>'+ key +'</li>'
                }
                $(".type_son").html(str)
                /*重置按钮*/
                $(".reset_b").click(function(){
                    $(".membertype").val("");
                })

                /*会员类型*/
                $('.type_wrap').on('click',function(){
                    $('.type_son').stop().slideToggle(200);
                    $(".membertype").focus(function(){
                        $(".type_son").slideUp();
                    })
                })
                $(".membertype").blur(function(){
                    $(".type_son").slideUp();
                })
                $('.type_son li').on('click',function(){
                    $('.membertype').val($(this).html())
                })
            }
        })
    }

    /*收支类型*/
//    tradingTag();
//    function tradingTag (){
//        $.ajax({
//            url:"http://127.0.0.1:40010/webapi/asset/ipaloma/dict/transfertype",
//            dataType:"json",
//            success:function(data) {
//                var str = "";
////                    console.log($(data.transfertype))
//                $(data.transfertype).each(function(i){
////                        console.log($(data))
////                        console.log(i);
//                    str+='<li>'+ data.transfertype[i] +'</li>'
//                })
//                $(".expenses_wrap_son").html(str)
//
//                /*重置按钮*/
//                $(".reset_b").click(function(){
//                    $(".expenses_son").val("");
//                })
//
//                $('.expenses_wrap').on('click',function(){
//                    $('.expenses_wrap_son').stop().slideToggle(200);
//                    $(".expenses_son").focus(function(){
//                        $(".expenses_wrap_son").slideUp();
//                    })
//                })
//                $(".expenses_son").blur(function(){
//                    $(".expenses_wrap_son").slideUp();
//                })
//                $('.expenses_wrap_son li').on('click',function(){
//                    $('.expenses_son').val($(this).html())
//                })
//            }
//        })
//    }

    /*收支事由*/
    purposeClass();
    function purposeClass (){
        $.ajax({
            url:"http://127.0.0.1:40010/webapi/asset/member/dict/purpose_class",
            dataType:"json",
            success:function(data) {
                var str = "";
                for(key in data.purpose_class[0]){
                    str+='<li>'+ key +'</li>'
                }
                $(".reason_son").html(str)

                /*重置按钮*/
                $(".reset_b").click(function(){
                    $(".resonDown").val("");
                })
                $('.reson').on('click',function(){
                    $('.reason_son').stop().slideToggle(200);
                    $(".reson input").focus(function(){
                        $(".reason_son").slideUp();
                    })
                })
                $(".reson input").blur(function(){
                    $(".reason_son").slideUp();
                })
                $('.reason_son li').on('click',function(){
                    $('.reson input').val($(this).html());
                })
            }
        })
    }

    registrant();
     function  registrant () {
         $.ajax({
             //url:"http://127.0.0.1:40010/webapi/asset/member/dict/ipacasher",
             url:"javascript/json/ipacasher.json",
             dataType:"json",
             success:function(data) {
                 console.log(data.ipacasher);
                 var str = "";
                 $(data.ipacasher).each(function(i){
                     str += '<p>' + data.ipacasher[i].ipacasher_name + '</p>'
                 })
                 $(".reg_p").html(str)

                 /*重置按钮*/
                 $(".reset_b").click(function(){
                     $("#ipacasher").val("");
                 })
                 /*登记人*/
                 $('#ipacasher').on('click',function(){
                     $('.reg_p').stop().slideToggle(200);
                     $("#ipacasher").focus(function(){
                         $(".reg_p").slideUp();
                     })
                 })
                 $("#ipacasher").blur(function(){
                     $(".reg_p").slideUp();
                 })
                 $('.reg_p p').on('click',function(){
                     $('#ipacasher').val($(this).html());
                 })
             }
         })

     }


//            /*省市区三级ajax联动*/
//            /*province 省*/
//            $("#province").click(function(){
//                var province={
//                    "area_province": "area_province"
//                }
//
//                $.ajax({
//                    url:"http://127.0.0.1:40010/webapi/asset/member/dict/area_province",
//                    type: "get",
//                    data:province,
//                    dataType: "json",
//                    success: function (data) {
//                        var str = "";
////                        $(data).each(function (i) {
////                            for (i = 0; i++; i < this.area_province.length) {
////                                str += '<li>' + this.area_province[i] + '</li>'
////                            }
////                        })
//                        for(key in data.area_province){
//                            str+='<li>'+ key +'</li>'
//                        }
//                        $("#province ul").html(str)
//                        /*省*/
//                        $('#province').on('click', function () {
//                            $('#province ul').stop().slideToggle(300);
//                        })
//                        $('#province ul li').on('click', function () {
////                        $('#province span').attr('value',$(this).text());
//                            $('#province span').html($(this).html());
//
//                        })
//                    }
//                })
//            })
//            /*city 市*/
//             $("#city").click(function(){
//                 var city={
//                     "_city":$('#city span')
//                 }
//                 $.ajax({
//                         url:"../../area_city",
//                         data:city,
//                         type:"get",
//                         dataType:"json",
//                         success:function(){
//                             var str="";
//                             $(data).each(function(){
//                                 str+='<li>'+ this.area_city[i] +'</li>'
//                             })
//                             $("#city ul").html(str)
//                             /*省*/
//                             $('#city').on('click',function(){
//                                 $('#city ul').stop().slideToggle(300);
//                             })
//                             $('#city ul li').on('click',function(){
////                        $('#province span').attr('value',$(this).text());
//                                 $('#city span').html($(this).html());
//                             })
//
//                         }
//
//                  })
//
//            })
//
//             /*district 区*/
//             $("#district").click(function(){
//                 var district={
//                     "_district": $("#district span").html()
//                 }
//                 $.ajax({
//                     url:"../../area_district",
//                     data:district,
//                     type:"get",
//                     dataType:"json",
//                     success:function() {
//                         var str = "";
//                         $(data).each(function () {
//                             str += '<li>' + this.area_city[i] + '</li>'
//                         })
//                         $("#district ul").html(str)
//                         /*省*/
//                         $('#district').on('click', function () {
//                             $('#district ul').stop().slideToggle(300);
//                         })
//                         $('#district ul li').on('click', function () {
//                             //                        $('#province span').attr('value',$(this).text());
//                             $('#district span').html($(this).html());
//                         })
//                     }
//                 })
//            })


//            listPage(i);
//            var gPageSize = 10;
//            var i = 1; //设置当前页数，全局变量
//            function listPage (pagenumber){
////                i++; //页码自动增加，保证下次调用时为新的一页。
//                var dd={
////                    "pagesize":gPageSize,
//                    "pagenumber":pagenumber,
//                    "pageindex":i++
//                }
//                console.log($(dd)[0].pageindex);
////                $.get("javascript/list.json", dd, function (data) {
////                    if (data.length > 0) {
////                        //var jsonObj = JSON.parse(data);
////                        tablelist(dd);
////                    }
////                });
//                $.ajax({
////                    url:"http://127.0.0.1:40010/webapi/asset/member/trading/list",
//                    url:"javascript/finding.json",
//                    data:dd,
//                    type:"get",
//                    dataType:"json",
//                    success:function(data){
////                        if($("#start").val()=="" || $("#end").val()==""){
////                            alert("请填写正确的时间");
////                            return false;
////                        }
////                        alert("ok");
//                        $(".loading_2").hide();
//                        if(data.content.length>0){
////                            console.log(data.content)
//                            tablelist(data);
//                            $('.table1 tbody tr').on("click",function(){
//                                $(this).addClass("td_tip").siblings().removeClass("td_tip");
//                            })
//                        }
//                    },
//                    beforeSend: function () {
//                        $(".loading_2").show();
////                        alert(1)
//                    },
//                    error: function() {
//                        $(".loading_2").hide();
//                    }
//                })
//            }

//            function tablelist(data){
//                var str="";
////                        console.log(data.content[0].member_class)
//                $(data.content).each(function(i){
//                    str+='<tr><td>'+ this.member_name
//                            + '</td><td>'+ this.member_class
//                            +  '</td><td>'+ this.area
//                            + '</td><td>'+ this.serialnumber
//                            + '</td><td>'+ this.purpose_class
//                            + '</td><td>'+ this.count
//                            + '</td><td>'+ this.register_time
//                            + '</td><td class="ac_tip">'+ this.descriptioin
//                            + '</td><td>'+ this.ipacasher_name
//                            +'<br/>'+ this.register_time + '</td></tr>'
//                })
//                $(".table1 tbody").append(str);
//            }


    //var i = 1; //设置当前页数
    //var pageSize = 10;
    /*check 登记复选框判定*/
    $('.check').click(function() {
        $(this).toggleClass('checked');
    });


    /****
     * 滚动分页代码
     * */

//    function MyScroll (currAjax) {
//
//        var winH = $(".table1 tbody").height(); //页面可视区域高度
//        var scrollHandler = function () {
//            var pageH = $(".table1 tbody").prop("scrollHeight");
//            var scrollT = $(".table1 tbody").scrollTop(); //滚动条top
//            var aa = pageH - winH - scrollT;
//            if (aa < -9) {
//                currAjax(i);
//            }
//        }
//        //定义鼠标滚动事件
//        $(".table1 tbody").scroll(scrollHandler);
//        /*点击查询--条件查询 termAjax*/
//        currAjax(i);
//    }
//
//    function termAjax (i){
//        var str2=$(".membertype").val();
//        var memberTap2;
//        switch (str2){
//            case "厂商": memberTap2="tblretailer"; break;
//            case "分销商":memberTap2="tbldistributor";break;
//            case "门店":memberTap2="tblsupplier";break;
//            case "凌云代理商":memberTap2="tblipalomaagent";break;
//        }
////                console.log($(".membertype").val())
//        var find={
////                    "member_id":$(".membertype").attr("id"),
//            "member_class":memberTap2,
////                    "area_province":$("#province em").html(),
////                    "area_city":$("#city em").html(),
////                    "area_district":$("#area em").html(),
////                    "serialnumber":$(".serialnumber").val(),
//            "transfertype":$(".expenses_son").val(),
////                    "purpose_id":$(".resonDown").attr("id"),
//            "purpose_class":$(".resonDown").val(),
//            "asset_min":$(".de_ipt1 input").val(),
//            "asset_max":$(".de_ipt2 input").val(),
//            "trading_begintime":$("#start").val(),
//            "trading_endtime":$("#end").val(),
//            //"pagenumber":pagenumber,
//            "pageindex":i++,
//            "pageSize":pageSize
//        }
//        $.ajax({
////                    url:"http://127.0.0.1:40010/webapi/asset/member/trading/list",
//            url:"javascript/json/finding.json",
//            data:find,
//            dataType:"json",
//            success:function(data){
//                console.log("term");
////                        alert("ok");
//                var str="";
////                        console.log(data.content[0].member_class)
//                console.log(data)
////                        console.log(data.content[0].member_class)
//                $(".loading_2").hide();
//                if(data.content.length>0){
////                            console.log(data.content)
//                    $(data.content).each(function(i){
//                        str+='<tr><td>'+ this.member_name
//                            + '</td><td>'+ this.member_class
//                            + '</td><td>'+ this.area
//                            + '</td><td>'+ this.serialnumber
//                            + '</td><td>'+ this.purpose_class
//                            + '</td><td>'+ this.count
//                            + '</td><td>'+ this.register_time
//                            + '</td><td class="ac_tip">'+ this.descriptioin
//                            + '</td><td>'+ this.ipacasher_name
//                            +'<br/>'+ this.register_time + '</td></tr>'
//                    })
//                    $(".table1 tbody").append(str);
//                    $('.table1 tr td').on("mouseover",function(){
//                        $(this).attr("title",$(this).text())
//                    })
//                    $('.table1 tr td:nth-child(8)').on("click",function(){
//                        $(this).toggleClass('ac_tip');
//                    })
//                    $('.table1 tbody tr').on("click",function(){
//                        $(this).addClass("td_tip").siblings().removeClass("td_tip");
//                    })
//                    $('.table1 tbody tr').on("click",function(){
//                        $(this).addClass("td_tip").siblings().removeClass("td_tip");
//                    })
//                }
//            },
//            beforeSend: function () {
//                $(".loading_2").show();
//                $(".find_b").val("查 询")
////                        alert(1)
////                        if($("#start").val()=="" || $("#end").val()==""){
////                            alert("请填写正确的时间");
////                            return false;
////                        }
//            },
//            error: function() {
//                $(".loading_2").hide();
//            }
//        })
//    }
//
//    function checkAjax (i) {
//        checkData={
//            "ipa_casher_id":$("#ipacasher").val(),
//            "register_time":$("#register_time").val(),
//            //"pagenumber":pagenumber,
//            "pageindex":i++,
//            "pageSize":pageSize
//        }
//        $.ajax({
////                    url:"http://127.0.0.1:40010/webapi/asset/member/trading/list",
//            url:"javascript/json/list.json",
//            data:checkData,
//            dataType:"json",
//            success:function(data){
//                console.log("check");
//                var str='';
//                $(data.content).each(function(i){
//                    str+='<tr><td>'+ this.member_name
//                        + '</td><td>'+ this.member_class
//                        + '</td><td>'+ this.area
//                        + '</td><td>'+ this.serialnumber
//                        + '</td><td>'+ this.purpose_class
//                        + '</td><td>'+ this.count
//                        + '</td><td>'+ this.register_time
//                        + '</td><td class="ac_tip">'+ this.descriptioin
//                        + '</td><td>'+ this.ipacasher_name
//                        +'<br/>'+ this.register_time + '</td></tr>'
//                })
//                $(".table1 tbody").append(str);
//                $('.table1 tr td').on("mouseover",function(){
//                    $(this).attr("title",$(this).text())
//                })
//                $('.table1 tr td:nth-child(8)').on("click",function(){
//                    $(this).toggleClass('ac_tip');
//                })
//                $('.table1 tbody tr').on("click",function(){
//                    $(this).addClass("td_tip").siblings().removeClass("td_tip");
//                })
//            }
//        })
//    }
//




//            /*******搜索全部会员******/
//            {"member_search_text":"凌云测试分销商雇员 No.40-1","member_class":"tblaccount"}
    /*监测input值的变化函数方法*/
    $.fn.watch = function(callback) {
        return this.each(function() {
            //缓存以前的值
            $.data(this, 'originVal', $(this).val());
            //event
            $(this).on('keyup paste', function() {
                var originVal = $(this, 'originVal');
                var currentVal = $(this).val();

                if (originVal !== currentVal) {
                    $.data(this, 'originVal', $(this).val());
                    callback(currentVal);
                }
            });
        });
    }

    /*调用watch方法*/
    $("#search_text").watch(function(value){
        //member_class 是必选参数，设置选择事件
        if ($(".membertype").val() == "" || $(".membertype").val() == "--请选择--") {
            $("#search_text").val("");
            alert("请选择正确的会员类型");
            return false;
        }
        var str1=$(".membertype").val();
        var memberTap;
        switch (str1){
            case "厂商": memberTap="tblretailer"; break;
            case "分销商":memberTap="tbldistributor";break;
            case "门店":memberTap="tblsupplier";break;
            case "凌云代理商":memberTap="tblaccount";break;
        }
        members={
            "member_search_text":"凌云测试分销商雇员 No.40-1",
//                    "member_id":
            "member_class":memberTap
//                    "area_province":$("#province em").html(),
//                    "area_city":$("#city em").html(),
//                    "area_district":$("#area em").html(),
        }
//                    console.log(value)
        if($("#search_text").val()){
            $(".table2").fadeIn(300);
            $(".tab_header li:nth-child(3)").css("visibility","visible")
            allmemberAjax();
        }
        console.log($("#search_text").val())
        $(".table2 th").click(function(){
            $(".table2").fadeOut(300);
            $(".tab_header li:nth-child(3)").css("visibility","hidden")
            $("#search_text").val("全部会员");
        })
    })

    //所有会员 Ajax
    function allmemberAjax () {
        $.ajax({
            type:"GET",
            // url:"javascript/json/autoplate.json",
            url:"http://127.0.0.1:40010/webapi/asset/member/summary",
            data:members,
            dataType:"json",
            success:function(data) {
                var str = "";
                console.log(data)
                $(data.content).each(function (i) {
                    if (this.member_name.indexOf($("#search_text").val()) != -1) {
//                                    console.log(333)
                        str += '<tr><td><span class="lei">'
                            + this.member_name
                            + '</span><span>' + this.member_class
                            + '</span><br/><span>余额：' + this.asset[0].count
                            + '元</span><span>' + this.area + '</span></td></tr>'
                    }
                })
                $(".table2 tbody").html(str);
                $(".table2 tbody tr").on("click",function(){
                    $(this).addClass("allmember1").siblings().removeClass("allmember1")
                    $("#search_text").val($(".allmember1").find(".lei").text());
                })
            }
        })
    }





//            /*城市联动*/
    comSelect();
    selectCity();

    /*收支类型*/
    $('.expenses_wrap').on('click',function(){
        $('.expenses_wrap_son').stop().slideToggle(200);
        $(".expenses_son").focus(function(){
            $(".expenses_wrap_son").slideUp();
        })
    })
    $(".expenses_son").blur(function(){
        $(".expenses_wrap_son").slideUp();
    })
    $('.expenses_wrap_son li').on('click',function(){
        $('.expenses_son').val($(this).html())
    })

    

    /*全部会员排序*/
    $('.sore').on('click',function(){
        $('.numberSort').stop().slideToggle(300);
        $(".sore").focus(function(){
            $(".numberSort").slideUp();
        })
    })
    $(".sore").blur(function(){
        $(".numberSort").slideUp();
    })
    $('.numberSort span').on('click',function(){
        $('.sore').val($(this).html());
    })

    /*-----------dialog-----------------------------*/

    layui.use('layer', function(){ //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        //触发事件
        var active = {
            recharge: function(){
                var that = this;
                //多窗口模式，层叠置顶
                layer.open({
                    type: 2 //iframe
//                          , title: 'recharge'
                    , area: ['1150px', '560px']
                    , shade: 0.8
                    ,title: false
                    ,scrollbar: false
                    , content: 'html/recharge.html'
                    ,closeBtn:2
                    ,shadeClose:true
                })
            },
            withdraw: function(){
                var that = this;
                //多窗口模式，层叠置顶
                layer.open({
                    type: 2 //iframe
//                          , title: 'recharge'
                    , area: ['1150px', '560px']
                    , shade: 0.8
                    ,title: false
                    ,scrollbar: false
                    ,shadeClose:true
                    , content: 'html/withdraw.html'
                })
            },
        };
        $('.site-demo-layer').on('click', function(){
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

    });



    /*-----------laydate时间插件---------------------*/
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        var start = {
            elem: "#start",
            istime: true,
            format: 'YYYY/MM/DD hh:mm:ss',
//                    start: '2016-12-15 23:00:00',  //开始日期
            min: laydate.now(-1000)
            ,max: '2099-06-16 23:59:59'
            ,istoday: false
            ,choose: function(datas){
                end.min = datas; //开始日选好后，重置结束日的最小日期
                end.start = datas //将结束日的初始值设定为开始日
            }
        };

        var end = {
            elem: "#end",
            istime: true,
            format: 'YYYY/MM/DD hh:mm:ss',
            min: laydate.now()
            ,max: '2099-06-16 23:59:59'
            ,istoday: false
            ,choose: function(datas){
                start.max = datas; //结束日选好后，重置开始日的最大日期
            }
        };

        document.getElementById('start').onclick = function(){
            start.elem = this;
            laydate(start);
        }
        document.getElementById('end').onclick = function(){
            end.elem = this
            laydate(end);
        }
//                var Ntime=laydate.now();
//                $("#start").val(Ntime + " 00:00:00")
//                $("#end").val(Ntime + " 23:59:59")
//                $("#laydate_bottom #laydate_clear").click(function(){
//                    var Ntime=laydate.now();
//                    $("#start").val(Ntime + " 00:00:00")
//                    $("#end").val(Ntime + " 23:59:59")
//                })
    });








})







