import CreateDocumentVersion from "@salesforce/apex/CreateDocument.CreateDocumentVersion";
import EmailEncodingKey from "@salesforce/schema/User.EmailEncodingKey";

const UploadFileWithApex = async (
  Cmpfiles,
  recordId,
  component,
  actualData
) => {
  const files = Cmpfiles;

  for (let index = 0; index < files.length; ++index) {
    let element = files[index];
    let updateElement = actualData[index];

    try {
      if (element.isvalid) {
        const response = await CreateDocumentVersion({
          Base64String: element.data,
          FileName: element.name,
          format: element.format,
          UserId: recordId
        });

        // const response = await new Promise(function (resolve) {
        //     setTimeout(() => {
        //         resolve({status:'success'});
        //     }, 1000);
        // })

        if (response.status == "success") {
          updateElement = {
            ...updateElement,
            done: true,
            pendingg: false,
            value: 100
          };
        } else {
          updateElement = {
            ...updateElement,
            done: false,
            pendingg: false,
            value: 100
          };
        }
      } else {
        updateElement = {
          ...updateElement,
          done: false,
          pendingg: false,
          value: 100
        };
      }

      let theData = [...actualData];
      theData[index] = updateElement;
      actualData = [...theData];
      component.actualData = theData;
    } catch (err) {
      console.log(err);
    }
  }

  return;
};

export { UploadFileWithApex };