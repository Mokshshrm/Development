trigger accountTrigger on Account (before update,after update) {
    
    if(Trigger.isBefore){
        System.debug('Third');
    }
    else if(Trigger.isAfter){
        System.debug('Fourth');
    }
    
}