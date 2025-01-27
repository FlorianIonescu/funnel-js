import { expect, test } from "vitest"
import ByPredicate from "./by-predicate"
import Dummy from "../dummy"

test("ByPredicate filters by a callback function", () => {
  const A = [new Dummy({ a: 1 }), new Dummy({ a: 2 }), new Dummy({ a: 3 })]

  const hits = new ByPredicate((e) => e.payload.a >= 2).run(A)

  expect(hits.length).toBe(2)
})
