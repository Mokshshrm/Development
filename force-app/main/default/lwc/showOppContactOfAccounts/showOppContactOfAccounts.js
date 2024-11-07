import { LightningElement, wire } from 'lwc';
import getAccountsOnRecordsPage from '@salesforce/apex/ContactListController.getAccountsOnRecordsPage';
import { publish, subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import FILE_PREVIEWER_MESSAGE_CHANNEL from '@salesforce/messageChannel/filePreviewer__c';

export default class ShowOppContactOfAccounts extends LightningElement {

    @wire(MessageContext)
    context;

    value = '';
    options = [];
    rendere = true;

    constructor() {
        super();
        console.log('getted Accounts')
        getAccountsOnRecordsPage()
            .then((response) => {
                let arr = [];
                response.forEach(it => {
                    arr.push({ label: it.Name, value: it.Id });
                })

                this.options = arr;
                this.rendere = false;

            })
            .catch((err) => {
                console.log('Error Msg - ', err);
            })
    }

    get options() {
        return this.options;
    }

    handleChange(event) {
        this.value = event.detail.value;
        console.log(event.detail.value);
        publish(this.context, FILE_PREVIEWER_MESSAGE_CHANNEL, { recordId: event.detail.value }, { scope: APPLICATION_SCOPE });
    }

}