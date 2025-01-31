import AtomicExpression from "./expressions/atomic-expression.js"
import CompositionExpression from "./expressions/composition-expression.js"

type Expression = AtomicExpression | CompositionExpression<any>
type ExpressionConstructor = new (...args: any[]) => Expression

export { Expression, ExpressionConstructor }
