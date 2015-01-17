// Apache 2.0 J Chris Anderson 2011
$(function() {   
    // friendly helper http://tinyurl.com/6aow6yn
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

// I'm using Nginx to proxy CouchDB requests and rewrite URLs. In order for the 
// couchapp.jquery db URIs to work correctly, the design and db root strings
// look a little werid.
    var design = "hotpi",
        db = $.couch.db("couchdb/hotpi");
        
    function drawItems() {
        db.view(design + "/recent-items", {
            descending : "true",
            limit : 1,
            update_seq : true,
            success : function(data) {
                // Update the page on change
                setupChanges(data.update_seq);
                                
                var template = $("#recent-messages").html();
                var them = {
                    indoor_temp : data.rows[0].value.indoor_temp.toFixed(1),
                    outdoor_temp: data.rows[0].value.outdoor_temp.toFixed(1),
                    light       : data.rows[0].value.light.toFixed(0),
                    pressure    : data.rows[0].value.pressure.toFixed(2),
                    timestamp   : moment(data.rows[0].key).format('LLLL')
                };
                var html = $.mustache(template, them);
                $("#current").html(html);
            }
        });
        db.openDoc('records', {
            success: function(data){
                var template = $("#records-templ").html();
                var stache = {
                    indoor_temp_record_min          : data.indoor_temp_record_min.toFixed(2),
                    indoor_temp_record_min_timestamp: moment(data.indoor_temp_record_min_timestamp).format('LLLL'),
                    indoor_temp_record_max          : data.indoor_temp_record_max.toFixed(2),
                    indoor_temp_record_max_timestamp: moment(data.indoor_temp_record_max_timestamp).format('LLLL'),
                    outdoor_temp_record_min          : data.outdoor_temp_record_min.toFixed(2),
                    outdoor_temp_record_min_timestamp: moment(data.outdoor_temp_record_min_timestamp).format('LLLL'),
                    outdoor_temp_record_max          : data.outdoor_temp_record_max.toFixed(2),
                    outdoor_temp_record_max_timestamp: moment(data.outdoor_temp_record_max_timestamp).format('LLLL')
                };
                var html = $.mustache(template, stache);
                $("#records").html(html);
            }
        });
    }
    
    function drawLinks(){
        // Format for writing dates in the query URL
        var format = 'YYYY-MM-DD[T00:00]';
        var template = $("#navbar-templ").html();
        
        var keys = {
            // Set daily keys
            startkeyD : moment().format(format),
            endkeyD   : moment().add('d', 1).format(format),
            // Set weekly keys
            startkeyW : moment().startOf('week').format(format),
            endkeyW   : moment().startOf('week').add('week', 1).format(format),
            // Set monthly keys
            startkeyM : moment().startOf('month').format(format),
            endkeyM   : moment().endOf('month').format(format)
            };
            
            var html = $.mustache(template, keys);
            $("#nav").html(html);
        }

    drawItems();
    drawLinks();
    
    var changesRunning = false;
    function setupChanges(since) {
        if (!changesRunning) {
            var changeHandler = db.changes(since);
            changesRunning = true;
            changeHandler.onChange(drawItems);
        }
    }
 });