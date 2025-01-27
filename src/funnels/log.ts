import Funnel from "../funnel.js"
import getByPath from "../utils/get-by-path.js"

export default class Log extends Funnel {
  path?: string

  constructor(path?: string) {
    super()
    this.path = path
  }

  run<T>(context: T[]) {
    const path = this.path
    if (path) {
      console.log(context.map((c) => getByPath(c, path)))
    } else {
      console.log(context)
    }
    return context
  }
}
