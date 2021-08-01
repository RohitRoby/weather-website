const request = require('request');

const forecast = (lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=8270679e16ede098cf83f8e1bdadc4b7&query='+lat+','+long+'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to Weather service, Please try another search',undefined)
        }
        else if(body.error){
            console.log('Unable to find the location',undefined)
        }
        else{
            callback(undefined,{
                temp:body.current.temperature,
                feelslike:body.current.feelslike,
                desc:body.current.weather_descriptions[0]
            })
        }

    })
}

module.exports = forecast