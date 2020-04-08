'use strict'
import test from 'ava'
import {putPathInO, dotPutPathInO} from '..'

const targets = {
  a: Symbol('a'),
  b: Symbol('b'),
  c: Symbol('c'),
  d: Symbol('d')
}

function macro0(t, {putF, dotPutF}) {
  const getObject = () => ({
    a: {
      target: null,
      b: {
        // There is intentionally no target: null,
        c: {
          target: null,
          d: {
            // There is intentionally no target: null,
          }
        }
      }
    }
  })

  t.is(
    putF(getObject(), targets.b, 'a', 'b', 'target').a.b.target,
    targets.b,
    'Puts a specified target into the object using many path string arguments'
  )

  t.is(
    dotPutF(getObject(), targets.d, 'a.b.c.target').a.b.c.target,
    targets.d,
    'Puts specified target into the object using one path string argument, overwriting'
  )

  const key = Symbol('key')
  const getSymbolObject = () => ({
    a: {
      [key]: null,
      b: {
        // There is intentionally no [key]: null,
        c: {
          [key]: null,
          d: {
            // There is intentionally no [key]: null,
          }
        }
      }
    }
  })
  t.deepEqual(
    putF(getSymbolObject(), targets.a, 'a', key).a[key],
    targets.a,
    'Put a specified target into the object by path string/symbol arguments'
  )
  t.deepEqual(
    putF(getSymbolObject(), targets.a, 'a', 'b', 'c', key).a.b.c[key],
    targets.a,
    'Put a specified target into the object by path string/symbol arguments, overwriting'
  )
}

test(
  'Put elements correctly by path using strings/symbols, Object.assign',
  macro0,
  {
    putF: putPathInO,
    dotPutF: dotPutPathInO
  }
)

function macro1(t, {putF, dotPutF}) {
  const sparsetarget = {
    a: {
      b: {
        c: {
          d: {
            target: targets.d
          }
        }
      }
    }
  }

  t.deepEqual(
    putF({}, targets.d, 'a', 'b', 'c', 'd', 'target'),
    sparsetarget,
    'Puts elements in object by many path string arguments creating sparse trees'
  )
  t.deepEqual(
    dotPutF({}, targets.d, 'a.b.c.d.target'),
    sparsetarget,
    'Puts elements in object by one path string argument creating sparse trees'
  )

  const sparsekey = Symbol('sparsekey')
  const sparsesymboltarget = {
    a: {
      b: {
        c: {
          d: {
            [sparsekey]: targets.d
          }
        }
      }
    }
  }

  t.deepEqual(
    putF({}, targets.d, 'a', 'b', 'c', 'd', sparsekey),
    sparsesymboltarget,
    'Puts elements in object by many path string/symbol arguments creating sparse trees'
  )
}

test(
  'Put elements correctly by path using strings/symbols creating sparse objects, using Object.assign',
  macro1,
  {
    putF: putPathInO,
    dotPutF: dotPutPathInO
  }
)

function macro2(t, badType) {
  const paths = ['some', 'dump', 'of', 'a', 'place']
  const f = () => putPathInO(undefined, 33, paths)
  t.notThrows(f, `Does not throw TypeError on ${badType}`)

  const dotpath = paths.join('.')
  const f2 = () => dotPutPathInO(undefined, 33, dotpath)
  t.notThrows(f, `Does not throw TypeError on ${badType}`)
}

test('Handles undefined object argument gracefully', macro2, undefined)
test('Handles null object argument gracefully', macro2, null)

test('Handles circular reference in object correctly without throwing', t => {
  const targets = {
    a: Symbol('a'),
    b: Symbol('b'),
    c: Symbol('c'),
    d: Symbol('d'),
    e: Symbol('e')
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
  object.a.f = object
  // console.log(object.a.f === object)
  const circularTest0 = () => {
    putPathInO(object, targets.e, 'a', 'f', 'a', 'b', 'target')
  }
  t.notThrows(circularTest0, 'does not throw when placing into circuar reference')
  t.is(object.a.f.a.b.target, targets.e, 'placed into circular reference correctly')
  t.is(object.a.b.target, object.a.f.a.b.target, 'maintained circular reference correctly')

  const circularTest1 = () => {
    putPathInO(object, targets.e, 'a', 'f', 'a', 'f')
  }
  const overriddenTest = () => {
    return object.a.f.a.f
  }
  t.notThrows(circularTest1, 'does not throw when overriding circuar reference')
  t.is(object.a.f, targets.e, 'placed circular reference correctly')
  t.throws(overriddenTest, {instanceOf: TypeError}, "overwriting key in sub object overwrites original reference")
})
