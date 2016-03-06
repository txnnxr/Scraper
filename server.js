
var request = require('request');
var cheerio = require('cheerio');

var frontPageURL = {
  url : 'http://www.pond-mag.com/',
  headers: {
    'User-Agent': 'request'
  }
};
var results = {
    'count': 0,
    'ver': 0,
    'items': []
};
/*var newItem = {
    'title': ' ',
    'subtitle': ' ',
    'imageURL': ' ',
    'articleURL': ' ',
    'URL': ' ',
    'index': ' '
};*/

//this is how to set up the loop to run every x amount of minutes 
/*var mins = 60,
    the_interval = mins * 60 * 1000;
setInterval(function() {
    //......
}, the_interval);*/

request(frontPageURL , featuredItem);
request(frontPageURL, body);

function body(error, resp, body){
    if(!error){
        var $ = cheerio.load(body);
//
        //has to be some sort of for each 
        //div.summary-item
        $('div.summary-item').each(function(i, element){
            results.count += 1;
            //forgot to actually create a new object just keeps pushing to the same one
            results.items.push({// this doesnt work either
                title : $('a.summary-title-link').text(),
                subtitle : $('div.summary-excerpt>p').text(),
                imageURL : $('img.summary-thumbnail-image').attr('data-src'),
                articleURL : $('a.summary-title-link').attr('href'),
                URL : frontPageURL.url
                //newItem.index = 0; 
            });

        });

        console.log(results);
    }
}

function featuredItem(error, resp, body){
    if(!error){

        var $ = cheerio.load(body);

        results.items.push({
            title : $('div.desc-wrapper>p>strong').text(),
            subtitle : $('div.desc-wrapper>p>a').text(),
            imageURL : $('div.banner-thumbnail-wrapper>figure>img').attr('data-src'),
            articleURL : $('div.desc-wrapper>p>a').attr('href'),
            URL : frontPageURL.url,
            //newItem.index = 0; //fIndex can always be 0 since it will always be the first one
        });

        results.count += 1;
    }
}



