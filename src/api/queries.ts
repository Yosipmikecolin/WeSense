import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./request";

export const useQueryUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};
