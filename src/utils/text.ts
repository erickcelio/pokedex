const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const normalizeText = (text: string) =>
  text.replaceAll('-', ' ').split(' ').map(capitalizeFirstLetter).join(' ');
