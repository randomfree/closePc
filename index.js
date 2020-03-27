const express = require('express');
var bodyParser = require('body-parser');
const exec = require('child_process').exec
const app = express()
const port = 3000


//对JSON请求体解析中间件
app.use(bodyParser.json());
//对urlencoded请求体解析中间件,extended:true 高级模式 false:普通 没有区别
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res) => {
    return res.sendfile("E:\\nodePro\\closePcControl\\main.html");
});

app.post('/',(req,res)=>{
    let params = req.body
    console.log(params)
    if(params.option == 'shutDownDelay'){
        let time = params.time;
        console.log('shutdowndelay_'+time);
        exec('shutdown -s -t '+time, function(err,stdout,stderr){
            if(err) {
                console.log('get weather api error:'+stderr);
            } else {
                console.log(stdout);
            }
        })
    }else if(params.option == 'cancel'){
        console.log('cancel');
        exec('shutdown -a', function(err,stdout,stderr){
            if(err) {
                console.log('取消关机 error:'+stderr);
            } else {
                console.log(stdout);
            }
        })
    }
    return res.json()
});

app.listen(port,()=>{console.log(`Example app listening on port ${port}!`)});