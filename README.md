[![Version](https://img.shields.io/github/package-json/v/anwarhahjjeffersongeorge/pathino/master.svg)](https://github.com/anwarhahjjeffersongeorge/pathino)[![Build Status](https://travis-ci.org/anwarhahjjeffersongeorge/pathino.svg?branch=master)](https://travis-ci.org/anwarhahjjeffersongeorge/pathino) [![codecov](https://codecov.io/gh/anwarhahjjeffersongeorge/pathino/branch/master/graph/badge.svg)](https://codecov.io/gh/anwarhahjjeffersongeorge/pathino)
------------

[![license](https://img.shields.io/github/license/anwarhahjjeffersongeorge/pathino.svg)](UNLICENSE) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-XO-33a3d3.svg)](https://github.com/xojs/xo)

--------------

# &mdash; `pathino` &mdash;
### [Documentation](https://anwarhahjjeffersongeorge.github.io/pathino/)

### Get and put element E at path P in object O.

A bunch of other libraries do this already. [Search "dot notation" on `npm`](https://www.npmjs.com/search?q=dot%20notation) to find some of them.

This package is for when the objects contain symbol keys.

------
## Installation

Run `npm install pathino`

## Usage
This package exports five functions:

### `dotParse`
Parse a dot notated path, remove whitespace-only path elements  

Argument     | Type                     | Required | Description
------------ | ------------------------ | -------- | -----------
`path`       | `String`                 | Yes      |  The dot path to parse

### `getPathInO` 

Deep find element in an object by path elements p, returning undefined if the path or element at the path was undefined  

Argument     | Type                     | Required | Description
------------ | ------------------------ | -------- | -----------
`original`   | `Object`                 | No       |  The object
`...paths`   | `Arguments`              | Yes      | The path strings/symbols 

### `dotGetPathInO`  
Deep find something in an object using dot-notation formatted path string  

Argument        | Type              | Required | Description
--------------- | ----------------- | -------- | -----------
`original`      | `Object`          | No       |  The object
`pathstring`    | `String`          | Yes      |  The dot-notated path string


### `putPathInO`
Deep put something in an object by path elements p, creating tree as needed, using Object.assign  

Argument     | Type              | Required | Description
------------ | ----------------- | -------- | -----------
`original`   | `Object`          | No       |  The object
`value`      | `Any`             | Yes      |  The new element
`...paths`   | `Arguments`       | Yes      | The path strings/symbols 

### `dotPutPathInO`
Deep put something in an object using dot-notation formatted path string and Object.assign  

Argument     | Type           | Required | Description
------------ | ---------------| -------- | -----------
`original`   | `Object`       | No       |  The object
`value`      | `Any`          | Yes      |  The new element
`pathstring` | `String`       | Yes      | The dot-notated path strings

## Testing
npm test
