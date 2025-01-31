import { expect, test } from "vitest"
import CompositionExpression from "../composition-expression.js"
import NumberAdd from "./number-add-expression.js"
import ExpressionRegistry from "$src/expression-registry.js"

class Dummy extends CompositionExpression<{ a: { b: number; c: string } }> {}

test("NumberAddExpression adds a number to the target path", () => {
  const set = new ExpressionRegistry()

  const dummy = new Dummy({ a: { b: 3, c: "" } })
  const add = new NumberAdd(dummy, "a.b", { value: 2 })

  set.add(dummy)
  set.add(add)

  expect(dummy.context.a.b).toBe(5)
})

test("NumberAddExpression throws if target value isn't a number", () => {
  expect(() => {
    const set = new ExpressionRegistry()

    const dummy = new Dummy({ a: { b: 3, c: "" } })
    const add = new NumberAdd(dummy, "a.c", { value: 2 })

    set.add(dummy)
    set.add(add)

    return dummy.context.a.b
  }).toThrowError()
})

test("NumberAddExpression throws if path is missing", () => {
  expect(() => {
    const set = new ExpressionRegistry()

    const dummy = new Dummy({ a: { b: 3, c: "" } })
    const add = new NumberAdd(dummy, "a.x", { value: 2 })

    set.add(dummy)
    set.add(add)

    return dummy.context.a.c
  }).toThrowError()
})
