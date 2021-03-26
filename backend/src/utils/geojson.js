var geojson = require('geojson-tools')

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

module.exports = [convert, parses]