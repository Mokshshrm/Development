public without sharing class CustomExceptionClass {
    
    
    public CustomExceptionClass() {
        // GenerateExceptionRecord(err);
    }
    
    // can make custom Method which will create record
    
    
    public  void GenerateExceptionRecord (Exception err){
        
        try{
            
            System.debug('Error Obj  : - '+err);
            
            Error_Log__c excep = new Error_Log__c();
            
            // if(err instanceOf DmlException){
                
            // }
            
            String stackTraceSTring = (err.getStackTraceString().split(':'))[0];
            
            String[] DescriptionArr = stackTraceSTring.split('\\.');
            
            System.debug(DescriptionArr[1]);
            
            excep.Class_Name__c = DescriptionArr.get(1);
            excep.Exception_Message__c = err.getMessage();
            excep.Exception_Type__c = err.getTypeName();
            excep.Line_Number__c  = err.getLineNumber();
            
            excep.Method_Name__c = DescriptionArr.get(2);
            
            if(err instanceOf DMLException){
                
                
                // for(Integer dml = 0;dml<err.getNumDml();dml++){
                    
                //     String[] fieldName =  err.getDmlFieldNames(dml);
                //     String moreDetailsMsg = '[ ';
                    
                //     for(Integer idx = 0;idx<fieldName.size() ;idx++){
                //         moreDetailsMsg += (fieldName[idx] + ', ');
                //     }

                //     moreDetailsMsg += err.getDmlType(dml) + ' ' + err.getDmlMessage(dml);
                //     moreDetailsMsg += ' ] \n';
                //     excep.More_Details__c = moreDetailsMsg;
                // }
                
                excep.More_Details__c = err.getNumDml().toString();
                // moreDetailsMsg.removeEnd(1);
            }
            
            insert excep;
        }
        catch(Exception e){
            System.debug(e.getMessage());
        }
        
        return;
    }
    
}