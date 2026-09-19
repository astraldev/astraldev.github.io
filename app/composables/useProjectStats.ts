export type ProjectStats = {
  stars: number
  pushedAt: string
};

/** `https://github.com/astraldev/GGate` -> `astraldev/ggate` */
function repoPath(link: string) {
  return link
    .replace(/^https?:\/\/github\.com\//, "")
    .replace(/\/$/, "")
    .toLowerCase();
}

/** Star counts and last-push dates, keyed by lowercased `owner/repo`. */
export function useProjectStats() {
  const { data } = useAsyncData("project-stats", async () => {
    try {
      return await $fetch<Record<string, ProjectStats>>("/api/project-stats");
    }
    catch {
      // Prerender runs with failOnError, so a rate limit must not throw.
      return {};
    }
  }, { default: () => ({} as Record<string, ProjectStats>) });

  return { stats: data, repoPath };
}
