public class CreateDocument {
  public class Response {
    @AuraEnabled
    public String status;

    @AuraEnabled
    public Id FileId;

    @AuraEnabled
    public String FileName;
  }

  @AuraEnabled
  public static Response CreateDocumentVersion(
    String Base64String,
    String FileName,
    String format,
    Id UserId
  ) {
    Response res = new Response();

    try {
      Blob blobData = EncodingUtil.base64Decode(Base64String);

      ContentVersion attachment = new ContentVersion();

      attachment.VersionData = blobData;
      attachment.Title = FileName;
      attachment.PathOnClient = FileName;

      insert attachment;

      Id conDoc = [
        SELECT ContentDocumentId
        FROM ContentVersion
        WHERE Id = :attachment.Id
      ]
      .ContentDocumentId;

      ContentDocumentLink doc = new ContentDocumentLink();
      doc.ContentDocumentId = conDoc;
      doc.LinkedEntityId = UserId;
      doc.ShareType = 'V';

      insert doc;

      res.status = 'success';
      res.FileId = conDoc;
      res.FileName = attachment.PathOnClient;
    } catch (Exception err) {
      res.status = 'error';
      System.debug(err.getMessage());
    }

    return res;
  }

  @AuraEnabled
  public static Response createWizardAccount(
    Account accObj,
    Contact contactObj,
    Event eventObj
  ) {
    Response res = new Response();
    System.SavePoint sv = Database.setSavepoint();

    try {
      Account accRec = new Account();

      accRec.Name = accObj.Name;
      accRec.Phone = accObj.Phone;
      accRec.AccountNumber = accObj.AccountNumber;
      accRec.Site = accObj.Site;
      accRec.Type = accObj.Type;
      accRec.Ownership = accObj.Ownership;

      insert accRec;

      Contact conRec = new Contact();
      conRec.LastName = contactObj.LastName;
      conRec.FirstName = contactObj.FirstName;
      conRec.Phone = contactObj.Phone;
      conRec.Email = contactObj.Email;
      conRec.Title = contactObj.Title;
      conRec.Birthdate = contactObj.Birthdate;
      conRec.AccountId = accRec.Id;
      insert conRec;

      Event eveRec = new Event();
      eveRec.Subject = eventObj.subject;
      eveRec.OwnerId = Id.valueOf(System.UserInfo.getUserId());
      eveRec.EndDateTime = eventObj.EndDateTime;
      eveRec.StartDateTime = eventObj.StartDateTime;

      eveRec.WhatId = accObj.Id;
      eveRec.WhoId = conRec.Id;
      // ad duration of events;

      insert eveRec;

      res.status = 'SUCCESS';
    } catch (Exception err) {
      Database.rollback(sv);
      res.status = 'WRONG';
      System.debug(err.getMessage());
    }
    return res;
  }

  @AuraEnabled(cacheable=false)
  public static List<ContentVersion> getContentDocumentsLink(String lwcId) {
    System.SavePoint sv = Database.setSavepoint();
    System.debug('In Apex Method');
    List<ContentVersion> response;
    Id recordId = Id.valueOf(lwcId);

    try {
      Map<Id, ContentDocumentLink> tmpMap = (new Map<Id, ContentDocumentLink>(
        [
          SELECT Id, ContentDocumentId
          FROM ContentDocumentLink
          WHERE LinkedEntityId = :recordId
        ]
      ));
      Set<Id> ContentDocIds = new Set<Id>();

      for (ContentDocumentLink it : tmpMap.values()) {
        ContentDocIds.add(it.ContentDocumentId);
      }

      response = [
        SELECT Id
        FROM ContentVersion
        WHERE ContentVersion.ContentDocumentId IN :ContentDocIds
      ];
      System.debug(response);
      System.debug('Done');
    } catch (Exception err) {
      System.debug('Not Appearing');
      System.debug(err.getMessage());

      Database.rollback(sv);
    }
    return response;
  }

  public class wizardWrapper {
    @AuraEnabled
    public String status;

    @AuraEnabled
    public List<Account> AccountRecords;

    @AuraEnabled
    public List<Lead> LeadRecords;

    @AuraEnabled
    public List<Contact> ContactRecords;
  }
  @AuraEnabled
  public static wizardWrapper getRecordsWizardLwc() {
    wizardWrapper res = new wizardWrapper();

    try {
      res.AccountRecords = [SELECT Id, Name, Email__c FROM Account LIMIT 49999];
      res.LeadRecords = [SELECT Id, LastName, Email FROM Lead LIMIT 49999];
      res.ContactRecords = [
        SELECT Id, LastName, Email
        FROM Contact
        LIMIT 49999
      ];
      res.status = 'SUCCESS';
    } catch (Exception err) {
      res.status = 'FAILED';
      res.AccountRecords = null;
      res.LeadRecords = null;
      res.ContactRecords = null;
    }

    return res;
  }

  public class StatusResponse {
    @AuraEnabled
    public String status;
  }
  @AuraEnabled
  public static StatusResponse uSendEmails(
    List<String> EmailToSend,
    String cBody,
    String uSubject
  ) {
    for (String it : EmailToSend)
      System.debug(it);

    StatusResponse res = new StatusResponse();

    try {
      List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
      Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

      mail.setToAddresses(EmailToSend);
      mail.setSubject(uSubject);
      mail.setHtmlBody(cBody);

      mails.add(mail);

      Messaging.sendEmail(mails);

      res.status = 'SUCCESS';
    } catch (Exception err) {
      res.status = 'FAILED';
    }
    return res;
  }

  @AuraEnabled
  public static List<List<SObject>> getAllResult(String query) {
    
    List<List<SObject>> searchList;
    
    try {
      searchList = Search.query(query);
    } 
    catch (Exception err) {
      System.debug(err.getMessage());
    }
    
    return searchList;
  }
}