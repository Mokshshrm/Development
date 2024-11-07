@IsTest
public  class TriggerTestingClass {
    
    @IsTest
    public static void Test_Trigger_OpportunityUpdateCloseDateAndStage(){
        
        List<Opportunity> OpportunityRecords = TestFactory.createOpportunity(false, null,1);
        
        Boolean beforeCreate = false;
        Boolean afterUpdate = false;
        Opportunity[] result;
        
        Test.startTest();
        
        // when inserting;
        insert OpportunityRecords;
        result = [select Id,StageName,closeDate,AccountId from Opportunity WHERE Opportunity.Id IN :OpportunityRecords];
        for(Opportunity it:result){
            beforeCreate |= (it.StageName != 'Prospecting' | it.Type != 'New Customer');
            it.Name = 'Test - Update';
        }
        
        // when updating;
        update result;
        result = [select Id,StageName,closeDate,AccountId from Opportunity WHERE Opportunity.Id IN :OpportunityRecords];
        for(Opportunity it:result){
            afterUpdate |= (it.Name != 'Test - Update');
        }
        
        Test.stopTest();
        
        System.assertEquals(beforeCreate, false,'Inserting Record');
        System.assertEquals(afterUpdate, false,'Updating Record');
        
        return;
    }
    
    @IsTest
    public static void Test_Trigger_UpdateLeadRating(){
        
        // performe here all typs of account's updating thing;
        Lead[] Lead_Records = TestFactory.createLead(false, 1);
        
        Test.startTest();
        insert Lead_Records;
        Test.stopTest();
        
        Lead[] resultedRecords = [select Id,Rating from Lead WHERE Lead.Id In :Lead_Records];
        System.assertEquals('Hot', resultedRecords[0].Rating,'Pass');
        
        return;
    }
    
    @IsTest
    public static void Test_Trigger_SendEmailContactIfaccountNameIsUpdated (){
        
    }
    
    @IsTest
    public static void Test_Trigger_DeleteAcccountIfContactIsDeleted(){
        
    }
}