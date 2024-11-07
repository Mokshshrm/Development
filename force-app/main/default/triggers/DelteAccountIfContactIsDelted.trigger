trigger DelteAccountIfContactIsDelted on Contact (before delete, after insert,after update, before insert, before update) {
    
    Trigger_DeleteAccount RollUpOBj = new Trigger_DeleteAccount();
    
    // if(Trigger.isInsert){
        //     if(Trigger.isAfter){
            //         RollUpOBj.CreateEvents(Trigger.new);
        //     }
    // }
    // else if(Trigger.isDelete){
        
        //     if(Trigger.isAfter){
            //         RollUpOBj.deleteDuplicate(Trigger.old);
        //     }
    // }
    
    
    // (Trigger.isBefore && Trigger.isDelete )
    // Roll-Up Summary On Account TotalAmount__c
    
    
    if((Trigger.isAfter && Trigger.isUpdate) || (Trigger.isAfter && Trigger.isInsert)){
        System.debug('2');
        RollUpOBj.CalCulateRollUpSummary(Trigger.new, Trigger.oldMap, Trigger.isInsert,Trigger.isDelete);
    }
    
    //  Contact Account_Name is Changed Will be Automatically Change all Parent Account Associated Values
    
    if((Trigger.isUpdate && Trigger.isAfter)){
        System.debug('3');
        RollUpOBj.ChangeAssociatedName(Trigger.new, Trigger.oldMap);
        // RollUpOBj.UpdateAccountRecords();
    }
    
    if((Trigger.isInsert && Trigger.isBefore) || (Trigger.isUpdate && Trigger.isBefore)){
        System.debug('1');
        RollUpOBj.HandleAllYourMess(Trigger.new,Trigger.oldMap);
    }
    
    // If Contact Limit Exceed from Account maxLimit Will be Distributed Within maxLimit ;
    
    
}