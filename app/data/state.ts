import type { RemovableRef } from "@vueuse/core";

export type AppTheme = "dark" | "light";
export type AppState = {
  theme: RemovableRef<AppTheme>
};

export const useGlobalState = () => {
  return useState<AppState>("app-global-state", () => ({
    theme: useCookie<AppTheme>("app-theme", {
      default: () => "dark",
      sameSite: "lax",
    }),
  }));
};
