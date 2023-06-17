export const formatLabel = (label: string): string => {
  const words = label.split("_");
  words[0] = words[0].charAt(0).toLocaleUpperCase() + words[0].slice(1);
  const formattedLabel = words.join(" ");

  return formattedLabel;
};
