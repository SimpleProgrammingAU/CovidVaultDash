import Axios from "axios";

export const api = Axios.create({
  baseURL: "https://www.covidvault.com.au/testsite/api",
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: () => true,
});
