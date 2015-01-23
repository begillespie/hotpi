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
            var m = moment(row.key);
            var data={
                'key'  : row.key,
                'week' : m.week(),
                'day'  : m.format('dddd').toLowerCase(),
                'date' : m.date(),
                'indoor_temp_min': row.value.indoor_temp.min,
                'indoor_temp_max': row.value.indoor_temp.max
            };
            rows.push(data);
        }
        
        // if the view didn't return any data, return an error page
        if(!rows[0]){return this.templates.error.nodata;}

        // Create an object representing every day of the month.
        var d = moment(rows[0].key);
        var month = d.month();
        var year = d.year();
        var daysinmonth = d.endOf('month').date();
        var days = [];
            for(var i=0; i<daysinmonth; i++){
                days.push({
                    'date' : i+1,
                    'day'  : moment([year,month,i+1]).format('dddd').toLowerCase(),
                    'week' : moment([year,month,i+1]).week()
                });
            }
        
        // !code lists/shared/monthly_keys.js
        
        var num_rows = rows.length;
        
        for(var i = 0; i < num_rows; i++){
            days[rows[i].date-1]=rows[i]; //Replace the row if we have data for it
            if(rows[i].indoor_temp_max){
                // Compare the high temp
                if(rows[i].indoor_temp_max > temps.records.indoor_high){
                    temps.records.indoor_high = rows[i].indoor_temp_max.toFixed(1);
                    temps.records.indoor_high_time = moment(rows[i].key).format('MMM DD');
                }
            }
            if(rows[i].indoor_temp_min){
            // Compare the low temp
                if(rows[i].indoor_temp_min < temps.records.indoor_low){
                    temps.records.indoor_low = rows[i].indoor_temp_min.toFixed(1);
                    temps.records.indoor_low_time = moment(rows[i].key).format('MMM DD');
                }
            }
        }
        
        var thisweek = days[0].week;
        var week={};
        l = days.length;
        for(i=0; i<l; i++){
            var in_min=null, in_max=null;
            if(days[i].indoor_temp_min){in_min = days[i].indoor_temp_min.toFixed(1);}
            if(days[i].indoor_temp_max){in_max = days[i].indoor_temp_max.toFixed(1);}
            week[days[i].day] = {
                'date': days[i].date,
                'indoor_temp_min': in_min,
                'indoor_temp_max': in_max,
                'startkey': moment(days[i].key).toArray(),
                'endkey': moment(days[i].key).add('day', 1).toArray()
            };
            if(days[i].day == 'saturday'){
                temps.temps.push(week);
                thisweek+=1;
                week = [];
            }
        }
        return mustache.to_html(this.templates.calendar, temps);
    });
}