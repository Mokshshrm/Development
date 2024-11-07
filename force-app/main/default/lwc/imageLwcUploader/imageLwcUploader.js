import { LightningElement, api, wire, track } from "lwc";
export default class ImageLwcUploader extends LightningElement {
  get acceptedFormats() {
    return [".pdf", ".png"];
  }

  handleUploadFinished(event) {
    const uploadedFiles = event.target.files;
    const FileArraObj = [];
    const fileReadPromises = [];

    Object.entries(uploadedFiles).forEach((it, index) => {
      const file = it[1];
      const fileSizeInKb = (file.size / 1024).toFixed(2) < 10 * 1024;
      const FileType = file.type;
      const fileName = file.name;

      if (!fileSizeInKb) {
        FileArraObj.push({
          isvalid: fileSizeInKb,
          pendingg: false,
          done: false
        });
        return;
      }

      const fileReader = new FileReader();
      const readFilePromise = new Promise((resolve, reject) => {
        fileReader.onload = function () {
          let obj = {
            id: `Image-${index}`,
            isvalid: fileSizeInKb,
            name: fileName,
            type: FileType,
            data: fileReader.result.split(",")[1],
            pendingg: true,
            done: false
          };
          FileArraObj.push(obj);
          resolve();
        };
        fileReader.readAsDataURL(file);
      });
      fileReadPromises.push(readFilePromise);
    });

    Promise.all(fileReadPromises).then(() => {
      this.dispatchEvent(
        new CustomEvent("toggleimageuploader", {
          detail: { objArr: FileArraObj },
          bubbles: true
        })
      );
    });
  }
}