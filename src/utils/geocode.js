const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWthc2gtbWlzaHJhIiwiYSI6ImNrNzFtdzlyNTA3OTMzZmxjMHh6Y2pzd2EifQ.8XnXkWbf6zN2L61lEOiEGw&limit=1'
    
    request({"url":url,json:true},(error,response)=>{
        if(error){
            callback("Check your Internet connection !",200)
        }else if(response.body.features.length===0){
            callback({"error":address+' not found. Try another search !'},404)
        }else{
            callback({
                "place":response.body.features[0].place_name,
                "latitude":response.body.features[0].center[1],
                "longitude":response.body.features[0].center[0]
            },undefined)
            
        }

    })
    
}

module.exports=geocode
