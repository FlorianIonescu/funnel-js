import { expect, test } from "vitest"
import CompositionExpression from "../composition-expression.js"
import SetExpression from "./set-expression.js"
import ExpressionRegistry from "$src/expression-registry.js"

test("SetExpression sets an object to the target path", () => {
  class Dummy extends CompositionExpression<{ a: { b: object; c: string } }> {}

  const set = new ExpressionRegistry()

  const dummy = new Dummy({ a: { b: {}, c: "" } })
  const add = new SetExpression(dummy, "a.b", { value: "test" })

  set.add(dummy)
  set.add(add)

  expect(dummy.context.a.b).toBe("test")
})

test("SetExpression throws if target value isn't an object", () => {
  expect(() => {
    class Dummy extends CompositionExpression<{
      a: number
    }> {}

    const set = new ExpressionRegistry()

    const dummy = new Dummy({ a: 5 })
    const add = new SetExpression(dummy, "a.c", { value: "test" })

    set.add(dummy)
    set.add(add)

    return dummy.context.a
  }).toThrowError()
})

test("SetExpression throws if path is missing", () => {
  expect(() => {
    class Dummy extends CompositionExpression<{
      a: number
    }> {}

    const set = new ExpressionRegistry()

    const dummy = new Dummy({ a: 5 })
    const add = new SetExpression(dummy, "b.c", { value: "test" })

    set.add(dummy)
    set.add(add)

    return dummy.context.a
  }).toThrowError()
})
