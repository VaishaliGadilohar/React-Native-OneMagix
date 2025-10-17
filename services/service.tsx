import { apiName, BASE_URLS } from "@/constants/constant";
import { useQuery } from "@tanstack/react-query";
import client from "./client";
const storeClient = client(BASE_URLS.store);
const userClient = client(BASE_URLS.user);

export const postData = (data: any, url: string) => {
  console.log("data", data, "url", url);
  return userClient.post(url, data);
};

export const fetchData = (url: string) => {
  return userClient.get(url);


};
export const fetchProductData = (url: string) => {
  const res = userClient.get(url);

  return res
};


export const useSearchInfoV2 = () => {
  return useQuery({
    queryKey: ["searchInfoV2"],
    queryFn: async () => {
      const res = await fetch(apiName.getInfo);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      return data;
    },
  });
};




export const getPosts = async (url: string) => {
  const res = await storeClient.get(url);
  return res.data; 
};

export const addPost = async (url: string, newPost: any) => {
  const res = await storeClient.post(url, newPost);
  return res.data;
};

export const deletePost = async (url: string,id: number) => {
  const res = await storeClient.delete(`/${url}/${id}`);
  return res.data;
};


