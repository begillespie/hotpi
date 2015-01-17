function(doc) {
    if (doc.type == 'update') {
        emit(doc.timestamp, {
            indoor_temp : doc.indoor_temp,
            outdoor_temp: doc.outdoor_temp,
            pressure    : doc.pressure,
            light : doc.light
        });
    }
}