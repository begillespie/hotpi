function(doc) {
    if(doc.type == 'update'){
        emit(doc.timestamp.substring(0,13),{
            'indoor_temp':doc.indoor_temp,
            'outdoor_temp':doc.outdoor_temp,
            'light': doc.light,
            'pressure': doc.pressure
        });
    }
}