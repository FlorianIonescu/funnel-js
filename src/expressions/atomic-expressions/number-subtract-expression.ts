import AtomicExpression from "../atomic-expression.js"
import CompositionExpression from "../composition-expression.js"

type NumberSubtractExpressionProps = {
  value: number
}

export default class NumberSubtractExpression extends AtomicExpression {
  props: NumberSubtractExpressionProps

  constructor(
    parent: CompositionExpression<any>,
    path: string,
    props: NumberSubtractExpressionProps
  ) {
    super(parent, path)

    this.props = props
  }

  get js() {
    return `
    if (typeof this.${this.path} !== "number") {
      throw Error("Attempted to subtract from a non-number at ${this.path}.");
    }
    this.${this.path} -= ${this.props.value};
    `
  }
}
