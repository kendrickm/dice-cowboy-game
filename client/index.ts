import express from 'express';
import path from 'path';

const app = express();

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server.
app.listen(5000, function() {
  console.log('Starting server on port 5000');
});
