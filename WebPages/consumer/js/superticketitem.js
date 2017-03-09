var myApp = new Vue({
	el: ".valBox",
	data: {
		items: ''
	},
	mounted: function() {
		this.nameSearch();
	},
	methods: {
		nameSearch: function() {
			var _self = this;
			$.ajax({
				type: 'GET',
				dataType: 'json',
				url: "/consumer/data/ticketDetails.json",
				beforeSend: function() {
					$(".loading").show()
				},
				complete: function() {
					$(".loading").hide()
				},
				success: function(jsondata) {
					console.log(jsondata)
					jsondata = jsondata || {};
					if(jsondata.error) {
						toasterextend.showtips(jsondata.error, "error", false);
						return;
					}

					if(jsondata.user_notification) {
						toasterextend.showtips(jsondata.user_notification, "info");
						return;
					}
					_self.items = jsondata.data;
				}
			});
		}
	}
})