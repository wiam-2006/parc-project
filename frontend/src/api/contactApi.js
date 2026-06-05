import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/Funzone-park/backend/public/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const sendContact = (data) => API.post("/contact", data);

export default sendContact;