var request = require('request');
var fs = require('fs')
console.log('Welcome to the Github Avatar Downloader');
var GITHUB_USER = "ddandipu";
var GITHUB_TOKEN = "8842a1d546871d6c1ece390908d08fdfeab049ab";
var args = process.argv.slice(2);
// variables required for function to work are now set
function getRepoContributors(repoOwner, repoName, cb){
  if (!repoOwner || !repoName) {
    console.log("Two arguments please: repo owner and repo name");
    //if either parameter do not exist, print the above message to console
  } else {
    var requestURL = 'https://' + GITHUB_USER+':'+ GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner +'/' + repoName +'/contributors';
    // this concatenate the URL we will need to pass to get the JSON string
    var requestObj = {
      url: requestURL,
      headers: {"User-Agent": "lighthouse student project"}
      // this ensures we can access the JSON string
    };
    request.get(requestObj)               // Note 1
      .on('error', function (err) {                                   // Note 2
           throw err;
      })
      .on('response', function (response) {                           // Note 3
           console.log('Response Status Code: ', response.statusCode);
      })
      .pipe(fs.createWriteStream('./downloaded.JSON'))
      // this prints the accessed JSON string into a new JSON file
      .on('finish', function() {
        fs.readFile('./downloaded.JSON', function read(err, data) {
        if (err) {
          throw err;
        }
          content = JSON.parse(data);
          // this reads the downloaded.JSON file and parses the contents so we can apply for loop
          //to the resulting array
          for (var i=0; i < content.length; i++) {
          let thePictures = content[i].avatar_url;
          let theFolder = './profilePic/' + content[i].login + '.jpg';
          // I've created a folder within the directory called profilePic where the image will be saved
          //the two let enables me to remove the index from the parameter which I pass to the below function
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
// the function above prints the image contained in URL to a filepath


getRepoContributors(args[0], args[1], function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

// call the function from the node