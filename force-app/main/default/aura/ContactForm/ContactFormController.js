({
  updatevalidity: function (component, event, helper) {
    const FirstName = component.find("input-FirstName");
    const LastName = component.find("input-LastName");
    const Phone = component.find("input-Phone");
    const Email = component.find("input-Email");
    const Title = component.find("input-Title");
    const Birthdate = component.find("input-Birthdate");

    FirstName.setCustomValidity("");
    LastName.setCustomValidity("");
    Phone.setCustomValidity("");
    Email.setCustomValidity("");
    Title.setCustomValidity("");
    Birthdate.setCustomValidity("");
  },
  handleFormData: function (component, event, helper) {
    const action = $A.get("e.c:FlowingDataFromWizard");

    const FirstName = component.find("input-FirstName");
    const LastName = component.find("input-LastName");
    const Phone = component.find("input-Phone");
    const Email = component.find("input-Email");
    const Title = component.find("input-Title");
    const Birthdate = component.find("input-Birthdate");

    let allValid = true;

    if (!FirstName.checkValidity()) {
      FirstName.reportValidity();
      allValid = false;
    }

    if (!LastName.checkValidity() || LastName.get("v.value").trim() == "") {
      LastName.setCustomValidity("LastName is Required");
      LastName.reportValidity();
      allValid = false;
    }

    if (
      !Phone.checkValidity() ||
      (Phone.get("v.value") && !/^\d{10}$/.test(Phone.get("v.value")))
    ) {
      Phone.setCustomValidity("Number should be 10 digit");
      Phone.reportValidity();
      allValid = false;
    }

    if (
      !Email.checkValidity() ||
      (Email.get("v.value") &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email.get("v.value")))
    ) {
      Email.setCustomValidity("Email is not formated");
      Email.reportValidity();
      allValid = false;
    }

    if (!Title.checkValidity()) {
      Title.reportValidity();
      allValid = false;
    }

    if (!Birthdate.checkValidity()) {
      Birthdate.reportValidity();
      allValid = false;
    }

    if (!allValid && !event.getParam("arguments").isPrev) {
      return;
    }

    const data = {
      sobjectType: "Contact",
      FirstName: FirstName.get("v.value").trim(),
      LastName: LastName.get("v.value").trim(),
      Phone: Phone.get("v.value").trim(),
      Email: Email.get("v.value").trim(),
      Title: Title.get("v.value").trim(),
      Birthdate: Birthdate.get("v.value")
    };

    action.setParams({
      SObject: "conData",
      data: data,
      isPrev: event.getParam("arguments").isPrev
    });

    action.fire();
  }
});