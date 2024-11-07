global class AsynClassPractice implements Database.Batchable <SObject> {
    
    public String Query='select ID,Name,AccountId from Opportunity';
    
    public AsynClassPractice(){
    }
    
    global Database.QueryLocator start(Database.BatchableContext BC){
        return Database.getQueryLocator(this.Query);
    }
    
    global void execute(Database.BatchableContext BC,List<Opportunity> listOFRecords){
        try{
            
            Map<Id,String> OpportuynityAccountLookUpRecords;
            
            for(Opportunity it:listOFRecords){
                if(it.AccountId != null){
                    OpportuynityAccountLookUpRecords.put(it.AccountId, it.Name);
                }
            }
            if(OpportuynityAccountLookUpRecords.isEmpty())
                return;
            
            List<Account> AccountRecords = [select Id,Name from Account Where ID IN:OpportuynityAccountLookUpRecords.keySet()];
            
            System.debug('Here is list size' + AccountRecords.size());
            
            for(Account it:AccountRecords){
                it.Name = OpportuynityAccountLookUpRecords.get(it.Id);
            }
            
            
            if(AccountRecords.isEmpty()==false)
                update AccountRecords;
        }
        catch(Exception e){
            System.debug(e.getCause());
        }
        return;
    }
    
    global void finish(Database.BatchableContext BC){
        
    }
}