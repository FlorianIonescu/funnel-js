import { expect, test } from "vitest"
import CompositionExpression from "./expressions/composition-expression.js"
import NumberSubtractExpression from "./expressions/atomic-expressions/number-subtract-expression.js"
import ExpressionRegistry from "./expression-registry.js"

class Dummy extends CompositionExpression<{ a: number }> {}

test("ExpressionRegistry registers expressions and their relations", () => {
  const set = new ExpressionRegistry()

  const dummy = new Dummy({ a: 5 })
  set.add(dummy)

  const add = new NumberSubtractExpression(dummy, "a", { value: 3 })
  set.add(add)

  expect(set.entries.size).toBe(2)

  expect(set.children.size).toBe(1)
  expect(set.children.get(dummy.id)).toContainEqual(add)

  expect(set.parents.size).toBe(1)
  expect(set.parents.get(add.id)).toBe(dummy)
})

test("ExpressionRegistry sets parent and children attributes on expressions", () => {
  const set = new ExpressionRegistry()

  const dummy = new Dummy({ a: 5 })
  set.add(dummy)

  const add = new NumberSubtractExpression(dummy, "a", { value: 3 })
  set.add(add)

  expect(dummy.children).toContainEqual(add)
  expect(add.parent).toBe(dummy)
})
