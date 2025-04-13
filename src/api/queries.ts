import { useQuery } from "@tanstack/react-query";
import { getCarriers, getUsers } from "./request";

export const useQueryUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};

export const useQueryCarriers = () => {
  return useQuery({
    queryKey: ["carriers"],
    queryFn: () => getCarriers(),
  });
};
