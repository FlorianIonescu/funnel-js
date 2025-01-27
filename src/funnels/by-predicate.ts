import Funnel from "../funnel.js"

export default class ByPredicate extends Funnel {
  predicate: (entry: any) => boolean

  constructor(predicate: (entry: any) => boolean) {
    super()

    this.predicate = predicate
  }

  run<T>(A: T[]) {
    return A.filter((entry: T) => {
      return this.predicate(entry)
    })
  }
}
