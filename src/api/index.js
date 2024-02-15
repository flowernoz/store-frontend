import axios from "axios";

const mainURL = axios.create({
  // baseURL: "https://store-backend-pi-fawn.vercel.app/",
  baseURL: "http://localhost:5000",
});

export default mainURL;
