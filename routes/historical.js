var express = require('express');
var router = express.Router();

// GET

app.get('/:id', function (req, res) {

    var stockname = req.params.id;
    var url = 'https://in.finance.yahoo.com/quote/' + stockname + '/history?p=' + stockname;
    var scrapData = [];

    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var tstart = html.toString().indexOf('<table class="W');
            var tend = html.toString().indexOf('</table><div class="Mstart(30px)');
            var tablethis = html.substring(tstart, tend + 8);

            var dt = cheerio.load(tablethis, {
                normalizeWhitespace: true,
                xmlMode: true
            });

            var datakeys = [];
            var theadrows = dt('table thead').find('tr')[0].children;
            for (var i in theadrows) {
                var th = theadrows[i];
                datakeys.push(th.children[0].children[0].data.split('*').join(''));
            }
            console.log('datakeys', datakeys);

            var datarows = dt('table tbody').find('tr');
            console.log('There are ' + datarows.length + ' rows of data.');

            var dummy = dt('table tbody').find('tr')[0].children[0].children[0].children[0].data;
            console.log(dummy);
            for (var j in datarows) {
                if (!isNaN(j)) {
                    var eachrow = datarows[j];
                    var rowdata = {};
                    for (var k in eachrow.children) {
                        var td = eachrow.children[k];
                        rowdata['' + datakeys[k]] = td.children[0].children[0].data;
                    }
                    scrapData.push(rowdata);
                }
            }
        }

        res.send(JSON.stringify({ data: scrapData }));

    });
})


router.get('/', function(req, res){
   res.send('GET route on things.');
});
router.post('/', function(req, res){
   res.send('POST route on things.');
});


router.get('*', function(req, res){
    res.send('GET route on things.');
 });

//export this router to use in our index.js
module.exports = router;