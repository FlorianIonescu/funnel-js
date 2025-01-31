export default function setByPath(obj: any, path: string, value: any): void {
  const parts = path.split(".")
  const lastPart = parts.pop()!

  const target = parts.reduce((acc, part) => {
    if (acc[part] === undefined) {
      throw new Error(
        `Path ${path} doesn't exist on obj ${obj.constructor.name}`
      )
    }
    return acc[part]
  }, obj)

  if (target === undefined) {
    throw new Error(`Path ${path} doesn't exist on obj ${obj.constructor.name}`)
  }

  target[lastPart] = value
}
