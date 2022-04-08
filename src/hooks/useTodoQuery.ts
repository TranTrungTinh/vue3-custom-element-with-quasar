import { useQuery } from "vue-query";
import glasson from '@/services/glasson'

export function useTodosQuery() {
  return useQuery(
    "todos",
    () => glasson.get('/todos')
  );
}