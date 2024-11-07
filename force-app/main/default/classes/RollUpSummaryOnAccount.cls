public without sharing class RollUpSummaryOnAccount {
    
    static Boolean run = true;
    private Map<Id,Account> AccountRecords;
    
    public RollUpSummaryOnAccount(){
        AccountRecords = new Map<Id,Account>();
    }
    
    public Boolean checkCanRun(){
        
        if(run){
            run = false;
            return true;
        }else{
            return run;
        }
    }
    
    
    
    //  1 ------------------- Roll Up Summary  -------------------
    
    private void AddtoTheAccount(Account CurrentAccount, Contact it,List<Account> AccountResult){
        
        // if(AccountRecords.containsKey(CurrentAccount.Id) == true){
            //     CurrentAccount = AccountRecords.get(CurrentAccount.Id);
        // }
        
        Decimal res = CurrentAccount.TotalAmount__c + it.Amount__c;
        CurrentAccount.TotalAmount__c = res;
        // AccountRecords.put(CurrentAccount.Id, CurrentAccount);
        
        AccountResult.add(CurrentAccount);
        return;
    }
    
    private void RemoveFromAccount(Account CurrentAccount, Contact it,List<Account> AccountResult){
        
        // if(AccountRecords.containsKey(CurrentAccount.Id) == true){
            //     CurrentAccount = AccountRecords.get(CurrentAccount.Id);
        // }
        
        Decimal res = CurrentAccount.TotalAmount__c - it.Amount__c;
        CurrentAccount.TotalAmount__c = res;
        // AccountRecords.put(CurrentAccount.Id, CurrentAccount);
        
        AccountResult.add(CurrentAccount);
        
        return;
    }
    
    public void CalCulateRollUpSummary(List<Contact> ContactList , Map<Id,Contact> OldMap,Map<Id,Contact> newMap){
        
        List<Account> AccountResult = new List<Account>();
        
        for(Contact it:ContactList){
            
            
            Id prevId = (OldMap==null)?null:OldMap.get(it.Id).AccountId;
            Id currentId = (newMap==null)?null:it.AccountId;
            
            Account PrevAccount = (OldMap == null || prevId == null)?null:[select Id,TotalAmount__c,Name from Account Where Account.Id = :prevId];
            Account CurrentAccount = (newMap == null || currentId == null)?null:[select Id,TotalAmount__c,Name from Account Where Account.Id = :currentId];
            
            if(newMap == null){
                if( prevId != null ){
                    RemoveFromAccount(PrevAccount, OldMap.get(it.Id), AccountResult);
                }
            }
            else if(OldMap == null){
                if(currentId != null){
                    AddtoTheAccount(CurrentAccount, it, AccountResult);
                }
            }
            else
            {
                if(prevId == null && currentId != null){
                    AddtoTheAccount(CurrentAccount, it, AccountResult);
                }
                else if(prevId != currentId && currentId == null){
                    RemoveFromAccount(PrevAccount, OldMap.get(it.Id), AccountResult);
                }
                else if(prevId != currentId){
                    RemoveFromAccount(PrevAccount,OldMap.get(it.Id),AccountResult);
                    AddtoTheAccount(CurrentAccount, it, AccountResult);
                }
                else if(OldMap.get(it.Id).Amount__c != it.Amount__c){
                    
                    Decimal res = CurrentAccount.TotalAmount__c - OldMap.get(it.Id).Amount__c;
                    CurrentAccount.TotalAmount__c = res;
                    AddtoTheAccount(CurrentAccount, it, AccountResult);
                    
                }
            }
        }
        
        if(AccountResult.isEmpty()==false)
            update AccountResult;
        
        return;
    }
    
    //  1 ------------------- Change All Contact With Associated  AccountName  -------------------
    
    public void ChangeAssociatedName(List<Contact> ContactList , Map<Id,Contact> OldMap){
        
        List<Contact> UpdateThisContacts = new List<Contact>();
        
        for(Contact it : ContactList){
            
            if( OldMap.get(it.Id).AccountId != null && it.AccountId != null && it.AccountId != OldMap.get(it.Id).AccountId){
                
                Contact[] SiblingList = [select Id,Name,AccountId from Contact Where Contact.AccountId = :OldMap.get(it.Id).AccountId and Contact.Id != :it.Id];
                
                // should we Change Account Also
                
                if(SiblingList.isEmpty() == false){
                    
                    for(Contact Sibling : SiblingList){
                        
                        
                        Sibling.AccountId = it.AccountId;
                        UpdateThisContacts.add(Sibling);
                        
                    }
                }
            }
        }
        
        if(UpdateThisContacts.isEmpty() == false)
            update UpdateThisContacts;
        
        return;
        
    }

    //  2 ------------------- The Greate_Problem  -------------------
    
    
    private void DivideAllContact(Contact it,List<Contact> InsertContacts){
        
        Account CurrentContactAccount = [select Id,Name,maxLimit__c from Account where Account.Id = :it.AccountId];
        
        if(CurrentContactAccount.maxLimit__c <= 0)
            return;
        
        Integer indx = 1;
        
        if(CurrentContactAccount.maxLimit__c < it.Limit__c){
            
            Decimal res = (it.Limit__c - CurrentContactAccount.maxLimit__c);
            
            do {
                Decimal tmp = Math.min(res,CurrentContactAccount.maxLimit__c);
                res -= tmp;
                Contact newContact = new Contact(LastName= indx + ' New ' + it.LastName , Limit__c=tmp,AccountId=it.AccountId);
                InsertContacts.add(newContact);
                System.debug('Indx' + indx);
                indx++;
            }
            while(res > 0);
            
        }
        
        it.Limit__c = Math.min(CurrentContactAccount.maxLimit__c,it.Limit__c);
        
        return;
    }
    
    public void HandleAllYourMess( List<Contact> ContactList,Map<Id,Contact> OldList){
        
        // List<Contact> DeleteContacts = new List<Contact>();
        
        List<Contact> InsertContacts = new List<Contact>();
        
        // created
        
        for(Contact it: ContactList){
            if(OldList == null || OldList.get(it.Id).Limit__c != it.Limit__c){
                if(it.AccountId != null){
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
        
        System.debug( 'Size Of Contacts :-  ' + InsertContacts.size());
        
        return;
    }
    
    public void UpdateAccountRecords(){
        
        System.debug('Here We Are');
        
        if(AccountRecords.isEmpty())
            return;
        
        List<Account> resultRecords;
        
        for(Id tmp:AccountRecords.keySet()){
            resultRecords.add(AccountRecords.get(tmp));
        }
        
        update resultRecords;
        
        System.debug('Get Updted');
        return;
    }
    
}