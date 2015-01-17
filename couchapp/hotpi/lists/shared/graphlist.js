// Shared code for generating graph data in the daily and weekly list fuctions        
        
        var num_rows = rows.length;
        temps.records = {
            'indoor_high'   : -Infinity,
            'indoor_low'    : Infinity,
            'outdoor_high'  : -Infinity,
            'outdoor_low'   : Infinity,
            'pressure_high' : -Infinity,
            'pressure_low'  : Infinity
        };

        for(var i = 0; i < num_rows; i++){
            var d = moment(rows[i].key);
            var timestamp = [
                d.year(),
                d.month(),
                d.date(),
                d.hour(),
                d.minute()];
                
            var in_temp  = rows[i].value.indoor_temp === null ? 'null' : Math.round(rows[i].value.indoor_temp);
            var out_temp = rows[i].value.outdoor_temp === null  ? 'null' : Math.round(rows[i].value.outdoor_temp);
            var light    = rows[i].value.light === null ? 'null' : (rows[i].value.light/1023)*100;
            var pressure = rows[i].value.pressure === null ? 'null' : rows[i].value.pressure.toFixed(2);
            
            // Push chart data
                temps.temps.push(
                    {
                    'timestamp': timestamp, 
                    'indoor_temp': in_temp,
                    'outdoor_temp': out_temp,
                    'light': light,
                    'pressure': pressure
                    }
                );
            
            if(rows[i].value.indoor_temp){
                // Compare the high temp
                if(rows[i].value.indoor_temp > temps.records.indoor_high){
                    temps.records.indoor_high = rows[i].value.indoor_temp.toFixed(1);
                    temps.records.indoor_high_time = moment(rows[i].key).format('MMM DD h:mm a');
                }
                // Compare the low temp
                if(rows[i].value.indoor_temp < temps.records.indoor_low){
                    temps.records.indoor_low = rows[i].value.indoor_temp.toFixed(1);
                    temps.records.indoor_low_time = moment(rows[i].key).format('MMM DD h:mm a');
                }
            }
            
            if(rows[i].value.outdoor_temp){
                // Compare the high temp
                if(rows[i].value.outdoor_temp > temps.records.outdoor_high){
                    temps.records.outdoor_high = rows[i].value.outdoor_temp.toFixed(1);
                    temps.records.outdoor_high_time = moment(rows[i].key).format('MMM DD h:mm a');
                }
                // Compare the low temp
                if(rows[i].value.outdoor_temp < temps.records.outdoor_low){
                    temps.records.outdoor_low = rows[i].value.outdoor_temp.toFixed(1);
                    temps.records.outdoor_low_time = moment(rows[i].key).format('MMM DD h:mm a');
                }
            }
            
            if(rows[i].value.pressure){
                // Compare the barometer
                if(rows[i].value.pressure < temps.records.pressure_low){
                    temps.records.pressure_low = rows[i].value.pressure.toFixed(2);
                    temps.records.pressure_low_time = moment(rows[i].key).format('MM DD h:mm a');
                }
                if(rows[i].value.pressure > temps.records.pressure_high){
                    temps.records.pressure_high = rows[i].value.pressure.toFixed(2);
                    temps.records.pressure_high_time = moment(rows[i].key).format('MM DD h:mm a');
                }
            }
        }
        // Check for a valid value in the records and round the high/low values
//        temps.records.indoor_high = temps.records.indoor_high ? temps.records.indoor_high.toFixed(1) : null;
//        temps.records.indoor_low = temps.records.indoor_low ? temps.records.indoor_low.toFixed(1) : null;
//        temps.records.outdoor_high = temps.records.outdoor_high ? temps.records.outdoor_high.toFixed(1) : null;
//        temps.records.outdoor_low = temps.records.outdoor_low ? temps.records.outdoor_low.toFixed(1) : null;
//        temps.records.pressure_high = temps.records.pressure_high ? temps.records.indoor_high.toFixed(2) : null;
//        temps.records.pressure_low = temps.records.pressure_low ? temps.records.pressure_low.toFixed(2) : null;
        