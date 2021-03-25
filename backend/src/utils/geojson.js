var geojson = require('geojson-tools')

var convert = (coordinates)=>{
    var array = geojson.complexify(coordinates, 0.5)
    return geojson.toGeoJSON(array, 'LineString')
}

var parses = (data)=>{
    
    data.geometry = geojson.toGeoJSON(data.coordinates[0], 'LineString')

    return data
}

module.exports = [convert, parses]