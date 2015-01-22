function(keys, values, rereduce){
    var indoor_temps = [];
    var outdoor_temps = [];
    for(var i=0; i<values.length; i++){
        indoor_temps.push(values[i].indoor_temp);
        outdoor_temps.push(values[i].outdoor_temp);
    }
    
    function process(data){
        if(rereduce){
            return  {
                    'sum' : data.reduce(function(a,b){return a+b.data.sum},0),
                    'min'  : data.reduce(function(a,b){return Math.min(a, b.data.min)}, Infinity),
                    'max'  : data.reduce(function(a,b){return Math.max(a, b.data.max)}, -Infinity),
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

    return {
            'indoor_temp' :indoor_temp,
            'outdoor_temp': outdoor_temp
            };
}