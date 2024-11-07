import { api, LightningElement, track, wire } from "lwc";

import { UploadFileWithApex } from "./apexMethod.js";
import { updateRecord } from "lightning/uiRecordApi";
import CONTACT_OBJECT from "@salesforce/schema/Contact";

import {
  subscribe,
  MessageContext,
  publish,
  unsubscribe,
  APPLICATION_SCOPE
} from "lightning/messageService";
import FILE_PREVIEWER_MESSAGE_CHANNEL from "@salesforce/messageChannel/filePreviewer__c";

export default class FileUploadMechanism extends LightningElement {
  @api files;
  @api recordId;
  @track actualData = [];

  @wire(MessageContext)
  context;

  rendered = true;

  constructor() {
    super();
  }

  renderedCallback() {
    if (this.rendered) {
      let tmp = [];
      this.files.forEach((it) => {
        const obj = {
          id: it.id,
          name: it.name,
          pendingg: it.pendingg,
          done: it.done,
          value: 45
        };
        tmp.push(obj);
      });

      this.actualData = tmp;

      UploadFileWithApex([...this.files], this.recordId, this, tmp)
        .then((res) => {
          const btn = this.template.querySelector("[name=button-ohkay]");
          btn.removeAttribute("disabled");
        })
        .catch((err) => {
          console.log(err, "error occured");
        });
      this.rendered = !this.rendered;
    }
  }

  ToggleModal() {
    const recordInput = {
      apiName: CONTACT_OBJECT.objectApiName,
      fields: { Id: this.recordId }
    };

    this.dispatchEvent(
      new CustomEvent("toggleimageuploader", {
        detail: { objArr: [] },
        bubbles: true
      })
    );

    publish(
      this.context,
      FILE_PREVIEWER_MESSAGE_CHANNEL,
      { recordId: this.recordId },
      { scope: APPLICATION_SCOPE }
    );

    return;
  }
}