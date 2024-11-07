global class ScheduleJobWhichUpdateAccountDescription implements Schedulable {
    
    global ScheduleJobWhichUpdateAccountDescription() {
        
    }
    global void execute(SchedulableContext sc){
        Id job =  Database.executeBatch(new UpdateAccountDescription(),200);
        return;
    }

}