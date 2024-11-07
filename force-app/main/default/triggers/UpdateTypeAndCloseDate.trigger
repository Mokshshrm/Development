trigger UpdateTypeAndCloseDate on Opportunity (before insert,before update,after update) {
    
    for(opportunity it : Trigger.new){
        
        if(Trigger.isInsert){
            it.StageName = 'Prospecting';
            it.Type = 'New Customer';
        }
        
        
        if(Trigger.isAfter && Trigger.isUpdate ){
            
            Opportunity oldOppo = Trigger.oldMap.get(it.Id);
            
            if(oldOppo!=null && oldOppo.Name != it.Name && it.StageName != 'Closed Won' && it.StageName != 'Closed Lost'){
                
                Task currentTask = new Task();
                currentTask.OwnerId = it.OwnerId;
                currentTask.whatId = it.Id;
                currentTask.Status = 'Not Started';
                currentTask.Subject = 'Checkout';
                currentTask.Priority = 'Normal';
                currentTask.ActivityDate = System.Today() + 2;
                insert currentTask;
            }
        }
    }
    
}