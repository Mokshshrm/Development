public without sharing class Trigger_LeadRatingToHot {
    public Trigger_LeadRatingToHot() {
        
    }
    public void updateLeadRatingtoHot(List<Lead> LeadRecords){
        for(Lead it:LeadRecords)
            it.Rating = 'Hot';
    }
}