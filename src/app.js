const express = require('express');
const path = require('path');
const hbs =require('hbs');

//utils
const geoCode = require('./utils/geoCode');
const forecast= require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000

//Paths for express config
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup express handlers and view engine
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//static directory
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Rohit'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Rohit',
        img_src:'/img/img1.jpg'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Rohit',
        msg:'Let me help you'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return  res.send({
            error:'must provide an address ',
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,{temp,feelslike,desc})=>{
            if(error){
                return res.send({error})
            }
            res.send({
                temperature:temp,
                feelslike:feelslike,
                Weather_description:desc,
                location:location,
                address:req.query.address
            })
        })
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Must enter search term'
        })
    }
        console.log(req.query.search) 
        res.send({
            products:[]    
        })   

    
})

//help 404 page
app.get('/help/*',(req,res)=>{
    res.status(404).render('404',{
        title:'404 Page',
        error_msg:'Help article not found',
        name:'Rohit Roby'
    })
})

//generic 404 error page
app.get('*',(req,res)=>{
    res.status(404).render('404',{
        title:'404 Page',
        error_msg:'Page not Found',
        name:'Rohit Roby'
    })
})

app.listen(port,()=>{
    console.log("server running on port "+port)
});
