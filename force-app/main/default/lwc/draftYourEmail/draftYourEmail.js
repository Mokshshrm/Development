import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils'

export default class DraftYourEmail extends NavigationMixin(LightningElement) {

    @api emailObj;

    emailBody = '';
    fromEmail = '';
    subject = '';

    constructor() {
        super();
    }


    renderedCallback() {
        this.emailBody = this.emailObj.emailBody;
        this.fromEmail = this.emailObj.fromEmail;
        this.subject = this.emailObj.subject;
    }

    handleToFromChange(event) {

    }

    handleSubjectChange(event) {

    }

    handleBodyChange(event) {

    }

    @api fetchData() {

        const inputFields = this.template.querySelectorAll('lightning-input');

        for (let i = 0; i < inputFields.length; i++) {
            if (inputFields[i].dataset.name === 'from') {
                this.fromEmail = inputFields[i].value;
            }
            else {
                this.subject = inputFields[i].value;
            }
        }

        const body = this.template.querySelector('lightning-input-rich-text');
        this.emailBody = body.value;

        let dupObj = { ...this.emailObj };

        dupObj.fromEmail = this.fromEmail;
        dupObj.emailBody = this.emailBody;
        dupObj.subject = this.subject;
        this.emailObj = { ...dupObj }
        
        return;
    }


    // LaunchQuickAction() {

    //     var pageRef = {
    //         type: "standard__quickAction",
    //         attributes: {
    //             apiName: "Global.SendEmail",
    //         },
    //         state: {
    //             defaultFieldValues: encodeDefaultFieldValues({
    //                 HtmlBody: "Pre-populated text for the email body.",
    //                 Subject: "Pre-populated Subject of the Email",
    //                 To: "target@example.com",
    //             }),
    //         },
    //     };

    //     this[NavigationMixin.Navigate](pageRef);

    // }
}