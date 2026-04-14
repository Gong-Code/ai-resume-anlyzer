const units = ["B", "KB", "MB", "GB", "TB"];

export const formatSize = (bytes: number): string => {
  let index = 0;
  let size = bytes;

  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }

  return `${size.toFixed(2)} ${units[index]}`;
};
