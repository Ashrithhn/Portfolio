/**
 * Universal Asset Path Resolver
 * Automatically handles root paths on localhost & Vercel,
 * and repository subpaths on GitHub Pages (e.g. /Portfolio/).
 */
export const getAssetPath = (path: string): string => {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  // Strip leading "./" or "/"
  const cleanPath = path.replace(/^(\.\/|\/)/, "");

  if (typeof window !== "undefined") {
    const isGitHubPages = window.location.hostname.includes("github.io");
    // Only prepend /Portfolio/ if specifically on GitHub Pages subfolder
    if (isGitHubPages && window.location.pathname.toLowerCase().includes("/portfolio")) {
      return `/Portfolio/${cleanPath}`;
    }
  }

  return `/${cleanPath}`;
};
