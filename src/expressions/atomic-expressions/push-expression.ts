import AtomicExpression from "../atomic-expression.js"
import CompositionExpression from "../composition-expression.js"

type PushExpressionProps = {
  value: any
}

export default class PushExpression extends AtomicExpression {
  props: PushExpressionProps

  constructor(
    parent: CompositionExpression<any>,
    path: string,
    props: PushExpressionProps
  ) {
    super(parent, path)

    this.props = props
  }

  get js() {
    return `
    if (!Array.isArray(this.${this.path})) {
      throw Error("Attempted to push into non-array at ${this.path}.");
    }
    this.${this.path}.push(${JSON.stringify(this.props.value)});
    `.trim()
  }
}
