trigger UpdateLeadRating on Lead (before insert) {
    
    if(Trigger.isInsert){
        if(Trigger.isBefore){
            new Trigger_LeadRatingToHot().updateLeadRatingtoHot(Trigger.new);
        }
    }
}