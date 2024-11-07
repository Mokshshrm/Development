public without sharing class SharingAccountObject {
    
    public void SharingAccountObjectWithUser( List<Account> ListOfAccountRecords,List<User> UserWhomToShare) {
        
        // manula sharig using
        
        List<AccountShare> RecordForSharing = new List<AccountShare>();
        List<Integer> tmp = new List<Integer>();
        
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
        System.debug('Ha Hogya Bhai');
        return;
    }
}