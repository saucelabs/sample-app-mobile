const SPLIT_REGEX = /(__.*?__|\r)/g;
const STRONG_REGEX = /(__)(.*?)\1/g;


/**
 * Parse a string that holds `Hi, how are __you__` to make `__you__` bold
 *
 * @param {string} text
 *
 * @return {{bold: boolean, value: string}[]}
 */
export const ParseText = (text) => {
  const strongRegExp = new RegExp(STRONG_REGEX);

  return text
    .split(SPLIT_REGEX)
    .filter(value => value.length)
    .map((value) => ({
      value: value.replace(STRONG_REGEX, '$2'),
      bold: strongRegExp.test(value),
    }));
};
