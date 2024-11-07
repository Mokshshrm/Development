import { LightningElement, track } from 'lwc';
import getAllResult from '@salesforce/apex/CreateDocument.getAllResult';


export default class taskSix extends LightningElement {

    selected = [];

    options = [
        { label: 'Account', value: 'Account(Id, Name)' },
        { label: 'Lead', value: 'Lead(Id,LastName)' },
        { label: 'Contact', value: 'Contact(Id,LastName)' }
    ]

    handleChange(event) {
        this.selected = [...event.detail.value];
        event.target.setCustomValidity('');
    }


    @track result = [];

    removeErrorInput(event) {
        const field = event.target;
        field.setCustomValidity('');
    }

    searchHandler() {

        const inputField = this.template.querySelector('lightning-input');
        const val = inputField.value;
        let isValid = true;
        if (val.length <= 1) {
            inputField.setCustomValidity('Should be Greater than 1');
            inputField.reportValidity();

            isValid = false;
        }

        if (this.selected.length === 0) {
            const field = this.template.querySelector('lightning-dual-listbox');
            field.setCustomValidity('Select Atleast one')
            field.reportValidity();

            isValid = false;
        }
        if (!isValid)
            return;

        // make search query here and get all the record as list<list<sobject> and just show whatever there is;


        let query = 'FIND \'' + val + '\' IN NAME FIELDS RETURNING ';
        this.selected.forEach(it => { query += it + ','; })

        query = query.substring(0, query.length - 1);


        getAllResult({ query: query })
            .then((res) => {
                let tmp = [];
                for (let i = 0; i < res.length; i++)
                    tmp = [...tmp, ...res[i]]
                this.result = tmp;
            })
            .catch((err) => {
                console.log(res);
            })
    }

}