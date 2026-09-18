import { projects } from "~/data/data.json";

/** Featured work first, source order otherwise. */
export function useProjects(limit?: number) {
  const sorted = [...projects]
    .sort((first, second) => Number(second.featured) - Number(first.featured));

  return limit ? sorted.slice(0, limit) : sorted;
}
