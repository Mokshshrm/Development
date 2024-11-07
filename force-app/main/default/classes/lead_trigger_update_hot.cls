public without sharing class lead_trigger_update_hot {
    public lead_trigger_update_hot() {
        
    }
    
    public void updateLeadRatingtoHot(List<Lead> LeadRecords){
        for(Lead it:LeadRecords)
            it.Rating = 'Hot';
    }
}