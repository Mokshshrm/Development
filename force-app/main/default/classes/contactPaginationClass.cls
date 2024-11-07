public  class contactPaginationClass {
    
    @AuraEnabled
    public static List<Contact> getConactOfAcccount(Id str){
        
        List<Contact> res = [SELECT LastName FROM Contact WHERE Contact.AccountId=:str  LIMIT 200];
        
        return res;
        
    }
    
    @AuraEnabled
    public static List<Contact> SearchContact(String keyWords,Id accId){
        
        List<String> likeKeyWords = new List<String>();
        
        likeKeyWords.add('%'+keyWords);
        likeKeyWords.add('%' + keyWords + '%');
        likeKeyWords.add(keyWords + '%');
        
        List<Contact> res = [SELECT LastName FROM Contact WHERE AccountId=:accId AND LastName LIKE :likeKeyWords ORDER BY LastName LIMIT 200];

        return res;
        
    }
}