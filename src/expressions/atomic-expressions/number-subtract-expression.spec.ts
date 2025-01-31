import { expect, test } from "vitest"
import CompositionExpression from "../composition-expression.js"
import NumberSubtract from "./number-subtract-expression.js"
import ExpressionRegistry from "$src/expression-registry.js"

class Dummy extends CompositionExpression<{ a: { b: number; c: string } }> {}

test("NumberSubtractExpression adds a number to the target path", () => {
  const set = new ExpressionRegistry()

  const dummy = new Dummy({ a: { b: 3, c: "" } })
  const add = new NumberSubtract(dummy, "a.b", { value: 2 })

  set.add(dummy)
  set.add(add)

  expect(dummy.context.a.b).toBe(1)
})

test("NumberSubtractExpression throws if target value isn't a number", () => {
  expect(() => {
    const set = new ExpressionRegistry()

    const dummy = new Dummy({ a: { b: 3, c: "" } })
    const add = new NumberSubtract(dummy, "a.c", { value: 2 })

    set.add(dummy)
    set.add(add)

    return dummy.context.a.b
  }).toThrowError()
})

test("NumberSubtractExpression throws if path is missing", () => {
  expect(() => {
    const set = new ExpressionRegistry()

    const dummy = new Dummy({ a: { b: 3, c: "" } })
    const add = new NumberSubtract(dummy, "a.x", { value: 2 })

    set.add(dummy)
    set.add(add)

    return dummy.context.a.c
  }).toThrowError()
})
