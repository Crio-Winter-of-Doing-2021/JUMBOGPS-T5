const e = require('express')
var geojson = require('geojson-tools')

function compare( a, b ) {
    var d1 = new Date(a.timestamp)
    var d2 = new Date(b.timestamp)
    if(d1>d2)
        return -1
    else
        return 1
}

var convert = (coordinates)=>{
    var array = geojson.complexify(coordinates, 0.5)
    return geojson.toGeoJSON(array, 'LineString')
}

var parses = (data)=>{
    return { 
        geometry:{type:data.geometry.type,coordinates:data.coordinates[0]},
        properties:data.properties
    };
}

var parseNotifications = (datas)=>{
    
    let result = []
    datas.forEach(element => {
        element.track.forEach(value => {
            var obj = {
              timestamp: value.timestamp,
              seenBy: value.seenBy,
              _id: value._id,
              lat: value.lat,
              lon: value.lon,
              type: value.type,
              status: value.status,
              name: element.name,
              assetId: element._id
            }
            result.push(obj)
        });
    });

   result = result.sort(compare)
    if(result.length>100) {
        result = result.slice(0, 100)
    }
    return result
}

var parseNotification = (datas)=>{
    
    let result = []
    
        datas.track.forEach(value => {
            var obj = {
              timestamp: value.timestamp,
              seenBy: value.seenBy,
              _id: value._id,
              lat: value.lat,
              lon: value.lon,
              type: value.type,
              status: value.status,
              name: datas.name,
              assetId: datas._id
            }
            result.push(obj)
        });
   

   result = result.sort(compare)
    if(result.length>100) {
        result = result.slice(0, 100)
    }
    return result
}

module.exports = [convert, parses, parseNotifications, parseNotification]