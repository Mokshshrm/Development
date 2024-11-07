import { api, LightningElement, track, wire } from "lwc";

import LastName from "@salesforce/schema/Contact.LastName";
import FirstName from "@salesforce/schema/Contact.FirstName";
import Birthdate from "@salesforce/schema/Contact.Birthdate";
import Email from "@salesforce/schema/Contact.Email";
import HomePhone from "@salesforce/schema/Contact.HomePhone";

import { validateData } from "./validateData";
import { CreateContact } from "./ApexMethods";

export default class CreateContactForm extends LightningElement {
  fieldApiName = {
    LastName: LastName.fieldApiName,
    FirstName: FirstName.fieldApiName,
    Birthdate: Birthdate.fieldApiName,
    Email: Email.fieldApiName,
    HomePhone: HomePhone.fieldApiName
  };

  @track inpProp = {
    [this.fieldApiName.LastName]: "",
    [this.fieldApiName.FirstName]: "",
    [this.fieldApiName.Birthdate]: "",
    [this.fieldApiName.Email]: "",
    [this.fieldApiName.HomePhone]: ""
  };

  constructor() {
    super();
  }

  renderedCallback() {}

  get LastNameVal() {
    return this.inpProp[this.fieldApiName.LastName];
  }

  get FirstNameVal() {
    return this.inpProp[this.fieldApiName.FirstName];
  }

  get BirthdateVal() {
    return this.inpProp[this.FirstNameVal.Birthdate];
  }

  get EmailVal() {
    return this.inpProp[this.fieldApiName.Email];
  }

  get HomePhoneVal() {
    return this.inpProp[this.fieldApiName.HomePhone];
  }

  handleOnchange(event) {
    const fieldName = event.target.dataset.name;
    this.inpProp = {
      ...this.inpProp,
      [fieldName]: event.target.value
    };

    event.target.setCustomValidity("");
    event.target.reportValidity();
  }

  CallApex() {
    if (validateData(this)) {
      CreateContact(this);
    } else {
    }
  }
}