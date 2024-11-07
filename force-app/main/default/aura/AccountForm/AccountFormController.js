({
  updatevalidity: function (component, event, helper) {
    const Name = component.find("input-Name");
    const Phone = component.find("input-Phone");
    const AccountNumber = component.find("input-AccountNumber");
    const Site = component.find("input-Site");
    const Type = component.find("input-Type");
    const Ownership = component.find("input-Ownership");

    Name.setCustomValidity("");
    Phone.setCustomValidity("");
    AccountNumber.setCustomValidity("");
    Site.setCustomValidity("");
    // Type.setCustomValidity('');
    // Ownership.setCustomValidity('');
  },
  handleFormData: function (component, event, helper) {
    const Name = component.find("input-Name");
    const Phone = component.find("input-Phone");
    const AccountNumber = component.find("input-AccountNumber");
    const Site = component.find("input-Site");
    const Type = component.find("input-Type");
    const Ownership = component.find("input-Ownership");

    let allValid = true;

    if (!Name.checkValidity() || Name.get("v.value").trim() === "") {
      Name.setCustomValidity("Name is Required");
      Name.reportValidity();
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
      !AccountNumber.checkValidity() ||
      (AccountNumber.get("v.value") &&
        AccountNumber.get("v.value").trim() === "")
    ) {
      AccountNumber.setCustomValidity("AccountNumber is not valid");
      AccountNumber.reportValidity();
      allValid = false;
    }

    if (
      !Site.checkValidity() ||
      (Site.get("v.value") && Site.get("v.value").trim() === "")
    ) {
      Site.reportValidity();
      allValid = false;
    }

    if (!allValid) {
      return;
    }

    const action = $A.get("e.c:FlowingDataFromWizard");

    const data = {
      sobjectType: "Account",
      Name: Name.get("v.value").trim(),
      Phone: Phone.get("v.value").trim(),
      AccountNumber: AccountNumber.get("v.value").trim(),
      Site: Site.get("v.value").trim(),
      Type: Type.get("v.value"),
      Ownership: Ownership.get("v.value")
    };

    action.setParams({
      SObject: "accData",
      data: data,
      isPrev: event.getParam("arguments").isPrev
    });

    action.fire();
  }
});