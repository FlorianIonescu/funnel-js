import { Expression } from "./types.js"

export default abstract class Rule<T> {
  // process an incoming expression
  abstract track(expression: Expression): void

  // forget an expression that's been removed
  abstract untrack(expression: Expression): void

  // tracks incoming events and returns all the instances for which this rule could trigger
  abstract instances(): T[]

  // calculates the expressions returned based on the currently triggered instance
  abstract trigger(instance: T): Expression[]
}

/*
e.g.
if you want to have a rule that subtracts one of each Dummy Expression with value > 3
that rule would track all incoming dummy expressions and then return an array with all
dummy expressions with value > 3
then the engine would take the first one of these and run them through trigger
*/
