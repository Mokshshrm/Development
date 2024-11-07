public without sharing  class ClassWhichThrowCustom {
    
    public ClassWhichThrowCustom() {
        
    }
    
    public void throwErroWhenerver(){
        try{
            insert new Opportunity();
            throw new ListException('This Class throw Manual Exception');
        }
        catch(Exception err){
            new CustomExceptionClass().GenerateExceptionRecord(err);
        }
    }
    
}