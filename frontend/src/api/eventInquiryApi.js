import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const sendEventInquiry = (data) => API.post("/event-inquiries", data);

export default sendEventInquiry;
