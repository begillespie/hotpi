function(doc) {
  if(doc.type == 'update'){
      // Convert the string timestamp to an array
      emit(doc.timestamp.split(/-|T|:|\./), doc.indoor_temp);
  }
}