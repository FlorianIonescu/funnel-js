import { expect, test } from "vitest"
import CompositionExpression from "../composition-expression.js"
import ModifyExpression from "./modify-expression.js"
import ExpressionRegistry from "$src/expression-registry.js"

test("ModifyExpression sets an object to the target path", () => {
  class Dummy extends CompositionExpression<{ a: number }> {}

  const set = new ExpressionRegistry()

  const dummy = new Dummy({ a: 2 })
  const add = new ModifyExpression(dummy, "a", {
    callback: (value: number) => value + 1,
  })

  set.add(dummy)
  set.add(add)

  expect(dummy.context.a).toBe(3)
})

test("ModifyExpression throws if target value isn't an object", () => {
  expect(() => {
    class Dummy extends CompositionExpression<{
      a: number
    }> {}

    const set = new ExpressionRegistry()

    const dummy = new Dummy({ a: 5 })
    const add = new ModifyExpression(dummy, "a.c", {
      callback: (value: number) => value + 1,
    })

    set.add(dummy)
    set.add(add)

    return dummy.context.a
  }).toThrowError()
})

test("ModifyExpression throws if path is missing", () => {
  expect(() => {
    class Dummy extends CompositionExpression<{
      a: number
    }> {}

    const set = new ExpressionRegistry()

    const dummy = new Dummy({ a: 5 })
    const add = new ModifyExpression(dummy, "b.c", {
      callback: (value: number) => value + 1,
    })

    set.add(dummy)
    set.add(add)

    return dummy.context.a
  }).toThrowError()
})
