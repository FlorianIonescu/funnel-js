import { expect, test } from "vitest"
import ByPredicate from "./by-predicate"
import All from "./all"
import ByType from "./by-type"
import Dummy from "../dummy"

class DummyOne extends Dummy<{ a: number }> {}
class DummyTwo extends Dummy<{ a: number }> {}

test("All chain-runs several funnels", () => {
  const A = [
    new DummyOne({ a: 1 }),
    new DummyTwo({ a: 2 }),
    new DummyTwo({ a: 3 }),
    new DummyTwo({ a: 4 }),
    new DummyTwo({ a: 5 }),
  ]

  const hits = new All(
    new ByType(DummyTwo),
    new ByPredicate((e) => e.payload.a <= 2)
  ).run(A)

  expect(hits.length).toBe(1)
  expect(hits[0]).toBeInstanceOf(DummyTwo)
})
