var _self = null;
const Loading = {
	loadingURL: "",
	pageSize: 6,
	pageNum: 1,
	moreData: true,
	dataJson: null,
	callback: function() {},
	stop: false,//阻止事件连续触发
	firstLoad: true,//阻止页面刷新时，如果滚动条不在顶部，自动触发滚动事件
	install: function(vue, params) {
		_self = this;
		_self.loadingURL = params.url;
		_self.pageSize = params.pagesize ? params.pageSize : _self.pageSize;
		_self.pageNum = params.pageNum ? params.pageNum : _self.pageNum;
		_self.callback = params.callback;

		document.addEventListener("scroll", function(e) {
			if(_self.firstLoad) {
				_self.firstLoad = false;
				return;
			}
			var clientHeight = document.documentElement.scrollTop === 0 ? document.body.clientHeight : document.documentElement.clientHeight;
			var scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
			var scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
			if((scrollTop + clientHeight) >= (scrollHeight) && _self.moreData && !_self.stop) {
				_self.stop = true;
				vue.loading = true;
				setTimeout(function() {
					vue.$store
						.dispatch(Loading.loadingURL, {
							page_no: _self.pageNum,
							page_size: _self.pageSize
						})
						.then((json) => {
							vue.loading = false;
							_self.stop = false;
							_self.pageNum++;
							_self.callback(json);
							var data = json.data.data.list;
							if(data.length < _self.pageSize) {
								vue.isEnd = true;
								_self.moreData = false;
							}
						})
						.catch(err => {

						});
				}, 200)

			}

		});
	}
}
export default Loading