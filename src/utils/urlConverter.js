export const convertToUrlForBreadCrumb = function (pathname) {
  const splitted = pathname.split('');
  splitted.shift();
  splitted[0] = splitted[0].toUpperCase();
  return splitted.join('');
};

export const convertToUrlForDropdown = function (str) {
  const splitted = str.split('');
  splitted[0] = splitted[0].toLowerCase();
  return splitted.join('');
};

export const convertToUrlForNav = function (str) {
  return str.toLowerCase();
};
