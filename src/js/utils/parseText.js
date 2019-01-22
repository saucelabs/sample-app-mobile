const SPLIT_REGEX = /(__.*?__|\r)/g;
const STRONG_REGEX = /(__)(.*?)\1/g;

const NORMAL = 'normal';
const STRONG = 'strong';

const parseText = (text) => {
  const strongRegExp = new RegExp(STRONG_REGEX);

  return text
    .split(SPLIT_REGEX)
    .filter(value => value.length)
    .map((value) => ({
      value: value.replace(STRONG_REGEX, '$2'),
      type: strongRegExp.test(value) ? STRONG : NORMAL,
    }));
};

export {
  NORMAL,
  STRONG,
  parseText,
};
