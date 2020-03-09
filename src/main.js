// Parse a dot notated path, remove spaces
const dotParse = (path = '') => path.split(/\./).filter(substring => substring)

// Deep find element in an object by path elements p, returning undefined if the path or element at the path was undefined
const getPathInO = (original = {}, ...paths) =>
  paths.reduce(
    ({no, quit}, sp) => {
      return no && sp in no && !quit
        ? {no: no[sp], quit: false}
        : {no: undefined, quit: true}
    },
    {no: original ? original : {}, quit: false}
  ).no

// Deep find something in an object using dot-notation path
const dotGetPathInO = (original, pathstring) =>
  getPathInO(original, ...dotParse(pathstring))

// Deep put something in an object by path elements p, creating tree as needed, using Object.assign
const putPathInO = (original = {}, value, ...paths) =>
  paths.reduce(
    ({o, no}, sp, i, {length}, j = length - 1) => {
      return i < j
        ? sp in no
          ? {o, no: no[sp]}
          : {o, no: Object.assign(no, {[sp]: {}})[sp]}
        : {o, no: Object.assign(no, {[sp]: value})}
    },
    {o: original ? original : {}, no: original}
  ).o

// Deep put something in an object using dot-notation path and Object.assign
const dotPutPathInO = (original, value, pathstring) =>
  putPathInO(original, value, ...dotParse(pathstring))

export {dotParse, getPathInO, dotGetPathInO, putPathInO, dotPutPathInO}
