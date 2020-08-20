const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/686d4111b217d02c9cd74642c0760d51/'+latitude+','+longitude
    request({"url":url,json:true},(error,response)=>{
        if (error){
            callback("Check your Internet connection",undefined)
        }else if(response.body.code=='400'){
            callback("Some thing went wrong. Please try again !!",undefined)
        }else{
            callback(undefined,{
                "timezone":response.body.timezone,
                "wholeItem":response.body,
                "temperature":''+parseFloat(((response.body.currently.temperature-32)*5/9).toFixed(2))+'°C'
            })
        }    
    })
}

module.exports=forecast
