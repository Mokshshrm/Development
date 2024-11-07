public without sharing class SheepProblem {
    
    static Boolean runSheepProblmeIssue = true;
    public SheepProblem() {

    }
    
    public void ChangeAssociatedName(List<Contact> ContactList , Map<Id,Contact> OldMap){

        if(runSheepProblmeIssue == false)
            return;

        runSheepProblmeIssue = false;
        
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
}