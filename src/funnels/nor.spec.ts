import { expect, test } from "vitest"
import ByPredicate from "./by-predicate"
import ByType from "./by-type"
import Dummy from "../dummy"
import Nor from "./nor"

class DummyOne extends Dummy<{ a: number }> {}
class DummyTwo extends Dummy<{ a: number }> {}

test("Nor gets all in A that aren't returned from any of the funnels", () => {
  const A = [
    new DummyOne({ a: 1 }),
    new DummyTwo({ a: 2 }),
    new DummyTwo({ a: 3 }),
    new DummyTwo({ a: 4 }),
    new DummyOne({ a: 5 }),
  ]

  const hits = new Nor(
    new ByType(DummyTwo),
    new ByPredicate((e) => e.payload.a <= 2)
  ).run(A)

  expect(hits.length).toBe(1)
  expect(hits[0]).toBeInstanceOf(DummyOne)
  expect(hits[0].payload.a).toBe(5)
})
