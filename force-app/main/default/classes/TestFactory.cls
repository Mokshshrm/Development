@isTest
public class TestFactory {
    
    /**
     * ********************************************************
     * This method is test data for Lead Object
     * ********************************************************
     */
    
    public static List<Lead> createLead(Boolean doInsert,Integer numberOfLead){
        
        List<Lead> LeadRecords = new List<Lead>();
        
        for(Integer i =0 ;i < numberOfLead;++i){
            
            Lead newLead = new Lead() ;
            newLead.FirstName = 'A';
            newLead.LastName = 'Test';
            newLead.Company = 'Test Company';
            newLead.Status = 'Open - Not Contacted';
            newLead.rating = 'Warm';
            LeadRecords.add(newLead);
        }
        
        if(doInsert){
            insert LeadRecords;
        }
        
        return LeadRecords;
    }
    
    public static Void convertLead(Lead newLead ){
        
        database.leadConvert lc = new database.leadConvert();
        lc.setLeadId(newLead.id);
        leadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1];
        lc.setConvertedStatus(convertStatus.MasterLabel);
        
        Database.LeadConvertResult lcr = Database.convertLead(lc);
        lc.setOpportunityName('Cole Swain');
    }
    
    
    /**
     * ******************************************************
     * This method is test data for create Account
     * ******************************************************
     */
    
    public static List<Account> createAccount(Boolean doInsert,Integer numberOfAccounts){
        
        List<Account> AccountsRecords = new List<Account>();
        
        for(Integer i = 0 ;i<numberOfAccounts;++i){
            Account tmp = new Account();
            tmp.Name = 'Test - ' + i;
            AccountsRecords.add(tmp);
        }
        if(doInsert){
            insert AccountsRecords;
        }
        return AccountsRecords;
    }
    
    /**
     * *******************************************************
     * This method is test data for create contact object
     * *******************************************************
     */
    
    
    // public static Contact createContact(Boolean doInsert){
        //     return createContact(doInsert, createAccount(true).Id);
    // }
    
    public static List<Contact> createContact(Boolean doInsert,Integer numberOfContacts, Id accId){
        
        List<Contact> ContactRecords = new List<Contact>();
        
        for(Integer i =0 ;i<numberOfContacts;++i){
            
            Contact tmp = new Contact();
            tmp.AccountId = accId;
            tmp.FirstName = 'FirstName';
            tmp.LastName = 'LastName';
            tmp.Email = 'FirstName@test.com' + Math.floor(Math.random() * 1000);
            ContactRecords.add(tmp);
        }
        
        if(doInsert)
        {
            insert ContactRecords;
        }
        return ContactRecords;
    }
    
    /**
     * ***********************************************************
     * This method is test data for create Opportunity object
     * ***********************************************************
     */
    
    public static List<Opportunity> createOpportunity(Boolean doInsert , Id accountId, Integer numOpps) {
        
        List<Opportunity> OpportunityRecords = new List<Opportunity>();
        
        for(Integer i = 0; i < numOpps; ++i) {
            Opportunity tmp = new Opportunity();
            tmp.name = 'Account ' + i;
            tmp.accountId = accountid;
            tmp.amount = 1000;
            tmp.closeDate = Date.today().addDays(5);
            tmp.stageName = 'Prospecting';
            OpportunityRecords.add(tmp);
        }
        if(doInsert)
            insert OpportunityRecords;
        
        return OpportunityRecords;
    }
    
}