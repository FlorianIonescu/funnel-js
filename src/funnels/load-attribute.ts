import Funnel from "../funnel.js"
import getByPath from "../utils/get-by-path.js"

// takes all the references at pathA in A and loads them from B
export default class LoadAttribute<U> extends Funnel {
  pathA: string
  pathB: string
  B: U[]

  constructor(pathA: string, pathB: string, B: U[]) {
    super()
    this.pathA = pathA
    this.pathB = pathB
    this.B = B
  }

  run<T>(context: T[]): U[] {
    const ids = context.map((e) => getByPath(e, this.pathA))

    return this.B.filter((e) => ids.includes(getByPath(e, this.pathB)))
  }
}
