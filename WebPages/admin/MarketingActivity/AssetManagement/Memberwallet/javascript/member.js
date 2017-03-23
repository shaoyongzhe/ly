/**
 * Created by Administrator on 2017/2/7.
 */

$(function(){

    /*流水编号自动匹配*/
    // serialNumber();
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
                //console.log(data.content[0].serialnumber)
                var arr = new Array();
                //console.log(data.content)
                $(data.content).each(function(i){
                    //console.log($(data.content)[i].serialnumber)
                    //console.log(typeof $(data.content)[i].serialnumber)
                    var ww=data.content[i].serialnumber.toString();
                    arr.push(ww)
                    //console.log(typeof  arr[1])
                })
                console.log(arr)
                    //var arr=JSON.parse(data.content)
                    //console.log(arr);
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

    
    /*重置按钮*/
    $(".reset_b").click(function(){
        //$(".membertype").val(""); //会员类型
        myDate();
        $("#city em").html("市");
        $("#province em").html("省");
        $("#area em").html("区");
        $("#serialnumber").val("");
        $(".expenses_son").val("");
        //$(".resonDown").val(""); //收支事由
        $(".de_ipt1 input").val("");
        $(".de_ipt2 input").val("");
        $("#start").val(today + " 00:00:00");
        $("#end").val(today + " 23:59:59");
        $("#start").val("");
        $("#end").val("");
        $("#ipacasher").val("");
        $("#register_time").val("");
        // $(".check").css("background",'url("./images/check1.png") no-repeat')
        $(".check").removeClass('checked'); //只看登记
    })

    //在页面中显示出列表页的
    /*会员类型*/
    mumberClass();
    function mumberClass (){
        $.ajax({
            url:"http://127.0.0.1:40010/webapi/asset/member/dict/member_class",
            dataType:"json",
            success:function(data){
                var str="";
                var str_M=data.member_class[0];
                for(var key in str_M){
                    str+='<li>'+ key +'</li>'
                }
                $(".type_son").html(str) //会员类型渲染到页面
                /*重置按钮*/
                $(".reset_b").click(function(){
                    $(".membertype").val("");
                })

                /*会员类型动画卷上卷下*/
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

    //登记人
    registrant();
     function  registrant () {
         $.ajax({
             url:"http://127.0.0.1:40010/webapi/asset/member/dict/ipacasher",
             // url:"javascript/json/ipacasher.json",
             dataType:"json",
             success:function(data) {
                 // console.log(data.ipacasher);
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

    //只看登记的小三角
    $('.check').click(function() {
        $(this).toggleClass('checked');
    });

    



    /*******搜索全部会员   会员名称******/
    $("#search_text").bind("input properychange",function(event){
        var search=event.target.value;
        //判断会员类型是不是空 如果是空就提醒用户
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
            member_search_text:search,
            //"member_id":
            member_class:memberTap //上面的switch  根据会员类型的值切换对应不同的字段
            //"area_province":$("#province em").html(),
            //"area_city":$("#city em").html(),
            //"area_district":$("#area em").html(),
        }
            //console.log(value)

        if($("#search_text").val() && $("#search_text").val()!="全部会员"){
            $(".table2").fadeIn(300);
            $(".tab_header li:nth-child(3)").css("visibility","visible");
            allmemberAjax();
        }
        console.log($("#search_text").val())
        $(".table2 th").click(function(){
            $(".table2").fadeOut(300);
            $(".tab_header li:nth-child(3)").css("visibility","hidden")
            $("#search_text").val("全部会员");
        })
    })

    


    //全部会员 Ajax
    function allmemberAjax () {
        $.ajax({
            type:"GET",
            // url:"javascript/json/autoplate.json",
            url:"http://127.0.0.1:40010/webapi/asset/member/summary",
            data:members,
            dataType:"json",
            success:function(data) {
                var str = "";
                $(data.content).each(function (i) {
                    // if (this.member_name.indexOf($("#search_text").val()) != -1) {
                        str += '<tr><td><span class="lei">'
                            + this.member_name
                            + '</span><span>' + this.member_class
                            + '</span><br/><span>余额：' + this.asset[0].count
                            + '元</span><span>' + this.area + '</span></td></tr>'
                    // }
                })
                $(".table2 tbody").html(str);
                $(".table2 tbody tr").on("click",function(){
                    $(this).addClass("allmember1").siblings().removeClass("allmember1")
                    $("#search_text").val($(".allmember1").find(".lei").text());
                })
            },
            error:function(){
                console.log(333);
            }
        })
    }





//    /*城市联动*/
    comSelect();
    selectCity();

    /*收支类型 卷上卷下 下拉放值*/
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

    
    /*全部会员排序 卷上卷下 下拉放值*/
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

    
//**************充值提现ifram弹出层**********************//
    layui.use('layer', function(){ //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        //触发事件
        var active = {
            recharge: function(){
                var that = this;
                //多窗口模式，层叠置顶
                layer.open({
                    type: 2 //iframe
                    //, title: 'recharge'
                    ,area: ['1150px', '700px']
                    ,shade: 0.8
                    ,title: false
                    ,scrollbar: false
                    ,content: 'html/recharge.html'
                    ,closeBtn:2
                    ,shadeClose:true
                })
            },
            withdraw: function(){
                var that = this;
                //多窗口模式，层叠置顶
                layer.open({
                    type: 2 //iframe
                    //, title: 'recharge'
                    ,area: ['1150px', '700px']
                    ,shade: 0.8
                    ,title: false
                    ,scrollbar: false
                    ,shadeClose: true
                    ,content: 'html/withdraw.html'
                })
            },
        };
        $('.site-demo-layer').on('click', function(){
            var type = $(this).data('type');
            console.log(type)
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
            //start: '2016-12-15 23:00:00',  //开始日期
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
               // var Ntime=laydate.now();
               // $("#start").val(Ntime + " 00:00:00")
               // $("#end").val(Ntime + " 23:59:59")
               // $("#laydate_bottom #laydate_clear").click(function(){
               //     var Ntime=laydate.now();
               //     $("#start").val(Ntime + " 00:00:00")
               //     $("#end").val(Ntime + " 23:59:59")
               // })
    });








})//就绪函数结束标签







