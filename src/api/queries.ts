import { useQuery } from "@tanstack/react-query";
import { getCarriers, getRequesters, getUsers } from "./request";

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

export const useQueryRequesters = () => {
  return useQuery({
    queryKey: ["requesters"],
    queryFn: () => getRequesters(),
  });
};
