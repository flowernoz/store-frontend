import axios from "axios";

const mainURL = axios.create({
  // baseURL: "https://store-backend-pi-fawn.vercel.app/",
  baseURL: "http://localhost:5500",
});

export default mainURL;
