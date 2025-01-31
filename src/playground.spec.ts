import { test } from "vitest"
import vm from "node:vm"

import CompositionExpression from "./expressions/composition-expression.js"
import NumberAdd from "./expressions/atomic-expressions/number-add-expression.js"
import ExpressionRegistry from "./expression-registry.js"

test("playground", () => {
  class DummyExpression extends CompositionExpression<{
    a: number
    b: number
  }> {}

  const set = new ExpressionRegistry()

  const dummy = new DummyExpression({ a: 5, b: 3 })
  const add = new NumberAdd(dummy, "a", { value: 4 })

  set.add(dummy)
  set.add(add)

  const context = {}
  vm.createContext(context)
  vm.runInContext(dummy.js, context)

  // console.log()
  // console.log("Result:")
  // console.log(context)
})
