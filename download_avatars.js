var request = require('request');
var fs = require('fs')
console.log('Welcome to the Github Avatar Downloader');
var GITHUB_USER = "ddandipu";
var GITHUB_TOKEN = "8842a1d546871d6c1ece390908d08fdfeab049ab";
var args = process.argv.slice(2);
function getRepoContributors(repoOwner, repoName, cb){
  if (!repoOwner || !repoName) {
    console.log("Two arguments please: repo owner and repo name");
  } else {
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
          let thePictures = content[i].avatar_url;
          let theFolder = './profilePic/' + content[i].login + '.jpg';
          downloadImageByURL(thePictures, theFolder);
          }
        })
      });
  }
}

function downloadImageByURL(url, filePath) {
    request.get(url)
    .on('error', function (err) {                                   // Note 2
      throw err;
    })
    .on('response', function (response) {                           // Note 3
    })
    .pipe(fs.createWriteStream(filePath))
}


getRepoContributors(args[0], args[1], function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});