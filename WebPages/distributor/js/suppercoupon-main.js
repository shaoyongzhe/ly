var pageIndex = 1;
var isInit = true;

var vm = new Vue({
	el: ".listBox",
	data: {
		items: [],
		isShow: false
	},
	mounted: function() {
		//		this.nameSearch();
		loaddata(null);
	},
	methods: {
		toItems: function(itemId) {
//			location.href = "/distributor/page/suppercouponitems.html?activity_id="+itemId;
			alert("跳转页面-->超惠详情");
		},
		toTopic: function(topicId) {
			alert("跳转页面-->");
		},
		toStore:function(storeId){
//			location.href = "/distributor/page/participateretailer_ticket.html?activity_id="+storeId;
			alert("跳转页面-->投放门店");
		}
	}
})

function loaddata(dropme) {
	var listitem = "";
	var ajaxdata = { activitykind: "distributor_to_consumer", activitytype: "ticket", pageindex: pageIndex };
	// alert(wxjsconfig.sharekey)
	if(wxjsconfig.sharekey != null)
		ajaxdata[wxjsconfig.sharekey] = "_";
	$.ajax({
		type: 'GET',
		dataType: 'json',
//		data: ajaxdata,
//		url: '/webapi/distributor/weixin/activities',
		url: "/distributor/data/fxsTickeList.json",
		beforeSend: function() { if(pageIndex == 1) { common.loading.show(); } },
		complete: function() { if(pageIndex == 1) { common.loading.hide(); } },
		success: function(json) {
			console.log(json)
			common.loading.hide();
			json = json || {}; /* 统一加这句话 */
			 if (json.error && pageIndex != 1) {
                dealdropme(dropme);
                return;
            }
			if(jQuery.isEmptyObject(json)) {
				dealdropme(dropme);
				return;
			}
			if(json.error) {
				toasterextend.showtips(json.error, "error");
				dealdropme(dropme);
				return;
			}
			if(json.user_notification) {
				if(pageIndex == 1) {
					$('#list').html("<div class=\"nohd\" style='margin-top:35%;'><img style='height:80%' src=\"/retailer/image/超惠券.png\" /><br/></div>");
				}
				toasterextend.showtips(json.user_notification, "info");
				dealdropme(dropme);
				return;
			}
			if(pageIndex == 1) {
				//							vm.array = json.data;
				vm.items = json;
				vm.isShow = true;
			} else {
				//							$.each(json.data, function(i, v) {
				$.each(json, function(i, v) {
					vm.items.push(v);
					vm.isShow = true;
				});
			}
			setTimeout(function() {
				mySwiper();
			}, 500)
			// vm.$data.array.push(json.data)

			if(pageIndex == 1 && isInit && !json.error && !json.user_notification) {
				isInit = false;
				if($.isFunction(wxjsshare)) {
					wxjsshare(json.share || {});
				}
				$('#dropload').dropload({
					scrollArea: window,
					domDown: {
						domClass: 'dropload-down',
						domRefresh: '<div class="dropload-refresh">↑加载更多</div>',
						domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
						domNoData: '<div class="dropload-noData">暂无数据</div>'
					},
					loadDownFn: function(me) {
						pageIndex++;
						loaddata(me);
					}
				});
			}
			$("img.lazy").lazyload();
			if(dropme != null)
				dropme.resetload();

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

			var errormsg = "访问异常";

			if(XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
				var json = JSON.parse(XMLHttpRequest.responseText);
				errormsg = JSON.parse(json.Message).error;
				if(errormsg == undefined || errormsg == '')
					errormsg = "Http error: " + XMLHttpRequest.statusText;
			}

			toasterextend.showtips(errormsg, "error");
			dealdropme(dropme);
		}
	});
}

/*
 * swiper
 */
function mySwiper() {
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'vertical',
		speed: 800,
		autoplay: 2000,
		autoplayDisableOnInteraction: false,
		grabCursor: true,
		preventLinksPropagation: false,
		loop: true,
		observer: true, //修改swiper自己或子元素时，自动初始化swiper
		observeParents: true //修改swiper的父元素时，自动初始化swiper
	});
}