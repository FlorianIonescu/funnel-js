import { expect, test } from "vitest"
import Engine from "./engine"
import CompositionExpression from "./expressions/composition-expression"
import Rule from "./rule"
import NumberSubtract from "./expressions/atomic-expressions/number-subtract-expression"
import { Expression } from "./types"
import { ByType } from "@florianionescu/funnel-js"

class DummyExpression extends CompositionExpression<{ a: number }> {}

class ReduceDummiesByOneIfAboveThree extends Rule<DummyExpression> {
  dummies: DummyExpression[] = []

  track(expression: Expression): void {
    if (expression instanceof DummyExpression) {
      this.dummies.push(expression)
    }
  }

  untrack(expression: Expression): void {
    this.dummies = this.dummies.filter((d) => d !== expression)
  }

  instances(): DummyExpression[] {
    return this.dummies.filter((d) => d.context.a > 3)
  }

  trigger(instance: DummyExpression): Expression[] {
    return [new NumberSubtract(instance, "a", { value: 1 })]
  }
}

test("Engine executes rules on expressions", () => {
  const engine = new Engine([new ReduceDummiesByOneIfAboveThree()])

  const dummy = new DummyExpression({ a: 5 })
  engine.register(dummy)

  engine.run()

  expect(dummy.context.a).toBe(3)
})

class SumOfAllDummies extends CompositionExpression<{ a: number }> {}
class DeriveSumOfAllDummies extends Rule<DummyExpression[]> {
  dummies: DummyExpression[] = []
  sum?: SumOfAllDummies

  track(expression: Expression): void {
    if (expression instanceof DummyExpression) {
      this.dummies.push(expression)
    } else if (expression instanceof SumOfAllDummies) {
      this.sum = expression
    }
  }

  untrack(expression: Expression): void {
    if (expression instanceof DummyExpression) {
      this.dummies = this.dummies.filter((d) => d !== expression)
    } else if (expression instanceof SumOfAllDummies) {
      this.sum = undefined
    }
  }

  instances(): DummyExpression[][] {
    if (!this.sum) {
      return [this.dummies]
    }

    return []
  }

  trigger(instance: DummyExpression[]): Expression[] {
    const sum = instance.reduce((prev, cur) => {
      return prev + cur.context.a
    }, 0)
    return [new SumOfAllDummies({ a: sum }, true)]
  }
}

class SumOfAllDummiesShouldBeOneLess extends Rule<SumOfAllDummies> {
  sums: SumOfAllDummies[] = []

  track(expression: Expression): void {
    if (expression instanceof SumOfAllDummies) {
      this.sums.push(expression)
    }
  }

  untrack(expression: Expression): void {
    if (expression instanceof SumOfAllDummies) {
      this.sums = this.sums.filter((d) => d !== expression)
    }
  }

  instances(): SumOfAllDummies[] {
    return this.sums.filter((s) => {
      if (s.children.find((c) => c instanceof NumberSubtract)) return false

      return true
    })
  }

  trigger(instance: SumOfAllDummies): Expression[] {
    return [new NumberSubtract(instance, "a", { value: 1 })]
  }
}

test("Engine automatically refreshes derived expressions", () => {
  const engine = new Engine([
    // put the derivation rule on top so it always runs
    new DeriveSumOfAllDummies(),
    new SumOfAllDummiesShouldBeOneLess(),
    new ReduceDummiesByOneIfAboveThree(),
  ])

  const dummy = new DummyExpression({ a: 5 })
  engine.register(dummy)

  const dummy2 = new DummyExpression({ a: 4 })
  engine.register(dummy2)

  // engine.run(() => console.log(engine.expressions))
  engine.run()

  const [sum] = new ByType(SumOfAllDummies).run(engine.expressions)

  expect(sum).toBeDefined()
  expect(sum.context.a).toBe(5)
})
