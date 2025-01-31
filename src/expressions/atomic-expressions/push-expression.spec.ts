import { expect, test } from "vitest"
import CompositionExpression from "../composition-expression.js"
import PushExpression from "./push-expression.js"
import ExpressionRegistry from "$src/expression-registry.js"

test("PushExpression pushes a value into an array at the target path", () => {
  class Dummy extends CompositionExpression<{
    a: { b: string[]; c: string }
  }> {}

  const set = new ExpressionRegistry()

  const dummy = new Dummy({ a: { b: [], c: "" } })
  const add = new PushExpression(dummy, "a.b", { value: "test" })

  set.add(dummy)
  set.add(add)

  expect(dummy.context.a.b[0]).toBe("test")
})

test("PushExpression throws if target isn't an array", () => {
  expect(() => {
    class Dummy extends CompositionExpression<{
      a: { b: string }
    }> {}

    const set = new ExpressionRegistry()

    const dummy = new Dummy({ a: { b: "not-an-array" } })
    const add = new PushExpression(dummy, "a.b", { value: "test" })

    set.add(dummy)
    set.add(add)

    return dummy.context.a
  }).toThrowError()
})

test("PushExpression throws if path is missing", () => {
  expect(() => {
    class Dummy extends CompositionExpression<{
      a: { b: string }
    }> {}

    const set = new ExpressionRegistry()

    const dummy = new Dummy({ a: { b: "not-an-array" } })
    const add = new PushExpression(dummy, "a.c", { value: "test" })

    set.add(dummy)
    set.add(add)

    return dummy.context.a
  }).toThrowError()
})
