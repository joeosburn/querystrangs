const decode = require('decode-uri-component');

const stripBrackets = str => str.replace(/\[|\]$/g, '');
const pushObj = (item) => {
  const obj = {};
  item.push(obj);
  return obj;
}
const isArray = key => key === '' || !isNaN(key)

const parse = (str) => {
  const data = decode(str)
    .split('&')
    .map(pair => {
      const [ key, value ] = pair.split('=');
      return { key, value };
  }).reduce((obj, pair) => {
    const { key, value } = pair;
    const keys = key.split(/(?=\[.*?\])/g);
    let item = obj;

    keys.forEach((key, k) => {
      key = stripBrackets(key);

      if (k === keys.length - 1) {
        if (key) {
          item[key] = value;
        } else { // is empty array key
          item.push(value);
        }
        return;
      }

      const nextKey = stripBrackets(keys[k + 1]);

      if (isArray(key)) {
        if (key) {
          item = item[key] || (item[key] = {});
        } else {
          const lastObj = item[item.length - 1];
          if (lastObj) {
            item = lastObj.hasOwnProperty(nextKey)
              ? pushObj(item)
                : lastObj;
          } else {
            item = pushObj(item);
          }
        }
      } else {
        item = item.hasOwnProperty(key)
          ? item[key]
          : item[key] = isArray(nextKey)
            ? []
            : {};
      }
    });

    return obj;
  }, {});

  return data;
}

exports.parse = parse;
