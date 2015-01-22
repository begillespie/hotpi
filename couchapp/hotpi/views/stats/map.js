function(doc) {
    if(doc.type == 'update'){
        emit(doc.timestamp.split(/-|:|\.|T/),
        // The key splits the UTC timestamp string into an array. The query can
        // use &reduce=true&group=N to generate statistics on the data for
        // different time periods:  N=
        // 4 -- hourly
        // 3 -- daily
        // 2 -- monthly
        // 1 -- annually
            {
            'indoor_temp'  : doc.indoor_temp,
            'outdoor_temp' : doc.outdoor_temp,
            'light'        : doc.light,
            'pressure'     : doc.pressure});
            }
}