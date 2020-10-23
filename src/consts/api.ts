import Axios from "axios";

export const api = Axios.create({
  baseURL: "https://www.covidvault.com.au/api",
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: () => true,
});
