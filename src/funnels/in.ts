import Funnel from "../funnel.js"

export default class In extends Funnel {
  B: any[]

  constructor(B: any[]) {
    super()

    this.B = B
  }

  run<T>(A: T[]): T[] {
    return A.filter((entry) => {
      if (this.B.find((e) => e === entry)) return true

      return false
    })
  }
}
