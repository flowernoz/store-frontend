import axios from "axios";

const mainURL = axios.create({
  baseURL: "https://store-backend-pi-fawn.vercel.app/",
});

export default mainURL;
