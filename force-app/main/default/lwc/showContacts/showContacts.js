import { LightningElement, track, wire } from "lwc";

import {
  publish,
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE,
  MessageContext
} from "lightning/messageService";
import FILE_PREVIEWER_MESSAGE_CHANNEL from "@salesforce/messageChannel/filePreviewer__c";

import getCOWrapperResultLwc from "@salesforce/apex/ContactListController.getCOWrapperResultLwc";

export default class ShowContacts extends LightningElement {
  renderedCallback() {
    console.log("conact rendered");
  }

  @wire(MessageContext)
  context;

  @track contactList = [];

  connectedCallback() {
    subscribe(this.context, FILE_PREVIEWER_MESSAGE_CHANNEL, (data) =>
      this.updateList(data)
    );
  }

  updateList(data) {
    getCOWrapperResultLwc({ recordId: data.recordId })
      .then((res) => {
        console.log(res);
        this.contactList = [...res.contacts];
      })
      .catch((err) => {
        console.log("again error");
      });
    return;
  }
}