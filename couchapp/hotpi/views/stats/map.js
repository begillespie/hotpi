function(doc) {
    if(doc.type == 'update'){
        emit(doc.timestamp.split(/-|:|\.|T/),{
        'indoor_temp'  : doc.indoor_temp,
		'outdoor_temp' : doc.outdoor_temp});
    }
}