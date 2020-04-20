'use strict'
import test from 'ava'
import pathino from '..'

function testAlias(t, arr){
  for (const [p0, p1] of arr) {
    // t.log(pathino[p0])
    t.not(pathino[p0], undefined)
    t.not(pathino[p1], undefined)
    t.is(pathino[p0], pathino[p1], `function ${p0} is ${p1}`)
  }
}

test(
  'Aliases work',
  testAlias,
  [
    ['dotParse', 'dotPar'],
    ['getPathInO', 'getPat'],
    ['dotGetPathInO', 'dotGet'],
    ['putPathInO', 'putPat'],
    ['dotPutPathInO', 'dotPut'],
  ]
)
