({
  updatevalidity: function (component, event, helper) {
    const Subject = component.find("input-subject");
    const startDate = component.find("input-start-date");
    const startTime = component.find("input-start-time");
    const endDate = component.find("input-end-date");
    const endTime = component.find("input-end-time");

    Subject.setCustomValidity("");
    startDate.setCustomValidity("");
    endDate.setCustomValidity("");
    startTime.setCustomValidity("");
    endTime.setCustomValidity("");
  },
  handleFormData: function (component, event, helper) {
    const subject = component.find("input-subject");
    const startDate = component.find("input-start-date");
    const startTime = component.find("input-start-time");
    const endDate = component.find("input-end-date");
    const endTime = component.find("input-end-time");

    let allValid = true;

    if (!subject.checkValidity() || subject.get("v.value").trim() === "") {
      subject.setCustomValidity("Subject is Required Field");
      startDate.reportValidity();

      allValid = false;
    }

    // start time  validating ;

    if (!startTime.checkValidity() || !startTime.get("v.value").trim()) {
      startTime.setCustomValidity("Required");
      startTime.reportValidity();
    }

    if (!endTime.checkValidity() || !endTime.get("v.value").trim()) {
      endTime.setCustomValidity(`Should Be Greater than startDateTime `);
      endTime.reportValidity();
    }

    const sDateTime = new Date(
      `${startDate.get("v.value")}T${startTime.get("v.value")}`
    );

    if (!startDate.checkValidity() || sDateTime < new Date()) {
      startDate.setCustomValidity(
        `Date Must be greater than ${new Date().toString()}`
      );
      startDate.reportValidity();

      allValid = false;
    }

    const eDateTime = new Date(
      `${endDate.get("v.value")}T${endTime.get("v.value")}`
    );

    if (!endDate.checkValidity() || eDateTime <= sDateTime) {
      endDate.setCustomValidity("Should Be Greater than startDateTime");
      endDate.reportValidity();

      allValid = false;
    }

    if (!allValid && !event.getParam("arguments").isPrev) {
      console.log("some thing must be wrong");
      return;
    }

    const action = $A.get("e.c:FlowingDataFromWizard");

    const data = {
      sobjectType: "Event",
      subject: subject.get("v.value").trim(),
      StartDateTime: sDateTime,
      EndDateTime: eDateTime
    };

    action.setParams({
      SObject: "eveData",
      data: data,
      isPrev: event.getParam("arguments").isPrev
    });

    action.fire();
  }
});