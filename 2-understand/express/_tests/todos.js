var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://localhost:8000/todos',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "text": "finish the course"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
