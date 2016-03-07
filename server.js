
var request = require('request');
var cheerio = require('cheerio');

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
}];

var results = {
    'count': 0,
    'ver': 0,
    'items': []
};


//this is how to set up the loop to run every x amount of minutes 
/*var mins = 60,
    the_interval = mins * 60 * 1000;
setInterval(function() {
    //......
}, the_interval);*/

//make sure to parse out special charcters at the end 

//issues
//cant use the urls in the body
//results only need to be printed once loop is done... callbacks?

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
    }
});

setTimeout(run,500);
setTimeout(function(){console.log(results);},3000);

//scrape(callback);
function run(){
  for(var i = 0; i < urls.length; i++){
      request(urls[i], function(error, resp, body){
        if(!error){
          var $ = cheerio.load(body);
            $('div.summary-item').each(function(){
                results.items.push({// this doesnt work either
                  title : $('a.summary-title-link' , this).text(),
                  subtitle : $('div.summary-excerpt>p', this).text(),
                  imageURL : $('img.summary-thumbnail-image', this).attr('data-src'),
                  articleURL : $('a.summary-title-link', this).attr('href'),
                  URL : urls[cntr].url, //can't call the urls array
                  index : results.count,
                  featured : false
                });
              results.count += 1;
            });
        }
      });
  }
}


//array of urls or array or URL objects?
//URL : urls[i].url
//body func set to iterate through the array of urls?
//as of now all the urls set to the last one results was set to

//for loop around the each with the url arrays length as the set


