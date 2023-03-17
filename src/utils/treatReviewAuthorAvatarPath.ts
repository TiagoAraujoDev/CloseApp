export const treatAvatarPath = (path: string): string => {
  if (!path) return "";

  const pathArr = path.split("/");
  const avatarPath = pathArr[pathArr.length - 1];

  return `/${avatarPath}`;
};
