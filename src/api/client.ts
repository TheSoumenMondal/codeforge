import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const apiClient = axios.create({
  // biome-ignore lint/style/useNamingConvention: false positive
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const queryClient = new QueryClient();

export { apiClient, queryClient };
