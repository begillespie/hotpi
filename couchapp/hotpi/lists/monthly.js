function(doc, req) {
    provides("html", function() {
        // Load dependencies
        var mustache = require('vendor/couchapp/lib/mustache');
        var moment = require('vendor/couchapp/lib/moment');
        
        var rows = []; // Read in rows returned for processing
        var temps =    {   'records':
                                {   'indoor_high': -Infinity,
                                    'indoor_low' : Infinity},
                            'temps': []
                        }; // Constructor for our output
        
        while (row = getRow()) {
            rows.push(row);
        }
        
        // if the view didn't return any data, return an error page
        if(!rows[0]){return this.templates.error.nodata;}
        
        // !code lists/shared/monthly_keys.js
        
        var num_rows = rows.length;
        temps.records = {
            'indoor_high' : -Infinity,
            'indoor_low': Infinity
        };

        for(var i = 0; i < num_rows; i++){
            // Push chart data
            var d = moment(rows[i].key);
            var timestamp = [
                d.year(),
                d.month(),
                d.date(),
                d.hour(),
                d.minute()];
            temps.temps.push(
                {'timestamp': timestamp, 
                // Round off the temperature for easy viewing
                'indoor_temp_max': rows[i].value.indoor_temp.max.toFixed(2),
                'indoor_temp_min': rows[i].value.indoor_temp.min.toFixed(2)}
            );
        
            if(rows[i].value.indoor_temp.max !== null){
                // Compare the high temp
                if(rows[i].value.indoor_temp.max > temps.records.indoor_high){
                    temps.records.indoor_high = rows[i].value.indoor_temp.max;
                    temps.records.indoor_high_time = moment(rows[i].key).format('MMM DD');
                }
            }
            if(rows[i].value.indoor_temp.min !== null){
                // Compare the low temp
                if(rows[i].value.indoor_temp.min < temps.records.indoor_low){
                    temps.records.indoor_low = rows[i].value.indoor_temp.min;
                    temps.records.indoor_low_time = moment(rows[i].key).format('MMM DD');
                }
            }
        }
        
        // Display the high/low to one decimal point
        temps.records.indoor_high = temps.records.indoor_high ? temps.records.indoor_high.toFixed(1):'-';
        temps.records.indoor_low = temps.records.indoor_low ? temps.records.indoor_low.toFixed(1):'-';
        
        return mustache.to_html(this.templates.monthly, temps);
    });
}
        