/*Taking two command line arguments: a URL and a local file path,
downloads the resource at the URL to the local path on comp.
Upon completion, prints out a message*/
const fs = require('fs');
const request = require('request');

const fetcher = args => {
  
  args = process.argv.slice(2);
  const url = args[0];
  const path = args[1];

  request(url, (error, response, body) => {
    if (error) {
      console.log('!!!!PAGE NOT FOUND!!!!!!! ', error.message);
      return;
    }
    if (response.statusCode !== 200) {
      console.log('Status error: ', response && response.statusCode);
      return;
    }
  
    fs.writeFile(path, body, err => {
      if (err) {
        console.error('Download error:', err);
        return;
      }
      console.log(`Downloaded and saved ${body.length} letters to `, path);
    });
  });
};

fetcher();