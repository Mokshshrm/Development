import { api, LightningElement, track } from "lwc";


import ACCOUNT_OBJECT_SCHEMA from "@salesforce/schema/Account";
import LEAD_OBJECT_SCHEMA from "@salesforce/schema/Lead";
import CONTACT_OBJECT_SCHEMA from "@salesforce/schema/Contact";
import getRecordsWizardLwc from "@salesforce/apex/CreateDocument.getRecordsWizardLwc";



export default class WizardComponentLwc extends LightningElement {

  selectedValue = "Select Object";
  option = [{ label: 'None', value: null }, { label: 'Account', value: 'Account' }, { label: 'Lead', value: 'Lead' }, { label: 'Contact', value: 'Contact' }];


  // set the data-table data
  @track data_table_data = {};
  @track data_table_column = [];


  // here we store all the data;


  @track AccountRecords = [];
  @track LeadRecords = [];
  @track contactRecords = [];

  AccountLable = [{ label: 'Id', fieldName: 'Id' }, { label: 'Name', fieldName: 'Name' }, { label: 'Email', fieldName: 'Email__c' }];
  LeadLable = [{ label: 'Id', fieldName: 'Id' }, { label: 'LastName', fieldName: 'LastName' }, { label: 'Email', fieldName: 'Email' }];
  ContactLable = [{ label: 'Id', fieldName: 'Id' }, { label: 'LastName', fieldName: 'LastName' }, { label: 'Email', fieldName: 'Email' }];

  @api SelectedRows = [];
  rendered = true;

  get account_apiname() {
    return 'Account';
  }

  get lead_apiname() {
    return 'Lead';
  }

  get contact_apiname() {
    return 'Contact';
  }

  get option() {
    return this.option;
  }


  constructor() {
    super();

    getRecordsWizardLwc()
      .then((res) => {

        if (res.status === 'SUCCESS') {

          this.AccountRecords = res.AccountRecords;
          this.LeadRecords = res.LeadRecords;
          this.ContactRecords = res.ContactRecords;
        }
      })
      .catch((err) => {
        console.log('Error Message ', err);
      })
  }


  renderedCallback() {
    console.log('rendered');
  }


  showSelection(event) {


    let tar = event.target.value;

    if (tar === 'Account') {
      this.data_table_column = [...this.AccountLable];
      this.data_table_data = [...this.AccountRecords];
    }
    else if (tar === 'Lead') {
      this.data_table_column = [...this.LeadLable];
      this.data_table_data = [...this.LeadRecords];
    }
    else if (tar === 'Contact') {
      this.data_table_column = [...this.ContactLable];
      this.data_table_data = [...this.ContactRecords];
    }

    this.selectedRows = [];
    this.selectedValue = event.target.value;
  }


  handleRowAction(event) {
    let tmp = [];
    event.detail.selectedRows.forEach((row) => {
      tmp.push(row.Email);
      console.log(row.Email)
    });
    
    console.log(tmp);
    this.selectedRows = tmp;

    return;
  }

  @api fetchData() {
    console.log('Record selector from child updating')
  }



}