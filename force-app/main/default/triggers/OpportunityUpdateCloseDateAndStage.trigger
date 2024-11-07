trigger OpportunityUpdateCloseDateAndStage on Opportunity (before insert,before update,after update) {
    
    Trigger_OpportunityUpdaCloseDateAndStage result = new Trigger_OpportunityUpdaCloseDateAndStage();
    
    if(Trigger.isBefore && Trigger.isInsert){
        result.add15DaysANDChangeStage(Trigger.new);
    }
    if(Trigger.isAfter && Trigger.isUpdate){
        result.CreateStageChangeTask(Trigger.new, Trigger.oldMap);
    }
}