function(keys, values, rereduce){
    var indoor_temps = [];
    for(var i=0; i<values.length; i++){
        indoor_temps.push(values[i].indoor_temp);
    }
    if(rereduce){
        return  {'indoor_temp_min': values.reduce(function(a,b){return Math.min(a, b.indoor_temp_min)}, Infinity),
                 'indoor_temp_max': values.reduce(function(a,b){return Math.max(a, b.indoor_temp_max)}, -Infinity)
                };
    }else{
    return {'indoor_temp_min': Math.min.apply(null, indoor_temps),
            'indoor_temp_max': Math.max.apply(null, indoor_temps)
           };
    }
}