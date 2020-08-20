const path = require('path')
const express= require('express')
const hbs=require('hbs');
const app= express()
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const port=process.env.PORT || 3000


const pathviews=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

console.log(partialPath)
hbs.registerPartials(partialPath)
app.set('view engine','hbs')
app.set('views',pathviews)



app.use(express.static(path.join(__dirname,'../public')))
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Akash"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Akash"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Akash"
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:"You haven't mention the address."
        })
    }
    geocode(req.query.address,(data={},error)=>{
        if(error){
            return res.send(data)   
        }
        // console.log(data)
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send(data)
            }
            //console.log(data)s
            // console.log(forecastData)
            res.send({
                
                location:data.place,
                temprature:forecastData.temperature,
                summary:forecastData.wholeItem.hourly.summary
            })
        })
    })
})        


app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        error:"Page not Found"
    })
})


// const aboutPath=path.join(__dirname,'../public/about.html')
// const helpPath=path.join(__dirname,'../public/help.html')
// app.get('/about',(req,res)=>{
//     res.send(express.static(aboutPath))
// })

// app.get('/help',(req,res)=>{
//     res.send(express.static(helpPath))
// })

app.listen(port,()=>{
    console.log("We are at port "+port)
})