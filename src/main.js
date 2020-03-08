// Parse a dot notated path, remove spaces
const dotParse = path => path.split(/\./).filter(substring => substring)

// Deep find element in an object by path elements p, returning undefined if the path was nonexistent or undefined
const getPathInO = (o = {}, ...p) =>
  p.reduce(({no, quit}, sp) => {
      return sp in no && !quit
        ? {no: no[sp], quit: false}
        : {no: undefined, quit: true}
    },
    {no: o, quit: false}).no

// Deep find something in an object using dot-notation path
const dotGetPathInO = (o, p) => getPathInO(o, ...dotParse(p))

// Deep put something in an object by path elements p, creating tree as needed, using Object.assign
const putPathInO = (o = {}, v, ...p) =>
  p.reduce(
    ({o, no}, sp, i, {length}, j = length - 1) => {
      return i < j
        ? sp in no
          ? {o, no: no[sp]}
          : {o, no: Object.assign(no, {[sp]: {}})[sp]}
        : {o, no: Object.assign(no, {[sp]:v})}
    },
    {o, no: o}).o

// Deep put something in an object using dot-notation path and Object.assign
const dotPutPathInO = (o, v, p) => putPathInO(o, v, ...dotParse(p))

export {dotParse, getPathInO, dotGetPathInO, putPathInO, dotPutPathInO}
