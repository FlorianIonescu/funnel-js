import AtomicExpression from "../atomic-expression.js"
import CompositionExpression from "../composition-expression.js"

type PopExpressionProps = {}

export default class PopExpression extends AtomicExpression {
  props: PopExpressionProps

  constructor(
    parent: CompositionExpression<any>,
    path: string,
    props: PopExpressionProps
  ) {
    super(parent, path)

    this.props = props
  }

  get js() {
    return `
    if (!Array.isArray(this.${this.path})) {
      throw Error("Attempted to pop non-array at ${this.path}.");
    }
    this.${this.path}.pop();
    `.trim()
  }
}
