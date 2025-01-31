import { v7 } from "uuid"
import AtomicExpression from "./atomic-expression.js"
import Rule from "$src/rule.js"
import vm from "node:vm"

export default abstract class CompositionExpression<T extends object> {
  id: string
  rule?: Rule<any>

  parameters: T
  reactive: boolean

  children: AtomicExpression[] = []

  constructor(parameters: T, reactive?: boolean) {
    this.id = v7()
    this.parameters = parameters
    this.reactive = reactive || false
  }

  get context(): T {
    const context = JSON.parse(JSON.stringify(this.parameters))

    vm.createContext(context)
    vm.runInContext(this.js, context)

    return context
  }

  get js() {
    return [
      `Object.assign(this, ${JSON.stringify(this.parameters)});`,
      ...this.children.map((c) => c.js),
    ].join("\n")
  }
}
