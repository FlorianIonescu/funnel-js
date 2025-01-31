import ExpressionRegistry from "./expression-registry.js"
import Rule from "./rule.js"
import { Expression } from "./types.js"
import CompositionExpression from "./expressions/composition-expression.js"
import flattenTree from "./utils/flatten-tree.js"

export default class Engine {
  registry: ExpressionRegistry = new ExpressionRegistry()
  rules: Rule<any>[]

  constructor(rules: Rule<any>[]) {
    this.rules = rules
  }

  get expressions() {
    return this.registry.expressions
  }

  tick(): boolean {
    for (const rule of this.rules) {
      // get whether the rule would trigger under these circumstances
      const instances = rule.instances()

      if (instances.length) {
        // if it does, trigger it with the first instance
        const expressions = rule.trigger(instances[0])

        expressions.forEach((expression) => {
          this.register(expression, rule)
        })

        return true
      }
    }

    return false
  }

  register(expression: Expression, rule?: Rule<any>) {
    if (rule) {
      // the rule that added this expression
      expression.rule = rule
    }

    // add the expression
    this.registry.add(expression)

    // each rule should track the newly added expression
    this.rules.forEach((rule) => rule.track(expression))

    const ancestors = flattenTree(expression, "parent")
    const root = ancestors[ancestors.length - 1]

    if (root instanceof CompositionExpression && !root.reactive) {
      this.clearReactive()
    }
  }

  clearReactive() {
    // delete all reactive expressions and their children
    this.registry.expressions.forEach((expression) => {
      if (!(expression instanceof CompositionExpression)) return
      if (!expression.reactive) return

      // get all ancestors
      const remove = flattenTree(expression, "children") as Expression[]

      // delete them all
      remove.forEach((e) => this.registry.delete(e))

      // notify the rules that this has happened
      remove.forEach((expression) => {
        this.rules.forEach((rule) => rule.untrack(expression))
      })
    })
  }

  run(callback?: () => void) {
    while (this.tick()) {
      if (callback) callback()
    }
  }
}
