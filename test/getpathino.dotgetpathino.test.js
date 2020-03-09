'use strict'
import test from 'ava'
import {getPathInO, dotGetPathInO} from '..'

test('Find elements correctly by path using strings and symbols', t => {
  const targets = {
    a: Symbol('a'),
    b: Symbol('b'),
    c: Symbol('c'),
    d: Symbol('d')
  }

  const object = {
    a: {
      target: targets.a,
      b: {
        target: targets.b,
        c: {
          target: targets.c,
          d: {
            target: targets.d
          }
        }
      }
    }
  }
  t.is(
    getPathInO(object, 'a', 'b', 'target'),
    targets.b,
    'Gets a specified target from the object using many path string arguments'
  )
  t.deepEqual(
    getPathInO(object, 'a', 'b', 'c'),
    object.a.b.c,
    'Gets the specified object subtree correctly'
  )
  t.is(
    dotGetPathInO(object, 'a.b.c.d.target'),
    targets.d,
    'Gets a specified target from the object using one path string argument'
  )
  t.deepEqual(
    dotGetPathInO(object, 'a.b.c'),
    object.a.b.c,
    'Gets the specified object subtree correctly'
  )

  const key = Symbol('key')
  const symbolobject = {
    a: {
      [key]: targets.a,
      b: {
        [key]: targets.b,
        c: {
          [key]: targets.c,
          d: {
            [key]: targets.d
          }
        }
      }
    }
  }
  t.is(
    getPathInO(symbolobject, 'a', 'b', key),
    targets.b,
    'Gets a specified target from the object by path arguments with symbols'
  )
})

function macro2(t, badType) {
  const paths = ['some', 'dump', 'of', 'a', 'place']
  const f = () => getPathInO(undefined, paths)
  t.notThrows(f, `Does not throw TypeError on ${badType}`)

  const dotpath = paths.join('.')
  const f2 = () => dotGetPathInO(undefined, dotpath)
  t.notThrows(f2, `Does not throw TypeError on ${badType}`)
}

test('Handles undefined object argument gracefully', macro2, undefined)
test('Handles null object argument gracefully', macro2, null)

function macro3(t, irregularPathElement) {
  const target = 32323 * 23232
  const object = {
    some: {
      [irregularPathElement]: {
        of: {
          a: {
            place: target
          }
        }
      }
    }
  }
  const paths = ['some', irregularPathElement, 'of', 'a', 'place']
  t.is(
    getPathInO(object, ...paths),
    target, 
    `Found specified target with ${irregularPathElement} in path`
  )
  
  const partpaths = ['some', irregularPathElement]
  t.deepEqual(
    getPathInO(object, ...partpaths),
    object.some[irregularPathElement],
    `Found specified target on path ending at ${irregularPathElement}`
  )
}

test('Handles undefined element in path correctly', macro3, undefined)
test('Handles null element in path correctly', macro3, null)
