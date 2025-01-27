import { expect, test } from "vitest"
import NotIn from "./not-in"
import Dummy from "../dummy"

test("Not-In returns all from A that isn't in B", () => {
  const a = new Dummy({ a: 1 })
  const b = new Dummy({ a: 2 })
  const c = new Dummy({ a: 3 })
  const A = [a, b, c]

  const B = [a, c]

  const hits = new NotIn(B).run(A)

  expect(hits.length).toBe(1)
  expect(hits[0]).toBe(b)
})
