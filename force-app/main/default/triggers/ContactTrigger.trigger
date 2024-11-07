trigger ContactTrigger on Contact    (before insert,after insert) {
    if(Trigger.isBefore){
        for(Contact it:Trigger.new){
            Account tmp = [select Name,Id from Account Where Id =:it.AccountId];
            tmp.Name = 'first';
            update tmp;
        }
        System.debug('first');
    }
    else if(Trigger.isAfter){
        for(Contact it:Trigger.new){
            Account tmp = [select Name,Id from Account Where Id =:it.AccountId];
            tmp.Name = 'second';
            update tmp;
            System.debug('second');
        }
    }
}