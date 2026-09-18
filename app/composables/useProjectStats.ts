export type ProjectStats = {
  stars: number
  pushedAt: string
};

type GithubRepo = {
  full_name: string
  stargazers_count: number
  pushed_at: string
};

const GITHUB_USER = "astraldev";

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
    const token = useRuntimeConfig().githubToken;

    try {
      const repos = await $fetch<GithubRepo[]>(
        `https://api.github.com/users/${GITHUB_USER}/repos`,
        {
          query: { per_page: 100, sort: "pushed" },
          headers: {
            accept: "application/vnd.github+json",
            ...(token ? { authorization: `Bearer ${token}` } : {}),
          },
        },
      );

      return Object.fromEntries(repos.map(repo => [
        repo.full_name.toLowerCase(),
        { stars: repo.stargazers_count, pushedAt: repo.pushed_at },
      ]));
    }
    catch {
      // Prerender runs with failOnError, so a rate limit must not throw.
      return {};
    }
  }, { default: () => ({} as Record<string, ProjectStats>) });

  return { stats: data, repoPath };
}
