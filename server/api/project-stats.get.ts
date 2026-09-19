type GithubRepo = {
  full_name: string
  stargazers_count: number
  pushed_at: string
};

const GITHUB_USER = "astraldev";

/**
 * Cached for an hour so dev reloads don't burn GitHub's 60/hour anonymous limit.
 * A failed fetch throws, and Nitro never caches error responses, so the next request retries.
 */
export default defineCachedEventHandler(async () => {
  const token = useRuntimeConfig().githubToken;

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
}, { name: "project-stats", maxAge: 60 * 60 });
