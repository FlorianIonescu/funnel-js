import { expect, test } from "vitest"
import CompositionExpression from "../composition-expression.js"
import PopExpression from "./pop-expression.js"
import ExpressionRegistry from "$src/expression-registry.js"

test("PopExpression pushes a value into an array at the target path", () => {
  class Dummy extends CompositionExpression<{
    a: number[]
  }> {}

  const set = new ExpressionRegistry()

  const dummy = new Dummy({ a: [1, 2, 3] })
  const add = new PopExpression(dummy, "a", {})

  set.add(dummy)
  set.add(add)

  expect(dummy.context.a.length).toBe(2)
  expect(dummy.context.a[0]).toBe(1)
  expect(dummy.context.a[1]).toBe(2)
})

test("PopExpression throws if target isn't an array", () => {
  expect(() => {
    class Dummy extends CompositionExpression<{
      a: number
    }> {}

    const set = new ExpressionRegistry()

    const dummy = new Dummy({ a: 3 })
    const add = new PopExpression(dummy, "a", {})

    set.add(dummy)
    set.add(add)

    return dummy.context.a
  }).toThrowError()
})

test("PopExpression throws if path is missing", () => {
  expect(() => {
    class Dummy extends CompositionExpression<{
      a: number
    }> {}

    const set = new ExpressionRegistry()

    const dummy = new Dummy({ a: 3 })
    const add = new PopExpression(dummy, "a.b", {})

    set.add(dummy)
    set.add(add)

    return dummy.context.a
  }).toThrowError()
})
