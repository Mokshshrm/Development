public with sharing class Trigger_OpportunityUpdaCloseDateAndStage {
    
    public Trigger_OpportunityUpdaCloseDateAndStage() {
    }
    
    public void add15DaysANDChangeStage(List<Opportunity> newOpportunity){
        
        for(opportunity it : newOpportunity){
            
            it.StageName = 'Prospecting';
            it.Type = 'New Customer';
            it.CloseDate = System.today() + 15;
        }
        return;
    }
    
    public void CreateStageChangeTask(List<Opportunity> newOpportunity,Map<Id,Opportunity> oldMap){ 
        
        List<Task> TaskRecords = new List<Task>();
        
        for(opportunity it : newOpportunity){
            
            Opportunity oldOppo = oldMap.get(it.Id);
            
            if(oldOppo != null && oldOppo.Name != it.Name && it.StageName != 'Closed Won' && it.StageName != 'Closed Lost'){
                
                Task currentTask = new Task();
                
                currentTask.OwnerId = it.OwnerId;
                currentTask.whatId = it.Id;
                currentTask.Status = 'Not Started';
                currentTask.Subject = 'Checkout';
                currentTask.Priority = 'Normal';
                currentTask.ActivityDate = System.Today() + 2;
                
                TaskRecords.add(currentTask);
                
            }
            
        }
        
        
        try{
            insert TaskRecords;
        }
        catch(Exception e){
            System.debug(e.getMessage());
        }
        
        return;
    }
   
}