public with sharing class Trigger_SendEmailWhenAccountNameUpdate {
    
    public Trigger_SendEmailWhenAccountNameUpdate() {
    }
    
    public void DeleteDuplicate(List<Account> newAccount){
        
        List<Account> DuplicateAccounts = new List<Account> ();
        
        for(Account it : newAccount){
            
            // This is  * CaseInsetive * query;
            
            Account[] DuplicateAccount = [select Id,Name from Account Where Account.Name = :it.Name];
            
            for(Account dup : DuplicateAccount){
                
                Boolean isItInClosedWonOrLost = false;
                
                Opportunity[] OpportunityWithClosedWonOrLost = [select Id,Name,StageName from Opportunity Where Opportunity.StageName='Closed Lost' or Opportunity.StageName='Closed Won'];
                
                if(!OpportunityWithClosedWonOrLost.isEmpty()){
                    
                    for(Opportunity opp:OpportunityWithClosedWonOrLost){
                        
                        if((opp.StageName=='Closed Lost' || opp.StageName=='Closed Won')){
                            isItInClosedWonOrLost = true;
                            break;
                        }
                        
                    }
                    
                }
                
                if(isItInClosedWonOrLost == false)
                    DuplicateAccounts.add(dup);
            }
            
            // it.name = ('Mv_Clouds ' + it.name);
            
        }
        
        if(DuplicateAccounts.isEmpty()==false)
            delete DuplicateAccounts;
    }
    
    public void sendForApprovalProcessAndCreateContact(List<Account> newAccounts){
        
        for(Account it:newAccounts){
            
            if(it.Rating == 'Hot'){
                
                Approval.ProcessSubmitRequest approvalRequest = new Approval.ProcessSubmitRequest();
                approvalRequest.setComments('Offer Submitted for approval');
                approvalRequest.setObjectId(it.Id);
                
                Approval.ProcessResult approvalResult = Approval.process(approvalRequest);
            }
            
        }
        
        // created contact whenerver Account is created;
        
        List<Contact> ContactListToBeCreated = New LIST<Contact>();
        
        for(Account it:newAccounts){
            ContactListToBeCreated.add(new Contact(LastName=it.Name,AccountId=it.Id));
        }
        
        insert ContactListToBeCreated;
    }
    
    public void sendEmaisToContact(List<Account> newAccount,Map<Id,Account> oldMap){
        
        List<Messaging.SingleEmailMessage> MailList = new List<Messaging.SingleEmailMessage>();
        
        for(Account it:newAccount){
            
            Account oldAccount = oldMap.get(it.Id);
            
            if(oldAccount.Name != it.Name ){
                
                
                Contact[] ContactAssociatedWithAccount = [select Email from contact where Contact.Account.Id = :it.Id and Email != null];
                
                List<String> EmailList = new List<String>();
                
                if(!ContactAssociatedWithAccount.isEmpty()){
                    for(Contact record : ContactAssociatedWithAccount){
                        EmailList.add(record.Email);
                    }
                    
                    
                    
                    Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                    
                    mail.setToAddresses(EmailList);
                    mail.setSubject('Your Account is Name Is Updated');
                    
                    String body = '';
                    body = 'Dear contact of ' + it.Name;
                    body += 'Your Account is Update from' + oldAccount.name + ' to ' + it.Name;
                    mail.setHtmlBody(body);
                    
                    MailList.add(mail);
                    
                }
                
            }
        }
        
        if(!MailList.isEmpty()){
            Messaging.sendEmail(MailList);
        }
    }
    
    public void ShareAccountsRecords(List<Account> newAccounts,Map<Id,ACcount> oldMap){
        
        List<User> UserWhomToShare = new List<User>();
        
        for(User it : [select Id,Name from User where User.Name='nachos']){
            
            if([select Id,UserOrGroupId From AccountShare Where AccountShare.UserOrGroupId=:it.Id].size() == 0){
                UserWhomToShare.add(it);
            }
            
        }
        
        if(UserWhomToShare.isEmpty()==true){
            System.debug('tu Pehle se he kya karra he');
            return;
        }
        
        List<Account> ListOfAccountRecords = new List<Account>();
        
        
        for(Account it:newAccounts){
            
            // Share only accounts with Account.Type = 'Hot' ;
            
            if(((!oldMap.containsKey(It.Id)) ||oldMap.get(it.Id).Type != it.Type) && it.Type == 'Hot'){
                ListOfAccountRecords.add(it);
            }
            
        }
        
        if(ListOfAccountRecords.isEmpty() == true)
            return;
        
        List<AccountShare> RecordForSharing = new List<AccountShare>();
        
        // List<Integer> tmp = new List<Integer>();Tri
        
        // for(User it : UserWhomToShare){
            
            for(Account AccountIt : ListOfAccountRecords){
                
                AccountShare NewSharingRecordForAccount = new AccountShare();
                
                NewSharingRecordForAccount.AccountId = (AccountIt.Id);
                NewSharingRecordForAccount.UserOrGroupId = '005dM000007IHuQQAW';
                
                NewSharingRecordForAccount.AccountAccessLevel = ('read');
                NewSharingRecordForAccount.OpportunityAccessLevel = ('read');
                NewSharingRecordForAccount.CaseAccessLevel = ('read');
                
                //  NewSharingRecordForAccount.RowCause = Schema.SObjectType.Account__Share.;
                
                
                RecordForSharing.add(NewSharingRecordForAccount);
                
            }
        // }
        
        insert RecordForSharing;
    }
}