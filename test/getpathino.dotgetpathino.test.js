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
    targets.d, 'Gets a specified target from the object using one path string argument'
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
