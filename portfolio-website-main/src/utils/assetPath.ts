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
    const pathname = window.location.pathname;
    // If hosted on GitHub Pages subpath /Portfolio/ or /Portfolio
    if (pathname.toLowerCase().includes("/portfolio")) {
      return `/Portfolio/${cleanPath}`;
    }
  }

  return `/${cleanPath}`;
};
