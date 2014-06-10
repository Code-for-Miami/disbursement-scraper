// Literally just copy and paste this into the console.

// Inject jQuery into the page
(function(d, script) {
    script = d.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.onload = function(){
        // remote script has loaded
    };
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
    d.getElementsByTagName('head')[0].appendChild(script);
}(document));


// Make the empty variable
$d = ''

// Scrape and output to JSON
function toJSON() {
	$d = []
	rows = $('table[lid="List1_NS_"]').children('tbody').children()
	setInterval(function() {
		rows = rows.splice(1,rows.length)
		check = rows.length
		if (check > 0) {
			$.each(rows, function(i) {
				curr = rows[i]
				push = {}
				push.payee = curr.children[0].children[0].innerText
				push.date = curr.children[1].children[0].innerText
				push.id = curr.children[2].children[0].innerText
				push.amount = curr.children[3].children[0].innerText
				push.note = curr.children[4].children[0].innerText
				$d.push(push)
			});
		} else {
				for (var i = 1; i < 99999; i++) {window.clearInterval(i)}
				document.write(JSON.stringify($d))
		}
		window.oCV_NS_.pageAction('nextPage')
	}, 1500);
}

// Scrape and output to CSV
function toCSV() {
	$d = ''
	$d += '"payee","date","id","amount","note"\n'
	setInterval(function() {
		rows = $('table[lid="List1_NS_"]').children('tbody').children()
		rows = rows.splice(1,rows.length)
		check = rows.length
		if (check > 0) {
			$.each(rows, function(i) {
				curr = rows[i]
				push = ''
				push += '"' + curr.children[0].children[0].innerText + '",'
				push += '"' + curr.children[1].children[0].innerText + '",'
				push += '"' + curr.children[2].children[0].innerText + '",'
				push += '"' + curr.children[3].children[0].innerText + '",'
				push += '"' + curr.children[4].children[0].innerText + '"\n'
				$d += push
			});
		} else {
			for (var i = 1; i < 99999; i++) {window.clearInterval(i)}
			document.write($d)
		}
		window.oCV_NS_.pageAction('nextPage')
	}, 1500);
}