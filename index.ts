const express: any = require("express");
const app = express();
import path = require('path');
import userrouter from './routes';

var port = 8000;

app.use(express.urlencoded()); // req.body

app.use(express.json()); // json {"":"","":""}

app.use(express.static("UI"));


app.use('/users',userrouter);

app.get('/',(req,res)=>{
    
    
    res.sendFile(__dirname + "/user/index.html");
  
    
})


app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);

})

