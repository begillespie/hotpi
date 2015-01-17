function(doc, req) {
    provides("html", function() {
        // Load dependencies
        var mustache = require('vendor/couchapp/lib/mustache');
        var moment = require('vendor/couchapp/lib/moment');
        
        var rows = []; // Read in rows returned for processing
        var temps = {'records':{},'temps': []}; // Constructor for our output
        
        while (row = getRow()) {
            rows.push(row);
        }
        
        // if the view didn't return any data, return an error page
        if(!rows[0]){return this.templates.error.nodata;}
        
        // build navigation header keys
        temps.header_date     = moment(rows[0].key).format('MMM DD');
        temps.prev_link_start = moment(rows[0].key).subtract('d', 1).format('YYYY-MM-DD[T00:00]');
        temps.prev_link_end   = moment(rows[0].key).format('YYYY-MM-DD[T00:00]');
        temps.next_link_start = moment(rows[0].key).add('d', 1).format('YYYY-MM-DD[T00:00]');
        temps.next_link_end   = moment(rows[0].key).add('d', 2).format('YYYY-MM-DD[T00:00]');
        
        // !code lists/shared/graphlist.js
        return mustache.to_html(this.templates.daily, temps);
    }); 
}