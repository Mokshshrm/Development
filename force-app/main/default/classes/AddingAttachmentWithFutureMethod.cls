public without sharing class AddingAttachmentWithFutureMethod {
    
    @future(callout=true)
    public static void futureAttachment(Id OpportunityRecord){
        
        System.debug('FutureAttachment Class'+ OpportunityRecord);
        
        // String apiUrl = 'https://api.unsplash.com/photos/random/?count=1&client_id=WbV0mRLYHIk7uIfMNGJouPwynxlPibdmD5dg7P1b-YY';
        
        Http http = new Http();
        
        // HttpRequest request = new HttpRequest();
        // http.Authorization = '';
        // request.setHeader('AuthoAuthorization', 'Client-ID  ');
        // request.setEndpoint(apiUrl);
        // request.setMethod('GET');
        
        
        // HttpResponse response = http.send(request);
        
        // If the request is successful, parse the JSON response.
        // if(response.getStatusCode() != 200){
            //     System.debug('Nhi ayi');
            //     return;
        // }
        
        // List<Map<String, Object>> result = (List<Map<String, Object>>) JSON.deserializeuntyped(response.getBody());
        
        
        // List<Object> animals = (List<Object>) results.get('animals');
        
        // System.debug('Received the following animals:');
        
        // for(Object animal: animals) {
            //     System.debug(animal);
        // }
        
        // System.debug(result.size());
        // System.debug(result[0].get('urls'));
        
        // get the image file and store in salesforce CRM
        
        try{
            
            // attachment.FileExtension = '';
            
            ContentVersion attachment = new ContentVersion();
            HttpRequest getImageData = new HttpRequest();
            
            String imageUrl = 'https://images.unsplash.com/photo-1727200447893-497cd89d9fde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjQ1NTR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjg4OTU1MDB8&ixlib=rb-4.0.3&q=85';
            
            getImageData.setEndpoint(imageUrl);
            getImageData.setMethod('GET');
            
            // getImageData.setHeader('AuthoAuthorization', 'Client-ID  WbV0mRLYHIk7uIfMNGJouPwynxlPibdmD5dg7P1b-YY');
            
            HttpResponse response = http.send(getImageData);
            
            // attachment.ContentUrl = 'https://images.unsplash.com/photo-1727200447893-497cd89d9fde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjQ1NTR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjg4OTU1MDB8&ixlib=rb-4.0.3&q=85';
            
            System.debug('Here is url');
            attachment.VersionData = response.getBodyAsBlob();
            attachment.Title = 'Image - ' + OpportunityRecord;
            // // attachment.ContentUrl = imageUrl;
            
            attachment.PathOnClient = ('Image_Opportunity_' + '.png').toLowerCase();
            
            insert attachment;
            
            ContentDocumentLink doc = new ContentDocumentLink();
            Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:attachment.Id].ContentDocumentId;
            
            doc.ContentDocumentId = conDoc;
            doc.LinkedEntityId = OpportunityRecord;
            doc.ShareType = 'V';
            // doc.Visibility = 'I';
            
            // Attachment tmp = new Attachment();
            
            insert doc;
            
        }catch(Exception e){
            System.debug(e.getMessage());
            return;
        }
        // Share document to uers and groups;
    }
}