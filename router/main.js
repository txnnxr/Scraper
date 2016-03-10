var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

    var urls = [
      {
        url : 'http://www.pond-mag.com/',
        headers: {
          'User-Agent': 'request'
        }
      },
      {
        url : 'http://www.pond-mag.com/editorials-2/',
        headers: {
          'User-Agent': 'request'
        }
      },
      {
        url : 'http://www.pond-mag.com/spotlight/',
        headers: {
          'User-Agent': 'request'
        }
      },
      {
        url : 'http://www.pond-mag.com/interviews/',
        headers: {
          'User-Agent': 'request'
        }
      },
      {
        url : 'http://www.pond-mag.com/diaries-1/',
        headers: {
          'User-Agent': 'request'
        }
      },
      {
        url : 'http://www.pond-mag.com/photography-1/',
        headers: {
          'User-Agent': 'request'
        }
      },
      {
        url : 'http://www.pond-mag.com/featured-artists/',
        headers: {
          'User-Agent': 'request'
        }
      },
      {
        url : 'http://www.pond-mag.com/literature-/',
        headers: {
          'User-Agent': 'request'
        }
      }
    ];

      var results = {
        'count': 0,
        'ver': 0,
        'items': []
    }; 

    var mins = .5, //every 6 hours 
        the_interval = mins * 60 * 1000;

module.exports = function(app){
	app.get('/',function(req,res){
    
  res.render('index.html');


   featuredItem(function(){
      bodyItems(function(){
        writeFile(function(){
          console.log(process.memoryUsage());
        });
      });
    });


    function featuredItem(callback){
      request(urls[0], function(error, resp, body){
        if(!error){
            //featured item
            //is either first or after the first run of the body 
            var $ = cheerio.load(body);
                results.items.push({
                    title : $('div.desc-wrapper>p>strong').text(),
                    subtitle : $('div.desc-wrapper>p>a').text(),
                    imageURL : $('div.banner-thumbnail-wrapper>figure>img').attr('data-src'),
                    articleURL : $('div.desc-wrapper>p>a').attr('href'),
                    URL : urls[0].url,
                    index : results.count, //fIndex can always be 0 since it will always be the first one
                    featured : true
                });
            results.count += 1;
            callback();
        }
      });
    };

    function bodyItems(callback){
      var totaltasks = urls.length;
      var tasksfinished = 0;
      var check = function() {
        if(totaltasks == tasksfinished) {
          callback();
        }
      }
      for(var i = 0; i < totaltasks; i++){
        s(i);
        function s(k){
          request(urls[k], function(error, resp, body){
            if(!error){
              var $ = cheerio.load(body);
              $('div.summary-item').each(function(){
                  results.items.push({// this doesnt work either
                    title : $('a.summary-title-link' , this).text(),
                    subtitle : $('div.summary-excerpt>p', this).text(),
                    imageURL : $('img.summary-thumbnail-image', this).attr('data-src'),
                    articleURL : $('a.summary-title-link', this).attr('href'),
                    URL : urls[k].url, //can't call the urls array
                    index : results.count,
                    featured : false
                  });
                results.count += 1;
              });
            }
            tasksfinished++;
            check();
          });
        }
      }
    };

  	function writeFile(callback){
        fs.writeFile('views/pondJson.json', JSON.stringify(results));
  			res.render('index.html');
        console.log(results.ver);
          results.ver += 1;
          console.log(results.count);
          results.count = 0;
          results.items = [];
        callback();
    	};

	});
}