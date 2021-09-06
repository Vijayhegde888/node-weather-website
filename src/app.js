const path=require('path')
const express =require("express")
const app=express();
const hbs=require('hbs')
const geocode=require("./utils/geocode.js")
const forecast=require("./utils/forecast.js");
const { RSA_NO_PADDING } = require('constants');


//define paths for express config
 const publicDirectoryPath=path.join(__dirname,'../public');
 const viewsPath=path.join(__dirname,'../templates/views');
 const partialPath=path.join(__dirname,'../templates/partials');

 //set handlebars engine and view location
 app.set('view engine','hbs')
 app.set('views',viewsPath)
 hbs.registerPartials(partialPath)


 //static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather-app',
        name:'vijay'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
         name:'vijay',
         title:'About weather'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'vijayhegde123@gmail.com',
        title:"Weather Help",
        name:'vijay'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:'Help page not found',
        title:"ERRoR 404",
        name:'vijay'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:'enter a address'
        })
    }
    else {
        geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
          if (error) {
            return res.send( {error});
          } else {
            forecast(latitude,longitude, (error, forecastData) => {
              if (error) {
               return res.send( {error});
              }
              console.log(location);
              console.log(forecastData);
              res.send({
                forecast:forecastData,
                location:location,
                adddress:req.query.address
            })

            });
          }
        });
      }
    // res.send({
    //     forecast:forecastData,
    //     location:location,
    //     adddress:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must Provide a search term '
        })
    }
    res.send({
        product:[]
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'page not found',
        title:"ERRoR 404",
        name:'vijay'
    })
})

app.listen(3000,()=>{
console.log('Server is up on 3000');
})
