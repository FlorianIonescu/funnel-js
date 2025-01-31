export default function splitPath(path: string) {
  const parts = path.split(".")
  const front = parts.slice(0, -1).join(".")
  const back = parts[parts.length - 1]

  return { front, back }
}
