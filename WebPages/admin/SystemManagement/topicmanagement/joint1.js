// var addSub3Arr=["次","名","名","%","级","级","时",]
// var laji='';//随时可以删除
AddSubAjax();

function AddSubAjax() { //控件ajax
  $.ajax({
    type: "get",
    url: "/webapi/ipaloma/topic/config",
    async: true,
    success: function(data) {
      // laji = data;

      // c(data)

      // console.log("success");
      //控件1会员活动条件
      //控件1活动类型
      var dca_1 = data.conditionsetting.activitytype;
      $(".addSub1 .acSe1 .select").empty();
      for (i = 0; i < dca_1.length; i++) {
        $(".addSub1 .acSe1 .select").append('<li class="option" name="' + dca_1[i].type + '" type="' + dca_1[i].type + '">' + dca_1[i].localtype + '</li>')
      }
      //控件1优惠力度条件的第一部分
      $(".addSub1 .acCoSc").empty();
      $(".addSub1 .acCoSc").append('<p class="bor selectWrap1"></p>');
      for (i = 0; i < dca_1.length; i++) {
        $(".addSub1 .acCoSc").append('<p class="bor hi selectWrap1">' + dca_1[i].conditionname + '</p>')
      }
      //控件1优惠力度条件的第三部分
      $(".addSub1 .acCoRa").empty();
      $(".addSub1 .acCoRa").append('<div class="bor selectWrap2"><span class="diSpan"></span></div>');
      var hm = "";
      for (i = 0; i < dca_1.length; i++) {
        if (dca_1[i].localtype == "买赠") {
          hm += '<div class="bor hi selectWrap2"><span class="diSpan"><label for="acLabel1" class="acCoRaMzla">买</label></span><input id="acLabel1" class="acCoRaMzip" type="text" value="3"/><span class="diSpansa">:</span><span><label class="acCoRaMzla" for="acLabel2">赠</label></span><input id="acLabel2" class="acCoRaMzip" type="text" value="2"/><input type="text" value="3"><input type="text" value="2"></div>'
        } else { //不考虑有礼					
          hm += '<div class="bor hi selectWrap2"><input class="bor diInput" type="text" value="20"/><span class="diSpan por">%</span></div>'
        }
      }
      $(".addSub1 .acCoRa").append(hm);

      //主办方
      var dcs_1 = data.conditionsetting.sponsor;
      $(".section2 .sponsor").empty();
      hm = "";
      var distributorBol = false; //判断是否有分销商
      for (i = 0; i < dcs_1.length; i++) {
        if (dcs_1[i].localtype == "分销商") { //默认分销商选中
          hm += '<span class="radio on" name="' + dcs_1[i].type + '" type="' + dcs_1[i].type + '">' + dcs_1[i].localtype + '</span>';
          distributorBol = true;
        } else {
          hm += '<span class="radio" name="' + dcs_1[i].type + '" type="' + dcs_1[i].type + '">' + dcs_1[i].localtype + '</span>';
        }
      }
      $(".section2 .sponsor").append(hm);
      if (distributorBol == false) { //若无分销商，则第一个选中
        $(".section2 .sponsor").find("span").eq(0).addClass("on")
      }

      //控件2参与会员
      var dsm_1 = data.conditionsetting.membership;
      //会员类型
      $(".addSub2 .acSe4 .select").empty();
      for (i = 0; i < dsm_1.length; i++) {
        $(".addSub2 .acSe4 .select").append('<li class="option" name="' + dsm_1[i].type + '" type="' + dsm_1[i].type + '" restrictcount="' + dsm_1[i].restrictcount + '">' + dsm_1[i].localtype + '</li>');
      }
      //参加名额
      $(".addSub2 .acMe").empty();
      hm = '';
      $(".addSub2 .acMe").append('<p class="p68 deleP deleP1"></p><div class="selectWrap1 -hi"><span><input class="bor acMeI1" type="text" value=""/><span class="acMeS1"></span></span><span class="to"></span><span><input class="bor acMeI2" type="text"  value="" /><span class="acMeS2"></span></span></div>');
      for (i = 0; i < dsm_1.length; i++) {
        if (dsm_1[i].localtype == "消费者") {
          hm += '<div class="selectWrap1 hi"><input class="bor acMeI1" type="text" value=""/><span class="acMeS1">人</span><span class="to"></span><input class="bor acMeI2" type="text"  value=""/><span class="acMeS2">人</span></div>'
        } else {
          hm += '<div class="selectWrap1 hi"><input class="bor acMeI1" type="text" value=""/><span class="acMeS1">家</span><span class="to"></span><input class="bor acMeI2" type="text"  value=""/><span class="acMeS2">家</span></div>'
        }
      }
      $(".addSub2 .acMe").append(hm);

      //console.log(addsub2HTML)
      //控件3设置参与资格
      var dcc_1 = data.conditionsetting.conditiontype;
      $(".addSub3 .acSe5 .select").empty();
      addSub3Arr = [""];
      //	console.log(addSub3Arr.length)
      for (i = 0; i < dcc_1.length; i++) {
        //条件类型
        $(".addSub3 .acSe5 .select").append('<li class="option" name="' + dcc_1[i].type + '" type="' + dcc_1[i].type + '">' + dcc_1[i].localtype + '</li>');
        //条件["次", "名", "名", "%", "天"]
        //		console.log(addSub3Arr.length)
        addSub3Arr.push(dcc_1[i].unit);
      }
      //统计范围的第二部分
      // $(".addSub3 .acZige3").prepend('<div class="acZige3z  acZige2tab" style="width:135px;"></div>');
      addsub3HTML = $(".addSub3").get(0).outerHTML;
      addsub2HTML = $(".addSub2").get(0).outerHTML;
      //控件4参与活动条件
      var dss_2a = data.subsidysetting.subsidyobject;
      $(".addSub4 .acSe9 .select").empty();
      //补贴对象
      for (i = 0; i < dss_2a.length; i++) {
        $(".addSub4 .acSe9 .select").append('<li class="option" refundtoclass="' + dss_2a[i].refundtoclass + '" name="' + dss_2a[i].type + '" type="' + dss_2a[i].type + '">' + dss_2a[i].localtype + '</li>');
        var attrArr = [];
        for (j = 0; j < dss_2a[i].subsidycondition.length; j++) {
          attrArr.push(dss_2a[i].subsidycondition[j])
        }
        // $(".addSub4 .acSe9 .select").find("li:last").get(0).attrArr=attrArr;
        $(".addSub4 .acSe9 .select").find("li:last").attr("attrArr", attrArr);
      }
      //补贴条件
      var dss_2b = data.subsidysetting.subsidycondition;
      $(".addSub4 .acSe10 .select").empty();
      for (i = 0; i < dss_2b.length; i++) {
        $(".addSub4 .acSe10 .select").append('<li name="' + dss_2b[i].type + '" type="' + dss_2b[i].type + '" class="option">' + dss_2b[i].localtype + '</li>')
      }
      //补贴形式、范围值、
      var dss_2c = data.subsidysetting.subsidymethod;
      $(".addSub4 .acSe11 .select").empty();
      addSub4Arr = [""]
      for (i = 0; i < dss_2c.length; i++) {
        //补贴形式
        $(".addSub4 .acSe11 .select").append('<li class="option" name="' + dss_2c[i].type + '" type="' + dss_2c[i].type + '" category="' + dss_2c[i].category + '" showtype=' + dss_2c[i].showtype + '>' + dss_2c[i].localtype + '</li>');
        //范围值
        if (dss_2c[i].unit == "元") {
          dss_2c[i].unit = "元/次";
        } else if (dss_2c[i].unit == "分") {
          dss_2c[i].unit = "分/次";
        } else if (dss_2c[i].unit == "") {
          dss_2c[i].unit = "我是链接点击我，我是链接点击我";
        }
        addSub4Arr.push(dss_2c[i].unit);
      }
      addsub4HTML = $(".addSub4").get(0).outerHTML;
      // 控件5摇一摇
      // var .....还是用之前的dss_2c,之后应该会变
      $(".addSub5 .acSe15 .select").empty();
      //奖品类型
      $(".addSub5 .acSe15 .select").append('<li class="option">谢谢参与</li>');
      addSub5Arr.push("无");
      for (i = 0; i < dss_2c.length; i++) {
        //补贴形式
        if (dss_2c[i].showtype != "compose") { //摇一摇中拒绝嵌套摇一摇
          $(".addSub5 .acSe15 .select").append('<li class="option" name="' + dss_2c[i].type + '" type="' + dss_2c[i].type + '" category="' + dss_2c[i].category + '" showtype=' + dss_2c[i].showtype + '>' + dss_2c[i].localtype + '</li>');
          //范围值,防止日后接口变化，所以不用上面的addSub4Arr,
          if (dss_2c[i].unit == "元") {
            dss_2c[i].unit = "元/次";
            // }else if(dss_2c[i].unit=="分"){
            // dss_2c[i].unit="分/次";
          } else if (dss_2c[i].unit == "") {
            dss_2c[i].unit = "我是链接点击我，我是链接点击我";
          } else if (dss_2c[i].unit == undefined) { //处理谢谢参与
            dss_2c[i].unit = "";
          }
          addSub5Arr.push(dss_2c[i].unit);
        }
      }
      addsub5HTML = $(".addSub5").get(0).outerHTML;
    },
    error: function() {
      console.log("error");
    }
  });
  // alert(5)
}



//有空将循环条件一样的，并入一个循环。