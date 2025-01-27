import Funnel from "../funnel.js"
import LoadAttribute from "./load-attribute.js"

// takes all the entries in B that could be loaded from A
export default class Missing extends Funnel {
  pathA: string
  pathB: string
  B: any[]
  expected: number

  constructor(pathA: string, pathB: string, B: any[], expected?: number) {
    super()
    this.pathA = pathA
    this.pathB = pathB
    this.B = B
    this.expected = expected || 1
  }

  run<T>(A: T[]): T[] {
    return A.filter((entry) => {
      const has = new LoadAttribute(this.pathA, this.pathB, this.B).run([entry])

      return has.length < this.expected
    })
  }
}
