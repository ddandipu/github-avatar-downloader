var request = require('request');
var fs = require('fs')
console.log('Welcome to the Github Avatar Downloader');
var GITHUB_USER = "ddandipu";
var GITHUB_TOKEN = "8842a1d546871d6c1ece390908d08fdfeab049ab";


function getRepoContributors(repoOwner, repoName, cb){
  var requestURL = 'https://' + GITHUB_USER+':'+ GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner +'/' + repoName +'/contributors';
  var requestObj = {
    url: requestURL,
    headers: {"User-Agent": "lighthouse student project"}
  };
  request.get(requestObj)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream('./downloaded.JSON'))
       .on('finish', function() {
        fs.readFile('./downloaded.JSON', function read(err, data) {
          if (err) {
          throw err;
          }
             content = JSON.parse(data);
             for (var i=0; i < content.length; i++) {

             request.get(content[i].avatar_url)
               .on('error', function (err) {                                   // Note 2
                 throw err;
                })
              .on('response', function (response) {                           // Note 3
                 console.log('Response Status Code: ', response.statusCode);
                })
              .pipe(fs.createWriteStream('./avatar/image' + i + '.jpg'))
           }
        })

    // Invoke the next step here however you like
   // Put all of the code here (not the best solution)         // Or put the next step in a function and invoke it
        });
        }



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});