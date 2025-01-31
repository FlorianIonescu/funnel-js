import splitPath from "$src/utils/split-path.js"
import AtomicExpression from "../atomic-expression.js"
import CompositionExpression from "../composition-expression.js"

type SetExpressionProps = {
  value: any
}

export default class SetExpression extends AtomicExpression {
  props: SetExpressionProps

  constructor(
    parent: CompositionExpression<any>,
    path: string,
    props: SetExpressionProps
  ) {
    super(parent, path)

    this.props = props
  }

  get js() {
    const { front, back } = splitPath(this.path)
    const path = front ? `this.${front}` : "this"

    return `
    if (typeof ${path} !== "object") {
      throw Error("Attempted to set '${back}' for '${path}', but '${path}' isn't an object.");
    }
    this.${this.path} = ${JSON.stringify(this.props.value)};
    `
  }
}
