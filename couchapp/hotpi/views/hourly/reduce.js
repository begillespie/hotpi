function(keys, values, rereduce){
    var count = 0;
    var in_temp_total = 0;
    var out_temp_total = 0;
    var light_total = 0;
    var pressure_total = 0;
    for(var i=0; i<values.length; i++){
        var vcount = 0;
        if(rereduce){
            vcount = values[i].length;
        }else{
            vcount = 1;
        }
        in_temp_total += values[i].indoor_temp * vcount;
        out_temp_total += values[i].outdoor_temp * vcount;
        light_total += values[i].light * vcount;
        pressure_total += values[i].pressure * vcount;
        count += vcount;
    }
    return {
        'indoor_temp' : in_temp_total/count,
        'outdoor_temp': out_temp_total/count,
        'light'       : light_total/count,
        'pressure'    : pressure_total/count
    };
}