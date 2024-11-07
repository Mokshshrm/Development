public class TwoSectionAccountContact {
  public class Result {
    @AuraEnabled
    public Id accounts { get; set; }

    @AuraEnabled
    public List<Contact> contacts { get; set; }

    @AuraEnabled
    public Integer countOfContact;
  }

  @AuraEnabled
  public static Result getAccounts(String str) {
    
    Result res = new Result();

    List<AggregateResult> AgreRes = [
      SELECT AccountId, count(Id) contactCounts
      FROM Contact
      WHERE AccountId != NULL AND Contact.Account.Name LIKE :str
      GROUP BY AccountId
      LIMIT 1
    ];

    if (AgreRes.size() == 0)
      return res;

    res.accounts = (Id) (AgreRes[0].get('AccountId'));
    res.contacts = [
      SELECT LastName, AccountId
      FROM Contact
      WHERE AccountId = :res.accounts
    ];

    res.countOfContact = (Integer) AgreRes[0].get('contactCounts');

    return res;
  }

  @AuraEnabled
  public static void updateParent(String newParent, String ContactId) {
    Id recorID = Id.valueOf(ContactId);
    Id newAc = Id.valueOf(newParent);

    Contact it = [SELECT ID FROM Contact WHERE Id = :recorID];

    it.AccountId = newAc;
    update it;
    return;
  }
}