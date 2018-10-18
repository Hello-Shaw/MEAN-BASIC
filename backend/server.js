const express = require ('express');
const bodyParser = require ('body-Parser');
const user=require('./routes/register');
const config=require('./config');

const cors =require('cors');
const PORT=config.port;
const app=express();

const { PerformanceObserver, performance } = require('perf_hooks');
const start=performance.now()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, '/dist')));

app.use(cors());


 app.get('/',function (req,res) {
     res.send('hello from server')
});

app.use('/register',user);


 app.listen(PORT,function () {
     console.log("server running on localhost:"+PORT);
 });