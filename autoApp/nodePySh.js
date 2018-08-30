var PythonShell = require('python-shell');
const express = require('express');
var bodyParser=require('body-parser');
//const MongoClient=require('mongodb').MongoClient;
const mongoose=require('mongoose');
const Post=require('./models/posts');

var pyshell = new PythonShell('./autoApp.py');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

//mongodb connection
///var uri="mongodb+srv://m001-student:pz50HHKQQUeFCiFf@m001-sandbox-abx9j.mongodb.net/test?retryWrites=true";
var uri='mongodb://localhost:27017/Hcdata';
mongoose.connect(uri)
.then(()=>{
    console.log('Connected to Db');
})
.catch((error)=>{
    console.log(error);
}) 
//console.log('before get');
//app.get('/search/:searchString', (req, res, next) => {
    app.get('/:searchString', (req, res, next) => {
    var txt = req.params.searchString;
    var message = ''; 
   //console.log(txt);
    /* res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true); */
    const { spawn } = require('child_process');
    const pythonProcess = spawn('python', ["./autoApp.py", txt]);
    pythonProcess.stdout.on('data', function (data) {
      // console.log(data.toString());
      // res.writeHead(200, {"Content-Type": "application/json"});
        if (data.length > 0) {
            message += data.toString();         
        }
    });
    pythonProcess.stdout.on('end', function () {
       //console.log(message);
        res.status(200).send(message);
    });
});
//Pending to use mongoose save method to update data into db.
app.post('/dbUpdate',(req,res)=>{
    console.log('in Dbupdate');
     const post=new Post({
        appName:req.body.appName,
        hcParam:req.body.hcParam,
        hcDesc:req.body.hcDesc,
        hcStat:req.body.hcStat
    }); 
  post.save();
  res.status(201).json({
      message:'HC details added successfully'
  });
      console.log(post); 
      });
         
    app.listen(5000, () => {
        console.log('Listening on port 5000');
    })

    //     pyshell.send(txt);
    //     pyshell.on('message',function(message){
    //         console.log(message);

    //         res.setHeader('Access-Control-Allow-Origin', '*');

    //     // Request methods you wish to allow
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    //     // Request headers you wish to allow
    //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //     // Set to true if you need the website to include cookies in the requests sent
    //     // to the API (e.g. in case you use sessions)
    //     res.setHeader('Access-Control-Allow-Credentials', true);


    //     res.send(message);
    //     res.end();
    //     })
    //     pyshell.end(function(err)
    //        {
    //        if (err){
    //            console.log(err);
    //        }
    //    })


