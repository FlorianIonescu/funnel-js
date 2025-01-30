import Funnel from "../funnel.js"

export default class ByType extends Funnel {
  type: new (...args: any[]) => any

  constructor(type: new (...args: any[]) => any) {
    super()
    this.type = type
  }

  run<T>(A: T[]): T[] {
    return A.filter((entry) => entry instanceof this.type)
  }
}
