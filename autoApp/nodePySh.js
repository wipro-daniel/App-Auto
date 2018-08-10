var PythonShell = require('python-shell');
const express = require('express');

var pyshell = new PythonShell('./autoApp.py');
var app = express();
console.log('before get');

//app.get('/search/:searchString', (req, res, next) => {
    app.get('/:searchString', (req, res, next) => {
    var txt = req.params.searchString;

    var message = '';
    
  // console.log(txt);

    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

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
        res.status(200).send(message);
    });

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
});


app.listen(5000, () => {
    console.log('Listening on port 5000');
})