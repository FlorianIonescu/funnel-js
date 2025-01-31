import Rule from "$src/rule.js"
import { v7 } from "uuid"
import CompositionExpression from "./composition-expression.js"

export default abstract class AtomicExpression {
  id: string
  rule?: Rule<any>

  parent: CompositionExpression<object>
  path: string

  constructor(parent: CompositionExpression<object>, path: string) {
    this.id = v7()

    this.parent = parent
    this.path = path
  }

  abstract get js(): string
}
