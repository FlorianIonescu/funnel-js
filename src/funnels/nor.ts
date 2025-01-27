import Funnel from "../funnel.js"
import NotIn from "./not-in.js"

export default class Nor extends Funnel {
  funnels: Funnel[]

  constructor(...funnels: Funnel[]) {
    super()

    this.funnels = funnels
  }

  run<T>(A: T[]) {
    let result = [...A]

    for (const funnel of this.funnels) {
      const hits = funnel.run(result)
      result = new NotIn(hits).run(result)
    }

    return result
  }
}
