import Funnel from "../funnel.js"

export default class NotIn extends Funnel {
  B: any[]

  constructor(B: any[]) {
    super()

    this.B = B
  }

  run<T>(A: T[]) {
    return A.filter((entry) => {
      if (this.B.find((e) => e === entry)) return false

      return true
    })
  }
}
