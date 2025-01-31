export default function flattenTree(
  object: Record<string, any>,
  attribute: string
) {
  if (!object.hasOwnProperty(attribute)) return [object]

  let space
  if (Array.isArray(object[attribute])) {
    space = object[attribute] as Object[]
  } else {
    space = [object[attribute]] as Object[]
  }

  const children: Object[] = space.reduce((prev: Object[], cur: Object) => {
    return [...prev, ...flattenTree(cur, attribute)]
  }, [])

  return [object, ...children]
}
