var scraper = require('google-search-scraper');
var fs = require('fs');
var domain = require('getdomain');
var count = require('count-array-values')
var random = require('random')


function generateRandomPhone() {

  //example 1-541-754-3010
  let phoneNumber = "1" + "-" + random.int(100,999) + "-" + random.int(100,999) + "-" + random.int(1000,9999)
  return phoneNumber;
}


function crawlPhoneNumber()  {

var options = {
  query: generateRandomPhone(),
  limit: 10,
};

  scraper.search(options, function(err, url, meta) {

    if (url) {
      fs.appendFile('log.txt', url+"\n", function (err) {
        if (err) throw err;
      });
      return crawlPhoneNumber();
    }


    if(err) {
      throw err;
      }


  });

}


function countUniqueURLs() {
  var rawURLs = fs.readFileSync('log.txt').toString().split("\n");
  var processedURLs = [];

  rawURLs.forEach(function(element){
      processedURLs.push(domain.get(element));
  })

  return count(processedURLs);

}



crawlPhoneNumber();
console.log(countUniqueURLs());
