export default abstract class Funnel {
  abstract run<T>(context: T[]): any[]
}
