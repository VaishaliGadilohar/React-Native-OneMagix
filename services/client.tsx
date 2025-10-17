// import axios from "axios";
// const client = axios.create({
//  // baseURL: "https://api.restful-api.dev",
//   baseURL: "https://jsonplaceholder.typicode.com",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });



// export default client;

// const API_MODE = 1;

// // Define all base URLs
// const BASE_URLS = {
//   1: "https://jsonplaceholder.typicode.com",
//   2: "https://api.restful-api.dev",
//   3: "https://dummyjson.com",
// };

// // Pick automatically based on mode
// export const BASE_URL = BASE_URLS[API_MODE];



// import axios, { AxiosInstance } from "axios";


// const client: AxiosInstance = axios.create({
//   baseURL: BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 👇 Optional: Interceptors for logging or auth token
// client.interceptors.request.use(
//   (config) => {
//     console.log(`[API Request] ${config.method?.toUpperCase()} → ${config.url}`);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// client.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("[API Error]:", error?.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default client;



import axios, { AxiosInstance } from "axios";

const client = (baseURL?: string): AxiosInstance => {
  return axios.create({
    baseURL: baseURL || "https://jsonplaceholder.typicode.com", // default base URL
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default client;
