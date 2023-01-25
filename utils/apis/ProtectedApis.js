import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL + "/apis"
    : process.env.REACT_APP_BASE_URL + "/apis";
    // : "http://localhost:3003";

const instance = axios.create({
  baseURL: baseURL,
});

instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${sessionStorage.getItem("okratoken")}`;

export default instance;

