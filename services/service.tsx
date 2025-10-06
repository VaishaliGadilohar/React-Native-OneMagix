import client from "./client";

export const postData = (data: any, url: string) => {
  console.log("data", data, "url", url);

  return client.post(url, data);
};

export const fetchData = (url: string) => {
  return client.get(url);

  
};
export const fetchProductData =  (url: string) => {
     return client.get(url);
};
 
