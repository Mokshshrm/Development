({
    handleUploadFile: function (component, event, helper) {

        let uploadedFiles = event.target.files[0];
        let action = component.getEvent('imagefromchild');

        let fileReader = new FileReader();

        fileReader.onload = function () {
            action.setParams({
                file_: fileReader.result,
            })
            action.fire();
        }
        
        fileReader.readAsDataURL(uploadedFiles);
    }
})