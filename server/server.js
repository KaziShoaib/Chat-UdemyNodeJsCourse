const path = require('path');

const express = require('express');

const publicPath = path.join(__dirname,'../public');
const port = procss.env.PORT||3000;

let app = express();
app.use(express.static(publicPath));

app.listen(port, ()=>{
  console.log(`Server is listening to port ${port}`);
});
