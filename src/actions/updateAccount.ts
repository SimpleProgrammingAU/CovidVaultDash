import { Action } from "../interfaces";

export const updateAccount = (name: string, value: string):Action<string> => {
  let action = "";
  switch (name) {
    case "businessName":
      action = "UPDATE_BUSINESS_NAME";
      break;
    case "abn":
      action = "UPDATE_CONTACT_ABN";
      break;
    case "streetAddress":
      action = "UPDATE_STREET_ADDRESS";
      break;
    case "suburb":
      action = "UPDATE_SUBURB";
      break;
    case "postcode":
      action = "UPDATE_POSTCODE";
      break;
    case "authContact":
      action = "UPDATE_CONTACT_NAME";
      break;
    case "phone":
      action = "UPDATE_CONTACT_PHONE";
  }
  return {
    type: action,
    payload: value
  }
}