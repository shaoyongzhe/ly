var isInit = true;
var pageIndex: 1;
var myApp = new Vue({
	el: ".doorBox",
	data: {
		items: '',
		isShow: false,
	},
	mounted: function() {
		this.nameSearch();
	},
	methods: {
		nameSearch: function(dropme) {
			var _self = this;
			$.ajax({
				type: 'GET',
				dataType: 'json',
				data: { pageindex: pageIndex },
				url: "/retailer/data/mdVerifyRecord.json",
				success: function(data) {
					_self.items = data.data;
				}
			});
 		}
	}
})