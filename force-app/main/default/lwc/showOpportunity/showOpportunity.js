import { LightningElement, wire, track } from "lwc";

import {
  publish,
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE,
  MessageContext
} from "lightning/messageService";
import FILE_PREVIEWER_MESSAGE_CHANNEL from "@salesforce/messageChannel/filePreviewer__c";
import getCOWrapperResultLwc from "@salesforce/apex/ContactListController.getCOWrapperResultLwc";

export default class ShowOpportunity extends LightningElement {
  @wire(MessageContext)
  context;

  @track opportunityList = [];

  renderedCallback() {
    console.log("opp rendered");
  }

  connectedCallback() {
    subscribe(this.context, FILE_PREVIEWER_MESSAGE_CHANNEL, (data) =>
      this.updateListOnOppo(data)
    );
  }

  updateListOnOppo(data) {
    getCOWrapperResultLwc({ recordId: data.recordId })
      .then((res) => {
        this.opportunityList = [...res.opp];
      })
      .catch((err) => {
        console.log("again error");
      });
  }
}