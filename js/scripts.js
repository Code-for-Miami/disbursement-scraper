// Compile yay!

dat = function(d) {
		obj = {
			'type' : 'month',
			'orig' : d,
			byDate : function() {
				this.byDate = {}
				da = this.byDate
				orig = this.orig
				$.each(orig, function(i) {
					c = orig[i].date
					if (da.hasOwnProperty(c)) {
						toPush = $.extend(orig[i],{'qd' : Date.parse(c) })
						da[c].push(toPush)
					} else {
						toPush = $.extend(orig[i],{'qd': Date.parse(c) })
						da[c] = []
						da[c].push(toPush)
					}
				})
				return this
			},
			byPayee : function() {
				this.byPayee = {}
				da = this.byPayee
				orig = this.orig
				$.each(orig, function(i) {
					c = orig[i].payee
					if (da.hasOwnProperty(c)) {
						da[c].push(orig[i])
					} else {
						da[c] = []
						da[c].push(orig[i])
					}
				})
				return this
			}
		}
		
		obj.byDate().byPayee()
		return obj
	}

function keys(obj) {
	count = 0
	for (var prop in obj) {
		count++
	}
	return count
}

$.fn.makeHead = function(name,input) {
	$(this).append('<h2>'+name+'</h2>'+
	'<p>The county made '
	+input.orig.length+
	' disbursements to ' +
	+keys(input.byPayee)
	+ ' unique entities.</p>'
	);
}

$.fn.makeChart = function(input) {
	$c = []
	$.each(input, function(i) {
		$c.push(input[i].length)
	})
	
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
	    width = 960 - margin.left - margin.right,
	    height = 250 - margin.top - margin.bottom;

	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(10, "%");

	var svg = d3.select($(this).selector).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		data = $c
		
	  x.domain(data.map(function(d) { return d.letter; }));
	  y.domain([0, d3.max(data, function(d) { return d; })]);

	  svg.selectAll(".bar")
	      .data(data)
	    .enter().append("rect")
	      .attr("class", "bar")
	      .attr("x", function(d,i) { return i * 22; })
	      .attr("width", 20)
	      .attr("y", function(d) { return y(d); })
	      .attr("height", function(d) { return height - y(d); });

	function type(d) {
	  d.frequency = +d.frequency;
	  return d;
}
}

$.getJSON('data/jan.json', function(data) {
	jan = dat(data)
	$('#jan').makeHead('January 2014',jan)
	$('#jan').makeChart(jan.byDate)
})

$.getJSON('data/feb.json', function(data) {
	feb = dat(data)
	$('#feb').makeHead('February 2014',feb)
	$('#feb').makeChart(feb.byDate)
})