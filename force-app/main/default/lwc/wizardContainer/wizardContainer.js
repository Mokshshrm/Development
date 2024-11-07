import uSendEmails from '@salesforce/apex/CreateDocument.uSendEmails';
import { LightningElement } from 'lwc';

export default class WizardContainer extends LightningElement {
    cmp_no = '1';

    cmp_no_1 = true;
    cmp_no_2 = false;
    cmp_no_3 = false;


    // 
    SelectedRows = ['yelameb115@cironex.com'];

    // data of children  ;;

    emailObj = {
        emailBody: '',
        fromEmail: '',
        subject: ''
    }

    //

    renderedCallback() {

        if (this.cmp_no === '1') {
            this.cmp_no_1 = true;
            this.cmp_no_2 = false;
            this.cmp_no_3 = false;
        }
        else if (this.cmp_no === '2') {

            this.cmp_no_1 = false;
            this.cmp_no_2 = true;
            this.cmp_no_3 = false;
        }
        else if (this.cmp_no === '3') {

            this.cmp_no_1 = false;
            this.cmp_no_2 = false;
            this.cmp_no_3 = true;
        }
        else {
            console.log('Not getting values')
        }

    }


    prevBtn(event) {

        this.fetchDataFromChild();
        this.cmp_no = Math.max(+this.cmp_no - 1, 1).toString();

    }

    nextBtn(event) {

        this.fetchDataFromChild();
        this.cmp_no = Math.min(+this.cmp_no + 1, 3).toString();

    }

    fetchDataFromChild() {

        console.log(this.cmp_no);

        if (this.cmp_no == '1') {

            const component = this.template.querySelector('c-wizard-component-lwc');
            component.fetchData();
            console.log(component.SelectedRows);
            // this.SelectedRows = component.SelectedRows;

            console.log(component.SelectedRows)

        }
        else if (this.cmp_no == '2') {

            const component = this.template.querySelector('c-draft-your-email');
            component.fetchData();

            this.emailObj = component.emailObj

        }
        else if (this.cmp_no == '3') {
            console.log('Email')
            console.log(this.SelectedRows);
            this.SelectedRows.forEach(it=>{
                console.log(it);
            })
            uSendEmails({ EmailsToSend: [...this.SelectedRows], cBody: this.emailObj.emailBody, uSubject: this.emailObj.subject })
                .then((res) => {
                    console.log(res.status);
                    console.log('done')
                })
                .catch((err) => {
                    console.log('Err ', err);
                })
        }

    }

}