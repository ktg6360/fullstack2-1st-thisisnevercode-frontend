export const convertToUrlForBreadCrumb = function (pathname) {
  const splitted = pathname.split('/');
  const target = splitted[2];
  const strSplit = target.split('');
  strSplit[0] = strSplit[0].toUpperCase();
  return strSplit.join('');
};

export const convertToUrlForDropdown = function (str) {
  const splitted = str.split('');
  splitted[0] = splitted[0].toLowerCase();
  return splitted.join('');
};

export const convertToUrlForNav = function (str) {
  if (str === 'LOGIN') return 'signin';
  return str.toLowerCase();
};
