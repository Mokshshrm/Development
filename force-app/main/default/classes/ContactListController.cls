public class ContactListController {
  public class Response {
    @AuraEnabled
    public String status { get; set; }
    @AuraEnabled
    public String SuccessMessge { get; set; }
    @AuraEnabled
    public String ErrorMessage { get; set; }
    @AuraEnabled
    public String Id { get; set; }
  }

  public class COWrapper {
    @AuraEnabled
    public String statusOfCO { get; set; }
    @AuraEnabled
    public List<Opportunity> opp { get; set; }
    @AuraEnabled
    public List<Contact> contacts { get; set; }
  }

  @AuraEnabled
  public static Response CreateContacRecord(Contact requireData) {
    Response res = new Response();

    try {
      insert requireData;
      res.status = 'SUCCESS';

      res.SuccessMessge = 'Successfully created contact';
      res.ErrorMessage = null;
    } catch (Exception e) {
      res.status = 'FAILED';
      res.ErrorMessage = e.getMessage();
      res.SuccessMessge = null;
    }
    return res;
  }

  @AuraEnabled
  public static List<Account> getAccountsOnRecordsPage() {
    Account[] accoutesRecords = [SELECT Id, Name FROM Account LIMIT 49999];
    return accoutesRecords;
  }

  @AuraEnabled
  public static COWrapper getCOWrapperResult(Id accId) {
    COWrapper res = new COWrapper();
    System.debug(accId);

    try {
      Contact[] contactRecords = [
        SELECT Id, LastName
        FROM Contact
        WHERE AccountId = :accId
        LIMIT 49999
      ];

      Opportunity[] oppRecords = [
        SELECT Id, Name
        FROM Opportunity
        WHERE AccountId = :accId
        LIMIT 49999
      ];

      res.statusOfCO = 'SUCCESS';
      res.contacts = contactRecords;
      res.opp = oppRecords;
    } catch (Exception err) {
      res.statusOfCO = 'FAILED';
    }

    return res;
  }

  @AuraEnabled
  public static Response LwcCreateContactRecord(Contact requireData) {
    Response res = new Response();

    try {
      insert requireData;
      res.status = 'SUCCESS';
      res.SuccessMessge = 'Successfully created contact';
      res.ErrorMessage = null;
      res.Id = requireData.Id;
    } catch (Exception e) {
      res.status = 'FAILED';
      res.ErrorMessage = e.getMessage();
      res.SuccessMessge = null;
      System.debug(e.getMessage());
    }
    return res;
  }
  @AuraEnabled
  public static COWrapper getCOWrapperResultLwc(String recordId) {
    COWrapper res = new COWrapper();
    Id accId = Id.valueOf(recordId);

    System.debug(accId);

    try {
      Contact[] contactRecords = [
        SELECT Id, LastName
        FROM Contact
        WHERE AccountId = :accId
        LIMIT 49999
      ];

      Opportunity[] oppRecords = [
        SELECT Id, Name
        FROM Opportunity
        WHERE AccountId = :accId
        LIMIT 49999
      ];

      res.statusOfCO = 'SUCCESS';
      res.contacts = contactRecords;
      res.opp = oppRecords;
    } catch (Exception err) {
      res.statusOfCO = 'FAILED';
    }

    return res;
  }
}