import os from "os";

export const resolvePaths = (path: string): string => {
  const platform = os.platform();

  if (platform === "win32") {
    return path.replace(/\\/g, "/");
  }

  return path;
};
