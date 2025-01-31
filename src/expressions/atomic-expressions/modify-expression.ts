import splitPath from "$src/utils/split-path.js"
import AtomicExpression from "../atomic-expression.js"
import CompositionExpression from "../composition-expression.js"

type ModifyExpressionProps = {
  callback: (value: any) => any
}

export default class ModifyExpression extends AtomicExpression {
  props: ModifyExpressionProps

  constructor(
    parent: CompositionExpression<any>,
    path: string,
    props: ModifyExpressionProps
  ) {
    super(parent, path)

    this.props = props
  }

  get js() {
    const { front, back } = splitPath(this.path)
    const path = front ? `this.${front}` : "this"

    return `
    if (typeof ${path} !== "object") {
      throw Error("Attempted to modify '${back}' for '${path}', but '${path}' isn't an object.");
    }
    this.${this.path} = (${this.props.callback.toString()})(this.${this.path});
    `
  }
}
