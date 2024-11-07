import LwcCreateContactRecord from "@salesforce/apex/ContactListController.LwcCreateContactRecord";
import { setCustomValidity } from "./validateData";
import Toast from "lightning/toast";
const CreateContact = async (component) => {
  try {
    const ContactRecord = {
      SobjectType: "Contact",
      LastName: component.LastNameVal,
      FirstName: component.FirstNameVal,
      Email: component.EmailVal,
      Birthdate: component.BirthdateVal,
      HomePhone: component.HomePhoneVal
    };

    const response = await LwcCreateContactRecord({
      requireData: ContactRecord
    });
    if (response.status === "SUCCESS") {
      Toast.show(
        {
          label: "Successfully Created Contact",
          message: "{record}",
          messageLinks: {
            record: {
              url: `https://mvclouds-1c-dev-ed.develop.lightning.force.com/lightning/r/Contact/${response.Id}/view`,
              label: "Checkout Contact Record"
            }
          },
          mode: "dismissible",
          variant: response.status.toLowerCase()
        },
        this
      );
    } else {
      // how to show errors on fields; ; ; ; ;
    }
  } catch (err) {}
};

export { CreateContact };