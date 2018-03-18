const express = require('express');
const app = express();

app.get('/', (req, res)=>{
  res.send({ hi: 'there'});
});

const PORT = process.env.PORT || 5000 // env = environment variables. If no environment variable (Eg. local machine), use default - in this case 5000
app.listen(PORT);
