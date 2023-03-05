//start.js
const app = require('./server.js');
var config = require('./config.js');

const PORT = config.get('port');

app.listen(PORT, () => {
    console.log(`Server start at localhost:${PORT}`);
});
