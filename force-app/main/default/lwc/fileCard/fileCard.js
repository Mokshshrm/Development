import { LightningElement, api } from "lwc";

export default class FileCard extends LightningElement {
  @api versionid;

  get thumbnailUrl() {
    return `https://mvclouds-1c-dev-ed.develop.file.force.com/sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB120BY90&versionId=${this.versionid}`;
  }
}