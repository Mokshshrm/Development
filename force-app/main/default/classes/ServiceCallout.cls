global class ServiceCallout {
    
    // private ApexPages.StandardController controller;
    // public ServiceCallout(ApexPages.StandardController controller) {
        //     this.controller = controller;
    // }
    
    // @InvocableMethod
    
    // @AuraEnabled
    
    //  Invokable Variable For Input
    
    
    @InvocableMethod(label='CallService' description='Image will be added to the Attachment & Notes')
    public static void CallFuture(List<String> inputList){
        
        try{
            Id recordId = id.valueOf(inputList[0]);
            AddingAttachmentWithFutureMethod.futureAttachment(recordId);
        }
        catch(Exception e){
            System.debug(e.getMessage());
        }
    }
    
    // public class Request{
        //     @InvocableVariable
        //     public List<Id> RecordIds;
    // }
    
}