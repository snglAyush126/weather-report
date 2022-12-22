const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app=  express();
app.use(bodyParser.urlencoded({extended : true}));
 app.use(express.static("public"));
app.get("/",function(req,res){
// ** Every app can send only once i.e we can't use res.send more than once...
// though we can write till final thing...  res.write ..and then we can send it.. simple!!

res.sendFile(__dirname + "/index.html");

})


app.post("/",function(req,res){

   const query=  req.body.city;
    const appid= "appid=daeabd3d67f4646ad81da742db5b6999";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=metric&" + appid;


    https.get(url,function(response){
   response.on("data",function(data){
   const weatherdata= JSON.parse(data)
   const temp = weatherdata.main.temp;
    const weatherdesc= weatherdata.weather[0].description;

res.write("<p style='color:lightblue ; font-family:Georgia; font-size:54px'>" + "LOCATION : "+ query +" </p>")
res.write("<p style='color:indigo; font-family:Garamond; font-size:34px'>"+"Weather Condition: " + weatherdesc+"</p>");
    const  icon = weatherdata.weather[0].icon;
    const imageurl= "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
    res.write("<p style='color:indigo; font-family:Garamond; font-size:34px'> Weather symbol: </p>");
    res.write("<img src=" + imageurl + ">");
    res.write("<p style='color:indigo; font-family:Garamond; font-size:34px'>Temperature:  " + temp + " Deg Celcius </p>");

    res.send();
   })
})
})
app.listen(3000,function(){
 console.log("server is listening on port 3000!.");
})
