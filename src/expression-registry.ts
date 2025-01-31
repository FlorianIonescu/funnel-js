import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  transaction,
} from "mobx"
import CompositionExpression from "./expressions/composition-expression.js"
import AtomicExpression from "./expressions/atomic-expression.js"

type Expression = AtomicExpression | CompositionExpression<any>

export default class ExpressionRegistry {
  // map expression ids to their expressions
  entries: Map<string, Expression> = new Map()

  // map expression id to their children
  children: Map<string, AtomicExpression[]> = new Map()

  // map expression id to their parent
  parents: Map<string, CompositionExpression<any>> = new Map()

  constructor() {
    makeObservable(this, {
      entries: observable,
      children: observable,
      parents: observable,
      add: action.bound,
      delete: action.bound,
      expressions: computed,
      clear: action,
    })

    // automatically update each expression's relationship attributes
    autorun(() => {
      transaction(() => {
        this.entries.forEach((e) => {
          if (e instanceof AtomicExpression) {
            const parent = this.parents.get(e.id)
            if (!parent) {
              throw Error("Couldn't find parent for an AtomicExpression")
            }

            e.parent = parent
          } else {
            const children = this.children.get(e.id) as AtomicExpression[]
            if (!children) {
              throw Error("Couldn't find children for a CompositionExpression")
            }

            e.children = children
          }
        })
      })
    })
  }

  add(expression: Expression) {
    if (expression instanceof CompositionExpression) {
      transaction(() => {
        this.entries.set(expression.id, expression)
        const children = this.children.get(expression.id)
        if (!children) this.children.set(expression.id, [])
      })
    } else if (expression instanceof AtomicExpression) {
      transaction(() => {
        const parent = expression.parent

        this.entries.set(expression.id, expression)

        const children = this.children.get(parent.id)

        if (children) {
          children.push(expression)
        } else {
          this.children.set(parent.id, [expression])
        }

        this.parents.set(expression.id, parent)
      })
    } else {
      throw new Error("Tried to add an expression in an incorrect relationship")
    }
  }

  delete(expression: Expression) {
    this.entries.delete(expression.id)
    this.children.delete(expression.id)
    this.parents.delete(expression.id)
  }

  get expressions() {
    return [...this.entries.values()]
  }

  clear() {
    this.entries.clear()
    this.parents.clear()
    this.children.clear()
  }
}
