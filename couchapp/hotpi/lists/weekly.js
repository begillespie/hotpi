function(doc, req) {
    provides("html", function() {
        
        // !code lists/shared/graphlist.js
        
        // build navigation header keys            
        temps.header_date     = moment(rows[0].key).startOf('week').format('MMM DD')+' - '+moment(rows[0].key).endOf('week').format('MMM DD');
        temps.prev_link_start = moment(rows[0].key).startOf('week').subtract('week', 1).toArray();
        temps.prev_link_end   = moment(rows[0].key).startOf('week').toArray();
        temps.next_link_start = moment(rows[0].key).startOf('week').add('week', 1).toArray();
        temps.next_link_end   = moment(rows[0].key).startOf('week').add('week', 2).toArray();
        
        return mustache.to_html(this.templates.weekly, temps);
    }); 
}