//二维码


//***************轮播图开始
(function() {

	var index = {

		get_banner: function() {

			$.ajax({
				type: "get",
				url: "http://cct296.com/nick/api/get_banner/",
				success: function(data) {

					data = $.parseJSON(data);

					$('.banner .banner-list a').each(function(i) {

						$(this).css('background-image', 'url(' + data.result[i] + ')')

					})

				}
			});

		},
		get_list: function() {
			$.ajax({
				type: "get",
				url: "http://cct296.com/nick/api/get_banner/",
			})
		}

	};

	index.get_banner();

})();
var li = $('.banner li');
var i = 0;
var list = li.parent();
//console.log(li.length)
$('button:first').click(function() {

	i--;

	if(i < 0) {

		// 最后一张其实是第一张，倒数第二张才是真的最后一张
		i = li.length;

	}

	core(i);

}).next().click(function() {

	i++;

	if(i > li.length - 1) {
		i = 0;
	}

	core(i)

})

function core(index) {
	var left = index * -100 + '%';

	li.eq(index).stop().fadeIn().siblings().stop().fadeOut();

}

function sum() {
	i++;
	if(i > li.length - 1) {
		i = 0;
	}
	core(i);
}
var sid = setInterval(sum, 1000);
$('.banner').hover(function() {

	clearInterval(sid);

}, function() {

	sid = setInterval(sum, 1000);

})

//数据
var data = $(".data");
var dataList = $("#data-list");
var dataListLi = $("#data-list li");

$.ajax({
	type: "get",
	url: "http://cct296.com/nick/api/exp/",
	success: function(data) {

		var data = $.parseJSON(data).result;
		//		console.log(data)
		var title = [];
		var olddata = [];
		var newdata = [];
		var cha = [];
		$.each(data, function() {
			title.push(this.title);
			olddata.push(this.old);
			newdata.push(this.new);
			cha.push(this.new - this.old);
		})

		var str = '<li><span>12月30日</span><span>指数点</span><span>变化</span></li>'
		for(var j in title) {

			str += '<li><span>' + title[j] + '</span><span>' + newdata[j] + '</span><span>' + cha[j] + '</span></li>'
			dataList.html(str);
		}

	}
})

//		折线图

$.ajax({
	type: "get",
	url: "http://cct296.com/nick/api/product_exp/",
	dataType: 'JSONP',
	jsonp: "callback",
	success: function(data) {
		var data = data.result;
		console.log(data);
		var categories = [];
		var series= [{
				
				data: []
			}]
		
		
		$.each(data, function(i) {
			//					console.log(i)
			categories.push(i);
			//					console.log(data[i])
			series[0].data.push(data[i]);

		})
		console.log(series[0].data)
		var chart = new Highcharts.Chart('box', {
			title: {
				text: '南化商品指数',
				x: 0
			},
			
			subtitle: {
				text: '',
				x: -20
			},
			xAxis: {
				categories: categories
			},
			yAxis: {
				title: {
					text: ''
				},
				
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: {
				valueSuffix: ''
			},
			series: series
		});
	}
});
//时间
  	var mydate=new Date();
  	var month=$('.month');
  	var day=$('.day');
  	var mymonth=mydate.getMonth()+1;
  	var myday=mydate.getDate();
  	month.html('交易日历       '+mymonth+'月');
  	day.html(myday+'</br><a href="">点击查看更多>></a>');
  	
