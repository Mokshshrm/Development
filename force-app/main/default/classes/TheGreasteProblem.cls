public with sharing class TheGreasteProblem {
    
    public TheGreasteProblem() {
        
    }
    
    private void DivideAllContact(Contact it,List<Contact> InsertContacts){
        
        Account CurrentContactAccount = [select Id,Name,maxLimit__c from Account where Account.Id = :it.AccountId];
        Integer indx = 1;

        if(CurrentContactAccount.maxLimit__c < it.Limit__c){
            
            Decimal res = (it.Limit__c - CurrentContactAccount.maxLimit__c);
            
            do{
                Decimal tmp = Math.min(res,CurrentContactAccount.maxLimit__c);
                res -= tmp;
                Contact newContact = new Contact(LastName= indx + ' New ' + it.LastName , Limit__c=tmp,AccountId=it.AccountId);
                InsertContacts.add(newContact);
                indx++;
            }
            while(res > 0);
            
        }
        
        it.Limit__c = Math.min(CurrentContactAccount.maxLimit__c,it.Limit__c);
        
        return;
    }
    
    public void HandleAllYourMess(List<Contact> ContactList,Map<Id,Contact> OldList){
        
        // List<Contact> DeleteContacts = new List<Contact>();
        List<Contact> InsertContacts = new List<Contact>();
        
        // created
        
        for(Contact it: ContactList){
            
            if(OldList == null || OldList.get(it.Id).Limit__c != it.Limit__c){
                if(it.AccountId != null && it.Account.maxLimit__c > 0){
                    DivideAllContact(it,InsertContacts);
                }
            }
        }
        
        // if(DeleteContacts.isEmpty() == false){
            //     delete DeleteContacts;
        // }
        
        if(InsertContacts.isEmpty() == false){
            insert InsertContacts;
        }
        
        System.debug( 'Size Of Contacts' + InsertContacts.size());
        
        return;
    }
}