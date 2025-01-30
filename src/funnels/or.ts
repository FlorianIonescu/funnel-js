import Funnel from "../funnel.js"
import In from "./in.js"
import NotIn from "./not-in.js"

export default class Or extends Funnel {
  funnels: Funnel[]

  constructor(...funnels: Funnel[]) {
    super()

    this.funnels = funnels
  }

  run<T>(A: T[]): T[] {
    let left = [...A]
    let result: T[] = []

    for (const funnel of this.funnels) {
      // check the current funnel for any hits in what's left
      const hits = funnel.run(left)

      // add any hits to the result
      result.push(...hits)

      // remove the hits from the set of entries left to check
      left = new NotIn(hits).run(left)
    }

    // restore the ordering
    return new In(result).run(A)
  }
}
