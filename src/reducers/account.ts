import { Account, Action } from "../interfaces";

export const account = (
  account: Account = {
    id: "",
    name: "",
    abn: "",
    logo: false,
    authContact: "",
    phone: "",
    streetAddress: "",
    suburb: "",
    state: "",
    postcode: "",
    email: "",
    selectAll: false,
    statements: [],
  },
  action: Action<Account | string | string[] | number | boolean>
): Account => {
  switch (action.type) {
    case "DELETE_ACCOUNT":
    case "RESET_ALL": {
      return {
        id: "",
        name: "",
        abn: "",
        logo: false,
        authContact: "",
        phone: "",
        streetAddress: "",
        suburb: "",
        state: "",
        postcode: "",
        email: "",
        selectAll: false,
        statements: [],
      };
    }
    case "LOGIN":
      return action.payload as Account;
    case "UPDATE_ACCOUNT_ID":
      return {
        ...account,
        id: action.payload as string,
      };
    case "UPDATE_BUSINESS_NAME":
      return {
        ...account,
        name: action.payload as string,
      };
    case "UPDATE_BUSINESS_LOGO":
      return {
        ...account,
        logo: action.payload as boolean,
      };
    case "UPDATE_CONTACT_ABN":
      return {
        ...account,
        abn: action.payload as string,
      };
    case "UPDATE_CONTACT_NAME":
      return {
        ...account,
        authContact: action.payload as string,
      };
    case "UPDATE_CONTACT_PHONE":
      return {
        ...account,
        phone: action.payload as string,
      };
    case "UPDATE_STREET_ADDRESS":
      return {
        ...account,
        streetAddress: action.payload as string,
      };
    case "UPDATE_SUBURB":
      return {
        ...account,
        suburb: action.payload as string,
      };
    case "UPDATE_STATE":
      return {
        ...account,
        state: action.payload as string,
      };
    case "UPDATE_POSTCODE":
      return {
        ...account,
        postcode: action.payload as string,
      };
    case "UPDATE_EMAIL":
      return {
        ...account,
        email: action.payload as string,
      };
    case "UPDATE_SELECT_ALL":
      return {
        ...account,
        selectAll: action.payload as boolean,
      };
    case "UPDATE_STATEMENTS":
      return {
        ...account,
        statements: action.payload as string[],
      };
    case "ADD_STATEMENT":
      return {
        ...account,
        statements: [...account.statements, action.payload as string],
      };
    case "REM_STATEMENT":
      return {
        ...account,
        statements: [...account.statements.filter((v, i) => i !== (action.payload as number))],
      };
  }
  return account;
};
