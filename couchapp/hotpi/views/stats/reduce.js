function(keys, values, rereduce){
    
    var indoor_temps = [];
    var outdoor_temps = [];
    var light_vals = [];
    var pressure_vals = [];

    for(var i=0; i<values.length; i++){
            indoor_temps.push(values[i].indoor_temp);
            outdoor_temps.push(values[i].outdoor_temp);
            light_vals.push(values[i].light);
            pressure_vals.push(values[i].pressure);
    }
    
    function process(data){
    // Takes an array and returns an object with sum, min, max and count.
    // The array can contain reduce and rereduce elements together
        if(rereduce){
            return  {
                    'sum'  : data.reduce(function(a,b){return a+b.sum},0),
                    'min'  : data.reduce(function(a,b){return Math.min(a, b.min)}, Infinity),
                    'max'  : data.reduce(function(a,b){return Math.max(a, b.max)}, -Infinity),
                    'count': data.reduce(function(a,b){return a+b.count},0)
                    };
        }else{
            return {
                    'sum'  : sum(data),
                    'min'  : Math.min.apply(null, data),
                    'max'  : Math.max.apply(null, data),
                    'count': data.length
                    };
        }
    }
    
    var indoor_temp = process(indoor_temps);
    var outdoor_temp = process(outdoor_temps);
    var light = process(light_vals);
    var pressure = process(pressure_vals);

    return {
        // Make sure the keys here match the keys emitted by the map function.
            'indoor_temp' : indoor_temp,
            'outdoor_temp': outdoor_temp,
            'light'       : light,
            'pressure'    : pressure
            };
}