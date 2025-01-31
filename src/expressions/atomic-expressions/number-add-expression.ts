import AtomicExpression from "../atomic-expression.js"
import CompositionExpression from "../composition-expression.js"

type NumberAddExpressionProps = {
  value: number
}

export default class NumberAddExpression extends AtomicExpression {
  props: NumberAddExpressionProps

  constructor(
    parent: CompositionExpression<any>,
    path: string,
    props: NumberAddExpressionProps
  ) {
    super(parent, path)

    this.props = props
  }

  get js() {
    return `
    if (typeof this.${this.path} !== "number") {
      throw Error("Attempted to add to a non-number at ${this.path}.");
    }
    this.${this.path} += ${this.props.value};
    `
  }
}
