import axios from "axios";
const client = axios.create({
 // baseURL: "https://api.restful-api.dev",
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});



export default client;
