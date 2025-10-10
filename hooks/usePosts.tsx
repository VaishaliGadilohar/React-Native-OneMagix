import { addPost } from "@/services/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// export const usePosts = () => {
//   return useQuery({
//     queryKey: ["posts"],
//     queryFn: getPosts,
//     staleTime: 1000 * 60, // 1 minute cache
//   });
// };



export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // refetch list after adding
    },
  });
};
