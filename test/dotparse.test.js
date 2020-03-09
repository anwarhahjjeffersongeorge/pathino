'use strict'
import test from 'ava'
import {dotParse} from '..'

test('Correctly separates dot-paths', t => {
  const path = 'a.b.c.d.-.e.f.g'
  const target = ['a', 'b', 'c', 'd', '-', 'e', 'f', 'g']
  t.deepEqual(dotParse(path), target, 'Separates characters between dots')

  const irregularpath = 'aard vark.dot.fruit '
  const irregulartarget = ['aard vark', 'dot', 'fruit ']
  t.deepEqual(
    dotParse(irregularpath),
    irregulartarget,
    'Separates characters between dots, removing white-space only path elements'
  )
})

test('Handles nonexistent path failing gracefully', t => {
  const path = undefined
  const f = () => dotParse(path)
  t.notThrows(f, 'Does not throw')
})
