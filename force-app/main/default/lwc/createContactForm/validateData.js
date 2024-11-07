const validateData = (component) => {
  const inputs = component.template.querySelectorAll("lightning-input");
  let isValid = true;

  Object.entries(inputs).forEach((it) => {
    const fieldName = it[1];

    if (validateInput(fieldName) == false) {
      setCustomValidity(fieldName, "Invalid Data");
      isValid = false;
    }
  });

  return isValid;
};

const validateInput = (input) => {
  const value = input.value;
  const required = input.required;
  const type = input.type;

  console.log(value, required, type);

  if (required && value.trim() == "") {
    return false;
  }

  if (type === "email" && value && !validateEmail(value)) return false;

  return true;
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const setCustomValidity = (fieldName, msg) => {
  fieldName.setCustomValidity(msg);
  fieldName.reportValidity();
};

export { validateData, setCustomValidity };