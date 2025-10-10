import { apiName } from "@/constants/constant";
import { useQuery } from "@tanstack/react-query";
import client from "./client";

export const postData = (data: any, url: string) => {
  console.log("data", data, "url", url);

  return client.post(url, data);
};

export const fetchData = (url: string) => {
  return client.get(url);


};
export const fetchProductData = (url: string) => {
  const res = client.get(url);

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




// GET: Fetch posts
export const getPosts = async (url: string) => {
  const res = await client.get(url);
  return res.data; // ✅ always return data
};

// POST: Add new post
export const addPost = async (newPost: any) => {
  const res = await client.post("/posts", newPost);
  return res.data;
};

// DELETE: Delete a post
export const deletePost = async (id: number) => {
  const res = await client.delete(`/posts/${id}`);
  return res.data;
};


