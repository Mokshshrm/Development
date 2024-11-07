import { LightningElement, api, track } from "lwc";
import toastContainer from "lightning/toastContainer";
import Toast from "lightning/toast";
import pubsub from "c/pubsub";

export default class DemoLWC extends LightningElement {
  @api recordId;

  modalopen = false;
  @api filesOnParent = [];

  ToggleModal(event) {
    this.modalopen = !this.modalopen;
    this.filesOnParent = event.detail.objArr;
    console.log("fetched data to parent", this.filesOnParent);
  }

  get isModalOpen() {
    return this.modalopen;
  }
}