import { expect, test } from "vitest"
import Dummy from "../dummy"
import In from "./in"

test("In returns all from A that's also in B", () => {
  const a = new Dummy({ a: 1 })
  const b = new Dummy({ a: 2 })
  const c = new Dummy({ a: 3 })
  const A = [a, b, c]

  const B = [b]

  const hits = new In(B).run(A)

  expect(hits.length).toBe(1)
  expect(hits[0]).toBe(b)
})
