/** Configuration for converting JSON objects received from OpenWeatherMap into display data
 * @module goatstone/data/display-config
 * */
var labels = {
    'name': 'City Name',
    'coord,lon': 'Longitude',
    'coord,lat': 'Latitude',
    'weather,0,description': 'Weather Description',
    'main,temp': 'Temperature Celsius',
    'main,humidity': 'Humidity',
    'main,temp_min': 'Minimum Temperature Celsius',
    'main,temp_max': 'Maximum Temperature Celsius',
    'wind,speed': 'Wind Speed',
    'wind,gust': 'Wind Gusts',
    'wind,deg': 'Wind Degree',
    'sys,sunrise': 'Sun Rise',
    'sys,sunset': 'Sun Set'
}

module.exports = labels