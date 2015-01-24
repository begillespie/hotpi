function(doc, req) {
    provides("html", function() {
        
        // !code lists/shared/graphlist.js
        
        // build navigation header keys
        temps.header_date     = moment(rows[0].key).format('MMM D, YYYY');
        temps.prev_link_start = moment(rows[0].key).startOf('day').subtract('d', 1).toArray();
        temps.prev_link_end   = moment(rows[0].key).startOf('day').toArray();
        temps.next_link_start = moment(rows[0].key).startOf('day').add('d', 1).toArray();
        temps.next_link_end   = moment(rows[0].key).startOf('day').add('d', 2).toArray();
        
        return mustache.to_html(this.templates.daily, temps);
    }); 
}