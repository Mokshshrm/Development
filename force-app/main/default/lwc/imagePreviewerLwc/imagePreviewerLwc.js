import { api, LightningElement, wire, track } from "lwc";
import {
  subscribe,
  MessageContext,
  publish,
  unsubscribe,
  APPLICATION_SCOPE
} from "lightning/messageService";
import FILE_PREVIEWER_MESSAGE_CHANNEL from "@salesforce/messageChannel/filePreviewer__c";
import getContentDocumentsLink from "@salesforce/apex/CreateDocument.getContentDocumentsLink";

export default class ImagePreviewerLwc extends LightningElement {
  @api recordId;

  @wire(MessageContext)
  messagecontext;

  // should get updated whenever the message are receiving in message channel

  // @wire()
  rederer = true;

  renderedCallback() {
    if (this.rederer) {
      const data = { recordId: this.recordId };
      this.handleThisData({ recordId: this.recordId });
      this.rederer = !this.rederer;
    }
  }

  @track fileList = [];

  // get filelistItems() {
  //     if (this.fileList) {
  //         return this.fileList;
  //     }
  // }

  connectedCallback() {
    this.subscribeMessage();
  }

  // disconnectedCallback() {
  // }

  subscribeMessage() {
    console.log("subscribing message channel");
    subscribe(this.messagecontext, FILE_PREVIEWER_MESSAGE_CHANNEL, (data) => {
      this.handleThisData(data);
    });
  }

  handleThisData(data) {
    console.log("in Handle This Data", data);
    getContentDocumentsLink({ lwcId: data.recordId })
      .then((res) => {
        console.log("Server response ", res);
        this.fileList = [...res];
      })
      .catch((err) => {
        console.log("We got error");
      });

    return;
  }
}