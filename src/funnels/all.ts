import Funnel from "../funnel.js"

export default class All extends Funnel {
  funnels: Funnel[]

  constructor(...funnels: Funnel[]) {
    super()

    this.funnels = funnels
  }

  run<T>(A: T[]): T[] {
    let result = [...A]

    for (const funnel of this.funnels) {
      result = funnel.run(result)
    }

    return result
  }
}
