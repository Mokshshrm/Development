global class UpdateAccountDescription implements Database.Batchable<SObject> {
    
    String query = 'select Id,Description,Name from Account';
    
    public UpdateAccountDescription() {
        
    }
    
    global Database.QueryLocator start(Database.BatchableContext BC){
        return Database.getQueryLocator(query);
    }
    
    global void execute(Database.BatchableContext BC,List<Account> listOfAccountRecords){
        
        try{
            
            for(Account it:listOfAccountRecords){
                it.Description = (System.now().toString());
                it.NaicsDesc = (System.now().toString());
            }
            update listOfAccountRecords;
        }catch(Exception e){
            System.debug(e.getMessage());
        }
        
    }
    
    // add the daily reminder whenever All account's get updated ;
    global void finish(Database.BatchableContext BC){
        
    }
}