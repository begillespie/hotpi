function(doc) {
    if(doc.type == 'update'){
        var k = doc.timestamp.split(/-|:|\.|T/);
        // The key splits the UTC timestamp string into an array. The query can
        // use &reduce=true&group_level=N to generate statistics on the data for
        // different time periods:  N=
        // 4 -- hourly
        // 3 -- daily
        // 2 -- monthly
        // 1 -- annually

        for(i=0; i<k.length; i++){
            k[i] = k[i] * 1; // Convert strings to integers
        }
        if(k.length > 1){k[1]-=1;} // Zero-indexed months
        
        emit(k,
            {
            'indoor_temp'  : doc.indoor_temp,
            'outdoor_temp' : doc.outdoor_temp,
            'light'        : doc.light,
            'pressure'     : doc.pressure
            });
    }
}